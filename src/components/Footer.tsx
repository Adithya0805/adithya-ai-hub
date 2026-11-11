import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "64px 24px 36px",
        backgroundColor: "var(--bg-0)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "40px",
        }}
        className="footer-grid"
      >
        {/* Brand & Purpose */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <Logo variant="stacked" size="md" />
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-2)",
              lineHeight: "1.7",
              maxWidth: "320px",
              marginBottom: "16px",
            }}
          >
            Adithya Kuppusamy — Freelance Web & AI Developer. Building fast websites and practical AI tools that make small businesses easier to run.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--accent)", padding: "4px 10px", background: "rgba(200, 169, 110, 0.08)", border: "1px solid rgba(200, 169, 110, 0.2)", borderRadius: "6px" }}>
            <span>3 live client sites · 3 AI systems built · Ambur, Tamil Nadu</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "var(--font-mono)",
            }}
          >
            Navigation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link to="/" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/work" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Work (Projects)
            </Link>
            <Link to="/services" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Services
            </Link>
            <Link to="/about" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              About
            </Link>
            <Link to="/contact" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Contact
            </Link>
          </div>
        </div>

        {/* Lab & Demos */}
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "var(--font-mono)",
            }}
          >
            Lab (Simulated Demos)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link to="/tools" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              AI Tools & Sandboxes
            </Link>
            <Link to="/responsible-ai" style={{ fontSize: "13px", color: "var(--text-1)", fontWeight: "600", textDecoration: "none" }}>
              Responsible AI Principles
            </Link>
            <Link to="/tools/ats-scanner" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Resume ATS Scanner
            </Link>
            <Link to="/tools/resume-editor" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Resume Editor
            </Link>
            <Link to="/blog" style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}>
              Blog & Case Studies
            </Link>
          </div>
        </div>

        {/* Direct Connect */}
        <div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "var(--font-mono)",
            }}
          >
            Connect
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a
              href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss."
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "#25D366", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <a
              href="mailto:adithyaadhi0805@gmail.com?subject=Project%20Inquiry"
              style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Mail size={13} /> Email
            </a>
            <a
              href="https://github.com/Adithya0805"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "var(--text-2)", textDecoration: "none" }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--max)",
          margin: "40px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "12px", color: "var(--text-3)", margin: 0 }}>
          © 2026 Adithya Kuppusamy. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/privacy" style={{ fontSize: "12px", color: "var(--text-3)", textDecoration: "none" }}>
            Privacy
          </Link>
          <Link to="/terms" style={{ fontSize: "12px", color: "var(--text-3)", textDecoration: "none" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
