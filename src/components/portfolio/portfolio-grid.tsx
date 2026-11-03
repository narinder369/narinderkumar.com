"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/portfolio/category-filter";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  PORTFOLIO_CATEGORIES,
  PortfolioCategory,
  PortfolioProject,
} from "@/lib/portfolio-data";
import { Sparkles } from "lucide-react";

interface PortfolioGridProps {
  initialProjects: PortfolioProject[];
}

export function PortfolioGrid({ initialProjects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: initialProjects.length };
    initialProjects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return initialProjects;
    return initialProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [initialProjects, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Category filter tabs */}
      <div className="flex justify-center">
        <CategoryFilter
          categories={PORTFOLIO_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={counts}
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl border border-dashed border-border bg-warm-cream/50">
          <div className="w-12 h-12 rounded-full bg-deep-brown/5 flex items-center justify-center mx-auto mb-3 text-deep-brown">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold font-heading text-charcoal">
            No projects in this category yet
          </h3>
          <p className="mt-1 text-sm text-muted">
            New case studies and creative assets are regularly added. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
