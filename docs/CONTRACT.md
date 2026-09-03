# CONTRACT — the frozen seam

> This is the ONLY place your two halves touch. Freeze it. If either of you needs to change a signature here, that's the one thing you must message each other about. Everything else, build freely.
>
> **UI (You)** imports these functions to render. **Backend (Teammate)** implements them for real. Both sides build against the shapes below, so the files connect with no merge conflict.

## The data shapes (types)
```ts
export type Product = {
  id: string
  name: string
  price: number          // dollars, e.g. 8.5
  soldOut: boolean
  story: string          // Odette's reason for making it (her voice)
  tags?: string[]        // e.g. ['anniversary','celebration','everyday']
  imageHint?: string     // short description UI can use for a placeholder block
}

export type AvailabilityResult = { available: boolean; note: string } // note is in Odette's voice
export type Recommendation   = { item: Product; inOdettesVoice: string }  // inOdettesVoice is COMPUTED, not printed on the page

export type OrderInput = {
  items: { id: string; qty: number }[]
  fulfillment: 'pickup' | 'delivery'
  when: string
  contact: { name: string; phone?: string; email?: string }
  joinRegulars?: boolean
}
export type OrderConfirmation = {
  orderId: string
  status: 'confirmed'
  summary: string            // in Odette's voice
  keptFromAggregator: number // the ~30% Odette did NOT lose — used in the contrast beat
}
```

## The functions (the seam — signatures are FROZEN)
```ts
getTodaysBake(): Product[]
getStory(): string
recommendForOccasion(input: { occasion: string; guests: number; prefs?: string }): Recommendation
checkAvailability(productId: string): AvailabilityResult
placeOrder(input: OrderInput): OrderConfirmation
getOrderStatus(orderId: string): { orderId: string; status: string; summary: string }
joinRegulars(contact: { name: string; phone?: string; email?: string }): { ok: boolean; message: string }
```
These live in `src/lib/bakery.ts` and `src/lib/voice.ts` (stubs already created). Teammate fills the bodies; you (UI) import and call them.

## The UI-notification event (so the confirmation shows up in your UI without sharing a file)
When an order is placed (by an agent via WebMCP, or by a human), the **backend** dispatches:
```ts
window.dispatchEvent(new CustomEvent('storefront:order', { detail: confirmation /* OrderConfirmation */ }))
```
Your **UI** listens for it and shows the confirmation panel:
```ts
useEffect(() => {
  const h = (e: Event) => setOrder((e as CustomEvent).detail)
  window.addEventListener('storefront:order', h)
  return () => window.removeEventListener('storefront:order', h)
}, [])
```
This is the whole integration between agent-action and your UI. No shared file.

## The one shared file rule
- `src/app/layout.tsx` — the seed already mounts `<StorefrontTools/>` and `<ToolHarness/>`. **You** may edit it for fonts/theme. **Teammate** never edits it (all his tool logic lives in `StorefrontTools.tsx`).
- Nobody edits a file the other person owns. See SPLIT.md.
