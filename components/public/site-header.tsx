import Link from "next/link";
import { Code2 } from "lucide-react";
import { DesktopNav, MobileNav } from "@/components/public/nav-links";

export function SiteHeader({ logo = "UJ" }: { logo?: string | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-bold text-white" data-cursor="hover">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 transition duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-neon">
            <Code2 className="h-4 w-4" />
          </span>
          {logo || "PORTFOLIO"}
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}