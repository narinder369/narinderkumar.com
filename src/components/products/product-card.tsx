import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card variant="interactive" padding="none" className="flex flex-col h-full overflow-hidden group border-neutral-200 hover:border-black rounded-2xl">
      {/* Cover Visual */}
      <div className="h-48 w-full bg-neutral-900 text-white p-5 flex flex-col justify-between border-b border-neutral-800 relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 text-[10px]">
            {product.category}
          </Badge>
          {product.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-black">
              Featured
            </span>
          )}
        </div>
        <div className="z-10 flex items-center gap-2 text-white font-heading font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>{product.fileFormat}</span>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading font-black uppercase text-base text-black group-hover:underline transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-lg text-black">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <Link href={`/products/${product.slug}`}>
            <Button variant="primary" size="sm" className="px-4 py-2">
              <ShoppingBag className="w-3.5 h-3.5 mr-1" />
              Get Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
