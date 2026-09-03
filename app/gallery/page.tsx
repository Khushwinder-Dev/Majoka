import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import AllGallery from "../../components/Gallery/AllGallery";
import Stats from "../../components/Stats";

export default function ContactPage() {
  return (
    <div>
      <CommonHeader
        title="Gallery"
        breadcrumb="Gallery"
        imagePath="/project.jpg"
      />
      <AllGallery />
      <Stats />
    </div>
  );
}
