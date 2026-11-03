import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Leading Technical Services & Waterproofing Contractor UAE",
  description:
    "Learn about Taj Al Rahmah Technical Services LLC, our 15+ years of engineering excellence, certified partnerships (Sika, BASF, Fosroc), ISO certifications, and proven track record across Dubai and UAE.",
  keywords: [
    "About Taj Alrahmah",
    "Waterproofing contractor Dubai history",
    "Technical services company UAE",
    "ISO certified contractor Dubai",
    "Sika certified applicator UAE",
    "BASF certified contractor Dubai",
    "Waterproofing specialist UAE",
  ],
  openGraph: {
    title: "About Taj Al Rahmah Technical Services UAE",
    description:
      "Leading technical contractor delivering certified waterproofing, thermal roof insulation, MEP, and civil maintenance in UAE.",
    url: "https://tajalrahmah.com/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

