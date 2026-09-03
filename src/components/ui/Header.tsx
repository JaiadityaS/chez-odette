export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-brick text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="leading-none">
            <span className="block text-lg font-medium uppercase tracking-[0.22em]">
              Chez Odette
            </span>
            <span lang="fr" className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-white/70">
              Boulangerie · Pâtisserie
            </span>
          </a>
          <nav lang="fr" className="hidden items-center gap-8 text-[14px] text-white/85 md:flex">
            <a href="#bake" className="hover:text-white transition-colors">La carte</a>
            <a href="#moments" className="hover:text-white transition-colors">Nos moments</a>
            <a href="#story" className="hover:text-white transition-colors">Notre histoire</a>
          </nav>
          <a
            href="#bake"
            lang="fr"
            className="rounded-btn bg-white/95 px-4 py-1.5 text-sm font-medium text-brick hover:bg-white transition-colors"
          >
            Commander
          </a>
        </div>
      </div>
      <div className="awning" aria-hidden="true" />
    </header>
  );
}
