import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";
import { Laptop, Smartphone, ExternalLink, Sparkles, MapPin, Fuel, Shield, MessageCircle, Check } from "lucide-react";

interface MockupProps {
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Laptop Screen Mockup for Aranya Organic Dairy Farm
 * Features real brand styling (Pasture Green & Vedic Gold), image-led layout, product cards, Ask Farm AI.
 */
export function AranyaLaptopMockup({ style }: MockupProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        borderRadius: "12px",
        backgroundColor: "#161616",
        border: "1px solid #E6DFD3",
        boxShadow: "0 20px 50px rgba(21, 21, 21, 0.16), 0 2px 8px rgba(21, 21, 21, 0.08)",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Browser Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          backgroundColor: "#F7F3EC",
          borderBottom: "1px solid #E6DFD3",
        }}
      >
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27c93f" }} />
        </div>
        <div
          style={{
            fontSize: "10.5px",
            color: "#6B665E",
            fontFamily: "var(--font-mono)",
            backgroundColor: "#FFFFFF",
            padding: "2px 14px",
            borderRadius: "4px",
            border: "1px solid #E6DFD3",
          }}
        >
          🔒 aranyaorganicdairyfarm.com
        </div>
        <div style={{ width: "24px" }} />
      </div>

      {/* Screen Inner Viewport (Image-led Aranya Farm Storefront) */}
      <div
        style={{
          backgroundColor: "#132A1C",
          color: "#F7F3EC",
          padding: "16px",
          height: "270px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Pasture Graphic Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 80% 20%, rgba(200, 169, 110, 0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Store Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "#132A1C" }}>
              A
            </span>
            <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "#F7F3EC" }}>
              ARANYA ORGANIC DAIRY
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px", fontSize: "9.5px", color: "#E6DFD3" }}>
            <span>A2 Milk</span>
            <span>Bilona Ghee</span>
            <span>Butter</span>
          </div>
        </div>

        {/* Hero Visual Area */}
        <div style={{ position: "relative", zIndex: 1, margin: "6px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", background: "rgba(200, 169, 110, 0.2)", borderRadius: "4px", marginBottom: "4px" }}>
            <Sparkles size={10} color="#C8A96E" />
            <span style={{ fontSize: "9px", color: "#C8A96E", fontWeight: "700" }}>Vedic Native Gir Cows · Shoolagiri</span>
          </div>
          <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "19px", color: "#FFFFFF", lineHeight: 1.15, margin: 0 }}>
            Pure Raw A2 Milk & Vedic Bilona Ghee
          </h4>
          <p style={{ fontSize: "10px", color: "#C5D1C8", margin: "4px 0 0", maxWidth: "300px" }}>
            Chilled to 4°C, clay-pot churned, zero preservatives. Serving 400+ homes daily.
          </p>
        </div>

        {/* 3 Visual Product Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", position: "relative", zIndex: 1 }}>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "8px 6px", textAlign: "center" }}>
            <div style={{ fontSize: "14px", marginBottom: "2px" }}>🥛</div>
            <div style={{ fontSize: "9.5px", fontWeight: "600", color: "#FFFFFF" }}>Raw A2 Milk</div>
            <div style={{ fontSize: "8.5px", color: "#C8A96E" }}>₹90 / L</div>
          </div>
          <div style={{ backgroundColor: "rgba(200, 169, 110, 0.15)", border: "1px solid rgba(200, 169, 110, 0.35)", borderRadius: "6px", padding: "8px 6px", textAlign: "center" }}>
            <div style={{ fontSize: "14px", marginBottom: "2px" }}>🍯</div>
            <div style={{ fontSize: "9.5px", fontWeight: "600", color: "#FFFFFF" }}>Bilona Ghee</div>
            <div style={{ fontSize: "8.5px", color: "#C8A96E" }}>₹1,450</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "6px", padding: "8px 6px", textAlign: "center" }}>
            <div style={{ fontSize: "14px", marginBottom: "2px" }}>🧈</div>
            <div style={{ fontSize: "9.5px", fontWeight: "600", color: "#FFFFFF" }}>Desi Butter</div>
            <div style={{ fontSize: "8.5px", color: "#C8A96E" }}>₹380</div>
          </div>
        </div>

        {/* Ask Farm AI Interactive Banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 10px",
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            border: "1px solid rgba(200, 169, 110, 0.25)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "9.5px", color: "#F7F3EC" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
            <span>Ask Farm AI: "Do you deliver to Krishnagiri?" &rarr; "Yes, daily at 6 AM."</span>
          </div>
          <span style={{ fontSize: "8.5px", color: "#C8A96E", fontWeight: "600" }}>Live RAG</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile Phone Mockup for SR Travels
 * Deep Navy & Gold theme with dynamic fare engine, fuel tracker, and WhatsApp CTA.
 */
export function TravelsPhoneMockup({ style }: MockupProps) {
  return (
    <div
      style={{
        width: "195px",
        borderRadius: "24px",
        backgroundColor: "#161616",
        border: "1px solid #E6DFD3",
        boxShadow: "0 22px 55px rgba(21, 21, 21, 0.18), 0 4px 12px rgba(21, 21, 21, 0.06)",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Phone Notch */}
      <div
        style={{
          height: "18px",
          backgroundColor: "#0A192F",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2px",
        }}
      >
        <div style={{ width: "42px", height: "4px", borderRadius: "8px", backgroundColor: "#1E293B" }} />
      </div>

      {/* Screen Area */}
      <div
        style={{
          backgroundColor: "#0C1E36",
          color: "#F7F3EC",
          padding: "12px 10px",
          height: "275px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Header */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "#E5B842", fontWeight: "700" }}>
              SR TRAVELS
            </span>
            <span style={{ fontSize: "8px", color: "#4ade80", display: "inline-flex", alignItems: "center", gap: "3px" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80" }} /> Live
            </span>
          </div>

          {/* Route Selector */}
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(229, 184, 66, 0.25)", borderRadius: "6px", padding: "6px 8px", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9px", color: "#FFFFFF", marginBottom: "3px" }}>
              <MapPin size={10} color="#E5B842" /> Chennai &rarr; Bangalore
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "8px", color: "#94A3B8" }}>
              <Fuel size={9} color="#E5B842" /> Petrol: ₹100.85 · Diesel: ₹92.40
            </div>
          </div>

          {/* Vehicle Picker */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
            <div style={{ flex: 1, backgroundColor: "rgba(229, 184, 66, 0.18)", border: "1px solid #E5B842", borderRadius: "5px", padding: "5px 4px", textAlign: "center" }}>
              <div style={{ fontSize: "11px" }}>🚗</div>
              <div style={{ fontSize: "8.5px", fontWeight: "700", color: "#FFFFFF" }}>Sedan</div>
              <div style={{ fontSize: "7.5px", color: "#E5B842" }}>₹14 / km</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "5px", padding: "5px 4px", textAlign: "center" }}>
              <div style={{ fontSize: "11px" }}>🚙</div>
              <div style={{ fontSize: "8.5px", fontWeight: "700", color: "#FFFFFF" }}>SUV</div>
              <div style={{ fontSize: "7.5px", color: "#94A3B8" }}>₹20 / km</div>
            </div>
          </div>
        </div>

        {/* Fare Summary & CTA */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", padding: "0 2px" }}>
            <span style={{ fontSize: "8.5px", color: "#94A3B8" }}>Estimated Fare</span>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#E5B842" }}>₹3,450</span>
          </div>
          <div
            style={{
              backgroundColor: "#25D366",
              color: "#052e16",
              fontSize: "9px",
              fontWeight: "700",
              padding: "7px",
              borderRadius: "5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <MessageCircle size={10} /> Instant WhatsApp Booking
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile Phone Mockup for Dino Leathers
 * Saddle Leather Cognac & Tan theme with artisanal product showcase and 1-click checkout.
 */
export function LeathersPhoneMockup({ style }: MockupProps) {
  return (
    <div
      style={{
        width: "190px",
        borderRadius: "24px",
        backgroundColor: "#161616",
        border: "1px solid #E6DFD3",
        boxShadow: "0 22px 55px rgba(21, 21, 21, 0.18), 0 4px 12px rgba(21, 21, 21, 0.06)",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Phone Notch */}
      <div
        style={{
          height: "18px",
          backgroundColor: "#2E180B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2px",
        }}
      >
        <div style={{ width: "42px", height: "4px", borderRadius: "8px", backgroundColor: "#3D2314" }} />
      </div>

      {/* Screen Area */}
      <div
        style={{
          backgroundColor: "#3D2314",
          color: "#F7F3EC",
          padding: "12px 10px",
          height: "275px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Brand Header */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", color: "#D4A373", letterSpacing: "1px", fontWeight: "700" }}>
              DINO LEATHERS
            </span>
            <span style={{ fontSize: "7.5px", color: "#D4A373", border: "1px solid rgba(212, 163, 115, 0.4)", padding: "1px 4px", borderRadius: "3px" }}>
              Ambur Artisanal
            </span>
          </div>

          {/* Product Showcase Card */}
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(212, 163, 115, 0.25)", borderRadius: "6px", padding: "8px", marginBottom: "8px" }}>
            <div style={{ fontSize: "20px", textAlign: "center", marginBottom: "4px" }}>
              💼
            </div>
            <div style={{ fontSize: "10px", fontWeight: "600", color: "#FFFFFF", textAlign: "center" }}>
              Classic Bifold Wallet
            </div>
            <div style={{ fontSize: "8px", color: "#D4A373", textAlign: "center", marginTop: "1px" }}>
              Full-Grain Pull-Up Leather
            </div>
          </div>

          {/* Monogram Emboss Feature */}
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)", borderRadius: "5px", padding: "5px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontSize: "8px", color: "#D4A373" }}>Custom Initials</span>
            <span style={{ fontSize: "8px", color: "#FFFFFF", fontFamily: "var(--font-mono)", border: "1px solid #D4A373", padding: "1px 5px", borderRadius: "3px" }}>
              [ A · K ]
            </span>
          </div>
        </div>

        {/* Price & Checkout CTA */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", padding: "0 2px" }}>
            <span style={{ fontSize: "8.5px", color: "#C5B2A3" }}>Direct Workshop</span>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#D4A373" }}>₹1,299</span>
          </div>
          <div
            style={{
              backgroundColor: "#25D366",
              color: "#052e16",
              fontSize: "9px",
              fontWeight: "700",
              padding: "7px",
              borderRadius: "5px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <MessageCircle size={10} /> 1-Click WhatsApp Order
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3-Layer Parallax Mockup Cluster for the Hero Section
 * Desktop: Parallax follows cursor (±12–24px by layer) + scroll drift at different rates.
 * Mobile: Static fanned stack with gentle scroll offset.
 * Reduced-motion: Static layout.
 */
export function HeroMockupCluster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse position values (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor parallax
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Scroll offset transforms
  const { scrollY } = useScroll();
  const laptopScrollY = useTransform(scrollY, [0, 600], [0, 40]);
  const travelsScrollY = useTransform(scrollY, [0, 600], [0, 75]);
  const leathersScrollY = useTransform(scrollY, [0, 600], [0, 110]);

  // Cursor transforms by layer (Laptop moves slowest, front phone fastest)
  // Layer 1: Laptop (slowest, ~±10px)
  const laptopX = useTransform(springX, [-1, 1], [-10, 10]);
  const laptopY = useTransform(springY, [-1, 1], [-8, 8]);

  // Layer 2: SR Travels Phone (middle, ~±16px)
  const travelsX = useTransform(springX, [-1, 1], [-16, 16]);
  const travelsY = useTransform(springY, [-1, 1], [-14, 14]);

  // Layer 3: Dino Leathers Phone (front, fastest, ~±24px)
  const leathersX = useTransform(springX, [-1, 1], [-24, 24]);
  const leathersY = useTransform(springY, [-1, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "540px",
        height: "420px",
        margin: "0 auto",
      }}
      className="mockup-cluster-stage"
    >
      {/* ── Layer 1: Laptop (Aranya Organic Dairy) - Back Layer ── */}
      <motion.div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "82%",
          zIndex: 1,
          x: shouldReduceMotion ? 0 : laptopX,
          y: shouldReduceMotion ? 0 : laptopScrollY,
        }}
        className="laptop-layer"
      >
        <AranyaLaptopMockup />
      </motion.div>

      {/* ── Layer 2: Phone 1 (SR Travels) - Middle Layer ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "15px",
          zIndex: 2,
          x: shouldReduceMotion ? 0 : travelsX,
          y: shouldReduceMotion ? 0 : travelsScrollY,
        }}
        className="travels-phone-layer"
      >
        <TravelsPhoneMockup />
      </motion.div>

      {/* ── Layer 3: Phone 2 (Dino Leathers) - Front Layer ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 3,
          x: shouldReduceMotion ? 0 : leathersX,
          y: shouldReduceMotion ? 0 : leathersScrollY,
        }}
        className="leathers-phone-layer"
      >
        <LeathersPhoneMockup />
      </motion.div>
    </div>
  );
}
