# thinkPuff 

A small French bakery that keeps its **soul, its margin, and its customer** even when an AI agent does the ordering.

**Live site:** https://chez-odette-tau.vercel.app/
**Demo video:** _add your YouTube link here_

Open the live site in **ChatGPT's in-app browser** (or Google Chrome with `chrome://flags/#enable-webmcp-testing` enabled) and ask the agent to order you some bread. It talks to Amélie's own tools — not a marketplace, not a screen-scraper — and the order it places shows up on the bakery's counter in real time.

---

## The idea

When you own a website, you own the experience and the relationship with your customer. Delivery marketplaces take that away: they bury you in a list, skim ~30% of every order, and keep your customer's details for themselves. The agent era threatens to make that worse — if a customer's assistant only ever talks to an aggregator, the shop disappears entirely.

**WebMCP flips that.** Amélie's own site exposes structured tools an agent can call directly. So when a customer says *"order me some sourdough for Saturday,"* their agent lands on **Amélie**, hears her recommendation in her own voice, checks what's actually left, and places the order straight with her. She keeps the full price and the customer. The website survives the agent.

## What people and agents can do together

- A customer's agent gets Amélie's **live availability** (the walnut levain is genuinely sold out today) instead of guessing from a stale screenshot.
- It gets a **computed, in-voice recommendation** that accounts for the occasion, the number of guests, and dietary needs — and refuses to recommend a loaf that's gone.
- It **completes the whole order** with no marketplace in between, and the confirmation appears on the human-facing site at the same moment.
- None of this requires the agent to click through a UI or read pixels. The site cooperates.

## How WebMCP is implemented

Every tool is registered on page load with `document.modelContext.registerTool(...)`, feature-detected so a normal browser is unaffected. The tools live in [`src/lib/tools.ts`](src/lib/tools.ts) and are registered by [`src/components/StorefrontTools.tsx`](src/components/StorefrontTools.tsx). They read and write the **same application state** the human UI uses, so an agent's order and a human's order are one and the same.

```js
document.modelContext.registerTool({
  name: "recommend_for_occasion",
  description:
    "Ask Amélie what to buy for a particular occasion. She reasons over what's " +
    "actually available today (she won't recommend a sold-out loaf), the number " +
    "of guests, and any dietary needs, and answers in her own voice.",
  inputSchema: {
    type: "object",
    properties: {
      occasion: { type: "string", description: 'e.g. "anniversary dinner"' },
      guests: { type: "number", description: "how many people it feeds" },
      prefs: { type: "string", description: 'optional, e.g. "no nuts"' },
    },
    required: ["occasion", "guests"],
  },
  execute: async ({ occasion, guests, prefs }) => {
    const rec = recommendForOccasion({ occasion, guests, prefs });
    return { content: [{ type: "text", text: JSON.stringify(rec) }] };
  },
});
```

### The tools Amélie exposes

| Tool | What it does |
|---|---|
| `get_todays_bake` | Today's loaves with prices, live availability, and Amélie's note on each |
| `the_story` | Amélie's story, in her own words |
| `recommend_for_occasion` | A computed recommendation that respects the occasion, guests, prefs, and what's actually in stock |
| `check_availability` | The live truth on a specific loaf (more reliable than the page) |
| `place_order` | Places a direct order and shows it on the bakery's counter |
| `get_order_status` | Looks up an order the customer already placed |
| `join_regulars` | Adds the customer to Amélie's own list, not an app's |
| `ping` | Health check used to prove the pipe |

### Agent action → human UI

`place_order` dispatches a `storefront:order` browser event, and the storefront's confirmation panel listens for it. So when the *agent* places an order, the *human* sees it appear on Amélie's site — the same event the human "Order" button fires. There is no demo-only side channel; both paths share one truth.

## Try it

Open the live site in ChatGPT's in-app browser (or Chrome with the WebMCP flag) and try:

- *"What can I order for an anniversary dinner for six?"* → she notices the walnut levain is gone and steers you to the pain de campagne.
- *"Order me a country sourdough for Saturday pickup, my name's Alex."* → the confirmation pops up on the bakery's site, showing the ~30% she kept from the aggregators.

### The contrast

`/aggregator` shows the same bakery on a fictional marketplace ("DashBite") — row #47, brand stripped, 30% skimmed, customer's details gone. It's the "before" to the storefront's "after."

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel. No database and no real payments — orders are simulated in-memory for the demo.

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000  (append ?harness=1 for a dev panel that invokes each tool without an agent)
```

## Project structure

```
src/
  app/            page.tsx (storefront), aggregator/ (contrast page), layout.tsx
  components/
    StorefrontTools.tsx   registers the WebMCP tools
    ToolHarness.tsx       dev-only manual tool tester (?harness=1)
    ui/                   the storefront components
  lib/
    tools.ts     the WebMCP tool registry
    webmcp.ts    feature-detection + result helper
    bakery.ts    Amélie's menu, story, and order logic
    voice.ts     the computed occasion recommendation
docs/             the design and build notes
```

## License

MIT — see [LICENSE](LICENSE).
