"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="relative w-full h-[528px] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="relative w-full h-full"
          data-aos="zoom-out"
          data-aos-duration="1500"
        >
          <Image
            src="/about-us/about-us-1.png"
            alt="About Us Background"
            fill
            className="object-cover scale-110 transition-transform duration-[3000ms] hover:scale-100"
            priority
          />
        </div>
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Animated particles/dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            data-aos="fade"
            data-aos-delay={i * 100}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDuration: `${2 + i * 0.3}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Logo watermark (optional - if you have a logo) */}
      <div
        className="absolute w-[692px] h-[315px] left-[374px] top-[142px] opacity-10 pointer-events-none"
        data-aos="fade"
        data-aos-duration="2000"
        data-aos-delay="500"
      >
        {/* Uncomment if you have a logo */}
        {/* <Image
          src="/logo.png"
          alt="Logo Watermark"
          fill
          className="object-contain"
        /> */}
      </div>

      {/* Decorative gradient orbs */}
      <div
        className="absolute top-20 left-20 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"
        data-aos="zoom-in"
        data-aos-duration="1500"
        data-aos-delay="300"
      ></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        data-aos="zoom-in"
        data-aos-duration="1500"
        data-aos-delay="500"
      ></div>

      {/* Content container - Left aligned */}
      <div className="relative px-8 sm:px-12 md:px-20 lg:px-[120px] h-full flex items-center z-10">
        <div className="w-full max-w-[1200px]">
          <div className="space-y-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[48px] font-bold font-anek text-white text-left tracking-[-0.4px]"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              About Us
            </h1>

            {/* Breadcrumb Navigation - Below Header */}
            <nav
              className="flex items-center space-x-3 text-white/90"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <Link
                href="/"
                className="text-lg sm:text-xl md:text-2xl hover:text-sky-400 transition-colors duration-200"
                style={{
                  textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                Home
              </Link>
              <span className="text-lg sm:text-xl md:text-2xl">/</span>
              <span
                className="text-lg sm:text-xl md:text-2xl text-sky-400 font-medium"
                style={{
                  textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                About
              </span>
            </nav>

            {/* Animated underline - Left aligned */}
            <div data-aos="fade-right" data-aos-delay="600">
              <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent"
        data-aos="fade-up"
        data-aos-delay="800"
      ></div>
    </section>
  );
};

export default Header;
