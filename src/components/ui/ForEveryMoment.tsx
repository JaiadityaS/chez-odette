import SectionHead from "./SectionHead";

const MOMENTS = [
  {
    title: "Anniversaries & celebrations",
    text: "The walnut levain and other weekend bakes for the days that matter.",
    image: "/images/walnut.jpg",
    span: "md:col-span-7",
  },
  {
    title: "The long table",
    text: "Big country rounds and baguettes for a slow dinner with people you love.",
    image: "/images/gathering.jpg",
    span: "md:col-span-5",
  },
  {
    title: "Everyday",
    text: "The sourdough and seeded rye that quietly make an ordinary morning better.",
    image: "/images/sourdough.jpg",
    span: "md:col-span-5",
  },
  {
    title: "Gifts & hampers",
    text: "A basket of Amélie’s best, wrapped up by hand. Never a gift card in an app.",
    image: "/images/hamper.jpg",
    span: "md:col-span-7",
  },
];

export default function ForEveryMoment() {
  return (
    <section id="moments" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          rubric="Nos moments"
          rubricEn="For every moment"
          title="Bread for every hour of the day"
          aside="la maison"
        />

        <div className="mt-9 grid gap-x-8 gap-y-10 md:grid-cols-12">
          {MOMENTS.map((m) => (
            <figure key={m.title} className={`${m.span} group`}>
              <div className="overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-64"
                />
              </div>
              <figcaption className="mt-3 border-t border-ink/15 pt-3">
                <h3 className="font-display text-2xl text-ink">{m.title}</h3>
                <p className="mt-1 max-w-md text-[15px] leading-relaxed text-body">{m.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
