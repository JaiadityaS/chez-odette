const ITEMS = [
  "Everything from scratch",
  "Organic flour",
  "72-hour levain",
  "Baked before dawn",
];

export default function FeatureBar() {
  return (
    <div className="bg-blush" style={{ borderRadius: "var(--radius-card)" }}>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-3 text-center text-xs uppercase tracking-[0.08em] text-accent-ink">
        {ITEMS.map((item, i) => (
          <span key={item} className="flex items-center gap-6">
            {item}
            {i < ITEMS.length - 1 && (
              <span className="text-accent/50" aria-hidden="true">
                |
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
