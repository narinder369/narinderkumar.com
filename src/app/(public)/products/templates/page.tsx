import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getProductsByCategory } from "@/lib/products-data";
import { ProductCard } from "@/components/products/product-card";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Website & Code Templates | Narinder Kumar",
  description: "Production-grade Next.js, WordPress, and design templates to accelerate your digital projects.",
};

export default function TemplatesPage() {
  const templates = getProductsByCategory("Templates");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-warm-cream/60 to-white border-b border-border">
          <Container>
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-muted hover:text-deep-brown mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-deep-brown">
              Production-Grade Templates
            </h1>
            <p className="mt-3 text-base text-muted max-w-2xl">
              Cleanly architected web starters, UI components, and dynamic setups ready for client or personal deployment.
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((product) => (
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
