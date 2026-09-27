import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

const aranyaFeatures = [
  'Full e-commerce catalog (32 products)',
  'Supabase backend + RLS security',
  'Admin panel with image upload',
  'WhatsApp order integration',
  'Order tracking (customer-facing)',
  'Low-stock alerts to client',
  'Farm-visit booking system',
  'RAG-powered Ask Farm AI chatbot',
  'Mobile-first app-like experience',
  'Custom domain (GoDaddy + Vercel)',
];

const aranyaTech = ['Next.js', 'Supabase', 'Gemini RAG', 'Vercel', 'WhatsApp API', 'GoDaddy'];
const carTech = ['React', 'Tailwind', 'Fare Calculator', 'WhatsApp CTA', 'Vercel'];

export function Freelance() {
  return (
    <Layout>
      <Helmet>
        <title>Freelance — Adithya Kuppusamy</title>
        <meta
          name="description"
          content="FutureLogic AI — production-grade web platforms for Tamil Nadu businesses. E-commerce, AI tools, booking systems."
        />
      </Helmet>

      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '120px 32px' }}>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div style={{
          marginBottom: '80px', borderBottom: '1px solid var(--border)', paddingBottom: '48px'
        }}>
          <p style={{
            fontSize: '11px', color: 'var(--text-3)',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'
          }}>Freelance Work</p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '400', letterSpacing: '-2px', lineHeight: '1.05',
            marginBottom: '24px', color: 'var(--text-1)'
          }}>
            Building real products<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>for real businesses.</span>
          </h1>
          <p style={{
            fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.8', maxWidth: '500px'
          }}>
            Under FutureLogic AI, I build production-grade web platforms
            for Tamil Nadu businesses — full stack, AI-powered,
            mobile-first. Not student projects. Real tools that generate revenue.
          </p>
        </div>

        {/* ── Client 01 — Aranya Organic Dairy Farm ─────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: '48px', paddingBottom: '64px',
          marginBottom: '64px', borderBottom: '1px solid var(--border)'
        }} className="flagship-grid">
          {/* Left meta */}
          <div>
            <p style={{
              fontSize: '11px', color: 'var(--accent)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px'
            }}>Client 01</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: '28px',
              fontWeight: '400', letterSpacing: '-0.5px', marginBottom: '16px',
              color: 'var(--text-1)'
            }}>Aranya Organic Dairy Farm</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '8px' }}>
              Shoolagiri, Hosur, Tamil Nadu
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px' }}>
              9 years in business · Organic dairy + grocery
            </p>
            <a
              href="https://aranyaorganicdairyfarm.com"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '13px', color: 'var(--accent)',
                textDecoration: 'none', fontWeight: '500'
              }}
            >aranyaorganicdairyfarm.com →</a>
          </div>

          {/* Right — what was built */}
          <div>
            <p style={{
              fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.8', marginBottom: '32px'
            }}>
              Full-stack e-commerce platform for a 9-year-old organic farm business
              expanding from local delivery to South India-wide shipping.
              Built with Supabase backend, real product catalog (32 items across
              6 categories), cart and checkout, WhatsApp order integration,
              admin panel with image upload, order tracking, low-stock alerts,
              farm-visit booking, and an AI chat assistant with RAG over
              farm content. Custom domain live on Vercel.
            </p>

            {/* Features grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
              marginBottom: '32px'
            }}>
              {aranyaFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '14px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {aranyaTech.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--text-3)', border: '1px solid var(--border)',
                  padding: '4px 10px', borderRadius: '3px'
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Client 02 — Car Rental & Travels ─────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: '48px', paddingBottom: '64px',
          marginBottom: '80px', borderBottom: '1px solid var(--border)'
        }} className="flagship-grid">
          <div>
            <p style={{
              fontSize: '11px', color: 'var(--accent)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px'
            }}>Client 02</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: '28px',
              fontWeight: '400', letterSpacing: '-0.5px', marginBottom: '16px',
              color: 'var(--text-1)'
            }}>Car Rental & Travels</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '8px' }}>
              Tamil Nadu
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
              Intercity · Outstation · Self-drive
            </p>
          </div>

          <div>
            <p style={{
              fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.8', marginBottom: '32px'
            }}>
              Professional booking platform for a Tamil Nadu car rental and
              intercity travels business. One-way and round-trip fare calculator,
              vehicle selector (Sedan ₹14/km, SUV ₹20/km, MUV ₹21/km),
              driver bata rules, popular routes grid, fleet comparison table,
              WhatsApp and call CTAs, fully mobile-responsive app-like experience.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {carTech.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--text-3)', border: '1px solid var(--border)',
                  padding: '4px 10px', borderRadius: '3px'
                }}>{t}</span>
              ))}
            </div>

            <p style={{
              fontSize: '13px', color: 'var(--text-3)',
              fontStyle: 'italic'
            }}>In progress — delivery Q4 2026</p>
          </div>
        </div>

        {/* ── Hire Me ───────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--bg-1)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '48px', textAlign: 'center'
        }}>
          <p style={{
            fontSize: '11px', color: 'var(--text-3)',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'
          }}>Work With Me</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '40px',
            fontWeight: '400', letterSpacing: '-1px', marginBottom: '16px',
            color: 'var(--text-1)'
          }}>Have a project in mind?</h2>
          <p style={{
            fontSize: '15px', color: 'var(--text-2)',
            lineHeight: '1.7', maxWidth: '480px',
            margin: '0 auto 36px'
          }}>
            I build professional web platforms for Tamil Nadu businesses —
            e-commerce, booking systems, AI-powered tools, and custom
            web applications. Fixed price, fast delivery, real results.
          </p>
          <a
            href="mailto:adithyaadhi0805@gmail.com"
            style={{
              display: 'inline-block', padding: '14px 36px',
              background: 'var(--accent)', color: 'var(--bg-0)',
              fontSize: '14px', fontWeight: '600',
              textDecoration: 'none', borderRadius: '4px',
              letterSpacing: '0.3px'
            }}
          >Get in touch →</a>
        </div>

      </div>
    </Layout>
  );
}

export default Freelance;
