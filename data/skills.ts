export type SkillCategory =
  | "Programming Languages"
  | "Tools & Technologies"
  | "App Development"
  | "AI/ML & Data Science"
  | "Leadership";

export type SkillCluster = {
  category: SkillCategory;
  label: string;
  accent: string;
};

export type SkillSeed = {
  id: string;
  name: string;
  label: string;
  category: SkillCategory;
  blurb: string;
  intensity: number;
  warmth: number;
  bubbleScale: number;
  surface: string;
  glow: string;
};

type BubblePalette = {
  accent: string;
  highlight: string;
  mid: string;
  deep: string;
  shadow: string;
  glow: string;
};

type RawSkillInput =
  | string
  | {
      name: string;
      label?: string;
      blurb?: string;
      intensity?: number;
      warmth?: number;
      bubbleScale?: number;
    };

const bubblePalettes: Record<SkillCategory, BubblePalette> = {
  "Programming Languages": {
    accent: "#72adff",
    highlight: "rgba(194,225,255,0.62)",
    mid: "rgba(118,173,255,0.42)",
    deep: "rgba(37,99,235,0.3)",
    shadow: "rgba(15,23,110,0.32)",
    glow: "rgba(114, 173, 255, 0.3)",
  },
  "Tools & Technologies": {
    accent: "#63f0c7",
    highlight: "rgba(202,255,240,0.62)",
    mid: "rgba(74,222,170,0.42)",
    deep: "rgba(5,150,105,0.3)",
    shadow: "rgba(6,78,59,0.32)",
    glow: "rgba(99, 240, 199, 0.3)",
  },
  "App Development": {
    accent: "#ff79cd",
    highlight: "rgba(255,214,239,0.64)",
    mid: "rgba(244,114,182,0.42)",
    deep: "rgba(219,39,119,0.3)",
    shadow: "rgba(131,24,67,0.32)",
    glow: "rgba(255, 121, 205, 0.3)",
  },
  "AI/ML & Data Science": {
    accent: "#ffbe5a",
    highlight: "rgba(255,236,199,0.62)",
    mid: "rgba(251,146,60,0.42)",
    deep: "rgba(217,119,6,0.3)",
    shadow: "rgba(146,64,14,0.32)",
    glow: "rgba(255, 190, 90, 0.28)",
  },
  Leadership: {
    accent: "#c98cff",
    highlight: "rgba(240,218,255,0.62)",
    mid: "rgba(192,132,252,0.42)",
    deep: "rgba(147,51,234,0.3)",
    shadow: "rgba(107,33,168,0.32)",
    glow: "rgba(201, 140, 255, 0.28)",
  },
};

function buildBubbleSurface(palette: BubblePalette) {
  return `radial-gradient(circle at 30% 22%, rgba(255,255,255,0.38), transparent 16%), radial-gradient(circle at 40% 36%, rgba(255,255,255,0.12), transparent 20%), radial-gradient(circle at 72% 78%, ${palette.shadow}, transparent 30%), linear-gradient(155deg, ${palette.highlight} 0%, ${palette.mid} 55%, ${palette.deep} 100%)`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function defaultLabel(name: string) {
  return name.length <= 10 ? name : name.split(" ")[0];
}

function defaultBlurb(name: string, category: SkillCategory) {
  return `${name} in ${category}.`;
}

function buildSkillSeed(
  category: SkillCategory,
  input: RawSkillInput,
  index: number,
): SkillSeed {
  const palette = bubblePalettes[category];
  const data = typeof input === "string" ? { name: input } : input;
  const intensity = data.intensity ?? 0.8 + ((index * 17) % 18) / 100;
  const warmth = data.warmth ?? 0.45 + ((index * 11) % 28) / 100;
  const bubbleScale = data.bubbleScale ?? 0.92 + ((index * 7) % 18) / 100;

  return {
    id: slugify(`${category}-${index}-${data.name}`),
    name: data.name,
    label: data.label ?? defaultLabel(data.name),
    category,
    blurb: data.blurb ?? defaultBlurb(data.name, category),
    intensity,
    warmth,
    bubbleScale,
    surface: buildBubbleSurface(palette),
    glow: palette.glow,
  };
}

export const skillClusters: SkillCluster[] = [
  {
    category: "Programming Languages",
    label: "Programming Languages",
    accent: bubblePalettes["Programming Languages"].accent,
  },
  {
    category: "Tools & Technologies",
    label: "Tools & Technologies",
    accent: bubblePalettes["Tools & Technologies"].accent,
  },
  {
    category: "App Development",
    label: "App Development",
    accent: bubblePalettes["App Development"].accent,
  },
  {
    category: "AI/ML & Data Science",
    label: "AI/ML & Data Science",
    accent: bubblePalettes["AI/ML & Data Science"].accent,
  },
  {
    category: "Leadership",
    label: "Leadership",
    accent: bubblePalettes["Leadership"].accent,
  },
];

// Add or remove skills only in this object.
// You can use plain strings for quick additions, or objects if you want a custom label/size.
export const skillsByCategory: Record<SkillCategory, RawSkillInput[]> = {
  "Programming Languages": [
    "Python",
    "C",
    "C++",
    "JavaScript",
    "Java",
    "SQL",
    "PHP",
    "HTML/CSS",
  ],
  "Tools & Technologies": [
    "Git",
    "Docker",
    "CI/CD",
    "REST APIs",
    { name: "API Integrations", label: "APIs" },
    { name: "GitHub", label: "GitHub" },
    { name: "Microsoft 365", label: "M365" },
  ],
  "App Development": [
    "React",
    "Next.js",
    "Django",
    "Flask",
    "Tailwind CSS",
    "Bootstrap",
    "tRPC",
    { name: "Chrome Extensions", label: "Chrome" },
  ],
  "AI/ML & Data Science": [
    "PyTorch",
    "pandas",
    "NumPy",
    "OpenAI API",
    "Gemini",
    { name: "Google ADK/A2A", label: "ADK/A2A" },
    { name: "Prompt Engineering", label: "Prompts" },
    "AI Agents",
    { name: "Workflow Automation", label: "Automation" },
  ],
  Leadership: [
    "German",
    "English",
    { name: "Hackathon Operations", label: "Ops" },
    { name: "Code Reviews", label: "Reviews" },
    { name: "Documentation", label: "Docs" },
    { name: "Team Collaboration", label: "Teams" },
  ],
};

export const skills: SkillSeed[] = skillClusters.flatMap((cluster) =>
  skillsByCategory[cluster.category].map((input, index) =>
    buildSkillSeed(cluster.category, input, index),
  ),
);
