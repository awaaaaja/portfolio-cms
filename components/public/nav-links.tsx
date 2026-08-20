"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/components/public/nav-links-data";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navLinks.map(([label, href]) => {
        const active = pathname === href || pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-lg px-3 py-2 text-sm transition duration-300 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-cyan-200 after:transition-transform after:duration-300 hover:bg-white/8 hover:text-white hover:after:scale-x-100",
              active ? "text-white after:scale-x-100" : "text-slate-300"
            )}
            data-cursor="hover"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <details className="relative md:hidden">
      <summary className="list-none rounded-lg border border-white/10 bg-white/[0.04] p-2 transition active:scale-95">
        <Menu className="h-5 w-5" />
      </summary>
      <div className="absolute right-0 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-glass backdrop-blur-xl">
        {navLinks.map(([label, href]) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined} className={cn("block rounded-lg px-3 py-3 text-sm transition active:bg-white/10", active ? "bg-white/5 text-white" : "text-slate-300")}>
              {label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}