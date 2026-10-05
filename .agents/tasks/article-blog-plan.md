# Implementation Plan — RHL Article / Blog Post Page Template

> Worktree root: `/Users/suddhajitchowdhury/Documents/Ray Full System/Ray-Retailer`
> Read `context.json` and the three FEAT files in `.agents/tasks/article-blog-template/` before implementing.

---

## Exploration findings

| Item | Finding |
|---|---|
| Framework | TanStack Start (NOT Next.js) · Vite 8 · React 19 |
| Router | `createFileRoute` in `src/routes/` — App-router style, file-based |
| Styling | Tailwind v4 · `@import "tailwindcss"` in `src/styles.css` · **No** `tailwind.config.js` |
| Design tokens | `--primary` green, `--u20x-navy`, `--u20x-blue` all in `styles.css`. Utility classes: `container-rhl`, `section-y`, `eyebrow`, `heading-1`, `heading-2` |
| Header/Footer | `src/components/site/Header.tsx` + `Footer.tsx` — `__root.tsx` renders them for every route. **Do not modify.** |
| Image component | `<img loading="lazy">` — no `next/image` |
| Accordion | `src/components/ui/accordion.tsx` — Radix-based wrapper — **use it directly** |
| Breadcrumb | `src/components/ui/breadcrumb.tsx` — full primitive set — **use it directly** |
| Products data | `catalog.ts` imports from `wholesale.ts`; `categories` and `catalogProducts` are exported |
| Newsletter | Footer already does email+toast pattern — follow the same pattern with a state machine |
| Testing | No test runner configured — `bun run build` is the verification command |
| Blog components dir | Does NOT exist yet — create `src/components/blog/` |
| Existing blog posts | 4 posts with flat `body: string[]`; all new fields are optional to stay compatible |

---

## TypeScript interfaces to add to `src/data/blog.ts`

```typescript
export interface ArticleReference {
  id: string;
  title: string;
  authors?: string;
  publisher?: string;
  year?: number;
  url?: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'checklist'; items: { icon?: string; text: string }[] }
  | { type: 'numbered'; items: { number: number; title: string; body: string; imageUrl?: string; imageAlt?: string }[] }
  | { type: 'callout'; text: string; variant?: 'tip' | 'warning' | 'info' };

export interface ArticleSection {
  id: string;
  heading: string;
  content: ContentBlock[];
}

// Expand BlogPost — all new fields are optional for backward compat:
// featureImageUrl?, featureImageAlt?, subtitle?, authorAvatar?,
// authorBrandLine?, updatedDate?, categorySlug?, categoryIcon?,
// sections?: ArticleSection[], bottomLine?, recommendedProductSlugs?,
// references?: ArticleReference[], u20xChallengePath?, tags?

export const GLOBAL_DISCLAIMER = `Educational information only. ...`;
export const GLOBAL_COPYRIGHT_NOTICE = `© {year} Ray's Healthy Living® ...`;
export const ARTICLE_CATEGORIES = [...]; // 9 categories with slug/label/icon
```

---

## New files

| File | Purpose |
|---|---|
| `src/data/article-content.ts` | Re-export barrel (`export * from './blog'`) |
| `src/components/blog/Breadcrumbs.tsx` | Uses `ui/breadcrumb` primitives |
| `src/components/blog/ArticleHeader.tsx` | Category chip, H1, subtitle, author row, meta |
| `src/components/blog/FeatureMedia.tsx` | Full-width hero image with optional overlay |
| `src/components/blog/ArticleBody.tsx` | Renders `ArticleSection[]` or falls back to `string[]` |
| `src/components/blog/BottomLineCallout.tsx` | Green-tinted callout with Leaf icon |
| `src/components/blog/RecentArticles.tsx` | 4-item compact list, excludes current |
| `src/components/blog/NewsletterSubscribe.tsx` | RHF + zod, idle/loading/success/error states |
| `src/components/blog/U20XPromo.tsx` | Navy/blue gradient card, globally reusable |
| `src/components/blog/TopicExplorer.tsx` | 2-col category grid with icons |
| `src/components/blog/RecommendedProducts.tsx` | Looks up catalog products by slug |
| `src/components/blog/ReferencesAccordion.tsx` | Uses `ui/accordion`, default closed |
| `src/components/blog/DisclaimerAccordion.tsx` | Uses `ui/accordion`, global disclaimer text |
| `src/components/blog/RelatedArticles.tsx` | 4-up grid by relatedSlugs |
| `src/components/blog/ArticleCopyrightNotice.tsx` | Dynamic year copyright |
| `src/components/blog/ArticleSidebar.tsx` | Composes 4 sidebar modules |

---

## Modified files

| File | Change |
|---|---|
| `src/data/blog.ts` | Expand interface · add global constants · seed circulation article |
| `src/routes/blog.$slug.tsx` | Full rewrite to two-column layout using new components |
| `src/routes/blog.index.tsx` | Add feature image thumbnail to each card |

---

## Two-column layout approach for `blog.$slug.tsx`

```tsx
<div className="container-rhl section-y">
  <Breadcrumbs ... />
  <div className="flex flex-col lg:flex-row gap-10 mt-6">
    {/* Main — 70% on desktop */}
    <article className="min-w-0 lg:w-[70%]">
      <ArticleHeader ... />
      <FeatureMedia ... />
      <ArticleBody ... />
      <BottomLineCallout ... />   {/* conditional */}
      <RecommendedProducts ... />
      <ReferencesAccordion ... />
      <DisclaimerAccordion ... />
      <RelatedArticles ... />
      <ArticleCopyrightNotice />
    </article>

    {/* Sidebar — 30% on desktop, sticky */}
    <div className="hidden lg:block lg:w-[30%] lg:shrink-0">
      <div className="sticky top-24 flex flex-col gap-6">
        <ArticleSidebar post={post} allPosts={blogPosts} />
      </div>
    </div>
  </div>

  {/* Mobile sidebar — correct spec order */}
  <div className="lg:hidden flex flex-col gap-6 mt-8">
    <U20XPromo ctaPath={post.u20xChallengePath ?? '/u20x'} />
    <NewsletterSubscribe />
    <RecentArticles currentSlug={post.slug} posts={blogPosts} />
    <TopicExplorer categories={ARTICLE_CATEGORIES} />
  </div>
