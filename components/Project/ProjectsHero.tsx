"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";

const BG_IMAGE = "/banners/projects.jpeg";

export default function ProjectsHero() {
  return (
    <CommonHeader
      imagePath={BG_IMAGE}
      showHeading={false}
      showBreadcrumb={false}
    />
  );
}
