"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CLIENT_LOGOS = [
  { name: "Dreamz",              src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 1.svg" },
  { name: "Onyx",                src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 2.svg" },
  { name: "Al Milad",            src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 3.svg" },
  { name: "Samana Developers",   src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 4.svg" },
  { name: "Onix Engineering",    src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 5.svg" },
  { name: "Danube Properties",   src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 1.svg" },
  { name: "ABAJ",                src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 2.svg" },
  { name: "Emsquare",            src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 4.svg" },
  { name: "Reliant Contracting", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 5.svg" },
  { name: "MEC Engineering",     src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 6.svg" },
  { name: "Arec",                src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 1.svg" },
  { name: "Mimar",               src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 2 (1).svg" },
  { name: "Samana",              src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 2.svg" },
  { name: "Nakheel",             src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 3.svg" },
  { name: "York Engineering",    src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 6.svg" },
  { name: "Sobha Hartland",      src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 1.svg" },
  { name: "Dare",                src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 2.svg" },
  { name: "MBA Engineering",     src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 4.svg" },
  { name: "AMEC",                src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 5.svg" },
  { name: "Desert Fields",       src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 6.svg" },
];

// Triple for seamless continuous infinite loop
const trackLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

interface ProjectsClientsProps {
  themeBg?: boolean;
}

export default function ProjectsClients({ themeBg = false }: ProjectsClientsProps) {
  const { isArabic } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const pauseRef = useRef(false);
  const posRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const speed = 0.55; // px per frame

    const tick = () => {
      if (!pauseRef.current && el) {
        posRef.current += speed;
        const singleWidth = el.scrollWidth / 3;
        if (posRef.current >= singleWidth) {
          posRef.current -= singleWidth;
        } else if (posRef.current < 0) {
          posRef.current += singleWidth;
        }
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const nudge = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const delta = direction === "next" ? 220 : -220;
    const offset = isArabic ? -delta : delta;
    posRef.current += offset;
    const singleWidth = el.scrollWidth / 3;
    if (posRef.current >= singleWidth) {
      posRef.current -= singleWidth;
    } else if (posRef.current < 0) {
      posRef.current += singleWidth;
    }
    el.style.transform = `translateX(-${posRef.current}px)`;
  };

  return (
    <section
      className={`relative w-full py-14 sm:py-16 lg:py-20 overflow-hidden transition-colors duration-300 ${
        themeBg ? "bg-[#01a9a0] text-white" : "bg-[#F4FAF9]"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className={`inline-block h-[2px] w-8 sm:w-10 rounded-full shrink-0 ${
                  themeBg ? "bg-white" : "bg-[#01a9a0]"
                }`}
              />
              <span
                className={`text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase ${
                  themeBg ? "text-white/90" : "text-[#01a9a0]"
                }`}
              >
                {isArabic ? "موثوقون من قادة الصناعة" : "TRUSTED BY INDUSTRY LEADERS"}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight leading-[1.15] ${
                themeBg ? "text-white" : "text-[#0B1C24]"
              }`}
            >
              {isArabic ? "عملاؤنا الكرام" : "Our Valuable Clients"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:max-w-xl">
            <p
              className={`text-sm sm:text-base leading-relaxed flex-1 ${
                themeBg ? "text-white/90" : "text-stone-500"
              }`}
            >
              {isArabic
                ? "شركاء نجاحنا، الذين تحولت أحلامهم إلى واقع ملموس."
                : "The partners of our success, whose dreams have become a reality."}
            </p>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => nudge("prev")}
                aria-label={isArabic ? "السابق" : "Previous clients"}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
                  themeBg
                    ? "border border-white/60 text-white hover:bg-white hover:text-[#01a9a0]"
                    : "border border-[#01a9a0] text-[#01a9a0] hover:bg-[#01a9a0] hover:text-white"
                }`}
              >
                {isArabic ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => nudge("next")}
                aria-label={isArabic ? "التالي" : "Next clients"}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer active:scale-95 ${
                  themeBg
                    ? "border border-white/60 text-white hover:bg-white hover:text-[#01a9a0]"
                    : "border border-[#01a9a0] text-[#01a9a0] hover:bg-[#01a9a0] hover:text-white"
                }`}
              >
                {isArabic ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* HOMEPAGE-STYLE INFINITE AUTO-SCROLLING LOGOS STRIP         */}
      {/* ========================================================= */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => {
          pauseRef.current = true;
        }}
        onMouseLeave={() => {
          pauseRef.current = false;
        }}
        onTouchStart={() => {
          pauseRef.current = true;
        }}
        onTouchEnd={() => {
          pauseRef.current = false;
        }}
        aria-label="Client logos"
      >
        {/* Soft edge fade masks */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none ${
            themeBg
              ? "bg-gradient-to-r from-[#01a9a0] to-transparent"
              : "bg-gradient-to-r from-[#F4FAF9] to-transparent"
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none ${
            themeBg
              ? "bg-gradient-to-l from-[#01a9a0] to-transparent"
              : "bg-gradient-to-l from-[#F4FAF9] to-transparent"
          }`}
        />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-5 will-change-transform py-3 px-2"
          style={{ width: "max-content" }}
        >
          {trackLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className={`
                flex-shrink-0 relative
                h-[84px] sm:h-[90px] lg:h-[96px]
                w-[148px] sm:w-[160px] lg:w-[172px]
                bg-white hover:bg-white
                rounded-2xl
                transition-all duration-300 overflow-hidden group
                flex items-center justify-center
                ${
                  themeBg
                    ? "border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:border-white/50"
                    : "border border-slate-200/70 hover:border-[#009e90]/40 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(0,158,144,0.12)]"
                }
              `}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                unoptimized
                sizes="172px"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
