export type Experience = {
  company: string;
  role: string;
  location: string;
  date: string;
  summary: string;
  logo?: string;
  accent: string;
  bordercolor: string;
  bgcolor: string;
  textcolor: string;
  technologies: string[];
  highlights: string[];
};

export const experiences: Record<string, Experience> = {
  knightHacks: {
    company: "Knight Hacks",
    role: "Software Engineer & Hackathon Organizer",
    location: "University of Central Florida, Orlando, FL",
    date: "Jan. 2026 - Present",
    summary:
      "Building production features for the Knight Hacks platform while helping organize a 1000+ attendee hackathon.",
    logo: "/home/experience/KnightHacks.svg",
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
  appleseed: {
    company: "APPLeSEEd Lab",
    role: "Software Engineering Research Intern",
    location: "University of Central Florida, Orlando, FL",
    date: "June 2025 - Sept. 2025",
    summary:
      "Fine-tuned CodeBERT on Linux kernel commit data to classify security risk in software engineering research.",
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
    company: "Mafcom GmbH",
    role: "IT Specialist",
    location: "Bavaria, Germany",
    date: "Oct. 2024 - Dec. 2024",
    summary:
      "Supported client IT environments by maintaining networks, servers, secure access, and device setup workflows.",
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
    company: "INSCOPUS GmbH",
    role: "Software Development Intern",
    location: "Munich, Germany",
    date: "Aug. 2020",
    summary:
      "Built an internal documentation platform and upload pipeline that made product documentation easier to update.",
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
