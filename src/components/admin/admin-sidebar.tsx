"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
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
  LogOut,
  User,
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

interface AdminSidebarProps {
  adminName?: string;
  adminEmail?: string;
}

export function AdminSidebar({
  adminName = "Administrator",
  adminEmail = "",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAction();
  };

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
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
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
            <Link
              href="/admin"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
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

        {/* Bottom: Admin Identity & Actions */}
        <div className="p-5 border-t border-neutral-800 space-y-4">
          {/* Authenticated Admin Identity */}
          <div className="flex items-start gap-3 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-xs shrink-0">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-white truncate">
                {adminName}
              </div>
              <div className="text-[10px] text-neutral-500 font-mono truncate">
                {adminEmail}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                  Verified Admin
                </span>
              </div>
            </div>
          </div>

          {/* View Live Site */}
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-xs font-bold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </span>
            <span className="text-[10px] uppercase font-mono text-neutral-500">
              ↗
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/40 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
