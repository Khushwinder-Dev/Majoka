"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── DATA DEFINITIONS ─────────────────────────────────────────────────── */

interface Capability {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: "01",
    icon: "/subcontract/fi_3043652.svg",
    titleEn: "Waterproofing Works",
    titleAr: "أعمال العزل المائي",
    descEn:
      "Complete waterproofing application for roofs, basements, wet areas, tanks, and other structures.",
    descAr:
      "تطبيق شامل لأنظمة العزل المائي للأسطح والسراديب والأماكن الرطبة والخزانات ومختلف المنشآت.",
  },
  {
    id: "02",
    icon: "/subcontract/fi_709701.svg",
    titleEn: "Protective Coatings",
    titleAr: "الطلاءات الواقية",
    descEn:
      "Professional application: protective and performance coatings different project requirements.",
    descAr:
      "تطبيق احترافي للطلاءات الواقية وعالية الأداء وفق متطلبات المشاريع المختلفة.",
  },
  {
    id: "03",
    icon: "/subcontract/fi_5655093.svg",
    titleEn: "Concrete Protection & Repair",
    titleAr: "حماية وإصلاح الخرسانة",
    descEn:
      "Repair and protection solutions for cracks, joints, concrete surfaces, and structural areas.",
    descAr:
      "حلول متكاملة لإصلاح وحماية الشروخ، وفواصل التمدد، والأسطح الخرسانية، والمناطق الإنشائية.",
  },
  {
    id: "04",
    icon: "/subcontract/fi_9936457.svg",
    titleEn: "Industrial Flooring",
    titleAr: "الأرضيات الصناعية",
    descEn:
      "Durable flooring systems for industrial, commercial, and high-traffic environments.",
    descAr:
      "أنظمة أرضيات متينة فائقة التحمل للمنشآت الصناعية والتجارية والمساحات عالية الحركة.",
  },
  {
    id: "05",
    icon: "/subcontract/fi_16135988.svg",
    titleEn: "Specialist Applications",
    titleAr: "تطبيقات تخصصية دقيقة",
    descEn:
      "Specialized waterproofing and construction applications according to project specifications.",
    descAr:
      "تطبيقات عزل وإنشاءات متخصصة ومصممة وفقاً لأعلى المواصفات الهندسية للمشروع.",
  },
  {
    id: "06",
    icon: "/subcontract/fi_3043652.svg",
    titleEn: "Maintenance & Restoration",
    titleAr: "الصيانة والترميم",
    descEn:
      "Repair, restoration, and maintenance works for existing buildings and structures.",
    descAr:
      "أعمال الإصلاح والترميم وإعادة التأهيل والصيانة الدورية للأبنية والمنشآت القائمة.",
  },
];

interface Requirement {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const REQUIREMENTS: Requirement[] = [
  {
    id: "01",
    icon: "/subcontract/fi_8193540.svg",
    titleEn: "Professional Execution",
    titleAr: "تنفيذ احترافي دقيق",
    descEn:
      "Experienced teams focused on quality workmanship and proper application.",
    descAr:
      "فرق عمل ذات خبرة واسعة تركز على الحرفية العالية وتطبيق الأنظمة وفق أعلى المعايير.",
  },
  {
    id: "02",
    icon: "/subcontract/fi_12539642.svg",
    titleEn: "Project Coordination",
    titleAr: "تنسيق هندسي متكامل",
    descEn:
      "We coordinate closely with main contractors and project teams to support execution.",
    descAr:
      "تنسيق وثيق ومباشر مع المقاولين الرئيسيين وفرق إدارة المشروع لدعم سير الأعمال بسلاسة.",
  },
  {
    id: "03",
    icon: "/subcontract/fi_3002389.svg",
    titleEn: "Quality Materials",
    titleAr: "مواد معتمدة وموثوقة",
    descEn:
      "Materials and systems selected according to project application requirements.",
    descAr:
      "اختيار دقيق للمواد والأنظمة المطابقة للمواصفات والمتطلبات الفنية للمشروع.",
  },
  {
    id: "04",
    icon: "/subcontract/fi_10701637.svg",
    titleEn: "Safety Focus",
    titleAr: "أولوية السلامة والجودة",
    descEn:
      "Completed works are inspected and handed over according requirements.",
    descAr:
      "فحص وتسليم الأعمال المنجزة بدقة والتزام كامل بكافة اشتراطات السلامة والجودة.",
  },
];

interface ProcessStep {
  step: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    icon: "/subcontract/fi_12515699.svg",
    titleEn: "Project Enquiry",
    titleAr: "استلام طلب المشروع",
    descEn: "Share your project requirements, drawings, or specifications.",
    descAr: "شارك معنا متطلبات المشروع والمخططات الهندسية والمواصفات الفنية.",
  },
  {
    step: "02",
    icon: "/subcontract/fi_1721936.svg",
    titleEn: "Site Assessment",
    titleAr: "المعاينة الميدانية",
    descEn:
      "Our team reviews the site and project conditions where required.",
    descAr: "يقوم فريقنا الهندسي بمعاينة الموقع ودراسة حالته الإنشائية عند الحاجة.",
  },
  {
    step: "03",
    icon: "/subcontract/fi_2058768.svg",
    titleEn: "Technical Proposal",
    titleAr: "المقترح الفني والتسعير",
    descEn:
      "We recommend the appropriate system and provide a quotation.",
    descAr: "نوصي بأفضل نظام هندسي ملائم ونقدم عرض أسعار تنافسي ومدروس.",
  },
  {
    step: "04",
    icon: "/subcontract/fi_1265775.svg",
    titleEn: "Inspection & Handover",
    titleAr: "الفحص والتسليم النهائي",
    descEn:
      "Completed works are inspected and handed over according to project requirements.",
    descAr: "فحص واختبار دقيق للأعمال المنفذة وتسليمها حسب مواصفات المشروع.",
  },
];

