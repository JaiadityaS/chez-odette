// ─────────────────────────────────────────────────────────────────────────────
// Odette's voice + the COMPUTED occasion recommendation (part of the honest
// "true failure surface" — this reasoning is NOT printed on the page, so a
// blind/vision agent can't get it; only the WebMCP tool can). See docs/CONTRACT.md.
// Backend (Teammate) owns this file. UI (You) only imports recommendForOccasion.
// ─────────────────────────────────────────────────────────────────────────────

import { getTodaysBake, type Product } from './bakery'

export type Recommendation = { item: Product; inOdettesVoice: string }

export function recommendForOccasion(input: { occasion: string; guests: number; prefs?: string }): Recommendation {
  // PLACEHOLDER logic — Teammate: make this genuinely reason over tags/occasion/
  // guests/prefs and speak in Odette's voice. Keep it computed, not a lookup of
  // text that already appears on the page.
  const bake = getTodaysBake()
  const match =
    bake.find((p) => (p.tags ?? []).some((t) => input.occasion.toLowerCase().includes(t))) ??
    bake.find((p) => !p.soldOut) ??
    bake[0]

  return {
    item: match,
    inOdettesVoice: `PLACEHOLDER — for ${input.occasion} with ${input.guests}, I’d send you home with the ${match.name.toLowerCase()}. ${match.story}`,
  }
}
