import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";

export const metadata = {
  title: "Certifications | Taj Al Rahmah",
  description:
    "Explore the certifications and accreditations held by Taj Al Rahmah, demonstrating our commitment to quality, safety, and engineering excellence.",
};

export default function CertificationsPage() {
  return (
    <div>
      <CommonHeader
        title="Our Certifications & Accreditations"
        breadcrumb="Certifications"
        imagePath="/about-us/about-us-1.png"
      />
    </div>
  );
}
