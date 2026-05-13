import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jakob Laise – Software Engineer",
  description:
    "Portfolio of Jakob Laise – CS student at UCF, software engineer, hackathon organizer, and researcher.",
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
