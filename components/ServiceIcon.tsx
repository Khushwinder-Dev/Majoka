import React from "react";
import {
  ShieldCheck,
  Waves,
  Zap,
  Wrench,
  Grid3X3,
  Hammer,
  Paintbrush,
  PanelTop,
  Fan,
  Layers,
  Sparkles,
  Droplets,
  Flame,
  Snowflake,
  Wind,
  CheckCircle2,
  Box,
  LucideIcon,
} from "lucide-react";

interface ServiceIconProps {
  slug: string;
  active?: boolean;
  className?: string;
  size?: number;
}

// Map service slug to primary Lucide Icon
const SERVICE_ICONS: Record<string, LucideIcon> = {
  waterproofing: ShieldCheck,
  "swimming-pools": Waves,
  "electrical-installations": Zap,
  electrical: Zap,
  "plumbing-sanitary": Wrench,
  plumbing: Wrench,
  "floor-wall-tiling": Grid3X3,
  tiling: Grid3X3,
  "plastering-block-works": Hammer,
  plastering: Hammer,
  "painting-contracting": Paintbrush,
  painting: Paintbrush,
  "false-ceiling-partitions": PanelTop,
  "false-ceilings": PanelTop,
  "hvac-air-conditioning": Fan,
  hvac: Fan,
  "carpentry-wood-flooring": Layers,
  carpentry: Layers,
  "building-cleaning-services": Sparkles,
  cleaning: Sparkles,
};

// Map subservice slug to tailored Lucide Icon
const SUBSERVICE_ICONS: Record<string, LucideIcon> = {
  // Waterproofing
  "grp-fiberglass": Layers,
  "combo-system": ShieldCheck,
  "epoxy-floor-coating": Sparkles,
  "bitumen-membrane": Flame,
  "polyurea-coating": Droplets,
  "injection-waterproofing": Wrench,

  // Swimming Pools
  "structural-construction": Box,
  "filtration-pump-systems": Droplets,
  "advanced-waterproofing": ShieldCheck,
  "tile-mosaic-fixing": Grid3X3,
  "maintenance-repair": Wrench,

  // Electrical
  "panel-board-installation": Zap,
  "conduit-trunking": Layers,
  "db-box-installation": Box,
  "low-voltage-systems": ShieldCheck,
  "testing-commissioning": CheckCircle2,

  // Plumbing
  "water-supply-networks": Droplets,
  "drainage-sewage-systems": Wrench,
  "sanitary-ware-fixing": CheckCircle2,
  "pump-tank-installation": Box,

  // Tiling
  "ceramic-porcelain-installation": Grid3X3,
  "marble-granite-works": Sparkles,
  "kitchen-bathroom-tiling": Droplets,
  "exterior-wall-cladding": Layers,
  "grouting-surface-refinishing": Paintbrush,

  // Plastering
  "construction-block-works": Box,
  "internal-plastering": Hammer,
  "external-rendering": ShieldCheck,
  "decorative-plaster-finishes": Paintbrush,
  "plaster-repair-patching": Wrench,
  "leveling-surface-preparation": Layers,

  // Painting
  "interior-painting": Paintbrush,
  "exterior-painting": ShieldCheck,
  "decorative-painting": Sparkles,
  "furniture-painting-refinishing": Layers,
  "paint-repair-touch-ups": Wrench,
  "surface-preparation": Hammer,

  // False Ceilings
  "false-ceiling-installation": PanelTop,
  "light-partition-installation": Layers,
  "decorative-ceiling-design": Sparkles,
  "partition-customization-design": Box,
  "ceiling-partition-repair-maintenance": Wrench,
  "acoustic-solutions": Wind,

  // HVAC
  "ac-installation-repair": Snowflake,
  "ducting-ventilation-works": Wind,
  "air-filtration-systems": Fan,
  "preventive-maintenance": Wrench,

  // Carpentry
  "wood-flooring-parquet-installation": Layers,
  "custom-cabinetry-wardrobes": Box,
  "door-installation-repair": Hammer,
  "wooden-partitions-wall-paneling": PanelTop,

  // Cleaning
  "post-construction-cleaning": Hammer,
  "external-glass-facade-cleaning": Sparkles,
  "industrial-warehouse-cleaning": Box,
  "floor-deep-cleaning-polishing": Sparkles,
  "water-tank-cleaning-disinfection": Droplets,
};

export function ServiceIcon({ slug, active = false, className = "", size = 18 }: ServiceIconProps) {
  const normalizedSlug = slug.toLowerCase();
  const IconComponent = SERVICE_ICONS[normalizedSlug] || ShieldCheck;

  return (
    <IconComponent
      size={size}
      className={`flex-shrink-0 transition-colors duration-200 ${
        active ? "text-white" : "text-[#009e90]"
      } ${className}`}
    />
  );
}

export function SubServiceIcon({ slug, active = false, className = "", size = 15 }: ServiceIconProps) {
  const normalizedSlug = slug.toLowerCase();
  const IconComponent = SUBSERVICE_ICONS[normalizedSlug] || CheckCircle2;

  return (
    <IconComponent
      size={size}
      className={`flex-shrink-0 transition-colors duration-200 ${
        active ? "text-white" : "text-[#009e90]"
      } ${className}`}
    />
  );
}
