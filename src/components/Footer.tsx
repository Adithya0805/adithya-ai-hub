import { Link } from "react-router-dom";

export function Footer() {
  const cols = [
    {
      title: "Work & Services",
      links: [
        { label: "Projects", href: "/work", internal: true },
        { label: "Freelance", href: "/freelance", internal: true },
        { label: "AI Services", href: "/services", internal: true },
        { label: "Blog & Tutorials", href: "/blog", internal: true },
      ],
    },
    {
      title: "Interactive & Labs",
      links: [
        { label: "AI Tools & Labs", href: "/tools", internal: true },
        { label: "Curated Resources", href: "/resources", internal: true },
        { label: "Resume & CV", href: "/resume", internal: true },
        { label: "Contact", href: "/contact", internal: true },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: "https://github.com/Adithya0805", internal: false },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/adithya-kuppusamy-76baab204/",
          internal: false,
        },
        { label: "Email", href: "mailto:adithyaadhi0805@gmail.com", internal: false },
        { label: "Privacy Policy", href: "/privacy", internal: true },
        { label: "Terms of Service", href: "/terms", internal: true },
      ],
    },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "48px 32px",
        backgroundColor: "var(--bg-0)",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "32px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              marginBottom: "8px",
              color: "var(--text-1)",
            }}
          >
            Adithya Kuppusamy
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-3)",
              lineHeight: "1.7",
              maxWidth: "280px",
            }}
          >
            AI & Data Science Engineer · FutureLogic AI
            <br />
            Ambur, Tamil Nadu, India
          </p>
          <div style={{ marginTop: "16px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#4ade80",
                background: "rgba(74, 222, 128, 0.08)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4ade80",
                }}
              />
              Available for Full-Time & Freelance
            </span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {col.title}
            </p>
            {col.links.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--text-2)",
                    textDecoration: "none",
                    marginBottom: "10px",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--text-2)",
                    textDecoration: "none",
                    marginBottom: "10px",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "var(--max)",
          margin: "32px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
          © 2026 Adithya AI Hub · FutureLogic AI. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
          Built with React & Vite · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
