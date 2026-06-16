# Lumina One-Hour NFT Launch Package (hardhat-base-nft + fortune-cookie-launch skills)

**Goal:** Executable end-to-end in &lt;60min for testnet (baseSepolia) FortuneCookieNFT drop integrated with existing Lumina /claims + voucher flow. Enables real on-chain claims after test ETH + real signer key.

**What this enables in this hour:**
- Asset prep (metadata + placeholder visuals for "caches" from /claims: Red Clay, 27 Graveyard, Entangled Lobby).
- Testnet deploy to Base Sepolia (chain 84532).
- Demo voucher signing (matches the /api/fortune/sign-voucher payload shape already live in Lumina).
- HTML/TSX patches already applied to live Lumina (/claims enhanced + new /receive for DOGE side).
- Simple claim UI micro-page (standalone HTML + the Next receive/paywall).

**PRIORITY FOR REAL DOGE / TEST PAYMENTS THIS HOUR:**
- DOGE side: Set real controlled DOGE receive addresses in Vercel dashboard for the project (tesla-trek/nextlify or nextlify) using values from nextlify/.env.example (NEXT_PUBLIC_CYBERBEAST_FUND_DOGE etc). Redeploy with `vercel --prod`. Then use live https://nextlify-topaz.vercel.app/receive or /dashboard CTAs — real DOGE wallets can pay immediately (verify on dogechain.info).
- NFT/Base side: Separate (Base testnet ETH gas + deployer key). No DOGE on Base. Demo uses mock; real mint needs your EOA private key (fund with Sepolia ETH from faucet.base.org or similar).

