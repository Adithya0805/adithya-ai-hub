import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/Layout'
import { NeuralCanvas } from '@/components/NeuralCanvas'
import { TypeWriter } from '@/components/TypeWriter'
import { Reveal } from '@/components/Reveal'
import { GlowOrb } from '@/components/GlowOrb'

/* ── Data ─────────────────────────────────────────────────────────── */

const typewriterWords = [
  'Multi-Agent Clinical AI',
  'Tamil Nadu Gov Scheme Tools',
  'Real Estate Intelligence',
  'RAG Knowledge Systems',
  'Production FastAPI Backends',
  'Full Stack AI Platforms',
]

const stats = [
  { number: '5+', label: 'AI Systems Shipped' },
  { number: '2', label: 'Freelance Clients Live' },
  { number: '8', label: 'Service Areas' },
  { number: '100%', label: 'Production Deployed' },
]

const techStack = [
  'LangGraph', 'Pinecone RAG', 'AWS Bedrock', 'FastAPI', 'Next.js',
  'Supabase', 'Gemini API', 'Docker', 'GitHub Actions', 'Google Cloud Run',
  'TypeScript', 'Python', 'React', 'Tailwind', 'PostgreSQL', 'Whisper',
  'Tamil NLP', 'LangChain', 'OpenAI', 'DeepEval',
]

const archNodes = [
  { label: 'User Query / Voice Intake', accent: false },
  { label: 'Triage Agent', accent: true },
  { label: 'Drug Interaction Agent', accent: true },
  { label: 'Pinecone RAG — WHO/ICD-10/OpenFDA', accent: true },
  { label: 'AWS Bedrock — Claude 3 Sonnet', accent: true },
  { label: 'PDF Clinical Report + FHIR Output', accent: false },
]

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
]

