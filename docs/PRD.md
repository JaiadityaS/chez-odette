# PRD — Storefront

## Hard requirements (from the WebMCP Challenge rules)
- [ ] Working **live URL**, openable in ChatGPT's in-app browser or Chrome with `chrome://flags/#enable-webmcp-testing`.
- [ ] Uses `document.modelContext.registerTool({ name, description, inputSchema, execute })` — non-trivial, working implementation.
- [ ] Public code repo with a **detectable open-source license** (LICENSE file, visible in the About section).
- [ ] Text description: why WebMCP fits, how it improves UX, what humans+agents can do together that was hard before, how we implemented WebMCP.
- [ ] Public **YouTube demo video < 3 minutes**, with audio.
- [ ] Deployed on any provider (we use Vercel).

## Success criteria (how we WIN, mapped to judging)
- **WebMCP Leverage** → tools that are impossible-to-fake-with-scraping (in-voice recommendation, live stock, direct order that captures the relationship). Rich, semantic, non-trivial tool set.
- **Execution** → a complete, coherent bakery experience that holds together; clean deploy; works live in the ChatGPT browser.
- **Potential Impact** → grounded in documented real pain (15–30% fees, lost customer relationship); a credible path for any small merchant.
- **Creativity & Ambition** → the "soul survives the agent" thesis + the live **two-door contrast**: the SAME site accessed by a blind/screenshot (vision) agent vs. the WebMCP agent. Proves the agent only succeeds *because the site cooperated*. (The aggregator listing is a supporting beat.)

## Features

### MUST (the demo dies without these)
1. **WebMCP tool registration** that a live agent can discover and call.
2. **Soul tools** — the agent conveys Amélie's identity, not just data:
   - `get_todays_bake` — what's out of the oven today, each with Amélie's reason for making it.
   - `the_story` — heritage, the starter, the craft (so the agent can speak it).
   - `recommend_for_occasion` — a maître-d' recommendation in Amélie's voice, given occasion/guests/preferences.
3. **Transaction tools** — reclaim the sale:
   - `check_availability` — real, changing stock (bakeries sell out; aggregator listings handle this badly).
   - `place_order` — direct, simulated order (pickup/delivery, time, contact) → mock confirmation. Contact goes to *Amélie*.
   - `get_order_status` — status by order id.
4. **Human-facing storefront** — a real, beautiful bakery site (the agent path and the human path share one truth).
5. **The confirmation appears in the human UI too** — proof the agent acted on the real app, not a side channel.
6. **The "true failure surface"** (what makes the two-door contrast honest, not rigged): the things WebMCP exposes must be things blind pixels genuinely *can't get reliably*, so the vision agent fails at something real:
   - a **live sold-out state** that changes and isn't trivially/unambiguously readable off the static page (e.g. today's walnut levain sold out 20 min ago; the page doesn't scream it), so a vision agent confidently orders something gone while `check_availability` gets it right;
   - a **computed, occasion-aware recommendation** (not just printed on the page), so vision can only flatten Amélie to what's visible while `recommend_for_occasion` reasons in her voice;
   - **no plainly-clickable checkout form** for the blind agent to brute-force, so completing the order genuinely requires the cooperating `place_order` tool.

### SHOULD
7. `join_regulars` — the customer opts into Amélie's *own* list at order time (the relationship the aggregator steals). Explicit "Amélie owns this customer now" moment.
8. **Aggregator-contrast view** — a deliberately cold "Amélie = row 47, 30% fee, no brand" listing page. Now a *supporting* beat behind the two-door blind-vision contrast.
9. Feature-detection + a small manual **tool test harness** so we can invoke tools without an agent during dev.

### COULD
10. `whats_good_with(item)` pairing advice.
11. Subtle motion / oven warmth touches.
12. A one-screen "why this exists" manifesto page for the repo/README.

## Definition of done (the demo we will record)
1. Open the live URL in ChatGPT's in-app browser.
2. Ask the agent: *"order me good sourdough for Saturday, it's an anniversary."*
3. Agent calls `recommend_for_occasion` → replies in Amélie's voice; `check_availability`; `place_order`.
4. A real order confirmation appears on Amélie's site.
5. **The two-door contrast (primary):** run a blind/screenshot (vision) agent against the SAME site — it flattens Amélie, misreads the sold-out item, and can't cleanly complete the order — then the WebMCP agent glides through. Split-screen. This must be *true*, not rigged (see MUST #6).
6. **Supporting beat:** flash the aggregator-contrast page — same bakery, cold row, 30% gone, customer lost.
7. Land the line: *the soul survived the agent, and so did Amélie's margin and her customer.*

## Honesty rule
Never fake the demo. If the product's real behavior differs from the script, change the script — not the truth.
