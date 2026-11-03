import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-black text-white",
  success: "bg-neutral-100 text-black border border-neutral-300",
  warning: "bg-neutral-200 text-black",
  error: "bg-black text-white",
  info: "bg-neutral-100 text-neutral-900 border border-neutral-300",
  outline: "border border-neutral-300 text-neutral-800 bg-white",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
