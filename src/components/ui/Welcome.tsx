import { getStory } from "@/lib/bakery";

export default function Welcome() {
  return (
    <section id="story" className="bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="eyebrow mb-3">
          <span lang="fr">Notre histoire</span> <span className="en">· Our story</span>
        </p>
        <h2 className="text-ink text-3xl md:text-4xl">Welcome to Chez Odette</h2>
        <p className="mt-5 text-[17px] leading-relaxed text-body">{getStory()}</p>
        <p className="mt-5 font-display italic text-xl text-brick">
          &ldquo;If I wouldn&rsquo;t eat it myself, it doesn&rsquo;t leave the oven.&rdquo;
          <span className="mt-1 block text-sm not-italic text-faint">— Odette</span>
        </p>
      </div>
    </section>
  );
}
