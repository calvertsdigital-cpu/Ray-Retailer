import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maximum-cardio")({
  component: MaximumCardioPage,
});

function MaximumCardioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Maximum Cardio</h1>
            <p className="text-lg text-red-100 mb-6">
              Support your cardiovascular health with Maximum Cardio
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-red-400 to-red-200 rounded-full flex items-center justify-center text-6xl">
              ❤️
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">Heart Health Support</h2>
          <p className="text-muted-foreground mb-4">
            Maximum Cardio is a premium blend designed to support cardiovascular wellness. Our formula includes 
            carefully selected ingredients known to support heart health and circulation.
          </p>
          <p className="text-muted-foreground mb-6">
            Maintain optimal cardiovascular function with our science-backed formulation.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Maximum Cardio Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Supports Heart Health",
                description: "Formulated to support healthy cardiovascular function."
              },
              {
                title: "Promotes Circulation",
                description: "Help maintain healthy blood flow and circulation."
              },
              {
                title: "Reduces Blood Pressure",
                description: "Naturally support healthy blood pressure levels."
              },
              {
                title: "Boosts Endurance",
                description: "Support your fitness goals with enhanced cardiovascular endurance."
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
      <section className="section-y bg-gradient-to-r from-red-600 to-red-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Support Your Heart Health</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Choose Maximum Cardio for comprehensive cardiovascular support.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Maximum Cardio
          </button>
        </div>
      </section>
    </div>
  );
}
