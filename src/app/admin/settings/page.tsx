"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Shield,
  CreditCard,
  Globe,
  Share2,
  Mail,
  Phone,
} from "lucide-react";
import { adminStore, type AdminSettings } from "@/lib/admin-store";
import { showAdminToast } from "@/components/admin/admin-toast";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSettings(adminStore.getSettings());
    setMounted(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setTimeout(() => {
      adminStore.saveSettings(settings);
      setSaving(false);
      showAdminToast("Platform settings saved successfully!");
    }, 400);
  };

  if (!mounted || !settings) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Loading Platform Parameters...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black tracking-tight">
              Platform & Brand Settings
            </h1>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Configure personal brand identity, payment credentials, SEO parameters, and analytics.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {/* Brand Identity Section */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <Globe className="w-4 h-4 text-black" />
          <h2 className="font-heading font-black text-base uppercase tracking-wider text-black">
            Brand Identity & Communications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Brand Display Name
            </label>
            <input
              type="text"
              value={settings.brandName}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
              className="w-full px-3.5 py-2.5 font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Contact / Inquiry Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 py-2.5 font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Brand Motto / Hero Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Brand Description (Default SEO Meta Description)
            </label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full px-3.5 py-2.5 leading-relaxed font-medium border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Payment Gateway Configuration */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <CreditCard className="w-4 h-4 text-black" />
          <h2 className="font-heading font-black text-base uppercase tracking-wider text-black">
            Payment Gateway API Keys
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Razorpay Key ID (India / UPI / Cards)
            </label>
            <input
              type="text"
              placeholder="rzp_live_xxxxxxxxxxxx"
              value={settings.razorpayKeyId}
              onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
              className="w-full px-3.5 py-2.5 font-mono border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-neutral-50/50"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">
              Used in client-side checkout to initiate Razorpay UPI / Cards payment gateway modal.
            </span>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Stripe Publishable Key (International)
            </label>
            <input
              type="text"
              placeholder="pk_live_xxxxxxxxxxxx"
              value={settings.stripePublishableKey}
              onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
              className="w-full px-3.5 py-2.5 font-mono border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-neutral-50/50"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">
              Used for international customer USD checkout sessions via Stripe.
            </span>
          </div>
        </div>
      </div>

      {/* Analytics & Social Profiles */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <Share2 className="w-4 h-4 text-black" />
          <h2 className="font-heading font-black text-base uppercase tracking-wider text-black">
            Analytics & Social Presence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Google Analytics Measurement ID
            </label>
            <input
              type="text"
              value={settings.gaMeasurementId}
              onChange={(e) => setSettings({ ...settings, gaMeasurementId: e.target.value })}
              className="w-full px-3.5 py-2.5 font-mono font-bold border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-neutral-50/50"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Active in root layout with ID: {settings.gaMeasurementId}
            </span>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={settings.linkedin}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              X (Twitter) Profile URL
            </label>
            <input
              type="url"
              value={settings.twitter}
              onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
        </button>
      </div>
    </form>
  );
}
