import type { Metadata } from "next";

const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  return normalizeSiteUrl(configuredUrl || LOCAL_SITE_URL);
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export const siteConfig = {
  name: "Jakob Laise",
  title: "Jakob Laise | Software Engineer and UCF Computer Science Student",
  description:
    "Jakob Laise is a UCF computer science student, Twilio Software Engineering & Developer Advocacy Intern, Databricks Student Fellow, and Google x BASTA Code2Career Fellow building full-stack and AI systems.",
  email: "Jakob@Laise.de",
  image: "/home/First_Page/profile1.png",
  sameAs: [
    "https://github.com/Jomak-x",
    "https://www.linkedin.com/in/jakob-l123/",
    "https://devpost.com/Jomak-x",
  ],
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | Jakob Laise`;
  const socialImage = absoluteUrl("/opengraph-image");

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Jakob Laise - Software Engineer and UCF Computer Science Student",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
