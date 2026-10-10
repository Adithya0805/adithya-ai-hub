import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/Layout'

const services = [
  {
    id: 'multi-agent',
    category: 'AI Agents & Automation',
    icon: '🤖',
    headline: 'Multi-Agent AI Systems',
    tagline: 'LangGraph · LangChain · Custom Agent Pipelines',
    description: `Build intelligent systems where multiple specialized AI agents work together to solve complex problems. Each agent handles one job — intake, retrieval, reasoning, safety, output — orchestrated by a supervisor that manages state and routing. Built and deployed in production for MediGuard (clinical AI) and Urimai AI (Tamil Nadu government schemes).`,
    whatYouGet: [
      'Custom LangGraph agent architecture designed for your problem',
      'State management and inter-agent communication',
      'Tool calling — web search, database queries, API calls',
      'Streaming responses via WebSocket for real-time UX',
      'Full FastAPI backend with REST endpoints',
      'Deployment on Google Cloud Run or Railway',
    ],
    useCases: [
      'Customer support automation',
      'Document processing pipelines',
      'Healthcare decision support',
      'Legal document analysis',
      'HR screening and evaluation',
      'Financial report generation',
    ],
    tech: ['LangGraph', 'LangChain', 'FastAPI', 'Python', 'WebSocket', 'Google Cloud Run'],
    proof: 'Built MediGuard V2 — 5-agent clinical system, 10-day upgrade roadmap, deployed on Cloud Run',
  },
  {
    id: 'rag',
    category: 'Knowledge & Retrieval',
    icon: '🔍',
    headline: 'RAG Systems & Knowledge Bases',
    tagline: 'Pinecone · FAISS · Vector Search · Document Intelligence',
    description: `Give your AI system access to your own data — PDFs, documents, product catalogs, internal knowledge bases, government scheme databases. Retrieval Augmented Generation (RAG) pulls the most relevant information at query time, so the AI answers from your real data instead of guessing. Built RAG pipelines over WHO/ICD-10/OpenFDA data for MediGuard and 199 Tamil Nadu government eligibility rules for Urimai AI.`,
    whatYouGet: [
      'Document ingestion pipeline (PDF, DOCX, CSV, web pages)',
      'Chunking and embedding strategy optimized for your content',
      'Pinecone or FAISS vector store setup and management',
      'Semantic search with metadata filtering',
      'Hybrid search (vector + keyword) for better recall',
      'Automatic knowledge base refresh pipeline',
    ],
    useCases: [
      'Internal company knowledge bot',
      'Product catalog Q&A',
      'Legal and compliance assistant',
      'Medical reference system',
      'Government scheme eligibility checker',
      'Customer support from documentation',
    ],
    tech: ['Pinecone', 'FAISS', 'AWS Bedrock Embeddings', 'LangChain', 'Python', 'Supabase'],
    proof: 'Built RAG over WHO/ICD-10/OpenFDA for MediGuard · 64 schemes, 199 rules for Urimai AI',
  },
  {
    id: 'llm-integration',
    category: 'LLM Integration',
    icon: '🧠',
    headline: 'LLM API Integration',
    tagline: 'AWS Bedrock · Gemini API · OpenAI · Claude API',
    description: `Integrate large language models into your existing product or build a new AI-powered feature from scratch. AWS Bedrock gives enterprise security with Claude and Titan. Gemini API gives generous free tiers for early-stage products. Every integration includes proper prompt engineering, structured output parsing, error handling, and retry logic.`,
    whatYouGet: [
      'AWS Bedrock setup — IAM, model access, region configuration',
      'Gemini API integration with rate limit handling',
      'Structured JSON output prompting and parsing',
      'Prompt templates with variable injection',
      'Response streaming for better UX',
      'Cost optimization — model selection by task type',
    ],
    useCases: [
      'Content generation for your platform',
      'Intelligent search and summarization',
      'Data extraction from unstructured text',
      'Translation and localization (including Tamil)',
      'Code review and explanation tools',
      'Report generation from raw data',
    ],
    tech: ['AWS Bedrock', 'Gemini API', 'OpenAI API', 'Claude API', 'Python', 'FastAPI'],
    proof: 'AWS Bedrock integration for MediGuard · Gemini API for TownRise AI and Aranya Farm AI Chat',
  },
  {
    id: 'fullstack',
    category: 'Full Stack Development',
    icon: '⚡',
    headline: 'Full Stack AI Web Platforms',
    tagline: 'Next.js · React · Supabase · FastAPI · Vercel',
    description: `End-to-end web platforms that combine a production frontend with a real backend, database, authentication, and AI features baked in. Not templates — custom architecture designed for your specific workflow. Built two complete freelance platforms (Aranya Organic Dairy Farm e-commerce, Car Travels booking system) and three AI SaaS tools from scratch.`,
    whatYouGet: [
      'Next.js or React frontend — mobile-first, fast-loading',
      'Supabase backend — PostgreSQL, auth, storage, RLS security',
      'FastAPI for AI-heavy backend logic',
      'Admin panel with real-time data management',
      'Custom domain setup and Vercel deployment',
      'GitHub Actions CI/CD pipeline',
    ],
    useCases: [
      'E-commerce with AI product recommendations',
      'Booking and scheduling platforms',
      'SaaS dashboards with AI features',
      'Portfolio and personal brand sites',
      'Business websites with WhatsApp integration',
      'Internal tools for teams',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'FastAPI', 'Vercel', 'Tailwind'],
    proof: 'aranyaorganicdairyfarm.com — 32 products, RAG chatbot, admin panel, live on custom domain',
  },
  {
    id: 'voice-tamil',
    category: 'Voice & Tamil AI',
    icon: '🗣️',
    headline: 'Voice AI & Tamil Language Systems',
    tagline: 'Whisper · gTTS · Tamil NLP · Multilingual Pipelines',
    description: `Build AI systems that speak and understand Tamil — India's fourth most spoken language, deeply underserved by most AI products. Voice intake with Whisper transcription, Tamil conversational agents, Tamil-to-English career translation, and multilingual eligibility systems. Built SHAKTI (Tamil voice health AI for rural communities) and Tamil conversational intake for Urimai AI with 42 glossary terms.`,
    whatYouGet: [
      'Whisper-based Tamil speech-to-text pipeline',
      'Tamil text-to-speech with gTTS or ElevenLabs',
      'Tamil NLP preprocessing and normalization',
      'Bilingual (Tamil + English) conversational agents',
      'Tamil glossary and domain-specific term mapping',
      'WhatsApp / Telegram Tamil bot integration',
    ],
    useCases: [
      'Rural health information in Tamil',
      'Government scheme guidance in Tamil',
      'Tamil customer support bots',
      'Voice-enabled product ordering',
      'Agricultural advisory in Tamil',
      'Tamil career coaching tools',
    ],
    tech: ['Whisper', 'gTTS', 'Tamil NLP', 'LangGraph', 'Gemini API', 'FastAPI', 'Gradio'],
    proof: 'Urimai AI — 42 Tamil glossary terms, Tamil conversational intake, 199 eligibility rules',
  },
  {
    id: 'data-analytics',
    category: 'Data & Analytics',
    icon: '📊',
    headline: 'Data Pipelines & Analytics Dashboards',
    tagline: 'Python · Supabase · GitHub Actions · Recharts',
    description: `Build automated data pipelines that collect, process, and surface insights — without manual work every day. Nightly GitHub Actions cron jobs, real-time Supabase dashboards, and analytics built into your existing product. Built a nightly property data refresh for TownRise AI pulling from OpenStreetMap and an analytics dashboard for MediGuard tracking clinical query patterns.`,
    whatYouGet: [
      'Automated nightly/weekly data refresh pipelines',
      'GitHub Actions cron jobs — free, serverless, reliable',
      'Real-time analytics dashboard in your existing UI',
      'Data cleaning and normalization scripts',
      'CSV/Excel export for non-technical stakeholders',
      'Alert system — email/WhatsApp when thresholds hit',
    ],
    useCases: [
      'Sales and revenue tracking',
      'Inventory monitoring with low-stock alerts',
      'Customer behavior analytics',
      'Property and market price tracking',
      'Health metric monitoring',
      'Social media performance tracking',
    ],
    tech: ['Python', 'Supabase', 'GitHub Actions', 'Recharts', 'Pandas', 'FastAPI'],
    proof: 'TownRise AI — nightly OpenStreetMap refresh · MediGuard analytics dashboard',
  },
  {
    id: 'ecommerce-ai',
    category: 'E-commerce & Business AI',
    icon: '🛒',
    headline: 'AI-Powered E-commerce Systems',
    tagline: 'Supabase · WhatsApp · Admin Panel · Order Management',
    description: `Production e-commerce platforms built for Indian businesses — mobile-first, WhatsApp-integrated, with real backend infrastructure not just a Shopify template. Product catalog management, cart and checkout, order tracking, low-stock alerts, and an AI chat assistant answering customer questions from your own product data. Built and live for Aranya Organic Dairy Farm serving customers across South India.`,
    whatYouGet: [
      'Full product catalog with categories and filtering',
      'Cart, checkout, and order management',
      'Admin panel — add products, update prices, upload images',
      'WhatsApp CTA integration for direct ordering',
      'Order tracking (customer-facing)',
      'AI chat assistant trained on your product data',
      'Mobile-first app-like experience',
      'Custom domain setup',
    ],
    useCases: [
      'Organic farm and food businesses',
      'Local retail shops going digital',
      'Homemade product sellers',
      'Agricultural produce sellers',
      'Restaurant and catering ordering',
      'Handloom and craft businesses',
    ],
    tech: ['Next.js', 'Supabase', 'Gemini RAG', 'WhatsApp API', 'Vercel', 'GoDaddy'],
    proof: 'aranyaorganicdairyfarm.com — 32 products, 6 categories, live orders, RAG chatbot',
  },
  {
    id: 'mlops',
    category: 'MLOps & Deployment',
    icon: '🚀',
    headline: 'MLOps & Production Deployment',
    tagline: 'Docker · GitHub Actions · Google Cloud Run · CI/CD',
    description: `Get your AI model or system from local to production — reliably, with automated testing and deployment. Docker containers, GitHub Actions pipelines, Google Cloud Run serverless deployment, and automated health checks. Built complete CI/CD for MediGuard V2 with DeepEval safety testing baked into every deployment.`,
    whatYouGet: [
      'Dockerized backend with optimized image size',
      'GitHub Actions CI/CD — test, build, deploy on every push',
      'Google Cloud Run deployment — serverless, auto-scaling',
      'Environment variable management across dev/staging/prod',
      'Automated API health checks and alerting',
      'DeepEval or custom test suite for AI output quality',
    ],
    useCases: [
      'Deploy your existing AI model to production',
      'Add CI/CD to a project with no pipeline',
      'Migrate from Render/Railway to Cloud Run',
      'Add automated testing to AI outputs',
      'Set up staging and production environments',
      'Reduce cloud costs with better resource config',
    ],
    tech: ['Docker', 'GitHub Actions', 'Google Cloud Run', 'FastAPI', 'DeepEval', 'Railway'],
    proof: 'MediGuard V2 — full CI/CD, DeepEval safety pipeline, Google Cloud Run deployment',
  },
]

