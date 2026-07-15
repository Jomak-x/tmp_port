import ProjectView from "@/components/ProjectView";
import { createPageMetadata } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Software Projects and Certificates",
  description:
    "Explore Jakob Laise's full-stack, AI, Databricks, multi-agent, and productivity projects plus verified AI4ALL and CodePath credentials.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectView />;
}
