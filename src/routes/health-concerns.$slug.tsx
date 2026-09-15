import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  CircleHelp,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { BundleBuilder } from "@/components/concern/BundleBuilder";
import { ChallengeInquiry } from "@/components/concern/ChallengeInquiry";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/catalog";
import { getConcern } from "@/data/concerns";
import { useCart } from "@/lib/cart";

/**
 * MASTER HEALTH CONCERN TEMPLATE.
 * Section order is locked: Hero → Fast Facts → Best For → Not For →
 * Common Symptoms → Possible Causes → Recommended Support → Daily Routine →
 * 20-Day Challenge CTA → Disclaimer. Every value comes from the concern
 * record; nothing condition-specific is hardcoded here.
 */
export const Route = createFileRoute("/health-concerns/$slug")({
  loader: ({ params }) => {
    const concern = getConcern(params.slug);
    if (!concern || !concern.published) throw notFound();
    return { concern };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guide unavailable | Ray's Healthy Living" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.concern;
    return {
      meta: [
        { title: c.seoTitle },
        { name: "description", content: c.metaDescription },
        { property: "og:title", content: c.seoTitle },
        { property: "og:description", content: c.metaDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ConcernPage,
});

/** Shared panel wrapper used by every block in the concern template. */
function Panel({
  title,
  icon,
  children,
  id,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      {...(id ? { id } : {})}
      aria-label={title}
      className="rounded-2xl border border-border bg-card p-6 shadow-card"
    >
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-dark">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ConcernPage() {
  const { concern } = Route.useLoaderData();
  const { add } = useCart();

  const recommended = concern.recommended
    .map((ref) => {
      const product = getProduct(ref.slug);
      return product ? { ref, product } : null;
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="bg-secondary/40 pb-16">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-cream">
        {concern.heroImage && (
          <img
            src={concern.heroImage}
            alt=""
            width={1600}
            height={912}
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-right md:w-3/5"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/10" aria-hidden />
        <div className="container-rhl relative py-14 md:py-20">
          <p className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-dark">
            {concern.category}
          </p>
          <h1 className="heading-1 mt-4 max-w-xl text-balance text-primary-dark">{concern.heroHeadline}</h1>
          <p className="mt-4 max-w-md text-lg text-foreground/80">{concern.heroSubtext}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#recommended-support">See recommended support</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-card">
              <Link to="/contact">Ask a health consultant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety warning — shown high when the record defines one */}
      {concern.safetyWarning && (
        <div className="border-y border-caution/40 bg-caution/15">
          <div className="container-rhl flex gap-3 py-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-caution-foreground" aria-hidden />
            <p className="text-sm font-medium leading-relaxed text-caution-foreground">
              <span className="font-bold uppercase">Important safety information: </span>
              {concern.safetyWarning}
            </p>
          </div>
        </div>
      )}

      <div className="container-rhl grid items-start gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT — education + recommended support */}
        <div className="space-y-6">
          {/* 2. FAST FACTS */}
          <Panel title="Fast facts" icon={<Zap className="h-5 w-5" />}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {concern.fastFacts.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {f.title.slice(0, 2).toUpperCase()}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              ))}
            </div>
          </Panel>

          {/* 3 + 4. BEST FOR / NOT FOR */}
          <div className="grid gap-6 md:grid-cols-2">
            <Panel title="Best for" icon={<Check className="h-5 w-5" />}>
              <ul className="space-y-3">
                {concern.bestFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Not for" icon={<X className="h-5 w-5" />}>
              <ul className="space-y-3">
                {concern.notFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* 5 + 6. COMMON SYMPTOMS / POSSIBLE CAUSES */}
          <div className="grid gap-6 md:grid-cols-2">
            <Panel title="Common symptoms" icon={<UserRound className="h-5 w-5" />}>
              <ul className="space-y-3">
                {concern.commonSymptoms.map((s) => (
                  <li key={s} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Possible causes" icon={<CircleHelp className="h-5 w-5" />}>
              <ul className="space-y-3">
                {concern.possibleCauses.map((c) => (
                  <li key={c.title} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                    <span>
                      <span className="font-medium">{c.title}</span> — {c.text}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Educational background only. These are not diagnoses.
              </p>
            </Panel>
          </div>

          {/* 7. RECOMMENDED SUPPORT */}
          <Panel title="Recommended support" icon={<Leaf className="h-5 w-5" />} id="recommended-support">
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
              {recommended.map(({ ref, product }) => (
                <article key={product.id} className="flex flex-col rounded-xl border border-border bg-card p-3">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
                    <img
                      src={product.media.find((m) => m.type === "image")?.src}
                      alt={product.name}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="aspect-square w-full rounded-lg bg-secondary object-cover"
                    />
                    <h3 className="mt-3 text-sm font-bold leading-snug hover:text-primary">{product.name}</h3>
                  </Link>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{ref.note}</p>
                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => {
                      add(product.slug, 1);
                      toast.success(`${product.name} added to cart`);
                    }}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                  </Button>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              These are the same product records sold in our shop — mapped to this concern, never duplicated.
            </p>
          </Panel>
        </div>

        {/* RIGHT — bundle basket (sticky on desktop, normal flow on mobile) */}
        <div className="lg:sticky lg:top-24">
          <BundleBuilder
            recommended={concern.recommended}
            concernName={concern.name}
            {...(concern.bundleTitle ? { title: concern.bundleTitle } : {})}
            {...(concern.bundleSubtext ? { subtext: concern.bundleSubtext } : {})}
          />
        </div>
      </div>

      {/* 8 + 9. DAILY ROUTINE + 20-DAY CHALLENGE */}
      <div className="container-rhl grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <Panel title="Daily routine support" icon={<CalendarDays className="h-5 w-5" />}>
          <ol className="divide-y divide-border">
            {concern.dailyRoutine.map((step, i) => (
              <li key={step.title} className="flex items-center gap-4 py-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-sm">{step.text}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <section aria-labelledby="challenge" className="rounded-2xl border border-primary/25 bg-accent/60 p-6">
          <h2
            id="challenge"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-dark"
          >
            <CalendarDays className="h-5 w-5 text-primary" aria-hidden />
            {concern.cta.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">{concern.cta.text}</p>
          <div className="mt-5">
            <ChallengeInquiry
              buttonLabel={concern.cta.buttonLabel}
              concernSlug={concern.slug}
              concernName={concern.name}
            />
          </div>
          <ul className="mt-6 grid gap-3 text-xs font-medium text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden /> Personalized guidance
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" aria-hidden /> Daily routine support
            </li>
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" aria-hidden /> Science + nature based
            </li>
          </ul>
        </section>
      </div>

      {/* 10. DISCLAIMER */}
      <section className="container-rhl mt-6" aria-labelledby="disclaimer">
        <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 id="disclaimer" className="text-sm font-bold uppercase tracking-wider">
              Disclaimer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{concern.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
