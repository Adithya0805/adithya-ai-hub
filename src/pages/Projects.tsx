import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

export default function Projects() {
  return (
    <Layout>
      <Helmet>
        <title>Selected Work · AI Projects | Adithya AI Hub</title>
        <meta
          name="description"
          content="Curated editorial showcase of real AI systems built by Adithya Kuppusamy — MediGuard, SkillSpeak AI, TownRise AI, and more."
        />
        <meta property="og:title" content="Selected Work · AI Projects | Adithya AI Hub" />
        <meta property="og:description" content="Curated editorial showcase of real AI systems built by Adithya Kuppusamy." />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/projects" />
      </Helmet>

      {/* Section 1 — Editorial Page Header */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px 64px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '24px'
        }}>
          Selected Work · 2024–2026
        </p>

        <div className="projects-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '0.95',
            letterSpacing: '-3px',
            maxWidth: '700px'
          }}>
            Building AI<br/>
            that matters.
          </h1>

          <div className="projects-stats" style={{
            display: 'flex',
            gap: '48px',
            paddingBottom: '8px'
          }}>
            {[
              { number: '5+', label: 'Projects Shipped' },
              { number: '4', label: 'Tech Stacks' },
              { number: '100%', label: 'Open Source' }
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '36px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>{stat.number}</p>
                <p style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Section 2 — FLAGSHIP PROJECT (MediGuard) — Full Width Hero Card */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 40px'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '32px'
        }}>
          01 · Flagship Project
        </p>

        <div className="flagship-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          padding: '64px',
          backgroundColor: '#1a1a1a',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background texture */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          {/* Left — Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '4px',
              padding: '6px 14px',
              marginBottom: '32px'
            }}>
              <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
                🏆 Flagship
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '700',
              color: '#ffffff',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              marginBottom: '16px'
            }}>
              MediGuard
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: '1.7',
              marginBottom: '32px',
              maxWidth: '420px'
            }}>
              Clinical AI decision support system. Multi-agent LangGraph pipeline
              stopping patients from receiving wrong medication information.
              Powered by Pinecone RAG over WHO/ICD-10/OpenFDA data.
            </p>

            {/* Tech pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
              {['LangGraph', 'Pinecone RAG', 'AWS Bedrock', 'FastAPI', 'React'].map(tech => (
                <span key={tech} style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '5px 12px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}>{tech}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <a href="https://github.com/Adithya0805" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                View on GitHub →
              </a>
              <a href="/blog/how-i-built-mediaguard-multi-agent-ai-system" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px'
              }}>
                Read Case Study
              </a>
            </div>
          </div>

          {/* Right — Visual architecture diagram */}
          <div className="arch-diagram" style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {[
              { label: 'User Query', color: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.08)' },
              { label: 'Intake Agent — Query Classification', color: 'rgba(0,212,255,0.1)', text: '#00d4ff', border: 'rgba(0,212,255,0.3)' },
              { label: 'Retrieval Agent — Pinecone RAG', color: 'rgba(0,212,255,0.08)', text: '#00d4ff', border: 'rgba(0,212,255,0.2)' },
              { label: 'Reasoning Agent — AWS Bedrock', color: 'rgba(0,212,255,0.08)', text: '#00d4ff', border: 'rgba(0,212,255,0.2)' },
              { label: 'Safety Agent — Flag & Verify', color: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
              { label: 'Clinical Response → Patient', color: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.08)' },
            ].map((node, i) => (
              <div key={i}>
                <div style={{
                  padding: '12px 20px',
                  backgroundColor: node.color,
                  border: `1px solid ${node.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  color: node.text,
                  letterSpacing: '0.3px'
                }}>
                  {node.label}
                </div>
                {i < 5 && (
                  <div style={{
                    width: '1px',
                    height: '12px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    margin: '0 auto'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — SECOND FLAGSHIP (SkillSpeak AI) — Split Layout */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 64px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '32px'
        }}>
          02 · Career Platform
        </p>

        <div className="flagship-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Left — Visual feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {[
              { icon: '📄', label: 'ATS Scanner', desc: 'Resume vs JD scoring' },
              { icon: '🎤', label: 'Mock Interview', desc: 'Voice + STAR feedback' },
              { icon: '🗣️', label: 'Tamil Translator', desc: 'Career English bridge' },
              { icon: '🧠', label: 'Brain Visualizer', desc: '60fps canvas progress' },
              { icon: '📅', label: '90-Day Roadmap', desc: 'Custom study plans' },
              { icon: '🏆', label: 'Achievements', desc: 'Gamified milestones' },
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '20px',
                backgroundColor: i === 2 ? '#1a1a1a' : 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                transition: 'transform 0.2s'
              }}>
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>
                  {feature.icon}
                </span>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: i === 2 ? '#ffffff' : 'var(--text-primary)',
                  marginBottom: '4px'
                }}>{feature.label}</p>
                <p style={{
                  fontSize: '12px',
                  color: i === 2 ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Right — Content */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              marginBottom: '16px'
            }}>
              SkillSpeak AI
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              15-engine career platform built for every Indian job seeker.
              ATS scanner, voice mock interviews, Tamil-to-English career
              translator, and a neural brain visualizer running at 60fps.
              Built because the language gap is real and fixable.
            </p>

            <div style={{
              padding: '20px 24px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              marginBottom: '32px'
            }}>
              <p style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>Stack</p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: '1.8'
              }}>
                React · TypeScript · Gemini API<br/>
                Firebase · Web Speech API · Recharts
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://github.com/Adithya0805" target="_blank" rel="noopener noreferrer" style={{
                padding: '12px 24px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                borderRadius: '4px'
              }}>GitHub →</a>
              <a href="/blog/how-i-built-skillspeak-ai-career-platform-15-features" style={{
                padding: '12px 24px',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                borderRadius: '4px'
              }}>Case Study</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — MORE PROJECTS — Editorial Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 40px'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '48px'
        }}>
          More Work
        </p>

        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          backgroundColor: 'var(--border)'
        }}>
          {[
            {
              number: '03',
              name: 'TownRise AI',
              desc: 'Zero-cost real estate intelligence platform for Tamil Nadu. OpenStreetMap + Gemini + Supabase + GitHub Actions nightly cron.',
              tech: ['Next.js', 'Supabase', 'Gemini API'],
              github: 'https://github.com/Adithya0805',
              demo: 'https://townrise-ai.vercel.app'
            },
            {
              number: '04',
              name: 'Trading Bot',
              desc: 'Automated Binance Futures trading bot with technical indicators, risk management rules, and testnet backtesting.',
              tech: ['Python', 'Binance API', 'FastAPI'],
              github: 'https://github.com/Adithya0805/trading-bot',
              demo: null
            },
            {
              number: '05',
              name: 'Adithya AI Hub',
              desc: 'This site. Magazine editorial blog with Brevo email system, AdSense integration, and 8+ original AI engineering articles.',
              tech: ['React', 'Vite', 'Brevo', 'Vercel'],
              github: 'https://github.com/Adithya0805',
              demo: 'https://adithyaai.is-cool.dev'
            }
          ].map((project, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--bg-primary)',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '320px',
              transition: 'background-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '24px',
                letterSpacing: '1px'
              }}>{project.number}</span>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '12px',
                letterSpacing: '-0.5px',
                flex: 1
              }}>{project.name}</h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                marginBottom: '24px',
                flex: 2
              }}>{project.desc}</p>

              {/* Tech */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    padding: '3px 10px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)'
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '0.5px'
                }}>GitHub →</a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    textDecoration: 'none'
                  }}>Live →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — SKILLS & TOOLS — Editorial Table */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 80px',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '0',
          marginTop: '64px'
        }}>
          {[
            {
              category: 'AI & ML',
              skills: ['LangGraph', 'LangChain', 'RAG Systems', 'Pinecone', 'AWS Bedrock', 'Gemini API']
            },
            {
              category: 'Backend',
              skills: ['Python', 'FastAPI', 'Node.js', 'Supabase', 'Firebase', 'PostgreSQL']
            },
            {
              category: 'Frontend',
              skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Recharts']
            },
            {
              category: 'Cloud & Tools',
              skills: ['AWS EC2', 'Vercel', 'Docker', 'GitHub Actions', 'Pinecone', 'Railway']
            }
          ].map((col, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none'
            }}>
              <p style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '24px'
              }}>{col.category}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {col.skills.map(skill => (
                  <li key={skill} style={{
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    fontWeight: '500',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    {skill}
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--text-muted)'
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
