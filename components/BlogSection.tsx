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
    <section className="relative w-full py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-stone-950">
      {/* Optional subtle grain/gradient for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(1,169,160,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* ============== */}
        {/* SECTION HEADER */}
        {/* ============== */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          {/* Badge with flanking lines:  —— BLOG & INSIGHTS ——  */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3 w-full justify-center">
            <span className="inline-block h-[2px] w-8 sm:w-12 md:w-16 bg-[#01a9a0]/80 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#01a9a0] whitespace-nowrap">
              {t.blog.badge}
            </span>
            <span className="inline-block h-[2px] w-8 sm:w-12 md:w-16 bg-[#01a9a0]/80 rounded-full" />
          </div>

          {/* Title: Latest <teal>News & Articles</teal> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            <span className="text-white">{t.blog.titlePrefix} </span>
            <span className="text-[#01a9a0]">{t.blog.titleAccent}</span>
          </h2>
        </div>

        {/* ========== */}
        {/* BLOG GRID  */}
        {/* ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* =================================== */}
          {/* LEFT COLUMN — LARGE FEATURED CARD  */}
          {/* =================================== */}
          <div className="lg:col-span-7 flex flex-col">
            <Link
              href="/blogs"
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_-10px_rgba(1,169,160,0.18)] transition-all duration-500"
            >
              {/* TOP PORTION: meta + title + excerpt */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-2 sm:gap-2.5">
                {/* Meta: FEB 25, 2026 . PROJECT MANAGE */}
                <div
                  className={`flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-stone-500 flex-wrap ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>{featuredArticle.date}</span>
                  <span className="text-stone-300 text-sm">•</span>
                  <span className="truncate">{featuredArticle.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-stone-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-2">
                  {featuredArticle.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm md:text-[14px] leading-relaxed text-stone-600 font-medium line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* MIDDLE: full-width image (edge-to-edge, no rounding) */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-56 xl:h-64 overflow-hidden bg-stone-100 flex-shrink-0">
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
              <div className="w-full bg-[#01a9a0] hover:bg-[#00c2b2] transition-colors duration-300 mt-auto">
                <div className="w-full py-2.5 sm:py-3 flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase">
                  {t.blog.readFull}
                  <ArrowRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 ${
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
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5 justify-between">
            {sideArticles.map((article, idx) => (
              <Link
                key={idx}
                href="/blogs"
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_25px_-8px_rgba(1,169,160,0.2)] transition-all duration-300 p-3 sm:p-3.5 md:p-4 flex items-center gap-3 sm:gap-4 flex-1 cursor-pointer"
              >
                {/* LEFT: IMAGE THUMBNAIL */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-24 shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-stone-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* RIGHT: CONTENT (meta + title + excerpt) */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 sm:gap-1.5">
                  {/* Meta: Date . Category */}
                  <div
                    className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-stone-500 flex-wrap ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="whitespace-nowrap">{article.date}</span>
                    <span className="text-stone-300">•</span>
                    <span className="truncate">{article.category}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm md:text-[15px] font-bold text-stone-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-[11px] sm:text-xs leading-relaxed text-stone-600 font-medium line-clamp-2">
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
