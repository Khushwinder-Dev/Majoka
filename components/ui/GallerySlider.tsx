"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  title?: string;
  /** Max images to show — defaults to 6 */
  maxImages?: number;
}

export default function GallerySlider({
  images,
  title,
  maxImages = 6,
}: GallerySliderProps) {
  const slides = images.slice(0, maxImages);
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Visible count based on viewport — we show 3 at a time on lg, 2 on sm, 1 on mobile
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, total - visibleCount);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= visibleCount) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  }, [total, visibleCount, maxIndex]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrent(clamped);
    startTimer();
  };

  if (total === 0) return null;

  // Width percentage per slide
  const slideWidth = 100 / visibleCount;

  return (
    <>
      <section className="mb-10">
        {/* {title && (
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-4">{title}</h3>
        )} */}

        <div className="relative group">
          {/* Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * slideWidth}%)` }}
            >
              {slides.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-1.5 cursor-pointer"
                  style={{ width: `${slideWidth}%` }}
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <Image
                      src={src}
                      alt={`${title ?? "Gallery"} ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev button */}
          {current > 0 && (
            <button
              onClick={() => goTo(current - 1)}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#01a9a0] hover:border-[#01a9a0] transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Next button */}
          {current < maxIndex && (
            <button
              onClick={() => goTo(current + 1)}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#01a9a0] hover:border-[#01a9a0] transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Dot indicators */}
          {total > visibleCount && (
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-5 h-1.5 bg-[#01a9a0]"
                      : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev! > 0 ? prev! - 1 : prev); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={slides[lightbox]}
              alt={`${title ?? "Gallery"} ${lightbox + 1}`}
              width={1200}
              height={800}
              unoptimized
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev! < total - 1 ? prev! + 1 : prev); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {lightbox + 1} / {total}
          </div>
        </div>
      )}
    </>
  );
}
