/**
 * RecentArticles sidebar module — 4-5 compact list items, each with a
 * 48×48 thumbnail, title and formatted date. Excludes the current article.
 * Matches mockup exactly.
 */
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
      const da = a.updatedDate ?? a.date;
      const db = b.updatedDate ?? b.date;
      return db.localeCompare(da);
    })
    .slice(0, 5);

  return (
    <div
      className="rounded-xl border bg-white p-5"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
          Recent Articles
        </h2>
        <Link
          to="/blog"
          className="text-xs font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          View All →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          No other articles yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {recent.map((post) => {
            const displayDate = (() => {
              try {
                return format(parseISO(post.updatedDate ?? post.date), "MMM d, yyyy");
              } catch {
                return post.date;
              }
            })();

            return (
              <li key={post.slug} className="flex gap-3 items-start">
                {/* Thumbnail */}
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {post.featureImageUrl ? (
                    <img
                      loading="lazy"
                      src={post.featureImageUrl}
                      alt={post.featureImageAlt ?? post.title}
                      className="h-full w-full object-cover"
                      width={56}
                      height={56}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-lg font-bold"
                      style={{ background: "var(--accent)", color: "var(--primary)" }}
                      aria-hidden="true"
                    >
                      {post.title[0]}
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-sm font-semibold leading-snug hover:underline line-clamp-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {displayDate}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
