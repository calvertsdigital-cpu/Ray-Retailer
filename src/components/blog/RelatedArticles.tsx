/**
 * RelatedArticles — 4-column grid of article cards below the article body.
 * Each card: thumbnail, category eyebrow, title, date, link.
 * Matches the mockup "Related Articles" section.
 */
import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

import type { BlogPost } from "@/data/blog";

interface RelatedArticlesProps {
  slugs: string[];
  allPosts: BlogPost[];
}

export function RelatedArticles({ slugs, allPosts }: RelatedArticlesProps) {
  const posts = slugs
    .map((s) => allPosts.find((p) => p.slug === s && p.published))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-articles-heading">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          id="related-articles-heading"
          className="heading-2"
          style={{ color: "var(--foreground)" }}
        >
          Related Articles
        </h2>
        <Link
          to="/blog"
          className="text-sm font-semibold hover:underline hidden sm:inline"
          style={{ color: "var(--primary)" }}
        >
          View All Articles →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {posts.map((post) => {
          const displayDate = (() => {
            try {
              return format(parseISO(post.date), "MMM d, yyyy");
            } catch {
              return post.date;
            }
          })();

          return (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-xl border bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {post.featureImageUrl ? (
                  <img
                    loading="lazy"
                    src={post.featureImageUrl}
                    alt={post.featureImageAlt ?? post.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    width={200}
                    height={150}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-2xl font-bold"
                    style={{ background: "var(--accent)", color: "var(--primary)" }}
                    aria-hidden="true"
                  >
                    {post.title[0]}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3 flex flex-col flex-1">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-sm font-semibold leading-snug hover:underline line-clamp-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {post.title}
                </Link>
                <p className="mt-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {displayDate}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile view all */}
      <div className="mt-4 sm:hidden text-center">
        <Link
          to="/blog"
          className="text-sm font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          View All Articles →
        </Link>
      </div>
    </section>
  );
}
