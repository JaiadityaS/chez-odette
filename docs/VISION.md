# VISION — Storefront

> The anchor. Every feature and design choice gets checked against this. If it can't be justified here, it's scope creep.

## The one-line thesis
The aggregators turned every shop into a row on a shelf. Agents were about to make that shelf the whole world. **Storefront hands the shelf back to the people who built it** — one storefront, one soul, one direct line to the customer, at a time.

## Who this is for (one real person, not a category)
**Amélie.** She wakes at 4 a.m. Her grandmother's sourdough starter is older than the building. When you walk into her bakehouse, the smell hits you before the door closes. That smell is not information — it cannot be scraped — and it is the entire point.

Amélie is being crushed by a real, documented machine:
- Aggregators take 15–30% per order on ~8% margins — she loses money on orders they "bring" her.
- They own her reviews, her ranking (rentable at auction), and — worst — **her customer**, whose contact info she never sees.
- Phantom fees ($9+ for a call with no order) are real and documented.
- The agent era was about to erase even her thumbnail: a customer's agent, told "order good sourdough," goes to the aggregator, sorts by price/stars, and buys in 4ms without a human eye ever landing on Amélie.

The **secondary** beneficiary is the customer — a busy human whose agent does the ordering — who gets a warmer, truer result: the real bakery, not the cheapest interchangeable row.

## The single moment of value
A customer's agent is told *"order me good sourdough for Saturday."* Instead of hitting a marketplace, it lands on **Amélie's own site**, hears Amélie's voice recommend the walnut levain for the occasion, checks it's actually in stock, and places the order directly. **Amélie keeps the margin. Amélie keeps the customer.** The soul survived the agent.

## What it should feel like
Walking into the shop and smelling the bread — warmth, heritage, a real person on the other end — *even though a machine did the ordering.* The agent should feel like it spoke to a maître d', not queried an API.

## What we are deliberately NOT building
- ❌ Real payment processing / handling money (simulated/test-mode only).
- ❌ A marketplace or multi-tenant SaaS. This is ONE bakery, done beautifully.
- ❌ User accounts / auth / login.
- ❌ A real inventory-management backend, admin panel, or CMS.
- ❌ A mobile app.
- ❌ Generic "modern clean startup" aesthetics. This must feel like a specific, warm, artisanal place.

## The contrarian bet (our moat, not the code)
Naive WebMCP (`book_table()`, `search_products()`) *finishes* the commoditization that owning a website was supposed to prevent — it reduces the shop to a data source on the agent's shelf. Our bet: **the agent-native site must transmit brand, ambience, and connection THROUGH the agent, not get bypassed by it.** Tools carry the soul. This is the only version of WebMCP a real small business would ever adopt — and it's exactly what the judges (and sponsors) are quietly rooting for: proof the website survives the agent era.
