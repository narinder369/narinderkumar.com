import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services, getServiceBySlug } from "@/config/services";
import { InquiryForm } from "@/components/services/inquiry-form";
import { ServiceFaq } from "@/components/services/service-faq";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Service Hero */}
        <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Link
                href="/services"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Services
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-black text-white inline-flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                {service.startingPrice && (
                  <Badge variant="default">
                    Starting from {service.startingPrice}
                  </Badge>
                )}
                <Badge variant="outline">Verified Capability</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-tight">
                {service.title}
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
                {service.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <a href="#inquiry-form">
                  <Button variant="primary" size="lg">
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg">
                    View Portfolio Samples
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Problems Solved vs Benefits */}
        <Section background="white" className="border-b border-neutral-200">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Problems Solved */}
              <div className="bg-black text-white rounded-3xl p-8 sm:p-12 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Friction We Eliminate
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6">
                  Problems Solved
                </h2>
                <ul className="space-y-4">
                  {service.problemsSolved.map((problem, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-neutral-800">
                        ✕
                      </span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-300 text-black text-[10px] font-bold uppercase tracking-widest mb-6">
                  The Direct Value
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mb-6">
                  Key Benefits & ROI
                </h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-800 text-sm leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Deliverables */}
        <Section background="white" className="border-b border-neutral-200">
          <Container>
            <SectionHeader
              title="DELIVERABLES & SCOPE"
              description="Clear, transparent deliverables. No hidden surprises or ambiguous scopes."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.deliverables.map((item, i) => (
                <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-heading font-black uppercase text-sm text-black">
                      {item}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Full commercial rights included
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Workflow */}
        <Section background="white" className="border-b border-neutral-200">
          <Container>
            <SectionHeader
              title="HOW WE WORK TOGETHER"
              description="A structured, predictable 5-step process from initial brief to final delivery."
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {service.workflow.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white font-black text-base flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h4 className="font-heading font-black uppercase text-sm text-black mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQs */}
        {service.faq && service.faq.length > 0 && (
          <Section background="white" className="border-b border-neutral-200">
            <Container size="narrow">
              <SectionHeader
                title="FREQUENTLY ASKED QUESTIONS"
                description="Everything you need to know about this service before getting started."
              />
              <ServiceFaq faq={service.faq} />
            </Container>
          </Section>
        )}

        {/* Inquiry Form Section */}
        <Section background="white" id="inquiry-form">
          <Container size="narrow">
            <SectionHeader
              title={`INQUIRE ABOUT ${service.shortTitle.toUpperCase()}`}
              description="Fill out the project brief below and I will review your requirements and respond within 24 hours."
            />
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <InquiryForm preselectedService={service.title} />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
