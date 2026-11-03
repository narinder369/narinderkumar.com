import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { products } from "@/lib/products-data";
import { ProductCard } from "@/components/products/product-card";
import { Sparkles, ShieldCheck, Download, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Products Store | Narinder Kumar",
  description:
    "Explore high-value digital resources, practical guides, AI prompt packs, and production-ready web templates created by Narinder Kumar.",
};

const categories = [
  { name: "All Products", href: "/products", active: true },
  { name: "eBooks", href: "/products/ebooks", active: false },
  { name: "Templates", href: "/products/templates", active: false },
  { name: "AI Prompts", href: "/products/prompts", active: false },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Products Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/15 text-pink text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Digital Store
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                Tools & Resources to Supercharge Your Output
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Battle-tested templates, eBooks, and AI prompt engineering blueprints. Built from 10+ years of hands-on experience, engineered for immediate ROI.
              </p>

              {/* Guarantees bar */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal/70 font-medium">
                <span className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-pink" />
                  Instant Secure Download
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  Lifetime Access & Updates
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-sky-blue" />
                  Commercial Use Permitted
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Category Filters & Products Grid */}
        <Section background="white">
          <Container>
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    cat.active
                      ? "bg-deep-brown text-white shadow-sm"
                      : "bg-warm-cream text-charcoal hover:bg-border"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
