// add-to-nextjs-marketplace.js
// SNIPPET: Injects the 2 NEW specialized SKUs (cyberbeast-fund-150doge + tesla-trek-199-bundle) 
// into nextlify/app/marketplace/page.tsx (or creation flow) using generateDogePayForSKU style + exact patterns from nextlify/lib/dogepay.ts
// Drop this into the component (after imports, near teslaOffers or listings array).
// Replace DEMO addrs with real (sync from .env / dogepay.ts / receivers).
// Usage: import { generateDogePayForSKU } from '@/lib/dogepay'; then use or hardcode equivalent URIs for static marketplace cards.
// These tie to master bundles in hour1-ultimate-master-bundle/ and new wave2 receivers.

// 1. New SKU definitions (mirrors DOGE_PRODUCT_SKUS + generateDogePayForSKU logic exactly)
const newWave2Listings = [
  {
    id: "cyberbeast-fund-150doge",
    title: "CYBERBEAST FUND 150 — 1.25M Goal Tier",
    priceDOGE: 150,
    category: "fund",
    description: "Dedicated D8 fund receipt. Visual goal tracker. Direct to Cyberbeast 1.25M DOGE velocity. Includes 50% Trek revenue tie where applicable.",
    allocationNote: "Pure fund contribution. Ties to dashboard Cyberbeast tracker + Plaid velocity.",
    // URI built exactly as generateDogePayForSKU + generateCyberbeastFundDogePayLink (but fixed 150 + dedicated addr)
    dogePay: {
      uri: "dogecoin:D8CyberbeastFundAddressHereFor1.25MGoal1234567890?amount=150&message=Cyberbeast%20Fund%20150%20-%20Cyberbeast%20Fund%20%E2%80%A2%20Ramp%20to%201.25M%20DOGE",
      address: "D8CyberbeastFundAddressHereFor1.25MGoal1234567890",
      amount: 150,
      memo: "Cyberbeast Fund 150 - Cyberbeast Fund • Ramp to 1.25M DOGE",
      skuId: "fund-direct-150-wave2"
    },
    receiverFile: "cyberbeast-fund-150doge-receiver.html",
    afterPay: "Use on-chain-verifier.html or batch-verifier.html (hour1-tx-wave2/) to confirm addr+amt+exact memo match, then deliver ZIP."
  },
  {
    id: "tesla-trek-199-bundle",
    title: "TESLA TREK 199 BUNDLE — Master Bundle",
    priceDOGE: 199,
    category: "merch",
    description: "199 DOGE master bundle (D7 general + D9 fleet mix). Explicit 50% Trek revenue allocation to cat 124303201/33968299. Includes master catalog goods + trek pass style assets.",
    allocationNote: "50% of receipt to Tesla Trek Revenue cat 124303201/33968299 (Plaid cashflow tagged). D9 portion for Fleet API sustain overage.",
    dogePay: {
      uri: "dogecoin:D7Y7v5vL3kQvN9pX2mR8sT4wU6iO0pA1sD3fG5hJ7kL?amount=199&message=Tesla%20Trek%20199%20Bundle%20-%20Master%20Bundle%20%E2%80%A2%2050%25%20to%20Revenue%20Cat%20124303201%2F33968299",
      address: "D7Y7v5vL3kQvN9pX2mR8sT4wU6iO0pA1sD3fG5hJ7kL", // D7 main (mix D9 in notes for fleet portion)
      amount: 199,
      memo: "Tesla Trek 199 Bundle - Master Bundle • 50% to Revenue Cat 124303201/33968299",
      skuId: "merch-trek-199-wave2",
      secondaryAddrNote: "D9TeslaFleetAPISustainBillingOverage10Plus12345 (fleet mix component)"
    },
    receiverFile: "tesla-trek-199-bundle-receiver.html",
    afterPay: "Use on-chain-verifier.html or batch-verifier.html (hour1-tx-wave2/) to confirm addr+amt+exact memo match, then deliver ZIP."
  }
];

// 2. Injection example (paste inside marketplace page.tsx or equivalent listing renderer)
// After: const teslaOffers = getBestOfNTeslaOffers(); or inside useEffect / listings state:
// const wave2SKUs = newWave2Listings.map(l => ({
//   ...l,
//   payLink: l.dogePay,  // or call generateDogePayForSKU(l.dogePay.skuId) after adding to lib/dogepay.ts DOGE_PRODUCT_SKUS
// }));
// 
// Then render cards:
// {wave2SKUs.map((sku) => (
//   <div key={sku.id} className="glass rounded-3xl p-5 border border-[#E31937]/30 cyber-card">
//     <div className="font-bold text-xl">{sku.title}</div>
//     <div className="text-[#E31937] text-3xl font-mono tabular-nums mt-1">{sku.priceDOGE} <span className="text-sm">DOGE</span></div>
//     <div className="text-xs mt-2 text-white/60">{sku.description}</div>
//     {sku.allocationNote && <div className="mt-1 text-[10px] text-emerald-400 font-semibold">{sku.allocationNote}</div>}
//     <div className="mt-3 text-[10px] mono break-all bg-black/60 p-2 rounded">{sku.dogePay.uri}</div>
//     <button onClick={() => { navigator.clipboard.writeText(sku.dogePay.uri); /* also recordClaim(sku) */ }} className="...">COPY DOGECOIN URI</button>
//     <a href={sku.afterPay.includes('batch') ? '/wave2/batch-verifier.html' : 'transactions-closer/on-chain-verifier.html'} target="_blank" className="block mt-1 text-xs underline">AFTER PAY → VERIFY + DELIVER</a>
//   </div>
// ));

// 3. To make generateDogePayForSKU support them: edit nextlify/lib/dogepay.ts , append to DOGE_PRODUCT_SKUS:
// { id: "fund-direct-150-wave2", title: "Cyberbeast Fund 150 — Wave2", priceDOGE: 150, category: "fund", description: "...", allocationNote: "..." },
// { id: "merch-trek-199-wave2", title: "Tesla Trek 199 Bundle — Master", priceDOGE: 199, category: "merch", description: "...", allocationNote: "50% to Revenue Cat 124303201/33968299" },
// Then generateDogePayForSKU('fund-direct-150-wave2') will produce matching URI/memo (override addr if dedicated needed).
// For dedicated D8 in fund SKU, enhance generateCyberbeast... or pass addressOverride in the new SKU path.

// 4. Also inject into hour1-tx-wave2/ catalog for batch-verifier.js expectations list + master bundle refs (199 DOGE master from ultimate + 150 fund).

// 5. DEMO ONLY NOTE (truth): All D7Y7 / D8 / D9 are placeholders. Real inflows: replace EVERY occurrence in this snippet + 2 *-receiver.html + batch-verifier + on-chain-verifier + dogepay.ts + .env + receivers in all hour1-* dirs. Host/serve. Buyer sends EXACT amount + memo. You confirm match in verifier. THEN deliver ZIP from hour1-ultimate-master-bundle/ or goods zips.

// Run in nextlify context or browser console for quick test after addr sync.
console.log("[add-to-nextjs-marketplace] 2 new wave2 listings ready (cyberbeast-fund-150doge + tesla-trek-199-bundle). Use generateDogePayForSKU style for full integration. Sync addrs from transactions-closer/ + lib/dogepay.ts. See hour1-tx-wave2/ for dedicated receivers + batch verifier + delivery checklist.");