import Link from "next/link";
import { Plus, Package, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products-data";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-charcoal">
            Product Catalog
          </h1>
          <p className="text-sm text-muted">
            Manage your digital products, pricing, and download entitlements.
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Product
        </Button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-warm-cream/50 text-xs uppercase font-bold text-charcoal/70 border-b border-border">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Format</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-charcoal">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-warm-cream/20 transition-colors">
                  <td className="p-4">
                    <div className="font-bold font-heading">{p.title}</div>
                    <div className="text-xs text-muted truncate max-w-xs">{p.slug}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{p.category}</Badge>
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold font-heading text-deep-brown">
                      {formatPrice(p.discountPrice || p.price)}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-muted">{p.fileFormat}</td>
                  <td className="p-4">
                    <Badge variant="success">Published</Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/products/${p.slug}`} target="_blank" className="inline-block p-1 text-muted hover:text-charcoal">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button className="p-1 text-muted hover:text-pink">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
