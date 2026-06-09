import Link from "next/link";
import { Award, BarChart3, BookOpen, BookOpenText, Briefcase, GraduationCap, Home, LayoutDashboard, Mail, MessageSquareQuote, Settings, Sparkles, User } from "lucide-react";

const items = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Profile", "/admin/profile", User],
  ["Projects", "/admin/projects", Briefcase],
  ["Skills", "/admin/skills", Sparkles],
  ["Experiences", "/admin/experiences", BarChart3],
  ["Educations", "/admin/educations", GraduationCap],
  ["Certifications", "/admin/certifications", Award],
  ["Publications", "/admin/publications", BookOpenText],
  ["Testimonials", "/admin/testimonials", MessageSquareQuote],
  ["Blogs", "/admin/blogs", BookOpen],
  ["Messages", "/admin/messages", Mail],
  ["Settings", "/admin/settings", Settings]
] as const;

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 overflow-y-auto border-r border-white/10 bg-slate-950/95 p-4 lg:block">
      <Link href="/" className="mb-8 flex items-center gap-2 rounded-xl bg-white/[0.06] p-3 text-sm font-bold text-white">
        <Home className="h-4 w-4 text-cyan-200" /> Portfolio CMS
      </Link>
      <nav className="grid gap-1">
        {items.map(([label, href, Icon]) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white">
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
