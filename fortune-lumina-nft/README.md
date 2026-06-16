# fortune-lumina-nft (minimal hardhat for Lumina)

Scaffolded per fortune-cookie-launch + hardhat-base-nft SKILL.md from tesla-fleet-client-main.

## Quick start for buyer / user (edit 1 address then claim in <30min)
1. cp .env.example .env
2. Add your DEPLOYER_PRIVATE_KEY + SIGNER_PRIVATE_KEY (testnet keys OK on baseSepolia).
3. npm install
4. npm run compile
5. npm run deploy:sepolia   # captures CONTRACT_ADDRESS
6. Update .env CONTRACT_ADDRESS + CHAIN_ID=84532
7. npm run prepare   # (with your asset base URL)
8. npm run sign:demo   # or real sign after keys
9. Drop signed-vouchers-demo.json + claim-mint.html into Lumina or host standalone.
10. Buyer: go to /claims or standalone, connect Base Sepolia wallet, paste voucher sig, call mint (gas ~0.0001 ETH).

## Commands (exact, after keys)
- `npm run prepare` or `node scripts/prepare-assets.js https://your-assets-base`
- `npm run deploy:sepolia`
- `npm run sign:demo` (instant, no key) or real after env
- `npx hardhat run scripts/deploy.ts --network baseSepolia`

Contract verified on Basescan after verify step (add BASESCAN_API_KEY).

Live Lumina (with /claims + /api/fortune/sign-voucher mock compatible): https://nextlify-iuxw4xpgy-tesla-trek.vercel.app/claims

## Demo vouchers produced
See signed-vouchers-demo.json (3 ready). Use in UI immediately (demo sigs). Replace after real deploy.

## Files
- contracts/FortuneCookieNFT.sol (MAX 10, voucher mintWithSignature)
- scripts/deploy.ts , prepare-assets.js , sign-demo-vouchers.js
- signed-vouchers-demo.json (ready to integrate)
- claim-mint.html (standalone ultra simple for buyer)

Prioritizes: buyer can pay DOGE for bundle then claim NFT voucher in next 30min after you edit CONTRACT + addr in HTML or Lumina.

## Integration note
Lumina /claims already calls /api/fortune/sign-voucher (generalized). Enhance with real CONTRACT + real sigs from this project.
