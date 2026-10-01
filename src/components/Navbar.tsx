import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Work", path: "/work" },
    { label: "Blog", path: "/blog" },
    { label: "Freelance", path: "/freelance" },
    { label: "Services", path: "/services" },
    { label: "Tools", path: "/tools" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "56px",
          display: "flex",
          alignItems: "center",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          backgroundColor: "rgba(10,10,10,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundImage: "linear-gradient(180deg, rgba(200,169,110,0.03) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max)",
            margin: "0 auto",
            width: "100%",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "19px",
              color: "var(--text-1)",
              textDecoration: "none",
              letterSpacing: "-0.3px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Adithya</span>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{
                    fontSize: "13px",
                    color: isActive ? "var(--text-1)" : "var(--text-2)",
                    fontWeight: isActive ? "600" : "400",
                    textDecoration: "none",
                    letterSpacing: "0.2px",
                    transition: "color 0.15s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "var(--text-1)" : "var(--text-2)")
                  }
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "0",
                        right: "0",
                        height: "1.5px",
                        background: "var(--accent)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <a
              href="mailto:adithyaadhi0805@gmail.com"
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--bg-0)",
                background: "var(--accent)",
                padding: "6px 16px",
                borderRadius: "4px",
                textDecoration: "none",
                letterSpacing: "0.2px",
                transition: "opacity 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "none", // Overridden by CSS media query
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "6px 10px",
              color: "var(--text-1)",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            backgroundColor: "rgba(10, 10, 10, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--border)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              Navigation
            </p>
            {[
              ...navItems,
              { label: "Resources", path: "/resources" },
              { label: "Resume", path: "/resume" },
              { label: "Contact", path: "/contact" },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "18px",
                    fontFamily: "var(--font-serif)",
                    color: isActive ? "var(--accent)" : "var(--text-1)",
                    textDecoration: "none",
                    padding: "12px 14px",
                    borderRadius: "6px",
                    background: isActive ? "rgba(200, 169, 110, 0.08)" : "transparent",
                    border: isActive ? "1px solid rgba(200, 169, 110, 0.2)" : "1px solid transparent",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: "14px", color: "var(--text-3)" }}>→</span>
                </Link>
              );
            })}
          </div>

          <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <a
              href="mailto:adithyaadhi0805@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: "var(--accent)",
                color: "var(--bg-0)",
                fontSize: "14px",
                fontWeight: "700",
                textDecoration: "none",
                borderRadius: "6px",
                letterSpacing: "0.3px",
                marginBottom: "12px",
              }}
            >
              Hire Me for AI Work <ArrowUpRight size={16} />
            </a>
            <p style={{ fontSize: "12px", color: "var(--text-3)", textAlign: "center" }}>
              Ambur, Tamil Nadu · Available for Remote & Relocation
            </p>
          </div>
        </div>
      )}
    </>
  );
}
