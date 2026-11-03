import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contracting Projects Portfolio | Taj Al Rahmah Dubai UAE",
  description:
    "Explore our completed technical contracting and waterproofing projects in the UAE, including landmark commercial works, Dubai Metro Station painting, villa waterproofing, and industrial facility maintenance.",
  keywords: [
    "Contracting Projects Dubai",
    "Waterproofing Projects UAE",
    "Dubai Metro Station Painting Project",
    "Commercial Painting Dubai",
    "Industrial Waterproofing UAE",
    "Villa Insulation Dubai Projects",
    "Technical Services Portfolio UAE",
  ],
  openGraph: {
    title: "Completed Contracting Projects Portfolio | Taj Al Rahmah",
    description:
      "Showcase of specialized technical contracting, painting, and waterproofing works across Dubai and the UAE.",
    url: "https://tajalrahmah.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

