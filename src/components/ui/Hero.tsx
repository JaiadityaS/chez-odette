export default function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <p className="eyebrow mb-4">Chez Odette · since 1974</p>
        <h1 className="text-4xl md:text-5xl">Come in — the bread&rsquo;s still warm</h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-body">
          I&rsquo;m Odette. I&rsquo;ve baked here since 1974, from a starter older than the
          building. Order straight from me — it comes from my hands to yours, with no
          middleman taking a cut.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#bake"
            className="rounded-btn bg-brick px-6 py-3 text-white hover:bg-brick-ink transition-colors"
          >
            See today&rsquo;s bake
          </a>
          <a
            href="#story"
            className="rounded-btn border border-brick/40 px-6 py-3 text-brick hover:border-brick transition-colors"
          >
            Odette&rsquo;s story
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
