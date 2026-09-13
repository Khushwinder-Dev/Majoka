"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  value: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
}

const stats: StatItem[] = [
  { value: 17,  suffix: "+", labelEn: "Year Of Experience",   labelAr: "سنة خبرة" },
  { value: 820, suffix: "+", labelEn: "Project Completed",    labelAr: "مشروع منجز" },
  { value: 500, suffix: "+", labelEn: "Satisfied Clients",    labelAr: "عميل راضٍ" },
  { value: 120, suffix: "+", labelEn: "Skilled Professionals",labelAr: "محترف ماهر" },
];

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}

// ─── Individual stat card ─────────────────────────────────────────────────────
function StatCard({
  stat,
  index,
  trigger,
  isArabic,
}: {
  stat: StatItem;
  index: number;
  trigger: boolean;
  isArabic: boolean;
}) {
  const count = useCountUp(stat.value, 1600 + index * 100, trigger);

  return (
    <div
      className="
        flex flex-col items-start
        bg-[#1e2a2a] hover:bg-[#243535]
        border border-white/5 hover:border-[#01a9a0]/30
        rounded-2xl
        px-6 py-5 sm:px-7 sm:py-6
        transition-all duration-300
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        hover:shadow-[0_6px_28px_rgba(1,169,160,0.15)]
        hover:-translate-y-0.5
        min-w-0
      "
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Number + suffix */}
      <span
        className="
          text-4xl sm:text-5xl lg:text-[52px]
          font-black text-white
          leading-none tracking-tight
          tabular-nums
        "
      >
        {count}
        {stat.suffix}
      </span>

      {/* Label */}
      <span
        className={`
          mt-2 text-sm sm:text-base
          text-white/55 font-medium
          leading-snug
          ${isArabic ? "text-right" : "text-left"}
        `}
      >
        {isArabic ? stat.labelAr : stat.labelEn}
      </span>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function StatsBar() {
  const { isArabic } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Trigger counters once the section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#161f1f] py-10 sm:py-12 px-4 sm:px-6 lg:px-8"
      aria-label={isArabic ? "إحصائيات الشركة" : "Company Statistics"}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-5 lg:gap-6
          "
          dir={isArabic ? "rtl" : "ltr"}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.labelEn}
              stat={stat}
              index={i}
              trigger={triggered}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
