"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, X, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustedClientsSection() {
  const { isArabic } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const logosContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote: isArabic
        ? "من التخطيط الأولي للموقع وحتى التسليم النهائي، أثبت فريقهم الهندسي كفاءة استثنائية ونزاهة هيكلية وجودة تنفيذ دقيقة، مع الالتزام التام بالجدول الزمني والميزانية المحددة."
        : "From Initial Site Planning To Final Handover, Their Construction Team Delivered Structural Integrity, Precise Craftsmanship, And A Project Completed Right On Schedule And Within Budget.",
      author: isArabic ? "ريهان ميتشل" : "Rehan Mitchel",
      role: isArabic ? "المؤسس، الرئيس التنفيذي" : "Founder, CEO",
      image: "/media/bohemian-man-with-his-arms-crossed 3.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      quote: isArabic
        ? "تعاملنا مع تاج الرحمة في مشاريع عزل وحماية معقدة، وكانت النتيجة تفوق التوقعات في كل مرحلة، سواء من حيث جودة المواد أو الالتزام العالي بالمواعيد."
        : "Working with Taj Al Rahmah on specialized waterproofing and protection exceeded our expectations at every stage, from material quality to flawless site execution.",
      author: isArabic ? "أحمد المنصوري" : "Ahmed Al Mansoori",
      role: isArabic ? "مدير العمليات الهندسية" : "VP of Operations",
      image: "/media/bohemian-man-with-his-arms-crossed 3.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      quote: isArabic
        ? "فريق محترف يقدم استشارات هندسية دقيقة وحلولاً تدوم طويلاً، مما وفر علينا تكاليف صيانة مستقبلية كبيرة. نوصي بهم بثقة تامة."
        : "A truly professional team that provides precise technical consultations and long-lasting solutions, saving us significant future maintenance costs.",
      author: isArabic ? "سارة جنكينز" : "Sarah Jenkins",
      role: isArabic ? "مديرة المشاريع الإنشائية" : "Director of Construction",
      image: "/media/bohemian-man-with-his-arms-crossed 3.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const current = testimonials[activeTestimonial];

  const scrollLogos = (direction: "left" | "right") => {
    if (logosContainerRef.current) {
      const scrollAmount = 240;
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollAmount : factor * scrollAmount;
      logosContainerRef.current.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  const logos = [
    {
      name: "Logo 1",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.06 PM.jpeg",
    },
    {
      name: "Logo 2",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.45 PM.jpeg",
    },
    {
      name: "Logo 3",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.19 PM.jpeg",
    },
    {
      name: "Logo 4",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.57 PM.jpeg",
    },
    {
      name: "Logo 5",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.35.36 PM.jpeg",
    },
    {
      name: "Logo 6",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.36.27 PM.jpeg",
    },
    {
      name: "Logo 7",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.37.09 PM.jpeg",
    },
    {
      name: "Logo 8",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.38.53 PM.jpeg",
    },
    {
      name: "Logo 9",
      src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.40.15 PM.jpeg",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "عملاؤنا المميزون" : "TRUSTED CLIENTS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            <span>
              {isArabic ? "محل ثقة كبرى " : "Trusted By Fast-"}
            </span>
            <span className="text-[#01a9a0]">
              {isArabic ? "العلامات التجارية" : "Growing Brands"}
            </span>
            <br />
            <span className="text-[#01a9a0]">
              {isArabic ? "محلياً وعالمياً" : "Worldwide"}
            </span>
          </h2>
        </div>

        {/* ============================================================
            MAIN DARK NAVY TESTIMONIAL CARD
            ============================================================ */}
        <div
          data-aos="fade-up"
          className="relative max-w-7xl mx-auto bg-gradient-to-br from-[#02131F] via-[#041D2E] to-[#02101B] border border-[#009e90]/30 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Background blueprint subtle texture effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#009e90_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Quote + Text + Author */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Quote Circle Icon with Dashed Outline */}
              <div className="w-14 h-14 rounded-full bg-[#009e90] text-white flex items-center justify-center mb-6 shadow-md border-2 border-dashed border-teal-200/40">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              {/* Testimonial Quote Text */}
              <p className="text-sm sm:text-base lg:text-[17px] text-white/95 font-normal leading-[1.7] italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="mt-8 pt-2">
                <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                  — {current.author}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#01a9a0] mt-0.5">
                  {current.role}
                </p>
              </div>
            </div>

            {/* Right Column: Concentric Circle Photo Frame + Video Play + Dots */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-6 sm:gap-8">
              {/* Concentric Circle Client Frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#003833] flex items-center justify-center p-3 sm:p-3.5 shadow-2xl flex-shrink-0">
                {/* Inner Vibrant Teal Circle */}
                <div className="relative w-full h-full rounded-full bg-[#009e90] overflow-hidden flex items-end justify-center">
                  <Image
                    src={current.image}
                    alt={current.author}
                    fill
                    unoptimized
                    className="object-cover object-top scale-105"
                    priority
                  />

                  {/* Play Button */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    aria-label="Play Client Story"
                    className="absolute inset-0 m-auto z-20 w-12 h-12 rounded-full bg-white text-[#009e90] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Vertical Carousel Indicator Pills */}
              <div className="flex flex-col gap-2.5 items-center">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      activeTestimonial === idx
                        ? "w-1.5 h-8 bg-[#009e90] shadow-[0_0_8px_rgba(0,158,144,0.6)]"
                        : "w-1.5 h-5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            CLIENT BRAND LOGOS CAROUSEL BAR
            ============================================================ */}
        <div className="relative max-w-7xl mx-auto mt-12 sm:mt-14 flex items-center gap-3 sm:gap-4">
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollLogos("left")}
            aria-label={isArabic ? "السابق" : "Previous Brands"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#022c28] text-white flex items-center justify-center hover:bg-[#009e90] transition-colors duration-300 flex-shrink-0 cursor-pointer shadow-sm"
          >
            {isArabic ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <ArrowLeft className="w-4 h-4" />
            )}
          </button>

          {/* Logos Scroll Container */}
          <div
            ref={logosContainerRef}
            className="flex-grow flex items-center overflow-x-auto scroll-smooth gap-4 py-2 px-1 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 relative h-14 min-w-[120px] sm:min-w-[130px] bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-[#009e90]/40 rounded-xl px-3 sm:px-4 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 120px, 130px"
                  className="object-contain p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollLogos("right")}
            aria-label={isArabic ? "التالي" : "Next Brands"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#009e90] text-white flex items-center justify-center hover:bg-[#01887e] transition-colors duration-300 flex-shrink-0 cursor-pointer shadow-sm"
          >
            {isArabic ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ============================================================
          VIDEO MODAL
          ============================================================ */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={current.videoUrl}
                title="Client Testimonial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
