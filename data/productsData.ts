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
  id: number | string;
  name: string;
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
  price: string;
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

export const defaultProductsData: ProductDetailItem[] = [
  {
    id: 1,
    name: "Nomad MagSafe Charger",
    category: "Technology",
    subcategory: "CHARGING",
    categoryPath: ["Home", "Technology", "Nomad MagSafe Charger"],
    image: "/products/nomad-magsafe-charger.jpg",
    additionalImages: [
      "/products/nomad-magsafe-charger.jpg",
      "/products/minimal-watch.jpg",
    ],
    description:
      "The Nomad MagSafe Charger pairs a machined aluminum base with a soft-touch leather pad, so it sits flush and stays put. Strong magnets align your phone every time, and a weighted body means you can lift your phone one-handed without the charger coming with it.",
    longDescription: [
      "The Nomad MagSafe Charger pairs a machined aluminum base with a soft-touch leather pad, so it sits flush and stays put. Strong magnets align your phone every time, and a weighted body means you can lift your phone one-handed without the charger coming with it.",
      "A braided 2-metre USB-C cable keeps your setup tidy, and full 15W output means you get the fastest MagSafe speeds Apple allows — no compromise for the clean look.",
    ],
    overviewTitle: "Designed to disappear into your desk.",
    overviewContent: [
      "The Nomad MagSafe Charger pairs a machined aluminum base with a soft-touch leather pad, so it sits flush and stays put. Strong magnets align your phone every time, and a weighted body means you can lift your phone one-handed without the charger coming with it.",
      "A braided 2-metre USB-C cable keeps your setup tidy, and full 15W output means you get the fastest MagSafe speeds Apple allows — no compromise for the clean look.",
    ],
    rating: 4.9,
    reviewsCount: 214,
    price: "$149.00",
    specifications: {
      column1: [
        { label: "Max output", value: "15W (MagSafe)" },
        { label: "Material", value: "Machined aluminum + leather" },
        { label: "Compatibility", value: "iPhone 12 – 15" },
        { label: "Weight", value: "220 g" },
      ],
      column2: [
        { label: "Input", value: "USB-C Power Delivery" },
        { label: "Cable", value: "2m braided USB-C" },
        { label: "Dimensions", value: "92 × 92 × 6 mm" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    ratingBreakdown: [
      { stars: 5, count: 189, percentage: 88 },
      { stars: 4, count: 19, percentage: 9 },
      { stars: 3, count: 4, percentage: 2 },
      { stars: 2, count: 1, percentage: 0.5 },
      { stars: 1, count: 1, percentage: 0.5 },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Ethan Brooks",
        initials: "EB",
        date: "June 2, 2026",
        rating: 5,
        verified: true,
        comment:
          "Genuinely the nicest charger I own. It feels like a piece of furniture, not an accessory. Alignment is flawless every time.",
      },
      {
        id: "rev-2",
        author: "James Walker",
        initials: "JW",
        date: "June 3, 2026",
        rating: 5,
        verified: true,
        comment:
          "Charges fast and looks incredible on my desk. The leather pad is a lovely touch that photos don't do justice.",
      },
      {
        id: "rev-3",
        author: "Sophia Chen",
        initials: "SC",
        date: "May 28, 2026",
        rating: 5,
        verified: true,
        comment:
          "The weighted aluminum base makes all the difference. You can lift your phone with one hand without moving the base at all. Outstanding design.",
      },
      {
        id: "rev-4",
        author: "Marcus Vance",
        initials: "MV",
        date: "May 24, 2026",
        rating: 4,
        verified: true,
        comment:
          "High quality materials, braided cable is very durable. Takes up very minimal desk space while delivering reliable 15W MagSafe speeds.",
      },
    ],
  },
  {
    id: 2,
    name: "Sigma Quattro Camera best",
    category: "Gear",
    subcategory: "PHOTOGRAPHY",
    categoryPath: ["Home", "Gear", "Sigma Quattro Camera best"],
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with our flagship professional photography tool.",
    longDescription: [
      "Experience outstanding clarity, rich colors, and advanced imaging technology engineered for professionals who demand pure optical excellence.",
      "Equipped with the revolutionary Foveon X3 Quattro sensor, this camera captures full-color information on three stacked layers, producing lifelike realism.",
    ],
    overviewTitle: "Crafted for uncompromising detail and precision.",
    overviewContent: [
      "Experience outstanding clarity, rich colors, and advanced imaging technology engineered for professionals who demand pure optical excellence.",
      "Equipped with the revolutionary Foveon X3 Quattro sensor, this camera captures full-color information on three stacked layers, producing lifelike realism.",
    ],
    rating: 4.5,
    reviewsCount: 94,
    price: "$219.00",
    specifications: {
      column1: [
        { label: "Sensor type", value: "Foveon X3 Quattro" },
        { label: "Effective pixels", value: "29 Megapixels" },
        { label: "ISO sensitivity", value: "ISO 100 - 6400" },
        { label: "Weight", value: "415 g" },
      ],
      column2: [
        { label: "Display", value: "3.0-inch TFT LCD" },
        { label: "Storage", value: "SD / SDHC / SDXC" },
        { label: "Mount", value: "Sigma SA Mount" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    ratingBreakdown: [
      { stars: 5, count: 72, percentage: 76 },
      { stars: 4, count: 16, percentage: 17 },
      { stars: 3, count: 4, percentage: 4 },
      { stars: 2, count: 1, percentage: 1.5 },
      { stars: 1, count: 1, percentage: 1.5 },
    ],
    reviews: [
      {
        id: "rev-2-1",
        author: "Alexander Cole",
        initials: "AC",
        date: "May 15, 2026",
        rating: 5,
        verified: true,
        comment:
          "Incredible dynamic range and detail rendition. For landscape and still life work, there is nothing like it at this price point.",
      },
      {
        id: "rev-2-2",
        author: "Elena Rostova",
        initials: "ER",
        date: "April 29, 2026",
        rating: 4,
        verified: true,
        comment:
          "Unique ergonomic grip and the image sharpness is breath-taking.",
      },
    ],
  },
  {
    id: 3,
    name: "Sigma Quattro Camera best",
    category: "Accessory",
    subcategory: "TECH ACCESSORY",
    categoryPath: ["Home", "Accessory", "Sigma Quattro Camera best"],
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology.",
    rating: 4.5,
    reviewsCount: 65,
    price: "$189.00",
    specifications: {
      column1: [
        { label: "Max output", value: "15W (MagSafe)" },
        { label: "Material", value: "Machined aluminum + leather" },
        { label: "Compatibility", value: "Universal" },
        { label: "Weight", value: "180 g" },
      ],
      column2: [
        { label: "Input", value: "USB-C" },
        { label: "Cable", value: "1.5m braided" },
        { label: "Dimensions", value: "85 × 85 × 8 mm" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    ratingBreakdown: [
      { stars: 5, count: 50, percentage: 77 },
      { stars: 4, count: 10, percentage: 15 },
      { stars: 3, count: 3, percentage: 5 },
      { stars: 2, count: 1, percentage: 1.5 },
      { stars: 1, count: 1, percentage: 1.5 },
    ],
    reviews: [
      {
        id: "rev-3-1",
        author: "Liam Davis",
        initials: "LD",
        date: "June 1, 2026",
        rating: 5,
        verified: true,
        comment: "Excellent build quality, works like a charm.",
      },
    ],
  },
  {
    id: 4,
    name: "Sigma Quattro Camera best",
    category: "Laptop",
    subcategory: "COMPUTING",
    categoryPath: ["Home", "Laptop", "Sigma Quattro Camera best"],
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology.",
    rating: 4.5,
    reviewsCount: 142,
    price: "$249.00",
    specifications: {
      column1: [
        { label: "Processor", value: "M-Series Octa-core" },
        { label: "Material", value: "Anodized Aerospace Aluminum" },
        { label: "Compatibility", value: "macOS / Windows / Linux" },
        { label: "Weight", value: "1.24 kg" },
      ],
      column2: [
        { label: "Input", value: "MagSafe 3 / Thunderbolt 4" },
        { label: "Cable", value: "2m braided USB-C" },
        { label: "Dimensions", value: "304 × 215 × 11 mm" },
        { label: "Warranty", value: "2 years" },
      ],
    },
    ratingBreakdown: [
      { stars: 5, count: 120, percentage: 84 },
      { stars: 4, count: 16, percentage: 11 },
      { stars: 3, count: 4, percentage: 3 },
      { stars: 2, count: 1, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 },
    ],
    reviews: [
      {
        id: "rev-4-1",
        author: "Oliver Reed",
        initials: "OR",
        date: "May 20, 2026",
        rating: 5,
        verified: true,
        comment: "Stunning display and unmatched battery life.",
      },
    ],
  },
];

export function getProductById(id: string | number): ProductDetailItem {
  const numId = Number(id);
  const found = defaultProductsData.find(
    (p) => p.id === id || (!isNaN(numId) && p.id === numId)
  );
  if (found) return found;

  // Fallback: Return Nomad MagSafe Charger with requested id
  return {
    ...defaultProductsData[0],
    id: id,
  };
}
