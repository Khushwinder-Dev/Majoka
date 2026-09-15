"use client";

import React from "react";
import Image from "next/image";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";

const certifications = [
  {
    id: 1,
    logo: "/certifications/logos/cert-logo-1.png",
    icon: "/certifications/logos/SVG - Globe Icon.svg",
    titleEn: "Dubai Municipality DM Approved",
    titleAr: "معتمد من بلدية دبي",
    descriptionEn:
      "Officially registered and approved by Dubai Municipality. All our waterproofing, structural protection, and construction services fully comply with Dubai Municipality's strict engineering standards, ensuring safety, reliability, and environmental responsibility on every project.",
    descriptionAr:
      "مسجلون ومعتمدون رسمياً من قِبل بلدية دبي. جميع خدماتنا في العزل المائي والحماية الإنشائية تتوافق تماماً مع المعايير الهندسية الصارمة لبلدية دبي، مما يضمن السلامة والموثوقية والمسؤولية البيئية في كل مشروع.",
  },
  {
    id: 2,
    logo: "/certifications/logos/cert-logo-2.png",
    icon: "/certifications/logos/SVG - Badge Icon.svg",
    titleEn: "DGL-Approved Products",
    titleAr: "منتجات معتمدة من DGL",
    descriptionEn:
      "We exclusively use DGL-listed and globally approved products that meet the highest international construction benchmarks. Our product selection process ensures compatibility, performance, and long-term durability for all waterproofing and high-performance floor coating solutions.",
    descriptionAr:
      "نستخدم حصرياً منتجات مدرجة في قائمة DGL ومعتمدة عالمياً وفق أعلى المعايير الدولية في البناء. تضمن عملية اختيار منتجاتنا التوافق والأداء والمتانة طويلة الأمد لجميع حلول العزل المائي وطلاءات الأرضيات.",
  },
  {
    id: 3,
    logo: "/certifications/logos/cert-logo-3.png",
    icon: "/certifications/logos/SVG - Shield Icon.svg",
    titleEn: "WRAS Certified Products",
    titleAr: "منتجات معتمدة من WRAS",
    descriptionEn:
      "Our water tank lining and GRP fiberglass systems carry WRAS (Water Regulations Advisory Scheme) certification, guaranteeing that all materials in contact with potable water are completely safe for human consumption. A critical standard for drinking water storage and supply.",
    descriptionAr:
      "تحمل أنظمة تبطين خزانات المياه وألياف GRP الزجاجية لدينا شهادة WRAS، مما يضمن أن جميع المواد المُلامسة لمياه الشرب آمنة تماماً للاستهلاك البشري. معيار أساسي لتخزين مياه الشرب وتوزيعها.",
  },
  {
    id: 4,
    logo: "/certifications/logos/cert-logo-4.png",
    icon: "/certifications/logos/SVG - Leaf Icon.svg",
    titleEn: "DM Green Building Compliant",
    titleAr: "متوافق مع معايير المباني الخضراء لبلدية دبي",
    descriptionEn:
      "Our thermal insulation and waterproofing systems meet Dubai Municipality's Green Building Regulations, supporting energy efficiency and sustainable construction. Our Combo System roof solutions are specifically designed to reduce cooling loads and lower energy consumption.",
    descriptionAr:
      "تستوفي أنظمة العزل الحراري والمائي لدينا لوائح المباني الخضراء لبلدية دبي، مما يدعم كفاءة الطاقة والبناء المستدام. تم تصميم حلول سطح نظام الكومبو خصيصاً لتقليل أحمال التبريد وخفض استهلاك الطاقة.",
  },
];

export default function CertificationsPage() {
  const { isArabic } = useLanguage();

  return (
    <div>
      {/* ── Banner ─────────────────────────────────────────────── */}
      <CommonHeader
        title={isArabic ? "شهاداتنا واعتماداتنا" : "Our Certifications"}
        breadcrumb={isArabic ? "الشهادات" : "Certifications"}
        imagePath="/banners/certifications.png"
      />

      {/* ── SECTION 1: Cards (with sectionBg) ─────────────────── */}
      <section className="w-full relative py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Section background image */}
        <Image
          src="/certifications/logos/sectionBg.png"
          alt=""
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        {/* Light overlay so text stays readable */}
        <div className="absolute inset-0 bg-white/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="inline-block h-[2px] w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "الشهادات" : "CERTIFICATION"}
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14]">
                {isArabic ? "التزامنا " : "Our Commitment "}
                <span className="text-[#01a9a0]">
                  {isArabic ? "بالجودة" : "To Quality"}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-stone-500 leading-relaxed mt-3 max-w-2xl">
                {isArabic
                  ? "شهاداتنا تعكس التزامنا بتقديم حلول عزل مائي موثوقة وآمنة وعالية الجودة."
                  : "Our certifications demonstrate our commitment to delivering reliable, safe, and high-quality waterproofing solutions."}
              </p>
            </div>
          </div>

          {/* ── 4 Certification Cards ─────────────────────────── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group bg-white border border-stone-100 rounded-2xl p-6 sm:p-7 hover:border-[#01a9a0]/30 hover:shadow-[0_8px_32px_rgba(1,169,160,0.08)] transition-all duration-300 flex flex-row items-start gap-4"
              >
                {/* LEFT: icon + title + description */}
                <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                  {/* SVG icon from file */}
                  <div className="w-9 h-9 rounded-full bg-[#e6f7f6] flex items-center justify-center flex-shrink-0 mb-1">
                    <Image
                      src={cert.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] sm:text-base font-bold text-stone-900 leading-snug group-hover:text-[#01a9a0] transition-colors duration-200">
                    {isArabic ? cert.titleAr : cert.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {isArabic ? cert.descriptionAr : cert.descriptionEn}
                  </p>
                </div>

                {/* RIGHT: logo badge */}
                <div className="relative w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shadow-sm self-start">
                  <Image
                    src={cert.logo}
                    alt={isArabic ? cert.titleAr : cert.titleEn}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 2: Company Profile Banner (plain white bg) ── */}
      <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Company Profile Banner */}
          <div className="relative rounded-2xl overflow-hidden min-h-[160px] sm:min-h-[180px]">

            {/* Full background image */}
            <Image
              src="/certifications/logos/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png"
              alt="Company building"
              fill
              unoptimized
              className="object-cover object-right-center"
            />

            {/* Left overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center px-7 sm:px-10 py-8 sm:py-10 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block h-[2px] w-6 bg-[#01a9a0] rounded-full" />
                <span className="text-[16px] font-extrabold tracking-[0.2em] uppercase text-[#01a9a0]">
                  {isArabic ? "ملف الشركة" : "COMPANY PROFILE"}
                </span>
              </div>

              <p className="text-sm sm:text-[15px] text-stone-800 leading-relaxed mb-6 max-w-xs font-medium">
                {isArabic
                  ? "اكتشف خبرتنا وخدماتنا والتزامنا ببناء غدٍ أكثر أماناً وقوة."
                  : "Discover our expertise, services and commitment to building a safer, stronger tomorrow."}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 shadow-sm">
                  <Image
                    src="/certifications/logos/Custom Teal PDF File Badge.svg"
                    alt="PDF"
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain flex-shrink-0"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[12px] font-bold text-stone-800 whitespace-nowrap">
                      {isArabic ? "ملف الشركة" : "Company Profile"}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">12.4 MB</span>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#01a9a0] hover:bg-[#009e90] active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-full transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {isArabic ? "تحميل الملف" : "Download Profile"}
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
