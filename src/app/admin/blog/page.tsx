import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogArticles } from "@/lib/blog-data";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-charcoal">
            Articles & Content Hub
          </h1>
          <p className="text-sm text-muted">
            Draft, edit, and publish technical guides, tutorials, and insights.
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Write Article
        </Button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {blogArticles.map((article) => (
            <div key={article.slug} className="p-5 flex items-center justify-between hover:bg-warm-cream/20 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="info" className="text-[10px]">{article.category}</Badge>
                  <span className="text-xs text-muted">{article.date}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-charcoal">
                  {article.title}
                </h3>
                <p className="text-xs text-muted mt-1 truncate max-w-lg">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/blog/${article.slug}`} target="_blank" className="p-2 text-muted hover:text-charcoal">
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button className="p-2 text-muted hover:text-pink">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
