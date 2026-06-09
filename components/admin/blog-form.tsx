import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { upsertBlog } from "@/lib/actions/admin";
import type { Blog } from "@/types/database";

export function BlogForm({ blog }: { blog?: Blog }) {
  return (
    <form action={upsertBlog} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={blog?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label="Title" value={blog?.title} />
        <Field name="slug" label="Slug" value={blog?.slug} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="category" label="Category" value={blog?.category} />
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={blog?.status || "draft"}>
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </Select>
        </div>
      </div>
      <ImageUploader name="cover_url" label="Cover image" defaultValue={blog?.cover_url} />
      <div className="grid gap-2">
        <Label>Excerpt</Label>
        <Textarea name="excerpt" defaultValue={blog?.excerpt || ""} />
      </div>
      <div className="grid gap-2">
        <Label>Content</Label>
        <Textarea name="content" defaultValue={blog?.content || ""} className="min-h-64 font-mono" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="seo_title" label="SEO title" value={blog?.seo_title} />
        <Field name="seo_description" label="SEO description" value={blog?.seo_description} />
      </div>
      <Button>Save blog</Button>
    </form>
  );
}

function Field({ name, label, value }: { name: string; label: string; value?: string | null }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input name={name} defaultValue={value ?? ""} />
    </div>
  );
}
