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
      name: "Nauman Safdar Majoka",
      position: "Director",
      image: "/team-members/NAUMAN.jpg",
    },
    {
      name: "Ismail Noor Hossain",
      position: "General Manager",
      image: "/team-members/Ismail.jpg",
    },
    {
      name: "Anait Hussain Mukhtar",
      position: "Sr. Quality Manager",
      image: "/team-members/Anait.jpg",
    },
    {
      name: "Luqman Safdar Majoka",
      position: "Sales Manager",
      image: "/team-members/Luqman.jpg",
    },

    {
      name: "Rizwan Safdar Majoka",
      position: "Operation Manager",
      image: "/team-members/Rizwan.jpg",
    },

    {
      name: "Tasawar Hussain Majoka ",
      position: "Research and Development  Manager",
      image: "/team-members/Tasawar.jpg",
    },
    {
      name: "Mohammed Noor Hossain",
      position: "Marketing Manager ",
      image: "/team-members/Mohammad Noor.jpg",
    },
    {
      name: "Younus Noor Hossain",
      position: "Planning Manager",
      image: "/team-members/Younus.jpg",
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
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const getCurrentMembers = () => {
    const startIndex = currentSlide * itemsToShow;
    return teamMembers.slice(startIndex, startIndex + itemsToShow);
  };

  return (
    <div className="w-full py-16 relative overflow-hidden px-4 md:px-8 lg:px-16">
      {/* Background Image - Fixed positioning issue */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg-our-team.webp"
          alt="Background"
          fill
          className="object-cover object-top" // Changed: Added object-top
          quality={100}
          priority
        />
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 mb-12 px-4 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#e9f5fb] text-center tracking-[-0.4px]">
          Meet Our Team
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#e9f5fb] text-center max-w-[540px]">
          Discover how we can elevate your experience.
        </p>
      </div>

      {/* Team Members */}
      <div className="relative">
        {/* Team Members Grid */}
        <div className="px-4 w-[97%] mx-auto relative rounded-[32px]">
          {/* Navigation Arrows - Positioned relative to the grid */}
          <button
            onClick={handlePrevSlide}
            disabled={isTransitioning}
            className={`absolute top-1/2 -left-4 sm:-left-8 lg:-left-16 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 hover:bg-[#01a9a0]/90 rounded-full flex items-center justify-center transition-colors bg-[#01a9a0] ${
              isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
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
            className={`absolute top-1/2 -right-4 sm:-right-8 lg:-right-16 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 hover:bg-[#01a9a0]/90 rounded-full flex items-center justify-center transition-colors bg-[#01a9a0] ${
              isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <Image
              src="/arrowR.svg"
              alt="Next"
              width={24}
              height={24}
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            />
          </button>
          <div
            className={`grid gap-6 md:gap-[30px] transition-all duration-500 ${
              itemsToShow === 1
                ? "grid-cols-1"
                : itemsToShow === 2
                ? "grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {getCurrentMembers().map((member, index) => (
              <div
                key={`${currentSlide}-${index}`}
                className="flex flex-col gap-4 w-full group"
              >
                <div className="w-full aspect-[380/420] relative overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay - Shows on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#209bd7]/0 to-[#01a9a0] opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Social Icons - Show on hover */}
                  {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
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
                  </div> */}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl sm:text-2xl text-center font-bold text-white tracking-[-0.4px]">
                    {member.name}
                  </h3>
                  <p className="text-base sm:text-xl text-center text-white">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
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
