"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, X, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -18,
  }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -18 : 18,
  }),
};

const IMAGE_VARIANTS = {
  enter: { opacity: 0, scale: 0.92 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.06 },
};

// ── Infinite auto-scroll logo strip ──────────────────────────────────────────
function LogoStrip({ logos }: { logos: { name: string; src: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number | null>(null);
  const pauseRef = useRef(false);
  const posRef   = useRef(0);

  // Triple the logos for a seamless loop
  const allLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.55; // px per frame

    const tick = () => {
      if (!pauseRef.current && track) {
        posRef.current += speed;
        // Reset after scrolling one full copy width
        const singleWidth = track.scrollWidth / 3;
        if (posRef.current >= singleWidth) {
          posRef.current -= singleWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden mt-12 sm:mt-14"
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
      onTouchStart={() => { pauseRef.current = true; }}
      onTouchEnd={() => { pauseRef.current = false; }}
      aria-label="Client logos"
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center gap-4 sm:gap-5 will-change-transform py-3"
        style={{ width: "max-content" }}
      >
        {allLogos.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative h-14 sm:h-16 w-[120px] sm:w-[140px]
                       bg-slate-50 hover:bg-white
                       border border-slate-200/70 hover:border-[#009e90]/40
                       rounded-xl px-3
                       flex items-center justify-center
                       shadow-sm hover:shadow-md
                       transition-all duration-300 overflow-hidden group"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              unoptimized
              sizes="140px"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TrustedClientsSection() {
  const { isArabic } = useLanguage();
  const [isVideoOpen, setIsVideoOpen]     = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection]         = useState(1);

  const testimonials = [
    {
      id: 1,
      quote: isArabic
        ? "من التخطيط الأولي للموقع وحتى التسليم النهائي، أثبت فريقهم الهندسي كفاءة استثنائية ونزاهة هيكلية وجودة تنفيذ دقيقة، مع الالتزام التام بالجدول الزمني والميزانية المحددة."
        : "From Initial Site Planning To Final Handover, Their Construction Team Delivered Structural Integrity, Precise Craftsmanship, And A Project Completed Right On Schedule And Within Budget.",
      author: isArabic ? "ريهان ميتشل" : "Rehan Mitchel",
      role:   isArabic ? "المؤسس، الرئيس التنفيذي" : "Founder, CEO",
      image:  "/media/testimonials/testimonial-bd-1.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      quote: isArabic
        ? "تعاملنا مع تاج الرحمة في مشاريع عزل وحماية معقدة، وكانت النتيجة تفوق التوقعات في كل مرحلة، سواء من حيث جودة المواد أو الالتزام العالي بالمواعيد."
        : "Working with Taj Al Rahmah on specialized waterproofing and protection exceeded our expectations at every stage, from material quality to flawless site execution.",
      author: isArabic ? "أحمد المنصوري" : "Ahmed Al Mansoori",
      role:   isArabic ? "مدير العمليات الهندسية" : "VP of Operations",
      image:  "/media/testimonials/testimonial-bd-2.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      quote: isArabic
        ? "فريق محترف يقدم استشارات هندسية دقيقة وحلولاً تدوم طويلاً، مما وفر علينا تكاليف صيانة مستقبلية كبيرة. نوصي بهم بثقة تامة."
        : "A truly professional team that provides precise technical consultations and long-lasting solutions, saving us significant future maintenance costs.",
      author: isArabic ? "كريم حسن" : "Karim Hassan",
      role:   isArabic ? "مدير المشاريع الإنشائية" : "Director of Construction",
      image:  "/media/testimonials/testimonial-bd-3.png",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const logos = [
    { name: "Logo 1", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.06 PM.jpeg" },
    { name: "Logo 2", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.32.45 PM.jpeg" },
    { name: "Logo 3", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.19 PM.jpeg" },
    { name: "Logo 4", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.33.57 PM.jpeg" },
    { name: "Logo 5", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.35.36 PM.jpeg" },
    { name: "Logo 6", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.36.27 PM.jpeg" },
    { name: "Logo 7", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.37.09 PM.jpeg" },
    { name: "Logo 8", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.38.53 PM.jpeg" },
    { name: "Logo 9", src: "/media/testimonialsLogo/WhatsApp Image 2026-09-09 at 6.40.15 PM.jpeg" },
  ];

  const current = testimonials[activeTestimonial];

  const goToSlide = (index: number) => {
    if (index === activeTestimonial) return;
    setDirection(index > activeTestimonial ? 1 : -1);
    setActiveTestimonial(index);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "عملاؤنا المميزون" : "TRUSTED CLIENTS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            <span>{isArabic ? "محل ثقة كبرى " : "Trusted By Fast-"}</span>
            <span className="text-[#01a9a0]">{isArabic ? "العلامات التجارية" : "Growing Brands"}</span>
            <br />
            <span className="text-[#01a9a0]">{isArabic ? "محلياً وعالمياً" : "Worldwide"}</span>
          </h2>
        </div>

        {/* ── Testimonial card ───────────────────────────────────────────── */}
        <div
          data-aos="fade-up"
          className="relative max-w-7xl mx-auto bg-gradient-to-br from-[#02131F] via-[#041D2E] to-[#02101B] border border-[#009e90]/30 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#009e90_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Quote */}
            <div className="lg:col-span-7 flex flex-col min-h-[220px] sm:min-h-[240px]">
              <div className="w-14 h-14 rounded-full bg-[#009e90] text-white flex items-center justify-center mb-6 shadow-md border-2 border-dashed border-teal-200/40">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-sm sm:text-base lg:text-[17px] text-white/95 font-normal leading-[1.7] italic">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    <div className="mt-8 pt-2">
                      <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                        — {current.author}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#01a9a0] mt-0.5">
                        {current.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Photo + navigation dots */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-6 sm:gap-8">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#003833] flex items-center justify-center p-3 sm:p-3.5 shadow-2xl flex-shrink-0">
                <div className="relative w-full h-full rounded-full bg-[#009e90] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.image}
                      variants={IMAGE_VARIANTS}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={current.author}
                        fill
                        unoptimized
                        className="object-cover object-top scale-105"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    onClick={() => setIsVideoOpen(true)}
                    aria-label={isArabic ? "تشغيل قصة العميل" : "Play Client Story"}
                    className="absolute inset-0 m-auto z-20 w-12 h-12 rounded-full bg-white text-[#009e90] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Vertical dot nav */}
              <div className="flex flex-col gap-2.5 items-center">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`${isArabic ? "الشهادة" : "Go to testimonial"} ${idx + 1}`}
                    aria-current={activeTestimonial === idx}
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

        {/* ── Auto-scroll logo strip ─────────────────────────────────────── */}
        <LogoStrip logos={logos} />

      </div>

      {/* ── Video modal ────────────────────────────────────────────────────── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
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
