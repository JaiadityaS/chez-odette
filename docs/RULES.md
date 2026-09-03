# RULES — guardrails for the build

## Scope discipline
- Stay inside VISION.md. If a feature isn't justified there, it's scope creep — flag it, don't build it.
- Build only what the current phase asks. No unrequested features, no "while I'm here" additions.
- One phase per prompt. Do not start a phase until the previous phase's "done when" test passes.

## Build discipline (playbook Stage 6–7)
- **Prove the pipe before features.** Simplest possible placeholder end-to-end first, then build the real thing on top.
- **Generic-first, then specific.** Confirm the machinery with trivial inputs before swapping in Odette's real content.
- Isolate unknowns: each phase introduces exactly ONE thing that could fail.
- Inside hard phases, work in small steps, explain each, and stop for review.
- Teach as you go: say what changed, why, and what to check. The maker must understand every layer (a mid-demo failure must be fixable).

## WebMCP specifics
- Always feature-detect `document.modelContext?.registerTool` before calling; never crash a normal browser.
- Tools return structured, honest results and structured errors — never throw raw.
- The agent path and the human path read/write the SAME app truth. No demo-only side channels.

## Honesty & safety
- Never fake the demo. If real behavior ≠ script, change the script.
- No real payments, no real money, no real PII. Simulated/test-mode only.
- Keep Odette's voice consistent — it's defined in `lib/voice.ts` and DESIGN.md, used everywhere.

## Process
- Update MEMORY.md as work happens (decisions, what's done, what's next, gotchas).
- Re-check hard requirements against the actual artifact before shipping, not from memory.
