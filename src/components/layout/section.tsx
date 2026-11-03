import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "cream" | "dark";
  id?: string;
}

const backgroundStyles = {
  white: "bg-white",
  cream: "bg-warm-cream",
  dark: "bg-charcoal text-white",
};

export function Section({ children, className, background = "white", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", backgroundStyles[background], className)}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", centered && "text-center", className)}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-deep-brown">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg text-muted max-w-2xl", centered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
