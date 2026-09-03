"use client";
import React, { useState } from "react";

import Image from "next/image";

interface ProjectData {
  id: number;
  name: string;
  image: string;
  category: string;
  location: string;
  year: string;
  type: string;
  area: string;
  status: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="w-full rounded-[20px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 shadow group cursor-pointer">
      <div className="relative h-[450px]">
        <Image
          src={project.image}
          alt={project.name}
          height={350}
          width={410}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-lg font-medium opacity-90">{project.category}</p>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Update cards per view based on screen size
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(4); // Desktop: 4 cards
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const projectsData: ProjectData[] = [
    {
      id: 1,
      name: "Axel Towers",
      image: "/Featured/1.png",
      category: "Building & Interior",
      location: "Dubai, UAE",
      year: "2024",
      type: "Commercial",
      area: "50,000 sq ft",
      status: "Completed",
    },
    {
      id: 2,
      name: "Glass Hotel",
      image: "/Featured/2.png",
      category: "Architecture",
      location: "Abu Dhabi, UAE",
      year: "2023",
      type: "Hospitality",
      area: "75,000 sq ft",
      status: "Completed",
    },
    {
      id: 3,
      name: "Concord Tower",
      image: "/Featured/3.png",
      category: "Mega Architecture",
      location: "Sharjah, UAE",
      year: "2024",
      type: "Residential",
      area: "120,000 sq ft",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Marina Heights",
      image: "/Featured/4.png",
      category: "Mega Architecture",
      location: "Dubai Marina, UAE",
      year: "2025",
      type: "Mixed Use",
      area: "200,000 sq ft",
      status: "Planning",
    },
    {
      id: 5,
      name: "Sky Gardens",
      image: "/Featured/5.png",
      category: "Green Architecture",
      location: "Al Ain, UAE",
      year: "2023",
      type: "Residential",
      area: "85,000 sq ft",
      status: "Completed",
    },
    {
      id: 6,
      name: "Business Hub",
      image: "/Featured/6.png",
      category: "Commercial Design",
      location: "Fujairah, UAE",
      year: "2024",
      type: "Office",
      area: "95,000 sq ft",
      status: "In Progress",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projectsData.length - cardsPerView);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, projectsData.length - cardsPerView);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full py-20 gap-16 px-4 md:px-8 lg:px-16"
      style={{
        backgroundImage: "url(/featured-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 w-full flex flex-col items-center gap-16">
        <div className=" px-4 py-8 rounded-lg ">
          <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto text-center ">
            <h2 className="text-4xl font-bold tracking-[-0.4px] text-gray-100">
              Our Featured Projects
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Explore Our Highlighted Projects That Reflect Our Identity
            </p>
          </div>

          <div className="relative w-full max-w-[1800px] mx-auto rounded-xl -mt-6">
            <div className="overflow-hidden px-4 py-6">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / cardsPerView)
                  }%)`,
                  gap:
                    cardsPerView === 1
                      ? "0px"
                      : cardsPerView === 4
                      ? "24px"
                      : "24px",
                }}
              >
                {projectsData.map((project) => (
                  <div
                    key={project.id}
                    className="flex-shrink-0"
                    style={{
                      width:
                        cardsPerView === 1
                          ? "100%"
                          : cardsPerView === 2
                          ? "calc((100% - 24px) / 2)"
                          : cardsPerView === 4
                          ? "calc((100% - 72px) / 4)"
                          : "calc((100% - 48px) / 3)",
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="w-[50px] h-[50px] rounded-full bg-primary hover:bg-primary/70 flex items-center justify-center transform rotate-270 cursor-pointer"
              >
                <div className="text-white">
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.66699V17.0003M8 1.66699L1.33334 8.33366M8 1.66699L14.6667 8.33366"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="w-[50px] h-[50px] rounded-full bg-primary hover:bg-primary/70 flex items-center justify-center transform -rotate-270 cursor-pointer"
              >
                <div className="text-white">
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.66699V17.0003M8 1.66699L1.33334 8.33366M8 1.66699L14.6667 8.33366"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({
                length: Math.max(1, projectsData.length - cardsPerView + 1),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-125 active:scale-90 cursor-pointer ${
                    currentIndex === index
                      ? "bg-[#01a9a0] shadow-lg scale-110"
                      : isAnimating
                      ? "bg-[#01a9a0]/30 cursor-not-allowed"
                      : "bg-[#01a9a0]/30 hover:bg-[#01a9a0]/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
