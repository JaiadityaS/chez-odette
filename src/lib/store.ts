// ─────────────────────────────────────────────────────────────────────────────
// Chez Amélie — back-of-house store.
// The single source of truth the manual dashboard AND the WebMCP tools share.
// Client-side, no DB (demo). State is replaced immutably on each action and
// subscribers are notified, so React re-renders and alerts recompute live.
// ─────────────────────────────────────────────────────────────────────────────

export type SupplyStatus = "in" | "low" | "out";
export type Supply = { id: string; name: string; status: SupplyStatus; supplier: string };
export type MenuItem = { id: string; name: string; price: number; available: boolean; needs: string[] };
export type OrderStatus = "new" | "ready" | "refunded";
export type Order = {
  id: string;
  customer: string;
  contact: string;
  items: string[]; // menu item ids
  status: OrderStatus;
  pickup: string; // human time
  overdue: boolean;
};
export type Message = { id: string; customer: string; text: string; answered: boolean };
export type LogEntry = { id: number; text: string; at: string; by: "you" | "agent" };

export type State = {
  open: boolean;
  supplies: Supply[];
  menu: MenuItem[];
  orders: Order[];
  messages: Message[];
  log: LogEntry[];
  revenueAtRisk: number;
};

export type Alert = {
  id: string;
  severity: "red" | "amber";
  kind:
    | "supply_out"
    | "supply_low"
    | "item_needs_missing_supply"
    | "order_unfulfillable"
    | "order_overdue"
    | "message_unanswered";
  title: string;
  detail: string;
  // ids the UI/tools need to resolve it
  supplyId?: string;
  itemId?: string;
  orderId?: string;
  messageId?: string;
};

// ── Crisis seed: an 8am morning gone wrong ──────────────────────────────────
function seed(): State {
  return {
    open: true,
    revenueAtRisk: 0,
    supplies: [
      { id: "butter", name: "Butter", status: "out", supplier: "Beurre & Co" },
      { id: "flour", name: "Flour", status: "in", supplier: "Moulin Rémy" },
      { id: "walnuts", name: "Walnuts", status: "low", supplier: "Périgord Nuts" },
      { id: "yeast", name: "Yeast", status: "in", supplier: "Moulin Rémy" },
      { id: "chocolate", name: "Chocolate", status: "in", supplier: "Cacao Marché" },
    ],
    menu: [
      { id: "sourdough", name: "Country sourdough", price: 8, available: true, needs: ["flour", "yeast"] },
      { id: "walnut-levain", name: "Walnut levain", price: 9, available: true, needs: ["flour", "walnuts", "butter"] },
      { id: "baguette", name: "Baguette de tradition", price: 4, available: true, needs: ["flour", "yeast"] },
      { id: "campagne", name: "Pain de campagne", price: 9, available: true, needs: ["flour"] },
      { id: "croissant", name: "Butter croissant", price: 4.5, available: true, needs: ["flour", "butter"] },
      { id: "choc-tart", name: "Chocolate tart", price: 6, available: true, needs: ["flour", "butter", "chocolate"] },
    ],
    orders: [
      { id: "A-118", customer: "Marc", contact: "+33 6 12 …", items: ["croissant", "croissant"], status: "new", pickup: "8:30", overdue: false },
      { id: "A-119", customer: "Sofia", contact: "sofia@…", items: ["walnut-levain"], status: "new", pickup: "9:00", overdue: false },
      { id: "A-114", customer: "Leïla", contact: "+33 6 44 …", items: ["sourdough"], status: "new", pickup: "8:00", overdue: true },
    ],
    messages: [
      { id: "m1", customer: "Marc", text: "Is my croissant order still good for 8:30?", answered: false },
      { id: "m2", customer: "Théo", text: "Any walnut bread I can grab Saturday?", answered: false },
    ],
    log: [],
  };
}

