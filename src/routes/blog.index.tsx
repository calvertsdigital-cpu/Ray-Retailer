import { createFileRoute, Link } from "@tanstack/react-router";

import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Wellness Education & Blog | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Plain-English wellness education from Ray's Healthy Living: herbs, daily routines, sleep, energy and understanding your body.",
      },
      { property: "og:title", content: "Wellness Education | Ray's Healthy Living" },
      { property: "og:description", content: "Plain-English articles on herbs, routines and everyday wellbeing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = blogPosts.filter((p) => p.published);

  return (
    <div className="container-rhl section-y">
      <p className="eyebrow mb-2">Education first</p>
      <h1 className="heading-1">Understand your wellness</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Educational reading only — nothing here diagnoses, treats or replaces care from your own health professional.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="eyebrow">
              {post.category} · {post.readTime}
            </p>
            <h2 className="mt-2 text-lg font-semibold">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-secondary p-6">
        <h2 className="heading-2">Looking for support with something specific?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Our health concern guides walk through symptoms, causes, recommended support and a daily routine.
        </p>
        <Link to="/health-concerns" className="mt-4 inline-block text-sm font-semibold text-primary">
          Explore health concerns →
        </Link>
      </div>
    </div>
  );
}
