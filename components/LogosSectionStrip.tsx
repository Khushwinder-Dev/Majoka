"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const logos = [
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

// Triple for seamless infinite loop
const track = [...logos, ...logos, ...logos];

export default function LogosSectionStrip() {
  const { isArabic } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number | null>(null);
  const pauseRef = useRef(false);
  const posRef   = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const speed = 0.55; // px per frame

    const tick = () => {
      if (!pauseRef.current && el) {
        posRef.current += speed;
        const singleWidth = el.scrollWidth / 3;
        if (posRef.current >= singleWidth) posRef.current -= singleWidth;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <section className="w-full bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────────── */}
        <div className="text-center mb-10 sm:mb-12 hidden">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "شركاؤنا وعملاؤنا" : "OUR PARTNERS & CLIENTS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-stone-900 tracking-tight leading-snug">
            {isArabic ? (
              <>علامات تجارية تثق{" "}<span className="text-[#01a9a0]">بخبرتنا</span></>
            ) : (
              <>Brands That{" "}<span className="text-[#01a9a0]">Trust Our Expertise</span></>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? "نفخر بشراكتنا مع كبرى الشركات والمطورين في المنطقة"
              : "Proud to work alongside leading developers, contractors, and consultants across the region."}
          </p>
        </div>

      </div>

      {/* ── Single infinite scroll row (full-bleed) ─────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => { pauseRef.current = true; }}
        onMouseLeave={() => { pauseRef.current = false; }}
        onTouchStart={() => { pauseRef.current = true; }}
        onTouchEnd={() => { pauseRef.current = false; }}
        aria-label="Client logos"
      >
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-5 will-change-transform py-2"
          style={{ width: "max-content" }}
        >
          {track.map((logo, idx) => (
            <div
              key={idx}
              className="
                flex-shrink-0 relative
                h-[84px] sm:h-[90px] lg:h-[96px]
                w-[148px] sm:w-[160px] lg:w-[172px]
                bg-[#f4f5f7] hover:bg-white
                border border-transparent hover:border-[#009e90]/30
                rounded-2xl
                shadow-sm hover:shadow-md
                transition-all duration-300 overflow-hidden group
              "
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
