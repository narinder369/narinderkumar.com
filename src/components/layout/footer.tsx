import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-neutral-900">
      <Container>
        {/* Main Footer */}
        <div className="py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black uppercase tracking-tighter text-white">
                NK<span className="text-white">.</span> RETAIL & STUDIO
              </span>
            </Link>
            <p className="mt-4 text-xs font-medium text-neutral-400 uppercase tracking-widest">
              Where ideas become digital assets.
            </p>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-sm">
              An all-in-one digital business platform combining AI UGC video creation, modern web development, and high-value digital products under the Narinder Kumar brand.
            </p>
            <div className="mt-8">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {siteConfig.nav.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {siteConfig.nav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
              Legal & Support
            </h4>
            <ul className="space-y-3 mb-8">
              {siteConfig.nav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors capitalize"
                  >
                    {platform}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-wider text-neutral-500">
          <p>© {currentYear} Narinder Kumar. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
