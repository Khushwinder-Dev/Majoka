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
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E6F7F6] transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full">
        {/* ========================================= */}
        {/* HEADER                                    */}
        {/* ========================================= */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          {/* Eyebrow with flanking teal lines */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[2px] bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#01a9a0]">
              {t.blog.badge}
            </span>
            <span className="w-8 sm:w-12 h-[2px] bg-[#01a9a0] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            <span>{t.blog.titlePrefix} </span>
            <span className="text-[#01a9a0]">{t.blog.titleAccent}</span>
          </h2>
        </div>

        {/* ========================================= */}
        {/* BLOG GRID: 2 COLUMNS                     */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ------------------------------------- */}
          {/* LEFT: LARGE FEATURED CARD             */}
          {/* ------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(1,169,160,0.15)] transition-all duration-300 flex flex-col h-full border border-teal-50/60">
              {/* Text Header Portion */}
              <div className="p-6 sm:p-7 md:p-8 flex flex-col gap-2.5">
                {/* Meta: Date . Role */}
                <div
                  className={`text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 flex items-center gap-1.5 ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>{featuredArticle.date}</span>
                  <span className="text-gray-400 font-bold">•</span>
                  <span>{featuredArticle.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300">
                  {featuredArticle.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Edge-to-Edge Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-80 mt-auto overflow-hidden bg-slate-100">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  priority
                />
              </div>

              {/* Bottom Teal Button Bar */}
              <Link
                href="/blogs"
                className="w-full bg-[#01a9a0] hover:bg-[#00948c] text-white py-3.5 px-6 flex items-center justify-center gap-2 font-medium text-sm sm:text-base tracking-wide transition-colors duration-300"
              >
                <span>{t.blog.readMore}</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                    isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
                  }`}
                />
              </Link>
            </div>
          </div>

          {/* ------------------------------------- */}
          {/* RIGHT: 3 STACKED SMALL CARDS           */}
          {/* ------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
            {sideArticles.map((article, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(1,169,160,0.12)] transition-all duration-300 p-3.5 sm:p-4 border border-teal-50/60 flex items-center gap-4 sm:gap-5"
              >
                {/* Thumbnail Image */}
                <div className="relative w-28 h-24 sm:w-36 sm:h-28 md:w-40 md:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 sm:gap-1.5">
                  {/* Meta */}
                  <div
                    className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-gray-500 flex items-center gap-1.5 ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span>{article.date}</span>
                    <span className="text-gray-400 font-bold">•</span>
                    <span>{article.category}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#01a9a0] transition-colors duration-300">
                    {article.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* CTA Link */}
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#01a9a0] hover:text-[#008f86] mt-0.5 transition-colors group/link w-fit"
                  >
                    <span>{t.blog.readMore}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1 ${
                        isArabic ? "rotate-180 group-hover/link:-translate-x-1" : ""
                      }`}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
