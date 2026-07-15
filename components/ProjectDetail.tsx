import type { Project } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { CSSProperties } from "react";
import Imagecarousel from "./Imagecarousel";
import Reveal from "./Reveal";

export default function ProjectDetail({ project, markdown }: { project: Project; markdown: string }) {
  return (
    <article style={{ "--project-accent": project.accent } as CSSProperties} className="page-shell text-[#f2eee6]">
      <Reveal>
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-[var(--project-accent)]">
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-9 grid gap-10 border-y border-white/15 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <header>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--project-accent)]">{project.date} / {project.location}</p>
          <h1 className="font-display mt-5 break-words text-[clamp(2.75rem,13vw,5rem)] leading-[0.92] tracking-[-0.05em] [overflow-wrap:anywhere] lg:text-8xl">{project.name}</h1>
        </header>
        <div>
          <p className="text-lg leading-8 text-white/65">{project.short_desc}</p>
          <p className="mt-6 font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-white/34">
            {project.technologies.join(" · ")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-white/65 transition hover:border-[var(--project-accent)] hover:text-[var(--project-accent)]">
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[var(--project-accent)] bg-[var(--project-accent)] px-4 py-2.5 text-sm font-semibold text-[#0c0d0d] transition hover:brightness-110">
              Project page <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <Imagecarousel boxWidth="100%" boxHeight="clamp(300px, 55vw, 680px)" bordercolor="border-white/15">
          {project.pictures.map((source, index) => (
            <Image key={source} src={source} alt={`${project.name} screenshot ${index + 1}`} fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover" priority={index === 0} />
          ))}
        </Imagecarousel>
      </Reveal>

      <Reveal className="mt-16 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-[0.35fr_0.65fr]">
        <div>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--project-accent)]">Case study</p>
          {project.people && <p className="mt-5 text-sm leading-7 text-white/38">Built with {project.people}</p>}
        </div>
        <div className="max-w-3xl">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="font-display mt-12 text-4xl first:mt-0">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-9 text-xl font-semibold text-[var(--project-accent)]">{children}</h3>,
              p: ({ children }) => <p className="mt-5 text-base leading-8 text-white/64">{children}</p>,
              ul: ({ children }) => <ul className="mt-5 border-t border-white/12 text-white/62">{children}</ul>,
              li: ({ children }) => <li className="border-b border-white/12 py-4 pl-6 leading-7 before:-ml-6 before:mr-3 before:text-[var(--project-accent)] before:content-['—']">{children}</li>,
              a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--project-accent)] underline decoration-white/20 underline-offset-4 hover:text-white">{children}</a>,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </Reveal>
    </article>
  );
}
