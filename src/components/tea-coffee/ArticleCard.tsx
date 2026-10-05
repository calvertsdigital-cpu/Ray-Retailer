/**
 * ArticleCard
 * Small article preview card for articles list pages.
 * Displays: cover image, title, excerpt, category badge, read more link.
 */

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { TeaCoffeeArticle } from "@/data/tea-coffee/types";

export interface ArticleCardProps {
  article: TeaCoffeeArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabel = article.category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow">
      {/* Cover image */}
      <Link
        to={`/tea-coffee/articles/${article.slug}`}
        className="relative block overflow-hidden bg-gray-100 pb-[56.25%]"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        {/* Category */}
        <span className="inline-block w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {categoryLabel}
        </span>

        {/* Title */}
        <Link
          to={`/tea-coffee/articles/${article.slug}`}
          className="font-semibold text-gray-900 hover:text-green-700 line-clamp-2"
        >
          {article.title}
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">{article.excerpt}</p>

        {/* Published date */}
        <p className="text-xs text-gray-500">
          {new Date(article.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {/* Read more link */}
        <Link
          to={`/tea-coffee/articles/${article.slug}`}
          className="mt-2 inline-flex items-center gap-1 font-medium text-green-600 hover:text-green-700"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
