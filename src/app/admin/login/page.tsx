"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/app/actions/auth";
import { ShieldCheck, Eye, EyeOff, Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormInner() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";
  const urlError = searchParams.get("error");

  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    loginAction,
    undefined
  );

  const [showPassword, setShowPassword] = useState(false);

  const errorMessage =
    state?.error ||
    (urlError === "unauthorized"
      ? "Access denied. Your account does not have administrator privileges."
      : urlError === "not_configured"
      ? "Supabase is not configured yet. Add your live NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to sign in."
      : null);

  return (
    <div className="w-full max-w-md mx-auto px-6 py-10">
      {/* Return to website */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to NarinderKumar.com</span>
        </Link>
      </div>

      {/* Logo & Branding */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-black mb-5 shadow-2xl">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-black font-heading tracking-tight text-white">
          NK<span className="text-neutral-500">.</span> Admin
        </h1>
        <p className="text-xs text-neutral-400 mt-2 font-medium">
          Protected Administrator Operations Console
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white mb-0.5">
              Notice
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form action={formAction} className="space-y-5">
        {/* Hidden redirect field */}
        <input type="hidden" name="redirect" value={redirectTo} />

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2"
          >
            Administrator Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@narinderkumar.com"
              disabled={isPending}
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-600 font-medium focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              disabled={isPending}
              className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-600 font-medium focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2 flex items-center justify-center gap-2 shadow-lg"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <span>Sign In to Console</span>
          )}
        </button>
      </form>

      {/* Footer Security Badges */}
      <div className="mt-12 text-center border-t border-neutral-900 pt-6">
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-semibold">
          Protected Platform • Supabase Auth • Role-Based RLS Verified
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto px-6 text-center">
          <div className="animate-pulse text-neutral-500 text-sm font-medium">
            Loading secure login...
          </div>
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
