import { getStory } from "@/lib/bakery";
import BreadMark from "./BreadMark";

export default function Story() {
  const story = getStory();
  return (
    <section id="story" className="grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:items-center">
      <div
        className="flex aspect-square items-center justify-center bg-blush-soft text-accent"
        style={{ borderRadius: "var(--radius-img)" }}
      >
        <BreadMark size={110} />
      </div>
      <div>
        <p className="eyebrow mb-3">Our story</p>
        <h2 className="text-3xl md:text-4xl">The starter is older than the building</h2>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-body">{story}</p>
        <p className="mt-4 font-display italic text-xl text-ink">
          &ldquo;If I wouldn&rsquo;t eat it myself, it doesn&rsquo;t leave the oven.&rdquo; — Odette
        </p>
      </div>
    </section>
  );
}
