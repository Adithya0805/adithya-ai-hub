import { useState, useEffect } from "react";
import { isSubscriber, getSubscriberEmail, saveSubscriber } from "@/utils/subscriber";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    if (isSubscriber()) {
      setAlreadySubscribed(true);
      const savedEmail = getSubscriberEmail();
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    // Backup and save to unified subscriber store
    try {
      saveSubscriber(email.trim());
    } catch {
      // ignore
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: 'AI Learner'
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setAlreadySubscribed(true);
        saveSubscriber(email.trim());
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      if (window.location.hostname === 'localhost') {
        setStatus('success');
        setAlreadySubscribed(true);
        saveSubscriber(email.trim());
      } else {
        setStatus('error');
        setErrorMsg('Network error. Your email was saved in local backup.');
      }
    }
  };

  if (compact) {
    return (
      <div style={{ maxWidth: '360px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
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
        {alreadySubscribed && status === 'idle' && (
          <p style={{ color: 'var(--accent)', fontSize: '11.5px', marginTop: '6px' }}>
            ✓ Subscribed — All tools unlocked
          </p>
        )}
        {status === 'success' && (
          <div>
            <p style={{ color: '#2d7a2d', fontSize: '13px', marginTop: '8px' }}>
              ✓ Subscribed! Check your inbox for a welcome email.
            </p>
          </div>
        )}
        {status === 'error' && (
          <p style={{ color: '#c0392b', fontSize: '13px', marginTop: '8px' }}>
            {errorMsg}
          </p>
        )}
      </div>
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

        {alreadySubscribed && status === 'idle' && (
          <div style={{ marginTop: '14px' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: 'rgba(200, 169, 110, 0.1)',
              border: '1px solid rgba(200, 169, 110, 0.3)',
              borderRadius: '20px',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              ✓ Subscribed to Adithya AI Hub — VIP Tools Unlocked
            </span>
          </div>
        )}

        {status === 'success' && (
          <div>
            <p style={{ color: '#2d7a2d', fontSize: '15px', marginTop: '16px' }}>
              ✓ Subscribed! Check your inbox for a welcome email.
            </p>
          </div>
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
