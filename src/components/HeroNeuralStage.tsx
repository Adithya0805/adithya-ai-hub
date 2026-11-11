import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Bot,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { TRANSITION_EASE } from "@/lib/motion";

interface SystemPreview {
  id: string;
  name: string;
  shortTag: string;
  badge: string;
  brandColor: string;
  accentBg: string;
  headline: string;
  inputPrompt: string;
  agentThought: string;
  resultAction: string;
  metric: string;
  liveUrl: string;
  isExternal: boolean;
  visualType: "aranya" | "travels" | "leathers" | "mediguard";
}

const SYSTEMS: SystemPreview[] = [
  {
    id: "aranya",
    name: "01. Vedic RAG Engine",
    shortTag: "Aranya Dairy Farm",
    badge: "Live Client Deployment · Shoolagiri",
    brandColor: "#2D5A27",
    accentBg: "#173014",
    headline: "Vedic A2 Dairy E-Commerce & RAG Assistant",
    inputPrompt: "Customer query: 'Can A2 milk help lactose-sensitive digestion? How is Bilona ghee prepared?'",
    agentThought: "Retrieving Shoolagiri A2 Gir Cow knowledge base · Vector similarity 99.4% · Zero hallucinations.",
    resultAction: "Synthesized bilingual Tamil/English response & pre-filled direct WhatsApp cart for 500ml Vedic Ghee.",
    metric: "<1.1s LCP · 100/100 SEO · 24/7 Zero-Staff Support",
    liveUrl: "https://aranyaorganicdairyfarm.com/",
    isExternal: true,
    visualType: "aranya",
  },
  {
    id: "travels",
    name: "02. Dynamic Fleet Dispatch",
    shortTag: "SR Travels",
    badge: "Live Client Deployment · Tamil Nadu",
    brandColor: "#0A192F",
    accentBg: "#060F1E",
    headline: "Real-Time Intercity Fare & Route Optimization",
    inputPrompt: "Booking: Chennai ⇄ Bangalore (348 km) · Vehicle: Innova Crysta SUV · 1 Night Halt",
    agentThought: "Live fuel API indexed (Petrol: ₹100.85/L) · Computed driver bata & automated toll rules.",
    resultAction: "Locked guaranteed fare ₹3,450 · Generated instant WhatsApp booking contract with driver dispatch alert.",
    metric: "Zero Dropped Bookings · 100% Automated Calculations",
    liveUrl: "https://sr-travels-tau.vercel.app",
    isExternal: true,
    visualType: "travels",
  },
  {
    id: "leathers",
    name: "03. Artisanal D2C Pipeline",
    shortTag: "Dino Leathers",
    badge: "Live Client Deployment · Ambur",
    brandColor: "#5C2C16",
    accentBg: "#35190C",
    headline: "High-Resolution Catalog & Instant WhatsApp Checkout",
    inputPrompt: "Workshop intake: Raw product photography of Full-Grain Pull-Up Leather Bifold Wallet",
    agentThought: "AI image enhancement pipeline applied studio lighting, depth shading & monogram embossing [A · K].",
    resultAction: "Live Supabase catalog sync · Direct workshop pricing ₹1,299 with zero-friction 1-click WhatsApp cart.",
    metric: "Instant Omnichannel Setup · High Mobile Conversion",
    liveUrl: "https://leather-hub-chi.vercel.app",
    isExternal: true,
    visualType: "leathers",
  },
  {
    id: "mediguard",
    name: "04. Multi-Agent CDSS",
    shortTag: "MediGuard V2",
    badge: "Production AI System · Healthcare",
    brandColor: "#0F172A",
    accentBg: "#080D18",
    headline: "LangGraph 5-Agent Clinical Decision Support",
    inputPrompt: "Clinical record: 62yo male, Warfarin prescription, presenting with acute epistaxis & INR 4.2",
    agentThought: "Supervisor orchestrated Intake → Symptom Triage → 50k+ PubMed Papers RAG → Drug-Allergy Safety.",
    resultAction: "Flagged critical anticoagulant toxicity · Compiled HL7 FHIR R4 standard bundle & physician PDF in <8s.",
    metric: "100% LangSmith Telemetry · Multi-Agent Stateful Graph",
    liveUrl: "/blog/how-i-built-mediaguard-multi-agent-ai-system",
    isExternal: false,
    visualType: "mediguard",
  },
];

