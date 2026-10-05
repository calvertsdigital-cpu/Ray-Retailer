import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

import type { BlogPost } from "@/data/blog";

interface RelatedArticlesProps {
  slugs: string[];
  allPosts: BlogPost[];
}

export function RelatedArticles({ slugs, allPosts }: RelatedArticlesProps) {
  const related = slugs
    .map((s) => allPosts.find((p) => p.slug === s && p.published))
    .filter((p): p is BlogPost => Boolean(p));

  if (related.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-articles-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="related-articles-heading" className="heading-2">
          Related Articles
        </h2>
        <Link to="/blog" className="text-sm text-primary hover:underline font-semibold">
          View All Articles →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {related.map((post) => {
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
              className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
            >
              {/* Feature image */}
              {post.featureImageUrl ? (
                <img
                  loading="lazy"
                  src={post.featureImageUrl}
                  alt={post.featureImageAlt ?? post.title}
                  className="w-full aspect-[16/9] object-cover"
                  width={400}
                  height={225}
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-accent flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary/40">{post.title[0]}</span>
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-sm font-semibold hover:text-primary line-clamp-2 leading-snug"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{displayDate}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
