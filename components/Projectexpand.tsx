import ReactMarkdown from "react-markdown";
import { projects as baseProjects } from "@/data/projects";
import Imagecarousel from "./Imagecarousel";
import Image from "next/image";
import { Github, MapPin, X } from "lucide-react";

type BaseProject = (typeof baseProjects)[keyof typeof baseProjects];
type Project = BaseProject & { markdown: string };

type ProjectexpandProps = {
  project: Project;
  onClick: () => void;
};

export default function Projectexpand({
  onClick,
  project,
}: ProjectexpandProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-5 backdrop-blur-sm sm:px-6"
      onClick={onClick}
    >
      <div
        className={`relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border-2 ${project.bordercolor} ${project.bgcolor} shadow-2xl shadow-black/40`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClick}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/12 bg-black/45 p-2 text-white/80 transition hover:bg-white/12 hover:text-white"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="min-w-0">
            <div className={`${project.textcolor} text-3xl font-bold sm:text-4xl`}>
              {project.name}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{project.location}</span>
            </div>

            <p className="mt-5 text-base leading-7 text-white/78">
              {project.short_desc}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className={`rounded-full border px-3 py-1 text-xs text-white/82 ${project.bordercolor}`}
                >
                  {technology}
                </span>
              ))}
            </div>

            {project.github && (
              <div className="mt-7">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/14"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            )}
          </div>

          <Imagecarousel
            boxWidth="100%"
            boxHeight="clamp(220px, 32vw, 360px)"
            bordercolor={project.bordercolor}
            wrapperClassName=""
            className="rounded-xl"
          >
            {project.pictures.map((s, idx) => (
              <Image
                key={s}
                src={s}
                alt={`${project.name} screenshot ${idx + 1}`}
                fill
                sizes="(max-width: 1024px) 92vw, 470px"
                className="object-cover"
                priority={idx === 0}
              />
            ))}
          </Imagecarousel>
        </div>

        <div
          id="project-details"
          className="border-t border-white/10 px-5 pb-7 pt-6 text-white sm:px-7"
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className={`mt-7 text-2xl font-semibold first:mt-0 ${project.textcolor}`}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className={`mt-6 text-xl font-semibold first:mt-0 ${project.textcolor}`}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mt-4 max-w-4xl text-base leading-8 text-white/78">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mt-4 grid gap-3 text-white/78 sm:grid-cols-2">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 leading-7">
                  {children}
                </li>
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
            {project.markdown}
          </ReactMarkdown>
          </div>
      </div>
    </div>
  );
}
