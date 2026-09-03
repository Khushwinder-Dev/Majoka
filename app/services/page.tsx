import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Services from "@/components/Services";
import MeetOurTeam from "@/components/Common/MeetOurTeam";
import ClientTestimonials from "@/components/ClientTestimonials";

export default function ProjectPage() {
  return (
    <div>
      <CommonHeader
        title="Explore Our Services"
        breadcrumb="Services"
        imagePath="/project.jpg"
      />
      <Services />
      {/* <MeetOurTeam /> */}
      <ClientTestimonials />
    </div>
  );
}
