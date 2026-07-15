import SkillsPlayground from "@/components/SkillsPlayground";
import { createPageMetadata } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Technical Skills",
  description:
    "Explore Jakob Laise's skills in TypeScript, Python, React, Next.js, Databricks, PyTorch, Docker, AI agents, CI/CD, developer tooling, and technical leadership.",
  path: "/skills",
});

export default function SkillsPage() {
  return <SkillsPlayground />;
}
