import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { projects, Project } from "@/data/projects";
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { TRANSITION_EASE } from "@/lib/motion";

interface ProjectBrand {
  barColor: string;
  badgeBg: string;
  badgeColor: string;
  stageTag: string;
  previewType?: "browser-aranya" | "phone-travel" | "phone-leather" | "system-cdss" | "system-townrise";
}

const projectBrands: Record<string, ProjectBrand> = {
  "aranya-organic-dairy": {
    barColor: "#2D5A27",
    badgeBg: "rgba(45, 90, 39, 0.08)",
    badgeColor: "#1E3A1A",
    stageTag: "Client Deployment · Vedic Dairy E-Commerce",
    previewType: "browser-aranya",
  },
  "sr-travels": {
    barColor: "#0A192F",
    badgeBg: "rgba(10, 25, 47, 0.08)",
    badgeColor: "#0A192F",
    stageTag: "Client Deployment · Travel & Fleet Dispatch",
    previewType: "phone-travel",
  },
  "dino-leathers": {
    barColor: "#6E3416",
    badgeBg: "rgba(110, 52, 22, 0.08)",
    badgeColor: "#5C2C16",
    stageTag: "Client Deployment · Artisanal D2C Catalog",
    previewType: "phone-leather",
  },
  "mediaguard": {
    barColor: "#0F172A",
    badgeBg: "rgba(15, 23, 42, 0.08)",
    badgeColor: "#0F172A",
    stageTag: "Production CDSS · Multi-Agent Healthcare AI",
    previewType: "system-cdss",
  },
  "townrise-intelligence": {
    barColor: "#1E1B4B",
    badgeBg: "rgba(30, 27, 75, 0.08)",
    badgeColor: "#1E1B4B",
    stageTag: "Flagship AI Engine · Under Work Process",
    previewType: "system-townrise",
  },
  "townrise-ai": {
    barColor: "#1E1B4B",
    badgeBg: "rgba(30, 27, 75, 0.08)",
    badgeColor: "#1E1B4B",
    stageTag: "Flagship AI Engine · Under Work Process",
    previewType: "system-townrise",
  },
  "job-mail-ai-agent": {
    barColor: "#18181B",
    badgeBg: "rgba(24, 24, 27, 0.08)",
    badgeColor: "#18181B",
    stageTag: "Workflow Automation · Contextual Recruiter Outreach",
  },
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const targetProject = projects.find((p) => p.slug === id);
      if (targetProject) {
        setFilter("All");
      }
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  }, [location.hash]);

  const categories = [
    "All",
    "Flagship",
    "Full-Stack AI",
    "AI Systems",
    "Automation",
    "Data Analytics",
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Flagship") return p.flagship;
    return p.category === filter;
  });

  return (
    <Layout>
      <Helmet>
        <title>Selected Work · Web Platforms & AI Systems | Adithya Kuppusamy</title>
        <meta
          name="description"
          content="Curated portfolio of production web platforms and AI systems built by Adithya Kuppusamy: Aranya Organic Dairy Farm, SR Travels, Dino Leathers, MediGuard CDSS, and TownRise AI."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/work" />
        <meta property="og:title" content="Selected Work · Web Platforms & AI Systems | Adithya Kuppusamy" />
        <meta
          property="og:description"
          content="Explore production websites, WhatsApp automations, and AI systems shipped for real commercial businesses."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/work" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Editorial Page Header */}
        <header
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "80px 24px 48px",
            borderBottom: "1px solid var(--border)",
          }}
        >
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
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#059669",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#151515",
                fontFamily: "var(--font-mono)",
              }}
            >
              Selected Work · 2024–2026
            </span>
          </div>

          <div
            className="projects-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 6vw, 76px)",
                fontWeight: "400",
                color: "#151515",
                lineHeight: "1.02",
                letterSpacing: "-2px",
                maxWidth: "680px",
              }}
            >
              Websites and AI systems built for{" "}
              <span style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "var(--border)", textUnderlineOffset: "6px" }}>
                real operations.
              </span>
            </h1>

            <div
              className="projects-stats"
              style={{
                display: "flex",
                gap: "36px",
                paddingBottom: "8px",
              }}
            >
              {[
                { number: "3", label: "Live Client Sites" },
                { number: "6+", label: "AI Systems Built" },
                { number: "100%", label: "Real Deployments" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "36px",
                      fontWeight: "400",
                      color: "#151515",
                      lineHeight: "1",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.number}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-3)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Filter Tabs */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {categories.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  style={{
                    padding: "7px 18px",
                    fontSize: "13px",
                    fontWeight: active ? "600" : "500",
                    borderRadius: "100px",
                    border: `1px solid ${active ? "#151515" : "var(--border)"}`,
                    backgroundColor: active ? "#151515" : "#FFFFFF",
                    color: active ? "#F7F3EC" : "var(--text-2)",
                    cursor: "pointer",
                    boxShadow: active
                      ? "0 2px 8px rgba(21, 21, 21, 0.12)"
                      : "0 1px 3px rgba(21, 21, 21, 0.03)",
                    transition: "all 0.18s ease",
                  }}
                >
                  {c}
                </button>
              );
            })}
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
              }}
            >
              Showing {filteredProjects.length} projects
            </span>
          </div>
        </div>

        {/* Projects Showcase */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {filteredProjects.map((p, index) => {
              const isFlagship = p.flagship;
              const brand = projectBrands[p.slug] || {
                barColor: "#151515",
                badgeBg: "rgba(21, 21, 21, 0.06)",
                badgeColor: "#151515",
                stageTag: p.category,
              };

              return (
                <div
                  key={p.slug}
                  id={p.slug}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: isFlagship ? "44px 36px" : "32px 28px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 2px 14px rgba(21, 21, 21, 0.04)",
                  }}
                >
                  {/* Project Brand Accent Line at top of card */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      backgroundColor: brand.barColor,
                    }}
                  />

                  <div
                    className="flagship-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: isFlagship ? "1.15fr 0.85fr" : "1fr",
                      gap: "36px",
                      alignItems: "start",
                    }}
                  >
                    {/* Left Column: Description & Metadata */}
                    <div>
                      {/* Top Badges Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--font-mono)",
                            color: "var(--text-3)",
                            fontWeight: "600",
                          }}
                        >
                          0{index + 1}
                        </span>

                        {isFlagship && (
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontWeight: "700",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              color: "#151515",
                              backgroundColor: "#FAF7F2",
                              border: "1px solid var(--border)",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            ★ Flagship
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: brand.badgeColor,
                            backgroundColor: brand.badgeBg,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            letterSpacing: "0.5px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {brand.stageTag}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: isFlagship ? "clamp(28px, 4vw, 42px)" : "26px",
                          fontWeight: "400",
                          color: "#151515",
                          letterSpacing: "-0.8px",
                          lineHeight: "1.12",
                          marginBottom: "10px",
                        }}
                      >
                        {p.title}
                      </h2>

                      {/* Tagline */}
                      <p
                        style={{
                          fontSize: "15px",
                          color: "#555048",
                          marginBottom: "24px",
                          fontWeight: "500",
                          lineHeight: "1.5",
                        }}
                      >
                        {p.tagline}
                      </p>

                      {/* Problem Statement */}
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "var(--text-3)",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            marginBottom: "6px",
                            fontFamily: "var(--font-mono)",
                            fontWeight: "600",
                          }}
                        >
                          The Problem
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#3A3630",
                            lineHeight: "1.7",
                          }}
                        >
                          {p.problem}
                        </p>
                      </div>

                      {/* Engineering Solution */}
                      <div style={{ marginBottom: "24px" }}>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "var(--text-3)",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            marginBottom: "6px",
                            fontFamily: "var(--font-mono)",
                            fontWeight: "600",
                          }}
                        >
                          Engineering Solution
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#3A3630",
                            lineHeight: "1.7",
                          }}
                        >
                          {p.solution}
                        </p>
                      </div>

                      {/* Tech Stack Badges */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginBottom: "28px",
                        }}
                      >
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              color: "#4A453E",
                              border: "1px solid var(--border)",
                              padding: "4px 9px",
                              borderRadius: "4px",
                              backgroundColor: "#FAF7F2",
                              fontWeight: "500",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ink"
                            style={{
                              padding: "10px 20px",
                              fontSize: "13.5px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span>Live Production</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}

                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "10px 18px",
                              border: "1px solid var(--border)",
                              color: "#151515",
                              backgroundColor: "#FFFFFF",
                              borderRadius: "6px",
                              fontSize: "13px",
                              fontWeight: "500",
                              textDecoration: "none",
                              transition: "background-color 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#FAF7F2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "#FFFFFF")
                            }
                          >
                            <Github size={14} />
                            <span>Source Code</span>
                          </a>
                        )}

                        {p.slug === "aranya-organic-dairy" && (
                          <Link
                            to="/blog/building-and-deploying-aranya-organic-dairy-farm-live-ai-engineer-guide"
                            style={{
                              fontSize: "13px",
                              color: "#151515",
                              fontWeight: "600",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            Read Architecture Case Study →
                          </Link>
                        )}

                        {p.slug === "mediaguard" && (
                          <Link
                            to="/blog/how-i-built-mediaguard-multi-agent-ai-system"
                            style={{
                              fontSize: "13px",
                              color: "#151515",
                              fontWeight: "600",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            Read Case Study →
                          </Link>
                        )}

                        {(p.slug === "townrise-intelligence" || p.slug === "townrise-ai") && (
                          <a
                            href="https://github.com/Adithya0805/townrise-intelligence"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "13px",
                              color: "#151515",
                              fontWeight: "600",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            View Active Development Repo →
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Brand Colour Stage & Measurable Impact */}
                    {isFlagship && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "18px",
                        }}
                      >
                        {/* Colour Stage Visual Preview */}
                        {brand.previewType === "browser-aranya" && (
                          <div
                            style={{
                              backgroundColor: "#1E3A1A",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(200, 169, 110, 0.3)",
                              boxShadow: "0 8px 24px rgba(30, 58, 26, 0.2)",
                              color: "#FAF7F2",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 14px",
                                backgroundColor: "#152912",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <div style={{ display: "flex", gap: "4px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
                              </div>
                              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)" }}>
                                🔒 aranyaorganicdairyfarm.com
                              </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                              <p style={{ fontSize: "10px", color: "#C8A96E", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>
                                Vedic Native Gir Cows · Shoolagiri
                              </p>
                              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#FFFFFF", marginBottom: "8px" }}>
                                Aranya Organic Dairy
                              </h3>
                              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineHeight: "1.5", marginBottom: "14px" }}>
                                32-Product Vedic e-commerce catalog, direct WhatsApp cart routing, and integrated Ask Farm AI bilingual assistant.
                              </p>
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                <span style={{ fontSize: "10.5px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "rgba(200, 169, 110, 0.2)", color: "#FFE4A0" }}>
                                  A2 Milk & Bilona Ghee
                                </span>
                                <span style={{ fontSize: "10.5px", padding: "2px 8px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}>
                                  ● Ask Farm AI Active
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {brand.previewType === "phone-travel" && (
                          <div
                            style={{
                              backgroundColor: "#0A192F",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(212, 175, 55, 0.3)",
                              boxShadow: "0 8px 24px rgba(10, 25, 47, 0.2)",
                              color: "#FAF7F2",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 14px",
                                backgroundColor: "#060F1E",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontSize: "11px", color: "#D4AF37", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                                SR TRAVELS
                              </span>
                              <span style={{ fontSize: "10.5px", color: "#10B981", fontFamily: "var(--font-mono)" }}>
                                ● Live Fleet Dispatch
                              </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                                Chennai — Bangalore Outstation Route
                              </p>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                                <span style={{ fontFamily: "var(--font-serif)", fontSize: "20px", color: "#FFFFFF" }}>
                                  Dynamic Fuel Fare
                                </span>
                                <span style={{ fontSize: "18px", fontWeight: "700", color: "#D4AF37", fontFamily: "var(--font-mono)" }}>
                                  ₹3,450
                                </span>
                              </div>
                              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5", marginBottom: "14px" }}>
                                Automated driver bata rules, vehicle comparison, and instant WhatsApp booking confirmation.
                              </p>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#25D366", color: "#052e16", padding: "6px 12px", borderRadius: "6px", fontSize: "11.5px", fontWeight: "700" }}>
                                <span>Instant WhatsApp Booking</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {brand.previewType === "phone-leather" && (
                          <div
                            style={{
                              backgroundColor: "#3A1D10",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(212, 175, 55, 0.3)",
                              boxShadow: "0 8px 24px rgba(58, 29, 16, 0.2)",
                              color: "#FAF7F2",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 14px",
                                backgroundColor: "#27130A",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontSize: "11px", color: "#D4AF37", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                                DINO LEATHERS
                              </span>
                              <span style={{ fontSize: "10.5px", color: "#E0CCA8", fontFamily: "var(--font-mono)" }}>
                                Ambur Artisanal Goods
                              </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                              <p style={{ fontSize: "10px", color: "#D4AF37", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                Full-Grain Pull-Up Leather
                              </p>
                              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", color: "#FFFFFF", marginBottom: "6px" }}>
                                Classic Bifold Wallet
                              </h3>
                              <p style={{ fontSize: "16px", fontWeight: "700", color: "#F7F3EC", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>
                                ₹1,299 <span style={{ fontSize: "11px", fontWeight: "400", color: "#C4B29E" }}>Direct Workshop Pricing</span>
                              </p>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#25D366", color: "#052e16", padding: "6px 12px", borderRadius: "6px", fontSize: "11.5px", fontWeight: "700" }}>
                                <span>1-Click WhatsApp Order</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {brand.previewType === "system-cdss" && (
                          <div
                            style={{
                              backgroundColor: "#0F172A",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(16, 185, 129, 0.3)",
                              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
                              color: "#FAF7F2",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 14px",
                                backgroundColor: "#090D18",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontSize: "11px", color: "#10B981", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                                MEDIGUARD CDSS
                              </span>
                              <span style={{ fontSize: "10.5px", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                                5-Agent Supervisor
                              </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                              <p style={{ fontSize: "10px", color: "#38BDF8", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                                LangGraph Stateful Execution
                              </p>
                              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", color: "#FFFFFF", marginBottom: "8px" }}>
                                Multi-Agent Clinical CDSS
                              </h3>
                              <p style={{ fontSize: "12px", color: "#CBD5E1", lineHeight: "1.5", marginBottom: "12px" }}>
                                Intake → Differential Diagnosis over 50k+ papers → Drug Interaction Safety → HL7 FHIR Standard Export.
                              </p>
                              <span style={{ fontSize: "10.5px", padding: "3px 8px", borderRadius: "4px", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#6EE7B7", fontFamily: "var(--font-mono)" }}>
                                Execution: &lt;8s end-to-end
                              </span>
                            </div>
                          </div>
                        )}

                        {brand.previewType === "system-townrise" && (
                          <div
                            style={{
                              backgroundColor: "#0F1423",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(129, 140, 248, 0.3)",
                              boxShadow: "0 8px 24px rgba(15, 20, 35, 0.25)",
                              color: "#FAF7F2",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px 14px",
                                backgroundColor: "#090D18",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ fontSize: "11px", color: "#818CF8", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                                TOWNRISE INTELLIGENCE
                              </span>
                              <span style={{ fontSize: "10.5px", color: "#FBBF24", fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FBBF24" }} />
                                Under Work Process / Active R&amp;D
                              </span>
                            </div>
                            <div style={{ padding: "20px" }}>
                              <p style={{ fontSize: "10px", color: "#A5B4FC", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                                Autonomous Geospatial Engine
                              </p>
                              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", color: "#FFFFFF", marginBottom: "8px" }}>
                                TownRise Spatial Intelligence Core
                              </h3>
                              <p style={{ fontSize: "12px", color: "#CBD5E1", lineHeight: "1.5", marginBottom: "14px" }}>
                                Multi-modal geospatial embeddings, commercial growth corridor modeling, and municipal intelligence pipeline across 50+ Tamil Nadu clusters.
                              </p>
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                                <span style={{ fontSize: "10.5px", padding: "3px 8px", borderRadius: "4px", backgroundColor: "rgba(245, 158, 11, 0.18)", color: "#FDE68A", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                                  Active Development Sprint
                                </span>
                                <a
                                  href="https://github.com/Adithya0805/townrise-intelligence"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: "10.5px",
                                    padding: "3px 8px",
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(129, 140, 248, 0.18)",
                                    color: "#C7D2FE",
                                    fontFamily: "var(--font-mono)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    textDecoration: "none",
                                  }}
                                >
                                  <span>View GitHub Repo</span>
                                  <ArrowUpRight size={11} />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Measurable Impact & Lessons Card */}
                        <div
                          style={{
                            backgroundColor: "#FAF7F2",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "22px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          {p.impact && (
                            <div>
                              <p
                                style={{
                                  fontSize: "11px",
                                  color: "#151515",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                  fontWeight: "700",
                                  marginBottom: "6px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                Measurable Impact
                              </p>
                              <p
                                style={{
                                  fontSize: "13.5px",
                                  color: "#2B2823",
                                  lineHeight: "1.65",
                                }}
                              >
                                {p.impact}
                              </p>
                            </div>
                          )}

                          {p.learned && (
                            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                              <p
                                style={{
                                  fontSize: "11px",
                                  color: "var(--text-3)",
                                  letterSpacing: "1px",
                                  textTransform: "uppercase",
                                  fontWeight: "700",
                                  marginBottom: "6px",
                                  fontFamily: "var(--font-mono)",
                                }}
                              >
                                Key Takeaways & Lessons
                              </p>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#555048",
                                  lineHeight: "1.65",
                                }}
                              >
                                {p.learned}
                              </p>
                            </div>
                          )}

                          {/* Sandbox Link */}
                          <div
                            style={{
                              borderTop: "1px solid var(--border)",
                              paddingTop: "12px",
                              marginTop: "auto",
                            }}
                          >
                            <Link
                              to="/tools"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "12.5px",
                                color: "#151515",
                                fontWeight: "600",
                                textDecoration: "none",
                              }}
                            >
                              <span>Explore interactive sandbox in AI Tools</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills Matrix Table */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 96px",
          }}
        >
          <div
            style={{
              paddingTop: "48px",
              marginBottom: "28px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: "8px",
                fontFamily: "var(--font-mono)",
                fontWeight: "600",
              }}
            >
              Capabilities & Stack
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: "400",
                color: "#151515",
                letterSpacing: "-0.5px",
              }}
            >
              Production Tech Stack
            </h2>
          </div>

          <div
            className="skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(21, 21, 21, 0.04)",
            }}
          >
            {[
              {
                category: "AI & ML",
                skills: [
                  "LangGraph",
                  "LangChain",
                  "RAG Systems",
                  "Pinecone",
                  "AWS Bedrock",
                  "Gemini API",
                ],
              },
              {
                category: "Backend",
                skills: [
                  "Python",
                  "FastAPI",
                  "Node.js",
                  "Supabase",
                  "Firebase",
                  "PostgreSQL",
                ],
              },
              {
                category: "Frontend",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vite",
                  "Recharts",
                ],
              },
              {
                category: "Cloud & DevOps",
                skills: [
                  "AWS EC2",
                  "Google Cloud Run",
                  "Vercel",
                  "Docker",
                  "GitHub Actions",
                  "Railway",
                ],
              },
            ].map((col, i) => (
              <div
                key={col.category}
                style={{
                  padding: "32px 24px",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#151515",
                    marginBottom: "20px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {col.category}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.skills.map((skill) => (
                    <li
                      key={skill}
                      style={{
                        fontSize: "13.5px",
                        color: "#3A3630",
                        padding: "8px 0",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{skill}</span>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#C8A96E",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}
