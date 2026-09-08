"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceSection() {
  const { isArabic } = useLanguage();

  const leftCards = [
    {
      number: "01",
      title: isArabic ? "خبرة واحترافية متقدمة" : "Experienced & Professional",
      description: isArabic
        ? "فريق من المتخصصين ذوي الخبرة العالية لتقديم حلول هندسية موثوقة بكل ثقة."
        : "Skilled professionals with proven expertise Delivering dependable solutions confidence.",
    },
    {
      number: "03",
      title: isArabic ? "دقة وإتقان في التنفيذ" : "Quality Workmanship",
      description: isArabic
        ? "معايير تنفيذ استثنائية في كل مشروع نلتزم به لأداء يدوم وثقة لا تنتهي."
        : "High standards in every project undertake Built for lasting performance and reliability.",
    },
    {
      number: "05",
      title: isArabic ? "خدمة موثوقة في الموعد" : "Reliable & Timely Service",
      description: isArabic
        ? "التزام صارم بإنجاز كافة المشاريع في مواعيدها المحددة مع العناية بأدق التفاصيل."
        : "Committed to completing every job on schedule Without compromising to detail.",
    },
  ];

  const rightCards = [
    {
      number: "02",
      title: isArabic ? "التركيز الكامل على العميل" : "Customer-Focused",
      description: isArabic
        ? "نستمع لاحتياجاتكم بدقة ونبتكر حلولاً مخصصة تلبي كافة تطلعاتكم وتفوقها."
        : "We listen, understand, and tailor ever meet your specific needs and expectations.",
    },
    {
      number: "04",
      title: isArabic ? "أسعار تنافسية مدروسة" : "Competitive Pricing",
      description: isArabic
        ? "عروض أسعار شفافة وتنافسية تقدم قيمة حقيقية بدون أي مساومة على الجودة."
        : "Transparent and competitive Delivering exceptional value without compromise.",
    },
    {
      number: "06",
      title: isArabic ? "استجابة سريعة ودعم دائم" : "Fast Response & Support",
      description: isArabic
        ? "استجابة فورية ودعم فني متكامل في أي وقت لتقديم أفضل الحلول الفعالة."
        : "Quick assistance when you need it most Providing effective solutions with support.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "لماذا تختارنا" : "WHY CHOOSE US"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            <span>
              {isArabic ? "الخبرة، الجودة و " : "Experience, Quality & "}
            </span>
            <span className="text-[#01a9a0]">
              {isArabic ? "الالتزام" : "Commitment"}
            </span>
            <br />
            <span className="text-[#01a9a0]">
              {isArabic ? "الذي يمكنك الاعتماد عليه" : "You Can Count On"}
            </span>
          </h2>
        </div>

        {/* ============================================================
            MAIN 3-COLUMN LAYOUT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* ------------------------------------------------------------
              LEFT COLUMN: CARDS 01, 03, 05
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-2 lg:order-1">
            {leftCards.map((card, idx) => (
              <div
                key={card.number}
                data-aos={isArabic ? "fade-left" : "fade-right"}
                data-aos-delay={100 + idx * 100}
                className="group bg-white rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-100/90 hover:shadow-[0_16px_36px_rgba(1,169,160,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Row: Number Badge + Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01a9a0] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm flex-shrink-0 shadow-[0_3px_10px_rgba(1,169,160,0.35)] group-hover:scale-105 transition-transform duration-300">
                    {card.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------
              CENTER COLUMN: HERO WORKERS IMAGE + STRIPES + BADGE
              ------------------------------------------------------------ */}
          <div
            data-aos="fade-up"
            data-aos-delay={150}
            className="lg:col-span-4 flex flex-col items-center order-1 lg:order-2"
          >
            {/* Image Container with rounded top and soft elevation */}
            <div className="relative w-full max-w-[380px] lg:max-w-none h-[380px] sm:h-[440px] md:h-[470px] rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] group bg-stone-100">
              <Image
                src="/media/img001.png"
                alt={isArabic ? "مهندسون واستشاريون في الموقع" : "Engineers reviewing project blueprints"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>

            {/* Decorative Horizontal Stripes */}
            <div className="w-full max-w-[380px] lg:max-w-none flex flex-col gap-1.5 my-3.5 px-2">
              <div className="h-[2.5px] bg-[#01a9a0] rounded-full w-full opacity-90" />
              <div className="h-[2.5px] bg-[#01a9a0] rounded-full w-full opacity-80" />
              <div className="h-[2.5px] bg-[#01a9a0] rounded-full w-full opacity-70" />
              <div className="h-[2.5px] bg-[#01a9a0] rounded-full w-full opacity-60" />
            </div>

            {/* Solid Teal Excellence Banner */}
            <div className="w-full max-w-[380px] lg:max-w-none bg-[#009e90] rounded-xl py-3 px-6 text-center shadow-[0_6px_20px_rgba(0,158,144,0.3)] group hover:bg-[#01887e] transition-colors duration-300">
              <span className="text-white font-bold text-sm sm:text-base tracking-wide">
                {isArabic ? "التميز في المقاولات منذ - 2010" : "Contracting Excellence Since - 2010"}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: CARDS 02, 04, 06
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-3">
            {rightCards.map((card, idx) => (
              <div
                key={card.number}
                data-aos={isArabic ? "fade-right" : "fade-left"}
                data-aos-delay={100 + idx * 100}
                className="group bg-white rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-100/90 hover:shadow-[0_16px_36px_rgba(1,169,160,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Row: Number Badge + Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01a9a0] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm flex-shrink-0 shadow-[0_3px_10px_rgba(1,169,160,0.35)] group-hover:scale-105 transition-transform duration-300">
                    {card.number}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
