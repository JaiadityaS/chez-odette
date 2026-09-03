const POINTS = [
  { value: "≈30%", label: "the cut a marketplace skims off every order — here, Odette keeps it." },
  { value: "Your name", label: "stays with Odette, never sold to an app or an algorithm." },
  { value: "The whole story", label: "every loaf still comes from her hands, with its reason to exist." },
];

export default function WhyDirect() {
  return (
    <section className="bg-wood text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="masthead text-[12px] text-white/60">
              <span lang="fr">Pourquoi commander en direct</span>
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-5xl">When you buy here, it stays here</h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-white/80">
              Nothing is lost to a middleman — not the price, not the relationship, not the
              story. Whether you tap the button or your assistant does it for you, it still
              comes from her hands to yours.
            </p>
          </div>

          <dl className="md:col-span-7 md:col-start-6">
            {POINTS.map((p, i) => (
              <div
                key={p.value}
                className={`flex items-baseline gap-6 py-4 ${i > 0 ? "border-t border-white/20" : ""}`}
              >
                <dt className="w-40 shrink-0 font-display text-3xl text-brick md:text-4xl">{p.value}</dt>
                <dd className="text-[15px] leading-relaxed text-white/85">{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
