import JsonLd from "@/components/JsonLd";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projectList } from "@/data/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/site";
import { readFile } from "fs/promises";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectList.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return createPageMetadata({
    title: project.name,
    description: project.short_desc,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "data", project.mdfile.replace("./", ""));
  let markdown = "Project details coming soon.";

  try {
    markdown = await readFile(filePath, "utf8");
  } catch {
    // Preserve a useful page if a markdown file is temporarily unavailable.
  }

  const projectJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.short_desc,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.startimg),
    dateCreated: project.startDate,
    dateModified: project.endDate,
    programmingLanguage: project.technologies,
    keywords: project.technologies.join(", "),
    creator: {
      "@type": "Person",
      "@id": `${absoluteUrl("/")}#jakob-laise`,
      name: "Jakob Laise",
      url: absoluteUrl("/"),
    },
    sameAs: project.projectUrl,
  };

  if (project.github) {
    projectJsonLd.codeRepository = project.github;
  }

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectDetail project={project} markdown={markdown} />
    </>
  );
}
