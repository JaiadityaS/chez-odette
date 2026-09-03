"use client";

import type { Product } from "@/lib/bakery";

export default function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder?: (p: Product) => void;
}) {
  const { name, price, soldOut, story, tags, image } = product;
  return (
    <div
      className="flex flex-col overflow-hidden border border-line bg-surface"
      style={{ borderRadius: "var(--radius-card)", opacity: soldOut ? 0.78 : 1 }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            style={soldOut ? { filter: "grayscale(0.35)" } : undefined}
          />
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-brick px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white">
            Sold out today
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-ink text-xl">{name}</h3>
          <span className="font-display text-[15px] text-brick whitespace-nowrap">
            €{Number.isInteger(price) ? price : price.toFixed(2)}
          </span>
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-1 text-xs uppercase tracking-[0.08em] text-faint">
            {tags.join(" · ")}
          </div>
        )}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{story}</p>

        {soldOut ? (
          <span className="mt-4 text-sm italic text-faint">Back tomorrow morning.</span>
        ) : (
          <button
            onClick={() => onOrder?.(product)}
            className="mt-4 rounded-btn bg-brick px-4 py-2 text-sm text-white hover:bg-brick-ink transition-colors"
          >
            Order this
          </button>
        )}
      </div>
    </div>
  );
}
