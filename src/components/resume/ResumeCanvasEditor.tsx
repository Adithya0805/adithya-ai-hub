import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Sparkles,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Printer,
  FileCode,
  FileText,
  RotateCcw,
  Check,
  Wand2,
  Sparkle,
} from "lucide-react";
import { ResumeDocument, ProjectItem, ExperienceItem, EducationItem, SkillCategory } from "@/types/resume";

interface ResumeCanvasEditorProps {
  document: ResumeDocument;
  onChange: (doc: ResumeDocument) => void;
  missingKeywords: string[];
  matchedKeywords: string[];
  currentScore: number;
  onReScan?: () => void;
}

export function ResumeCanvasEditor({
  document: doc,
  onChange,
  missingKeywords = [],
  matchedKeywords = [],
  currentScore,
  onReScan,
}: ResumeCanvasEditorProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [enhancedBulletFeedback, setEnhancedBulletFeedback] = useState<string | null>(null);
  const [injectedKeywordFeedback, setInjectedKeywordFeedback] = useState<string | null>(null);
  const [autoTailorDone, setAutoTailorDone] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper updates
  const updateHeader = (field: string, val: string) => {
    onChange({
      ...doc,
      header: { ...doc.header, [field]: val },
    });
  };

  const updateSummary = (val: string) => {
    onChange({ ...doc, summary: val });
  };

  // Skill category updates
  const updateSkillCategoryName = (catIdx: number, newName: string) => {
    const updated = [...doc.skillCategories];
    updated[catIdx].category = newName;
    onChange({ ...doc, skillCategories: updated });
  };

  const updateSkillCategoryItems = (catIdx: number, newSkillsStr: string) => {
    const updated = [...doc.skillCategories];
    updated[catIdx].skills = newSkillsStr
      .split(/[,|]/)
      .map((s) => s.trim())
      .filter(Boolean);
    onChange({ ...doc, skillCategories: updated });
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      category: "New Skill Competency",
      skills: ["Skill 1", "Skill 2"],
    };
    onChange({ ...doc, skillCategories: [...doc.skillCategories, newCat] });
  };

  const removeSkillCategory = (catIdx: number) => {
    const updated = doc.skillCategories.filter((_, idx) => idx !== catIdx);
    onChange({ ...doc, skillCategories: updated });
  };

  // Project updates
  const updateProjectField = (projId: string, field: keyof ProjectItem, val: any) => {
    const updated = doc.projects.map((p) => (p.id === projId ? { ...p, [field]: val } : p));
    onChange({ ...doc, projects: updated });
  };

  const updateProjectBullet = (projId: string, bulletIdx: number, val: string) => {
    const updated = doc.projects.map((p) => {
      if (p.id === projId) {
        const bullets = [...p.bullets];
        bullets[bulletIdx] = val;
        return { ...p, bullets };
      }
      return p;
    });
    onChange({ ...doc, projects: updated });
  };

  const addProjectBullet = (projId: string) => {
    const updated = doc.projects.map((p) => {
      if (p.id === projId) {
        return { ...p, bullets: [...p.bullets, "New high-impact accomplishment utilizing modern technical frameworks."] };
      }
      return p;
    });
    onChange({ ...doc, projects: updated });
  };

  const removeProjectBullet = (projId: string, bulletIdx: number) => {
    const updated = doc.projects.map((p) => {
      if (p.id === projId) {
        return { ...p, bullets: p.bullets.filter((_, idx) => idx !== bulletIdx) };
      }
      return p;
    });
    onChange({ ...doc, projects: updated });
  };

  // Google XYZ bullet enhancer
  const enhanceBulletWithGoogleXYZ = (projId: string, bulletIdx: number, currentText: string) => {
    const cleanAction = currentText.replace(/^[●•\-\*▪■]\s*/, "");
    const xyzVariations = [
      `Architected high-throughput pipelines for ${cleanAction.toLowerCase().replace(/^(built|created|engineered|developed|handled|designed)\s*/i, "")}, boosting query execution speed by 38% while maintaining 99.9% uptime.`,
      `Engineered and scaled ${cleanAction.toLowerCase().replace(/^(built|created|engineered|developed|handled|designed)\s*/i, "")}, driving a 42% reduction in latency and ensuring zero-regression delivery.`,
      `Standardized ${cleanAction.toLowerCase().replace(/^(built|created|engineered|developed|handled|designed)\s*/i, "")} adhering to MLOps benchmarks, accelerating production deployment cycle times by 30%.`,
    ];
    const picked = xyzVariations[bulletIdx % xyzVariations.length];

    updateProjectBullet(projId, bulletIdx, picked);
    setEnhancedBulletFeedback(`${projId}-${bulletIdx}`);
    setTimeout(() => setEnhancedBulletFeedback(null), 2500);
  };

  // 1-Click Keyword Injector: seamlessly injects into skills and project bullets
  const injectMissingKeyword = (kw: string) => {
    let targetCatIdx = -1;

    if (/llama|hugging|vertex|openai|claude|gemini|genai|llm/i.test(kw)) {
      targetCatIdx = doc.skillCategories.findIndex((c) => /ai|generative|framework/i.test(c.category));
    } else if (/snowflake|pinecone|faiss|chroma|rag|vector|data/i.test(kw)) {
      targetCatIdx = doc.skillCategories.findIndex((c) => /machine learning|data/i.test(c.category));
    } else if (/kubernetes|docker|cloud|aws|gcp|mlops|ci\/cd/i.test(kw)) {
      targetCatIdx = doc.skillCategories.findIndex((c) => /cloud|devops|automation/i.test(c.category));
    }

    if (targetCatIdx === -1 && doc.skillCategories.length > 0) targetCatIdx = 0;

    const updatedCategories = [...doc.skillCategories];
    if (targetCatIdx !== -1 && !updatedCategories[targetCatIdx].skills.includes(kw)) {
      updatedCategories[targetCatIdx].skills.push(kw);
    }

    // Also add to project bullets if relevant
    const updatedProjects = doc.projects.map((p, idx) => {
      if (idx === 0 && !p.bullets.some((b) => b.includes(kw))) {
        return {
          ...p,
          bullets: [
            ...p.bullets,
            `Integrated ${kw} to automate workflow execution, improving data pipeline throughput by 35% and enforcing compliance guardrails.`,
          ],
        };
      }
      return p;
    });

    onChange({
      ...doc,
      skillCategories: updatedCategories,
      projects: updatedProjects,
    });

    setInjectedKeywordFeedback(kw);
    setTimeout(() => setInjectedKeywordFeedback(null), 2000);
  };

  // Comprehensive Auto-Tailor for target JD
  const handleAutoTailorForJD = () => {
    const updatedCats = [...doc.skillCategories];

    // 1. Ensure LlamaIndex & Hugging Face are in AI Frameworks
    const aiCat = updatedCats.find((c) => /ai|generative/i.test(c.category));
    if (aiCat) {
      if (!aiCat.skills.includes("LlamaIndex")) aiCat.skills.push("LlamaIndex");
      if (!aiCat.skills.includes("Hugging Face")) aiCat.skills.push("Hugging Face");
      if (!aiCat.skills.includes("Vertex AI")) aiCat.skills.push("Vertex AI");
    }

    // 2. Ensure Snowflake & ChromaDB are in Data/ML
    const mlCat = updatedCats.find((c) => /machine learning|data/i.test(c.category));
    if (mlCat) {
      if (!mlCat.skills.includes("Snowflake")) mlCat.skills.push("Snowflake");
      if (!mlCat.skills.includes("ChromaDB")) mlCat.skills.push("ChromaDB");
      if (!mlCat.skills.includes("FAISS")) mlCat.skills.push("FAISS");
    }

    // 3. Ensure Kubernetes & MLOps are in Cloud/DevOps
    const cloudCat = updatedCats.find((c) => /cloud|devops/i.test(c.category));
    if (cloudCat) {
      if (!cloudCat.skills.includes("Kubernetes")) cloudCat.skills.push("Kubernetes");
      if (!cloudCat.skills.includes("MLOps & CI/CD")) cloudCat.skills.push("MLOps & CI/CD");
    }

    // 4. Strengthen project bullets
    const updatedProjects = doc.projects.map((p) => {
      if (p.title.includes("MediGuard")) {
        return {
          ...p,
          techStack: "Python, LangGraph, LlamaIndex, Pinecone, AWS Bedrock, FastAPI, Docker",
          bullets: [
            "Architected an autonomous multi-agent clinical decision support system utilizing LangGraph and LlamaIndex for complex medical guideline retrieval.",
            "Engineered a high-performance RAG pipeline mapped to Pinecone and FAISS vector databases, cutting response hallucinations by 48% with automated evaluation benchmarks.",
            "Deployed containerized FastAPI microservices to AWS with Docker and CI/CD pipelines, serving sub-200ms latency query streams to front-end clinicians.",
          ],
        };
      }
      if (p.title.includes("TownRise")) {
        return {
          ...p,
          techStack: "Next.js, TypeScript, Snowflake, PostgreSQL, Google Gemini API, Vercel",
          bullets: [
            "Architected a production real estate intelligence platform utilizing Snowflake and Supabase PostgreSQL for high-scale demographic and property data optimization.",
            "Integrated Google Gemini API to orchestrate contextual property valuation and financial trend analysis directly from custom database states.",
            "Designed and fully deployed live full-stack application on Vercel with automated GitHub Actions CI/CD and secure REST API endpoints.",
          ],
        };
      }
      return p;
    });

    onChange({
      ...doc,
      skillCategories: updatedCats,
      projects: updatedProjects,
    });

    setAutoTailorDone(true);
    setTimeout(() => setAutoTailorDone(false), 3000);
  };

  // Print to Vector PDF
  const handlePrint = () => {
    window.print();
  };

  // Download Plain Text
  const handleDownloadTxt = () => {
    const textLines = [
      doc.header.fullName.toUpperCase(),
      `📍 ${doc.header.location || "India"} | 📞 ${doc.header.phone || ""} | ✉️ ${doc.header.email || ""}`,
      `🔗 ${doc.header.linkedin || "LinkedIn"} | 💻 ${doc.header.github || "GitHub"}`,
      "\n" + "=".repeat(70),
      "PROFESSIONAL SUMMARY",
      doc.summary,
      "\n" + "=".repeat(70),
      "TECHNICAL SKILLS",
      ...doc.skillCategories.map((c) => `● ${c.category}: ${c.skills.join(", ")}`),
      "\n" + "=".repeat(70),
      "TECHNICAL PROJECTS",
      ...doc.projects.flatMap((p) => [
        `\n${p.title}`,
        p.techStack ? `● Tech Stack: ${p.techStack}` : "",
        ...p.bullets.map((b) => `● ${b}`),
      ]),
      ...(doc.experience.length > 0
        ? [
            "\n" + "=".repeat(70),
            "PROFESSIONAL EXPERIENCE",
            ...doc.experience.flatMap((e) => [
              `\n${e.role} — ${e.company} (${e.startDate} - ${e.endDate})`,
              ...e.bullets.map((b) => `● ${b}`),
            ]),
          ]
        : []),
      "\n" + "=".repeat(70),
      "EDUCATION",
      ...doc.education.map((edu) => `● ${edu.degree}\n  ${edu.institution} | ${edu.gpaOrScore || ""}`),
      "\n" + "=".repeat(70),
      "CERTIFICATIONS & TRAINING",
      ...doc.certifications.map((c) => `● ${c.title}${c.description ? ` – ${c.description}` : ""}`),
    ];

    const blob = new Blob([textLines.filter(Boolean).join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.header.fullName.replace(/\s+/g, "_")}_ATS_Tailored_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download JSON
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.header.fullName.replace(/\s+/g, "_")}_Resume_Schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ── TOP CONTROL TOOLBAR ────────────────────────────────────────────── */}
      <div
        className="no-print"
        style={{
          background: "var(--bg-1)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {/* Left: Quick Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleAutoTailorForJD}
            style={{
              padding: "9px 18px",
              background: autoTailorDone ? "rgba(74, 222, 128, 0.2)" : "rgba(200, 169, 110, 0.15)",
              color: autoTailorDone ? "#4ade80" : "var(--accent)",
              border: autoTailorDone ? "1px solid rgba(74, 222, 128, 0.4)" : "1px solid rgba(200, 169, 110, 0.35)",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            <Sparkles size={14} />
            {autoTailorDone ? "Target JD Skills Injected! ✓" : "1-Click Auto-Tailor for JD"}
          </button>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {[90, 100, 110].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoom(z)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    background: zoom === z ? "var(--accent)" : "var(--bg-2)",
                    color: zoom === z ? "#000" : "var(--text-2)",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {z}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Export & Re-Scan Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              padding: "9px 18px",
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(200, 169, 110, 0.25)",
            }}
          >
            <Printer size={15} />
            Download Vector PDF
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            style={{
              padding: "9px 14px",
              background: "var(--bg-2)",
              color: "var(--text-1)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FileText size={14} />
            Plain Text (.txt)
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            style={{
              padding: "9px 12px",
              background: "var(--bg-2)",
              color: "var(--text-2)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            title="Download JSON schema backup"
          >
            <FileCode size={13} />
            JSON
          </button>

          {onReScan && (
            <button
              type="button"
              onClick={onReScan}
              style={{
                padding: "9px 14px",
                background: "rgba(74, 222, 128, 0.15)",
                color: "#4ade80",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RotateCcw size={13} />
              Re-Scan Match Score
            </button>
          )}
        </div>
      </div>

      {/* ── MISSING KEYWORD QUICK INJECTOR BAR ───────────────────────────── */}
      {missingKeywords.length > 0 && (
        <div
          className="no-print"
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "10px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px" }}>🎯</span>
            <div>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#f59e0b", margin: 0 }}>
                Missing Job Keywords Detected:
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-2)", margin: "2px 0 0" }}>
                Click any skill to automatically integrate it into your skills and project bullets:
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {missingKeywords.slice(0, 10).map((kw) => {
              const isAdded = doc.skillCategories.some((c) => c.skills.includes(kw));
              return (
                <button
                  key={kw}
                  type="button"
                  onClick={() => injectMissingKeyword(kw)}
                  style={{
                    padding: "4px 10px",
                    background: isAdded ? "rgba(74, 222, 128, 0.15)" : "var(--bg-1)",
                    border: isAdded ? "1px solid rgba(74, 222, 128, 0.4)" : "1px solid rgba(245, 158, 11, 0.4)",
                    borderRadius: "4px",
                    color: isAdded ? "#4ade80" : "var(--text-1)",
                    fontSize: "12px",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "all 0.15s",
                  }}
                >
                  {isAdded ? <Check size={11} color="#4ade80" /> : <Plus size={11} color="#f59e0b" />}
                  {kw}
                  {injectedKeywordFeedback === kw && <span style={{ color: "#4ade80", fontSize: "10px" }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── THE EXACT HIGH-FIDELITY A4 CANVAS ───────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          padding: "10px 0 40px",
        }}
      >
        <div
          ref={canvasRef}
          id="resume-canvas-printable"
          style={{
            width: "210mm",
            minHeight: "297mm",
            background: "#ffffff",
            color: "#111111",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            padding: "16mm 20mm",
            boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
            borderRadius: "4px",
            boxSizing: "border-box",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
            lineHeight: "1.45",
          }}
        >
          {/* Print CSS injection */}
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #resume-canvas-printable, #resume-canvas-printable * {
                visibility: visible !important;
              }
              #resume-canvas-printable {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                min-height: 100% !important;
                box-shadow: none !important;
                padding: 12mm 16mm !important;
                transform: none !important;
                margin: 0 !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          {/* 1. HEADER */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <input
              type="text"
              value={doc.header.fullName}
              onChange={(e) => updateHeader("fullName", e.target.value)}
              placeholder="Candidate Full Name"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "700",
                color: "#000000",
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "inherit",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            />

            {/* Contact Row with Emojis */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: "#222222",
                marginBottom: "4px",
              }}
            >
              <span>📍</span>
              <input
                type="text"
                value={doc.header.location || "Ambur, Tamil Nadu, India"}
                onChange={(e) => updateHeader("location", e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "12px",
                  color: "#222",
                  fontFamily: "inherit",
                  width: "160px",
                  textAlign: "center",
                }}
              />
              <span>|</span>
              <span>📞</span>
              <input
                type="text"
                value={doc.header.phone || "+91 8825714576"}
                onChange={(e) => updateHeader("phone", e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "12px",
                  color: "#222",
                  fontFamily: "inherit",
                  width: "120px",
                  textAlign: "center",
                }}
              />
              <span>|</span>
              <span>✉️</span>
              <input
                type="text"
                value={doc.header.email || "adithyaadhi0805@gmail.com"}
                onChange={(e) => updateHeader("email", e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "12px",
                  color: "#222",
                  fontFamily: "inherit",
                  width: "190px",
                  textAlign: "center",
                }}
              />
            </div>

            {/* Links Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
                color: "#2563eb",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span>🔗</span>
                <input
                  type="text"
                  value={doc.header.linkedin || "LinkedIn"}
                  onChange={(e) => updateHeader("linkedin", e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "12px",
                    color: "#2563eb",
                    textDecoration: "underline",
                    fontFamily: "inherit",
                    width: "70px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                />
              </span>
              <span>|</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <span>💻</span>
                <input
                  type="text"
                  value={doc.header.github || "GitHub"}
                  onChange={(e) => updateHeader("github", e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "12px",
                    color: "#2563eb",
                    textDecoration: "underline",
                    fontFamily: "inherit",
                    width: "60px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
          </div>

          {/* 2. PROFESSIONAL SUMMARY */}
          <div style={{ marginBottom: "16px" }}>
            <h2
              style={{
                fontSize: "12.5px",
                fontWeight: "700",
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #222",
                paddingBottom: "2px",
                marginBottom: "8px",
              }}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <textarea
              value={doc.summary}
              onChange={(e) => updateSummary(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "11.5px",
                lineHeight: "1.55",
                color: "#222",
                fontFamily: "inherit",
                resize: "none",
                boxSizing: "border-box",
                padding: 0,
              }}
            />
          </div>

          {/* 3. TECHNICAL SKILLS */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #222",
                paddingBottom: "2px",
                marginBottom: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: 0,
                }}
              >
                TECHNICAL SKILLS
              </h2>
              <button
                type="button"
                className="no-print"
                onClick={addSkillCategory}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  padding: "1px 6px",
                  borderRadius: "3px",
                  fontSize: "10px",
                  cursor: "pointer",
                  color: "#444",
                }}
              >
                + Add Category
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11.5px" }}>
              {doc.skillCategories.map((cat, cIdx) => (
                <div key={cIdx} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "10px", color: "#111" }}>●</span>
                  <input
                    type="text"
                    value={cat.category + ":"}
                    onChange={(e) => updateSkillCategoryName(cIdx, e.target.value.replace(/:$/, ""))}
                    style={{
                      fontWeight: "700",
                      color: "#111",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "11.5px",
                      fontFamily: "inherit",
                      width: "auto",
                      minWidth: "150px",
                    }}
                  />
                  <input
                    type="text"
                    value={cat.skills.join(", ")}
                    onChange={(e) => updateSkillCategoryItems(cIdx, e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "11.5px",
                      color: "#222",
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    type="button"
                    className="no-print"
                    onClick={() => removeSkillCategory(cIdx)}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: "#9ca3af",
                      fontSize: "11px",
                    }}
                    title="Remove category"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4. TECHNICAL PROJECTS */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #222",
                paddingBottom: "2px",
                marginBottom: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: 0,
                }}
              >
                TECHNICAL PROJECTS
              </h2>
              <button
                type="button"
                className="no-print"
                onClick={() => {
                  const newProj: ProjectItem = {
                    id: `proj-${Date.now()}`,
                    title: "New Flagship Engineering Project",
                    techStack: "Python, FastAPI, AWS",
                    bullets: ["Architected scalable microservices processing concurrent data streams with sub-second latency."],
                  };
                  onChange({ ...doc, projects: [...doc.projects, newProj] });
                }}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  padding: "1px 6px",
                  borderRadius: "3px",
                  fontSize: "10px",
                  cursor: "pointer",
                  color: "#444",
                }}
              >
                + Add Project
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {doc.projects.map((proj) => (
                <div key={proj.id}>
                  {/* Title */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProjectField(proj.id, "title", e.target.value)}
                      style={{
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "#000",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontFamily: "inherit",
                        width: "100%",
                      }}
                    />
                    <button
                      type="button"
                      className="no-print"
                      onClick={() => {
                        onChange({ ...doc, projects: doc.projects.filter((p) => p.id !== proj.id) });
                      }}
                      style={{
                        border: "none",
                        background: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "11px",
                      }}
                      title="Remove project"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>

                  {/* Tech Stack */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "11.5px", marginTop: "1px" }}>
                    <span style={{ fontSize: "10px", color: "#111" }}>●</span>
                    <span style={{ fontWeight: "700", color: "#111", minWidth: "75px" }}>Tech Stack:</span>
                    <input
                      type="text"
                      value={typeof proj.techStack === "string" ? proj.techStack : (proj.techStack || []).join(", ")}
                      onChange={(e) => updateProjectField(proj.id, "techStack", e.target.value)}
                      placeholder="e.g. Python, LangGraph, Pinecone, FastAPI"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontSize: "11.5px",
                        color: "#222",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  {/* Bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "2px" }}>
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "11.5px" }}>
                        <span style={{ fontSize: "10px", color: "#111" }}>●</span>
                        <textarea
                          value={b}
                          onChange={(e) => updateProjectBullet(proj.id, bIdx, e.target.value)}
                          rows={b.length > 110 ? 2 : 1}
                          style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "11.5px",
                            lineHeight: "1.5",
                            color: "#222",
                            fontFamily: "inherit",
                            resize: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        />

                        {/* Google XYZ wand */}
                        <button
                          type="button"
                          className="no-print"
                          onClick={() => enhanceBulletWithGoogleXYZ(proj.id, bIdx, b)}
                          style={{
                            border: "none",
                            background: "rgba(200, 169, 110, 0.15)",
                            color: "var(--accent)",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            fontSize: "10px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                            whiteSpace: "nowrap",
                          }}
                          title="Enhance with Google XYZ Metric formula"
                        >
                          <Wand2 size={10} />
                          {enhancedBulletFeedback === `${proj.id}-${bIdx}` ? "Enhanced!" : "XYZ"}
                        </button>

                        <button
                          type="button"
                          className="no-print"
                          onClick={() => removeProjectBullet(proj.id, bIdx)}
                          style={{
                            border: "none",
                            background: "none",
                            color: "#9ca3af",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: "10px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <div className="no-print" style={{ marginTop: "2px" }}>
                      <button
                        type="button"
                        onClick={() => addProjectBullet(proj.id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "var(--accent)",
                          fontSize: "10px",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        + Add bullet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PROFESSIONAL EXPERIENCE (Rendered ONLY if candidate actually has experience) */}
          {doc.experience.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <h2
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  borderBottom: "1px solid #222",
                  paddingBottom: "2px",
                  marginBottom: "8px",
                }}
              >
                PROFESSIONAL EXPERIENCE
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {doc.experience.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <strong>{exp.role}</strong> — <em>{exp.company}</em>
                      </div>
                      <div style={{ fontSize: "11px", color: "#555" }}>
                        {exp.startDate} – {exp.endDate} | {exp.location}
                      </div>
                    </div>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "11.5px" }}>
                        <span style={{ fontSize: "10px" }}>●</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. EDUCATION */}
          <div style={{ marginBottom: "16px" }}>
            <h2
              style={{
                fontSize: "12.5px",
                fontWeight: "700",
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #222",
                paddingBottom: "2px",
                marginBottom: "8px",
              }}
            >
              EDUCATION
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px" }}>
              {doc.education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "10px", color: "#111" }}>●</span>
                    <span style={{ fontWeight: "700", color: "#111" }}>
                      {edu.degree} {edu.year ? `(${edu.year})` : ""}
                    </span>
                  </div>
                  <div style={{ paddingLeft: "14px", color: "#333", fontSize: "11.5px" }}>
                    {edu.institution} {edu.gpaOrScore ? `| ${edu.gpaOrScore}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. CERTIFICATIONS & TRAINING */}
          <div style={{ marginBottom: "12px" }}>
            <h2
              style={{
                fontSize: "12.5px",
                fontWeight: "700",
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: "1px solid #222",
                paddingBottom: "2px",
                marginBottom: "8px",
              }}
            >
              CERTIFICATIONS & TRAINING
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "11.5px" }}>
              {doc.certifications.map((cert) => (
                <div key={cert.id} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "10px", color: "#111" }}>●</span>
                  <div style={{ flex: 1, color: "#222" }}>
                    <strong>{cert.title || cert.name}</strong>
                    {cert.description && <span> – {cert.description}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
