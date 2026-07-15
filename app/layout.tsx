import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

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
  category: "technology",
  openGraph: {
    type: "profile",
    locale: "en_US",
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
