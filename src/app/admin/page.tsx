import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: "₹1,48,250", change: "+24.5%", icon: DollarSign },
  { label: "Digital Orders", value: "86", change: "+18.2%", icon: ShoppingBag },
  { label: "Active Products", value: "6", change: "Catalog", icon: Package },
  { label: "Client Inquiries", value: "14", change: "4 Pending", icon: MessageSquare },
];

const recentOrders = [
  { id: "NK-M481A", customer: "Vikram Mehta", product: "AI Prompt Engineering Playbook", amount: 499, status: "Fulfilled" },
  { id: "NK-L992B", customer: "Ananya Sharma", product: "Viral Short-Form Video Hooks", amount: 799, status: "Fulfilled" },
  { id: "NK-K331C", customer: "Rohan Patel", product: "Next.js Digital Business Template", amount: 1999, status: "Fulfilled" },
  { id: "NK-J102D", customer: "David Chen", product: "WordPress & JetEngine Dynamic Blueprint", amount: 699, status: "Fulfilled" },
];

const pendingInquiries = [
  { name: "Apex Health Clinic", service: "AI UGC Video Campaign", budget: "₹50K-1L", date: "Today" },
  { name: "Zenith SaaS", service: "Next.js Web Redesign", budget: "₹75K+", date: "Yesterday" },
  { name: "Urban Flavors Restaurant", service: "Short-Form Video Production", budget: "₹25K-50K", date: "2 days ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal">
            Executive Dashboard
          </h1>
          <p className="text-sm text-muted mt-1">
            Real-time telemetry across revenue, fulfillment, and client acquisitions.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button variant="primary" size="sm">
              <Package className="w-4 h-4 mr-1.5" />
              Manage Products
            </Button>
          </Link>
          <Link href="/admin/inquiries">
            <Button variant="outline" size="sm">
              View Inquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} variant="bordered" className="bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  {stat.label}
                </span>
                <div className="p-2 rounded-lg bg-warm-cream text-deep-brown">
                  <Icon className="w-4 h-4 text-pink" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-deep-brown">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
                  {stat.change}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Section: Recent Orders & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-lg text-charcoal">
              Recent Digital Orders
            </h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-pink hover:underline">
              View all
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between text-sm">
                <div>
                  <div className="font-bold text-charcoal">{order.customer}</div>
                  <div className="text-xs text-muted truncate max-w-[200px] sm:max-w-xs">
                    {order.product}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold font-heading text-deep-brown">
                    {formatPrice(order.amount)}
                  </div>
                  <Badge variant="success" className="text-[10px] py-0">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Inquiries */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-lg text-charcoal">
              High-Intent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-pink hover:underline">
              Review
            </Link>
          </div>

          <div className="space-y-3">
            {pendingInquiries.map((inq, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-border bg-warm-cream/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-charcoal">{inq.name}</span>
                  <span className="text-[10px] text-muted">{inq.date}</span>
                </div>
                <div className="text-xs text-muted">{inq.service}</div>
                <div className="text-xs font-semibold text-deep-brown">
                  Budget: {inq.budget}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
