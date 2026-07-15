import ExperienceView from "@/components/ExperienceView";
import { createPageMetadata } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Software Engineering Experience",
  description:
    "Explore Jakob Laise's software engineering experience at Twilio, Databricks, Google x BASTA, Knight Hacks, APPLeSEEd Lab, Mafcom, and INSCOPUS.",
  path: "/experience",
});

export default function ExperiencePage() {
  return <ExperienceView />;
}
