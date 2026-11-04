import { blogArticles, type BlogPost } from "@/lib/blog-data";
import { products, type Product } from "@/lib/products-data";
import { siteConfig } from "@/config/site";

export interface AdminBlogPost extends BlogPost {
  id: string;
  status: "published" | "draft" | "archived";
  updatedAt?: string;
}

export interface AdminProduct extends Product {
  status: "published" | "draft" | "archived";
  filePath?: string;
  salesCount?: number;
}

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: "New" | "In Discussion" | "Replied" | "Closed";
  adminNotes?: string;
  date: string;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  gateway: "Razorpay" | "Stripe";
  status: "Paid" | "Pending" | "Refunded";
  date: string;
  transactionId?: string;
}

export interface AdminSettings {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
  description: string;
  razorpayKeyId: string;
  stripePublishableKey: string;
  gaMeasurementId: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}

// Initial Mock Seeding
const initialPosts: AdminBlogPost[] = blogArticles.map((article, index) => ({
  ...article,
  id: `post-${index + 1}`,
  status: "published",
  updatedAt: article.date,
}));

const initialProducts: AdminProduct[] = products.map((product) => ({
  ...product,
  status: "published",
  filePath: `product-files/${product.slug}.zip`,
  salesCount: Math.floor(Math.random() * 40) + 12,
}));

const initialInquiries: AdminInquiry[] = [
  {
    id: "inq-1",
    name: "Apex Health Clinic",
    email: "info@apexhealth.in",
    phone: "+91 98765 43210",
    company: "Apex Healthcare Pvt Ltd",
    service: "AI UGC Video Campaign",
    budget: "₹50K-1L",
    message: "We want 10 AI patient testimonial and informative short videos for Instagram Reels with dynamic captions.",
    status: "New",
    adminNotes: "Client requested follow-up on Friday afternoon. High intent lead.",
    date: "Nov 02, 2026",
  },
  {
    id: "inq-2",
    name: "Zenith SaaS",
    email: "founders@zenith.io",
    phone: "+1 (415) 555-0199",
    company: "Zenith Software",
    service: "Next.js Web Redesign",
    budget: "₹75K+",
    message: "Migrating our marketing site to Next.js with high Core Web Vitals score and Supabase backend. Need high-converting landing pages.",
    status: "In Discussion",
    adminNotes: "Sent proposal draft with 3 design options.",
    date: "Nov 01, 2026",
  },
  {
    id: "inq-3",
    name: "Urban Flavors Restaurant",
    email: "urbanflavors@gmail.com",
    phone: "+91 98111 22334",
    company: "Urban Flavors Hospitality",
    service: "Short-Form Video Production",
    budget: "₹25K-50K",
    message: "Need weekly Reels and Shorts production for our 3 dining locations in Delhi NCR.",
    status: "Replied",
    adminNotes: "Waiting for menu asset photos.",
    date: "Oct 28, 2026",
  },
  {
    id: "inq-4",
    name: "Elena Rostova",
    email: "elena@creatorhub.co",
    service: "WordPress Development",
    budget: "₹40K-70K",
    message: "Custom JetEngine directory and membership portal setup for European design agency network.",
    status: "Closed",
    adminNotes: "Project signed off and delivered.",
    date: "Oct 22, 2026",
  },
];

