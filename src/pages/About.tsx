import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

const skillCols = [
  {
    cat: 'AI & Agents',
    skills: ['LangGraph', 'LangChain', 'RAG', 'Pinecone', 'AWS Bedrock', 'Gemini API'],
  },
  {
    cat: 'Backend',
    skills: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'Node.js', 'GitHub Actions'],
  },
  {
    cat: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Vite'],
  },
  {
    cat: 'Cloud',
    skills: ['AWS EC2', 'Google Cloud Run', 'Vercel', 'Railway', 'Docker'],
  },
];

const certs = [
  'AWS re/Start (Amazon-certified)',
  'BCG Data Science Simulation',
  'Prompt Engineering — Internshala',
  'LangGraph Orchestration',
  'RAG Pipeline Engineering',
  'Cisco Networking Essentials',
  'Cisco Entry Level Python',
  'Tata Data Visualisation',
];

const links = [
  { label: 'GitHub', href: 'https://github.com/Adithya0805' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adithya-kuppusamy-76baab204/' },
  { label: 'Email', href: 'mailto:adithyaadhi0805@gmail.com' },
  { label: 'Portfolio', href: 'https://adithyaai.is-cool.dev' },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Adithya Kuppusamy — AI Engineer</title>
        <meta
          name="description"
          content="AI & Data Science graduate from Ambur, Tamil Nadu. Building real AI systems with LangGraph, RAG, and AWS Bedrock."
        />
      </Helmet>

      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '120px 32px' }}>

        {/* ── Identity + Bio ────────────────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr',
          gap: '80px', alignItems: 'start',
          borderBottom: '1px solid var(--border)', paddingBottom: '80px',
          marginBottom: '80px'
        }} className="flagship-grid">

          {/* Left — identity */}
          <div>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--bg-2)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', marginBottom: '24px', color: 'var(--text-1)'
            }}>A</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: '32px',
              fontWeight: '400', letterSpacing: '-0.5px', marginBottom: '8px',
              color: 'var(--text-1)'
            }}>Adithya Kuppusamy</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '32px' }}>
              AI Engineer · Ambur, Tamil Nadu
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  style={{
                    fontSize: '13px', color: 'var(--text-2)',
                    textDecoration: 'none', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 0', borderBottom: '1px solid var(--border)'
                  }}
                >
                  {link.label} <span style={{ color: 'var(--text-3)' }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — bio */}
          <div>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: '22px',
              lineHeight: '1.6', color: 'var(--text-1)', marginBottom: '32px',
              fontWeight: '400'
            }}>
              I build AI systems that solve real problems —
              not demos, not tutorials, not toy projects.
            </p>
            <p style={{
              fontSize: '16px', color: 'var(--text-2)',
              lineHeight: '1.9', marginBottom: '24px'
            }}>
              I am a 2025 B.Tech graduate in AI & Data Science from Tamil Nadu.
              I grew up in Ambur — a town known for leather, not software engineers.
              Every project I have built started from a real gap I personally witnessed:
              patients getting wrong health information, property buyers with no tools,
              Tamil Nadu citizens unable to navigate government schemes.
            </p>
            <p style={{
              fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.9'
            }}>
              Through FutureLogic AI, I also freelance — building production platforms
              for Tamil Nadu businesses that need real digital infrastructure, not
              templated websites. Currently seeking an ML Engineer or AI Engineer role
              while continuing to build.
            </p>
          </div>
        </div>

        {/* ── Skills table ──────────────────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0', marginBottom: '80px'
        }} className="skills-grid">
          {skillCols.map((col, i) => (
            <div key={i} style={{
              padding: '32px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              borderTop: '1px solid var(--border)'
            }}>
              <p style={{
                fontSize: '11px', color: 'var(--text-3)',
                letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px'
              }}>{col.cat}</p>
              {col.skills.map(s => (
                <p key={s} style={{
                  fontSize: '14px', color: 'var(--text-2)',
                  padding: '8px 0', borderBottom: '1px solid var(--border)'
                }}>{s}</p>
              ))}
            </div>
          ))}
        </div>

        {/* ── Certifications ────────────────────────────────────────── */}
        <div>
          <p style={{
            fontSize: '11px', color: 'var(--text-3)',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px'
          }}>Certifications</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {certs.map(cert => (
              <span key={cert} style={{
                fontSize: '13px', color: 'var(--text-2)',
                border: '1px solid var(--border)',
                padding: '8px 16px', borderRadius: '4px'
              }}>{cert}</span>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
