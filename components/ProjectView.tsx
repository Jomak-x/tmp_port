import { courses } from "@/data/courses";
import { projectList } from "@/data/projects";
import CourseCard from "./CourseCard";
import ProjectBox from "./ProjectBox";

export default function ProjectView() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <header className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300/80">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Selected builds from hackathons, research, and product experiments.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
          Explore the problem, architecture, screenshots, and engineering choices
          behind each project on its own shareable page.
        </p>
      </header>

      <section aria-labelledby="software-projects-heading">
        <h2 id="software-projects-heading" className="sr-only">
          Software projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectList.map((project) => (
            <ProjectBox
              key={project.slug}
              href={`/projects/${project.slug}`}
              name={project.name}
              technologies={project.technologies}
              short_desc={project.short_desc}
              bgcolor={project.bgcolor}
              borderColor={project.bordercolor}
              textcolor={project.textcolor}
              startvid={project.startvid}
              startimg={project.startimg}
              location={project.location}
              date={project.date}
            />
          ))}
        </div>
      </section>

      <section className="mt-24" aria-labelledby="courses-heading">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal-300/80">
            Courses & Certificates
          </p>
          <h2 id="courses-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Structured learning that strengthened the fundamentals.
          </h2>
          <p className="mt-4 text-base leading-8 text-white/65">
            Verified accelerator and interview-preparation credentials alongside
            ongoing computer science coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
