import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { env } from "@/lib/env";
import { getProfile, getSettings } from "@/lib/data/public";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark"
};

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  const title = `${profile.name}${profile.role ? ` — ${profile.role}` : ""}`;
  const description = settings.site_description || profile.bio?.slice(0, 160) || "Developer portfolio";

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: title,
      template: `%s | ${profile.name}`
    },
    description,
    keywords: [
      ...(profile.role ? [profile.role.toLowerCase()] : []),
      "portfolio",
      "web developer",
      ...(settings.site_title ? [settings.site_title] : [])
    ],
    alternates: {
      canonical: "/"
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: env.siteUrl,
      siteName: settings.site_title || profile.name,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}