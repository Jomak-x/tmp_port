import ProjectView from "@/components/ProjectView";
import { projects } from "@/data/projects";
import { readFile } from "fs/promises";
import path from "path";

export default async function ProjectsPage() {
  const projectEntries = await Promise.all(
    Object.entries(projects).map(async ([key, project]) => {
      const filePath = path.join(
        process.cwd(),
        "data",
        project.mdfile.replace("./", "")
      );

      let markdown = "Project details coming soon.";

      try {
        markdown = await readFile(filePath, "utf8");
      } catch {
        // keep fallback text
      }

      return [key, { ...project, markdown }] as const;
    })
  );

  const projectsWithMarkdown = Object.fromEntries(projectEntries);

  return <ProjectView projects={projectsWithMarkdown} />;
}
