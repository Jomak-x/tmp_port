export type Experience = {
  slug: string;
  company: string;
  role: string;
  location: string;
  date: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  logo?: string;
  logoAlt?: string;
  logoFit?: "contain" | "cover";
  logoZoom?: boolean;
  logoSecondary?: string;
  organizationUrl: string;
  accent: string;
  bordercolor: string;
  bgcolor: string;
  textcolor: string;
  technologies: string[];
  highlights: string[];
};

export const experiences: Record<string, Experience> = {
  twilio: {
    slug: "twilio",
    company: "Twilio",
    role: "Software Engineering & Developer Advocacy Intern",
    location: "Remote, US",
    date: "June 2026 - Present",
    startDate: "2026-06-01",
    endDate: null,
    summary:
      "Engineering a feedback intelligence platform and the scheduled infrastructure that turns developer-community signals into searchable product insights.",
    logo: "/home/experience/TwilioOfficial.svg",
    organizationUrl: "https://www.twilio.com/",
    accent: "#f22f46",
    bordercolor: "border-rose-400",
    bgcolor: "bg-rose-400/10",
    textcolor: "text-rose-300",
    technologies: [
      "MCP",
      "Common Room",
      "Kubernetes",
      "OTK",
      "Full-stack Development",
      "DevOps",
      "CI/CD",
      "Observability",
    ],
    highlights: [
      "Engineering an end-to-end feedback intelligence platform that retrieves developer-community signals from Common Room via MCP, categorizes recurring product complaints, and serves searchable insights through a full-stack internal dashboard.",
      "Containerizing scheduled ingestion and analysis workflows as Kubernetes CronJobs on Twilio's OTK platform and designing the data layer for internal AI research agents; completed SWE onboarding in DevOps, CI/CD, observability, and incident debugging.",
    ],
  },
  databricks: {
    slug: "databricks",
    company: "Databricks",
    role: "Software Engineering Student Fellow",
    location: "Remote, US",
    date: "June 2026 - Present",
    startDate: "2026-06-01",
    endDate: null,
    summary:
      "Selected for Databricks' inaugural student fellowship and bringing hands-on data and AI learning back to UCF's Knight Hacks community.",
    logo: "/home/experience/DatabricksOfficial.png",
    organizationUrl: "https://www.databricks.com/",
    accent: "#ff3621",
    bordercolor: "border-orange-400",
    bgcolor: "bg-orange-400/10",
    textcolor: "text-orange-300",
    technologies: [
      "Databricks",
      "Data Engineering",
      "AI/ML",
      "Software Engineering",
      "Mentorship",
      "Technical Workshops",
    ],
    highlights: [
      "Selected as one of 36 inaugural fellows from 5,800+ applicants (<1% acceptance) for technical project experience, campus leadership, and data/AI impact.",
      "Learning Databricks engineering workflows through SWE mentorship and expert-led training while bringing Databricks to UCF's 1000+ Knight Hacks campus community through a hands-on data/AI workshop.",
    ],
  },
  "google-basta-code2career": {
    slug: "google-basta-code2career",
    company: "Google x BASTA Code2Career",
    role: "Software Engineering Fellow",
    location: "Remote, US",
    date: "June 2026 - Present",
    startDate: "2026-06-01",
    endDate: null,
    summary:
      "Completing a 10-week software engineering fellowship with one-on-one Google SWE mentorship and structured technical interview preparation.",
    logo: "/home/experience/Google-G.png",
    logoSecondary: "/home/experience/BASTA.webp",
    organizationUrl: "https://www.projectbasta.com/code2career",
    accent: "#4285f4",
    bordercolor: "border-blue-400",
    bgcolor: "bg-blue-400/10",
    textcolor: "text-blue-300",
    technologies: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "Technical Interviews",
      "Mock Interviews",
      "Code Review",
    ],
    highlights: [
      "Selected for a 10-week SWE fellowship with 1:1 mentorship from a Google Software Engineer to strengthen technical interviewing, engineering execution, and real-world SWE practices.",
      "Practicing data structures, algorithms, OOP, mock interviews, and code review simulations to improve problem-solving speed, correctness, and technical communication for SWE interviews.",
    ],
  },
  "knight-hacks": {
    slug: "knight-hacks",
    company: "Knight Hacks",
    role: "Software Engineer & Hackathon Organizer",
    location: "University of Central Florida, Orlando, FL",
    date: "Jan. 2026 - Present",
    startDate: "2026-01-01",
    endDate: null,
    summary:
      "Building production features for the Knight Hacks platform while helping organize a 1000+ attendee hackathon.",
    logo: "/home/experience/KnightHacksOfficial.svg",
    organizationUrl: "https://knighthacks.org/",
    accent: "#f59e0b",
    bordercolor: "border-amber-400",
    bgcolor: "bg-amber-400/10",
    textcolor: "text-amber-300",
    technologies: ["Next.js", "React", "TypeScript", "tRPC", "CI/CD", "GitHub"],
    highlights: [
      "Organize Knight Hacks, a 1000+ attendee hackathon, coordinating sponsors, logistics, volunteer teams, workshops, judging, and event operations.",
      "Develop production-grade features in the Knight Hacks monorepo using Next.js, React, TypeScript, and tRPC.",
      "Ship internal tools for a 1000+ user community, including the website, application forms, and alumni platform.",
      "Collaborate through GitHub issues, pull requests, code reviews, and CI/CD workflows with a focus on reliability, maintainability, and performance.",
      "Document workflows and implementation details to improve maintainability and team collaboration.",
    ],
  },
  "appleseed-lab": {
    slug: "appleseed-lab",
    company: "APPLeSEEd Lab",
    role: "Software Engineering Research Intern",
    location: "University of Central Florida, Orlando, FL",
    date: "June 2025 - Sept. 2025",
    startDate: "2025-06-01",
    endDate: "2025-09-30",
    summary:
      "Fine-tuned CodeBERT on Linux kernel commit data to classify security risk in software engineering research.",
    logo: "/home/experience/APPLeSEEd.jpg",
    organizationUrl: "https://appleseed.cs.ucf.edu/",
    accent: "#38bdf8",
    bordercolor: "border-sky-400",
    bgcolor: "bg-sky-400/10",
    textcolor: "text-sky-300",
    technologies: ["Python", "CodeBERT", "PyTorch", "Machine Learning", "CVE Data", "Git"],
    highlights: [
      "Fine-tuned CodeBERT on 10,000+ Linux kernel commits to build a commit risk classifier.",
      "Achieved F1 = 0.69 on unseen test data, demonstrating feasibility of AI-assisted commit analysis for software engineering.",
      "Labeled the dataset by linking git commits to public CVE records, enabling supervised training for security-risk classification.",
    ],
  },
  mafcom: {
    slug: "mafcom",
    company: "Mafcom",
    role: "IT Specialist",
    location: "Bavaria, Germany",
    date: "Oct. 2024 - Dec. 2024",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    summary:
      "Supported client IT environments by maintaining networks, servers, secure access, and device setup workflows.",
    organizationUrl: "https://www.mafcom.de/",
    accent: "#34d399",
    bordercolor: "border-emerald-400",
    bgcolor: "bg-emerald-400/10",
    textcolor: "text-emerald-300",
    technologies: ["Windows", "Networking", "Routers", "Servers", "Microsoft 365", "Automation"],
    highlights: [
      "Supported 100+ employees across 10+ client companies by deploying and maintaining networks, routers, and on-site servers.",
      "Reduced onboarding time by 40% by automating device setup and migrations with preconfigured Windows installs.",
      "Resolved hardware, OS, and network issues end-to-end while maintaining secure system access to minimize downtime.",
    ],
  },
  inscopus: {
    slug: "inscopus",
    company: "INSCOPUS GmbH",
    role: "Software Development Intern",
    location: "Munich, Germany",
    date: "Aug. 2020",
    startDate: "2020-08-01",
    endDate: "2020-08-31",
    summary:
      "Built an internal documentation platform and upload pipeline that made product documentation easier to update.",
    logo: "/home/experience/INSCOPUS.png",
    logoZoom: true,
    organizationUrl: "https://www.inscopus.com/",
    accent: "#fb7185",
    bordercolor: "border-rose-400",
    bgcolor: "bg-rose-400/10",
    textcolor: "text-rose-300",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "Documentation", "Automation"],
    highlights: [
      "Centralized product documentation for 25+ employees by building an internal web platform in HTML, CSS, JavaScript, and PHP.",
      "Added an upload pipeline that automatically integrated and published website updates into live documentation.",
      "Increased documentation update efficiency by 60% by replacing manual uploads with automated integration.",
      "Delivered a working MVP in 2 weeks, enabling faster onboarding and team-wide adoption.",
    ],
  },
};

export const experienceList = Object.values(experiences);

export function getExperience(slug: string) {
  return experiences[slug];
}
