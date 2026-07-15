"use client";

import { experienceList, type Experience } from "@/data/experience";
import { ArrowUpRight, Code2, ExternalLink, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ExperienceLogo from "./ExperienceLogo";

export default function ExperienceView() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedExperience) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedExperience(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [selectedExperience]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <header className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300/80">
          Experience
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Building across developer platforms, data, AI, and research.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
          A timeline of the companies, programs, labs, and technical communities
          where I have shipped software, supported infrastructure, and helped
          other builders succeed.
        </p>
      </header>

      <div className="relative">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-orange-300/70 via-white/18 to-transparent md:block" />

        <div className="grid gap-6">
          {experienceList.map((experience) => (
            <article key={experience.slug} className="relative md:ml-14">
              <span
                className="absolute -left-11 top-8 hidden h-4 w-4 rounded-full border-2 border-black md:block"
                style={{ backgroundColor: experience.accent }}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setSelectedExperience(experience)}
                aria-label={`Open a quick view of ${experience.role} at ${experience.company}`}
                className={`group relative grid w-full gap-5 rounded-2xl border-2 ${experience.bordercolor} ${experience.bgcolor} p-5 text-left shadow-2xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-orange-300 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-6`}
              >
                <div className="flex min-w-0 gap-4">
                  <ExperienceLogo experience={experience} />
                  <div className="min-w-0">
                    <p className={`${experience.textcolor} text-sm font-semibold`}>
                      {experience.date}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {experience.role}
                    </h2>
                    <p className="mt-2 text-sm text-white/55">
                      {experience.company}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col">
                  <p className="text-base leading-7 text-white/75">
                    {experience.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className={`rounded-full border px-3 py-1 text-xs text-white/80 ${experience.bordercolor}`}
                      >
                        {technology}
                      </span>
                    ))}
                    {experience.technologies.length > 4 && (
                      <span
                        className={`rounded-full border px-3 py-1 text-xs text-white/80 ${experience.bordercolor}`}
                      >
                        +{experience.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <span className="absolute right-5 top-5 hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35 transition group-hover:text-white/75 sm:flex">
                  Quick view
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute bottom-5 right-5 text-white/20" aria-hidden="true">
                  <Code2 className="h-5 w-5" />
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedExperience && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedExperience(null);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`experience-dialog-${selectedExperience.slug}`}
            aria-describedby={`experience-dialog-summary-${selectedExperience.slug}`}
            className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border-2 ${selectedExperience.bordercolor} bg-zinc-950 p-6 shadow-2xl shadow-black sm:p-8`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedExperience(null)}
              className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 p-2 text-white/70 transition hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Close experience details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-6 pr-10 sm:flex-row sm:items-center">
              <ExperienceLogo experience={selectedExperience} large />
              <div>
                <p className={`${selectedExperience.textcolor} text-sm font-semibold`}>
                  {selectedExperience.date}
                </p>
                <h2
                  id={`experience-dialog-${selectedExperience.slug}`}
                  className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  {selectedExperience.role}
                </h2>
                <a
                  href={selectedExperience.organizationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-base text-white/60 transition hover:text-orange-300"
                >
                  {selectedExperience.company}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-4 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedExperience.location}
              </span>
            </div>

            <p
              id={`experience-dialog-summary-${selectedExperience.slug}`}
              className="mt-7 text-lg leading-8 text-white/75"
            >
              {selectedExperience.summary}
            </p>

            <section className="mt-8" aria-labelledby={`experience-highlights-${selectedExperience.slug}`}>
              <h3
                id={`experience-highlights-${selectedExperience.slug}`}
                className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45"
              >
                Highlights
              </h3>
              <ul className="mt-4 space-y-4">
                {selectedExperience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base leading-7 text-white/75">
                    <span
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: selectedExperience.accent }}
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex flex-wrap gap-2">
              {selectedExperience.technologies.map((technology) => (
                <span
                  key={technology}
                  className={`rounded-full border px-3 py-1.5 text-sm text-white/75 ${selectedExperience.bordercolor}`}
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <Link
                href={`/experience/${selectedExperience.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-2.5 font-semibold text-black transition hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                Open full page
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="rounded-full border border-white/15 px-5 py-2.5 font-semibold text-white/75 transition hover:bg-white/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
