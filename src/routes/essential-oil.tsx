import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/essential-oil")({
  component: EssentialOilPage,
});

function EssentialOilPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Essential Oils</h1>
            <p className="text-lg text-purple-100 mb-6">
              Premium essential oils for wellness and aromatherapy
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-purple-200 rounded-full flex items-center justify-center text-6xl">
              🌸
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">Pure Essential Oils</h2>
          <p className="text-muted-foreground mb-4">
            Our collection of premium essential oils is carefully sourced and tested for purity and potency. 
            Perfect for diffusing, topical use, or incorporating into your wellness routine.
          </p>
          <p className="text-muted-foreground mb-6">
            From calming lavender to energizing peppermint, find the perfect essential oil for your needs.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Essential Oil Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Aromatherapy Support",
                description: "Create a calming atmosphere with natural aromatherapy."
              },
              {
                title: "Relaxation & Stress Relief",
                description: "Help ease tension and promote relaxation naturally."
              },
              {
                title: "Sleep Support",
                description: "Create a peaceful environment for better sleep."
              },
              {
                title: "Mood Enhancement",
                description: "Naturally uplift your mood and enhance your day."
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
      <section className="section-y bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Discover Our Essential Oils</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Transform your space and wellness routine with our premium essential oils.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Essential Oils
          </button>
        </div>
      </section>
    </div>
  );
}
