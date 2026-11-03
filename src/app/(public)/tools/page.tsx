import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toolsList } from "@/components/home/tools-section";
import { Wrench, Sparkles, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Tools & Utilities | Narinder Kumar",
  description: "Free and premium web utilities created by Narinder Kumar for creators, marketers, and developers.",
};

export default function ToolsPage() {
  const freeTools = toolsList.filter((t) => t.tier === "Free");
  const premiumTools = toolsList.filter((t) => t.tier === "Premium");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Tools Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/15 text-pink text-xs font-semibold uppercase tracking-wider mb-4">
                <Wrench className="w-3.5 h-3.5" />
                Browser Software & Utilities
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                Small Tools. Big Productivity.
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Focused web applications, AI prompt generators, and marketing calculators designed to speed up your digital workflow. No installations required.
              </p>
            </div>
          </Container>
        </section>

        {/* Free Tools Section */}
        <Section background="white">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-deep-brown">
                  Free Creator Utilities
                </h2>
                <p className="text-sm text-muted mt-1">
                  100% free forever. No sign-up required to test.
                </p>
              </div>
              <Badge variant="success">Free Forever</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {freeTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.slug} variant="interactive" padding="none" className="bg-white flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-deep-brown/5 border border-deep-brown/10 flex items-center justify-center text-pink mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-charcoal mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Link href={`/tools/${tool.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Open Free Tool
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Premium Tools Section */}
        <Section background="cream">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-deep-brown">
                  Premium & Specialized Utilities
                </h2>
                <p className="text-sm text-muted mt-1">
                  Advanced analytical engines and workflow automation suites.
                </p>
              </div>
              <Badge variant="info">Pro & Beta</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {premiumTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.slug} variant="bordered" padding="none" className="bg-white flex flex-col justify-between">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-pink/15 flex items-center justify-center text-pink">
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="warning">{tool.status}</Badge>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-charcoal mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Link href={`/tools/${tool.slug}`}>
                        <Button variant="secondary" size="sm" className="w-full">
                          Test Beta Utility
                          <Zap className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
