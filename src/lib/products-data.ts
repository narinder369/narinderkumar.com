export interface Product {
  id: string;
  slug: string;
  title: string;
  category: "eBooks" | "Templates" | "AI Prompts" | "Creator Resources";
  shortDescription: string;
  description: string;
  price: number;
  discountPrice?: number;
  featured?: boolean;
  coverGradient: string;
  benefits: string[];
  features: string[];
  contents: string[];
  fileFormat: string;
  fileSize: string;
  faq: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "ai-prompt-engineering-mastery",
    title: "AI Prompt Engineering Playbook",
    category: "AI Prompts",
    shortDescription: "300+ tested prompts for ChatGPT, Claude & Midjourney to scale your marketing and content workflows.",
    description: "The definitive playbook for creators, marketers, and developers looking to harness AI without generic outputs. Includes modular prompt frameworks, persona builders, SEO article generators, code refactoring recipes, and Midjourney v6 parameter guides.",
    price: 999,
    discountPrice: 499,
    featured: true,
    coverGradient: "from-pink/20 via-sky-blue/20 to-warm-cream",
    benefits: [
      "Cut prompt iteration time by 80%",
      "Consistent, human-grade AI copywriting outputs",
      "Ready-to-copy system prompts for custom GPTs",
      "Tested across Claude 3.5 Sonnet, GPT-4o, and Midjourney",
    ],
    features: [
      "Over 300+ categorized prompt templates",
      "Step-by-step chaining guides for complex tasks",
      "Notion workspace & PDF quick-reference sheets",
      "Lifetime updates as new AI models launch",
    ],
    contents: [
      "Module 1: Advanced Prompt Anatomy & Few-Shot Priming",
      "Module 2: 75+ High-Converting Copywriting & Ad Prompts",
      "Module 3: 60+ Technical & Code Generation Prompts",
      "Module 4: 50+ Visual Direction & Midjourney Formulas",
      "Bonus: Notion System Prompts Hub",
    ],
    fileFormat: "PDF + Notion Workspace",
    fileSize: "18.5 MB",
    faq: [
      { question: "How do I receive the files?", answer: "Immediately upon checkout, you will receive a secure download link on the order confirmation screen and via email." },
      { question: "Do these work with free AI versions?", answer: "Yes! While optimized for GPT-4o and Claude 3.5 Sonnet, the prompt architectures work effectively on free tiers as well." },
      { question: "Are updates included?", answer: "Yes, you get free lifetime access to any future revisions and new prompt drops." },
    ],
  },
  {
    id: "p2",
    slug: "ultimate-reels-hooks-templates",
    title: "Viral Short-Form Video Hooks & Scripts",
    category: "Creator Resources",
    shortDescription: "150+ high-retention hook formulas and full short-form scripts for Instagram Reels and YouTube Shorts.",
    description: "Stop losing viewers in the first 3 seconds. This creator resource pack contains 150+ battle-tested hook formulas, visual pattern-interrupt guidelines, pacing templates, and 30 plug-and-play script frameworks engineered for high retention on Reels, Shorts, and TikTok.",
    price: 1499,
    discountPrice: 799,
    featured: true,
    coverGradient: "from-sky-blue/20 via-warm-cream to-pink/20",
    benefits: [
      "Skyrocket average watch time and completion rate",
      "Never run out of video opening hooks",
      "Scripts organized by niche (Tech, Business, Coaching, Ecom)",
      "Designed specifically for 30s-60s algorithms",
    ],
    features: [
      "150 categorized hook formulas with examples",
      "30 full plug-and-play video scripts",
      "Visual pattern interrupt cheatsheet",
      "Audio and sound design timing cues",
    ],
    contents: [
      "Section 1: The First 3 Seconds Psychology",
      "Section 2: 50 Curiosity Hooks",
      "Section 3: 40 Contrarian & Problem Hooks",
      "Section 4: 60 Story & Authority Hooks",
      "Section 5: CapCut / Premiere editing pacing timeline",
    ],
    fileFormat: "PDF + Google Sheets Hook Vault",
    fileSize: "12.2 MB",
    faq: [
      { question: "Can I use these for client accounts?", answer: "Yes, you have full commercial rights to use these scripts and hooks for client campaigns." },
      { question: "What niches are covered?", answer: "Tech, education, eCommerce, personal branding, marketing, fitness, and lifestyle." },
    ],
  },
  {
    id: "p3",
    slug: "nextjs-portfolio-business-template",
    title: "Next.js Digital Business Pro Template",
    category: "Templates",
    shortDescription: "Production-ready personal brand & eCommerce Next.js starter kit with Supabase and Stripe integration.",
    description: "A production-grade Next.js App Router codebase built specifically for creators, agencies, and solopreneurs looking to sell digital products, book services, and showcase portfolio projects under a unified brand.",
    price: 3999,
    discountPrice: 1999,
    featured: true,
    coverGradient: "from-deep-brown/10 via-pink/10 to-sky-blue/20",
    benefits: [
      "Launch your personal digital ecosystem in hours",
      "Built-in digital downloads with signed Supabase URLs",
      "Pre-configured Tailwind CSS 4 & Lucide React design system",
      "100/100 Core Web Vitals out of the box",
    ],
    features: [
      "Next.js App Router & React 19 architecture",
      "Supabase Auth & Database Migrations ready",
      "Dual payments: Razorpay + Stripe support",
      "Full admin dashboard & customer portal",
    ],
    contents: [
      "Full TypeScript Source Code (.zip)",
      "Supabase SQL migration schema with RLS policies",
      "Step-by-step setup documentation",
      "Figma design tokens file",
    ],
    fileFormat: "ZIP (Source Code) + Docs",
    fileSize: "4.8 MB",
    faq: [
      { question: "What version of Next.js does this use?", answer: "Next.js 15+ / 16 with App Router, TypeScript, and Turbopack." },
      { question: "Can I use it for multiple commercial projects?", answer: "Yes, the single license includes unlimited personal and client projects." },
    ],
  },
  {
    id: "p4",
    slug: "elementor-jetengine-dynamic-mastery",
    title: "WordPress & JetEngine Dynamic Blueprint",
    category: "eBooks",
    shortDescription: "A comprehensive practical guide to building advanced custom web apps and dynamic sites without writing PHP.",
    description: "The complete roadmap to unlocking the full relational database potential of WordPress. Learn how to architect complex directory systems, custom relations, query loops, and front-end management dashboards.",
    price: 1299,
    discountPrice: 699,
    featured: true,
    coverGradient: "from-warm-cream via-sky-blue/20 to-pink/10",
    benefits: [
      "Build complex listing sites, directories, and portals",
      "Eliminate expensive SaaS dependencies with WordPress",
      "Learn relational database design inside WordPress",
      "Written by a 10-year WordPress specialist",
    ],
    features: [
      "220-page illustrated eBook guide",
      "5 real-world case study architecture breakdowns",
      "Downloadable JetEngine JSON presets & query loops",
      "Elementor Pro skin styling templates",
    ],
    contents: [
      "Chapter 1: Relational Data Models in JetEngine",
      "Chapter 2: Query Builder & Complex Taxonomies",
      "Chapter 3: Dynamic Visibility & Role-Based Layouts",
      "Chapter 4: Front-end Submission Forms & Dashboards",
      "Chapter 5: Speed Optimization & Database Tuning",
    ],
    fileFormat: "PDF + JSON Import Presets",
    fileSize: "34.1 MB",
    faq: [
      { question: "Is this suitable for beginners?", answer: "Basic familiarity with WordPress is recommended, but every step is explained with visual diagrams." },
      { question: "Does this include JetEngine license?", answer: "No, you will need your own Crocoblock / JetEngine license." },
    ],
  },
  {
    id: "p5",
    slug: "youtube-creator-retention-kit",
    title: "YouTube Studio Production Master Pack",
    category: "Creator Resources",
    shortDescription: "Thumbnail PSD templates, chapter title formulas, and retention graphs analysis for long-form creators.",
    description: "Everything you need to optimize your YouTube channel for high click-through-rates and sustained audience retention.",
    price: 1999,
    discountPrice: 999,
    featured: false,
    coverGradient: "from-pink/15 via-warm-cream to-deep-brown/10",
    benefits: [
      "Double your thumbnail click-through-rate",
      "Pre-tested color palettes and contrast formulas",
      "Optimized Photoshop PSDs with smart objects",
    ],
    features: [
      "20 high-CTR thumbnail templates",
      "Video editing checklist and export presets",
      "SEO title and description formulas",
    ],
    contents: [
      "20 Layered Photoshop PSD files",
      "Thumbnail typography fonts pack",
      "Channel branding banner guidelines",
    ],
    fileFormat: "ZIP (PSD + Assets)",
    fileSize: "142 MB",
    faq: [
      { question: "Do I need Photoshop?", answer: "You can edit the PSD files in Adobe Photoshop, Photopea (free online), or Figma." },
    ],
  },
  {
    id: "p6",
    slug: "minimalist-digital-marketing-planner",
    title: "The Solopreneur Digital Marketing OS",
    category: "eBooks",
    shortDescription: "A minimalist Notion operating system to plan, execute, and analyze your multi-channel marketing campaigns.",
    description: "Stop juggling disconnected spreadsheets. This Notion OS connects content calendars, lead magnets, email sequences, and revenue tracking.",
    price: 799,
    discountPrice: 399,
    featured: false,
    coverGradient: "from-sky-blue/25 to-warm-cream",
    benefits: [
      "Complete clarity on weekly marketing outputs",
      "Track marketing ROI from a single dashboard",
      "Integrated customer journey mapping",
    ],
    features: [
      "Ready-to-duplicate Notion template",
      "Automated relations between content and campaigns",
      "Video walkthrough setup tutorial",
    ],
    contents: [
      "Notion Dashboard Template",
      "Campaign Brief Templates",
      "KPI & Metrics tracker",
    ],
    fileFormat: "Notion Workspace Link + PDF Guide",
    fileSize: "5.4 MB",
    faq: [
      { question: "Do I need Notion paid plan?", answer: "No, this works seamlessly on the 100% free personal Notion plan." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
