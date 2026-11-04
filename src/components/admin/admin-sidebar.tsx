"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog & Content", href: "/admin/blog", icon: FileText },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Client Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Orders & Sales", href: "/admin/orders", icon: ShoppingBag },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden bg-black text-white p-4 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-heading font-black text-xl text-white tracking-tight">
            NK<span className="text-white">.</span>
          </span>
          <span className="text-[10px] bg-neutral-800 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-neutral-700">
            Admin
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar (Desktop + Mobile Slideover) */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-40 w-64 bg-black text-white flex flex-col justify-between shrink-0 border-r border-neutral-800 transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <span className="font-heading font-black text-2xl text-white tracking-tight">
                NK<span className="text-white">.</span>
              </span>
              <span className="text-[10px] bg-neutral-850 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-neutral-700">
                Admin Console
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-white text-black shadow-md font-extrabold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-black" : "text-neutral-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Authenticated Operator</span>
          </div>

          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-xs font-bold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </span>
            <span className="text-[10px] uppercase font-mono text-neutral-500">↗</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
