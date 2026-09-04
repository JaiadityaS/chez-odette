"use client";

import { useEffect, useRef, useState } from "react";
import { useCockpit } from "./useCockpit";
import { getModelContext } from "@/lib/webmcp";
import {
  type Alert,
  type Order,
  reorderSupply,
  set86,
  refundOrder,
  markReady,
  replyToMessage,
} from "@/lib/store";

const money = (n: number) => `€${Number.isInteger(n) ? n : n.toFixed(2)}`;

/* ── living: a number that tweens toward its target ──────────────────────── */
function AnimatedInt({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    const end = value;
    if (start === end) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(end);
      from.current = end;
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 500);
      setShown(Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="num">{shown}</span>;
}

/* ── the shop cat, asleep by the counter (breathes, flicks its tail) ─────── */
function BakeryCat() {
  return (
    <svg width="36" height="26" viewBox="0 0 36 26" fill="none" aria-hidden="true">
      <path className="cat-tail" d="M6 18 C 0.5 16, 1.5 8.5, 6.5 10" stroke="#b7a06a" strokeWidth="2.3" strokeLinecap="round" fill="none" />
      <g className="cat-body">
        <path d="M9 23 C 9 13.5, 14 10.5, 19 10.5 C 25 10.5, 29 14.5, 29 23 Z" fill="#3b342b" />
        <path d="M13 12.5 l-2 -5 4.2 2.2 Z M25 12.5 l2 -5 -4.2 2.2 Z" fill="#3b342b" />
        <ellipse className="cat-eye" cx="22.5" cy="16.5" rx="1.1" ry="1.7" fill="#e0a25c" />
      </g>
    </svg>
  );
}

/* ── living: faint flour dust drifting up in the negative space ──────────── */
function FlourDust() {
  const motes = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 6.1 + 4) % 98,
    top: (i * 6.7 + 6) % 92,
    size: 2 + (i % 3),
    dur: 13 + (i % 6) * 2.5,
    delay: -((i * 1.9) % 13),
    o: 0.1 + (i % 4) * 0.045,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background: "#efe7d8",
            opacity: 0,
            ["--dur" as string]: `${m.dur}s`,
            ["--delay" as string]: `${m.delay}s`,
            ["--o" as string]: m.o,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ── the brand loaf, steaming ────────────────────────────────────────────── */
function SteamingLoaf() {
  return (
    <span className="relative inline-block">
      <span className="absolute -top-2 left-1/2 -translate-x-1/2" aria-hidden="true">
        {[0, 0.9, 1.8].map((d, i) => (
          <span
            key={i}
            className="steam-wisp absolute block rounded-full"
            style={{ left: `${i * 5 - 5}px`, width: 2, height: 8, background: "rgba(240,232,217,0.5)", filter: "blur(1px)", animationDelay: `${d}s` }}
          />
        ))}
      </span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14c0-3.6 3.2-5.5 8-5.5s8 1.9 8 5.5a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 14Z" />
        <path d="M9 11l-1 3M15 11l1 3" opacity=".6" />
      </svg>
    </span>
  );
}

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className, "aria-hidden": true };
  switch (name) {
    case "today": return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 1.5" /></svg>;
    case "orders": return <svg {...common}><path d="M6 3h12v18l-3-1.6-3 1.6-3-1.6L6 21Z" /><path d="M9 8h6M9 12h6" /></svg>;
    case "menu": return <svg {...common}><path d="M4 14c0-3.6 3.2-5.5 8-5.5s8 1.9 8 5.5a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 14Z" /><path d="M9 11l-1 3M15 11l1 3" opacity=".6" /></svg>;
    case "inventory": return <svg {...common}><path d="M3 7l9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></svg>;
    case "messages": return <svg {...common}><path d="M4 5h16v11H9l-4 3v-3H4Z" /><path d="M8 9h8M8 12h5" opacity=".6" /></svg>;
    case "bell": return <svg {...common}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>;
    default: return null;
  }
}

