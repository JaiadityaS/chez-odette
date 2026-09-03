'use client'

// Dev-only manual tester: invoke each WebMCP tool's execute() without an agent.
// Lets us verify tool logic locally before wiring a real agent. Hidden in prod
// unless ?harness=1 is present (handy for spot-checking the deployed build).

import { useEffect, useState } from 'react'
import { tools } from '@/lib/tools'
import { getModelContext } from '@/lib/webmcp'

export default function ToolHarness() {
  const [out, setOut] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const [mcpDetected, setMcpDetected] = useState(false)

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== 'production'
    const forced = typeof window !== 'undefined' && window.location.search.includes('harness=1')
    setVisible(isDev || forced)
    setMcpDetected(getModelContext() !== null)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        right: 12,
        zIndex: 9999,
        background: '#fff',
        border: '1px solid #d8cdbc',
        borderRadius: 10,
        padding: 12,
        fontSize: 12,
        fontFamily: 'ui-monospace, monospace',
        maxWidth: 300,
        boxShadow: '0 4px 16px rgba(0,0,0,.12)',
        color: '#2A1E16',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        WebMCP harness · {mcpDetected ? 'agent detected' : 'no agent'}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tools.map((t) => (
          <button
            key={t.name}
            onClick={async () => {
              try {
                const r = await t.execute({})
                setOut(JSON.stringify(r, null, 2))
              } catch (err) {
                setOut(`error: ${String(err)}`)
              }
            }}
            style={{
              border: '1px solid #c15f3c',
              color: '#c15f3c',
              background: 'transparent',
              borderRadius: 6,
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
      {out && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8, marginBottom: 0 }}>{out}</pre>
      )}
    </div>
  )
}
