import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  MessageCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { TRANSITION_EASE } from "@/lib/motion";

interface BottleneckItem {
  id: string;
  category: string;
  question: string;
  traditionalPain: string;
  aiBreakthrough: string;
  architectureStack: string[];
  liveProofProject: string;
  liveProofUrl: string;
  turnaroundDays: string;
  guarantee: string;
}

const BOTTLENECKS: BottleneckItem[] = [
  {
    id: "night-inquiries",
    category: "CUSTOMER ACQUISITION & SALES",
    question: "Customers ask product, pricing, or purity questions at 11 PM and leave if unanswered.",
    traditionalPain:
      "Hiring night staff is too expensive. Generic chatbots output dumb canned answers or hallucinate fake prices.",
    aiBreakthrough:
      "Autonomous Bilingual RAG Assistant grounded strictly on your verified catalog. Answers nuanced queries in Tamil or English, quotes exact live inventory, and pre-fills instant WhatsApp checkout carts with zero human delay.",
    architectureStack: ["Next.js 14", "Gemini RAG", "Pinecone", "WhatsApp API", "Edge CDN"],
    liveProofProject: "Aranya Organic Dairy (Ask Farm AI)",
    liveProofUrl: "https://aranyaorganicdairyfarm.com/",
    turnaroundDays: "7–10 Days",
    guarantee: "100% Anti-Hallucination Grounding · 24/7 Zero Dropped Leads",
  },
  {
    id: "pricing-logistics",
    category: "OPERATIONS & LOGISTICS",
    question: "Pricing, fleet routes, fuel index, and driver allowances require constant manual math and phone calls.",
    traditionalPain:
      "Quotes take 30 minutes, human error causes money leaks on fuel spikes, and customers abandon before booking.",
    aiBreakthrough:
      "Dynamic Algorithmic Fare Engine. Computes multi-point distances, dynamically pulls real-time fuel rates (petrol/diesel), applies vehicle coefficients and driver bata, and outputs locked, binding quotes with instant WhatsApp contracts.",
    architectureStack: ["React", "Supabase", "Dynamic Fare Algorithm", "WhatsApp API", "Vercel"],
    liveProofProject: "SR Travels Intercity Dispatch",
    liveProofUrl: "https://sr-travels-tau.vercel.app",
    turnaroundDays: "7–12 Days",
    guarantee: "Instant 0.2s Fare Computation · Complete Admin Dispatch Control",
  },
  {
    id: "whatsapp-catalog",
    category: "COMMERCE & ORDERING",
    question: "Products are scattered across phone gallery photos, manual PDFs, and unorganized WhatsApp chats.",
    traditionalPain:
      "Customers ask 'Send photos', owner scrolls through thousands of images, orders get lost, payments are unverified.",
    aiBreakthrough:
      "Progressive Web App E-Commerce Platform. High-resolution catalog, automated AI image enhancement pipeline, personalized monogramming, and 1-click WhatsApp order routing backed by real-time inventory in Supabase.",
    architectureStack: ["Next.js", "Supabase RLS", "AI Image Pipeline", "WhatsApp Cart"],
    liveProofProject: "Dino Leathers Artisanal Goods",
    liveProofUrl: "https://leather-hub-chi.vercel.app",
    turnaroundDays: "5–8 Days",
    guarantee: "Zero-Cost Maintenance · 1-Click Customer Buying Flow",
  },
  {
    id: "multi-agent-docs",
    category: "ENTERPRISE INTELLIGENCE & CDSS",
    question: "Decision-makers drown in thousands of clinical papers, compliance guidelines, or complex records.",
    traditionalPain:
      "Single LLM prompts fail on multi-step logic, hit token limits, or miss critical safety cross-references.",
    aiBreakthrough:
      "Stateful Multi-Agent LangGraph Supervisor. Dedicated sub-agents (Intake, Triage, 50k+ Research RAG, Cross-Safety, Structured Transcription) orchestrate parallel verification, compiling standard compliant reports in <8s.",
    architectureStack: ["LangGraph", "FastAPI", "AWS Bedrock", "HL7 FHIR", "Cloud Run"],
    liveProofProject: "MediGuard V2 Clinical Assistant",
    liveProofUrl: "/blog/how-i-built-mediaguard-multi-agent-ai-system",
    turnaroundDays: "14–21 Days",
    guarantee: "100% LangSmith Trace Telemetry · Production Edge Rewrites",
  },
  {
    id: "custom-automation",
    category: "BESPOKE AI RESEARCH & IMPLEMENTATION",
    question: "You have a proprietary workflow that nobody has built or automated before.",
    traditionalPain:
      "Off-the-shelf SaaS software is rigid and doesn't fit your operational physics. Agency quotes are $20k+ with months of delays.",
    aiBreakthrough:
      "Custom Applied AI Engineering. From custom prompt-state graphs and domain vector embeddings to tailored web portals. If a human can follow an operational SOP, an autonomous AI system can execute it faster, cleaner, and without fatigue.",
    architectureStack: ["Custom Stack", "Python/TypeScript", "Supabase", "LLMs", "Docker"],
    liveProofProject: "TownRise Intelligence & Job Mail AI Agent",
    liveProofUrl: "/work",
    turnaroundDays: "7–14 Days",
    guarantee: "Full IP & Source Code Ownership · No Proprietary Lock-In",
  },
];

