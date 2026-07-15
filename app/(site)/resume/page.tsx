import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createPageMetadata, SITE_LAST_UPDATED } from "@/lib/site";
import {
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/structured-data";
import type { Metadata } from "next";

const resumePath = "/home/Jakob_Laise_Resume.pdf";
const title = "Software Engineering Resume";
const description =
  "View or download Jakob Laise's software engineering resume, including Twilio, Databricks, Google x BASTA, Knight Hacks, research, and award-winning projects.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/resume",
  label: "Resume",
});

export default function ResumePage() {
  const url = absoluteUrl("/resume");
  const documentId = `${url}#resume-pdf`;
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
        mainEntity: { "@id": documentId },
      },
      breadcrumbJsonLd([
        { name: "Jakob Laise", path: "/" },
        { name: "Resume", path: "/resume" },
      ]),
      {
        "@type": "DigitalDocument",
        "@id": documentId,
        name: "Jakob Laise Software Engineering Resume",
        description,
        url: absoluteUrl(resumePath),
        contentUrl: absoluteUrl(resumePath),
        encodingFormat: "application/pdf",
        dateModified: SITE_LAST_UPDATED,
        inLanguage: "en-US",
        author: { "@id": personId() },
        about: { "@id": personId() },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="bg-[#080808] pt-20 sm:pt-24">
        <h1 className="sr-only">Jakob Laise Software Engineering Resume</h1>
        <iframe
          src={`${resumePath}#view=Fit&toolbar=1&navpanes=0`}
          title="Jakob Laise software engineering resume"
          className="h-[calc(100svh-5rem)] w-full border-0 bg-white sm:h-[calc(100svh-6rem)]"
          loading="eager"
        />
      </div>
    </>
  );
}
