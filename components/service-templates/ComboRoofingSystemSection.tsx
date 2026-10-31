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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ── LEFT COLUMN: Diagram & 2x2 Image Grid ── */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col w-full">
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
            className="group relative w-full aspect-[605/313] bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center p-2 mb-3.5"
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
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bottom 2x2 Image Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
            {PROCESS_IMAGES.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveModalImg({ src: img.src, alt: img.alt })}
                className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                title={isArabic ? img.labelAr : img.labelEn}
              >
                <Image
                  src={img.src}
                  alt={isArabic ? img.labelAr : img.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-stone-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                  <ZoomIn className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Content & Application Method ── */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c3a] tracking-tight leading-tight">
            {isArabic ? "نظام عزل الأسطح بالكومبو" : "Combo Roofing System"}
          </h2>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-[12px] font-bold text-stone-500 uppercase tracking-wider mt-1.5 mb-3">
            {isArabic
              ? "عزل مائي متكامل بدون فواصل مع تشطيب نهائي للسطح:"
              : "SEAMLESS WATERPROOFING WITH FINISHED ROOF TOP:"}
          </p>

          {/* Description Paragraph */}
          <p className="text-[13px] sm:text-[13.5px] text-stone-600 leading-relaxed font-normal mb-6">
            {isArabic
              ? "نظام أكوا شيلد (Aqua Shield) هو عبارة عن تقنية رش رغوة البولي يوريثان لتوفير حماية حرارية ومائية متكاملة لجميع أنواع الأسطح والأسطح المعدنية المموجة ومستودعات التبريد والمباني السكنية والصناعية، كما يمنح مظهراً انسيابياً جميلاً لا يتطلب أي خطوات عمل إضافية للتشطيب."
              : "Aqua shield system is basically a polyurethane foam spray to provide you thermal protection for the both heat and waterproofing which covers all types of roof and corrugated sheet based shields as well as cold storages and other thermal based livings and industries, while it gives a nice and smooth look which does not require any further working step to make it better or finished."}
          </p>

          {/* Method of Application Heading */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111c3a] tracking-tight leading-snug mb-4">
            {isArabic ? "طريقة التطبيق والتنفيذ" : "Method of Application"}
          </h3>

          {/* 2-Column Application Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
            {APPLICATION_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e2574c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[11.5px] sm:text-[12.5px] font-bold text-stone-700 tracking-wide uppercase">
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
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center"
          >
            <button
              onClick={() => setActiveModalImg(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
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

