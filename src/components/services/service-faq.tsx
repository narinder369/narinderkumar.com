"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqProps {
  faq: FaqItem[];
  className?: string;
}

export function ServiceFaq({ faq, className }: ServiceFaqProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4 max-w-3xl mx-auto", className)}>
      {faq.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const faqId = `faq-item-${index}`;

        return (
          <div
            key={index}
            className="rounded-xl border border-border bg-white transition-all duration-150 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-warm-cream/30 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              aria-expanded={isOpen}
              aria-controls={faqId}
            >
              <span className="font-heading font-semibold text-base sm:text-lg text-charcoal pr-4">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-warm-cream text-deep-brown transition-transform duration-200",
                  isOpen && "rotate-180 bg-pink/10 text-pink"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={faqId}
                className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-muted leading-relaxed border-t border-border/60 pt-4 bg-white"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
