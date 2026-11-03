import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Video, Globe, Palette, Sparkles, CheckCircle2, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Narinder Kumar | Creator, Developer & Entrepreneur",
  description:
    "Learn about Narinder Kumar's background: 10+ years of WordPress & frontend development experience, AI video creation, and building digital business platforms.",
};

const principles = [
  {
    title: "Pragmatic Engineering Over Hype",
    desc: "Technology should serve business outcomes. Whether using Next.js or WordPress, I choose the stack that delivers the highest speed, stability, and ROI.",
  },
  {
    title: "Obsession with Pacing & Retention",
    desc: "In short-form video and web UX alike, every second matters. Clear visual hierarchy and pattern interrupts keep audiences engaged.",
  },
  {
    title: "Transparent & Accountable Partnerships",
    desc: "No fabricated metrics, no hidden markups. Clear scopes, regular status updates, and verifiable deliverables on every project.",
  },
  {
    title: "Continuous Creative Evolution",
    desc: "Actively mastering AI generative video, neural audio, and modern web frameworks to give clients an unfair competitive advantage.",
  },
];

const timeline = [
  {
    year: "2014 – 2018",
    title: "Foundations in WordPress & Web Development",
    desc: "Mastered core PHP, custom theme architectures, and dynamic client portal developments.",
  },
  {
    year: "2019 – 2022",
    title: "Dynamic Engines & Complex CMS Systems",
    desc: "Specialized in Elementor Pro and Crocoblock JetEngine to architect custom database models, directories, and portals.",
  },
  {
    year: "2023 – 2025",
    title: "Next.js, TypeScript & Headless Platforms",
    desc: "Expanded into high-performance React architectures, server-rendered applications, Supabase, and digital product eCommerce.",
  },
  {
    year: "2026 – Present",
    title: "AI Video Creation & All-in-One Digital Brand",
    desc: "Unifying creative UGC video production, software tools, and digital product distribution under the Narinder Kumar brand.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* About Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/15 text-pink text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Personal Brand Story
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                  Building Digital Experiences. Creating Ideas That Matter.
                </h1>
                <p className="mt-6 text-lg text-charcoal/80 leading-relaxed">
                  Hi, I&apos;m <strong>Narinder Kumar</strong>. I am a digital creator, frontend developer, WordPress specialist, and digital entrepreneur with more than 10 years of hands-on experience in web development and content creation.
                </p>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  I help businesses, brands, startups, and creators build their digital presence through high-converting AI UGC videos, custom web platforms, and practical digital products.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Work With Me
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button variant="outline" size="lg">
                      Explore My Work
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Portrait Placeholder Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm aspect-[4/5] rounded-2xl bg-gradient-to-tr from-deep-brown via-charcoal to-pink/40 p-2 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-warm-cream flex flex-col items-center justify-center p-8 text-center border border-border relative overflow-hidden">
                    <div className="w-28 h-28 rounded-full bg-deep-brown text-warm-cream flex items-center justify-center font-heading text-4xl font-extrabold shadow-lg mb-4 border-4 border-white">
                      NK
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-deep-brown">
                      Narinder Kumar
                    </h3>
                    <p className="text-sm font-semibold text-pink mt-1">
                      Digital Creator & Developer
                    </p>
                    <div className="mt-6 space-y-1 text-xs text-muted">
                      <div>📍 Based in India • Working Worldwide</div>
                      <div>⚡ 10+ Years Web Development</div>
                      <div>🚀 AI Video & Next.js Platforms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Core Principles */}
        <Section background="white">
          <Container>
            <SectionHeader
              title="How I Approach My Craft"
              description="The foundational principles that guide every client collaboration, digital product, and software utility."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {principles.map((p, i) => (
                <Card key={i} variant="bordered" className="p-8 bg-warm-cream/30">
                  <h3 className="font-heading font-bold text-xl text-deep-brown mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed">
                    {p.desc}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Journey Timeline */}
        <Section background="cream">
          <Container size="narrow">
            <SectionHeader
              title="The 10-Year Journey"
              description="A decade of continuous technical evolution and creative mastery."
            />
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex items-start gap-6 pl-2">
                  <div className="w-6 h-6 rounded-full bg-pink border-4 border-white shadow-sm shrink-0 z-10 mt-1" />
                  <div className="bg-white border border-border rounded-xl p-6 flex-1 shadow-sm">
                    <span className="text-xs font-bold text-pink uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-charcoal mt-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section background="white" className="border-t border-border">
          <Container size="narrow" className="text-center">
            <h2 className="text-3xl font-extrabold font-heading text-deep-brown mb-4">
              Let&apos;s Build Something Meaningful
            </h2>
            <p className="text-base text-muted max-w-xl mx-auto mb-8">
              Whether you need strategic video production, a new website build, or custom digital tools — let&apos;s turn your vision into reality.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
