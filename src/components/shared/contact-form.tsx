"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Services Inquiry",
    budget: "₹25K-50K",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  if (status === "success") {
    return (
      <div className="p-8 text-center bg-black text-white rounded-2xl">
        <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-4" />
        <h3 className="text-xl font-black uppercase tracking-tight text-white">
          Message Received
        </h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-md mx-auto">
          Thank you for reaching out, {formData.name}. I personally review every inquiry and will respond to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
            Your Name *
          </label>
          <Input
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-neutral-300 focus:border-black focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-neutral-300 focus:border-black focus:ring-black"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
            Inquiry Type
          </label>
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="AI UGC Video Project">AI UGC Video Project</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="Next.js Web Application">Next.js Web Application</option>
            <option value="Digital Products / Support">Digital Products / Support</option>
            <option value="General Collaboration">General Collaboration</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
            Estimated Budget
          </label>
          <select
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="Under ₹15,000">Under ₹15,000</option>
            <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
            <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
            <option value="₹75,000+">₹75,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
          Project Brief or Message *
        </label>
        <Textarea
          placeholder="Tell me about your goals, timeline, and current situation..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className="border-neutral-300 focus:border-black focus:ring-black"
          required
        />
      </div>

      {status === "error" && (
        <div className="p-3 rounded-lg bg-neutral-100 text-black border border-neutral-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="w-full text-xs font-bold uppercase tracking-wider"
      >
        Send Inquiry
        <Send className="w-3.5 h-3.5 ml-2" />
      </Button>

      <p className="text-[11px] text-center text-neutral-400 uppercase tracking-wider">
        Your information is private and never shared with third parties.
      </p>
    </form>
  );
}
