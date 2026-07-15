import ExperienceDetail from "@/components/ExperienceDetail";
import JsonLd from "@/components/JsonLd";
import { experienceList, getExperience } from "@/data/experience";
import { absoluteUrl, createPageMetadata } from "@/lib/site";
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
  });
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  const roleJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EmployeeRole",
    name: `${experience.role} at ${experience.company}`,
    roleName: experience.role,
    startDate: experience.startDate,
    description: experience.summary,
    url: absoluteUrl(`/experience/${experience.slug}`),
    mainEntityOfPage: absoluteUrl(`/experience/${experience.slug}`),
    worksFor: {
      "@type": "Organization",
      name: experience.company,
      url: experience.organizationUrl,
    },
  };

  if (experience.endDate) {
    roleJsonLd.endDate = experience.endDate;
  }

  return (
    <>
      <JsonLd data={roleJsonLd} />
      <ExperienceDetail experience={experience} />
    </>
  );
}
