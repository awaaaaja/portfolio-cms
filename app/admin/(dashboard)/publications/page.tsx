import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { deletePublication, upsertPublication } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Publication } from "@/types/database";

export default async function AdminPublicationsPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("publications").select("*").order("sort_order");
  const items = (data || []) as Publication[];
  const item = items.find((entry) => entry.id === searchParams.edit);
  return <div className="grid gap-6">
    <form action={upsertPublication} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={item?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2"><Field name="title" label="Title" value={item?.title} /><Field name="publisher" label="Publisher" value={item?.publisher} /></div>
      <div className="grid gap-4 md:grid-cols-3"><Field name="published_at" label="Published date" value={item?.published_at} type="date" /><Field name="publication_url" label="Publication URL" value={item?.publication_url} /><Field name="sort_order" label="Sort order" value={item?.sort_order ?? 0} type="number" /></div>
      <ImageUploader name="cover_url" label="Publication cover" defaultValue={item?.cover_url} />
      <div className="grid gap-2"><Label>Description</Label><Textarea name="description" defaultValue={item?.description || ""} /></div>
      <Button>Save publication</Button>
    </form>
    <DataTable><Table><thead><tr><Th>Title</Th><Th>Publisher</Th><Th>Actions</Th></tr></thead><tbody>{items.map((entry) => <tr key={entry.id}><Td>{entry.title}</Td><Td>{entry.publisher}</Td><Td><div className="flex gap-2"><Button asChild size="sm" variant="secondary"><Link href={`/admin/publications?edit=${entry.id}`}>Edit</Link></Button><form action={deletePublication}><input type="hidden" name="id" value={entry.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td></tr>)}</tbody></Table></DataTable>
  </div>;
}
function Field({ name, label, value, type = "text" }: { name: string; label: string; value?: string | number | null; type?: string }) { return <div className="grid gap-2"><Label>{label}</Label><Input name={name} type={type} defaultValue={value ?? ""} /></div>; }