export function HeroNeuralStage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSystem = SYSTEMS[activeIdx];

  // Optional subtle auto-rotation if user hasn't clicked in 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SYSTEMS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
        position: "relative",
      }}
      className="neural-stage-wrapper"
    >
      {/* Outer Floating Glow Frame */}
      <div
        style={{
          position: "absolute",
          inset: "-8px",
          borderRadius: "20px",
          background: `radial-gradient(circle at 70% 30%, ${activeSystem.brandColor}33 0%, transparent 70%)`,
          filter: "blur(20px)",
          transition: "background 0.5s ease",
          zIndex: 0,
        }}
      />

      {/* Main Glass Console Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid var(--border)",
          boxShadow: "0 20px 48px rgba(21, 21, 21, 0.08), 0 4px 12px rgba(21, 21, 21, 0.04)",
          overflow: "hidden",
        }}
      >
        {/* Console Header Bar */}
        <div
          style={{
            padding: "12px 18px",
            backgroundColor: "#FAF7F2",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* Live Runtime Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "#151515",
                textTransform: "uppercase",
              }}
            >
              AI Operations Engine
            </span>
          </div>

          {/* Metric Pill */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#6B665E",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border)",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            SYS: PRODUCTION DEPLOYED
          </div>
        </div>

        {/* System Switcher Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "#FAF7F2",
          }}
        >
          {SYSTEMS.map((sys, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={sys.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: "10px 6px",
                  fontSize: "11px",
                  fontWeight: isActive ? "700" : "500",
                  fontFamily: "var(--font-mono)",
                  color: isActive ? "#151515" : "#6B665E",
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  border: "none",
                  borderBottom: isActive ? `2px solid ${sys.brandColor}` : "2px solid transparent",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.18s ease",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {sys.shortTag}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: TRANSITION_EASE }}
            style={{ padding: "20px" }}
          >
            {/* Visual Brand Stage Mockup */}
            <div
              style={{
                backgroundColor: activeSystem.accentBg,
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: `0 8px 24px ${activeSystem.brandColor}30`,
                color: "#FAF7F2",
                marginBottom: "18px",
              }}
            >
              {/* Internal Mockup Header */}
              <div
                style={{
                  padding: "8px 14px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
                </div>
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {activeSystem.badge}
                </span>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                  }}
                />
              </div>

              {/* Internal Mockup Body */}
              <div style={{ padding: "18px" }}>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#C8A96E",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "4px",
                    fontWeight: "600",
                  }}
                >
                  ACTIVE ARCHITECTURE
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "20px",
                    color: "#FFFFFF",
                    fontWeight: "400",
                    lineHeight: "1.2",
                    marginBottom: "8px",
                  }}
                >
                  {activeSystem.headline}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.55",
                    margin: 0,
                  }}
                >
                  {activeSystem.metric}
                </p>
              </div>
            </div>

            {/* Live AI Reasoning Flow Stream */}
            <div
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              {/* Step 1: Input */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "#6B665E",
                    flexShrink: 0,
                    marginTop: "2px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  IN
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "var(--text-3)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 2px" }}>
                    Operational Input
                  </p>
                  <p style={{ fontSize: "12.5px", color: "#151515", margin: 0, fontWeight: "500", lineHeight: "1.4" }}>
                    {activeSystem.inputPrompt}
                  </p>
                </div>
              </div>

              {/* Step 2: Agent Thought */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(200, 169, 110, 0.15)",
                    border: "1px solid rgba(200, 169, 110, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#8E6F32",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <Cpu size={12} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "#8E6F32", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 2px", fontWeight: "700" }}>
                    Autonomous Execution Trace
                  </p>
                  <p style={{ fontSize: "12px", color: "#4A453E", margin: 0, lineHeight: "1.45" }}>
                    {activeSystem.agentThought}
                  </p>
                </div>
              </div>

              {/* Step 3: Verified Action */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#059669",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <CheckCircle2 size={12} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "#059669", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 2px", fontWeight: "700" }}>
                    Instant Real-World Output
                  </p>
                  <p style={{ fontSize: "12px", color: "#151515", margin: 0, lineHeight: "1.45", fontWeight: "500" }}>
                    {activeSystem.resultAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Launch / Test Action Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "#6B665E",
                }}
              >
                Production Platform · Fully Operational
              </span>

              {activeSystem.isExternal ? (
                <a
                  href={activeSystem.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                  style={{
                    padding: "8px 16px",
                    fontSize: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "6px",
                  }}
                >
                  <span>Test Live Site</span>
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                <a
                  href={activeSystem.liveUrl}
                  className="btn-ink"
                  style={{
                    padding: "8px 16px",
                    fontSize: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "6px",
                  }}
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeroNeuralStage;
