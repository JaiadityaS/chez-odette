"use client";

import { useState } from "react";
import { getTodaysBake, placeOrder, type Product } from "@/lib/bakery";
import SectionHead from "./SectionHead";

const PICKUP_OPTIONS = ["Today", "Tomorrow", "This weekend"] as const;

function price(p: Product) {
  return `€${Number.isInteger(p.price) ? p.price : p.price.toFixed(2)}`;
}

export default function TodaysBake() {
  const products = getTodaysBake();
  const featured = products.find((p) => !p.soldOut) ?? products[0];
  const rest = products.filter((p) => p.id !== featured.id);

  const [selected, setSelected] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [when, setWhen] = useState<(typeof PICKUP_OPTIONS)[number]>("Today");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  function open(p: Product) {
    setSelected(p);
    setName("");
    setWhen("Today");
    setQty(1);
    setError("");
  }

  function confirm() {
    if (!selected) return;
    if (!name.trim()) {
      setError("Please add a name so Odette knows whose order it is.");
      return;
    }
    const confirmation = placeOrder({
      items: [{ id: selected.id, qty }],
      fulfillment: "pickup",
      when: when.toLowerCase(),
      contact: { name: name.trim() },
    });
    window.dispatchEvent(new CustomEvent("storefront:order", { detail: confirmation }));
    setSelected(null);
  }

  return (
    <section id="bake" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          rubric="La carte"
          rubricEn="Today’s bake"
          title="Fresh from this morning"
          aside="fait ce matin"
        />

        {/* Featured loaf — asymmetric, image-led */}
        <div className="mt-9 grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-center">
          <figure className="md:col-span-7">
            <div className="overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt={featured.name}
                className="h-[300px] w-full object-cover md:h-[420px]"
              />
            </div>
          </figure>
          <div className="md:col-span-5">
            <p className="masthead text-[11px] text-olive">Le pain du jour · today&rsquo;s loaf</p>
            <h3 className="mt-2 text-4xl md:text-5xl">{featured.name}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-body">{featured.story}</p>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="font-display text-3xl text-brick">{price(featured)}</span>
              <button
                onClick={() => open(featured)}
                className="rounded-btn bg-brick px-5 py-2.5 text-sm text-white hover:bg-brick-ink transition-colors"
              >
                Order this
              </button>
            </div>
          </div>
        </div>

        {/* The rest of the carte — a menu list, not a card grid */}
        <div className="mt-14 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {rest.map((p) => (
            <div key={p.id} className="flex items-start gap-4 border-t border-ink/15 pt-5">
              <div
                className="h-16 w-16 shrink-0 overflow-hidden rounded-[6px]"
                style={p.soldOut ? { filter: "grayscale(0.5)", opacity: 0.7 } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline">
                  <h4 className="font-display text-xl text-ink">{p.name}</h4>
                  <span className="leader" aria-hidden="true" />
                  <span className="font-display text-brick">{price(p)}</span>
                </div>
                <p className="mt-1 text-sm leading-snug text-body">{p.story}</p>
                {p.soldOut ? (
                  <p className="masthead mt-2 text-[11px] text-olive">Sold out — back tomorrow</p>
                ) : (
                  <button
                    onClick={() => open(p)}
                    className="masthead mt-2 text-[11px] text-brick hover:text-brick-ink"
                  >
                    Order &rarr;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Order ${selected.name}`}
        >
          <div
            className="w-full max-w-sm bg-surface p-6"
            style={{ borderRadius: "var(--radius-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="masthead text-[11px] text-olive">Order from Odette</p>
            <h3 className="mt-1 text-2xl">{selected.name}</h3>
            <p className="mt-1 text-sm text-body">{price(selected)} each · pickup</p>

            <label className="mt-4 block text-sm text-body">
              Your name
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. Amélie"
                className="mt-1 w-full rounded-btn border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brick"
              />
            </label>
            {error && <p className="mt-1 text-sm text-brick">{error}</p>}

            <div className="mt-3 flex gap-3">
              <label className="flex-1 text-sm text-body">
                Pickup
                <select
                  value={when}
                  onChange={(e) => setWhen(e.target.value as (typeof PICKUP_OPTIONS)[number])}
                  className="mt-1 w-full rounded-btn border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brick"
                >
                  {PICKUP_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="w-24 text-sm text-body">
                Quantity
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(6, Number(e.target.value) || 1)))}
                  className="mt-1 w-full rounded-btn border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brick"
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="rounded-btn px-4 py-2 text-sm text-body hover:text-ink"
              >
                Cancel
              </button>
              <button
                onClick={confirm}
                className="rounded-btn bg-brick px-5 py-2 text-sm text-white hover:bg-brick-ink transition-colors"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
