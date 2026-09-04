export default function Testimonial() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-baseline">
          <p className="masthead text-[12px] text-olive md:col-span-3">
            <span lang="fr">Sourires &amp; histoires</span>
          </p>
          <blockquote className="md:col-span-9">
            <p className="font-display text-3xl italic leading-tight text-ink md:text-4xl">
              &ldquo;I&rsquo;ve been coming here since Amélie&rsquo;s mother ran the counter.
              It&rsquo;s busier now, but the bread still tastes like home.&rdquo;
            </p>
            <footer className="masthead mt-5 text-[12px] text-body">
              Margaux <span className="text-brick">★★★★★</span>
              <span className="text-faint"> · a regular for 20 years</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
