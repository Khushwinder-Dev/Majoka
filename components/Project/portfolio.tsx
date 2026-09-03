"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProjectCard {
  id: number;
  contractNo: string;
  contractTitle: string;
  location: string;
  client: string;
  startEndDate: string;
  status: string;
  image: string;
}

const Portfolio = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  const projects: ProjectCard[] = [
    {
      id: 1,
      contractNo: "4212400",
      contractTitle:
        "Construction of an 720 square meter office building in Dhahran Aramco",
      location: "Dhahran",
      client: "S. Aramco-TND Dept.",
      startEndDate: "Mar, 1998 - Aug, 1999",
      status: "Completed",
      image: "/project/1.jpg",
    },
    {
      id: 2,
      contractNo: "4212400",
      contractTitle:
        "Construction of an 720 square meter office building in Dhahran Aramco",
      location: "Dhahran",
      client: "S. Aramco-TND Dept.",
      startEndDate: "Mar, 1998 - Aug, 1999",
      status: "Completed",
      image: "/project/2.jpg",
    },
    {
      id: 3,
      contractNo: "4212400",
      contractTitle:
        "Construction of an 720 square meter office building in Dhahran Aramco",
      location: "Dhahran",
      client: "S. Aramco-TND Dept.",
      startEndDate: "Mar, 1998 - Aug, 1999",
      status: "Completed",
      image: "/project/3.jpg",
    },
    {
      id: 4,
      contractNo: "4212400",
      contractTitle:
        "Construction of an 720 square meter office building in Dhahran Aramco",
      location: "Dhahran",
      client: "S. Aramco-TND Dept.",
      startEndDate: "Mar, 1998 - Aug, 1999",
      status: "Completed",
      image: "/project/4.jpg",
    },
    {
      id: 5,
      contractNo: "4212401",
      contractTitle:
        "Renovation of the main terminal at King Fahd International Airport",
      location: "Dammam",
      client: "Saudi Airports Authority",
      startEndDate: "Jan, 2000 - Dec, 2001",
      status: "Completed",
      image: "/project/5.jpg",
    },
    {
      id: 6,
      contractNo: "4212402",
      contractTitle: "Development of a new commercial complex in Jeddah",
      location: "Jeddah",
      client: "Jeddah Real Estate Co.",
      startEndDate: "Feb, 2002 - May, 2004",
      status: "Ongoing",
      image: "/project/1.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text-main mb-6">
            Majoka Project Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Completed 6 major construction and infrastructure projects for Saudi
            Aramco and SCECO, totaling SR 18 million, with 100% on-time delivery
            across Dhahran, Jubail, and Rastanura.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Background Image */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Project ${project.id}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Always Visible Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#01a9a0]/0 to-[#01a9a0]/80 flex flex-col justify-between p-6">
                  {/* Contract Number - Top Right */}
                  <div className="flex justify-end">
                    {/* <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-white text-sm font-bold">
                        {project.contractNo}
                      </span>
                    </div> */}
                  </div>

                  {/* Project Details - Always Visible */}
                  <div className="text-white space-y-3">
                    {/* Contract No */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Contract No.:
                      </span>
                      <span className="text-white text-sm font-bold text-right">
                        {project.contractNo}
                      </span>
                    </div>

                    {/* Contract Title */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Contract Title:
                      </span>
                      <span className="text-white text-sm font-bold text-right max-w-[60%] leading-tight">
                        {project.contractTitle}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Location:
                      </span>
                      <span className="text-white text-sm font-bold text-right">
                        {project.location}
                      </span>
                    </div>

                    {/* Client */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Client:
                      </span>
                      <span className="text-white text-sm font-bold text-right">
                        {project.client}
                      </span>
                    </div>

                    {/* Start & End Date */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Start & End Date:
                      </span>
                      <span className="text-white text-sm font-bold text-right">
                        {project.startEndDate}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-medium">
                        Status:
                      </span>
                      <span className="text-white text-sm font-bold text-right">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
