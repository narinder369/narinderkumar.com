import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Narinder Kumar",
  description: "Privacy Policy for NarinderKumar.com outlining data handling, security practices, and user rights.",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted">
              Last updated: October 30, 2026
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container size="narrow">
            <div className="prose prose-slate max-w-none text-charcoal leading-relaxed space-y-6 text-sm sm:text-base">
              <h2 className="text-xl font-bold font-heading text-deep-brown">1. Introduction</h2>
              <p>
                Welcome to <strong>NarinderKumar.com</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), operated by Narinder Kumar. We are committed to protecting your personal data and your right to privacy. This policy outlines how we collect, use, and protect your information when you visit our website, purchase digital products, or hire our services.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">2. Information We Collect</h2>
              <p>We collect information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submit a project inquiry or contact form (name, email, phone number, company name).</li>
                <li>Purchase a digital product or service (billing address, contact email).</li>
                <li>Subscribe to our newsletter or access free digital resources.</li>
              </ul>
              <p>
                <em>Note on Payments:</em> We do not store or process your credit card numbers or banking passwords. All payment transactions are handled securely through accredited third-party payment gateways (Razorpay / Stripe) compliant with PCI-DSS standards.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">3. How We Use Your Information</h2>
              <p>We use personal information collected via our website to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Deliver purchased digital products and generate secure download links.</li>
                <li>Respond to service inquiries, provide project quotes, and execute contracts.</li>
                <li>Send administrative updates regarding orders or terms.</li>
                <li>Send marketing newsletters only when explicit consent is provided (you may unsubscribe at any time).</li>
              </ul>

              <h2 className="text-xl font-bold font-heading text-deep-brown">4. Data Security & Storage</h2>
              <p>
                We implement strict organizational and technical security measures, including HTTPS encryption, Supabase Row-Level Security (RLS), and server-side authentication guards to protect your personal information from unauthorized access.
              </p>

              <h2 className="text-xl font-bold font-heading text-deep-brown">5. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please email us directly at: <strong>hello@narinderkumar.com</strong>.
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
