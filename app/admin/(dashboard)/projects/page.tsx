import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { ProjectForm } from "@/components/admin/project-form";
import { StatusBadge } from "@/components/admin/status-badge";
import { deleteProject } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { ProjectWithRelations } from "@/types/database";

export default async function AdminProjectsPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("projects").select("*, project_images(*), project_tech_stacks(*)").order("sort_order", { ascending: true });
  const projects = (data || []) as ProjectWithRelations[];
  const editing = projects.find((project) => project.id === searchParams.edit);
  return (
    <div className="grid gap-6">
      <ProjectForm project={editing} />
      <DataTable>
        <Table>
          <thead><tr><Th>Title</Th><Th>Status</Th><Th>Featured</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <Td>{project.title}</Td>
                <Td><StatusBadge status={project.status} /></Td>
                <Td>{project.is_featured ? "yes" : "no"}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="secondary"><Link href={`/admin/projects?edit=${project.id}`}>Edit</Link></Button>
                    <form action={deleteProject}><input type="hidden" name="id" value={project.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DataTable>
    </div>
  );
}
