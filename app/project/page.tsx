import React from "react";
import ProjectsHero from "../../components/Project/ProjectsHero";
import ProjectsGallery from "../../components/Project/ProjectsGallery";
import ProjectsClients from "../../components/Project/ProjectsClients";

export default function ProjectPage() {
  return (
    <div>
      <ProjectsHero />
      <ProjectsGallery />
      <ProjectsClients />
    </div>
  );
}
