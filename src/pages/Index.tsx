import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

const archNodes = [
  { label: 'User Query / Voice Intake', accent: false },
  { label: 'Triage Agent', accent: true },
  { label: 'Drug Interaction Agent', accent: true },
  { label: 'Pinecone RAG — WHO/ICD-10/OpenFDA', accent: true },
  { label: 'AWS Bedrock — Claude 3 Sonnet', accent: true },
  { label: 'PDF Clinical Report + FHIR Output', accent: false },
];

const smallProjects = [
  {
    tag: 'Real Estate AI',
    name: 'TownRise AI',
    desc: 'Zero-cost real estate intelligence platform for Tamil Nadu. OpenStreetMap, Gemini API, Supabase, GitHub Actions nightly refresh.',
    tech: ['Next.js', 'Supabase', 'Gemini API'],
    github: 'https://github.com/Adithya0805',
    demo: 'https://townrise-ai.vercel.app',
  },
  {
    tag: 'Gov Tech · Tamil Nadu',
    name: 'Urimai AI',
    desc: 'Multi-agent Tamil Nadu government scheme eligibility assistant. 64 schemes, 199 rules, Tamil conversational intake. 49/49 tests passing.',
    tech: ['LangGraph', 'FastAPI', 'Supabase', 'Tamil NLP'],
    github: 'https://github.com/Adithya0805',
    demo: null,
  },
];

