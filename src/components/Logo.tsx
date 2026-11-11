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
  const iconSize = size === "sm" ? 28 : size === "lg" ? 40 : 32;

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
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #E6DFD3",
        backgroundColor: "#151515",
        boxShadow: "0 2px 8px rgba(21, 21, 21, 0.08)",
      }}
      className="cursor-pointer"
    >
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: size === "sm" ? "16px" : size === "lg" ? "22px" : "18px",
          color: "#F7F3EC",
          fontWeight: "700",
          lineHeight: 1,
        }}
      >
        A
      </span>
    </motion.div>
  );

  const typography = (
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: size === "sm" ? "17px" : size === "lg" ? "24px" : "20px",
            fontWeight: "600",
            color: "#151515",
            letterSpacing: "-0.5px",
          }}
        >
          ADITHYA
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9.5px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#151515",
            textTransform: "uppercase",
            background: "#FFFFFF",
            padding: "2px 7px",
            borderRadius: "4px",
            border: "1px solid #E6DFD3",
          }}
        >
          WEB & AI
        </span>
      </div>
    </div>
  );

  const content = (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
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
        aria-label="Adithya — Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
