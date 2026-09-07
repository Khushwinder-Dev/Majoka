"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogSection() {
  const { t, isArabic } = useLanguage();

  const featuredArticle = t.blog.featured;
  const sideArticles = t.blog.side;

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-stone-950">
      {/* Optional subtle grain/gradient for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(1,169,160,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto w-full">
        {/* ============== */}
        {/* SECTION HEADER */}
        {/* ============== */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14 lg:mb-16">
          {/* Badge with flanking lines:  —— BLOG & INSIGHTS ——  */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 w-full justify-center">
            <span className="inline-block h-[2px] w-10 sm:w-14 md:w-20 lg:w-28 bg-[#01a9a0]/80 rounded-full" />
            <span className="text-sm sm:text-base font-extrabold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#01a9a0] whitespace-nowrap">
              {t.blog.badge}
            </span>
            <span className="inline-block h-[2px] w-10 sm:w-14 md:w-20 lg:w-28 bg-[#01a9a0]/80 rounded-full" />
          </div>

          {/* Title: Latest <teal>News & Articles</teal> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="text-white">{t.blog.titlePrefix} </span>
            <span className="text-[#01a9a0]">{t.blog.titleAccent}</span>
          </h2>
        </div>

        {/* ========== */}
        {/* BLOG GRID  */}
        {/* ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {/* =================================== */}
          {/* LEFT COLUMN — LARGE FEATURED CARD  */}
          {/* =================================== */}
          <div className="lg:col-span-7 flex flex-col">
            <Link
              href="/blogs"
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_50px_-12px_rgba(1,169,160,0.18)] transition-all duration-500"
            >
              {/* TOP PORTION: meta + title + excerpt */}
              <div className="p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col gap-3 sm:gap-4">
                {/* Meta: FEB 25, 2026 . PROJECT MANAGE */}
                <div
                  className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-500 flex-wrap ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>{featuredArticle.date}</span>
                  <span className="text-stone-300 text-base">•</span>
                  <span className="truncate">{featuredArticle.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl md:text-[32px] lg:text-4xl font-extrabold text-stone-900 leading-[1.15] tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300">
                  {featuredArticle.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] sm:text-base md:text-[17px] leading-relaxed text-stone-600 font-medium">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* MIDDLE: full-width image (edge-to-edge, no rounding) */}
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[420px] xl:h-[480px] overflow-hidden bg-stone-100 flex-shrink-0">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 70vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  priority
                />
              </div>

              {/* BOTTOM: teal CTA bar */}
              <div className="w-full bg-[#01a9a0] hover:bg-[#00c2b2] transition-colors duration-300">
                <div className="w-full py-4 sm:py-[18px] flex items-center justify-center gap-2 text-white text-xs sm:text-sm md:text-[15px] font-extrabold tracking-[0.2em] uppercase">
                  {t.blog.readFull}
                  <ArrowRight
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 ${
                      isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* =================================== */}
          {/* RIGHT COLUMN — 3 STACKED SMALL CARDS */}
          {/* =================================== */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 lg:gap-7 justify-stretch">
            {sideArticles.map((article, idx) => (
              <Link
                key={idx}
                href="/blogs"
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_6px_28px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_34px_-10px_rgba(1,169,160,0.2)] transition-all duration-400 p-4 sm:p-5 md:p-6 lg:p-7 flex items-stretch gap-4 sm:gap-5 md:gap-6 h-full cursor-pointer"
              >
                {/* LEFT: IMAGE THUMBNAIL */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-28 md:w-36 md:h-32 lg:w-40 lg:h-36 xl:w-44 xl:h-40 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* RIGHT: CONTENT (meta + title + excerpt) */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2 sm:gap-2.5">
                  {/* Meta: Date . Category */}
                  <div
                    className={`flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wider uppercase text-stone-500 flex-wrap ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="whitespace-nowrap">{article.date}</span>
                    <span className="text-stone-300">•</span>
                    <span className="truncate">{article.category}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-stone-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-[12px] sm:text-[13px] md:text-sm lg:text-[15px] leading-relaxed text-stone-600 font-medium line-clamp-2 md:line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
