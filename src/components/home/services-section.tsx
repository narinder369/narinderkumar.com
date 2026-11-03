import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/services";
import { Section, SectionHeader } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  return (
    <Section id="services" background="white" className="border-b border-neutral-200">
      <Container>
        <SectionHeader
          title="HOW I CAN HELP YOUR BUSINESS"
          description="Tailored digital solutions combining creative video production, robust web engineering, and strategic marketing to scale your brand."
          centered
        />

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block h-full focus:outline-none"
              >
                <Card
                  variant="interactive"
                  padding="none"
                  className="h-full p-8 flex flex-col justify-between rounded-2xl border-neutral-200 hover:border-black hover:bg-neutral-50/50 transition-all duration-200"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full border border-neutral-200 bg-neutral-100 flex items-center justify-center text-black mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">
                      {service.shortTitle}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-black">
                      From {service.startingPrice || "Custom"}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-black inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/services">
            <Button variant="outline" size="md">
              View All 6 Specialized Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
