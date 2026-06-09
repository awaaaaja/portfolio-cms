import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
