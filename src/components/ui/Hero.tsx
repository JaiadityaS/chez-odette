export default function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl">A taste that connects every generation</h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-body">
          From the family loaf to something for a special occasion, Chez Odette
          brings warmth to every bite — the way it has since 1974.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#bake"
            className="rounded-btn bg-brick px-6 py-3 text-white hover:bg-brick-ink transition-colors"
          >
            See the menu
          </a>
          <a
            href="#moments"
            className="rounded-btn border border-brick/40 px-6 py-3 text-brick hover:border-brick transition-colors"
          >
            Order for an event
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-14">
        <div className="overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/table.jpg"
            alt="A warm table of Chez Odette bread and bakes, shared by hand"
            className="h-[380px] w-full object-cover md:h-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
