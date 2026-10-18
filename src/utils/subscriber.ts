/**
 * Centralized subscriber state management for Adithya AI Hub.
 * Remembers returning subscribers across sessions, tools, and newsletter campaigns.
 */

const SUBSCRIBED_KEY = "adithya_is_subscribed";
const SUBSCRIBER_EMAIL_KEY = "adithya_subscriber_email";
const SUBSCRIBERS_LIST_KEY = "adithya_subscribers";
const EVENT_NAME = "adithya_subscriber_updated";

/**
 * Returns true if the visitor has subscribed to the newsletter on this browser
 * or authenticated via a newsletter campaign link.
 */
export function isSubscriber(): boolean {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }

  try {
    if (localStorage.getItem(SUBSCRIBED_KEY) === "true") {
      return true;
    }

    const email = localStorage.getItem(SUBSCRIBER_EMAIL_KEY);
    if (email && email.includes("@")) {
      return true;
    }

    // Backwards-compatibility check for existing adithya_subscribers array
    const rawList = localStorage.getItem(SUBSCRIBERS_LIST_KEY);
    if (rawList) {
      const parsed = JSON.parse(rawList);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return true;
      }
    }
  } catch {
    // Graceful fallback if localStorage is disabled or restricted
  }

  return false;
}

/**
 * Retrieves the subscriber's saved email address if present.
 */
export function getSubscriberEmail(): string {
  if (typeof window === "undefined" || !window.localStorage) {
    return "";
  }
  try {
    const email = localStorage.getItem(SUBSCRIBER_EMAIL_KEY);
    if (email) return email.trim();

    const rawList = localStorage.getItem(SUBSCRIBERS_LIST_KEY);
    if (rawList) {
      const parsed = JSON.parse(rawList);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return String(parsed[parsed.length - 1] || "").trim();
      }
    }
  } catch {
    // Ignore error
  }
  return "";
}

/**
 * Saves a user as a verified subscriber in localStorage and dispatches a change event.
 */
export function saveSubscriber(email?: string): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    localStorage.setItem(SUBSCRIBED_KEY, "true");

    if (email && email.includes("@")) {
      const cleanEmail = email.trim().toLowerCase();
      localStorage.setItem(SUBSCRIBER_EMAIL_KEY, cleanEmail);

      // Backwards compatibility with adithya_subscribers list
      const existing = JSON.parse(localStorage.getItem(SUBSCRIBERS_LIST_KEY) || "[]");
      if (Array.isArray(existing) && !existing.includes(cleanEmail)) {
        existing.push(cleanEmail);
        localStorage.setItem(SUBSCRIBERS_LIST_KEY, JSON.stringify(existing));
      }
    }

    // Notify other components on this page
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { email: email || "" } }));
  } catch (e) {
    console.warn("Could not save subscriber state to localStorage", e);
  }
}

/**
 * Reads URL search parameters on page load.
 * Recognizes ?subscribed=true, ?ref=newsletter, or ?email=...
 * Automatically marks the user as subscribed and cleans up the URL without a reload.
 */
export function initSubscriberFromURL(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    const hasSubParam =
      params.get("subscribed") === "true" ||
      params.get("ref") === "newsletter" ||
      params.get("utm_source") === "brevo" ||
      params.get("utm_source") === "newsletter";
    const emailParam = params.get("email") || "";

    if (hasSubParam || (emailParam && emailParam.includes("@"))) {
      saveSubscriber(emailParam || undefined);

      // Clean the query parameters from URL bar without refreshing
      params.delete("subscribed");
      params.delete("ref");
      params.delete("utm_source");
      params.delete("email");

      const newQuery = params.toString();
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "") + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
      return true;
    }
  } catch {
    // Ignore error
  }

  return false;
}

/**
 * Subscribes to subscriber state updates across components.
 */
export function subscribeToSubscriberStatus(callback: (isSub: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    callback(isSubscriber());
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}
