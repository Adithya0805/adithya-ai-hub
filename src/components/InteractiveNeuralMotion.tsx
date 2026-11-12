import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "@/data/projects";

export interface NeuralHubProject {
  id: string;
  name: string;
  outcome: string;
  href: string;
}

const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

const HUB_PROJECTS: NeuralHubProject[] = [
  {
    id: "mediaguard",
    name: "MediGuard V2",
    outcome:
      projectBySlug.get("mediaguard")?.impact?.split(".")[0] + "." ||
      "Processes full patient records end-to-end in <8s.",
    href: "/blog/how-i-built-mediaguard-multi-agent-ai-system",
  },
  {
    id: "urimai",
    name: "Urimai AI",
    outcome:
      "64 Tamil Nadu schemes & 199 rules evaluated via Tamil intake (49/49 tests).",
    href: "/work",
  },
  {
    id: "townrise",
    name: "TownRise AI",
    outcome:
      "Geospatial growth scoring across 50+ regional Tamil Nadu corridors.",
    href: "/blog/how-i-built-townrise-ai-real-estate-platform",
  },
  {
    id: "aranya",
    name: "Aranya",
    outcome:
      "Live A2 dairy storefront with <1.1s LCP, 100/100 SEO & Ask Farm AI.",
    href: "/blog/building-and-deploying-aranya-organic-dairy-farm-live-ai-engineer-guide",
  },
  {
    id: "sr-travels",
    name: "SR Travels",
    outcome:
      "Automated intercity fare calculator & WhatsApp booking dispatch.",
    href: "/work#sr-travels",
  },
  {
    id: "dino-leathers",
    name: "Dino Leathers",
    outcome:
      "Ambur D2C leather catalog with 1-click WhatsApp order checkout.",
    href: "/work#dino-leathers",
  },
];

// Spread 6 hub indices evenly across the Fibonacci sphere bands
const HUB_INDEX_RATIOS = [0.1, 0.26, 0.42, 0.58, 0.74, 0.9];

const INK_HEX = "#151515";
const GOLD_HEX = "#B8934A";
const CREAM_HEX = "#F7F3EC";

interface HubHitBox {
  hubIndex: number;
  x: number;
  y: number;
  z: number;
  r: number;
}

interface PulseSlot {
  edgeIdx: number;
  t: number;
  speed: number;
}

