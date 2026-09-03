// ─────────────────────────────────────────────────────────────────────────────
// THE FROZEN SEAM (see docs/CONTRACT.md)
// UI (You) imports these to render. Backend (Teammate) fills the real bodies.
// The stub returns PLACEHOLDER data so the UI looks alive while both build.
// Do NOT change the exported types/signatures without telling the other person.
// ─────────────────────────────────────────────────────────────────────────────

export type Product = {
  id: string
  name: string
  price: number
  soldOut: boolean
  story: string
  tags?: string[]
  imageHint?: string
}

export type AvailabilityResult = { available: boolean; note: string }

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
  summary: string
  keptFromAggregator: number
}

// ── PLACEHOLDER DATA (Teammate: replace with Odette's real menu, story, stock) ──
const PLACEHOLDER: Product[] = [
  {
    id: 'walnut-levain',
    name: 'Walnut levain',
    price: 9,
    soldOut: true, // the live sold-out state that a blind/vision agent will misread
    story: 'PLACEHOLDER — Odette only bakes this on weekends; walnuts go in while the dough is still warm.',
    tags: ['anniversary', 'celebration'],
    imageHint: 'dark crust loaf, walnuts',
  },
  {
    id: 'country-sourdough',
    name: 'Country sourdough',
    price: 8,
    soldOut: false,
    story: 'PLACEHOLDER — the everyday loaf, from the starter older than the building.',
    tags: ['everyday'],
    imageHint: 'round golden sourdough',
  },
]

export function getTodaysBake(): Product[] {
  return PLACEHOLDER // Teammate: return the real day's bake
}

export function getStory(): string {
  return 'PLACEHOLDER — Odette wakes at 4am. Her grandmother’s starter is older than the building.' // Teammate: the real story
}

export function checkAvailability(productId: string): AvailabilityResult {
  const p = PLACEHOLDER.find((x) => x.id === productId)
  if (!p) return { available: false, note: 'PLACEHOLDER — I don’t have that one.' }
  return p.soldOut
    ? { available: false, note: `PLACEHOLDER — the ${p.name.toLowerCase()} went by 9am, I’m sorry.` }
    : { available: true, note: `PLACEHOLDER — yes, fresh ${p.name.toLowerCase()} today.` }
}

// Order handling — Teammate wires this to src/lib/orders.ts + /api/orders and
// dispatches the 'storefront:order' event (see docs/CONTRACT.md).
export function placeOrder(input: OrderInput): OrderConfirmation {
  return {
    orderId: 'PLACEHOLDER-0001',
    status: 'confirmed',
    summary: 'PLACEHOLDER — order confirmed. Teammate replaces with Odette’s voice.',
    keptFromAggregator: 0,
  }
}

export function getOrderStatus(orderId: string): { orderId: string; status: string; summary: string } {
  return { orderId, status: 'confirmed', summary: 'PLACEHOLDER — ready for pickup.' }
}

export function joinRegulars(contact: { name: string; phone?: string; email?: string }): { ok: boolean; message: string } {
  return { ok: true, message: `PLACEHOLDER — welcome to the regulars, ${contact.name}.` }
}
