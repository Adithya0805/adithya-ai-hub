import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { TRANSITION_EASE } from "@/lib/motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labDropdownOpen, setLabDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLabDropdownOpen(false);
  }, [location.pathname]);

  const isLabActive =
    location.pathname.startsWith("/tools") ||
    location.pathname.startsWith("/blog") ||
    location.pathname === "/responsible-ai";

  const labLinks = [
    { label: "AI Tools & Labs", path: "/tools", desc: "Simulated demos & interactive studios" },
    { label: "Responsible AI", path: "/responsible-ai", desc: "Operational ethics & anti-hallucination" },
    { label: "Resume ATS Scanner", path: "/tools/ats-scanner", desc: "Gemini-powered JD keyword scan" },
    { label: "Resume Editor", path: "/tools/resume-editor", desc: "Markdown resume builder & exporter" },
    { label: "Blog & Tutorials", path: "/blog", desc: "Technical case studies & guides" },
  ];

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setLabDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setLabDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(247, 243, 236, 0.92)",
          borderBottom: "1px solid var(--border)",
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
          <div
            className="nav-links"
            style={{
              display: "flex",
              gap: "22px",
              alignItems: "center",
            }}
          >
            {/* Home */}
            <Link
              to="/"
              style={{
                fontSize: "14px",
                color: location.pathname === "/" ? "var(--text-1)" : "var(--text-2)",
                fontWeight: location.pathname === "/" ? "600" : "400",
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/" ? "var(--text-1)" : "var(--text-2)")
              }
            >
              Home
              {location.pathname === "/" && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#151515",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Work */}
            <Link
              to="/work"
              style={{
                fontSize: "14px",
                color:
                  location.pathname === "/work" || location.pathname === "/projects"
                    ? "var(--text-1)"
                    : "var(--text-2)",
                fontWeight:
                  location.pathname === "/work" || location.pathname === "/projects"
                    ? "600"
                    : "400",
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/work" || location.pathname === "/projects"
                    ? "var(--text-1)"
                    : "var(--text-2)")
              }
            >
              Work
              {(location.pathname === "/work" || location.pathname === "/projects") && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#151515",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Services */}
            <Link
              to="/services"
              style={{
                fontSize: "14px",
                color: location.pathname === "/services" ? "var(--text-1)" : "var(--text-2)",
                fontWeight: location.pathname === "/services" ? "600" : "400",
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/services" ? "var(--text-1)" : "var(--text-2)")
              }
            >
              Services
              {location.pathname === "/services" && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#151515",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Lab with Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setLabDropdownOpen(!labDropdownOpen)}
                aria-expanded={labDropdownOpen}
                aria-haspopup="true"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: isLabActive ? "var(--text-1)" : "var(--text-2)",
                  fontWeight: isLabActive ? "600" : "400",
                  padding: "6px 0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  position: "relative",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isLabActive ? "var(--text-1)" : "var(--text-2)")
                }
              >
                <span>Lab</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: labDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
                {isLabActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#151515",
                      borderRadius: "2px",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {labDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      left: "-20px",
                      width: "290px",
                      backgroundColor: "#FFFFFF",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "8px",
                      boxShadow: "0 18px 40px rgba(21, 21, 21, 0.08)",
                      zIndex: 110,
                    }}
                  >
                    <div style={{ padding: "4px 8px 6px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                        Tools, Demos & Principles
                      </p>
                    </div>
                    {labLinks.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setLabDropdownOpen(false)}
                          style={{
                            display: "block",
                            padding: "9px 12px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            backgroundColor: isActive ? "#F0EAE1" : "transparent",
                            transition: "background-color 0.15s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F7F3EC")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = isActive
                              ? "#F0EAE1"
                              : "transparent")
                          }
                        >
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#151515",
                            }}
                          >
                            {item.label}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--text-2)", marginTop: "2px" }}>
                            {item.desc}
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              to="/about"
              style={{
                fontSize: "14px",
                color: location.pathname === "/about" ? "var(--text-1)" : "var(--text-2)",
                fontWeight: location.pathname === "/about" ? "600" : "400",
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/about" ? "var(--text-1)" : "var(--text-2)")
              }
            >
              About
              {location.pathname === "/about" && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#151515",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              style={{
                fontSize: "14px",
                color: location.pathname === "/contact" ? "var(--text-1)" : "var(--text-2)",
                fontWeight: location.pathname === "/contact" ? "600" : "400",
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === "/contact" ? "var(--text-1)" : "var(--text-2)")
              }
            >
              Contact
              {location.pathname === "/contact" && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#151515",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* Right CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "10px" }}>
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp message"
                className="btn-whatsapp"
                style={{
                  padding: "7px 14px",
                  fontSize: "12.5px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  lineHeight: 1,
                }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Button (Tap target >= 44px) */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "none",
              minWidth: "44px",
              minHeight: "44px",
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "#151515",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              boxShadow: "0 2px 6px rgba(21, 21, 21, 0.04)",
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu (Tap targets >= 44px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: TRANSITION_EASE }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              backgroundColor: "rgba(247, 243, 236, 0.98)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              padding: "20px 24px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
            }}
          >
            {/* Top Bar with Logo and Close Button */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: "20px",
                }}
              >
                <Logo variant="full" size="md" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    minWidth: "44px",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFFFFF",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "#151515",
                    cursor: "pointer",
                  }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Nav Links (All with min-height: 48px >= 44px) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "Home", path: "/" },
                  { label: "Work", path: "/work" },
                  { label: "Services", path: "/services" },
                  { label: "About", path: "/about" },
                  { label: "Contact", path: "/contact" },
                ].map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        minHeight: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 14px",
                        fontSize: "18px",
                        fontFamily: "var(--font-serif)",
                        color: "#151515",
                        textDecoration: "none",
                        borderRadius: "8px",
                        backgroundColor: isActive ? "#FFFFFF" : "transparent",
                        border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                      }}
                    >
                      <span style={{ fontWeight: isActive ? "600" : "400" }}>{item.label}</span>
                      <span style={{ fontSize: "14px", color: "var(--text-3)" }}>→</span>
                    </Link>
                  );
                })}

                {/* Lab Simple List on Mobile */}
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "var(--text-3)",
                      marginBottom: "8px",
                      paddingLeft: "14px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Lab & Principles
                  </p>
                  {labLinks.map((sub) => {
                    const isActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          minHeight: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 14px",
                          fontSize: "15px",
                          color: "#151515",
                          textDecoration: "none",
                          borderRadius: "8px",
                          backgroundColor: isActive ? "#FFFFFF" : "transparent",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: isActive ? "600" : "400" }}>{sub.label}</div>
                          <div style={{ fontSize: "11px", color: "var(--text-2)" }}>{sub.desc}</div>
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--text-3)" }}>↗</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Footer with WhatsApp and Contact Buttons (Tap target >= 44px) */}
            <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="https://wa.me/918825714576?text=Hi%20Adithya%2C%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  textDecoration: "none",
                  borderRadius: "8px",
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp (+91 88257 14576)</span>
              </a>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ink"
                style={{
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              >
                <span>Get in touch</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
