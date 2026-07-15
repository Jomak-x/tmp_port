import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-4 py-10 text-center text-white/60">
      <nav className="mx-auto mb-4 flex w-fit gap-5">
        <Link
          href="https://github.com/Jomak-x"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-orange-500 transition-colors hover:text-orange-300"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/jakob-l123/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-orange-500 transition-colors hover:text-orange-300"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="/resume"
          aria-label="Resume"
          className="text-orange-500 transition-colors hover:text-orange-300"
        >
          <CgFileDocument size={24} />
        </Link>
      </nav>

      <nav className="mx-auto mb-5 flex w-fit flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {[
          { label: "Home", href: "/" },
          { label: "Experience", href: "/experience" },
          { label: "Projects", href: "/projects" },
          { label: "Skills", href: "/skills" },
          { label: "Resume", href: "/resume" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-orange-400 transition-colors hover:text-orange-200"
          >
            {label}
          </Link>
        ))}
      </nav>

      <p className="text-xs text-white/40">
        &copy; {new Date().getFullYear()} Jakob Laise &mdash; All rights reserved
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-[11px] leading-5 text-white/30">
        Company and program names and logos are trademarks of their respective owners
        and are used only to identify the experience described on this portfolio.
      </p>
    </footer>
  );
}
