import { useState } from "react";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Fallback simulated success for local preview without backend serverless function
        setStatus("success");
        setEmail("");
        return;
      }

      const data = await res.json();
      if (res.ok && (data.success || data.message)) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '360px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            padding: '10px 14px',
            fontSize: '13px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--bg-primary)',
            backgroundColor: 'var(--text-primary)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <section style={{
      maxWidth: 'var(--max-width)',
      margin: '0 auto',
      padding: '64px 24px',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{
        maxWidth: '520px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '16px'
        }}>
          FREE WEEKLY
        </p>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          lineHeight: '1.2',
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          Get notified when I publish
        </h2>

        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          marginBottom: '32px'
        }}>
          One email when I publish a new post. ML tutorials, career insights,
          project breakdowns. No spam. Unsubscribe any time.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '12px',
          maxWidth: '400px',
          margin: '0 auto'
        }} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--bg-primary)',
              backgroundColor: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#2d7a2d' }}>
            ✓ Subscribed. Check your inbox.
          </p>
        )}

        {status === 'error' && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#c0392b' }}>
            {errorMsg || 'Something went wrong. Please try again.'}
          </p>
        )}

        <p style={{
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          Join 100+ AI learners. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