export default function Index() {
  return (
    <Layout>
      <Helmet>
        <title>Adithya Kuppusamy — AI Engineer</title>
        <meta
          name="description"
          content="AI Engineer building real systems for real problems. LangGraph · RAG · AWS Bedrock · Pinecone. Based in Tamil Nadu, India."
        />
        <meta property="og:title" content="Adithya Kuppusamy — AI Engineer" />
        <meta property="og:description" content="Building clinical AI, real estate intelligence, and Tamil Nadu government tools." />
        <meta property="og:url" content="https://adithyaai.is-cool.dev/" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '140px 32px 100px',
        borderBottom: '1px solid var(--border)'
      }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          border: '1px solid var(--border)', borderRadius: '4px',
          padding: '6px 14px', marginBottom: '40px'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#4ade80', display: 'block', flexShrink: 0
          }} />
          <span style={{
            fontSize: '12px', color: 'var(--text-2)', letterSpacing: '0.5px'
          }}>
            Available for freelance · Ambur, Tamil Nadu
          </span>
        </div>

        {/* Big headline */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(44px, 7vw, 88px)',
          fontWeight: '400',
          lineHeight: '1.05',
          letterSpacing: '-2px',
          color: 'var(--text-1)',
          maxWidth: '800px',
          marginBottom: '32px'
        }}>
          AI Engineer building<br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
            real systems
          </span> for<br />
          real problems.
        </h1>

        {/* One-line bio */}
        <p style={{
          fontSize: '17px', color: 'var(--text-2)',
          lineHeight: '1.7', maxWidth: '520px', marginBottom: '48px'
        }}>
          B.Tech AI & DS · LangGraph · RAG · AWS Bedrock · Pinecone.
          Building clinical AI, real estate intelligence, and
          Tamil Nadu government tools.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/work" style={{
            padding: '12px 28px', background: 'var(--text-1)',
            color: 'var(--bg-0)', fontSize: '14px', fontWeight: '600',
            textDecoration: 'none', borderRadius: '4px'
          }}>View Projects →</a>
          <a href="/blog" style={{
            padding: '12px 28px', border: '1px solid var(--border)',
            color: 'var(--text-1)', fontSize: '14px',
            textDecoration: 'none', borderRadius: '4px'
          }}>Read Blog</a>
          <a href="/freelance" style={{
            padding: '12px 28px', border: '1px solid rgba(200,169,110,0.3)',
            color: 'var(--accent)', fontSize: '14px',
            textDecoration: 'none', borderRadius: '4px'
          }}>Freelance Work</a>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────── */}
      <section style={{
        maxWidth: 'var(--max)', margin: '0 auto', padding: '80px 32px'
      }}>
        {/* Section header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '48px'
        }}>
          <div>
            <p style={{
              fontSize: '11px', color: 'var(--text-3)',
              letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px'
            }}>Selected Work</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: '36px',
              fontWeight: '400', letterSpacing: '-0.5px', color: 'var(--text-1)'
            }}>Projects</h2>
          </div>
          <a href="/work" style={{
            fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none'
          }}>All projects →</a>
        </div>

        {/* MediGuard — hero card */}
        <div style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: '12px', padding: '48px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'center'
        }} className="flagship-grid">
          {/* Left — description */}
          <div>
            <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '24px' }}>
              <span style={{
                fontSize: '11px', color: 'var(--accent)',
                border: '1px solid rgba(200,169,110,0.3)',
                padding: '3px 10px', borderRadius: '3px',
                letterSpacing: '1px', textTransform: 'uppercase'
              }}>Flagship</span>
              <span style={{
                fontSize: '11px', color: 'var(--text-3)',
                border: '1px solid var(--border)',
                padding: '3px 10px', borderRadius: '3px',
                letterSpacing: '1px', textTransform: 'uppercase'
              }}>Healthcare AI</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)', fontSize: '40px',
              fontWeight: '400', letterSpacing: '-1px',
              lineHeight: '1.1', marginBottom: '16px', color: 'var(--text-1)'
            }}>MediGuard V2</h3>

            <p style={{
              fontSize: '15px', color: 'var(--text-2)',
              lineHeight: '1.8', marginBottom: '32px'
            }}>
              Clinical AI decision support. 5-agent LangGraph pipeline,
              Pinecone RAG over WHO/ICD-10/OpenFDA data, AWS Bedrock inference,
              FHIR import, PDF clinical reports, voice intake, DeepEval safety.
              Deployed on Google Cloud Run.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {['LangGraph', 'Pinecone', 'AWS Bedrock', 'FastAPI', 'Next.js', 'Supabase'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--text-3)', border: '1px solid var(--border)',
                  padding: '4px 10px', borderRadius: '3px'
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com/Adithya0805" target="_blank" rel="noreferrer" style={{
                fontSize: '13px', fontWeight: '600',
                color: 'var(--text-1)', textDecoration: 'none'
              }}>GitHub →</a>
              <a href="/blog/how-i-built-mediaguard-multi-agent-ai-system" style={{
                fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none'
              }}>Case Study →</a>
            </div>
          </div>

          {/* Right — architecture visual */}
          <div className="arch-diagram" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {archNodes.map((node, i) => (
              <div key={i}>
                <div style={{
                  padding: '10px 16px',
                  background: node.accent
                    ? 'rgba(200,169,110,0.08)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${node.accent
                    ? 'rgba(200,169,110,0.2)'
                    : 'var(--border)'}`,
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: node.accent ? 'var(--accent)' : 'var(--text-3)'
                }}>{node.label}</div>
                {i < archNodes.length - 1 && (
                  <div style={{
                    width: '1px', height: '8px',
                    background: 'var(--border)', margin: '0 auto'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TownRise + Urimai — 2-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          className="projects-grid">
          {smallProjects.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-1)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '36px',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <span style={{
                fontSize: '11px', color: 'var(--text-3)',
                letterSpacing: '1px', textTransform: 'uppercase'
              }}>{p.tag}</span>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '28px',
                fontWeight: '400', margin: '12px 0',
                letterSpacing: '-0.5px', color: 'var(--text-1)'
              }}>{p.name}</h3>
              <p style={{
                fontSize: '14px', color: 'var(--text-2)',
                lineHeight: '1.7', marginBottom: '24px'
              }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-3)', border: '1px solid var(--border)',
                    padding: '3px 8px', borderRadius: '3px'
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href={p.github} target="_blank" rel="noreferrer" style={{
                  fontSize: '13px', fontWeight: '600',
                  color: 'var(--text-1)', textDecoration: 'none'
                }}>GitHub →</a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" style={{
                    fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none'
                  }}>Live →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
