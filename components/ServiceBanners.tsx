"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BannerSlideItem {
  image: string;
  title: string;
}

export function BannerSlider({
  slides,
  initialIndex = 0,
}: {
  slides: BannerSlideItem[];
  initialIndex?: number;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  // Reset or update slide when slides or initialIndex changes
  useEffect(() => {
    setCurrent(initialIndex >= 0 && initialIndex < total ? initialIndex : 0);
  }, [slides, initialIndex, total]);

  const goTo = (index: number) => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setCurrent((index + total) % total);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4500);
  };

  useEffect(() => {
    if (total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides, total]);

  const handlePrev = () => {
    goTo(current - 1);
    startTimer();
  };

  const handleNext = () => {
    goTo(current + 1);
    startTimer();
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[420px] overflow-hidden bg-[#0b2447] group">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={`${slide.image}-${i}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            unoptimized
            className="object-cover object-center"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-black/55" />
          {/* Service title overlay (original design) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}

      {/* Prev / Next controls - shown only when multiple slides exist */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#009e90] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#009e90] text-white flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  goTo(i);
                  startTimer();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 h-2 bg-[#009e90]"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
