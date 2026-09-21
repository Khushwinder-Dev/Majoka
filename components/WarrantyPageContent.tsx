"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";
import { useLanguage } from "@/context/LanguageContext";

interface WarrantyCard {
  id: number;
  image: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationEn: string;
  durationAr: string;
  href: string;
}

const WARRANTY_CARDS: WarrantyCard[] = [
  {
    id: 1,
    image: "/warranty/Background.png",
    icon: "/warranty/SVG.svg",
    titleEn: "Material Warranty",
    titleAr: "ضمان المواد المصنعية",
    descEn: "High-quality, certified materials with long-term manufacturer warranty.",
    descAr: "مواد عزل معتمدة ومطابقة لأعلى المواصفات العالمية مع ضمان شامل طويل الأمد من المصنع.",
    durationEn: "10 – 20 Years",
    durationAr: "10 – 20 سنة",
    href: "/contact",
  },
  {
    id: 2,
    image: "/warranty/Background (1).png",
    icon: "/warranty/SVG (1).svg",
    titleEn: "Workmanship Warranty",
    titleAr: "ضمان جودة التنفيذ والتركيب",
    descEn: "Expert installation backed by our skilled and experienced team.",
    descAr: "تنفيذ احترافي دقيق بواسطة فرقنا الهندسية والفنية المدربة والمصنفة في دولة الإمارات.",
    durationEn: "5 – 10 Years",
    durationAr: "5 – 10 سنوات",
    href: "/contact",
  },
  {
    id: 3,
    image: "/warranty/System Warranty Structure.png",
    icon: "/warranty/SVG (2).svg",
    titleEn: "System Warranty",
    titleAr: "ضمان النظام المتكامل",
    descEn: "Complete system coverage for maximum protection and performance.",
    descAr: "تغطية متكاملة لجميع طبقات وأنظمة العزل لضمان أقصى درجات الحماية والأداء المستدام.",
    durationEn: "Up to 20 Years",
    durationAr: "حتى 20 سنة",
    href: "/contact",
  },
];

interface WarrantyFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const WARRANTY_FAQS: WarrantyFaqItem[] = [
  {
    id: 1,
    questionEn: "Why is the 'UAE PASS' the best way to update my Emirates ID?",
    questionAr: "لماذا يعتبر 'UAE PASS' أفضل طريقة لتحديث بطاقة الهوية الإماراتية؟",
    answerEn:
      "UAE PASS provides secure, instant digital identity verification across all UAE government entities and certified technical contracting services, eliminating manual paperwork and physical verification visits.",
    answerAr:
      "يوفر تطبيق الهوية الرقمية (UAE PASS) تحققاً فورياً وآمناً من الهوية عبر جميع الجهات الحكومية والخدمات الفنية المعتمدة في الدولة، مما يغني تماماً عن المعاملات الورقية والزيارات الميدانية.",
  },
  {
    id: 2,
    questionEn: "Will I be charged for accessing UAE PASS app?",
    questionAr: "هل يتم فرض أي رسوم على الوصول أو استخدام تطبيق UAE PASS؟",
    answerEn:
      "No, accessing and utilizing the official UAE PASS application and verification services is completely free of charge for all UAE citizens and residents.",
    answerAr:
      "لا، تحميل واستخدام تطبيق الهوية الرقمية الرسمي UAE PASS مجاني تماماً دون أي رسوم لجميع المواطنين والمقيمين في دولة الإمارات.",
  },
  {
    id: 3,
    questionEn: "What are the other ways of updating my Emirates ID?",
    questionAr: "ما هي الطرق الأخرى لتحديث بيانات الهوية الإماراتية؟",
    answerEn:
      "You can also update your Emirates ID information through the Federal Authority for Identity and Citizenship (ICP) online portal, Customer Happiness Centers, or authorized typing and Amer offices across the UAE.",
    answerAr:
      "يمكنك أيضاً تحديث بيانات الهوية الإماراتية من خلال البوابة الإلكترونية للهيئة الاتحادية للهوية والجنسية (ICP) أو مراكز سعادة المتعاملين ومكاتب الطباعة ومراكز آمر المعتمدة.",
  },
  {
    id: 4,
    questionEn: "Why can't I select all my numbers for the update?",
    questionAr: "لماذا لا يمكنني اختيار جميع أرقامي للتحديث في آن واحد؟",
    answerEn:
      "Regulatory telecom standards mandate distinct authentication for each registered subscriber line to maintain strict account security and prevent unauthorized account modifications.",
    answerAr:
      "تتطلب المعايير التنظيمية لقطاع الاتصالات مصادقة مستقلة لكل خط اتصال مسجل لضمان الحماية التامة للحساب ومنع التعديلات غير المصرح بها.",
  },
  {
    id: 5,
    questionEn: "If my number registered with a passport or GCC national ID, can I update my ID online?",
    questionAr: "إذا كان رقمي مسجلاً بجواز سفر أو بطاقة هوية خليجية، هل يمكنني التحديث عبر الإنترنت؟",
    answerEn:
      "Yes, you can conveniently initiate the verification online by uploading your valid passport or GCC national ID alongside your updated Emirates ID credentials via secure portal submission.",
    answerAr:
      "نعم، يمكنك البدء بالتحديث الإلكتروني بكل سهولة من خلال إرفاق صورة جواز السفر أو الهوية الوطنية الخليجية السارية مع بيانات الهوية الإماراتية المحدثة.",
  },
];

