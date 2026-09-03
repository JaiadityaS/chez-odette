"use client";

import { useState } from "react";
import { getTodaysBake, placeOrder, type Product } from "@/lib/bakery";
import ProductCard from "./ProductCard";

const PICKUP_OPTIONS = ["Today", "Tomorrow", "This weekend"] as const;

export default function TodaysBake() {
  const products = getTodaysBake();

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

  // A real confirm step: nothing is ordered until the customer confirms, so one
  // click no longer places an irreversible order, and repeat clicks can't stack
  // up silent duplicates. Fires the same `storefront:order` event the WebMCP
  // place_order tool uses.
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
        <div className="text-center">
          <p className="eyebrow mb-3">Today&rsquo;s bake</p>
          <h2 className="text-3xl md:text-4xl">Find your favourite</h2>
          <p className="mx-auto mt-3 max-w-md text-[16px] text-body">
            Baked in small batches this morning. When a loaf is gone, it&rsquo;s gone
            until tomorrow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={open} />
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
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
            <p className="eyebrow mb-1">Order from Odette</p>
            <h3 className="text-ink text-xl">{selected.name}</h3>
            <p className="mt-1 text-sm text-body">
              €{Number.isInteger(selected.price) ? selected.price : selected.price.toFixed(2)} each · pickup
            </p>

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