export function InteractiveNeuralMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardHoverRef = useRef(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState<{ left: number; top: number }>({ left: 16, top: 16 });
  const [sheetHub, setSheetHub] = useState<number | null>(null);

  const hoveredHubRef = useRef<number | null>(null);
  const sheetHubRef = useRef<number | null>(null);
  const requestRedrawRef = useRef<(() => void) | null>(null);

  const updateHoveredHub = useCallback((idx: number | null) => {
    hoveredHubRef.current = idx;
    setHoveredHub(idx);
    requestRedrawRef.current?.();
  }, []);

  const updateSheetHub = useCallback((idx: number | null) => {
    sheetHubRef.current = idx;
    setSheetHub(idx);
    requestRedrawRef.current?.();
  }, []);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const syncTouch = () => {
      setIsTouchDevice(coarseQuery.matches || navigator.maxTouchPoints > 0);
    };
    syncTouch();
    coarseQuery.addEventListener("change", syncTouch);
    return () => coarseQuery.removeEventListener("change", syncTouch);
  }, []);

  useEffect(() => {
    if (sheetHub === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") updateSheetHub(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetHub, updateSheetHub]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;

    let cssWidth = 0;
    let cssHeight = 0;
    let dpr = 1;
    let sphereRadius = 140;
    let nodeCount = 90;

    // Pre-allocated typed buffers sized to max 90 nodes & edges
    const MAX_NODES = 90;
    const MAX_EDGES = 480;
    const baseX = new Float32Array(MAX_NODES);
    const baseY = new Float32Array(MAX_NODES);
    const baseZ = new Float32Array(MAX_NODES);
    const nodeHubIdx = new Int8Array(MAX_NODES); // -1 for regular, 0..5 for hubs

    const projX = new Float32Array(MAX_NODES);
    const projY = new Float32Array(MAX_NODES);
    const projZ = new Float32Array(MAX_NODES);
    const projScale = new Float32Array(MAX_NODES);
    const projDepth = new Float32Array(MAX_NODES);
    const drawOrder = new Int32Array(MAX_NODES);

    const edgeA = new Uint16Array(MAX_EDGES);
    const edgeB = new Uint16Array(MAX_EDGES);
    let edgeCount = 0;

    const hubNodeIndices = new Int32Array(HUB_PROJECTS.length);
    const hubBoxes: HubHitBox[] = HUB_PROJECTS.map((_, i) => ({
      hubIndex: i,
      x: 0,
      y: 0,
      z: 0,
      r: 14,
    }));

    const PULSE_COUNT = 10;
    const pulses: PulseSlot[] = Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edgeIdx: i,
      t: (i * 0.17) % 1,
      speed: 0.0045 + (i % 4) * 0.0014,
    }));

    // Rotation & interaction state
    let autoYaw = 0.35;
    let tiltX = 0.14;
    let tiltY = 0;
    let targetTiltX = 0.14;
    let targetTiltY = 0;
    let dragYawOffset = 0;
    let dragPitchOffset = 0;

    let isDragging = false;
    let dragMoved = false;
    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let startPointerX = 0;
    let startPointerY = 0;

    let isInViewport = true;
    let isTabVisible = document.visibilityState !== "hidden";
    let rafId = 0;
    let isRunning = false;

    const buildGeometry = () => {
      const isMobile = window.innerWidth < 768;
      nodeCount = isMobile ? 45 : 90;
      sphereRadius = Math.min(cssWidth, cssHeight) * (isMobile ? 0.34 : 0.33);
      if (sphereRadius < 70) sphereRadius = 70;

      nodeHubIdx.fill(-1);
      for (let h = 0; h < HUB_PROJECTS.length; h++) {
        const idx = Math.min(
          nodeCount - 1,
          Math.max(0, Math.round(HUB_INDEX_RATIOS[h] * (nodeCount - 1)))
        );
        nodeHubIdx[idx] = h;
        hubNodeIndices[h] = idx;
      }

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < nodeCount; i++) {
        const y = 1 - (i / (nodeCount - 1)) * 2;
        const rAtY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = goldenAngle * i;
        // Deterministic subtle radial variation on non-hub nodes for organic 3D shape
        const radialScale =
          nodeHubIdx[i] >= 0 ? 1.03 : 0.92 + ((i * 37) % 17) * 0.01;
        baseX[i] = Math.cos(theta) * rAtY * sphereRadius * radialScale;
        baseY[i] = y * sphereRadius * radialScale;
        baseZ[i] = Math.sin(theta) * rAtY * sphereRadius * radialScale;
        drawOrder[i] = i;
      }

      // Precompute near-neighbour edges in 3D space (rotation-invariant)
      const neighborThreshold = sphereRadius * (isMobile ? 0.62 : 0.46);
      const threshSq = neighborThreshold * neighborThreshold;
      edgeCount = 0;

      for (let i = 0; i < nodeCount && edgeCount < MAX_EDGES; i++) {
        const ax = baseX[i];
        const ay = baseY[i];
        const az = baseZ[i];
        for (let j = i + 1; j < nodeCount && edgeCount < MAX_EDGES; j++) {
          const dx = ax - baseX[j];
          const dy = ay - baseY[j];
          const dz = az - baseZ[j];
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq <= threshSq) {
            edgeA[edgeCount] = i;
            edgeB[edgeCount] = j;
            edgeCount++;
          }
        }
      }

      // Assign initial valid edge indices to pulse pool
      if (edgeCount > 0) {
        for (let k = 0; k < PULSE_COUNT; k++) {
          pulses[k].edgeIdx = (k * 13) % edgeCount;
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      cssWidth = Math.max(240, rect.width);
      cssHeight = Math.max(240, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildGeometry();
    };

    const computeCardPosition = (hx: number, hy: number) => {
      const cardW = 248;
      const cardH = 128;
      const pad = 12;
      let left = hx + 18;
      if (left + cardW > cssWidth - pad) {
        left = hx - cardW - 18;
      }
      if (left < pad) {
        left = Math.max(pad, Math.min(cssWidth - cardW - pad, hx - cardW * 0.5));
      }
      let top = hy - cardH * 0.5;
      if (top < pad) top = pad;
      if (top + cardH > cssHeight - pad) top = Math.max(pad, cssHeight - cardH - pad);
      setCardPos({ left: Math.round(left), top: Math.round(top) });
    };

    const findHubAt = (x: number, y: number): number | null => {
      let bestIdx: number | null = null;
      let bestZ = Infinity;
      const hitRadius = 26;
      const hitRadiusSq = hitRadius * hitRadius;

      for (let i = 0; i < hubBoxes.length; i++) {
        const box = hubBoxes[i];
        const dx = x - box.x;
        const dy = y - box.y;
        if (dx * dx + dy * dy <= hitRadiusSq && box.z < bestZ) {
          bestZ = box.z;
          bestIdx = box.hubIndex;
        }
      }
      return bestIdx;
    };

    const renderFrame = (advanceTime: boolean) => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const activeFocusHub =
        hoveredHubRef.current !== null ? hoveredHubRef.current : sheetHubRef.current;

      if (advanceTime && !reducedMotion) {
        const rotRate = activeFocusHub !== null ? 0.0007 : 0.0024;
        autoYaw += rotRate;
      }

      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      const totalYaw = autoYaw + tiltY + dragYawOffset;
      const totalPitch = tiltX + dragPitchOffset;

      const cosY = Math.cos(totalYaw);
      const sinY = Math.sin(totalYaw);
      const cosX = Math.cos(totalPitch);
      const sinX = Math.sin(totalPitch);

      const cx = cssWidth * 0.5;
      const cy = cssHeight * 0.5;
      const fov = sphereRadius * 3.1;
      const zOffset = sphereRadius * 1.45;
      const invDiameter = 1 / (2 * sphereRadius);

      for (let i = 0; i < nodeCount; i++) {
        const bx = baseX[i];
        const by = baseY[i];
        const bz = baseZ[i];

        const x1 = bx * cosY - bz * sinY;
        const z1 = bz * cosY + bx * sinY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = z1 * cosX + by * sinX;

        const scale = fov / (fov + z2 + zOffset);
        projX[i] = cx + x1 * scale;
        projY[i] = cy + y2 * scale;
        projZ[i] = z2;
        projScale[i] = scale;

        let depth = (sphereRadius - z2) * invDiameter;
        if (depth < 0) depth = 0;
        else if (depth > 1) depth = 1;
        projDepth[i] = depth;
      }

      // Insertion sort drawOrder by z back-to-front (no allocation)
      for (let i = 1; i < nodeCount; i++) {
        const key = drawOrder[i];
        const keyZ = projZ[key];
        let j = i - 1;
        while (j >= 0 && projZ[drawOrder[j]] < keyZ) {
          drawOrder[j + 1] = drawOrder[j];
          j--;
        }
        drawOrder[j + 1] = key;
      }

      // Update hub hit boxes in place
      for (let h = 0; h < HUB_PROJECTS.length; h++) {
        const nIdx = hubNodeIndices[h];
        hubBoxes[h].x = projX[nIdx];
        hubBoxes[h].y = projY[nIdx];
        hubBoxes[h].z = projZ[nIdx];
        hubBoxes[h].r = 6 * projScale[nIdx];
      }

      // 1. Draw near-neighbour edges (ink at 10–18% opacity, dimmed when a hub is focused)
      ctx.strokeStyle = INK_HEX;
      ctx.lineWidth = 0.85;
      const edgeDim = activeFocusHub !== null ? 0.52 : 1;

      for (let e = 0; e < edgeCount; e++) {
        const a = edgeA[e];
        const b = edgeB[e];
        const avgDepth = (projDepth[a] + projDepth[b]) * 0.5;
        ctx.globalAlpha = (0.10 + avgDepth * 0.08) * edgeDim;
        ctx.beginPath();
        ctx.moveTo(projX[a], projY[a]);
        ctx.lineTo(projX[b], projY[b]);
        ctx.stroke();
      }

      // 2. Draw gold signal pulses along random edges (skipped under reduced-motion)
      if (!reducedMotion && edgeCount > 0) {
        for (let k = 0; k < PULSE_COUNT; k++) {
          const pulse = pulses[k];
          if (advanceTime) {
            pulse.t += pulse.speed;
            if (pulse.t >= 1) {
              pulse.t = 0;
              pulse.edgeIdx = Math.floor(Math.random() * edgeCount);
            }
          }
          const eIdx = pulse.edgeIdx < edgeCount ? pulse.edgeIdx : 0;
          const a = edgeA[eIdx];
          const b = edgeB[eIdx];
          const t = pulse.t;

          const px = projX[a] + (projX[b] - projX[a]) * t;
          const py = projY[a] + (projY[b] - projY[a]) * t;
          const tailT = t > 0.18 ? t - 0.18 : 0;
          const tx = projX[a] + (projX[b] - projX[a]) * tailT;
          const ty = projY[a] + (projY[b] - projY[a]) * tailT;

          const depth = projDepth[a] + (projDepth[b] - projDepth[a]) * t;
          const pulseAlpha = (0.35 + depth * 0.55) * (activeFocusHub !== null ? 0.45 : 1);

          ctx.strokeStyle = GOLD_HEX;
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = pulseAlpha * 0.65;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.fillStyle = GOLD_HEX;
          ctx.globalAlpha = pulseAlpha;
          ctx.beginPath();
          ctx.arc(px, py, 1.8 + depth * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw nodes back-to-front
      ctx.font = '500 11.5px "Inter", system-ui, sans-serif';
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";

      for (let orderIdx = 0; orderIdx < nodeCount; orderIdx++) {
        const i = drawOrder[orderIdx];
        const hubIdx = nodeHubIdx[i];
        const x = projX[i];
        const y = projY[i];
        const scale = projScale[i];
        const depth = projDepth[i];

        if (hubIdx < 0) {
          const r = (1.35 + depth * 1.65) * scale;
          const nodeAlpha = (0.18 + depth * 0.62) * (activeFocusHub !== null ? 0.45 : 1);
          ctx.fillStyle = INK_HEX;
          ctx.globalAlpha = nodeAlpha;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // Hub node
        const isFocused = activeFocusHub === hubIdx;
        const isDimmed = activeFocusHub !== null && !isFocused;
        const baseR = (isFocused ? 7.2 : 4.8 + depth * 1.4) * scale;
        const ringR = baseR + (isFocused ? 4.8 : 3.2);
        const hubAlpha = isDimmed ? 0.25 : isFocused ? 1 : 0.5 + depth * 0.5;

        // Soft cream backing ring so crossing edges don't clash with the hub
        ctx.fillStyle = CREAM_HEX;
        ctx.globalAlpha = isDimmed ? 0.35 : 0.92;
        ctx.beginPath();
        ctx.arc(x, y, ringR + 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Gold outer ring (decoration)
        ctx.strokeStyle = GOLD_HEX;
        ctx.lineWidth = isFocused ? 2.4 : 1.7;
        ctx.globalAlpha = isDimmed ? 0.28 : isFocused ? 1 : 0.68 + depth * 0.32;
        ctx.beginPath();
        ctx.arc(x, y, ringR, 0, Math.PI * 2);
        ctx.stroke();

        // Ink core dot
        ctx.fillStyle = INK_HEX;
        ctx.globalAlpha = hubAlpha;
        ctx.beginPath();
        ctx.arc(x, y, baseR, 0, Math.PI * 2);
        ctx.fill();

        // Label in high-contrast ink on cream halo
        const label = HUB_PROJECTS[hubIdx].name;
        const placeLeft = x > cx + sphereRadius * 0.45;
        const lx = placeLeft ? x - ringR - 7 : x + ringR + 7;
        ctx.textAlign = placeLeft ? "right" : "left";

        ctx.strokeStyle = CREAM_HEX;
        ctx.lineWidth = 3.5;
        ctx.globalAlpha = isDimmed ? 0.3 : 0.92;
        ctx.strokeText(label, lx, y);

        ctx.fillStyle = INK_HEX;
        ctx.globalAlpha = isDimmed ? 0.28 : isFocused ? 1 : 0.58 + depth * 0.42;
        ctx.fillText(label, lx, y);
      }

      ctx.globalAlpha = 1;
    };

    const stopLoop = () => {
      if (isRunning) {
        cancelAnimationFrame(rafId);
        isRunning = false;
      }
    };

    const tick = () => {
      if (!isRunning) return;
      renderFrame(true);
      if (!reducedMotion && isInViewport && isTabVisible) {
        rafId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    const syncLoopState = () => {
      if (reducedMotion || !isInViewport || !isTabVisible) {
        stopLoop();
        renderFrame(false);
        return;
      }
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    requestRedrawRef.current = () => {
      if (!isRunning) {
        renderFrame(false);
      }
    };

    // Pointer / mouse / touch handlers
    const getLocalCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        width: rect.width,
        height: rect.height,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      activePointerId = e.pointerId;
      isDragging = true;
      dragMoved = false;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        if (!isDragging || e.pointerId !== activePointerId) return;
        const dx = e.clientX - lastPointerX;
        const dy = e.clientY - lastPointerY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;

        if (
          Math.abs(e.clientX - startPointerX) > 6 ||
          Math.abs(e.clientY - startPointerY) > 6
        ) {
          dragMoved = true;
        }

        if (!reducedMotion) {
          dragYawOffset += dx * 0.008;
          dragPitchOffset = Math.max(
            -0.95,
            Math.min(0.95, dragPitchOffset + dy * 0.008)
          );
          if (!isRunning) renderFrame(false);
        }
        return;
      }

      // Desktop mouse tilt + hub hover
      const { x, y, width, height } = getLocalCoords(e.clientX, e.clientY);
      if (!reducedMotion && width > 0 && height > 0) {
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;
        targetTiltY = nx * 0.42;
        targetTiltX = 0.14 - ny * 0.34;
      }

      const hit = findHubAt(x, y);
      if (hit !== hoveredHubRef.current) {
        if (hit !== null) {
          computeCardPosition(hubBoxes[hit].x, hubBoxes[hit].y);
          canvas.style.cursor = "pointer";
          updateHoveredHub(hit);
        } else if (!cardHoverRef.current) {
          canvas.style.cursor = "grab";
          updateHoveredHub(null);
        }
      } else if (hit !== null) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "grab";
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        if (e.pointerId !== activePointerId) return;
        const wasTap = !dragMoved;
        isDragging = false;
        activePointerId = null;

        if (wasTap) {
          const { x, y } = getLocalCoords(e.clientX, e.clientY);
          const hit = findHubAt(x, y);
          updateSheetHub(hit);
        }
        return;
      }

      // Desktop click on hub toggles or locks focus briefly? Hover card already has "View case study" link.
    };

    const onMouseLeave = () => {
      targetTiltX = 0.14;
      targetTiltY = 0;
      if (!cardHoverRef.current) {
        canvas.style.cursor = "grab";
        updateHoveredHub(null);
      }
    };

    const onResize = () => {
      resize();
      renderFrame(false);
    };

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState !== "hidden";
      syncLoopState();
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      syncLoopState();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewport = Boolean(entry?.isIntersecting);
        syncLoopState();
      },
      { threshold: 0.05 }
    );

    resize();
    observer.observe(container);
    syncLoopState();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("mouseleave", onMouseLeave);
      requestRedrawRef.current = null;
    };
  }, [updateHoveredHub, updateSheetHub]);

  const activeDesktopProject = hoveredHub !== null ? HUB_PROJECTS[hoveredHub] : null;
  const activeSheetProject = sheetHub !== null ? HUB_PROJECTS[sheetHub] : null;

  return (
    <div
      ref={containerRef}
      className="interactive-motion-wrapper"
      style={{
        width: "100%",
        maxWidth: "540px",
        height: "460px",
        margin: "0 auto",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Decorative cream-warm radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184, 147, 74, 0.14) 0%, rgba(247, 243, 236, 0) 70%)",
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
          cursor: "grab",
        }}
      />

      {/* Screen-reader & keyboard accessible project list */}
      <nav aria-label="Featured AI and client projects" className="sr-only">
        <ul>
          {HUB_PROJECTS.map((project) => (
            <li key={project.id}>
              <Link to={project.href}>
                {project.name}: {project.outcome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Hover Mini Card */}
      {!isTouchDevice && activeDesktopProject && (
        <div
          onMouseEnter={() => {
            cardHoverRef.current = true;
          }}
          onMouseLeave={() => {
            cardHoverRef.current = false;
            updateHoveredHub(null);
          }}
          style={{
            position: "absolute",
            left: `${cardPos.left}px`,
            top: `${cardPos.top}px`,
            width: "248px",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "14px 16px",
            boxShadow: "0 14px 32px rgba(21, 21, 21, 0.12)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: INK_HEX,
                boxShadow: `0 0 0 2px ${GOLD_HEX}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "19px",
                lineHeight: "1.15",
                color: INK_HEX,
              }}
            >
              {activeDesktopProject.name}
            </span>
          </div>

          <p
            style={{
              fontSize: "12.5px",
              lineHeight: "1.45",
              color: "#4A453E",
              marginBottom: "10px",
            }}
          >
            {activeDesktopProject.outcome}
          </p>

          <Link
            to={activeDesktopProject.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: INK_HEX,
              textDecoration: "underline",
              textDecorationColor: GOLD_HEX,
              textUnderlineOffset: "4px",
            }}
          >
            <span>View case study</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      {/* Subtle device-aware interaction hint */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: 0,
          right: 0,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#6B665E",
            backgroundColor: "rgba(247, 243, 236, 0.9)",
            padding: "4px 12px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            letterSpacing: "0.2px",
          }}
        >
          {isTouchDevice
            ? "Drag to rotate · Tap a node to inspect"
            : "Move cursor to tilt · Hover a node to inspect"}
        </span>
      </div>

      {/* Mobile Touch Bottom Sheet */}
      {activeSheetProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeSheetProject.name}
          onClick={() => updateSheetHub(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(21, 21, 21, 0.36)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "18px",
              borderTopRightRadius: "18px",
              border: "1px solid var(--border)",
              padding: "20px 20px calc(24px + env(safe-area-inset-bottom, 0px))",
              boxShadow: "0 -12px 36px rgba(21, 21, 21, 0.16)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor: INK_HEX,
                    boxShadow: `0 0 0 2.5px ${GOLD_HEX}`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "24px",
                    lineHeight: "1.15",
                    color: INK_HEX,
                    margin: 0,
                  }}
                >
                  {activeSheetProject.name}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close project card"
                onClick={() => updateSheetHub(null)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  backgroundColor: CREAM_HEX,
                  color: INK_HEX,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.55",
                color: "#4A453E",
                marginBottom: "16px",
              }}
            >
              {activeSheetProject.outcome}
            </p>

            <Link
              to={activeSheetProject.href}
              onClick={() => updateSheetHub(null)}
              className="btn-ink"
              style={{
                width: "100%",
                padding: "12px 18px",
                fontSize: "14px",
              }}
            >
              <span>View case study</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveNeuralMotion;
