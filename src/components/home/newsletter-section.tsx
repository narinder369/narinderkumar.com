"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <Section background="white" id="newsletter" className="border-b border-neutral-200">
      <Container size="narrow">
        <div className="bg-neutral-50 rounded-3xl border border-neutral-200 p-8 sm:p-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-widest mb-6">
            Weekly Briefing
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            Get Useful Ideas in Your Inbox.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed font-normal">
            Join developers, creators, and entrepreneurs. Every week I share practical guides on AI workflows, web development blueprints, and tools to boost your digital revenue.
          </p>

          {status === "success" ? (
            <div className="mt-8 p-4 bg-black text-white rounded-full flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                You&apos;re subscribed. Look out for the next issue.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-neutral-300 rounded-full text-xs font-medium"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={status === "loading"}
                className="shrink-0"
              >
                Subscribe
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-xs text-black font-semibold flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMessage}
            </p>
          )}

          <p className="mt-4 text-[11px] text-neutral-400 uppercase tracking-wider">
            Zero spam. Unsubscribe anytime with 1-click.
          </p>
        </div>
      </Container>
    </Section>
  );
}
