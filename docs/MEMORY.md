# MEMORY — running build log

> The AI updates this as work happens, so context survives between sessions.
>
> **COLD RESUME (read if you're picking this up fresh):** the project is being built SOLO by the lead. A teammate may take over from this GitHub repo ONLY as a fallback if the lead runs out of compute. If that's you: you now own the WHOLE project (UI included). Read docs in this order — VISION → PRD → DESIGN → ARCHITECTURE → CONTRACT → PHASES → RULES — then continue from the "Status" section at the bottom of this file. Ignore the parallel-split scoping in SPLIT.md/HANDOFF.md; there is no split anymore.

## Locked decisions
- Project: **Storefront** — a WebMCP-native bakery site that lets a customer's agent transact directly with the shop (keeping the margin and the customer relationship the aggregators steal).
- Protagonist: **Odette** (a common French grandmother), owner of **Chez Odette** bakehouse. Thesis: *the soul survives the agent.*
- Brand/design LOCKED (see DESIGN.md): warm-cream editorial French-patisserie look derived from the maker's reference (Mille-feuille) but on our OWN identity — no cloning the real brand's name/logo/founders/awards. Rustic bread kept (country sourdough, weekend walnut levain sold-out contrast). Palette: paper #FBF3E9, ink #2A1E16, body #6F6156, terracotta #C15F3C, blush #F7DBC9. Type: Fraunces (display) + Inter (body) + a script wordmark. Single warm light theme.
- Real proof: no real business — building a flagship demo shop; authenticity comes from craft + real complaint research + Odette's voice.
- Vertical: bakery / food maker.
- Checkout: **simulated / mock** (no real payments — hard safety line).
- Stack: **Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel.**
- Data: typed data module, no DB for v1; orders via serverless route returning mock confirmations.

## Stage 2 research (real pain, documented)
- Aggregators take 15–30% per order on ~8% food margins → owners lose money on "brought" orders.
- Documented phantom fees (Grubhub $9.07 for a call, no order).
- Owners raise prices to offset commissions.
- Even DoorDash's own blog: platforms = discovery; direct channels = the owned relationship, the customer data, the higher-margin repeat business. ← our thesis.

## WebMCP API (to VERIFY live in Phase 1)
- `document.modelContext.registerTool({ name, description, inputSchema, execute })` per the challenge brief. Confirm exact surface + how ChatGPT in-app browser exposes it before building real tools.

## Contrast design (decided)
- Primary demo contrast is now the **two-door**: the SAME deployed site accessed by a blind/screenshot (vision) agent vs. the WebMCP agent. Proves "the agent only succeeds because the site cooperated." Aggregator page demoted to a supporting beat.
- To keep it HONEST (not rigged), the app needs a **true failure surface** (PRD MUST #6): a live sold-out state that's not trivially readable off the page, a computed occasion recommendation (not just printed), and no plainly-clickable checkout form. Built in Phases 3–4; captured in Phase 5.
- Framing: call it "blind/screenshot agents," NOT a competitor dunk. Available tools here: `mcp__claude-in-chrome__*` (vision) for the blind run; ChatGPT in-app browser for the WebMCP run.

## Status
- [x] Stage 1 Vision, Stage 3 Winning — done (see VISION/PRD).
- [x] Stage 2 research — done (above).
- [x] Stage 4 planning files — drafted (VISION, PRD, DESIGN, ARCHITECTURE, RULES, PHASES, MEMORY).
- [x] PLAN: **solo build by the lead** (full ownership — UI + backend + WebMCP). Teammate = cold fallback via GitHub repo (https://github.com/JaiadityaS/chez-odette) only if the lead runs out of compute. SPLIT.md/HANDOFF.md parallel-split is now obsolete.
- [x] Design tokens LOCKED (see DESIGN.md): Chez Odette, warm French-patisserie palette, Fraunces + Inter + script.
- [x] GitHub repo created + seeded + pushed (public, MIT license). `probWebMCP.txt` gitignored.
- [x] **Phase 0 done:** Next.js 16 + React 19 + Tailwind **v4** + TS, App Router, `src/` dir, `@/*` alias. `npm run build` passes clean. Stubs preserved at `src/lib/`.
  - Tailwind v4 note: no `tailwind.config.js` — design tokens go in `src/app/globals.css` via `@theme` / CSS vars.
- [ ] Phase 1 — prove WebMCP pipe: register `ping` tool in a `StorefrontTools` client component, feature-detect `document.modelContext`. NEEDS a live deploy to test in ChatGPT's in-app browser → Vercel deploy is the gating step (needs the lead's Vercel auth).
- [ ] Then Phase 2 (UI storefront) → 3 (soul tools) → 4 (transaction) → 5 (contrast) → 6 (polish) → 7 (ship).

## Open decisions for the maker
1. Brand name "Miga" + tagline "Bread with a memory" — keep or change?
2. Palette + Fraunces/Inter type pairing — approve or adjust?
3. Tailwind vs CSS modules (proposing Tailwind).
4. Confirm we prove the WebMCP pipe (Phase 1) before building real tools.

## Gotchas / notes
- Verify WebMCP works in the target runtime EARLY (Phase 1) — it's the biggest unknown.
- Deployment auth/headless gotchas: deploy in Phase 0, not at the deadline.
