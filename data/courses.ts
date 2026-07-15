export type CourseCredential = {
  slug: string;
  name: string;
  provider: string;
  status: "Completed" | "In Progress";
  date: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  highlights: string[];
  image: string;
  programUrl: string;
  certificatePdf?: string;
  credentialId?: string;
  bordercolor: string;
  bgcolor: string;
  textcolor: string;
  accent: string;
};

export const courses: CourseCredential[] = [
  {
    slug: "ai4all-ignite",
    name: "AI4ALL Ignite",
    provider: "AI4ALL",
    status: "Completed",
    date: "Sept. 2025 - Mar. 7, 2026",
    startDate: "2025-09-01",
    endDate: "2026-03-07",
    description:
      "A national accelerator combining responsible AI, machine learning, Python, mentorship, product management, and career preparation.",
    technologies: [
      "Python",
      "Machine Learning",
      "Responsible AI",
      "Data Sourcing",
      "Model Development",
      "Product Management",
    ],
    highlights: [
      "Selected for AI4ALL Ignite, a national accelerator preparing undergraduates for careers in AI through mentorship, hands-on projects, and career readiness training.",
      "Completed an end-to-end AI/ML project while practicing the full data science lifecycle: problem framing, dataset design, preprocessing, training, evaluation, and deployment planning.",
      "Built product management skills by connecting model development, user needs, project scoping, and technical decision-making across the project lifecycle.",
    ],
    image: "/home/certificates/ai4all-ignite.png",
    programUrl: "https://ai-4-all.org/ignite/",
    certificatePdf: "/home/certificates/ai4all-ignite.pdf",
    bordercolor: "border-emerald-400",
    bgcolor: "bg-emerald-400/10",
    textcolor: "text-emerald-300",
    accent: "#34d399",
  },
  {
    slug: "codepath-tip102",
    name: "CodePath TIP102",
    provider: "CodePath",
    status: "Completed",
    date: "Fall 2025",
    startDate: "2025-08-01",
    endDate: "2025-12-31",
    description:
      "Intermediate Technical Interview Prep focused on data structures, algorithms, problem-solving patterns, and coding communication.",
    technologies: [
      "Data Structures",
      "Algorithms",
      "Interview Practice",
      "Problem Solving",
      "Coding Communication",
    ],
    highlights: [
      "Completed CodePath's Intermediate Technical Interview Prep course with a certificate recognizing outstanding performance.",
      "Strengthened technical interview readiness through structured practice in data structures, algorithms, problem-solving patterns, and coding communication.",
    ],
    image: "/home/certificates/codepath-tip102.png",
    programUrl: "https://www.codepath.org/courses/tech-interview-prep",
    certificatePdf: "/home/certificates/codepath-tip102.pdf",
    credentialId: "363072",
    bordercolor: "border-teal-400",
    bgcolor: "bg-teal-400/10",
    textcolor: "text-teal-300",
    accent: "#2dd4bf",
  },
  {
    slug: "harvard-cs50x",
    name: "Harvard CS50x",
    provider: "Harvard University",
    status: "In Progress",
    date: "In Progress",
    startDate: "2025-01-01",
    endDate: null,
    description:
      "Computer science foundations across C, Python, SQL, algorithms, memory management, and full-stack web development.",
    technologies: ["C", "Python", "SQL", "HTML", "CSS", "JavaScript", "Flask", "Git"],
    highlights: [
      "Completed coursework and projects spanning programming fundamentals, algorithms, memory management, SQL-backed applications, and full-stack web development fundamentals.",
    ],
    image: "/home/projects/CS50/CS50_1.webp",
    programUrl: "https://cs50.harvard.edu/x/",
    bordercolor: "border-red-400",
    bgcolor: "bg-red-400/10",
    textcolor: "text-red-300",
    accent: "#f87171",
  },
];
