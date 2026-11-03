import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-charcoal">
          Platform Settings
        </h1>
        <p className="text-sm text-muted">
          Configure personal brand information, payment webhooks, and third-party integrations.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-heading font-bold text-lg text-deep-brown">
          Brand Identity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Brand Name</label>
            <Input defaultValue={siteConfig.name} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Contact Email</label>
            <Input defaultValue={siteConfig.email} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-charcoal mb-1">Tagline</label>
            <Input defaultValue={siteConfig.tagline} />
          </div>
        </div>

        <h3 className="font-heading font-bold text-lg text-deep-brown pt-4 border-t border-border">
          Payment Gateway Credentials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Razorpay Key ID</label>
            <Input placeholder="rzp_live_xxxxxxxx" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Stripe Publishable Key</label>
            <Input placeholder="pk_live_xxxxxxxx" />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <Button variant="primary" size="md">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
