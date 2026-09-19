import { Metadata } from "next";
import SupportPageContent from "@/components/SupportPageContent";

export const metadata: Metadata = {
  title: "Support | Taj Al Rahmah Technical Services",
  description:
    "Need technical support, product guidance, or warranty assistance? Contact the Taj Al Rahmah support team or browse our FAQs.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <SupportPageContent />
    </main>
  );
}
