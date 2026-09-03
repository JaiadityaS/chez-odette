# ARCHITECTURE — Storefront

> **This file is a PROPOSAL — architectural decisions are yours. Push back on anything.**

## Stack
- **Next.js (App Router) + TypeScript**, deployed on **Vercel**.
- Styling: Tailwind CSS (fast, keeps design tokens in one place) OR CSS modules — leaning Tailwind. Fonts via `next/font` (Fraunces + Inter).
- **No database for v1.** All bakery truth lives in a typed data module. Orders are handled by serverless route handlers returning deterministic mock confirmations. This keeps the foundation trivially deployable and demo-safe (no auth/DB gotchas at the deadline).

## WebMCP integration (the heart)
- A **client component** `StorefrontTools` mounts on the storefront and calls `document.modelContext.registerTool(...)` for each tool, guarded by feature detection (`document.modelContext?.registerTool`).
- Each tool's `execute` operates on the **same app truth** the human UI uses (shared data module + shared order store), so the agent and the human see one reality.
- `place_order` etc. call internal route handlers (`/api/orders`) so agent-initiated orders show up in the human UI (e.g. an order confirmation panel reading the same store).
- A tiny **manual test harness** (dev-only) lets us invoke each tool's `execute` from a button, so we can verify tools before wiring a real agent.

## Proposed file layout
```
/docs                     # the planning files (this folder)
/src
  /app
    layout.tsx            # fonts, base theme
    page.tsx              # the storefront (human-facing)
    /aggregator/page.tsx  # the cold "row 47" contrast page (demo)
    /api/orders/route.ts  # POST place_order, GET status -> mock confirmation
  /components
    StorefrontTools.tsx   # registers WebMCP tools (client)
    ToolHarness.tsx       # dev-only manual tool invoker
    ...UI components
  /lib
    bakery.ts             # Odette's story, products, today's bake, stock (the truth)
    voice.ts              # Odette's voice helpers (in-voice response builders)
    orders.ts             # order store + mock confirmation logic
    tools.ts              # tool definitions (name, description, inputSchema, execute)
LICENSE                   # open-source (MIT) — required, visible in About
README.md                 # what it is, how to run, WebMCP explanation
```

## The tool set (definitions live in `lib/tools.ts`)
Soul: `get_todays_bake`, `the_story`, `recommend_for_occasion`
Transaction: `check_availability`, `place_order`, `get_order_status`
Relationship: `join_regulars`
Each: `{ name, description, inputSchema (JSON schema), execute(input) }`.

## Dependencies (exact, minimal)
- `next`, `react`, `react-dom`, `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`
- (fonts via `next/font/google`)
- No state library, no DB client, no payment SDK for v1.

## Open questions to confirm before Phase 0
1. Tailwind vs CSS modules? (Proposing Tailwind.)
2. Order persistence: in-memory per-session is fine for the demo; do you want Vercel KV so a confirmation survives a refresh? (Proposing in-memory + a simple module store; upgrade only if needed.)
3. Verify the exact WebMCP API surface with a live test in Phase 1 before building real tools (per playbook Stage 5).
