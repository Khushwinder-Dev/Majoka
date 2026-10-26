import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lookupGeoIp, parseUserAgent } from "@/lib/trackHelpers";

export async function POST(req: NextRequest) {
  try {
    let payload: {
      path?: string;
      referrer?: string;
      timezone?: string;
      deviceType?: string;
      screenResolution?: string;
      language?: string;
    } = {};

    try {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        payload = await req.json();
      } else {
        const text = await req.text();
        if (text) {
          payload = JSON.parse(text);
        }
      }
    } catch {
      // Body parse fallback
      payload = {};
    }

    const path = (payload.path || "/").trim();

    // 1. Filter out static assets, admin routes, and api routes
    if (
      path.startsWith("/_next") ||
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.includes("favicon.ico") ||
      path.match(/\.(png|jpg|jpeg|webp|gif|svg|mp4|css|js|map|woff|woff2|ttf|ico)$/i)
    ) {
      return NextResponse.json({ skipped: true }, { status: 200 });
    }

    // 2. Extract client IP Address
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const xRealIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");

    let ip = "127.0.0.1";
    if (cfConnectingIp) {
      ip = cfConnectingIp.trim();
    } else if (xForwardedFor) {
      // x-forwarded-for can be comma separated list "client, proxy1, proxy2"
      const ips = xForwardedFor.split(",").map((s) => s.trim());
      ip = ips[0] || "127.0.0.1";
    } else if (xRealIp) {
      ip = xRealIp.trim();
    }

    // Strip IPv6-mapped IPv4 prefix if present
    ip = ip.replace(/^::ffff:/, "").trim();
    if (ip === "::1") ip = "127.0.0.1";

    // 3. Extract User-Agent & device details
    const userAgent = req.headers.get("user-agent") || "";
    const parsedUa = parseUserAgent(userAgent);
    const deviceType = payload.deviceType || parsedUa.deviceType;
    const browser = parsedUa.browser;
    const os = parsedUa.os;

    // 4. Geolocation & Timezone lookup
    const geo = await lookupGeoIp(ip, req.headers);
    const country = geo.country || "Unknown";
    const city = geo.city || "Unknown";
    const timezone = payload.timezone || geo.timezone || "Unknown";

    // 5. Database Storage & Aggregation
    const existing = await prisma.visitorLog.findUnique({
      where: { ip_address: ip },
    });

    if (existing) {
      await prisma.visitorLog.update({
        where: { ip_address: ip },
        data: {
          visit_count: { increment: 1 },
          last_visited_at: new Date(),
          path_visited: path,
          country: country !== "Unknown" ? country : existing.country,
          city: city !== "Unknown" ? city : existing.city,
          timezone: timezone !== "Unknown" ? timezone : existing.timezone,
          user_agent: userAgent || existing.user_agent,
          device_type: deviceType || existing.device_type,
          browser: browser !== "Unknown" ? browser : existing.browser,
          os: os !== "Unknown" ? os : existing.os,
        },
      });
    } else {
      await prisma.visitorLog.create({
        data: {
          ip_address: ip,
          country,
          city,
          timezone,
          user_agent: userAgent,
          device_type: deviceType,
          browser,
          os,
          path_visited: path,
          visit_count: 1,
          first_visited_at: new Date(),
          last_visited_at: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    // Return 200 even on error so tracking never disrupts the visitor's UX
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
