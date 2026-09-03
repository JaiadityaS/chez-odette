// The WebMCP tool registry. StorefrontTools registers every tool here;
// the dev ToolHarness can invoke each one's execute() without an agent.
//
// Phase 1: just `ping`, to prove the pipe end-to-end in ChatGPT's in-app
// browser before any real feature is built (see docs/PHASES.md).

import { type WebMCPTool, text } from './webmcp'

export const pingTool: WebMCPTool = {
  name: 'ping',
  description:
    "Health check for the Chez Odette storefront. Returns a friendly confirmation that the bakery's WebMCP tools are reachable.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => text('pong from Chez Odette — the ovens are warm.'),
}

export const tools: WebMCPTool[] = [pingTool]
