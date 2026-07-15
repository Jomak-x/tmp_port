import { courses } from "@/data/courses";
import { experienceList } from "@/data/experience";
import { projectList } from "@/data/projects";
import { absoluteUrl, SITE_LAST_UPDATED, siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_LAST_UPDATED);
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(siteConfig.image)],
    },
    {
      url: absoluteUrl("/experience"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: experienceList
        .filter((experience) => experience.logo)
        .map((experience) => absoluteUrl(experience.logo!)),
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        ...projectList.map((project) => absoluteUrl(project.startimg)),
        ...courses.map((course) => absoluteUrl(course.image)),
      ],
    },
    {
      url: absoluteUrl("/skills"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/resume"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const experienceRoutes: MetadataRoute.Sitemap = experienceList.map((experience) => ({
    url: absoluteUrl(`/experience/${experience.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: experience.logo ? [absoluteUrl(experience.logo)] : undefined,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectList.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: project.pictures.map((image) => absoluteUrl(image)),
  }));

  return [...coreRoutes, ...experienceRoutes, ...projectRoutes];
}
