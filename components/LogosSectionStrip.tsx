"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const logos = [
  { name: "Logo 1",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 1.svg" },
  { name: "Logo 2",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 2.svg" },
  { name: "Logo 3",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 3.svg" },
  { name: "Logo 4",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 4.svg" },
  { name: "Logo 5",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_22 PM 5.svg" },
  { name: "Logo 6",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 1.svg" },
  { name: "Logo 7",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 2.svg" },
  { name: "Logo 8",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 4.svg" },
  { name: "Logo 9",  src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 5.svg" },
  { name: "Logo 10", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_39_51 PM 6.svg" },
  { name: "Logo 11", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 1.svg" },
  { name: "Logo 12", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 2 (1).svg" },
  { name: "Logo 13", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 2.svg" },
  { name: "Logo 14", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 3.svg" },
  { name: "Logo 15", src: "/logosSection/ChatGPT Image Sep 16, 2026, 10_44_35 PM (3) 6.svg" },
  { name: "Logo 16", src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 1.svg" },
  { name: "Logo 17", src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 2.svg" },
  { name: "Logo 18", src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 4.svg" },
  { name: "Logo 19", src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 5.svg" },
  { name: "Logo 20", src: "/logosSection/ChatGPT Image Sep 16, 2026, 11_04_22 PM (1) 6.svg" },
];

// ── Infinite auto-scroll row ──────────────────────────────────────────────────
function ScrollRow({
  items,
  speed = 0.5,
  reverse = false,
}: {
  items: { name: string; src: string }[];
  speed?: number;
  reverse?: boolean;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const animRef   = useRef<number | null>(null);
  const pauseRef  = useRef(false);
  const posRef    = useRef(0);

  // Duplicate for seamless loop
  const allItems = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!pauseRef.current && track) {
        posRef.current += reverse ? -speed : speed;
        const singleWidth = track.scrollWidth / 3;

        if (posRef.current >= singleWidth)  posRef.current -= singleWidth;
        if (posRef.current < 0)             posRef.current += singleWidth;

        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [speed, reverse]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
      onTouchStart={() => { pauseRef.current = true; }}
      onTouchEnd={() => { pauseRef.current = false; }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      <div
        ref={trackRef}
        className="flex items-center gap-4 sm:gap-5 will-change-transform py-2"
        style={{ width: "max-content" }}
      >
        {allItems.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative h-[72px] sm:h-20 w-[140px] sm:w-[160px]
                       bg-white border border-slate-200 hover:border-[#009e90]/50
                       rounded-2xl px-4
                       flex items-center justify-center
                       shadow-sm hover:shadow-md
                       transition-all duration-300 overflow-hidden group
                       cursor-default"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              unoptimized
              sizes="160px"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main exported section ─────────────────────────────────────────────────────
export default function LogosSectionStrip() {
  const { isArabic } = useLanguage();

  // Split 20 logos into two rows of 10
  const row1 = logos.slice(0, 10);
  const row2 = logos.slice(10, 20);

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two auto-scroll rows */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <ScrollRow items={row1} speed={0.5} />
          <ScrollRow items={row2} speed={0.45} reverse />
        </div>

      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
