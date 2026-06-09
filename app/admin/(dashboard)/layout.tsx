import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <div className="admin-shell min-w-0 lg:pl-64">
        <AdminTopbar />
        <main className="min-w-0 overflow-hidden p-3 sm:p-5 lg:p-8">{children}</main>
      </div>
    </>
  );
}
