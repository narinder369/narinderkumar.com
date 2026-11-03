import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { portfolioProjects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio — Creative Works & Case Studies",
  description:
    "Explore AI UGC video campaigns, high-performance WordPress platforms, UI/UX design systems, and cinematic video productions by Narinder Kumar.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Section background="cream" className="border-b border-border/60 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-brown/5 border border-deep-brown/10 text-deep-brown text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-pink" />
                Featured Work & Case Studies
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                Creative Portfolio<span className="text-pink">.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                A curated selection of AI-driven video productions, custom WordPress architectures, and intuitive digital interfaces engineered for real-world impact.
              </p>
            </div>
          </Container>
        </Section>

        {/* Portfolio Showcase Grid Section */}
        <Section background="white">
          <Container>
            <PortfolioGrid initialProjects={portfolioProjects} />
          </Container>
        </Section>

        {/* Bottom Collaboration Callout */}
        <Section background="cream" className="border-t border-border/60">
          <Container>
            <div className="rounded-2xl bg-charcoal text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-pink/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-2xl mx-auto text-center space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-blue">
                  Have a vision in mind?
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
                  Let’s build your next digital experience
                </h2>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  Whether you need high-converting AI video assets, an editorial WordPress platform, or a refined UI/UX design system, let’s bring it to life.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      More About Narinder
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
