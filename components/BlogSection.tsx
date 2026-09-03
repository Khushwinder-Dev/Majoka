"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench, Cpu, Zap } from "lucide-react";

interface BlogArticle {
  id: number;
  title: string;
  category: string;
  department?: string;
  excerpt: string;
  image: string;
  date: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Ensuring Quality with Comprehensive Inspection Services",
    category: "Inspection",
    department: "Quality Assurance",
    excerpt:
      "Inspection services are crucial for maintaining safety, quality, and compliance across industries. From vendor checks to factory audits, thorough inspections help identify risks early and ensure operations run smoothly.",
    image: "/news/Ensuring Quality with Comprehensive Inspection Services.png",
    date: "Mar 12, 2026",
  },
  {
    id: 2,
    title: "Precision Matters: Force & Torque Testing Solutions",
    category: "Force & Torque",
    department: "Testing Lab",
    excerpt:
      "Force and torque measurement is vital for industrial efficiency and safety. Our services include calibration of torque wrenches, gauges, load cells, and testing machines.",
    image: "/news/Precision Matters Force & Torque Testing Solutions.png",
    date: "Feb 25, 2026",
  },
  {
    id: 3,
    title: "Advanced Process Control Instrumentation for Industrial Efficiency",
    category: "Process Control",
    department: "Automation Dept",
    excerpt:
      "Process control instrumentation monitors and regulates critical processes accurately. Pressure, temperature, flow, and level transmitters help maintain operational stability.",
    image: "/news/Advanced Process Control Instrumentation for Industrial Efficiency.png",
    date: "Feb 15, 2026",
  },
  {
    id: 4,
    title: "Electrical & Electronics Testing for Reliable Operations",
    category: "Electrical",
    department: "Technical Services",
    excerpt:
      "Accurate testing of electrical and electronic systems prevents failures and ensures safety. High-voltage testers and power supplies are calibrated to meet industry standards.",
    image: "/news/Electrical Electronics Testing for Reliable Operations.png",
    date: "Jan 30, 2026",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "force & torque":
    case "force torque":
      return <Wrench className="w-3 h-3 text-white" />;
    case "process control":
      return <Cpu className="w-3 h-3 text-white" />;
    case "electrical":
    case "electrical & electronics":
      return <Zap className="w-3 h-3 text-white" />;
    default:
      return <ShieldCheck className="w-3 h-3 text-white" />;
  }
};

export default function BlogSection() {
  const featuredArticle = blogArticles[0];
  const sideArticles = blogArticles.slice(1, 4);

  return (
    <section className="w-full py-16 lg:py-24 px-4 md:px-8 lg:px-16 bg-[#fafbfc]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#01a9a0]/10 text-[#01a9a0] text-xs font-bold uppercase tracking-widest mb-3">
              <span>Articles & Insights</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              Latest from Our <span className="theme-text-main">Blog</span>
            </h2>
            <p className="text-stone-600 text-base md:text-lg mt-2 max-w-2xl">
              Stay updated with expert engineering insights, industry standards, and innovative solutions from Majoka.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#01a9a0] hover:text-[#01a9a0] transition-colors group self-start md:self-end"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* 2-Column Blog Grid matching design reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Featured Large Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
              {/* Header Content */}
              <div className="p-6 sm:p-8 flex flex-col">
                {/* Meta: Category Badge & Date */}
                <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#01a9a0]/15 text-[#01a9a0] text-xs font-bold uppercase tracking-wider rounded-md">
                    {featuredArticle.category}
                  </span>
                  <span className="text-stone-300 font-bold">•</span>
                  <time className="text-stone-500 text-xs sm:text-sm font-medium">
                    {featuredArticle.date}
                  </time>
                </div>

                {/* Title */}
                <Link href="/blogs">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#01a9a0] group-hover:text-[#01a9a0] transition-colors leading-snug mb-3 tracking-tight">
                    {featuredArticle.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Main Photo Edge-to-Edge */}
              <Link href="/blogs" className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mt-auto overflow-hidden bg-stone-100 block">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Bottom Teal Action Button */}
              <Link
                href="/blogs"
                className="w-full py-4 bg-[#01a9a0] hover:bg-[#01a9a0] text-white font-bold text-xs sm:text-sm tracking-widest uppercase text-center block transition-colors shadow-inner"
              >
                READ FULL ARTICLE
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Horizontal Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href="/blogs"
                className="bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex items-center gap-4 sm:gap-5 group cursor-pointer h-full"
              >
                {/* Thumbnail with overlay badge */}
                <div className="relative w-28 h-24 sm:w-36 sm:h-28 md:w-40 md:h-32 shrink-0 rounded-xl overflow-hidden bg-stone-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* Category Badge overlay on image */}
                  <div className="absolute top-2 left-2 z-10 bg-[#01a9a0]/95 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    {getCategoryIcon(article.category)}
                    <span className="truncate max-w-[80px]">{article.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-[11px] font-bold text-stone-400 tracking-wider uppercase mb-1 flex items-center gap-1.5 flex-wrap">
                    <span>{article.date.toUpperCase()}</span>
                    <span>•</span>
                    <span className="truncate text-stone-500">
                      {article.department?.toUpperCase() || article.category.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#01a9a0] transition-colors line-clamp-2 leading-snug mb-1.5">
                    {article.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed font-normal">
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
