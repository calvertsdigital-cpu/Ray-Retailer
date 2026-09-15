import { createFileRoute } from "@tanstack/react-router";

import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/condition-of-use")({
  head: () => ({
    meta: [
      { title: "Condition of Use | Ray's Healthy Living" },
      {
        name: "description",
        content: "The terms that apply when you browse, order from or otherwise use the Ray's Healthy Living website.",
      },
      { property: "og:title", content: "Condition of Use | Ray's Healthy Living" },
      { property: "og:description", content: "Terms that apply when you use the Ray's Healthy Living website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Information"
      title="Condition of use"
      intro="By using this website you agree to the terms set out below."
      sections={[
        {
          heading: "Use of this site",
          body: [
            "This website is provided for browsing our product range and reading our educational content. You agree not to use it in any way that damages it, interferes with other people's use of it, or breaks any applicable law.",
          ],
        },
        {
          heading: "Product information",
          body: [
            "We work to keep product names, descriptions, sizes and availability accurate. Labels and formulations can change, so always read the label on the product you receive before use.",
          ],
        },
        {
          heading: "Health information",
          body: [
            "Content on this site is educational. It does not diagnose, treat, cure or prevent any disease, and it is not a substitute for advice from a licensed healthcare provider.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "Text, imagery, logos and page designs on this site belong to Ray's Healthy Living or our suppliers, and may not be reproduced commercially without written permission.",
          ],
        },
        {
          heading: "Contacting us",
          body: ["Questions about these terms can be sent to info@rayshealthyliving.com."],
        },
      ]}
    />
  ),
});
