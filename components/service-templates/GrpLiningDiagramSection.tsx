"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ShieldCheck, Layers } from "lucide-react";

interface Props {
  isArabic?: boolean;
}

const GRP_DIAGRAM_IMAGE =
  "/servicesSubServicesContent/services/waterproofing/subservices/grp-fiberglass/grp-lining-cross-section.webp";

export default function GrpLiningDiagramSection({ isArabic = false }: Props) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const imageAlt = isArabic
    ? "مخطط طبقات نظام تبطين وعزل الألياف الزجاجية GRP - شركة تاج الرحمة للخدمات الفنية دبي"
    : "Taj Al Rahmah Technical Services LLC - GRP Lining System Layered Cross Section Diagram";

  return (
    <div className="w-full" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── DIAGRAM HEADER ── */}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#009e90] tracking-tight">
              {isArabic
                ? "مخطط الطبقات الهندسية لنظام تبطين GRP"
                : "GRP Lining Layered Cross-Section System"}
            </h4>
            <p className="text-[11px] text-stone-500">
              {isArabic
                ? "حماية وعزل متقدم للخزانات، فواصل التمدد، والأرضيات الصناعية"
                : "Advanced multilayer protection for water tanks, channels, and floors"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-[#009e90] hover:text-[#008176] font-semibold bg-[#009e90]/10 hover:bg-[#009e90]/15 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          title={isArabic ? "تكبير المخطط" : "Enlarge diagram"}
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>{isArabic ? "تكبير الصورة" : "Click to Enlarge"}</span>
        </button>
      </div>

      {/* ── 3D LAYERED DIAGRAM CONTAINER ── */}
      <div
        onClick={() => setIsZoomOpen(true)}
        className="group relative w-full aspect-[1024/490] max-h-[460px] bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:border-[#009e90]/60 hover:shadow-[0_8px_24px_rgba(0,158,144,0.14)] transition-all duration-300 cursor-pointer flex items-center justify-center p-2 sm:p-3"
        title={isArabic ? "اضغط للتكبير" : "Click to enlarge diagram"}
      >
        <Image
          src={GRP_DIAGRAM_IMAGE}
          alt={imageAlt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 860px"
          className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          priority
        />

        {/* Hover zoom pill badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#009e90] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-stone-200/80 text-[11px] font-semibold pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isArabic ? "عرض كامل" : "Full View"}</span>
        </div>
      </div>

      {/* ── 5 APPLICATION LAYERS SUMMARY BADGES ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-3.5">
        {[
          {
            num: "1",
            titleEn: "Grit Blasted Casing",
            descEn: "Mechanically prepped clean surface",
            titleAr: "تجهيز وتنظيف السطح",
            descAr: "كشط وتجهيز السطح لالتصاق فائق",
          },
          {
            num: "2",
            titleEn: "Primer Layer",
            descEn: "Deep bonding & protection",
            titleAr: "طبقة البرايمر الأساسية",
            descAr: "ترابط عميق وحماية للمسام",
          },
          {
            num: "3",
            titleEn: "GRP Matting & Resin",
            descEn: "High tensile strength & durability",
            titleAr: "طبقة ألياف GRP والراتنج",
            descAr: "متانة وصلابة إنشائية فائقة",
          },
          {
            num: "4",
            titleEn: "Resin Wash Layer",
            descEn: "Smooth finish & better adhesion",
            titleAr: "طبقة غسيل الراتنج",
            descAr: "مظهر أملس وتماسك محكم",
          },
          {
            num: "5",
            titleEn: "Polyester Flow-Coat",
            descEn: "WRAS approved, weather resistant",
            titleAr: "طلاء بوليستر نهائي",
            descAr: "معتمد لمياه الشرب ومقاوم للطقس",
          },
        ].map((layer, i) => (
          <div
            key={i}
            className="p-2 sm:p-2.5 bg-stone-50/80 rounded-xl border border-stone-100 flex flex-col hover:bg-[#009e90]/5 hover:border-[#009e90]/30 transition-all duration-200"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-4.5 h-4.5 rounded-full bg-[#009e90] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                {layer.num}
              </span>
              <span className="text-[11px] font-bold text-stone-800 truncate">
                {isArabic ? layer.titleAr : layer.titleEn}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 leading-tight">
              {isArabic ? layer.descAr : layer.descEn}
            </span>
          </div>
        ))}
      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ── */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col items-center border border-[#009e90]/30"
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-[#009e90]/10 hover:text-[#009e90] text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full flex items-center justify-between pr-10 mb-2">
              <div className="flex items-center gap-2 text-stone-800">
                <ShieldCheck className="w-5 h-5 text-[#009e90]" />
                <span className="font-bold text-sm sm:text-base">
                  {isArabic
                    ? "نظام تبطين الألياف الزجاجية GRP - شركة تاج الرحمة للخدمات الفنية"
                    : "GRP Lining System - Taj Al Rahmah Technical Services LLC"}
                </span>
              </div>
            </div>

            <div className="relative w-full h-[65vh] max-h-[620px] flex items-center justify-center bg-stone-50/50 rounded-xl p-2">
              <Image
                src={GRP_DIAGRAM_IMAGE}
                alt={imageAlt}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <p className="text-xs text-stone-500 mt-3 font-medium text-center">
              {isArabic
                ? "طبقات متماسكة ومعتمدة توفر عزلاً مطلقاً ومقاوماً للكيماويات والمياه بدرجة اعتماد WRAS لمياه الشرب."
                : "WRAS-approved seamless composite layers delivering absolute chemical and water protection."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

