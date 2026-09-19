"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SupportCard {
  id: number;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  href: string;
}

const SUPPORT_CARDS: SupportCard[] = [
  {
    id: 1,
    icon: "/support/Package Icon.svg",
    titleEn: "Product Support",
    titleAr: "دعم المنتجات والأنظمة",
    descEn: "Get help with product information, features and troubleshooting.",
    descAr: "احصل على استشارات فنية ومعلومات تفصيلية حول المنتجات والمواصفات وحل المشكلات.",
    href: "/products",
  },
  {
    id: 2,
    icon: "/support/SVG - Shield Check Icon.svg",
    titleEn: "Warranty & Claims",
    titleAr: "الضمان والمطالبات",
    descEn: "Learn about warranty coverage, claim process and eligibility.",
    descAr: "تعرف على شروط الضمان المعتمد وإجراءات تقديم ومتابعة المطالبات الفنية.",
    href: "/warranty",
  },
  {
    id: 3,
    icon: "/support/Files Icon.svg",
    titleEn: "Guides & Downloads",
    titleAr: "الأدلة والكتيبات الفنية",
    descEn: "Access installation guides, user manuals and technical documents.",
    descAr: "حمّل أدلة التركيب المعتمدة وكتيبات المواصفات الفنية وبطاقات الأمان.",
    href: "/resources",
  },
  {
    id: 4,
    icon: "/support/SVG - Chat Bubble Icon.svg",
    titleEn: "General Questions",
    titleAr: "الاستفسارات العامة",
    descEn: "Find answers to common questions or talk to our support.",
    descAr: "اعثر على إجابات سريعة للأسئلة الشائعة أو تواصل مباشرة مع فريق خدمة العملاء.",
    href: "/faq",
  },
];

