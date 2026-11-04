"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  success?: boolean;
} | undefined;

/**
 * Server Action: Sign in with email & password via Supabase Auth.
 * On success, redirect to /admin dashboard.
 * On failure, return an error message to the login form.
 */
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("your-project")) {
    return {
      error:
        "Supabase credentials are not configured in .env.local yet. Please configure your live NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message || "Invalid email or password. Access denied." };
  }

  // Verify this user has the 'admin' role in the profiles table
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication failed. Please try again." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    // Sign them out immediately — they are not an admin
    await supabase.auth.signOut();
    return {
      error: "Access denied. Your account does not have administrator privileges.",
    };
  }

  redirect("/admin");
}

/**
 * Server Action: Sign out and redirect to the login page.
 */
export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
