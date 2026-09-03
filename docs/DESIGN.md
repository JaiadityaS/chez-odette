# DESIGN — Chez Odette

> Documented from the shipped code (`src/app/globals.css` + `src/components/ui/*`), not intentions. French-editorial world à la *The French Dispatch*: warm homey cream, near-black ink + a black masthead, dusty rose (vieux rose), warm lamp-orange glow. Single warm light theme. Token-driven via Tailwind v4 `@theme`.

## Feeling
Homey French-editorial bakery — part neighbourhood boulangerie, part warm newspaper. Cream paper ground, heavy black Didone headlines, a condensed masthead voice, olive and deep wood-green bands, and a single warm lamp-orange accent that glows like a shop lamp at dusk. Editorial and characterful, never clinical.

## Color (Tailwind v4 `@theme` tokens in `globals.css`)
| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#efe7d4` | warm homey cream (body bg) |
| `--color-surface` | `#f8f2e4` | warm white (cards) |
| `--color-ink` | `#17130d` | warm near-black — headings, black masthead |
| `--color-body` | `#4b4438` | warm dark taupe body |
| `--color-faint` | `#8c836f` | meta, captions |
| `--color-brick` | `#d5883a` | warm LAMP-ORANGE — buttons, prices, accent (name kept for inheritance) |
| `--color-brick-ink` | `#b56d26` | lamp hover / pressed |
| `--color-wood` | `#6e3440` | deep dusty rose (vieux rose) — WhyDirect band, footer, scrollbar, awning |
| `--color-olive` | `#8f4b59` | dusty rose — eyebrow labels, marquee marks |
| `--color-sage` | `#f2d9dd` | soft pink fill (marquee band) |
| `--color-sage-mid` | `#e8c2c8` | rose fill (CTA block) |
| `--color-sage-deep` | `#8f4b59` | dusty rose text |
| `--color-line` | `#ddd0b6` | hairline borders |

## Type
- `--font-display`: **Playfair Display** (Georgia serif fallback), weights to **900 black** — headings + editorial italics. French Didone lineage.
- `--font-masthead`: **Oswald** condensed ("Arial Narrow" fallback) — wordmark, nav, `.eyebrow` labels, marquee, the hero stamp. Newspaper-masthead voice.
- `--font-sans`: **Inter** (system-ui fallback) — body copy.
- Headings default to **near-black ink** (`globals.css` `h1,h2,h3`, weight 700); hero `h1` is `font-black` (900).
- `.eyebrow` / `.masthead`: Oswald, uppercase, wide tracking, `--color-olive`.

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
