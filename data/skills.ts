export type SkillCategory =
  | "Programming Languages"
  | "Frameworks & Libraries"
  | "Infrastructure & Tools"
  | "AI/ML & Data Science"
  | "Coursework & Languages";

export type SkillCluster = { category: SkillCategory; label: string; accent: string };

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

type RawSkillInput = string | { name: string; label?: string; blurb?: string; intensity?: number; warmth?: number; bubbleScale?: number };

const bubblePalettes: Record<SkillCategory, BubblePalette> = {
  "Programming Languages": {
    accent: "#6db8ff", highlight: "rgba(205,235,255,0.7)", mid: "rgba(74,160,255,0.58)", deep: "rgba(24,92,214,0.46)", shadow: "rgba(10,35,115,0.42)", glow: "rgba(83, 168, 255, 0.38)",
  },
  "Frameworks & Libraries": {
    accent: "#ff6db8", highlight: "rgba(255,220,241,0.72)", mid: "rgba(244,95,174,0.57)", deep: "rgba(190,28,107,0.46)", shadow: "rgba(100,15,59,0.42)", glow: "rgba(255, 83, 176, 0.36)",
  },
  "Infrastructure & Tools": {
    accent: "#53e6b1", highlight: "rgba(210,255,239,0.72)", mid: "rgba(46,211,151,0.56)", deep: "rgba(5,128,91,0.46)", shadow: "rgba(4,68,50,0.42)", glow: "rgba(63, 231, 170, 0.36)",
  },
  "AI/ML & Data Science": {
    accent: "#ff9f43", highlight: "rgba(255,235,203,0.75)", mid: "rgba(255,153,55,0.6)", deep: "rgba(208,91,9,0.5)", shadow: "rgba(115,45,4,0.42)", glow: "rgba(255, 144, 45, 0.4)",
  },
  "Coursework & Languages": {
    accent: "#b887ff", highlight: "rgba(238,222,255,0.72)", mid: "rgba(171,111,255,0.57)", deep: "rgba(111,52,202,0.47)", shadow: "rgba(65,27,121,0.42)", glow: "rgba(177, 116, 255, 0.36)",
  },
};

function buildBubbleSurface(palette: BubblePalette) {
  return `radial-gradient(circle at 30% 22%, rgba(255,255,255,0.42), transparent 16%), radial-gradient(circle at 40% 36%, rgba(255,255,255,0.13), transparent 20%), radial-gradient(circle at 72% 78%, ${palette.shadow}, transparent 30%), linear-gradient(155deg, ${palette.highlight} 0%, ${palette.mid} 55%, ${palette.deep} 100%)`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function defaultLabel(name: string) {
  return name.length <= 12 ? name : name.split(" ")[0];
}

function buildSkillSeed(category: SkillCategory, input: RawSkillInput, index: number): SkillSeed {
  const palette = bubblePalettes[category];
  const data = typeof input === "string" ? { name: input } : input;
  const intensity = data.intensity ?? 0.76 + ((index * 17) % 20) / 100;
  const warmth = data.warmth ?? 0.42 + ((index * 11) % 30) / 100;
  const bubbleScale = data.bubbleScale ?? 0.88 + ((index * 7) % 20) / 100;
  return {
    id: slugify(`${category}-${index}-${data.name}`),
    name: data.name,
    label: data.label ?? defaultLabel(data.name),
    category,
    blurb: data.blurb ?? `${data.name} in ${category}.`,
    intensity,
    warmth,
    bubbleScale,
    surface: buildBubbleSurface(palette),
    glow: palette.glow,
  };
}

export const skillClusters: SkillCluster[] = (Object.keys(bubblePalettes) as SkillCategory[]).map((category) => ({
  category,
  label: category,
  accent: bubblePalettes[category].accent,
}));

export const skillsByCategory: Record<SkillCategory, RawSkillInput[]> = {
  "Programming Languages": ["Python", "C/C++", { name: "TypeScript/JavaScript", label: "TS / JS" }, "Java", "SQL", "PHP", "HTML/CSS"],
  "Frameworks & Libraries": ["React", "Next.js", "Django", "Flask", "Tailwind CSS", "Bootstrap", "tRPC", "PyTorch", "pandas", "NumPy"],
  "Infrastructure & Tools": [
    "Git/GitHub", "Docker", "Kubernetes", "OTK", "Buildkite", "Argo CD", "Backstage", "CI/CD", "YAML", "SSH", "REST APIs",
  ],
  "AI/ML & Data Science": [
    "Databricks", "OpenAI API", "Gemini", { name: "Google ADK/A2A", label: "ADK/A2A" }, "AI Agents", "Codex", "Claude Code", { name: "GitHub Copilot", label: "Copilot" },
  ],
  "Coursework & Languages": [
    { name: "CS50x (Harvard)", label: "CS50x" }, { name: "CodePath TIP102", label: "TIP102" }, { name: "AI4ALL Ignite Program", label: "AI4ALL" }, { name: "German (Native)", label: "German" }, { name: "English (Fluent/C2)", label: "English" },
  ],
};

export const skills: SkillSeed[] = skillClusters.flatMap((cluster) =>
  skillsByCategory[cluster.category].map((input, index) => buildSkillSeed(cluster.category, input, index)),
);
