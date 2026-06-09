import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { deleteTestimonial, updateTestimonialStatus } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/database";

export default async function AdminTestimonialsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  const items = (data || []) as Testimonial[];
  return <DataTable><Table><thead><tr><Th>Person</Th><Th>Testimonial</Th><Th>Status</Th><Th>Actions</Th></tr></thead><tbody>
    {items.map((item) => <tr key={item.id}>
      <Td><div className="font-medium text-white">{item.name}</div><div className="text-xs text-slate-500">{[item.role, item.affiliation].filter(Boolean).join(" · ")}</div></Td>
      <Td><p className="max-w-xl text-sm leading-6">{item.quote}</p></Td>
      <Td><StatusBadge status={item.status} /></Td>
      <Td><div className="flex flex-wrap gap-2">{["published", "archived"].map((status) => <form key={status} action={updateTestimonialStatus}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="status" value={status} /><Input name="sort_order" type="hidden" defaultValue={item.sort_order} /><Button size="sm" variant="secondary">{status}</Button></form>)}<form action={deleteTestimonial}><input type="hidden" name="id" value={item.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td>
    </tr>)}
  </tbody></Table></DataTable>;
}
