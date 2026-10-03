"use client";

import React from "react";
import NavMenuSitemap from "@/components/sitemap/NavMenuSitemap";
import OldSitemap from "@/components/sitemap/OldSitemap";

/**
 * ==============================================================================
 * SITEMAP SECTION DISPLAY SWITCH
 * ==============================================================================
 * • Set `USE_NAV_MENU_SITEMAP = true`  -> Displays the 8 Header Nav Menu Groups
 *   (Services, Solutions, Projects, Industries, Subcontractors, Company, Careers, Contact)
 *   with all 6 inner megamenu links each (48 links total).
 *
 * • Set `USE_NAV_MENU_SITEMAP = false` -> Displays the Original Detailed Old Sitemap.
 * ==============================================================================
 */
const USE_NAV_MENU_SITEMAP = true;

export default function SitemapPage() {
  return (
    <div className="w-full min-h-screen">
      {/* ── Active Sitemap Section (Currently showing the 8 Nav Menu Groups) ── */}
      {USE_NAV_MENU_SITEMAP ? (
        <NavMenuSitemap />
      ) : (
        <OldSitemap />
      )}

      {/* ── OLD SITEMAP COMPONENT (KEPT & COMMENTED OUT AS REQUESTED) ──
          You can also switch directly in JSX by uncommenting <OldSitemap /> below
          and commenting out the <NavMenuSitemap /> section above.
      */}
      {/* <OldSitemap /> */}
    </div>
  );
}
