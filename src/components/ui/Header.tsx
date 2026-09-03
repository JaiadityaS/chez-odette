export default function Header() {
  return (
    <header className="relative flex flex-col items-center pt-8 pb-6 border-b border-line">
      <div className="text-center">
        <div className="font-script text-4xl text-ink leading-none">Chez Odette</div>
        <div className="mt-1 text-[10px] tracking-[0.32em] uppercase text-body">
          Bakehouse
        </div>
      </div>

      <nav className="mt-5 flex items-center gap-8 text-[15px] text-body">
        <a href="#bake" className="hover:text-ink transition-colors">Today&rsquo;s bake</a>
        <a href="#story" className="hover:text-ink transition-colors">Our story</a>
        <a href="#visit" className="hover:text-ink transition-colors">Visit</a>
      </nav>

      <a
        href="#bake"
        className="absolute right-6 top-8 rounded-btn bg-accent px-4 py-2 text-sm text-white hover:bg-accent-ink transition-colors"
      >
        Order
      </a>
    </header>
  );
}
