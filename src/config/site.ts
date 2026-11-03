export const siteConfig = {
  name: "Narinder Kumar",
  shortName: "NK",
  description:
    "I help businesses and creators grow through creative content, AI-powered solutions, digital experiences and practical digital products.",
  tagline: "Building Digital Experiences. Creating Ideas That Matter.",
  url: "https://narinderkumar.com",
  email: "hello@narinderkumar.com",
  identity: [
    "Digital Creator",
    "Frontend Developer",
    "WordPress Developer",
    "UI/UX Designer",
    "AI Video Creator",
    "Digital Entrepreneur",
  ],
  social: {
    twitter: "https://twitter.com/narinderkumar",
    instagram: "https://instagram.com/narinderkumar",
    linkedin: "https://linkedin.com/in/narinderkumar",
    youtube: "https://youtube.com/@narinderkumar",
    github: "https://github.com/narinderkumar",
  },
  nav: {
    main: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Products", href: "/products" },
      { label: "Tools", href: "/tools" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
    services: [
      { label: "AI UGC Videos", href: "/services/ai-ugc-videos" },
      { label: "Video Production", href: "/services/video-production" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "WordPress Development", href: "/services/wordpress-development" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
    products: [
      { label: "eBooks", href: "/products/ebooks" },
      { label: "Templates", href: "/products/templates" },
      { label: "AI Prompts", href: "/products/prompts" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
    ],
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};
