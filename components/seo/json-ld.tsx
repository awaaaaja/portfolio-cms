import type { Profile } from "@/types/database";
import { env } from "@/lib/env";

export function JsonLd({ profile }: { profile: Profile }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.headline,
    email: profile.email || undefined,
    url: env.siteUrl,
    sameAs: [profile.github_url, profile.linkedin_url, profile.instagram_url].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}