export default function WarrantyPageContent() {
  const { isArabic } = useLanguage();
  const [openFaqIds, setOpenFaqIds] = useState<number[]>([]);

  const toggleFaq = (id: number) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-white overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (WARRANTY — with City Skyline & Cards)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center bg-[#071d34] overflow-hidden">
        {/* Background Image: Skyline with warranty coverage highlights */}
        <Image
          src="/warranty/Dubai modern skyline at twilight (1).png"
          alt="Warranty Hero Banner"
          fill
          priority
          unoptimized
          className="object-center"
        />

        {/* Top gradient for transparent navbar readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Left deep dark gradient overlay for text readability as in design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021822]/90 via-[#021822]/65 via-35% md:via-30% to-transparent pointer-events-none" />

        {/* Hero Heading Content */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          <div className="flex items-center gap-3 sm:gap-4.5 mt-8 sm:mt-12 md:mt-16">
            <h1 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              {isArabic ? "الضمان المعتمد" : "WARRANTY"}
            </h1>
            <span className="inline-block w-10 sm:w-14 md:w-16 h-[3px] sm:h-[4px] bg-white rounded-full drop-shadow" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. INTRO HEADING: "Our Warranty Coverage"
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-14 sm:pt-16 pb-8 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
            <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
              {isArabic ? "الضمان والاعتماد" : "WARRANTY"}
            </span>
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0d2438] tracking-tight mb-3">
            {isArabic ? (
              <>
                تغطية الضمان <span className="text-[#00A896]">المعتمد</span>
              </>
            ) : (
              <>
                Our Warranty <span className="text-[#00A896]">Coverage</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto">
            {isArabic
              ? "ندرك أن كل قطاع ومشروع يحمل تحدياته الخاصة. حلولنا المتكاملة في العزل المائي والحماية الإنشائية مصممة لتمكينك من البناء بأعلى معايير القوة والأمان والاستدامة."
              : "We understand that every industry has unique challenges. Our tailored waterproofing and protective solutions help you build safer, stronger, and more sustainable assets."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. WARRANTY CARDS: 3 Detailed Coverage Cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pb-16 sm:pb-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {WARRANTY_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="bg-white rounded-[26px] overflow-hidden border border-stone-200/80 shadow-[0_4px_24px_rgba(0,168,150,0.06)] hover:shadow-[0_12px_36px_rgba(0,168,150,0.14)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Image Container with round badge */}
                  <div className="relative w-full h-[210px] sm:h-[230px] md:h-[210px] lg:h-[240px] overflow-hidden bg-stone-100">
                    <Image
                      src={card.image}
                      alt={card.titleEn}
                      fill
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Circular Icon floating at bottom-left */}
                    <div className="absolute left-4 sm:left-5 bottom-3.5 sm:bottom-4 rtl:left-auto rtl:right-4 rtl:sm:right-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1cd2ad] group-hover:bg-[#00A896] border-2 border-white shadow-md flex items-center justify-center text-white transition-colors duration-300">
                      <Image
                        src={card.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 pb-2">
                    <h3 className="text-lg sm:text-[19px] font-extrabold text-[#0d2438] group-hover:text-[#00A896] transition-colors leading-snug mb-2">
                      {isArabic ? card.titleAr : card.titleEn}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                      {isArabic ? card.descAr : card.descEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Duration Badge + Arrow */}
                <div className="px-5 sm:px-6 pt-4 pb-5 sm:pb-6 flex items-center justify-between border-t border-stone-100 mt-4">
                  <span className="text-sm sm:text-base font-extrabold text-[#0d2438] tracking-tight">
                    {isArabic ? card.durationAr : card.durationEn}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-[#1cd2ad] group-hover:bg-[#00A896] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs">
                    {isArabic ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: FREQUENTLY ASKED QUESTIONS (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#f3fcf9] overflow-hidden">

        {/* Decorative Fluid Ribbons at bottom corners from public/warranty */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/warranty/SVG - Bottom Left Fluid Ribbon.svg"
            alt=""
            width={722}
            height={479}
            className="w-[260px] sm:w-[380px] md:w-[480px] h-auto opacity-75"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/warranty/SVG - Bottom Right Fluid Ribbon Waves.svg"
            alt=""
            width={818}
            height={491}
            className="w-[260px] sm:w-[380px] md:w-[500px] h-auto opacity-75"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="w-5 h-[1.5px] bg-[#00A896]" />
              <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="w-5 h-[1.5px] bg-[#00A896]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d2438] tracking-tight mb-3">
              {isArabic ? (
                <>
                  الأسئلة <span className="text-[#00A896]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#00A896]">Questions</span>
                </>
              )}
            </h2>

            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isArabic
                ? "إجابات على الأسئلة الشائعة حول حلول العزل والمواد والتنفيذ. هل لا تزال بحاجة لمساعدة؟"
                : "Find answers to common questions about our industry solutions, materials, and services. Still need help?"}
            </p>
          </div>

          {/* 5 Accordion FAQ Cards */}
          <div className="space-y-3 sm:space-y-3.5">
            {WARRANTY_FAQS.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                number={faq.id}
                question={isArabic ? faq.questionAr : faq.questionEn}
                answer={isArabic ? faq.answerAr : faq.answerEn}
                isOpen={openFaqIds.includes(faq.id)}
                onToggle={() => toggleFaq(faq.id)}
                isArabic={isArabic}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
