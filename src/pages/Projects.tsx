import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { projects, Project } from "@/data/projects";
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Sparkles, Layers } from "lucide-react";

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

  const categories = ["All", "Flagship", "Full-Stack AI", "AI Systems", "Automation", "Data Analytics", "AI Applications"];

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Flagship") return p.flagship;
    return p.category === filter;
  });

  return (
    <Layout>
      <Helmet>
        <title>Selected Work · Production AI Systems | Adithya AI Hub</title>
        <meta
          name="description"
          content="Curated portfolio of production AI systems built by Adithya Kuppusamy: Aranya Organic Dairy Farm live e-commerce & RAG, MediGuard clinical decision support, TownRise AI, and more."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/projects" />
        <meta property="og:title" content="Selected Work · Production AI Systems | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Explore real AI systems shipped to production: Multi-agent clinical CDSS, Vedic dairy commerce RAG, and geospatial intelligence."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/projects" />
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
          padding: "80px 32px 56px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "20px",
          }}
        >
          Selected Work · 2024–2026
        </p>

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
              fontSize: "clamp(44px, 7vw, 84px)",
              fontWeight: "400",
              color: "var(--text-1)",
              lineHeight: "0.98",
              letterSpacing: "-2.5px",
              maxWidth: "650px",
            }}
          >
            Building AI that <span style={{ color: "var(--accent)", fontStyle: "italic" }}>solves real problems.</span>
          </h1>

          <div
            className="projects-stats"
            style={{
              display: "flex",
              gap: "40px",
              paddingBottom: "8px",
            }}
          >
            {[
              { number: "9+", label: "Systems Built" },
              { number: "3", label: "Live Client Platforms" },
              { number: "100%", label: "Real Deployments" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "36px",
                    fontWeight: "400",
                    color: "var(--text-1)",
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 32px 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              style={{
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: "500",
                borderRadius: "4px",
                border: `1px solid ${filter === c ? "var(--accent)" : "var(--border)"}`,
                backgroundColor: filter === c ? "rgba(200, 169, 110, 0.15)" : "var(--bg-1)",
                color: filter === c ? "var(--accent)" : "var(--text-2)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {c}
            </button>
          ))}
          <span style={{ fontSize: "12px", color: "var(--text-3)", marginLeft: "auto" }}>
            Showing {filteredProjects.length} projects
          </span>
        </div>
      </div>

      {/* Projects Showcase */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {filteredProjects.map((p, index) => {
            const isFlagship = p.flagship;
            return (
              <div
                key={p.slug}
                id={p.slug}
                style={{
                  background: isFlagship
                    ? "linear-gradient(135deg, #131313 0%, #0e1217 50%, #131313 100%)"
                    : "var(--bg-1)",
                  border: `1px solid ${isFlagship ? "rgba(200, 169, 110, 0.25)" : "var(--border)"}`,
                  borderRadius: "14px",
                  padding: isFlagship ? "48px 40px" : "36px 32px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isFlagship ? "0 12px 48px rgba(0,0,0,0.5)" : "none",
                }}
              >
                {/* Flagship accent line */}
                {isFlagship && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "5%",
                      right: "5%",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)",
                    }}
                  />
                )}

                <div
                  className="flagship-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isFlagship ? "1.2fr 1fr" : "1fr",
                    gap: "40px",
                    alignItems: "start",
                  }}
                >
                  {/* Left Column: Description & Metadata */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "var(--font-mono)",
                          color: "var(--text-3)",
                        }}
                      >
                        0{index + 1}
                      </span>
                      {isFlagship && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            background: "rgba(200, 169, 110, 0.1)",
                            border: "1px solid rgba(200, 169, 110, 0.3)",
                            padding: "2px 8px",
                            borderRadius: "3px",
                          }}
                        >
                          ★ Flagship Deployment
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--text-3)",
                          border: "1px solid var(--border)",
                          padding: "2px 8px",
                          borderRadius: "3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {p.category}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: isFlagship ? "clamp(30px, 4vw, 44px)" : "28px",
                        fontWeight: "400",
                        color: "var(--text-1)",
                        letterSpacing: "-0.5px",
                        lineHeight: "1.1",
                        marginBottom: "12px",
                      }}
                    >
                      {p.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--accent)",
                        marginBottom: "20px",
                        fontWeight: "500",
                      }}
                    >
                      {p.tagline}
                    </p>

                    <div style={{ marginBottom: "20px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                        The Problem
                      </p>
                      <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.7" }}>
                        {p.problem}
                      </p>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <p style={{ fontSize: "12px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                        Engineering Solution
                      </p>
                      <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: "1.7" }}>
                        {p.solution}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--text-3)",
                            border: "1px solid var(--border)",
                            padding: "3px 8px",
                            borderRadius: "3px",
                            backgroundColor: "rgba(255,255,255,0.02)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "10px 20px",
                            background: "var(--text-1)",
                            color: "var(--bg-0)",
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: "600",
                            textDecoration: "none",
                          }}
                        >
                          Live Production <ArrowUpRight size={14} />
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
                            color: "var(--text-1)",
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: "500",
                            textDecoration: "none",
                          }}
                        >
                          <Github size={14} /> Source Code
                        </a>
                      )}

                      {p.slug === "aranya-organic-dairy" && (
                        <Link
                          to="/blog/building-and-deploying-aranya-organic-dairy-farm-live-ai-engineer-guide"
                          style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
                        >
                          Read Architecture Case Study →
                        </Link>
                      )}

                      {p.slug === "mediaguard" && (
                        <Link
                          to="/blog/how-i-built-mediaguard-multi-agent-ai-system"
                          style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
                        >
                          Read Case Study →
                        </Link>
                      )}

                      {p.slug === "skillsspeak" && (
                        <Link
                          to="/blog/how-i-built-skillspeak-ai-career-platform-15-features"
                          style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
                        >
                          Read 15-Feature Breakdown →
                        </Link>
                      )}

                      {p.slug === "townrise-ai" && (
                        <Link
                          to="/blog/how-i-built-townrise-ai-real-estate-platform"
                          style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
                        >
                          Read Case Study →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Column (For Flagships & Detailed Impact) */}
                  {isFlagship && (
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        padding: "28px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      {p.impact && (
                        <div>
                          <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                            Measurable Impact
                          </p>
                          <p style={{ fontSize: "13px", color: "var(--text-1)", lineHeight: "1.7" }}>
                            {p.impact}
                          </p>
                        </div>
                      )}

                      {p.learned && (
                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                          <p style={{ fontSize: "11px", color: "var(--text-3)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                            Key Takeaways & Lessons
                          </p>
                          <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.7" }}>
                            {p.learned}
                          </p>
                        </div>
                      )}

                      {/* Interactive Sandbox Callout */}
                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                          paddingTop: "16px",
                          marginTop: "auto",
                        }}
                      >
                        <p style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: "8px" }}>
                          Want to test this live in your browser?
                        </p>
                        <Link
                          to="/tools"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            color: "var(--accent)",
                            fontWeight: "600",
                            textDecoration: "none",
                          }}
                        >
                          Launch in AI Tools Playground →
                        </Link>
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
          padding: "0 32px 96px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ paddingTop: "64px", marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", color: "var(--text-3)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
            Capabilities & Stack
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: "400", color: "var(--text-1)" }}>
            Production Tech Stack
          </h2>
        </div>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {[
            {
              category: "AI & ML",
              skills: ["LangGraph", "LangChain", "RAG Systems", "Pinecone", "AWS Bedrock", "Gemini API"],
            },
            {
              category: "Backend",
              skills: ["Python", "FastAPI", "Node.js", "Supabase", "Firebase", "PostgreSQL"],
            },
            {
              category: "Frontend",
              skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Recharts"],
            },
            {
              category: "Cloud & DevOps",
              skills: ["AWS EC2", "Google Cloud Run", "Vercel", "Docker", "GitHub Actions", "Railway"],
            },
          ].map((col, i) => (
            <div
              key={col.category}
              style={{
                padding: "32px 24px",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
                borderTop: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "20px",
                }}
              >
                {col.category}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {col.skills.map((skill) => (
                  <li
                    key={skill}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-2)",
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
                        backgroundColor: "var(--text-3)",
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
