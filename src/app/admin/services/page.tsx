import Link from "next/link";
import { services } from "@/config/services";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-charcoal">
          Services Portfolio
        </h1>
        <p className="text-sm text-muted">
          Configure service deliverables, workflows, and starting prices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.slug} className="bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-pink/10 text-pink">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-charcoal">{s.title}</h3>
                <p className="text-xs text-muted mt-2 line-clamp-2">{s.shortDescription}</p>
                <div className="mt-4 text-xs font-semibold text-deep-brown">
                  Starting Price: {s.startingPrice || "Custom Quote"}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs">
                <span className="text-muted">{s.deliverables.length} Deliverables</span>
                <Link href={`/services/${s.slug}`} target="_blank" className="font-bold text-pink flex items-center gap-1 hover:underline">
                  View Page <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
