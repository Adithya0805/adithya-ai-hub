import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * InteractiveNeuralMotion
 * A high-prestige, luxury motion design canvas with clear mouse-following dynamics.
 * Replaces project cards with an interactive 3D mathematical neural lattice & kinetic particle field.
 */
export function InteractiveNeuralMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse coordinate state for UI readout
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    // Target and current rotation angles (for smooth mouse spring physics)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    // Pulse impulse from click
    let pulseRadius = 0;
    let pulseActive = false;

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", handleResize);

    // 3D Point cloud generation (Fibonacci Sphere algorithm)
    const numPoints = 64;
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
    }

    const points: Point3D[] = [];
    const sphereRadius = Math.min(width, height) * 0.32;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Subtle gold and warm charcoal accents
      const isGold = i % 4 === 0;
      const isEmerald = i === 12 || i === 36;
      const color = isGold ? "#C8A96E" : isEmerald ? "#059669" : "#151515";

      points.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        baseX: x * sphereRadius,
        baseY: y * sphereRadius,
        baseZ: z * sphereRadius,
        radius: isGold ? 3.5 : isEmerald ? 4 : 2.4,
        color,
      });
    }

    // Outer orbital rings
    const ringSegments = 40;
    const ringRadius = sphereRadius * 1.35;

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRotY = nx * 1.25; // Yaw
      targetRotX = -ny * 1.1; // Pitch

      setCoords({
        x: Math.round(nx * 100),
        y: Math.round(ny * 100),
      });
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => {
      setIsHovered(false);
      targetRotX = 0;
      targetRotY = 0;
      setCoords({ x: 0, y: 0 });
    };

    const onClick = () => {
      pulseActive = true;
      pulseRadius = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
      container.addEventListener("click", onClick);
    }

    // Animation loop
    let autoAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth spring interpolation
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      if (!shouldReduceMotion) {
        autoAngle += 0.004;
      }

      const cosY = Math.cos(currentRotY + autoAngle);
      const sinY = Math.sin(currentRotY + autoAngle);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D points
      interface ProjectedPoint {
        px: number;
        py: number;
        pz: number;
        scale: number;
        color: string;
        radius: number;
      }

      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotation around Y axis
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseZ * cosY + p.baseX * sinY;

        // Rotation around X axis
        let y1 = p.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.baseY * sinX;

        // Perspective projection
        const fov = 420 * window.devicePixelRatio;
        const scale = fov / (fov + z2 + sphereRadius * 1.5);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        projected.push({
          px,
          py,
          pz: z2,
          scale,
          color: p.color,
          radius: p.radius * scale,
        });
      }

      // Draw connecting vector lines between nearest points
      ctx.lineWidth = 0.8 * window.devicePixelRatio;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 72 * window.devicePixelRatio;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(200, 169, 110, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw interactive pulse ring if active
      if (pulseActive) {
        pulseRadius += 3.5 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        const pulseAlpha = Math.max(0, 1 - pulseRadius / (sphereRadius * 1.8));
        ctx.strokeStyle = `rgba(200, 169, 110, ${pulseAlpha * 0.6})`;
        ctx.lineWidth = 2 * window.devicePixelRatio;
        ctx.stroke();

        if (pulseAlpha <= 0) {
          pulseActive = false;
        }
      }

      // Sort points by Z depth so front points draw on top
      projected.sort((a, b) => a.pz - b.pz);

      // Render nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.2, (p.pz + sphereRadius) / (sphereRadius * 2));

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.2, p.radius), 0, Math.PI * 2);

        if (p.color === "#C8A96E") {
          ctx.fillStyle = `rgba(200, 169, 110, ${depthAlpha * 0.95})`;
          // Outer halo for gold nodes
          ctx.shadowColor = "rgba(200, 169, 110, 0.4)";
          ctx.shadowBlur = 6 * window.devicePixelRatio;
        } else if (p.color === "#059669") {
          ctx.fillStyle = `rgba(5, 150, 105, ${depthAlpha * 0.95})`;
          ctx.shadowColor = "rgba(5, 150, 105, 0.4)";
          ctx.shadowBlur = 8 * window.devicePixelRatio;
        } else {
          ctx.fillStyle = `rgba(21, 21, 21, ${depthAlpha * 0.85})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw elegant kinetic orbital boundary
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        sphereRadius * 1.18,
        sphereRadius * 0.52,
        currentRotY * 0.4 - 0.2,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(230, 223, 211, 0.75)";
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
        container.removeEventListener("click", onClick);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "520px",
        height: "460px",
        margin: "0 auto",
        position: "relative",
        cursor: "crosshair",
        userSelect: "none",
      }}
      className="interactive-motion-wrapper"
    >
      {/* Background radial warmth */}
      <div
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200, 169, 110, 0.16) 0%, rgba(247, 243, 236, 0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Interactive Motion Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "20px",
        }}
      />

      {/* Technical HUD Overlay: Real-time Mouse Follow Coordinates */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 6px rgba(21, 21, 21, 0.04)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isHovered ? "#059669" : "#C8A96E",
              transition: "background-color 0.2s ease",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: "700",
              color: "#151515",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {isHovered ? "NEURAL FIELD · ACTIVE DYNAMICS" : "KINETIC INTELLIGENCE LATTICE"}
          </span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "#6B665E",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "3px 8px",
            borderRadius: "4px",
            border: "1px solid var(--border)",
          }}
        >
          Δ {coords.x > 0 ? `+${coords.x}` : coords.x}° / {coords.y > 0 ? `+${coords.y}` : coords.y}°
        </div>
      </div>

      {/* Bottom Interactive Hint */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "0",
          right: "0",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10.5px",
            color: "#8C857B",
            backgroundColor: "rgba(247, 243, 236, 0.85)",
            backdropFilter: "blur(6px)",
            padding: "3px 12px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            letterSpacing: "0.5px",
          }}
        >
          Move cursor to tilt 3D field · Click for kinetic impulse
        </span>
      </div>
    </div>
  );
}

export default InteractiveNeuralMotion;
