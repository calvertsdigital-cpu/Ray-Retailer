import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cbd")({
  component: CBDPage,
});

function CBDPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">CBD Products</h1>
            <p className="text-lg text-blue-100 mb-6">
              Natural wellness support with premium CBD products
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-200 rounded-full flex items-center justify-center text-6xl">
              💚
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">What is CBD?</h2>
          <p className="text-muted-foreground mb-4">
            CBD (Cannabidiol) is a naturally occurring compound found in the cannabis plant. Our CBD products are 
            THC-free and designed to support your wellness journey safely and effectively.
          </p>
          <p className="text-muted-foreground mb-6">
            From tinctures to topicals, our CBD collection offers high-quality products to support relaxation, 
            focus, and overall well-being.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">CBD Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Supports Relaxation",
                description: "Help ease everyday stress and promote a sense of calm and relaxation."
              },
              {
                title: "Promotes Better Sleep",
                description: "Support natural sleep patterns for a more restful night."
              },
              {
                title: "Reduces Discomfort",
                description: "May help manage minor aches and discomfort naturally."
              },
              {
                title: "Supports Focus",
                description: "Help maintain mental clarity and concentration throughout the day."
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
      <section className="section-y bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Discover Premium CBD</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the natural wellness benefits of our premium CBD collection.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop CBD Now
          </button>
        </div>
      </section>
    </div>
  );
}
