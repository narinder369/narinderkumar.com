import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Terminal } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Sparkles,
    title: "Creative Content & AI Video",
    description:
      "Crafting authentic AI-generated UGC, engaging short-form video reels, and visual stories that capture attention and drive conversions.",
  },
  {
    icon: Layers,
    title: "Web Engineering & WordPress",
    description:
      "Over 10 years of deep experience architecting custom WordPress platforms with Elementor and JetEngine, alongside blazing-fast Next.js apps.",
  },
  {
    icon: Terminal,
    title: "Digital Products & Useful Tools",
    description:
      "Building practical eBooks, prompt packs, code templates, and web utilities that solve real-world problems for creators and founders.",
  },
];

export function Introduction() {
  return (
    <Section background="white" className="border-b border-neutral-200">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            The Philosophy
          </p>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight">
            One Person. Multiple Digital Possibilities.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            I sit at the intersection of creative storytelling, modern web engineering,
            and digital entrepreneurship. Rather than treating code, content, and business
            as isolated silos, I bring them together to build cohesive, high-performance digital
            platforms.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-black transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-black mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-14 text-center">
          <Link href="/about">
            <Button variant="outline" size="md">
              Read My Story & Approach
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
