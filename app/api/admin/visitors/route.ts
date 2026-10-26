import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  try {
    // 1. Session verification
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!verifySessionToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please authenticate first." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const sortBy = searchParams.get("sortBy") || "last_visited_at";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
    const limit = Math.min(parseInt(searchParams.get("limit") || "500", 10), 1000);

    // 2. Fetch all visitor logs
    const allVisitors = await prisma.visitorLog.findMany({
      orderBy: {
        [sortBy === "visit_count" ? "visit_count" : "last_visited_at"]: sortOrder,
      },
      take: limit,
    });

    // 3. Compute Summary Statistics
    let totalVisits = 0;
    const countryCounts: Record<string, number> = {};
    const pathCounts: Record<string, number> = {};

    allVisitors.forEach((v) => {
      totalVisits += v.visit_count;

      const c = v.country || "Unknown";
      countryCounts[c] = (countryCounts[c] || 0) + v.visit_count;

      const p = v.path_visited || "/";
      pathCounts[p] = (pathCounts[p] || 0) + v.visit_count;
    });

    const uniqueVisitors = allVisitors.length;

    // Top Countries sorted descending
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top Paths sorted descending
    const topPaths = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 4. In-memory search filtering if query provided
    let filteredVisitors = allVisitors;
    if (search) {
      filteredVisitors = allVisitors.filter((v) => {
        const ip = v.ip_address.toLowerCase();
        const country = (v.country || "").toLowerCase();
        const city = (v.city || "").toLowerCase();
        const path = (v.path_visited || "").toLowerCase();
        const browser = (v.browser || "").toLowerCase();
        const os = (v.os || "").toLowerCase();

        return (
          ip.includes(search) ||
          country.includes(search) ||
          city.includes(search) ||
          path.includes(search) ||
          browser.includes(search) ||
          os.includes(search)
        );
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors,
        topCountries,
        topPaths,
      },
      visitors: filteredVisitors,
    });
  } catch (error) {
    console.error("Error fetching visitor analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
