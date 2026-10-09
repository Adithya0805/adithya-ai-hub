import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Rocket,
  Code2,
  Coffee,
  Sparkles,
  ArrowRight,
  FileDown,
  MessageCircle,
  Calendar,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

export type VisitorPersona = "recruiter" | "founder" | "engineer" | "curious" | null;

interface PersonaOption {
  id: VisitorPersona;
  title: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  desc: string;
  actionText: string;
  actionHref: string;
  secondaryActionText: string;
  secondaryActionHref: string;
  isExternal?: boolean;
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    id: "recruiter",
    title: "Recruiter / Hiring Manager",
    badge: "HIRING TALENT",
    icon: Briefcase,
    desc: "Evaluating engineering proficiency, multi-agent systems, and production full-stack capabilities.",
    actionText: "View Resume & Credentials",
    actionHref: "/resume",
    secondaryActionText: "Direct WhatsApp",
    secondaryActionHref: "https://wa.me/918438558117?text=Hi%20Adithya,%20I%20am%20reviewing%20your%20profile%20for%20an%20engineering%20role.",
    isExternal: true,
  },
  {
    id: "founder",
    title: "Founder / Business Client",
    badge: "BUILDING PRODUCTION AI",
    icon: Rocket,
    desc: "Looking to deploy custom AI agents, automate workflows, or launch an enterprise platform.",
    actionText: "Explore AI Services",
    actionHref: "/services",
    secondaryActionText: "Aranya Dairy Case Study",
    secondaryActionHref: "/work",
  },
  {
    id: "engineer",
    title: "Engineer / Fellow Builder",
    badge: "TECH ARCHITECTURE",
    icon: Code2,
    desc: "Diving into LangGraph agent graphs, Pinecone RAG pipelines, and open-source implementations.",
    actionText: "Enter AI Labs Playground",
    actionHref: "/tools",
    secondaryActionText: "GitHub Profile",
    secondaryActionHref: "https://github.com/Adithya0805",
    isExternal: true,
  },
  {
    id: "curious",
    title: "Curious Explorer",
    badge: "GENERAL DISCOVERY",
    icon: Coffee,
    desc: "Discovering Adithya's story, technical tutorials, and creative engineering projects.",
    actionText: "Read Personal Journey",
    actionHref: "/about",
    secondaryActionText: "Explore Technical Blog",
    secondaryActionHref: "/blog",
  },
];

export function VisitorConcierge() {
  const [activePersona, setActivePersona] = useState<VisitorPersona>(null);
  const [greeting, setGreeting] = useState("Welcome");
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Dynamic greeting based on visitor's local hour
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Load saved persona from localStorage
    const saved = localStorage.getItem("adithya_visitor_persona") as VisitorPersona;
    if (saved && PERSONA_OPTIONS.some((p) => p.id === saved)) {
      setActivePersona(saved);
    }
  }, []);

  const selectPersona = (persona: VisitorPersona) => {
    setActivePersona(persona);
    setIsChanging(false);
    if (persona) {
      localStorage.setItem("adithya_visitor_persona", persona);
      window.dispatchEvent(new CustomEvent("adithya-persona-changed", { detail: persona }));
    }
  };

  const resetPersona = () => {
    setIsChanging(true);
  };

  const activeOption = PERSONA_OPTIONS.find((p) => p.id === activePersona);

  return (
    <div
      style={{
        margin: "24px 0 36px",
        padding: "20px 24px",
        background: "rgba(200, 169, 110, 0.04)",
        border: "1px solid rgba(200, 169, 110, 0.22)",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        position: "relative",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top Greeting Line */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={16} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
            {greeting} — <span style={{ color: "var(--accent)" }}>Welcome to my personal digital workshop.</span>
          </span>
        </div>

        {activePersona && !isChanging && (
          <button
            type="button"
            onClick={resetPersona}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "transparent",
              border: "none",
              color: "var(--text-3)",
              fontSize: "11px",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            className="hover:text-amber-300"
          >
            <RotateCcw size={12} /> Switch visitor role
          </button>
        )}
      </div>

      {/* When NO persona is chosen or user wants to switch */}
      {(!activePersona || isChanging) && (
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: "12px" }}>
            How can I best tailor your experience today? Tap your goal below:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "10px",
            }}
          >
            {PERSONA_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectPersona(option.id)}
                  style={{
                    padding: "12px 14px",
                    background: "rgba(10, 10, 12, 0.75)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    transition: "all 0.2s ease",
                  }}
                  className="hover:border-amber-400 hover:bg-black/60 group"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon size={14} style={{ color: "var(--accent)" }} />
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-1)" }}>
                        {option.title}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "var(--text-3)", lineHeight: "1.4" }}>
                    {option.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* When Persona is active */}
      {activePersona && !isChanging && activeOption && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              paddingTop: "6px",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "1px",
                    fontFamily: "var(--font-mono)",
                    background: "rgba(200, 169, 110, 0.2)",
                    color: "var(--accent)",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontWeight: "700",
                  }}
                >
                  {activeOption.badge}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)" }}>
                  Tailored view active for: {activeOption.title}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-2)", lineHeight: "1.5" }}>
                {activeOption.desc}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <Link
                to={activeOption.actionHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                <span>{activeOption.actionText}</span>
                <ArrowRight size={13} />
              </Link>

              {activeOption.isExternal ? (
                <a
                  href={activeOption.secondaryActionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--text-2)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  className="hover:text-white hover:border-white/30"
                >
                  <span>{activeOption.secondaryActionText}</span>
                </a>
              ) : (
                <Link
                  to={activeOption.secondaryActionHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--text-2)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  className="hover:text-white hover:border-white/30"
                >
                  <span>{activeOption.secondaryActionText}</span>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
