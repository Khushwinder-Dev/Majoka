"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Custom SVG Icons crafted to match the design reference image
function EpoxyIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sparkles / dots on top left */}
      <circle cx="9" cy="11" r="1.5" fill="#01a9a0" />
      <circle cx="15" cy="8" r="1.5" fill="#01a9a0" />
      <circle cx="7" cy="17" r="1.2" fill="#01a9a0" />
      <path
        d="M12 13L14 15M14 13L12 15"
        stroke="#01a9a0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Roller cylinder */}
      <rect
        x="18"
        y="6"
        width="11"
        height="5"
        rx="2"
        transform="rotate(35 18 6)"
        stroke="#01a9a0"
        strokeWidth="2"
      />
      {/* Roller arm and shaft */}
      <path
        d="M26 12L28 15C28.8 16.2 28.2 17.8 26.8 18.2L20.5 20.2"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Long Handle */}
      <path
        d="M20.5 20.2L11 30"
        stroke="#01a9a0"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PolyureaIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center large droplet */}
      <path
        d="M18 5C18 5 12 14.5 12 18.5C12 21.8 14.7 24.5 18 24.5C21.3 24.5 24 21.8 24 18.5C24 14.5 18 5 18 5Z"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner droplet ripple */}
      <path
        d="M16 16.5C16.5 15 17.5 14 18.5 13.5"
        stroke="#01a9a0"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Left small droplet */}
      <path
        d="M7 16C7 16 4 20.5 4 22.5C4 24.2 5.3 25.5 7 25.5C8.7 25.5 10 24.2 10 22.5C10 20.5 7 16 7 16Z"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Right small droplet */}
      <path
        d="M29 16C29 16 26 20.5 26 22.5C26 24.2 27.3 25.5 29 25.5C30.7 25.5 32 24.2 32 22.5C32 20.5 29 16 29 16Z"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Base water line */}
      <path
        d="M9 29C13 30.5 23 30.5 27 29"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InjectionIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Injector Packer / Rig Top */}
      <path
        d="M14 8H22"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 8V14"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Packer Body */}
      <rect
        x="13"
        y="14"
        width="10"
        height="8"
        rx="2"
        stroke="#01a9a0"
        strokeWidth="2"
      />
      {/* Injection Needle / Shaft */}
      <path
        d="M18 22V29"
        stroke="#01a9a0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Foundation / Crack Ground line with crack lines */}
      <path
        d="M6 29H30"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 29L15 33M18 29L21 33"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Pressure indicators */}
      <path
        d="M8 15L11 17M28 15L25 17"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DBBoxIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Electrical Box Cabinet */}
      <rect
        x="6"
        y="8"
        width="24"
        height="22"
        rx="3"
        stroke="#01a9a0"
        strokeWidth="2"
      />
      {/* Top connection lines / wires */}
      <path
        d="M11 5V8M18 5V8M25 5V8"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Internal Grid / Breakers */}
      <path
        d="M18 8V30"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 19H30"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Switch / Breaker toggles */}
      <rect x="9.5" y="11.5" width="4" height="4" rx="1" fill="#01a9a0" />
      <rect x="22.5" y="11.5" width="4" height="4" rx="1" fill="#01a9a0" />
      <rect x="9.5" y="22.5" width="4" height="4" rx="1" fill="#01a9a0" />
      <rect x="22.5" y="22.5" width="4" height="4" rx="1" fill="#01a9a0" />
    </svg>
  );
}

function IndustrialIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Industrial Gear */}
      <circle
        cx="14"
        cy="18"
        r="6"
        stroke="#01a9a0"
        strokeWidth="2"
      />
      <circle cx="14" cy="18" r="2.5" fill="#01a9a0" />
      {/* Gear teeth */}
      <path
        d="M14 9V12M14 24V27M5 18H8M20 18H23M8 12L10 14M18 22L20 24M8 24L10 22M18 14L20 12"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Spray Nozzle */}
      <path
        d="M23 15L27 18L23 21V15Z"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Spray Mist Cone */}
      <path
        d="M28 16L32 14M29 18H33M28 20L32 22"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaterproofingIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Protective Shield / Hexagon */}
      <path
        d="M18 5L28 9V17C28 23.5 23.5 28.5 18 31C12.5 28.5 8 23.5 8 17V9L18 5Z"
        stroke="#01a9a0"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Water Drop Inside */}
      <path
        d="M18 11C18 11 14 16.5 14 19.5C14 21.7 15.8 23.5 18 23.5C20.2 23.5 22 21.7 22 19.5C22 16.5 18 11 18 11Z"
        stroke="#01a9a0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Drop Ripple */}
      <path
        d="M16 19C16.5 18 17.5 17.5 18.5 17.2"
        stroke="#01a9a0"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProtectionServicesSection() {
  const { isArabic } = useLanguage();

  const services = [
    {
      id: 1,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (1).png",
      icon: <EpoxyIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "طلاء أرضيات الإيبوكسي" : "Epoxy Floor Coating",
      description: isArabic
        ? "حلول أرضيات متينة وسلسة وعالية الأداء للمنشآت والمستودعات."
        : "Durable, Seamless & High-Performance Flooring Solutions",
      link: "/services",
    },
    {
      id: 2,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (2).png",
      icon: <PolyureaIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "عزل البولي يوريا" : "Polyurea Waterproofing",
      description: isArabic
        ? "حماية متقدمة للأسطح الممتدة وسريعة الجفاف للمتانة طويلة الأمد."
        : "Advanced Protection for Durable Seamless & Long Surfaces",
      link: "/services",
    },
    {
      id: 3,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (3).png",
      icon: <InjectionIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "عزل الحقن المائي" : "Injection Waterproofing",
      description: isArabic
        ? "حقن وسد دقيق للشقوق الخرسانية لحماية دائمة من تسرب المياه."
        : "Precision Sealing for Lasting Water Protection",
      link: "/services",
    },
    {
      id: 4,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (4).png",
      icon: <DBBoxIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "تركيب لوحات التوزيع" : "DB Box Installation",
      description: isArabic
        ? "حلول توزيع كهربائي آمنة وموثوقة للمباني والمنشآت الحديثة."
        : "Safe & Reliable Electrical Distribution Solutions",
      link: "/services",
    },
    {
      id: 5,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (5).png",
      icon: <IndustrialIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "الطلاءات الصناعية" : "Industrial Coatings",
      description: isArabic
        ? "حماية متينة فائقة للمنشآت المتطلبة والبيئات الصناعية القاسية."
        : "Durable Protection for Demand Industrial Environments",
      link: "/services",
    },
    {
      id: 6,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (6).png",
      icon: <WaterproofingIcon className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />,
      title: isArabic ? "العزل المائي الشامل" : "WATERPROOFING",
      description: isArabic
        ? "حماية متقدمة ومضمونة ضد تسرب المياه والرطوبة للمسابح والأسطح."
        : "Advanced Protection Against Water & Moisture",
      link: "/services",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E6F7F6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Title & Eyebrow */}
          <div>
            {/* Eyebrow / Category Tag */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase text-[#01a9a0]">
                {isArabic ? "خدماتنا" : "OUR SERVICES"}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14]">
              <span>{isArabic ? "حماية شاملة لكل" : "Complete Protection For"}</span>
              <br />
              <span className="text-[#01a9a0]">
                {isArabic ? "الأسطح والمباني" : "Every Surface"}
              </span>
            </h2>
          </div>

          {/* Right CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-3.5 bg-[#009e90] hover:bg-[#01887e] text-white pl-6 pr-2.5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,158,144,0.25)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.35)] transition-all duration-300 group"
            >
              <span>{isArabic ? "عرض جميع الخدمات" : "VIEW ALL SERVICES"}</span>
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
            SERVICES 6-CARD GRID
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-14 gap-x-6 lg:gap-x-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
              className="group flex flex-col"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] lg:h-[260px] rounded-3xl overflow-hidden shadow-[0_8px_25px_-10px_rgba(0,0,0,0.12)] bg-stone-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Overlapping Floating Info Card */}
              <div className="relative -mt-14 sm:-mt-16 mx-4 sm:mx-5 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] border border-stone-100/90 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_38px_-8px_rgba(1,169,160,0.18)]">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="flex-shrink-0 text-[#01a9a0]">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-stone-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-1">
                    {service.title}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed min-h-[38px] line-clamp-2">
                  {service.description}
                </p>

                {/* CTA Link: Get Started */}
                <div className="mt-4 pt-1">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#01a9a0] hover:text-[#01887e] transition-colors duration-200 group/link"
                  >
                    <span>{isArabic ? "ابدأ الآن" : "Get Started"}</span>
                    {isArabic ? (
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
