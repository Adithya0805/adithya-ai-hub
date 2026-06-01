import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Target,
  Star,
  Zap,
  Users,
  Brain,
  Sparkles,
  Shield,
  Activity,
  Layers,
  Lock,
  Server,
  AlertTriangle,
  FileText
} from "lucide-react";
import { MediGuardSandbox } from "./MediGuardSandbox";

const features = [
  "Stateful multi-agent system compiled via LangGraph StateGraph design patterns.",
  "Clinical Supervisor coordinates state evaluation, active session routing, and checklist audits.",
  "Symptom Agent checks severe 'Red Flags' (e.g. Hypoxia), triggering immediate Emergency Bypass.",
  "RAG Differential Diagnosis semantic RAG querying against 50,000+ indexed medical documents.",
  "Drug Specialist Agent validating allergy profiles and active drug-drug interaction warnings (Claude 3 Haiku).",
  "Dynamic filters on Next.js UI & backend ReportLab PDF to exclude blank vitals and N/A clutter.",
  "Edge Rewrite Proxy in Vercel.json to bypass local CORS limitations & ISP DNS overrides seamlessly.",
  "HL7 FHIR R4 standard document exports (Patient, Observation, AllergyIntolerance, Composition).",
  "High-fidelity printable visual PDF report output with ECG background grids and watermark styling.",
  "Full production monitoring telemetry with LangSmith distributed trace and structured JSON logging."
];

const techStack = [
  { layer: "Frontend UI", tech: "Next.js 14, React, Zustand, Vanilla CSS", purpose: "Gorgeous responsive dashboard with session persistence." },
  { layer: "Core API", tech: "FastAPI, Python 3.11, Uvicorn, Docker", purpose: "High-performance asynchronous endpoint routing." },
  { layer: "Agent Orchestrator", tech: "LangGraph, LangChain StateGraph", purpose: "State-machine graph and supervisor coordination routing." },
  { layer: "Reasoning Models", tech: "AWS Bedrock (Claude 3.5 Sonnet & Haiku)", purpose: "Secure, HIPAA-compliant diagnostic reasoning and parsing." },
  { layer: "Vector Index", tech: "Pinecone Cloud Vector DB", purpose: "Semantic clinical literature vector retrieval." },
  { layer: "Relational Storage", tech: "Supabase, PostgreSQL", purpose: "Relational audit, patient session, and credential tables." },
  { layer: "Auditing & Trace", tech: "LangSmith, Structlog", purpose: "End-to-end distributed trace and production JSON logging." }
];

const stack = ["LangGraph", "FastAPI", "Next.js 14", "AWS Bedrock", "Pinecone", "Supabase", "Vercel", "Railway"];

export function FlagshipProject() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <div className="relative rounded-3xl overflow-hidden border border-primary/40 shadow-[0_0_60px_rgba(6,182,212,0.2)] bg-card/10 select-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-float-blob" />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float-blob"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative p-8 md:p-12">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8 border-b border-border/40 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold tracking-wide">
                <Star className="w-3.5 h-3.5" />
                FLAGSHIP SYSTEM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                Production Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <Brain className="w-3.5 h-3.5" />
                Multi-Agent CDSS
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3 tracking-tight">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 border border-primary/30">
                <Shield className="w-6 h-6 text-primary" />
              </span>
              MediGuard V2
            </h2>
            
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Enterprise-grade Multi-Agent Clinical Decision Support System (CDSS) built from scratch. Evaluates patient vitals, performs Pinecone RAG semantic diagnosis lookup, cross-checks drug allergy hazards, and exports HL7 FHIR standard datasets.
            </p>
          </div>

          {/* Staging Links & CTAs */}
          <div className="flex flex-wrap gap-2.5 md:pt-4">
            <a
              href="https://mediguard-v2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-200 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]"
            >
              <ExternalLink className="w-4 h-4" />
              Clinical Web Portal
            </a>
            <a
              href="https://mediguard-v2-production.up.railway.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 text-xs font-semibold bg-secondary/30"
            >
              <FileText className="w-4 h-4" />
              Interactive API Docs
            </a>
            <a
              href="https://github.com/adithya-kuppusamy/mediguard-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 text-xs font-semibold bg-secondary/30"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/40 hover:border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              {showDemo ? "Hide Interactive Console" : "Explore Active Sandbox"}
            </button>
          </div>
        </div>

        {/* Main description grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          
          {/* Left Column: Problem + Solution */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-card/60 border border-border hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-2.5">
                <Target className="w-4 h-4 text-destructive" />
                <h3 className="text-xs font-bold font-mono text-destructive uppercase tracking-widest">The Clinical Problem</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Emergency room clinicians face severe information overload and time pressure. Standard diagnostic tools operate in isolated silos, fail to automatically detect dangerous active drug-to-allergy conflicts in real-time, and suffer from high network latency during triage workflows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card/60 border border-border hover:border-primary/20 transition-all">
              <div className="flex items-center gap-2 mb-2.5">
                <Brain className="w-4.5 h-4.5 text-primary" />
                <h3 className="text-xs font-bold font-mono text-primary uppercase tracking-widest">The Multi-Agent Solution</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                A stateful multi-agent system designed via LangGraph. An orchestrator supervises five specialized downstream agents: parsing inputs, evaluating severity and red-flags, running semantic RAG lookup over 50,000+ clinical guidelines (Pinecone), checking chemical contraindications, and exporting standard HL7 FHIR formats and visual PDFs.
              </p>
            </div>

            {/* General Stack Tag List */}
            <div>
              <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest mb-3">Enterprise Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Stepper features checklist */}
          <div className="p-5 rounded-2xl bg-secondary/15 border border-border/80">
            <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" />
              Advanced Orchestration Mechanics
            </h3>
            
            <ul className="space-y-3.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-muted-foreground group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary group-hover:bg-primary/25 transition-all">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Details Panel: Advanced Technology Stack Matrix */}
        <div className="mb-10 animate-fade-up">
          <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Server className="w-4 h-4 text-primary animate-pulse" />
            Enterprise Technology Architecture
          </h3>
          
          <div className="overflow-x-auto rounded-2xl border border-border bg-card/40">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-secondary/40 border-b border-border font-bold">
                  <th className="p-4 font-semibold text-foreground uppercase tracking-wider text-[10px]">Architecture Layer</th>
                  <th className="p-4 font-semibold text-foreground uppercase tracking-wider text-[10px]">Framework / Tooling</th>
                  <th className="p-4 font-semibold text-foreground uppercase tracking-wider text-[10px]">Core Operational Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {techStack.map((item, idx) => (
                  <tr key={idx} className="hover:bg-secondary/20 transition-all">
                    <td className="p-4 font-bold text-foreground font-mono">{item.layer}</td>
                    <td className="p-4 text-primary font-medium">{item.tech}</td>
                    <td className="p-4 text-muted-foreground leading-normal">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Disclaimer Box */}
        <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-4 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold font-mono text-amber-500 uppercase tracking-widest">
              IMPORTANT MEDICAL NOTICE & SAFETY DISCLAIMER
            </h4>
            <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
              MediGuard V2 is an artificial intelligence-powered clinical DECISION SUPPORT tool. It is designed for educational, research, and assistive support workflows only. It is not a substitute for professional clinical judgment, diagnosis, or treatment. All outputs, recommendations, drug interaction checks, and generated reports must be carefully reviewed and verified by a licensed, qualified physician before any clinical action is pursued.
            </p>
          </div>
        </div>

        {/* Expanded sandbox console tray */}
        {showDemo && <MediGuardSandbox />}
      </div>
    </div>
  );
}
