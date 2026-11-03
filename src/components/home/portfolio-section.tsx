"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "All" | "Videos" | "Websites" | "Design";

interface PortfolioItem {
  id: string;
  title: string;
  category: "Videos" | "Websites" | "Design";
  description: string;
  gradient: string;
  tags: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "ai-ugc-campaign",
    title: "AI UGC Video Campaign for D2C Brand",
    category: "Videos",
    description:
      "High-converting short-form AI video ads generated for a direct-to-consumer brand, optimized for Instagram Reels and YouTube Shorts.",
    gradient: "from-black via-neutral-900 to-neutral-800",
    tags: ["AI Video", "Scripting", "Reels"],
  },
  {
    id: "real-estate-portal",
    title: "Custom Dynamic Real Estate Platform",
    category: "Websites",
    description:
      "WordPress, Elementor Pro, and JetEngine powered listing website with advanced dynamic filtering, custom post types, and map integration.",
    gradient: "from-neutral-950 via-neutral-900 to-neutral-800",
    tags: ["WordPress", "JetEngine", "Elementor"],
  },
  {
    id: "saas-dashboard-design",
    title: "SaaS Analytics Dashboard UI/UX",
    category: "Design",
    description:
      "Complete web application interface overhaul, multi-role design system architecture, and interaction tokens crafted in Figma.",
    gradient: "from-neutral-900 via-neutral-800 to-neutral-700",
    tags: ["UI/UX", "Figma", "Design System"],
  },
  {
    id: "health-promotional-video",
    title: "Healthcare Promotional Commercial",
    category: "Videos",
    description:
      "Engaging promotional video series engineered to educate clinic patients and communicate treatment procedures clearly.",
    gradient: "from-black via-neutral-900 to-neutral-800",
    tags: ["Commercial", "Short Form", "Voiceover"],
  },
  {
    id: "ecommerce-starter-kit",
    title: "Next.js Digital Commerce Ecosystem",
    category: "Websites",
    description:
      "Next.js App Router, Tailwind CSS, Supabase PostgreSQL, and Stripe integration delivering instant digital fulfillment with zero latency.",
    gradient: "from-neutral-950 via-neutral-900 to-neutral-800",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    id: "creator-brand-identity",
    title: "Creator Economy Brand Overhaul",
    category: "Design",
    description:
      "Visual identity, YouTube thumbnail design systems, social banner assets, and typographic hierarchy for an authority creator.",
    gradient: "from-neutral-900 via-neutral-800 to-neutral-700",
    tags: ["Branding", "Thumbnails", "Social"],
  },
];

const categories: Category[] = ["All", "Videos", "Websites", "Design"];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Section id="portfolio" background="white" className="border-b border-neutral-200">
      <Container>
        <SectionHeader
          title="SELECTED CREATIVE WORK"
          description="Explore verified client productions, web applications, and UI/UX design architectures."
          centered
        />

        {/* Minimalist Pill Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer",
                activeCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black border border-neutral-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-black transition-all duration-200"
            >
              {/* Card Visual Header */}
              <div
                className={cn(
                  "relative h-56 w-full bg-gradient-to-br p-6 flex flex-col justify-between text-white overflow-hidden",
                  item.gradient
                )}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white border border-white/20">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

                <div className="z-10">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle Geometric Overlay */}
                <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full border border-white/10 pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border border-neutral-200 bg-neutral-50 text-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-black inline-flex items-center gap-1.5 group-hover:underline"
                  >
                    View Project Case
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/portfolio">
            <Button variant="outline" size="md">
              View Complete Archive
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
