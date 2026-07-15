import ExperienceDetail from "@/components/ExperienceDetail";
import JsonLd from "@/components/JsonLd";
import { experienceList, getExperience } from "@/data/experience";
import { absoluteUrl, createPageMetadata } from "@/lib/site";
import {
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/structured-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return experienceList.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    return {};
  }

  const title = `${experience.role} at ${experience.company}`;

  return createPageMetadata({
    title,
    description: experience.summary,
    path: `/experience/${experience.slug}`,
    label: experience.company,
    imageAlt: `${experience.role} at ${experience.company} — Jakob Laise experience`,
  });
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  const detailPath = `/experience/${experience.slug}`;
  const detailUrl = absoluteUrl(detailPath);
  const roleId = `${detailUrl}#role`;
  const roleJsonLd: Record<string, unknown> = {
    "@type": "EmployeeRole",
    "@id": roleId,
    name: `${experience.role} at ${experience.company}`,
    roleName: experience.role,
    startDate: experience.startDate,
    description: experience.summary,
    url: detailUrl,
    mainEntityOfPage: { "@id": `${detailUrl}#webpage` },
    member: { "@id": personId() },
    worksFor: {
      "@type": "Organization",
      name: experience.company,
      url: experience.organizationUrl,
    },
  };

  if (experience.endDate) {
    roleJsonLd.endDate = experience.endDate;
  }

  const experienceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${detailUrl}#webpage`,
        url: detailUrl,
        name: `${experience.role} at ${experience.company} | Jakob Laise`,
        description: experience.summary,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId() },
        about: { "@id": roleId },
        breadcrumb: { "@id": `${detailUrl}#breadcrumb` },
      },
      breadcrumbJsonLd([
        { name: "Jakob Laise", path: "/" },
        { name: "Experience", path: "/experience" },
        {
          name: `${experience.role} at ${experience.company}`,
          path: detailPath,
        },
      ]),
      roleJsonLd,
    ],
  };

  return (
    <>
      <JsonLd data={experienceJsonLd} />
      <ExperienceDetail experience={experience} />
    </>
  );
}
