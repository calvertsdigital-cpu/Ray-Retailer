import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

import { healthConcerns, upcomingConcerns } from "@/data/concerns";

export const Route = createFileRoute("/health-concerns/")({
  head: () => ({
    meta: [
      { title: "Health Concerns | Natural Support Guides | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Start with your health concern. Each guide explains the basics in plain English, then shows the natural support options we would talk through in store.",
      },
      { property: "og:title", content: "Health Concerns | Natural Support Guides" },
      { property: "og:description", content: "Plain-English wellness guides with matched product support." },
    ],
  }),
  component: ConcernIndex,
});

function ConcernIndex() {
  return (
    <>
      <div className="border-b border-border bg-cream">
        <div className="container-rhl py-12">
          <p className="eyebrow">Health concerns</p>
          <h1 className="heading-1 mt-2 max-w-3xl">What are you looking for support with?</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every guide follows the same path: understand the concern, see the symptoms in everyday language, then review
            the natural support and daily habits we recommend. Educational only — never a diagnosis.
          </p>
        </div>
      </div>

      <div className="container-rhl section-y">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {healthConcerns.map((c) => (
            <Link
              key={c.slug}
              to="/health-concerns/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary-dark">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{c.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.heroSubtext}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore support <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}

          {upcomingConcerns.map((c) => (
            <div key={c.name} className="flex flex-col rounded-xl border border-dashed border-border bg-card/60 p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-muted-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{c.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Guide coming soon.</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