export function AIProblemAnalyzer() {
  const [selectedId, setSelectedId] = useState(BOTTLENECKS[0].id);
  const activeItem = BOTTLENECKS.find((b) => b.id === selectedId) || BOTTLENECKS[0];

  return (
    <section
      id="analyzer"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "#FAF7F2",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "100px",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border)",
              boxShadow: "0 2px 6px rgba(21, 21, 21, 0.04)",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={13} color="#C8A96E" />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#151515",
                fontFamily: "var(--font-mono)",
              }}
            >
              Custom Solution Architecture Analyzer
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: "400",
              color: "#151515",
              lineHeight: "1.1",
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            What problem are you facing?{" "}
            <span style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "var(--border)", textUnderlineOffset: "6px" }}>
              See how AI solves it.
            </span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#555048",
              lineHeight: "1.65",
              margin: 0,
            }}
          >
            AI is not a toy chatbot. When engineered by an applied researcher, autonomous systems replace weeks of manual friction with instant computational speed. Select a scenario below to inspect the architectural blueprint.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            gap: "28px",
            alignItems: "start",
          }}
          className="flagship-grid"
        >
          {/* Left Column: Problem Selector Pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {BOTTLENECKS.map((item, idx) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: `1px solid ${isSelected ? "#151515" : "var(--border)"}`,
                    backgroundColor: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                    boxShadow: isSelected
                      ? "0 8px 24px rgba(21, 21, 21, 0.06), 0 2px 6px rgba(21, 21, 21, 0.04)"
                      : "none",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: isSelected ? "#8E6F32" : "var(--text-3)",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: isSelected ? "600" : "450",
                        color: isSelected ? "#151515" : "#4A453E",
                        lineHeight: "1.4",
                        display: "block",
                      }}
                    >
                      {item.question}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    color={isSelected ? "#151515" : "#C4B9AA"}
                    style={{
                      transform: isSelected ? "translateX(2px)" : "none",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Blueprint Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: TRANSITION_EASE }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                padding: "32px",
                boxShadow: "0 12px 32px rgba(21, 21, 21, 0.06)",
              }}
            >
              {/* Top Tag & Turnaround */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      color: "#8E6F32",
                      textTransform: "uppercase",
                    }}
                  >
                    DEPLOYMENT BLUEPRINT
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "24px",
                      color: "#151515",
                      margin: "4px 0 0",
                    }}
                  >
                    {activeItem.category}
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: "#FAF7F2",
                    border: "1px solid var(--border)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#151515",
                    fontWeight: "600",
                  }}
                >
                  Sprint: {activeItem.turnaroundDays}
                </div>
              </div>

              {/* The Traditional Pain */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "10.5px",
                    color: "#DC2626",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    margin: "0 0 6px",
                    fontWeight: "700",
                  }}
                >
                  ✕ Why Traditional Software / Manual Work Fails
                </p>
                <p style={{ fontSize: "13.5px", color: "#6B665E", lineHeight: "1.6", margin: 0 }}>
                  {activeItem.traditionalPain}
                </p>
              </div>

              {/* The AI Breakthrough */}
              <div
                style={{
                  backgroundColor: "#FAF7F2",
                  border: "1px solid rgba(200, 169, 110, 0.4)",
                  borderRadius: "10px",
                  padding: "18px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <Zap size={14} color="#8E6F32" />
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#8E6F32",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      margin: 0,
                      fontWeight: "700",
                    }}
                  >
                    ✓ The Autonomous AI Breakthrough
                  </p>
                </div>
                <p style={{ fontSize: "14px", color: "#151515", lineHeight: "1.65", margin: 0, fontWeight: "500" }}>
                  {activeItem.aiBreakthrough}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    fontSize: "10.5px",
                    color: "var(--text-3)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    margin: "0 0 8px",
                    fontWeight: "600",
                  }}
                >
                  Engineered Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {activeItem.architectureStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "#4A453E",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--border)",
                        padding: "3px 9px",
                        borderRadius: "4px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operational Guarantee */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  backgroundColor: "rgba(16, 185, 129, 0.08)",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <ShieldCheck size={16} color="#059669" />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#065F46",
                    fontFamily: "var(--font-mono)",
                    fontWeight: "600",
                  }}
                >
                  {activeItem.guarantee}
                </span>
              </div>

              {/* Bottom Action Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "14px",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "20px",
                }}
              >
                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block" }}>
                    Live Proof of Concept:
                  </span>
                  <a
                    href={activeItem.liveProofUrl}
                    target={activeItem.liveProofUrl.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13px",
                      color: "#151515",
                      fontWeight: "700",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {activeItem.liveProofProject} ↗
                  </a>
                </div>

                <a
                  href={`https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20am%20interested%20in%20deploying%20the%20AI%20solution%20for%3A%20${encodeURIComponent(
                    activeItem.question
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink"
                  style={{
                    padding: "11px 20px",
                    fontSize: "13px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MessageCircle size={15} />
                  <span>Deploy This AI System</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default AIProblemAnalyzer;
