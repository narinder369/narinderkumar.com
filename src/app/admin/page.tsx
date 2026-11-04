"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Plus,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    setOrders(adminStore.getOrders());
    setInquiries(adminStore.getInquiries());
    setProducts(adminStore.getProducts());
    setPosts(adminStore.getPosts());
    setMounted(true);
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status === "Paid")
    .reduce((acc, o) => acc + o.amount, 0);

  const newInquiries = inquiries.filter((i) => i.status === "New");

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Initializing Command Telemetry...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black tracking-tight">
              Command Dashboard
            </h1>
            <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Live
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Real-time telemetry across revenue settlement, catalog assets, client leads, and articles.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write Article</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-4 py-2 border border-neutral-300 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-2xs"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Settled Revenue
            </span>
            <div className="p-2 rounded-xl bg-black text-white">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-heading text-black">
              {formatPrice(totalRevenue)}
            </span>
            <span className="text-[10px] font-mono font-bold bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
              {orders.filter((o) => o.status === "Paid").length} sales
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Digital Products
            </span>
            <div className="p-2 rounded-xl bg-black text-white">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-heading text-black">
              {products.length}
            </span>
            <span className="text-[10px] font-mono font-bold bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
              {products.filter((p) => p.status === "published").length} Live
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Client Inquiries
            </span>
            <div className="p-2 rounded-xl bg-black text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-heading text-black">
              {inquiries.length}
            </span>
            {newInquiries.length > 0 ? (
              <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded">
                {newInquiries.length} New
              </span>
            ) : (
              <span className="text-[10px] font-mono text-neutral-400">
                All reviewed
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Published Articles
            </span>
            <div className="p-2 rounded-xl bg-black text-white">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black font-heading text-black">
              {posts.filter((p) => p.status === "published").length}
            </span>
            <span className="text-[10px] font-mono font-bold bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
              {posts.length} total
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Sales & Client Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h2 className="font-heading font-black text-base text-black">
                Recent Digital Purchases
              </h2>
              <span className="text-xs text-neutral-500">
                Direct transactions fulfilled via Razorpay & Stripe
              </span>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold uppercase tracking-wider text-black hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black">{o.id}</span>
                    <span className="font-bold text-xs text-neutral-900">{o.customer}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate max-w-sm">
                    {o.product}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-sm text-black">
                    {formatPrice(o.amount)}
                  </div>
                  <span className="text-[9px] font-mono uppercase bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">
                    {o.gateway}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incoming Client Leads */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h2 className="font-heading font-black text-base text-black">
                Incoming Client Leads
              </h2>
              <span className="text-xs text-neutral-500">
                Service inquiries from landing pages
              </span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold uppercase tracking-wider text-black hover:underline flex items-center gap-1"
            >
              <span>Manage CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-black">{inq.name}</span>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                      inq.status === "New"
                        ? "bg-black text-white border-black"
                        : "bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{inq.service}</span>
                  <span className="font-semibold text-black">{inq.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
