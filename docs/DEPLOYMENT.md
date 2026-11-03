# Deployment & Configuration Guide — NarinderKumar.com

## 1. Prerequisites
- Node.js 18+ (tested on Node v24.15)
- Git repository connected to GitHub
- Vercel account
- Supabase project
- Razorpay and/or Stripe account

---

## 2. Supabase Setup
1. Create a new Supabase project at [https://database.new](https://database.new).
2. Navigate to **SQL Editor** in the Supabase Dashboard.
3. Run the schema migrations in order:
   - Copy and execute `supabase/migrations/001_initial_schema.sql`
   - Copy and execute `supabase/migrations/002_rls_policies.sql`
4. Create a Private Storage Bucket named `product-files`:
   - Set bucket visibility to **Private** (disables public predictable URLs).
   - Upload your digital assets (PDFs, ZIPs) into this bucket.

---

## 3. Vercel Production Deployment
1. Import the repository into Vercel.
2. Select Framework Preset: **Next.js**.
3. Add the production environment variables (from `.env.local.example`):
   - `NEXT_PUBLIC_SITE_URL` = `https://narinderkumar.com`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
   - `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`
4. Click **Deploy**.

---

## 4. Custom Domain & DNS
1. In Vercel Project Settings → Domains:
   - Add `narinderkumar.com`
   - Add `www.narinderkumar.com`
2. Configure DNS records at your registrar:
   - A Record: `@` pointing to `76.76.21.21`
   - CNAME Record: `www` pointing to `cname.vercel-dns.com`
3. SSL certificates will generate automatically via Vercel Edge.
