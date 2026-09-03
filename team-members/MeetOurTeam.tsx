"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const WorkSteps = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  const teamMembers = [
    {
      name: "Yousuf Noor",
      position: "Senior Engineer",
      image: "/team-members/1.jpeg",
    },
    {
      name: "Abdulrahman Wasil",
      position: "Architect Engineer",
      image: "/team-members/2.jpeg",
    },
    {
      name: "Ismail Noor",
      position: "Lead Site Engineer",
      image: "/team-members/3.jpeg",
    },
    {
      name: "Abdullah Wahab",
      position: "Project Manager",
      image: "/team-members/4.png",
    },
    {
      name: "Abdulrahman Noor",
      position: "Construction Lead",
      image: "/team-members/5.jpg",
    },
  ];

  // Update items to show based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const totalSlides = Math.ceil(teamMembers.length / itemsToShow);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Reset transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="w-full py-16 relative overflow-hidden px-4 md:px-8 lg:px-16 bg-sky-800 my-10">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-12 px-4 relative z-10">
        <h2 className="text-34xl sm:text-4xl md:text-5xl font-bold text-[#e9f5fb] text-center tracking-[-0.4px]">
          Meet Our Team
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#e9f5fb] text-center max-w-[540px]">
          Discover how we can elevate your experience.
        </p>
      </div>

      {/* Team Members */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          disabled={isTransitioning}
          className={`absolute top-1/2 left-8 sm:left-4 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors bg-sky-700 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Image
            src="/arrowL.svg"
            alt="Previous"
            width={24}
            height={24}
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          />
        </button>

        <button
          onClick={handleNextSlide}
          disabled={isTransitioning}
          className={`absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors bg-sky-700 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Image
            src="/arrowR.svg"
            alt="Previous"
            width={24}
            height={24}
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          />
        </button>

        {/* Team Members Grid */}
        <div className="px-4 max-w-[1800px] mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex-shrink-0 w-full">
                  <div
                    className={`grid gap-6 md:gap-[30px] justify-items-center px-2 ${
                      itemsToShow === 1
                        ? "grid-cols-1"
                        : itemsToShow === 2
                        ? "grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {teamMembers
                      .slice(
                        slideIndex * itemsToShow,
                        (slideIndex + 1) * itemsToShow
                      )
                      .map((member, index) => (
                        <div
                          key={`${slideIndex}-${index}`}
                          className="flex flex-col gap-4 w-full group"
                        >
                          <div className="w-full aspect-[380/420] relative overflow-hidden rounded-lg shadow">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110 shadow"
                            />

                            {/* Gradient Overlay - Shows on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#209bd7]/0 to-red-950 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Social Icons - Show on hover */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                              <div className="flex gap-6 sm:gap-8 md:gap-10">
                                <a
                                  href="#"
                                  className="text-[#e9f5fb] hover:text-white transition-colors"
                                >
                                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>

                                <a
                                  href="#"
                                  className="text-[#e9f5fb] hover:text-white transition-colors"
                                >
                                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>

                                <a
                                  href="#"
                                  className="text-[#e9f5fb] hover:text-white transition-colors"
                                >
                                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>

                                <a
                                  href="#"
                                  className="text-[#e9f5fb] hover:text-white transition-colors"
                                >
                                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.4px]">
                              {member.name}
                            </h3>
                            <p className="text-base sm:text-xl text-white">
                              {member.position}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                }
              }}
              disabled={isTransitioning}
              className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlide === index
                  ? "bg-[#e9f5fb] w-8"
                  : "bg-[#e9f5fb]/40 hover:bg-[#e9f5fb]/60 w-3"
              } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSteps;
