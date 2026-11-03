import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Taj Al Rahmah | Technical Services & Free Inspection UAE",
  description:
    "Get in touch with Taj Al Rahmah Technical Services for free site inspections, project quotations, emergency leak repair, and engineering support in Dubai and across the UAE. Call +971 55 617 3300.",
  keywords: [
    "Contact Taj Alrahmah",
    "Waterproofing contractor Dubai contact",
    "Technical services Dubai phone number",
    "Free roof inspection Dubai",
    "Emergency leak repair UAE",
    "Waterproofing consultation UAE",
  ],
  openGraph: {
    title: "Contact Taj Al Rahmah Technical Services UAE",
    description:
      "Schedule a technical site survey or get a free quote for waterproofing, combo roofing, MEP, and facility maintenance in Dubai & UAE.",
    url: "https://tajalrahmah.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

