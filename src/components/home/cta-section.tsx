import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      <Container size="narrow" className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 text-[11px] font-bold uppercase tracking-widest mb-8">
          Work With Narinder Kumar
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Have an Idea? <br />
          <span className="underline decoration-neutral-700 underline-offset-8">
            Let&apos;s Build It.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal">
          Whether you need high-converting AI video campaigns, a custom WordPress web application, or a modern Next.js platform — let&apos;s collaborate.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200 border-none"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/portfolio" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-neutral-700 text-white hover:bg-neutral-900"
            >
              Explore My Work
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
