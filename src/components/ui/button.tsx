import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-800 shadow-sm transition-all duration-200",
  secondary:
    "bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-200 transition-all duration-200",
  outline:
    "border border-black text-black bg-transparent hover:bg-black hover:text-white transition-all duration-200",
  ghost:
    "text-black hover:bg-neutral-100 transition-colors",
  destructive:
    "bg-black text-white hover:bg-neutral-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs font-semibold uppercase tracking-wider",
  md: "px-6 py-2.5 text-xs font-semibold uppercase tracking-wider",
  lg: "px-8 py-3.5 text-sm font-bold uppercase tracking-wider",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full transition-all ease-in-out cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
