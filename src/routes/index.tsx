import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, FlaskConical, HeartHandshake, Leaf, Quote, Sparkles, Stethoscope } from "lucide-react";

import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StarRating } from "@/components/site/StarRating";
import { TrustBar } from "@/components/site/TrustBar";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/catalog";
import { healthConcerns, upcomingConcerns } from "@/data/concerns";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ray's Healthy Living | Organic Supplements & Health Concern Support" },
      {
        name: "description",
        content:
          "Shop organic supplements, sea moss, herbs and essential oils — or start with your health concern and let us recommend the right support.",
      },
      { property: "og:title", content: "Ray's Healthy Living | Organic Supplements & Health Concern Support" },
      {
        property: "og:description",
        content: "Natural wellness products and trusted support for everyday health, since our first Maryland store.",
      },
    ],
  }),
  component: Home,
});

const education = [
  { icon: Stethoscope, title: "Health Concern Guides", text: "Understand a concern before you shop for it." },
  { icon: BookOpen, title: "Wellness Articles", text: "Plain-language reading from our team in store." },
  { icon: FlaskConical, title: "Ingredient Education", text: "What is actually in the bottle, and why." },
  { icon: Leaf, title: "Product Education", text: "How to use what you buy, properly and safely." },
];

const testimonials = [
  {
    quote: "The staff took twenty minutes to explain what I actually needed instead of selling me five things.",
    name: "Denise M.",
    place: "Prince Frederick, MD",
  },
  {
    quote: "I've bought sea moss from a lot of places. This is the only one my whole family will take.",
    name: "Ola B.",
    place: "Waldorf, MD",
  },
  {
    quote: "Honest labels and honest advice. That's rare in supplements.",
    name: "Tomas L.",
    place: "Annapolis, MD",
  },
];

function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  
  const heroSlides = [
    {
      title: "Pure Wellness",
      subtitle: "Naturally Yours",
      text: "Ray's Healthy Living offers organic supplements for your family's health. Safe, natural, and affordable, our vitamins boost vitality. Shop online or in-store today.",
      bgColor: "from-green-600 to-green-700"
    },
    {
      title: "Nature's Best",
      subtitle: "for Your Family",
      text: "Discover Ray's Healthy Living's organic supplements. Crafted for safety and affordability, our natural vitamins enhance family wellness. Shop online or at our stores now.",
      bgColor: "from-blue-600 to-blue-700"
    },
    {
      title: "Vitality Starts",
      subtitle: "with Nature",
      text: "Elevate health with Ray's Healthy Living's organic vitamins. Safe, affordable, and natural, our supplements boost vitality. Shop online or in-store today.",
      bgColor: "from-amber-600 to-amber-700"
    }
  ];

  // Hero slider auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  const featured = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const concernCards = [
    ...healthConcerns.map((c) => ({ name: c.name, category: c.category, slug: c.slug, text: c.heroSubtext })),
    ...upcomingConcerns.map((c) => ({ name: c.name, category: c.category, slug: null, text: "Guide coming soon." })),
  ].slice(0, 8);

  return (
    <>
      {/* HERO SLIDER */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${heroSlides[heroIndex].bgColor} min-h-[500px] lg:min-h-[600px]`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-rhl relative flex items-center py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">RAY'S HEALTHY LIVING</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl text-white">
              <span className="block">{heroSlides[heroIndex].title}</span>
              <span className="block text-white/90">{heroSlides[heroIndex].subtitle}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              {heroSlides[heroIndex].text}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link to="/shop">Shop Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/health-concerns">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === heroIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <TrustBar />

      {/* SHOP BY CATEGORY */}
      <section className="section-y">
        <div className="container-rhl">
          <SectionHeading
            eyebrow="Shop by category"
            title="Find what you came for"
            description="The same shelves you know from the store, organised for how people actually shop."
            action={{ label: "All products", to: "/shop" }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to="/shop"
                search={{ category: cat.slug }}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY HEALTH CONCERN */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <SectionHeading
            eyebrow="Shop by health concern"
            title="What are you looking for support with?"
            description="Start with the concern, not the product. Each guide explains the basics, then shows the support options we would talk through in store."
            action={{ label: "All concerns", to: "/health-concerns" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {concernCards.map((c) =>
              c.slug ? (
                <Link
                  key={c.name}
                  to="/health-concerns/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary-dark">
                    <HeartHandshake className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.category}</p>
                  <h3 className="mt-1 text-lg font-semibold">{c.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore support <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ) : (
                <div
                  key={c.name}
                  className="flex flex-col rounded-xl border border-dashed border-border bg-card/60 p-5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-muted-foreground">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.category}</p>
                  <h3 className="mt-1 text-lg font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section-y">
        <div className="container-rhl">
          <SectionHeading
            eyebrow="Featured"
            title="Handpicked by our team"
            description="The products we reach for most often behind the counter."
            action={{ label: "Shop all", to: "/shop" }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section-y bg-cream">
        <div className="container-rhl">
          <SectionHeading eyebrow="Best sellers" title="What Maryland keeps re-ordering" action={{ label: "Shop all", to: "/shop" }} />
          <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} className="w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto" />
            ))}
          </div>

          <div className="mt-12">
            <SectionHeading eyebrow="Just in" title="New arrivals" action={{ label: "Shop all", to: "/shop" }} />
            <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} className="w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY RAY'S */}
      <section className="section-y">
        <div className="container-rhl grid items-center gap-10 lg:grid-cols-2">
          <div className="w-full rounded-2xl object-cover shadow-card bg-gradient-to-br from-green-100 to-green-50 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">✓</div>
              <p className="mt-2 font-semibold text-green-700">30-Day Guarantee</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Why Ray's Healthy Living</p>
            <h2 className="heading-2 mt-2">Organic and ethical sourcing, kept honest</h2>
            <p className="mt-4 text-muted-foreground">
              Quality is the foundation of our work, which is why we partner with certified organic farmers and
              responsible wild harvesters. We are committed to sustainability and do not source endangered herbs like
              Echinacea, Goldenseal or Ginseng from the wild.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "NSF GMP certified facility",
                "FDA OTC registered facility",
                "KOF-K kosher certified",
                "Certified organic & Non-GMO",
                "Allergen and pesticide tested",
                "Family owned, store and online",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7" variant="outline">
              <Link to="/about">Learn more about us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <SectionHeading
            eyebrow="Education first"
            title="Understand your wellness"
            description="We would rather you understood the why before you spent a dollar."
            action={{ label: "Read the blog", to: "/blog" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {education.map((e) => (
              <div key={e.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary-dark">
                  <e.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{e.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-y">
        <div className="container-rhl">
          <SectionHeading eyebrow="Customer trust" title="Five stars, in person and online" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="mt-3 text-sm leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-4 flex items-center justify-between text-sm">
                  <span>
                    <span className="font-semibold">{t.name}</span>
                    <span className="block text-muted-foreground">{t.place}</span>
                  </span>
                  <StarRating rating={5} showValue={false} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
