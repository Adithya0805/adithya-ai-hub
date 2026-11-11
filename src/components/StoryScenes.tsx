import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Zap, ExternalLink } from "lucide-react";
import { TRANSITION_EASE } from "@/lib/motion";

interface SceneData {
  id: number;
  title: string;
  problem: {
    headline: string;
    details: string;
    impact: string;
  };
  solution: {
    headline: string;
    details: string;
    result: string;
  };
  builtIn: {
    text: string;
    links?: { name: string; url: string }[];
    isProposed?: boolean;
  };
}

const scenesData: SceneData[] = [
  {
    id: 1,
    title: "Product photos live in WhatsApp chats",
    problem: {
      headline: "Scattered photos & endless manual forward loops",
      details: "Customers message 'send me photos', pictures get compressed or buried in chat threads, out-of-stock items get ordered, and the owner spends hours sending the same images repeatedly.",
      impact: "Lost sales, slow customer response, and unorganized brand perception.",
    },
    solution: {
      headline: "A clean online catalog with one shareable link",
      details: "A high-performance web catalog with studio-grade image presentation, clear pricing, inventory status, and one-tap WhatsApp checkout.",
      result: "Customers browse without asking for photos, view live pricing, and share a single professional link.",
    },
    builtIn: {
      text: "Built before in: ",
      links: [
        { name: "Aranya Organic Dairy", url: "https://aranyaorganicdairyfarm.com" },
        { name: "Dino Leathers", url: "https://leather-hub-chi.vercel.app" },
      ],
    },
  },
  {
    id: 2,
    title: "Customers ask the same price questions all day",
    problem: {
      headline: "Repeated calls & missed night-time buyers",
      details: "The phone rings non-stop for basic questions: 'What is the price?', 'Do you deliver to my area?', 'Is this in stock?'. Inquiries after 9 PM go unanswered until morning.",
      impact: "Constant owner distraction during work hours and lost nighttime sales.",
    },
    solution: {
      headline: "An AI assistant answering from the shop's catalog",
      details: "A 24/7 AI assistant answering customer questions directly from the shop's own catalog, product descriptions, and delivery guidelines.",
      result: "Fewer repeat calls, immediate answers at night too, and qualified buyers handed to WhatsApp.",
    },
    builtIn: {
      text: "Built before in: Ask Farm AI at ",
      links: [
        { name: "Aranya Organic Dairy", url: "https://aranyaorganicdairyfarm.com" },
      ],
    },
  },
  {
    id: 3,
    title: "Orders scattered across calls and messages",
    problem: {
      headline: "Messy notes, missed orders & stock surprises",
      details: "Orders arrive simultaneously via WhatsApp chats, phone calls, and diary scraps. Items get missed, customer addresses get lost, and sold-out items are promised by mistake.",
      impact: "Embarrassing delivery errors, unorganized billing, and frustrated buyers.",
    },
    solution: {
      headline: "One unified order system with admin panel & tracking",
      details: "A centralized order system with admin panel, real-time stock decrements, low-stock alerts, customer-facing delivery tracking, and WhatsApp status updates.",
      result: "The owner sees every order in one unified place, with zero manual paperwork.",
    },
    builtIn: {
      text: "Built before in: ",
      links: [
        { name: "Aranya Organic Dairy", url: "https://aranyaorganicdairyfarm.com" },
      ],
    },
  },
  {
    id: 4,
    title: "Bookings and enquiries get lost",
    problem: {
      headline: "Lost trip requests & manual route calculation",
      details: "During busy driving hours, phone calls go unanswered. Customers requesting trip estimates wait hours for manual distance math and fuel price calculations.",
      impact: "High drop-off rate as urgent travelers book with competing operators.",
    },
    solution: {
      headline: "A booking flow with dynamic calculator & WhatsApp confirmation",
      details: "An interactive booking flow with live fuel-adjusted fare calculation (Sedan, SUV, MUV), driver bata rules, and automated WhatsApp confirmation to the traveler and owner.",
      result: "Every booking request is saved, fares are transparent, and travelers get instant confirmation.",
    },
    builtIn: {
      text: "Built before in: ",
      links: [
        { name: "SR Travels", url: "https://sr-travels-tau.vercel.app" },
      ],
    },
  },
  {
    id: 5,
    title: "Posting regularly takes hours",
    problem: {
      headline: "Creative burnout & weeks of marketing silence",
      details: "Writing engaging marketing copy and posting regularly takes hours that small business owners don't have, leading to stagnant social channels.",
      impact: "Inconsistent audience reach, missed seasonal festivals, and low repeat purchases.",
    },
    solution: {
      headline: "AI drafts captions from product photos for approval",
      details: "AI drafts ready-to-publish social captions, hashtags, and product highlights directly from uploaded studio photos, and the owner approves with one tap.",
      result: "Marketing stays consistent every week with under 5 minutes of owner review.",
    },
    builtIn: {
      text: "Proposed, not yet delivered for a client",
      isProposed: true,
    },
  },
  {
    id: 6,
    title: "Old websites are slow, broken or forgotten",
    problem: {
      headline: "Crashed plugins, outdated prices & security vulnerabilities",
      details: "Websites built years ago get neglected: plugins crash, security certificates lapse, forms break silently, and slow loading drives mobile customers away.",
      impact: "Security breaches, broken checkouts, and negative first impressions.",
    },
    solution: {
      headline: "Comprehensive care plan for speed, security & data",
      details: "A dedicated care plan covering regular updates, automated backups, speed optimization, security monitoring, and continuous data cleanup.",
      result: "The site keeps working seamlessly (<1.2s load), stays secure, and customer data remains safe.",
    },
    builtIn: {
      text: "Standard ongoing operational care for client deployments",
    },
  },
];

