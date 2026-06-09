import type { Metadata } from "next";
import "./globals.css";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Developer Portfolio CMS",
    template: "%s | Developer Portfolio"
  },
  description: "A modern animated developer portfolio powered by Supabase.",
  openGraph: {
    title: "Developer Portfolio CMS",
    description: "Modern dark developer portfolio with an admin CMS.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
