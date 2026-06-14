'use client';
import { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, Loader2, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, name: name.trim() || "AI Learner" }),
      });

      // Handle non-JSON response fallbacks gracefully (e.g. local dev servers or routing errors)
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setStatus("error");
        setErrorMsg("API route returned a non-JSON response. If running locally, please run using 'vercel dev' instead of 'npm run dev' to activate serverless backend functions.");
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Server responded with an error. Please check your credentials.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      setStatus("error");
      setErrorMsg(error.message || "Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center gap-3 text-center w-full max-w-xl mx-auto ${compact ? "py-4" : "py-10 px-6 rounded-2xl border border-primary/30 bg-card/20 shadow-[0_0_40px_rgba(6,182,212,0.1)]"}`}>
        <CheckCircle2 className="w-12 h-12 text-primary animate-bounce" />
        <h3 className="text-xl font-bold text-foreground">You're in! 🎉 Check your inbox now!</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your <strong className="text-foreground">free PDF</strong> with the Top 10 CTS/Wipro Python questions is on its way.
          Please check your spam/promotions folder if it doesn't arrive within 2 minutes.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-col w-full max-w-md gap-2">
        <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            id="newsletter-email-compact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email for the free PDF"
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
        {status === "error" && errorMsg && (
          <p className="text-xs text-destructive mt-1 font-medium bg-destructive/10 py-1.5 px-3 rounded border border-destructive/20">{errorMsg}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/30 overflow-hidden relative shadow-[0_0_40px_rgba(6,182,212,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative grid md:grid-cols-2 gap-0">
        {/* Left — PDF offer visual */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold w-fit mb-5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            FREE LEAD MAGNET
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
            Get the Free PDF —<br />
            <span className="text-gradient">Top 10 CTS/Wipro</span><br />
            Python Coding Questions
          </h2>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            The exact Python questions asked in Cognizant (CTS) and Wipro hiring tests — with full working solutions, time complexity analysis, and how to explain your logic clearly to interviewers.
          </p>

          <ul className="mt-5 space-y-2.5">
            {[
              "10 real interview questions with full solutions",
              "Time & space complexity for each answer",
              "How to explain your logic to interviewers",
              "+ Weekly AI/ML tutorials in your inbox",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-card/40 border-l border-border/60">
          <div className="flex items-center justify-center w-16 h-20 rounded-xl bg-primary/10 border border-primary/25 mb-6 mx-auto relative shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <FileText className="w-8 h-8 text-primary" />
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded">
              FREE
            </span>
          </div>

          <h3 className="text-center font-semibold text-lg mb-1 text-foreground">Get Instant Access</h3>
          <p className="text-center text-xs text-muted-foreground mb-6">
            Join 100+ AI learners. No spam, unsubscribe anytime.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <input
              id="newsletter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name (optional)"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth text-foreground"
            />
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@email.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth text-foreground"
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={status === "loading"}
              className="w-full mt-2 font-bold group"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Send Me the Free PDF <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {status === "error" && errorMsg && (
            <p className="mt-3 text-sm text-destructive text-center font-medium bg-destructive/10 py-2 px-3 rounded-lg border border-destructive/20 leading-relaxed shadow-sm">{errorMsg}</p>
          )}

          <p className="mt-4 text-[11px] text-muted-foreground text-center">
            By subscribing you agree to receive weekly AI tutorials. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
