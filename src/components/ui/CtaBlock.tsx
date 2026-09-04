export default function CtaBlock() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="bg-sage-mid px-8 py-12" style={{ borderRadius: "var(--radius-img)" }}>
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="max-w-xl text-3xl text-ink md:text-4xl">Let me bake for your table</h2>
              <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-body">
                Tell me the day you need it and I&rsquo;ll have it wrapped warm for you,
                pickup or delivery. You order straight from me, so no marketplace gets a
                cut.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href="#bake"
                className="inline-block rounded-btn bg-brick px-6 py-3 text-white hover:bg-brick-ink transition-colors"
              >
                Order from Amélie
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
