"use client";

import type { Product } from "@/lib/bakery";
import BreadMark from "./BreadMark";

export default function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder?: (p: Product) => void;
}) {
  const { name, price, soldOut, story, tags } = product;
  return (
    <div
      className="flex flex-col border border-line bg-surface p-4"
      style={{ borderRadius: "var(--radius-card)", opacity: soldOut ? 0.72 : 1 }}
    >
      <div
        className="mb-4 flex aspect-[4/3] items-center justify-center bg-blush-soft text-accent"
        style={{ borderRadius: "var(--radius-img)" }}
      >
        <BreadMark size={56} />
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl">{name}</h3>
        <span className="font-display text-[15px] text-accent whitespace-nowrap">
          ${price}
        </span>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-1 text-xs uppercase tracking-[0.08em] text-faint">
          {tags.join(" · ")}
        </div>
      )}

      <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{story}</p>

      {soldOut ? (
        <span className="mt-4 inline-block self-start rounded-full bg-faint px-3 py-1 text-xs uppercase tracking-[0.08em] text-white">
          Sold out today
        </span>
      ) : (
        <button
          onClick={() => onOrder?.(product)}
          className="mt-4 rounded-btn border border-accent px-4 py-2 text-sm text-accent hover:bg-accent hover:text-white transition-colors"
        >
          Add to order
        </button>
      )}
    </div>
  );
}
