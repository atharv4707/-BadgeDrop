# 🚀 Getting Started with BadgeDrop

**Complete this in 10 minutes and have a working gasless NFT dApp!**

---

## 📋 Prerequisites

Before you start, make sure you have:

- [ ] **MetaMask** installed in your browser
- [ ] **Node.js** (v16 or higher) installed
- [ ] **Git** (optional, for version control)
- [ ] A text editor (VS Code recommended)

---

## 🎯 Step-by-Step Guide

### Step 1: Install Dependencies (2 minutes)

Open a terminal in the project folder and run:

```bash
npm install
```

This installs:
- Hardhat (Ethereum development environment)
- OpenZeppelin contracts (secure NFT implementation)
- UGF SDK (gasless transaction framework)
- Testing tools

**Expected output:** `added XXX packages` (no errors)

---

### Step 2: Set Up Environment (1 minute)

1. Copy the environment template:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` in your text editor

3. Get your MetaMask private key:
   - Open MetaMask
   - Click the three dots → Account Details
   - Click "Export Private Key"
   - Enter your password
   - **Copy the private key**

4. Paste it in `.env`:
   ```env
   PRIVATE_KEY=your_private_key_here
   ```

⚠️ **Security Warning:** Never share your private key or commit `.env` to git!

---

### Step 3: Get Base Sepolia ETH (2 minutes)

You need a small amount of ETH to deploy the contract.

1. Visit: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. Connect your MetaMask wallet
3. Click "Send me ETH"
4. Wait for confirmation (~30 seconds)

**You need:** ~0.01 ETH (free from faucet)

---

### Step 4: Deploy the Contract (2 minutes)

Run the deployment script:

```bash
npm run deploy
```

**Expected output:**
```
🚀 Deploying BadgeDrop contract to Base Sepolia...
📝 Deploying with account: 0x...
💰 Account balance: 0.05 ETH

⏳ Deploying BadgeDrop...

