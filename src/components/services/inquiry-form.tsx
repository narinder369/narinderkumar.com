"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const BUDGET_RANGES = [
  "Under ₹10K",
  "₹10K-25K",
  "₹25K-50K",
  "₹50K-1L",
  "Above ₹1L",
] as const;

interface InquiryFormProps {
  preselectedService?: string;
  className?: string;
}

export function InquiryForm({ preselectedService, className }: InquiryFormProps) {
  // Find initial service if matching
  const defaultService =
    services.find(
      (s) =>
        s.title.toLowerCase() === preselectedService?.toLowerCase() ||
        s.slug.toLowerCase() === preselectedService?.toLowerCase() ||
        s.shortTitle.toLowerCase() === preselectedService?.toLowerCase()
    )?.title || services[0]?.title || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: defaultService,
    budgetRange: "₹25K-50K",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service.";
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Please select a budget range.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project or requirements.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide a bit more detail (at least 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate submission & log as instructed
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Project inquiry form submitted:", formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: defaultService,
      budgetRange: "₹25K-50K",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className={cn("rounded-2xl border border-border bg-white p-8 sm:p-12 text-center shadow-sm", className)}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-deep-brown">
          Inquiry Received!
        </h3>
        <p className="mt-3 text-base text-muted max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <span className="font-semibold text-charcoal">{formData.name}</span>. I have received your project details and will review them shortly.
        </p>
        <p className="mt-2 text-sm text-muted">
          Expect a personalized response via <span className="text-charcoal font-medium">{formData.email}</span> within 24 hours.
        </p>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="md" onClick={handleReset}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-sm",
        className
      )}
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-cream text-deep-brown text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink" />
          <span>Direct Client Inquiry</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-deep-brown">
          Let’s Discuss Your Project
        </h3>
        <p className="mt-2 text-sm sm:text-base text-muted">
          Fill in the details below and I’ll get back to you with timelines, recommendations, and pricing.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="inquiry-name"
            label="Your Name *"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            error={errors.name}
            disabled={loading}
            required
          />

          <Input
            id="inquiry-email"
            type="email"
            label="Email Address *"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            error={errors.email}
            disabled={loading}
            required
          />
        </div>

        {/* Phone & Company Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            id="inquiry-phone"
            type="tel"
            label="Phone Number (Optional)"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            disabled={loading}
          />

          <Input
            id="inquiry-company"
            label="Company / Brand (Optional)"
            placeholder="e.g. Acme Studio"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            disabled={loading}
          />
        </div>

        {/* Service Type & Budget Range Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="inquiry-service-type"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Service Needed *
            </label>
            <select
              id="inquiry-service-type"
              value={formData.serviceType}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, serviceType: e.target.value }));
                if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: "" }));
              }}
              disabled={loading}
              className={cn(
                "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal",
                "transition-colors duration-150 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-pink/20 focus:border-pink",
                "disabled:opacity-50 disabled:bg-warm-cream disabled:cursor-not-allowed",
                errors.serviceType && "border-error focus:ring-error/20 focus:border-error"
              )}
            >
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="mt-1.5 text-xs text-error">{errors.serviceType}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="inquiry-budget-range"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Budget Range *
            </label>
            <select
              id="inquiry-budget-range"
              value={formData.budgetRange}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, budgetRange: e.target.value }));
                if (errors.budgetRange) setErrors((prev) => ({ ...prev, budgetRange: "" }));
              }}
              disabled={loading}
              className={cn(
                "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal",
                "transition-colors duration-150 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-pink/20 focus:border-pink",
                "disabled:opacity-50 disabled:bg-warm-cream disabled:cursor-not-allowed",
                errors.budgetRange && "border-error focus:ring-error/20 focus:border-error"
              )}
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.budgetRange && (
              <p className="mt-1.5 text-xs text-error">{errors.budgetRange}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <Textarea
          id="inquiry-message"
          label="Project Details & Objectives *"
          placeholder="Tell me about what you are looking to achieve, reference links, specific requirements, or ideal launch timeline..."
          rows={4}
          value={formData.message}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, message: e.target.value }));
            if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
          }}
          error={errors.message}
          hint="Provide as much context as possible to receive an accurate estimate."
          disabled={loading}
          required
        />

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full sm:w-auto min-w-[200px]"
          >
            <span>Submit Inquiry</span>
            <Send className="w-4 h-4 ml-1" />
          </Button>

          <p className="text-xs text-muted text-center sm:text-right">
            ⚡ Typical response time: within 24 hours
          </p>
        </div>
      </div>
    </form>
  );
}