interface SupportFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const SUPPORT_FAQS: SupportFaqItem[] = [
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

export default function SupportPageContent() {
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
          1. HERO BANNER SECTION (SUPPORT — with Call Center Team)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center bg-[#071d34] overflow-hidden">
        {/* Background Image: Support Specialists in headsets */}
        <Image
          src="/support/Dubai modern skyline at twilight.png"
          alt="Support Hero Banner"
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 w-full">
          <div className="flex items-center gap-3 sm:gap-4.5 mt-8 sm:mt-12 md:mt-16">
            <h1 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              {isArabic ? "الدعم الفني" : "SUPPORT"}
            </h1>
            <span className="inline-block w-10 sm:w-14 md:w-16 h-[3px] sm:h-[4px] bg-white rounded-full drop-shadow" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. INTRO HEADING: "Our Support"
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-14 sm:pt-16 pb-6 bg-white text-center">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#f0fbf8] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
            <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
              {isArabic ? "مركز المساعدة" : "SUPPORT"}
            </span>
            <span className="w-5 h-[1.5px] bg-[#00A896]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0d2438] tracking-tight mb-3">
            {isArabic ? (
              <>
                خدمات <span className="text-[#00A896]">الدعم</span>
              </>
            ) : (
              <>
                Our <span className="text-[#00A896]">Support</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto">
            {isArabic
              ? "ابحث في الأسئلة الشائعة أو تصفح الأقسام للعثور على المعلومات والإرشادات التي تحتاجها لحلول العزل المائي عالية الجودة."
              : "Search our frequently asked questions or browse by category to get the information you need. high-quality waterproofing solutions."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SUPPORT TOPICS: "How Can We Help You?" (4 Cards Grid)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-10 sm:py-14 bg-[#f4fcf9]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Subheader: Tag + Title on Left, View All Topics on Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[2px] bg-[#00A896]" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#00A896] uppercase">
                  {isArabic ? "أقسام المساعدة" : "SUPPORT TOPICS"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d2438] tracking-tight">
                {isArabic ? "كيف يمكننا مساعدتك اليوم؟" : "How Can We Help You?"}
              </h3>
            </div>

            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d2438] hover:text-[#00A896] transition-colors group self-start sm:self-auto"
            >
              <span>{isArabic ? "عرض جميع الأقسام" : "View All Topics"}</span>
              {isArabic ? (
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SUPPORT_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,168,150,0.06)] border border-stone-100 flex flex-col justify-between hover:shadow-[0_10px_32px_rgba(0,168,150,0.14)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div>
                  {/* Icon Box: Teal rounded box with white icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#00A896] shadow-sm flex items-center justify-center mb-5 group-hover:bg-[#008f80] group-hover:scale-105 transition-all duration-300">
                    <Image
                      src={card.icon}
                      alt={card.titleEn}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
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
                <div className="pt-6 flex justify-end">
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
          4. SECTION: STILL NEED HELP? (Contact Support Panel)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative w-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-stone-100 bg-[#ebfaf6]">

            {/* Background Image: Support Agents on left + soft cyan tint + plants on right */}
            <div className="relative w-full min-h-[460px] md:min-h-[400px] lg:min-h-[440px]">
              <Image
                src="/support/Section - ContactSupportPanel.png"
                alt="Support Team"
                fill
                priority
                unoptimized
                className="object-cover object-left md:object-center"
              />

              {/* Content Overlay */}
              <div className="relative md:absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 md:py-6 z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">

                  {/* Left Column Spacer for Customer Service Team in background */}
                  <div className="hidden md:block md:col-span-4 lg:col-span-4" />

                  {/* Center Content: "Still Need Help?" + CTA Button */}
                  <div className="md:col-span-4 lg:col-span-4 text-center md:text-left rtl:md:text-right">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d2438] tracking-tight mb-2.5">
                      {isArabic ? "ما زلت بحاجة للمساعدة؟" : "Still Need Help?"}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
                      {isArabic
                        ? "فريق الدعم الفني لدينا متواجد لمساعدتك والإجابة على استفساراتك بأسرع وقت ممكن."
                        : "Our support team is here to assist you. we'll get back to you as soon as possible."}
                    </p>

                    <Link
                      href="https://wa.me/971556173380"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#1cd2ad] hover:bg-[#00A896] text-white px-7 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
                    >
                      <span>{isArabic ? "تحدث معنا الآن" : "Chat with Us"}</span>
                      {isArabic ? (
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </Link>
                  </div>

                  {/* Right Column: 3 Contact Support Cards */}
                  <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-3 sm:gap-3.5">

                    {/* Card 1: Email Support */}
                    <Link
                      href="mailto:info@tajalrahmah.com"
                      className="bg-white rounded-2xl p-4 sm:p-4.5 shadow-[0_4px_16px_rgba(0,168,150,0.08)] border border-stone-100 flex items-center justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#e6fbf7] text-[#00A896] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00A896] group-hover:text-white transition-colors duration-300">
                          <Mail className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13px] sm:text-sm font-bold text-[#0d2438] group-hover:text-[#00A896] transition-colors leading-tight mb-0.5">
                            {isArabic ? "البريد الإلكتروني" : "Email Support"}
                          </h5>
                          <p className="text-[11px] sm:text-xs text-stone-500 truncate font-medium">
                            info@tajalrahmah.com
                          </p>
                        </div>
                      </div>

                      <span className="w-7 h-7 rounded-full bg-[#1cd2ad] group-hover:bg-[#00A896] text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                        {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                    </Link>

                    {/* Card 2: Message Us */}
                    <Link
                      href="https://wa.me/971556173380"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-2xl p-4 sm:p-4.5 shadow-[0_4px_16px_rgba(0,168,150,0.08)] border border-stone-100 flex items-center justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#e6fbf7] text-[#00A896] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00A896] group-hover:text-white transition-colors duration-300">
                          <MessageCircle className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13px] sm:text-sm font-bold text-[#0d2438] group-hover:text-[#00A896] transition-colors leading-tight mb-0.5">
                            {isArabic ? "راسلنا عبر واتساب" : "Message Us"}
                          </h5>
                          <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                            +971 55 617 3380
                          </p>
                          <p className="text-[10px] text-stone-400">
                            {isArabic ? "السبت - الخميس: 8:00 ص - 6:00 م" : "Mon-Sat: 8:00AM-6:00PM"}
                          </p>
                        </div>
                      </div>

                      <span className="w-7 h-7 rounded-full bg-[#1cd2ad] group-hover:bg-[#00A896] text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                        {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                    </Link>

                    {/* Card 3: Location */}
                    <Link
                      href="/contact"
                      className="bg-white rounded-2xl p-4 sm:p-4.5 shadow-[0_4px_16px_rgba(0,168,150,0.08)] border border-stone-100 flex items-center justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#e6fbf7] text-[#00A896] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00A896] group-hover:text-white transition-colors duration-300">
                          <MapPin className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13px] sm:text-sm font-bold text-[#0d2438] group-hover:text-[#00A896] transition-colors leading-tight mb-0.5">
                            {isArabic ? "موقع المكتب" : "Location"}
                          </h5>
                          <p className="text-[11px] sm:text-xs text-stone-500 truncate font-medium">
                            {isArabic ? "مكتب D-01-031، الخبيصي، دبي، الإمارات" : "Office D-01-031, Al Khabaisi, Dubai, UAE"}
                          </p>
                        </div>
                      </div>

                      <span className="w-7 h-7 rounded-full bg-[#1cd2ad] group-hover:bg-[#00A896] text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                        {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                    </Link>

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

        {/* Decorative Fluid Ribbons at bottom corners from public/support */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/support/SVG - Bottom Left Fluid Ribbon.png"
            alt=""
            width={722}
            height={479}
            className="w-[260px] sm:w-[380px] md:w-[480px] h-auto opacity-75"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/support/SVG - Bottom Right Fluid Ribbon Waves.png"
            alt=""
            width={818}
            height={491}
            className="w-[260px] sm:w-[380px] md:w-[500px] h-auto opacity-75"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
            {SUPPORT_FAQS.map((faq) => {
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

    </div>
  );
}
