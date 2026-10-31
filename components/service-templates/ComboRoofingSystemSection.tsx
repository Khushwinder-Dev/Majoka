"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ZoomIn, X } from "lucide-react";

interface Props {
  isArabic?: boolean;
}

const DIAGRAM_IMAGE =
  "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/combo-roofing-diagram.webp";

const PROCESS_IMAGES = [
  {
    src: "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/method-pu-foam.jpg",
    alt: "Polyurethane Foam Spraying",
    labelEn: "Polyurethane Foam",
    labelAr: "رش رغوة البولي يوريثان",
  },
  {
    src: "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/method-rubberized-coating.webp",
    alt: "Rubberized Coating of Acrylic",
    labelEn: "Rubberized Coating",
    labelAr: "طلاء أكريليكي مطاطي",
  },
  {
    src: "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/method-finished-roof.webp",
    alt: "Seamless Waterproofing with Finished Roof Top",
    labelEn: "Finished Roof Top",
    labelAr: "السطح النهائي المشطب",
  },
  {
    src: "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/method-screed-slopes.jpg",
    alt: "Screed in Panels and Slopes",
    labelEn: "Screed & Slopes",
    labelAr: "صب الخرسانة الرغوية والميول",
  },
];

const APPLICATION_STEPS = [
  {
    en: "SURFACE PREPARATION",
    ar: "تجهيز وتنظيف السطح",
  },
  {
    en: "RUBBERIZED COATING OF ACRYLIC",
    ar: "طلاء أكريليكي مطاطي عازل",
  },
  {
    en: "POLYURETHANE FOAM",
    ar: "رش رغوة البولي يوريثان",
  },
  {
    en: "SCREED IN PANELS AND SLOPES",
    ar: "صب الخرسانة الرغوية والميول",
  },
];

export default function ComboRoofingSystemSection({ isArabic = false }: Props) {
  const [activeModalImg, setActiveModalImg] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div
      className="w-full text-left"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-start">
        {/* ── LEFT COLUMN: Compact Diagram & 2x2 Image Grid ── */}
        <div className="lg:col-span-4 xl:col-span-4 w-full max-w-[250px] sm:max-w-[270px] mx-auto lg:mx-0 flex flex-col">
          {/* Top 3D Diagram */}
          <div
            onClick={() =>
              setActiveModalImg({
                src: DIAGRAM_IMAGE,
                alt: isArabic
                  ? "مخطط طبقات نظام الكومبو سيستم للأسطح"
                  : "Combo Roofing System Layered Cross Section Diagram",
              })
            }
            className="group relative w-full aspect-[605/313] bg-white rounded-lg overflow-hidden border border-stone-200/90 shadow-2xs hover:border-[#009e90]/40 hover:shadow-[0_4px_16px_rgba(0,158,144,0.12)] transition-all duration-300 cursor-pointer flex items-center justify-center p-1.5 mb-2.5"
            title={isArabic ? "اضغط للتكبير" : "Click to enlarge diagram"}
          >
            <Image
              src={DIAGRAM_IMAGE}
              alt={
                isArabic
                  ? "مخطط طبقات نظام الكومبو سيستم للأسطح"
                  : "Combo Roofing System Layered Cross Section Diagram"
              }
              fill
              unoptimized
              sizes="270px"
              className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/95 backdrop-blur-xs text-[#009e90] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs border border-stone-100">
              <ZoomIn className="w-3 h-3" />
            </div>
          </div>

          {/* Bottom 2x2 Compact Image Grid */}
          <div className="grid grid-cols-2 gap-2 w-full">
            {PROCESS_IMAGES.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveModalImg({ src: img.src, alt: img.alt })}
                className="group relative aspect-square rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs hover:border-[#009e90]/40 hover:shadow-[0_4px_16px_rgba(0,158,144,0.12)] transition-all duration-300 cursor-pointer"
                title={isArabic ? img.labelAr : img.labelEn}
              >
                <Image
                  src={img.src}
                  alt={isArabic ? img.labelAr : img.alt}
                  fill
                  unoptimized
                  sizes="135px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/95 text-[#009e90] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs border border-stone-100">
                  <ZoomIn className="w-2.5 h-2.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Content & Application Method ── */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">
          {/* Main Title - Site Theme Color */}
          <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#009e90] tracking-tight leading-tight">
            {isArabic ? "نظام عزل الأسطح بالكومبو" : "Combo Roofing System"}
          </h2>

          {/* Subtitle - Theme Tone */}
          <p className="text-[11px] sm:text-[11.5px] font-bold text-[#009e90]/80 uppercase tracking-wider mt-1 mb-2.5">
            {isArabic
              ? "عزل مائي متكامل بدون فواصل مع تشطيب نهائي للسطح:"
              : "SEAMLESS WATERPROOFING WITH FINISHED ROOF TOP:"}
          </p>

          {/* Description Paragraph */}
          <p className="text-[13px] sm:text-[13.5px] text-stone-600 leading-relaxed font-normal mb-5">
            {isArabic
              ? "نظام أكوا شيلد (Aqua Shield) هو عبارة عن تقنية رش رغوة البولي يوريثان لتوفير حماية حرارية ومائية متكاملة لجميع أنواع الأسطح والأسطح المعدنية المموجة ومستودعات التبريد والمباني السكنية والصناعية، كما يمنح مظهراً انسيابياً جميلاً لا يتطلب أي خطوات عمل إضافية للتشطيب."
              : "Aqua shield system is basically a polyurethane foam spray to provide you thermal protection for the both heat and waterproofing which covers all types of roof and corrugated sheet based shields as well as cold storages and other thermal based livings and industries, while it gives a nice and smooth look which does not require any further working step to make it better or finished."}
          </p>

          {/* Method of Application Heading - Site Theme Color */}
          <h3 className="text-lg sm:text-[20px] font-extrabold text-[#009e90] tracking-tight leading-snug mb-3.5">
            {isArabic ? "طريقة التطبيق والتنفيذ" : "Method of Application"}
          </h3>

          {/* 2-Column Application Checklist - Site Theme Color Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
            {APPLICATION_STEPS.map((step, idx) => (
              <div key={idx} className="group/item flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-[#009e90] flex items-center justify-center text-white flex-shrink-0 shadow-xs group-hover/item:scale-110 transition-transform duration-200">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-[11px] sm:text-[11.5px] font-bold text-stone-700 tracking-wide uppercase group-hover/item:text-[#009e90] transition-colors duration-200">
                  {isArabic ? step.ar : step.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── IMAGE ZOOM LIGHTBOX MODAL ── */}
      {activeModalImg && (
        <div
          onClick={() => setActiveModalImg(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center border border-[#009e90]/20"
          >
            <button
              onClick={() => setActiveModalImg(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-[#009e90]/10 hover:text-[#009e90] text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full h-[65vh] max-h-[600px] flex items-center justify-center">
              <Image
                src={activeModalImg.src}
                alt={activeModalImg.alt}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-xs text-stone-500 mt-2 font-medium">{activeModalImg.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
