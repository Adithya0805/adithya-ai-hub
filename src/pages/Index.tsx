import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HeroNeuralStage } from "@/components/HeroNeuralStage";
import { HeroNeuralTopology } from "@/components/HeroNeuralTopology";
import { AIProblemAnalyzer } from "@/components/AIProblemAnalyzer";
import { WorkCarousel } from "@/components/WorkCarousel";
import { StoryScenes } from "@/components/StoryScenes";
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

  const studioSteps = [
    {
      num: "01",
      title: "Understand the client",
      desc: "We review their catalog, customer buying habits, and friction points across WhatsApp, calls, or outdated sites.",
      detail: "Audit product inventory, clarify order/booking workflows, and define the exact customer journey.",
    },
    {
      num: "02",
      title: "Build",
      desc: "Fast, focused development sprint crafting a custom, mobile-first web platform powered by your studio's photography.",
      detail: "Clean catalog UI, instant WhatsApp checkout, database integration, and optional AI assistant answering customer questions.",
    },
    {
      num: "03",
      title: "Launch",
      desc: "Edge CDN deployment, custom domain mapping, SEO schema configuration, and full operational handoff.",
      detail: "Sub-second load times, instant mobile responsiveness, zero dropped inquiries, and simple owner training.",
    },
    {
      num: "04",
      title: "Care (maintain & manage data)",
      desc: "Ongoing reliability so the business owner never has to worry about broken forms, slow servers, or lost records.",
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

      {/* ── 1. HERO SECTION (Aura Left, Living AI Operations Stage Right) ─ */}
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
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="hero-split-grid"
          >
            {/* Left Column: Aura, Conviction & High-Level Positioning */}
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
                  marginBottom: "24px",
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

              {/* Main Headline with Heavy Aura */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: TRANSITION_EASE }}
                className="text-display"
                style={{
                  marginBottom: "20px",
                  color: "#151515",
                  textWrap: "balance",
                  lineHeight: "1.02",
                }}
              >
                AI systems engineered to solve what software alone{" "}
                <span style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "var(--border)", textUnderlineOffset: "8px" }}>
                  cannot touch.
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
                  marginBottom: "32px",
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

            {/* Right Column: Interactive AI Operations Console & Neural Simulator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: TRANSITION_EASE }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <HeroNeuralStage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE AI CAPABILITY & PROBLEM ANALYZER ──────────────── */}
      <AIProblemAnalyzer />

      {/* ── 3. WORK SECTION (Horizontal Scroll-Snap Colour Stage Carousel) ─ */}
      <WorkCarousel />

      {/* ── 4. STORY SCENES (Light Cards with "Before / With AI" Slider) ── */}
      <StoryScenes />

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
              Specialized AI systems built from scratch.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "580px", lineHeight: "1.7", marginTop: "10px" }}>
              Stateful agent orchestrations, regional NLP pipelines, and geospatial analysis platforms.
            </p>
          </div>

          {/* 3 AI Systems Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {/* MediGuard */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#0369a1", backgroundColor: "#e0f2fe", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
                    Clinical AI
                  </span>
                  <a
                    href="https://mediguard-v2.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit MediGuard V2"
                    style={{ color: "var(--text-2)" }}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#151515", marginBottom: "10px" }}>
                  MediGuard V2
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "20px" }}>
                  Stateful multi-agent CDSS orchestrated with LangGraph, Pinecone RAG differential diagnosis over 50k+ papers, and HL7 FHIR report export.
                </p>
              </div>
              <a
                href="https://mediguard-v2.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", fontWeight: "600", color: "#151515", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Live System Demo</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Urimai AI */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#6b21a8", backgroundColor: "#f3e8ff", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
                    GovTech AI
                  </span>
                  <a
                    href="https://github.com/Adithya0805"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Urimai AI Repository"
                    style={{ color: "var(--text-2)" }}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#151515", marginBottom: "10px" }}>
                  Urimai AI
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "20px" }}>
                  Multi-agent Tamil Nadu government scheme assistant evaluating 64 schemes with 199 codified rules in conversational Tamil and Tanglish.
                </p>
              </div>
              <a
                href="https://github.com/Adithya0805"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", fontWeight: "600", color: "#151515", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Architecture & Code</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* TownRise AI */}
            <div
              className="card-standard"
              style={{
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#166534", backgroundColor: "#dcfce7", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
                    Real Estate AI
                  </span>
                  <a
                    href="https://townrise-app-for-real-estates.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit TownRise AI"
                    style={{ color: "var(--text-2)" }}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#151515", marginBottom: "10px" }}>
                  TownRise AI
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.6", marginBottom: "20px" }}>
                  Geospatial growth intelligence platform indexing 50+ Tamil Nadu towns using Gemini API structured output and OpenStreetMap data.
                </p>
              </div>
              <a
                href="https://townrise-app-for-real-estates.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", fontWeight: "600", color: "#151515", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Live Platform</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Responsible AI Feature Card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E6DFD3",
              borderRadius: "14px",
              padding: "28px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#151515", fontWeight: "700", fontSize: "12px", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                <ShieldCheck size={16} color="#B8934A" />
                <span>RESPONSIBLE AI STANDARDS</span>
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#151515", margin: 0 }}>
                How we keep small business AI secure, private, and hallucination-free.
              </h4>
            </div>

            <Link to="/responsible-ai" className="btn-ink" style={{ fontSize: "13px", padding: "10px 20px" }}>
              <span>Read Our Principles</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. HOW I'D WORK WITH THE STUDIO ───────────────────────────── */}
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
                Partnership Flow
              </span>
            </div>
            <h2 className="text-section-title" style={{ color: "#151515", margin: 0 }}>
              How I'd work with your studio.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "620px", lineHeight: "1.7", marginTop: "10px" }}>
              A seamless collaboration: your studio shoots world-class photography and crafts the brand identity — I build the custom websites, booking engines, and AI tools your clients need to sell.
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
            {studioSteps.map((step, idx) => (
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

      {/* ── 6. CLOSING CTA ────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-0)",
        }}
        className="section-spacing"
      >
        <div className="site-container">
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "clamp(36px, 6vw, 64px) 32px",
              textAlign: "center",
              boxShadow: "0 6px 24px rgba(21, 21, 21, 0.04)",
            }}
          >
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 14px",
                  borderRadius: "100px",
                  backgroundColor: "#F7F3EC",
                  border: "1px solid var(--border)",
                  color: "#151515",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}
              >
                <Sparkles size={13} color="var(--accent)" />
                <span>Let's collaborate</span>
              </div>

              <h2
                className="text-section-title"
                style={{
                  fontSize: "clamp(30px, 5vw, 50px)",
                  marginBottom: "20px",
                  color: "#151515",
                }}
              >
                Let's build something for your next client.
              </h2>

              <p
                style={{
                  fontSize: "16px",
                  color: "var(--text-2)",
                  lineHeight: "1.7",
                  marginBottom: "36px",
                }}
              >
                Whether you have an upcoming brand shoot, a client asking for an online store, or a local business ready to automate customer replies — let's deliver something exceptional together.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20let%27s%20build%20something%20for%20a%20client."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: "14px 28px", fontSize: "14.5px" }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp (+91 88257 14576)</span>
                </a>

                <a
                  href="mailto:adithyaadhi0805@gmail.com?subject=Studio%20Client%20Collaboration%20Inquiry"
                  className="btn-ink"
                  style={{ padding: "14px 28px", fontSize: "14.5px" }}
                >
                  <Mail size={16} />
                  <span>Email Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