</div>
```

> Rationale: CSS flexbox with `flex-col lg:flex-row` is the simplest correct approach in Tailwind v4. The sidebar uses `sticky top-24` to scroll with the reader past the fold. The mobile order is achieved by rendering a separate `lg:hidden` block rather than trying to reorder with CSS order properties — this is more readable and avoids z-index complications.

---

## Newsletter state machine

```
idle → (submit) → loading → success
                          → error → idle (user can retry)
```

- State lives in `useState<'idle' | 'loading' | 'success' | 'error'>('idle')`.
- Form managed by `react-hook-form` with `zodResolver(z.object({ email: z.string().email() }))`.
- `onSubmit`: set loading, await `new Promise(resolve => setTimeout(resolve, 1500))`, set success (or set error if the promise rejects — for now simulate success always; real API endpoint can be wired up by swapping the Promise).
- Success replaces the form with a confirmation `<div>`.
- Error shows a `<p role="alert">` below the button.

---

## Accordion approach

Both `ReferencesAccordion` and `DisclaimerAccordion` use the existing `src/components/ui/accordion.tsx` wrappers. Each is a single-item `type="single"` accordion defaulting to closed (no `defaultValue`). The Radix primitive handles all keyboard interaction and ARIA states.

> Decision: do NOT build a custom accordion. The existing wrapper is already installed, tested and accessible.

---

## Build order (dependency-safe, avoids TS errors mid-flight)

1. **`src/data/blog.ts`** — expand types + add constants + seed data. Everything else depends on this.
2. **`src/data/article-content.ts`** — re-export barrel. No deps.
3. **Leaf components** (no inter-blog-component imports): `Breadcrumbs`, `ArticleHeader`, `FeatureMedia`, `BottomLineCallout`, `ArticleCopyrightNotice`, `DisclaimerAccordion`, `ReferencesAccordion`. Build these together.
4. **Content-dependent components**: `ArticleBody` (imports `ArticleSection`, `ContentBlock` types), `RecentArticles` (imports `BlogPost`), `RelatedArticles`.
5. **Standalone/globally reusable**: `NewsletterSubscribe`, `U20XPromo`, `TopicExplorer`.
6. **Data-bridge component**: `RecommendedProducts` (imports from `@/data/catalog`).
7. **Composer components**: `ArticleSidebar` (imports RecentArticles, NewsletterSubscribe, U20XPromo, TopicExplorer).
8. **Route**: `blog.$slug.tsx` — rewrites using all components above.
9. **Blog index**: `blog.index.tsx` — minor thumbnail addition.

---

## Open questions / assumptions

| Question | Assumption made |
|---|---|
| Is there a real newsletter API endpoint? | No — simulate with setTimeout. The form structure makes it trivial to swap in a real fetch call later. |
| Should `/blog?category=slug` filtering exist? | No — TopicExplorer and breadcrumb category links go to `/blog` for now. Category filtering is a separate feature. |
| Are there real product images per slug? | No — product cards use the existing asset images from catalog (all placeholder capsules/irish moss). The `shortDescription` field serves as the benefit line. |
| Author avatars? | No avatars exist in the repo. The avatar slot renders a green initial-circle fallback when `authorAvatar` is absent. |
| U20X page — does `/u20x` route exist? | Not in the route list. U20XPromo links to `/u20x` as a string (no TS error since it's not a typed route link in the same component). Use `<a href="/u20x">` or accept a TS error and cast. Better: pass ctaPath as a plain string and render `<a href={ctaPath}>`. |
| Feature images — real URLs? | The seed data uses the imported asset paths from `@/assets/`. For the circulation article, use `irishMoss` as a placeholder. The interface accepts any string URL. |
| `catalogProducts` export name | `catalog.ts` uses `applyStoredOverrides` and imports `catalogProducts` from `wholesale.ts`. Verify the exact exported array name during implementation. |

---

## Verification

```bash
cd '/Users/suddhajitchowdhury/Documents/Ray Full System/Ray-Retailer'
bun run build
# Expected: exit 0, no TypeScript errors, no Vite transform errors

bun run dev
# Load: http://localhost:3000/blog/improve-blood-circulation-naturally
# Verify: two-column layout renders, sidebar visible on desktop,
#         sidebar hidden on mobile with correct module order below article
```
