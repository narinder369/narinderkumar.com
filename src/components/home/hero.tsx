import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Download,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const identityRoles = [
  "Digital Creator",
  "Frontend Developer",
  "WordPress Specialist",
  "UI/UX Designer",
  "AI Video Creator",
  "Digital Entrepreneur",
];

const featureHighlights = [
  {
    title: "10+ YEARS EXPERIENCE",
    desc: "A decade of WordPress & dynamic frontend systems.",
    icon: Clock,
  },
  {
    title: "INSTANT ACCESS",
    desc: "Direct encrypted downloads immediately after checkout.",
    icon: Download,
  },
  {
    title: "AI-POWERED CREATION",
    desc: "High-retention UGC videos & prompt engineering assets.",
    icon: Sparkles,
  },
  {
    title: "100% SECURE CHECKOUT",
    desc: "Server-side signature validation & encrypted delivery.",
    icon: ShieldCheck,
  },
];

export function Hero() {
  return (
    <div>
      {/* Top Main Hero Block */}
      <section className="relative overflow-hidden bg-white pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36 border-b border-neutral-200">
        {/* Minimalist Architectural Grid Lines */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill Identity Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/15 bg-neutral-100 text-xs font-bold uppercase tracking-widest text-black mb-8 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              Narinder Kumar • Portfolio & Digital Ecosystem
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-black leading-none">
              Building Digital <br className="hidden sm:inline" />
              Experiences. <br />
              <span className="underline decoration-neutral-300 underline-offset-8">
                Creating Ideas That Matter.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
              I help businesses and creators grow through creative videos, AI-powered solutions, digital products and useful software.
            </p>

            {/* Pill CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-10">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10">
                  Explore Products
                </Button>
              </Link>
            </div>

            {/* Roles Bar */}
            <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-2">
              {identityRoles.map((role) => (
                <span
                  key={role}
                  className="px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border border-neutral-200 bg-white text-neutral-800"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* High-Contrast Black Feature Trust Bar (Exact Reference Style) */}
      <section className="bg-black text-white py-12 border-b border-neutral-800">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureHighlights.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
