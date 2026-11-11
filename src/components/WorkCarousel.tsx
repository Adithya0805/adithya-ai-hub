import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { AranyaLaptopMockup, TravelsPhoneMockup, LeathersPhoneMockup } from "./DeviceMockups";

interface TiltCardProps {
  children: React.ReactNode;
}

function TiltMockup({ children }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 180 }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </motion.div>
  );
}

export function WorkCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "aranya",
      title: "Aranya Organic Dairy Farm",
      subtitle: "Shoolagiri, Tamil Nadu · 9 Years in Business",
      tagline: "Live e-commerce catalog with Ask Farm AI and direct WhatsApp checkout.",
      stageClass: "stage-aranya",
      accentColor: "#C8A96E",
      demoUrl: "https://aranyaorganicdairyfarm.com",
      facts: [
        "400+ daily milk deliveries fulfilled across South India",
        "Bilingual Ask Farm AI answering customer questions 24/7",
        "Instant WhatsApp cart serialization with zero transaction fees",
        "Admin panel for quick inventory, image upload & low-stock alerts",
      ],
      tech: ["Next.js 14", "Supabase", "Gemini RAG", "WhatsApp API", "Vercel"],
      renderMockup: () => (
        <TiltMockup>
          <div style={{ maxWidth: "440px", width: "100%" }}>
            <AranyaLaptopMockup />
          </div>
        </TiltMockup>
      ),
    },
    {
      id: "travels",
      title: "SR Travels",
      subtitle: "Tamil Nadu · Intercity Car Rentals",
      tagline: "Dynamic fare calculation engine with driver bata and WhatsApp dispatch.",
      stageClass: "stage-travels",
      accentColor: "#E5B842",
      demoUrl: "https://sr-travels-tau.vercel.app",
      facts: [
        "Live petrol/diesel price calculation automatically baked into fares",
        "Interactive route selector (Sedan ₹14/km, SUV ₹20/km, MUV ₹21/km)",
        "Zero dropped booking leads: direct dispatch alerts straight to owner",
        "Mobile-optimized progressive web experience for on-the-go travelers",
      ],
      tech: ["Next.js", "Fare Engine", "Supabase", "WhatsApp API", "Vercel"],
      renderMockup: () => (
        <TiltMockup>
          <div style={{ width: "210px" }}>
            <TravelsPhoneMockup />
          </div>
        </TiltMockup>
      ),
    },
    {
      id: "leathers",
      title: "Dino Leathers",
      subtitle: "Ambur, Tamil Nadu · Artisanal Workshop",
      tagline: "Mobile-first D2C leather catalog with zero-cost WhatsApp checkout.",
      stageClass: "stage-leathers",
      accentColor: "#D4A373",
      demoUrl: "https://leather-hub-chi.vercel.app",
      facts: [
        "Ambur artisanal leather goods sold direct-to-consumer online",
        "Interactive custom monogram embossing initials preview",
        "Zero-fee 1-click WhatsApp order checkout with auto-filled message",
        "Studio-enhanced product photography pipeline with fast WebP delivery",
      ],
      tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind", "WhatsApp API"],
      renderMockup: () => (
        <TiltMockup>
          <div style={{ width: "205px" }}>
            <LeathersPhoneMockup />
          </div>
        </TiltMockup>
      ),
    },
  ];

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const target = scrollContainerRef.current.children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % projects.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    scrollToIndex(prevIdx);
  };

  return (
    <section
      id="work"
      style={{
        backgroundColor: "var(--bg-0)",
        borderBottom: "1px solid var(--border)",
      }}
      className="section-spacing"
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
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
                Selected Commercial Work
              </span>
            </div>
            <h2 className="text-section-title" style={{ color: "#151515", margin: 0 }}>
              The work brings the colour.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "580px", lineHeight: "1.7", marginTop: "10px" }}>
              The page stays warm cream while each client project stands out in its own bold, full-width brand palette.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                backgroundColor: "#FFFFFF",
                color: "#151515",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(21, 21, 21, 0.05)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0EAE1")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                backgroundColor: "#FFFFFF",
                color: "#151515",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(21, 21, 21, 0.05)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0EAE1")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll-Snap Horizontal Track (No scroll-jacking) */}
        <div ref={scrollContainerRef} className="carousel-snap-track">
          {projects.map((project, idx) => (
            <div key={project.id} className="carousel-snap-item">
              <div
                className={`stage-panel ${project.stageClass}`}
                style={{
                  padding: "clamp(32px, 5vw, 56px)",
                  display: "grid",
                  gridTemplateColumns: "1.1fr 0.9fr",
                  gap: "40px",
                  alignItems: "center",
                }}
              >
                {/* Left Column: Context & Proof */}
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", color: project.accentColor, fontFamily: "var(--font-mono)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {project.subtitle}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(26px, 4vw, 38px)",
                      lineHeight: "1.15",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "#E2E8F0",
                      lineHeight: "1.6",
                      marginBottom: "24px",
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Fact Bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {project.facts.map((fact, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{ color: project.accentColor, marginTop: "2px", flexShrink: 0 }}>
                          <CheckCircle2 size={16} />
                        </span>
                        <span style={{ fontSize: "13.5px", color: "#F7F3EC", lineHeight: "1.5" }}>
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack & CTA */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          color: "#E2E8F0",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          padding: "3px 9px",
                          borderRadius: "4px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#F7F3EC",
                      color: "#151515",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "13.5px",
                      fontWeight: "600",
                      textDecoration: "none",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>

                {/* Right Column: Tilting Device Mockup */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {project.renderMockup()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Progress Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
          {projects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToIndex(dotIdx)}
              aria-label={`Jump to project ${dotIdx + 1}`}
              style={{
                width: activeIndex === dotIdx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: activeIndex === dotIdx ? "#151515" : "#D5CCBD",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
