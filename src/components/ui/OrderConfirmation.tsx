"use client";

import { useEffect, useState } from "react";
import type { OrderConfirmation as Confirmation } from "@/lib/bakery";

// Listens for the `storefront:order` event — dispatched by the WebMCP
// place_order tool OR the human UI — and shows the confirmation. This is how an
// agent's action appears in the human's view (see docs/CONTRACT.md).
export default function OrderConfirmation() {
  const [order, setOrder] = useState<Confirmation | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Confirmation;
      setOrder(detail);
    };
    window.addEventListener("storefront:order", handler);
    return () => window.removeEventListener("storefront:order", handler);
  }, []);

  if (!order) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 border-t-4 border-brick bg-surface p-5 shadow-xl"
      style={{ borderRadius: "var(--radius-card)" }}
      role="status"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Order confirmed</p>
          <p className="font-display text-lg text-ink">Merci, see you soon</p>
        </div>
        <button
          onClick={() => setOrder(null)}
          aria-label="Dismiss"
          className="text-faint hover:text-ink"
        >
          ✕
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-body">{order.summary}</p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-faint">
        <span>#{order.orderId}</span>
        {order.keptFromAggregator > 0 && (
          <span className="font-medium text-sage-deep">
            €{order.keptFromAggregator.toFixed(2)} kept from the aggregators
          </span>
        )}
      </div>
    </div>
  );
}
