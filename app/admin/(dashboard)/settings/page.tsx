import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fallbackSettings } from "@/lib/data/fallback";
import { upsertSettings } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("*").order("created_at", { ascending: true }).limit(1).single();
  const settings = (data as SiteSettings | null) || fallbackSettings;

  return (
    <form action={upsertSettings} className="grid max-w-3xl gap-5 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={settings.id} />
      <Field name="site_title" label="Site title" value={settings.site_title} />
      <div className="grid gap-2">
        <Label>Site description</Label>
        <Textarea name="site_description" defaultValue={settings.site_description || ""} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="logo_text" label="Logo text" value={settings.logo_text} />
        <Field name="accent_color" label="Accent color" value={settings.accent_color} />
      </div>
      <Field name="hero_title" label="Hero title" value={settings.hero_title} />
      <Field name="hero_subtitle" label="Hero subtitle" value={settings.hero_subtitle} />
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <Switch name="maintenance_mode" defaultChecked={settings.maintenance_mode} /> Maintenance mode
      </label>
      <Button>Save settings</Button>
    </form>
  );
}

function Field({ name, label, value }: { name: string; label: string; value?: string | null }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input name={name} defaultValue={value || ""} />
    </div>
  );
}
