"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ExpertiseCard {
  id: number;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  href: string;
}

const EXPERTISE_CARDS: ExpertiseCard[] = [
  {
    id: 1,
    icon: "/ourExpertise/SVG.svg",
    titleEn: "Waterproofing Systems",
    titleAr: "أنظمة العزل المائي",
    descEn: "Innovative solutions for roofs, basements, wet areas and more.",
    descAr: "حلول مبتكرة لعزل الأسطح، الأساسات، الخزانات والمناطق الرطبة.",
    href: "/services?service=1",
  },
  {
    id: 2,
    icon: "/ourExpertise/SVG (1).svg",
    titleEn: "Building Protection",
    titleAr: "حماية المباني والمنشآت",
    descEn: "Comprehensive systems to enhance durability and performance.",
    descAr: "أنظمة شاملة لتعزيز متانة المنشآت وحمايتها من العوامل البيئية.",
    href: "/services?service=1&sub=combo-system-roof-waterproofing",
  },
  {
    id: 3,
    icon: "/ourExpertise/SVG (2).svg",
    titleEn: "Repair & Restoration",
    titleAr: "الإصلاح والترميم الإنشائي",
    descEn: "Expert solutions to restore and strengthen existing structures.",
    descAr: "حلول متقدمة لمعالجة الشروخ وترميم الخرسانة وتقوية الهياكل القائمة.",
    href: "/services?service=1&sub=injection-waterproofing",
  },
  {
    id: 4,
    icon: "/ourExpertise/SVG (3).svg",
    titleEn: "Commercial Buildings",
    titleAr: "المباني والمشاريع التجارية",
    descEn: "Specialized systems for offices, retail, hospitals and large-scale projects.",
    descAr: "أنظمة متخصصة للأبراج المكتبية، المراكز التجارية والمشاريع الكبرى.",
    href: "/industries",
  },
  {
    id: 5,
    icon: "/ourExpertise/SVG (4).svg",
    titleEn: "Residential Buildings",
    titleAr: "المباني والمجمعات السكنية",
    descEn: "Reliable protection for homes, villas and residential complexes.",
    descAr: "حماية موثوقة ودائمة للمنازل والفلل والمجمعات السكنية الحديثة.",
    href: "/industries",
  },
  {
    id: 6,
    icon: "/ourExpertise/SVG (5).svg",
    titleEn: "Industrial Facilities",
    titleAr: "المنشآت والمصانع الصناعية",
    descEn: "Heavy-duty solutions for factories, warehouses and infrastructure.",
    descAr: "حلول الخدمة الشاقة للمصانع والمستودعات والمنشآت اللوجستية.",
    href: "/industries",
  },
  {
    id: 7,
    icon: "/ourExpertise/SVG (6).svg",
    titleEn: "Infrastructure",
    titleAr: "مشاريع البنية التحتية",
    descEn: "Waterproofing expertise for bridges, tunnels and public constructions.",
    descAr: "خبرة هندسية رائدة لعزل الجسور والأنفاق ومشاريع النقل والمرافق العامة.",
    href: "/industries",
  },
  {
    id: 8,
    icon: "/ourExpertise/SVG (7).svg",
    titleEn: "Sustainable Solutions",
    titleAr: "الحلول المستدامة والخضراء",
    descEn: "Eco-friendly systems for a safer, energy-efficient and greener tomorrow.",
    descAr: "أنظمة صديقة للبيئة توفر كفاءة الطاقة وتقلل الانبعاثات الحرارية.",
    href: "/services?service=1&sub=combo-system-roof-waterproofing",
  },
];

