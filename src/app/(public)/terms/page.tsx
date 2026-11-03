import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Narinder Kumar",
  description: "Terms and conditions governing the use of NarinderKumar.com, digital products, and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16 bg-warm-cream/50 border-b border-border">
          <Container size="narrow">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted hover:text-deep-brown mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-deep-brown">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-muted">
              Last updated: October 30, 2026
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container size="narrow">
            <div className="prose prose-slate max-w-none text-charcoal leading-relaxed space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-bold font-heading text-deep-brown">1. Agreement to Terms</h2>
              <p>
                By accessing or using <strong>NarinderKumar.com</strong>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">2. Digital Product Licenses</h2>
              <p>
                When you purchase a digital product (eBooks, Templates, AI Prompt Packs, or Notion templates):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You are granted a non-exclusive, non-transferable license to use the files for your personal and commercial client work.</li>
                <li>You may not resell, sub-license, redistribute, or share the source files publicly.</li>
                <li>All intellectual property rights remain the exclusive property of Narinder Kumar.</li>
              </ul>

              <h2 className="text-xl font-bold font-heading text-deep-brown">3. Professional Services</h2>
              <p>
                Service agreements (AI UGC video production, WordPress development, Next.js engineering) are governed by the specific project milestone brief and statement of work approved by both parties.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">4. Limitation of Liability</h2>
              <p>
                In no event shall Narinder Kumar be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website, tools, or products.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">5. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
