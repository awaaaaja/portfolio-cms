import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { deleteExperience, upsertExperience } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Experience } from "@/types/database";

export default async function AdminExperiencesPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true });
  const experiences = (data || []) as Experience[];
  const item = experiences.find((entry) => entry.id === searchParams.edit);

  return (
    <div className="grid gap-6">
      <form action={upsertExperience} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <input type="hidden" name="id" value={item?.id || ""} />
        <div className="grid gap-4 md:grid-cols-2"><Field name="position" label="Position" value={item?.position} /><Field name="company" label="Company" value={item?.company} /></div>
        <div className="grid gap-4 md:grid-cols-3"><Field name="start_date" label="Start date" value={item?.start_date} type="date" /><Field name="end_date" label="End date" value={item?.end_date} type="date" /><Field name="sort_order" label="Sort order" value={item?.sort_order ?? 0} type="number" /></div>
        <label className="flex items-center gap-2 text-sm text-slate-300"><Switch name="is_current" defaultChecked={item?.is_current} /> Current role</label>
        <div className="grid gap-2"><Label>Description</Label><Textarea name="description" defaultValue={item?.description || ""} /></div>
        <Button>Save experience</Button>
      </form>
      <DataTable><Table><thead><tr><Th>Position</Th><Th>Company</Th><Th>Current</Th><Th>Actions</Th></tr></thead><tbody>{experiences.map((entry) => <tr key={entry.id}><Td>{entry.position}</Td><Td>{entry.company}</Td><Td>{entry.is_current ? "yes" : "no"}</Td><Td><div className="flex gap-2"><Button asChild size="sm" variant="secondary"><Link href={`/admin/experiences?edit=${entry.id}`}>Edit</Link></Button><form action={deleteExperience}><input type="hidden" name="id" value={entry.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td></tr>)}</tbody></Table></DataTable>
    </div>
  );
}

function Field({ name, label, value, type = "text" }: { name: string; label: string; value?: string | number | null; type?: string }) {
  return <div className="grid gap-2"><Label>{label}</Label><Input name={name} type={type} defaultValue={value ?? ""} /></div>;
}