interface ExpertiseFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const EXPERTISE_FAQS: ExpertiseFaqItem[] = [
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

interface SectorItem {
  id: number;
  titleEn: string;
  titleAr: string;
  image: string;
  href: string;
}

const SECTOR_ITEMS: SectorItem[] = [
  {
    id: 1,
    titleEn: "Residential",
    titleAr: "المساحات السكنية",
    image: "/ourExpertise/Container.png",
    href: "/industries",
  },
  {
    id: 2,
    titleEn: "Commercial",
    titleAr: "المشاريع التجارية",
    image: "/ourExpertise/Contemporary commercial skyscraper.png",
    href: "/industries",
  },
  {
    id: 3,
    titleEn: "Industrial",
    titleAr: "المنشآت الصناعية",
    image: "/ourExpertise/Industrial factory plant.png",
    href: "/industries",
  },
  {
    id: 4,
    titleEn: "Healthcare",
    titleAr: "الرعاية الصحية والمستشفيات",
    image: "/ourExpertise/Modern healthcare facility building.png",
    href: "/industries",
  },
  {
    id: 5,
    titleEn: "Education",
    titleAr: "المؤسسات التعليمية",
    image: "/ourExpertise/Container (1).png",
    href: "/industries",
  },
];

export default function OurExpertiseContent() {
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
          1. HERO BANNER SECTION (EXPERTISE — with Engineer & Skyline)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center bg-[#071d34] overflow-hidden">
        {/* Background Image: Engineer with blueprints overlooking skyline */}
        <Image
          src="/ourExpertise/Dubai modern skyline at twilight.png"
          alt="Our Expertise Hero Banner"
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
              {isArabic ? "خبراتنا" : "EXPERTISE"}
            </h1>
            <span className="inline-block w-10 sm:w-14 md:w-16 h-[3px] sm:h-[4px] bg-white rounded-full drop-shadow" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. INTRO HEADING: "Our Expertise"
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-14 sm:pt-16 pb-6 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
            <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
              {isArabic ? "الخبرة والريادة" : "EXPERTISE"}
            </span>
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0d2438] tracking-tight mb-3">
            {isArabic ? (
              <>
                خبراتنا <span className="text-[#00A896]">المتخصصة</span>
              </>
            ) : (
              <>
                Our <span className="text-[#00A896]">Expertise</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto">
            {isArabic
              ? "ندرك أن كل قطاع ومشروع يحمل تحدياته الخاصة. حلولنا المتكاملة في العزل المائي والحماية الإنشائية مصممة لتمكينك من البناء بأعلى معايير القوة والأمان والاستدامة."
              : "We understand that every industry has unique challenges. Our tailored waterproofing and protective solutions help you build faster, stronger, and more sustainable assets."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. OUR AREAS OF EXPERTISE (8 Cards Grid)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-10 sm:py-14 bg-[#f4fcf9]/60">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Section Subheader: Tag + Title on Left, Description on Right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[2px] bg-[#00A896]" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
                  {isArabic ? "مجالات تميزنا" : "WHAT WE DO BEST"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d2438] tracking-tight">
                {isArabic ? (
                  <>
                    مجالات <span className="text-[#00A896]">خبرتنا</span>
                  </>
                ) : (
                  <>
                    Our Areas of <span className="text-[#00A896]">Expertise</span>
                  </>
                )}
              </h3>
            </div>

            <p className="text-stone-500 text-xs sm:text-sm max-w-md leading-relaxed">
              {isArabic
                ? "من أنظمة العزل المتقدمة إلى الحماية الإنشائية الشاملة، تغطي خبراتنا المعتمدة كل مرحلة من مراحل مشروعك."
                : "From advanced waterproofing systems to complete building protection, our expertise covers every stage of your project."}
            </p>
          </div>

          {/* 8 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {EXPERTISE_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,168,150,0.06)] border border-stone-100 flex flex-col justify-between hover:shadow-[0_10px_32px_rgba(0,168,150,0.14)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#e6fbf7] border border-[#00A896]/20 flex items-center justify-center text-[#00A896] mb-5 group-hover:bg-[#00A896] group-hover:text-white transition-colors duration-300">
                    <Image
                      src={card.icon}
                      alt={card.titleEn}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-[17px] font-bold text-[#0d2438] group-hover:text-[#00A896] transition-colors leading-snug mb-2">
                    {isArabic ? card.titleAr : card.titleEn}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                    {isArabic ? card.descAr : card.descEn}
                  </p>
                </div>

                {/* Bottom Action Arrow Button */}
                <div className="pt-5 flex justify-end">
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
          4. SECTION: A PARTNER YOU CAN RELY ON (Banner with 3 Stats)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="relative w-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-stone-100 bg-[#082b35]">

            {/* Background Image: Clean architecture on left and deep teal on right */}
            <div className="relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
              <Image
                src="/ourExpertise/WhyChooseUsSection (1).png"
                alt="A Partner You Can Rely On"
                fill
                priority
                unoptimized
                className="object-cover object-left md:object-center"
              />

              {/* Content Overlay positioned on the right half */}
              <div className="relative md:absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 md:py-0 z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                  {/* Left Column spacer on desktop for architectural visual */}
                  <div className="hidden md:block md:col-span-5" />

                  {/* Right Column: Heading, Subtitle & 3 Stats */}
                  <div className="md:col-span-7 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-[2px] bg-[#3CD3C1]" />
                      <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#3CD3C1] uppercase">
                        {isArabic ? "لماذا تختار خبراتنا" : "WHY CHOOSE OUR EXPERTISE"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                      {isArabic ? "شريك يمكنك الاعتماد عليه" : "A Partner You Can Rely On"}
                    </h3>

                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
                      {isArabic
                        ? "خبرتنا مدعومة بسنوات طويلة من التميز الميداني، والأنظمة المعتمدة دولياً، والالتزام الثابت بتقديم أعلى درجات الجودة في كل مرحلة."
                        : "Our expertise is backed by industry experience, certified systems and a commitment to quality at every stage."}
                    </p>

                    {/* Divider Line */}
                    <div className="w-full h-[1px] bg-white/20 mb-6" />

                    {/* 3 Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                      {/* Stat 1: 500+ Projects Completed */}
                      <div className="flex flex-col">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#5EEAD4] mb-2">
                          <Building2 className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                          500+
                        </span>
                        <span className="text-[11px] sm:text-xs text-stone-300 font-medium leading-tight">
                          {isArabic ? "مشروع مكتمل" : "Projects Completed"}
                        </span>
                      </div>

                      {/* Stat 2: 15+ Years of Experience */}
                      <div className="flex flex-col">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#5EEAD4] mb-2">
                          <ShieldCheck className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                          15+
                        </span>
                        <span className="text-[11px] sm:text-xs text-stone-300 font-medium leading-tight">
                          {isArabic ? "سنوات خبرة" : "Years of Experience"}
                        </span>
                      </div>

                      {/* Stat 3: 100% Quality Guaranteed */}
                      <div className="flex flex-col">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#5EEAD4] mb-2">
                          <CheckCircle2 className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none mb-1">
                          100%
                        </span>
                        <span className="text-[11px] sm:text-xs text-stone-300 font-medium leading-tight">
                          {isArabic ? "ضمان الجودة" : "Quality Guaranteed"}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. SECTION: FREQUENTLY ASKED QUESTIONS (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#f3fcf9] overflow-hidden">

        {/* Decorative Fluid Ribbons at bottom corners */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-left.png"
            alt=""
            width={500}
            height={330}
            className="w-[260px] sm:w-[380px] md:w-[480px] h-auto opacity-75"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-right.png"
            alt=""
            width={550}
            height={330}
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
            {EXPERTISE_FAQS.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              const formattedNum = String(faq.id).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  className={`bg-white border transition-all duration-300 overflow-hidden ${isOpen
                    ? "rounded-2xl sm:rounded-3xl border-[#00A896]/40 shadow-[0_8px_24px_rgba(0,168,150,0.09)]"
                    : "rounded-full border-stone-200/90 hover:border-[#00A896]/40 shadow-xs hover:shadow-sm"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 text-left rtl:text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ddf8f3] text-[#00A896] text-xs sm:text-[13px] font-bold flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#00A896] group-hover:text-white">
                        {formattedNum}
                      </div>

                      <span
                        className={`text-[13px] sm:text-[15px] font-semibold leading-snug transition-colors ${isOpen ? "text-[#00A896]" : "text-stone-800 group-hover:text-[#00A896]"
                          }`}
                      >
                        {isArabic ? faq.questionAr : faq.questionEn}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen
                        ? "bg-[#ddf8f3] text-[#00A896]"
                        : "bg-[#ddf8f3] text-[#00A896] group-hover:bg-[#00A896] group-hover:text-white"
                        }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-xs sm:text-[14px] text-stone-600 font-normal leading-relaxed">
                      <div className="ltr:pl-11 rtl:pr-11">
                        {isArabic ? faq.answerAr : faq.answerEn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. SECTION: EXPERTISE ACROSS EVERY SECTOR (5 Sector Cards)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-14 sm:py-18 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Section Header: Tag + Title on Left, Subtitle on Right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[2px] bg-[#00A896]" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
                  {isArabic ? "القطاعات التي نخدمها" : "INDUSTRIES WE SERVE"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d2438] tracking-tight">
                {isArabic ? "خبرة تمتد عبر جميع القطاعات" : "Expertise Across Every Sector"}
              </h3>
            </div>

            <p className="text-stone-500 text-xs sm:text-sm max-w-md leading-relaxed">
              {isArabic
                ? "خبراتنا الهندسية وحلولنا المعتمدة محل ثقة عبر باقة واسعة من القطاعات، لضمان الحماية المستدامة لجميع أنواع المنشآت."
                : "Our knowledge and solutions are trusted across a wide range of industries, ensuring long-lasting protection for every type of structure."}
            </p>
          </div>

          {/* 5 Sector Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {SECTOR_ITEMS.map((sector) => (
              <Link
                key={sector.id}
                href={sector.href}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full h-[130px] sm:h-[150px] overflow-hidden bg-stone-100">
                  <Image
                    src={sector.image}
                    alt={sector.titleEn}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <div className="py-3.5 px-3 text-center bg-white">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-[#00A896] transition-colors leading-tight">
                    {isArabic ? sector.titleAr : sector.titleEn}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