let state: State = seed();
let logId = 1;
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}
function log(text: string, by: "you" | "agent") {
  const at = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  state.log = [{ id: logId++, text, at, by }, ...state.log].slice(0, 40);
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function getState(): State {
  return state;
}
export function resetStore() {
  state = seed();
  logId = 1;
  emit();
}

// ── Selectors ───────────────────────────────────────────────────────────────
export function itemsUsingSupply(supplyId: string): MenuItem[] {
  return state.menu.filter((m) => m.needs.includes(supplyId) && m.available);
}
export function findItem(id: string) {
  return state.menu.find((m) => m.id === id || m.name.toLowerCase() === id.toLowerCase());
}
export function findSupply(id: string) {
  return state.supplies.find((s) => s.id === id || s.name.toLowerCase() === id.toLowerCase());
}
export function findOrder(id: string) {
  return state.orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

// ── Derived alerts (recomputed live every render) ────────────────────────────
export function deriveAlerts(s: State = state): Alert[] {
  const alerts: Alert[] = [];
  const outIds = new Set(s.supplies.filter((x) => x.status === "out").map((x) => x.id));

  for (const sup of s.supplies) {
    if (sup.status === "out")
      alerts.push({ id: `supply-${sup.id}`, severity: "red", kind: "supply_out", supplyId: sup.id, title: `${sup.name} is out`, detail: `Reorder from ${sup.supplier}.` });
    else if (sup.status === "low")
      alerts.push({ id: `supply-${sup.id}`, severity: "amber", kind: "supply_low", supplyId: sup.id, title: `${sup.name} running low`, detail: `Top up from ${sup.supplier} soon.` });
  }
  for (const m of s.menu) {
    if (!m.available) continue;
    const missing = m.needs.find((n) => outIds.has(n));
    if (missing) {
      const supName = s.supplies.find((x) => x.id === missing)?.name ?? missing;
      alerts.push({ id: `item-${m.id}`, severity: "red", kind: "item_needs_missing_supply", itemId: m.id, supplyId: missing, title: `${m.name} still on the menu`, detail: `It needs ${supName.toLowerCase()}, which is out. Take it off today.` });
    }
  }
  for (const o of s.orders) {
    if (o.status !== "new") continue;
    const blocked = o.items.map((i) => s.menu.find((m) => m.id === i)).find((m) => m && m.needs.some((n) => outIds.has(n)));
    if (blocked) {
      alerts.push({ id: `order-${o.id}`, severity: "red", kind: "order_unfulfillable", orderId: o.id, title: `Can’t fulfil ${o.customer}’s order`, detail: `${o.id}: ${blocked.name} needs a supply that’s out. Refund or swap.` });
    } else if (o.overdue) {
      alerts.push({ id: `order-${o.id}`, severity: "red", kind: "order_overdue", orderId: o.id, title: `${o.customer}’s order is overdue`, detail: `${o.id} was due at ${o.pickup}. Mark it ready.` });
    }
  }
  for (const msg of s.messages) {
    if (!msg.answered)
      alerts.push({ id: `msg-${msg.id}`, severity: "amber", kind: "message_unanswered", messageId: msg.id, title: `${msg.customer} is waiting`, detail: `“${msg.text}”` });
  }
  // red first
  return alerts.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "red" ? -1 : 1));
}

// ── Actions (transactional; each logs + emits) ───────────────────────────────
export function reorderSupply(id: string, by: "you" | "agent" = "you"): string {
  const s = findSupply(id);
  if (!s) return `No supply called "${id}".`;
  if (s.status === "in") return `${s.name} is already stocked.`;
  s.status = "in";
  log(`Reordered ${s.name} from ${s.supplier}`, by);
  emit();
  return `Reordered ${s.name} from ${s.supplier}. Back in stock.`;
}
export function set86(itemId: string, off: boolean, by: "you" | "agent" = "you"): string {
  const m = findItem(itemId);
  if (!m) return `No menu item called "${itemId}".`;
  if (m.available === !off) return `${m.name} is already ${off ? "off" : "on"} the menu.`;
  m.available = !off;
  log(`${off ? "86’d" : "Put back"} ${m.name}`, by);
  emit();
  return `${off ? "Took" : "Put"} ${m.name} ${off ? "off" : "back on"} the menu.`;
}
export function refundOrder(id: string, by: "you" | "agent" = "you"): string {
  const o = findOrder(id);
  if (!o) return `No order ${id}.`;
  if (o.status === "refunded") return `Order ${o.id} is already refunded.`;
  o.status = "refunded";
  log(`Refunded ${o.customer} (${o.id})`, by);
  emit();
  return `Refunded ${o.customer}’s order ${o.id}.`;
}
export function markReady(id: string, by: "you" | "agent" = "you"): string {
  const o = findOrder(id);
  if (!o) return `No order ${id}.`;
  if (o.status !== "new") return `Order ${o.id} is ${o.status}, can’t mark ready.`;
  o.status = "ready";
  o.overdue = false;
  log(`Marked ${o.customer}’s order ${o.id} ready`, by);
  emit();
  return `Marked ${o.customer}’s order ${o.id} ready for pickup.`;
}
export function replyToMessage(id: string, text: string, by: "you" | "agent" = "you"): string {
  const msg = state.messages.find((m) => m.id === id);
  if (!msg) return `No message ${id}.`;
  if (msg.answered) return `Already replied to ${msg.customer}.`;
  msg.answered = true;
  log(`Replied to ${msg.customer}: “${text}”`, by);
  emit();
  return `Replied to ${msg.customer}.`;
}
export function messageCustomer(orderId: string, text: string, by: "you" | "agent" = "you"): string {
  const o = findOrder(orderId);
  if (!o) return `No order ${orderId}.`;
  log(`Texted ${o.customer}: “${text}”`, by);
  emit();
  return `Texted ${o.customer}.`;
}
export function setPrice(itemId: string, price: number, by: "you" | "agent" = "you"): string {
  const m = findItem(itemId);
  if (!m) return `No menu item called "${itemId}".`;
  const old = m.price;
  m.price = price;
  log(`Changed ${m.name} price €${old} → €${price}`, by);
  emit();
  return `${m.name} is now €${price}.`;
}
export function setOpen(open: boolean, by: "you" | "agent" = "you"): string {
  state.open = open;
  log(open ? "Reopened the shop" : "Marked the shop closed", by);
  emit();
  return open ? "Shop is open." : "Shop marked closed.";
}
