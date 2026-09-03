export default function CtaBlock() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div
          className="bg-sage-mid px-6 py-12 text-center"
          style={{ borderRadius: "var(--radius-img)" }}
        >
          <h2 className="text-ink text-3xl md:text-4xl">Let me bake for your table</h2>
          <p className="mx-auto mt-3 max-w-lg text-[16px] text-body">
            Tell me the day and I&rsquo;ll have it wrapped warm — pickup or delivery,
            straight from me. No marketplace, no middleman, no stranger taking a cut.
          </p>
          <a
            href="#bake"
            className="mt-6 inline-block rounded-btn bg-brick px-6 py-3 text-white hover:bg-brick-ink transition-colors"
          >
            Order from Odette
          </a>
        </div>
      </div>
    </section>
  );
}
