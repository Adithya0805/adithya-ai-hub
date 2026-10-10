import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Work", path: "/work" },
    { label: "Freelance", path: "/freelance" },
    { label: "Services", path: "/services" },
    { label: "AI Labs", path: "/tools" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '56px', display: 'flex', alignItems: 'center',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(10,10,10,0.72)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backgroundImage: 'linear-gradient(180deg, rgba(200,169,110,0.025) 0%, transparent 100%)'
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
          <Logo variant="full" size="md" />

          {/* Desktop Nav Links */}
          <div className="nav-links" style={{ display: "flex", gap: "22px", alignItems: "center" }}>
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/work" && location.pathname === "/projects");
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
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "var(--text-1)" : "var(--text-2)")
                  }
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--accent)",
                        borderRadius: "2px",
                        boxShadow: "0 0 8px rgba(200, 169, 110, 0.4)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "6px" }}>
              <a
                href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20am%20interested%20in%20discussing%20an%20AI%20project"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#25D366",
                  background: "rgba(37, 211, 102, 0.1)",
                  border: "1px solid rgba(37, 211, 102, 0.25)",
                  padding: "5px 12px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "all 0.2s",
                }}
              >
                <MessageCircle size={13} />
                WhatsApp
              </a>

              <Link
                to="/services"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000",
                  background: "var(--accent)",
                  padding: "6px 14px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  letterSpacing: "0.2px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 0 16px rgba(200, 169, 110, 0.25)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "none",
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

      {/* Mobile Drawer Overlay with Framer Motion Spring */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: "56px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              backgroundColor: "rgba(10, 10, 10, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p
                style={{
                  fontSize: "10px",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: "8px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Navigation
              </p>
              {[
                ...navItems,
                { label: "Curated Resources", path: "/resources" },
                { label: "Resume & Credentials", path: "/resume" },
              ].map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: "17px",
                        fontFamily: "var(--font-serif)",
                        color: isActive ? "var(--accent)" : "var(--text-1)",
                        textDecoration: "none",
                        padding: "10px 12px",
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
                  </motion.div>
                );
              })}
            </div>

            <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="https://wa.me/918825714576"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  background: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.3)",
                  color: "#25D366",
                  fontSize: "13px",
                  fontWeight: "700",
                  textDecoration: "none",
                  borderRadius: "6px",
                }}
              >
                <MessageCircle size={16} /> Direct WhatsApp (+91 88257 14576)
              </a>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  borderRadius: "6px",
                  letterSpacing: "0.3px",
                }}
              >
                Hire for AI Work <ArrowUpRight size={16} />
              </Link>
              <p style={{ fontSize: "11px", color: "var(--text-3)", textAlign: "center" }}>
                Ambur, Tamil Nadu · Available for Full-Time & Freelance
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
