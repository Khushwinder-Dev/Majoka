"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  title?: string;
  maxImages?: number;
}

export default function GallerySlider({ images, title }: GallerySliderProps) {
  const base = images;
  const total = base.length;

  // Triple the array for infinite looping: [copy][real][copy]
  const slides = [...base, ...base, ...base];

  const [visibleCount, setVisibleCount] = useState(6);
  const [current, setCurrent] = useState(total); // start at second copy
  const [transitioning, setTransitioning] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(6);
      else if (window.innerWidth >= 640) setVisibleCount(3);
      else setVisibleCount(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // After transition ends, silently jump back if in cloned zone
  const handleTransitionEnd = useCallback(() => {
    if (current <= 0) {
      setTransitioning(false);
      setCurrent(total);
    } else if (current >= total * 2) {
      setTransitioning(false);
      setCurrent(total);
    }
  }, [current, total]);

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!transitioning) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transitioning]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setTransitioning(true);
    }, 3500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goPrev = () => {
    setTransitioning(true);
    setCurrent((prev) => prev - 1);
    startTimer();
  };

  const goNext = () => {
    setTransitioning(true);
    setCurrent((prev) => prev + 1);
    startTimer();
  };

  // Real index (0-based) for dot highlight
  const realIndex = ((current % total) + total) % total;

  const slideWidth = 100 / visibleCount;

  if (total === 0) return null;

  return (
    <>
      <section className="mb-10">
        {/* {title && (
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-block h-[2px] w-6 bg-[#01a9a0] rounded-full" />
            <h3 className="text-base sm:text-lg font-extrabold text-stone-900">{title}</h3>
          </div>
        )} */}

        {/* Slider wrapper — extra horizontal padding for arrows */}
        <div className="relative px-6">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex"
              style={{
                transform: `translateX(-${current * slideWidth}%)`,
                transition: transitioning ? "transform 0.45s ease-in-out" : "none",
              }}
            >
              {slides.map((src, i) => {
                const realIdx = i % total;
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 px-1 cursor-pointer"
                    style={{ width: `${slideWidth}%` }}
                    onClick={() => setLightbox(realIdx)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-stone-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <Image
                        src={src}
                        alt={`${title ?? "Gallery"} ${realIdx + 1}`}
                        fill
                        unoptimized
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#009e90] text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#009e90] text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {base.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTransitioning(true);
                setCurrent(total + i);
                startTimer();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === realIndex
                  ? "w-5 h-1.5 bg-[#01a9a0]"
                  : "w-1.5 h-1.5 bg-stone-300 hover:bg-[#01a9a0]/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => ((p! - 1 + total) % total)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#01a9a0] hover:bg-[#009e90] text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
            aria-label="Previous">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[82vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={base[lightbox]}
              alt={`${title ?? "Gallery"} ${lightbox + 1}`}
              width={1400}
              height={900}
              unoptimized
              className="w-full h-auto max-h-[82vh] object-contain"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => ((p! + 1) % total)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#01a9a0] hover:bg-[#009e90] text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
            aria-label="Next">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
            {lightbox + 1} / {total}
          </div>
        </div>
      )}
    </>
  );
}
