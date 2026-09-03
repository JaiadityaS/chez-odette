'use client'

// Registers Chez Odette's WebMCP tools with the browser agent runtime.
// Renders nothing. Feature-detects — silent no-op in a normal browser.

import { useEffect } from 'react'
import { getModelContext } from '@/lib/webmcp'
import { tools } from '@/lib/tools'

export default function StorefrontTools() {
  useEffect(() => {
    const mc = getModelContext()
    if (!mc) {
      console.info('[Chez Odette] WebMCP not available here — tools not registered.')
      return
    }

    const handles = tools.map((t) => {
      try {
        return mc.registerTool(t)
      } catch (err) {
        console.error(`[Chez Odette] registerTool failed for "${t.name}"`, err)
        return null
      }
    })
    console.info(`[Chez Odette] Registered ${tools.length} WebMCP tool(s): ${tools.map((t) => t.name).join(', ')}`)

    return () => {
      handles.forEach((h) => {
        const handle = h as { unregister?: () => void; dispose?: () => void } | null
        try {
          handle?.unregister?.()
          handle?.dispose?.()
        } catch {
          /* ignore */
        }
      })
    }
  }, [])

  return null
}
