# Lumina Transactions + Revenue Deploy Kit
Full kit + deploy logs/status saved 2026-06-15.

**LIVE DEPLOYED LUMINA (with /receive + enhanced /claims NFT notes):**
- Primary: https://nextlify-kuaxkwduj-tesla-trek.vercel.app
- Aliased: https://nextlify-topaz.vercel.app (and others)
- Project: tesla-trek/nextlify on Vercel
- Inspect / logs: see deploy-logs/
- Deploy succeeded (build + all routes static/dynamic OK). GitHub link warning was non-fatal.

**To enable REAL DOGE payments immediately:**
1. Go to Vercel dashboard for the project.
2. Settings → Environment Variables → Add (Production + Preview):
   NEXT_PUBLIC_CYBERBEAST_FUND_DOGE = your real controlled DOGE addr
   NEXT_PUBLIC_TESLA_TREK_DOGE = ...
   NEXT_PUBLIC_TESLA_FLEET_DOGE = ...
   NEXT_PUBLIC_DOGE_PAY_ADDRESS = ...
   (See nextlify/.env.example for full list + NEXT_PUBLIC_FORTUNE_CONTRACT after NFT deploy)
3. Redeploy: vercel --prod (or dashboard Redeploy Production).
4. Use https://nextlify-topaz.vercel.app/receive or /dashboard CTAs — dogecoin: URIs now point to real addrs. Wallets can pay. Verify + use receipts/.

**NFT one-hour package:** nft-launch-kit/PACKAGE-INSTRUCTIONS.md (complete, executable commands for asset-prep, baseSepolia deploy, voucher signing, integration). Patches applied where possible.

**Paywall / receive:** nextlify/app/receive/page.tsx (deployed after this kit) + standalone HTML in paywall/.

**Receipts evidence:** receipts/ (7 templates ready for real inflows).

**Deploy logs:** deploy-logs/vercel-deploy-full.log (full CLI output + URLs).

**Reference:** Copies of key Lumina files (dogepay.ts, etc.) + the new receive + claim patches for audit/reuse.

**What requires user real keys/addr vs demo:**
- DOGE real inflows: requires YOUR controlled DOGE addresses set ONLY in Vercel envs (demo placeholders currently live).
- NFT/Base: requires YOUR test EOA private key (with Base Sepolia ETH) + deploy (demo signer in kit is random/test).
- After real actions: update receipts with actual TxIDs + annotate Plaid/cashflow.
- No custody in Lumina: direct wallet-to-addr DOGE only.

**To re-deploy after envs or further patches:**
cd C:\Users\Josep\nextlify
npx vercel --prod

Full priority on enabling real/test DOGE or Base test payment in the hour: accomplished via live site + receive page + kit scripts + env instructions.

See nft-launch-kit/PACKAGE-INSTRUCTIONS.md and receipts/ for next immediate steps.
}
