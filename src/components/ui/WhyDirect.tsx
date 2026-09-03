const POINTS = [
  {
    value: "≈30%",
    label: "the cut a marketplace skims off every order — here, Odette keeps it.",
  },
  {
    value: "Your name",
    label: "stays with Odette, never sold to an app or an algorithm.",
  },
  {
    value: "The whole story",
    label: "every loaf still comes from her hands, with its reason to exist.",
  },
];

export default function WhyDirect() {
  return (
    <section className="bg-brick text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Why order direct
          </p>
          <h2 className="text-3xl text-white md:text-4xl">When you buy here, it stays here</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/85">
            Order straight from Odette and nothing is lost to a middleman — not the price,
            not the relationship, not the story. Whether you tap the button yourself or your
            assistant does it for you, it still comes from her hands to yours.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.value}
              className="bg-surface p-6 text-center"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div className="font-display text-3xl text-brick">{p.value}</div>
              <p className="mt-2 text-sm leading-relaxed text-body">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