interface IndustryPartner {
  icon: string;
  titleEn: string;
  titleAr: string;
}

const INDUSTRY_PARTNERS: IndustryPartner[] = [
  {
    icon: "/subcontract/fi_12194416.svg",
    titleEn: "Main Contractors",
    titleAr: "المقاولون الرئيسيون",
  },
  {
    icon: "/subcontract/fi_9321540.svg",
    titleEn: "General Contractors",
    titleAr: "المقاولون العامون",
  },
  {
    icon: "/subcontract/fi_9470296.svg",
    titleEn: "Property Developers",
    titleAr: "المطورون العقاريون",
  },
  {
    icon: "/subcontract/fi_12309211.svg",
    titleEn: "Construction Companies",
    titleAr: "شركات البناء والتشييد",
  },
  {
    icon: "/subcontract/fi_12061645.svg",
    titleEn: "Consultants",
    titleAr: "المكاتب الاستشارية",
  },
  {
    icon: "/subcontract/fi_9321497.svg",
    titleEn: "Facility Management Companies",
    titleAr: "شركات إدارة المرافق",
  },
];

export default function SubcontractContent() {
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="w-full bg-white selection:bg-[#01a9a0] selection:text-white" dir={dir}>
      {/* ─── SECTION 1: HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Background Image with Dark Tinted Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/subcontract/hero.png"
            alt="Reliable Subcontracting For Your Projects"
            fill
            priority
            className="object-cover object-[center_35%]"
          />
          {/* Multi-layered dark gradient overlay for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 sm:mb-6">
              <Link
                href="/"
                className="text-white/85 hover:text-white transition-colors"
              >
                {isAr ? "الرئيسية" : "HOME"}
              </Link>
              <span className="text-[#01a9a0] font-bold">//</span>
              <span className="text-[#01a9a0]">
                {isAr ? "خدمات مقاولات الباطن" : "SUBCONTRACTING"}
              </span>
            </nav>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.15]">
              {isAr ? (
                <>
                  مقاولات باطن موثوقة
                  <br />
                  لمشاريعكم الإنشائية
                </>
              ) : (
                <>
                  Reliable Subcontracting
                  <br />
                  For Your Projects
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base lg:text-[17px] leading-relaxed mt-5 max-w-xl font-normal">
              {isAr
                ? "خدمات متخصصة في العزل المائي والمقاولات الدقيقة تسلّم بجودة عالية، وأمان تام، وتنسيق هندسي موثوق للمشاريع."
                : "Professional waterproofing and specialized contracting services delivered with quality, safety, and reliable project coordination."}
            </p>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-3.5 bg-[#01a9a0] hover:bg-[#008f87] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#01a9a0]/30 hover:shadow-[#01a9a0]/50 hover:scale-[1.02] group"
              >
                <span>
                  {isAr
                    ? "طلب تسعير مقاولة باطن"
                    : "REQUEST A SUBCONTRACTING QUOTE"}
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-[#01a9a0] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-4 h-4 text-[#01a9a0] rtl:rotate-180" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INTRO / ABOUT SUBCONTRACTING ────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Image with rounded corners */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-[28px] overflow-hidden shadow-xl shadow-gray-200/70 border border-gray-100">
                <Image
                  src="/subcontract/intro-handshake.png"
                  alt="Subcontracting Services Collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Heading & Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow / Tagline */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-7 h-[2px] bg-[#01a9a0] inline-block rounded-full" />
                <span className="text-[#01a9a0] text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                  {isAr ? "خدمات مقاولات الباطن" : "SUBCONTRACTING SERVICES"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-[1.2]">
                {isAr ? (
                  <>
                    مقاولات باطن موثوقة{" "}
                    <span className="text-[#01a9a0]">
                      لمشاريعكم
                      <br />
                      الإنشائية
                    </span>
                  </>
                ) : (
                  <>
                    Reliable Subcontracting{" "}
                    <span className="text-[#01a9a0]">For</span>
                    <br />
                    <span className="text-[#01a9a0]">Your Projects</span>
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-5 max-w-xl font-normal">
                {isAr
                  ? "خدمات متخصصة في العزل المائي والمقاولات الدقيقة تسلّم بجودة عالية، وأمان تام، وتنسيق هندسي موثوق للمشاريع."
                  : "Professional waterproofing and specialized contracting services delivered with quality, safety, and reliable project coordination."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: OUR SUBCONTRACTING CAPABILITIES ──────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  قدراتنا في <span className="text-[#01a9a0]">مقاولات الباطن</span>
                </>
              ) : (
                <>
                  Our Subcontracting <span className="text-[#01a9a0]">Capabilities</span>
                </>
              )}
            </h2>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-start gap-5 group"
              >
                {/* Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#e6f7f6] flex-shrink-0 flex items-center justify-center p-3 text-[#01a9a0] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cap.icon}
                    alt={cap.titleEn}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Card Text Content */}
                <div className="flex-1">
                  <span className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider">
                    {cap.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2 leading-snug">
                    {isAr ? cap.titleAr : cap.titleEn}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">
                    {isAr ? cap.descAr : cap.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: BUILT FOR PROJECT REQUIREMENTS ─────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  مصممة لتلبية <span className="text-[#01a9a0]">متطلبات المشاريع</span>
                </>
              ) : (
                <>
                  Built For Project <span className="text-[#01a9a0]">Requirements</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Column Flow with Vertical Cyan Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto divide-y sm:divide-y-0 lg:divide-x lg:rtl:divide-x-reverse divide-teal-100/70">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.id}
                className="px-4 sm:px-7 py-6 sm:py-3 text-left rtl:text-right flex flex-col items-start rtl:items-end group"
              >
                {/* Top Icon */}
                <div className="w-12 h-12 mb-4 flex items-center justify-start rtl:justify-end">
                  <Image
                    src={req.icon}
                    alt={req.titleEn}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain text-[#01a9a0] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Number Index */}
                <span className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">
                  {req.id}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2 leading-snug">
                  {isAr ? req.titleAr : req.titleEn}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">
                  {isAr ? req.descAr : req.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: SIMPLE & EFFICIENT PROCESS ─────────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  إجراءات بسيطة و <span className="text-[#01a9a0]">تنفيذ فعال</span>
                </>
              ) : (
                <>
                  Simple & <span className="text-[#01a9a0]">Efficient Process</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Process Steps Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 max-w-6xl mx-auto relative">
            {PROCESS_STEPS.map((proc, index) => (
              <div
                key={proc.step}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Horizontal Arrow between items on desktop */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-8 text-[#01a9a0] z-20 pointer-events-none">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="rtl:rotate-180"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                )}

                {/* Circular Badged Icon */}
                <div className="relative flex flex-col items-center">
                  {/* Top Cyan Number Badge */}
                  <span className="w-7 h-7 rounded-full bg-[#01a9a0] text-white text-xs font-bold flex items-center justify-center z-10 shadow-sm ring-4 ring-[#f4f7fa]">
                    {proc.step}
                  </span>
                  {/* Icon Card Bubble */}
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center p-4 -mt-3.5 pt-4 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={proc.icon}
                      alt={proc.titleEn}
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mt-6 mb-2">
                  {isAr ? proc.titleAr : proc.titleEn}
                </h3>

                {/* Step Description */}
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed max-w-[220px]">
                  {isAr ? proc.descAr : proc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: SUPPORTING PROJECTS ACROSS THE INDUSTRY ────────── */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              {isAr
                ? "دعم المشاريع عبر مختلف قطاعات التشييد والبناء"
                : "Supporting Projects Across The Construction Industry"}
            </h2>
          </div>

          {/* 6 Partner Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {INDUSTRY_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200/90 rounded-xl p-5 sm:p-6 text-center flex flex-col items-center justify-center gap-3.5 hover:shadow-lg hover:border-[#01a9a0]/60 hover:-translate-y-1 transition-all duration-300 min-h-[140px] group"
              >
                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={partner.icon}
                    alt={partner.titleEn}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain text-[#01a9a0]"
                  />
                </div>

                {/* Label */}
                <span className="text-xs sm:text-[13px] font-bold text-gray-800 leading-snug">
                  {isAr ? partner.titleAr : partner.titleEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
