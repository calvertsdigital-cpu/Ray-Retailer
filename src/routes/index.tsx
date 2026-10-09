import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, FlaskConical, HeartHandshake, Leaf, Sparkles, Star, Stethoscope } from "lucide-react";

import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TrustBar } from "@/components/site/TrustBar";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/catalog";
import { healthConcerns, upcomingConcerns } from "@/data/concerns";
import { fetchProducts, convertBackendProduct } from "@/lib/api";

// Import hero slider images
import HeroSliderImg1 from "@/assets/HeroSliderImg1.jpg";
import HeroSliderImg2 from "@/assets/HeroSliderImg2.jpg";
import HeroSliderImg3 from "@/assets/HeroSliderImg3.jpg";

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

const reviews = [
  {
    rating: 5,
    date: "Apr 28th, 2024",
    text: "Rays Maximum Cardio is by far the best dietary supplement I have come across. You immediately feel the difference and the shift within once you begin to apply use.\n\nThis product lives up to everything it states from energy, strength, mental clarity, stamina, immunity & muscle growth!\n\nRays Maximum Cardio has truly helped to make me feel 10-15 yrs younger and even surpass physical limitations that were once a barrier for myself.",
    name: "James Mbah",
    source: "Google",
    verified: true,
  },
  {
    rating: 5,
    date: "Jun 7th, 2024",
    text: "Ray is the best and so are his products!",
    name: "Holly Grimes",
    source: "Google",
    verified: true,
  },
  {
    rating: 5,
    date: "May 7th, 2024",
    text: "Ray is so kind and helpful. He knows just what I need. He actually takes time to understand what you are actually looking for!",
    name: "Piggy and Sam Yett",
    source: "Google",
    verified: true,
  },
  {
    rating: 5,
    date: "Sep 24th, 2023",
    text: "I have been seeing Ray and his healthy healing plan….. visited his store today September 24th 2023, he took his time with my girlfriend and I. He has so many samples, so much knowledge. I purchased the best Seamoss I ever taste and I been taking Seamoss for years. I STRONGLY RECOMMEND ESP WATER, that water healed my girlfriend's sore throat on the spot!",
    name: "Monique Washington",
    source: "Google",
    verified: true,
  },
  {
    rating: 5,
    date: "Jan 1st, 2024",
    text: "I LOVE going into Ray's - Healthy Living, its always time well spent. I am learning how to care for myself and my family. My health is wealth goes without saying. If you haven't been to his store (Located in Prince Frederick) Run don't walk, you won't be disappointed. Trust me!",
    name: "Rana Latin",
    source: "Google",
    verified: true,
  },
];

