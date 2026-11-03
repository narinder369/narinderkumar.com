import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://narinderkumar.com"),
  title: {
    default: "Narinder Kumar — Building Digital Experiences. Creating Ideas That Matter.",
    template: "%s | Narinder Kumar",
  },
  description:
    "I help businesses and creators grow through creative content, AI-powered solutions, digital experiences and practical digital products.",
  keywords: [
    "Narinder Kumar",
    "digital creator",
    "frontend developer",
    "WordPress developer",
    "UI/UX designer",
    "AI video creator",
    "digital entrepreneur",
    "web development",
    "digital products",
  ],
  authors: [{ name: "Narinder Kumar" }],
  creator: "Narinder Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://narinderkumar.com",
    siteName: "Narinder Kumar",
    title: "Narinder Kumar — Building Digital Experiences",
    description:
      "I help businesses and creators grow through creative content, AI-powered solutions, digital experiences and practical digital products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narinder Kumar — Building Digital Experiences",
    description:
      "I help businesses and creators grow through creative content, AI-powered solutions, digital experiences and practical digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
