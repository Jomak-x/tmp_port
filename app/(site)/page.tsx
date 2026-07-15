import Hero from "@/components/Hero";
import Imagecarousel from "@/components/Imagecarousel";
import Textbox from "@/components/Textbox1";
import { profile } from "@/data/profile";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { experienceList } from "@/data/experience";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const currentRoles = experienceList
    .filter((experience) => experience.endDate === null)
    .map((experience) => ({
      "@type": "EmployeeRole",
      roleName: experience.role,
      startDate: experience.startDate,
      url: absoluteUrl(`/experience/${experience.slug}`),
      worksFor: {
        "@type": "Organization",
        name: experience.company,
        url: experience.organizationUrl,
      },
    }));

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Jakob Laise - Software Engineer Portfolio",
    url: absoluteUrl("/"),
    mainEntity: {
      "@type": "Person",
      "@id": `${absoluteUrl("/")}#jakob-laise`,
      name: "Jakob Laise",
      alternateName: "Jomak-x",
      url: absoluteUrl("/"),
      image: absoluteUrl(siteConfig.image),
      description: siteConfig.description,
      email: `mailto:${siteConfig.email}`,
      jobTitle: [
        "Software Engineering & Developer Advocacy Intern",
        "Software Engineering Student Fellow",
        "Software Engineering Fellow",
      ],
      worksFor: currentRoles,
      affiliation: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of Central Florida",
          url: "https://www.ucf.edu/",
        },
        {
          "@type": "Organization",
          name: "Databricks",
          url: "https://www.databricks.com/",
        },
        {
          "@type": "Organization",
          name: "BASTA Code2Career",
          url: "https://www.projectbasta.com/code2career",
        },
        {
          "@type": "Organization",
          name: "Knight Hacks",
          url: "https://knighthacks.org/",
        },
      ],
      sameAs: siteConfig.sameAs,
      knowsAbout: [
        "Software engineering",
        "Developer advocacy",
        "Full-stack development",
        "Artificial intelligence",
        "Machine learning",
        "Databricks",
        "Kubernetes",
        "Developer tools",
      ],
    },
  };

  return (
    <>
      <JsonLd data={profileJsonLd} />
      <div>
        <Hero />
        <section
          aria-labelledby="about-jakob"
          className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 py-14 md:flex-row md:px-8"
        >
          <h2 id="about-jakob" className="sr-only">
            About Jakob Laise
          </h2>
          <Textbox text={profile.text} height="min-h-80" width="w-full md:w-[34rem]" />
          <Imagecarousel boxWidth="min(100%, 560px)" boxHeight="clamp(260px, 35vw, 360px)">
            {profile.hackathonimg.map((s, idx) => (
              <Image
                key={s}
                src={s}
                alt={`Jakob Laise at a hackathon, photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority={idx === 0}
              />
            ))}
          </Imagecarousel>
        </section>
      </div>
    </>
  );
}