✅ BadgeDrop deployed successfully!
📍 Contract address: 0xABCDEF123456...
🔗 View on BaseScan: https://sepolia.basescan.org/address/0x...
```

**Copy the contract address!** You'll need it in the next step.

---

### Step 5: Configure the dApp (1 minute)

1. Open `index.html` in your text editor

2. Find lines 240-241 (search for "TODO"):
   ```javascript
   const MOCK_USD_ADDRESS = '0x...'; // TODO: Get from UGF docs
   const BADGE_CONTRACT = '0x...';   // TODO: Deploy BadgeDrop.sol
   ```

3. **Get Mock USD address:**
   - Visit: https://universalgasframework.com/docs
   - Look for "Mock USD Token Address" for Base Sepolia
   - Copy the address

4. **Update both addresses:**
   ```javascript
   const MOCK_USD_ADDRESS = '0xYourMockUSDAddress';
   const BADGE_CONTRACT = '0xYourDeployedContractAddress';
   ```

5. Save the file

---

### Step 6: Get Mock USD Tokens (2 minutes)

1. Visit: https://universalgasframework.com/faucets
2. Connect your MetaMask wallet
3. Click "Get Mock USD"
4. Wait for confirmation (~30 seconds)

**You'll receive:** 100 Mock USD (enough for many badge claims)

---

### Step 7: Test the dApp (2 minutes)

1. Open `index.html` in your browser:
   - **Windows:** Double-click `index.html`
   - **Mac:** Right-click → Open With → Browser
   - **Or serve locally:** `npx http-server . -p 8080`

2. Click **"Connect Wallet"**
   - MetaMask will pop up
   - Click "Connect"
   - Approve network switch to Base Sepolia

3. **Select a badge** by clicking any badge card

4. Click **"Claim Badge"**
   - Review the Mock USD fee (~$0.01)
   - Click the button

5. **Approve transactions:**
   - First: Approve Mock USD spend (MetaMask popup)
   - Wait for UGF to process (~10-30 seconds)

6. **Success!** 🎉
   - Your badge is minted
   - View it on BaseScan
   - Check your wallet (it may take a moment to appear)

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Contract deployed to Base Sepolia
- [ ] Contract address visible on BaseScan
- [ ] `BADGE_CONTRACT` updated in `index.html`
- [ ] `MOCK_USD_ADDRESS` updated in `index.html`
- [ ] Mock USD balance shows in dApp
- [ ] Badge claim works end-to-end
- [ ] Transaction appears on BaseScan
- [ ] NFT visible in wallet (may take time)

---

## 🐛 Troubleshooting

### "Insufficient funds for gas"
**Solution:** Get more Base Sepolia ETH from the faucet

### "Insufficient Mock USD balance"
**Solution:** Visit the UGF faucet and claim tokens

### "Wrong network"
**Solution:** MetaMask should auto-switch. If not, manually switch to Base Sepolia (chain ID 84532)

### "Transaction failed"
**Solution:** 
1. Check that both addresses are correctly configured
2. Verify you have Mock USD in your wallet
3. Check browser console for error messages

### "UGF SDK not loading"
**Solution:**
1. Check your internet connection
2. Open browser console (F12) and look for errors
3. Try refreshing the page

### "Contract deployment failed"
**Solution:**
1. Ensure you have Base Sepolia ETH
2. Check that your private key is correct in `.env`
3. Verify you're connected to the internet

---

## 🎓 What Just Happened?

Let's break down what you built:

1. **Deployed an NFT contract** to Base Sepolia testnet
2. **Integrated UGF SDK** for gasless transactions
3. **Created a dApp** that lets users claim badges without ETH
4. **Tested the full flow** from quote to minting

### The Magic of UGF

Traditional NFT minting:
```
User needs ETH → Pays gas → Gets NFT
❌ Barrier: Users need ETH
```

With UGF:
```
User has Mock USD → UGF pays gas → User gets NFT
✅ No ETH needed for minting!
```

---

## 📚 Next Steps

### Learn More
- Read `README.md` for project overview
- Check `DEPLOYMENT_GUIDE.md` for detailed explanations
- Review `UGF_INTEGRATION.md` for SDK details

### Customize Your dApp
- Edit badge names and descriptions in `index.html`
- Change colors and styling in the `<style>` section
- Add more badge types (update contract and UI)
- Implement badge metadata (IPFS/Arweave)

### Test Thoroughly
- Run contract tests: `npm test`
- Test with multiple wallets
- Try claiming all badge types
- Test error scenarios

### Deploy to Mainnet (When Ready)
1. Update `hardhat.config.js` with Base mainnet config
2. Get real ETH for deployment
3. Deploy contract to Base mainnet
4. Update addresses in `index.html`
5. Test extensively before sharing

---

## 🎉 Congratulations!

You've successfully:
- ✅ Deployed a smart contract to Base Sepolia
- ✅ Integrated Universal Gas Framework
- ✅ Built a gasless NFT dApp
- ✅ Tested the complete user flow

**Your dApp is live and functional!**

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| UGF Docs | https://universalgasframework.com/docs |
| Mock USD Faucet | https://universalgasframework.com/faucets |
| Base Sepolia Faucet | https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet |
| BaseScan | https://sepolia.basescan.org |
| Your Contract | https://sepolia.basescan.org/address/YOUR_ADDRESS |

---

## 💡 Pro Tips

1. **Bookmark the faucets** — You'll use them often during testing
2. **Keep your contract address** — Save it somewhere safe
3. **Test with friends** — Get feedback on the UX
4. **Check BaseScan** — Verify all transactions
5. **Read the docs** — Understand how UGF works

---

## 🆘 Need Help?

1. **Check the docs:**
   - `README.md` — Project overview
   - `DEPLOYMENT_GUIDE.md` — Detailed instructions
   - `QUICK_REFERENCE.md` — Common issues

2. **Check the console:**
   - Open browser DevTools (F12)
   - Look for error messages
   - Check the Network tab

3. **Verify configuration:**
   - Contract address is correct
   - Mock USD address is correct
   - You have Mock USD in wallet
   - You're on Base Sepolia network

4. **Community support:**
   - UGF Discord (check UGF docs)
   - Base Discord: https://base.org/discord
   - Ethereum Stack Exchange

---

## 🚀 Ready to Share?

Your dApp is ready to use! Share it with:
- Friends and testers
- Your development team
- The Base community
- Hackathon judges
- Social media

**Share the `index.html` file or host it on:**
- GitHub Pages
- Vercel
- Netlify
- IPFS
- Your own server

---

**Happy building! 🎉**

*Questions? Check the other documentation files or reach out to the community.*
