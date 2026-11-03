import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries Served | Commercial, Residential & Industrial Contracting UAE",
  description:
    "Taj Al Rahmah provides specialized waterproofing, insulation, MEP, and facility maintenance for commercial towers, residential villas, industrial factories, hospitality resorts, and infrastructure in the UAE.",
  keywords: [
    "Industrial waterproofing Dubai",
    "Commercial roof waterproofing UAE",
    "Residential villa insulation Dubai",
    "Hospitality facility maintenance UAE",
    "Warehouse waterproofing Dubai",
    "Infrastructure contracting UAE",
  ],
  openGraph: {
    title: "Industries Served | Taj Al Rahmah Technical Services UAE",
    description:
      "Engineered protection and technical services tailored for residential, commercial, industrial, and infrastructure sectors across UAE.",
    url: "https://tajalrahmah.com/industries",
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

