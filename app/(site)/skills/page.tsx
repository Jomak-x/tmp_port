import JsonLd from "@/components/JsonLd";
import SkillsPlayground from "@/components/SkillsPlayground";
import { skillClusters, skills } from "@/data/skills";
import { absoluteUrl, createPageMetadata } from "@/lib/site";
import {
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/structured-data";
import type { Metadata } from "next";

const title = "Technical Skills";
const description =
  "Explore Jakob Laise's skills in TypeScript, Python, React, Next.js, Databricks, PyTorch, Docker, Kubernetes, AI agents, CI/CD, and developer tooling.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/skills",
  label: "Technical Skills",
});

export default function SkillsPage() {
  const url = absoluteUrl("/skills");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${title} | Jakob Laise`,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: skillClusters.map((cluster) => ({
          "@id": `${url}#${cluster.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        })),
      },
      breadcrumbJsonLd([
        { name: "Jakob Laise", path: "/" },
        { name: title, path: "/skills" },
      ]),
      ...skillClusters.map((cluster) => ({
        "@type": "DefinedTermSet",
        "@id": `${url}#${cluster.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: cluster.category,
        hasDefinedTerm: skills
          .filter((skill) => skill.category === cluster.category)
          .map((skill) => ({
            "@type": "DefinedTerm",
            name: skill.name,
          })),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SkillsPlayground />
    </>
  );
}
