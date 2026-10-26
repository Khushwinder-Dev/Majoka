export interface ParsedUA {
  browser: string;
  os: string;
  deviceType: string;
}

export function parseUserAgent(uaString: string | null | undefined): ParsedUA {
  if (!uaString) {
    return { browser: "Unknown", os: "Unknown", deviceType: "Desktop" };
  }

  const ua = uaString.toLowerCase();

  // OS detection
  let os = "Unknown";
  if (ua.includes("windows nt 10.0") || ua.includes("windows nt 11.0")) {
    os = "Windows 10/11";
  } else if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("android")) {
    os = "Android";
  } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    os = "iOS";
  } else if (ua.includes("mac os") || ua.includes("macintosh")) {
    os = "macOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  } else if (ua.includes("cros")) {
    os = "ChromeOS";
  }

  // Device type detection
  let deviceType = "Desktop";
  if (ua.includes("ipad") || ua.includes("tablet") || (ua.includes("android") && !ua.includes("mobile"))) {
    deviceType = "Tablet";
  } else if (
    ua.includes("mobile") ||
    ua.includes("iphone") ||
    ua.includes("ipod") ||
    ua.includes("android") ||
    ua.includes("blackberry") ||
    ua.includes("webos")
  ) {
    deviceType = "Mobile";
  }

  // Browser detection (order matters because many browsers include 'Chrome' or 'Safari' in their UA)
  let browser = "Unknown";
  if (ua.includes("edg/") || ua.includes("edge/")) {
    browser = "Edge";
  } else if (ua.includes("samsungbrowser")) {
    browser = "Samsung Internet";
  } else if (ua.includes("opr/") || ua.includes("opera/")) {
    browser = "Opera";
  } else if (ua.includes("chrome/") && !ua.includes("chromium/")) {
    browser = "Chrome";
  } else if (ua.includes("firefox/")) {
    browser = "Firefox";
  } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
    browser = "Safari";
  } else if (ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
    browser = "Bot/Crawler";
  }

  return { browser, os, deviceType };
}

export function isLocalOrPrivateIp(ip: string): boolean {
  if (!ip) return true;
  const clean = ip.trim();
  return (
    clean === "127.0.0.1" ||
    clean === "::1" ||
    clean === "localhost" ||
    clean.startsWith("192.168.") ||
    clean.startsWith("10.") ||
    clean.startsWith("172.16.") ||
    clean.startsWith("172.17.") ||
    clean.startsWith("172.18.") ||
    clean.startsWith("172.19.") ||
    clean.startsWith("172.2") ||
    clean.startsWith("172.30.") ||
    clean.startsWith("172.31.") ||
    clean.startsWith("fc00:") ||
    clean.startsWith("fe80:")
  );
}

export async function lookupGeoIp(
  ip: string,
  headers: Headers
): Promise<{ country: string; city: string; timezone: string }> {
  // Check common reverse proxy / CDN headers first (Vercel, Cloudflare, AWS CloudFront)
  const headerCountry =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("cloudfront-viewer-country") ||
    null;

  const headerCity =
    headers.get("x-vercel-ip-city") ||
    headers.get("cf-ipcity") ||
    headers.get("cloudfront-viewer-city") ||
    null;

  const headerTz =
    headers.get("x-vercel-ip-timezone") ||
    headers.get("cf-timezone") ||
    null;

  if (headerCountry) {
    return {
      country: headerCountry,
      city: headerCity ? decodeURIComponent(headerCity) : "Unknown",
      timezone: headerTz || "Unknown",
    };
  }

  if (isLocalOrPrivateIp(ip)) {
    return {
      country: "Local Network",
      city: "Localhost",
      timezone: "Local",
    };
  }

  // Fallback to free public IP lookup service with quick 2.5s timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city,timezone`, {
      signal: controller.signal,
      cache: "force-cache",
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "success") {
        return {
          country: data.country || "Unknown",
          city: data.city || "Unknown",
          timezone: data.timezone || "Unknown",
        };
      }
    }
  } catch {
    // Geo lookup timed out or failed; fallback gracefully
  }

  return {
    country: "Unknown",
    city: "Unknown",
    timezone: "Unknown",
  };
}
