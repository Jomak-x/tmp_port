"use client";

import { experiences, type Experience } from "@/data/experience";
import { Briefcase, Calendar, Code2, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ExperienceKey = keyof typeof experiences;

function ExperienceLogo({ experience }: { experience: Experience }) {
  if (experience.logo) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white p-2">
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          width={56}
          height={56}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 text-lg font-bold text-white shadow-lg"
      style={{ backgroundColor: `${experience.accent}33` }}
    >
      {experience.company
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")}
    </div>
  );
}

function ExperienceDetail({
  experience,
  onClose,
}: {
  experience: Experience;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-5 backdrop-blur-sm sm:px-6"
      onClick={onClose}
    >
      <div
        className={`relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border-2 ${experience.bordercolor} ${experience.bgcolor} p-5 shadow-2xl shadow-black/40 sm:p-7`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/45 p-2 text-white/80 transition hover:bg-white/12 hover:text-white"
          aria-label="Close experience details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-5 pr-12 sm:flex-row sm:items-start">
          <ExperienceLogo experience={experience} />
          <div className="min-w-0">
            <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${experience.textcolor}`}>
              {experience.company}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {experience.role}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/58">
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
        </div>

        <p className="mt-7 max-w-3xl text-base leading-8 text-white/78">
          {experience.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className={`rounded-full border px-3 py-1 text-xs text-white/82 ${experience.bordercolor}`}
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-3">
          {experience.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-white/78"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceView() {
  const [selectedKey, setSelectedKey] = useState<ExperienceKey | null>(null);
  const selectedExperience = selectedKey ? experiences[selectedKey] : null;
  const entries = Object.entries(experiences) as [ExperienceKey, Experience][];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      {selectedExperience && (
        <ExperienceDetail
          experience={selectedExperience}
          onClose={() => setSelectedKey(null)}
        />
      )}

      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300/80">
          Experience
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Building across research, product, and event-scale systems.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
          A timeline of the teams, labs, and companies where I have shipped
          software, supported infrastructure, and helped organize technical
          communities.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-orange-300/70 via-white/18 to-transparent md:block" />

        <div className="grid gap-6">
          {entries.map(([key, experience]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`group relative grid gap-5 rounded-2xl border-2 ${experience.bordercolor} ${experience.bgcolor} p-5 text-left shadow-2xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-orange-300 md:ml-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-6`}
            >
              <span
                className="absolute -left-11 top-8 hidden h-4 w-4 rounded-full border-2 border-black md:block"
                style={{ backgroundColor: experience.accent }}
              />
              <div className="flex min-w-0 gap-4">
                <ExperienceLogo experience={experience} />
                <div className="min-w-0">
                  <p className={`${experience.textcolor} text-sm font-semibold`}>
                    {experience.date}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {experience.role}
                  </h2>
                  <p className="mt-2 truncate text-sm text-white/55">
                    {experience.company} · {experience.location}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col">
                <p className="text-base leading-7 text-white/75">
                  {experience.summary}
                </p>
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

              <span className="absolute right-5 top-5 hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35 transition group-hover:text-white/65 sm:flex">
                <Briefcase className="h-4 w-4" />
                View
              </span>
              <span className="absolute bottom-5 right-5 text-white/20">
                <Code2 className="h-5 w-5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