/* ── Page ─────────────────────────────────────────────────────────── */

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

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Neural network canvas */}
        <NeuralCanvas />

        {/* Ambient glow orbs */}
        <GlowOrb top="30%" left="20%" size={700} opacity={0.07} />
        <GlowOrb top="60%" left="70%" size={500} color="100, 160, 255" opacity={0.04} />

        {/* Content */}
        <div style={{
          maxWidth: 'var(--max)', margin: '0 auto', width: '100%',
          padding: '120px 32px',
          position: 'relative', zIndex: 1,
        }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px', padding: '8px 18px',
              marginBottom: '48px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px #4ade80',
              display: 'block', flexShrink: 0,
              animation: 'pulse-green 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', color: 'var(--text-2)', letterSpacing: '0.5px' }}>
              Available for work · Ambur, Tamil Nadu
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 7.5vw, 96px)',
              fontWeight: '400',
              lineHeight: '1.02',
              letterSpacing: '-3px',
              color: 'var(--text-1)',
              marginBottom: '32px',
            }}
          >
            Building AI that<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic', position: 'relative' }}>
              actually works.
              <span style={{
                position: 'absolute',
                bottom: '-4px', left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, var(--accent), transparent)',
                opacity: 0.6,
              }} />
            </span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ marginBottom: '28px' }}
          >
            <p style={{
              fontSize: '17px', color: 'var(--text-2)',
              lineHeight: '1.6', display: 'flex',
              alignItems: 'center', gap: '8px', flexWrap: 'wrap',
            }}>
              <span style={{ color: 'var(--text-3)' }}>Currently building →</span>
              <TypeWriter
                words={typewriterWords}
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '15px' }}
              />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: '16px', color: 'var(--text-2)',
              lineHeight: '1.7', maxWidth: '500px', marginBottom: '52px',
            }}
          >
            B.Tech AI & DS · LangGraph · Pinecone RAG · AWS Bedrock.
            5 production systems shipped. 2 freelance clients live.
            Tamil Nadu → the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '80px' }}
          >
            <a href="/work" style={{
              padding: '13px 28px',
              background: 'var(--text-1)',
              color: 'var(--bg-0)',
              fontSize: '14px', fontWeight: '600',
              textDecoration: 'none', borderRadius: '6px',
              letterSpacing: '0.2px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              View Projects <span style={{ fontSize: '16px' }}>→</span>
            </a>
            <a href="/services" style={{
              padding: '13px 28px',
              background: 'rgba(200,169,110,0.1)',
              border: '1px solid rgba(200,169,110,0.3)',
              color: 'var(--accent)',
              fontSize: '14px', fontWeight: '500',
              textDecoration: 'none', borderRadius: '6px',
            }}>
              Hire Me for AI Work
            </a>
            <a href="/blog" style={{
              padding: '13px 28px',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              fontSize: '14px',
              textDecoration: 'none', borderRadius: '6px',
            }}>
              Read Blog
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              display: 'flex', gap: '48px', flexWrap: 'wrap',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '32px', fontWeight: '400',
                  color: 'var(--text-1)', lineHeight: '1',
                  marginBottom: '4px', letterSpacing: '-1px',
                }}>{stat.number}</p>
                <p style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '120px', zIndex: 1,
          background: 'linear-gradient(to bottom, transparent, var(--bg-0))',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── TECH TICKER ─────────────────────────────────────────────── */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'relative',
        background: 'var(--bg-0)',
      }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to right, var(--bg-0), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to left, var(--bg-0), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          animation: 'ticker 30s linear infinite',
          width: 'max-content',
        }}>
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-3)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '0',
              padding: '0 24px',
            }}>
              {tech}
              <span style={{
                width: '4px', height: '4px', borderRadius: '50%',
                backgroundColor: 'var(--accent)', opacity: 0.4,
                display: 'inline-block', marginLeft: '24px',
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <section style={{
          maxWidth: 'var(--max)', margin: '0 auto', padding: '80px 32px',
        }}>
          {/* Section header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '48px',
          }}>
            <div>
              <p style={{
                fontSize: '11px', color: 'var(--text-3)',
                letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px',
              }}>Selected Work</p>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: '36px',
                fontWeight: '400', letterSpacing: '-0.5px', color: 'var(--text-1)',
              }}>Projects</h2>
            </div>
            <a href="/work" style={{
              fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none',
            }}>All projects →</a>
          </div>

          {/* MediGuard — flagship hero card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(135deg, #111111 0%, #0d1117 50%, #111111 100%)',
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: '16px', padding: '56px',
              marginBottom: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 80px rgba(200,169,110,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
            className="flagship-grid"
          >
            {/* Top gradient line */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)',
            }} />

            {/* Left — description */}
            <div>
              <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px', color: 'var(--accent)',
                  border: '1px solid rgba(200,169,110,0.3)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>Flagship</span>
                <span style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  border: '1px solid var(--border)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>Healthcare AI</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '40px',
                fontWeight: '400', letterSpacing: '-1px',
                lineHeight: '1.1', marginBottom: '16px', color: 'var(--text-1)',
              }}>MediGuard V2</h3>

              <p style={{
                fontSize: '15px', color: 'var(--text-2)',
                lineHeight: '1.8', marginBottom: '32px',
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
                    padding: '4px 10px', borderRadius: '3px',
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://github.com/Adithya0805" target="_blank" rel="noreferrer" style={{
                  fontSize: '13px', fontWeight: '600',
                  color: 'var(--text-1)', textDecoration: 'none',
                }}>GitHub →</a>
                <a href="/blog/how-i-built-mediaguard-multi-agent-ai-system" style={{
                  fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none',
                }}>Case Study →</a>
              </div>
            </div>

            {/* Right — architecture diagram */}
            <div className="arch-diagram" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {archNodes.map((node, i) => (
                <div key={i}>
                  <div style={{
                    padding: '10px 16px',
                    background: node.accent ? 'rgba(200,169,110,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${node.accent ? 'rgba(200,169,110,0.2)' : 'var(--border)'}`,
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: node.accent ? 'var(--accent)' : 'var(--text-3)',
                  }}>{node.label}</div>
                  {i < archNodes.length - 1 && (
                    <div style={{
                      width: '1px', height: '8px',
                      background: 'var(--border)', margin: '0 auto',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* TownRise + Urimai — 2-column cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
            className="projects-grid">
            {smallProjects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(200,169,110,0.25)' }}
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '36px',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Top glow line on hover */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)',
                  opacity: 0, transition: 'opacity 0.3s',
                }} className="card-top-glow" />

                <span style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>{p.tag}</span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '28px',
                  fontWeight: '400', margin: '12px 0',
                  letterSpacing: '-0.5px', color: 'var(--text-1)',
                }}>{p.name}</h3>
                <p style={{
                  fontSize: '14px', color: 'var(--text-2)',
                  lineHeight: '1.7', marginBottom: '24px',
                }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px',
                      color: 'var(--text-3)', border: '1px solid var(--border)',
                      padding: '3px 8px', borderRadius: '3px',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{
                    fontSize: '13px', fontWeight: '600',
                    color: 'var(--text-1)', textDecoration: 'none',
                  }}>GitHub →</a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" style={{
                      fontSize: '13px', color: 'var(--text-2)', textDecoration: 'none',
                    }}>Live →</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>
    </Layout>
  )
}
