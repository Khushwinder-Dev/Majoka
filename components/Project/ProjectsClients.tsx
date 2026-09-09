"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CLIENT_LOGOS = [
  { name: "Client 1", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.06 PM.jpeg" },
  { name: "Client 2", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.45 PM.jpeg" },
  { name: "Client 3", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.19 PM.jpeg" },
  { name: "Client 4", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.57 PM.jpeg" },
  { name: "Client 5", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.35.36 PM.jpeg" },
  { name: "Client 6", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.36.27 PM.jpeg" },
  { name: "Client 7", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.37.09 PM.jpeg" },
  { name: "Client 8", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.38.53 PM.jpeg" },
  { name: "Client 9", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.40.15 PM.jpeg" },
];

export default function ProjectsClients() {
  const { isArabic } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = (index + CLIENT_LOGOS.length) % CLIENT_LOGOS.length;
      const item = track.children[next] as HTMLElement | undefined;
      if (!item) return;
      const left = item.offsetLeft - (track.clientWidth - item.clientWidth) / 2;
      track.scrollTo({ left, behavior: "smooth" });
      setActiveIndex(next);
    },
    []
  );

  const step = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    const factor = isArabic ? -delta : delta;
    scrollToIndex(activeIndex + factor);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncActive = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (!children.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    syncActive();

    return () => {
      track.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, []);

  return (
    <section
      className="relative w-full bg-[#F4FAF9] py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block h-[2px] w-8 sm:w-10 bg-[#01a9a0] rounded-full shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
                {isArabic ? "موثوقون من قادة الصناعة" : "TRUSTED BY INDUSTRY LEADERS"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.15]">
              {isArabic ? "عملاؤنا الكرام" : "Our Valuable Clients"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:max-w-xl">
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed flex-1">
              {isArabic
                ? "شركاء نجاحنا، الذين تحولت أحلامهم إلى واقع ملموس."
                : "The partners of our success, whose dreams have become a reality."}
            </p>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => step("prev")}
                aria-label={isArabic ? "السابق" : "Previous clients"}
                className="w-11 h-11 rounded-full border border-[#01a9a0] text-[#01a9a0] flex items-center justify-center hover:bg-[#01a9a0] hover:text-white transition-colors"
              >
                {isArabic ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => step("next")}
                aria-label={isArabic ? "التالي" : "Next clients"}
                className="w-11 h-11 rounded-full border border-[#01a9a0] text-[#01a9a0] flex items-center justify-center hover:bg-[#01a9a0] hover:text-white transition-colors"
              >
                {isArabic ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 px-1 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CLIENT_LOGOS.map((logo, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={`${logo.name}-${index}`}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={logo.name}
                className={`snap-center shrink-0 relative rounded-full bg-white flex items-center justify-center transition-all duration-300 ${
                  active
                    ? "w-[108px] h-[108px] sm:w-[124px] sm:h-[124px] border-2 border-[#01a9a0] shadow-[0_10px_28px_rgba(1,169,160,0.18)]"
                    : "w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] border border-transparent shadow-[0_8px_22px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_26px_rgba(15,23,42,0.1)]"
                }`}
              >
                <span className="relative w-[68%] h-[68%]">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    unoptimized
                    sizes="90px"
                    className="object-contain"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
