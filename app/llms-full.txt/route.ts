import { courses } from "@/data/courses";
import { experienceList } from "@/data/experience";
import { projectList } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-static";

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const experienceText = experienceList
    .map(
      (experience) => `## ${experience.role} - ${experience.company}
Date: ${experience.date}
Location: ${experience.location}
URL: ${absoluteUrl(`/experience/${experience.slug}`)}
Summary: ${experience.summary}
Technologies: ${experience.technologies.join(", ")}
${bullets(experience.highlights)}`,
    )
    .join("\n\n");

  const projectText = (
    await Promise.all(
      projectList.map(async (project) => {
        const filePath = path.join(
          process.cwd(),
          "data",
          project.mdfile.replace("./", ""),
        );
        let details = "";

        try {
          details = await readFile(filePath, "utf8");
        } catch {
          details = project.short_desc;
        }

        return `## ${project.name}
Date: ${project.date}
Context: ${project.location}
URL: ${absoluteUrl(`/projects/${project.slug}`)}
Summary: ${project.short_desc}
Technologies: ${project.technologies.join(", ")}
Project page: ${project.projectUrl}${project.github ? `\nCode: ${project.github}` : ""}

${details}`;
      }),
    )
  ).join("\n\n");

  const courseText = courses
    .map(
      (course) => `## ${course.name} - ${course.provider}
Status: ${course.status}
Date: ${course.date}
Summary: ${course.description}
Topics: ${course.technologies.join(", ")}${course.credentialId ? `\nCredential ID: ${course.credentialId}` : ""}${course.certificatePdf ? `\nCertificate: ${absoluteUrl(course.certificatePdf)}` : ""}
${bullets(course.highlights)}`,
    )
    .join("\n\n");

  const body = `# Jakob Laise - Full Portfolio Context

Canonical profile: ${absoluteUrl("/")}
Resume: ${absoluteUrl("/home/Jakob_Laise_Resume.pdf")}
Email: Jakob@Laise.de
GitHub: https://github.com/Jomak-x
LinkedIn: https://www.linkedin.com/in/jakob-l123/
Devpost: https://devpost.com/Jomak-x

# Experience

${experienceText}

# Software Projects

${projectText}

# Courses and Certificates

${courseText}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
