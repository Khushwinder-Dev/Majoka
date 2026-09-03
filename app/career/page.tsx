import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import JoinTeam from "../../components/Career/JoinTeam";
import Position from "../../components/Career/Position";
import MeetOurTeam from "@/components/Common/MeetOurTeam";

export default function ContactPage() {
  return (
    <div>
      <CommonHeader
        title="Career"
        breadcrumb="Career"
        imagePath="/project.jpg"
      />
      <JoinTeam />
      <Position />
      {/* <MeetOurTeam /> */}
    </div>
  );
}
