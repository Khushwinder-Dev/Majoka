"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";


export default function IndustriesSection() {
  const { isArabic } = useLanguage();

  const leftIndustries = [
    {
      id: "construction",
      title: isArabic ? "البناء والتطوير العقاري" : "Construction & Real Estate",
      description: isArabic
        ? "حلول عزل وحماية موثوقة وعالية الكفاءة للمباني والهياكل والمشاريع العمرانية."
        : "Reliable waterproofing and protective solutions for buildings, structures, and developments.",
    },
    {
      id: "oil-gas",
      title: isArabic ? "قطاع النفط والغاز" : "Oil & Gas",
      description: isArabic
        ? "حماية تخصصية متطورة ضد التآكل والكيماويات والرطوبة وظروف التشغيل القاسية."
        : "Specialized protection against corrosion, chemicals, moisture, and harsh operating conditions.",
    },
    {
      id: "commercial-retail",
      title: isArabic ? "المراكز التجارية والتجزئة" : "Commercial & Retail",
      description: isArabic
        ? "حلول احترافية متكاملة لحماية المكاتب والمجمعات التجارية والمستودعات والمنشآت."
        : "Professional solutions that protect offices, shopping centers, warehouses, and commercial properties.",
    },
  ];

  const rightIndustries = [
    {
      id: "industrial",
      title: isArabic ? "القطاع الصناعي والتصنيع" : "Industrial & Manufacturing",
      description: isArabic
        ? "أنظمة طلاء وعزل مائي عالية الأداء ومصممة لتحمل أقسى البيئات الصناعية."
        : "High-performance coating and waterproofing systems built for demanding industrial environments.",
    },
    {
      id: "hospitality",
      title: isArabic ? "الضيافة والفنادق" : "Hospitality & Hotels",
      description: isArabic
        ? "حلول عزل متينة ومستدامة للفنادق والمنتجعات والمسابح والأسطح والمرافق السياحية."
        : "Durable waterproofing solutions for hotels, resorts, pools, roofs, and guest facilities.",
    },
    {
      id: "infrastructure",
      title: isArabic ? "البنية التحتية والمرافق العامة" : "Infrastructure & Utilities",
      description: isArabic
        ? "حماية مستدامة طويلة الأمد لشبكات البنية التحتية ومحطات المياه والمنشآت الخرسانية."
        : "Long-lasting protection for infrastructure, water facilities, concrete structures, and essential assets.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "القطاعات التي نخدمها" : "INDUSTRIES WE SERVE"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            <span>
              {isArabic
                ? "حلول احترافية، دقيقة، و "
                : "Professional, Clear, And "}
            </span>
            <span className="text-[#01a9a0]">
              {isArabic ? "مثالية تلبي" : "Ideal For A"}
            </span>
            <br />
            <span className="text-[#01a9a0]">
              {isArabic
                ? "كافة احتياجات مشاريع المقاولات"
                : "Contractor Services Website"}
            </span>
          </h2>
        </div>

        {/* ============================================================
            MAIN 3-COLUMN LAYOUT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* ------------------------------------------------------------
              LEFT COLUMN: 3 INDUSTRIES (Aligned towards Center in LTR)
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-10 order-2 lg:order-1">
            {leftIndustries.map((item, idx) => (
              <div
                key={item.id}
                data-aos={isArabic ? "fade-left" : "fade-right"}
                data-aos-delay={100 + idx * 100}
                className={`flex flex-col group ${
                  isArabic
                    ? "text-left items-start"
                    : "text-left sm:text-right sm:items-end"
                }`}
              >
                {/* Mint Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-[#E6F7F6] flex items-center justify-center text-[#01a9a0] mb-3 group-hover:bg-[#d4f4f1] group-hover:scale-105 transition-all duration-300 shadow-sm ${
                    isArabic ? "mr-auto" : "sm:ml-auto"
                  }`}
                >
                  <Image
                    src="/media/Frame.svg"
                    alt={item.title}
                    width={30}
                    height={30}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Title (Teal in Left Column as in reference) */}
                <h3 className="text-lg sm:text-[19px] font-bold text-[#01a9a0] mb-2 tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------
              CENTER COLUMN: HERO IMAGE
              ------------------------------------------------------------ */}
          <div
            data-aos="fade-up"
            data-aos-delay={150}
            className="lg:col-span-4 flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[360px] lg:max-w-none h-[420px] sm:h-[480px] md:h-[520px] rounded-[30px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] group bg-stone-100">
              <Image
                src="/media/Img0002.png"
                alt={
                  isArabic
                    ? "مهندسون ومستشارون في قطاع المقاولات"
                    : "Contractor engineers and consultants"
                }
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: 3 INDUSTRIES (Left-aligned in LTR)
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-10 order-3">
            {rightIndustries.map((item, idx) => (
              <div
                key={item.id}
                data-aos={isArabic ? "fade-right" : "fade-left"}
                data-aos-delay={100 + idx * 100}
                className={`flex flex-col group ${
                  isArabic
                    ? "text-right items-end"
                    : "text-left items-start"
                }`}
              >
                {/* Mint Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-[#E6F7F6] flex items-center justify-center text-[#01a9a0] mb-3 group-hover:bg-[#d4f4f1] group-hover:scale-105 transition-all duration-300 shadow-sm ${
                    isArabic ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <Image
                    src="/media/Frame.svg"
                    alt={item.title}
                    width={30}
                    height={30}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Title (Dark Stone in Right Column as in reference) */}
                <h3 className="text-lg sm:text-[19px] font-bold text-stone-900 group-hover:text-[#01a9a0] transition-colors duration-300 mb-2 tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
