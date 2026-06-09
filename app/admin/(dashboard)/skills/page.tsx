import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { SkillForm } from "@/components/admin/skill-form";
import { deleteSkill } from "@/lib/actions/admin";
import { SkillIcon } from "@/lib/icon-map";
import { createClient } from "@/lib/supabase/server";
import type { Skill } from "@/types/database";

export default async function AdminSkillsPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("skills").select("*").order("sort_order", { ascending: true });
  const skills = (data || []) as Skill[];
  const editing = skills.find((skill) => skill.id === searchParams.edit);
  return (
    <div className="grid gap-6">
      <SkillForm skill={editing} />
      <DataTable>
        <Table>
          <thead><tr><Th>Name</Th><Th>Icon</Th><Th>Category</Th><Th>Marquee</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <Td>{skill.name}</Td>
                <Td><SkillIcon iconKey={skill.icon_key} className="h-5 w-5 text-cyan-200" /></Td>
                <Td>{skill.category}</Td>
                <Td>{skill.is_marquee ? "yes" : "no"}</Td>
                <Td><div className="flex gap-2"><Button asChild size="sm" variant="secondary"><Link href={`/admin/skills?edit=${skill.id}`}>Edit</Link></Button><form action={deleteSkill}><input type="hidden" name="id" value={skill.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DataTable>
    </div>
  );
}
