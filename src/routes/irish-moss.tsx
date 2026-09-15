import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/irish-moss")({
  component: IrishMossPage,
});

function IrishMossPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-600">
        <div className="container-rhl grid items-center gap-10 py-20 lg:grid-cols-2">
          <div>
            <h1 className="heading-1 text-white mb-4">Irish Moss</h1>
            <p className="text-lg text-green-100 mb-6">
              Discover the natural power of Irish Sea Moss for optimal health and wellness
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors">
              Shop Now
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-green-400 to-green-200 rounded-full flex items-center justify-center text-6xl">
              🌿
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-4">What is Irish Sea Moss?</h2>
          <p className="text-muted-foreground mb-4">
            Irish Sea Moss is a species of red algae found on the rocky parts of the Atlantic coast of Europe. It is also 
            commonly found on the coasts of North America. Sea moss has been used for centuries in the Caribbean and Ireland 
            for its incredible nutritional and medicinal benefits.
          </p>
          <p className="text-muted-foreground">
            Rich in 92 out of 102 minerals your body needs, Irish Sea Moss is a nutritional powerhouse packed with essential 
            vitamins and minerals that support optimal health and wellness.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-y bg-accent/50">
        <div className="container-rhl">
          <h2 className="heading-2 mb-12">Top Benefits of Irish Sea Moss</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Improves Thyroid Function",
                description: "Rich in iodine, Irish Sea Moss supports healthy thyroid function and metabolism regulation."
              },
              {
                title: "Manages Joint Pain",
                description: "Contains compounds that help reduce inflammation and support joint health and mobility."
              },
              {
                title: "Improves Gut Health",
                description: "Acts as a prebiotic to feed beneficial gut bacteria and promote digestive wellness."
              },
              {
                title: "Boosts Immune System",
                description: "Packed with vitamins and minerals that strengthen your immune system naturally."
              },
              {
                title: "Supports Thyroid Health",
                description: "The high iodine content helps maintain optimal thyroid function and energy levels."
              },
              {
                title: "Improves Sexual Health",
                description: "Contains compounds that may support reproductive health and vitality."
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

      {/* Usage Section */}
      <section className="section-y">
        <div className="container-rhl max-w-3xl">
          <h2 className="heading-2 mb-6">How to Use Irish Sea Moss</h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-card p-4 border border-border">
              <h3 className="font-semibold text-lg mb-2">As a Supplement</h3>
              <p className="text-muted-foreground">
                Take 1-2 capsules daily with water. For best results, take consistently for 30-90 days to experience 
                the full benefits.
              </p>
            </div>
            <div className="rounded-lg bg-card p-4 border border-border">
              <h3 className="font-semibold text-lg mb-2">In Smoothies</h3>
              <p className="text-muted-foreground">
                Add dried Irish Sea Moss to your favorite smoothie recipe for added nutrition and a natural thickener.
              </p>
            </div>
            <div className="rounded-lg bg-card p-4 border border-border">
              <h3 className="font-semibold text-lg mb-2">In Cooking</h3>
              <p className="text-muted-foreground">
                Use as a natural thickener in soups, stews, and other dishes for added nutritional benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-y bg-gradient-to-r from-green-600 to-green-700">
        <div className="container-rhl text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Transform Your Health?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Experience the incredible benefits of Irish Sea Moss. Join thousands of customers who have transformed their 
            health with Ray's Healthy Living.
          </p>
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded transition-colors">
            Shop Irish Moss Now
          </button>
        </div>
      </section>
    </div>
  );
}
