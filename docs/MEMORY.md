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

## UI redesign (Phase 6 — new reference)
- Maker gave a new reference (MERCUSUAR bakery). UI overhauled to **brick-red (#a83c2f) + sage-green + cream (#f4ede0)**, serif headings in red, full-width colored nav bar, photo-driven. Dropped the framed-panel + script logo.
- Real CC0 photos in `public/images/` (Openverse, public domain): table (hero), sourdough/walnut/baguette/campagne/rye/croissant (products), gathering/hamper (moments). `Product.image` field added (optional, non-breaking).
- New sections: Header(brick bar), Hero(image), Welcome, TodaysBake(favourites w/ photos + sold-out + add-to-order), ForEveryMoment(4 sage cards), Testimonial, CtaBlock(green), Footer(brick). Removed FeatureBar/Story/BreadMark.
- WebMCP tools UNCHANGED — pure UI reskin. Build passes.

## Critique + fixes (impeccable /critique, baseline 24/32 Good)
- Ran /critique (dual-agent): detector clean; design 24/32 (heuristics 7,10 n/a). Snapshot in `.impeccable/critique/`.
- Applied plan (clarify → harden → quick-wins → document → polish):
  - CLARIFY: Hero + CtaBlock rewritten in Odette's first-person voice (killed agency-voice hero); ForEveryMoment eyebrow "Untuk setiap momen" → "For every moment"; currency `$` → `€` (ProductCard + OrderConfirmation); Hero secondary CTA no longer dead-ends (now → #story).
  - HARDEN: "Add to order" (instant irreversible, dup-order bug) → "Order this" opens a confirm DIALOG in TodaysBake (name [validated] + pickup + qty) before placeOrder; kills silent duplicates; fires same storefront:order event.
  - QUICK WIN: "Anniversaries" moment card image croissant.jpg → walnut.jpg.
  - DOCUMENT: docs/DESIGN.md regenerated from shipped brick/sage/cream code (was stale terracotta).
- Detector clean after; build passes.
- Deferred (out of chosen scope): mobile nav (hidden md:flex), sticky header, heading-color rule, lang attrs, P3 thesis-visibility redesign.

## French + lively pass (impeccable)
- Refinement (kept brick/sage/cream world): bilingual French section labels with `lang="fr"` (fixes a11y lang nit); French nav (La carte/Nos moments/Notre histoire) + "Boulangerie · Pâtisserie" + "Commander"; awning-stripe motif under header; scrolling **Marquee** of French bread names (src/components/ui/Marquee.tsx); rotating "fait maison · depuis 1974" SVG stamp on hero; hero French echo « Entrez, le pain est encore chaud. »; card hover-lift (.lift); themed browser surfaces (focus-visible, scrollbar, accent-color) in globals.css; footer « À bientôt. ». All motion gated behind prefers-reduced-motion. Detector clean, build passes.

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
- [~] Phase 1 — WebMCP pipe CODE DONE (build passes): `src/lib/webmcp.ts` (feature-detect helper, checks document.modelContext AND navigator.modelContext), `src/lib/tools.ts` (`ping` tool), `src/components/StorefrontTools.tsx` (registers on mount, renders null), `src/components/ToolHarness.tsx` (dev/`?harness=1` manual tester), mounted in `layout.tsx`. Fonts wired: Fraunces/Inter/Kaushan_Script.
  - ASSUMPTION to verify live: tool result shape is `{ content: [{ type:'text', text }] }` and the global is `document.modelContext.registerTool`. Confirm/adjust after the ChatGPT in-app browser test.
  - **DEPLOYED:** https://chez-odette-tau.vercel.app/ (auto-deploys on push to main). Live tab title confirms our layout shipped.
  - ✅ Tool execute logic VERIFIED on live build via `?harness=1` → ping returned `{content:[{type:text,text:"pong from Chez Odette — the ovens are warm."}]}`. So the result-shape assumption holds for our own runtime.
  - ✅ **VERIFIED with a real agent** in ChatGPT's in-app browser — `ping` discovered + called successfully. `document.modelContext.registerTool` + `{content:[{type:text}]}` result shape are CORRECT. Cleared to build real tools.
- [x] **Phase 2 done (UI storefront):** built + verified locally (screenshots). globals.css has Chez Odette tokens (Tailwind v4 @theme). Components in `src/components/ui/`: Header, Hero (blush stripes), FeatureBar, Story, TodaysBake+ProductCard (sold-out state distinct), OrderConfirmation, Footer, BreadMark. `page.tsx` = framed cream panel. Renders on-brand (matches the reference).
  - ✅ UI-4 verified: clicking "Add to order" dispatches `storefront:order` → confirmation panel shows. Same event the WebMCP `place_order` tool will fire. Agent-action → human-UI proven.
  - NOTE: product/story copy is still PLACEHOLDER (from stubs) — real Odette content lands in Phase 3.
- [x] **Phase 3 done (real content + soul tools):** `bakery.ts` has Odette's real 6-item menu (walnut levain genuinely sold out), real story, real placeOrder (computes `keptFromAggregator` ~30%). `voice.ts` `recommendForOccasion` is genuinely computed — occasion keywords → tags, guest count, nut-allergy, and a SOLD-OUT FALLBACK (won't recommend a gone loaf; says so, offers best available). Soul tools registered in `tools.ts`: `get_todays_bake`, `the_story`, `recommend_for_occasion` (+ ping). Build passes; page shows real content (verified via page text).
  - Nice-to-have: re-verify get_todays_bake / recommend_for_occasion with a real agent in ChatGPT browser on the deployed site.
- [x] **Phase 4 done (transaction tools):** registered `check_availability`, `place_order`, `get_order_status`, `join_regulars`. Now 8 tools total. `place_order` dispatches `storefront:order` → confirmation shows on Odette's counter (agent-action → human-UI). placeOrder made defensive (empty input safe for harness). Build passes.
  - DEVIATION from ARCHITECTURE: no `/api/orders` route — `place_order` runs client-side and mutates the in-module ORDERS map + fires the event. Simpler, works for static deploy, no persistence across reload (fine for demo). Documented deliberately.
  - Core loop COMPLETE: agent can discover → recommend → check availability → order (shows on UI) → status → join regulars, all direct.
  - TODO live-verify with a real agent: "order me a country sourdough for Saturday pickup, name Alex" → confirmation appears on the site.
- [~] Phase 5 — aggregator contrast page DONE + VERIFIED LIVE at https://chez-odette-tau.vercel.app/aggregator. Cold "DashBite", Odette = row #47, brand stripped, fee fine-print (~18% markup, $4.99 delivery, 15% service, keeps ~30%, no customer data), links back to `/`. Screenshot-confirmed.
  - REMAINING in Phase 5: capture the blind-vision-vs-WebMCP two-door contrast (do together at record time — drive a vision-only agent vs the WebMCP agent; keep it honest).
- [ ] Then 6 (polish) → 7 (ship: README with registerTool snippet, demo video, Devpost text).

## Open decisions for the maker
1. Brand name "Miga" + tagline "Bread with a memory" — keep or change?
2. Palette + Fraunces/Inter type pairing — approve or adjust?
3. Tailwind vs CSS modules (proposing Tailwind).
4. Confirm we prove the WebMCP pipe (Phase 1) before building real tools.

## Gotchas / notes
- Verify WebMCP works in the target runtime EARLY (Phase 1) — it's the biggest unknown.
- Deployment auth/headless gotchas: deploy in Phase 0, not at the deadline.
