import type { Metadata } from "next";
import { getSiteUrl, shouldIndexSite, siteConfig } from "@/lib/site";
import "./globals.css";

const indexSite = shouldIndexSite();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: "%s | Jakob Laise",
  },
  description: siteConfig.description,
  applicationName: "Jakob Laise Portfolio",
  authors: [{ name: siteConfig.name, url: getSiteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    siteName: "Jakob Laise Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    url: getSiteUrl(),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jakob Laise - Software Engineer and UCF Computer Science Student",
      },
    ],
    firstName: siteConfig.givenName,
    lastName: siteConfig.familyName,
    username: siteConfig.handle,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: indexSite,
    follow: indexSite,
    googleBot: {
      index: indexSite,
      follow: indexSite,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
