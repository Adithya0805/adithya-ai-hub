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
  Copy,
  Check,
  FileCode,
  FileText,
  Sliders,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Layers,
  Wand2,
} from "lucide-react";
import { ResumeDocument, ExperienceItem, ProjectItem, EducationItem, BulletInsertion } from "@/types/resume";

interface ResumeCanvasEditorProps {
  document: ResumeDocument;
  onChange: (doc: ResumeDocument) => void;
  missingKeywords: string[];
  matchedKeywords: string[];
  currentScore: number;
  onReScan?: () => void;
}

type CanvasTemplate = "harvard" | "modern" | "executive";

export function ResumeCanvasEditor({
  document: doc,
  onChange,
  missingKeywords = [],
  matchedKeywords = [],
  currentScore,
  onReScan,
}: ResumeCanvasEditorProps) {
  const [template, setTemplate] = useState<CanvasTemplate>("harvard");
  const [activeTab, setActiveTab] = useState<"canvas" | "keywords">("canvas");
  const [zoom, setZoom] = useState<number>(100);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [enhancedBulletFeedback, setEnhancedBulletFeedback] = useState<string | null>(null);
  const [injectedKeywordFeedback, setInjectedKeywordFeedback] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper updates
  const updateHeader = (field: string, val: any) => {
    onChange({
      ...doc,
      header: { ...doc.header, [field]: val },
    });
  };

  const updateSummary = (val: string) => {
    onChange({ ...doc, summary: val });
  };

  const updateSkillCategory = (category: keyof typeof doc.skills, newSkills: string[]) => {
    onChange({
      ...doc,
      skills: { ...doc.skills, [category]: newSkills },
    });
  };

  const addSkillPill = (category: keyof typeof doc.skills, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || doc.skills[category]?.includes(trimmed)) return;
    updateSkillCategory(category, [...(doc.skills[category] || []), trimmed]);
  };

  const removeSkillPill = (category: keyof typeof doc.skills, skillToRemove: string) => {
    updateSkillCategory(
      category,
      (doc.skills[category] || []).filter((s) => s !== skillToRemove)
    );
  };

  // Move section up/down
  const moveSection = (section: string, direction: "up" | "down") => {
    const idx = doc.sectionOrder.indexOf(section as any);
    if (idx === -1) return;
    const newOrder = [...doc.sectionOrder];
    if (direction === "up" && idx > 0) {
      const temp = newOrder[idx - 1];
      newOrder[idx - 1] = newOrder[idx];
      newOrder[idx] = temp;
    } else if (direction === "down" && idx < newOrder.length - 1) {
      const temp = newOrder[idx + 1];
      newOrder[idx + 1] = newOrder[idx];
      newOrder[idx] = temp;
    }
    onChange({ ...doc, sectionOrder: newOrder });
  };

  // Google XYZ bullet enhancer
  const enhanceBulletWithGoogleXYZ = (expId: string, bulletIdx: number, currentText: string) => {
    // Generate context-aware Google XYZ metric
    const xyzTemplates = [
      `Engineered and deployed ${currentText.toLowerCase().replace(/^(built|created|engineered|developed|handled)\s*/i, "")}, boosting throughput by 35% and slashing query latency by 42%.`,
      `Architected high-performance pipelines for ${currentText.toLowerCase().replace(/^(built|created|engineered|developed|handled)\s*/i, "")}, driving a 28% increase in operational efficiency.`,
      `Standardized ${currentText.toLowerCase().replace(/^(built|created|engineered|developed|handled)\s*/i, "")} adhering to production benchmarks, cutting downtime to sub-0.1%.`,
    ];
    const picked = xyzTemplates[bulletIdx % xyzTemplates.length];

    const updatedExp = doc.experience.map((exp) => {
      if (exp.id === expId) {
        const bullets = [...exp.bullets];
        bullets[bulletIdx] = picked;
        return { ...exp, bullets };
      }
      return exp;
    });

    onChange({ ...doc, experience: updatedExp });
    setEnhancedBulletFeedback(`${expId}-${bulletIdx}`);
    setTimeout(() => setEnhancedBulletFeedback(null), 2500);
  };

  // Inject missing JD keyword
  const injectMissingKeyword = (kw: string) => {
    // 1. Add to skills under tools or frameworks
    const targetCat = /python|sql|java|rust|go|c\+\+/i.test(kw) ? "languages" : "tools";
    if (!doc.skills[targetCat]?.includes(kw)) {
      addSkillPill(targetCat, kw);
    }

    // 2. Add high-impact bullet to first experience
    if (doc.experience.length > 0) {
      const firstExp = doc.experience[0];
      const newBullet = `Architected and integrated ${kw} into core pipelines, improving system reliability by 30% and accelerating production deployment velocity.`;
      const updated = doc.experience.map((exp, idx) =>
        idx === 0 ? { ...exp, bullets: [...exp.bullets, newBullet] } : exp
      );
      onChange({ ...doc, experience: updated });
    }

    setInjectedKeywordFeedback(kw);
    setTimeout(() => setInjectedKeywordFeedback(null), 2000);
  };

  // Print to Vector PDF via browser engine
  const handlePrint = () => {
    window.print();
  };

  // Download Plain Text
  const handleDownloadTxt = () => {
    const textLines = [
      doc.header.fullName.toUpperCase(),
      `${doc.header.jobTitle} | ${doc.header.location}`,
      `Email: ${doc.header.email} | Phone: ${doc.header.phone}`,
      doc.header.links.map((l) => `${l.label}: ${l.url}`).join(" | "),
      "\n" + "=".repeat(60),
      "PROFESSIONAL SUMMARY:",
      doc.summary,
      "\n" + "=".repeat(60),
      "TECHNICAL SKILLS:",
      `- Languages: ${doc.skills.languages.join(", ")}`,
      `- Frameworks: ${doc.skills.frameworks.join(", ")}`,
      `- Cloud & DevOps: ${doc.skills.cloudDevOps.join(", ")}`,
      `- Tools: ${doc.skills.tools.join(", ")}`,
      "\n" + "=".repeat(60),
      "EXPERIENCE:",
      ...doc.experience.flatMap((exp) => [
        `\n${exp.company} — ${exp.role} (${exp.startDate} - ${exp.endDate})`,
        ...exp.bullets.map((b) => `• ${b}`),
      ]),
      "\n" + "=".repeat(60),
      "PROJECTS:",
      ...doc.projects.flatMap((proj) => [
        `\n${proj.title} [${proj.techStack.join(", ")}]`,
        ...proj.bullets.map((b) => `• ${b}`),
      ]),
      "\n" + "=".repeat(60),
      "EDUCATION:",
      ...doc.education.map(
        (edu) => `${edu.degree} — ${edu.institution} (${edu.graduationYear}) [${edu.gpaOrScore || ""}]`
      ),
    ];

    const blob = new Blob([textLines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.header.fullName.replace(/\s+/g, "_")}_ATS_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download JSON schema backup
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.header.fullName.replace(/\s+/g, "_")}_Resume_Schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Styling based on template
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          headingColor: "#111827",
          accentColor: "#2563eb",
          bodyColor: "#374151",
          divider: "1.5px solid #e5e7eb",
          headingTransform: "uppercase" as const,
        };
      case "executive":
        return {
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          headingColor: "#0f172a",
          accentColor: "#0ea5e9",
          bodyColor: "#1e293b",
          divider: "2px solid #0f172a",
          headingTransform: "uppercase" as const,
        };
      case "harvard":
      default:
        return {
          fontFamily: "'Georgia', 'Times New Roman', serif",
          headingColor: "#000000",
          accentColor: "#000000",
          bodyColor: "#1a1a1a",
          divider: "1px solid #111111",
          headingTransform: "uppercase" as const,
        };
    }
  };

  const styles = getTemplateStyles();

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
          gap: "16px",
        }}
      >
        {/* Left: Template Switcher & Zoom */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block", marginBottom: "4px" }}>
              ATS Layout Template:
            </span>
            <div
              style={{
                display: "inline-flex",
                background: "var(--bg-2)",
                padding: "3px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
              }}
            >
              {[
                { id: "harvard", label: "Harvard Standard" },
                { id: "modern", label: "Modern Minimal" },
                { id: "executive", label: "Executive Clean" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id as CanvasTemplate)}
                  style={{
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: template === t.id ? "600" : "400",
                    color: template === t.id ? "var(--accent)" : "var(--text-2)",
                    background: template === t.id ? "var(--bg-0)" : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "11px", color: "var(--text-3)", display: "block", marginBottom: "4px" }}>
              Preview Zoom:
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {[85, 100, 115].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoom(z)}
                  style={{
                    padding: "3px 8px",
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

        {/* Right: Export & Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              padding: "8px 16px",
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
            Download ATS PDF
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            style={{
              padding: "8px 14px",
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
              padding: "8px 12px",
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
                padding: "8px 14px",
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
              Re-Scan Score ({currentScore})
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
            <span style={{ fontSize: "14px" }}>💡</span>
            <div>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "#f59e0b", margin: 0 }}>
                1-Click Keyword Injector:
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-2)", margin: "2px 0 0" }}>
                Click any missing skill to automatically embed it into your Skills and Experience sections:
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {missingKeywords.slice(0, 8).map((kw) => {
              const isAdded = doc.skills.tools.includes(kw) || doc.skills.languages.includes(kw);
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

      {/* ── THE A4 RESUME CANVAS ────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          padding: "16px 0 40px",
        }}
      >
        <div
          ref={canvasRef}
          id="resume-canvas-printable"
          style={{
            width: "210mm",
            minHeight: "297mm",
            background: "#ffffff",
            color: styles.bodyColor,
            fontFamily: styles.fontFamily,
            padding: "20mm 20mm 20mm 20mm",
            boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
            borderRadius: "4px",
            boxSizing: "border-box",
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
            lineHeight: "1.5",
          }}
        >
          {/* Print specific CSS injection */}
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
                padding: 12mm 15mm !important;
                transform: none !important;
                margin: 0 !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          {/* 1. HEADER SECTION */}
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <input
              type="text"
              value={doc.header.fullName}
              onChange={(e) => updateHeader("fullName", e.target.value)}
              placeholder="Candidate Full Name"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "700",
                color: styles.headingColor,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "inherit",
                letterSpacing: "0.5px",
                textTransform: styles.headingTransform,
              }}
            />

            <input
              type="text"
              value={doc.header.jobTitle}
              onChange={(e) => updateHeader("jobTitle", e.target.value)}
              placeholder="Professional Role / Headline"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
                color: styles.accentColor !== "#000000" ? styles.accentColor : "#444444",
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "inherit",
                marginTop: "4px",
              }}
            />

            {/* Contact metadata row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                fontSize: "11px",
                color: "#555555",
                marginTop: "6px",
              }}
            >
              <input
                type="text"
                value={doc.header.location}
                onChange={(e) => updateHeader("location", e.target.value)}
                placeholder="City, Country"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "11px",
                  textAlign: "center",
                  width: "120px",
                  color: "#555",
                  fontFamily: "inherit",
                }}
              />
              <span>•</span>
              <input
                type="text"
                value={doc.header.email}
                onChange={(e) => updateHeader("email", e.target.value)}
                placeholder="email@example.com"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "11px",
                  textAlign: "center",
                  width: "160px",
                  color: "#555",
                  fontFamily: "inherit",
                }}
              />
              <span>•</span>
              <input
                type="text"
                value={doc.header.phone}
                onChange={(e) => updateHeader("phone", e.target.value)}
                placeholder="+91 98765 43210"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "11px",
                  textAlign: "center",
                  width: "120px",
                  color: "#555",
                  fontFamily: "inherit",
                }}
              />
              {doc.header.links.map((link, lIdx) => (
                <span key={lIdx}>
                  <span>•</span>{" "}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* 2. DYNAMIC ORDERED SECTIONS */}
          {doc.sectionOrder.map((sectionName) => {
            switch (sectionName) {
              // ── SUMMARY SECTION ─────────────────────────────
              case "summary":
                return (
                  <div key="summary" style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "8px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Professional Summary
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => moveSection("summary", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("summary", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={doc.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                      rows={3}
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontSize: "11.5px",
                        lineHeight: "1.6",
                        color: styles.bodyColor,
                        fontFamily: "inherit",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                );

              // ── TECHNICAL SKILLS SECTION ────────────────────
              case "skills":
                return (
                  <div key="skills" style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "8px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Technical Skills
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => moveSection("skills", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("skills", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontSize: "11.5px" }}>
                      {[
                        { label: "Languages", cat: "languages" as const },
                        { label: "Frameworks & Libraries", cat: "frameworks" as const },
                        { label: "Cloud & DevOps", cat: "cloudDevOps" as const },
                        { label: "Tools & AI Core", cat: "tools" as const },
                      ].map(({ label, cat }) => (
                        <div key={cat} style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                          <span style={{ fontWeight: "700", minWidth: "145px", color: "#111" }}>
                            {label}:
                          </span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", flex: 1 }}>
                            {doc.skills[cat]?.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "3px",
                                  background: "#f3f4f6",
                                  padding: "1px 6px",
                                  borderRadius: "3px",
                                  fontSize: "11px",
                                }}
                              >
                                {skill}
                                <button
                                  type="button"
                                  className="no-print"
                                  onClick={() => removeSkillPill(cat, skill)}
                                  style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                    fontSize: "10px",
                                    color: "#9ca3af",
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {/* Inline quick skill adder */}
                            <input
                              type="text"
                              placeholder="+ add"
                              className="no-print"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value) {
                                  addSkillPill(cat, e.currentTarget.value);
                                  e.currentTarget.value = "";
                                }
                              }}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "11px",
                                width: "45px",
                                color: "#9ca3af",
                                outline: "none",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              // ── EXPERIENCE SECTION ──────────────────────────
              case "experience":
                return (
                  <div key="experience" style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "10px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Professional Experience
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={() => {
                            const newExp: ExperienceItem = {
                              id: `exp-${Date.now()}`,
                              company: "New Organization",
                              role: "Software / AI Developer",
                              location: "City, Country",
                              startDate: "2024",
                              endDate: "Present",
                              isCurrent: true,
                              bullets: [
                                "Architected scalable features utilizing modern frameworks, improving team velocity by 25%.",
                              ],
                            };
                            onChange({ ...doc, experience: [...doc.experience, newExp] });
                          }}
                          style={{
                            padding: "2px 6px",
                            fontSize: "11px",
                            background: "#f3f4f6",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <Plus size={11} /> Add Experience
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("experience", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("experience", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {doc.experience.map((exp) => (
                        <div key={exp.id}>
                          {/* Role Header Line */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              flexWrap: "wrap",
                            }}
                          >
                            <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = doc.experience.map((it) =>
                                    it.id === exp.id ? { ...it, role: e.target.value } : it
                                  );
                                  onChange({ ...doc, experience: updated });
                                }}
                                style={{
                                  fontWeight: "700",
                                  fontSize: "12px",
                                  color: "#111",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily: "inherit",
                                }}
                              />
                              <span style={{ fontSize: "11.5px", color: "#555" }}>—</span>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = doc.experience.map((it) =>
                                    it.id === exp.id ? { ...it, company: e.target.value } : it
                                  );
                                  onChange({ ...doc, experience: updated });
                                }}
                                style={{
                                  fontStyle: "italic",
                                  fontSize: "11.5px",
                                  color: "#333",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily: "inherit",
                                }}
                              />
                            </div>

                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <span style={{ fontSize: "11px", color: "#666" }}>
                                {exp.startDate} - {exp.endDate} | {exp.location}
                              </span>
                              <button
                                type="button"
                                className="no-print"
                                onClick={() => {
                                  onChange({
                                    ...doc,
                                    experience: doc.experience.filter((it) => it.id !== exp.id),
                                  });
                                }}
                                style={{
                                  border: "none",
                                  background: "none",
                                  cursor: "pointer",
                                  padding: "2px",
                                  color: "#ef4444",
                                }}
                                title="Remove entry"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>

                          {/* Bullets */}
                          <ul
                            style={{
                              margin: "4px 0 0 16px",
                              padding: 0,
                              fontSize: "11.5px",
                              lineHeight: "1.55",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                            }}
                          >
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} style={{ position: "relative" }}>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                                  <textarea
                                    value={b}
                                    onChange={(e) => {
                                      const updatedExp = doc.experience.map((it) => {
                                        if (it.id === exp.id) {
                                          const newBullets = [...it.bullets];
                                          newBullets[bIdx] = e.target.value;
                                          return { ...it, bullets: newBullets };
                                        }
                                        return it;
                                      });
                                      onChange({ ...doc, experience: updatedExp });
                                    }}
                                    rows={b.length > 100 ? 2 : 1}
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      outline: "none",
                                      background: "transparent",
                                      fontFamily: "inherit",
                                      fontSize: "11px",
                                      color: styles.bodyColor,
                                      resize: "none",
                                      lineHeight: "1.5",
                                      margin: 0,
                                      padding: 0,
                                    }}
                                  />

                                  {/* Google XYZ Enhancer Button */}
                                  <button
                                    type="button"
                                    className="no-print"
                                    onClick={() => enhanceBulletWithGoogleXYZ(exp.id, bIdx, b)}
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
                                    {enhancedBulletFeedback === `${exp.id}-${bIdx}` ? "Enhanced!" : "XYZ"}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              // ── PROJECTS SECTION ────────────────────────────
              case "projects":
                return (
                  <div key="projects" style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "10px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Key Engineering Projects
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={() => {
                            const newProj: ProjectItem = {
                              id: `proj-${Date.now()}`,
                              title: "New Flagship Project",
                              techStack: ["Python", "FastAPI", "React"],
                              bullets: [
                                "Built scalable multi-tenant architecture supporting 500+ active user sessions.",
                              ],
                            };
                            onChange({ ...doc, projects: [...doc.projects, newProj] });
                          }}
                          style={{
                            padding: "2px 6px",
                            fontSize: "11px",
                            background: "#f3f4f6",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <Plus size={11} /> Add Project
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("projects", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("projects", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {doc.projects.map((proj) => (
                        <div key={proj.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              flexWrap: "wrap",
                            }}
                          >
                            <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => {
                                  const updated = doc.projects.map((it) =>
                                    it.id === proj.id ? { ...it, title: e.target.value } : it
                                  );
                                  onChange({ ...doc, projects: updated });
                                }}
                                style={{
                                  fontWeight: "700",
                                  fontSize: "12px",
                                  color: "#111",
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  fontFamily: "inherit",
                                }}
                              />
                              <span style={{ fontSize: "11px", color: "#666" }}>
                                [{proj.techStack.join(", ")}]
                              </span>
                            </div>

                            <button
                              type="button"
                              className="no-print"
                              onClick={() => {
                                onChange({
                                  ...doc,
                                  projects: doc.projects.filter((it) => it.id !== proj.id),
                                });
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                padding: "2px",
                                color: "#ef4444",
                              }}
                              title="Remove project"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>

                          <ul
                            style={{
                              margin: "3px 0 0 16px",
                              padding: 0,
                              fontSize: "11px",
                              lineHeight: "1.55",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx}>
                                <input
                                  type="text"
                                  value={b}
                                  onChange={(e) => {
                                    const updatedProj = doc.projects.map((it) => {
                                      if (it.id === proj.id) {
                                        const newBullets = [...it.bullets];
                                        newBullets[bIdx] = e.target.value;
                                        return { ...it, bullets: newBullets };
                                      }
                                      return it;
                                    });
                                    onChange({ ...doc, projects: updatedProj });
                                  }}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily: "inherit",
                                    fontSize: "11px",
                                    color: styles.bodyColor,
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              // ── EDUCATION SECTION ───────────────────────────
              case "education":
                return (
                  <div key="education" style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "8px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Education
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => moveSection("education", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("education", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {doc.education.map((edu) => (
                        <div
                          key={edu.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            fontSize: "11.5px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: "700", color: "#111" }}>{edu.degree}</span>
                            <span style={{ color: "#555" }}> — {edu.institution}</span>
                          </div>
                          <div style={{ color: "#666", fontSize: "11px" }}>
                            {edu.gpaOrScore && <span style={{ fontWeight: "600" }}>{edu.gpaOrScore} | </span>}
                            <span>Graduation: {edu.graduationYear}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              // ── CERTIFICATIONS SECTION ──────────────────────
              case "certifications":
                return (
                  <div key="certifications" style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: styles.divider,
                        paddingBottom: "3px",
                        marginBottom: "6px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: styles.headingColor,
                          margin: 0,
                          textTransform: styles.headingTransform,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Certifications & Honors
                      </h2>
                      <div className="no-print" style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => moveSection("certifications", "up")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronUp size={13} color="#888" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection("certifications", "down")}
                          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px" }}
                        >
                          <ChevronDown size={13} color="#888" />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px" }}>
                      {doc.certifications.map((cert) => (
                        <div key={cert.id} style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>
                            • <strong>{cert.name}</strong> — {cert.issuer}
                          </span>
                          <span style={{ color: "#666" }}>{cert.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
