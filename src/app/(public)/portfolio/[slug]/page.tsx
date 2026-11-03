import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  User,
  Wrench,
  CheckCircle2,
  Share2,
  Play,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioProjects, PortfolioProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Case Study | Narinder Kumar`,
      description: project.shortDescription,
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = portfolioProjects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = portfolioProjects[projectIndex];
  const prevProject =
    projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolioProjects.length - 1
      ? portfolioProjects[projectIndex + 1]
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb & Navigation Bar */}
        <div className="border-b border-border/60 bg-warm-cream/40">
          <Container>
            <div className="py-4 flex items-center justify-between text-sm">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-medium text-muted hover:text-deep-brown transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all projects
              </Link>

              <Badge
                variant={
                  project.category === "AI Videos"
                    ? "info"
                    : project.category === "UI/UX"
                    ? "success"
                    : "default"
                }
              >
                {project.category}
              </Badge>
            </div>
          </Container>
        </div>

        {/* Project Header */}
        <Section background="white" className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <Container size="narrow">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-pink" />
                  {project.date}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-blue" />
                  {project.duration}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4 text-deep-brown" />
                  {project.role}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed font-normal">
                {project.shortDescription}
              </p>
            </div>
          </Container>
        </Section>

        {/* Large Media / Video Placeholder Area */}
        <div className="bg-white">
          <Container>
            <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-lg group">
              <div
                className={cn(
                  "relative w-full aspect-video min-h-[320px] sm:min-h-[460px] lg:min-h-[540px] bg-gradient-to-br flex flex-col items-center justify-center p-8 text-white",
                  project.gradient
                )}
              >
                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />

                {/* Simulated Video Player / Interactive Asset Preview */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide uppercase text-white/90">
                    Project Showcase & Media Preview
                  </span>
                  <p className="text-xs text-white/70 max-w-sm">
                    Interactive media asset and production showcase for {project.title}. High-resolution export preview.
                  </p>
                </div>

                {/* Bottom simulated media player bar */}
                <div className="absolute bottom-4 left-6 right-6 px-4 py-2.5 rounded-xl bg-charcoal/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
                    <span>Creative Asset Showcase</span>
                  </div>
                  <span className="font-mono text-white/60">4K Master • 60fps</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Detailed Breakdown */}
        <Section background="white" className="py-16 sm:py-20">
          <Container size="narrow">
            <div className="space-y-16">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-deep-brown mb-4">
                  Project Overview
                </h2>
                <div className="prose prose-lg text-charcoal/80 space-y-4">
                  <p className="text-base sm:text-lg leading-relaxed">
                    {project.fullDescription}
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    {project.overview}
                  </p>
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="rounded-xl border border-border p-6 bg-warm-cream/30 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-pink/10 text-pink flex items-center justify-center font-bold">
                    01
                  </div>
                  <h3 className="text-xl font-bold font-heading text-deep-brown">
                    The Challenge
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="rounded-xl border border-border p-6 bg-warm-cream/30 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-blue/20 text-deep-brown flex items-center justify-center font-bold">
                    02
                  </div>
                  <h3 className="text-xl font-bold font-heading text-deep-brown">
                    The Solution
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables / Key Outputs */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-deep-brown mb-6">
                  Key Deliverables & Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-white"
                    >
                      <CheckCircle2 className="w-5 h-5 text-pink shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-medium text-charcoal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="p-8 rounded-2xl border border-border bg-warm-cream/40 space-y-4">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-deep-brown" />
                  <h2 className="text-lg font-bold font-heading text-deep-brown">
                    Tools & Technologies Deployed
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-border text-sm font-medium text-charcoal shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Project Navigation (Next / Previous) */}
        <div className="border-t border-b border-border/80 bg-warm-cream/30">
          <Container>
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  href={`/portfolio/${prevProject.slug}`}
                  className="group flex flex-col p-5 rounded-xl border border-border bg-white hover:border-pink/40 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold uppercase text-muted tracking-wider inline-flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-1" />
                    Previous Project
                  </span>
                  <span className="text-base font-bold font-heading text-charcoal group-hover:text-deep-brown">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div className="p-5 rounded-xl border border-dashed border-border/60 bg-white/40 text-xs text-muted">
                  First project in showcase
                </div>
              )}

              {nextProject ? (
                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="group flex flex-col items-start md:items-end text-left md:text-right p-5 rounded-xl border border-border bg-white hover:border-pink/40 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold uppercase text-muted tracking-wider inline-flex items-center gap-1 mb-1">
                    Next Project
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                  <span className="text-base font-bold font-heading text-charcoal group-hover:text-deep-brown">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div className="p-5 rounded-xl border border-dashed border-border/60 bg-white/40 text-xs text-muted text-right">
                  Latest project in showcase
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Call to Action Banner */}
        <Section background="white">
          <Container size="narrow">
            <div className="rounded-2xl bg-charcoal text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-pink/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-blue">
                  Inspired by this work?
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
                  Like what you see? Let’s work together
                </h2>
                <p className="text-white/70 max-w-xl mx-auto text-base sm:text-lg">
                  Let’s collaborate to produce high-impact video creative, robust CMS platforms, or intuitive UI/UX for your venture.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Discuss Your Project
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      View All Projects
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
