import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/config/services";

export const metadata: Metadata = {
  title: "Professional Digital Services",
  description:
    "Explore tailored digital services by Narinder Kumar: AI UGC video creation, video production, digital marketing, WordPress development, Next.js web development, and UI/UX design.",
  openGraph: {
    title: "Professional Digital Services | Narinder Kumar",
    description:
      "Explore tailored digital services by Narinder Kumar: AI UGC video creation, video production, digital marketing, WordPress development, Next.js web development, and UI/UX design.",
    type: "website",
  },
};

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "10+ Years Experience",
    description: "Deep hands-on expertise across WordPress, modern frontend tech, and design.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Agile, milestone-driven execution without bureaucratic delays.",
  },
  {
    icon: Layers,
    title: "Conversion-Focused",
    description: "Every asset and website is crafted with real business metrics in mind.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Section background="cream" className="pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-border">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-2xs text-xs font-semibold text-deep-brown mb-6">
                <Sparkles className="w-3.5 h-3.5 text-pink" />
                <span>End-to-End Digital Capabilities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-deep-brown tracking-tight leading-[1.15]">
                Professional Digital Services
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed font-normal">
                I help businesses and creators grow through creative content, AI-powered solutions,
                high-performance digital platforms, and practical digital products.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="shadow-sm">
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <a href="#services-list">
                  <Button variant="outline" size="lg">
                    Browse Services
                  </Button>
                </a>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border/70 max-w-5xl mx-auto">
              {trustFeatures.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-warm-cream border border-border flex items-center justify-center text-deep-brown flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-heading text-charcoal">{item.title}</h4>
                      <p className="text-xs text-muted mt-1 leading-normal">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Services Grid Section */}
        <Section id="services-list" background="white" className="py-20 lg:py-28">
          <Container>
            <SectionHeader
              title="Tailored Solutions For Modern Brands"
              description="From engaging AI video production to scalable full-stack web applications, choose the specialized expertise your project needs."
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;

                return (
                  <Card
                    key={service.slug}
                    variant="interactive"
                    padding="none"
                    className="group flex flex-col justify-between overflow-hidden border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-pink/40"
                  >
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      {/* Card Top: Icon & Starting Price */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-warm-cream text-deep-brown border border-border/60 flex items-center justify-center transition-colors duration-200 group-hover:bg-deep-brown group-hover:text-white">
                          <IconComponent className="w-7 h-7 transition-transform duration-200 group-hover:scale-105" />
                        </div>
                        {service.startingPrice && (
                          <Badge variant="info" className="font-semibold text-xs py-1 px-3">
                            From {service.startingPrice}
                          </Badge>
                        )}
                      </div>

                      {/* Card Title & Description */}
                      <CardTitle className="text-xl sm:text-2xl font-bold font-heading text-deep-brown group-hover:text-pink transition-colors mb-3">
                        {service.title}
                      </CardTitle>

                      <CardDescription className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                        {service.shortDescription}
                      </CardDescription>

                      {/* Deliverables snippet */}
                      <div className="mt-auto pt-4 border-t border-border/60 space-y-2 mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                          Highlights & Deliverables
                        </p>
                        <ul className="space-y-1.5">
                          {service.deliverables.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-charcoal">
                              <CheckCircle2 className="w-3.5 h-3.5 text-pink flex-shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <CardContent className="p-6 pt-0">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex w-full items-center justify-between rounded-lg bg-warm-cream/60 px-4 py-3 text-sm font-semibold text-deep-brown transition-all duration-150 group-hover:bg-pink group-hover:text-white"
                      >
                        <span>Explore Service Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Value Proposition / Approach */}
        <Section background="cream" className="py-20 lg:py-24 border-y border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-xs font-semibold text-deep-brown mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-pink" />
                  <span>The Partnership Difference</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-deep-brown tracking-tight leading-tight">
                  High-Touch Collaboration. No Red Tape. Real Results.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
                  Working with me means direct access to senior execution. You get clear timelines,
                  transparent milestones, and tailored solutions built around your exact commercial goals.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-pink/20 text-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-heading text-charcoal">Direct Senior Execution</h4>
                      <p className="text-xs sm:text-sm text-muted mt-0.5">
                        No junior hand-offs or account managers. You collaborate directly with Narinder from strategy to final launch.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-pink/20 text-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-heading text-charcoal">Tested Architectural Foundation</h4>
                      <p className="text-xs sm:text-sm text-muted mt-0.5">
                        Clean code, modular UI systems, and optimized workflows designed for speed, SEO, and frictionless updates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-pink/20 text-pink flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-heading text-charcoal">Transparent Deliverables & Pricing</h4>
                      <p className="text-xs sm:text-sm text-muted mt-0.5">
                        Clear deliverables and realistic timelines with no surprise fees or ambiguity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Info Card */}
              <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-deep-brown mb-4">
                  Need a Customized Engagement?
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                  Many projects require a blended approach — such as a custom Next.js web application
                  with accompanying short-form video creatives and UI/UX design systems.
                </p>
                <div className="p-4 rounded-xl bg-warm-cream/50 border border-border mb-6">
                  <p className="text-xs text-charcoal font-medium">
                    &ldquo;My goal is to give your brand a distinct competitive advantage through thoughtful digital experiences.&rdquo;
                  </p>
                  <p className="text-xs text-deep-brown font-bold mt-2">— Narinder Kumar</p>
                </div>
                <Link href="/contact" className="block">
                  <Button variant="secondary" size="md" className="w-full">
                    <span>Request a Custom Quote</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>

        {/* Bottom CTA Section */}
        <Section background="dark" className="py-20 lg:py-24 text-center">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Ready to Start Your Project?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                Let&apos;s build something high-impact. Share your vision and get a personalized project plan with clear timelines and deliverables.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="shadow-md">
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white hover:text-charcoal"
                  >
                    Explore Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
