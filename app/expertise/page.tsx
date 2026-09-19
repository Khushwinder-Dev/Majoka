import { Metadata } from "next";
import OurExpertiseContent from "@/components/OurExpertiseContent";

export const metadata: Metadata = {
  title: "Our Expertise | Taj Al Rahmah Technical Services",
  description:
    "Explore our specialized expertise in waterproofing systems, building protection, structural repair, and durable commercial & industrial solutions across the UAE.",
};

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-white">
      <OurExpertiseContent />
    </main>
  );
}
