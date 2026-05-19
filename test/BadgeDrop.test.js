const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BadgeDrop", function () {
  let badgeDrop;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const BadgeDrop = await ethers.getContractFactory("BadgeDrop");
    badgeDrop = await BadgeDrop.deploy();
    await badgeDrop.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await badgeDrop.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await badgeDrop.name()).to.equal("BadgeDrop");
      expect(await badgeDrop.symbol()).to.equal("BADGE");
    });

    it("Should start with zero total supply", async function () {
      expect(await badgeDrop.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should mint a badge successfully", async function () {
      await badgeDrop.mint(user1.address, 1);
      
      expect(await badgeDrop.totalSupply()).to.equal(1);
      expect(await badgeDrop.ownerOf(0)).to.equal(user1.address);
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.true;
    });

    it("Should emit BadgeClaimed event", async function () {
      await expect(badgeDrop.mint(user1.address, 1))
        .to.emit(badgeDrop, "BadgeClaimed")
        .withArgs(user1.address, 1, 0);
    });

    it("Should prevent double claiming same badge", async function () {
      await badgeDrop.mint(user1.address, 1);
      
      await expect(badgeDrop.mint(user1.address, 1))
        .to.be.revertedWith("Already claimed");
    });

    it("Should allow claiming different badges", async function () {
      await badgeDrop.mint(user1.address, 1);
      await badgeDrop.mint(user1.address, 2);
      
      expect(await badgeDrop.totalSupply()).to.equal(2);
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.true;
      expect(await badgeDrop.hasClaimedBadge(user1.address, 2)).to.be.true;
    });

    it("Should allow different users to claim same badge", async function () {
      await badgeDrop.mint(user1.address, 1);
      await badgeDrop.mint(user2.address, 1);
      
      expect(await badgeDrop.totalSupply()).to.equal(2);
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.true;
      expect(await badgeDrop.hasClaimedBadge(user2.address, 1)).to.be.true;
    });

    it("Should reject invalid badge IDs", async function () {
      await expect(badgeDrop.mint(user1.address, 0))
        .to.be.revertedWith("Invalid badge ID");
      
      await expect(badgeDrop.mint(user1.address, 7))
        .to.be.revertedWith("Invalid badge ID");
    });

    it("Should accept all valid badge IDs (1-6)", async function () {
      for (let i = 1; i <= 6; i++) {
        await badgeDrop.mint(user1.address, i);
        expect(await badgeDrop.hasClaimedBadge(user1.address, i)).to.be.true;
      }
      
      expect(await badgeDrop.totalSupply()).to.equal(6);
    });
  });

  describe("Token URI", function () {
    it("Should return token URI for minted token", async function () {
      await badgeDrop.mint(user1.address, 1);
      
      const uri = await badgeDrop.tokenURI(0);
      expect(uri).to.include("https://badgedrop.example.com/metadata/0");
    });

    it("Should revert for non-existent token", async function () {
      await expect(badgeDrop.tokenURI(999))
        .to.be.revertedWithCustomError(badgeDrop, "ERC721NonexistentToken");
    });
  });

  describe("View Functions", function () {
    it("Should correctly report claimed status", async function () {
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.false;
      
      await badgeDrop.mint(user1.address, 1);
      
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.true;
      expect(await badgeDrop.hasClaimedBadge(user1.address, 2)).to.be.false;
    });

    it("Should track total supply correctly", async function () {
      expect(await badgeDrop.totalSupply()).to.equal(0);
      
      await badgeDrop.mint(user1.address, 1);
      expect(await badgeDrop.totalSupply()).to.equal(1);
      
      await badgeDrop.mint(user2.address, 1);
      expect(await badgeDrop.totalSupply()).to.equal(2);
      
      await badgeDrop.mint(user1.address, 2);
      expect(await badgeDrop.totalSupply()).to.equal(3);
    });
  });

  describe("ERC721 Compliance", function () {
    it("Should support ERC721 interface", async function () {
      // ERC721 interface ID: 0x80ac58cd
      expect(await badgeDrop.supportsInterface("0x80ac58cd")).to.be.true;
    });

    it("Should allow token transfers", async function () {
      await badgeDrop.mint(user1.address, 1);
      
      await badgeDrop.connect(user1).transferFrom(user1.address, user2.address, 0);
      
      expect(await badgeDrop.ownerOf(0)).to.equal(user2.address);
    });

    it("Should maintain claimed status after transfer", async function () {
      await badgeDrop.mint(user1.address, 1);
      await badgeDrop.connect(user1).transferFrom(user1.address, user2.address, 0);
      
      // Original claimer still marked as claimed
      expect(await badgeDrop.hasClaimedBadge(user1.address, 1)).to.be.true;
      // New owner cannot claim the same badge (they already have it via transfer)
      // But the contract prevents claiming if already claimed by that address
      await expect(badgeDrop.mint(user2.address, 1))
        .to.not.be.reverted; // user2 hasn't claimed yet, so this should work
      
      // Now user2 has claimed, so they can't claim again
      await expect(badgeDrop.mint(user2.address, 1))
        .to.be.revertedWith("Already claimed");
    });
  });
});