export function StoryScenes() {
  const [sceneModes, setSceneModes] = useState<Record<number, "before" | "withAI">>({
    0: "withAI",
    1: "withAI",
    2: "withAI",
    3: "withAI",
    4: "withAI",
    5: "withAI",
  });

  const toggleMode = (sceneIndex: number, mode: "before" | "withAI") => {
    setSceneModes((prev) => ({ ...prev, [sceneIndex]: mode }));
  };

  return (
    <section
      id="scenes"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg-0)",
      }}
      className="section-spacing"
    >
      <div className="site-container">
        {/* Sticky Section Heading */}
        <div
          style={{
            marginBottom: "56px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "32px",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
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
              The Operations Story
            </span>
          </div>

          <h2
            className="text-section-title"
            style={{
              marginBottom: "16px",
              color: "#151515",
            }}
          >
            A day in a small business
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-2)",
              maxWidth: "680px",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            Where manual hours get lost across scattered WhatsApp chats, phone calls, and paperwork — and how practical web engineering and AI give those hours back.
          </p>
        </div>

        {/* Six Scenes Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {scenesData.map((scene, index) => {
            const currentMode = sceneModes[index] || "withAI";

            return (
              <div
                key={scene.id}
                className="card-standard"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E6DFD3",
                  borderRadius: "14px",
                  padding: "clamp(24px, 4vw, 36px)",
                  boxShadow: "0 4px 20px rgba(21, 21, 21, 0.04)",
                }}
              >
                {/* Top Header of Card: Scene Number, Title & Slider Toggle */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #E6DFD3",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontFamily: "var(--font-mono)",
                        color: "#151515",
                        fontWeight: "700",
                        backgroundColor: "#F0EAE1",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      SCENE 0{scene.id}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(19px, 2.5vw, 24px)",
                        color: "#151515",
                        margin: 0,
                      }}
                    >
                      {scene.title}
                    </h3>
                  </div>

                  {/* "Before / With AI" Slider Control */}
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "3px",
                      borderRadius: "8px",
                      backgroundColor: "#F0EAE1",
                      border: "1px solid #E6DFD3",
                    }}
                    role="group"
                    aria-label={`Toggle state for ${scene.title}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMode(index, "before")}
                      aria-pressed={currentMode === "before"}
                      style={{
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: currentMode === "before" ? "#FFFFFF" : "transparent",
                        color: currentMode === "before" ? "#B91C1C" : "#6B665E",
                        boxShadow: currentMode === "before" ? "0 2px 6px rgba(21, 21, 21, 0.08)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <AlertCircle size={13} />
                      <span>Before</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleMode(index, "withAI")}
                      aria-pressed={currentMode === "withAI"}
                      style={{
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: currentMode === "withAI" ? "#151515" : "transparent",
                        color: currentMode === "withAI" ? "#F7F3EC" : "#6B665E",
                        boxShadow: currentMode === "withAI" ? "0 2px 6px rgba(21, 21, 21, 0.15)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Zap size={13} color={currentMode === "withAI" ? "#C8A96E" : "#6B665E"} />
                      <span>With AI</span>
                    </button>
                  </div>
                </div>

                {/* State Content Area */}
                <div style={{ minHeight: "135px" }}>
                  <AnimatePresence mode="wait">
                    {currentMode === "before" ? (
                      <motion.div
                        key={`before-${scene.id}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.25, ease: TRANSITION_EASE }}
                        style={{
                          padding: "20px",
                          borderRadius: "10px",
                          backgroundColor: "#FEF2F2",
                          border: "1px solid #FEE2E2",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#DC2626" }} />
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#B91C1C", textTransform: "uppercase", letterSpacing: "1px" }}>
                            The Friction
                          </span>
                        </div>
                        <h4 style={{ fontSize: "16px", color: "#151515", fontWeight: "600", marginBottom: "6px" }}>
                          {scene.problem.headline}
                        </h4>
                        <p style={{ fontSize: "14.5px", color: "#4B5563", lineHeight: "1.7", marginBottom: "12px" }}>
                          {scene.problem.details}
                        </p>
                        <div style={{ fontSize: "13px", color: "#B91C1C", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}>
                          <span><strong>The Cost:</strong> {scene.problem.impact}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`withai-${scene.id}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, ease: TRANSITION_EASE }}
                        style={{
                          padding: "20px",
                          borderRadius: "10px",
                          backgroundColor: "#F7F3EC",
                          border: "1px solid #E6DFD3",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8934A" }} />
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#151515", textTransform: "uppercase", letterSpacing: "1px" }}>
                            With AI / Better Experience
                          </span>
                        </div>
                        <h4 style={{ fontSize: "16px", color: "#151515", fontWeight: "600", marginBottom: "6px" }}>
                          {scene.solution.headline}
                        </h4>
                        <p style={{ fontSize: "14.5px", color: "#6B665E", lineHeight: "1.7", marginBottom: "12px" }}>
                          {scene.solution.details}
                        </p>
                        <div style={{ fontSize: "13.5px", color: "#065F46", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}>
                          <CheckCircle2 size={16} color="#059669" />
                          <span><strong>Result:</strong> {scene.solution.result}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Built before in footer */}
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid #E6DFD3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div style={{ fontSize: "13px", color: "#6B665E", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                    <span>{scene.builtIn.text}</span>
                    {scene.builtIn.links?.map((link, lIdx) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#151515",
                          fontWeight: "600",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        {link.name}
                        <ExternalLink size={12} />
                        {lIdx < (scene.builtIn.links?.length || 0) - 1 && <span style={{ textDecoration: "none", color: "#6B665E" }}>,</span>}
                      </a>
                    ))}
                    {scene.builtIn.isProposed && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          backgroundColor: "#F0EAE1",
                          border: "1px solid #E6DFD3",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          color: "#6B665E",
                          fontWeight: "600",
                        }}
                      >
                        Proposed, not yet delivered for a client
                      </span>
                    )}
                  </div>

                  <span style={{ fontSize: "11px", color: "#8C857B", fontFamily: "var(--font-mono)" }}>
                    Scene 0{scene.id} / 06
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StoryScenes;
