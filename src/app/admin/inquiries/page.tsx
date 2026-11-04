"use client";

import { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Trash2,
  Send,
  Save,
  Clock,
  Briefcase,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { adminStore, type AdminInquiry } from "@/lib/admin-store";
import { showAdminToast } from "@/components/admin/admin-toast";

const STATUS_LIST: AdminInquiry["status"][] = [
  "New",
  "In Discussion",
  "Replied",
  "Closed",
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AdminInquiry["status"]>("All");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesBuffer, setNotesBuffer] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setInquiries(adminStore.getInquiries());
    setMounted(true);
  }, []);

  const refreshList = () => {
    setInquiries(adminStore.getInquiries());
  };

  const handleStatusChange = (id: string, status: AdminInquiry["status"]) => {
    adminStore.updateInquiryStatus(id, status);
    refreshList();
    showAdminToast(`Inquiry marked as "${status}".`);
  };

  const handleStartEditingNotes = (inq: AdminInquiry) => {
    setEditingNotesId(inq.id);
    setNotesBuffer(inq.adminNotes || "");
  };

  const handleSaveNotes = (id: string) => {
    adminStore.updateInquiryNotes(id, notesBuffer.trim());
    setEditingNotesId(null);
    refreshList();
    showAdminToast("Admin notes updated successfully.");
  };

  const handleDelete = (id: string) => {
    adminStore.deleteInquiry(id);
    setDeleteConfirmId(null);
    refreshList();
    showAdminToast("Inquiry lead removed.", "info");
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        inq.service.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ? true : inq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchQuery, statusFilter]);

  const newCount = inquiries.filter((i) => i.status === "New").length;
  const inDiscussionCount = inquiries.filter((i) => i.status === "In Discussion").length;
  const closedCount = inquiries.filter((i) => i.status === "Closed").length;

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Loading Client Leads Pipeline...
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
              Client Inquiries & CRM
            </h1>
            <span className="text-[11px] font-mono bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
              {inquiries.length} Total Leads
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Track, qualify, and respond to incoming project briefs and video inquiries.
          </p>
        </div>

        {newCount > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 border border-neutral-300 rounded-xl text-xs font-bold text-black">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>{newCount} New Inquiries Awaiting Reply</span>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Total Inquiries
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {inquiries.length}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            New / Unreviewed
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2 flex items-center justify-between">
            <span>{newCount}</span>
            <span className="text-xs font-mono font-bold bg-neutral-100 text-black px-2 py-0.5 rounded border border-neutral-300">
              Action Req.
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            In Discussion
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {inDiscussionCount}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Deals Closed
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {closedCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search leads by client name, email, company, service or message contents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100">
          {(["All", "New", "In Discussion", "Replied", "Closed"] as const).map((tab) => {
            const count =
              tab === "All"
                ? inquiries.length
                : inquiries.filter((i) => i.status === tab).length;
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

      {/* Inquiries Cards List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <MessageSquare className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-black">
              No inquiries found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No project inquiries match your current search query or status filter.
            </p>
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const isEditingThisNote = editingNotesId === inq.id;
            return (
              <div
                key={inq.id}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-neutral-400 transition-all"
              >
                {/* Top Row: Client & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-base sm:text-lg text-black">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-xs font-medium text-neutral-500 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          {inq.company}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-1">
                      <a
                        href={`mailto:${inq.email}?subject=Re: Inquiry - ${inq.service}`}
                        className="flex items-center gap-1 hover:text-black font-medium transition-colors"
                      >
                        <Mail className="w-3 h-3 text-neutral-400" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 hover:text-black font-medium transition-colors"
                        >
                          <Phone className="w-3 h-3 text-neutral-400" />
                          {inq.phone}
                        </a>
                      )}
                      <span className="flex items-center gap-1 font-mono text-neutral-400 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {inq.date}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">
                      Status:
                    </span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition-colors ${
                        inq.status === "New"
                          ? "bg-black text-white border-black"
                          : inq.status === "In Discussion"
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : inq.status === "Replied"
                          ? "bg-neutral-200 text-neutral-900 border-neutral-300"
                          : "bg-neutral-100 text-neutral-600 border-neutral-200"
                      }`}
                    >
                      {STATUS_LIST.map((s) => (
                        <option key={s} value={s} className="bg-white text-black">
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setDeleteConfirmId(inq.id)}
                      className="p-1.5 text-neutral-300 hover:text-black transition-colors rounded cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scope & Budget Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-200">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-600" />
                    Service: {inq.service}
                  </span>
                  <span className="flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-200">
                    <DollarSign className="w-3.5 h-3.5 text-neutral-600" />
                    Budget: {inq.budget}
                  </span>
                </div>

                {/* Client Message */}
                <div className="bg-neutral-50/80 border border-neutral-200 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                    Client Brief:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans whitespace-pre-wrap">
                    &quot;{inq.message}&quot;
                  </p>
                </div>

                {/* Admin Internal Notes Area */}
                <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    {isEditingThisNote ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={notesBuffer}
                          onChange={(e) => setNotesBuffer(e.target.value)}
                          placeholder="Type internal notes (e.g. called client, proposal sent)..."
                          className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        />
                        <button
                          onClick={() => handleSaveNotes(inq.id)}
                          className="px-3 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1.5 text-xs text-neutral-500 hover:text-black cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleStartEditingNotes(inq)}
                        className="text-xs text-neutral-500 hover:text-black cursor-pointer group flex items-center gap-2"
                      >
                        <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-400">
                          Admin Notes:
                        </span>
                        <span className="italic text-neutral-700">
                          {inq.adminNotes || "Click here to add private notes on this deal..."}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Button: Reply via Email */}
                  <a
                    href={`mailto:${inq.email}?subject=Re: Inquiry - ${inq.service}&body=Hi ${inq.name},%0D%0A%0D%0AThank you for reaching out regarding ${inq.service}.%0D%0A%0D%0ABest regards,%0D%0ANarinder Kumar`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-2xs self-end sm:self-center"
                  >
                    <Send className="w-3 h-3" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200">
            <h3 className="font-heading font-black text-lg text-black">
              Remove Inquiry
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Are you sure you want to remove this client inquiry from your pipeline?
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
