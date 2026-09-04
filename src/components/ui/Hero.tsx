export default function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        {/* Masthead dateline */}
        <div className="masthead flex items-center justify-between border-b border-ink pb-2 text-[11px] text-body">
          <span lang="fr">Rue du Levain · N&deg; 1</span>
          <span lang="fr" className="hidden sm:block">Boulangerie · Pâtisserie</span>
          <span lang="fr">Depuis 1974</span>
        </div>

        {/* Asymmetric front page: big headline left, lead + actions right */}
        <div className="grid gap-x-10 gap-y-6 pt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h1 className="text-5xl leading-[1.04] md:text-7xl">
              Come in, the bread&rsquo;s still warm
            </h1>
            <p lang="fr" className="mt-4 font-display text-2xl italic text-brick md:text-3xl">
              « Entrez, le pain est encore chaud. »
            </p>
          </div>
          <div className="md:col-span-4 md:pb-2">
            <p className="text-[16px] leading-relaxed text-body">
              I&rsquo;m Amélie. I&rsquo;ve baked here since 1974, from a starter that&rsquo;s
              older than the building. Order straight from me and nobody takes a cut in
              between.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#bake"
                className="rounded-btn bg-brick px-5 py-2.5 text-white hover:bg-brick-ink transition-colors"
              >
                See today&rsquo;s bake
              </a>
              <a
                href="#story"
                className="rounded-btn border border-ink/25 px-5 py-2.5 text-ink hover:border-ink transition-colors"
              >
                Amélie&rsquo;s story
              </a>
            </div>
          </div>
        </div>

        {/* Full-bleed-ish plate with a margin caption */}
        <figure className="mt-10">
          <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/table.jpg"
              alt="A warm table of Chez Amélie bread and bakes, shared by hand"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute bottom-5 right-5" aria-hidden="true">
              <svg
                className="stamp-spin"
                width="104"
                height="104"
                viewBox="0 0 120 120"
                style={{ filter: "drop-shadow(0 4px 12px rgba(23,19,13,0.3))" }}
              >
                <defs>
                  <path id="stamp-arc" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="#f8f2e4" stroke="#d5883a" strokeWidth="2" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#d5883a" strokeWidth="0.75" opacity="0.5" />
                <text fill="#d5883a" fontSize="11" fontWeight="600" letterSpacing="3" fontFamily="var(--font-masthead)">
                  <textPath href="#stamp-arc" startOffset="0">
                    · FAIT MAISON · DEPUIS 1974 · FAIT MAISON ·
                  </textPath>
                </text>
                <text x="60" y="68" textAnchor="middle" fontFamily="var(--font-display)" fontSize="26" fontStyle="italic" fill="#17130d">
                  CO
                </text>
              </svg>
            </div>
          </div>
          <figcaption lang="fr" className="masthead mt-2 text-[11px] text-faint">
            La table du matin. This morning&rsquo;s table.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
