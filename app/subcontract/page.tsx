import { Metadata } from "next";
import SubcontractContent from "@/components/Subcontract/SubcontractContent";

export const metadata: Metadata = {
  title: "Subcontracting Services | Taj Al Rahmah Technical Services",
  description:
    "Reliable subcontracting for waterproofing, protective coatings, concrete repair, industrial flooring, and specialized contracting services in Dubai & UAE.",
  openGraph: {
    title: "Reliable Subcontracting for Your Projects | Taj Al Rahmah",
    description:
      "Professional waterproofing and specialized contracting services delivered with quality, safety, and reliable project coordination.",
    images: ["/subcontract/hero.png"],
  },
};

export default function SubcontractPage() {
  return <SubcontractContent />;
}

