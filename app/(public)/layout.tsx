import { PublicProviders } from "@/components/public/public-providers";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getProfile, getSettings } from "@/lib/data/public";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  return (
    <PublicProviders>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cyan-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950">
        Skip to content
      </a>
      <SiteHeader logo={settings.logo_text} />
      <main id="main">{children}</main>
      <SiteFooter profile={profile} />
    </PublicProviders>
  );
}
