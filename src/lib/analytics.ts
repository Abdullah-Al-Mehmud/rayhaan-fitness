/**
 * Lightweight analytics event dispatcher supporting Google Analytics (gtag) and Meta Pixel (fbq).
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    try {
      // Google Analytics (gtag.js)
      const win = window as unknown as {
        gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
        fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
      };

      if (typeof win.gtag === "function") {
        win.gtag("event", eventName, params);
      }

      // Meta Pixel (fbq)
      if (typeof win.fbq === "function") {
        win.fbq("trackCustom", eventName, params);
      }

      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics Event] ${eventName}:`, params);
      }
    } catch (e) {
      console.warn("Analytics tracking error:", e);
    }
  }
}
