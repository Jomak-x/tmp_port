import type { Project } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Imagecarousel from "./Imagecarousel";

export default function ProjectDetail({
  project,
  markdown,
}: {
  project: Project;
  markdown: string;
}) {
  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-orange-300 transition hover:text-orange-200"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <div className={`mt-7 overflow-hidden rounded-3xl border-2 ${project.bordercolor} ${project.bgcolor} shadow-2xl shadow-black/25`}>
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <header className="min-w-0">
            <p className={`text-sm font-semibold uppercase tracking-[0.26em] ${project.textcolor}`}>
              {project.date}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{project.location}</span>
            </div>

            <p className="mt-6 text-lg leading-8 text-white/78">{project.short_desc}</p>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Project technologies">
              {project.technologies.map((technology) => (
                <span key={technology} className={`rounded-full border px-3 py-1 text-xs text-white/82 ${project.bordercolor}`}>
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/14"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/14"
              >
                Project page
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </header>

          <Imagecarousel
            boxWidth="100%"
            boxHeight="clamp(250px, 36vw, 420px)"
            bordercolor={project.bordercolor}
            className="rounded-xl"
          >
            {project.pictures.map((source, index) => (
              <Image
                key={source}
                src={source}
                alt={`${project.name} screenshot ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 92vw, 540px"
                className="object-cover"
                priority={index === 0}
              />
            ))}
          </Imagecarousel>
        </div>

        <div className="border-t border-white/10 px-6 pb-9 pt-7 sm:px-9">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className={`mt-8 text-2xl font-semibold first:mt-0 ${project.textcolor}`}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className={`mt-7 text-xl font-semibold ${project.textcolor}`}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mt-4 max-w-4xl text-base leading-8 text-white/78">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mt-4 grid gap-3 text-white/78 sm:grid-cols-2">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 leading-7">{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${project.textcolor} underline decoration-white/20 underline-offset-4 hover:text-white`}
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
