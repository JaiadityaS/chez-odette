# PHASES — the build as verifiable checkpoints

> Iron rule: don't start a phase until the previous phase's test passes. Each phase adds exactly one thing that could fail.

## Phase 0 — Foundation (deploy an empty house)
Scaffold Next.js + TS + Tailwind, fonts wired, one placeholder page. Push to GitHub, deploy to Vercel.
**Done when:** a live Vercel URL loads the placeholder page.

## Phase 1 — Prove the WebMCP pipe (the critical unknown)
Register ONE trivial tool: `ping` → returns `"pong from Odette's"`. Feature-detect. Add the dev test harness.
**Done when:** in ChatGPT's in-app browser (or Chrome with the flag), an agent discovers `ping`, calls it, and gets the response. *This isolates the single biggest risk before any real feature.*

## Phase 2 — The storefront (human-facing, brand locked)
Build the real bakery page from DESIGN.md: hero with Odette's voice, the story, today's bake, product grid. Static data from `lib/bakery.ts`. No new tools.
**Done when:** the page reads like a specific, warm, real bakery — brand/voice approved.

## Phase 3 — Soul tools
`get_todays_bake`, `the_story`, `recommend_for_occasion` — reading the data module, returning in Odette's voice. The recommendation is **computed** (occasion/guests/prefs → choice + reasoning), NOT just text printed on the page — this is part of the honest "true failure surface" (PRD MUST #6).
**Done when:** an agent asked "what's good for an anniversary?" returns Odette's voiced, computed recommendation, sourced from real app data.

## Phase 4 — Transaction tools (reclaim the sale)
`check_availability`, `place_order` (simulated → mock confirmation via `/api/orders`), `get_order_status`. Confirmation renders in the human UI.
Build the **live sold-out state**: at least one item is actually out (and the static page doesn't unambiguously shout it), so `check_availability` is genuinely more reliable than reading pixels. Keep checkout tool-driven — no plainly-clickable form for a blind agent to brute-force (PRD MUST #6).
**Done when:** an agent completes a mock order end-to-end AND the confirmation appears on Odette's site; the sold-out item is correctly refused by `check_availability`.

## Phase 5 — Relationship + the two-door contrast
`join_regulars` (customer opts into Odette's own list at order time). Build the cold aggregator-contrast page (supporting beat).
**Primary:** capture the **blind-vision run** — drive a screenshot/vision agent (Claude-in-Chrome / computer-use) against the deployed site and record where it honestly fails (flattens the brand, misreads sold-out, can't cleanly complete the order), then the WebMCP run gliding through. Do NOT rig it — if it happens to succeed at something, keep that footage and let the *quality/soul* gap carry the point.
**Done when:** the two-door contrast (blind-vision vs WebMCP) is captured side by side and is truthful; aggregator page demoable as a supporting beat.

## Phase 6 — The last 20% (polish that wins)
Voice/copy pass, motion, empty/error/sold-out states, mobile, README + manifesto. This is where we beat everyone who stopped at "good."
**Done when:** nothing feels AI-median; every surface feels hand-made.

## Phase 7 — Ship
Re-check every hard requirement against the artifact. Final deploy. Record < 3-min demo. Repo + MIT LICENSE visible. Submit on Devpost with buffer time.
**Done when:** submitted, with time to spare for the thing that breaks last.
