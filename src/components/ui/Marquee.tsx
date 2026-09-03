const WORDS = [
  "Le pain de campagne",
  "La baguette de tradition",
  "Le croissant au beurre",
  "Le levain aux noix",
  "Le seigle aux graines",
  "Fait maison",
  "Depuis 1974",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-sage" aria-hidden="true">
      <div className="marquee-track flex w-max py-3">
        {[0, 1].map((copy) => (
          <ul key={copy} lang="fr" className="flex shrink-0 items-center">
            {WORDS.map((w, i) => (
              <li key={i} className="flex items-center">
                <span className="masthead px-6 text-[13px] text-ink">{w}</span>
                <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
                  <rect x="1" y="1" width="4" height="4" transform="rotate(45 3.5 3.5)" fill="#8f4b59" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
