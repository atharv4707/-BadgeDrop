const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying BadgeDrop contract to Base Sepolia...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    console.log("❌ Error: Insufficient balance!");
    console.log("Get Base Sepolia ETH from: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
    process.exit(1);
  }

  // Deploy the contract
  console.log("⏳ Deploying BadgeDrop...");
  const BadgeDrop = await hre.ethers.getContractFactory("BadgeDrop");
  const badgeDrop = await BadgeDrop.deploy();

  await badgeDrop.waitForDeployment();

  const address = await badgeDrop.getAddress();
  
  console.log("\n✅ BadgeDrop deployed successfully!");
  console.log("📍 Contract address:", address);
  console.log("🔗 View on BaseScan:", `https://sepolia.basescan.org/address/${address}`);
  
  console.log("\n📋 Next steps:");
  console.log("1. Update BADGE_CONTRACT in index.html:");
  console.log(`   const BADGE_CONTRACT = '${address}';`);
  console.log("\n2. Get Mock USD address from UGF docs:");
  console.log("   https://universalgasframework.com/docs");
  console.log("\n3. Get Mock USD from faucet:");
  console.log("   https://universalgasframework.com/faucets");
  console.log("\n4. (Optional) Verify contract:");
  console.log(`   npx hardhat verify --network baseSepolia ${address}`);
  
  // Wait for a few block confirmations before verification
  console.log("\n⏳ Waiting for block confirmations...");
  const receipt = await badgeDrop.deploymentTransaction().wait(5);
  console.log("✅ Confirmed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
