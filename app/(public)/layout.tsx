import { PublicProviders } from "@/components/public/public-providers";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getProfile, getSettings } from "@/lib/data/public";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  return (
    <PublicProviders>
      <SiteHeader logo={settings.logo_text} />
      <main>{children}</main>
      <SiteFooter profile={profile} />
    </PublicProviders>
  );
}
