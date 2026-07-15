import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# Jakob Laise

> Software engineer and Computer Science student at the University of Central Florida. Software Engineering & Developer Advocacy Intern at Twilio, Databricks Student Fellow, Google x BASTA Code2Career Fellow, and Knight Hacks engineer and organizer.

## Canonical pages
- [Home](${absoluteUrl("/")})
- [Experience](${absoluteUrl("/experience")})
- [Projects, courses, and certificates](${absoluteUrl("/projects")})
- [Skills](${absoluteUrl("/skills")})
- [Resume page](${absoluteUrl("/resume")})
- [Resume PDF](${absoluteUrl("/home/Jakob_Laise_Resume.pdf")})

## Profiles
- [GitHub](https://github.com/Jomak-x)
- [LinkedIn](https://www.linkedin.com/in/jakob-l123/)
- [Devpost](https://devpost.com/Jomak-x)

For complete machine-readable portfolio content, see [llms-full.txt](${absoluteUrl("/llms-full.txt")}).
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
