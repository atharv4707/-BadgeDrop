# 📦 Installation Note

## ✅ Dependency Conflict Resolved

The project has been updated to resolve the ethers.js version conflict between Hardhat and the UGF SDK.

### What Changed

**Before:**
- Hardhat required ethers v5
- UGF SDK required ethers v6
- ❌ Conflict prevented installation

**After:**
- Updated to Hardhat Toolbox v5 (supports ethers v6)
- Using ethers v6 throughout
- UGF SDK loaded from CDN in browser (no npm install needed)
- ✅ No conflicts!

### Installation

Simply run:
```bash
npm install
```

**Note:** You may see some deprecation warnings from sub-dependencies. These are normal and don't affect functionality.

### UGF SDK Usage

The UGF SDK is **loaded from CDN** in the browser, not installed via npm. This approach:
- ✅ Avoids dependency conflicts
- ✅ Works directly in the browser
- ✅ Always uses the latest version
- ✅ No build step required

The SDK is automatically loaded when you open `index.html` via the `initUGF()` function.

### For Deployment

The contract deployment uses ethers v6 syntax:
```javascript
const badgeDrop = await BadgeDrop.deploy();
await badgeDrop.waitForDeployment();
const address = await badgeDrop.getAddress();
```

### For Testing

Tests also use ethers v6 syntax and work seamlessly:
```bash
npm test
```

---

**Everything is ready to go!** Follow the [GETTING_STARTED.md](GETTING_STARTED.md) guide to deploy your dApp.
