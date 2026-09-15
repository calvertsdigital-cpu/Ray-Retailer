import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { AccordionRow } from "@/data/types";

/** Renders the admin-managed "See Additional Product Information" rows. */
export function AdditionalInfoAccordion({ rows }: { rows: AccordionRow[] }) {
  const visible = rows.filter((r) => r.visible).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <Accordion type="single" collapsible className="w-full">
      {visible.map((row) => (
        <AccordionItem key={row.id} value={row.id}>
          <AccordionTrigger className="w-full py-5 text-left text-base font-semibold">{row.title}</AccordionTrigger>
          <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
            {row.body && <p>{row.body}</p>}
            {row.items && (
              <ul className="ml-5 list-disc space-y-1.5">
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {row.faqs && (
              <dl className="space-y-4">
                {row.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-foreground">{f.q}</dt>
                    <dd className="mt-1">{f.a}</dd>
                  </div>
                ))}
              </dl>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
