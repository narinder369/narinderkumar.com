import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export const featuredProducts = [
  {
    id: "1",
    slug: "ai-prompt-engineering-mastery",
    title: "AI Prompt Engineering Playbook",
    category: "AI Prompts",
    shortDescription: "300+ tested prompts for ChatGPT, Claude & Midjourney to scale your marketing and content workflows.",
    price: 999,
    discountPrice: 499,
    tag: "Bestseller",
  },
  {
    id: "2",
    slug: "ultimate-reels-hooks-templates",
    title: "Viral Short-Form Video Hooks & Scripts",
    category: "Creator Resources",
    shortDescription: "150+ high-retention hook formulas and full short-form scripts for Instagram Reels and YouTube Shorts.",
    price: 1499,
    discountPrice: 799,
    tag: "Popular",
  },
  {
    id: "3",
    slug: "nextjs-portfolio-business-template",
    title: "Next.js Digital Business Pro Template",
    category: "Templates",
    shortDescription: "Production-ready personal brand & eCommerce Next.js starter kit with Supabase and Stripe integration.",
    price: 3999,
    discountPrice: 1999,
    tag: "Featured",
  },
  {
    id: "4",
    slug: "elementor-jetengine-dynamic-mastery",
    title: "WordPress & JetEngine Dynamic Blueprint",
    category: "eBooks",
    shortDescription: "A comprehensive practical guide to building advanced custom web apps and dynamic sites without writing PHP.",
    price: 1299,
    discountPrice: 699,
    tag: "Guide",
  },
];

export function ProductsSection() {
  return (
    <Section background="white" id="products" className="border-b border-neutral-200">
      <Container>
        <SectionHeader
          title="RESOURCES TO HELP YOU CREATE MORE"
          description="High-value digital products, battle-tested templates, and practical guides designed to save you hundreds of hours."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-neutral-200 rounded-2xl flex flex-col justify-between overflow-hidden hover:border-black transition-all duration-200 group"
            >
              {/* Minimalist Cover Visual */}
              <div className="h-44 w-full bg-neutral-900 text-white p-5 flex flex-col justify-between border-b border-neutral-800 relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                    {product.category}
                  </span>
                  {product.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white text-black">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="z-10 flex items-center gap-2 text-white font-heading font-extrabold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Digital Resource</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black uppercase text-base text-black group-hover:underline transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
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
                      Get
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/products">
            <Button variant="outline" size="md">
              Explore All Digital Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
