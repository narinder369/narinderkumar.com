import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const recentArticles = [
  {
    slug: "mastering-ai-ugc-video-creation",
    title: "How to Produce Hyper-Realistic AI UGC Videos That Outperform Traditional Ads",
    category: "AI Video Generation",
    excerpt: "Breakdown of the end-to-end workflow using AI avatars, voice synthesis, and dynamic pacing to create high-converting social ads.",
    date: "Oct 24, 2026",
    readingTime: 6,
  },
  {
    slug: "building-dynamic-websites-elementor-jetengine",
    title: "Why Elementor + JetEngine Is Still the Ultimate Stack for Custom Client Sites",
    category: "WordPress",
    excerpt: "10 years of WordPress experience distilled: structuring custom post types, relations, and clean query loops without plugin bloat.",
    date: "Oct 18, 2026",
    readingTime: 8,
  },
  {
    slug: "nextjs-app-router-ecommerce-guide",
    title: "Architecting a High-Performance Digital Products Store with Next.js & Supabase",
    category: "Web Development",
    excerpt: "Best practices for private file downloads, signed URLs, server-side webhook verification, and instant Core Web Vitals optimization.",
    date: "Oct 10, 2026",
    readingTime: 10,
  },
];

export function BlogSection() {
  return (
    <Section background="white" id="blog" className="border-b border-neutral-200">
      <Container>
        <SectionHeader
          title="IDEAS, EXPERIMENTS & PRACTICAL KNOWLEDGE"
          description="In-depth tutorials, real-world case studies, and engineering breakdowns covering AI, frontend architecture, and online business."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((article) => (
            <div
              key={article.slug}
              className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-black transition-all duration-200 group"
            >
              {/* Minimalist Header Cover */}
              <div className="h-44 w-full bg-neutral-900 text-white p-6 flex flex-col justify-between border-b border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20 self-start">
                  {article.category}
                </span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Engineering Briefing
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTime} min
                    </span>
                  </div>

                  <h3 className="font-heading font-black uppercase text-base text-black group-hover:underline transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-neutral-600 line-clamp-3 leading-relaxed font-normal">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform"
                  >
                    Read Full Article
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/blog">
            <Button variant="outline" size="md">
              Visit The Knowledge Hub
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
