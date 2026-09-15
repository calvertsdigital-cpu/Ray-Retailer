import { createFileRoute, Link } from "@tanstack/react-router";

import { TrustBar } from "@/components/site/TrustBar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ray's Healthy Living | Family-Run Natural Wellness" },
      {
        name: "description",
        content:
          "Ray's Healthy Living is a family-centric business offering quality natural and organic supplements at prices families can keep up with.",
      },
      { property: "og:title", content: "About Ray's Healthy Living" },
      { property: "og:description", content: "A family-run natural wellness store built on quality and trust." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Quality first", body: "Every product is chosen for purity, potency and honest labeling — nothing filler-heavy." },
  { title: "Natural & organic", body: "We favour whole-food and botanical sources grown with care for the land." },
  { title: "Ethical sourcing", body: "We work with growers and makers who treat people and soil with respect." },
  { title: "Real support", body: "Questions get answered by people, not scripts. Reach out any time." },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-secondary">
        <div className="container-rhl section-y max-w-3xl">
          <p className="eyebrow mb-2">Our story</p>
          <h1 className="heading-1">Wellness that a whole family can keep up with</h1>
          <p className="mt-4 text-muted-foreground">
            Ray's Healthy Living began at a kitchen table, blending herbs for family and neighbours who wanted a
            gentler way to feel well. Today we carry hundreds of natural and organic supplements, herbs and oils —
            still chosen the same way: would we give this to our own family?
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/shop">Shop products</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/health-concerns">Explore health concerns</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-rhl section-y">
        <h2 className="heading-2">What we stand for</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
