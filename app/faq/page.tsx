import React from "react";
import type { Metadata } from "next";
import FaqPageContent from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQs | Taj Al Rahmah Technical Services",
  description:
    "Find answers to frequently asked questions about waterproofing, thermal insulation, contracting, municipality approvals, warranties, and process at Taj Al Rahmah.",
};

export default function FAQPage() {
  return <FaqPageContent />;
}
