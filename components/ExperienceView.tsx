"use client";

import { experienceList, type Experience } from "@/data/experience";
import { ArrowUpRight, ExternalLink, MapPin, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import ExperienceLogo from "./ExperienceLogo";

export default function ExperienceView() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

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
    <div className="page-shell text-[#f2eee6]">
      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.42 }}
        className="grid gap-8 border-b border-white/15 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
      >
        <div>
          <p className="eyebrow">Experience</p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,13vw,5rem)] leading-[0.94] tracking-[-0.045em] lg:text-8xl">
            Professional
            <br />
            <span className="text-[#f28c28]">experience.</span>
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-white/58 lg:justify-self-end">
          Software engineering roles, fellowships, research, IT, and internship
          experience.
        </p>
      </motion.header>

      <div className="relative mt-12">
        <motion.div
          className="absolute bottom-0 left-[5px] top-0 w-[2px] origin-top md:left-[13rem]"
          style={{
            background:
              "linear-gradient(180deg,#f22f46 0%,#ff3621 18%,#4285f4 35%,#f59e0b 53%,#38bdf8 70%,#34d399 84%,#fb7185 100%)",
          }}
          initial={reducedMotion ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        <div>
          {experienceList.map((experience, index) => (
            <motion.article
              key={experience.slug}
              className="relative grid min-w-0 max-w-full pl-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-16 md:pl-0"
              style={{ "--experience-accent": experience.accent } as CSSProperties}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.24) }}
            >
              <span
                className="absolute left-0 top-9 h-[11px] w-[11px] rounded-full border-2 border-[#0c0d0d] bg-[var(--experience-accent)] shadow-[0_0_18px_var(--experience-accent)] md:left-[calc(13rem-5px)]"
                aria-hidden="true"
              />

              <div className="pb-2 pt-7 md:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--experience-accent)]">{experience.date}</p>
                <p className="mt-2 text-xs text-white/32">{experience.location}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExperience(experience)}
                aria-label={`Open a quick view of ${experience.role} at ${experience.company}`}
                className="group relative grid min-w-0 max-w-full gap-7 border-t border-white/15 py-7 pl-4 text-left transition hover:border-[var(--experience-accent)] focus:border-[var(--experience-accent)] focus:outline-none sm:pl-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
              >
                <div className="flex min-w-0 gap-5">
                  <ExperienceLogo experience={experience} />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/38">{experience.company}</p>
                    <h2 className="font-display mt-2 break-words text-[clamp(1.65rem,7vw,2.25rem)] leading-[1.08] text-[#f2eee6] transition [overflow-wrap:anywhere] group-hover:text-[var(--experience-accent)]">
                      {experience.role}
                    </h2>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-base leading-7 text-white/58">{experience.summary}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-white/32">
                    {experience.technologies.slice(0, 7).join(" · ")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--experience-accent)]">
                    Quick view
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>

              <Link
                href={`/experience/${experience.slug}`}
                aria-label={`Open the permanent page for ${experience.role} at ${experience.company}`}
                className="col-start-1 mb-8 -mt-3 ml-4 inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/34 transition hover:text-[var(--experience-accent)] focus:outline-none sm:ml-0 md:col-start-2"
              >
                Permanent role page
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedExperience && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedExperience(null);
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`experience-dialog-${selectedExperience.slug}`}
            aria-describedby={`experience-dialog-summary-${selectedExperience.slug}`}
            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            style={{
              "--experience-accent": selectedExperience.accent,
              boxShadow: `16px 16px 0 ${selectedExperience.accent}24`,
            } as CSSProperties}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-[var(--experience-accent)]/60 bg-[#101212] p-6 sm:p-9"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedExperience(null)}
              className="absolute right-4 top-4 border border-white/15 p-2 text-white/60 transition hover:border-[var(--experience-accent)] hover:text-[var(--experience-accent)] focus:outline-none"
              aria-label="Close experience details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-7 pr-10 sm:grid-cols-[auto_1fr] sm:items-center">
              <ExperienceLogo experience={selectedExperience} large />
              <div>
                <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--experience-accent)]">{selectedExperience.date}</p>
                <h2 id={`experience-dialog-${selectedExperience.slug}`} className="font-display mt-3 break-words text-[clamp(2rem,9vw,3rem)] leading-tight [overflow-wrap:anywhere]">
                  {selectedExperience.role}
                </h2>
                <a
                  href={selectedExperience.organizationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-[var(--experience-accent)]"
                >
                  {selectedExperience.company}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 border-y border-white/12 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--experience-accent)]" />
                {selectedExperience.location}
              </span>
            </div>

            <p id={`experience-dialog-summary-${selectedExperience.slug}`} className="mt-7 text-lg leading-8 text-white/68">
              {selectedExperience.summary}
            </p>

            <section className="mt-9" aria-labelledby={`experience-highlights-${selectedExperience.slug}`}>
              <h3 id={`experience-highlights-${selectedExperience.slug}`} className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[var(--experience-accent)]">Highlights</h3>
              <ul className="mt-4">
                {selectedExperience.highlights.map((highlight, index) => (
                  <li key={highlight} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-white/12 py-4 text-base leading-7 text-white/64">
                    <span className="font-mono text-[10px] text-[var(--experience-accent)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-7 border-t border-white/12 pt-5 font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-white/34">
              {selectedExperience.technologies.join(" · ")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/experience/${selectedExperience.slug}`}
                className="inline-flex items-center gap-2 border border-[var(--experience-accent)] bg-[var(--experience-accent)] px-5 py-3 text-sm font-semibold text-[#0c0d0d] transition hover:brightness-110"
              >
                Open full page
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="border border-white/15 px-5 py-3 text-sm text-white/65 transition hover:border-white/40 hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
