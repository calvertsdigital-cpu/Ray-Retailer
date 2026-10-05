import type { BlogPost } from "@/data/blog";
import { ARTICLE_CATEGORIES } from "@/data/blog";

import { RecentArticles } from "./RecentArticles";
import { NewsletterSubscribe } from "./NewsletterSubscribe";
import { U20XPromo } from "./U20XPromo";
import { TopicExplorer } from "./TopicExplorer";

interface ArticleSidebarProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export function ArticleSidebar({ post, allPosts }: ArticleSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      <RecentArticles currentSlug={post.slug} posts={allPosts} />
      <NewsletterSubscribe />
      <U20XPromo ctaPath={post.u20xChallengePath ?? "/u20x"} />
      <TopicExplorer categories={ARTICLE_CATEGORIES} />
    </aside>
  );
}
