// The WebMCP tool registry. StorefrontTools registers every tool here;
// the dev ToolHarness can invoke each one's execute() without an agent.
//
// Phase 1: ping (verified live with a real agent).
// Phase 3: the SOUL tools — the ones that carry Odette's identity through the
// agent, not just data. See docs/PRD.md.

import { type WebMCPTool, text } from './webmcp'
import { getTodaysBake, getStory } from './bakery'
import { recommendForOccasion } from './voice'

const pingTool: WebMCPTool = {
  name: 'ping',
  description:
    "Health check for the Chez Odette storefront. Returns a friendly confirmation that the bakery's WebMCP tools are reachable.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => text('pong from Chez Odette — the ovens are warm.'),
}

const getTodaysBakeTool: WebMCPTool = {
  name: 'get_todays_bake',
  description:
    "List what Odette baked today at Chez Odette — each loaf with its price, live availability, and Odette's own note on it. Use this to tell the customer what's fresh right now. Availability here is the truth; don't guess it from the page.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => {
    const items = getTodaysBake().map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      available: !p.soldOut,
      tags: p.tags ?? [],
      fromOdette: p.story,
    }))
    return text(JSON.stringify({ bakery: 'Chez Odette', items }, null, 2))
  },
}

const theStoryTool: WebMCPTool = {
  name: 'the_story',
  description:
    "Odette's story in her own words — who she is, the starter older than the building, and why buying direct matters. Use this when the customer asks about the bakery or the baker, so you can speak in her voice.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => text(getStory()),
}

const recommendForOccasionTool: WebMCPTool = {
  name: 'recommend_for_occasion',
  description:
    "Ask Odette what to buy for a particular occasion. She reasons over what's actually available today (she won't recommend a sold-out loaf — she'll say so and offer the best alternative), the number of guests, and any dietary preferences. Returns her personal recommendation in her own voice.",
  inputSchema: {
    type: 'object',
    properties: {
      occasion: {
        type: 'string',
        description: 'What the bread is for, e.g. "anniversary dinner", "everyday toast", "birthday brunch".',
      },
      guests: { type: 'number', description: 'How many people it needs to feed.' },
      prefs: {
        type: 'string',
        description: 'Optional preferences or restrictions, e.g. "no nuts".',
      },
    },
    required: ['occasion', 'guests'],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { occasion, guests, prefs } = (input ?? {}) as {
      occasion?: string
      guests?: number
      prefs?: string
    }
    const rec = recommendForOccasion({
      occasion: occasion ?? '',
      guests: typeof guests === 'number' ? guests : 1,
      prefs,
    })
    return text(
      JSON.stringify(
        {
          recommendation: rec.item.name,
          id: rec.item.id,
          price: rec.item.price,
          available: !rec.item.soldOut,
          fromOdette: rec.inRosasVoice,
        },
        null,
        2
      )
    )
  },
}

export const tools: WebMCPTool[] = [
  pingTool,
  getTodaysBakeTool,
  theStoryTool,
  recommendForOccasionTool,
]
