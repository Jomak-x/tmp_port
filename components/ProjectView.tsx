"use client";
import { useState } from "react";
import ProjectBox from "./ProjectBox";
import Projectexpand from "./Projectexpand";
import { projects as baseProjects } from "@/data/projects";

type BaseProject = (typeof baseProjects)[keyof typeof baseProjects];
type ProjectWithMarkdown = BaseProject & { markdown: string };
type ProjectsMap = Record<string, ProjectWithMarkdown>;

export default function ProjectView({ projects }: { projects: ProjectsMap }) {
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(
    null
  );

  const selectedProject = selectedProjectKey
    ? projects[selectedProjectKey]
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      {selectedProject && (
        <Projectexpand
          project={selectedProject}
          onClick={() => setSelectedProjectKey(null)}
        />
      )}

      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300/80">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Selected builds from hackathons, research, and product experiments.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
          Each card opens into a tighter project story with screenshots,
          technology choices, and the parts that made the build interesting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(projects).map(([projectKey, project]) => (
          <ProjectBox
            key={projectKey}
            onClick={() => setSelectedProjectKey(projectKey)}
            name={project.name}
            technologies={project.technologies}
            short_desc={project.short_desc}
            bgcolor={project.bgcolor}
            borderColor={project.bordercolor}
            textcolor={project.textcolor}
            startvid={project.startvid}
            startimg={project.startimg}
            location={project.location}
          />
        ))}
      </div>
    </div>
  );
}
