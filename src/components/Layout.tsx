import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { ChatWidget } from "./ChatWidget";
import { getThemeMode, subscribeToThemeMode, ThemeMode } from "@/utils/themeMode";
import { Zap, ShieldCheck, Activity } from "lucide-react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getThemeMode());

  useEffect(() => {
    return subscribeToThemeMode((mode) => setThemeModeState(mode));
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-0)' }}>
      <Navbar />
      {/* push content below fixed navbar */}
      <main style={{ flex: 1, paddingTop: '56px', paddingBottom: themeMode === "studio" ? '28px' : 0 }}>
        {children}
      </main>

      {/* Professional Studio Mode Telemetry Ribbon */}
      {themeMode === "studio" && (
        <aside
          aria-label="Studio Mode System Telemetry"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "26px",
            background: "rgba(8, 9, 11, 0.94)",
            borderTop: "1px solid rgba(0, 245, 160, 0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            color: "var(--text-3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ color: "#00f5a0", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Zap size={11} /> STUDIO HUD
            </span>
            <span style={{ color: "var(--text-2)" }}>MODEL: GEMINI 2.5 FLASH</span>
            <span className="hidden sm:inline" style={{ color: "var(--text-3)" }}>QUOTA: 100% FREE TIER</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Activity size={11} /> 120ms
            </span>
            <span style={{ color: "#00f5a0", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheck size={11} /> VERIFIED ATS GROUNDING
            </span>
          </div>
        </aside>
      )}

      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  );
};
