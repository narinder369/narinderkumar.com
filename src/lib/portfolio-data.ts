export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: "AI Videos" | "Video Production" | "Web Design" | "UI/UX";
  shortDescription: string;
  fullDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  tools: string[];
  deliverables: string[];
  gradient: string;
  accentColor: string;
  date: string;
  duration: string;
  role: string;
}

export const PORTFOLIO_CATEGORIES = [
  "All",
  "AI Videos",
  "Video Production",
  "Web Design",
  "UI/UX",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "proj-1",
    slug: "ai-ugc-video-campaign",
    title: "AI UGC Video Campaign for Tech SaaS",
    category: "AI Videos",
    shortDescription:
      "A high-converting series of AI avatar UGC creatives designed for performance marketing and paid user acquisition.",
    fullDescription:
      "Designed and produced a multi-angle AI-driven user-generated content campaign tailored for a B2B SaaS platform. Leveraged state-of-the-art synthetic media pipelines to generate authentic human-like product demonstrations, test iterative marketing hooks, and achieve rapid creative turnarounds without costly physical video shoots.",
    overview:
      "Modern growth marketing requires high creative velocity. This project established an end-to-end AI video pipeline that delivered 12 high-converting video variations optimized for vertical platforms in under two weeks.",
    challenge:
      "The client needed to test multiple persona angles, localized accents, and demographic variations on paid social channels (TikTok and Meta Reels) without blowing through production budgets or waiting weeks for live actors.",
    solution:
      "Engineered an automated workflow utilizing HeyGen for custom avatar generation, ElevenLabs for voice modulation, and Premiere Pro for tight pacing, kinetic typography, and motion overlays to capture viewer attention within the first 3 seconds.",
    tools: ["HeyGen", "ElevenLabs", "Premiere Pro", "Midjourney", "CapCut"],
    deliverables: [
      "12 High-Definition Vertical (9:16) Creatives",
      "Dynamic Kinetic Subtitles & Captions",
      "A/B Test Script Variants & Hook Sets",
      "Localized Accent Audio Tracks",
    ],
    gradient: "from-purple-600 via-pink-600 to-rose-500",
    accentColor: "#F472B6",
    date: "2024",
    duration: "2 Weeks",
    role: "AI Video Creator & Creative Director",
  },
  {
    id: "proj-2",
    slug: "creator-brand-editorial-platform",
    title: "Editorial Platform & CMS Architecture",
    category: "Web Design",
    shortDescription:
      "A fast, high-performance publishing platform built on custom WordPress post types, JetEngine, and Elementor Pro.",
    fullDescription:
      "Engineered an editorial publication system for an independent content creator brand. Structured relational database models with JetEngine custom post types, dynamic taxonomies, and instant AJAX filtering to provide an effortless reading experience with top-tier Core Web Vitals.",
    overview:
      "Combining over a decade of deep WordPress and frontend mastery to turn WordPress into an ultra-fast, structured content engine that is intuitive for editors and lightning-fast for readers.",
    challenge:
      "The client was experiencing severe performance bottlenecks, disorganized custom fields, and an outdated blog template that failed to showcase diverse content formats such as podcasts, essays, and downloadable resources.",
    solution:
      "Architected a custom relational data structure using JetEngine for custom post types and meta fields. Designed custom lightweight Elementor loop templates with minimal CSS payload, asset preloading, and responsive typography.",
    tools: ["WordPress", "JetEngine", "Elementor Pro", "PHP", "Tailwind CSS"],
    deliverables: [
      "Custom Post Architecture & Taxonomies",
      "Dynamic Grid Loops & Live AJAX Filters",
      "Mobile-Optimized Editorial Layouts",
      "95+ Google PageSpeed Score Optimization",
    ],
    gradient: "from-amber-600 via-orange-600 to-red-600",
    accentColor: "#5A1F0A",
    date: "2024",
    duration: "4 Weeks",
    role: "Lead WordPress Developer & UI Designer",
  },
  {
    id: "proj-3",
    slug: "saas-analytics-design-system",
    title: "Minimalist SaaS Analytics Dashboard",
    category: "UI/UX",
    shortDescription:
      "A clean, accessible UI/UX design system and web application interface for a creator analytics platform.",
    fullDescription:
      "Designed a complete design system and interface suite for a multi-channel analytics tool. Crafted comprehensive design tokens, light/dark mode components, data visualization charts, and friction-free navigation to help creators analyze cross-platform revenue and engagement at a glance.",
    overview:
      "Complex analytics often overwhelm users with clutter. This design project prioritized visual hierarchy, breathing room, and typographic clarity to make dense data immediately actionable.",
    challenge:
      "The existing platform suffered from inconsistent component styles, poor contrast ratios, and visual fragmentation that made cross-platform metric comparison tedious for end users.",
    solution:
      "Built a unified Figma token library utilizing atomic design methodology. Rebuilt all dashboard screens with standardized grid systems, responsive card components, interactive states, and accessible color scales.",
    tools: ["Figma", "Design Tokens", "Tailwind CSS", "Prototyping", "Design Systems"],
    deliverables: [
      "Comprehensive Figma Token Library",
      "Light & Dark Mode UI Components",
      "40+ High-Fidelity Application Screens",
      "Interactive Prototyping & Developer Specs",
    ],
    gradient: "from-blue-600 via-cyan-600 to-teal-500",
    accentColor: "#7DD3FC",
    date: "2023",
    duration: "3 Weeks",
    role: "UI/UX Designer",
  },
  {
    id: "proj-4",
    slug: "cinematic-product-launch-video",
    title: "Cinematic Product Launch & Motion Teaser",
    category: "Video Production",
    shortDescription:
      "A dynamic promotional launch video blending kinetic UI animations, 3D product motion, and sound design.",
    fullDescription:
      "Produced a high-energy product launch video to unveil a new digital software application. Directed the pacing, storyboarded key feature transitions, and layered spatial sound effects to build momentum for the public rollout.",
    overview:
      "Video is the most effective medium to communicate software capabilities and emotional resonance during a launch event.",
    challenge:
      "The client needed to explain three complex software features in under 60 seconds while maintaining the excitement and polish of an Apple-level product reveal.",
    solution:
      "Crafted an upbeat motion graphics storyboard synchronized to an electronic soundtrack. Used After Effects for camera transitions and DaVinci Resolve for custom color grading and precise sound mastering.",
    tools: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Audition"],
    deliverables: [
      "60-Second Master Launch Video (4K)",
      "15-Second Cutdowns for Social Ads",
      "Custom Sound FX & Foley Mix",
      "Web Hero Background Looping Cut",
    ],
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    accentColor: "#22c55e",
    date: "2023",
    duration: "2.5 Weeks",
    role: "Motion Designer & Video Producer",
  },
  {
    id: "proj-5",
    slug: "ai-educational-storytelling-series",
    title: "Generative AI Educational Video Series",
    category: "AI Videos",
    shortDescription:
      "An experimental visual explainer series utilizing generative visual models, depth parallax, and voice synthesis.",
    fullDescription:
      "Produced a multi-part educational series exploring futuristic tech concepts. Developed consistent character prompts in Midjourney, applied motion and parallax with Runway Gen-2, and assembled a captivating narrative arc with professional editing standards.",
    overview:
      "Demonstrating how creators can produce broadcast-quality storytelling assets using next-generation generative AI tools alongside traditional editing discipline.",
    challenge:
      "Maintaining visual consistency and temporal coherence across AI-generated scenes has traditionally been notoriously difficult.",
    solution:
      "Engineered seed-consistent prompt matrices and depth mapping to maintain character models and environmental lighting across disparate scene shots, producing a cohesive visual narrative.",
    tools: ["Runway Gen-2", "Midjourney", "ElevenLabs", "Premiere Pro"],
    deliverables: [
      "5 Explainer Episodes (1080p 60fps)",
      "AI Prompt Guide & Consistency Framework",
      "Custom Graphic Overlay Elements",
      "Audio Polish & Ambient Soundscapes",
    ],
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
    accentColor: "#F472B6",
    date: "2024",
    duration: "3 Weeks",
    role: "AI Video Director & Editor",
  },
  {
    id: "proj-6",
    slug: "modern-ecommerce-storefront",
    title: "Modern E-Commerce Storefront & Catalog",
    category: "Web Design",
    shortDescription:
      "A conversion-focused e-commerce experience designed with mobile-first layouts and rapid checkout flows.",
    fullDescription:
      "Designed and coded a modern digital storefront focused on physical and digital products. Structured clean product grids, fluid responsive filtering, and seamless checkout touchpoints that elevate the shopping experience.",
    overview:
      "E-commerce demands immediate trust and frictionless pathways. This project brought editorial aesthetics to digital commerce.",
    challenge:
      "High bounce rates on mobile devices caused by slow-loading imagery, convoluted filter dropdowns, and confusing product variant selections.",
    solution:
      "Designed a streamlined product discovery experience with quick-view modals, sticky action bars on mobile, and optimized image loading hierarchies for instant browsing.",
    tools: ["Next.js", "Tailwind CSS", "TypeScript", "Figma", "Stripe"],
    deliverables: [
      "Responsive Storefront Design (Mobile & Desktop)",
      "Interactive Product Filtering UI",
      "Custom Cart Drawer & Checkout Experience",
      "Design Token Style Guide",
    ],
    gradient: "from-rose-600 via-pink-600 to-orange-500",
    accentColor: "#ec4899",
    date: "2023",
    duration: "3.5 Weeks",
    role: "Frontend Developer & UI Designer",
  },
];
