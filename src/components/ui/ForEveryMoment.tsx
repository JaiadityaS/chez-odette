const MOMENTS = [
  {
    title: "Anniversaries & celebrations",
    text: "The walnut levain and other weekend bakes for the days that matter.",
    image: "/images/croissant.jpg",
  },
  {
    title: "The long table",
    text: "Big country rounds and baguettes for a slow dinner with people you love.",
    image: "/images/gathering.jpg",
  },
  {
    title: "Everyday",
    text: "The sourdough and seeded rye that quietly make an ordinary morning better.",
    image: "/images/sourdough.jpg",
  },
  {
    title: "Gifts & hampers",
    text: "A basket of Odette's best, wrapped by hand — never a gift card in an app.",
    image: "/images/hamper.jpg",
  },
];

export default function ForEveryMoment() {
  return (
    <section id="moments" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="eyebrow mb-3">Untuk setiap momen</p>
          <h2 className="text-3xl md:text-4xl">Chez Odette, for every moment</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOMENTS.map((m) => (
            <div
              key={m.title}
              className="flex flex-col overflow-hidden border border-line bg-sage"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <div className="aspect-[3/2] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-ink text-lg leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
