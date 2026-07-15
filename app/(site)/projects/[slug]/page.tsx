import JsonLd from "@/components/JsonLd";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projectList } from "@/data/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/site";
import {
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/structured-data";
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
    label: "Software Project",
    imageAlt: `${project.name} by Jakob Laise — software project overview`,
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

  const detailPath = `/projects/${project.slug}`;
  const detailUrl = absoluteUrl(detailPath);
  const projectId = `${detailUrl}#software-source-code`;
  const projectEntity: Record<string, unknown> = {
    "@type": "SoftwareSourceCode",
    "@id": projectId,
    name: project.name,
    description: project.short_desc,
    url: detailUrl,
    image: project.pictures.map((image) => absoluteUrl(image)),
    dateCreated: project.startDate,
    dateModified: project.endDate,
    programmingLanguage: project.technologies,
    keywords: project.technologies.join(", "),
    mainEntityOfPage: { "@id": `${detailUrl}#webpage` },
    creator: {
      "@id": personId(),
    },
    sameAs: project.projectUrl,
  };

  if (project.github) {
    projectEntity.codeRepository = project.github;
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${detailUrl}#webpage`,
        url: detailUrl,
        name: `${project.name} | Jakob Laise`,
        description: project.short_desc,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId() },
        about: { "@id": projectId },
        breadcrumb: { "@id": `${detailUrl}#breadcrumb` },
      },
      breadcrumbJsonLd([
        { name: "Jakob Laise", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.name, path: detailPath },
      ]),
      projectEntity,
    ],
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <ProjectDetail project={project} markdown={markdown} />
    </>
  );
}
