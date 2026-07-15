import { experienceList } from "@/data/experience";
import { projectList } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/experience"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/skills"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/resume"), changeFrequency: "monthly", priority: 0.8 },
  ];

  const experienceRoutes: MetadataRoute.Sitemap = experienceList.map((experience) => ({
    url: absoluteUrl(`/experience/${experience.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectList.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...experienceRoutes, ...projectRoutes];
}