const initialOrders: AdminOrder[] = [
  {
    id: "NK-M481A",
    customer: "Vikram Mehta",
    email: "vikram@example.com",
    product: "AI Prompt Engineering Playbook",
    amount: 499,
    gateway: "Razorpay",
    status: "Paid",
    date: "Nov 03, 2026",
    transactionId: "pay_Rzp9041284",
  },
  {
    id: "NK-L992B",
    customer: "Ananya Sharma",
    email: "ananya@agency.in",
    product: "Viral Short-Form Video Hooks & Scripts",
    amount: 799,
    gateway: "Razorpay",
    status: "Paid",
    date: "Nov 02, 2026",
    transactionId: "pay_Rzp8841920",
  },
  {
    id: "NK-K331C",
    customer: "Rohan Patel",
    email: "rohan@startup.co",
    product: "Next.js Digital Business Pro Template",
    amount: 1999,
    gateway: "Razorpay",
    status: "Paid",
    date: "Nov 01, 2026",
    transactionId: "pay_Rzp7120481",
  },
  {
    id: "NK-J102D",
    customer: "David Chen",
    email: "david@chen.io",
    product: "WordPress & JetEngine Dynamic Blueprint",
    amount: 699,
    gateway: "Stripe",
    status: "Paid",
    date: "Oct 30, 2026",
    transactionId: "ch_3Pz9Kl2eZvKYlo2C",
  },
  {
    id: "NK-H711E",
    customer: "Aarav Gupta",
    email: "aarav@guptamedia.com",
    product: "YouTube Creator Growth Toolkit",
    amount: 599,
    gateway: "Razorpay",
    status: "Paid",
    date: "Oct 27, 2026",
    transactionId: "pay_Rzp6401923",
  },
];

const initialSettings: AdminSettings = {
  brandName: siteConfig.name,
  tagline: siteConfig.tagline,
  email: siteConfig.email,
  phone: "+91 98765 00000",
  description: siteConfig.description,
  razorpayKeyId: "rzp_live_key_sample",
  stripePublishableKey: "pk_live_key_sample",
  gaMeasurementId: "G-43CE14BHF1",
  twitter: siteConfig.social.twitter,
  linkedin: siteConfig.social.linkedin,
  youtube: siteConfig.social.youtube,
  instagram: siteConfig.social.instagram,
};

// Storage Keys
const STORAGE_KEYS = {
  POSTS: "nk_admin_posts_v1",
  PRODUCTS: "nk_admin_products_v1",
  INQUIRIES: "nk_admin_inquiries_v1",
  ORDERS: "nk_admin_orders_v1",
  SETTINGS: "nk_admin_settings_v1",
};

