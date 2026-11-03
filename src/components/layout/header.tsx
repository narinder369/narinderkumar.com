"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <Container>
        <nav className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Narinder Kumar - Home">
            <span className="text-2xl font-black tracking-tighter text-black uppercase">
              NK<span className="text-black">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors duration-150 hover:text-black",
                  pathname === item.href ? "text-black border-b-2 border-black pb-0.5" : "text-neutral-500"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Work With Me
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-black hover:text-neutral-600 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <Container>
            <div className="py-6 space-y-2">
              {siteConfig.nav.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-3 text-sm font-bold uppercase tracking-wider transition-colors",
                    pathname === item.href ? "text-black" : "text-neutral-500 hover:text-black"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-neutral-200">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Work With Me
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
