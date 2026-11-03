import Link from "next/link";
import { ArrowUpRight, Sparkles, Video, Globe, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PortfolioProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: PortfolioProject;
  className?: string;
}

const categoryIcons = {
  "AI Videos": Sparkles,
  "Video Production": Video,
  "Web Design": Globe,
  "UI/UX": Palette,
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const Icon = categoryIcons[project.category] || Globe;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-white overflow-hidden transition-all duration-200 hover:border-pink/40 hover:shadow-lg",
        className
      )}
    >
      {/* Visual Thumbnail Area */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="relative block h-56 w-full overflow-hidden focus:outline-none"
        aria-label={`View project details for ${project.title}`}
      >
        <div
          className={cn(
            "relative w-full h-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
            project.gradient
          )}
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:16px_16px]" />

          {/* Central Category Icon & Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
              {project.category}
            </span>
          </div>

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-deep-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-deep-brown text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              Explore Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <Badge
            variant={
              project.category === "AI Videos"
                ? "info"
                : project.category === "UI/UX"
                ? "success"
                : "default"
            }
          >
            {project.category}
          </Badge>
          <span className="text-xs font-medium text-muted">
            {project.date}
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading text-charcoal group-hover:text-deep-brown transition-colors">
          <Link href={`/portfolio/${project.slug}`} className="focus:outline-none">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        {/* Tools used */}
        <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
          {project.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="inline-block px-2 py-0.5 text-[11px] font-medium text-muted bg-warm-cream rounded border border-border/50"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="inline-block px-2 py-0.5 text-[11px] font-medium text-muted bg-charcoal/5 rounded">
              +{project.tools.length - 4}
            </span>
          )}
        </div>

        {/* Card Footer Link */}
        <div className="mt-5 pt-3 flex items-center justify-between">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-brown hover:text-pink transition-colors group/link"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
