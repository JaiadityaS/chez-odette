// Chez Amélie's back-of-house WebMCP tools. The agent DISCOVERS these at runtime
// and COMPOSES them to clear the morning — no bespoke flow is hardcoded.
// Every action goes through the shared store, so the dashboard reacts live.

import { type WebMCPTool, text } from "./webmcp";
import {
  getState,
  deriveAlerts,
  itemsUsingSupply,
  reorderSupply,
  set86,
  refundOrder,
  markReady,
  replyToMessage,
  messageCustomer,
  setPrice,
  setOpen,
} from "./store";

// A believable beat for outward-facing work (contacting a supplier, sending an
// SMS) so the agent's actions read as real labour, not an instant green-flip.
const beat = (ms = 800) => new Promise((r) => setTimeout(r, ms));

const pingTool: WebMCPTool = {
  name: "ping",
  description: "Health check for Chez Amélie's back office. Confirms the WebMCP tools are reachable.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text("pong — the back office is live."),
};

// ── Read / triage ────────────────────────────────────────────────────────────
const getAlerts: WebMCPTool = {
  name: "get_alerts",
  description: "The list of things needing attention right now (the red board), newest morning-crisis first. Start here to triage.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text(JSON.stringify(deriveAlerts(), null, 2)),
};
const getSupplies: WebMCPTool = {
  name: "get_supplies",
  description: "Every ingredient and its live status (in / low / out) and supplier.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text(JSON.stringify(getState().supplies, null, 2)),
};
const getMenu: WebMCPTool = {
  name: "get_menu",
  description: "Today's menu with prices, whether each item is currently available, and which supplies it needs.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text(JSON.stringify(getState().menu, null, 2)),
};
const getOrders: WebMCPTool = {
  name: "get_orders",
  description: "Customer orders with status (new / ready / refunded), pickup time, and whether they're overdue.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text(JSON.stringify(getState().orders, null, 2)),
};
const getMessages: WebMCPTool = {
  name: "get_messages",
  description: "Unanswered customer questions in the inbox.",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  execute: async () => text(JSON.stringify(getState().messages, null, 2)),
};
const itemsUsing: WebMCPTool = {
  name: "items_using_supply",
  description: "Which currently-available menu items depend on a given supply. Use it to find, say, everything that needs butter.",
  inputSchema: {
    type: "object",
    properties: { supplyId: { type: "string", description: 'e.g. "butter"' } },
    required: ["supplyId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { supplyId } = (input ?? {}) as { supplyId?: string };
    return text(JSON.stringify(itemsUsingSupply(supplyId ?? "").map((m) => ({ id: m.id, name: m.name })), null, 2));
  },
};

// ── Actions ───────────────────────────────────────────────────────────────────
const reorder: WebMCPTool = {
  name: "reorder_supply",
  description: "Reorder an ingredient from its supplier so it's back in stock. Contacts the supplier.",
  inputSchema: {
    type: "object",
    properties: { supplyId: { type: "string", description: 'e.g. "butter"' } },
    required: ["supplyId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { supplyId } = (input ?? {}) as { supplyId?: string };
    await beat(1100); // contacting the supplier
    return text(reorderSupply(supplyId ?? "", "agent"));
  },
};
const mark86: WebMCPTool = {
  name: "mark_86",
  description: "Take an item off today's menu (86 it) — for when a supply it needs is out.",
  inputSchema: {
    type: "object",
    properties: { itemId: { type: "string", description: 'menu id or name, e.g. "croissant"' } },
    required: ["itemId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { itemId } = (input ?? {}) as { itemId?: string };
    return text(set86(itemId ?? "", true, "agent"));
  },
};
const putBack: WebMCPTool = {
  name: "put_back_on_menu",
  description: "Put an item back on the menu once its supplies are restocked.",
  inputSchema: {
    type: "object",
    properties: { itemId: { type: "string" } },
    required: ["itemId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { itemId } = (input ?? {}) as { itemId?: string };
    return text(set86(itemId ?? "", false, "agent"));
  },
};
const refund: WebMCPTool = {
  name: "refund_order",
  description: "Refund a customer's order (for when it can't be fulfilled). Won't double-refund.",
  inputSchema: {
    type: "object",
    properties: { orderId: { type: "string", description: 'e.g. "A-118"' } },
    required: ["orderId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { orderId } = (input ?? {}) as { orderId?: string };
    await beat(700);
    return text(refundOrder(orderId ?? "", "agent"));
  },
};
const ready: WebMCPTool = {
  name: "mark_order_ready",
  description: "Mark a customer's order ready for pickup.",
  inputSchema: {
    type: "object",
    properties: { orderId: { type: "string" } },
    required: ["orderId"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { orderId } = (input ?? {}) as { orderId?: string };
    return text(markReady(orderId ?? "", "agent"));
  },
};
const reply: WebMCPTool = {
  name: "reply_to_message",
  description: "Reply to a waiting customer question from the inbox. Provide the message id and your reply text.",
  inputSchema: {
    type: "object",
    properties: {
      messageId: { type: "string", description: 'e.g. "m1"' },
      text: { type: "string", description: "the reply, in Amélie's warm voice" },
    },
    required: ["messageId", "text"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { messageId, text: body } = (input ?? {}) as { messageId?: string; text?: string };
    await beat(700);
    return text(replyToMessage(messageId ?? "", body ?? "", "agent"));
  },
};
const textCustomer: WebMCPTool = {
  name: "text_customer",
  description: "Text the customer on an order — e.g. an apology and a discount code after a refund. Provide the order id and message.",
  inputSchema: {
    type: "object",
    properties: {
      orderId: { type: "string" },
      text: { type: "string" },
    },
    required: ["orderId", "text"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { orderId, text: body } = (input ?? {}) as { orderId?: string; text?: string };
    await beat(800);
    return text(messageCustomer(orderId ?? "", body ?? "", "agent"));
  },
};
// ── Discovery extras: real capabilities NOT shown as buttons on the board ──────
const price: WebMCPTool = {
  name: "set_price",
  description: "Change a menu item's price (euros).",
  inputSchema: {
    type: "object",
    properties: { itemId: { type: "string" }, price: { type: "number" } },
    required: ["itemId", "price"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { itemId, price: p } = (input ?? {}) as { itemId?: string; price?: number };
    return text(setPrice(itemId ?? "", typeof p === "number" ? p : 0, "agent"));
  },
};
const openTool: WebMCPTool = {
  name: "set_shop_open",
  description: "Open or close the shop for the day.",
  inputSchema: {
    type: "object",
    properties: { open: { type: "boolean" } },
    required: ["open"],
    additionalProperties: false,
  },
  execute: async (input) => {
    const { open } = (input ?? {}) as { open?: boolean };
    return text(setOpen(Boolean(open), "agent"));
  },
};

export const tools: WebMCPTool[] = [
  pingTool,
  getAlerts,
  getSupplies,
  getMenu,
  getOrders,
  getMessages,
  itemsUsing,
  reorder,
  mark86,
  putBack,
  refund,
  ready,
  reply,
  textCustomer,
  price,
  openTool,
];
