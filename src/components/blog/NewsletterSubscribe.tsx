import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
  subtext = "Get trusted wellness education delivered to your inbox.",
  consentText = "No spam. Unsubscribe any time. See Privacy Policy.",
}: NewsletterSubscribeProps) {
  const [state, setState] = useState<SubscribeState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormValues) => {
    setState("loading");
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold text-sm text-foreground mb-1">{heading}</h2>
      <p className="text-xs text-muted-foreground mb-3">{subtext}</p>

      {state === "success" ? (
        <div className="rounded-lg bg-accent border border-primary/30 p-4 text-center">
          <p className="text-sm font-semibold text-primary">You're on the list!</p>
          <p className="mt-1 text-xs text-muted-foreground">
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
              placeholder="your@email.com"
              aria-describedby={errors.email ? "subscribe-error" : undefined}
              disabled={state === "loading"}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="subscribe-error"
                className="text-xs text-destructive"
                role="alert"
                aria-live="polite"
              >
                {errors.email.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={state === "loading"}
              className="w-full"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
            {state === "error" && (
              <p className="text-xs text-destructive text-center" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center">{consentText}</p>
        </form>
      )}
    </div>
  );
}
