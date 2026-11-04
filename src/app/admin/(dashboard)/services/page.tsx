"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  ExternalLink,
  Edit,
  CheckCircle2,
  X,
  Plus,
  Trash2,
  DollarSign,
  Layers,
} from "lucide-react";
import { services as defaultServices, type ServiceDefinition } from "@/config/services";
import { showAdminToast } from "@/components/admin/admin-toast";

interface AdminServiceItem extends ServiceDefinition {
  active: boolean;
  startingPrice: string;
}

const STORAGE_KEY_SERVICES = "nk_admin_services_v1";

export default function AdminServicesPage() {
  const [servicesList, setServicesList] = useState<AdminServiceItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [editingService, setEditingService] = useState<AdminServiceItem | null>(null);

  // Form Fields
  const [formPrice, setFormPrice] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDeliverables, setFormDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (stored) {
        setServicesList(JSON.parse(stored));
      } else {
        const seeded: AdminServiceItem[] = defaultServices.map((s) => ({
          ...s,
          active: true,
          startingPrice: s.startingPrice || "Custom Quote",
        }));
        setServicesList(seeded);
      }
    } catch {
      setServicesList(
        defaultServices.map((s) => ({
          ...s,
          active: true,
          startingPrice: s.startingPrice || "Custom Quote",
        }))
      );
    }
    setMounted(true);
  }, []);

  const saveToStorage = (updated: AdminServiceItem[]) => {
    setServicesList(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleActive = (slug: string) => {
    const updated = servicesList.map((s) =>
      s.slug === slug ? { ...s, active: !s.active } : s
    );
    saveToStorage(updated);
    showAdminToast("Service visibility updated.");
  };

  const openEditModal = (service: AdminServiceItem) => {
    setEditingService(service);
    setFormPrice(service.startingPrice);
    setFormDesc(service.shortDescription);
    setFormDeliverables([...service.deliverables]);
    setDeliverableInput("");
  };

  const handleAddDeliverable = () => {
    if (deliverableInput.trim()) {
      setFormDeliverables([...formDeliverables, deliverableInput.trim()]);
      setDeliverableInput("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormDeliverables(formDeliverables.filter((_, i) => i !== index));
  };

  const handleSaveService = () => {
    if (!editingService) return;
    const updated = servicesList.map((s) => {
      if (s.slug === editingService.slug) {
        return {
          ...s,
          startingPrice: formPrice.trim() || "Custom Quote",
          shortDescription: formDesc.trim(),
          deliverables: formDeliverables,
        };
      }
      return s;
    });

    saveToStorage(updated);
    setEditingService(null);
    showAdminToast(`Service "${editingService.title}" updated successfully.`);
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Loading Service Offerings...
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
              Services Portfolio Manager
            </h1>
            <span className="text-[11px] font-mono bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
              {servicesList.length} Offerings
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Configure client service deliverables, starting prices, and landing page visibility.
          </p>
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((s) => (
          <div
            key={s.slug}
            className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all ${
              s.active ? "border-neutral-200" : "border-neutral-300 opacity-60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    s.active
                      ? "bg-black text-white border-black"
                      : "bg-neutral-100 text-neutral-600 border-neutral-300"
                  }`}
                >
                  {s.active ? "Active" : "Hidden"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleActive(s.slug)}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-neutral-200 hover:border-black text-neutral-700 hover:text-black transition-colors cursor-pointer"
                  >
                    {s.active ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1 rounded bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-heading font-black text-base text-black mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-4">
                {s.shortDescription}
              </p>

              <div className="text-xs font-mono font-bold text-black bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 mb-4">
                Starting: {s.startingPrice}
              </div>

              {/* Deliverables snippet */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Key Deliverables:
                </span>
                {s.deliverables.slice(0, 3).map((d, i) => (
                  <div key={i} className="text-[11px] text-neutral-700 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-black shrink-0" />
                    <span className="truncate">{d}</span>
                  </div>
                ))}
                {s.deliverables.length > 3 && (
                  <span className="text-[10px] font-semibold text-neutral-400 block pt-0.5">
                    +{s.deliverables.length - 3} more deliverables
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">
                /services/{s.slug}
              </span>
              <Link
                href={`/services/${s.slug}`}
                target="_blank"
                className="text-xs font-bold text-black flex items-center gap-1 hover:underline"
              >
                <span>Live Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 space-y-5 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <h3 className="font-heading font-black text-lg text-black">
                  Edit Service: {editingService.title}
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  /services/{editingService.slug}
                </span>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 text-neutral-400 hover:text-black rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 flex-1 pr-1 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Starting Price Text
                </label>
                <input
                  type="text"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="e.g. ₹25,000 / $350 or Custom Quote"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Deliverables ({formDeliverables.length})
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto mb-2 border border-neutral-100 p-2 rounded-xl bg-neutral-50">
                  {formDeliverables.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 p-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800"
                    >
                      <span className="truncate flex-1 font-medium">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(index)}
                        className="text-neutral-400 hover:text-black cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Add deliverable bullet..."
                    className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-1.5 bg-black text-white font-bold uppercase rounded-lg hover:bg-neutral-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 border border-neutral-200 rounded-xl font-bold uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveService}
                className="px-5 py-2 bg-black text-white font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
