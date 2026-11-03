import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { ServicesSection } from "@/components/home/services-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { ProductsSection } from "@/components/home/products-section";
import { ToolsSection } from "@/components/home/tools-section";
import { BlogSection } from "@/components/home/blog-section";
import { AboutSection } from "@/components/home/about-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Introduction />
        <ServicesSection />
        <PortfolioSection />
        <ProductsSection />
        <ToolsSection />
        <BlogSection />
        <AboutSection />
        <NewsletterSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
