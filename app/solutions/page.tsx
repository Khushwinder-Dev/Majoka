import React from "react";
import { Metadata } from "next";
import SolutionsPageContent from "@/components/SolutionsPageContent";

export const metadata: Metadata = {
  title: "Waterproofing & Protection Solutions | Taj Al Rahmah",
  description:
    "Explore reliable, end-to-end waterproofing and protective solutions for residential, commercial, industrial, and infrastructure projects across the UAE.",
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsPageContent />
    </main>
  );
}
