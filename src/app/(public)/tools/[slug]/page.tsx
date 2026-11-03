"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Copy, Check, RefreshCw, Send, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toolsList } from "@/components/home/tools-section";

export default function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const tool = toolsList.find((t) => t.slug === slug) || toolsList[0];

  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!inputVal.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      if (slug === "ai-prompt-generator") {
        setOutputVal(
          `Act as an elite domain expert in ${inputVal.trim()}.\n\n` +
          `OBJECTIVE:\nExecute a high-impact, actionable breakdown addressing the core objectives.\n\n` +
          `CONSTRAINTS:\n- Tone: Authoritative, pragmatic, and clear\n- No fluff or generic motivational fillers\n- Output format: Executive Summary -> Step-by-Step Tactical Framework -> Checklist`
        );
      } else if (slug === "social-caption-generator") {
        setOutputVal(
          `🔥 Hook: Most people completely misunderstand ${inputVal.trim()}.\n\n` +
          `Here is what 10+ years of building taught me:\n` +
          `1. Consistency beats intensity every single time.\n` +
          `2. Your audience does not care about features; they care about speed and results.\n` +
          `3. Simplify until there is nothing left to remove.\n\n` +
          `💬 Comment "GUIDE" below and I’ll send you the complete blueprint.\n\n` +
          `#${inputVal.replace(/\s+/g, "")} #DigitalCreator #WebDevelopment #GrowthStrategy`
        );
      } else {
        setOutputVal(
          `30-DAY CONTENT TOPICS FOR: ${inputVal.trim()}\n\n` +
          `1. The #1 mistake 90% of beginners make with ${inputVal.trim()}.\n` +
          `2. Behind the scenes: My exact step-by-step framework.\n` +
          `3. Why you should stop doing traditional workflows in 2026.\n` +
          `4. Tool breakdown: The 3 software utilities I can't live without.\n` +
          `5. Case study: How to achieve real measurable results without extra budget.`
        );
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Tool Header */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Link
                href="/tools"
                className="inline-flex items-center text-sm font-medium text-muted hover:text-deep-brown mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Tools
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <Badge variant={tool.tier === "Free" ? "success" : "info"}>
                  {tool.tier} Tool
                </Badge>
                <Badge variant="outline">Live In-Browser</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-deep-brown">
                {tool.name}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted max-w-2xl">
                {tool.description}
              </p>
            </div>
          </Container>
        </section>

        {/* Interactive Workspace */}
        <Section background="white">
          <Container>
            <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
              {/* Input Card */}
              <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <label className="block text-sm font-bold font-heading text-charcoal mb-2">
                  Enter your topic, niche, or specific goal:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="e.g. Next.js SaaS, AI Video Ads, E-commerce Growth..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleGenerate}
                    loading={isGenerating}
                    className="shrink-0"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Result
                  </Button>
                </div>
              </div>

              {/* Output Display */}
              <div className="bg-warm-cream/40 border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pink" />
                    <h3 className="font-heading font-bold text-sm text-charcoal uppercase tracking-wider">
                      Generated Output
                    </h3>
                  </div>
                  {outputVal && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="text-xs text-charcoal hover:bg-white"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-success" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy Result
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {outputVal ? (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-charcoal/90 bg-white border border-border rounded-xl p-5 leading-relaxed">
                    {outputVal}
                  </pre>
                ) : (
                  <div className="text-center py-12 text-muted text-sm border-2 border-dashed border-border rounded-xl">
                    Enter a prompt or topic above and click &quot;Generate Result&quot; to test the engine.
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
