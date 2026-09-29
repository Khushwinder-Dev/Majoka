"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SolutionItem {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  icon: string;
  href: string;
}

export default function SolutionsListingSection({
  className = "",
}: {
  className?: string;
}) {
  const { isArabic } = useLanguage();

  // The 6 specific solutions requested:
  // 1. Waterproofing solutions
  // 2. Roof waterproofing
  // 3. Concrete repair
  // 4. Industrial waterproofing
  // 5. Structural protection
  // 6. Leak/injection solutions
  const solutions: SolutionItem[] = [
    {
      id: 1,
      titleEn: "Waterproofing Solutions",
      titleAr: "حلول العزل المائي",
      descEn:
        "Comprehensive multi-layer waterproofing systems protecting all structural surfaces and wet areas from moisture and water ingress.",
      descAr:
        "أنظمة عزل مائي متكاملة ومتعددة الطبقات لحماية كافة الأسطح والمناطق الرطبة والمنشآت من تسربات المياه والرطوبة.",
      image: "/solutions/Img (5).png",
      icon: "/solutions/icons/fi_67780.svg",
      href: "/services?service=1",
    },
    {
      id: 2,
      titleEn: "Roof Waterproofing",
      titleAr: "عزل الأسطح",
      descEn:
        "Advanced membrane and liquid coating systems designed to provide durable waterproofing and thermal insulation for any building structure.",
      descAr:
        "أنظمة أغشية وطلاءات سائلة متطورة مصممة لتوفير عزل مائي وحراري فائق الكفاءة وطويل الأمد لجميع أنواع المباني والأسطح.",
      image:
        "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/gallery/roofer-inspecting-a-roof-coated-coating-fluid-applied-liquid-applied-roof-for-damage-and-maintenance-comm.webp",
      icon: "/solutions/icons/fi_18415857.svg",
      href: "/services?service=1&sub=combo-system-roof-waterproofing",
    },
    {
      id: 3,
      titleEn: "Concrete Repair",
      titleAr: "إصلاح الخرسانة",
      descEn:
        "High-pressure crack injection, anti-carbonation coatings, and structural rehabilitation systems that restore concrete integrity.",
      descAr:
        "حقن الشقوق تحت ضغط عالٍ، الطلاءات المضادة للكربنة وإعادة تأهيل الخرسانة التالفة لضمان استعادة المتانة الإنشائية.",
      image: "/solutions/Img (4).png",
      icon: "/solutions/icons/fi_15606796.svg",
      href: "/services?service=1&sub=injection-waterproofing",
    },
    {
      id: 4,
      titleEn: "Industrial Waterproofing",
      titleAr: "العزل المائي للمنشآت الصناعية",
      descEn:
        "Heavy-duty waterproofing engineered for factories, warehouses, chemical storage plants, and heavy processing facilities.",
      descAr:
        "حلول عزل فائقة التحمل للمصانع والمستودعات والمنشآت الكيميائية والصناعية مقاومة للتآكل وحركة المعدات الثقيلة.",
      image: "/solutions/Img (2).png",
      icon: "/solutions/icons/fi_8551956.svg",
      href: "/services?service=1&sub=polyurea-coating-waterproofing",
    },
    {
      id: 5,
      titleEn: "Structural Protection",
      titleAr: "حماية الهياكل الإنشائية",
      descEn:
        "Comprehensive underground tanking and hydrostatic barrier systems protecting foundations and structures against groundwater pressure.",
      descAr:
        "أنظمة حماية وتكتيم متطورة للأساسات والأقبية تحت الأرض لمقاومة ضغط المياه الجوفية والعوامل الكيميائية الضارة.",
      image: "/solutions/Img (1).png",
      icon: "/solutions/icons/fi_11135584.svg",
      href: "/services?service=1&sub=bitumen-membrane-waterproofing",
    },
    {
      id: 6,
      titleEn: "Leak / Injection Solutions",
      titleAr: "حلول معالجة التسربات والحقن",
      descEn:
        "Targeted leak diagnostic surveys, high-pressure polyurethane chemical injection, and rapid-setting water stop systems.",
      descAr:
        "فحوصات تشخيصية دقيقة وحقن كيميائي بالبولي يوريثان لإيقاف تدفق المياه النشط وسد الفواصل والشروخ بشكل دائم.",
      image: "/solutions/Img (6).png",
      icon: "/solutions/icons/fi_15343343.svg",
      href: "/services?service=1&sub=injection-waterproofing",
    },
  ];

  return (
    <section className={`relative w-full py-16 sm:py-20 lg:py-24 bg-white ${className}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
              {isArabic ? "حلولنا التخصصية" : "OUR SOLUTIONS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
          </div>

          {/* Title with Teal Highlight */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
            {isArabic ? (
              <>
                حماية متكاملة <span className="text-[#00c4b4]">وحلول مخصصة.</span>
              </>
            ) : (
              <>
                Complete Protection <span className="text-[#00c4b4]">Tailored Solutions.</span>
              </>
            )}
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-stone-500 max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? "حلول هندسية متطورة مصممة لحماية كافة عناصر منشأتك من تسرب المياه والتدهور الإنشائي بأعلى معايير الجودة."
              : "Engineered solutions tailored to protect every component of your property from water ingress and structural deterioration."}
          </p>
        </div>

        {/* 6 Selected Solutions Cards Grid (3 Columns on Large Screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,196,180,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Top Image Container */}
              <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={isArabic ? item.titleAr : item.titleEn}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle Image Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Circular White Floating Icon Badge Bridging Image & Content */}
              <div className="relative -mt-7 ml-6 rtl:ml-auto rtl:mr-6 z-10 w-14 h-14 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 border border-slate-100/90 group-hover:scale-105 transition-all duration-300">
                <Image
                  src={item.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Card Text Content */}
              <div className="px-6 pt-2.5 pb-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-[19px] font-bold text-[#0B1C24] group-hover:text-[#00c4b4] transition-colors leading-snug mb-2.5">
                  {isArabic ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed flex-1 mb-5">
                  {isArabic ? item.descAr : item.descEn}
                </p>

                {/* Explore Link */}
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00DDCF] hover:text-[#00c4b4] group-hover:gap-2.5 transition-all self-start mt-auto"
                >
                  <span>{isArabic ? "استكشف الحل" : "Explore Solution"}</span>
                  {isArabic ? (
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
