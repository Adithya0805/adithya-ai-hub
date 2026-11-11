import React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * HeroNeuralTopology
 * Background SVG vector topology & subtle generative coordinate grid.
 * Adds immense "Aura" and research-grade intellectual depth to the warm cream editorial theme.
 */
export function HeroNeuralTopology() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Subtle radial warmth in the top right behind the interactive console */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "60vw",
          height: "60vw",
          maxWidth: "800px",
          maxHeight: "800px",
          background:
            "radial-gradient(circle, rgba(200, 169, 110, 0.12) 0%, rgba(247, 243, 236, 0) 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Subtle bottom-left glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, rgba(247, 243, 236, 0) 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* SVG Neural Vectors and Coordinate Grid */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.65,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="editorial-dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="0.9" fill="#D3C9BC" opacity="0.6" />
          </pattern>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8A96E" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#8E887E" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2D5A27" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Dot Matrix Grid */}
        <rect width="100%" height="100%" fill="url(#editorial-dot-grid)" />

        {/* Dynamic Vector Curves connecting abstract intelligence nodes */}
        <g stroke="url(#neural-gradient)" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M 0,180 C 350,120 600,280 1200,160 S 1800,240 2200,140" />
          <path d="M 100,420 C 420,380 720,520 1150,410 S 1680,360 2100,460" strokeDasharray="4 6" />
          <path d="M 250,50 C 500,140 850,80 1300,260 S 1750,180 2100,280" opacity="0.4" />
        </g>

        {/* Intelligence Nodes */}
        {[
          { cx: "350", cy: "140", label: "NODE: AGENT_ORCHESTRATOR" },
          { cx: "780", cy: "220", label: "DIM: 1536 VECTOR_RAG" },
          { cx: "1150", cy: "165", label: "STATEFUL_GRAPH: ACTIVE" },
          { cx: "620", cy: "480", label: "LATENCY: <12MS" },
          { cx: "1420", cy: "390", label: "HL7_FHIR: VERIFIED" },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="4" fill="#C8A96E" opacity="0.75" />
            <circle cx={node.cx} cy={node.cy} r="9" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <text
              x={Number(node.cx) + 14}
              y={Number(node.cy) + 4}
              fill="#8E887E"
              fontSize="9"
              fontFamily="var(--font-mono)"
              letterSpacing="1px"
              opacity="0.8"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default HeroNeuralTopology;
