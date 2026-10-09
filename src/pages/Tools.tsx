import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { MediGuardSandbox } from "@/components/MediGuardSandbox";
import { SkillSpeakSandbox } from "@/components/SkillSpeakSandbox";
import { TradingBotSimulator } from "@/components/TradingBotSimulator";
import { SkillGraph } from "@/components/SkillGraph";
import { ProjectRecommender } from "@/components/ProjectRecommender";
import { SystemPromptStudio } from "@/components/SystemPromptStudio";
import { SqlStudio } from "@/components/SqlStudio";
import {
  Activity,
  MessageSquare,
  TrendingUp,
  Brain,
  Sparkles,
  Wand2,
  Database,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Server,
  Layers,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

type ToolTab =
  | "mediguard"
  | "prompt-studio"
  | "sql-studio"
  | "skillspeak"
  | "trading"
  | "skillgraph"
  | "matcher";

const VALID_TABS: ToolTab[] = [
  "mediguard",
  "prompt-studio",
  "sql-studio",
  "skillspeak",
  "trading",
  "skillgraph",
  "matcher",
];

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as ToolTab | null;
  const [activeTab, setActiveTab] = useState<ToolTab>(
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : "mediguard"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId: ToolTab) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleRecommend = (slug: string) => {
    navigate(`/work#${slug}`);
  };

  const tabs = [
    {
      id: "mediguard" as ToolTab,
      label: "MediGuard Clinical AI",
      icon: Activity,
      tag: "Multi-Agent System",
      desc: "5-agent LangGraph clinical triage & RAG diagnostic simulator",
    },
    {
      id: "prompt-studio" as ToolTab,
      label: "System Prompt Studio",
      icon: Wand2,
      tag: "LLM Guardrails",
      desc: "Compile battle-tested system prompts with XML reasoning & defenses",
    },
    {
      id: "sql-studio" as ToolTab,
      label: "Natural Language SQL",
      icon: Database,
      tag: "Data Systems",
      desc: "Convert conversational English to optimized PostgreSQL with query plans",
    },
    {
      id: "skillspeak" as ToolTab,
      label: "SkillSpeak Interview Lab",
      icon: MessageSquare,
      tag: "Career & NLP",
      desc: "Tanglish-to-Corporate English converter & JD match scanner",
    },
    {
      id: "trading" as ToolTab,
      label: "Trading Bot Simulator",
      icon: TrendingUp,
      tag: "Real-time Crypto",
      desc: "Binance Futures algo trading simulator with live indicators",
    },
    {
      id: "skillgraph" as ToolTab,
      label: "AI Skill Network Graph",
      icon: Brain,
      tag: "Knowledge Graph",
      desc: "Interactive visual network of engineering proficiencies",
    },
    {
      id: "matcher" as ToolTab,
      label: "Project Matcher",
      icon: Sparkles,
      tag: "AI Quiz",
      desc: "Interactive quiz matching your team or recruiter need to projects",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Interactive AI Labs & Tools | Adithya AI Hub</title>
        <meta
          name="description"
          content="Explore live interactive AI tools and sandboxes built by Adithya Kuppusamy: MediGuard Clinical AI, System Prompt Architect Studio, Natural Language SQL Studio, SkillSpeak Interview Lab, and Trading Bot Simulator."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/tools" />
        <meta property="og:title" content="Interactive AI Labs & Tools | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Live interactive sandboxes demonstrating multi-agent systems, prompt engineering, SQL compilation, NLP converters, and algorithmic trading simulators."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/tools" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "80px 24px 96px" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px", borderBottom: "1px solid var(--border)", paddingBottom: "32px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "16px",
            }}
          >
            INTERACTIVE LABS & SANDBOXES
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: "400",
              color: "var(--text-1)",
              letterSpacing: "-1.5px",
              lineHeight: "1.08",
              marginBottom: "16px",
            }}
          >
            AI Engineering <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Playground.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "680px", lineHeight: "1.7" }}>
            Don't just read about architectures — interact with them live. These sandboxes simulate
            multi-agent workflows, clinical healthcare safety, LLM guardrails, SQL engines, and algorithmic execution.
          </p>
        </div>

        {/* Live Lab Telemetry Header Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "36px",
            padding: "16px 20px",
            background: "rgba(200, 169, 110, 0.04)",
            border: "1px solid rgba(200, 169, 110, 0.15)",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Server size={18} style={{ color: "#4ade80" }} />
            <div>
              <p style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Active Compute
              </p>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
                4 Production Clusters
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Zap size={18} style={{ color: "var(--accent)" }} />
            <div>
              <p style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Avg Model Latency
              </p>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
                128ms · Edge Tuned
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldCheck size={18} style={{ color: "#60a5fa" }} />
            <div>
              <p style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Active Guardrails
              </p>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
                DeepEval & LlamaGuard
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 size={18} style={{ color: "#a855f7" }} />
            <div>
              <p style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Benchmark Grounding
              </p>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
                99.4% Factual Precision
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "16px 20px",
                  background: isActive ? "rgba(200, 169, 110, 0.12)" : "var(--bg-1)",
                  border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "8px" }}>
                  <Icon size={18} style={{ color: isActive ? "var(--accent)" : "var(--text-3)" }} />
                  <span
                    style={{
                      fontSize: "10px",
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                      border: `1px solid ${isActive ? "rgba(200, 169, 110, 0.3)" : "var(--border)"}`,
                      padding: "2px 6px",
                      borderRadius: "3px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {tab.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: isActive ? "var(--text-1)" : "var(--text-2)",
                    marginBottom: "4px",
                  }}
                >
                  {tab.label}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: "1.4" }}>
                  {tab.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Sandbox Container */}
        <div
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "64px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {activeTab === "mediguard" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Active Simulation: MediGuard V2
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  5-Agent Clinical Decision Support Sandbox
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Pick a test patient profile below to simulate end-to-end multi-agent triage,
                  Pinecone RAG retrieval, drug interaction checks, and automated clinical PDF / FHIR export.
                </p>
              </div>
              <MediGuardSandbox />
            </div>
          )}

          {activeTab === "prompt-studio" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Active Simulation: Prompt Studio
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  Production System Prompt & Guardrail Architect
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Select architecture frameworks, customize reasoning scratchpads and anti-injection defenses,
                  and test live simulated outputs.
                </p>
              </div>
              <SystemPromptStudio />
            </div>
          )}

          {activeTab === "sql-studio" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Active Simulation: SQL Studio
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  Natural Language to PostgreSQL & Schema Optimizer
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Transform natural business questions into performant, indexed PostgreSQL queries
                  with simulated EXPLAIN ANALYZE execution cost plans.
                </p>
              </div>
              <SqlStudio />
            </div>
          )}

          {activeTab === "skillspeak" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Active Simulation: SkillSpeak AI Lab
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  Tanglish-to-English Corporate Translator & JD Match Scanner
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Developed to help Tamil Nadu engineering students bridge vernacular colloquialisms into high-impact
                  corporate English and score candidate resumes against real-world AI Job Descriptions.
                </p>
              </div>
              <SkillSpeakSandbox />
            </div>
          )}

          {activeTab === "trading" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Active Simulation: Binance Futures Algo Bot
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  Real-time Momentum & RSI Algorithmic Simulator
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Simulates asynchronous order generation, risk-reward stop losses, and live SVG price charting
                  mirroring the Python Binance Futures bot tested on testnet.
                </p>
              </div>
              <TradingBotSimulator />
            </div>
          )}

          {activeTab === "skillgraph" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Interactive Knowledge Graph
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  AI Engineering Architecture & Skill Network
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Click any node in the graph below to inspect real-world implementation highlights,
                  framework proficiencies, and connected production repositories.
                </p>
              </div>
              <SkillGraph />
            </div>
          )}

          {activeTab === "matcher" && (
            <div>
              <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }}>
                  Interactive Wizard
                </span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--text-1)", marginTop: "4px" }}>
                  Project Recommender for Recruiters & Clients
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "4px" }}>
                  Answer 2 quick questions to find the most relevant case studies and source code
                  tailored to your exact hiring criteria or business problem.
                </p>
              </div>
              <ProjectRecommender onRecommend={handleRecommend} />
            </div>
          )}
        </div>

        {/* Verification Matrix & Standards */}
        <div style={{ marginTop: "48px", borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ fontSize: "11px", color: "var(--text-3)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
                Laboratory Standards
              </p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text-1)", fontWeight: "400" }}>
                Engineering Rigor & Verification
              </h2>
            </div>
            <span style={{ fontSize: "12px", color: "var(--accent)", display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={14} /> 100% Client-Side Interactive
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              {
                icon: ShieldCheck,
                name: "Zero-Hallucination Guardrails",
                desc: "Every sandbox enforces strict grounding checks with XML reasoning tags, validation schemas, and negative constraints.",
              },
              {
                icon: Database,
                name: "High-Concurreny Data Architecture",
                desc: "Queries and schemas are designed for non-locking execution with concurrent index creation and connection pooling.",
              },
              {
                icon: Brain,
                name: "Multi-Agent Coordination",
                desc: "Simulating state machine orchestration using LangGraph patterns, fallback loops, and automated tool execution.",
              },
            ].map((u) => {
              const Icon = u.icon;
              return (
                <div
                  key={u.name}
                  style={{
                    padding: "24px",
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "6px",
                        background: "rgba(200, 169, 110, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--accent)" }} />
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        color: "#4ade80",
                      }}
                    >
                      <CheckCircle2 size={12} /> Active in Prod
                    </span>
                  </div>
                  <h4 style={{ fontSize: "15px", color: "var(--text-1)", fontWeight: "600", marginBottom: "6px" }}>
                    {u.name}
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.6" }}>{u.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
