/**
 * BottomLineCallout — light green tinted box with leaf icon.
 * Matches the mockup "The Bottom Line" section.
 */
import { Leaf } from "lucide-react";

interface BottomLineCalloutProps {
  text: string;
}

export function BottomLineCallout({ text }: BottomLineCalloutProps) {
  return (
    <div
      className="mt-10 flex gap-4 rounded-xl border p-5"
      style={{
        backgroundColor: "oklch(0.955 0.021 150)",   /* --accent */
        borderColor: "oklch(0.52 0.132 150.5 / 0.3)", /* primary/30 */
      }}
    >
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--primary)", color: "white" }}
        aria-hidden="true"
      >
        <Leaf className="h-4 w-4" />
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>
          The Bottom Line
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          {text}
        </p>
      </div>
    </div>
  );
}
