import ExperienceView from "@/components/ExperienceView";
import JsonLd from "@/components/JsonLd";
import { experienceList } from "@/data/experience";
import { createPageMetadata } from "@/lib/site";
import { collectionPageJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

const title = "Software Engineering Experience";
const description =
  "Explore Jakob Laise's software engineering experience at Twilio, Databricks, Google x BASTA, Knight Hacks, APPLeSEEd Lab, Mafcom, and INSCOPUS.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/experience",
  label: "Experience",
});

export default function ExperiencePage() {
  const jsonLd = collectionPageJsonLd({
    name: title,
    description,
    path: "/experience",
    items: experienceList.map((experience) => ({
      name: `${experience.role} at ${experience.company}`,
      path: `/experience/${experience.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExperienceView />
    </>
  );
}
