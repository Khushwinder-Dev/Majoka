"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Exact Blueprint / Diamond Crosshair target icon matching the reference design
function BlueprintDiamondIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      {/* 45-deg diamond outer frame */}
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2.5"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* Target center circle */}
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      {/* Precision reticle marks */}
      <path
        d="M12 6.5V8.5M12 15.5V17.5M6.5 12H8.5M15.5 12H17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function OurProjectsSection() {
  const { isArabic } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      image: "/media/Images/section5/Rectangle 34624981 (1).png",
      title: isArabic ? "محطة مترو دبي" : "Dubai Metro Station",
      category: isArabic
        ? "مشاريع البنية التحتية والنقل الكبرى والتطوير الحضري"
        : "Major Transportation Infrastructure & Development Projects",
      link: "/projects",
    },
    {
      id: 2,
      image: "/media/Images/section5/Rectangle 34624981 (2).png",
      title: isArabic ? "برج مستشفى المدينة" : "City Hospital Tower",
      category: isArabic
        ? "المستشفيات والعيادات والمرافق الطبية المتخصصة"
        : "Hospitals, Clinics & Specialized Healthcare Facilities",
      link: "/projects",
    },
    {
      id: 3,
      image: "/media/Images/section5/Rectangle 34624981 (3).png",
      title: isArabic ? "فلل نخلة جميرا الفاخرة" : "Palm Jumeirah Villa",
      category: isArabic
        ? "الفلل الفاخرة والمنازل الخاصة والمجمعات السكنية الراقية"
        : "Luxury Villas, Private Homes & Residential Developments",
      link: "/projects",
    },
    {
      id: 4,
      image: "/media/Images/section5/Rectangle 34624981 (4).png",
      title: isArabic ? "فلل نخلة جميرا الفاخرة" : "Palm Jumeirah Villa",
      category: isArabic
        ? "الفلل الفاخرة والمنازل الخاصة والمجمعات السكنية الراقية"
        : "Luxury Villas, Private Homes & Residential Developments",
      link: "/projects",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollAmount : factor * scrollAmount;
      scrollContainerRef.current.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E6F7F6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Title & Eyebrow */}
          <div>
            {/* Eyebrow / Tag */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase text-[#01a9a0]">
                {isArabic ? "مشاريعنا" : "OUR PROJECT"}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14]">
              <span>
                {isArabic ? "تنفيذ متقن، احترافي، و" : "Clean, Professional, And"}
              </span>
              <br />
              <span>{isArabic ? "تصميم يعكس " : "Perfectly "}</span>
              <span className="text-[#01a9a0]">
                {isArabic ? "رؤيتكم المشتركة" : "Design You Shared"}
              </span>
            </h2>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3.5 bg-[#009e90] hover:bg-[#01887e] text-white pl-6 pr-2.5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,158,144,0.25)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.35)] transition-all duration-300 group"
            >
              <span>{isArabic ? "عرض جميع المشاريع" : "VIEW ALL PROJECT"}</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#009e90] group-hover:scale-105 transition-transform duration-300">
                {isArabic ? (
                  <ArrowLeft className="w-4 h-4 text-[#009e90] group-hover:-translate-x-0.5 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#009e90] group-hover:translate-x-0.5 transition-transform duration-300" />
                )}
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            PROJECTS CAROUSEL WITH EXACT MATCHING POSITIONED ARROWS
            ============================================================ */}
        <div className="relative">
          {/* Navigation Arrow: Previous (Left) - vertically centered on image boundary */}
          <button
            onClick={() => scroll("left")}
            aria-label={isArabic ? "السابق" : "Previous Project"}
            className="absolute -left-3 sm:-left-5 top-[190px] sm:top-[200px] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-105"
          >
            {isArabic ? (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            )}
          </button>

          {/* Navigation Arrow: Next (Right) - vertically centered on image boundary */}
          <button
            onClick={() => scroll("right")}
            aria-label={isArabic ? "التالي" : "Next Project"}
            className="absolute -right-3 sm:-right-5 top-[190px] sm:top-[200px] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-105"
          >
            {isArabic ? (
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            ) : (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>

          {/* Cards Grid / Snap Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-4 pt-2 px-1 no-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={100 + index * 80}
                className="group flex-shrink-0 w-[275px] sm:w-[300px] lg:w-auto snap-start flex flex-col"
              >
                <Link
                  href={project.link}
                  className="relative block bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_42px_rgba(1,169,160,0.18)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col h-full"
                >
                  {/* Top Photo Container */}
                  <div className="relative w-full h-[195px] sm:h-[210px] overflow-hidden bg-stone-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Teal bottom accent bar along photo */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#009e90] z-10" />

                    {/* Square Teal Badge with Reticle Diamond Icon at bottom-left */}
                    <div
                      className={`absolute bottom-0 ${
                        isArabic ? "right-4 sm:right-5" : "left-4 sm:left-5"
                      } z-20 w-11 h-11 bg-[#009e90] rounded-t-xl flex items-center justify-center shadow-md group-hover:bg-[#01887e] transition-colors duration-300`}
                    >
                      <BlueprintDiamondIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Bottom White Info Box with Inverted Fillet Cutout */}
                  <div className="relative pt-6 pb-9 px-5 sm:px-6 flex flex-col flex-grow bg-white">
                    {/* Project Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-stone-900 tracking-tight leading-snug group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-1 mb-2">
                      {project.title}
                    </h3>

                    {/* Project Subtitle / Category */}
                    <p
                      className={`text-xs sm:text-[13px] text-stone-500 font-normal leading-[1.6] line-clamp-2 ${
                        isArabic ? "pl-8" : "pr-8"
                      }`}
                    >
                      {project.category}
                    </p>

                    {/* Inverted Scooped Cutout Corner */}
                    <div
                      className={`absolute bottom-0 ${
                        isArabic
                          ? "left-0 rounded-tr-[22px]"
                          : "right-0 rounded-tl-[22px]"
                      } w-[54px] h-[54px] bg-[#E6F7F6] pointer-events-none z-10`}
                    >
                      {/* Top Fillet Curve */}
                      <div
                        className={`absolute -top-[16px] ${
                          isArabic
                            ? "left-0 rounded-bl-[16px] shadow-[-4px_4px_0_4px_#ffffff]"
                            : "right-0 rounded-br-[16px] shadow-[4px_4px_0_4px_#ffffff]"
                        } w-[16px] h-[16px] pointer-events-none`}
                      />
                      {/* Side Fillet Curve */}
                      <div
                        className={`absolute bottom-0 ${
                          isArabic
                            ? "-right-[16px] rounded-bl-[16px] shadow-[-4px_4px_0_4px_#ffffff]"
                            : "-left-[16px] rounded-br-[16px] shadow-[4px_4px_0_4px_#ffffff]"
                        } w-[16px] h-[16px] pointer-events-none`}
                      />
                    </div>

                    {/* Circular Teal Arrow Button nestled inside the scooped corner */}
                    <div
                      className={`absolute bottom-2.5 ${
                        isArabic ? "left-2.5" : "right-2.5"
                      } z-20 w-10 h-10 rounded-full bg-[#009e90] group-hover:bg-[#01887e] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,158,144,0.35)] group-hover:scale-110 transition-all duration-300`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 text-white transition-transform duration-300 ${
                          isArabic
                            ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rotate-[-90deg]"
                            : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
