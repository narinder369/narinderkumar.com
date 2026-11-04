-- ==============================================================================
-- NARINDERKUMAR.COM — Admin Authentication Setup
-- Migration 003: Admin User Seed & Profile Initialization
-- ==============================================================================

-- 1. Ensure the profiles table exists (in case Migration 001 was not run yet)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'editor')),
    phone TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Ensure self-access policy exists on profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'profiles' 
      AND policyname = 'Users can view and update their own profile'
  ) THEN
    CREATE POLICY "Users can view and update their own profile"
      ON public.profiles FOR ALL
      USING (auth.uid() = id);
  END IF;
END $$;

-- 4. INSERT OR UPDATE YOUR ADMIN PROFILE
-- Replace 'YOUR_SUPABASE_USER_UUID_HERE' with the UUID from Authentication → Users
-- Replace 'your-admin@email.com' with the exact email used to sign up
INSERT INTO public.profiles (id, full_name, email, role)
VALUES (
  'YOUR_SUPABASE_USER_UUID_HERE',   -- ← Paste actual auth.users UUID here
  'Narinder Kumar',                  -- ← Your display name
  'your-admin@email.com',           -- ← Must match the user's email in Supabase
  'admin'                            -- ← Role granting admin access
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin',
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());

-- 5. Verification Query: Confirm the admin profile was created
-- SELECT id, full_name, email, role FROM public.profiles WHERE role = 'admin';