export function Services() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Layout>
      <Helmet>
        <title>AI Services — Adithya Kuppusamy · FutureLogic AI</title>
        <meta
          name="description"
          content="8 AI engineering service areas — multi-agent systems, RAG, LLM integration, Tamil AI, full stack, e-commerce, data pipelines, MLOps. Every service backed by real shipped projects."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div style={{
          maxWidth: 'var(--max)', margin: '0 auto',
          padding: '80px 32px 64px',
          borderBottom: '1px solid var(--border)'
        }}>
          <p style={{
            fontSize: '11px', color: 'var(--text-3)',
            letterSpacing: '4px', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            FutureLogic AI · Services
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: '400', letterSpacing: '-2px',
            lineHeight: '1.05', marginBottom: '28px',
            maxWidth: '700px', color: 'var(--text-1)'
          }}>
            What I build<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>with AI.</span>
          </h1>
          <p style={{
            fontSize: '17px', color: 'var(--text-2)',
            lineHeight: '1.8', maxWidth: '540px',
            marginBottom: '40px'
          }}>
            8 service areas across the full AI engineering stack —
            agents, RAG, LLMs, voice, Tamil language, e-commerce,
            data pipelines, and MLOps. Every service backed by
            real shipped projects.
          </p>

          {/* Service count badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              '8 Service Areas',
              '5+ Projects Shipped',
              'Production Deployed',
              'Tamil Nadu Focus',
              'Fixed Price Available',
            ].map(badge => (
              <span key={badge} style={{
                fontSize: '12px', color: 'var(--text-2)',
                border: '1px solid var(--border)',
                padding: '6px 14px', borderRadius: '4px'
              }}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Services section */}
        <div style={{
          maxWidth: 'var(--max)', margin: '0 auto',
          padding: '64px 32px'
        }}>
          {/* Quick-nav pill bar */}
          <div className="services-nav" style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            marginBottom: '48px'
          }}>
          {services.map(s => (
            <button
              key={s.id}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                fontSize: '12px', color: 'var(--text-2)',
                background: 'transparent',
                border: '1px solid var(--border)',
                padding: '6px 14px', borderRadius: '4px',
                cursor: 'pointer', letterSpacing: '0.3px',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-2)'
              }}
            >
              {s.icon} {s.category}
            </button>
          ))}
        </div>

        {/* Accordion service cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              style={{
                background: active === service.id ? 'var(--bg-2)' : 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'background 0.2s'
              }}
            >
              {/* Header row — always visible */}
              <div
                onClick={() => setActive(active === service.id ? null : service.id)}
                style={{
                  padding: '28px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px', color: 'var(--text-3)',
                    minWidth: '24px'
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>{service.icon}</span>
                      <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '22px', fontWeight: '400',
                        letterSpacing: '-0.3px', color: 'var(--text-1)'
                      }}>{service.headline}</h2>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px', color: 'var(--text-3)',
                      marginTop: '4px', letterSpacing: '0.3px'
                    }}>{service.tagline}</p>
                  </div>
                </div>

                <span style={{
                  fontSize: '18px', color: 'var(--text-3)',
                  transform: active === service.id ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0, display: 'inline-block'
                }}>+</span>
              </div>

              {/* Expanded content */}
              {active === service.id && (
                <div style={{
                  padding: '0 32px 40px',
                  borderTop: '1px solid var(--border)'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '48px',
                    paddingTop: '36px'
                  }} className="services-expanded-grid flagship-grid">

                    {/* Left — description + proof + tech */}
                    <div>
                      <p style={{
                        fontSize: '15px', color: 'var(--text-2)',
                        lineHeight: '1.85', marginBottom: '28px'
                      }}>{service.description}</p>

                      {/* Proof of work */}
                      <div style={{
                        padding: '14px 18px',
                        background: 'var(--accent-dim)',
                        border: '1px solid rgba(200,169,110,0.15)',
                        borderRadius: '6px',
                        marginBottom: '28px'
                      }}>
                        <p style={{
                          fontSize: '11px', color: 'var(--accent)',
                          letterSpacing: '1.5px', textTransform: 'uppercase',
                          marginBottom: '4px'
                        }}>Proof of work</p>
                        <p style={{
                          fontSize: '13px', color: 'var(--text-2)',
                          lineHeight: '1.6'
                        }}>{service.proof}</p>
                      </div>

                      {/* Tech stack */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {service.tech.map(t => (
                          <span key={t} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px', color: 'var(--text-3)',
                            border: '1px solid var(--border)',
                            padding: '4px 10px', borderRadius: '3px'
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Middle — what you get */}
                    <div>
                      <p style={{
                        fontSize: '11px', color: 'var(--text-3)',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        marginBottom: '16px'
                      }}>What you get</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {service.whatYouGet.map((item, i) => (
                          <div key={i} style={{
                            display: 'flex', gap: '10px', alignItems: 'flex-start'
                          }}>
                            <span style={{
                              color: 'var(--accent)', fontSize: '13px',
                              marginTop: '1px', flexShrink: 0
                            }}>✓</span>
                            <span style={{
                              fontSize: '13px', color: 'var(--text-2)',
                              lineHeight: '1.5'
                            }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right — use cases + CTA */}
                    <div>
                      <p style={{
                        fontSize: '11px', color: 'var(--text-3)',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        marginBottom: '16px'
                      }}>Use cases</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                        {service.useCases.map((uc, i) => (
                          <div key={i} style={{
                            fontSize: '13px', color: 'var(--text-2)',
                            padding: '8px 0',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            {uc}
                            <span style={{ color: 'var(--text-3)', marginLeft: '8px' }}>→</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href={`mailto:adithyaadhi0805@gmail.com?subject=Service Inquiry — ${service.headline}`}
                        style={{
                          display: 'block', textAlign: 'center',
                          padding: '12px 20px',
                          background: 'var(--accent)',
                          color: 'var(--bg-0)',
                          fontSize: '13px', fontWeight: '600',
                          textDecoration: 'none', borderRadius: '4px',
                          letterSpacing: '0.3px'
                        }}
                      >
                        Discuss this service →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '0 32px 96px'
      }}>
        <div style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: '12px', padding: '56px',
          display: 'grid', gridTemplateColumns: '2fr 1fr',
          gap: '48px', alignItems: 'center'
        }} className="flagship-grid">
          <div>
            <p style={{
              fontSize: '11px', color: 'var(--text-3)',
              letterSpacing: '3px', textTransform: 'uppercase',
              marginBottom: '16px'
            }}>Start a project</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '40px', fontWeight: '400',
              letterSpacing: '-1px', lineHeight: '1.1',
              marginBottom: '16px', color: 'var(--text-1)'
            }}>
              Have a problem<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>AI can solve?</span>
            </h2>
            <p style={{
              fontSize: '15px', color: 'var(--text-2)',
              lineHeight: '1.8', maxWidth: '440px'
            }}>
              Describe your problem — not the technical requirements,
              just the business problem. I will tell you what is possible,
              what it takes to build, and what it would cost.
              First call is free.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20have%20an%20AI%20project%20inquiry"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block', textAlign: 'center',
                padding: '16px 32px',
                background: '#25D366',
                color: '#052e16',
                fontSize: '14px', fontWeight: '700',
                textDecoration: 'none', borderRadius: '4px',
                letterSpacing: '0.3px'
              }}
            >
              💬 Chat on WhatsApp →
            </a>
            <a
              href="mailto:adithyaadhi0805@gmail.com?subject=Project Inquiry — FutureLogic AI"
              style={{
                display: 'block', textAlign: 'center',
                padding: '14px 32px',
                background: 'var(--accent)',
                color: 'var(--bg-0)',
                fontSize: '14px', fontWeight: '700',
                textDecoration: 'none', borderRadius: '4px',
                letterSpacing: '0.3px'
              }}
            >
              Email me directly →
            </a>
            <a
              href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block', textAlign: 'center',
                padding: '14px 32px',
                border: '1px solid var(--border)',
                color: 'var(--text-1)',
                fontSize: '14px', fontWeight: '500',
                textDecoration: 'none', borderRadius: '4px'
              }}
            >
              Connect on LinkedIn →
            </a>
            <p style={{
              fontSize: '12px', color: 'var(--text-3)',
              textAlign: 'center', marginTop: '4px'
            }}>
              Based in Tamil Nadu · Works remotely · Fixed price available
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </Layout>
)
}

export default Services
