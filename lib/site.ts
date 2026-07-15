import type { Metadata } from "next";

const LOCAL_SITE_URL = "http://localhost:3000";
export const PRODUCTION_SITE_URL = "https://jlaise.dev";
export const SITE_LAST_UPDATED = "2026-07-14";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? PRODUCTION_SITE_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL);

  return normalizeSiteUrl(configuredUrl || LOCAL_SITE_URL);
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function shouldIndexSite() {
  return process.env.VERCEL_ENV !== "preview";
}

export const siteConfig = {
  name: "Jakob Laise",
  givenName: "Jakob",
  familyName: "Laise",
  handle: "Jomak-x",
  title: "Jakob Laise | Software Engineer and UCF Computer Science Student",
  description:
    "Jakob Laise is a UCF computer science student and Twilio software engineering intern, Databricks Student Fellow, and Google x BASTA Code2Career Fellow.",
  email: "Jakob@Laise.de",
  image: "/home/First_Page/profile1.webp",
  locale: "en_US",
  language: "en-US",
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
  label = "Software Engineering Portfolio",
  image,
  imageAlt,
  openGraphType = "website",
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  label?: string;
  image?: string;
  imageAlt?: string;
  openGraphType?: "website" | "profile";
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | Jakob Laise`;
  const socialImage = image
    ? absoluteUrl(image)
    : absoluteUrl(
        `/api/og?title=${encodeURIComponent(socialTitle)}&description=${encodeURIComponent(
          description,
        )}&label=${encodeURIComponent(label)}`,
      );
  const socialImageAlt =
    imageAlt || `${socialTitle} — ${label.toLowerCase()}`;
  const openGraphBase = {
    locale: siteConfig.locale,
    siteName: "Jakob Laise Portfolio",
    title: socialTitle,
    description,
    url,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
    openGraph:
      openGraphType === "profile"
        ? {
            type: "profile",
            firstName: siteConfig.givenName,
            lastName: siteConfig.familyName,
            username: siteConfig.handle,
            ...openGraphBase,
          }
        : { type: "website", ...openGraphBase },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
