import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import ProjectMedia from "./ProjectMedia";

type ProjectBoxProps = {
  name: string;
  technologies: string[];
  short_desc: string;
  startimg?: string;
  startvid?: string;
  location: string;
  href: string;
  date: string;
  index: number;
  featured?: boolean;
  accent: string;
};

export default function ProjectBox({
  name,
  technologies,
  short_desc,
  startimg,
  startvid,
  location,
  href,
  date,
  index,
  featured = false,
  accent,
}: ProjectBoxProps) {
  const accentStyle = { "--project-accent": accent } as CSSProperties;

  return (
    <Link
      href={href}
      style={accentStyle}
      className={`group relative min-w-0 overflow-hidden border border-white/15 bg-[#111313] text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--project-accent)] focus:outline-none ${
        featured
          ? "md:col-span-2 xl:col-span-3 lg:grid lg:min-h-[34rem] lg:grid-cols-[1.45fr_0.55fr]"
          : "flex min-h-[31rem] flex-col"
      }`}
    >
      <span className="absolute inset-x-0 top-0 z-20 h-1 bg-[var(--project-accent)]" aria-hidden="true" />
      <div className={`relative overflow-hidden bg-black ${featured ? "min-h-72 lg:h-full" : "h-56"}`}>
        {startvid ? (
          <ProjectMedia src={startvid} poster={startimg} />
        ) : startimg ? (
          <Image
            src={startimg}
            alt={`${name} preview`}
            fill
            className="object-cover opacity-88 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
            sizes={featured ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 768px) 100vw, 440px"}
          />
        ) : null}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/75 to-transparent p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
          <span>{String(index + 1).padStart(2, "0")} / Project</span>
          {featured && <span className="text-[var(--project-accent)]">Featured</span>}
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-9 lg:justify-between" : "p-6"}`}>
        <div>
          <div className="flex items-start justify-between gap-5">
            <h3 className={`min-w-0 break-words font-display leading-[1.05] tracking-[-0.025em] text-[#f2eee6] [overflow-wrap:anywhere] ${featured ? "text-[clamp(2.25rem,10vw,3rem)]" : "text-[clamp(1.8rem,8vw,2.25rem)]"}`}>
              {name}
            </h3>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/28 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--project-accent)]" />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/38">
            <span>{location}</span>
            <span className="text-[var(--project-accent)]" aria-hidden="true">/</span>
            <span>{date}</span>
          </div>
          <p className={`mt-7 leading-8 text-white/65 ${featured ? "text-lg" : "text-base"}`}>
            {short_desc}
          </p>
        </div>

        <div className="mt-9 border-t border-white/12 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
            {technologies.slice(0, featured ? 7 : 4).join(" · ")}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--project-accent)]">
            Read case study
            <span className="h-px w-8 bg-[var(--project-accent)] transition-all group-hover:w-12" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
