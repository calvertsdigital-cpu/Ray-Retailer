import { createFileRoute, notFound } from "@tanstack/react-router";

import { getPost, getAllPosts, GLOBAL_DISCLAIMER, ARTICLE_CATEGORIES } from "@/data/blog";

import { Breadcrumbs }          from "@/components/blog/Breadcrumbs";
import { ArticleHeader }         from "@/components/blog/ArticleHeader";
import { FeatureMedia }          from "@/components/blog/FeatureMedia";
import { ArticleBody }           from "@/components/blog/ArticleBody";
import { BottomLineCallout }     from "@/components/blog/BottomLineCallout";
import { RecommendedProducts }   from "@/components/blog/RecommendedProducts";
import { ReferencesAccordion }   from "@/components/blog/ReferencesAccordion";
import { DisclaimerAccordion }   from "@/components/blog/DisclaimerAccordion";
import { RelatedArticles }       from "@/components/blog/RelatedArticles";
import { ArticleCopyrightNotice } from "@/components/blog/ArticleCopyrightNotice";
import { ArticleSidebar }        from "@/components/blog/ArticleSidebar";
import { RecentArticles }        from "@/components/blog/RecentArticles";
import { NewsletterSubscribe }   from "@/components/blog/NewsletterSubscribe";
import { U20XPromo }             from "@/components/blog/U20XPromo";
import { TopicExplorer }         from "@/components/blog/TopicExplorer";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable | Ray's Healthy Living" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      datePublished: p.date,
      ...(p.updatedDate ? { dateModified: p.updatedDate } : {}),
      author: { "@type": "Person", name: p.author },
      publisher: {
        "@type": "Organization",
        name: "Ray's Healthy Living",
        url: "https://rayshealthyliving.com",
      },
      ...(p.featureImageUrl ? { image: p.featureImageUrl } : {}),
      description: p.metaDescription,
    });

    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.metaDescription },
        { property: "og:title", content: p.seoTitle },
        { property: "og:description", content: p.metaDescription },
        { property: "og:type", content: "article" },
        ...(p.featureImageUrl
          ? [{ property: "og:image", content: p.featureImageUrl }]
          : []),
        { property: "article:published_time", content: p.date },
        { property: "article:author", content: p.author },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd,
        },
      ],
    };
  },

  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const allPosts = getAllPosts();
  const relatedSlugs = post.relatedArticleSlugs ?? post.relatedSlugs ?? [];

  return (
    <>
      {/* ── Breadcrumbs — full-width above layout ── */}
      <Breadcrumbs category={post.category} articleTitle={post.title} />

      {/* ── Two-column wrapper ── */}
      <div className="container-rhl section-y">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

          {/* ════════════════════════════════════════
              LEFT — main article content (~70%)
          ════════════════════════════════════════ */}
          <article className="min-w-0 flex-1">

            <ArticleHeader
              category={post.category}
              categoryIcon={post.categoryIcon}
              title={post.title}
              subtitle={post.subtitle}
              author={post.author}
              authorAvatar={post.authorAvatar}
              authorBrandLine={post.authorBrandLine}
              date={post.date}
              updatedDate={post.updatedDate}
              readTime={post.readTime}
            />

            {/* Hero image */}
            {post.featureImageUrl && (
              <FeatureMedia
                src={post.featureImageUrl}
                alt={post.featureImageAlt ?? post.title}
                overlayText={post.featureOverlayText}
              />
            )}

            {/* Article body — structured sections or legacy paragraphs */}
            <ArticleBody sections={post.sections} legacyBody={post.body} />

            {/* Bottom Line callout */}
            {post.bottomLine && <BottomLineCallout text={post.bottomLine} />}

            {/* ── Recommended Products — full-width strip ── */}
            {post.recommendedProducts && post.recommendedProducts.length > 0 && (
              <RecommendedProducts
                products={post.recommendedProducts}
                categoryLabel={post.category}
              />
            )}

            {/* References & Disclaimer (side-by-side on md+, stacked on mobile) */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ReferencesAccordion references={post.references ?? []} />
              <DisclaimerAccordion text={GLOBAL_DISCLAIMER} />
            </div>

            {/* Related Articles */}
            <RelatedArticles slugs={relatedSlugs} allPosts={allPosts} />

            {/* Copyright notice */}
            <ArticleCopyrightNotice />
          </article>

          {/* ════════════════════════════════════════
              RIGHT — sticky sidebar (~30%), desktop only
          ════════════════════════════════════════ */}
          <aside
            className="hidden lg:block w-80 xl:w-96 shrink-0"
            aria-label="Article sidebar"
          >
            <div className="sticky top-28">
              <ArticleSidebar post={post} allPosts={allPosts} />
            </div>
          </aside>
        </div>

        {/* ── MOBILE sidebar modules — after article, correct spec order ── */}
        <div className="mt-10 flex flex-col gap-6 lg:hidden">
          <U20XPromo ctaPath={post.u20xChallengePath ?? "/health-concerns"} />
          <NewsletterSubscribe />
          <RecentArticles currentSlug={post.slug} posts={allPosts} />
          <TopicExplorer categories={ARTICLE_CATEGORIES} />
        </div>
      </div>
    </>
  );
}