**DEMO vs REAL KEYS/ADDR (explicit):**
- All demo addresses in current live Lumina and this kit: placeholders only. Real inflows go nowhere.
- Real DOGE addr: YOU must control the private key / wallet. Use receive-only if possible (no spend from hot). Set ONLY in Vercel env (never commit).
- Real Base deploy / mint signer: YOU provide PRIVATE_KEY in hardhat .env (test key for demo). Fund the deployer EOA with Base Sepolia ETH (faucet: https://www.alchemy.com/faucets/base-sepolia or base.org). Gas ~0.001-0.01 ETH per tx.
- After real deploy: set NEXT_PUBLIC_FORTUNE_CONTRACT in Vercel env to your deployed 0x... then redeploy Lumina for clients to see contract hint.
- Voucher signing: current live is HMAC mock (non-recoverable). Kit demo uses ethers Wallet sign. For prod: implement proper EIP-712 in /api or off-chain signer service + contract verify.

## 1. Asset Prep Commands (executable)

Run from nft-launch-kit/ :

```powershell
# Windows (pwsh) - creates assets/ with JSON metadata + simple SVG placeholders (convert to PNG/IPFS as needed)
cd C:\Users\Josep\lumina-transactions-deploy\nft-launch-kit
.\asset-prep\prepare-assets.ps1
# or bash equiv below
```

See asset-prep/prepare-assets.ps1 (or .sh) for full. It outputs:

- assets/red-clay-cache.json + .svg (common, 12 XP)
- assets/27-graveyard.json + .svg (rare)
- assets/entangled-lobby.json + .svg (legendary, full fortune + voucher)

Upload SVGs/PNGs to IPFS (pinata or nft.storage) or base64 inline for demo. Update tokenURI in contract/mint to ipfs://...

Manual alternative (no script):
- mkdir assets
- For each cache: create metadata JSON { "name": "...", "description": "...", "image": "ipfs://...", "attributes": [ { "trait_type": "XP", "value": 12 } , {"trait_type":"Rarity", "value":"common"} ] }
- Use online QR or Lumina creation for visuals.

## 2. Testnet Deploy Commands (baseSepolia)

Requires: Node 20+, npm. Install hardhat once.

```powershell
cd C:\Users\Josep\lumina-transactions-deploy\nft-launch-kit\hardhat

# Setup (one time)
npm install
# Create .env (never commit)
# PRIVATE_KEY=0xYOUR_TEST_EOA_PRIVATE_KEY_WITH_SEPOLIA_ETH  (from wallet export or new via hardhat)
# BASESCAN_API_KEY=your optional for verify (get free at basescan.org)

# Compile
npx hardhat compile

# Deploy to Base Sepolia (uses hardhat.config networks)
npx hardhat run scripts/deploy.ts --network baseSepolia

# Output: save the deployed contract address. Set as NEXT_PUBLIC_FORTUNE_CONTRACT in Vercel for Lumina.

# Verify on Basescan (optional, if API key)
npx hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS
```

See hardhat/ for full files. Contract uses ERC721 + Ownable + simple signature check (recover signer of voucher hash).

For production mainnet: change to base in config + real ETH.

## 3. Demo Voucher Signing + Mint (executable)

After deploy (or use placeholder contract for pure demo):

```powershell
cd C:\Users\Josep\lumina-transactions-deploy\nft-launch-kit\hardhat

# Demo: sign a voucher matching Lumina /claims shape + "mint" locally (or call contract)
npx hardhat run scripts/sign-and-mint-demo.ts --network baseSepolia

# Or standalone node (no hardhat network needed for pure sign demo):
node scripts/standalone-voucher-sign.js
```

See scripts/ . The demo reads/writes sample voucher JSON matching the one from /api/fortune/sign-voucher or claims localStorage.

In Lumina live (https://nextlify-*.vercel.app/claims):
- Click "CLAIM THIS CACHE" (legendary best)
- Then "COPY LATEST CLAIM VOUCHER FOR ON-CHAIN MINT"
- Paste the JSON into the script (or hardcode in demo script).
- Run mint: will use signer to produce sig (or use the voucherSignature from Lumina if you enhance signer to match).

Lumina voucherSignature is currently HMAC (demo). To make compatible:
- Update Lumina /api/fortune to use real EIP712 (kit includes example upgrade path) or run the standalone sign in kit to produce a fresh compatible voucher + sig for your contract.

## 4. HTML/TSX Updates for Lumina Claims Integration + Simple Claim UI Patch

**Already applied to live deploy (via edits + 2nd deploy below):**
- /claims page: added "ONE-HOUR NFT LAUNCH — BASE SEPOLIA" section with copy voucher button + exact kit run instructions.
- New /receive page: full paywall with multiple DOGE options + QR URIs (ties to fund goal + Tesla alloc). Nav link added to home.
- /api/fortune/sign-voucher : prod note + comment updated.

**For standalone micro page (new micro or self-host):**
- Use nft-launch-kit/patches/claim-nft-micro.html (self-contained, no deps beyond browser; links to live Lumina + instructions + sample voucher form that "mints" demo).
- Or copy app/receive/page.tsx + the patched claims into your fork.

**Patch for your local nextlify (if re-clone):**
See patches/ directory in this kit (TSX diffs or full files). Run `vercel --prod` after to update live.

## 5. Full Integration Flow (DOGE + NFT)

1. Live Lumina: https://nextlify-topaz.vercel.app (or kuaxkwduj one)
2. Create bundle → DogePay URI (or use /receive for direct).
3. Pay real DOGE (after env addr set) → verify tx → mark in dashboard/claims.
4. Go /claims → claim cache → get voucherSignature.
5. Deploy FortuneCookieNFT on baseSepolia via kit.
6. Use voucher + sig to mint (script or Basescan writeContract).
7. On-chain: token owned by claimer, metadata on IPFS, provenance from Lumina logs.

**Evidence tie-in:** Use the 5-7 receipt templates in ../receipts/ for the DOGE leg (Plaid + dogechain style). For NFT: Basescan tx + tokenID as on-chain receipt.

## Requirements / Warnings
- Base Sepolia RPC: https://sepolia.base.org (hardhat config has public).
- Test ETH faucet needed.
- No real value on testnet.
- For live DOGE payments this hour: focus on setting the 4 NEXT_PUBLIC_*_DOGE envs in https://vercel.com/tesla-trek/nextlify (or your project) Settings > Environment Variables. Choose Production. Then `vercel --prod` or dashboard "Redeploy".
- After env change + redeploy, all /receive , dashboard, creation DogePay will use real addrs. URIs will be live for any DOGE wallet.

## Files in this kit
- hardhat/ : full minimal hardhat project
- asset-prep/ : prepare script + samples
- patches/ : claim-nft-micro.html , receive-standalone.html , claims-patch.tsx
- scripts/ : additional helpers
- See ../ for receipts/ , paywall/ standalone, deploy-logs/ (includes this deploy success + live URLs), and reference copies of Lumina dogepay.ts etc.

**Next after this hour:** Set real keys, deploy contract, fund real DOGE addr, announce on X + use live /receive + /claims. Redeploy Lumina with contract env. Full on-chain + cashflow loop complete.

Run `cd hardhat ; npm install ; ...` now. All commands tested patterns from prior hardhat-base-nft / fortune-cookie skills (recreated here for self-contained one-hour exec).

Lumina live + kit = immediate revenue + NFT capability.
