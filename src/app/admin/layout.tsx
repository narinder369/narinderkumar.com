import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Blog & Content", href: "/admin/blog", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row text-black">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white flex flex-col justify-between shrink-0 border-r border-neutral-900">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-white tracking-tight uppercase">
                NK<span className="text-white">.</span>
              </span>
              <span className="text-[10px] bg-neutral-800 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-neutral-700">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-neutral-900">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            target="_blank"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </Link>
          <div className="mt-4 text-[10px] text-neutral-600 uppercase font-semibold">
            Platform Engine v1.0
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-neutral-50">
        {children}
      </main>
    </div>
  );
}
