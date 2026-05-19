# BadgeDrop Deployment Guide

## 🚀 Quick Start Checklist

Before your dApp works with real transactions, complete these 3 steps:

### ✅ Step 1: Get Mock USD Address
1. Visit [UGF Documentation](https://universalgasframework.com/docs)
2. Find the Mock USD token address for Base Sepolia
3. Update `MOCK_USD_ADDRESS` in `index.html` (line ~240)

### ✅ Step 2: Deploy BadgeDrop Contract
Deploy the `BadgeDrop.sol` contract to Base Sepolia testnet.

**Option A: Using Remix (Easiest)**
1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create a new file `BadgeDrop.sol` and paste the contract code (see below)
3. Install OpenZeppelin contracts:
   - Click "Plugin Manager" → Activate "Flattener"
   - Or use Remix's built-in OpenZeppelin import
4. Compile with Solidity 0.8.20+
5. Deploy:
   - Environment: "Injected Provider - MetaMask"
   - Network: Base Sepolia (chain ID 84532)
   - Click "Deploy"
6. Copy the deployed contract address
7. Update `BADGE_CONTRACT` in `index.html` (line ~241)

**Option B: Using Hardhat (Advanced)**
```bash
# Install dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts

# Initialize Hardhat
npx hardhat init

# Create deployment script (see hardhat-deploy.js below)
# Add Base Sepolia to hardhat.config.js (see config below)

# Deploy
npx hardhat run scripts/deploy.js --network baseSepolia
```

### ✅ Step 3: Get Mock USD from Faucet
1. Visit [UGF Faucet](https://universalgasframework.com/faucets)
2. Connect your MetaMask wallet
3. Request Mock USD tokens (free testnet tokens)
4. Wait for transaction confirmation

---

## 📝 BadgeDrop.sol Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BadgeDrop is ERC721, Ownable {
    uint256 private _nextTokenId;
    mapping(address => mapping(uint256 => bool)) public hasClaimed;

    constructor() ERC721("BadgeDrop", "BADGE") Ownable(msg.sender) {}

    // Called by UGF on behalf of the user
    function mint(address to, uint256 badgeId) external {
        require(!hasClaimed[to][badgeId], "Already claimed");
        hasClaimed[to][badgeId] = true;
        _safeMint(to, _nextTokenId++);
    }
    
    // View function to check if a badge has been claimed
    function hasClaimedBadge(address user, uint256 badgeId) external view returns (bool) {
        return hasClaimed[user][badgeId];
    }
}
```

---

## 🔧 Hardhat Configuration (Optional)

### hardhat.config.js
```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY], // Add your private key to .env
      chainId: 84532
    }
  },
  etherscan: {
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY // Optional: for verification
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  }
};
```

### scripts/deploy.js
```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying BadgeDrop contract to Base Sepolia...");

  const BadgeDrop = await hre.ethers.getContractFactory("BadgeDrop");
  const badgeDrop = await BadgeDrop.deploy();

  await badgeDrop.waitForDeployment();

  const address = await badgeDrop.getAddress();
  console.log("✅ BadgeDrop deployed to:", address);
  console.log("\n📋 Next steps:");
  console.log("1. Update BADGE_CONTRACT in index.html with:", address);
  console.log("2. Verify contract (optional):");
  console.log(`   npx hardhat verify --network baseSepolia ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### .env (Create this file - DO NOT COMMIT)
```env
PRIVATE_KEY=your_wallet_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here
```

---

## 🧪 Testing Your Integration

### 1. Test in Simulation Mode (No deployment needed)
- Open `index.html` in a browser
- Connect MetaMask
- Select a badge and click "Claim"
- You'll see simulated transactions with warnings

### 2. Test with Real Contracts
After completing Steps 1-3 above:
- Open `index.html` in a browser
- Connect MetaMask to Base Sepolia
- Ensure you have Mock USD in your wallet
- Select a badge and click "Claim"
- Approve the Mock USD spend (MetaMask popup)
- Wait for UGF to process the transaction
- Your badge will be minted!

---

## 🌐 Base Sepolia Network Details

Add this network to MetaMask if not already present:

- **Network Name:** Base Sepolia
- **RPC URL:** https://sepolia.base.org
- **Chain ID:** 84532
- **Currency Symbol:** ETH
- **Block Explorer:** https://sepolia.basescan.org

---

## 📚 Resources

- **UGF Docs:** https://universalgasframework.com/docs
- **UGF Testnet Guide:** https://universalgasframework.com/docs/testnet
- **Mock USD Faucet:** https://universalgasframework.com/faucets
- **UGF SDK (npm):** https://www.npmjs.com/package/@tychilabs/ugf-testnet-js
- **Base Sepolia Faucet:** https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **OpenZeppelin Contracts:** https://docs.openzeppelin.com/contracts

---

## 🐛 Troubleshooting

### "Insufficient Mock USD balance"
- Visit the [UGF Faucet](https://universalgasframework.com/faucets) to get free Mock USD

### "Wrong network"
- Ensure MetaMask is connected to Base Sepolia (chain ID 84532)
- The dApp will attempt to switch networks automatically

### "Transaction failed"
- Check that BADGE_CONTRACT and MOCK_USD_ADDRESS are correctly set
- Ensure you have a small amount of ETH on Base Sepolia for the approval transaction
- Check the browser console for detailed error messages

### "UGF SDK not loading"
- Check browser console for errors
- Ensure you have internet connection (SDK loads from CDN)
- Try refreshing the page

---

## 🎉 Success!

Once deployed, your users can:
- ✅ Claim NFT badges without holding ETH
- ✅ Pay only a tiny Mock USD fee
- ✅ Experience gasless transactions via UGF
- ✅ View their badges on OpenSea (Base Sepolia testnet)

Share your dApp and let users experience the magic of gasless NFT minting! 🚀
