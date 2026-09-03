export default function CtaBlock() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div
          className="bg-sage-mid px-6 py-12 text-center"
          style={{ borderRadius: "var(--radius-img)" }}
        >
          <h2 className="text-ink text-3xl md:text-4xl">Ready for your next moment?</h2>
          <p className="mx-auto mt-3 max-w-lg text-[16px] text-body">
            Order straight from Odette — for tomorrow&rsquo;s breakfast or Saturday&rsquo;s
            table. No marketplace, no middleman. It comes from her hands to yours.
          </p>
          <a
            href="#bake"
            className="mt-6 inline-block rounded-btn bg-brick px-6 py-3 text-white hover:bg-brick-ink transition-colors"
          >
            Order now
          </a>
        </div>
      </div>
    </section>
  );
}
