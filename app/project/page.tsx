import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Portfolio from "../../components/Project/portfolio";
import MeetOurTeam from "@/components/Common/MeetOurTeam";

export default function ProjectPage() {
  return (
    <div>
      <CommonHeader
        title="Build Your Project With Majoka"
        breadcrumb="Projects"
        imagePath="/project.jpg"
      />

      <Portfolio />
      {/* <MeetOurTeam /> */}
    </div>
  );
}
