import { createFileRoute, notFound } from "@tanstack/react-router";

import { blogPosts, getPost, GLOBAL_DISCLAIMER, ARTICLE_CATEGORIES } from "@/data/blog";

import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { FeatureMedia } from "@/components/blog/FeatureMedia";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BottomLineCallout } from "@/components/blog/BottomLineCallout";
import { RecommendedProducts } from "@/components/blog/RecommendedProducts";
import { ReferencesAccordion } from "@/components/blog/ReferencesAccordion";
import { DisclaimerAccordion } from "@/components/blog/DisclaimerAccordion";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ArticleCopyrightNotice } from "@/components/blog/ArticleCopyrightNotice";
import { ArticleSidebar } from "@/components/blog/ArticleSidebar";
import { RecentArticles } from "@/components/blog/RecentArticles";
import { NewsletterSubscribe } from "@/components/blog/NewsletterSubscribe";
import { U20XPromo } from "@/components/blog/U20XPromo";
import { TopicExplorer } from "@/components/blog/TopicExplorer";

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
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  const relatedSlugs =
    post.relatedArticleSlugs ?? post.relatedSlugs ?? [];

  return (
    <>
      {/* Breadcrumbs — full width above the two-column layout */}
      <Breadcrumbs
        category={post.category}
        categorySlug={post.categorySlug ?? ""}
        articleTitle={post.title}
      />

      <div className="container-rhl section-y">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── LEFT: main article column ── */}
          <article className="min-w-0 lg:w-[70%]">
            <ArticleHeader
              category={post.category}
              categorySlug={post.categorySlug ?? ""}
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

            {post.featureImageUrl && (
              <FeatureMedia
                src={post.featureImageUrl}
                alt={post.featureImageAlt ?? post.title}
              />
            )}

            <ArticleBody
              sections={post.sections}
              legacyBody={post.body}
            />

            {post.bottomLine && (
              <BottomLineCallout text={post.bottomLine} />
            )}

            {post.recommendedProductSlugs && post.recommendedProductSlugs.length > 0 && (
              <RecommendedProducts
                productSlugs={post.recommendedProductSlugs}
                categoryLabel={post.category}
              />
            )}

            <ReferencesAccordion references={post.references ?? []} />
            <DisclaimerAccordion text={GLOBAL_DISCLAIMER} />

            <RelatedArticles slugs={relatedSlugs} allPosts={blogPosts} />

            <ArticleCopyrightNotice />
          </article>

          {/* ── RIGHT: sticky sidebar (desktop only) ── */}
          <div className="hidden lg:block lg:w-[30%] lg:shrink-0">
            <div className="sticky top-24">
              <ArticleSidebar post={post} allPosts={blogPosts} />
            </div>
          </div>
        </div>

        {/* ── MOBILE sidebar modules — below article, correct order per spec ── */}
        <div className="lg:hidden mt-10 flex flex-col gap-6">
          <U20XPromo ctaPath={post.u20xChallengePath ?? "/u20x"} />
          <NewsletterSubscribe />
          <RecentArticles currentSlug={post.slug} posts={blogPosts} />
          <TopicExplorer categories={ARTICLE_CATEGORIES} />
        </div>
      </div>
    </>
  );
}
