import { Metadata } from "next";
import WarrantyPageContent from "@/components/WarrantyPageContent";

export const metadata: Metadata = {
  title: "Warranty | Taj Al Rahmah Technical Services",
  description:
    "Learn about our comprehensive warranty coverage across waterproofing materials, expert workmanship, and complete system guarantees up to 20 years in the UAE.",
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-white">
      <WarrantyPageContent />
    </main>
  );
}
