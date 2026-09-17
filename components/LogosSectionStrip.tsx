"use client";

import React from "react";
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

// Split into 3 rows: 7 · 7 · 6
const rows = [
  logos.slice(0, 7),
  logos.slice(7, 14),
  logos.slice(14, 20),
];

function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <div
      className="
        relative flex items-center justify-center
        bg-[#f4f5f7] hover:bg-white
        border border-transparent hover:border-[#009e90]/30
        rounded-2xl
        h-[84px] sm:h-[90px] lg:h-[96px]
        shadow-sm hover:shadow-md
        transition-all duration-300 overflow-hidden group
      "
    >
      <Image
        src={src}
        alt={name}
        fill
        unoptimized
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 160px"
        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

export default function LogosSectionStrip() {
  const { isArabic } = useLanguage();

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "شركاؤنا وعملاؤنا" : "OUR PARTNERS & CLIENTS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-stone-900 tracking-tight leading-snug">
            {isArabic ? (
              <>
                علامات تجارية تثق{" "}
                <span className="text-[#01a9a0]">بخبرتنا</span>
              </>
            ) : (
              <>
                Brands That{" "}
                <span className="text-[#01a9a0]">Trust Our Expertise</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? "نفخر بشراكتنا مع كبرى الشركات والمطورين في المنطقة"
              : "Proud to work alongside leading developers, contractors, and consultants across the region."}
          </p>
        </div>

        {/* ── Three static rows ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Row 1 — 7 logos */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {rows[0].map((logo) => (
              <LogoCard key={logo.name} {...logo} />
            ))}
          </div>

          {/* Row 2 — 7 logos */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {rows[1].map((logo) => (
              <LogoCard key={logo.name} {...logo} />
            ))}
          </div>

          {/* Row 3 — 6 logos, centred */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {rows[2].map((logo) => (
              <LogoCard key={logo.name} {...logo} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
