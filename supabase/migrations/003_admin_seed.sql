-- ==============================================================================
-- NARINDERKUMAR.COM — Admin Authentication Setup
-- Migration 003: Admin User Seed Instructions
-- ==============================================================================
--
-- This migration contains the SQL to create your admin profile row.
-- The actual auth.users record must be created FIRST via the Supabase Dashboard.
--
-- ╔══════════════════════════════════════════════════════════════════════════════╗
-- ║  STEP-BY-STEP ADMIN ACCOUNT SETUP                                         ║
-- ╠══════════════════════════════════════════════════════════════════════════════╣
-- ║                                                                            ║
-- ║  1. Go to Supabase Dashboard → Authentication → Users                     ║
-- ║  2. Click "Add user" → "Create new user"                                  ║
-- ║  3. Enter your admin email and a strong password                           ║
-- ║  4. Check "Auto Confirm User" so the account is immediately active        ║
-- ║  5. Click "Create User"                                                    ║
-- ║  6. Copy the UUID of the newly created user                               ║
-- ║  7. Replace 'YOUR_SUPABASE_USER_UUID_HERE' below with that UUID           ║
-- ║  8. Replace 'your-admin@email.com' with your actual admin email           ║
-- ║  9. Run this SQL in the Supabase SQL Editor                               ║
-- ║                                                                            ║
-- ╚══════════════════════════════════════════════════════════════════════════════╝

-- Insert admin profile (replace the UUID and email with your actual values)
INSERT INTO public.profiles (id, full_name, email, role)
VALUES (
  'YOUR_SUPABASE_USER_UUID_HERE',   -- ← Replace with actual auth.users UUID
  'Narinder Kumar',                  -- ← Your display name
  'your-admin@email.com',           -- ← Must match the auth.users email
  'admin'                            -- ← This grants admin dashboard access
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin',
    full_name = EXCLUDED.full_name,
    updated_at = timezone('utc'::text, now());

-- Verify: Run this query to confirm the admin profile exists
-- SELECT id, full_name, email, role FROM public.profiles WHERE role = 'admin';
