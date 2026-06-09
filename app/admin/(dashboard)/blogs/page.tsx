import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/admin/blog-form";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { deleteBlog } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Blog } from "@/types/database";

export default async function AdminBlogsPage({ searchParams }: { searchParams: { edit?: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
  const blogs = (data || []) as Blog[];
  const editing = blogs.find((blog) => blog.id === searchParams.edit);
  return (
    <div className="grid gap-6">
      <BlogForm blog={editing} />
      <DataTable>
        <Table>
          <thead><tr><Th>Title</Th><Th>Category</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
          <tbody>{blogs.map((blog) => <tr key={blog.id}><Td>{blog.title}</Td><Td>{blog.category}</Td><Td><StatusBadge status={blog.status} /></Td><Td><div className="flex gap-2"><Button asChild size="sm" variant="secondary"><Link href={`/admin/blogs?edit=${blog.id}`}>Edit</Link></Button><form action={deleteBlog}><input type="hidden" name="id" value={blog.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td></tr>)}</tbody>
        </Table>
      </DataTable>
    </div>
  );
}
