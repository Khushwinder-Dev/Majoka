import React from "react";
import type { Metadata } from "next";
import CareerPageContent from "@/components/CareerPageContent";

export const metadata: Metadata = {
  title: "Careers & Job Opportunities | Taj Al Rahmah Contracting UAE",
  description:
    "Join the expert team at Taj Al Rahmah. Explore rewarding career opportunities in civil construction, insulation, structural waterproofing, and project engineering in the UAE.",
  keywords: [
    "Taj Al Rahmah careers",
    "construction jobs UAE",
    "waterproofing engineer jobs Dubai",
    "civil engineering jobs Abu Dhabi",
    "site supervisor jobs UAE",
  ],
};

export default function CareerPage() {
  return <CareerPageContent />;
}
