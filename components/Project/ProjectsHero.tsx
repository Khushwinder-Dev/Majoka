"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const BG_IMAGE = "/media/Dubai modern skyline at twilight (2).png";

export default function ProjectsHero() {
  const { isArabic } = useLanguage();

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#01161c]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0">
        <Image
          src={BG_IMAGE}
          alt={
            isArabic
              ? "أفق دبي عند الغسق"
              : "Dubai modern skyline at twilight"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-center"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(1, 22, 28, 0.88) 0%, rgba(1, 28, 36, 0.72) 38%, rgba(2, 36, 46, 0.42) 68%, rgba(1, 18, 26, 0.28) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 14, 18, 0.55) 0%, transparent 28%, transparent 68%, rgba(1, 16, 22, 0.55) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-16 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-[640px] lg:max-w-[720px]">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="inline-block h-[2px] w-7 sm:w-9 bg-[#00c4b4] rounded-full shrink-0" />
              <span className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "المشاريع" : "Projects"}
              </span>
            </div>

            <h1 className="text-[32px] sm:text-5xl md:text-[56px] lg:text-[64px] font-extrabold text-white leading-[1.12] tracking-tight">
              {isArabic ? (
                <>
                  استكشف حسب{" "}
                  <span className="text-[#00c4b4]">المشاريع</span>
                </>
              ) : (
                <>
                  Explore by{" "}
                  <span className="text-[#00c4b4]">Projects</span>
                </>
              )}
            </h1>

            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-[540px] font-normal">
              {isArabic
                ? "اكتشف خبرتنا من خلال مجموعة من المشاريع والحلول والأعمال المهنية التي نفذها فريقنا."
                : "Discover our expertise through a collection of projects, solutions, and professional work delivered by our team."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
