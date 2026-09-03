export default function Header() {
  return (
    <header className="w-full bg-brick text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="text-lg font-medium tracking-[0.22em] uppercase">
          Chez Odette
        </a>
        <nav className="hidden items-center gap-8 text-[14px] text-white/85 md:flex">
          <a href="#bake" className="hover:text-white transition-colors">Menu</a>
          <a href="#moments" className="hover:text-white transition-colors">For every moment</a>
          <a href="#story" className="hover:text-white transition-colors">Our story</a>
        </nav>
        <a
          href="#bake"
          className="rounded-btn bg-white/95 px-4 py-1.5 text-sm font-medium text-brick hover:bg-white transition-colors"
        >
          Order
        </a>
      </div>
    </header>
  );
}
