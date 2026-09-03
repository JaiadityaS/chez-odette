// Minimal WebMCP surface + feature detection.
// The exact global is still stabilizing across runtimes, so we look in both
// likely spots (document.modelContext and navigator.modelContext) and always
// feature-detect — a browser without WebMCP must never crash.
// Phase 1's whole job is to confirm this works in ChatGPT's in-app browser.

export type WebMCPToolResult = {
  content: { type: 'text'; text: string }[]
}

export type WebMCPTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (input: unknown) => Promise<WebMCPToolResult> | WebMCPToolResult
}

type ModelContext = {
  registerTool: (tool: WebMCPTool) => unknown
}

export function getModelContext(): ModelContext | null {
  if (typeof document !== 'undefined') {
    const mc = (document as unknown as { modelContext?: ModelContext }).modelContext
    if (mc?.registerTool) return mc
  }
  if (typeof navigator !== 'undefined') {
    const mc = (navigator as unknown as { modelContext?: ModelContext }).modelContext
    if (mc?.registerTool) return mc
  }
  return null
}

// Helper so tool execute() bodies stay terse.
export function text(s: string): WebMCPToolResult {
  return { content: [{ type: 'text', text: s }] }
}
