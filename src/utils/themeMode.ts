/**
 * Theme Mode Utility for Adithya AI Hub.
 * Enforces the Warm Cream Light Editorial Theme across all pages.
 */

export type ThemeMode = "editorial";

const THEME_STORAGE_KEY = "adithya_theme_mode";

export function getThemeMode(): ThemeMode {
  return "editorial";
}

export function setThemeMode(mode: ThemeMode): void {
  // Always maintain editorial light theme
  applyThemeToDOM("editorial");
}

export function applyThemeToDOM(mode: ThemeMode = "editorial"): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.removeAttribute("data-theme");
  root.classList.remove("theme-studio");

  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function initThemeMode(): ThemeMode {
  applyThemeToDOM("editorial");
  return "editorial";
}

export function subscribeToThemeMode(callback: (mode: ThemeMode) => void): () => void {
  return () => {};
}
