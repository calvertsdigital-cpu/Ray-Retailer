import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { X, Rocket, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * ChallengeInquiry — "Take the Leap" modal popup.
 * Opens as a centred overlay with a branded header.
 * Saves lead to localStorage (Phase 1 — no backend yet).
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
  const [open, setOpen]       = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal  = () => { setDone(false); setError(null); setOpen(true); };
  const closeModal = () => setOpen(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data  = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address so we can reply.");
      return;
    }
    setError(null);
    setLoading(true);

    const lead = {
      name:        data.get("name"),
      email,
      phone:       data.get("phone"),
      message:     data.get("message"),
      concernSlug,
      concernName,
      submittedAt: new Date().toISOString(),
    };

    try {
      const key  = "rhl.challenge-leads.v1";
      const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      window.localStorage.setItem(key, JSON.stringify([...prev, lead]));
    } catch { /* storage unavailable */ }

    // simulate brief async
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    setDone(true);
    toast.success("You're on the list! We'll be in touch soon.");
  };

  return (
    <>
      {/* ── Trigger button ── */}
      <Button size="lg" onClick={openModal}>
        {buttonLabel}
      </Button>

      {/* ── Overlay + Modal ── */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 10000, backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-modal-title"
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ maxWidth: 480, maxHeight: "90vh", display: "flex", flexDirection: "column" }}
          >
            {/* ── Branded header ── */}
            <div
              className="shrink-0 px-6 py-5"
              style={{ background: "linear-gradient(135deg, var(--u20x-navy, #001f3f) 0%, var(--u20x-blue, #0074d9) 100%)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Rocket className="h-5 w-5 text-white" aria-hidden="true" />
                    <p className="text-xs font-black tracking-widest uppercase text-white/70">
                      U20X™ Challenge
                    </p>
                  </div>
                  <h2
                    id="challenge-modal-title"
                    className="text-xl font-black text-white leading-tight"
                  >
                    Take the Leap
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    Join the <strong className="text-white">{concernName}</strong> 20-day challenge waitlist.
                    We'll reach out when it opens.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/20"
                  style={{ color: "white", background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {done ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center text-center py-6 gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--accent)", color: "var(--primary)" }}
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                      You're on the list!
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
                      We'll contact you when the {concernName.toLowerCase()} challenge opens.
                      Check your inbox for a confirmation.
                    </p>
                  </div>
                  <Button onClick={closeModal} className="mt-2">
                    Close
                  </Button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div>
                    <Label htmlFor="lead-name">Full name <span aria-hidden="true" style={{ color: "var(--destructive)" }}>*</span></Label>
                    <Input
                      id="lead-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-email">Email address <span aria-hidden="true" style={{ color: "var(--destructive)" }}>*</span></Label>
                    <Input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-phone">Phone (optional)</Label>
                    <Input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-concern">Health concern</Label>
                    <Input
                      id="lead-concern"
                      readOnly
                      value={concernName}
                      className="mt-1.5"
                      style={{ backgroundColor: "var(--secondary)" }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-message">Anything you'd like us to know (optional)</Label>
                    <Textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      placeholder="Your goals, questions, or anything else…"
                      className="mt-1.5"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-medium" style={{ color: "var(--destructive)" }}>
                      {error}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting…" : "Take the Leap →"}
                  </Button>

                  <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
                    This is an inquiry only. It is not medical advice and does not enrol you in a treatment programme.
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
