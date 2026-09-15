import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rays-vitality")({
  component: RaysVitalityPage,
});

function RaysVitalityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-700 to-amber-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Ray's Vitality</h1>
            <p className="text-lg text-amber-100 mb-6">
              Energize your life with Ray's signature vitality formula
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-amber-400 to-amber-200 rounded-full flex items-center justify-center text-6xl">
              ⚡
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">Your Daily Energy Boost</h2>
          <p className="text-muted-foreground mb-4">
            Ray's Vitality is a specially formulated blend designed to support energy, focus, and overall vitality. 
            With a carefully selected mix of natural ingredients, this formula helps you feel your best every day.
          </p>
          <p className="text-muted-foreground mb-6">
            Experience sustained energy without the crash. Perfect for busy lifestyles and active individuals.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Ray's Vitality Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Boosts Energy Naturally",
                description: "Experience sustained energy throughout the day."
              },
              {
                title: "Enhances Mental Focus",
                description: "Stay sharp and focused on what matters most."
              },
              {
                title: "Supports Physical Performance",
                description: "Enhance your workout and daily activities."
              },
              {
                title: "Promotes Vitality",
                description: "Feel alive and ready to tackle your day."
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
      <section className="section-y bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Feel Your Best with Ray's Vitality</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've transformed their energy and vitality.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Ray's Vitality
          </button>
        </div>
      </section>
    </div>
  );
}
