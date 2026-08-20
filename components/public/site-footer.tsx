import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks } from "@/components/public/nav-links-data";
import type { Profile } from "@/types/database";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} className="text-slate-400 transition hover:text-white" data-cursor="hover">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center gap-4">
          {profile.email ? <Link href={`mailto:${profile.email}`} aria-label="Email" data-cursor="hover"><Mail className="h-5 w-5" /></Link> : null}
          {profile.github_url ? <Link href={profile.github_url} aria-label="GitHub" data-cursor="hover"><Github className="h-5 w-5" /></Link> : null}
          {profile.linkedin_url ? <Link href={profile.linkedin_url} aria-label="LinkedIn" data-cursor="hover"><Linkedin className="h-5 w-5" /></Link> : null}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <Link href="/privacy" className="transition hover:text-white" data-cursor="hover">Privacy Policy</Link>
          <Link href="/terms" className="transition hover:text-white" data-cursor="hover">Terms of Service</Link>
        </div>
        <p className="text-xs text-slate-500">Copyright {new Date().getFullYear()} {profile.name}. Built with Next.js and Supabase.</p>
      </div>
    </footer>
  );
}