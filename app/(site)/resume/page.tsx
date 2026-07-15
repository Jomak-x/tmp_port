import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { absoluteUrl, createPageMetadata, SITE_LAST_UPDATED } from "@/lib/site";
import {
  breadcrumbJsonLd,
  personId,
  websiteId,
} from "@/lib/structured-data";
import { ArrowUpRight, Download, FileText } from "lucide-react";
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
      <div className="page-shell text-[#f2eee6]">
      <Reveal className="grid gap-9 border-b border-white/15 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-4xl">
          <p className="eyebrow">Resume / Updated July 2026</p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,13vw,5rem)] leading-[0.94] tracking-[-0.045em] lg:text-8xl">
            Software Engineering
            <br />
            <span className="text-[#f28c28]">Resume</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">
            View or download my current one-page software engineering resume.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={resumePath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm text-white/65 transition hover:border-[#f28c28] hover:text-[#f28c28]">
            Open PDF <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={resumePath} download="Jakob_Laise_Resume.pdf" className="inline-flex items-center gap-2 border border-[#f28c28] bg-[#f28c28] px-5 py-3 text-sm font-semibold text-[#0c0d0d] transition hover:bg-[#ff9f43]">
            <Download className="h-4 w-4" /> Download
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-12 border border-white/15 bg-white">
        <div className="flex items-center justify-between border-b border-black/10 bg-[#ece9e2] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
          <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Jakob_Laise_Resume.pdf</span>
          <span>1 page / PDF</span>
        </div>
        <object
          data={resumePath}
          type="application/pdf"
          className="hidden h-[calc(100vh-10rem)] min-h-[720px] w-full md:block"
          aria-label="Jakob Laise software engineering resume"
        >
          <p className="p-6 text-zinc-900">
            This browser cannot display the PDF inline.{" "}
            <a className="underline" href={resumePath}>
              Open Jakob Laise&apos;s resume.
            </a>
          </p>
        </object>
        <div className="p-6 text-zinc-900 md:hidden">
          <p className="text-base font-semibold">Resume preview</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Mobile browsers handle embedded PDFs inconsistently. Open the
            one-page resume in the browser&apos;s native viewer for the clearest
            version.
          </p>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-[#f28c28] px-4 py-3 text-sm font-semibold text-black"
          >
            Open resume PDF <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
      </div>
    </>
  );
}
