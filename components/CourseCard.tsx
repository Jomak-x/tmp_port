import type { CourseCredential } from "@/data/courses";
import { ArrowUpRight, Award } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

export default function CourseCard({ course, index }: { course: CourseCredential; index: number }) {
  const accentStyle = { "--course-accent": course.accent } as CSSProperties;

  return (
    <article style={accentStyle} className="group grid gap-6 border-b border-white/12 py-8 transition hover:bg-[color-mix(in_srgb,var(--course-accent)_5%,transparent)] sm:grid-cols-[10rem_1fr] lg:grid-cols-[3.5rem_11rem_1fr_auto] lg:items-center lg:px-4">
      <p className="hidden font-mono text-xs text-[var(--course-accent)] lg:block">{String(index + 1).padStart(2, "0")}</p>
      <div className="relative aspect-[4/3] overflow-hidden border border-white/12 bg-white transition group-hover:border-[var(--course-accent)]">
        <Image
          src={course.image}
          alt={course.certificatePdf ? `${course.name} certificate preview` : `${course.name} course preview`}
          fill
          sizes="180px"
          className="object-contain p-1"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em]">
          <span className="text-[var(--course-accent)]">{course.provider}</span>
          <span className="text-white/20">/</span>
          <span className="text-white/38">{course.status}</span>
          <span className="text-white/20">/</span>
          <span className="text-white/38">{course.date}</span>
        </div>
        <h3 className="font-display mt-2 text-3xl text-[#f2eee6]">{course.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">{course.description}</p>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/48">
          {course.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="text-[var(--course-accent)]" aria-hidden="true">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-white/35">
          {course.technologies.join(" · ")}
        </p>
        {course.credentialId && (
          <p className="mt-2 font-mono text-[10px] text-white/28">Credential ID {course.credentialId}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-stretch">
        {course.certificatePdf && (
          <a
            href={course.certificatePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[var(--course-accent)] px-4 py-2.5 text-sm text-[var(--course-accent)] transition hover:bg-[var(--course-accent)] hover:text-[#0c0d0d]"
          >
            <Award className="h-4 w-4" />
            Certificate
          </a>
        )}
        <a
          href={course.programUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-white/62 transition hover:border-white/40 hover:text-white"
        >
          Program
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
