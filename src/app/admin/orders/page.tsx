import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const sampleOrders = [
  { id: "NK-M481A", customer: "Vikram Mehta", email: "vikram@example.com", product: "AI Prompt Engineering Playbook", amount: 499, gateway: "Razorpay", status: "Paid", date: "Oct 30, 2026" },
  { id: "NK-L992B", customer: "Ananya Sharma", email: "ananya@agency.in", product: "Viral Short-Form Video Hooks & Scripts", amount: 799, gateway: "Razorpay", status: "Paid", date: "Oct 29, 2026" },
  { id: "NK-K331C", customer: "Rohan Patel", email: "rohan@startup.co", product: "Next.js Digital Business Pro Template", amount: 1999, gateway: "Razorpay", status: "Paid", date: "Oct 28, 2026" },
  { id: "NK-J102D", customer: "David Chen", email: "david@chen.io", product: "WordPress & JetEngine Dynamic Blueprint", amount: 699, gateway: "Stripe", status: "Paid", date: "Oct 26, 2026" },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-charcoal">
          Order Management
        </h1>
        <p className="text-sm text-muted">
          Audited record of digital purchases, payment gateway verifications, and download entitlements.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-warm-cream/50 text-xs uppercase font-bold text-charcoal/70 border-b border-border">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal">
              {sampleOrders.map((o) => (
                <tr key={o.id} className="hover:bg-warm-cream/20 transition-colors">
                  <td className="p-4 font-mono font-bold text-xs">{o.id}</td>
                  <td className="p-4">
                    <div className="font-semibold">{o.customer}</div>
                    <div className="text-xs text-muted">{o.email}</div>
                  </td>
                  <td className="p-4 text-xs max-w-xs truncate">{o.product}</td>
                  <td className="p-4 font-extrabold font-heading text-deep-brown">
                    {formatPrice(o.amount)}
                  </td>
                  <td className="p-4 text-xs font-semibold">{o.gateway}</td>
                  <td className="p-4">
                    <Badge variant="success">{o.status}</Badge>
                  </td>
                  <td className="p-4 text-xs text-muted">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
