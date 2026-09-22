"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ErrorPageContentProps {
  title?: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  reset?: () => void;
  isRuntimeError?: boolean;
}

export default function ErrorPageContent({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  reset,
  isRuntimeError = false,
}: ErrorPageContentProps) {
  const { isArabic } = useLanguage();

  const displayTitle = isArabic
    ? titleAr || (isRuntimeError ? "عذراً، حدث خطأ غير متوقع" : "عذراً، الصفحة غير موجودة")
    : title || (isRuntimeError ? "Ooops Something Went Wrong" : "Ooops Page Not Found");

  const displaySubtitle = isArabic
    ? subtitleAr ||
      (isRuntimeError
        ? "حدث خطأ غير متوقع أثناء تحميل هذه الصفحة. يمكنك محاولة إعادة التحميل أو العودة إلى الصفحة الرئيسية."
        : "يبدو أنه لم يتم العثور على أي شيء في هذا الموقع. هل ترغب في تجربة البحث أو العودة إلى الصفحة الرئيسية؟")
    : subtitle ||
      (isRuntimeError
        ? "An unexpected error occurred while loading this page. You can try refreshing or return to the home page."
        : "It Looks Like Nothing Was Found At This Location. Maybe Try One Of The Links Below Or A Search?");

  return (
    <div className="w-full overflow-hidden bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── TOP HERO BANNER (Wooden blocks spelling ERROR) ── */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden bg-[#04121d]">
        <div className="absolute inset-0">
          <Image
            src="/errorPage/Img.png"
            alt={isArabic ? "خطأ" : "Error Page Banner"}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Soft top gradient to ensure navbar links stay crisp & legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(3, 14, 24, 0.65) 0%, rgba(3, 14, 24, 0.15) 35%, transparent 60%)",
          }}
        />
      </section>

      {/* ── MAIN 404/ERROR CONTENT ── */}
      <section className="w-full bg-white py-14 sm:py-18 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* 404 Illustration with Mascot */}
          <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[500px]">
            <Image
              src="/errorPage/Group 1000009335.svg"
              alt="404 Page Not Found"
              width={794}
              height={435}
              priority
              className="w-full h-auto object-contain mx-auto select-none"
            />
          </div>

          {/* Heading */}
          <h1 className="mt-8 sm:mt-10 text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-[#0d1b22] tracking-tight leading-tight">
            {displayTitle}
          </h1>

          {/* Subtitle description */}
          <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-stone-500 max-w-xl mx-auto leading-relaxed">
            {displaySubtitle}
          </p>

          {/* Actions */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {reset && (
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border-2 border-[#00DDCF] text-[#00a89d] hover:bg-[#00DDCF]/10 font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isArabic ? "إعادة المحاولة" : "TRY AGAIN"}</span>
              </button>
            )}

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#00DDCF] hover:bg-[#00c5b8] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(0,221,207,0.35)] hover:shadow-[0_6px_22px_rgba(0,221,207,0.55)] hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>{isArabic ? "العودة للرئيسية" : "BACK TO HOME"}</span>
              <Send className={`w-3.5 h-3.5 fill-white stroke-none transition-transform duration-200 group-hover:translate-x-0.5 ${isArabic ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
