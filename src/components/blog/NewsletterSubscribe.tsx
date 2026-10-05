/**
 * NewsletterSubscribe — sidebar card with email input, green Subscribe
 * button, and full idle / loading / success / error state machine.
 * Globally reusable. Matches mockup styling.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SubscribeState = "idle" | "loading" | "success" | "error";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
type FormValues = z.infer<typeof schema>;

interface NewsletterSubscribeProps {
  heading?: string;
  subtext?: string;
  consentText?: string;
}

export function NewsletterSubscribe({
  heading = "Stay Informed",
  subtext = "Get the latest health articles, tips, and updates from Ray's Healthy Living delivered to your inbox.",
  consentText = "We respect your privacy. No spam. You can unsubscribe at any time.",
}: NewsletterSubscribeProps) {
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormValues) => {
    setSubscribeState("loading");
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      setSubscribeState("success");
    } catch {
      setSubscribeState("error");
    }
  };

  return (
    <div
      className="rounded-xl border bg-white p-5"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Header row with envelope icon */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded"
          style={{ backgroundColor: "var(--primary)", color: "white" }}
          aria-hidden="true"
        >
          <Mail className="h-4 w-4" />
        </div>
        <h2 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
          {heading}
        </h2>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
        {subtext}
      </p>

      {subscribeState === "success" ? (
        <div
          className="rounded-lg border p-4 text-center"
          style={{ background: "var(--accent)", borderColor: "oklch(0.52 0.132 150.5 / 0.3)" }}
        >
          <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>
            You're on the list! ✓
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
            We'll send you wellness education you can trust.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <Input
              id="subscribe-email"
              type="email"
              placeholder="Your email address"
              aria-describedby={errors.email ? "subscribe-error" : undefined}
              disabled={subscribeState === "loading"}
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p
                id="subscribe-error"
                className="text-xs"
                style={{ color: "var(--destructive)" }}
                role="alert"
                aria-live="polite"
              >
                {errors.email.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={subscribeState === "loading"}
              className="w-full font-semibold"
            >
              {subscribeState === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
            {subscribeState === "error" && (
              <p
                className="text-xs text-center"
                style={{ color: "var(--destructive)" }}
                role="alert"
              >
                Something went wrong. Please try again.
              </p>
            )}
          </div>
          <p className="mt-3 text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
            {consentText}
          </p>
        </form>
      )}
    </div>
  );
}
