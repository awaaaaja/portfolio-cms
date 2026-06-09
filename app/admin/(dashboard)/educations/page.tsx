import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { deleteEducation, upsertEducation } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Education } from "@/types/database";

export default async function AdminEducationsPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("educations").select("*").order("sort_order", { ascending: true });
  const educations = (data || []) as Education[];
  const item = educations.find((entry) => entry.id === searchParams.edit);

  return (
    <div className="grid gap-6">
      <form action={upsertEducation} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <input type="hidden" name="id" value={item?.id || ""} />
        <div className="grid gap-4 md:grid-cols-2"><Field name="institution" label="Institution" value={item?.institution} /><Field name="major" label="Major" value={item?.major} /></div>
        <div className="grid gap-4 md:grid-cols-3"><Field name="start_year" label="Start year" value={item?.start_year} type="number" /><Field name="end_year" label="End year" value={item?.end_year} type="number" /><Field name="sort_order" label="Sort order" value={item?.sort_order ?? 0} type="number" /></div>
        <div className="grid gap-2"><Label>Description</Label><Textarea name="description" defaultValue={item?.description || ""} /></div>
        <Button>Save education</Button>
      </form>
      <DataTable><Table><thead><tr><Th>Institution</Th><Th>Major</Th><Th>Years</Th><Th>Actions</Th></tr></thead><tbody>{educations.map((entry) => <tr key={entry.id}><Td>{entry.institution}</Td><Td>{entry.major}</Td><Td>{entry.start_year} - {entry.end_year}</Td><Td><div className="flex gap-2"><Button asChild size="sm" variant="secondary"><Link href={`/admin/educations?edit=${entry.id}`}>Edit</Link></Button><form action={deleteEducation}><input type="hidden" name="id" value={entry.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td></tr>)}</tbody></Table></DataTable>
    </div>
  );
}

function Field({ name, label, value, type = "text" }: { name: string; label: string; value?: string | number | null; type?: string }) {
  return <div className="grid gap-2"><Label>{label}</Label><Input name={name} type={type} defaultValue={value ?? ""} /></div>;
}
