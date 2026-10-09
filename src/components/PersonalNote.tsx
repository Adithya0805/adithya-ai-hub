import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
  Heart,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

export function PersonalNote() {
  return (
    <section
      style={{
        padding: "80px 32px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(180deg, rgba(10, 10, 12, 0.4) 0%, rgba(18, 16, 12, 0.7) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left Column: Authentic Personal Letter */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 10px var(--accent)",
              }}
            />
            <p
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                margin: 0,
              }}
            >
              A PERSONAL NOTE FROM ADITHYA
            </p>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: "400",
              color: "var(--text-1)",
              lineHeight: "1.15",
              letterSpacing: "-1px",
              marginBottom: "20px",
            }}
          >
            Engineering AI with{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
              human purpose.
            </span>
          </h2>

          <div
            style={{
              fontSize: "15px",
              color: "var(--text-2)",
              lineHeight: "1.8",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <p>
              I started building AI systems from <strong>Ambur, Tamil Nadu</strong> with a quiet, stubborn belief:
              technology is only worth building if it genuinely protects, uplifts, or creates real livelihoods for real people.
            </p>
            <p>
              I don't build artificial intelligence to generate hollow demos or churn generic wrappers.
              When I design <strong>MediGuard V2</strong>, I build multi-agent guardrails that help clinicians catch fatal drug interactions before they happen.
              When I build for <strong>Aranya Organic Dairy</strong>, I engineer cold-chain systems that empower local farmers to fulfill 400+ fresh milk deliveries before sunrise every morning.
            </p>
            <p>
              Whether you are an engineering leader searching for a fearless builder, a founder ready to ship something enduring,
              or a student looking for guidance — thank you for visiting my workshop. You have my full focus and commitment.
            </p>
          </div>

          {/* Animated Handwritten Signature */}
          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative" }}>
              <svg
                width="200"
                height="64"
                viewBox="0 0 240 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Flowing handwritten cursive path for Adithya K. */}
                <motion.path
                  d="M 15,58 C 30,22 45,12 55,16 C 65,20 52,65 42,65 C 38,65 52,42 70,45 C 82,48 88,58 98,42 C 105,32 110,60 118,48 C 124,38 132,46 142,42 C 150,38 158,54 168,44 C 178,34 185,55 195,40 M 180,24 L 210,62 M 175,55 L 218,52"
                  stroke="var(--accent)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </svg>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-3)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                Adithya Kuppusamy · Founder & AI Engineer
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Status Radar Card */}
        <div
          style={{
            background: "rgba(12, 12, 14, 0.9)",
            border: "1px solid rgba(200, 169, 110, 0.25)",
            borderRadius: "14px",
            padding: "32px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Terminal size={16} style={{ color: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-1)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                BUILDER RADAR TELEMETRY
              </span>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "#4ade80",
                background: "rgba(74, 222, 128, 0.1)",
                padding: "3px 8px",
                borderRadius: "100px",
                fontWeight: "600",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                }}
              />
              LIVE & ACTIVE
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <MapPin size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                  Current Headquarters
                </p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: "2px 0 0" }}>
                  Ambur, Tamil Nadu, India (12.79° N, 78.71° E)
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-3)", margin: "2px 0 0" }}>
                  Working with teams across India, USA, and remote global hubs.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <Sparkles size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                  Active Focus & Builds
                </p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: "2px 0 0" }}>
                  MediGuard V2 (Multi-Agent RAG) & E-Commerce AI
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-3)", margin: "2px 0 0" }}>
                  Benchmarking LangGraph agent loops and cold-chain order logistics.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <Clock size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                  Availability & SLA
                </p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: "2px 0 0" }}>
                  Select Full-Time Roles & High-Impact Contracts
                </p>
                <p style={{ fontSize: "12px", color: "#4ade80", margin: "2px 0 0" }}>
                  ⚡ Typically replies in under 2 hours
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/918825714576?text=Hi%20Adithya,%20I%20visited%20your%20site%20and%20would%20love%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                minWidth: "140px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 18px",
                background: "#25D366",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "transform 0.2s, opacity 0.2s",
              }}
              className="hover:opacity-90"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Adithya</span>
            </a>

            <Link
              to="/contact"
              style={{
                flex: 1,
                minWidth: "140px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 18px",
                background: "rgba(200, 169, 110, 0.15)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              className="hover:bg-amber-400/20"
            >
              <Calendar size={16} />
              <span>Book Discussion</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
