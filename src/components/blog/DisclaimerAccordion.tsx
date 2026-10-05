import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DisclaimerAccordionProps {
  text: string;
}

export function DisclaimerAccordion({ text }: DisclaimerAccordionProps) {
  return (
    <Accordion type="single" collapsible className="mt-4 rounded-xl border border-border px-5">
      <AccordionItem value="disclaimer" className="border-b-0">
        <AccordionTrigger className="text-sm font-semibold">
          Health &amp; Educational Disclaimer
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
