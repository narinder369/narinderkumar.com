"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  DollarSign,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  User,
  X,
  ExternalLink,
} from "lucide-react";
import { adminStore, type AdminOrder } from "@/lib/admin-store";
import { showAdminToast } from "@/components/admin/admin-toast";
import { formatPrice } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AdminOrder["status"]>("All");
  const [gatewayFilter, setGatewayFilter] = useState<"All" | "Razorpay" | "Stripe">("All");

  // Selected Order for Inspector Modal
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    setOrders(adminStore.getOrders());
    setMounted(true);
  }, []);

  const refreshOrders = () => {
    setOrders(adminStore.getOrders());
  };

  const handleStatusChange = (id: string, status: AdminOrder["status"]) => {
    adminStore.updateOrderStatus(id, status);
    refreshOrders();
    showAdminToast(`Order ${id} status updated to ${status}.`);
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer Name", "Customer Email", "Product", "Amount (INR)", "Gateway", "Status", "Date", "Transaction ID"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customer}"`,
      o.email,
      `"${o.product}"`,
      o.amount,
      o.gateway,
      o.status,
      `"${o.date}"`,
      o.transactionId || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `narinderkumar_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAdminToast("Orders exported to CSV successfully.");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        (o.transactionId && o.transactionId.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "All" ? true : o.status === statusFilter;

      const matchesGateway =
        gatewayFilter === "All" ? true : o.gateway === gatewayFilter;

      return matchesSearch && matchesStatus && matchesGateway;
    });
  }, [orders, searchQuery, statusFilter, gatewayFilter]);

  const totalGross = orders
    .filter((o) => o.status === "Paid")
    .reduce((acc, o) => acc + o.amount, 0);

  const averageOrder =
    orders.length > 0 ? Math.round(totalGross / Math.max(1, orders.filter((o) => o.status === "Paid").length)) : 0;

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Loading Audited Sales Records...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black tracking-tight">
              Orders & Sales Pipeline
            </h1>
            <span className="text-[11px] font-mono bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
              {orders.length} Purchases
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Audited records of digital asset purchases, Razorpay & Stripe gateway settlement, and download access.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Gross Settled Revenue
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {formatPrice(totalGross)}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Total Fulfilled Orders
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2 flex items-center justify-between">
            <span>{orders.filter((o) => o.status === "Paid").length}</span>
            <span className="text-xs font-mono font-bold bg-neutral-100 text-black px-2 py-0.5 rounded border border-neutral-300">
              Instant Delivery
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Average Order Value (AOV)
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {formatPrice(averageOrder)}
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by Order ID (NK-...), customer name, email, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all"
            />
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <select
              value={gatewayFilter}
              onChange={(e) => setGatewayFilter(e.target.value as any)}
              className="px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="All">All Gateways</option>
              <option value="Razorpay">Razorpay (India / UPI)</option>
              <option value="Stripe">Stripe (Global)</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
          {(["All", "Paid", "Pending", "Refunded"] as const).map((tab) => {
            const count =
              tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? "bg-black text-white"
                    : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ShoppingBag className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-black">
              No orders found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No digital purchases match your active search filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-200 tracking-wider">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product Purchased</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Gateway</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {filteredOrders.map((o) => {
                  const isPaid = o.status === "Paid";
                  return (
                    <tr key={o.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-black text-xs">
                        {o.id}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-black">{o.customer}</div>
                        <div className="text-[11px] text-neutral-500">{o.email}</div>
                      </td>

                      <td className="p-4 max-w-xs">
                        <div className="font-semibold truncate text-neutral-900">
                          {o.product}
                        </div>
                        {o.transactionId && (
                          <div className="text-[10px] font-mono text-neutral-400 truncate">
                            txn: {o.transactionId}
                          </div>
                        )}
                      </td>

                      <td className="p-4 font-black font-heading text-sm text-black">
                        {formatPrice(o.amount)}
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-[10px] uppercase px-2 py-0.5 rounded border border-neutral-200 bg-neutral-100 text-neutral-800">
                          {o.gateway}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isPaid
                              ? "bg-black text-white border-black"
                              : o.status === "Refunded"
                              ? "bg-neutral-200 text-neutral-800 border-neutral-300"
                              : "bg-neutral-100 text-neutral-600 border-neutral-200"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>

                      <td className="p-4 text-neutral-500 text-[11px] whitespace-nowrap">
                        {o.date}
                      </td>

                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border border-neutral-200 rounded-lg text-neutral-700 hover:border-black hover:text-black transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Audited Order Inspector
                </span>
                <h3 className="font-heading font-black text-xl text-black">
                  Order {selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-neutral-50 p-4 rounded-xl space-y-2 border border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Customer Name:</span>
                  <span className="font-bold text-black">{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email Address:</span>
                  <span className="font-mono text-black">{selectedOrder.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Order Date:</span>
                  <span className="text-black">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Gateway:</span>
                  <span className="font-semibold text-black">{selectedOrder.gateway}</span>
                </div>
                {selectedOrder.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Gateway Txn ID:</span>
                    <span className="font-mono text-black">{selectedOrder.transactionId}</span>
                  </div>
                )}
              </div>

              <div className="border border-neutral-200 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Purchased Entitlement
                </span>
                <div className="flex items-center justify-between font-bold text-sm text-black">
                  <span>{selectedOrder.product}</span>
                  <span>{formatPrice(selectedOrder.amount)}</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  Secure download delivery access granted via Supabase signed URL generation.
                </div>
              </div>

              {/* Status Updater */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-neutral-700">Order Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as AdminOrder["status"];
                    handleStatusChange(selectedOrder.id, newStatus);
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                  }}
                  className="px-3 py-1.5 font-bold uppercase text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black cursor-pointer bg-white"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  showAdminToast(`Download entitlement link re-sent to ${selectedOrder.email}.`);
                  setSelectedOrder(null);
                }}
                className="px-4 py-2 border border-neutral-300 rounded-xl text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Resend Download Link
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
