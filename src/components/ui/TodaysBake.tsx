"use client";

import { getTodaysBake, placeOrder, type Product } from "@/lib/bakery";
import ProductCard from "./ProductCard";

export default function TodaysBake() {
  const products = getTodaysBake();

  // Ordering from the human UI fires the same `storefront:order` event the
  // WebMCP place_order tool uses, so the confirmation panel works either way.
  function handleOrder(p: Product) {
    const confirmation = placeOrder({
      items: [{ id: p.id, qty: 1 }],
      fulfillment: "pickup",
      when: "today",
      contact: { name: "Guest" },
    });
    window.dispatchEvent(new CustomEvent("storefront:order", { detail: confirmation }));
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
            <ProductCard key={p.id} product={p} onOrder={handleOrder} />
          ))}
        </div>
      </div>
    </section>
  );
}
