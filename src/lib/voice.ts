// ─────────────────────────────────────────────────────────────────────────────
// Amélie's voice + the COMPUTED occasion recommendation.
// This reasoning is NOT printed anywhere on the page — it accounts for the
// occasion, guest count, preferences AND live availability (it won't recommend
// a sold-out loaf; it says so and offers the best available instead). A
// screenshot agent can't reproduce this; only the WebMCP tool can. (PRD MUST #6)
// ─────────────────────────────────────────────────────────────────────────────

import { getTodaysBake, type Product } from './bakery'

export type Recommendation = { item: Product; inRosasVoice: string }

export function recommendForOccasion(input: {
  occasion: string
  guests: number
  prefs?: string
}): Recommendation {
  const occasion = input.occasion ?? ''
  const guests = Number.isFinite(input.guests) ? input.guests : 1
  const occ = occasion.toLowerCase()
  const pref = (input.prefs ?? '').toLowerCase()

  // Occasion → the tags Amélie would reach for.
  const wants: string[] = []
  if (/anniversar|romantic|date|love/.test(occ)) wants.push('anniversary', 'celebration')
  if (/celebrat|birthday|party|friends|gather/.test(occ)) wants.push('celebration', 'sharing')
  if (/dinner|table|host|guest|supper/.test(occ)) wants.push('dinner', 'sharing')
  if (/breakfast|morning|brunch/.test(occ)) wants.push('morning', 'breakfast')
  if (/everyday|toast|sandwich|lunch|daily/.test(occ)) wants.push('everyday')
  if (guests >= 6) wants.push('sharing', 'dinner')
  if (wants.length === 0) wants.push('everyday')

  const avoidNuts = /no nut|nut-free|nut free|allerg|without nut/.test(pref)

  const bake = getTodaysBake()
  const candidates = bake.filter((p) => !(avoidNuts && (p.id === 'walnut-levain')))
  const score = (p: Product) =>
    (p.tags ?? []).reduce((s, t) => s + (wants.includes(t) ? 1 : 0), 0)

  const ranked = [...candidates].sort((a, b) => score(b) - score(a))
  const bestOverall = ranked[0]
  const available = ranked.filter((p) => !p.soldOut)
  const pick = available[0] ?? ranked[0]

  const soldOutNote =
    bestOverall && bestOverall.soldOut && bestOverall.id !== pick.id
      ? `The ${bestOverall.name.toLowerCase()} would've been my first pick, but it's gone for today. `
      : ''

  const guestNote =
    guests >= 6
      ? ` For ${guests} of you, get two. Nobody ever complained about too much bread.`
      : guests > 1
        ? ` One should be plenty for ${guests}.`
        : ''

  const inRosasVoice =
    `${soldOutNote}For ${occasion || 'today'}, I'd send you home with the ` +
    `${pick.name.toLowerCase()}. ${pick.story}${guestNote}`

  return { item: pick, inRosasVoice }
}
