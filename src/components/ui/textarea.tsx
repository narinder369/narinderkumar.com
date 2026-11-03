import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal min-h-[120px] resize-y",
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

Textarea.displayName = "Textarea";
