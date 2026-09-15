import { Headphones, Lock, RotateCcw, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Free Shipping", text: "On orders over $99" },
  { icon: RotateCcw, title: "30-Day Guarantee", text: "Money-back promise" },
  { icon: Lock, title: "Safe Payment", text: "Encrypted checkout" },
  { icon: Headphones, title: "Online Support", text: "Real people, 7 days a week" },
];

export function TrustBar() {
  return (
    <section aria-label="Store promises" className="border-y border-border bg-cream">
      <div className="container-rhl grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary-dark">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
