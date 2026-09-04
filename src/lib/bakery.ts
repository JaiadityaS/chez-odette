// ─────────────────────────────────────────────────────────────────────────────
// THE FROZEN SEAM (see docs/CONTRACT.md) — now filled with real Amélie content.
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

// ── Amélie's real menu. One item (walnut levain) is genuinely sold out today —
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
      "This is my everyday loaf. The starter came out of my mother's kitchen and it's older than the building itself. I let it proof overnight so the crust really cracks when you cut in.",
    tags: ['everyday', 'sharing'],
    imageHint: 'round golden sourdough, floured top',
  },
  {
    id: 'walnut-levain',
    image: '/images/walnut.jpg',
    name: 'Walnut levain',
    price: 9,
    soldOut: true, // genuinely gone for today (the honest sold-out state)
    story:
      "I only bake this one on weekends. I fold the walnuts in while the dough is still warm so they toast from the inside. My grandmother used to make it every year for her wedding anniversary.",
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
      "Just flour, water, salt and time. That's what the law says and it's how I'd do it anyway. I bake them twice a day, so there's usually a warm one waiting on the counter.",
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
      "A big country round with a bit of rye in it for depth. This is the one I'd pick for a long dinner with people you like. It keeps for days and it's lovely toasted.",
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
      "Dense and dark, with sunflower and flax, and a long slow ferment that gives it a gentle sourness. It's my husband's favourite, so I'll probably never stop making it.",
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
      "I laminate these by hand with proper French butter and fold them the night before. Come by at seven and you'll get them before anyone else does.",
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
    "I'm Amélie. I've been opening these shutters at four in the morning since 1974, " +
    "and honestly I've lost count of the years. The starter I bake with is older than " +
    "the building. My mother kept it going, and her mother before her, and now it's mine " +
    "to feed. I don't make a lot. Most days I've sold out by the afternoon, and I'd rather " +
    "that than have bread sitting around that I'm not proud of. When you buy a loaf from " +
    "me, you're buying it from me. Nobody stands in the middle taking their cut."
  )
}

export function checkAvailability(productId: string): AvailabilityResult {
  const p = PRODUCTS.find((x) => x.id === productId)
  if (!p) return { available: false, note: "I don't bake that one, I'm afraid." }
  return p.soldOut
    ? { available: false, note: `The ${p.name.toLowerCase()} has gone for today. Come by early tomorrow and I'll have more.` }
    : { available: true, note: `Yes, there's fresh ${p.name.toLowerCase()} on the counter right now.` }
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
  // What a marketplace would have skimmed (~30%) — the money Amélie keeps.
  const keptFromAggregator = Math.round(subtotal * 0.3 * 100) / 100
  const orderId = 'ODT-' + Math.random().toString(36).slice(2, 7).toUpperCase()
  const names = lines.map((l) => `${l.qty}× ${l.name}`).join(', ')
  const how = input.fulfillment === 'delivery' ? 'delivery' : 'pickup'
  const summary = names
    ? `Merci ${contact.name || 'friend'}! I've put your ${names} aside for ${how} ${input.when ?? 'soon'}. I'll wrap it up warm with your name on it.`
    : `Merci, your order's in.`

  ORDERS.set(orderId, { orderId, status: 'confirmed', summary })
  return { orderId, status: 'confirmed', summary, keptFromAggregator }
}

export function getOrderStatus(orderId: string): { orderId: string; status: string; summary: string } {
  return (
    ORDERS.get(orderId) ?? {
      orderId,
      status: 'not_found',
      summary: "I can't find that order. Are you sure that's the right number?",
    }
  )
}

export function joinRegulars(contact: { name: string; phone?: string; email?: string }): {
  ok: boolean
  message: string
} {
  return {
    ok: true,
    message: `Welcome to the regulars, ${contact.name}. I'll drop you a line the day the walnut levain comes out. You'll hear it from me, not from some app.`,
  }
}
