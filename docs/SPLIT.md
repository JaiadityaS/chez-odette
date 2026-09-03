# SPLIT — who owns what, and how the two halves merge

Two people, two Claude accounts, no git. The only rule that keeps this safe:
**never edit a file the other person owns.** Ownership is disjoint below.

## YOU own — the UI (the look)
- `src/app/page.tsx` — the storefront composition
- `src/components/ui/**` — every visual component (hero, story block, product card, today's bake, the order-confirmation panel, etc.)
- `src/app/globals.css` + the Tailwind theme tokens — the palette/type/spacing
- `src/app/layout.tsx` — fonts/theme ONLY (the seed already mounts the backend's components here; don't remove those mounts)

You build against the stub `src/lib/bakery.ts`, so your UI renders real-looking content immediately. You listen for the `storefront:order` event to show the confirmation panel (see CONTRACT.md).

## TEAMMATE owns — everything else
- Scaffold + configs (`package.json`, `next.config`, `tailwind.config`, `tsconfig`, `postcss`) + **Vercel deploy + live URL**
- `src/lib/bakery.ts`, `src/lib/voice.ts` — real data, story, stock, computed recommendation (fills the frozen stubs)
- `src/lib/tools.ts` — the WebMCP tool definitions
- `src/lib/orders.ts` — order store + mock confirmation + dispatch the `storefront:order` event
- `src/components/StorefrontTools.tsx` — WebMCP `registerTool` registration (invisible)
- `src/components/ToolHarness.tsx` — dev-only tool tester
- `src/app/api/orders/route.ts` — mock order endpoint
- `src/app/aggregator/page.tsx` — the deliberately cold "row 47" contrast page
- `README.md`, the manifesto, the **Devpost text**, the **video script**

## The two touch-points (that's all the coordination there is)
1. **Seed handoff (once, at the start):** Teammate scaffolds Next.js + Tailwind + fonts, mounts `<StorefrontTools/>`/`<ToolHarness/>` in `layout.tsx`, drops in the stub `src/lib/*`, deploys to Vercel (proves the foundation early), then **zips the folder and sends it to You.** Now you both have an identical base. (~10 min; while you wait, you draft UI copy/structure.)
2. **Final merge (once, at the end):** You zip only YOUR files (`src/app/page.tsx`, `src/components/ui/**`, `src/app/globals.css`, your `layout.tsx` theme edits) and send them to Teammate. He drops them in — no conflicts, because they're files he never touched — and redeploys. Ship.

## If a frozen signature must change
That's the ONE thing worth a message. Change it in CONTRACT.md + the stub, tell the other person the new shape. Everything else, no talking needed.
