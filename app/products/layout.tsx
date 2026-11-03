import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FRP & Industrial Products Catalog | Taj Al Rahmah UAE",
  description:
    "High-grade fiberglass (FRP) and industrial products in UAE: Wall access ladders, swimming pool ladders, safety cage ladders, reinforced access covers, water tanks, parking canopies, shower trays, and molded fittings.",
  keywords: [
    "FRP Products UAE",
    "Fiberglass products Dubai",
    "FRP Wall Ladder Dubai",
    "Swimming Pool Ladder UAE",
    "Safety Cage Ladder",
    "Reinforced FRP Access Cover",
    "FRP Drainage Pipe Fitting",
    "Industrial Storage Tank UAE",
    "Car Parking Canopy Dubai",
    "FRP Shower Tray",
    "Fiberglass Boat UAE",
    "FRP Grating Industrial",
    "FRP Water Tank Dubai",
  ],
  openGraph: {
    title: "FRP & Industrial Products Catalog | Taj Al Rahmah UAE",
    description:
      "Durable, corrosion-resistant fiberglass (FRP) products for construction, industrial facilities, pools, and residential projects in the UAE.",
    url: "https://tajalrahmah.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

