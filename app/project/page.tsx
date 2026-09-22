"use client";

import React from "react";
import ProjectsHero from "../../components/Project/ProjectsHero";
import ProjectsGallery from "../../components/Project/ProjectsGallery";
import ProjectsClients from "../../components/Project/ProjectsClients";
import FaqSection from "@/components/Common/FaqSection";
import ProjectsCTA from "../../components/Project/ProjectsCTA";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectPage() {
  const { isArabic } = useLanguage();

  return (
    <div>
      <ProjectsHero />
      <ProjectsGallery />
      <ProjectsClients />
      <FaqSection isArabic={isArabic} />
      <ProjectsCTA />
    </div>
  );
}
