import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { InteractiveNeuralMotion } from "@/components/InteractiveNeuralMotion";
import { HeroNeuralTopology } from "@/components/HeroNeuralTopology";
import { AIProblemAnalyzer } from "@/components/AIProblemAnalyzer";
import { WorkCarousel } from "@/components/WorkCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TRANSITION_EASE } from "@/lib/motion";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export default function Index() {
  const shouldReduceMotion = useReducedMotion();

  const deliverySteps = [
    {
      num: "01",
      title: "Understand the problem",
      desc: "We review your operational workflows, customer buying habits, and bottlenecks across WhatsApp, calls, or legacy software.",
      detail: "Audit product inventory, clarify order/booking flows, and define the exact AI integration points.",
    },
    {
      num: "02",
      title: "Engineer & Build",
      desc: "Fast, focused engineering sprint crafting a custom, high-performance web platform powered by modern production design and AI.",
      detail: "Clean catalog UI, instant WhatsApp checkout, database integration, and optional AI assistant answering customer questions.",
    },
    {
      num: "03",
      title: "Launch to Production",
      desc: "Edge CDN deployment, custom domain mapping, SEO schema configuration, and full operational handoff.",
      detail: "Sub-second load times, instant mobile responsiveness, zero dropped inquiries, and simple owner training.",
    },
    {
      num: "04",
      title: "Care & Manage Data",
      desc: "Ongoing reliability so your team never has to worry about broken forms, slow servers, or lost records.",
      detail: "Regular updates, weekly backups, security monitoring, catalog price refreshes, and database cleanup.",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Adithya Kuppusamy — AI Systems Architect & Applied Researcher</title>
        <meta
          name="description"
          content="Applied AI researcher and systems architect building autonomous AI systems, multi-agent pipelines, and production digital platforms that solve deep real-world problems."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/" />
        <meta property="og:title" content="Adithya Kuppusamy — AI Systems Architect & Applied Researcher" />
        <meta
          property="og:description"
          content="AI systems engineered to solve what software alone cannot touch. From multi-agent clinical supervisors to bilingual RAG commerce engines."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── 1. HERO SECTION (Premium Display Left, Interactive Neural Motion Right) ─ */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-0)",
          overflow: "hidden",
          paddingTop: "56px",
          paddingBottom: "72px",
        }}
      >
        {/* Background Neural Topology & Vector Mesh */}
        <HeroNeuralTopology />

        <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.08fr 0.92fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="hero-split-grid"
          >
            {/* Left Column: Premium Typography, Aura & Authority */}
            <div>
              {/* Status Beacon Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: TRANSITION_EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(21, 21, 21, 0.04)",
                  marginBottom: "28px",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#151515",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  AI Systems Architect & Researcher · Solving Deep Problems
                </span>
              </motion.div>

              {/* Main Headline in Premium Instrument Serif */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: TRANSITION_EASE }}
                className="text-display"
                style={{
                  marginBottom: "22px",
                  color: "#151515",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(46px, 6.5vw, 84px)",
                  fontWeight: "400",
                  lineHeight: "0.96",
                  letterSpacing: "-2px",
                  textWrap: "balance",
                }}
              >
                AI systems engineered to solve what software{" "}
                <span style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "var(--border)", textUnderlineOffset: "8px" }}>
                  alone cannot touch.
                </span>
              </motion.h1>

              {/* Supporting Authority Line */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: TRANSITION_EASE }}
                style={{
                  fontSize: "clamp(16px, 1.8vw, 19px)",
                  color: "#4A453E",
                  lineHeight: "1.65",
                  marginBottom: "36px",
                  maxWidth: "560px",
                  textWrap: "pretty",
                }}
              >
                Applied AI researcher turning frontier autonomous intelligence into production engines. From stateful multi-agent clinical supervisors to zero-overhead conversational WhatsApp commerce — if it can be imagined, it can be engineered.
              </motion.p>

              {/* Action Buttons: See my work (direct link to /work) + Advanced Services Workflow + WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: TRANSITION_EASE }}
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {/* 1. See my work -> navigates directly to /work */}
                <Link
                  to="/work"
                  className="btn-ink"
                  style={{
                    padding: "13px 26px",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>See my work</span>
                  <ArrowRight size={15} />
                </Link>

                {/* 2. Advanced Service Workflow -> navigates to /services */}
                <Link
                  to="/services"
                  style={{
                    padding: "13px 22px",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border)",
                    color: "#151515",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "600",
                    boxShadow: "0 2px 6px rgba(21, 21, 21, 0.04)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FAF7F2";
                    e.currentTarget.style.borderColor = "#151515";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Sparkles size={15} color="#8E6F32" />
                  <span>AI Services & Workflow</span>
                </Link>

                {/* 3. WhatsApp Direct Consultation */}
                <a
                  href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20have%20an%20AI%20system%20or%20complex%20problem%20I%20would%20like%20to%20architect%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: "13px 20px", fontSize: "14px" }}
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Consult</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Interactive Motion Design with Clear Mouse Movement Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: TRANSITION_EASE }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InteractiveNeuralMotion />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE AI CAPABILITY & PROBLEM ANALYZER ──────────────── */}
      <AIProblemAnalyzer />

      {/* ── 3. WORK SECTION (Horizontal Scroll-Snap Colour Stage Carousel) ─ */}
      <WorkCarousel />

      {/* ── 4. AI SYSTEMS & RESPONSIBLE AI SECTION ─────────────────────── */}
      <section
        id="systems"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-0)",
        }}
        className="section-spacing"
      >
        <div className="site-container">
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#151515",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "700",
                }}
              >
                Infrastructures & Research
              </span>
            </div>
            <h2 className="text-section-title" style={{ color: "#151515", margin: 0 }}>
              AI Systems Built for Real Operation
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "600px", lineHeight: "1.7", marginTop: "10px" }}>
              Beyond websites — multi-agent clinical decision support, stateful knowledge RAG, and automated workflow pipelines deployed in production.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* System 1: MediGuard */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "700" }}>
                    HEALTHCARE CDSS
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-3)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "4px" }}>
                    LangGraph · 5 Agents
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "#151515", marginBottom: "12px" }}>
                  MediGuard V2
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.65", marginBottom: "20px" }}>
                  Multi-agent clinical decision support. Five specialized agents intake patient data, triage symptoms, query 50,000+ medical research papers via RAG, verify drug-drug allergies, and compile HL7 FHIR standard PDFs in &lt;8s.
                </p>
              </div>

              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  Cloud Run + Vercel Edge
                </span>
                <Link
                  to="/blog/how-i-built-mediaguard-multi-agent-ai-system"
                  style={{ fontSize: "13px", color: "#151515", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Case Study</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* System 2: Urimai AI */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "700" }}>
                    CIVIC AI · TAMIL NLP
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-3)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "4px" }}>
                    49/49 Tests Passing
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "#151515", marginBottom: "12px" }}>
                  Urimai AI
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.65", marginBottom: "20px" }}>
                  Multi-agent Tamil Nadu government scheme eligibility platform. Evaluates 64 state schemes with 199 codified rules through conversational Tamil voice and text intake with 0% fabricated eligibility output.
                </p>
              </div>

              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  FastAPI + Supabase
                </span>
                <Link
                  to="/projects"
                  style={{ fontSize: "13px", color: "#151515", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <span>View Details</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* System 3: TownRise Intelligence */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: "700" }}>
                    FLAGSHIP · AUTONOMOUS GEOSPATIAL AI
                  </span>
                  <span style={{ fontSize: "10.5px", color: "#B45309", backgroundColor: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "2px 8px", borderRadius: "4px", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                    ● Under Work Process
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "#151515", marginBottom: "8px" }}>
                  TownRise Intelligence
                </h3>
                <p style={{ fontSize: "12.5px", color: "#8C857B", fontFamily: "var(--font-mono)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Tier-2/3 Growth Corridor Modeling · Active R&D
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.65", marginBottom: "20px" }}>
                  Autonomous geospatial & economic growth intelligence engine modeling real estate clusters and commercial expansion scores across 50+ Tamil Nadu corridors. Currently in active development sprint.
                </p>
              </div>

              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  PyTorch + LangGraph + Spatial RAG
                </span>
                <a
                  href="https://github.com/Adithya0805/townrise-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "13px", color: "#151515", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <span>GitHub (Active Sprint)</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Responsible AI Callout Banner */}
          <div
            style={{
              marginTop: "48px",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(200, 169, 110, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "700", margin: "0 0 4px" }}>
                  OPERATIONAL ETHICS & ANTI-HALLUCINATION
                </p>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#151515", margin: 0 }}>
                  How we keep production AI secure, private, and hallucination-free.
                </h4>
              </div>
            </div>

            <Link to="/responsible-ai" className="btn-ink" style={{ fontSize: "13px", padding: "10px 20px" }}>
              <span>Read Our Principles</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. ENGINEERING & DEPLOYMENT METHODOLOGY ───────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-0)",
        }}
        className="section-spacing"
      >
        <div className="site-container">
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#151515",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "700",
                }}
              >
                Engineering Flow
              </span>
            </div>
            <h2 className="text-section-title" style={{ color: "#151515", margin: 0 }}>
              How we engineer and deploy your solution.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "620px", lineHeight: "1.7", marginTop: "10px" }}>
              A clear, transparent four-stage methodology: from deep operational audit to production deployment, custom AI integrations, and ongoing data reliability.
            </p>
          </div>

          {/* Animated 4-Step Timeline (Zero prices anywhere) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {deliverySteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: TRANSITION_EASE }}
                className="card-standard"
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent)",
                      fontWeight: "700",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>STEP {step.num}</span>
                    <span style={{ width: "24px", height: "1px", backgroundColor: "#E6DFD3" }} />
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "22px",
                      color: "#151515",
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {step.desc}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid #E6DFD3",
                    fontSize: "12.5px",
                    color: "#8C857B",
                    lineHeight: "1.6",
                  }}
                >
                  {step.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. NEWSLETTER SUBSCRIPTION (At the very bottom of the page) ── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "#FFFFFF",
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "100px",
              backgroundColor: "#FAF7F2",
              border: "1px solid var(--border)",
              marginBottom: "16px",
            }}
          >
            <Mail size={13} color="#C8A96E" />
            <span
              style={{
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#151515",
              }}
            >
              The Applied AI Dispatch
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              color: "#151515",
              lineHeight: "1.15",
              marginBottom: "12px",
              fontWeight: "400",
            }}
          >
            Frontier AI research & production breakdowns.
          </h3>

          <p
            style={{
              fontSize: "14.5px",
              color: "#6B665E",
              lineHeight: "1.65",
              marginBottom: "28px",
            }}
          >
            Monthly engineering deep dives into LangGraph multi-agent orchestration, RAG architectures, and real client deployments. Zero spam.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <NewsletterForm compact />
          </div>
        </div>
      </section>
    </Layout>
  );
}
