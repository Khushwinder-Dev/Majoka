"use client";

import React from "react";
import Image from "next/image";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";

const certifications = [
  {
    id: 1,
    logo: "/certifications/logos/Overlay+Border (1).png",
    titleEn: "Dubai Municipality DM Approved",
    titleAr: "معتمد من بلدية دبي",
    descriptionEn:
      "Officially registered and approved by Dubai Municipality. All our waterproofing, structural protection, and construction services fully comply with Dubai Municipality's strict engineering standards, ensuring safety, reliability, and environmental responsibility on every project.",
    descriptionAr:
      "مسجلون ومعتمدون رسمياً من قِبل بلدية دبي. جميع خدماتنا في العزل المائي والحماية الإنشائية تتوافق تماماً مع المعايير الهندسية الصارمة لبلدية دبي، مما يضمن السلامة والموثوقية والمسؤولية البيئية في كل مشروع.",
  },
  {
    id: 2,
    logo: "/certifications/logos/Overlay+Border (2).png",
    titleEn: "DGL-Approved Products",
    titleAr: "منتجات معتمدة من DGL",
    descriptionEn:
      "We exclusively use DGL-listed and globally approved products that meet the highest international construction benchmarks. Our product selection process ensures compatibility, performance, and long-term durability for all waterproofing and high-performance floor coating solutions.",
    descriptionAr:
      "نستخدم حصرياً منتجات مدرجة في قائمة DGL ومعتمدة عالمياً وفق أعلى المعايير الدولية في البناء. تضمن عملية اختيار منتجاتنا التوافق والأداء والمتانة طويلة الأمد لجميع حلول العزل المائي وطلاءات الأرضيات.",
  },
  {
    id: 3,
    logo: "/certifications/logos/Overlay+Border (3).png",
    titleEn: "WRAS Certified Products",
    titleAr: "منتجات معتمدة من WRAS",
    descriptionEn:
      "Our water tank lining and GRP fiberglass systems carry WRAS (Water Regulations Advisory Scheme) certification, guaranteeing that all materials in contact with potable water are completely safe for human consumption. A critical standard for drinking water storage and supply.",
    descriptionAr:
      "تحمل أنظمة تبطين خزانات المياه وألياف GRP الزجاجية لدينا شهادة WRAS، مما يضمن أن جميع المواد المُلامسة لمياه الشرب آمنة تماماً للاستهلاك البشري. معيار أساسي لتخزين مياه الشرب وتوزيعها.",
  },
  {
    id: 4,
    logo: "/certifications/logos/Overlay+Border (4).png",
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

      {/* ── Intro section ──────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

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
                className="group relative bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 hover:border-[#01a9a0]/40 hover:shadow-[0_8px_32px_rgba(1,169,160,0.10)] transition-all duration-300 flex flex-col gap-5 overflow-hidden"
              >
                {/* Subtle teal corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#01a9a0]/5 rounded-bl-[80px] pointer-events-none" />

                {/* Logo + Title row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug group-hover:text-[#01a9a0] transition-colors duration-200">
                      {isArabic ? cert.titleAr : cert.titleEn}
                    </h3>
                  </div>
                  {/* Logo badge */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 shadow-sm">
                    <Image
                      src={cert.logo}
                      alt={isArabic ? cert.titleAr : cert.titleEn}
                      fill
                      unoptimized
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-stone-100" />

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed">
                  {isArabic ? cert.descriptionAr : cert.descriptionEn}
                </p>
              </div>
            ))}
          </div>

          {/* ── Bottom Company Profile Banner ───────────────────── */}
          <div className="mt-16 sm:mt-20 relative rounded-2xl overflow-hidden bg-[#e8faf8]"
            style={{ minHeight: "160px" }}
          >
            {/* Layout: left content + right image */}
            <div className="flex flex-col lg:flex-row items-stretch">

              {/* LEFT: content */}
              <div className="flex-1 flex flex-col justify-center px-7 sm:px-10 py-8 sm:py-10 z-10">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block h-[2px] w-6 bg-[#01a9a0] rounded-full" />
                  <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#01a9a0]">
                    {isArabic ? "ملف الشركة" : "COMPANY PROFILE"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6 max-w-sm">
                  {isArabic
                    ? "اكتشف خبرتنا وخدماتنا والتزامنا ببناء غدٍ أكثر أماناً وقوة."
                    : "Discover our expertise, services and commitment to building a safer, stronger tomorrow."}
                </p>

                {/* PDF badge + Download button — same row */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* PDF file badge */}
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

                  {/* Download button */}
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

              {/* RIGHT: image — hidden on mobile, shows on lg+ */}
              <div className="hidden lg:block relative w-[420px] xl:w-[480px] flex-shrink-0">
                <Image
                  src="/certifications/logos/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png"
                  alt="Company building"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                {/* Left fade to blend with teal bg */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#e8faf8] to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
