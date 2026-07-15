import { courses } from "@/data/courses";
import { projectList } from "@/data/projects";
import CourseCard from "./CourseCard";
import ProjectBox from "./ProjectBox";
import Reveal from "./Reveal";

export default function ProjectView() {
  return (
    <div className="page-shell text-[#f2eee6]">
      <Reveal className="mb-14 grid gap-8 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,13vw,5rem)] leading-[0.94] tracking-[-0.045em] lg:text-8xl">
            Software
            <br />
            <span className="text-[#f28c28]">projects.</span>
          </h1>
        </div>
        <p className="max-w-xl text-base leading-8 text-white/58 sm:text-lg lg:justify-self-end">
          Selected full-stack, AI, data, and developer tooling projects built
          individually and with teams.
        </p>
      </Reveal>

      <section aria-labelledby="software-projects-heading">
        <h2 id="software-projects-heading" className="sr-only">
          Software projects
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectList.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.07, 0.2)} className={index === 0 ? "md:col-span-2 xl:col-span-3" : "h-full"}>
              <ProjectBox
                href={`/projects/${project.slug}`}
                name={project.name}
                technologies={project.technologies}
                short_desc={project.short_desc}
                startvid={project.startvid}
                startimg={project.startimg}
                location={project.location}
                date={project.date}
                index={index}
                featured={index === 0}
                accent={project.accent}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-28" aria-labelledby="courses-heading">
        <Reveal className="mb-10 grid gap-7 border-b border-white/15 pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Courses & certificates</p>
            <h2 id="courses-heading" className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
              Courses &
              <br />
              <span className="text-[#2dd4bf]">certificates.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/55 lg:justify-self-end">
            Technical programs and coursework, with certificates provided where
            available.
          </p>
        </Reveal>

        <div className="grid border-t border-white/12">
          {courses.map((course, index) => (
            <Reveal key={course.slug} delay={index * 0.06}>
              <CourseCard course={course} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
