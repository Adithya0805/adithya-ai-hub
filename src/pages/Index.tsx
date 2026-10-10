import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { NeuralCanvas } from '@/components/NeuralCanvas'
import { TypeWriter } from '@/components/TypeWriter'
import { Reveal } from '@/components/Reveal'
import { GlowOrb } from '@/components/GlowOrb'
import { NewsletterForm } from '@/components/NewsletterForm'
import { VisitorConcierge } from '@/components/VisitorConcierge'
import { PersonalNote } from '@/components/PersonalNote'
import { LabGuestPass } from '@/components/LabGuestPass'
import { posts } from '@/data/posts'

/* ── Data ─────────────────────────────────────────────────────────── */

const typewriterWords = [
  'Multi-Agent Clinical AI',
  'Commercial E-Commerce AI Platforms',
  'Tamil Nadu Gov Scheme Tools',
  'Real Estate Growth Intelligence',
  'RAG Knowledge Systems',
  'Production FastAPI Backends',
  'Full Stack AI Applications',
]

const stats = [
  { number: '5+', label: 'AI Systems Shipped' },
  { number: '3', label: 'Commercial Clients Live' },
  { number: '20', label: 'Technical Articles' },
  { number: '100%', label: 'Production Deployed' },
]

const techStack = [
  'LangGraph', 'Pinecone RAG', 'AWS Bedrock', 'FastAPI', 'Next.js', 'Supabase',
  'Gemini API', 'Docker', 'GitHub Actions', 'Google Cloud Run', 'TypeScript',
  'Python', 'React', 'Tailwind', 'PostgreSQL', 'Whisper', 'Tamil NLP',
  'LangChain', 'DeepEval', 'Framer Motion'
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
    desc: 'Zero-cost real estate intelligence platform analyzing 50+ Tamil Nadu towns. OpenStreetMap, Gemini API, Supabase, GitHub Actions nightly refresh.',
    tech: ['Next.js', 'Supabase', 'Gemini API', 'TypeScript'],
    github: 'https://github.com/Adithya0805/townrise_App_for_real_estates',
    demo: 'https://townrise-app-for-real-estates.vercel.app/',
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

const interactiveTools = [
  {
    icon: '🩺',
    badge: 'Multi-Agent AI',
    name: 'MediGuard Clinical Sandbox',
    desc: 'Simulate triage, symptom extraction, Pinecone RAG differential diagnosis, and allergy safety verification in an interactive agent pipeline.',
    route: '/tools?tab=mediguard',
  },
  {
    icon: '🎙️',
    badge: 'Tamil NLP',
    name: 'SkillSpeak Interview Prep',
    desc: 'Practice technical interviews with real-time Tamil & Tanglish translation, STAR-framework evaluation, and instant performance feedback.',
    route: '/tools?tab=skillspeak',
  },
  {
    icon: '📈',
    badge: 'Quantitative AI',
    name: 'Binance Futures Bot Simulator',
    desc: 'Interactive backtesting engine with configurable EMA crossovers, trailing stops, risk-to-reward ratios, and live simulated PnL charts.',
    route: '/tools?tab=trading',
  },
  {
    icon: '🪄',
    badge: 'LLM Guardrails',
    name: 'System Prompt Architect Studio',
    desc: 'Compile production system prompts with XML thinking tags, strict JSON schemas, and anti-injection defenses.',
    route: '/tools?tab=prompt-studio',
  },
  {
    icon: '🗄️',
    badge: 'Data Systems',
    name: 'Natural Language SQL Studio',
    desc: 'Convert natural language business queries into indexed PostgreSQL with EXPLAIN execution cost plans.',
    route: '/tools?tab=sql-studio',
  },
  {
    icon: '🕸️',
    badge: 'Interactive Graph',
    name: 'AI Skill Network Graph',
    desc: 'Explore the full web of AI engineering competencies, toolchains, frameworks, and architectures in an interactive visual node map.',
    route: '/tools?tab=skillgraph',
  },
]

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Index() {
  const latestPosts = posts.slice(0, 3)

  return (
    <Layout>
      <Helmet>
        <title>Adithya Kuppusamy — AI Engineer & Full-Stack Architect</title>
        <meta
          name="description"
          content="AI Engineer building production systems: Multi-Agent Clinical AI, Commercial Client Platforms (Aranya Organic Dairy Farm), RAG, and Tamil NLP. Based in Tamil Nadu, India."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/" />
        <meta property="og:title" content="Adithya Kuppusamy — AI Engineer & Full-Stack Architect" />
        <meta property="og:description" content="Building clinical AI, commercial platforms, real estate intelligence, and regional AI tools." />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/" />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', borderBottom: '1px solid var(--border)'
      }}>
        <NeuralCanvas />
        <GlowOrb top="35%" left="18%" size={700} opacity={0.07} />
        <GlowOrb top="65%" left="72%" size={480} color="100,160,255" opacity={0.04} />

        <div style={{
          maxWidth: 'var(--max)', margin: '0 auto', padding: '140px 32px 120px',
          position: 'relative', zIndex: 1, width: '100%'
        }}>

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px',
              padding: '8px 20px', marginBottom: '52px',
              backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.03)'
            }}
          >
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#4ade80', display: 'block',
              animation: 'pulse-green 2s ease-in-out infinite'
            }} />
            <span style={{ fontSize: '12px', color: 'var(--text-2)', letterSpacing: '0.5px' }}>
              Available for work & freelance · Ambur, Tamil Nadu
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 8vw, 100px)',
              fontWeight: '400', lineHeight: '1.0',
              letterSpacing: '-3px', color: 'var(--text-1)',
              maxWidth: '820px', marginBottom: '28px'
            }}
          >
            AI Engineer building<br />
            <span style={{
              color: 'var(--accent)', fontStyle: 'italic', position: 'relative'
            }}>
              real systems
              <span style={{
                position: 'absolute', bottom: '-4px', left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, var(--accent), transparent)',
                opacity: 0.5
              }} />
            </span>{' '}for<br />
            real problems.
          </motion.h1>

          {/* Typewriter line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{
              fontSize: '16px', color: 'var(--text-2)',
              marginBottom: '20px', display: 'flex',
              alignItems: 'center', gap: '10px', flexWrap: 'wrap'
            }}
          >
            <span style={{ color: 'var(--text-3)' }}>Currently building →</span>
            <TypeWriter
              words={[
                'Multi-Agent Clinical AI',
                'Tamil Nadu Gov Scheme Tools',
                'Real Estate Intelligence',
                'RAG Knowledge Systems',
                'D2C Leather E-commerce',
                'Intercity Travel Booking Apps',
                'Full Stack AI Platforms',
              ]}
              style={{
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px'
              }}
            />
          </motion.p>

          {/* One-liner bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: '16px', color: 'var(--text-2)',
              lineHeight: '1.7', maxWidth: '500px', marginBottom: '52px'
            }}
          >
            B.Tech AI & DS · LangGraph · Pinecone RAG · AWS Bedrock.
            5 AI systems in production. 3 freelance clients live.
            Tamil Nadu → the world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '80px' }}
          >
            <a href="/work" style={{
              padding: '13px 28px', background: 'var(--text-1)',
              color: 'var(--bg-0)', fontSize: '14px', fontWeight: '600',
              textDecoration: 'none', borderRadius: '6px', letterSpacing: '0.2px'
            }}>View Projects →</a>
            <a href="/services" style={{
              padding: '13px 28px',
              background: 'rgba(200,169,110,0.1)',
              border: '1px solid rgba(200,169,110,0.3)',
              color: 'var(--accent)', fontSize: '14px', fontWeight: '500',
              textDecoration: 'none', borderRadius: '6px'
            }}>Hire Me for AI Work</a>
            <a href="/blog" style={{
              padding: '13px 28px', border: '1px solid var(--border)',
              color: 'var(--text-2)', fontSize: '14px',
              textDecoration: 'none', borderRadius: '6px'
            }}>Read Blog</a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              display: 'flex', gap: '48px', flexWrap: 'wrap',
              paddingTop: '32px', borderTop: '1px solid var(--border)'
            }}
          >
            {[
              { number: '5+', label: 'AI Systems Shipped' },
              { number: '3', label: 'Freelance Clients Live' },
              { number: '8', label: 'Service Areas' },
              { number: '100%', label: 'Production Deployed' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: '34px',
                  fontWeight: '400', color: 'var(--text-1)',
                  lineHeight: '1', marginBottom: '4px', letterSpacing: '-1px'
                }}>{stat.number}</p>
                <p style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  letterSpacing: '1px', textTransform: 'uppercase'
                }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-0))',
          pointerEvents: 'none', zIndex: 1
        }} />
      </section>

      {/* Tech ticker */}
      <div style={{
        overflow: 'hidden', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)', padding: '16px 0',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to right, var(--bg-0), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to left, var(--bg-0), transparent)',
          zIndex: 2, pointerEvents: 'none'
        }} />
        <div style={{
          display: 'flex', gap: '0',
          animation: 'ticker 32s linear infinite', width: 'max-content'
        }}>
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} style={{
              fontSize: '11px', fontFamily: 'var(--font-mono)',
              color: 'var(--text-3)', letterSpacing: '1.5px',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              padding: '0 32px', display: 'flex', alignItems: 'center', gap: '32px'
            }}>
              {tech}
              <span style={{
                width: '3px', height: '3px', borderRadius: '50%',
                backgroundColor: 'var(--accent)', opacity: 0.4, display: 'inline-block'
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
              }}>Selected Work & Live Deployments</p>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: '36px',
                fontWeight: '400', letterSpacing: '-0.5px', color: 'var(--text-1)',
              }}>Flagship Engineering</h2>
            </div>
            <Link to="/work" style={{
              fontSize: '13px', color: 'var(--accent)', textDecoration: 'none',
              fontWeight: '500',
            }}>All projects →</Link>
          </div>

          {/* 1. MediGuard V2 — Clinical AI Flagship */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(135deg, #111111 0%, #0d1117 60%, #111111 100%)',
              border: '1px solid rgba(200,169,110,0.18)',
              borderRadius: '16px', padding: '56px',
              marginBottom: '16px',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '48px', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 100px rgba(200,169,110,0.04), inset 0 1px 0 rgba(255,255,255,0.04)'
            }}
            className="flagship-grid"
          >
            {/* Gold top line */}
            <div style={{
              position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.45), transparent)'
            }} />

            {/* Left — description */}
            <div>
              <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px', color: 'var(--accent)',
                  border: '1px solid rgba(200,169,110,0.3)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>Flagship AI System</span>
                <span style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  border: '1px solid var(--border)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>Healthcare CDSS</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '38px',
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

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="https://github.com/adithya-kuppusamy/mediguard-v2" target="_blank" rel="noreferrer" style={{
                  fontSize: '13px', fontWeight: '600',
                  color: 'var(--text-1)', textDecoration: 'none',
                }}>GitHub →</a>
                <Link to="/blog/how-i-built-mediaguard-multi-agent-ai-system" style={{
                  fontSize: '13px', color: 'var(--accent)', textDecoration: 'none',
                }}>Architecture Deep-Dive →</Link>
                <Link to="/tools" style={{
                  fontSize: '12px', color: 'var(--text-2)', textDecoration: 'none',
                  padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '4px'
                }}>Try Sandbox 🧪</Link>
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

          {/* 2. Aranya Organic Dairy Farm — Commercial Client Production Platform */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(135deg, #0e140f 0%, #111a14 50%, #0c120e 100%)',
              border: '1px solid rgba(74, 222, 128, 0.25)',
              borderRadius: '16px', padding: '56px',
              marginBottom: '28px',
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '48px', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 80px rgba(74, 222, 128, 0.03), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
            className="flagship-grid"
          >
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.4), transparent)',
            }} />

            {/* Left — description */}
            <div>
              <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px', color: '#4ade80',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Live Commercial Client
                </span>
                <span style={{
                  fontSize: '11px', color: 'var(--text-3)',
                  border: '1px solid var(--border)',
                  padding: '3px 10px', borderRadius: '3px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>Production Platform</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '38px',
                fontWeight: '400', letterSpacing: '-1px',
                lineHeight: '1.1', marginBottom: '16px', color: 'var(--text-1)',
              }}>Aranya Organic Dairy Farm</h3>

              <p style={{
                fontSize: '15px', color: 'var(--text-2)',
                lineHeight: '1.8', marginBottom: '28px',
              }}>
                Complete full-lifecycle AI platform built for a 9-year Vedic dairy farm in Shoolagiri, Tamil Nadu.
                Features mobile-first catalog, instant WhatsApp cart serialization, zero-overhead Gmail routing,
                and an embedded bilingual <strong>"Ask Farm AI"</strong> chatbot assistant answering customer queries on
                A2 milk purity, delivery routes, and Vedic Bilona ghee.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {['Next.js 14', 'RAG Chatbot', 'WhatsApp Commerce', 'Edge CDN', 'Tamil & English SEO', 'Tailwind'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: '#86efac', border: '1px solid rgba(74, 222, 128, 0.2)',
                    padding: '4px 10px', borderRadius: '3px',
                    background: 'rgba(74, 222, 128, 0.04)'
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="https://aranyaorganicdairyfarm.com/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '10px 20px',
                    background: '#4ade80',
                    color: '#052e16',
                    fontSize: '13px', fontWeight: '700',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  Visit Live Site (aranyaorganicdairyfarm.com) ↗
                </a>
                <Link
                  to="/blog/building-and-deploying-aranya-organic-dairy-farm-live-ai-engineer-guide"
                  style={{
                    fontSize: '13px', color: 'var(--accent)', textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Read 12-Min Engineering Case Study →
                </Link>
              </div>
            </div>

            {/* Right — live metrics and highlights */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(74, 222, 128, 0.15)',
              borderRadius: '12px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#4ade80',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: 0
              }}>PRODUCTION TELEMETRY</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--text-1)', margin: '0 0 4px 0' }}>&lt; 1.1s</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>LCP Edge Render Speed</p>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#4ade80', margin: '0 0 4px 0' }}>100%</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Lighthouse SEO Score</p>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--accent)', margin: '0 0 4px 0' }}>24 / 7</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Autonomous AI Assistant</p>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--text-1)', margin: '0 0 4px 0' }}>1-Click</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Direct WhatsApp Cart</p>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '14px',
                fontSize: '12px',
                color: 'var(--text-2)',
                lineHeight: '1.6'
              }}>
                💬 <em>"Ask Farm AI answers questions on cow feed, milk composition, and delivery schedules in real time, increasing direct customer conversion."</em>
              </div>
            </div>
          </motion.div>

          {/* 3. TownRise + Urimai — 2-column cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
            className="projects-grid">
            {smallProjects.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: 'rgba(200,169,110,0.22)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '36px',
                  position: 'relative', overflow: 'hidden', cursor: 'pointer'
                }}
              >
                {/* Top glow line */}
                <div style={{
                  position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)',
                  opacity: 0, transition: 'opacity 0.3s'
                }} className="card-glow-line" />

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
                    }}>Live App →</a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── INTERACTIVE AI LABS & SANDBOXES ───────────────────────────── */}
      <Reveal delay={0.1}>
        <section style={{
          borderTop: '1px solid var(--border)',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.03) 0%, transparent 70%)',
          padding: '80px 32px',
        }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-end', marginBottom: '40px',
              flexWrap: 'wrap', gap: '16px'
            }}>
              <div>
                <p style={{
                  fontSize: '11px', color: 'var(--accent)',
                  letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px',
                  fontWeight: '600'
                }}>Hands-on Evaluation</p>
                <h2 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '36px',
                  fontWeight: '400', letterSpacing: '-0.5px', color: 'var(--text-1)',
                  margin: 0
                }}>Interactive AI Sandboxes</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', marginTop: '8px', maxWidth: '600px' }}>
                  Test clinical multi-agent decision support, practice bilingual Tamil/Tanglish interviews,
                  or simulate trading bot strategies directly inside the browser.
                </p>
              </div>
              <Link to="/tools" style={{
                padding: '10px 20px',
                background: 'rgba(200,169,110,0.1)',
                border: '1px solid rgba(200,169,110,0.3)',
                color: 'var(--accent)',
                fontSize: '13px', fontWeight: '600',
                borderRadius: '6px', textDecoration: 'none',
              }}>
                Launch Full AI Lab →
              </Link>
            </div>

            <div className="tools-preview-grid">
              {interactiveTools.map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.route}
                  style={{
                    textDecoration: 'none',
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '28px' }}>{tool.icon}</span>
                      <span style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent)',
                        background: 'rgba(200,169,110,0.08)',
                        border: '1px solid rgba(200,169,110,0.2)',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        textTransform: 'uppercase'
                      }}>{tool.badge}</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: '400',
                      color: 'var(--text-1)',
                      marginBottom: '10px'
                    }}>{tool.name}</h3>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-2)',
                      lineHeight: '1.6',
                      margin: 0
                    }}>{tool.desc}</p>
                  </div>

                  <div style={{
                    marginTop: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    Open Sandbox <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── LATEST TECHNICAL ARTICLES ──────────────────────────────────── */}
      <Reveal delay={0.1}>
        <section style={{
          maxWidth: 'var(--max)', margin: '0 auto', padding: '80px 32px',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '40px',
            flexWrap: 'wrap', gap: '16px'
          }}>
            <div>
              <p style={{
                fontSize: '11px', color: 'var(--text-3)',
                letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px',
              }}>Systems Engineering & Insights</p>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: '36px',
                fontWeight: '400', letterSpacing: '-0.5px', color: 'var(--text-1)',
                margin: 0
              }}>Latest Technical Articles</h2>
            </div>
            <Link to="/blog" style={{
              fontSize: '13px', color: 'var(--accent)', textDecoration: 'none',
              fontWeight: '500',
            }}>View all 20 guides →</Link>
          </div>

          <div className="latest-articles-grid">
            {latestPosts.map((post) => (
              <motion.article
                key={post.slug}
                whileHover={{ y: -4, borderColor: 'rgba(200,169,110,0.3)' }}
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s',
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-3)'
                  }}>
                    <span style={{
                      color: 'var(--accent)',
                      background: 'rgba(200,169,110,0.08)',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      border: '1px solid rgba(200,169,110,0.2)'
                    }}>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '1.3',
                      color: 'var(--text-1)',
                      marginBottom: '12px',
                    }}>{post.title}</h3>
                  </Link>

                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-2)',
                    lineHeight: '1.7',
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>{post.excerpt}</p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{post.date}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--accent)',
                      textDecoration: 'none'
                    }}
                  >
                    Read Guide →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── PERSONAL NOTE & AUTHENTIC RADAR ───────────────────────────── */}
      <Reveal delay={0.1}>
        <PersonalNote />
      </Reveal>

      {/* ── DIGITAL LAB GUEST PASS ────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <section style={{ padding: '0 24px 64px' }}>
          <LabGuestPass />
        </section>
      </Reveal>

      {/* ── CLIENT ACQUISITION / WORK TOGETHER BANNER ─────────────────── */}
      <Reveal delay={0.1}>
        <section style={{
          borderTop: '1px solid var(--border)',
          background: 'linear-gradient(180deg, var(--bg-0) 0%, #0d0d0d 100%)',
          padding: '80px 32px',
        }}>
          <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
            <div className="cta-banner-grid" style={{ marginBottom: '64px' }}>
              <div>
                <p style={{
                  fontSize: '11px', color: '#4ade80',
                  letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px',
                  fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Taking Selected Client Projects
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: '400', letterSpacing: '-1px', color: 'var(--text-1)',
                  lineHeight: '1.15', marginBottom: '20px'
                }}>
                  Need an AI Engineer to turn complex workflows into reality?
                </h2>
                <p style={{
                  fontSize: '15px', color: 'var(--text-2)',
                  lineHeight: '1.7', marginBottom: '32px',
                  maxWidth: '540px'
                }}>
                  Whether you need a custom Multi-Agent system, a localized RAG knowledge engine,
                  an autonomous customer service chatbot, or a full-stack AI web platform like Aranya Dairy,
                  I engineer production-ready software designed to generate measurable business results.
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20AI%20project"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '12px 24px',
                      background: '#25D366',
                      color: '#052e16',
                      fontSize: '14px', fontWeight: '700',
                      borderRadius: '6px', textDecoration: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <span>💬 Chat on WhatsApp</span>
                  </a>
                  <Link
                    to="/services"
                    style={{
                      padding: '12px 24px',
                      background: 'rgba(200,169,110,0.1)',
                      border: '1px solid rgba(200,169,110,0.3)',
                      color: 'var(--accent)',
                      fontSize: '14px', fontWeight: '600',
                      borderRadius: '6px', textDecoration: 'none',
                    }}
                  >
                    View 8 AI Services & Pricing →
                  </Link>
                  <a
                    href="mailto:adithyaadhi0805@gmail.com?subject=AI%20Engineering%20Inquiry"
                    style={{
                      padding: '12px 20px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)',
                      fontSize: '14px',
                      borderRadius: '6px', textDecoration: 'none',
                    }}
                  >
                    Send Email
                  </a>
                </div>
              </div>

              {/* Trust Box */}
              <div style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: '400',
                  color: 'var(--text-1)',
                  marginBottom: '16px'
                }}>How I Deliver Value</h3>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontSize: '13px',
                  color: 'var(--text-2)',
                  lineHeight: '1.6'
                }}>
                  <li style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✓</span>
                    <span><strong>End-to-End Ownership:</strong> From architecture design, LLM prompt engineering, and database modeling to edge cloud deployment.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✓</span>
                    <span><strong>Rapid Turnaround:</strong> Working MVPs delivered in 7-14 days with zero operational bloat.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✓</span>
                    <span><strong>Deterministic Reliability:</strong> DeepEval safety benchmarking, unit test suites, and strict guardrails.</span>
                  </li>
                </ul>

                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Direct Line:</span>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>+91 88257 14576</span>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <NewsletterForm compact={false} />
          </div>
        </section>
      </Reveal>
    </Layout>
  )
}
