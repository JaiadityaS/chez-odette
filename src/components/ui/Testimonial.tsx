export default function Testimonial() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="eyebrow mb-3">
          <span lang="fr">Sourires &amp; histoires</span> <span className="en">· Smiles &amp; stories</span>
        </p>
        <div className="mb-4 text-brick" aria-label="Five out of five stars">
          ★★★★★
        </div>
        <blockquote className="font-display text-2xl leading-snug text-ink md:text-[28px]">
          &ldquo;I&rsquo;ve been coming since Odette&rsquo;s mother ran the counter. The shop
          has grown, but the bread still tastes like home.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-faint">— Amélie, a regular for 20 years</p>
      </div>
    </section>
  );
}
