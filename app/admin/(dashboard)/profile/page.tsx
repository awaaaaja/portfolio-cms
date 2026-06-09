import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { GalleryUploader } from "@/components/admin/gallery-uploader";
import { upsertProfile } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import { fallbackProfile } from "@/lib/data/fallback";
import type { Profile } from "@/types/database";

export default async function AdminProfilePage() {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: true }).limit(1).single();
  const profile = (data as Profile | null) || fallbackProfile;

  return (
    <form action={upsertProfile} className="grid max-w-4xl gap-5 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={profile.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Name" value={profile.name} />
        <Field name="role" label="Role" value={profile.role} />
      </div>
      <Field name="headline" label="Headline" value={profile.headline} />
      <div className="grid gap-2">
        <Label>Hero description</Label>
        <Textarea name="bio" defaultValue={profile.bio || ""} className="min-h-36" />
      </div>
      <div className="grid gap-2">
        <Label>About Me description</Label>
        <Textarea name="about_bio" defaultValue={profile.about_bio || ""} className="min-h-36" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ImageUploader name="avatar_url" label="Avatar URL" defaultValue={profile.avatar_url} />
        <ImageUploader name="hero_photo_url" label="Hero photo URL" defaultValue={profile.hero_photo_url} />
      </div>
      <GalleryUploader name="about_photo_urls" label="About slideshow photos" defaultValue={profile.about_photo_urls} />
      <div className="grid gap-2">
        <Label>Hero roles, one per line or comma-separated</Label>
        <Textarea name="hero_roles" defaultValue={(profile.hero_roles || []).join("\n")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="email" label="Email" value={profile.email} />
        <Field name="phone" label="Phone" value={profile.phone} />
        <Field name="location" label="Location" value={profile.location} />
        <Field name="cv_url" label="CV URL" value={profile.cv_url} />
        <Field name="github_url" label="GitHub URL" value={profile.github_url} />
        <Field name="linkedin_url" label="LinkedIn URL" value={profile.linkedin_url} />
        <Field name="instagram_url" label="Instagram URL" value={profile.instagram_url} />
      </div>
      <Button>Save profile</Button>
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
