import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </>
  );
}
