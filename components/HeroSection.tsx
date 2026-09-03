"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Phone, Search } from "lucide-react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const totalSlides = 3;

  // Array of background images
  const backgroundImages = [
    "/landing/hero/hero1.jpg",
    "/landing/hero/hero2.jpg",
    "/landing/hero/hero3.jpg",
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
      offset: 50,
    });
  }, []);

  // Scroll-based visibility detection
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    console.log("Auto-slide check:", { isPaused, isTransitioning, isVisible });

    if (isPaused || isTransitioning || !isVisible) return;

    const autoSlideInterval = setInterval(() => {
      console.log("Auto-slide triggered");
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(autoSlideInterval);
  }, [isPaused, isTransitioning, isVisible, totalSlides]);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

    // Resume auto-slide after 5 seconds of manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

    // Resume auto-slide after 5 seconds of manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentSlide(index);

    // Resume auto-slide after 5 seconds of manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Reset transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[663px] md:h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Advanced Animations */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-[#333] bg-cover bg-center transition-all duration-[800ms] ease-in-out transform ${
            index === currentSlide
              ? "opacity-100 scale-100 rotate-0"
              : index === (currentSlide - 1 + totalSlides) % totalSlides
              ? "opacity-0 scale-110 -rotate-1 translate-x-[-100px]"
              : index === (currentSlide + 1) % totalSlides
              ? "opacity-0 scale-110 rotate-1 translate-x-[100px]"
              : "opacity-0 scale-95 translate-y-[50px]"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter:
              index === currentSlide
                ? "brightness(0.8) contrast(1.05)"
                : "brightness(0.8) blur(2px)",
            transition:
              "all 800ms cubic-bezier(0.4, 0, 0.2, 1), filter 600ms ease-out",
          }}
        >
          {/* Animated Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-black/30 to-[#bc2b2b] transition-all duration-700 ${
              index === currentSlide ? "opacity-40" : "opacity-60"
            }`}
            style={{
              background:
                index === currentSlide
                  ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(188,43,43,0.4) 100%)"
                  : "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(188,43,43,0.6) 100%)",
            }}
          ></div>

          {/* Animated Particles Effect */}
          {index === currentSlide && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "3s",
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Slide Transition Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-none ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Hero Content with Animations */}
      <div className="relative z-10 flex flex-col h-full px-4">
        {/* Top Content - Heading and Paragraph */}
        <div
          className="max-w-8xl mx-auto flex flex-col items-center space-y-5 pt-32 md:pt-20 lg:pt-54"
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          <h1
            className={`text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center leading-tight tracking-[-0.4px] transition-all duration-700 transform font-anek ${
              isTransitioning
                ? "opacity-70 translate-y-2 scale-98"
                : "opacity-100 translate-y-0 scale-100"
            }`}
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              animation: isTransitioning ? "none" : "fadeInUp 1s ease-out",
            }}
          >
            Shaping Skylines, Defining Progress
          </h1>

          <p
            className="text-white/80 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-anek"
            style={{
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            Trusted Contractor partner across KSA and beyond
          </p>
        </div>

        {/* Spacer to push other content down */}
        <div className="flex-1"></div>

        {/* Navigation Arrows */}
        {/* <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[1300px] flex justify-between px-4  z-50">
          <button
            onClick={handlePrevSlide}
            disabled={isTransitioning}
            className={`w-[50px] h-[50px] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 bg-sky-400/60 hover:bg-sky-500/70 ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
              zIndex: 50,
            }}
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <ArrowLeft
              className={`w-8 h-8 transition-all duration-300 text-white ${
                isTransitioning ? "animate-pulse" : ""
              }`}
            />
          </button>
          <button
            onClick={handleNextSlide}
            disabled={isTransitioning}
            className={`w-[50px] h-[50px] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 bg-sky-400/60 hover:bg-sky-500/70 ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
              zIndex: 50,
            }}
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <ArrowRight
              className={`w-8 h-8 transition-all duration-300 text-white ${
                isTransitioning ? "animate-pulse" : ""
              }`}
            />
          </button>
        </div> */}

        {/* Enhanced Slider Dots */}
        <div
          className="absolute bottom-[200px] md:bottom-[60px] left-1/2 transform -translate-x-1/2 flex space-x-3 z-30"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-3 rounded-full transition-all duration-500 cursor-pointer transform hover:scale-125 active:scale-90 ${
                currentSlide === index
                  ? "bg-primary w-8 shadow-lg"
                  : "bg-indigo-50 hover:bg-indigo-100 w-3"
              } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{
                boxShadow:
                  currentSlide === index
                    ? "0 2px 8px rgba(188,43,43,0.4), 0 0 0 2px rgba(255,255,255,0.2)"
                    : "0 1px 3px rgba(0,0,0,0.2)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Enhanced CTA Button */}
        {/* <div
          className="mt-8 md:mt-16 relative z-50"
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <button
            className={`bg-sky-500 text-white font-bold text-lg md:text-xl py-3 px-6 md:px-8 rounded-full w-[200px] md:w-[340px] h-[50px] md:h-[60px] hover:bg-sky-600 transition-all duration-300 cursor-pointer shadow-lg transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 md:gap-3 font-anek ${
              isTransitioning
                ? "opacity-80 translate-y-1"
                : "opacity-100 translate-y-0"
            }`}
            style={{
              boxShadow:
                "0 6px 20px rgba(14, 165, 233, 0.3), 0 2px 4px rgba(0,0,0,0.1)",
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              animation: isTransitioning
                ? "none"
                : "fadeInUp 1s ease-out 0.4s both",
            }}
          >
            <Phone className="w-6 h-6 text-white" />
            <span className="uppercase whitespace-nowrap">
              Book A Quick Call
            </span>
          </button>
        </div> */}

        {/* Glassmorphism Job Search Section */}
        {/* <div
          className="mt-8 md:mt-12 w-full max-w-5xl px-4 mb-8 z-30"
          data-aos="fade-up"
          data-aos-delay="700"
          data-aos-duration="1000"
        >
          <div
            className={`rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 transition-all duration-700 transform ${
              isTransitioning
                ? "opacity-70 translate-y-3"
                : "opacity-100 translate-y-0"
            }`}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              animation: isTransitioning
                ? "none"
                : "fadeInUp 1s ease-out 0.6s both",
            }}
          >
            <div className="text-sky-400 text-xs md:text-sm font-semibold mb-2 md:mb-3 uppercase tracking-wider font-anek">
              QUICK SEARCH
            </div>

            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 font-anek">
              Find Your Dream Job Now!
            </h2>
            <div className="flex flex-row gap-3 md:gap-4 items-stretch">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300 text-base md:text-lg font-anek"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                  }}
                />
              </div>

              <button
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer whitespace-nowrap font-anek"
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  boxShadow: "0 4px 15px rgba(14, 165, 233, 0.4)",
                }}
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                FIND JOB
              </button>
            </div>
          </div>
        </div> */}

        {/* <div
          className="absolute bottom-10 right-[120px] md:right-[200px]"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          <button className="relative w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#f8eaea]/20 transition-colors cursor-pointer bg-gray-200/80">
            <Image
              src="/landing/hero/msg.svg"
              alt="Message"
              width={26}
              height={26}
              className="w-12 h-12 p-1"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 -translate-y-[1px]">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
