import {
  Video,
  Clapperboard,
  BarChart3,
  Globe,
  Blocks,
  Palette,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  shortDescription: string;
  description: string;
  problemsSolved: string[];
  benefits: string[];
  deliverables: string[];
  workflow: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  startingPrice?: string;
}

export const services: ServiceDefinition[] = [
  {
    slug: "ai-ugc-videos",
    title: "AI-Generated UGC Video Creation",
    shortTitle: "AI UGC Videos",
    icon: Video,
    shortDescription:
      "High-converting AI-generated user-generated content videos for brands, products, and services.",
    description:
      "Transform your marketing with professional AI-generated UGC videos that look authentic and drive engagement. I create realistic, conversion-focused video content using cutting-edge AI tools — helping brands scale their video marketing without the complexity of traditional production.",
    problemsSolved: [
      "High cost of hiring real UGC creators for every campaign",
      "Inconsistent content quality across different creators",
      "Long turnaround times for video production",
      "Difficulty scaling video content for multiple platforms",
      "Need for diverse creator representation without managing multiple relationships",
    ],
    benefits: [
      "Fraction of the cost of traditional UGC production",
      "Fast turnaround — days instead of weeks",
      "Consistent quality and brand messaging",
      "Unlimited revisions and variations",
      "Optimized for Instagram, TikTok, YouTube Shorts, and ads",
    ],
    deliverables: [
      "Custom AI UGC videos (30s–90s)",
      "Script writing and storyboarding",
      "Professional voiceover and lip-sync",
      "Brand-matched AI avatars",
      "Platform-optimized exports (9:16, 1:1, 16:9)",
      "Caption and subtitle overlays",
    ],
    workflow: [
      { step: 1, title: "Brief & Strategy", description: "We discuss your product, target audience, and campaign goals." },
      { step: 2, title: "Script & Storyboard", description: "I write a compelling script and plan the visual flow." },
      { step: 3, title: "AI Production", description: "Video creation using advanced AI tools with your brand elements." },
      { step: 4, title: "Review & Refine", description: "You review the draft and request any revisions." },
      { step: 5, title: "Final Delivery", description: "Polished videos delivered in all required formats." },
    ],
    faq: [
      { question: "How realistic do AI UGC videos look?", answer: "Modern AI video tools produce remarkably realistic results. The quality continues to improve rapidly, and most viewers cannot distinguish well-produced AI UGC from traditional content." },
      { question: "Can I choose the AI creator's appearance?", answer: "Yes, I can create videos with diverse AI avatars matching your brand's target demographic. We'll select the best fit during the planning phase." },
      { question: "What's the typical turnaround time?", answer: "Most projects are delivered within 3-5 business days, depending on complexity and volume." },
      { question: "Do you handle the script writing?", answer: "Yes, script writing is included. I write conversion-focused scripts based on your product details and marketing goals." },
    ],
    startingPrice: "₹4,999",
  },
  {
    slug: "video-production",
    title: "Short-Form Video Production",
    shortTitle: "Video Production",
    icon: Clapperboard,
    shortDescription:
      "Professional short-form videos for Instagram Reels, YouTube Shorts, product ads, and business promotions.",
    description:
      "I produce scroll-stopping short-form videos that capture attention and drive action. From Instagram Reels to YouTube Shorts, product advertisements to business promotional videos — every video is crafted for maximum impact on modern social platforms.",
    problemsSolved: [
      "Low engagement on social media content",
      "Inability to produce professional video in-house",
      "Videos that don't convert viewers into customers",
      "Inconsistent visual branding across video content",
      "Difficulty keeping up with content demands",
    ],
    benefits: [
      "Scroll-stopping content designed for engagement",
      "Professional editing and motion graphics",
      "Consistent brand identity across all videos",
      "Optimized for each platform's algorithm",
      "Fast production pipeline for regular content",
    ],
    deliverables: [
      "Instagram Reels (15s–90s)",
      "YouTube Shorts",
      "Product advertisement videos",
      "Business promotional videos",
      "Social media content packages",
      "Motion graphics and text animations",
    ],
    workflow: [
      { step: 1, title: "Content Strategy", description: "Define your content goals, audience, and platform priorities." },
      { step: 2, title: "Creative Planning", description: "Develop concepts, scripts, and visual direction." },
      { step: 3, title: "Production", description: "Edit and produce videos with professional transitions and effects." },
      { step: 4, title: "Review", description: "Review drafts and provide feedback for revisions." },
      { step: 5, title: "Delivery", description: "Final videos delivered optimized for each platform." },
    ],
    faq: [
      { question: "Do I need to provide raw footage?", answer: "It depends on the project. For some videos, I work with footage you provide. For others, I can create entirely new content using stock footage, AI tools, and motion graphics." },
      { question: "Can you create a content series?", answer: "Yes, I offer content packages for ongoing video production. This ensures consistent branding and regular posting schedules." },
      { question: "What formats do you deliver?", answer: "I deliver in all standard formats — vertical (9:16) for Reels and Shorts, square (1:1) for feed posts, and horizontal (16:9) for YouTube." },
    ],
    startingPrice: "₹2,999",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    icon: BarChart3,
    shortDescription:
      "Data-driven digital marketing strategies including social media management, content marketing, and paid advertising.",
    description:
      "I help businesses build a strong digital presence through strategic marketing. From social media content creation to paid advertising campaigns, I develop and execute marketing strategies that attract the right audience and convert them into customers.",
    problemsSolved: [
      "Low online visibility and brand awareness",
      "Ineffective social media presence",
      "Wasted ad spend with poor targeting",
      "No clear digital marketing strategy",
      "Difficulty measuring marketing ROI",
    ],
    benefits: [
      "Clear, measurable marketing strategy",
      "Targeted audience reach",
      "Consistent brand presence across platforms",
      "Data-driven decision making",
      "Scalable growth approach",
    ],
    deliverables: [
      "Social media strategy and content calendar",
      "Content creation for social platforms",
      "Paid advertising campaign management",
      "Monthly performance reports",
      "Competitor analysis",
      "Brand positioning and messaging",
    ],
    workflow: [
      { step: 1, title: "Audit & Research", description: "Analyze your current digital presence, competitors, and audience." },
      { step: 2, title: "Strategy", description: "Develop a comprehensive digital marketing strategy." },
      { step: 3, title: "Execution", description: "Create content, launch campaigns, and manage channels." },
      { step: 4, title: "Monitor", description: "Track performance metrics and optimize in real-time." },
      { step: 5, title: "Report & Iterate", description: "Monthly reporting with insights and strategic adjustments." },
    ],
    faq: [
      { question: "Which platforms do you work with?", answer: "I work with Instagram, YouTube, Facebook, LinkedIn, Twitter/X, and Google Ads — focusing on the platforms most relevant to your business." },
      { question: "How soon can I expect results?", answer: "Organic growth typically shows meaningful results within 2-3 months. Paid campaigns can show results much faster, often within the first few weeks." },
      { question: "Do you manage ad budgets?", answer: "Yes, I handle complete ad campaign management including budget allocation, targeting, creative development, and optimization." },
    ],
    startingPrice: "₹9,999/mo",
  },
  {
    slug: "wordpress-development",
    title: "WordPress Website Development",
    shortTitle: "WordPress Development",
    icon: Blocks,
    shortDescription:
      "Custom WordPress websites built with Elementor, JetEngine, and modern development practices. 10+ years of experience.",
    description:
      "With more than 10 years of hands-on WordPress experience, I build custom, high-performance WordPress websites using Elementor, JetEngine, and custom development. From business websites to complex dynamic platforms — I bring deep expertise in the WordPress ecosystem.",
    problemsSolved: [
      "Outdated website design hurting credibility",
      "Slow loading speeds affecting SEO and conversions",
      "Difficulty managing website content",
      "Need for custom functionality beyond standard themes",
      "Poor mobile experience losing potential customers",
    ],
    benefits: [
      "10+ years of WordPress expertise",
      "Custom designs that stand out from templates",
      "Fast loading, SEO-optimized websites",
      "Easy content management through WordPress admin",
      "Scalable architecture for future growth",
    ],
    deliverables: [
      "Custom WordPress website design",
      "Elementor-based page building",
      "JetEngine dynamic content setup",
      "Custom plugin development",
      "SEO optimization",
      "Mobile responsive design",
      "Speed optimization",
      "Training and documentation",
    ],
    workflow: [
      { step: 1, title: "Discovery", description: "Understand your business, goals, and design preferences." },
      { step: 2, title: "Design", description: "Create wireframes and visual mockups for your approval." },
      { step: 3, title: "Development", description: "Build the website with clean code and custom functionality." },
      { step: 4, title: "Content & SEO", description: "Add content, optimize for search engines, and configure settings." },
      { step: 5, title: "Launch", description: "Testing, launch, training, and post-launch support." },
    ],
    faq: [
      { question: "Why WordPress over other platforms?", answer: "WordPress powers over 40% of the web. It's flexible, has a massive ecosystem, and gives you full ownership of your website. For many businesses, it remains the best choice." },
      { question: "Do you use page builders?", answer: "Yes, I primarily use Elementor Pro combined with JetEngine for dynamic content. This gives you an intuitive editing experience while maintaining professional quality." },
      { question: "Will I be able to update the website myself?", answer: "Absolutely. I build websites that are easy to manage. I also provide training and documentation so you can confidently make updates." },
      { question: "Do you provide hosting?", answer: "I can recommend reliable hosting providers and handle the setup, but hosting is typically managed separately for transparency and your control." },
    ],
    startingPrice: "₹14,999",
  },
  {
    slug: "website-development",
    title: "Next.js Website Development",
    shortTitle: "Website Development",
    icon: Globe,
    shortDescription:
      "Modern, high-performance websites and web applications built with Next.js, React, and TypeScript.",
    description:
      "For businesses and projects that need cutting-edge performance, I build modern web applications using Next.js, React, and TypeScript. These websites offer superior speed, SEO capabilities, and scalability compared to traditional platforms.",
    problemsSolved: [
      "Website speed issues affecting user experience and SEO",
      "Need for a modern, app-like web experience",
      "Scaling limitations with traditional CMS platforms",
      "Complex interactive features not possible with page builders",
      "Need for custom web applications and tools",
    ],
    benefits: [
      "Blazing fast page loads with server-side rendering",
      "Superior SEO with server-rendered content",
      "Modern, interactive user experiences",
      "Scalable architecture for growing businesses",
      "Type-safe, maintainable codebase",
    ],
    deliverables: [
      "Custom Next.js website or web application",
      "Responsive design across all devices",
      "SEO optimization and metadata",
      "API integrations",
      "Database design and backend logic",
      "Deployment on Vercel or similar platforms",
      "Documentation and handover",
    ],
    workflow: [
      { step: 1, title: "Requirements", description: "Define project scope, features, and technical requirements." },
      { step: 2, title: "Architecture", description: "Plan the technical architecture, database, and API design." },
      { step: 3, title: "Design & Prototype", description: "Create UI designs and interactive prototypes." },
      { step: 4, title: "Development", description: "Build the application with clean, tested code." },
      { step: 5, title: "Deploy & Launch", description: "Deploy, test, and launch with monitoring and support." },
    ],
    faq: [
      { question: "When should I choose Next.js over WordPress?", answer: "Next.js is ideal when you need superior performance, complex interactivity, custom web applications, or when your project requires capabilities beyond what WordPress can efficiently deliver." },
      { question: "Can you integrate with external APIs?", answer: "Yes, Next.js is excellent for API integrations. I can connect your website to payment gateways, CRMs, analytics tools, and any other third-party services." },
      { question: "How is the website hosted?", answer: "Next.js websites are typically deployed on Vercel, which provides excellent performance, automatic scaling, and a generous free tier for most projects." },
    ],
    startingPrice: "₹24,999",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    icon: Palette,
    shortDescription:
      "User-centered interface design and user experience strategy for websites, apps, and digital products.",
    description:
      "I design intuitive, beautiful digital interfaces that users love. From research and wireframing to high-fidelity prototypes and design systems — I create user experiences that are both visually impressive and functionally effective.",
    problemsSolved: [
      "Confusing navigation causing users to leave",
      "Low conversion rates due to poor user experience",
      "Inconsistent visual design across the product",
      "No clear design system or component library",
      "Mobile experience that feels like an afterthought",
    ],
    benefits: [
      "User-centered design approach",
      "Consistent, scalable design system",
      "Improved user engagement and conversions",
      "Beautiful interfaces that build trust",
      "Responsive designs for all screen sizes",
    ],
    deliverables: [
      "User research and persona development",
      "Wireframes and user flow diagrams",
      "High-fidelity UI mockups",
      "Interactive prototypes",
      "Design system and component library",
      "Responsive design specifications",
      "Developer handover assets",
    ],
    workflow: [
      { step: 1, title: "Research", description: "Understand users, business goals, and competitive landscape." },
      { step: 2, title: "Wireframe", description: "Create low-fidelity wireframes and user flows." },
      { step: 3, title: "Design", description: "Develop high-fidelity UI designs with your brand identity." },
      { step: 4, title: "Prototype", description: "Build interactive prototypes for testing and feedback." },
      { step: 5, title: "Handover", description: "Deliver design assets, specifications, and documentation." },
    ],
    faq: [
      { question: "Which design tools do you use?", answer: "I primarily use Figma for UI/UX design. It allows real-time collaboration and makes the review process smooth and efficient." },
      { question: "Do you conduct user research?", answer: "Yes, I include user research as part of the design process. This can range from competitive analysis to user interviews, depending on the project scope." },
      { question: "Can you work with my development team?", answer: "Absolutely. I provide detailed design specifications and assets that make the development handover seamless." },
    ],
    startingPrice: "₹9,999",
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
