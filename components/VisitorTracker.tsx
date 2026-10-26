"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Skip tracking for admin and system routes
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Prevent duplicate track calls on the same path within the session
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    const sendTrackingData = () => {
      try {
        const clientData = {
          path: pathname,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          timezone:
            typeof Intl !== "undefined" && Intl.DateTimeFormat
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : "Unknown",
          language: typeof navigator !== "undefined" ? navigator.language : "en",
          screenResolution:
            typeof window !== "undefined"
              ? `${window.screen.width}x${window.screen.height}`
              : "Unknown",
          deviceType:
            typeof window !== "undefined"
              ? window.innerWidth < 768
                ? "Mobile"
                : window.innerWidth < 1024
                ? "Tablet"
                : "Desktop"
              : "Desktop",
        };

        const payloadStr = JSON.stringify(clientData);

        // Try sendBeacon first (best for background/non-blocking)
        if (
          typeof navigator !== "undefined" &&
          typeof navigator.sendBeacon === "function"
        ) {
          const blob = new Blob([payloadStr], { type: "application/json" });
          const sent = navigator.sendBeacon("/api/track", blob);
          if (sent) return;
        }

        // Fallback to fetch with keepalive
        fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payloadStr,
          keepalive: true,
        }).catch(() => {
          // Silent catch to prevent any user impact
        });
      } catch {
        // Silently ignore tracking errors
      }
    };

    // Small delay to ensure the page has mounted cleanly
    const timer = setTimeout(sendTrackingData, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
