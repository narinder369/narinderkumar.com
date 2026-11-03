"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const count = counts ? counts[category] : undefined;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer",
              isActive
                ? "bg-deep-brown text-white shadow-sm ring-2 ring-deep-brown/20"
                : "bg-white text-muted hover:text-charcoal hover:bg-warm-cream border border-border"
            )}
            aria-pressed={isActive}
          >
            <span>{category}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-charcoal/5 text-muted"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
