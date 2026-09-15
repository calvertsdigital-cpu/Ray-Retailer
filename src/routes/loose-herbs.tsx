import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/loose-herbs")({
  component: LooseHerbsPage,
});

function LooseHerbsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Loose Herbs</h1>
            <p className="text-lg text-emerald-100 mb-6">
              Premium loose herbs for tea, cooking, and wellness
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-emerald-400 to-emerald-200 rounded-full flex items-center justify-center text-6xl">
              🌿
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">Pure Loose Herbs</h2>
          <p className="text-muted-foreground mb-4">
            Our collection of premium loose herbs is sourced from trusted suppliers and carefully selected for quality. 
            Perfect for brewing teas, cooking, or creating your own custom blends.
          </p>
          <p className="text-muted-foreground mb-6">
            From calming chamomile to revitalizing peppermint, explore our extensive selection of loose herbs.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Loose Herbs Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Natural Wellness",
                description: "Support your health with pure, natural herbs."
              },
              {
                title: "Freshness & Quality",
                description: "Experience the superior taste and potency of loose herbs."
              },
              {
                title: "Versatile Use",
                description: "Perfect for teas, cooking, infusions, and more."
              },
              {
                title: "Cost Effective",
                description: "Get more value with loose herbs compared to pre-packaged options."
              }
            ].map((benefit, idx) => (
              <div key={idx} className="rounded-lg bg-white p-6 shadow-card border border-border">
                <h3 className="font-bold text-lg mb-2 text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-y bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Discover Our Loose Herbs</h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Explore our premium collection of loose herbs for your wellness journey.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Loose Herbs
          </button>
        </div>
      </section>
    </div>
  );
}
