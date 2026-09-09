"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BG_IMAGE = "/media/Engineers working.png";

export default function ProjectsCTA() {
  const { isArabic } = useLanguage();

  return (
    <section
      className="relative w-full bg-[#F2F9F7] pb-14 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] min-h-[240px] sm:min-h-[260px]">
          <Image
            src={BG_IMAGE}
            alt={
              isArabic
                ? "مهندسون يعملون في الموقع"
                : "Engineers working on site"
            }
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#081018]/82" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#081018]/90 via-[#081018]/70 to-[#081018]/50" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="inline-block h-[2px] w-8 bg-[#01a9a0] rounded-full shrink-0" />
                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-white">
                  {isArabic ? "لنبنِ معاً" : "LET'S BUILD TOGETHER"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.2]">
                {isArabic ? (
                  <>
                    هل لديك مشروع{" "}
                    <span className="text-[#01a9a0]">خاص بقطاعك؟</span>
                  </>
                ) : (
                  <>
                    Have An{" "}
                    <span className="text-[#01a9a0]">Industry-Specific</span>{" "}
                    Project?
                  </>
                )}
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                {isArabic
                  ? "تحدث مع خبرائنا واحصل على حلول مخصصة لاحتياجات قطاعك."
                  : "Talk to our experts and get tailored solutions for your industry needs."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 pl-5 sm:pl-6 pr-1.5 py-1.5 rounded-full bg-[#01a9a0] hover:bg-[#00b3a4] text-white font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_8px_20px_rgba(1,169,160,0.35)] group"
              >
                <span className="whitespace-nowrap">
                  {isArabic ? "احصل على عرض مجاني" : "Get A Free Quote"}
                </span>
                <span className="w-9 h-9 rounded-full bg-white text-[#01a9a0] flex items-center justify-center">
                  <ArrowRight
                    className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`}
                  />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-full border border-white/80 hover:bg-white/10 text-white font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase transition-all duration-300"
              >
                <span className="whitespace-nowrap">
                  {isArabic ? "تحدث مع خبرائنا" : "Talk To Our Experts"}
                </span>
                <ArrowRight
                  className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
