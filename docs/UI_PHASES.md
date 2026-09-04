# UI PHASES — your workload (the UI owner)

> Same discipline as PHASES.md: small checkpoints, each with a "done when" test, one unknown at a time. You build against the stub `src/lib/*` (placeholder Amélie content) and the `storefront:order` event — so you're never blocked on the teammate's backend.

## UI-0 — Lock your design tokens (do this NOW, no scaffold needed)
Decide the aesthetic (yours): brand name, palette, type, spacing scale, radius, motion. Write them as CSS variables / Tailwind theme values — components will consume tokens, never hardcoded colors.
**Done when:** you have a tokens list (colors + fonts + spacing) you're happy with, ideally previewed as a quick swatch + type specimen.

## UI-1 — Take the base, apply your theme
When the teammate sends the scaffolded base + live URL: run it locally, drop your tokens into `globals.css` + Tailwind theme, wire fonts in `layout.tsx` (theme only — don't remove the mounted `<StorefrontTools/>`/`<ToolHarness/>`).
**Done when:** dev server runs and the placeholder page shows YOUR colors and type.

## UI-2 — Storefront skeleton
Build `src/app/page.tsx` structure + the section components in `src/components/ui/`: hero (Amélie's voice), the story block (`getStory()`), today's-bake grid (`getTodaysBake()`), footer. Static, pulling stub data.
**Done when:** the page reads like a specific, warm, real bakery (placeholder content is fine), responsive on mobile + desktop.

## UI-3 — Product cards + the sold-out state
`ProductCard` rendering `Product` — price, story, tags — with a distinct **sold-out** treatment (the walnut levain is `soldOut: true` in the stub). This visual matters: it's part of the honest contrast.
**Done when:** sold-out vs available are unmistakably different; grid looks right at all widths.

## UI-4 — Order confirmation panel (the agent's action appears in YOUR UI)
A panel that listens for the `storefront:order` event and renders the `OrderConfirmation` (order id, Amélie's-voice summary, `keptFromAggregator`). Test it yourself with no backend by pasting in the browser console:
```js
window.dispatchEvent(new CustomEvent('storefront:order', { detail: { orderId:'TEST-1', status:'confirmed', summary:'Confirmed — see you Saturday.', keptFromAggregator: 2.7 } }))
```
**Done when:** firing that event makes the confirmation panel appear, styled.

## UI-5 — The last 20% (where you win)
Motion (gentle rise/fade, 200ms), loading/empty states, mobile pass, micro-typography, the warmth. Make nothing feel AI-median.
**Done when:** every surface feels hand-made, not generated.

## UI-6 — Merge handoff
Zip ONLY your files (`src/app/page.tsx`, `src/components/ui/**`, `src/app/globals.css`, your `layout.tsx` theme edits) and send to the teammate. He drops them in and redeploys.
**Done when:** your UI renders on the live URL with his real data flowing through the stub interface.

## What you do NOT build (teammate owns these)
WebMCP tools, `src/lib/*` bodies, the order API, the `src/app/aggregator/` page, scaffold/configs/deploy, README/Devpost/video.
