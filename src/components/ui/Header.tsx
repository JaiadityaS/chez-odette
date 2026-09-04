export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="leading-none">
            <span className="masthead block text-xl tracking-[0.26em]">Chez Amélie</span>
            <span lang="fr" className="masthead mt-1 block text-[10px] tracking-[0.34em] text-white/60">
              Boulangerie · Pâtisserie
            </span>
          </a>
          <nav lang="fr" className="masthead hidden items-center gap-8 text-[13px] text-white/80 md:flex">
            <a href="#bake" className="hover:text-white transition-colors">La carte</a>
            <a href="#moments" className="hover:text-white transition-colors">Nos moments</a>
            <a href="#story" className="hover:text-white transition-colors">Notre histoire</a>
          </nav>
          <a
            href="#bake"
            lang="fr"
            className="masthead rounded-btn bg-brick px-4 py-1.5 text-[13px] text-white hover:bg-brick-ink transition-colors"
          >
            Commander
          </a>
        </div>
      </div>
      <div className="awning" aria-hidden="true" />
    </header>
  );
}
