# MEMORY — running build log

> The AI updates this as work happens, so context survives between sessions.

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
- [x] Work split: **maker owns UI + design (determining it themselves); teammate owns everything else + scaffold + deploy.** See SPLIT.md / HANDOFF.md / CONTRACT.md.
- [ ] Teammate: Phase 0 scaffold + deploy, then send base to maker. Keep Tailwind theme NEUTRAL (design is the maker's).
- [ ] Maker: determine design tokens (palette/type/brand), then build UI against the stub `src/lib/*` + the `storefront:order` event.

## Open decisions for the maker
1. Brand name "Miga" + tagline "Bread with a memory" — keep or change?
2. Palette + Fraunces/Inter type pairing — approve or adjust?
3. Tailwind vs CSS modules (proposing Tailwind).
4. Confirm we prove the WebMCP pipe (Phase 1) before building real tools.

## Gotchas / notes
- Verify WebMCP works in the target runtime EARLY (Phase 1) — it's the biggest unknown.
- Deployment auth/headless gotchas: deploy in Phase 0, not at the deadline.
