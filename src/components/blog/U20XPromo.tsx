/**
 * U20XPromo — navy-to-blue gradient card with background image overlay.
 * Globally reusable. Matches the mockup: U20X™ badge, bold headline,
 * body copy, white "Take the Leap →" CTA button, trust badge row.
 */
import { Link } from "@tanstack/react-router";
import { IMAGES } from "@/data/placeholder-images";

interface U20XPromoProps {
  headline?: string;
  copy?: string;
  ctaLabel?: string;
  ctaPath?: string;
  backgroundImageUrl?: string;
}

export function U20XPromo({
  headline = "TURN KNOWLEDGE INTO ACTION.",
  copy = "You've learned how to support better circulation. Now it's time to take the next step. U20X helps you build daily habits, stay motivated, and achieve a healthier, more active life.",
  ctaLabel = "Take the Leap →",
  ctaPath = "/health-concerns",
  backgroundImageUrl = IMAGES.u20xBackground.url,
}: U20XPromoProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden p-5 text-white"
      style={{
        background: `linear-gradient(135deg, var(--u20x-navy) 0%, var(--u20x-blue) 100%)`,
        minHeight: "220px",
      }}
    >
      {/* Background image at low opacity */}
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
      )}

      {/* Content — sits above the bg image */}
      <div className="relative z-10 flex flex-col h-full">
        {/* U20X badge */}
        <div className="mb-3">
          <span
            className="inline-block rounded px-2 py-0.5 text-xs font-black tracking-widest"
            style={{ backgroundColor: "var(--u20x-blue)", color: "white" }}
          >
            U20X™
          </span>
        </div>

        {/* Headline */}
        <p className="font-black text-white leading-tight mb-3" style={{ fontSize: "1.1rem" }}>
          {headline}
        </p>

        {/* Body copy */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
          {copy}
        </p>

        {/* CTA button */}
        <Link
          to={ctaPath as "/health-concerns"}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 self-start"
          style={{ backgroundColor: "var(--u20x-blue)", color: "white" }}
        >
          {ctaLabel}
        </Link>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap gap-4">
          {[
            { icon: "👤", label: "REAL PEOPLE" },
            { icon: "🔄", label: "REAL HABITS" },
            { icon: "📊", label: "REAL RESULTS" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              <span aria-hidden="true">{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
