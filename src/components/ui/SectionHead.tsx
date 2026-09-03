// Left-aligned, top-ruled editorial section header — a magazine rubric, not a
// centered eyebrow-over-heading stack. Title is intentionally not full-width.
export default function SectionHead({
  rubric,
  rubricEn,
  title,
  aside,
  className = "",
}: {
  rubric: string;
  rubricEn?: string;
  title: string;
  aside?: string;
  className?: string;
}) {
  return (
    <div className={`border-t-2 border-ink pt-4 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="masthead text-[12px] text-olive">
          <span lang="fr">{rubric}</span>
          {rubricEn && <span className="text-faint"> · {rubricEn}</span>}
        </span>
        {aside && (
          <span lang="fr" className="masthead text-[11px] text-faint">
            {aside}
          </span>
        )}
      </div>
      <h2 className="mt-3 max-w-[16ch] text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}
