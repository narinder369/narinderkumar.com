import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery & Shipping Policy | Narinder Kumar",
  description: "Digital delivery and physical shipping policy for NarinderKumar.com.",
};

export default function ShippingPolicyPage() {
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
              Delivery & Shipping Policy
            </h1>
            <p className="mt-2 text-sm text-muted">
              Last updated: October 30, 2026
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container size="narrow">
            <div className="prose prose-slate max-w-none text-charcoal leading-relaxed space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-bold font-heading text-deep-brown">1. Digital Products Delivery</h2>
              <p>
                All digital resources, eBooks, templates, and prompt packages purchased on <strong>NarinderKumar.com</strong> are delivered electronically:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Instant Access:</strong> Immediately upon successful payment confirmation, you will be redirected to an order confirmation screen with a secure download button.</li>
                <li><strong>Email Confirmation:</strong> A purchase receipt containing an encrypted signed download link is also dispatched automatically to your registered email address.</li>
                <li><strong>No Shipping Charges:</strong> Because fulfillment is 100% digital, there are zero shipping fees.</li>
              </ul>

              <h2 className="text-xl font-bold font-heading text-deep-brown">2. Physical Merchandise & Prints (Future Phase)</h2>
              <p>
                When physical collections (inspirational quote frames, desk posters, branded merchandise) become available on our shop:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Domestic shipments across India will be dispatched via premium courier partners (Delhivery, BlueDart, Shiprocket) within 2-4 business days.</li>
                <li>Tracking links will be communicated via SMS and email as soon as the package is handed over to the carrier.</li>
              </ul>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
