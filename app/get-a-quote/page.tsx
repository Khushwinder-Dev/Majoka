import { Metadata } from "next";
import GetAQuoteContent from "@/components/GetAQuoteContent";

export const metadata: Metadata = {
  title: "Get a Quote | Taj Al Rahmah Technical Services",
  description:
    "Request a free, transparent, and accurate quote for waterproofing, insulation, acoustic solutions, flooring, and technical contracting services in UAE.",
};

export default function GetAQuotePage() {
  return <GetAQuoteContent />;
}
