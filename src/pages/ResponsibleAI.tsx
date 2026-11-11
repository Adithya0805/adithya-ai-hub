import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ShieldCheck, CheckCircle2, Lock, Sparkles, MessageCircle, ArrowRight, ArrowUpRight } from "lucide-react";

export function ResponsibleAI() {
  const principles = [
    {
      num: "01",
      title: "Zero Training Data Retention & Strict Privacy",
      summary:
        "Customer phone numbers, addresses, and chat queries must never be used to train public foundation models or leak across client boundaries.",
      practice:
        "At Aranya Organic Dairy and SR Travels, all conversational APIs utilize enterprise zero-retention endpoints. Customer addresses and phone numbers stay strictly within private Supabase databases protected by Row Level Security (RLS) policies. No customer data ever enters LLM training sets.",
    },
    {
      num: "02",
      title: "Catalog Grounding & Strict Anti-Hallucination",
      summary:
        "A business assistant should never guess prices, invent delivery policies, or speculate. Responses must be grounded in verified business records.",
      practice:
        "Ask Farm AI at Aranya Organic Dairy Farm operates over a verified knowledge graph of A2 milk lab tests, Bilona ghee churn methods, and actual delivery routes. If a customer asks about an unlisted item or veterinary advice, the AI explicitly states it cannot answer and offers a direct WhatsApp handoff to the farm owner.",
    },
    {
      num: "03",
      title: "Deterministic Order Execution (No Autonomous Charges)",
      summary:
        "AI should assist the customer in finding the right product, but never autonomously trigger financial charges or submit unconfirmed orders.",
      practice:
        "Across Dino Leathers and Aranya Dairy, carts are serialized into clean, structured WhatsApp order summaries. Both the customer and the shop owner review the exact line items, delivery fee, and total before any payment is confirmed or fulfilled.",
    },
    {
      num: "04",
      title: "Vernacular Fairness & Dialect Naturalness",
      summary:
        "Commercial software serving regional businesses must handle colloquial Tamil, Tanglish, and English naturally without robotic or condescending translations.",
      practice:
        "In Urimai AI (Tamil Nadu government scheme assistant) and Ask Farm AI, conversational models are tested against 49 benchmark regional test suites. Queries written in informal Tanglish ('milk deliver aaguma?') receive the exact same precision and courteous tone as formal English inquiries.",
    },
    {
      num: "05",
      title: "Continuous Human-in-the-Loop & Owner Escalation",
      summary:
        "AI must be an assistant, never an obstacle. Customers should always have an instant, one-tap path to talk directly with the business owner.",
      practice:
        "Every AI interaction embeds an instant WhatsApp escape hatch. If a customer requests a custom wholesale volume, expresses urgency, or asks a complex question, the AI provides a one-click WhatsApp link pre-filled with their context so the owner can step in seamlessly.",
    },
    {
      num: "06",
      title: "Client Data Ownership & Zero Vendor Lock-In",
      summary:
        "Small businesses must own their domain, customer database, and code without being trapped in monthly black-box SaaS subscriptions.",
      practice:
        "All client platforms (Aranya Dairy, SR Travels, Dino Leathers) are built with open standards: Next.js, PostgreSQL/Supabase, standard REST APIs, and Vercel edge deployment. Clients own their GoDaddy domain accounts, their Supabase databases, and can export all customer records anytime.",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Responsible AI in Small Business — Adithya Kuppusamy</title>
        <meta
          name="description"
          content="Our architectural principles for deploying practical, secure, and hallucination-free AI systems for small businesses and commercial clients."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/responsible-ai" />
      </Helmet>

      <div style={{ backgroundColor: "var(--bg-0)", minHeight: "100vh" }}>
        {/* Editorial Header */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "80px 24px 60px",
          }}
        >
          <div className="site-container">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
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
                Engineering Ethics & Standards
              </span>
            </div>

            <h1
              className="text-display"
              style={{
                fontSize: "clamp(36px, 5.5vw, 64px)",
                color: "#151515",
                marginBottom: "20px",
                maxWidth: "840px",
              }}
            >
              Responsible AI in small business practice.
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: "var(--text-2)",
                maxWidth: "680px",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              AI should never be an experiment at your client's expense. Here is the operational framework we follow to protect customer privacy, eliminate hallucinations, and ensure every tool delivers measurable value.
            </p>
          </div>
        </section>

        {/* Numbered Principles with "In practice" examples */}
        <section className="section-spacing">
          <div className="site-container">
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {principles.map((p) => (
                <div
                  key={p.num}
                  className="card-standard"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6DFD3",
                    borderRadius: "16px",
                    padding: "clamp(28px, 4vw, 44px)",
                    boxShadow: "0 4px 20px rgba(21, 21, 21, 0.04)",
                  }}
                >
                  {/* Top Bar with Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "32px",
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {p.num}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        color: "#151515",
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h2>
                  </div>

                  {/* Principle Statement */}
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#151515",
                      lineHeight: "1.7",
                      marginBottom: "24px",
                      maxWidth: "760px",
                    }}
                  >
                    {p.summary}
                  </p>

                  {/* "In practice" Box */}
                  <div
                    style={{
                      backgroundColor: "#F7F3EC",
                      border: "1px solid #E6DFD3",
                      borderRadius: "10px",
                      padding: "20px 24px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <CheckCircle2 size={16} color="#059669" />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: "#151515",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        In practice
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "14.5px",
                        color: "var(--text-2)",
                        lineHeight: "1.7",
                        margin: 0,
                      }}
                    >
                      {p.practice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              style={{
                marginTop: "64px",
                padding: "48px 32px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E6DFD3",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "#151515", marginBottom: "12px" }}>
                Want to discuss AI integration for your business?
              </h3>
              <p style={{ fontSize: "15px", color: "var(--text-2)", maxWidth: "520px", margin: "0 auto 28px", lineHeight: "1.7" }}>
                Every solution is tailored to your real operations, privacy needs, and customer touchpoints.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20read%20your%20Responsible%20AI%20principles%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link to="/contact" className="btn-ink">
                  <span>Contact Form</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ResponsibleAI;
