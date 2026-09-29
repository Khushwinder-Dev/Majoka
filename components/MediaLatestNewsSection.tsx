"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NewsCardItem {
  id: number;
  dateEn: string;
  dateAr: string;
  titleEn: string;
  titleAr: string;
  image: string;
  href: string;
}

const LATEST_NEWS_DATA: NewsCardItem[] = [
  {
    id: 1,
    dateEn: "MARCH 27, 2025",
    dateAr: "٢٧ مارس ٢٠٢٥",
    titleEn: "Taj Al Rahmah Engineering Innovation & Annual Report 2025",
    titleAr: "تقرير الابتكار الهندسي والحلول المتقدمة السنوي 2025",
    image: "/news/news-1.png",
    href: "/blogs",
  },
  {
    id: 2,
    dateEn: "APRIL 28, 2025",
    dateAr: "٢٨ أبريل ٢٠٢٥",
    titleEn: "Innovation Achievements & Structural Protection 2024",
    titleAr: "إنجازات الابتكار وتقنيات الحماية الإنشائية 2024",
    image: "/news/news-2.png",
    href: "/blogs",
  },
  {
    id: 3,
    dateEn: "MARCH 2, 2025",
    dateAr: "٢ مارس ٢٠٢٥",
    titleEn: "Tahadiy Excellence: Celebrating Innovation in Flagship Projects",
    titleAr: "التميز الهندسي: الاحتفاء بالابتكار والريادة في المشاريع الكبرى",
    image: "/news/news-3.png",
    href: "/blogs",
  },
];

export default function MediaLatestNewsSection() {
  const { isArabic } = useLanguage();

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        {/* ========================================================= */}
        {/* HEADER: Centered Title matching website design language  */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          {/* Eyebrow with flanking teal lines */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
            <span className="w-6 sm:w-8 h-[2px] bg-[#00a89a] rounded-full inline-block" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#00a89a]">
              {isArabic ? "الأخبار والرؤى" : "NEWS & INSIGHTS"}
            </span>
            <span className="w-6 sm:w-8 h-[2px] bg-[#00a89a] rounded-full inline-block" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0B1C24] leading-tight">
            <span>{isArabic ? "أحدث " : "Our Latest "}</span>
            <span className="text-[#00a89a]">{isArabic ? "الأخبار" : "News"}</span>
          </h2>
        </div>

        {/* ========================================================= */}
        {/* 3-CARD GRID: Matching reference image layout              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {LATEST_NEWS_DATA.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Frame with Zoom Effect */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Overlapping Date Badge (Positioned at bottom edge of image as in layout) */}
              <div className="relative px-5 sm:px-6 pt-0">
                <div className="-mt-3.5 inline-block bg-white text-[#00a89a] border border-[#00a89a]/35 shadow-xs rounded-md px-3 py-1 text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase font-mono z-10 relative group-hover:border-[#00a89a] transition-colors">
                  {isArabic ? item.dateAr : item.dateEn}
                </div>
              </div>

              {/* Card Body Portion */}
              <div className="p-5 sm:p-6 pt-3 flex flex-col flex-1 justify-between gap-4">
                {/* News Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0B1C24] leading-snug group-hover:text-[#00a89a] transition-colors line-clamp-2">
                  <Link href={item.href}>
                    {isArabic ? item.titleAr : item.titleEn}
                  </Link>
                </h3>

                {/* READ MORE Theme Button */}
                <div className="pt-2">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#00a89a] hover:bg-[#009386] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-[#00a89a]/25 hover:shadow-lg hover:shadow-[#00a89a]/35 hover:scale-105 active:scale-95 group/btn"
                  >
                    <span>{isArabic ? "اقرأ المزيد" : "READ MORE"}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-1 ${
                        isArabic ? "rotate-180 group-hover/btn:-translate-x-1" : ""
                      }`}
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM ACTION: Centered "VIEW ALL NEWS" button            */}
        {/* ========================================================= */}
        <div className="flex items-center justify-center mt-12 sm:mt-14">
          <Link
            href="/blogs"
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#00a89a] hover:bg-[#009386] text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#00a89a]/30 hover:shadow-xl hover:shadow-[#00a89a]/40 hover:scale-105 active:scale-95 inline-flex items-center gap-2.5 sm:gap-3 group"
          >
            <span>{isArabic ? "عرض جميع الأخبار" : "VIEW ALL NEWS"}</span>
            <span className="w-6 h-6 rounded-full bg-white text-[#00a89a] flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5">
              <ArrowRight
                className={`w-3.5 h-3.5 stroke-[2.5] ${
                  isArabic ? "rotate-180" : ""
                }`}
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
