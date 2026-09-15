import { createFileRoute } from "@tanstack/react-router";

import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Ray's Healthy Living" },
      {
        name: "description",
        content: "What personal information Ray's Healthy Living collects, how it is used, and the choices you have.",
      },
      { property: "og:title", content: "Privacy Policy | Ray's Healthy Living" },
      { property: "og:description", content: "How we collect, use and protect your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Information"
      title="Privacy policy"
      intro="We collect the minimum information needed to answer your questions and fulfil your orders."
      sections={[
        {
          heading: "What we collect",
          body: ["We collect information you give us directly, plus basic technical information about your visit."],
          items: [
            "Name, email address and phone number when you contact us or join a waitlist",
            "Delivery and billing details when you place an order",
            "Health concern selected on an enquiry form, so we can respond usefully",
            "Anonymous usage data such as pages viewed and device type",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To answer enquiries, process and deliver orders, send the newsletter you asked for, and improve how the site works. We do not sell your personal information.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "We share information only with the providers who help us operate — for example delivery carriers and payment processors — and only what they need to do that job.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can unsubscribe from the newsletter at any time using the link in any email, and you can ask us to correct or delete the information we hold by emailing info@rayshealthyliving.com.",
          ],
        },
      ]}
    />
  ),
});