function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showReviewCarousel, setShowReviewCarousel] = useState(false);
  const [backendProducts, setBackendProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendProds = await fetchProducts(500);
        const converted = backendProds.map(convertBackendProduct);
        setBackendProducts(converted);
      } catch (error) {
        console.error('Error fetching backend products:', error);
        // Fallback to local data
        setBackendProducts(products);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Use backend products if available, otherwise fallback to local
  const allProducts = backendProducts.length > 0 ? backendProducts : products;
  
  const heroSlides = [
    {
      image: HeroSliderImg1,
      title: "Pure Wellness",
      subtitle: "Naturally Yours",
      text: "Ray's Healthy Living offers organic supplements for your family's health. Safe, natural, and affordable, our vitamins boost vitality. Shop online or in-store today.",
    },
    {
      image: HeroSliderImg2,
      title: "Nature's Best",
      subtitle: "for Your Family",
      text: "Discover Ray's Healthy Living's organic supplements. Crafted for safety and affordability, our natural vitamins enhance family wellness. Shop online or at our stores now.",
    },
    {
      image: HeroSliderImg3,
      title: "Vitality Starts",
      subtitle: "with Nature",
      text: "Elevate health with Ray's Healthy Living's organic vitamins. Safe, affordable, and natural, our supplements boost vitality. Shop online or in-store today.",
    }
  ];

  // Hero slider auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  const featured = allProducts.slice(0, 4);
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 4);
  const concernCards = [
    ...healthConcerns.map((c) => ({ name: c.name, category: c.category, slug: c.slug, text: c.heroSubtext })),
    ...upcomingConcerns.map((c) => ({ name: c.name, category: c.category, slug: null, text: "Guide coming soon." })),
  ].slice(0, 8);

  return (
    <>
      {/* HERO SLIDER */}
      <section 
        className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
        style={{
          backgroundImage: `url(${heroSlides[heroIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-rhl relative flex items-center py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="block">{heroSlides[heroIndex]?.title || "Pure Wellness"}</span>
              <span className="block text-orange-500">{heroSlides[heroIndex]?.subtitle || "Naturally Yours"}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              {heroSlides[heroIndex]?.text || "Ray's Healthy Living offers organic supplements for your family's health."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                <Link to="/shop">Shop Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold border-2 border-orange-500">
                <Link to="/health-concerns">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── RayOneSystem badge — bottom-left ── */}
        <a
          href="https://rayonesystem.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RayOneSystem — The Power Behind Every Successful Vitamin Store"
          className="absolute bottom-6 left-4 z-10 flex items-center gap-3 rounded-full px-4 py-2.5 transition-opacity hover:opacity-90 active:opacity-80"
          style={{
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          {/* Icon circle */}
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black"
            style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white" }}
            aria-hidden="true"
          >
            R
          </div>
          {/* Text block */}
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight" style={{ color: "#f97316" }}>
              RayOneSystem — Create Your Own Successful Vitamin Store
            </p>
            <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.75)" }}>
              The Power Behind Every Successful Vitamin Store
            </p>
          </div>
          {/* Authorized Retail badge */}
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
            style={{ background: "#f97316", color: "white" }}
          >
            Authorized Retail
          </span>
        </a>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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

      <img
        src="/under-herobar.png"
        alt="Free Shipping on orders over $99 · 30-Day Guarantee · Safe Payment · Online Support"
        className="w-full"
        style={{ display: "block" }}
      />

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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <img
            src="/Organic and ethical sourcing, kept honest.png"
            alt="Organic and ethical sourcing, kept honest"
            className="w-full rounded-2xl object-cover shadow-card"
          />
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

      {/* COMPLIANCE & CERTIFICATIONS */}
      <section className="section-y">
        <div className="container-rhl">
          <SectionHeading
            eyebrow="Our Promise"
            title="100% Compliant & Certified"
            description="We meet the highest industry standards for safety, quality, and purity."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "NSF GMP Certified",
              "FDA OTC registered facility", 
              "KOF-K kosher certified",
              "Certified Organic",
              "Non-GMO",
              "Gluten-Free", 
              "Allergen Testing",
              "Pesticide Testing"
            ].map((certification) => (
              <div key={certification} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{certification}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT RAY'S HEALTHY LIVING */}
      <section className="section-y bg-accent/30">
        <div className="container-rhl grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-primary">About Our Firm</p>
            <h2 className="heading-2 mt-2">Ray's <span className="text-primary">Healthy Living</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-500 mt-4 mb-6 rounded-full"></div>
            <h3 className="text-xl font-bold text-foreground mb-4">Your Health. Our Priority.</h3>
            <p className="text-muted-foreground mb-4">
              At Ray's Healthy Living, we believe true wellness comes from nature. We are passionate about providing
              high-quality, natural health and wellness products that support your body, mind and everyday life.
            </p>
            <p className="text-muted-foreground mb-4">
              Our carefully curated range includes vitamins, minerals, supplements and natural remedies — designed to
              help you feel stronger, healthier and more energized.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're looking to boost your immunity, improve digestion, support heart health or simply live a
              healthier lifestyle, we're here to help.
            </p>
            <Button asChild variant="outline">
              <Link to="/about">Learn more about us</Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="/About Our Firm  Ray's Healthy Living.png"
              alt="About Our Firm — Ray's Healthy Living"
              className="w-full rounded-2xl object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS — Customer trust */}
      <section className="section-y" style={{ background: "#1a2235" }}>
        <style>{`
          @keyframes reviewFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div className="container-rhl">

          {/* ── Highlight card (same shape as Chamber of Commerce card) ── */}
          <div
            className="mx-auto max-w-3xl rounded-2xl px-8 py-10 text-center"
            style={{ background: "#0f172a" }}
          >
            {/* Badge pill */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: "#2563eb", color: "#fff" }}
            >
              <Star className="h-3.5 w-3.5 fill-white" />
              Customer Reviews
            </span>

            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
              Five Stars, In Person and Online
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Real feedback from our local Maryland customers — verified reviews.
            </p>

            <hr className="my-6 border-white/10" />

            {/* Star row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-semibold text-white">Customer Reviews</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">5.0</span>
              <span className="text-sm text-white/50">{reviews.length} Verified Reviews</span>
            </div>

            <button
              onClick={() => setShowReviewCarousel(true)}
              className="mt-6 inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#2563eb" }}
            >
              View All Reviews
            </button>
          </div>

          {/* ── Carousel — shown only after button click ── */}
          {showReviewCarousel && (
          <div className="mx-auto mt-10 max-w-3xl" style={{ animation: "reviewFadeIn 0.4s ease-out" }}>
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                style={{ background: "#16a34a" }}
              >
                ✓
              </span>
              <h3 className="text-lg font-bold text-white">
                Top {reviews.length} Reviews{" "}
                <span className="ml-1 text-sm font-normal text-white/50">
                  ({reviewIndex + 1}/{reviews.length})
                </span>
              </h3>
            </div>
            <div className="mt-3 h-0.5 w-full rounded-full" style={{ background: "#f59e0b" }} />

            {/* ── Card + arrows ── */}
            {(() => {
              const review = reviews[reviewIndex] ?? reviews[0]!;
              return (
              <div className="relative mt-4 flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Review card */}
              <div
                className="flex-1 rounded-2xl p-6"
                style={{ background: "#263150" }}
              >
                {/* Stars + date */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="rounded-md border border-white/20 px-3 py-1 text-xs text-white/60">
                    {review.date}
                  </span>
                </div>

                {/* Review text */}
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/80">
                  {review.text}
                </p>

                {/* Reviewer */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "#2563eb" }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/50">{review.source}</span>
                      {review.verified && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ background: "#14532d", color: "#86efac" }}
                        >
                          ✓ VERIFIED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next */}
              <button
                onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
                aria-label="Next review"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
              );
            })()}

            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === reviewIndex
                      ? "w-6 bg-blue-500"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* View All button */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/reviews"
                className="inline-flex items-center justify-center rounded-lg px-10 py-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                style={{ background: "#2563eb" }}
              >
                VIEW ALL REVIEWS
              </Link>
            </div>
          </div>
          )}

        </div>
      </section>
    </>
  );
}
