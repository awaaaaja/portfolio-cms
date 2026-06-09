import Link from "next/link";
import { BookOpen, Briefcase, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardCard } from "@/components/admin/dashboard-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/types/database";

export default async function AdminDashboardPage() {
  const supabase = createClient();
  const [projects, blogs, skills, unread, messages] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5)
  ]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        <DashboardCard label="Total projects" value={projects.count || 0} icon={Briefcase} />
        <DashboardCard label="Total blogs" value={blogs.count || 0} icon={BookOpen} />
        <DashboardCard label="Total skills" value={skills.count || 0} icon={Sparkles} />
        <DashboardCard label="Unread messages" value={unread.count || 0} icon={Mail} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-bold text-white">Recent messages</h2>
          <div className="grid gap-3">
            {((messages.data || []) as ContactMessage[]).map((message) => (
              <div key={message.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{message.name}</p>
                  <StatusBadge status={message.status} />
                </div>
                <p className="mt-1 text-sm text-slate-400">{message.subject}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-bold text-white">Quick actions</h2>
          <div className="grid gap-3">
            <Button asChild variant="secondary"><Link href="/admin/projects">Manage projects</Link></Button>
            <Button asChild variant="secondary"><Link href="/admin/skills">Manage skills</Link></Button>
            <Button asChild variant="secondary"><Link href="/admin/messages">View messages</Link></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
