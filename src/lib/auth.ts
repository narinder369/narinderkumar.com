import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

/**
 * Verify the current session belongs to an authenticated admin.
 * If not authenticated or not an admin, redirect to /admin/login.
 *
 * Call this at the top of any admin Server Component or layout.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured yet or has placeholders:
  if (!url || !anonKey || url.includes("your-project")) {
    redirect("/admin/login?error=not_configured");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    // Not an admin — sign them out and redirect
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    role: profile.role,
  };
}

/**
 * Light check — returns the admin user if authenticated, or null.
 * Does NOT redirect. Useful for conditional rendering.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("your-project")) {
    return null;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") return null;

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    role: profile.role,
  };
}
