# DESIGN — Storefront

> Design is the maker's call. These tokens are now LOCKED from the maker's reference (a warm-cream editorial French-patisserie look, à la Mille-feuille). UI is token-driven so values stay easy to tweak.
>
> **Brand rule:** we wear this *visual language* on our OWN bakery brand — NOT a 1:1 clone of the reference's name, script logo, founders, or award. It's a public demo judges will open; it must not impersonate a real business.
>
> **Teammate note:** don't bake the palette/type into Tailwind config — the maker owns theme tokens. Use this file for Odette's *voice* only.

## Feeling
Warm, editorial, French-patisserie. Cream paper, espresso ink, one terracotta accent, a blush secondary. Elegant but human. The whole site sits in a soft rounded frame like a printed menu card.

## Color (from reference)
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#FBF3E9` | warm cream page |
| `--surface` | `#FFFFFF` | cards |
| `--ink` | `#2A1E16` | headings / primary text |
| `--ink-body` | `#6F6156` | body text (muted warm) |
| `--ink-faint` | `#9A8B7D` | captions / meta |
| `--accent` | `#C15F3C` | terracotta — buttons, eyebrows, price, bullets, laurel |
| `--accent-ink` | `#A44A2B` | accent hover / pressed |
| `--blush` | `#F7DBC9` | peach feature-bar band |
| `--blush-soft` | `#FBEADF` | hero stripes / soft fills |
| `--border` | `#EADFD0` | hairline borders |
| `--border-accent` | `#C15F3C` | selected/emphasis card border |
| `--sold-out` | `#9A8B7D` | sold-out treatment (desaturated warm gray) |

Single warm light theme (no dark mode for v1 — a patisserie commits to one look).

## Type
- `--font-display`: **Fraunces** (Georgia, serif fallback) — headings + editorial italics. High contrast, soft-but-sharp.
- `--font-sans`: **Inter** (system-ui fallback) — body, nav, labels.
- `--font-script`: a brush-script (e.g. **Kaushan Script**) — the logo wordmark ONLY.
- Eyebrow: Inter, 13px, UPPERCASE, letter-spacing `.12em`, `--accent`.
- Scale (px): 56 / 40 / 28 / 20 / 17 / 15 / 13. Line-height 1.15 display, 1.6 body.

## Space & shape
- Container max-width ~1160px, centered, generous side gutters; page framed in a rounded panel (`--radius-frame: 24px`).
- Radius: images `16px`, cards `12px`, buttons `8px`.
- Spacing scale (px): 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96.

## Signature motifs (carry these — they make it feel bespoke)
- **Vertical blush stripes** behind hero text.
- **Terracotta laurel** line-art badge for an award/quote moment.
- **Feature bar**: peach band, pipe-separated small-caps highlights (e.g. "Everything from scratch | Organic flour | 72-hour levain").
- Header: centered script logotype, underline text-nav, terracotta "Order" button top-right.

## Imagery
Warm, close, tactile: crumb, steam, hands, the shopfront. Rounded 16px corners. If we lack photos, use warm solid/tonal blocks — never sterile stock.

## Voice (Odette's — used in tool responses AND UI copy; teammate owns content)
First person, warm, unhurried, specific. She names things and gives reasons. Example: *"The walnut levain — I only bake it on weekends; the walnuts go in while the dough's still warm."* Never corporate.

## Anti-patterns
No SaaS blue. No cold system font for headings. No generic stock-gradient hero. No cloning the reference brand's identity.
