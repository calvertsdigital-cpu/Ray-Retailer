/**
 * DisclaimerAccordion — collapsible Health & Educational Disclaimer.
 * Required on every article. Closed by default.
 */
import * as Accordion from "@radix-ui/react-accordion";
import { Plus, AlertCircle } from "lucide-react";

interface DisclaimerAccordionProps {
  text: string;
}

export function DisclaimerAccordion({ text }: DisclaimerAccordionProps) {
  return (
    <div className="mt-4">
      <Accordion.Root type="single" collapsible>
        <Accordion.Item
          value="disclaimer"
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm transition-colors hover:bg-gray-50 group"
              style={{ color: "var(--foreground)" }}
            >
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" style={{ color: "var(--caution-foreground, #b45309)" }} aria-hidden="true" />
                Health &amp; Educational Disclaimer
              </span>
              <Plus
                className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45"
                style={{ color: "var(--muted-foreground)" }}
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {text}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
