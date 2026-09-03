import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Contact from "../../components/contact/contact";
import Map from "../../components/contact/Map";
import Stats from "../../components/Stats";
import MeetOurTeam from "@/components/Common/MeetOurTeam";

export default function ContactPage() {
  return (
    <div>
      <CommonHeader
        title="Contact Us to Start Your Project"
        breadcrumb="Contact"
        imagePath="/contact.jpeg"
      />
      <Contact />
      <Map />
      <Stats />
      {/* <MeetOurTeam /> */}
    </div>
  );
}
