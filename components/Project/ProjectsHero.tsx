"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const BG_IMAGE = "/banners/projects.jpeg";

export default function ProjectsHero() {
  const { isArabic } = useLanguage();

  return (
    <section
      className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] lg:h-[600px] overflow-hidden bg-[#01161c]"
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
          className="object-cover object-center"
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
    </section>
  );
}
