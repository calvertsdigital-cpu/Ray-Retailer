import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { blogPosts, getPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable | Ray's Healthy Living" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.metaDescription },
        { property: "og:title", content: p.seoTitle },
        { property: "og:description", content: p.metaDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = post.relatedSlugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="border-b border-border bg-cream">
        <div className="container-rhl flex flex-wrap gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/blog" className="hover:text-primary">
            Blog
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>
      </nav>

      <article className="container-rhl section-y max-w-3xl">
        <p className="eyebrow">
          {post.category} · {post.readTime}
        </p>
        <h1 className="heading-1 mt-2">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          By {post.author} ·{" "}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-border bg-secondary p-5 text-sm text-muted-foreground">
          Educational information only. Nothing here diagnoses, treats or cures any condition, and it does not replace
          advice from your licensed healthcare provider.
        </p>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-articles">
            <h2 id="related-articles" className="heading-2">
              Related reading
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r!.slug} className="rounded-xl border border-border bg-card p-5">
                  <p className="eyebrow">{r!.category}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: r!.slug }}
                    className="mt-2 block text-base font-semibold hover:text-primary"
                  >
                    {r!.title}
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground">{r!.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
