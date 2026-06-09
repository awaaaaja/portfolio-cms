import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/types/database";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-slate-400 sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <p>Copyright {new Date().getFullYear()} {profile.name}. Built with Next.js and Supabase.</p>
        <div className="flex items-center justify-center gap-4">
          {profile.email ? <Link href={`mailto:${profile.email}`} data-cursor="hover"><Mail className="h-5 w-5" /></Link> : null}
          {profile.github_url ? <Link href={profile.github_url} data-cursor="hover"><Github className="h-5 w-5" /></Link> : null}
          {profile.linkedin_url ? <Link href={profile.linkedin_url} data-cursor="hover"><Linkedin className="h-5 w-5" /></Link> : null}
        </div>
      </div>
    </footer>
  );
}
