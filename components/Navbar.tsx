"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Experience", link: "/experience" },
  { name: "Projects", link: "/projects" },
  { name: "Skills", link: "/skills" },
  { name: "GitHub", link: "https://github.com/Jomak-x", picture: "Github" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/jakob-l123/", picture: "LinkedIn" },
  { name: "Resume", link: "/resume", picture: "Resume" },
];

const navicons: Record<string, React.ReactNode> = {
  Github: <FaGithub size={21} />,
  LinkedIn: <FaLinkedin size={21} />,
  Resume: <CgFileDocument size={21} />,
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPage =
    navItems.find(
      (item) => !item.link.startsWith("http") && isActive(pathname, item.link)
    ) ?? navItems[0];

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-2 sm:top-4 sm:px-4">
      <div className="relative w-full max-w-sm sm:hidden">
        <nav className="flex items-center justify-between rounded-full border border-orange-100/30 bg-orange-500/92 p-1.5 pl-5 text-black shadow-[0_12px_45px_rgba(249,115,22,0.28)] backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="font-semibold tracking-tight"
          >
            Jakob Laise
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="flex items-center gap-2 rounded-full bg-orange-200/75 px-3.5 py-2 text-sm font-semibold"
          >
            {currentPage.name}
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </nav>

        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] grid overflow-hidden rounded-2xl border border-orange-100/25 bg-[#17110e]/96 p-2 text-[#f2eee6] shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {navItems.map((item) => {
              const external = item.link.startsWith("http");
              const active = !external && isActive(pathname, item.link);

              return (
                <Link
                  key={item.name}
                  href={item.link}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-orange-400 text-black"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.picture && (
                    <span className="text-lg" aria-hidden="true">
                      {navicons[item.picture]}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      <nav className="relative hidden max-w-full items-center gap-1 overflow-x-auto rounded-full border border-orange-100/30 bg-orange-500/92 p-2 shadow-[0_12px_45px_rgba(249,115,22,0.28)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex">
        {isHovering && (
          <div
            className="absolute rounded-full bg-orange-200/75 transition-all duration-300"
            style={{ left: sliderStyle.left, width: sliderStyle.width, height: "40px", top: "50%", transform: "translateY(-50%)" }}
          />
        )}

        {navItems.map((item) => {
          const external = item.link.startsWith("http");
          const active = !external && isActive(pathname, item.link);
          return (
            <Link
              key={item.name}
              href={item.link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-current={active ? "page" : undefined}
              aria-label={item.picture ? item.name : undefined}
              className={
                item.picture
                  ? `relative z-10 rounded-full p-2 px-3 text-black transition ${active ? "bg-orange-200/70" : "hover:bg-transparent"}`
                  : `relative z-10 whitespace-nowrap rounded-full px-5 py-2 text-[0.95rem] font-semibold text-black transition ${active ? "bg-orange-200/70" : "hover:bg-transparent"}`
              }
              onMouseEnter={(event) => {
                setSliderStyle({ left: event.currentTarget.offsetLeft, width: event.currentTarget.offsetWidth });
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {item.picture ? navicons[item.picture] : item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
