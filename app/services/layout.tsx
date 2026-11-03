import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contracting & Technical Services in Dubai & UAE",
  description:
    "Explore our complete range of certified technical contracting services in UAE: Combo system roof waterproofing, thermal insulation, swimming pools, electrical fit-out, plumbing, tiling, plastering, painting, and HVAC maintenance.",
  keywords: [
    "Technical Services Dubai",
    "Waterproofing Services UAE",
    "Combo Roof Waterproofing Dubai",
    "Thermal Roof Insulation UAE",
    "Swimming Pool Construction Dubai",
    "Electrical Fit Out UAE",
    "Plumbing Maintenance Dubai",
    "Floor & Wall Tiling Works",
    "Plastering Contracting UAE",
    "Painting Services Dubai",
    "False Ceiling Drywall Partitions",
    "Air Conditioning HVAC Dubai",
    "Building Cleaning Services UAE",
  ],
  openGraph: {
    title: "Specialized Technical & Contracting Services | Taj Al Rahmah UAE",
    description:
      "Expert commercial, residential, and industrial technical services across Dubai, Abu Dhabi, Sharjah, and the UAE.",
    url: "https://tajalrahmah.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

