import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { blogArticles, getArticleBySlug } from "@/lib/blog-data";
import { NewsletterSection } from "@/components/home/newsletter-section";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Blog`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Article Header */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-warm-cream/60 via-white to-white border-b border-border">
          <Container size="narrow">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted hover:text-deep-brown mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="info">{article.category}</Badge>
              <span className="text-xs text-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="text-xs text-muted flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-deep-brown tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-charcoal/80 leading-relaxed font-sans">
              {article.excerpt}
            </p>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-deep-brown text-white flex items-center justify-center font-heading font-bold text-sm">
                  NK
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-muted">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-warm-cream px-2 py-0.5 rounded text-charcoal/70">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Article Body */}
        <Section background="white">
          <Container size="narrow">
            <article className="prose prose-lg max-w-none text-charcoal leading-relaxed space-y-6">
              {article.content.trim().split("\n\n").map((block, idx) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-heading text-deep-brown mt-10 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold font-heading text-charcoal mt-8 mb-3">
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </article>

            {/* Author Bio Box */}
            <div className="mt-16 p-8 bg-warm-cream rounded-2xl border border-border flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-deep-brown text-white flex items-center justify-center font-heading font-extrabold text-2xl shrink-0">
                NK
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-deep-brown">
                  Written by Narinder Kumar
                </h4>
                <p className="mt-1 text-sm text-charcoal/80 leading-relaxed">
                  Digital creator, frontend engineer, and 10+ year WordPress specialist building scalable online business systems and AI video workflows.
                </p>
                <div className="mt-3">
                  <Link href="/about" className="text-xs font-bold text-pink hover:text-pink-hover inline-flex items-center">
                    Learn more about my background
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Newsletter Inline */}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
