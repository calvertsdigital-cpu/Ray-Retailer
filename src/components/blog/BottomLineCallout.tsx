import { Leaf } from "lucide-react";

interface BottomLineCalloutProps {
  text: string;
}

export function BottomLineCallout({ text }: BottomLineCalloutProps) {
  if (!text) return null;

  return (
    <aside
      className="mt-10 rounded-xl border border-primary/30 bg-accent p-6"
      aria-label="The Bottom Line"
    >
      <div className="flex items-center gap-2 mb-2">
        <Leaf className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
        <h2 className="font-semibold text-primary text-base">The Bottom Line</h2>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
    </aside>
  );
}
