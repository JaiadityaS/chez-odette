# HANDOFF — paste this into your teammate's fresh Claude

> Instructions for the human: give your teammate this whole `webMCPHackathon` folder (zip it — it contains `docs/` and the `src/lib/` stubs). Then have them paste the block below as their first message to Claude Code, pointed at that folder.

---

## KICKOFF PROMPT (paste verbatim)

You're joining a WebMCP Challenge project already in progress. Everything you need is in the `docs/` folder of this repo. Do this in order, and do NOT improvise beyond it.

**1. Read these first, fully, in this order:**
- `docs/VISION.md` — what we're building and why (a WebMCP-native bakery, "Storefront", thesis: *the soul survives the agent*).
- `docs/PRD.md` — hard requirements, features, and the exact demo we record. Note MUST #6, the "true failure surface."
- `docs/ARCHITECTURE.md` — stack and file layout.
- `docs/CONTRACT.md` — THE FROZEN SEAM. The function signatures you implement. Do not change them without flagging it.
- `docs/SPLIT.md` — who owns what. **You own everything EXCEPT the UI.** Read the "TEAMMATE owns" list — that's you.
- `docs/RULES.md` and `docs/PHASES.md` — how to build.

**2. Your scope (you own everything except the UI):**
Scaffold + configs + Vercel deploy, `src/lib/bakery.ts`, `src/lib/voice.ts`, `src/lib/tools.ts`, `src/lib/orders.ts`, `src/components/StorefrontTools.tsx`, `src/components/ToolHarness.tsx`, `src/app/api/orders/route.ts`, `src/app/aggregator/page.tsx`, and the submission assets (README, manifesto, Devpost text, video script).

**3. DO NOT TOUCH the UI files — a teammate owns them:**
`src/app/page.tsx`, `src/components/ui/**`, `src/app/globals.css`, and the fonts/theme in `src/app/layout.tsx`. You MAY create `layout.tsx` in the scaffold and mount `<StorefrontTools/>` and `<ToolHarness/>` in it, but keep it minimal — the teammate will style it. Never write `page.tsx` or `components/ui/*`.

**4. Build in these phases, one at a time, stopping at each "done when":**
- **Phase 0 — Foundation:** `create-next-app` (App Router, TS, Tailwind), wire Fraunces + Inter via `next/font`, create `src/app/layout.tsx` mounting `<StorefrontTools/>` + `<ToolHarness/>`, keep the existing `src/lib/*` stubs, add a minimal placeholder `page.tsx` (the teammate replaces it later). Push to GitHub, deploy to Vercel. **Done when:** a live Vercel URL loads.
- **Phase 1 — Prove the WebMCP pipe:** in `StorefrontTools.tsx`, feature-detect `document.modelContext?.registerTool` and register ONE trivial tool `ping` → returns `"pong from Odette's"`. Add the manual `ToolHarness`. **Done when:** in ChatGPT's in-app browser (or Chrome with `chrome://flags/#enable-webmcp-testing`), an agent discovers and calls `ping`. Do this BEFORE building real tools.
- **Phase 3 (yours) — Soul + real content:** fill `src/lib/bakery.ts` and `src/lib/voice.ts` with Odette's real menu, story, a genuine live sold-out item, and a genuinely COMPUTED `recommendForOccasion`. Register `get_todays_bake`, `the_story`, `recommend_for_occasion` in `tools.ts`/`StorefrontTools.tsx`.
- **Phase 4 (yours) — Transaction:** `check_availability`, `place_order` (via `src/app/api/orders/route.ts` + `src/lib/orders.ts`, mock confirmation), `get_order_status`. On order, dispatch `window.dispatchEvent(new CustomEvent('storefront:order', { detail: confirmation }))` so the teammate's UI can show it. **Done when:** an agent completes a mock order end-to-end and the sold-out item is correctly refused.
- **Phase 5 (yours) — Relationship + contrast:** `join_regulars`; build `src/app/aggregator/page.tsx` (a deliberately cold, brand-stripped "row 47, 30% fee" listing). Then help capture the blind-vision-vs-WebMCP contrast.
- **Submission:** README (with the required `registerTool` snippet), MIT `LICENSE` (must be visible in the repo's About), Devpost description, and the <3-min video script.

**5. Hard rules:**
- Simulated/test-mode only — NO real payments, money, or real personal data.
- Feature-detect WebMCP; never crash a normal browser.
- Tools return structured, honest results/errors; never throw raw.
- Keep everything in Odette's voice (see `docs/DESIGN.md`).
- One phase per response; explain what you changed and what to check; stop and let me verify before the next phase.

**6. When you finish:** zip only the files you own (per `docs/SPLIT.md`) and hand them back for the final merge. Also share the live Vercel URL as soon as Phase 0 is up, so the UI teammate can test against it.

Start with Phase 0. Confirm you've read the docs and state the plan before writing code.
