import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, Loader2, CheckCircle2, FileDown, Award, GraduationCap } from "lucide-react";
import { Layout } from "@/components/Layout";

const skillsMatrix = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Bash"],
  },
  {
    category: "AI / ML & NLP",
    skills: ["LangGraph", "TensorFlow", "Keras", "Pinecone / RAG", "NLTK", "LLMs", "Scikit-learn"],
  },
  {
    category: "Backend & Cloud",
    skills: ["FastAPI", "Flask", "AWS EC2", "AWS Bedrock", "AWS S3", "Firebase", "Supabase"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Recharts"],
  },
];

const certs = [
  { name: "AWS re/Start Graduate", issuer: "Amazon Web Services", icon: "☁️", link: "https://www.credly.com/badges/42cb2399-72be-4e6c-b8d6-952e7a4ce6d5/public_url" },
  { name: "BCG Data Science Job Simulation", issuer: "BCG via Forage", icon: "📊", link: "/bcg_cert.pdf" },
  { name: "Prompt Engineering for AI", issuer: "DeepLearning.AI", icon: "🤖", link: "/prompt_cert.pdf" },
  { name: "Python for Everybody", issuer: "University of Michigan", icon: "🐍", link: "#" },
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI / Coursera", icon: "🧠", link: "#" },
  { name: "Data Analysis with Python", issuer: "IBM / Coursera", icon: "📈", link: "#" },
];

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in all fields.");
      return;
    }
    setErrMsg("");
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mjgzgzbn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Contact from ${form.name} — Adithya AI Hub`, source: 'contact-form' }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please email me directly at adithyaadhi0805@gmail.com");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>About Adithya Kuppusamy — AI Engineer | Adithya AI Hub</title>
        <meta
          name="description"
          content="AI & Data Science graduate from Ambur, Tamil Nadu. Building real AI systems with LangGraph, RAG, and AWS Bedrock."
        />
      </Helmet>

      <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '64px 24px' }}>
        {/* Bio Section */}
        <div style={{ marginBottom: '64px', borderBottom: '1px solid var(--border)', paddingBottom: '48px' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>
            ABOUT ME
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '48px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.1',
            marginBottom: '8px',
            letterSpacing: '-1px'
          }}>
            Adithya Kuppusamy
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            AI & Data Science Engineer · Tamil Nadu, India
          </p>

          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#2d2d2d', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              I'm Adithya Kuppusamy — a B.Tech graduate in Artificial Intelligence and Data Science from Dhanalakshmi Srinivasan College of Engineering, Tamil Nadu. I grew up in Ambur, a town known for its leather industry.
            </p>
            <p>
              I got into AI to build software that solves real physical and informational challenges. My work spans multi-agent clinical decision tools (MediGuard), regional spoken communication helpers (SkillSpeak AI), and market intelligence platforms (TownRise AI).
            </p>
            <p>
              Currently, I focus on building stateful agentic pipelines (LangGraph), retrieval augmented generation (Pinecone RAG), cloud AI services (AWS Bedrock), and performant web applications.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px' }}>
            <a href="https://github.com/Adithya0805" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px' }}>
              GitHub →
            </a>
            <a href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px' }}>
              LinkedIn →
            </a>
            <a href="mailto:adithyaadhi0805@gmail.com" style={{ fontSize: '14px', color: 'var(--bg-primary)', backgroundColor: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px' }}>
              Email Me →
            </a>
          </div>
        </div>

        {/* Education */}
        <section style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
            Education
          </h2>
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
              B.Tech in Artificial Intelligence & Data Science
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Dhanalakshmi Srinivasan College of Engineering, Coimbatore · CGPA: 8.5
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              2021 – 2025
            </p>
          </div>
        </section>

        {/* Skills Matrix */}
        <section style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
            Skills Matrix
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {skillsMatrix.map((cat) => (
              <div key={cat.category} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((s) => (
                    <span key={s} style={{ fontSize: '13px', backgroundColor: 'var(--border-light)', color: 'var(--text-primary)', padding: '4px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {certs.map((c) => (
              <div key={c.name} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{c.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{c.issuer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            Get in Touch
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Open to opportunities, collaborations, and discussions about AI engineering.
          </p>

          {status === "success" ? (
            <p style={{ fontSize: '15px', color: '#2d7a2d' }}>
              ✓ Message sent. I will get back to you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                style={{ padding: '12px 16px', fontSize: '14px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', outline: 'none' }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                style={{ padding: '12px 16px', fontSize: '14px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', outline: 'none' }}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                required
                style={{ padding: '12px 16px', fontSize: '14px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', outline: 'none', resize: 'none' }}
              />
              {errMsg && <p style={{ fontSize: '13px', color: '#c0392b' }}>{errMsg}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: 'var(--bg-primary)', backgroundColor: 'var(--text-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </section>
      </div>
    </Layout>
  );
}
