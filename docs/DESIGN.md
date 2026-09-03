# DESIGN — Chez Odette

> Documented from the shipped code (`src/app/globals.css` + `src/components/ui/*`), not intentions. Warm neighbourhood-bakery world: brick-red + sage-green + cream. Single warm light theme (no dark mode). Token-driven via Tailwind v4 `@theme`.

## Feeling
Warm, editorial, hand-made French bakery. Cream paper, brick-red serif headings, sage-green accents for "moments" and calls-to-action, real food photography. Elegant but human — a neighbourhood shop with a person behind the counter, not a chain.

## Color (Tailwind v4 `@theme` tokens in `globals.css`)
| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#f4ede0` | page cream (body bg) |
| `--color-surface` | `#fbf6ec` | cards, alternating sections |
| `--color-ink` | `#33271e` | dark warm-brown text / non-red headings |
| `--color-body` | `#6b5b4c` | body copy |
| `--color-faint` | `#9a8877` | meta, captions |
| `--color-brick` | `#a83c2f` | PRIMARY — nav bar, buttons, headings, prices |
| `--color-brick-ink` | `#8a3021` | button hover / pressed |
| `--color-sage` | `#e3e7cd` | soft sage card fill ("for every moment") |
| `--color-sage-mid` | `#c8d0a3` | CTA block fill |
| `--color-sage-deep` | `#6c7844` | eyebrow labels, "kept from aggregators" figure |
| `--color-line` | `#e6dcc7` | hairline borders |

## Type
- `--font-display`: **Fraunces** (Georgia serif fallback) — all headings + editorial italics. High-contrast, warm.
- `--font-sans`: **Inter** (system-ui fallback) — body, nav, labels, buttons.
- Headings default to **brick red** (`globals.css` `h1,h2,h3`); override to `text-ink` for softer section titles (Welcome, CtaBlock, ProductCard).
- `.eyebrow`: Inter, 12px, uppercase, letter-spacing `.16em`, `--color-sage-deep`.

## Space & shape
- Full-width stacked sections (no framed panel); inner container `max-w-6xl` / `max-w-3xl` centered, `px-6`.
- Section rhythm: `py-16` (major), `py-12` (CTA). Alternating `bg-paper` / `bg-surface`.
- Radius: images `--radius-img: 16px`, cards `--radius-card: 14px`, buttons `--radius-btn: 8px`.

## Sections (homepage)
Header (brick bar, wordmark + nav + Order) → Hero (Odette first-person headline + two CTAs + wide photo) → Welcome (story) → TodaysBake (photo product cards, sold-out state, order-confirm dialog) → ForEveryMoment (4 sage cards) → Testimonial (stars + quote) → CtaBlock (sage-mid block) → Footer (brick). `OrderConfirmation` toast listens for the `storefront:order` event.

## Imagery
Real warm food photography (CC0, in `public/images/`): `table` (hero flat-lay), `sourdough`, `walnut`, `baguette`, `campagne`, `rye`, `croissant`, `gathering`, `hamper`. `object-cover` in fixed-aspect rounded containers. Sold-out items render grayscaled.

## Voice (Odette's — UI copy AND WebMCP tool responses)
First person, warm, unhurried, specific; she names things and gives reasons. Currency is **€** (French bakery on Rue du Levain). Example: *"The walnut levain — I only bake it on weekends; the walnuts go in while the dough's still warm."* Never corporate; the front door speaks in her voice too, not agency voice.

## Anti-patterns
No SaaS blue. No cold system font for headings. No agency-voice hero. No `$` (use €). No foreign-language placeholder copy left in. No cloning a real business's identity.
