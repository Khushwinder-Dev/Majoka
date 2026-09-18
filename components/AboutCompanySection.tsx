"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return count;
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon, value, suffix, labelEn, labelAr, index, trigger, isArabic,
}: {
  icon: React.ReactNode; value: number; suffix: string;
  labelEn: string; labelAr: string;
  index: number; trigger: boolean; isArabic: boolean;
}) {
  const count = useCountUp(value, 1600 + index * 100, trigger);
  return (
    <div className="flex items-center gap-4 bg-[#01a9a0] rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex-1 min-w-0">
      {/* Icon circle */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center">
        {icon}
      </div>
      {/* Text */}
      <div className="flex flex-col min-w-0">
        <span className="text-2xl sm:text-3xl font-black text-white leading-none tabular-nums">
          {count}{suffix}
        </span>
        <span className="text-xs sm:text-sm text-white/85 font-medium mt-1 leading-snug">
          {isArabic ? labelAr : labelEn}
        </span>
      </div>
    </div>
  );
}

// ── Stats data ────────────────────────────────────────────────────────────────
const statsData = [
  { value: 17,  suffix: "+", labelEn: "Years Of Experience",    labelAr: "سنة خبرة",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/><path d="M12 12v2m0 4h.01"/>
      </svg>
    ),
  },
  { value: 820, suffix: "+", labelEn: "Project Completed",      labelAr: "مشروع منجز",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  { value: 500, suffix: "+", labelEn: "Satisfied Clients",      labelAr: "عميل راضٍ",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  { value: 120, suffix: "+", labelEn: "Skilled Professionals",  labelAr: "محترف ماهر",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

// ── Feature items ─────────────────────────────────────────────────────────────
const featuresData = [
  {
    icon: "/media/aboutSection/Frame.svg",
    titleEn: "Quality Materials",      titleAr: "مواد عالية الجودة",
    descEn:  "Premium materials selected durability performance, and protection.",
    descAr:  "مواد ممتازة مختارة لتحقيق المتانة والأداء والحماية الفائقة.",
  },
  {
    icon: "/media/aboutSection/Frame (1).svg",
    titleEn: "Technical Expertise",    titleAr: "خبرة فنية متقدمة",
    descEn:  "Professional solutions based on the condition and requirements of project.",
    descAr:  "حلول هندسية متخصصة بناءً على متطلبات وظروف كل مشروع.",
  },
  {
    icon: "/media/aboutSection/Frame (2).svg",
    titleEn: "Precise Execution",      titleAr: "تنفيذ دقيق",
    descEn:  "Careful preparation and installation to ensure reliable, long-lasting results.",
    descAr:  "إعداد دقيق وتثبيت احترافي لضمان نتائج موثوقة وطويلة الأمد.",
  },
  {
    icon: "/media/aboutSection/Frame (4).svg",
    titleEn: "Long-Term Protection",   titleAr: "حماية طويلة الأمد",
    descEn:  "Solutions designed to protect your property and reduce future costs.",
    descAr:  "حلول مصممة لحماية ممتلكاتك وتقليل التكاليف المستقبلية.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function AboutCompanySection() {
  const { isArabic } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const statsRef  = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Trigger counters when stats row enters viewport
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ── Background decoration image ─────────────────────────────── */}
      {/* <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/Background+Shadow.png"
          alt=""
          fill
          unoptimized
          className="object-cover opacity-40"
          priority
        />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">

        {/* ── Top two-column layout ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── LEFT: text + features ─────────────────────────────── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block h-[2px] w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
                {isArabic ? "عن شركتنا" : "ABOUT OUR COMPANY"}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 tracking-tight leading-[1.12] mb-4">
              {isArabic ? "القوة في كل بناء" : "Strength In Every Build"}
              <br />
              <span className="text-[#01a9a0]">
                {isArabic ? "جودة تدوم طويلاً" : "Quality That Lasts"}
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-stone-500 leading-relaxed mb-8 max-w-lg">
              {isArabic
                ? "نقدم حلولاً احترافية في العزل المائي والحراري وطلاء الأرضيات والحماية الهيكلية، بالجمع بين الخبرة الفنية والمواد عالية الجودة والتنفيذ الدقيق لنتائج موثوقة ودائمة."
                : "We provide professional waterproofing, insulation, floor coating, and structural protection solutions that address problems at their source, combining technical expertise, quality materials, and precise execution for reliable, durable results."}
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-5 sm:gap-6 mb-8">
              {featuresData.map((f) => (
                <div key={f.titleEn} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#EAF7F6] border border-teal-100/60 flex items-center justify-center group-hover:bg-[#d4f4f1] transition-colors duration-300">
                    <Image
                      src={f.icon}
                      alt={isArabic ? f.titleAr : f.titleEn}
                      width={28} height={28}
                      className="w-[26px] h-[26px] object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug group-hover:text-[#01a9a0] transition-colors duration-200">
                      {isArabic ? f.titleAr : f.titleEn}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed mt-0.5">
                      {isArabic ? f.descAr : f.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <Link
              href="/about-us"
              className="inline-flex items-center gap-4 self-start pl-6 pr-2 py-2 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_18px_rgba(1,169,160,0.35)] hover:shadow-[0_6px_22px_rgba(1,169,160,0.5)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>{isArabic ? "من نحن" : "ABOUT MORE"}</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className={`w-4 h-4 text-[#01a9a0] stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
              </div>
            </Link>
          </div>

          {/* ── RIGHT: image with play button ─────────────────────── */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-[28px] overflow-hidden shadow-[0_16px_48px_-12px_rgba(0,0,0,0.2)] bg-stone-100 group">
            <Image
              src="/hs2Img2.png"
              alt={isArabic ? "مهندسو تاج الرحمة في موقع العمل" : "Taj Al Rahmah engineers on site"}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

            {/* Play button */}
            <button
              onClick={() => setIsVideoOpen(true)}
              aria-label={isArabic ? "تشغيل الفيديو" : "Play Company Video"}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10"
              style={{ width: 72, height: 72, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            >
              <Play className="w-7 h-7 fill-[#01a9a0] text-[#01a9a0] ml-1" />
            </button>
          </div>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-12 sm:mt-14 pb-14 sm:pb-16 lg:pb-20"
        >
          {statsData.map((s, i) => (
            <StatCard
              key={s.labelEn}
              icon={s.icon}
              value={s.value}
              suffix={s.suffix}
              labelEn={s.labelEn}
              labelAr={s.labelAr}
              index={i}
              trigger={triggered}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>

      {/* ── Video modal ─────────────────────────────────────────────────── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label={isArabic ? "إغلاق" : "Close video"}
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="relative aspect-video w-full">
              <video src="/Hero.mp4" controls autoPlay className="w-full h-full object-contain">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
