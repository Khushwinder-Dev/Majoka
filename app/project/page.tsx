import React from "react";
import ProjectsHero from "../../components/Project/ProjectsHero";
import ProjectsGallery from "../../components/Project/ProjectsGallery";
import ProjectsClients from "../../components/Project/ProjectsClients";
import ProjectsFAQ from "../../components/Project/ProjectsFAQ";
import ProjectsCTA from "../../components/Project/ProjectsCTA";

export default function ProjectPage() {
  return (
    <div>
      <ProjectsHero />
      <ProjectsGallery />
      <ProjectsClients />
      <ProjectsFAQ />
      <ProjectsCTA />
    </div>
  );
}
