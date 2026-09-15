import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Phase 1 only: inquiry / waitlist capture. The originating health concern is
 * stored with the lead. No challenge content is generated here.
 */
export function ChallengeInquiry({
  buttonLabel,
  concernSlug,
  concernName,
}: {
  buttonLabel: string;
  concernSlug: string;
  concernName: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address so we can reply.");
      return;
    }
    setError(null);
    const lead = {
      name: data.get("name"),
      email,
      phone: data.get("phone"),
      message: data.get("message"),
      concernSlug,
      concernName,
      submittedAt: new Date().toISOString(),
    };
    try {
      const key = "rhl.challenge-leads.v1";
      const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      window.localStorage.setItem(key, JSON.stringify([...prev, lead]));
    } catch {
      /* storage unavailable */
    }
    setOpen(false);
    toast.success("You're on the waitlist. We'll be in touch soon.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Join the waitlist</DialogTitle>
          <DialogDescription>
            Tell us how to reach you and we will contact you when the {concernName.toLowerCase()} challenge opens.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <Label htmlFor="lead-name">Full name</Label>
            <Input id="lead-name" name="name" required autoComplete="name" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="lead-email">Email address</Label>
            <Input id="lead-email" name="email" type="email" required autoComplete="email" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="lead-phone">Phone (optional)</Label>
            <Input id="lead-phone" name="phone" type="tel" autoComplete="tel" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="lead-concern">Health concern</Label>
            <Input id="lead-concern" readOnly value={concernName} className="mt-1.5 bg-secondary" />
          </div>
          <div>
            <Label htmlFor="lead-message">Anything you'd like us to know (optional)</Label>
            <Textarea id="lead-message" name="message" rows={3} className="mt-1.5" />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full">
            Submit inquiry
          </Button>
          <p className="text-xs text-muted-foreground">
            This is an inquiry only. It is not medical advice and does not enrol you in a treatment programme.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
