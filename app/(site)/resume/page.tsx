import { createPageMetadata } from "@/lib/site";
import { Download, ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";

const resumePath = "/home/Jakob_Laise_Resume.pdf";

export const metadata: Metadata = createPageMetadata({
  title: "Resume",
  description:
    "View or download Jakob Laise's software engineering resume, including Twilio, Databricks, Google x BASTA, Knight Hacks, research, and award-winning projects.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 text-white sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-300/80">
            Resume
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Jakob Laise - Software Engineering Resume
          </h1>
          <p className="mt-4 text-base leading-8 text-white/65">
            Experience across Twilio, Databricks, Google x BASTA, Knight Hacks,
            software engineering research, and award-winning full-stack and AI projects.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm transition hover:bg-white/14"
          >
            <ExternalLink className="h-4 w-4" />
            Open PDF
          </a>
          <a
            href={resumePath}
            download="Jakob_Laise_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-300"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/12 bg-white shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-black/10 bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
          <FileText className="h-4 w-4" />
          Jakob_Laise_Resume.pdf
        </div>
        <iframe
          src={resumePath}
          className="h-[calc(100vh-11rem)] min-h-[720px] w-full"
          title="Jakob Laise software engineering resume"
        />
      </div>
    </div>
  );
}
