/**
 * U20XBridge
 * Lightweight challenge callout card.
 * Renders only when relatedU20xChallenge is non-empty.
 * Links to /u20x/<slug>.
 */

import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface U20XBridgeProps {
  /** Challenge slug (e.g. "morning-coffee-ritual") */
  slug: string;
  /** Challenge title shown on card */
  title: string;
  /** One sentence description */
  description: string;
  /** CTA button label */
  ctaLabel?: string;
  className?: string;
}

export function U20XBridge({
  slug,
  title,
  description,
  ctaLabel = "Start this challenge →",
  className = "",
}: U20XBridgeProps) {
  return (
    <div className={`rounded-lg border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 p-6 ${className}`}>
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700">U20X™ Challenge</p>
      </div>
      <h3 className="mb-2 text-lg font-bold text-blue-900">{title}</h3>
      <p className="mb-4 text-sm text-blue-800">{description}</p>
      <Link
        to={`/u20x/${slug}`}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        {ctaLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
