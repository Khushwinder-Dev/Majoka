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
    name: "Wall Ladder",
    longName: "Vertical Wall Mounted Access Ladder",
    description:
      "Strong and corrosion-resistant FRP wall ladder designed for safe vertical access to elevated areas, walls, tanks and industrial structures.",
  },
  {
    id: 2,
    name: "Swimming Pool Ladder",
    longName: "Stainless Style Swimming Pool Access Ladder",
    description:
      "Durable corrosion-resistant FRP swimming pool ladder designed to provide safe and convenient entry and exit from swimming pools.",
  },
  {
    id: 3,
    name: "Safety Cage Ladder",
    longName: "Vertical Industrial Safety Cage Ladder",
    description:
      "Heavy-duty FRP safety cage ladder designed for secure vertical access to industrial platforms, tanks, buildings and elevated structures.",
  },
  {
    id: 4,
    name: "Access Cover",
    longName: "Reinforced FRP Square Access Cover",
    description:
      "Reinforced FRP access cover designed to protect utility openings, inspection points, drainage systems and underground access areas.",
  },
  {
    id: 5,
    name: "Drain Fitting",
    longName: "Molded Drainage Pipe Fitting",
    description:
      "Durable FRP drainage fitting designed for connecting drainage components and directing water or wastewater through piping systems.",
  },
  {
    id: 6,
    name: "Rectangular Tank",
    longName: "Rectangular Industrial Storage Tank",
    description:
      "Strong FRP rectangular storage tank suitable for water, chemical, wastewater and industrial liquid storage applications.",
  },
  {
    id: 7,
    name: "Bathtub",
    longName: "White FRP Rectangular Bathtub",
    description:
      "Smooth and durable FRP bathtub designed for residential, hotel and commercial bathroom installations.",
  },
  {
    id: 8,
    name: "Bathtub",
    longName: "Molded FRP Bathroom Bathtub",
    description:
      "High-quality molded FRP bathtub offering a smooth, durable and easy-to-maintain surface for bathroom applications.",
  },
  {
    id: 9,
    name: "Bathroom Tub",
    longName: "Freestanding FRP Bathroom Tub",
    description:
      "Durable FRP bathroom tub designed for residential and commercial bathroom installations with a smooth molded finish.",
  },
  {
    id: 10,
    name: "Wall Access Ladder",
    longName: "Wall Mounted Maintenance Access Ladder",
    description:
      "Lightweight and corrosion-resistant FRP ladder designed for wall-mounted maintenance and access applications.",
  },
  {
    id: 11,
    name: "Drain Fitting",
    longName: "FRP Drainage Pipe Connection Fitting",
    description:
      "Molded FRP drainage fitting designed for connecting and directing drainage pipelines with excellent corrosion resistance.",
  },
  {
    id: 12,
    name: "Pool Ladder",
    longName: "Swimming Pool Safety Access Ladder",
    description:
      "Durable swimming pool ladder designed to provide safe access in and out of residential and commercial swimming pools.",
  },
  {
    id: 13,
    name: "Shower Tray",
    longName: "Molded Rectangular FRP Shower Tray",
    description:
      "Molded FRP shower tray designed for bathroom floor installation with an integrated drainage area and easy-to-clean surface.",
  },
  {
    id: 14,
    name: "Drainage Fitting",
    longName: "FRP Drainage Pipe and Chamber Fitting",
    description:
      "FRP drainage fitting designed for reliable connection of drainage pipes and water management systems.",
  },
  {
    id: 15,
    name: "Boat",
    longName: "Fiberglass Reinforced Plastic Boat",
    description:
      "Lightweight and strong FRP boat suitable for recreational boating, fishing, transportation and general marine applications.",
  },
  {
    id: 16,
    name: "Playground Equipment",
    longName: "Outdoor Children's Playground Equipment",
    description:
      "Colorful and durable playground equipment designed for children in parks, schools, residential communities and recreational areas.",
  },
  {
    id: 17,
    name: "Access Cover",
    longName: "Reinforced Molded FRP Access Cover",
    description:
      "Strong molded FRP access cover designed for inspection openings, drainage systems, tanks and utility access points.",
  },
  {
    id: 18,
    name: "Pipe Bend",
    longName: "Fiberglass Reinforced Pipe Bend",
    description:
      "Corrosion-resistant FRP pipe bend designed to change pipeline direction while maintaining reliable fluid flow and structural strength.",
  },
  {
    id: 19,
    name: "Car Parking Canopy",
    longName: "Outdoor Vehicle Parking Shade Canopy",
    description:
      "Outdoor FRP parking canopy designed to provide shade and protection for vehicles in residential, commercial and parking areas.",
  },
  {
    id: 20,
    name: "Carport",
    longName: "Residential Outdoor Carport Structure",
    description:
      "Modern FRP carport structure designed to provide covered vehicle parking and protection from weather conditions.",
  },
  {
    id: 21,
    name: "Shower Tray Mold",
    longName: "Molded Shower Tray Manufacturing Mold",
    description:
      "Specialized FRP mold used for manufacturing molded shower trays with consistent shape, strength and surface finish.",
  },
  {
    id: 22,
    name: "Shower Tray Mold",
    longName: "Custom FRP Shower Tray Mould",
    description:
      "Custom FRP shower tray mold designed for producing durable and accurately shaped FRP bathroom shower trays.",
  },
  {
    id: 23,
    name: "Grating",
    longName: "Fiberglass Reinforced Industrial Grating",
    description:
      "Lightweight and corrosion-resistant FRP grating suitable for industrial platforms, walkways, drainage areas and flooring applications.",
  },
  {
    id: 24,
    name: "Shower Tray",
    longName: "White Rectangular Shower Tray",
    description:
      "White molded FRP shower tray designed for residential, hotel and commercial bathroom installations.",
  },
  {
    id: 25,
    name: "Ladder",
    longName: "Multi Purpose Industrial Access Ladder",
    description:
      "Strong and lightweight FRP ladder suitable for industrial maintenance, construction, commercial and general access applications.",
  },
  {
    id: 26,
    name: "Step Ladder",
    longName: "Heavy Duty FRP Step Ladder",
    description:
      "Heavy-duty FRP step ladder designed for maintenance, construction and industrial working-at-height applications.",
  },
  {
    id: 27,
    name: "Cylindrical Tank",
    longName: "Cylindrical FRP Industrial Storage Tank",
    description:
      "Corrosion-resistant cylindrical FRP tank suitable for water, chemical and industrial liquid storage.",
  },
  {
    id: 28,
    name: "Roofing Sheet",
    longName: "Corrugated FRP Roofing Sheet",
    description:
      "Lightweight corrugated FRP roofing sheet designed for weather-resistant roofing and industrial construction applications.",
  },
  {
    id: 29,
    name: "Access Cover",
    longName: "Reinforced Utility Access Cover",
    description:
      "Reinforced FRP access cover designed to protect utility openings, inspection chambers, drainage systems and service areas.",
  },
  {
    id: 30,
    name: "Playground",
    longName: "Outdoor Children's Playground Set",
    description:
      "Durable outdoor playground set designed for children with multiple play and recreational structures.",
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
      "Large-capacity FRP water storage tank designed for residential, commercial and industrial water storage requirements.",
  },
  {
    id: 33,
    name: "Planter",
    longName: "Decorative FRP Planter Pot",
    description:
      "Modern decorative FRP planter suitable for gardens, entrances, terraces, balconies and commercial landscaping.",
  },
  {
    id: 34,
    name: "Profile Sheet",
    longName: "FRP Structural Roofing and Profile Sheet",
    description:
      "Durable FRP profile sheet designed for roofing, cladding, construction and industrial structural applications.",
  },
  {
    id: 35,
    name: "Planter",
    longName: "Outdoor Decorative Planter Set",
    description:
      "Stylish FRP planter suitable for indoor and outdoor decorative plants, flowers and landscaping applications.",
  },
  {
    id: 36,
    name: "Shower Tray",
    longName: "Molded FRP Shower Base",
    description:
      "Molded FRP shower tray designed with a smooth surface and drainage opening for bathroom installations.",
  },
  {
    id: 37,
    name: "Translucent Sheet",
    longName: "Translucent FRP Roofing Sheet",
    description:
      "Lightweight translucent FRP roofing sheet designed to allow natural light while providing durable weather protection.",
  },
  {
    id: 38,
    name: "Car Parking Canopy",
    longName: "Outdoor Car Parking Shade Structure",
    description:
      "Modern vehicle parking canopy designed to provide shade and weather protection for cars in residential and commercial areas.",
  },
  {
    id: 39,
    name: "Industrial Tank",
    longName: "Industrial FRP Storage Tank with Piping",
    description:
      "Heavy-duty FRP industrial tank with piping arrangement designed for liquid storage and industrial processing applications.",
  },
  {
    id: 40,
    name: "Access Cover",
    longName: "Molded Reinforced Access Cover",
    description:
      "Durable molded FRP access cover suitable for inspection openings, drainage systems, tanks and utility installations.",
  },
  {
    id: 41,
    name: "Structural Profile",
    longName: "FRP Structural U Channel Profile",
    description:
      "Strong lightweight FRP U-channel profile suitable for construction, structural supports, framing and industrial fabrication.",
  },
  {
    id: 42,
    name: "Portable Toilet",
    longName: "Portable FRP Toilet Cabin",
    description:
      "Durable FRP portable toilet cabin suitable for construction sites, events, temporary facilities and public areas.",
  },
  {
    id: 43,
    name: "Cylindrical Water Tank",
    longName: "Horizontal Cylindrical FRP Storage Tank",
    description:
      "Corrosion-resistant horizontal cylindrical FRP tank designed for water, chemical and industrial liquid storage.",
  },
  {
    id: 44,
    name: "Step Ladder",
    longName: "Heavy Duty Maintenance Step Ladder",
    description:
      "Strong FRP step ladder designed for maintenance, construction, industrial access and general working-at-height applications.",
  },
  {
    id: 45,
    name: "Pergola",
    longName: "Modern FRP Outdoor Pergola Structure",
    description:
      "Modern FRP pergola designed to provide shade and enhance gardens, patios, terraces and outdoor living spaces.",
  },
  {
    id: 46,
    name: "Pergola",
    longName: "Modern FRP Garden and Patio Pergola",
    description:
      "Contemporary FRP pergola structure suitable for residential gardens, patios, resorts and commercial outdoor areas.",
  },
  {
    id: 47,
    name: "Pergola",
    longName: "Outdoor Architectural Canopy Structure",
    description:
      "Modern outdoor FRP canopy structure designed to provide shade while enhancing the architectural appearance of outdoor spaces.",
  },
  {
    id: 48,
    name: "Outdoor Canopy",
    longName: "Modern FRP Outdoor Patio Shade Structure",
    description:
      "Stylish FRP patio canopy designed to create a comfortable shaded outdoor area for residential and commercial applications.",
  },
  {
    id: 49,
    name: "Safety Ladder",
    longName: "Vertical Safety Access Ladder with Cage",
    description:
      "Corrosion-resistant FRP safety ladder with protective cage designed for secure vertical access to elevated structures.",
  },
  {
    id: 50,
    name: "Swimming Pool Ladder",
    longName: "Swimming Pool Entry and Exit Ladder",
    description:
      "Durable FRP swimming pool ladder designed for safe and convenient pool entry and exit in residential and commercial swimming facilities.",
  },
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
