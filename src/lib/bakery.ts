// ─────────────────────────────────────────────────────────────────────────────
// THE FROZEN SEAM (see docs/CONTRACT.md) — now filled with real Odette content.
// Types/signatures are frozen; bodies are real.
// ─────────────────────────────────────────────────────────────────────────────

export type Product = {
  id: string
  name: string
  price: number
  soldOut: boolean
  story: string
  tags?: string[]
  imageHint?: string
  image?: string
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

// ── Odette's real menu. One item (walnut levain) is genuinely sold out today —
// this is the live-availability truth the WebMCP tools report reliably and a
// screenshot agent tends to get wrong (see docs/PRD.md MUST #6). ──
const PRODUCTS: Product[] = [
  {
    id: 'country-sourdough',
    image: '/images/sourdough.jpg',
    name: 'Country sourdough',
    price: 8,
    soldOut: false,
    story:
      "My everyday loaf. The starter came from my mother's kitchen — it's older than this building. Proofed overnight so the crust sings when you cut it.",
    tags: ['everyday', 'sharing'],
    imageHint: 'round golden sourdough, floured top',
  },
  {
    id: 'walnut-levain',
    image: '/images/walnut.jpg',
    name: 'Walnut levain',
    price: 9,
    soldOut: true, // gone for today — the honest sold-out state
    story:
      "I only bake this on weekends. The walnuts go in while the dough is still warm, so they toast from the inside. My grandmother made it for her own anniversary.",
    tags: ['anniversary', 'celebration', 'weekend'],
    imageHint: 'dark crusted loaf studded with walnuts',
  },
  {
    id: 'baguette-tradition',
    image: '/images/baguette.jpg',
    name: 'Baguette de tradition',
    price: 4,
    soldOut: false,
    story:
      "Flour, water, salt, time — nothing else, by law and by love. Baked twice a day so there's always one still warm at the counter.",
    tags: ['everyday', 'morning'],
    imageHint: 'crisp golden baguette',
  },
  {
    id: 'pain-de-campagne',
    image: '/images/campagne.jpg',
    name: 'Pain de campagne',
    price: 9,
    soldOut: false,
    story:
      "A big country round with a little rye for depth. This is the loaf for a long table and a slow dinner — it keeps for days and toasts beautifully.",
    tags: ['sharing', 'dinner', 'everyday'],
    imageHint: 'large rustic round, scored cross',
  },
  {
    id: 'seeded-rye',
    image: '/images/rye.jpg',
    name: 'Seeded rye',
    price: 8,
    soldOut: false,
    story:
      "Dense, dark and honest — sunflower and flax, a long ferment for that gentle sourness. My husband's favourite, so I never stop making it.",
    tags: ['hearty', 'everyday'],
    imageHint: 'dark seeded rye loaf',
  },
  {
    id: 'butter-croissant',
    image: '/images/croissant.jpg',
    name: 'Butter croissant',
    price: 4.5,
    soldOut: false,
    story:
      "Laminated by hand with proper French butter, folded the night before. Come at seven and you'll catch them before anyone else does.",
    tags: ['morning', 'breakfast'],
    imageHint: 'flaky golden croissant',
  },
]

// In-memory order store (demo only — no DB, no real payments).
const ORDERS = new Map<string, { orderId: string; status: string; summary: string }>()

export function getTodaysBake(): Product[] {
  return PRODUCTS
}

export function getStory(): string {
  return (
    "I'm Odette. I've opened these shutters at four in the morning for longer than " +
    "I care to admit. The starter I bake with is older than this building — my mother " +
    "fed it, and hers before that. I don't make much, and I sell out most days, because " +
    "I'd rather bake a little I'm proud of than a lot I'm not. When you buy a loaf here, " +
    "it comes from my hands to yours — no shelf, no middleman, no stranger taking a cut."
  )
}

export function checkAvailability(productId: string): AvailabilityResult {
  const p = PRODUCTS.find((x) => x.id === productId)
  if (!p) return { available: false, note: "I don't bake that one, I'm afraid." }
  return p.soldOut
    ? { available: false, note: `The ${p.name.toLowerCase()} is gone for today — come early tomorrow.` }
    : { available: true, note: `Yes — fresh ${p.name.toLowerCase()} on the counter right now.` }
}

export function placeOrder(input: OrderInput): OrderConfirmation {
  const items = Array.isArray(input.items) ? input.items : []
  const contact = input.contact ?? { name: 'friend' }
  const lines = items
    .map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.id)
      return p ? { name: p.name, qty: it.qty, price: p.price } : null
    })
    .filter((l): l is { name: string; qty: number; price: number } => l !== null)

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  // What a marketplace would have skimmed (~30%) — the money Odette keeps.
  const keptFromAggregator = Math.round(subtotal * 0.3 * 100) / 100
  const orderId = 'ODT-' + Math.random().toString(36).slice(2, 7).toUpperCase()
  const names = lines.map((l) => `${l.qty}× ${l.name}`).join(', ')
  const how = input.fulfillment === 'delivery' ? 'delivery' : 'pickup'
  const summary = names
    ? `Merci, ${contact.name || 'friend'} — I've set aside your ${names} for ${how} ${input.when ?? 'soon'}. It'll be wrapped warm with your name on it.`
    : `Merci — your order is in.`

  ORDERS.set(orderId, { orderId, status: 'confirmed', summary })
  return { orderId, status: 'confirmed', summary, keptFromAggregator }
}

export function getOrderStatus(orderId: string): { orderId: string; status: string; summary: string } {
  return (
    ORDERS.get(orderId) ?? {
      orderId,
      status: 'not_found',
      summary: "I can't find that order — are you sure of the number?",
    }
  )
}

export function joinRegulars(contact: { name: string; phone?: string; email?: string }): {
  ok: boolean
  message: string
} {
  return {
    ok: true,
    message: `Welcome to the regulars, ${contact.name}. I'll let you know the day the walnut levain comes out — you'll hear it from me, not from an app.`,
  }
}
