import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminToastContainer } from "@/components/admin/admin-toast";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Admin Console | Narinder Kumar",
  description:
    "Administrative command center for digital products, blog, inquiries, and platform operations.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side guard: redirects to /admin/login if not authenticated admin
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row text-neutral-900 font-sans antialiased selection:bg-black selection:text-white">
      {/* Dynamic Interactive Sidebar with admin identity */}
      <AdminSidebar
        adminName={admin.fullName}
        adminEmail={admin.email}
      />

      {/* Main Admin Workspace */}
      <main className="flex-1 p-5 sm:p-8 md:p-10 overflow-y-auto bg-neutral-50/80 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">{children}</div>
      </main>

      {/* Global Interactive Notification Toasts */}
      <AdminToastContainer />
    </div>
  );
}
