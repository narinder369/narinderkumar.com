-- ==============================================================================
-- NARINDERKUMAR.COM — Row Level Security (RLS) Policies
-- Migration 002: Security Boundaries & Authorization Guards
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PUBLIC READ POLICIES
CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Public can view product categories"
  ON public.product_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Public can view published portfolio projects"
  ON public.portfolio_projects FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Public can view published blog posts"
  ON public.posts FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Public can view post categories"
  ON public.post_categories FOR SELECT
  USING (true);

CREATE POLICY "Public can view approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved' OR public.is_admin());

-- 2. PUBLIC WRITE POLICIES
CREATE POLICY "Public can submit project inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can subscribe to newsletter"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

-- 3. AUTHENTICATED USER POLICIES (OWN DATA)
CREATE POLICY "Users can view and update their own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = customer_id OR public.is_admin());

CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "Users can view their own entitlements"
  ON public.entitlements FOR SELECT
  USING (auth.uid() = customer_id OR public.is_admin());

-- 4. PRIVATE ASSETS (PRODUCT FILES & PAYMENTS)
-- Regular users CANNOT read product_files directly. Only service_role can generate signed URLs!
CREATE POLICY "Only admins and service role can access product files"
  ON public.product_files FOR ALL
  USING (public.is_admin());

CREATE POLICY "Only admins and service role can view payments"
  ON public.payments FOR ALL
  USING (public.is_admin());
