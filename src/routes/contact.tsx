import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Health Consultant Inquiry | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Contact Ray's Healthy Living in Prince Frederick, MD, or request a health consultant call about the support you're looking for.",
      },
      { property: "og:title", content: "Contact Ray's Healthy Living" },
      { property: "og:description", content: "Call, email or send us a message — a real person will reply." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-rhl section-y">
      <p className="eyebrow mb-2">We're here to help</p>
      <h1 className="heading-1">Contact us</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          className="rounded-xl border border-border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            toast.success("Thanks — we've received your message and will reply shortly.");
            form.reset();
          }}
        >
          <h2 className="heading-2">Send a message</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="c-name">Full name</Label>
              <Input id="c-name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="c-email">Email address</Label>
              <Input id="c-email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="c-phone">Phone (optional)</Label>
              <Input id="c-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="c-topic">What's it about?</Label>
              <Input id="c-topic" name="topic" placeholder="Order, product question, consultant" />
            </div>
          </div>
          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="c-message">Message</Label>
            <Textarea id="c-message" name="message" rows={5} required />
          </div>
          <Button type="submit" size="lg" className="mt-5">
            Send message
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            We reply to messages within one business day. For urgent medical concerns, contact a health professional.
          </p>
        </form>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-secondary p-6">
            <h2 className="text-base font-semibold">Visit or call</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                70 Solomons Island Rd S, Prince Frederick, MD 20678, United States
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+14434323295" className="hover:underline">
                  +1 (443) 432-3295
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@rayshealthyliving.com" className="hover:underline">
                  info@rayshealthyliving.com
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-base font-semibold">Store hours</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please confirm your current opening hours with us — the times shown here are placeholders: Mon–Fri
              9am–6pm, Sat 10am–4pm, Sun closed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
