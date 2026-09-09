"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutCompanySection() {
  const { isArabic } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      id: 1,
      icon: "/media/aboutSection/Frame.svg",
      title: isArabic ? "مواد عالية الجودة" : "Quality Materials",
      description: isArabic
        ? "مواد ممتازة مختارة لتحقيق المتانة والأداء والحماية الفائقة."
        : "Premium materials selected durability performance, and protection.",
    },
    {
      id: 2,
      icon: "/media/aboutSection/Frame (1).svg",
      title: isArabic ? "خبرة فنية متقدمة" : "Technical Expertise",
      description: isArabic
        ? "حلول هندسية متخصصة بناءً على متطلبات وظروف كل مشروع."
        : "Professional solutions based on the condition and requirements of project.",
    },
    {
      id: 3,
      icon: "/media/aboutSection/Frame (2).svg",
      title: isArabic ? "تنفيذ دقيق" : "Precise Execution",
      description: isArabic
        ? "إعداد دقيق وتثبيت احترافي لضمان نتائج موثوقة وطويلة الأمد."
        : "Careful preparation and installation to ensure reliable, long-lasting results.",
    },
    {
      id: 4,
      icon: "/media/aboutSection/Frame (4).svg",
      title: isArabic ? "حماية طويلة الأمد" : "Long-Term Protection",
      description: isArabic
        ? "حلول مصممة لحماية ممتلكاتك وتقليل التكاليف المستقبلية."
        : "Solutions designed to protect your property and reduce future costs.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="max-w-3xl mb-12 sm:mb-14 lg:mb-16">
          {/* Eyebrow / Badge */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="inline-block h-[2px] w-8 sm:w-10 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "عن شركتنا" : "ABOUT OUR COMPANY"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
            <span>{isArabic ? "القوة في كل بناء " : "Strength In Every Build "}</span>
            <span className="text-[#01a9a0]">{isArabic ? "جودة " : "Quality"}</span>
            <br />
            <span className="text-[#01a9a0]">{isArabic ? "تدوم طويلاً" : "That Lasts"}</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-4 sm:mt-5 max-w-2xl font-normal">
            {isArabic
              ? "نقدم حلولاً احترافية في العزل المائي، العزل الحراري، طلاء الأرضيات، والحماية الهيكلية التي تعالج المشكلات من جذورها، بالجمع بين الخبرة الفنية والمواد عالية الجودة والتنفيذ الدقيق لتحقيق نتائج متينة وموثوقة."
              : "We provide professional waterproofing, insulation, floor coating, and structural protection solutions that address problems at their source, combining technical expertise, quality materials, and precise execution for reliable, durable results."}
          </p>
        </div>

        {/* ============================================================
            MAIN 3-COLUMN CONTENT GRID
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
          {/* ------------------------------------------------------------
              COLUMN 1 (LEFT): WORKERS IMAGE WITH VIDEO PLAY BUTTON
              ------------------------------------------------------------ */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col">
            <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_35px_-15px_rgba(0,0,0,0.25)] group bg-stone-100">
              <Image
                src="/about-us/company-workers.png"
                alt={isArabic ? "مهندسون وعمال شركة تاج الرحمة" : "Taj Al Rahmah site engineers and workers"}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 hover:bg-white text-[#01a9a0] flex items-center justify-center shadow-[0_12px_35px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group/btn"
                  aria-label={isArabic ? "تشغيل الفيديو" : "Play Company Video"}
                  title={isArabic ? "تشغيل الفيديو" : "Play Video"}
                >
                  <Play
                    className="w-7 h-7 sm:w-8 sm:h-8 fill-[#01a9a0] text-[#01a9a0] ml-1 transition-transform group-hover/btn:scale-110"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              COLUMN 2 (MIDDLE): 4 FEATURE ITEMS STACKED
              ------------------------------------------------------------ */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between gap-6 sm:gap-7 py-1">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-4 sm:gap-4.5 group">
                {/* Icon Container (35x35 SVG from /media/aboutSection) */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-[#EAF7F6] border border-teal-100/60 flex items-center justify-center shrink-0 group-hover:bg-[#d8f4f1] transition-all duration-300 shadow-xs">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={35}
                    height={35}
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight leading-snug group-hover:text-[#01a9a0] transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed mt-1 font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------
              COLUMN 3 (RIGHT): ENGINEER WITH LAPTOP + BADGE & CTA BUTTON
              ------------------------------------------------------------ */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-between">
            {/* Top Image with Attached Experience Badge */}
            <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[270px] xl:h-[290px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_35px_-15px_rgba(0,0,0,0.25)] group bg-stone-100">
              <Image
                src="/about-us/welcompop.png"
                alt={isArabic ? "مهندس تقني مع لابتوب" : "Technical engineer working with laptop"}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Vertical Experience Badge (Matching Reference Design) */}
              <div
                className={`absolute bottom-0 ${
                  isArabic
                    ? "right-0 rounded-tl-2xl sm:rounded-tl-3xl rounded-br-2xl sm:rounded-br-3xl"
                    : "left-0 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl"
                } bg-[#01a9a0] text-white w-14 sm:w-16 md:w-[68px] h-[190px] sm:h-[215px] md:h-[235px] shadow-xl flex items-center justify-center select-none z-10 overflow-hidden`}
              >
                <div
                  className={`flex items-center gap-3 w-[200px] justify-center ${
                    isArabic ? "rotate-90" : "-rotate-90"
                  } transform`}
                >
                  {/* Big Experience Number */}
                  <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
                    17
                  </span>

                  {/* 2-Line Label */}
                  <div
                    className={`flex flex-col text-[11px] sm:text-xs font-bold leading-tight text-white whitespace-nowrap ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    <span>+ {isArabic ? "عام من" : "Year Of"}</span>
                    <span>{isArabic ? "الخبرة" : "Experience"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Paragraph & Action Button */}
            <div className="flex flex-col items-start mt-5 sm:mt-6">
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed mb-6 font-normal">
                {isArabic
                  ? "نحدد السبب الجذري، ونختار النظام المناسب، وننفذ بدقة متناهية، ونجري اختبارات الجودة قبل التسليم."
                  : "We identify the root cause, select the right system, execute with precision, and conduct quality testing before handover."}
              </p>

              {/* Pill Button: ABOUT MORE */}
              <Link
                href="/about-us"
                className="inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_18px_rgba(1,169,160,0.35)] hover:shadow-[0_6px_22px_rgba(1,169,160,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
              >
                <span>{isArabic ? "المزيد عنا" : "ABOUT MORE"}</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#01a9a0] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-xs">
                  <ArrowRight
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] ${
                      isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
                    }`}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          VIDEO MODAL POPUP
          ============================================================ */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header / Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-all duration-200 cursor-pointer"
              aria-label={isArabic ? "إغلاق" : "Close video"}
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full">
              <video
                src="/Hero.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
