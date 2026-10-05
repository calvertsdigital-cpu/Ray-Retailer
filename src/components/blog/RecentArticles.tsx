import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

import type { BlogPost } from "@/data/blog";

interface RecentArticlesProps {
  currentSlug: string;
  posts: BlogPost[];
}

export function RecentArticles({ currentSlug, posts }: RecentArticlesProps) {
  const recent = posts
    .filter((p) => p.slug !== currentSlug && p.published)
    .sort((a, b) => {
      const dateA = a.updatedDate ?? a.date;
      const dateB = b.updatedDate ?? b.date;
      return dateB.localeCompare(dateA);
    })
    .slice(0, 4);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm text-foreground">Recent Articles</h2>
        <Link to="/blog" className="text-xs text-primary hover:underline font-semibold">
          View All →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-xs text-muted-foreground">No other articles yet.</p>
      ) : (
        <ul className="space-y-3">
          {recent.map((post) => {
            const displayDate = (() => {
              try {
                return format(parseISO(post.updatedDate ?? post.date), "MMM d, yyyy");
              } catch {
                return post.date;
              }
            })();

            return (
              <li key={post.slug} className="flex gap-3">
                {/* Thumbnail */}
                {post.featureImageUrl ? (
                  <img
                    loading="lazy"
                    src={post.featureImageUrl}
                    alt={post.featureImageAlt ?? post.title}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-base font-bold text-primary"
                    aria-hidden="true"
                  >
                    {post.title[0]}
                  </div>
                )}
                {/* Content */}
                <div className="min-w-0">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-sm font-semibold hover:text-primary line-clamp-2 leading-snug"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">{displayDate}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
