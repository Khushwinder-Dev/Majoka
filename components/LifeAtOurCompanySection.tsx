"use client";

import React from "react";
import Image from "next/image";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Handshake,
  HeartHandshake,
  Star,
  Building2,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CultureCard {
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
}

export default function LifeAtOurCompanySection() {
  const { isArabic } = useLanguage();

  const cultureCards: CultureCard[] = [
    {
      icon: Users,
      titleEn: "Our People",
      titleAr: "فريقنا المتميز",
      descEn:
        "We value diversity, respect and teamwork. Our people bring passion, skills and experience to every project.",
      descAr:
        "نقدر التنوع والاحترام والعمل الجماعي. يكرس فريقنا شغفه وخبراته المتراكمة لإنجاز كل مشروع بأعلى معايير الإتقان.",
      image: "/career/life-our-people.jpg",
    },
    {
      icon: TrendingUp,
      titleEn: "Growth & Development",
      titleAr: "التطوير والنمو المهني",
      descEn:
        "We invest in continuous learning and development to help our team reach their full potential.",
      descAr:
        "نستثمر باستمرار في برامج التدريب والتأهيل المعتمدة لتمكين كوادرنا من تحقيق كامل إمكاناتهم وتطوير مسيرتهم.",
      image: "/career/life-growth-dev.jpg",
    },
    {
      icon: ShieldCheck,
      titleEn: "Health & Safety",
      titleAr: "الصحة والسلامة المهنية",
      descEn:
        "We prioritize the well-being of our people. A safe workplace is a productive workplace.",
      descAr:
        "نضع سلامة وصحة كوادرنا في مقدمة أولوياتنا. بيئة العمل الآمنة هي ركيزة الإنتاجية والتميز الميداني.",
      image: "/career/life-health-safety.jpg",
    },
    {
      icon: Handshake,
      titleEn: "Team Culture",
      titleAr: "ثقافة العمل الجماعي",
      descEn:
        "We work together, support each other and celebrate our achievements.",
      descAr:
        "نعمل بروح الفريق الواحد، ندعم بعضنا البعض ونحتفي سوياً بكل نجاح وإنجاز نحققه في مشاريعنا.",
      image: "/career/life-team-culture.jpg",
    },
    {
      icon: HeartHandshake,
      titleEn: "Work-Life Balance",
      titleAr: "التوازن بين العمل والحياة",
      descEn:
        "We believe in supporting our team's well-being, both at work and beyond.",
      descAr:
        "نؤمن بأهمية دعم جودة حياة موظفينا وصحتهم النفسية والبدنية، داخل بيئة العمل وخارجها.",
      image: "/career/life-work-life.jpg",
    },
    {
      icon: Star,
      titleEn: "Career Opportunities",
      titleAr: "فرص التطور الوظيفي",
      descEn:
        "We offer exciting career paths for those who are ready to make an impact.",
      descAr:
        "نوفر مسارات مهنية واعدة وفرص ترقية استثنائية لكل من يمتلك الطموح والشغف لإحداث فارق حقيقي.",
      image: "/career/life-career-opps.jpg",
    },
  ];

  return (
    <section
      id="life-at-our-company"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* ── TOP SECTION: Header & Panoramic Image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18 lg:mb-20">
          {/* Left Text Block (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.18em] uppercase text-[#086358]">
                {isArabic ? "بيئة العمل وثقافتنا" : "LIFE AT OUR COMPANY"}
              </span>
              <span className="inline-block h-[2.5px] w-7 sm:w-9 bg-[#00DDCF] rounded-full shrink-0" />
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-black text-[#0B1C24] tracking-tight leading-[1.12]">
              {isArabic ? (
                <>
                  فريق استثنائي <br />
                  <span className="text-[#086358]">يبني مشاريع استثنائية</span>
                </>
              ) : (
                <>
                  Great People <br />
                  <span className="text-[#086358]">Build Great Projects</span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-lg">
              {isArabic
                ? "في تاج الرحمة، نؤمن بأن كوادرنا البشرية هي مصدر قوتنا الحقيقي. نحرص على توفير بيئة عمل داعمة ومحفزة على التعاون والنمو المهني المستمر، حيث تتاح لكل فرد فرصة إحداث أثر حقيقي."
                : "At Taj Al Rahmah, we believe our people are our greatest strength. We foster a supportive, collaborative and growth-oriented environment where everyone can make a difference."}
            </p>
          </div>

          {/* Right Panoramic Image (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-xl bg-slate-100">
              <Image
                src="/career/life-hero.jpg"
                alt={
                  isArabic
                    ? "فريق المهندسين في تاج الرحمة يطل على أفق دبي"
                    : "Taj Al Rahmah Engineering Team Overlooking Dubai Skyline"
                }
                fill
                unoptimized
                className="object-cover object-center hover:scale-102 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── MIDDLE SECTION: 6 Feature Cards (2 rows of 3 cols) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 sm:mb-20">
          {cultureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group bg-[#fcfdfd] border border-slate-200/80 hover:border-[#00DDCF]/50 rounded-[24px] p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex items-start justify-between gap-4"
              >
                {/* Left: Icon, Title, Description */}
                <div className="flex-1 min-w-0 flex flex-col">
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-full bg-[#E6F9F7] text-[#00c4b4] group-hover:bg-[#00DDCF] group-hover:text-white flex items-center justify-center shrink-0 mb-3.5 transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0B1C24] group-hover:text-[#086358] transition-colors duration-200 mb-2 leading-snug">
                    {isArabic ? card.titleAr : card.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                    {isArabic ? card.descAr : card.descEn}
                  </p>
                </div>

                {/* Right: Card Image */}
                <div className="relative w-28 sm:w-32 lg:w-36 h-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-slate-100 bg-slate-50 self-start">
                  <Image
                    src={card.image}
                    alt={isArabic ? card.titleAr : card.titleEn}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM BANNER: Be Part of Something Meaningful ── */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#07382F] text-white p-7 sm:p-10 lg:p-12 shadow-2xl">
          {/* Subtle curved background wave graphics */}
          <div className="absolute -left-12 -bottom-16 w-80 h-80 rounded-full bg-white/[0.04] pointer-events-none blur-xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00DDCF]/10 pointer-events-none blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Headline (4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#00DDCF] mb-2 sm:mb-2.5">
                {isArabic ? "انضم إلى فريقنا" : "JOIN OUR TEAM"}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black leading-tight tracking-tight text-white">
                {isArabic ? (
                  <>كن جزءاً من مسيرة <br className="hidden sm:inline" /> ذات أثر حقيقي</>
                ) : (
                  <>Be Part of Something <br className="hidden sm:inline" /> Meaningful</>
                )}
              </h3>
            </div>

            {/* Middle Copy & CTA (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <p className="text-xs sm:text-[13.5px] text-emerald-100/80 leading-relaxed font-normal">
                {isArabic
                  ? "في تاج الرحمة، نحن لا نبني الهياكل فحسب، بل نبني مسارات مهنية وعلاقات متينة ومستقبلاً واعداً. إذا كنت شغوفاً ومتحمساً ومستعداً للنمو، يسعدنا أن نسمع منك."
                  : "At Taj Al Rahmah, we don't just build structures, we build careers, relationships and a better future. If you are passionate, motivated and ready to grow, we would love to hear from you."}
              </p>

              <a
                href="#current-openings"
                className="inline-flex items-center gap-2 bg-[#4ec59b] hover:bg-[#3db88c] active:scale-95 text-[#062c25] font-black text-[11px] sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md cursor-pointer group"
              >
                <span>{isArabic ? "استكشف الفرص الوظيفية" : "View Career Opportunities"}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right 4 Stats (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 border-t lg:border-t-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-white/10 pt-6 lg:pt-0 lg:pl-8 rtl:lg:pl-0 rtl:lg:pr-8">
              {/* Stat 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                <Users className="w-5 h-5 text-emerald-300 mb-1.5" />
                <span className="text-xl sm:text-2xl font-black text-white">100+</span>
                <span className="text-[11px] text-emerald-200/70 font-medium">
                  {isArabic ? "عضو في الفريق" : "Team Members"}
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                <Building2 className="w-5 h-5 text-emerald-300 mb-1.5" />
                <span className="text-xl sm:text-2xl font-black text-white">5+</span>
                <span className="text-[11px] text-emerald-200/70 font-medium">
                  {isArabic ? "سنوات من التميز" : "Years of Excellence"}
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                <ShieldCheck className="w-5 h-5 text-emerald-300 mb-1.5" />
                <span className="text-xl sm:text-2xl font-black text-white">100%</span>
                <span className="text-[11px] text-emerald-200/70 font-medium">
                  {isArabic ? "تركيز على السلامة" : "Safety Focused"}
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                <Leaf className="w-5 h-5 text-emerald-300 mb-1.5" />
                <span className="text-[13px] sm:text-[14px] font-black text-white leading-tight mt-1">
                  {isArabic ? "مستقبل" : "A Sustainable"}
                </span>
                <span className="text-[11px] text-emerald-200/70 font-medium">
                  {isArabic ? "مستدام" : "Tomorrow"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
