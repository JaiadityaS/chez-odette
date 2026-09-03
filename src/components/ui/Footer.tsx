export default function Footer() {
  return (
    <footer id="visit" className="bg-brick text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 text-center">
        <div className="text-lg font-medium uppercase tracking-[0.22em]">Chez Odette</div>
        <p className="mt-3 text-sm text-white/80">
          Open Tuesday–Sunday, 7am until the shelves are bare.
        </p>
        <p className="mt-1 text-sm text-white/70">14 Rue du Levain · your neighbourhood</p>
        <p className="mt-5 font-display italic text-base text-white/90">
          Ordered by an agent? It still came straight to Odette.
        </p>
        <p lang="fr" className="mt-4 font-display text-lg italic text-white/80">
          À bientôt.
        </p>
      </div>
    </footer>
  );
}
