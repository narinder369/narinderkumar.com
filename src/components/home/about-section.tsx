import Link from "next/link";
import { ArrowRight, Code2, Video, Globe2, Layers } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

const expertiseHighlights = [
  {
    title: "10+ Years WordPress & JetEngine",
    desc: "Architecting custom, dynamic web solutions without fragile bloat.",
    icon: Globe2,
  },
  {
    title: "Modern Next.js & React Apps",
    desc: "Building blazing-fast, type-safe full-stack platforms and tools.",
    icon: Code2,
  },
  {
    title: "AI Video & UGC Production",
    desc: "Crafting viral short-form hooks, ads, and AI-powered visual assets.",
    icon: Video,
  },
  {
    title: "UI/UX & Product Strategy",
    desc: "Designing intuitive user flows that convert visitors into buyers.",
    icon: Layers,
  },
];

export function AboutSection() {
  return (
    <Section background="white" id="about" className="border-b border-neutral-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Monogram Portrait Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl bg-neutral-900 p-3 shadow-xl">
              <div className="w-full h-full rounded-2xl bg-black border border-neutral-800 flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center font-black text-3xl mb-6 shadow-md border-4 border-neutral-800">
                  NK
                </div>
                <h3 className="font-heading font-black uppercase text-2xl tracking-tight text-white">
                  Narinder Kumar
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-1">
                  Digital Creator & Developer
                </p>
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800 text-neutral-300">
                    10+ Yrs Exp
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800 text-neutral-300">
                    Global Clients
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Bio Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 bg-neutral-100 text-black text-[11px] font-bold uppercase tracking-widest mb-6">
              About The Founder
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight">
              Creating, Building and Exploring the Digital World.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
              I am a digital creator, frontend developer, and digital entrepreneur with over 10 years of experience crafting custom WordPress platforms, modern Next.js applications, and cutting-edge AI video content.
            </p>

            <p className="mt-4 text-sm sm:text-base text-neutral-500 leading-relaxed">
              My mission is to help ambitious businesses, creators, and brands turn ideas into scalable digital assets. Whether it&apos;s building bespoke eCommerce web systems or producing viral AI-generated video campaigns, I combine creative storytelling with engineering precision.
            </p>

            {/* Core Competencies Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertiseHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div className="p-2 rounded-full bg-black text-white shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link href="/about">
                <Button variant="primary" size="md">
                  Read My Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="md">
                  View Selected Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
