import Link from "next/link";
import { ArrowRight, Wrench, Sparkles, MessageSquareText, Lightbulb, Calculator, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const toolsList = [
  {
    slug: "ai-prompt-generator",
    name: "AI Prompt Generator",
    description: "Generate structured, production-ready prompts for ChatGPT and Midjourney based on your specific goal.",
    icon: Sparkles,
    tier: "Free",
    status: "Live",
  },
  {
    slug: "social-caption-generator",
    name: "Viral Caption & Hook Crafter",
    description: "Instantly create high-converting captions, CTA variants, and hashtags tailored for Instagram and YouTube.",
    icon: MessageSquareText,
    tier: "Free",
    status: "Live",
  },
  {
    slug: "content-idea-engine",
    name: "Niche Content Idea Generator",
    description: "Break writer's block with 30-day content calendar ideas structured around problem-solving frameworks.",
    icon: Lightbulb,
    tier: "Free",
    status: "Live",
  },
  {
    slug: "creator-roi-calculator",
    name: "Digital Marketing ROI Calculator",
    description: "Calculate expected return on ad spend (ROAS), customer acquisition costs, and email list valuation.",
    icon: Calculator,
    tier: "Premium",
    status: "Beta",
  },
];

export function ToolsSection() {
  return (
    <Section background="white" id="tools" className="border-b border-neutral-200">
      <Container>
        <SectionHeader
          title="SMALL TOOLS. BIG PRODUCTIVITY."
          description="Free and premium browser-based utilities crafted to speed up your content workflows, marketing decisions, and daily creative tasks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.slug}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-black transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-neutral-300 bg-white text-black">
                      {tool.tier}
                    </span>
                  </div>

                  <h3 className="font-heading font-black uppercase text-base text-black mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link href={`/tools/${tool.slug}`}>
                    <Button
                      variant={tool.tier === "Free" ? "outline" : "primary"}
                      size="sm"
                      className="w-full text-center"
                    >
                      {tool.tier === "Free" ? "Launch Free Tool" : "Explore Pro Tool"}
                      <Zap className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/tools">
            <Button variant="outline" size="md">
              <Wrench className="w-4 h-4 mr-2" />
              Browse All Online Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