// Safe Local Storage Helpers
function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// Exportable Store API
export const adminStore = {
  // --- BLOG POSTS ---
  getPosts(): AdminBlogPost[] {
    return readStorage<AdminBlogPost[]>(STORAGE_KEYS.POSTS, initialPosts);
  },

  getPostBySlug(slug: string): AdminBlogPost | undefined {
    const posts = this.getPosts();
    return posts.find((p) => p.slug === slug);
  },

  savePost(post: Partial<AdminBlogPost> & { title: string; slug: string }): AdminBlogPost {
    const posts = this.getPosts();
    const existingIndex = posts.findIndex((p) => p.slug === post.slug || (post.id && p.id === post.id));

    let savedPost: AdminBlogPost;
    const nowStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (existingIndex >= 0) {
      savedPost = {
        ...posts[existingIndex],
        ...post,
        updatedAt: nowStr,
      } as AdminBlogPost;
      posts[existingIndex] = savedPost;
    } else {
      savedPost = {
        id: post.id || `post-${Date.now()}`,
        slug: post.slug,
        title: post.title,
        category: post.category || "General",
        excerpt: post.excerpt || "",
        content: post.content || "",
        date: nowStr,
        readingTime: post.readingTime || Math.max(1, Math.ceil((post.content?.split(/\s+/).length || 0) / 200)),
        gradient: post.gradient || "from-neutral-200 to-neutral-400",
        author: post.author || {
          name: "Narinder Kumar",
          role: "Digital Entrepreneur",
        },
        tags: post.tags || ["Article"],
        status: post.status || "published",
        updatedAt: nowStr,
      };
      posts.unshift(savedPost);
    }

    writeStorage(STORAGE_KEYS.POSTS, posts);
    return savedPost;
  },

  deletePost(slug: string): void {
    const posts = this.getPosts().filter((p) => p.slug !== slug);
    writeStorage(STORAGE_KEYS.POSTS, posts);
  },

  togglePostStatus(slug: string): AdminBlogPost | null {
    const posts = this.getPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return null;
    post.status = post.status === "published" ? "draft" : "published";
    writeStorage(STORAGE_KEYS.POSTS, posts);
    return post;
  },

  // --- PRODUCTS ---
  getProducts(): AdminProduct[] {
    return readStorage<AdminProduct[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  },

  saveProduct(product: Partial<AdminProduct> & { title: string; slug: string }): AdminProduct {
    const productsList = this.getProducts();
    const existingIndex = productsList.findIndex(
      (p) => p.slug === product.slug || (product.id && p.id === product.id)
    );

    let saved: AdminProduct;
    if (existingIndex >= 0) {
      saved = {
        ...productsList[existingIndex],
        ...product,
      } as AdminProduct;
      productsList[existingIndex] = saved;
    } else {
      saved = {
        id: product.id || `prod-${Date.now()}`,
        slug: product.slug,
        title: product.title,
        category: product.category || "eBooks",
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        price: Number(product.price) || 499,
        discountPrice: product.discountPrice ? Number(product.discountPrice) : undefined,
        featured: !!product.featured,
        coverGradient: "from-neutral-100 to-neutral-300",
        benefits: product.benefits || ["Instant access", "High quality assets"],
        features: product.features || ["Direct download", "Free updates"],
        contents: product.contents || ["Digital package files"],
        fileFormat: product.fileFormat || "ZIP",
        fileSize: product.fileSize || "15 MB",
        faq: product.faq || [],
        status: product.status || "published",
        filePath: product.filePath || `product-files/${product.slug}.zip`,
        salesCount: 0,
      };
      productsList.unshift(saved);
    }

    writeStorage(STORAGE_KEYS.PRODUCTS, productsList);
    return saved;
  },

  deleteProduct(id: string): void {
    const productsList = this.getProducts().filter((p) => p.id !== id);
    writeStorage(STORAGE_KEYS.PRODUCTS, productsList);
  },

  toggleProductStatus(id: string): AdminProduct | null {
    const productsList = this.getProducts();
    const prod = productsList.find((p) => p.id === id);
    if (!prod) return null;
    prod.status = prod.status === "published" ? "draft" : "published";
    writeStorage(STORAGE_KEYS.PRODUCTS, productsList);
    return prod;
  },

  // --- INQUIRIES ---
  getInquiries(): AdminInquiry[] {
    return readStorage<AdminInquiry[]>(STORAGE_KEYS.INQUIRIES, initialInquiries);
  },

  updateInquiryStatus(id: string, status: AdminInquiry["status"]): void {
    const list = this.getInquiries();
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status;
      writeStorage(STORAGE_KEYS.INQUIRIES, list);
    }
  },

  updateInquiryNotes(id: string, notes: string): void {
    const list = this.getInquiries();
    const item = list.find((i) => i.id === id);
    if (item) {
      item.adminNotes = notes;
      writeStorage(STORAGE_KEYS.INQUIRIES, list);
    }
  },

  deleteInquiry(id: string): void {
    const list = this.getInquiries().filter((i) => i.id !== id);
    writeStorage(STORAGE_KEYS.INQUIRIES, list);
  },

  // --- ORDERS ---
  getOrders(): AdminOrder[] {
    return readStorage<AdminOrder[]>(STORAGE_KEYS.ORDERS, initialOrders);
  },

  updateOrderStatus(id: string, status: AdminOrder["status"]): void {
    const list = this.getOrders();
    const item = list.find((o) => o.id === id);
    if (item) {
      item.status = status;
      writeStorage(STORAGE_KEYS.ORDERS, list);
    }
  },

  // --- SETTINGS ---
  getSettings(): AdminSettings {
    return readStorage<AdminSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  saveSettings(settings: Partial<AdminSettings>): AdminSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    writeStorage(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },
};
