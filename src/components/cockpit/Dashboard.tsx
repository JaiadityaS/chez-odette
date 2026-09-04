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

const RED = { bg: "#f6e5e1", line: "#e0b4aa", ink: "#8f2f22" };
const AMBER = { bg: "#f7efda", line: "#e4d3a0", ink: "#7a5c14" };
const OK = { bg: "#e9f0e6", line: "#c2d4b8", ink: "#39603a" };

function euros(n: number) {
  return `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

function AlertCard({ a }: { a: Alert }) {
  const c = a.severity === "red" ? RED : AMBER;
  const [reply, setReply] = useState("");
  return (
    <div className="rounded-[10px] p-3.5" style={{ background: c.bg, border: `1px solid ${c.line}` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-medium" style={{ color: c.ink }}>{a.title}</p>
          <p className="mt-0.5 text-[13px] leading-snug text-body">{a.detail}</p>
        </div>
        <span
          className="masthead shrink-0 rounded px-1.5 py-0.5 text-[10px]"
          style={{ background: c.ink, color: c.bg }}
        >
          {a.severity === "red" ? "action" : "soon"}
        </span>
      </div>

      <div className="mt-3">
        {a.kind === "supply_out" || a.kind === "supply_low" ? (
          <button className="cockpit-btn" style={{ borderColor: c.ink, color: c.ink }} onClick={() => reorderSupply(a.supplyId!, "you")}>
            Reorder
          </button>
        ) : a.kind === "item_needs_missing_supply" ? (
          <button className="cockpit-btn" style={{ borderColor: c.ink, color: c.ink }} onClick={() => set86(a.itemId!, true, "you")}>
            86 it
          </button>
        ) : a.kind === "order_unfulfillable" ? (
          <button className="cockpit-btn" style={{ borderColor: c.ink, color: c.ink }} onClick={() => refundOrder(a.orderId!, "you")}>
            Refund
          </button>
        ) : a.kind === "order_overdue" ? (
          <button className="cockpit-btn" style={{ borderColor: c.ink, color: c.ink }} onClick={() => markReady(a.orderId!, "you")}>
            Mark ready
          </button>
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
              placeholder="Type a reply…"
              className="min-w-0 flex-1 rounded-btn border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-brick"
            />
            <button className="cockpit-btn" style={{ borderColor: c.ink, color: c.ink }}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-line bg-surface p-4">
      <p className="masthead mb-3 text-[11px] text-olive">{title}</p>
      {children}
    </div>
  );
}

function dot(status: string) {
  const c = status === "out" ? "#a5382c" : status === "low" ? "#b0851f" : "#4f7a52";
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />;
}

export default function Dashboard() {
  const { state, alerts } = useCockpit();
  const [agent, setAgent] = useState(false);
  useEffect(() => setAgent(getModelContext() !== null), [state]);

  const red = alerts.filter((a) => a.severity === "red").length;
  const clear = alerts.length === 0;
  const waiting = state.messages.filter((m) => !m.answered).length + state.orders.filter((o) => o.status === "new").length;
  const atRisk = state.orders
    .filter((o) => o.status === "new")
    .reduce((s, o) => s + o.items.reduce((t, id) => t + (state.menu.find((m) => m.id === id)?.price ?? 0), 0), 0);

  return (
    <div className="min-h-screen bg-paper">
      {/* Masthead */}
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3.5">
          <div className="leading-none">
            <span className="masthead block text-lg tracking-[0.24em]">Chez Amélie</span>
            <span className="masthead mt-1 block text-[10px] tracking-[0.3em] text-white/55">Back of house</span>
          </div>
          <span
            className="masthead rounded-full px-3 py-1 text-[11px]"
            style={agent ? { background: "#4f7a52", color: "#fff" } : { background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.7)" }}
          >
            {agent ? "● agent connected" : "○ manual mode — no agent"}
          </span>
        </div>
      </header>
      <div className="awning" aria-hidden="true" />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Health strip */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] px-6 py-5"
          style={clear ? { background: OK.bg, border: `1px solid ${OK.line}` } : { background: RED.bg, border: `1px solid ${RED.line}` }}
        >
          <div>
            <p className="masthead text-[11px]" style={{ color: clear ? OK.ink : RED.ink }}>
              {clear ? "all clear" : "needs you"}
            </p>
            <p className="font-display text-5xl" style={{ color: clear ? OK.ink : RED.ink }}>
              {clear ? "0" : alerts.length}
              <span className="ml-2 font-sans text-base align-middle text-body">
                {clear ? "nothing waiting — go bake" : `${red} urgent`}
              </span>
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="masthead text-[11px] text-olive">customers waiting</p>
              <p className="font-display text-2xl text-ink">{waiting}</p>
            </div>
            <div>
              <p className="masthead text-[11px] text-olive">€ at risk</p>
              <p className="font-display text-2xl text-ink">{euros(atRisk)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Alerts */}
          <section>
            <p className="masthead mb-3 text-[11px] text-olive">the morning ({alerts.length})</p>
            <div className="flex flex-col gap-3">
              {clear ? (
                <div className="rounded-[12px] p-6 text-center" style={{ background: OK.bg, border: `1px solid ${OK.line}` }}>
                  <p className="font-display text-2xl" style={{ color: OK.ink }}>All clear.</p>
                  <p className="mt-1 text-sm text-body">The board is quiet. Nothing needs you right now.</p>
                </div>
              ) : (
                alerts.map((a) => <AlertCard key={a.id} a={a} />)
              )}
            </div>
          </section>

          {/* Activity feed */}
          <section>
            <p className="masthead mb-3 text-[11px] text-olive">activity</p>
            <div className="rounded-[12px] border border-line bg-surface p-4">
              {state.log.length === 0 ? (
                <p className="text-sm text-faint">Nothing done yet. Fix something, or ask the shop to.</p>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {state.log.map((l) => (
                    <li key={l.id} className="flex items-baseline gap-2 text-[13px]">
                      <span className="masthead shrink-0 text-[10px]" style={{ color: l.by === "agent" ? "#4f7a52" : "var(--color-faint)" }}>
                        {l.at} · {l.by}
                      </span>
                      <span className="text-body">{l.text}</span>
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
            <ul className="flex flex-col gap-2 text-[14px]">
              {state.supplies.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-ink">{dot(s.status)} {s.name}</span>
                  {s.status === "in" ? (
                    <span className="text-[12px] text-faint">ok</span>
                  ) : (
                    <button className="cockpit-btn text-[12px]" onClick={() => reorderSupply(s.id, "you")}>reorder</button>
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Today's menu">
            <ul className="flex flex-col gap-2 text-[14px]">
              {state.menu.map((m) => (
                <li key={m.id} className="flex items-center justify-between">
                  <span className={m.available ? "text-ink" : "text-faint line-through"}>{m.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="font-display text-brick">{euros(m.price)}</span>
                    <button className="cockpit-btn text-[12px]" onClick={() => set86(m.id, m.available, "you")}>
                      {m.available ? "86" : "back"}
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Orders">
            <ul className="flex flex-col gap-2 text-[14px]">
              {state.orders.map((o) => (
                <li key={o.id} className="flex items-center justify-between">
                  <span className="text-ink">
                    {o.customer} <span className="text-faint">· {o.id} · {o.pickup}</span>
                  </span>
                  <span
                    className="masthead rounded px-1.5 py-0.5 text-[10px]"
                    style={
                      o.status === "refunded"
                        ? { background: "#efe0dd", color: "#8f2f22" }
                        : o.status === "ready"
                          ? { background: "#e9f0e6", color: "#39603a" }
                          : { background: "#f2ead8", color: "#7a5c14" }
                    }
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
