export type Project = {
  slug: string;
  name: string;
  date: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  pictures: string[];
  bordercolor: string;
  startvid: string;
  startimg: string;
  location: string;
  short_desc: string;
  bgcolor: string;
  textcolor: string;
  people: string;
  github: string;
  projectUrl: string;
  mdfile: string;
  accent: string;
};

export const projects: Record<string, Project> = {
  crisislens: {
    slug: "crisislens",
    name: "CrisisLens",
    date: "Feb. 2026",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Databricks",
      "Databricks SQL Warehouse",
      "Databricks Genie",
      "Python",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Docker",
    ],
    pictures: [
      "/home/projects/CrisisLens/CrisisLens1.webp",
      "/home/projects/CrisisLens/CrisisLens2.webp",
      "/home/projects/CrisisLens/CrisisLens3.webp",
      "/home/projects/CrisisLens/CrisisLens4.webp",
      "/home/projects/CrisisLens/CrisisLens5.webp",
    ],
    bordercolor: "border-cyan-400",
    startvid: "/home/projects/CrisisLens/CrisisLens_preview.mp4",
    startimg: "/home/projects/CrisisLens/CrisisLens1.webp",
    location: "Hacklytics 2026",
    short_desc:
      "A Databricks-powered humanitarian intelligence platform that helps teams prioritize countries using natural-language analytics, simulations, and a 3D crisis command center.",
    bgcolor: "bg-cyan-400/10",
    textcolor: "text-cyan-300",
    people: "Jakob Laise, Alexander Paolini, Michael Rusu, Abduaziz Umarov",
    github: "",
    projectUrl: "https://devpost.com/software/crisislens-rlebdw",
    mdfile: "./Projects/CrisisLens.md",
    accent: "#22d3ee",
  },
  slaide: {
    slug: "slaide",
    name: "slAIde",
    date: "Oct. 2025",
    startDate: "2025-10-01",
    endDate: "2025-10-05",
    technologies: [
      "Python",
      "Google ADK",
      "A2A",
      "Gemini 2.5 Flash",
      "Next.js",
      "React",
      "Tailwind CSS",
      "LaTeX",
      "HTML5",
      "TypeScript",
    ],
    pictures: [
      "/home/projects/slAIde/slAIde1.webp",
      "/home/projects/slAIde/slAIde2.webp",
      "/home/projects/slAIde/slAIde3.webp",
      "/home/projects/slAIde/slAIde4.webp",
      "/home/projects/slAIde/slAIde5.webp",
    ],
    bordercolor: "border-orange-400",
    startvid: "/home/projects/slAIde/slAIde_preview.mp4",
    startimg: "/home/projects/slAIde/slAIde1.webp",
    location: "Knight Hacks VIII",
    short_desc:
      "A multi-agent presentation and PDF generator that turns a single prompt into polished HTML5 slide decks or LaTeX-compiled summaries using Google ADK and A2A.",
    bgcolor: "bg-orange-400/10",
    textcolor: "text-orange-300",
    people: "",
    github: "https://github.com/Jomak-x/slAIde.git",
    projectUrl: "https://devpost.com/software/slaide",
    mdfile: "./Projects/slAIde.md",
    accent: "#fb923c",
  },
  focusforge: {
    slug: "focusforge",
    name: "FocusForge",
    date: "June 2025",
    startDate: "2025-06-28",
    endDate: "2025-06-29",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Chrome Extensions",
      "Chrome Storage API",
      "Background Scripts",
      "Notifications",
      "Gemini API",
      "Figma",
      "JSON",
    ],
    pictures: [
      "/home/projects/FocusForge/FocusForge.webp",
      "/home/projects/FocusForge/FocusForge2.webp",
      "/home/projects/FocusForge/FocusForge3.webp",
      "/home/projects/FocusForge/FocusForge4.webp",
      "/home/projects/FocusForge/FocusForge5.webp",
      "/home/projects/FocusForge/FocusForge6.webp",
    ],
    startvid: "",
    bordercolor: "border-blue-400",
    startimg: "/home/projects/FocusForge/FocusForge1_v3.webp",
    location: "GemiKnights Hackathon",
    short_desc:
      "An AI-powered Chrome extension that turns focus sessions into honest reflection, session reports, and Gemini-powered productivity advice.",
    bgcolor: "bg-blue-400/10",
    textcolor: "text-blue-300",
    people: "Jakob Laise, Daniel Ocampo, Dylan Moo Hernandez, Peter Petro",
    github: "https://github.com/Jomak-x/GeminKnights-FocusForge.git",
    projectUrl: "https://devpost.com/software/focusforge-g1oq60",
    mdfile: "./Projects/FocusForge.md",
    accent: "#60a5fa",
  },
  hiretune: {
    slug: "hiretune",
    name: "HireTune",
    date: "April 2025",
    startDate: "2025-04-05",
    endDate: "2025-04-06",
    technologies: [
      "Django",
      "React",
      "TypeScript",
      "Python",
      "OpenAI API",
      "Docker",
      "Figma",
      "Tailwind CSS",
      "LaTeX",
      "Discord OAuth",
    ],
    pictures: [
      "/home/projects/HireTune/HireTune1.webp",
      "/home/projects/HireTune/HireTune2.webp",
      "/home/projects/HireTune/HireTune3.webp",
      "/home/projects/HireTune/HireTune4.webp",
    ],
    bordercolor: "border-emerald-400",
    startvid: "/home/projects/HireTune/HireTune_preview.mp4",
    startimg: "/home/projects/HireTune/HireTune1.webp",
    location: "HackUSF 2025",
    short_desc:
      "An AI-powered resume tailoring and job-tracking platform that helps applicants generate ATS-aligned resumes, export polished PDFs, and manage applications faster.",
    bgcolor: "bg-emerald-400/10",
    textcolor: "text-emerald-300",
    people: "",
    github: "https://github.com/ThomasT-GitHub/HireTune.git",
    projectUrl: "https://devpost.com/software/hiretune",
    mdfile: "./Projects/HireTune.md",
    accent: "#34d399",
  },
};

export const projectList = Object.values(projects);

export function getProject(slug: string) {
  return projects[slug];
}
