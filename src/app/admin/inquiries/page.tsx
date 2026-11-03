import { Badge } from "@/components/ui/badge";

const inquiries = [
  { id: "1", name: "Apex Health Clinic", email: "info@apexhealth.in", service: "AI UGC Video Campaign", budget: "₹50K-1L", message: "We want 10 AI patient testimonial and informative short videos for Instagram Reels.", date: "Oct 30, 2026", status: "New" },
  { id: "2", name: "Zenith SaaS", email: "founders@zenith.io", service: "Next.js Web Redesign", budget: "₹75K+", message: "Migrating our marketing site to Next.js with high Core Web Vitals score and Supabase backend.", date: "Oct 29, 2026", status: "In Discussion" },
  { id: "3", name: "Urban Flavors Restaurant", email: "urbanflavors@gmail.com", service: "Short-Form Video Production", budget: "₹25K-50K", message: "Need weekly Reels production for our dining locations.", date: "Oct 28, 2026", status: "Replied" },
];

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-charcoal">
          Client Inquiries
        </h1>
        <p className="text-sm text-muted">
          Track project briefs submitted through service landing pages and contact forms.
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-heading font-bold text-lg text-charcoal">{inq.name}</span>
                <span className="text-xs text-muted ml-3">{inq.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={inq.status === "New" ? "error" : "info"}>
                  {inq.status}
                </Badge>
                <span className="text-xs text-muted">{inq.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="text-deep-brown bg-warm-cream px-2 py-0.5 rounded">
                Service: {inq.service}
              </span>
              <span className="text-charcoal bg-zinc-100 px-2 py-0.5 rounded">
                Budget: {inq.budget}
              </span>
            </div>

            <p className="text-sm text-charcoal/80 bg-warm-cream/20 border border-border rounded-lg p-3 leading-relaxed">
              &quot;{inq.message}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
