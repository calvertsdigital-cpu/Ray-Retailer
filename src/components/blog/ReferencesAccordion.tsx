import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ArticleReference } from "@/data/blog";

interface ReferencesAccordionProps {
  references: ArticleReference[];
}

export function ReferencesAccordion({ references }: ReferencesAccordionProps) {
  if (references.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="mt-8 rounded-xl border border-border px-5">
      <AccordionItem value="references" className="border-b-0">
        <AccordionTrigger className="text-sm font-semibold">
          References &amp; Sources ({references.length})
        </AccordionTrigger>
        <AccordionContent>
          <ol className="space-y-3 text-sm">
            {references.map((ref, idx) => (
              <li key={ref.id} className="flex gap-2">
                <span className="shrink-0 text-muted-foreground">{idx + 1}.</span>
                <div>
                  {ref.url ? (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary underline"
                    >
                      {ref.title}
                    </a>
                  ) : (
                    <span className="font-medium">{ref.title}</span>
                  )}
                  {(ref.authors || ref.publisher || ref.year) && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {[ref.authors, ref.publisher, ref.year].filter(Boolean).join(". ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
