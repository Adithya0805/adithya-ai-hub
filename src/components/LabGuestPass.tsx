import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sparkles,
  Heart,
  Flame,
  Lightbulb,
  Handshake,
  Rocket,
  Check,
  Award,
} from "lucide-react";

interface ReactionStamp {
  id: string;
  emoji: string;
  label: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const STAMPS: ReactionStamp[] = [
  { id: "mindblowing", emoji: "🔥", label: "Mind-Blowing", icon: Flame },
  { id: "inspiring", emoji: "💡", label: "Inspiring", icon: Lightbulb },
  { id: "collaborate", emoji: "🤝", label: "Let's Build", icon: Handshake },
  { id: "quality", emoji: "🚀", label: "Production Quality", icon: Rocket },
];

export function LabGuestPass() {
  const [passId, setPassId] = useState("AI-HUB-7842");
  const [activeStamps, setActiveStamps] = useState<string[]>([]);
  const [recentStamped, setRecentStamped] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Generate or retrieve persistent visitor pass ID
    let savedPass = localStorage.getItem("adithya_visitor_pass_id");
    if (!savedPass) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      savedPass = `AI-HUB-${randomCode}`;
      localStorage.setItem("adithya_visitor_pass_id", savedPass);
    }
    setPassId(savedPass);

    // Retrieve saved stamps
    const savedStamps = localStorage.getItem("adithya_visitor_stamps");
    if (savedStamps) {
      try {
        setActiveStamps(JSON.parse(savedStamps));
      } catch (e) {
        // ignore
      }
    }

    // Local time string
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStamp = (stampId: string) => {
    let nextStamps = [...activeStamps];
    if (nextStamps.includes(stampId)) {
      nextStamps = nextStamps.filter((s) => s !== stampId);
    } else {
      nextStamps.push(stampId);
      setRecentStamped(stampId);
      setTimeout(() => setRecentStamped(null), 2500);
    }
    setActiveStamps(nextStamps);
    localStorage.setItem("adithya_visitor_stamps", JSON.stringify(nextStamps));
  };

  return (
    <div
      style={{
        margin: "40px auto 0",
        maxWidth: "680px",
        background: "linear-gradient(135deg, rgba(20, 20, 24, 0.95) 0%, rgba(10, 10, 12, 0.98) 100%)",
        border: "1px solid rgba(200, 169, 110, 0.35)",
        borderRadius: "14px",
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
      }}
    >
      {/* Background watermark */}
      <div
        style={{
          position: "absolute",
          right: "-20px",
          bottom: "-20px",
          opacity: 0.03,
          fontSize: "140px",
          fontFamily: "var(--font-serif)",
          fontWeight: 700,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        A
      </div>

      {/* Top Pass Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          borderBottom: "1px dashed rgba(200, 169, 110, 0.25)",
          paddingBottom: "16px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              background: "rgba(200, 169, 110, 0.15)",
              border: "1px solid rgba(200, 169, 110, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Award size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--text-3)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              DIGITAL LAB ACCESS PASS
            </p>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--text-1)",
                fontFamily: "var(--font-mono)",
                margin: 0,
              }}
            >
              #{passId}
            </h4>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: "10px",
              color: "var(--text-3)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            LOCAL TIME: {currentTime}
          </p>
          <span
            style={{
              fontSize: "11px",
              color: "#4ade80",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#4ade80",
              }}
            />
            SESSION AUTHENTICATED
          </span>
        </div>
      </div>

      {/* Middle: Stamp your visit */}
      <div>
        <p style={{ fontSize: "12px", color: "var(--text-2)", marginBottom: "12px" }}>
          Leave your stamp on this visit. Pick a seal to stamp your guest pass:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
          {STAMPS.map((stamp) => {
            const isStamped = activeStamps.includes(stamp.id);
            const Icon = stamp.icon;
            return (
              <motion.button
                key={stamp.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStamp(stamp.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: isStamped ? "rgba(200, 169, 110, 0.18)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${isStamped ? "var(--accent)" : "rgba(255, 255, 255, 0.08)"}`,
                  color: isStamped ? "var(--accent)" : "var(--text-2)",
                  fontSize: "12px",
                  fontWeight: isStamped ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                className="hover:border-amber-400"
              >
                <span>{stamp.emoji}</span>
                <span style={{ fontSize: "11px" }}>{stamp.label}</span>
                {isStamped && <Check size={12} style={{ marginLeft: "auto", color: "var(--accent)" }} />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {recentStamped && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontSize: "11px",
                color: "var(--accent)",
                marginTop: "10px",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
              }}
            >
              ✨ Stamped! Thank you for leaving your presence in Adithya's lab.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
