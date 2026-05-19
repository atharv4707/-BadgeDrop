# 🎖️ BadgeDrop — Gasless NFT Badges on Base

A gasless NFT badge claimer built with **Universal Gas Framework (UGF)** on Base Sepolia. Users claim onchain badges by paying a tiny Mock USD fee — **no ETH required**.

![Base Sepolia](https://img.shields.io/badge/Base-Sepolia-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🎯 **6 Claimable Badge Types** — Early Adopter, Gas Slayer, UGF Pioneer, and more
- ⚡ **Gasless Transactions** — Users pay in Mock USD, UGF handles the gas
- 🔗 **Base Sepolia Testnet** — Built on Coinbase's L2 testnet
- 🎨 **Beautiful UI** — Modern, responsive single-page dApp
- 📊 **Real-time Transaction Log** — Track the 4-step UGF flow
- 🔐 **MetaMask Integration** — Auto-switch to Base Sepolia

---

## 🏗️ Architecture

```
User → MetaMask → UGF SDK → UGF Settler → BadgeDrop Contract
                     ↓
                 Mock USD Payment
```

1. **User selects a badge** → dApp fetches gas quote from UGF
2. **User approves Mock USD** → ERC-20 approval for UGF settler
3. **UGF settles transaction** → Pays gas, calls `mint()` on BadgeDrop
4. **Badge minted** → NFT lands in user's wallet, no ETH spent

---

## 📁 Project Structure

```
badgedrop-ugf/
├── index.html              # Complete dApp UI (single file)
├── contracts/
│   └── BadgeDrop.sol       # NFT badge contract
├── scripts/
│   └── deploy.js           # Hardhat deployment script
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Dependencies
├── DEPLOYMENT_GUIDE.md     # Step-by-step deployment guide
├── UGF_INTEGRATION.md      # UGF SDK integration reference
└── README.md               # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your PRIVATE_KEY
```

### 3. Deploy BadgeDrop Contract

```bash
# Compile contract
npm run compile

# Deploy to Base Sepolia
npm run deploy
```

Copy the deployed contract address and update `index.html`:

```javascript
const BADGE_CONTRACT = '0xYourDeployedAddress';
```

### 4. Get Mock USD Address

Visit [UGF Documentation](https://universalgasframework.com/docs) and find the Mock USD token address for Base Sepolia. Update `index.html`:

```javascript
const MOCK_USD_ADDRESS = '0xMockUSDAddress';
```

### 5. Get Mock USD Tokens

Visit [UGF Faucet](https://universalgasframework.com/faucets) and claim free Mock USD tokens.

### 6. Open the dApp

Simply open `index.html` in your browser:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or serve it locally:

```bash
npx http-server . -p 8080
# Visit http://localhost:8080
```

---

## 🎮 How to Use

1. **Connect Wallet** — Click "Connect Wallet" and approve MetaMask
2. **Switch Network** — dApp auto-switches to Base Sepolia
3. **Select Badge** — Click any badge card to select it
4. **Review Quote** — See the Mock USD fee (typically $0.01-0.02)
5. **Claim Badge** — Click "Claim Badge" and approve transactions
6. **Success!** — Your badge is minted and visible on BaseScan

---

## 🧪 Testing

### Simulation Mode (No Deployment)

The dApp works in simulation mode before contracts are configured:

- Open `index.html` in browser
- Connect MetaMask
- Select and "claim" badges
- See simulated transaction flow with warnings

### Live Mode (After Deployment)

Once `BADGE_CONTRACT` and `MOCK_USD_ADDRESS` are set:

- Real UGF quotes
- Real Mock USD approvals
- Real badge minting on Base Sepolia
- Real transaction hashes on BaseScan

---

## 📜 Smart Contract

### BadgeDrop.sol

```solidity
contract BadgeDrop is ERC721, Ownable {
    mapping(address => mapping(uint256 => bool)) public hasClaimed;
    
    function mint(address to, uint256 badgeId) external {
        require(!hasClaimed[to][badgeId], "Already claimed");
        hasClaimed[to][badgeId] = true;
        _safeMint(to, _nextTokenId++);
    }
}
```

**Key Features:**
- ERC-721 compliant NFT
- One badge per type per user
- 6 badge types (IDs 1-6)
- Gasless minting via UGF

---

## 🔧 Configuration

### Base Sepolia Network

- **Chain ID:** 84532
- **RPC URL:** https://sepolia.base.org
- **Explorer:** https://sepolia.basescan.org
- **Faucet:** https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### UGF Resources

- **Docs:** https://universalgasframework.com/docs
- **Testnet Guide:** https://universalgasframework.com/docs/testnet
- **Mock USD Faucet:** https://universalgasframework.com/faucets
- **SDK:** https://www.npmjs.com/package/@tychilabs/ugf-testnet-js

---

## 🎨 Badge Types

| Badge | Icon | Rarity | Description |
|-------|------|--------|-------------|
| Early Adopter | 🔥 | Epic | First 500 to claim on Base Sepolia |
| Gas Slayer | ⚡ | Rare | Proved ETH is optional |
| Web3 Native | 🌐 | Common | Completed a gasless onchain action |
| UGF Pioneer | 🤖 | Epic | Used Universal Gas Framework |
| Hackathon Builder | 🏆 | Rare | Deployed a dApp using UGF SDK |
| Base Builder | 🎯 | Common | Participated in Base Sepolia testnet |

---

## 🛠️ Development

### Compile Contracts

```bash
npm run compile
```

### Deploy to Base Sepolia

```bash
npm run deploy
```

### Verify Contract (Optional)

```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

### Run Local Node (Testing)

```bash
npx hardhat node
```

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** — Complete deployment walkthrough
- **[UGF_INTEGRATION.md](UGF_INTEGRATION.md)** — UGF SDK integration reference
- **[UGF Docs](https://universalgasframework.com/docs)** — Official UGF documentation

---

## 🐛 Troubleshooting

### "Insufficient Mock USD balance"
→ Visit [UGF Faucet](https://universalgasframework.com/faucets)

### "Wrong network"
→ Ensure MetaMask is on Base Sepolia (chain ID 84532)

### "Transaction failed"
→ Check `BADGE_CONTRACT` and `MOCK_USD_ADDRESS` are set correctly

### "UGF SDK not loading"
→ Check browser console, ensure internet connection

### "Deployment failed"
→ Ensure you have Base Sepolia ETH from the [faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

---

## 🤝 Contributing

Contributions welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **[Universal Gas Framework](https://universalgasframework.com)** — Gasless transaction infrastructure
- **[Base](https://base.org)** — Coinbase's L2 network
- **[OpenZeppelin](https://openzeppelin.com)** — Secure smart contract library
- **[Hardhat](https://hardhat.org)** — Ethereum development environment

---

## 🚀 What's Next?

- [ ] Add badge metadata (IPFS/Arweave)
- [ ] Implement badge rarity mechanics
- [ ] Add leaderboard for early claimers
- [ ] Deploy to Base mainnet
- [ ] Add social sharing features
- [ ] Create badge marketplace

---

**Built with ❤️ for the Base ecosystem**

[View on GitHub](#) | [Live Demo](#) | [Documentation](DEPLOYMENT_GUIDE.md)
