import { createFileRoute } from "@tanstack/react-router";

import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "How Ray's Healthy Living ships your order, delivery timeframes, and how to return or exchange an item within 30 days.",
      },
      { property: "og:title", content: "Shipping & Returns | Ray's Healthy Living" },
      { property: "og:description", content: "Delivery timeframes, shipping costs and our 30-day return process." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Information"
      title="Shipping & returns"
      intro="How your order reaches you, and what to do if something isn't right."
      sections={[
        {
          heading: "Processing time",
          body: [
            "Orders placed before 1pm on a business day are usually packed the same day. Orders placed at the weekend or on a public holiday are packed on the next business day.",
          ],
        },
        {
          heading: "Delivery",
          body: [
            "Standard delivery within the continental United States typically arrives in 2–5 business days once dispatched. Tracking details are emailed as soon as your parcel leaves us.",
            "Free standard shipping applies to qualifying orders. Expedited options are shown at checkout where available.",
          ],
        },
        {
          heading: "Returns",
          body: [
            "You may return an unopened item within 30 days of delivery for a refund of the item, less any outbound shipping. Opened items can be returned if the product arrived damaged or is not what you ordered.",
            "Email info@rayshealthyliving.com with your order number and we will send return instructions. Refunds are issued to the original payment method once the return is received and checked.",
          ],
        },
        {
          heading: "Damaged or missing items",
          body: [
            "Tell us within 7 days of delivery and include a photo where possible. We will replace the item or refund it — whichever you prefer.",
          ],
        },
      ]}
    />
  ),
});
