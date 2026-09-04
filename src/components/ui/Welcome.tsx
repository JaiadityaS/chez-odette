import { getStory } from "@/lib/bakery";
import SectionHead from "./SectionHead";

export default function Welcome() {
  return (
    <section id="story" className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          rubric="Le mot d’Amélie"
          rubricEn="Our story"
          title="The starter is older than the building"
          aside="La Maison"
        />
        <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-12">
          <p className="dropcap text-[18px] leading-relaxed text-body md:col-span-7">
            {getStory()}
          </p>
          <aside className="border-t-2 border-ink pt-4 md:col-span-4 md:col-start-9">
            <p className="font-display text-2xl italic leading-snug text-ink">
              &ldquo;If I wouldn&rsquo;t eat it myself, it doesn&rsquo;t leave the oven.&rdquo;
            </p>
            <p className="masthead mt-3 text-[11px] text-olive">Amélie, the baker</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
