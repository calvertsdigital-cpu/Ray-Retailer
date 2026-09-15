import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, ShieldAlert, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Health Disclaimer | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Ray's Healthy Living provides educational wellness information only. Our products do not diagnose, treat, cure or prevent any disease.",
      },
      { property: "og:title", content: "Health Disclaimer | Ray's Healthy Living" },
      {
        property: "og:description",
        content: "Educational wellness information only — always consult a licensed healthcare provider.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DisclaimerPage,
});

const points = [
  {
    icon: ShieldAlert,
    title: "Not a medical service",
    text: "We do not diagnose conditions, prescribe treatment or provide medical care. Nothing on this site should be read as a diagnosis.",
  },
  {
    icon: Stethoscope,
    title: "Talk to your provider",
    text: "Speak with a licensed healthcare provider before starting any supplement, especially if you are pregnant, nursing, taking medication or managing a diagnosed condition.",
  },
  {
    icon: HeartPulse,
    title: "Urgent symptoms need care",
    text: "If you are experiencing severe or worsening symptoms, seek medical attention immediately rather than relying on any product or guide on this site.",
  },
];

function DisclaimerPage() {
  return (
    <div className="container-rhl section-y max-w-3xl">
      <p className="eyebrow mb-2">Medical responsibility</p>
      <h1 className="heading-1">Health disclaimer</h1>
      <p className="mt-3 text-muted-foreground">
        Ray's Healthy Living sells food supplements and herbal products, and publishes educational wellness content. We
        take that responsibility seriously, so here is exactly what our information is — and is not.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p.icon className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="mt-3 text-base font-semibold">{p.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-secondary p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider">Regulatory statement</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          These statements have not been evaluated by the Food and Drug Administration. These products are not intended
          to diagnose, treat, cure or prevent any disease. Individual results vary, and no outcome is guaranteed.
        </p>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Questions? <Link to="/contact" className="font-semibold text-primary hover:underline">Contact our team</Link> and
        a health consultant will get back to you.
      </p>
    </div>
  );
}
