import { Link } from "@tanstack/react-router";

interface U20XPromoProps {
  headline?: string;
  copy?: string;
  ctaLabel?: string;
  ctaPath?: string;
  imageUrl?: string;
}

export function U20XPromo({
  headline = "TURN KNOWLEDGE INTO ACTION.",
  copy = "The U20X™ 20-day challenge turns what you learn into a daily practice — real habits, real results.",
  ctaLabel = "Take the Leap →",
  ctaPath = "/u20x",
}: U20XPromoProps) {
  return (
    <div
      className="rounded-xl overflow-hidden p-5 text-white"
      style={{
        background: "linear-gradient(135deg, var(--u20x-navy) 0%, var(--u20x-blue) 100%)",
      }}
    >
      <p className="text-sm font-bold tracking-widest uppercase text-white/90 mb-1">
        {headline}
      </p>
      <p className="text-sm text-white/80 leading-relaxed mb-4">{copy}</p>

      <Link
        to={ctaPath}
        className="inline-block rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/90"
        style={{ backgroundColor: "white", color: "var(--u20x-navy)" }}
      >
        {ctaLabel}
      </Link>

      {/* Trust badges */}
      <div className="mt-4 flex flex-wrap gap-3">
        {["✓ Real People", "✓ Real Habits", "✓ Real Results"].map((badge) => (
          <span key={badge} className="text-xs text-white/80">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
