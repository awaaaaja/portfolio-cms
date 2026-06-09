import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DataTable, Table, Td, Th } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { deleteMessage, updateMessageStatus } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types/database";

export default async function AdminMessagesPage({ searchParams }: { searchParams: { status?: string } }) {
  const supabase = createClient();
  let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  if (searchParams.status) query = query.eq("status", searchParams.status);
  const { data } = await query;
  const messages = (data || []) as ContactMessage[];
  return (
    <div className="grid gap-6">
      <form className="max-w-xs"><Select name="status" defaultValue={searchParams.status || ""}><option value="">All messages</option><option value="unread">Unread</option><option value="read">Read</option><option value="replied">Replied</option></Select></form>
      <DataTable>
        <Table>
          <thead><tr><Th>Sender</Th><Th>Message</Th><Th>Status</Th><Th>Date</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <Td><div className="font-medium text-white">{message.name}</div><div className="text-xs text-slate-500">{message.email}</div></Td>
                <Td><div className="font-medium text-slate-200">{message.subject}</div><p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">{message.message}</p></Td>
                <Td><StatusBadge status={message.status} /></Td>
                <Td>{formatDate(message.created_at)}</Td>
                <Td><div className="flex flex-wrap gap-2">{["read", "replied"].map((status) => <form key={status} action={updateMessageStatus}><input type="hidden" name="id" value={message.id} /><input type="hidden" name="status" value={status} /><Button size="sm" variant="secondary">{status}</Button></form>)}<form action={deleteMessage}><input type="hidden" name="id" value={message.id} /><Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button></form></div></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DataTable>
    </div>
  );
}
