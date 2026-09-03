import BreadMark from "./BreadMark";

export default function Hero() {
  return (
    <section className="relative grid gap-10 py-14 md:grid-cols-2 md:items-center">
      {/* blush stripes motif behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-6 -z-10 flex gap-3 opacity-70"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="block w-3 rounded-full bg-blush-soft"
            style={{ height: 180 }}
          />
        ))}
      </div>

      <div className="pl-2 md:pl-6">
        <p className="eyebrow mb-3">Paris in your neighborhood · since 1974</p>
        <h1 className="text-5xl md:text-6xl">Bread with a memory</h1>
        <p className="mt-3 font-display italic text-2xl text-ink">
          We bake it the way my grandmother did.
        </p>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-body">
          Every loaf comes from a starter older than the building — slow-proofed
          overnight, baked before the sun, and sold by the person who made it.
          Not a row on someone else&rsquo;s shelf.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#bake"
            className="rounded-btn bg-accent px-5 py-3 text-white hover:bg-accent-ink transition-colors"
          >
            Order today&rsquo;s bake
          </a>
          <a
            href="#story"
            className="rounded-btn border border-line px-5 py-3 text-ink hover:border-accent transition-colors"
          >
            Meet Odette
          </a>
        </div>
      </div>

      {/* warm placeholder image */}
      <div
        className="flex aspect-[4/3] items-center justify-center bg-blush text-accent"
        style={{ borderRadius: "var(--radius-img)" }}
      >
        <BreadMark size={96} />
      </div>
    </section>
  );
}
