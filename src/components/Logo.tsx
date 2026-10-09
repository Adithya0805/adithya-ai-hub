import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "mark-only" | "full" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
  linkToHome?: boolean;
}

export function Logo({
  variant = "full",
  size = "md",
  className = "",
  linkToHome = true,
}: LogoProps) {
  // Dimensions based on size
  const iconSize = size === "sm" ? 28 : size === "lg" ? 44 : 34;

  const logoMark = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "relative",
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      className="group cursor-pointer"
    >
      {/* Background ambient glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: "-4px",
          borderRadius: "8px",
          background: "radial-gradient(circle, rgba(200, 169, 110, 0.35) 0%, transparent 70%)",
          opacity: 0.6,
          filter: "blur(6px)",
          transition: "opacity 0.3s ease",
        }}
        className="group-hover:opacity-100"
      />

      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1 }}
      >
        <defs>
          {/* Luxury Metallic Gold Gradients */}
          <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5ECD7" />
            <stop offset="35%" stopColor="#C8A96E" />
            <stop offset="70%" stopColor="#DFBF7E" />
            <stop offset="100%" stopColor="#96773B" />
          </linearGradient>

          <linearGradient id="gold-core" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFE8B2" />
            <stop offset="100%" stopColor="#C8A96E" />
          </linearGradient>

          <linearGradient id="facet-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(200, 169, 110, 0.25)" />
            <stop offset="100%" stopColor="rgba(20, 20, 20, 0.85)" />
          </linearGradient>

          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal/Diamond Container Shield */}
        <polygon
          points="50,6 92,28 92,72 50,94 8,72 8,28"
          fill="#0C0C0D"
          stroke="url(#gold-metallic)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Subtle inner facet accent lines */}
        <line x1="50" y1="6" x2="50" y2="40" stroke="rgba(200, 169, 110, 0.25)" strokeWidth="1" />
        <line x1="92" y1="72" x2="62" y2="60" stroke="rgba(200, 169, 110, 0.2)" strokeWidth="1" />
        <line x1="8" y1="72" x2="38" y2="60" stroke="rgba(200, 169, 110, 0.2)" strokeWidth="1" />

        {/* Left Leg of "A" */}
        <path
          d="M 50,18 L 24,78 L 33,78 L 43,54 L 50,54"
          fill="url(#facet-dark)"
          stroke="url(#gold-metallic)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Right Leg of "A" (mirrored facet with higher gleam) */}
        <path
          d="M 50,18 L 76,78 L 67,78 L 57,54 L 50,54"
          fill="url(#gold-metallic)"
          stroke="url(#gold-metallic)"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.95"
        />

        {/* Apex Prism Crown */}
        <polygon
          points="50,18 43,36 57,36"
          fill="url(#gold-core)"
        />

        {/* Central Neural Node / Intelligence Crossbar */}
        <polygon
          points="50,42 61,56 50,59 39,56"
          fill="url(#gold-core)"
          stroke="#0C0C0D"
          strokeWidth="1"
        />

        {/* Central Pulsing Intelligence Dot */}
        <circle
          cx="50"
          cy="53"
          r="3"
          fill="#FFFFFF"
          filter="url(#gold-glow)"
        />

        {/* Bottom anchor notch */}
        <circle cx="50" cy="84" r="2" fill="url(#gold-metallic)" opacity="0.8" />
      </svg>
    </motion.div>
  );

  const typography = (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: size === "sm" ? "17px" : size === "lg" ? "24px" : "20px",
            fontWeight: "600",
            color: "var(--text-1)",
            letterSpacing: "-0.5px",
          }}
        >
          ADITHYA
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: size === "sm" ? "9px" : "10px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            color: "var(--accent)",
            textTransform: "uppercase",
            background: "rgba(200, 169, 110, 0.12)",
            padding: "1px 5px",
            borderRadius: "3px",
            border: "1px solid rgba(200, 169, 110, 0.25)",
          }}
        >
          AI HUB
        </span>
      </div>
      {variant === "stacked" && (
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-3)",
            letterSpacing: "0.5px",
            marginTop: "3px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Autonomous Intelligence Lab
        </span>
      )}
    </div>
  );

  const content = (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "8px" : "12px",
        textDecoration: "none",
      }}
      className={className}
    >
      {logoMark}
      {variant !== "mark-only" && typography}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
        }}
        aria-label="Adithya AI Hub — Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
