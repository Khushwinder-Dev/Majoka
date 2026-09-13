"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Pause, Volume2, VolumeX, Image as ImageIcon } from "lucide-react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Animated counter for stats
const AnimatedCounter = ({
  value,
  suffix = "+",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 35,
    stiffness: 90,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -28 : 28,
  }),
};

const HeroSection = () => {
  const { t, isArabic } = useLanguage();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      titlePart1: isArabic ? "المقاولات و" : "Contracting &",
      titlePart2: isArabic ? "التميز في العزل المائي" : "Waterproofing Excellence",
      description: isArabic
        ? "خبرة مثبتة وحرفية عالية لتقديم حلول متينة توفر الحماية المستدامة وتدوم طويلاً."
        : "Proven Expertise And Superior Craftsmanship, Delivering Durable Solutions That Protect And Last.",
    },
    {
      titlePart1: isArabic ? "الإصلاح" : "Structural",
      titlePart2: isArabic ? "الهيكلي والصيانة" : "Repair & Maintenance",
      description: isArabic
        ? "حلول إنشائية متخصصة تعيد القوة وتعزز الأداء وتوفر متانة تدوم طويلاً."
        : "Expert Structural Solutions That Restore Strength, Enhance Performance, And Deliver Lasting Durability.",
    },
    {
      titlePart1: isArabic ? "الطلاء" : "Industrial",
      titlePart2: isArabic ? "الصناعي المتميز" : "Coating Excellence",
      description: isArabic
        ? "حلول طلاء متقدمة تقاوم التآكل وتحمي الأسطح وتطيل عمر الأصول."
        : "Advanced Coating Solutions That Resist Corrosion, Protect Surfaces, And Extend Asset Life.",
    },
  ];

  const activeSlide = slides[slideIndex];

  const goToSlide = (index: number) => {
    if (index === slideIndex) return;
    setDirection(index > slideIndex ? 1 : -1);
    setSlideIndex(index);
  };

  useEffect(() => {
    if (isPlayingVideo) return;
    const timer = setInterval(() => {
      setDirection(1);
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlayingVideo, slides.length, slideIndex]);

  const statsData = [
    { value: 17, suffix: "+", label: t.hero.stat1 },
    { value: 820, suffix: "+", label: t.hero.stat2 },
    { value: 500, suffix: "+", label: t.hero.stat3 },
    { value: 120, suffix: "+", label: t.hero.stat4 },
  ];

  // Toggle video playing state
  const handleToggleVideo = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      setIsVideoPaused(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((err) => console.log("Video playback error:", err));
      }
    } else {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current
            .play()
            .then(() => setIsVideoPaused(false))
            .catch((err) => console.log("Video resume error:", err));
        } else {
          videoRef.current.pause();
          setIsVideoPaused(true);
        }
      }
    }
  };

  // Switch back to photo banner
  const handleSwitchToImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingVideo(false);
    setIsVideoPaused(false);
  };

  // Toggle audio
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#021f24] select-none"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Background Image Banner */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${isPlayingVideo ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <Image
          src="/hero-bg.jpg"
          alt="Taj Al Rahmah City Skyline Hero"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Background Video Banner */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${isPlayingVideo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <video
          ref={videoRef}
          src="/Hero.mp4"
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 3. Deep Teal / Emerald Cinematic Gradient Overlays */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(2, 38, 42, 0.95) 0%, rgba(2, 44, 49, 0.90) 35%, rgba(2, 48, 58, 0.70) 65%, rgba(1, 26, 38, 0.42) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 18, 22, 0.65) 0%, transparent 25%, transparent 70%, rgba(1, 20, 24, 0.88) 100%)",
        }}
      />

      {/* 4. Four Corner Rivets / Cyber Accent Points (matching design mockup) */}
      {/* <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-30 pointer-events-none">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00c2b2]/60 bg-[#00c2b2]/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_12px_rgba(0,194,178,0.6)]">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>
      <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 pointer-events-none">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00c2b2]/60 bg-[#00c2b2]/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_12px_rgba(0,194,178,0.6)]">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>
      <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-30 pointer-events-none">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00c2b2]/60 bg-[#00c2b2]/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_12px_rgba(0,194,178,0.6)]">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>
      <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 pointer-events-none">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#00c2b2]/60 bg-[#00c2b2]/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_12px_rgba(0,194,178,0.6)]">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div> */}

      {/* 5. Left Vertical Slider / Pill Indicators */}
      <div
        className={`flex flex-col items-center gap-2.5 absolute top-1/2 -translate-y-1/2 z-30 ${
          isArabic ? "right-3 sm:right-5 xl:right-7" : "left-3 sm:left-5 xl:left-7"
        }`}
      >
        {slides.map((_, index) => {
          const active = index === slideIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`${isArabic ? "الشريحة" : "Go to slide"} ${index + 1}`}
              aria-current={active}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                active
                  ? "w-1.5 h-7 bg-[#00c2b2] shadow-[0_0_14px_#00c2b2]"
                  : "w-1.5 h-7 border border-white/40 bg-white/5 hover:border-[#00c2b2] hover:bg-[#00c2b2]/20"
              }`}
            />
          );
        })}
      </div>

      {/* 6. Video Mode Status Badge & Sound Toggle (Visible when Video is Active) */}
      {isPlayingVideo && (
        <div className="absolute top-24 sm:top-28 right-5 sm:right-10 z-30 flex items-center gap-2.5 bg-black/45 backdrop-blur-lg border border-white/20 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-2xl transition-all hidden">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2b2] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2b2]"></span>
          </span>
          <span className="hidden sm:inline text-white/90">
            {isVideoPaused ? t.hero.videoPaused : t.hero.videoMode}
          </span>
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? t.hero.unmuteAudio : t.hero.muteAudio}
            className="p-1 hover:text-[#00c2b2] transition-colors cursor-pointer"
            title={isMuted ? t.hero.unmuteAudio : t.hero.muteAudio}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/80 hover:text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00c2b2]" />
            )}
          </button>
          <button
            onClick={handleSwitchToImage}
            className="pl-2 border-l border-white/20 hover:text-[#00c2b2] transition-colors flex items-center gap-1.5 cursor-pointer text-white/80 hover:text-white"
            title={t.hero.returnToPhoto}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">{t.hero.photo}</span>
          </button>
        </div>
      )}

      {/* 7. Main Hero Content Container */}
      <div className={`relative z-20 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 flex-1 flex flex-col justify-center ${
        isArabic ? "pr-10 sm:pr-12" : "pl-10 sm:pl-12"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Text & CTAs (Columns 1-8) */}
          <div className="lg:col-span-8 flex flex-col items-start text-start min-h-[280px] sm:min-h-[320px] lg:min-h-[340px]">
            <div className="relative w-full overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={slideIndex}
                  custom={direction}
                  variants={SLIDE_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                    <span className="w-6 sm:w-8 h-[2px] bg-[#00c2b2]" />
                    <span className="text-[#00c2b2] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase font-anek">
                      {t.hero.eyebrow}
                    </span>
                  </div>

                  <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] font-bold leading-[1.08] tracking-tight font-anek">
                    {activeSlide.titlePart1} <br />
                    <span className="text-[#00c2b2] drop-shadow-[0_2px_20px_rgba(0,194,178,0.4)]">
                      {activeSlide.titlePart2}
                    </span>
                  </h1>

                  <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mt-4 sm:mt-5 mb-7 sm:mb-9 font-anek">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Button 1: EXPLORE SERVICES */}
              <Link
                href="/services"
                className="group pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#00c2b2] hover:bg-[#00d6c4] text-white font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-3.5 transition-all duration-300 shadow-[0_4px_22px_rgba(0,194,178,0.45)] hover:shadow-[0_6px_28px_rgba(0,194,178,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.hero.exploreServices}</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#00c2b2] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>

              {/* Button 2: EXPLORE PROJECT */}
              <Link
                href="/project"
                className="group pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#009b8e] font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-3.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.hero.exploreProject}</span>
                <span className="w-8 h-8 rounded-full bg-[#00c2b2] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Circular Play Button (Columns 9-12) */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-start lg:pl-6 pt-4 lg:pt-0">
            <div className="relative group">
              {/* Ambient Pulsing Halo when in photo mode */}
              {!isPlayingVideo && (
                <span className="absolute inset-0 rounded-full bg-[#00c2b2]/25 animate-ping duration-1000 pointer-events-none" />
              )}

              {/* Large Frosted Glass Outer Ring */}
              <button
                onClick={handleToggleVideo}
                aria-label={
                  isPlayingVideo
                    ? isVideoPaused
                      ? t.hero.resumeVideoHint
                      : t.hero.pauseVideoHint
                    : t.hero.playVideoHint
                }
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/12 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 shadow-[0_0_35px_rgba(0,194,178,0.35)] hover:shadow-[0_0_55px_rgba(0,194,178,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00c2b2]"
              >
                {/* Inner Vibrant Teal Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-[#00c2b2] group-hover:bg-[#00d6c4] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {isPlayingVideo && !isVideoPaused ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white ml-0.5 sm:ml-1" />
                  )}
                </div>
              </button>

              {/* Play / Pause Hint on Hover */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/20">
                  {isPlayingVideo
                    ? isVideoPaused
                      ? t.hero.resumeVideoHint
                      : t.hero.pauseVideoHint
                    : t.hero.playVideoHint}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Bottom Glassmorphic Stats Section */}
      <div className="relative z-20 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16 pb-8 sm:pb-12 invisible">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-3 w-fit">
          {isPlayingVideo || statsData.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3.5 sm:py-2.5 bg-[#02282e]/65 sm:bg-white/[0.08] backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#00c2b2]/50 hover:bg-white/[0.13] hover:-translate-y-1 group"
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight font-anek">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 font-medium font-anek mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
