/**
 * Theme Mode Utility for Adithya AI Hub.
 * Manages switching between:
 * - "editorial": Warm Obsidian & Champagne Gold (thought leadership & reading)
 * - "studio": Cyber Graphite & Tensor Emerald (developer lab, high data-density, IDE feel)
 */

export type ThemeMode = "editorial" | "studio";

const THEME_STORAGE_KEY = "adithya_theme_mode";
const THEME_CHANGE_EVENT = "adithya_theme_mode_changed";

/**
 * Returns the currently active theme mode.
 */
export function getThemeMode(): ThemeMode {
  if (typeof window === "undefined" || !window.localStorage) {
    return "editorial";
  }

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "studio" || saved === "editorial") {
      return saved;
    }
  } catch {
    // Graceful fallback
  }

  return "editorial";
}

/**
 * Applies the selected theme mode to the document element and stores the preference.
 */
export function setThemeMode(mode: ThemeMode): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore storage errors
  }

  applyThemeToDOM(mode);

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { mode } }));
}

/**
 * Internal helper to set HTML attributes and classes.
 */
export function applyThemeToDOM(mode: ThemeMode): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.setAttribute("data-theme", mode);

  if (mode === "studio") {
    root.classList.add("theme-studio");
  } else {
    root.classList.remove("theme-studio");
  }
}

/**
 * Sets up a lightweight, RAF-throttled pointer tracking listener that updates
 * CSS custom properties `--mouse-x` and `--mouse-y` on the root document for ambient spotlight effects.
 */
export function initPointerSpotlight(): () => void {
  if (typeof window === "undefined") return () => {};

  // Skip on devices without fine pointer (touchscreens)
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return () => {};
  }

  let rafId: number | null = null;
  let latestX = -1000;
  let latestY = -1000;

  const onPointerMove = (e: PointerEvent) => {
    latestX = e.clientX;
    latestY = e.clientY;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", `${latestX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${latestY}px`);
        rafId = null;
      });
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

/**
 * Initializes the theme mode and background pointer tracking on initial page load.
 */
export function initThemeMode(): ThemeMode {
  const current = getThemeMode();
  applyThemeToDOM(current);
  initPointerSpotlight();
  return current;
}

/**
 * Subscribe to theme mode changes across components and storage events.
 */
export function subscribeToThemeMode(callback: (mode: ThemeMode) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    callback(getThemeMode());
  };

  window.addEventListener(THEME_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

