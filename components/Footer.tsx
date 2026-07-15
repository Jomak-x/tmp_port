import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Resume", href: "/resume" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-orange-400/35 bg-[#090a0a] text-[#f2eee6]">
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12">
        <div>
          <p className="font-display text-3xl">Jakob Laise<span className="text-[#f28c28]">.</span></p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/42">
            Software engineer and UCF computer science student working across
            full-stack systems, AI, data, and developer tools.
          </p>
          <div className="mt-7 flex gap-5 font-mono text-[10px] uppercase tracking-[0.16em]">
            <a href="https://github.com/Jomak-x" target="_blank" rel="noopener noreferrer" className="text-white/42 transition hover:text-[#f28c28]">GitHub</a>
            <a href="https://www.linkedin.com/in/jakob-l123/" target="_blank" rel="noopener noreferrer" className="text-white/42 transition hover:text-[#f28c28]">LinkedIn</a>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-5 lg:self-start">
          {links.map(({ label, href }, index) => (
            <Link key={href} href={href} className="group text-sm text-white/52 transition hover:text-white">
              <span className={`mr-2 font-mono text-[9px] ${["text-orange-400", "text-sky-400", "text-pink-400", "text-emerald-400", "text-violet-400"][index]}`}>0{index + 1}</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/25 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>&copy; {new Date().getFullYear()} Jakob Laise / Portfolio</p>
        <p>Company and program marks are used only to identify the experience described.</p>
      </div>
    </footer>
  );
}
