import ProjectView from "@/components/ProjectView";
import JsonLd from "@/components/JsonLd";
import { projectList } from "@/data/projects";
import { createPageMetadata } from "@/lib/site";
import { collectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

const title = "Software Projects and Certificates";
const description =
  "Explore Jakob Laise's full-stack, AI, Databricks, multi-agent, and productivity projects plus verified AI4ALL and CodePath credentials.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/projects",
  label: "Projects & Credentials",
});

export default function ProjectsPage() {
  const jsonLd = collectionPageJsonLd({
    name: title,
    description,
    path: "/projects",
    items: projectList.map((project) => ({
      name: project.name,
      path: `/projects/${project.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectView />
    </>
  );
}
