import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, Download, ShieldCheck, Sparkles, FileText, Package, ArrowRight, ShoppingCart } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { products, getProductBySlug } from "@/lib/products-data";
import { ProductCard } from "@/components/products/product-card";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | Digital Products`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb Header */}
        <section className="py-6 bg-neutral-50 border-b border-neutral-200">
          <Container>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400">
              <Link href="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-black">Products</Link>
              <span>/</span>
              <span className="text-black font-bold truncate max-w-[200px] sm:max-w-none">
                {product.title}
              </span>
            </div>
          </Container>
        </section>

        {/* Product Purchase Hero */}
        <Section background="white" className="border-b border-neutral-200">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Product Cover Visual */}
              <div className="lg:col-span-5">
                <div className="w-full aspect-[4/3] rounded-3xl bg-neutral-900 text-white p-8 flex flex-col justify-between border border-neutral-800 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white text-black">
                      Instant Access
                    </span>
                  </div>

                  <div className="z-10 text-center my-auto">
                    <Sparkles className="w-10 h-10 text-white mx-auto mb-3" />
                    <h2 className="font-heading font-black uppercase text-2xl text-white">
                      {product.title}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-2">
                      {product.fileFormat} • {product.fileSize}
                    </p>
                  </div>

                  <div className="z-10 flex items-center justify-between text-xs text-neutral-400 font-medium pt-4 border-t border-neutral-800">
                    <span>Verified Production File</span>
                    <span>Direct Encrypted Delivery</span>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-3 text-xs text-neutral-700">
                  <div className="flex items-center gap-2 font-semibold">
                    <Download className="w-4 h-4 text-black" />
                    <span>Instant download link issued immediately upon payment</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Server-side verified signature & 256-bit encryption</span>
                  </div>
                </div>
              </div>

              {/* Product Info & Actions Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 bg-neutral-100 text-black text-[11px] font-bold uppercase tracking-widest mb-4">
                  Verified Digital Asset
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black leading-tight">
                  {product.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                  {product.shortDescription}
                </p>

                {/* Price Display */}
                <div className="mt-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-baseline gap-4">
                  <span className="text-3xl sm:text-4xl font-black text-black">
                    {formatPrice(product.discountPrice || product.price)}
                  </span>
                  {product.discountPrice && (
                    <>
                      <span className="text-base text-neutral-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs font-bold text-black border border-neutral-300 bg-white px-2.5 py-0.5 rounded-full">
                        Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href={`/checkout?product=${product.slug}`} className="flex-1">
                    <Button variant="primary" size="lg" className="w-full text-sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now & Download
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
                      Add to Cart
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="mt-10 pt-8 border-t border-neutral-200">
                  <h3 className="font-heading font-black uppercase text-xs tracking-widest text-neutral-400 mb-4">
                    Key Outcomes:
                  </h3>
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-800">
                        <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Contents & Specs */}
        <Section background="white" className="border-b border-neutral-200">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Contents */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-black">
                    What&apos;s Inside The Package
                  </h3>
                </div>
                <ul className="space-y-3">
                  {product.contents.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-800 border-b border-neutral-200/60 pb-3 last:border-none last:pb-0">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-black">
                    Features & Specifications
                  </h3>
                </div>
                <ul className="space-y-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-800 border-b border-neutral-200/60 pb-3 last:border-none last:pb-0">
                      <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Section background="white">
            <Container>
              <SectionHeader
                title="EXPLORE RELATED RESOURCES"
                description="Other digital products and templates designed to complement your workflow."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <Footer />
    </div>
  );
}
