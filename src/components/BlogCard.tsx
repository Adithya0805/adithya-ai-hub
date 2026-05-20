import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { TagBadge } from "@/components/TagBadge";
import type { Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

const categoryGradients: Record<string, string> = {
  "Machine Learning": "from-cyan-500/20 to-blue-600/10",
  "Interview Prep": "from-purple-500/20 to-indigo-600/10",
  "Career": "from-green-500/20 to-teal-600/10",
  "AWS": "from-orange-500/20 to-amber-600/10",
  "Python": "from-yellow-500/20 to-orange-600/10",
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const gradient = categoryGradients[post.category] ?? "from-primary/20 to-accent/10";

  if (featured) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-elegant transition-smooth flex flex-col"
      >
        {/* Thumbnail */}
        <div className={`aspect-[16/9] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <TagBadge tag={post.category} />
            {post.featured && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground font-semibold">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h2 className="font-semibold text-base leading-snug group-hover:text-primary transition-smooth line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-smooth"
    >
      {/* Mini thumbnail */}
      <div
        className={`w-20 h-20 rounded-lg bg-gradient-to-br ${gradient} flex-shrink-0 relative overflow-hidden`}
      >
        <div className="absolute inset-0 grid-bg opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <TagBadge tag={post.category} small />
        </div>
        <h3 className="mt-1 text-sm font-semibold line-clamp-2 group-hover:text-primary transition-smooth">
          {post.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>{post.readTime} read</span>
          <span>·</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
