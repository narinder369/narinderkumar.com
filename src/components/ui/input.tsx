import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal",
            "placeholder:text-muted-light",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-pink/20 focus:border-pink",
            "disabled:opacity-50 disabled:bg-warm-cream disabled:cursor-not-allowed",
            error && "border-error focus:ring-error/20 focus:border-error",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
