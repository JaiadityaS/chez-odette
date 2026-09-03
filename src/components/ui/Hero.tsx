export default function Hero() {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <p className="eyebrow mb-4">
          <span lang="fr">Chez Odette</span> <span className="en">· since 1974</span>
        </p>
        <h1 className="text-5xl font-black md:text-6xl">Come in — the bread&rsquo;s still warm</h1>
        <p lang="fr" className="mt-3 font-display text-xl italic text-brick">
          « Entrez, le pain est encore chaud. »
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-body">
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
        <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/table.jpg"
            alt="A warm table of Chez Odette bread and bakes, shared by hand"
            className="h-[380px] w-full object-cover md:h-[460px]"
          />
          {/* Rotating "fait maison" stamp */}
          <div className="absolute bottom-5 right-5" aria-hidden="true">
            <svg
              className="stamp-spin"
              width="104"
              height="104"
              viewBox="0 0 120 120"
              style={{ filter: "drop-shadow(0 4px 12px rgba(51,39,30,0.28))" }}
            >
              <defs>
                <path
                  id="stamp-arc"
                  d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
                  fill="none"
                />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#f8f2e4" stroke="#d5883a" strokeWidth="2" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#d5883a" strokeWidth="0.75" opacity="0.5" />
              <text fill="#d5883a" fontSize="11" fontWeight="600" letterSpacing="3" fontFamily="var(--font-masthead)">
                <textPath href="#stamp-arc" startOffset="0">
                  · FAIT MAISON · DEPUIS 1974 · FAIT MAISON ·
                </textPath>
              </text>
              <text
                x="60"
                y="68"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="26"
                fontStyle="italic"
                fill="#17130d"
              >
                CO
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
