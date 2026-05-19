# BadgeDrop — UGF Integration Guide

## What this is
A gasless NFT badge claimer on Base Sepolia. Users pay a tiny Mock USD fee;
UGF routes the transaction and mints the badge. No ETH required from the user.

---

## Setup

```bash
npm install @tychilabs/ugf-testnet-js ethers
```

---

## 1. Get a gas quote

```js
import { UGFClient } from '@tychilabs/ugf-testnet-js';

const ugf = new UGFClient({ network: 'base-sepolia' });

// ABI-encode your badge mint call
const iface = new ethers.utils.Interface(['function mint(address to, uint256 badgeId)']);
const calldata = iface.encodeFunctionData('mint', [userAddress, badgeId]);

const quote = await ugf.getQuote({
  to: BADGE_CONTRACT_ADDRESS,
  data: calldata,
  from: userAddress,
});
// quote.feeInUSD — amount in Mock USD to charge the user
// quote.validFor  — seconds until quote expires
```

---

## 2. Approve Mock USD spend

```js
await ugf.approveMockUSD(signer, quote.feeInUSD);
// This sends an ERC-20 approve tx for the UGF settler contract
```

---

## 3. Settle — pay the fee, UGF executes

```js
const settleTx = await ugf.settle(signer, quote);
await settleTx.wait();
// UGF now pays the gas and calls mint() on your badge contract
```

---

## 4. Confirm execution

```js
const status = await ugf.waitForExecution(settleTx.hash);
// status.success — true if badge was minted
// status.txHash  — the destination tx hash on Base Sepolia
```

---

## Badge NFT Contract (deploy on Base Sepolia)

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
}
```

Deploy with Hardhat or Foundry on Base Sepolia (chainId 84532).

---

## Resources
- Docs: https://universalgasframework.com/docs
- Testnet quickstart: https://universalgasframework.com/docs/testnet
- Mock USD faucet: https://universalgasframework.com/faucets
- SDK: https://www.npmjs.com/package/@tychilabs/ugf-testnet-js
- React SDK: https://www.npmjs.com/package/@tychilabs/react-ugf
- GitHub: https://github.com/TychiWallet/ugf-testnet-js
