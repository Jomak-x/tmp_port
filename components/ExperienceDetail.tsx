import type { Experience } from "@/data/experience";
import { ArrowLeft, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import ExperienceLogo from "./ExperienceLogo";

export default function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <article className="mx-auto max-w-5xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <Link
        href="/experience"
        className="inline-flex items-center gap-2 text-sm text-orange-300 transition hover:text-orange-200"
      >
        <ArrowLeft className="h-4 w-4" />
        All experience
      </Link>

      <div className={`mt-7 rounded-3xl border-2 ${experience.bordercolor} ${experience.bgcolor} p-6 shadow-2xl shadow-black/25 sm:p-9`}>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <ExperienceLogo experience={experience} large />
          <div className="min-w-0 flex-1">
            <a
              href={experience.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.26em] ${experience.textcolor} transition hover:text-white`}
            >
              {experience.company}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              {experience.role}
            </h1>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {experience.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </span>
            </div>
          </div>
        </header>

        <p className="mt-8 max-w-4xl text-lg leading-8 text-white/78">
          {experience.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-2" aria-label="Technologies and skills">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className={`rounded-full border px-3 py-1.5 text-xs text-white/82 ${experience.bordercolor}`}
            >
              {technology}
            </span>
          ))}
        </div>

        <section className="mt-10" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="text-2xl font-semibold">
            Highlights
          </h2>
          <ul className="mt-5 grid gap-4">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 leading-8 text-white/78"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
