// The WebMCP tool registry. StorefrontTools registers every tool here;
// the dev ToolHarness can invoke each one's execute() without an agent.
//
// Phase 1: ping (verified live with a real agent).
// Phase 3: the SOUL tools — the ones that carry Amélie's identity through the
// agent, not just data. See docs/PRD.md.

import { type WebMCPTool, text } from './webmcp'
import {
  getTodaysBake,
  getStory,
  checkAvailability,
  placeOrder,
  getOrderStatus,
  joinRegulars,
  type OrderInput,
} from './bakery'
import { recommendForOccasion } from './voice'

const pingTool: WebMCPTool = {
  name: 'ping',
  description:
    "Health check for the Chez Amélie storefront. Returns a friendly confirmation that the bakery's WebMCP tools are reachable.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => text('pong from Chez Amélie, the ovens are warm.'),
}

const getTodaysBakeTool: WebMCPTool = {
  name: 'get_todays_bake',
  description:
    "List what Amélie baked today at Chez Amélie, with each loaf's price, live availability, and Amélie's own note on it. Use this to tell the customer what's fresh right now. Availability here is the truth; don't guess it from the page.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => {
    const items = getTodaysBake().map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      available: !p.soldOut,
      tags: p.tags ?? [],
      fromTheBaker: p.story,
    }))
    return text(JSON.stringify({ bakery: 'Chez Amélie', items }, null, 2))
  },
}

const theStoryTool: WebMCPTool = {
  name: 'the_story',
  description:
    "Amélie's story in her own words: who she is, the starter that's older than the building, and why buying direct matters. Use this when the customer asks about the bakery or the baker, so you can speak in her voice.",
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  execute: async () => text(getStory()),
}

const recommendForOccasionTool: WebMCPTool = {
  name: 'recommend_for_occasion',
  description:
    "Ask Amélie what to buy for a particular occasion. She reasons over what's actually available today (she won't recommend a sold-out loaf; she'll say so and offer the best alternative), the number of guests, and any dietary preferences. Returns her personal recommendation in her own voice.",
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
          fromTheBaker: rec.inRosasVoice,
        },
        null,
        2
      )
    )
  },
}

const checkAvailabilityTool: WebMCPTool = {
  name: 'check_availability',
  description:
    "Check whether a specific loaf is available at Chez Amélie right now. Availability changes through the day and loaves sell out, so this is the live truth, more reliable than reading the page. Pass a product id from get_todays_bake.",
  inputSchema: {
    type: 'object',
    properties: {
      productId: {
        type: 'string',
        description: 'The loaf id, e.g. "walnut-levain" (from get_todays_bake).',
      },
    },
    required: ['productId'],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { productId } = (input ?? {}) as { productId?: string }
    return text(JSON.stringify(checkAvailability(productId ?? '')))
  },
}

const placeOrderTool: WebMCPTool = {
  name: 'place_order',
  description:
    "Place a direct order with Amélie. She keeps the full price because there's no marketplace in between. Provide items (id + qty from get_todays_bake), pickup or delivery, when, and the customer's name (phone/email optional). Set joinRegulars to add them to Amélie's own list. Returns a confirmation and shows the order on Amélie's counter.",
  inputSchema: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        description: 'The loaves to order.',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            qty: { type: 'number' },
          },
          required: ['id', 'qty'],
          additionalProperties: false,
        },
      },
      fulfillment: { type: 'string', enum: ['pickup', 'delivery'] },
      when: { type: 'string', description: 'When they want it, e.g. "Saturday morning".' },
      contact: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['name'],
        additionalProperties: false,
      },
      joinRegulars: {
        type: 'boolean',
        description: "Add the customer to Amélie's own regulars list.",
      },
    },
    required: ['items', 'fulfillment', 'when', 'contact'],
    additionalProperties: false,
  },
  execute: async (input) => {
    const order = (input ?? {}) as OrderInput
    const confirmation = placeOrder(order)

    // Show the order on Amélie's counter (the human UI) — the same event the
    // human "Add to order" button fires. This is the agent-action -> human-UI moment.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('storefront:order', { detail: confirmation })
      )
    }

    let joined: string | undefined
    if (order.joinRegulars && order.contact?.name) {
      joined = joinRegulars(order.contact).message
    }

    return text(JSON.stringify({ ...confirmation, joined }, null, 2))
  },
}

const getOrderStatusTool: WebMCPTool = {
  name: 'get_order_status',
  description:
    'Check the status of an order the customer already placed. Pass the order id (e.g. "ODT-XXXXX").',
  inputSchema: {
    type: 'object',
    properties: { orderId: { type: 'string' } },
    required: ['orderId'],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { orderId } = (input ?? {}) as { orderId?: string }
    return text(JSON.stringify(getOrderStatus(orderId ?? '')))
  },
}

const joinRegularsTool: WebMCPTool = {
  name: 'join_regulars',
  description:
    "Add the customer to Amélie's own regulars list, so she can tell them herself when a loaf like the walnut levain comes out, instead of them hearing it from an app. Provide the customer's name (phone/email optional).",
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
  },
  execute: async (input) => {
    const c = (input ?? {}) as { name?: string; phone?: string; email?: string }
    return text(
      JSON.stringify(joinRegulars({ name: c.name ?? 'friend', phone: c.phone, email: c.email }))
    )
  },
}

export const tools: WebMCPTool[] = [
  pingTool,
  getTodaysBakeTool,
  theStoryTool,
  recommendForOccasionTool,
  checkAvailabilityTool,
  placeOrderTool,
  getOrderStatusTool,
  joinRegularsTool,
]
