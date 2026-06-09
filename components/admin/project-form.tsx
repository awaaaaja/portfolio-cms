import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { upsertProject } from "@/lib/actions/admin";
import type { ProjectWithRelations } from "@/types/database";

export function ProjectForm({ project }: { project?: ProjectWithRelations }) {
  return (
    <form action={upsertProject} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={project?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label="Title" value={project?.title} />
        <Field name="slug" label="Slug" value={project?.slug} />
      </div>
      <Field name="category" label="Category" value={project?.category} />
      <div className="grid gap-2">
        <Label>Status</Label>
        <Select name="status" defaultValue={project?.status || "draft"}>
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="archived">archived</option>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Short description</Label>
        <Textarea name="short_description" defaultValue={project?.short_description || ""} />
      </div>
      <div className="grid gap-2">
        <Label>Full description</Label>
        <Textarea name="description" defaultValue={project?.description || ""} className="min-h-40" />
      </div>
      <ImageUploader name="thumbnail_url" label="Thumbnail" defaultValue={project?.thumbnail_url} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="demo_url" label="Demo URL" value={project?.demo_url} />
        <Field name="github_url" label="GitHub URL" value={project?.github_url} />
      </div>
      <div className="grid gap-2">
        <Label>Tech stacks comma-separated</Label>
        <Input name="tech_stacks" defaultValue={project?.project_tech_stacks?.map((tech) => tech.name).join(", ")} />
      </div>
      <div className="grid gap-2">
        <Label>Gallery image URLs, one per line</Label>
        <Textarea name="gallery" defaultValue={project?.project_images?.map((image) => image.image_url).join("\n")} />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <Switch name="is_featured" defaultChecked={project?.is_featured} /> Featured
        </label>
        <Field name="sort_order" label="Sort order" value={project?.sort_order ?? 0} type="number" compact />
      </div>
      <Button>Save project</Button>
    </form>
  );
}

function Field({ name, label, value, type = "text", compact = false }: { name: string; label: string; value?: string | number | null; type?: string; compact?: boolean }) {
  return (
    <div className={compact ? "grid w-36 gap-2" : "grid gap-2"}>
      <Label>{label}</Label>
      <Input name={name} type={type} defaultValue={value ?? ""} />
    </div>
  );
}
