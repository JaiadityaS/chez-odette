import Link from "next/link";

// The "before": Odette on a generic marketplace. Deliberately cold and
// brand-stripped — she's row #47, her story gone, prices marked up, fees
// stacked, indistinguishable from every other row. DashBite is fictional
// (no real aggregator is impersonated). This is a demo contrast asset.

type Listing = {
  rank: number;
  name: string;
  tags: string;
  rating: number;
  reviews: number;
  eta: string;
  deliveryFee: string;
  sponsored?: boolean;
  isOdette?: boolean;
};

const LISTINGS: Listing[] = [
  { rank: 1, name: "Golden Crust Bakery", tags: "Bakery · Bread · $$", rating: 4.5, reviews: 2140, eta: "20–35 min", deliveryFee: "$0.99", sponsored: true },
  { rank: 2, name: "Sunrise Breads & Co.", tags: "Bakery · Pastries · $$", rating: 4.4, reviews: 1877, eta: "25–40 min", deliveryFee: "$1.99", sponsored: true },
  { rank: 3, name: "The Daily Loaf", tags: "Bakery · Sandwiches · $", rating: 4.6, reviews: 3320, eta: "15–30 min", deliveryFee: "$2.49" },
  { rank: 4, name: "FlourPower Artisan", tags: "Bakery · Organic · $$", rating: 4.3, reviews: 902, eta: "30–45 min", deliveryFee: "$0.99" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500" aria-label={`${rating} stars`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-gray-300">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

function Row({ l }: { l: Listing }) {
  return (
    <div
      className={`flex items-center gap-4 border-b border-gray-200 px-4 py-3 ${
        l.isOdette ? "bg-teal-50/40" : "bg-white"
      }`}
    >
      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="w-8 text-xs text-gray-400">#{l.rank}</span>
          <span className="truncate text-[15px] font-medium text-gray-900">{l.name}</span>
          {l.sponsored && (
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-500">
              Sponsored
            </span>
          )}
        </div>
        <div className="mt-0.5 truncate pl-10 text-[13px] text-gray-500">{l.tags}</div>
        <div className="mt-1 flex items-center gap-3 pl-10 text-[12px] text-gray-500">
          <span>
            <Stars rating={l.rating} /> <span className="text-gray-400">({l.reviews.toLocaleString()})</span>
          </span>
          <span>·</span>
          <span>{l.eta}</span>
          <span>·</span>
          <span>{l.deliveryFee} delivery</span>
        </div>
      </div>
      <button className="rounded-md bg-teal-600 px-3 py-1.5 text-[13px] font-medium text-white">
        Order
      </button>
    </div>
  );
}

export default function AggregatorPage() {
  const odette: Listing = {
    rank: 47,
    name: "Chez Odette",
    tags: "Bakery · Bread · $$",
    rating: 4.7,
    reviews: 128,
    eta: "35–50 min",
    deliveryFee: "$4.99",
    isOdette: true,
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: "var(--font-sans)" }}>
      {/* top bar */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <span className="text-lg font-bold text-teal-600">DashBite</span>
          <div className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[13px] text-gray-400">
            Deliver to: 14 Rue du Levain ▾
          </div>
          <span className="text-gray-400">🛒</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-5">
        {/* filter chips */}
        <div className="mb-3 flex gap-2 overflow-x-auto text-[13px]">
          {["Sort: Sponsored", "Under 30 min", "$ Delivery", "Top rated", "Offers"].map((c) => (
            <span key={c} className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-600">
              {c}
            </span>
          ))}
        </div>

        <div className="mb-2 text-[13px] text-gray-500">213 bakeries near you</div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          {LISTINGS.map((l) => (
            <Row key={l.rank} l={l} />
          ))}

          {/* the gap — Odette is buried far down the list */}
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-center text-[12px] text-gray-400">
            … 42 more sponsored and promoted bakeries …
          </div>

          <Row l={odette} />
        </div>

        {/* what the shelf costs her */}
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-[13px] text-gray-600">
          <div className="mb-2 font-medium text-gray-900">Chez Odette — the fine print</div>
          <ul className="space-y-1">
            <li>· Menu prices <span className="font-medium text-gray-900">~18% higher</span> here to offset fees</li>
            <li>· <span className="font-medium text-gray-900">$4.99</span> delivery + <span className="font-medium text-gray-900">15%</span> service fee at checkout</li>
            <li>· DashBite keeps <span className="font-medium text-red-600">~30%</span> of every order — Odette keeps ~70%</li>
            <li>· Odette never sees the customer&rsquo;s name, email, or phone</li>
            <li>· Her story, her voice, her weekend walnut levain — none of it fits in a row</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-[13px]">
          <Link href="/" className="text-teal-700 underline">
            → See the same bakery on its own site
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-400">
          DashBite is a fictional marketplace shown for comparison. No real service is
          represented.
        </p>
      </div>
    </div>
  );
}
