"use client";

import { useEffect, useState } from "react";
import { useCockpit } from "./useCockpit";
import { getModelContext } from "@/lib/webmcp";
import {
  type Alert,
  reorderSupply,
  set86,
  refundOrder,
  markReady,
  replyToMessage,
} from "@/lib/store";

function euros(n: number) {
  return `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

const SEV = {
  red: { card: "bg-alert-bg border-alert-line", ink: "text-alert", chip: "bg-alert text-alert-bg", btn: "border-alert-line text-alert hover:bg-alert-bg" },
  amber: { card: "bg-warn-bg border-warn-line", ink: "text-warn", chip: "bg-warn text-warn-bg", btn: "border-warn-line text-warn hover:bg-warn-bg" },
};

function LoafMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 14c0-4 3.4-6 8-6s8 2 8 6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M9 10.6l-1.4 3M12.7 10.2l-1.4 3.4M16.4 10.6l-1.4 3" opacity="0.65" />
    </svg>
  );
}

function AlertCard({ a }: { a: Alert }) {
  const s = SEV[a.severity];
  const [reply, setReply] = useState("");
  return (
    <div className={`rounded-[10px] border p-4 ${s.card}`}>
      <div className="flex items-start justify-between gap-3">
        <p className={`text-[15px] font-medium ${s.ink}`}>{a.title}</p>
        <span className={`masthead shrink-0 rounded px-1.5 py-0.5 text-[10px] ${s.chip}`}>
          {a.severity === "red" ? "now" : "soon"}
        </span>
      </div>
      <p className="mt-1 text-[13px] leading-snug text-body">{a.detail}</p>

      <div className="mt-3">
        {a.kind === "supply_out" || a.kind === "supply_low" ? (
          <button className={`cockpit-btn ${s.btn}`} onClick={() => reorderSupply(a.supplyId!, "you")}>Reorder</button>
        ) : a.kind === "item_needs_missing_supply" ? (
          <button className={`cockpit-btn ${s.btn}`} onClick={() => set86(a.itemId!, true, "you")}>Take off menu</button>
        ) : a.kind === "order_unfulfillable" ? (
          <button className={`cockpit-btn ${s.btn}`} onClick={() => refundOrder(a.orderId!, "you")}>Refund</button>
        ) : a.kind === "order_overdue" ? (
          <button className={`cockpit-btn ${s.btn}`} onClick={() => markReady(a.orderId!, "you")}>Mark ready</button>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (reply.trim()) replyToMessage(a.messageId!, reply.trim(), "you");
            }}
          >
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write Amélie's reply…"
              className="min-w-0 flex-1 rounded-btn border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-brick"
            />
            <button className={`cockpit-btn ${s.btn}`}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-[92px]">
      <p className="masthead text-[10px] text-olive">{label}</p>
      <p className="tnum mt-0.5 font-display text-3xl text-ink">{value}</p>
    </div>
  );
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-line bg-surface p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="masthead text-[11px] text-olive">{title}</p>
        {note && <span className="masthead text-[10px] text-faint">{note}</span>}
      </div>
      {children}
    </div>
  );
}

function supplyDotClass(status: string) {
  return status === "out" ? "bg-alert" : status === "low" ? "bg-warn" : "bg-ok";
}

export default function Dashboard() {
  const { state, alerts } = useCockpit();
  const [agent, setAgent] = useState(false);
  useEffect(() => setAgent(getModelContext() !== null), [state]);

  const red = alerts.filter((a) => a.severity === "red").length;
  const amber = alerts.length - red;
  const clear = alerts.length === 0;
  const openOrders = state.orders.filter((o) => o.status === "new").length;
  const waiting = state.messages.filter((m) => !m.answered).length + openOrders;
  const atRisk = state.orders
    .filter((o) => o.status === "new")
    .reduce((sum, o) => sum + o.items.reduce((t, id) => t + (state.menu.find((m) => m.id === id)?.price ?? 0), 0), 0);

  const summary = clear
    ? "Nothing waiting. Go pull the levain out."
    : `${red} can’t wait${amber ? `, ${amber} can hold` : ""}.`;

  return (
    <div className="min-h-screen bg-paper">
      {/* Masthead */}
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <LoafMark className="text-white/80" />
            <div className="leading-none">
              <span className="masthead block text-lg tracking-[0.24em]">Chez Amélie</span>
              <span className="masthead mt-1 block text-[10px] tracking-[0.3em] text-white/55">Back of house · it’s just me today</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="masthead hidden text-[10px] tracking-[0.24em] text-white/45 sm:block">Tuesday · morning service</span>
            <span
              className={`masthead rounded-full px-3 py-1 text-[10px] ${agent ? "bg-ok text-white" : "bg-white/10 text-white/60"}`}
            >
              {agent ? "● agent connected" : "○ manual mode"}
            </span>
          </div>
        </div>
      </header>
      <div className="awning" aria-hidden="true" />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Status banner */}
        <section
          className={`flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-[14px] border px-6 py-5 ${
            clear ? "bg-ok-bg border-ok-line" : "bg-alert-bg border-alert-line"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className={`masthead rounded-full px-2.5 py-1 text-[10px] ${clear ? "bg-ok text-white" : "bg-alert text-white"}`}>
              {clear ? "all clear" : "needs you"}
            </span>
            <div className="flex items-baseline gap-3">
              <span className={`tnum font-display text-5xl leading-none ${clear ? "text-ok" : "text-alert"}`}>
                {clear ? "0" : alerts.length}
              </span>
              <span className="max-w-[16rem] text-[14px] leading-snug text-body">{summary}</span>
            </div>
          </div>
          <div className="flex gap-8">
            <Kpi label="waiting" value={waiting} />
            <Kpi label="€ at risk" value={euros(atRisk)} />
            <Kpi label="orders open" value={openOrders} />
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Alerts */}
          <section>
            <p className="masthead mb-3 text-[11px] text-olive">the morning · {alerts.length}</p>
            <div className="flex flex-col gap-3">
              {clear ? (
                <div className="flex items-center gap-4 rounded-[12px] border border-ok-line bg-ok-bg p-6">
                  <LoafMark size={30} className="text-ok" />
                  <div>
                    <p className="font-display text-2xl text-ok">All clear.</p>
                    <p className="mt-0.5 text-sm text-body">Board’s quiet. The oven can have you back now.</p>
                  </div>
                </div>
              ) : (
                alerts.map((a) => <AlertCard key={a.id} a={a} />)
              )}
            </div>
          </section>

          {/* Activity ledger */}
          <section>
            <p className="masthead mb-3 text-[11px] text-olive">activity · today</p>
            <div className="rounded-[12px] border border-line bg-surface">
              {state.log.length === 0 ? (
                <p className="p-4 text-sm text-faint">Nothing done yet. Fix something, or ask the shop to.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {state.log.map((l) => (
                    <li key={l.id} className="flex items-baseline gap-3 px-4 py-2.5 text-[13px]">
                      <span className={`tnum masthead shrink-0 text-[10px] ${l.by === "agent" ? "text-ok" : "text-faint"}`}>
                        {l.at}
                      </span>
                      <span className="flex-1 text-body">{l.text}</span>
                      <span className={`masthead shrink-0 text-[9px] ${l.by === "agent" ? "text-ok" : "text-faint"}`}>
                        {l.by === "agent" ? "agent" : "you"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {/* State panels */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Panel title="Supplies">
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {state.supplies.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink">
                    <span className={`inline-block h-2 w-2 rounded-full ${supplyDotClass(s.status)}`} />
                    {s.name}
                  </span>
                  {s.status === "in" ? (
                    <span className="masthead text-[10px] text-faint">stocked</span>
                  ) : (
                    <button className="cockpit-btn text-[12px]" onClick={() => reorderSupply(s.id, "you")}>reorder</button>
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Today’s menu">
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {state.menu.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3">
                  <span className={m.available ? "text-ink" : "text-faint line-through"}>{m.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="tnum font-display text-brick">{euros(m.price)}</span>
                    <button className="cockpit-btn text-[12px]" onClick={() => set86(m.id, m.available, "you")}>
                      {m.available ? "86" : "back"}
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Orders">
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {state.orders.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3">
                  <span className="text-ink">
                    {o.customer} <span className="tnum text-faint">· {o.id} · {o.pickup}</span>
                  </span>
                  <span
                    className={`masthead rounded px-1.5 py-0.5 text-[10px] ${
                      o.status === "refunded" ? "bg-alert-bg text-alert" : o.status === "ready" ? "bg-ok-bg text-ok" : "bg-warn-bg text-warn"
                    }`}
                  >
                    {o.status}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </main>
    </div>
  );
}
