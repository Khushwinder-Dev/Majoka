export interface ProductReview {
  id: string;
  author: string;
  initials: string;
  date: string;
  rating: number;
  verified: boolean;
  comment: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductDetailItem {
  id: number;
  name: string;
  longName: string;
  category: string;
  subcategory?: string;
  categoryPath?: string[];
  image: string;
  additionalImages?: string[];
  description: string;
  longDescription?: string[];
  overviewTitle?: string;
  overviewContent?: string[];
  rating: number;
  reviewsCount: number;
  price?: string;
  specifications: {
    column1: ProductSpecification[];
    column2: ProductSpecification[];
  };
  ratingBreakdown: {
    stars: number;
    count: number;
    percentage: number;
  }[];
  reviews: ProductReview[];
}

const defaultReviews: ProductReview[] = [
  {
    id: "rev-1",
    author: "Ahmed Al Mansoori",
    initials: "AM",
    date: "June 2026",
    rating: 5,
    verified: true,
    comment:
      "Exceptional build quality and finish. Ideal for commercial projects in UAE weather.",
  },
  {
    id: "rev-2",
    author: "Rashid Khan",
    initials: "RK",
    date: "May 2026",
    rating: 5,
    verified: true,
    comment:
      "Reliable FRP quality with excellent corrosion resistance and clean dimensions.",
  },
  {
    id: "rev-3",
    author: "Saeed Al Zaabi",
    initials: "SZ",
    date: "April 2026",
    rating: 4,
    verified: true,
    comment:
      "High standard specifications, easy installation and prompt customer support.",
  },
];

const defaultRatingBreakdown = [
  { stars: 5, count: 85, percentage: 80 },
  { stars: 4, count: 15, percentage: 15 },
  { stars: 3, count: 3, percentage: 3 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

const rawProducts = [
  {
    id: 1,
    name: "Stainless Steel Wall Ladder",
    longName: "Vertical Wall Mounted Access Ladder",
    description:
      "Strong and corrosion-resistant stainless steel wall ladder designed for safe vertical access to elevated areas, walls, tanks and industrial structures.",
  },
  {
    id: 2,
    name: "Stainless Steel Swimming Pool Ladder",
    longName: "Stainless Style Swimming Pool Access Ladder",
    description:
      "Durable and corrosion-resistant stainless steel swimming pool ladder designed to provide safe and convenient entry and exit from swimming pools. ",
  },
  {
    id: 3,
    name: "Safety Cage Ladder",
    longName: "Vertical Industrial Safety Cage Ladder",
    description:
      "Heavy-duty safety cage ladder designed for secure vertical access to industrial platforms, tanks, buildings and elevated structures.",
  },
  {
    id: 4,
    name: "Access Cover",
    longName: "Reinforced FRP Square Access Cover",
    description:
      "Reinforced access cover designed to protect utility openings, inspection points, drainage systems and underground access areas.",
  },
  {
    id: 5,
    name: "Grp/fiberglass catch basin bucket",
    longName: "Molded Drainage Pipe Fitting",
    description:
      "Durable GRP/fiberglass catch basin bucket designed for drainage systems and effective collection and management of surface water and wastewater.",
  },
  {
    id: 6,
    name: "Rectangular Tank",
    longName: "Rectangular Industrial Storage Tank",
    description:
      "Strong and durable rectangular tank suitable for water, chemical, wastewater and industrial liquid storage applications.",
  },
  {
    id: 7,
    name: "Grp/fiberglass planter box",
    longName: "White FRP Rectangular Bathtub",
    description:
      "Smooth and durable GRP/fiberglass planter box suitable for indoor and outdoor plants, flowers, gardens, terraces and commercial landscaping.",
  },
  {
    id: 8,
    name: "Bathtub",
    longName: "Molded FRP Bathroom Bathtub",
    description:
      "High-quality molded bathtub offering a smooth, durable and easy-to-maintain surface for residential, hotel and commercial bathroom applications.",
  },
  {
    id: 9,
    name: "Bathroom Tub",
    longName: "Freestanding FRP Bathroom Tub",
    description:
      "Durable bathroom tub designed for residential and commercial bathroom installations with a smooth molded finish.",
  },
  {
    id: 10,
    name: "Wall Access Ladder",
    longName: "Wall Mounted Maintenance Access Ladder",
    description:
      "Lightweight and durable wall access ladder designed for safe vertical access and maintenance of walls, tanks and elevated areas.",
  },
  // {
  //   id: 11,
  //   name: "Grp/fiberglass catch basin bucket",
  //   longName: "FRP Drainage Pipe Connection Fitting",
  //   description:
  //     "Molded FRP drainage fitting designed for connecting and directing drainage pipelines with excellent corrosion resistance.",
  // },
  // {
  //   id: 12,
  //   name: "Steel stainless swimming pools ladder",
  //   longName: "Swimming Pool Safety Access Ladder",
  //   description:
  //     "Durable swimming pool ladder designed to provide safe access in and out of residential and commercial swimming pools.",
  // },
  {
    id: 13,
    name: "Shower Tray",
    longName: "Molded Rectangular FRP Shower Tray",
    description:
      "Molded shower tray designed for bathroom floor installation with an integrated drainage area and easy-to-clean surface.",
  },
  {
    id: 14,
    name: "Grp/fiberglass Catch basin bucket",
    longName: "FRP Drainage Pipe and Chamber Fitting",
    description:
      "FRP drainage fitting designed for reliable connection of drainage pipes and water management systems.",
  },
  {
    id: 15,
    name: "Boat",
    longName: "Fiberglass Reinforced Plastic Boat",
    description:
      "Lightweight and strong boat suitable for recreational boating, fishing, transportation and general marine applications.",
  },
  {
    id: 16,
    name: "Playground Equipment",
    longName: "Outdoor Children's Playground Equipment",
    description:
      "Durable playground equipment designed for children in parks, schools, residential communities and recreational areas.",
  },
  {
    id: 17,
    name: "Grp/fiberglass sealing plate for manhole cover",
    longName: "Reinforced Molded FRP Access Cover",
    description:
      "Strong GRP/fiberglass sealing plate designed to provide secure protection and sealing for manhole covers, inspection openings and utility access points.",
  },
  {
    id: 18,
    name: "Pipe Bend",
    longName: "Fiberglass Reinforced Pipe Bend",
    description:
      "Corrosion-resistant pipe bend designed to change pipeline direction while maintaining reliable fluid flow and structural strength.",
  },
  {
    id: 19,
    name: "Car Parking Canopy",
    longName: "Outdoor Vehicle Parking Shade Canopy",
    description:
      "Durable car parking canopy designed to provide shade and weather protection for vehicles in residential, commercial and parking areas.",
  },
  {
    id: 20,
    name: "Parking shed",
    longName: "Residential Outdoor Carport Structure",
    description:
      "Durable parking shed designed to provide covered vehicle parking and protection from sun and weather conditions.",
  },
  {
    id: 21,
    name: "Shower Tray Mold",
    longName: "Molded Shower Tray Manufacturing Mold",
    description:
      "Specialized shower tray mold designed for manufacturing molded shower trays with consistent shape, dimensions and surface finish.",
  },
  // {
  //   id: 22,
  //   name: "Shower Tray Mold",
  //   longName: "Custom FRP Shower Tray Mould",
  //   description:
  //     "Specialized shower tray mold designed for manufacturing molded shower trays with consistent shape, dimensions and surface finish.",
  // },
  {
    id: 23,
    name: "Grating",
    longName: "Fiberglass Reinforced Industrial Grating",
    description:
      "Lightweight and corrosion-resistant grating suitable for industrial platforms, walkways, drainage areas, flooring and access applications.",
  },
  {
    id: 24,
    name: "Grp/fiberglass Shower Trey 1mx600",
    longName: "White Rectangular Shower Tray",
    description:
      "White GRP/fiberglass shower tray measuring 1m × 600mm, designed for residential, hotel and commercial bathroom installations.",
  },
  // {
  //   id: 25,
  //   name: "Grp/fiberglass ladder for water tank",
  //   longName: "Multi Purpose Industrial Access Ladder",
  //   description:
  //     "Heavy-duty GRP/fiberglass ladder designed for safe access to water tanks, maintenance areas, construction sites and industrial facilities.",
  // },
  {
    id: 26,
    name: "Grp/fiberglass  ladder for water tank",
    longName: "Heavy Duty FRP Step Ladder",
    description:
      "Heavy-duty FRP step ladder designed for maintenance, construction and industrial working-at-height applications.",
  },
  {
    id: 27,
    name: "Cylindrical Tank",
    longName: "Cylindrical FRP Industrial Storage Tank",
    description:
      "Corrosion-resistant cylindrical tank suitable for water, chemical, wastewater and industrial liquid storage applications.",
  },
  {
    id: 28,
    name: "Grp/fiberglass sheets",
    longName: "Corrugated FRP Roofing Sheet",
    description:
      "Lightweight and durable GRP/fiberglass sheets suitable for roofing, cladding, construction and industrial applications.",
  },
  {
    id: 29,
    name: "Grp/fiberglass  Manhole cover",
    longName: "Reinforced Utility Access Cover",
    description:
      "Reinforced GRP/fiberglass manhole cover designed to protect inspection chambers, drainage systems, utility openings and service areas.",
  },
  {
    id: 30,
    name: "Grp/fiberglass baby slide ( playground )",
    longName: "Outdoor Children's Playground Set",
    description:
      "Durable GRP/fiberglass baby slide designed for children's playgrounds in parks, schools, residential communities and recreational areas.",
  },
  {
    id: 31,
    name: "FRP Pipe",
    longName: "Fiberglass Reinforced Plastic Industrial Pipe",
    description:
      "Strong and corrosion-resistant FRP pipe suitable for water, drainage, wastewater and industrial piping applications.",
  },
  {
    id: 32,
    name: "Water Tank",
    longName: "Large FRP Water Storage Tank",
    description:
      "Large-capacity water tank designed for residential, commercial and industrial water storage requirements.",
  },
  {
    id: 33,
    name: "Planter",
    longName: "Decorative FRP Planter Pot",
    description:
      "Modern decorative planter suitable for gardens, entrances, terraces, balconies and commercial landscaping applications.",
  },
  {
    id: 34,
    name: "Profile Sheet",
    longName: "FRP Structural Roofing and Profile Sheet",
    description:
      "Durable profile sheet designed for roofing, cladding, construction and industrial applications.",
  },
  {
    id: 35,
    name: "Grp/fiberglass Planter",
    longName: "Outdoor Decorative Planter Set",
    description:
      "Stylish and durable GRP/fiberglass planter suitable for indoor and outdoor plants, flowers, gardens and landscaping applications.",
  },
  {
    id: 36,
    name: "Grp/fiberglass Shower Trey 600x600 800x800",
    longName: "Molded FRP Shower Base",
    description:
      "Molded GRP/fiberglass shower tray available in 600 × 600mm and 800 × 800mm sizes, designed for residential, hotel and commercial bathroom installations.",
  },
  {
    id: 37,
    name: "Translucent Sheet",
    longName: "Translucent FRP Roofing Sheet",
    description:
      "Lightweight translucent sheet designed to allow natural light while providing durable weather protection for buildings and industrial structures.",
  },
  // {
  //   id: 38,
  //   name: "Car Parking Canopy",
  //   longName: "Outdoor Car Parking Shade Structure",
  //   description:
  //     "Modern vehicle parking canopy designed to provide shade and weather protection for cars in residential and commercial areas.",
  // },
  {
    id: 39,
    name: "Industrial Tank",
    longName: "Industrial FRP Storage Tank with Piping",
    description:
      "Heavy-duty industrial tank with piping arrangement designed for liquid storage and industrial processing applications.",
  },
  // {
  //   id: 40,
  //   name: "Access Cover",
  //   longName: "Molded Reinforced Access Cover",
  //   description:
  //     "Durable molded FRP access cover suitable for inspection openings, drainage systems, tanks and utility installations.",
  // },
  {
    id: 41,
    name: "Structural Profile",
    longName: "FRP Structural U Channel Profile",
    description:
      "Strong and lightweight U-channel structural profile suitable for construction, structural supports, framing and industrial fabrication.",
  },
  {
    id: 42,
    name: "Portable Toilet",
    longName: "Portable FRP Toilet Cabin",
    description:
      "Durable portable toilet cabin suitable for construction sites, events, temporary facilities, public areas and outdoor applications.",
  },
  {
    id: 43,
    name: "Cylindrical Water Tank",
    longName: "Horizontal Cylindrical FRP Storage Tank",
    description:
      "Corrosion-resistant horizontal cylindrical water tank designed for water storage in residential, commercial and industrial applications.",
  },
  {
    id: 44,
    name: "Step Ladder",
    longName: "Heavy Duty Maintenance Step Ladder",
    description:
      "Strong and lightweight step ladder designed for maintenance, construction, industrial access and general working-at-height applications.",
  },
  {
    id: 45,
    name: "Pergola",
    longName: "Modern FRP Outdoor Pergola Structure",
    description:
      "Modern outdoor pergola structure designed to provide shade and enhance gardens, patios, terraces and outdoor living spaces.",
  },
  // {
  //   id: 46,
  //   name: "Pergola",
  //   longName: "Modern FRP Garden and Patio Pergola",
  //   description:
  //     "Contemporary FRP pergola structure suitable for residential gardens, patios, resorts and commercial outdoor areas.",
  // },
  // {
  //   id: 47,
  //   name: "Pergola",
  //   longName: "Outdoor Architectural Canopy Structure",
  //   description:
  //     "Modern outdoor FRP canopy structure designed to provide shade while enhancing the architectural appearance of outdoor spaces.",
  // },
  {
    id: 48,
    name: "Outdoor Canopy",
    longName: "Modern FRP Outdoor Patio Shade Structure",
    description:
      "Stylish outdoor canopy designed to create a comfortable shaded area for residential, commercial, hospitality and recreational applications.",
  },
  // {
  //   id: 49,
  //   name: "Steel stainless safety ladder",
  //   longName: "Vertical Safety Access Ladder with Cage",
  //   description:
  //     "Corrosion-resistant stainless steel safety ladder with protective cage designed for secure vertical access to tanks, buildings, platforms and elevated structures.",
  // },
  // {
  //   id: 50,
  //   name: "Steel stainless ladder swimming pools",
  //   longName: "Swimming Pool Entry and Exit Ladder",
  //   description:
  //     "Durable FRP swimming pool ladder designed for safe and convenient pool entry and exit in residential and commercial swimming facilities.",
  // },
  {
    id: 51,
    name: "Grp/fiberglass Shower Trey 1mx800",
    longName: "White Rectangular Shower Tray",
    description:
      "White GRP/fiberglass shower tray measuring 1m × 800mm, designed for residential, hotel and commercial bathroom installations.",
  }
];

export const allProductsData: ProductDetailItem[] = rawProducts.map((p, idx) => {
  const image = `/media/Updated_Product_Images/${String(p.id).padStart(2, "0")}_${p.name}.jpeg`;

  return {
    id: p.id,
    name: p.name,
    longName: p.longName,
    category: "FRP Products",
    subcategory: "ENGINEERING",
    categoryPath: ["Home", "Products", p.longName],
    image: image,
    additionalImages: [
      image,
    ],
    description: p.description,
    longDescription: [p.description],
    overviewTitle: "Overview",
    overviewContent: [p.description],
    rating: 4.8 + ((idx % 3) * 0.1),
    reviewsCount: 75 + (idx * 3),
    specifications: {
      column1: [
        { label: "Material", value: "High-Grade FRP / Fiberglass" },
        { label: "Corrosion Resistance", value: "High Chemical & Weather Resistant" },
        { label: "Manufacturing", value: "Precision Molded / Hand Lay-Up" },
        { label: "UV Protection", value: "UV Stabilized Resin Matrix" },
      ],
      column2: [
        { label: "Application", value: "Commercial, Residential & Industrial" },
        { label: "Durability", value: "Heavy-Duty & Long Service Life" },
        { label: "Maintenance", value: "Low / Maintenance-Free" },
        { label: "Standards", value: "UAE & International Quality Standards" },
      ],
    },
    ratingBreakdown: defaultRatingBreakdown,
    reviews: defaultReviews,
  };
});

export const defaultProductsData = allProductsData;

export function getProductById(id: string | number): ProductDetailItem {
  const numId = Number(id);
  const found = allProductsData.find(
    (p) => p.id === id || (!isNaN(numId) && p.id === numId)
  );
  if (found) return found;

  return allProductsData[0];
}
