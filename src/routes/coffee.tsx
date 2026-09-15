import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coffee")({
  component: CoffeePage,
});

function CoffeePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 to-amber-800">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Premium Coffee</h1>
            <p className="text-lg text-amber-100 mb-6">
              Ethically sourced, premium coffee for the conscious consumer
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full flex items-center justify-center text-6xl">
              ☕
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">Exceptional Coffee Quality</h2>
          <p className="text-muted-foreground mb-4">
            Our coffee selection features ethically sourced, premium beans roasted to perfection. From light roasts 
            with bright acidity to deep, rich dark roasts, we have something for every coffee lover.
          </p>
          <p className="text-muted-foreground mb-6">
            Every cup tells a story of quality, sustainability, and exceptional taste.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Why Choose Our Coffee</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Ethically Sourced",
                description: "Directly traded with fair-trade partners who care about quality."
              },
              {
                title: "Freshly Roasted",
                description: "Small batches roasted to order for maximum freshness."
              },
              {
                title: "Premium Flavor",
                description: "Rich, complex flavors that coffee enthusiasts love."
              },
              {
                title: "Sustainable",
                description: "Committed to environmentally responsible practices."
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
      <section className="section-y bg-gradient-to-r from-amber-800 to-amber-900">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Experience Premium Coffee</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Elevate your morning ritual with our exceptional coffee selection.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Premium Coffee
          </button>
        </div>
      </section>
    </div>
  );
}
