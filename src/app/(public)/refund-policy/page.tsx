import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | Narinder Kumar",
  description: "Refund policy for digital products and creative services on NarinderKumar.com.",
};

export default function RefundPolicyPage() {
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
              Refund Policy
            </h1>
            <p className="mt-2 text-sm text-muted">
              Last updated: October 30, 2026
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container size="narrow">
            <div className="prose prose-slate max-w-none text-charcoal leading-relaxed space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-bold font-heading text-deep-brown">1. Digital Products</h2>
              <p>
                Due to the non-tangible and irrevocable nature of digital goods (PDFs, downloadable source code, Notion templates, and prompt files), <strong>all digital product sales are generally non-refundable once the download link has been generated and accessed</strong>.
              </p>
              <p>
                However, customer satisfaction is our top priority. If you encounter any technical defect, corrupted archive, or if the product does not match its advertised specifications, please contact us at <strong>hello@narinderkumar.com</strong> within 7 days of purchase. We will promptly issue a replacement file or process a full refund.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">2. Creative & Digital Services</h2>
              <p>
                For custom professional services (AI UGC video campaigns, website builds):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Deposits paid prior to project kickoff cover initial planning and asset setup and are non-refundable once work has commenced.</li>
                <li>Revision rounds are included with every service tier as specified in the service agreement to ensure your complete satisfaction.</li>
                <li>If a project is cancelled by the client prior to final delivery, billing is prorated based on completed milestones.</li>
              </ul>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
