import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  variant?: "default" | "elevated" | "bordered" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-white",
  elevated: "bg-white shadow-md",
  bordered: "bg-white border border-border",
  interactive: "bg-white border border-border hover:border-pink/30 hover:shadow-md transition-all duration-150",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ className, children, variant = "bordered", padding = "md" }: CardProps) {
  return (
    <div className={cn("rounded-xl", variantStyles[variant], paddingStyles[padding], className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn("text-lg font-semibold font-heading text-charcoal", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-sm text-muted mt-1", className)}>{children}</p>;
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mt-4 pt-4 border-t border-border", className)}>{children}</div>;
}
