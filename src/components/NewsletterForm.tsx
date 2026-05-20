'use client';
import { useState, useRef } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/mjgzgzbn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New newsletter subscriber — Adithya AI Hub" }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("Server error");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center gap-3 text-center ${compact ? "py-4" : "py-8"}`}>
        <CheckCircle2 className="w-10 h-10 text-primary" />
        <p className="font-semibold">You're in! 🎉</p>
        <p className="text-sm text-muted-foreground">
          Expect weekly AI tutorials, project breakdowns, and career insights in your inbox.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
        <input
          id="newsletter-email-compact"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-smooth"
        />
        <Button
          type="submit"
          variant="hero"
          size="sm"
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-card border border-border p-8 md:p-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Get AI Tutorials in Your Inbox
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Weekly posts on LangChain, Python, interview prep, and real project breakdowns.
          No spam. Unsubscribe anytime.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@email.com"
            required
            className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth"
          />
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={status === "loading"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Subscribe <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </form>

        {errorMsg && (
          <p className="mt-3 text-sm text-destructive">{errorMsg}</p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Join 100+ readers learning AI every week.
        </p>
      </div>
    </div>
  );
}