function orderStatus(o: Order, outIds: Set<string>, menu: { id: string; needs: string[] }[]) {
  if (o.status === "refunded") return { label: "refunded", tone: "muted" as const };
  if (o.status === "ready") return { label: "ready", tone: "ok" as const };
  const blocked = o.items.some((i) => menu.find((m) => m.id === i)?.needs.some((n) => outIds.has(n)));
  if (blocked) return { label: "blocked", tone: "alert" as const };
  if (o.overdue) return { label: "overdue", tone: "alert" as const };
  return { label: "in queue", tone: "warn" as const };
}
const CHIP: Record<string, string> = {
  alert: "bg-alert-bg text-alert",
  warn: "bg-warn-bg text-warn",
  ok: "bg-ok-bg text-ok",
  muted: "bg-charcoal text-faint",
};
function Chip({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`masthead rounded px-1.5 py-0.5 text-[10px] ${CHIP[tone]}`}>{children}</span>;
}
function Dot({ tone }: { tone: string }) {
  const c = tone === "alert" ? "bg-alert" : tone === "warn" ? "bg-warn" : "bg-ok";
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${c} ${tone === "alert" ? "pulse-soft" : ""}`} />;
}

function Panel({ id, title, icon, right, children }: { id?: string; title: string; icon?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-[12px] border border-line bg-surface">
      <header className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="masthead flex items-center gap-2 text-[11px] text-ink">
          {icon && <Icon name={icon} className="text-olive" />}
          {title}
        </p>
        {right}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function AttentionRow({ a }: { a: Alert }) {
  const [reply, setReply] = useState("");
  const tone = a.severity === "red" ? "alert" : "warn";
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-1.5"><Dot tone={tone} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink">{a.title}</p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-body">{a.detail}</p>
        {a.kind === "message_unanswered" && (
          <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (reply.trim()) replyToMessage(a.messageId!, reply.trim(), "you"); }}>
            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply…" className="min-w-0 flex-1 rounded-btn border border-line bg-paper px-2.5 py-1 text-[13px] text-ink outline-none focus:border-brick" />
            <button className="cockpit-btn text-[12px]">Send</button>
          </form>
        )}
      </div>
      {a.kind !== "message_unanswered" && (
        <button
          className="cockpit-btn shrink-0 text-[12px]"
          onClick={() => {
            if (a.kind === "supply_out" || a.kind === "supply_low") reorderSupply(a.supplyId!, "you");
            else if (a.kind === "item_needs_missing_supply") set86(a.itemId!, true, "you");
            else if (a.kind === "order_unfulfillable") refundOrder(a.orderId!, "you");
            else if (a.kind === "order_overdue") markReady(a.orderId!, "you");
          }}
        >
          {a.kind === "supply_out" || a.kind === "supply_low" ? "Reorder" : a.kind === "item_needs_missing_supply" ? "86" : a.kind === "order_unfulfillable" ? "Refund" : "Ready"}
        </button>
      )}
    </div>
  );
}

const NAV = [
  { id: "today", label: "Today", icon: "today" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "menu", label: "Menu", icon: "menu" },
  { id: "inventory", label: "Inventory", icon: "inventory" },
  { id: "messages", label: "Messages", icon: "messages" },
];

export default function Dashboard() {
  const { state, alerts } = useCockpit();
  const [agent, setAgent] = useState(false);
  useEffect(() => setAgent(getModelContext() !== null), [state]);

  const outIds = new Set(state.supplies.filter((s) => s.status === "out").map((s) => s.id));
  const openOrders = state.orders.filter((o) => o.status === "new").length;
  const onMenu = state.menu.filter((m) => m.available).length;
  const atRisk = state.orders.filter((o) => o.status === "new").reduce((s, o) => s + o.items.reduce((t, id) => t + (state.menu.find((m) => m.id === id)?.price ?? 0), 0), 0);
  const clear = alerts.length === 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-body">
      <FlourDust />
      <div className="oven-glow pointer-events-none absolute left-1/2 top-0 z-0 h-[280px] w-[620px] -translate-x-1/2" aria-hidden="true" style={{ background: "radial-gradient(closest-side, rgba(224,162,92,0.16), transparent)" }} />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[228px] shrink-0 flex-col justify-between bg-charcoal px-4 py-5 text-white md:flex">
          <div>
            <div className="flex items-center gap-2.5 px-2 text-white/85">
              <SteamingLoaf />
              <div className="leading-none">
                <span className="masthead block text-[15px] tracking-[0.2em] text-white">Chez Amélie</span>
                <span className="masthead mt-1 block text-[9px] tracking-[0.28em] text-white/45">Back of house</span>
              </div>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <a key={n.id} href={`#${n.id}`} className={`flex items-center gap-3 rounded-btn px-3 py-2 text-[13.5px] transition-colors ${i === 0 ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"}`}>
                  <Icon name={n.icon} /> {n.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="px-2">
            <span className={`masthead inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] ${agent ? "bg-ok text-charcoal" : "bg-white/10 text-white/55"}`}>
              {agent ? "● agent connected" : "○ manual mode"}
            </span>
            <div className="mt-4 flex items-center gap-2.5">
              <BakeryCat />
              <div className="leading-tight">
                <p className="masthead text-[10px] text-white/45">Amélie · owner</p>
                <p className="masthead text-[9px] text-white/30">&amp; Brioche, the shop cat</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-3">
            <div>
              <p className="masthead text-[10px] tracking-[0.2em] text-olive">Tuesday · morning service</p>
              <h1 className="font-display text-2xl not-italic text-ink">Today</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="md:hidden">
                <span className={`masthead rounded-full px-2.5 py-1 text-[10px] ${agent ? "bg-ok text-charcoal" : "bg-white/10 text-body"}`}>{agent ? "agent" : "manual"}</span>
              </span>
              <span className="relative inline-flex items-center gap-1.5 text-ink">
                <Icon name="bell" />
                {alerts.length > 0 && <span className="num rounded-full bg-alert px-1.5 py-0.5 text-[10px] text-charcoal">{alerts.length}</span>}
              </span>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1100px] px-6 py-6">
            {/* KPI strip */}
            <div id="today" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-[10px] border border-line bg-surface px-4 py-3">
                <p className="masthead text-[11px] text-olive">Needs attention</p>
                <p className={`num mt-1 text-3xl ${alerts.length ? "text-alert" : "text-ok"}`}><AnimatedInt value={alerts.length} /></p>
              </div>
              <div className="rounded-[10px] border border-line bg-surface px-4 py-3">
                <p className="masthead text-[11px] text-olive">Open tickets</p>
                <p className="num mt-1 text-3xl text-ink"><AnimatedInt value={openOrders} /></p>
              </div>
              <div className="rounded-[10px] border border-line bg-surface px-4 py-3">
                <p className="masthead text-[11px] text-olive">In the queue</p>
                <p className="num mt-1 text-3xl text-ink">{money(atRisk)}</p>
              </div>
              <div className="rounded-[10px] border border-line bg-surface px-4 py-3">
                <p className="masthead text-[11px] text-olive">On the menu</p>
                <p className="num mt-1 text-3xl text-ink">{onMenu}/{state.menu.length}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <div className="flex flex-col gap-5">
                <Panel title="Needs attention" icon="bell" right={alerts.length > 0 ? <span className="num rounded bg-alert px-1.5 py-0.5 text-[10px] text-charcoal">{alerts.length}</span> : <span className="masthead text-[10px] text-ok">clear</span>}>
                  {clear ? (
                    <p className="py-2 text-[13.5px] text-body">All clear. The board’s quiet — the oven can have you back now.</p>
                  ) : (
                    <div className="-my-1 divide-y divide-line">{alerts.map((a) => <AttentionRow key={a.id} a={a} />)}</div>
                  )}
                </Panel>

                <Panel id="orders" title="Live orders" icon="orders" right={<span className="masthead text-[10px] text-faint">{state.orders.length} today</span>}>
                  <table className="w-full text-[13.5px]">
                    <thead>
                      <tr className="masthead text-left text-[10px] text-faint">
                        <th className="pb-2 font-normal">Order</th>
                        <th className="pb-2 font-normal">Pickup</th>
                        <th className="pb-2 text-right font-normal">Total</th>
                        <th className="pb-2 text-right font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {state.orders.map((o) => {
                        const st = orderStatus(o, outIds, state.menu);
                        const total = o.items.reduce((t, id) => t + (state.menu.find((m) => m.id === id)?.price ?? 0), 0);
                        return (
                          <tr key={o.id}>
                            <td className="py-2.5"><span className="text-ink">{o.customer}</span><span className="num block text-[11px] text-faint">{o.id} · {o.items.length} item{o.items.length > 1 ? "s" : ""}</span></td>
                            <td className="num py-2.5 text-body">{o.pickup}</td>
                            <td className="num py-2.5 text-right text-ink">{money(total)}</td>
                            <td className="py-2.5 text-right"><Chip tone={st.tone}>{st.label}</Chip></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Panel>
              </div>

              <div className="flex flex-col gap-5">
                <Panel id="inventory" title="Inventory" icon="inventory">
                  <ul className="flex flex-col gap-2.5 text-[13.5px]">
                    {state.supplies.map((s) => (
                      <li key={s.id} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-ink"><Dot tone={s.status === "out" ? "alert" : s.status === "low" ? "warn" : "ok"} /> {s.name}</span>
                        {s.status === "in" ? <span className="masthead text-[10px] text-faint">stocked</span> : <button className="cockpit-btn text-[12px]" onClick={() => reorderSupply(s.id, "you")}>reorder</button>}
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel id="menu" title="Menu · 86 board" icon="menu">
                  <ul className="flex flex-col gap-2.5 text-[13.5px]">
                    {state.menu.map((m) => (
                      <li key={m.id} className="flex items-center justify-between gap-3">
                        <span className={m.available ? "text-ink" : "text-faint line-through"}>{m.name}</span>
                        <span className="flex items-center gap-3"><span className="num text-brick">{money(m.price)}</span><button className="cockpit-btn text-[12px]" onClick={() => set86(m.id, m.available, "you")}>{m.available ? "86" : "back"}</button></span>
                      </li>
                    ))}
                  </ul>
                </Panel>

                <Panel id="messages" title="Messages" icon="messages" right={<span className="masthead text-[10px] text-faint">{state.messages.filter((m) => !m.answered).length} waiting</span>}>
                  <ul className="flex flex-col gap-3 text-[13px]">
                    {state.messages.map((m) => (
                      <li key={m.id}>
                        <p className="text-ink"><span className="font-medium">{m.customer}</span> <span className="text-body">— {m.text}</span></p>
                        {m.answered ? <p className="masthead mt-1 text-[10px] text-ok">replied</p> : <p className="masthead mt-1 text-[10px] text-warn">waiting — reply in Needs attention</p>}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </div>

            <section className="mt-5 rounded-[12px] border border-line bg-surface">
              <header className="border-b border-line px-4 py-2.5"><p className="masthead text-[11px] text-ink">Activity log</p></header>
              <div className="p-2">
                {state.log.length === 0 ? (
                  <p className="px-2 py-3 text-[13px] text-faint">No changes yet today.</p>
                ) : (
                  <ul className="divide-y divide-line">
                    {state.log.map((l) => (
                      <li key={l.id} className="log-in flex items-baseline gap-3 px-2 py-2 text-[13px]">
                        <span className="num shrink-0 text-[10px] text-faint">{l.at}</span>
                        <span className="flex-1 text-body">{l.text}</span>
                        <span className={`masthead shrink-0 text-[9px] ${l.by === "agent" ? "text-ok" : "text-faint"}`}>{l.by}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
