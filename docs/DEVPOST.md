# Devpost submission — Chez Amélie

> Paste-ready copy for the submission form. Fill the two links at the top before submitting.

- **Live URL:** https://chez-odette-tau.vercel.app/
- **Repository:** https://github.com/JaiadityaS/chez-odette
- **Demo video:** _add your <3-min public YouTube link_

---

## Tagline

A neighbourhood French bakery that keeps its soul, its margin, and its customer — even when an AI agent does the ordering.

## Inspiration

A website used to be a shop you owned. You controlled the experience and you knew your customers. Delivery marketplaces changed that: they bury a small bakery in a list of hundreds, take ~30% of every order (on food margins of ~8%, that means losing money on the orders they "bring" you), mark the menu up to cover their fees, and keep the customer's name and contact details for themselves. Those are documented, real complaints from real owners.

The agent era threatens to finish the job. If a customer just tells their assistant "order me some sourdough" and the assistant only ever talks to an aggregator, the shop stops existing — it's not even a thumbnail anymore, just a row in a list an agent skims in milliseconds.

We wanted to build the opposite: proof that a small shop can meet the agent on its **own** terms and come out ahead.

## What it does

Chez Amélie is a real, working bakery storefront that exposes its capabilities to AI agents through WebMCP. A customer's agent can:

- read Amélie's **live availability** (one loaf, the weekend walnut levain, is genuinely sold out today),
- get a **recommendation computed in her voice** that accounts for the occasion, the number of guests and any dietary needs — and that refuses to suggest a loaf that's gone,
- **place a direct order** that Amélie fulfils herself, and
- **join her regulars list** so she can tell them herself when a loaf comes out.

When the agent places an order, the confirmation appears on the human-facing storefront at the same instant, showing the ~30% Amélie kept by selling direct. A companion `/aggregator` page shows the same bakery reduced to row #47 on a fictional marketplace — the "before" to the storefront's "after."

## Why this is a strong fit for WebMCP

The whole point of the project is something a screen-scraping, vision-only agent **cannot do reliably** — it only works because the site cooperates:

- **Live truth over stale pixels.** Availability changes through the day and loaves sell out. A screenshot agent guesses; `check_availability` and `get_todays_bake` return the real state.
- **Computed reasoning the page never shows.** `recommend_for_occasion` reasons over occasion, guests, preferences and current stock. That logic isn't printed anywhere on the page for a scraper to lift.
- **A real transaction, not a form to brute-force.** There is no throwaway checkout form to click through; the order genuinely requires the cooperating `place_order` tool.
- **It preserves the thing that makes a website worth owning.** Naïve tool-wrapping ("search_products", "book") would reduce the shop to a flat data source — exactly the commoditisation owning a website was supposed to prevent. Here the tools carry Amélie's voice, her story, and her relationship with the customer *through* the agent instead of being bypassed by it. This is the version of WebMCP a real small business would actually adopt.

## How it creates a better user experience

For the **customer**, ordering by agent stops feeling like querying a database and starts feeling like talking to a maître d' who knows the shop: they get an honest answer ("the walnut levain's gone, take the pain de campagne instead"), a warm recommendation, and a real order — in one turn, with no clicking.

For the **shop**, every order is direct: full price, and the customer relationship stays with Amélie rather than an app. The agent becomes her advocate, not the aggregator's auctioneer.

## What people and agents can do together that was hard or impossible before

Before, a customer's agent visiting a bakery site could only screenshot it and guess — it couldn't know what had sold out an hour ago, couldn't reason about what suits an occasion, and couldn't complete a purchase without a fragile click-through. And whatever it managed, the shop's identity was flattened to whatever pixels were on screen.

With WebMCP, the human and the agent share one storefront: the agent transacts through Amélie's own tools, the human sees the result on the same page, and the shop's voice survives the whole exchange. The agent orders headlessly and the bread still comes from Amélie.

## How we implemented WebMCP

Every tool is registered on page load with `document.modelContext.registerTool(...)`, feature-detected so a normal browser is a silent no-op. Tools are defined in `src/lib/tools.ts` and registered by a client component, `src/components/StorefrontTools.tsx`. Each tool's `execute` reads and writes the **same application state the human UI uses**, so an agent-placed order and a human-placed order are the same object. `place_order` dispatches a `storefront:order` DOM event that the storefront's confirmation panel listens for — that is how an agent's action surfaces on the human page, with no demo-only side channel.

Eight tools are exposed: `get_todays_bake`, `the_story`, `recommend_for_occasion`, `check_availability`, `place_order`, `get_order_status`, `join_regulars`, and a `ping` health check. We verified the pipe end-to-end with a real agent in ChatGPT's in-app browser before building the rest.

## Built with

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, WebMCP (`document.modelContext`), deployed on Vercel. No database and no real payments — orders are simulated for the demo.

## What's next

Turn the pattern into a drop-in layer any small shop can add to its own site, so every Amélie can meet her customers' agents on her own terms instead of renting shelf space from a marketplace.
