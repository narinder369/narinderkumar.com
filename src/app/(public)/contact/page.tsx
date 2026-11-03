import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/config/site";
import { Mail, Clock, ShieldCheck, MessageSquare, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries | Narinder Kumar",
  description: "Get in touch with Narinder Kumar for AI UGC video production, WordPress & Next.js development, or business inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Contact Hero */}
        <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-300 bg-neutral-100 text-black text-[11px] font-bold uppercase tracking-widest mb-6">
                <MessageSquare className="w-3.5 h-3.5" />
                Direct Inquiry
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-tight">
                Let&apos;s Build Something Meaningful.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Have a project in mind, need high-converting video production, or want to collaborate? Send a message and let&apos;s explore the possibilities.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Layout */}
        <Section background="white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8">
                  <h3 className="font-heading font-black uppercase text-base text-black mb-6 tracking-wider">
                    Direct Contact
                  </h3>
                  <div className="space-y-6 text-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">Email Address</div>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="font-bold text-black hover:underline transition-colors text-base"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">Response Time</div>
                        <p className="text-black font-semibold">Within 24 Hours (Mon – Sat)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">Availability</div>
                        <p className="text-black font-semibold">Accepting Selected Q4 Projects</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-8">
                  <h4 className="font-heading font-black uppercase text-xs tracking-widest text-black mb-4">
                    Channels
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {Object.entries(siteConfig.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border border-neutral-200 hover:border-black transition-all flex items-center justify-between uppercase font-bold text-black"
                      >
                        <span>{platform}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-sm">
                <h3 className="font-heading font-black uppercase text-2xl text-black mb-2">
                  Send a Project Brief
                </h3>
                <p className="text-xs text-neutral-500 mb-8 font-medium">
                  Fill in the details below to help me understand your requirements.
                </p>
                <ContactForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
