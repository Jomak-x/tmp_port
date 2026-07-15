import type { Experience } from "@/data/experience";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import ExperienceLogo from "./ExperienceLogo";
import Reveal from "./Reveal";

export default function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <article style={{ "--experience-accent": experience.accent } as CSSProperties} className="page-shell max-w-6xl text-[#f2eee6]">
      <Reveal>
        <Link href="/experience" className="inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-[var(--experience-accent)]">
          <ArrowLeft className="h-4 w-4" /> All experience
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-9 grid gap-9 border-y border-white/15 py-10 lg:grid-cols-[auto_1fr] lg:items-center">
        <ExperienceLogo experience={experience} large />
        <header>
          <a href={experience.organizationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--experience-accent)] transition hover:text-white">
            {experience.company} <ArrowUpRight className="h-4 w-4" />
          </a>
          <h1 className="font-display mt-5 max-w-4xl break-words text-[clamp(2.35rem,10vw,4.5rem)] leading-[0.98] tracking-[-0.04em] [overflow-wrap:anywhere]">{experience.role}</h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/38">
            <span>{experience.date}</span><span className="text-[var(--experience-accent)]">/</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{experience.location}</span>
          </div>
        </header>
      </Reveal>

      <Reveal className="grid gap-10 border-b border-white/15 py-12 lg:grid-cols-[0.35fr_0.65fr]">
        <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--experience-accent)]">Overview</p>
        <div>
          <p className="text-xl leading-9 text-white/68">{experience.summary}</p>
          <p className="mt-7 font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-white/34">{experience.technologies.join(" · ")}</p>
        </div>
      </Reveal>

      <Reveal className="grid gap-10 py-12 lg:grid-cols-[0.35fr_0.65fr]">
        <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--experience-accent)]">Highlights</p>
        <ol>
          {experience.highlights.map((highlight, index) => (
            <li key={highlight} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/12 py-5 text-base leading-8 text-white/64 first:border-t-0 first:pt-0">
              <span className="font-mono text-[10px] text-[var(--experience-accent)]">{String(index + 1).padStart(2, "0")}</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </article>
  );
}
