import { createFileRoute } from "@tanstack/react-router";

import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Sale | Ray's Healthy Living" },
      {
        name: "description",
        content: "The terms that apply to orders placed with Ray's Healthy Living, including acceptance and cancellation.",
      },
      { property: "og:title", content: "Terms of Sale | Ray's Healthy Living" },
      { property: "og:description", content: "Order acceptance, cancellation and liability terms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Information"
      title="Terms of sale"
      intro="These terms apply to every order placed through this website."
      sections={[
        {
          heading: "Orders",
          body: [
            "Your order is an offer to buy. It is accepted when we confirm dispatch. If an item turns out to be unavailable we will tell you and cancel that line.",
          ],
        },
        {
          heading: "Changes and cancellation",
          body: [
            "Contact us as soon as possible if you need to change or cancel an order. Once a parcel has been dispatched, the returns process applies instead.",
          ],
        },
        {
          heading: "Suitability",
          body: [
            "Supplements are not suitable for everyone. If you are pregnant, nursing, taking prescription medication or managing a diagnosed condition, speak with your healthcare provider before using any product you buy from us.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "Nothing in these terms limits any right you have under applicable consumer law. Our liability is otherwise limited to the value of the affected order.",
          ],
        },
      ]}
    />
  ),
});
