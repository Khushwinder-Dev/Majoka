import React from "react";
import ServicesListing from "@/components/ServicesListing";
import ClientTestimonials from "@/components/ClientTestimonials";

export const metadata = {
  title: "Services | Taj Al Rahmah",
  description:
    "Browse our full range of professional contracting services — waterproofing, swimming pools, electrical, plumbing, tiling, plastering, and painting.",
};

export default function ServicesPage() {
  return (
    <div>
      <ServicesListing />
      <ClientTestimonials />
    </div>
  );
}
