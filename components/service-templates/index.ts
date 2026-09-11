/**
 * Service template exports + selector
 *
 * Currently all sub-services use TemplateDefault (matches approved design).
 * To assign a different template per sub-service, add its slug to
 * SUBSERVICE_TEMPLATE_OVERRIDE below.
 *
 * Template guide:
 *   default — Approved design: intro → sub block (apps + advantage) → why choose → gallery → CTA
 *   A       — Technical deep-dive (future: waterproofing)
 *   B       — Installation showcase (future: pools, electrical, plumbing)
 *   C       — Finishing & maintenance (future: plastering, painting, HVAC)
 */

export { default as TemplateDefault } from "./TemplateDefault";
export { default as TemplateA }       from "./TemplateA";
export { default as TemplateB }       from "./TemplateB";
export { default as TemplateC }       from "./TemplateC";

export type TemplateKey = "default" | "A" | "B" | "C";

/* ── Per sub-service slug overrides (leave empty until ready) ── */
const SUBSERVICE_TEMPLATE_OVERRIDE: Record<string, TemplateKey> = {
  // Example:
  // "grp-fiberglass": "A",
  // "pool-filtration-pumps": "B",
};

/* ── Per parent service slug defaults ─────────────────────────── */
const SERVICE_TEMPLATE_MAP: Record<string, TemplateKey> = {
  // All currently use default; swap when designs are ready:
  "waterproofing":               "default",
  "swimming-pools":              "default",
  "electrical-installations":    "default",
  "electrical":                  "default",
  "plumbing-sanitary":           "default",
  "plumbing":                    "default",
  "floor-wall-tiling":           "default",
  "tiling":                      "default",
  "plastering-block-works":      "default",
  "plastering":                  "default",
  "painting-contracting":        "default",
  "painting":                    "default",
  "false-ceiling-partitions":    "default",
  "false-ceilings":              "default",
  "hvac-air-conditioning":       "default",
  "hvac":                        "default",
  "carpentry-wood-flooring":     "default",
  "carpentry":                   "default",
  "building-cleaning-services":  "default",
  "cleaning":                    "default",
};

/**
 * Returns the template key for a given service + sub-service slug.
 * Sub-service override takes priority over parent service default.
 */
export function getTemplateKey(
  serviceSlug: string,
  subServiceSlug?: string
): TemplateKey {
  if (subServiceSlug && SUBSERVICE_TEMPLATE_OVERRIDE[subServiceSlug]) {
    return SUBSERVICE_TEMPLATE_OVERRIDE[subServiceSlug];
  }
  return SERVICE_TEMPLATE_MAP[serviceSlug.toLowerCase()] ?? "default";
}
