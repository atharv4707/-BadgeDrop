# 🚀 BadgeDrop Quick Reference

## 📋 Pre-Launch Checklist

- [ ] Deploy `BadgeDrop.sol` to Base Sepolia
- [ ] Update `BADGE_CONTRACT` in `index.html` (line ~241)
- [ ] Get Mock USD address from [UGF docs](https://universalgasframework.com/docs)
- [ ] Update `MOCK_USD_ADDRESS` in `index.html` (line ~240)
- [ ] Get Mock USD from [faucet](https://universalgasframework.com/faucets)
- [ ] Test in browser with MetaMask

---

## 🔑 Key Addresses to Configure

```javascript
// In index.html around line 240-241:

const MOCK_USD_ADDRESS = '0x...'; // Get from UGF docs
const BADGE_CONTRACT = '0x...';   // Your deployed contract
```

---

## ⚡ Quick Deploy Commands

```bash
# Install dependencies
npm install

# Compile contract
npm run compile

# Deploy to Base Sepolia
npm run deploy

# Verify contract (optional)
npx hardhat verify --network baseSepolia <ADDRESS>
```

---

## 🌐 Network Configuration

**Base Sepolia Testnet:**
- Chain ID: `84532`
- RPC: `https://sepolia.base.org`
- Explorer: `https://sepolia.basescan.org`
- Faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

---

## 🔄 UGF Transaction Flow

```
1. getQuote()        → Get gas cost in Mock USD
2. approveMockUSD()  → Approve Mock USD spend
3. settle()          → Pay fee, UGF executes
4. waitForExecution()→ Confirm badge minted
```

---

## 📝 Contract Functions

```solidity
// Mint a badge (called by UGF)
function mint(address to, uint256 badgeId) external

// Check if claimed
function hasClaimedBadge(address user, uint256 badgeId) 
    external view returns (bool)

// Get total supply
function totalSupply() external view returns (uint256)
```

---

## 🎯 Badge IDs

| ID | Badge Name | Rarity |
|----|------------|--------|
| 1  | Early Adopter | Epic |
| 2  | Gas Slayer | Rare |
| 3  | Web3 Native | Common |
| 4  | UGF Pioneer | Epic |
| 5  | Hackathon Builder | Rare |
| 6  | Base Builder | Common |

---

## 🔗 Essential Links

| Resource | URL |
|----------|-----|
| UGF Docs | https://universalgasframework.com/docs |
| UGF Testnet Guide | https://universalgasframework.com/docs/testnet |
| Mock USD Faucet | https://universalgasframework.com/faucets |
| UGF SDK (npm) | https://www.npmjs.com/package/@tychilabs/ugf-testnet-js |
| Base Sepolia Faucet | https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet |
| BaseScan | https://sepolia.basescan.org |

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Insufficient Mock USD" | Get from [UGF faucet](https://universalgasframework.com/faucets) |
| "Wrong network" | Switch MetaMask to Base Sepolia (84532) |
| "UGF SDK not loading" | Check browser console, refresh page |
| "Transaction failed" | Verify contract addresses are correct |
| "Deployment failed" | Get Base Sepolia ETH from faucet |

---

## 💡 Testing Tips

### Before Deployment (Simulation Mode)
- Open `index.html` in browser
- Connect MetaMask
- See simulated transactions with warnings
- No real blockchain interaction

### After Deployment (Live Mode)
- Configure both contract addresses
- Get Mock USD from faucet
- Real transactions on Base Sepolia
- View on BaseScan

---

## 📊 File Locations

```
Key files to edit:
├── index.html (lines 240-241)  ← Configure addresses here
├── .env                        ← Add PRIVATE_KEY for deployment
└── contracts/BadgeDrop.sol     ← NFT contract (deploy this)

Documentation:
├── README.md                   ← Project overview
├── DEPLOYMENT_GUIDE.md         ← Detailed deployment steps
└── UGF_INTEGRATION.md          ← UGF SDK reference
```

---

## 🎬 Demo Script

1. **Open dApp** → `index.html` in browser
2. **Connect** → Click "Connect Wallet"
3. **Switch** → Approve Base Sepolia network switch
4. **Select** → Click any badge card
5. **Review** → Check Mock USD fee
6. **Claim** → Click "Claim Badge"
7. **Approve** → Confirm Mock USD approval in MetaMask
8. **Wait** → Watch 4-step transaction flow
9. **Success** → Badge minted! View on BaseScan

---

## 🔐 Security Notes

- Never commit `.env` file
- Keep private keys secure
- Use testnet for development
- Verify contract addresses before mainnet
- Test thoroughly on Base Sepolia first

---

## 📞 Support

- **UGF Discord:** Check [UGF docs](https://universalgasframework.com/docs) for community links
- **Base Discord:** https://base.org/discord
- **GitHub Issues:** Report bugs in your repo

---

**Ready to launch? Follow the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)!** 🚀
