import type { CourseCredential } from "@/data/courses";
import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function CourseCard({ course }: { course: CourseCredential }) {
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-2xl border-2 ${course.bordercolor} ${course.bgcolor} shadow-2xl shadow-black/20`}>
      <div className="relative h-52 overflow-hidden bg-white">
        <Image
          src={course.image}
          alt={course.certificatePdf ? `${course.name} certificate preview` : `${course.name} course preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-contain p-2"
        />
        <span className="absolute right-3 top-3 rounded-full border border-black/10 bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {course.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${course.textcolor}`}>
          {course.provider}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">{course.name}</h3>
        <p className="mt-2 text-sm text-white/55">{course.date}</p>
        {course.credentialId && (
          <p className="mt-1 text-xs text-white/45">Credential ID: {course.credentialId}</p>
        )}

        <p className="mt-5 text-sm leading-7 text-white/75">{course.description}</p>

        <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/70">
          {course.highlights.map((highlight) => (
            <li key={highlight} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2" aria-label={`${course.name} topics`}>
          {course.technologies.slice(0, 5).map((technology) => (
            <span key={technology} className={`rounded-full border px-2.5 py-1 text-xs text-white/78 ${course.bordercolor}`}>
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {course.certificatePdf && (
            <a
              href={course.certificatePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/85 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <Award className="h-4 w-4" />
              View certificate
            </a>
          )}
          <a
            href={course.programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Program
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
