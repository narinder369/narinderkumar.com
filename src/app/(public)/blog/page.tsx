import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogArticles } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Knowledge Hub | Narinder Kumar",
  description: "Practical engineering tutorials, AI workflows, WordPress blueprints, and digital business experiments.",
};

export default function BlogHubPage() {
  const [featuredArticle, ...otherArticles] = blogArticles;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Blog Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink/15 text-pink text-xs font-semibold uppercase tracking-wider mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                Knowledge & Engineering
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
                Ideas, Experiments and Practical Knowledge
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Clear, actionable insights on AI video creation, custom WordPress architecture, modern Next.js systems, and the creator economy.
              </p>
            </div>
          </Container>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <Section background="white">
            <Container>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-pink">
                  Featured Publication
                </span>
              </div>
              <Card variant="interactive" padding="none" className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className={`lg:col-span-5 h-64 lg:h-auto bg-gradient-to-tr ${featuredArticle.gradient} p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border`}>
                    <Badge variant="info" className="self-start">
                      {featuredArticle.category}
                    </Badge>
                    <div className="text-xs font-bold text-deep-brown uppercase tracking-wider">
                      Editor&apos;s Pick
                    </div>
                  </div>
                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-muted mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {featuredArticle.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featuredArticle.readingTime} min read
                        </span>
                      </div>
                      <Link href={`/blog/${featuredArticle.slug}`}>
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal hover:text-deep-brown transition-colors">
                          {featuredArticle.title}
                        </h2>
                      </Link>
                      <p className="mt-4 text-base text-muted leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-charcoal font-medium">
                        By {featuredArticle.author.name}
                      </span>
                      <Link
                        href={`/blog/${featuredArticle.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-pink hover:text-pink-hover"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Container>
          </Section>
        )}

        {/* Other Articles Grid */}
        <Section background="cream">
          <Container>
            <h2 className="text-2xl font-bold font-heading text-deep-brown mb-8">
              All Articles & Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <Card key={article.slug} variant="interactive" padding="none" className="bg-white overflow-hidden flex flex-col">
                  <div className={`h-48 w-full bg-gradient-to-tr ${article.gradient} p-6 flex flex-col justify-between border-b border-border`}>
                    <Badge variant="info" className="self-start">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-muted mb-3">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readingTime} min read</span>
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="font-heading font-bold text-lg text-charcoal hover:text-deep-brown transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-sm text-muted line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-pink hover:text-pink-hover"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
