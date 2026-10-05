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
      <p className="mt-3 max-w-2xl" style={{ color: "var(--muted-foreground)" }}>
        Educational reading only — nothing here diagnoses, treats or replaces care from your own health professional.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-card"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Feature image thumbnail */}
            {post.featureImageUrl ? (
              <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img
                  loading="lazy"
                  src={post.featureImageUrl}
                  alt={post.featureImageAlt ?? post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  width={600}
                  height={338}
                />
              </div>
            ) : (
              <div
                className="aspect-[16/9] w-full flex items-center justify-center text-4xl font-bold"
                style={{ background: "var(--accent)", color: "var(--primary)" }}
                aria-hidden="true"
              >
                {post.title[0]}
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              <p className="eyebrow">
                {post.category} · {post.readTime}
              </p>
              <h2 className="mt-2 text-base font-semibold leading-snug">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "var(--muted-foreground)" }}>
                {post.excerpt}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-4 text-sm font-semibold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-10 rounded-xl border p-6"
        style={{ backgroundColor: "var(--secondary)", borderColor: "var(--border)" }}
      >
        <h2 className="heading-2">Looking for support with something specific?</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Our health concern guides walk through symptoms, causes, recommended support and a daily routine.
        </p>
        <Link
          to="/health-concerns"
          className="mt-4 inline-block text-sm font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Explore health concerns →
        </Link>
      </div>
    </div>
  );
}
