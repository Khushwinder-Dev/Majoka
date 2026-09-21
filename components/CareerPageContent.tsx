"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  UserCheck,
  ClipboardCheck,
  Briefcase,
  Award,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";

/* ─── DATA FOR JOBS ─────────────────────────────────────────────────── */
interface JobItem {
  id: number;
  titleEn: string;
  titleAr: string;
  category: "all" | "engineering" | "operations" | "technical" | "safety";
  categoryNameEn: string;
  categoryNameAr: string;
  locationEn: string;
  locationAr: string;
  typeEn: string;
  typeAr: string;
}

const ALL_JOBS: JobItem[] = [
  {
    id: 1,
    titleEn: "Senior Civil Engineer, Waterproofing",
    titleAr: "مهندس مدني أول - عزل مائي وإنشائي",
    category: "engineering",
    categoryNameEn: "Engineering",
    categoryNameAr: "الهندسة المدنية",
    locationEn: "Dubai & Abu Dhabi, UAE",
    locationAr: "دبي وأبوظبي، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 2,
    titleEn: "Senior Architecture Engineer",
    titleAr: "مهندس معماري أول - تخطيط وتصميم",
    category: "engineering",
    categoryNameEn: "Engineering",
    categoryNameAr: "الهندسة المعمارية",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 3,
    titleEn: "Combo Roofing Site Supervisor",
    titleAr: "مشرف موقع - نظام العزل المتكامل كومبو",
    category: "operations",
    categoryNameEn: "Operations",
    categoryNameAr: "إدارة العمليات والمواقع",
    locationEn: "Sharjah & Northern Emirates",
    locationAr: "الشارقة والإمارات الشمالية",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 4,
    titleEn: "Estimation & Tendering Specialist",
    titleAr: "أخصائي حساب الكميات والمناقصات",
    category: "engineering",
    categoryNameEn: "Engineering",
    categoryNameAr: "الهندسة والمناقصات",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 5,
    titleEn: "Quality Assurance & HSE Officer",
    titleAr: "مسؤول السلامة والصحة المهنية وضمان الجودة (HSE)",
    category: "safety",
    categoryNameEn: "Safety & Quality",
    categoryNameAr: "السلامة والجودة",
    locationEn: "Abu Dhabi & Dubai, UAE",
    locationAr: "أبوظبي ودبي، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 6,
    titleEn: "Polyurea & Membrane Application Specialist",
    titleAr: "فني متخصص - تطبيق البولي يوريا والعوازل المتقدمة",
    category: "technical",
    categoryNameEn: "Technical",
    categoryNameAr: "الفريق الفني المتخصص",
    locationEn: "UAE Site Locations",
    locationAr: "مواقع المشاريع، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 7,
    titleEn: "Structural Restoration Project Manager",
    titleAr: "مدير مشاريع - إعادة تأهيل وحماية المنشآت",
    category: "operations",
    categoryNameEn: "Operations",
    categoryNameAr: "إدارة المشاريع",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
  {
    id: 8,
    titleEn: "Injection & Leak Detection Field Engineer",
    titleAr: "مهندس ميداني - كشف التسربات وحقن الخرسانة",
    category: "technical",
    categoryNameEn: "Technical",
    categoryNameAr: "الفريق الفني الميداني",
    locationEn: "Dubai & Northern Emirates",
    locationAr: "دبي والإمارات الشمالية",
    typeEn: "Full-Time",
    typeAr: "دوام كامل",
  },
];

/* ─── DATA FOR HIRING PROCESS ───────────────────────────────────────── */
interface HiringStep {
  step: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HIRING_STEPS: HiringStep[] = [
  {
    step: "01",
    titleEn: "Technical Interview",
    titleAr: "المقابلة الفنية",
    descEn:
      "A comprehensive initial assessment that evaluates your technical foundation, problem solving, and relevant trade experience.",
    descAr:
      "تقييم أولي شامل ومدروس يقيس مهاراتك الفنية المتخصصة وخبراتك الميدانية في المشاريع الإنشائية.",
    icon: UserCheck,
  },
  {
    step: "02",
    titleEn: "Practical Test",
    titleAr: "الاختبار العملي",
    descEn:
      "Hands-on demonstration and problem-solving scenario designed to showcase on-site competency, precision, and safety standards.",
    descAr:
      "اختبار عملي يحاكي بيئة العمل الواقعية لإثبات الكفاءة التنفيذية والالتزام بأعلى معايير السلامة والجودة.",
    icon: ClipboardCheck,
  },
  {
    step: "03",
    titleEn: "Management Interview",
    titleAr: "مقابلة الإدارة",
    descEn:
      "Strategic conversation with department heads to explore leadership potential, cultural synergy, and long-term career growth.",
    descAr:
      "جلسة نقاش مع قيادات الشركة لبحث التوافق المهني وأهداف التطور القيادي والمستقبلي المشترك.",
    icon: Briefcase,
  },
  {
    step: "04",
    titleEn: "Final Selection",
    titleAr: "الترشيح النهائي والتعيين",
    descEn:
      "Formal employment package, full visa and onboarding sponsorship, and a structured roadmap into the Taj Al Rahmah team.",
    descAr:
      "تقديم عرض العمل الرسمي مع كافة مزايا الإقامة والتأشيرات وبرنامج التأهيل والتطوير المهني المستمر.",
    icon: Award,
  },
];

/* ─── DATA FOR FAQS ─────────────────────────────────────────────────── */
interface CareerFaq {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const CAREER_FAQS: CareerFaq[] = [
  {
    id: 1,
    questionEn: "How does the hiring and interview process work?",
    questionAr: "كيف تسير مرحلة التوظيف والمقابلات؟",
    answerEn:
      "Our process begins with an online application review, followed by a technical assessment, a hands-on competency test, and a final management interview. Qualified candidates typically receive an offer within 10 to 14 business days.",
    answerAr:
      "تبدأ الإجراءات بمراجعة السيرة الذاتية المقدمة، تليها مقابلة فنية واختبار عملي ثم مقابلة نهائية مع الإدارة. يتلقى المرشحون المؤهلون عرض التعيين خلال 10 إلى 14 يوم عمل.",
  },
  {
    id: 2,
    questionEn: "Does Taj Al Rahmah provide UAE employment visas and relocation assistance?",
    questionAr: "هل توفر تاج الرحمة تأشيرات العمل الرسمية بالإمارات ودعم الانتقال؟",
    answerEn:
      "Yes. Taj Al Rahmah directly sponsors official UAE resident employment visas, medical insurance coverage, and offers relocation assistance for qualified specialized personnel from overseas.",
    answerAr:
      "نعم، توفر شركة تاج الرحمة تأشيرات عمل وإقامة رسمية للموظفين، وتأمين طبي شامل وفق معايير دولة الإمارات، مع مساعدة الانتقال للكوادر المتخصصة المستقدمة من الخارج.",
  },
  {
    id: 3,
    questionEn: "What career growth and training opportunities are available?",
    questionAr: "ما هي فرص التطور والتدريب المهني المتاحة؟",
    answerEn:
      "We invest heavily in continuous training. Employees have access to certified manufacturer programs, safety certifications, supervisory fast-tracks, and opportunities to cross-train across diverse construction and waterproofing divisions.",
    answerAr:
      "نستثمر باستمرار في تطوير كوادرنا عبر دورات تدريبية معتمدة من كبرى المصانع العالمية، وشهادات السلامة، ومسارات الترقية السريعة للإشراف وإدارة المشاريع.",
  },
  {
    id: 4,
    questionEn: "Can I apply for multiple positions simultaneously?",
    questionAr: "هل يمكنني التقديم على أكثر من وظيفة في نفس الوقت؟",
    answerEn:
      "Yes, you are welcome to apply for positions that match your skillset. Our talent acquisition team reviews each application carefully and will consider you for any matching openings across our divisions.",
    answerAr:
      "نعم، نرحب بتقديمك على الوظائف المتوافقة مع خبراتك ومؤهلاتك. يدرس فريق التوظيف كل طلب بعناية للنظر في أنسب موقع لمسارك المهني في مشاريعنا.",
  },
  {
    id: 5,
    questionEn: "What employee benefits are offered?",
    questionAr: "ما هي المزايا الوظيفية المقدمة للموظفين؟",
    answerEn:
      "We offer competitive market salaries, full medical health insurance, annual leave airfare allowances, safety bonuses, and structured annual performance reviews.",
    answerAr:
      "نقدم رواتب مجزية وتنافسية، تأمين صحي شامل، تذاكر سفر سنوية، مكافآت أمان وجودة تنفيذ، ومراجعات أداء سنوية محددة وشفافة للترقيات.",
  },
];

export default function CareerPageContent() {
  const { isArabic } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openFaqId, setOpenFaqId] = useState<number | null>(4); // Default 4th open as in mockup
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const itemsPerPage = 5;

  // Filter jobs
  const filteredJobs =
    selectedCategory === "all"
      ? ALL_JOBS
      : ALL_JOBS.filter((j) => j.category === selectedCategory);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div
      className="w-full bg-white text-[#0B1C24] overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center bg-gradient-to-r from-[#ebf7f9] via-[#e2f4f7] to-[#d6eff4] overflow-hidden">
        {/* Soft Background Shapes / Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00DDCF]/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-white/40 blur-2xl" />
          <div className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-[#00DDCF]/15 blur-3xl" />
          {/* Subtle curved background lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 600"
            fill="none"
          >
            <path
              d="M-100 200 C 300 100, 600 450, 1540 250"
              stroke="#00DDCF"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            <path
              d="M-50 400 C 450 300, 800 650, 1600 350"
              stroke="#00c4b4"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols on lg) */}
            <div className="lg:col-span-7 max-w-2xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs sm:text-[13px] font-extrabold tracking-[0.16em] uppercase text-slate-700 mb-4 sm:mb-5">
                <Link
                  href="/"
                  className="hover:text-[#00c4b4] transition-colors"
                >
                  {isArabic ? "الرئيسية" : "HOME"}
                </Link>
                <span className="text-[#00DDCF] font-bold">/</span>
                <span className="text-[#00DDCF] font-bold">
                  {isArabic ? "الوظائف" : "CAREER"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#0B1C24] leading-[1.12] tracking-tight">
                {isArabic ? (
                  <>
                    ابنِ مستقبلك{" "}
                    <span className="text-[#00DDCF]">المهني معنا</span>
                  </>
                ) : (
                  <>
                    Build Your{" "}
                    <span className="text-[#00DDCF]">Career With Us</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                {isArabic
                  ? "اكتشف فرصاً وظيفية مجزية وانضم إلى فريقنا المتميز في مجالات العزل المائي، الحماية الإنشائية، وحلول البناء المتطورة بدولة الإمارات."
                  : "Explore rewarding career opportunities and grow with our expert team in civil construction, insulation, and protective systems across the UAE."}
              </p>
            </div>

            {/* Right Illustration: Two Businessmen with Tablets (5 cols on lg) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] h-[300px] sm:h-[360px] lg:h-[440px]">
                <Image
                  src="/career/two-businessmen-with-virtual-tablets-isolated 1.png"
                  alt={isArabic ? "فريق عمل تاج الرحمة" : "Taj Al Rahmah Career Team"}
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom drop-shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: A TRADE JOB YOU CAN BUILD A DECADE ON
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Images with Ribbon and Floating 4-Pillar Card (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full max-w-[540px] mx-auto">
                
                {/* Main Large Image: 3 Colleagues in Modern Office */}
                <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[440px] rounded-3xl overflow-hidden shadow-xl bg-slate-100">
                  <Image
                    src="/career/Rectangle 34625030.png"
                    alt={
                      isArabic
                        ? "فريق تاج الرحمة يتعاون في مكتب العمل"
                        : "Taj Al Rahmah Team Collaboration"
                    }
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Left Teal Ribbon Badge: "70+ Active Jobs" */}
                <div className="absolute -top-3 left-4 sm:left-6 z-20">
                  <div className="relative bg-[#00DDCF] text-[#0B1C24] font-extrabold text-xs sm:text-sm tracking-wider uppercase px-4 py-3 shadow-lg rounded-t-md flex items-center justify-center writing-mode-vertical">
                    <span className="font-extrabold whitespace-nowrap">
                      {isArabic ? "+70 وظيفة نشطة" : "70+ Active Jobs"}
                    </span>
                    {/* Ribbon Notch Bottom */}
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#00DDCF] [clip-path:polygon(0_0,50%_100%,100%_0)]" />
                  </div>
                </div>

                {/* Overlapping Floating Card with Small Image & 4-Pillars */}
                <div className="relative sm:absolute sm:-bottom-8 sm:-right-6 mt-6 sm:mt-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,196,180,0.18)] border border-[#00DDCF]/30 max-w-full sm:max-w-[460px]">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Small Image: 2 Smiling Colleagues */}
                    <div className="relative w-full sm:w-[130px] h-[110px] sm:h-[130px] rounded-xl overflow-hidden shrink-0 shadow-sm bg-slate-100">
                      <Image
                        src="/career/Rectangle 34625032.png"
                        alt="Taj Al Rahmah Colleagues"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    {/* 4 Trade Pillars 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-left rtl:text-right flex-1 w-full">
                      {/* 1 */}
                      <div>
                        <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#0B1C24] leading-tight">
                          {isArabic ? "توظيف مباشر:" : "Direct Employment:"}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-0.5">
                          {isArabic
                            ? "أمان وظيفي كامل وعقود رسمية دائمة."
                            : "Full-time job security, contracts & benefits."}
                        </p>
                      </div>

                      {/* 2 */}
                      <div>
                        <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#0B1C24] leading-tight">
                          {isArabic ? "تنوع المسارات:" : "Six Trades Move Between:"}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-0.5">
                          {isArabic
                            ? "تدريب شامل بين العزل والطلاء والإنشاء."
                            : "Cross-train across waterproofing & coatings."}
                        </p>
                      </div>

                      {/* 3 */}
                      <div>
                        <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#0B1C24] leading-tight">
                          {isArabic ? "مسار إشرافي:" : "Supervisor Track:"}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-0.5">
                          {isArabic
                            ? "فرص ترقية واضحة لإدارة المواقع."
                            : "Clear career steps to site management."}
                        </p>
                      </div>

                      {/* 4 */}
                      <div>
                        <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#0B1C24] leading-tight">
                          {isArabic ? "استثمار مستمر:" : "Heavy Investment:"}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-0.5">
                          {isArabic
                            ? "تدريب تقني مستمر وشهادات معتمدة."
                            : "Safety certifications & trade training."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Copy & Action Buttons (6 cols) */}
            <div className="lg:col-span-6 max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-block h-[2px] w-7 sm:w-9 bg-[#00DDCF] rounded-full shrink-0" />
                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                  {isArabic ? "انضم إلينا وانمُ معنا" : "GROW WITH US"}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
                {isArabic ? (
                  <>
                    مهنة حقيقية يمكنك{" "}
                    <span className="text-[#00DDCF]">بناء عقد من الزمن عليها.</span>
                  </>
                ) : (
                  <>
                    A Trade Job You{" "}
                    <span className="text-[#00DDCF]">Can Build A Decade On.</span>
                  </>
                )}
              </h2>

              {/* Paragraph 1 */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {isArabic
                  ? "في شركة تاج الرحمة، التوظيف ليس مجرد عقد مؤقت أو عمالة يومية متفرقة، بل هو علاقة شراكة واستقرار طويل الأمد يضمن لك ولعائلتك راحة البال ومساراً تصاعدياً حقيقياً."
                  : "Most of all, a career here is a connection. Not the rush-and-run approach where you're tossed into temporary teams on a daily or hourly basis, with constant uncertainty around when the next project might come."}
              </p>

              {/* Paragraph 2 */}
              <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {isArabic
                  ? "العمل معنا لا يتعلق فقط بالمهارات الحرفية؛ بل يقوم على الاحترام، وروح الفريق المتماسك، والدعم المتواصل في بيئة تقدر إسهاماتك وتكافئ التميز."
                  : "Most of all, the work isn't just about technical trade skills; it's about stability, pride, and reliable teamwork with dedicated professionals in a company that truly values you."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Watch Video Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#00DDCF] hover:bg-[#00c4b4] active:scale-95 text-[#0B1C24] font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 shadow-[0_8px_24px_rgba(0,221,207,0.35)] group cursor-pointer"
                >
                  <span>{isArabic ? "مشاهدة الفيديو" : "WATCH VIDEO"}</span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#0B1C24] flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  </span>
                </button>

                {/* Explore Opportunities Button */}
                <a
                  href="#all-jobs"
                  className="pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-white border border-[#00DDCF] hover:bg-[#EBF7F9] active:scale-95 text-[#0B1C24] font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 shadow-xs group cursor-pointer"
                >
                  <span>{isArabic ? "استكشف الفرص المتاحة" : "EXPLORE OPPORTUNITIES"}</span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00DDCF] text-[#0B1C24] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                  </span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: ALL JOBS LISTINGS & PAGINATION
      ══════════════════════════════════════════════════════════════ */}
      <section id="all-jobs" className="relative w-full py-16 sm:py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          
          {/* Header Row: Title on Left, Filter Pills on Right */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 sm:mb-10 pb-4 border-b border-slate-100">
            {/* Title with teal bar */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#00DDCF] rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C24] tracking-tight">
                {isArabic ? "جميع الوظائف الشاغرة" : "All Jobs"}
              </h2>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredJobs.length} {isArabic ? "وظيفة" : "Openings"}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", en: "All", ar: "الكل" },
                { id: "engineering", en: "Engineering", ar: "الهندسة" },
                { id: "operations", en: "Operations", ar: "العمليات" },
                { id: "technical", en: "Technical", ar: "الفني" },
                { id: "safety", en: "Safety & Quality", ar: "السلامة والجودة" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#00DDCF] text-[#0B1C24] shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isArabic ? cat.ar : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List (Pill-shaped rounded card rows) */}
          <div className="space-y-4">
            {displayedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#F8FAFB] hover:bg-white rounded-2xl sm:rounded-full px-6 sm:px-8 py-5 border border-slate-100 hover:border-[#00DDCF]/40 hover:shadow-[0_8px_24px_rgba(0,221,207,0.12)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Job Info */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0B1C24] group-hover:text-[#00c4b4] transition-colors">
                    {isArabic ? job.titleAr : job.titleEn}
                  </h3>
                  
                  {/* Meta tags */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs sm:text-[13px] text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {isArabic ? job.categoryNameAr : job.categoryNameEn}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{isArabic ? job.locationAr : job.locationEn}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#00c4b4] font-semibold">
                      {isArabic ? job.typeAr : job.typeEn}
                    </span>
                  </div>
                </div>

                {/* View Details Link */}
                <Link
                  href={`/career/${job.id}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#00c4b4] group-hover:text-[#00a89a] transition-all self-start sm:self-center shrink-0"
                >
                  <span>{isArabic ? "عرض التفاصيل والتقديم" : "View Details"}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#00DDCF] hover:text-[#00DDCF] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currentPage === num
                      ? "bg-[#00DDCF] text-[#0B1C24] shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#00DDCF] hover:text-[#00DDCF] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: HOW IT WORKS SIMPLE EFFICIENT (HIRING PROCESS)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F2FBF9] overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00DDCF] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "مراحل الانضمام والتوظيف" : "HIRING PROCESS"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00DDCF] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
              {isArabic ? (
                <>
                  كيف تسير العملية{" "}
                  <span className="text-[#00DDCF]">ببساطة وفعالية</span>
                </>
              ) : (
                <>
                  How It Works{" "}
                  <span className="text-[#00DDCF]">Simple Efficient</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Process Cards with Connector Circles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative">
            {HIRING_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col">
                  {/* Card Container */}
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_36px_rgba(0,221,207,0.12)] hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col relative overflow-hidden group">
                    
                    {/* Top Row: Circular Icon Badge + Step Ghost Number */}
                    <div className="flex items-center justify-between mb-5">
                      {/* Icon Circle */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00DDCF]/25 to-[#EBF7F9] border border-[#00DDCF]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00DDCF] transition-all duration-300">
                        <IconComp className="w-5 h-5 text-[#00a89a]" />
                      </div>

                      {/* Ghost Number Watermark */}
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-200 tabular-nums">
                        {step.step}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-extrabold text-[#0B1C24] group-hover:text-[#00c4b4] transition-colors mb-2.5">
                      {isArabic ? step.titleAr : step.titleEn}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                      {isArabic ? step.descAr : step.descEn}
                    </p>
                  </div>

                  {/* Flow Arrow Connector between cards (desktop only) */}
                  {idx < HIRING_STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3.5 rtl:right-auto rtl:-left-3.5 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-[#00DDCF] shadow-sm items-center justify-center text-[#00DDCF]">
                      <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. SECTION: FREQUENTLY ASKED QUESTIONS
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00DDCF] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00DDCF] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
              {isArabic ? (
                <>
                  الأسئلة{" "}
                  <span className="text-[#00DDCF]">الأكثر شيوعاً</span>
                </>
              ) : (
                <>
                  Frequently{" "}
                  <span className="text-[#00DDCF]">Asked Questions</span>
                </>
              )}
            </h2>
          </div>

          {/* Unified Accordion Items */}
          <div className="space-y-4">
            {CAREER_FAQS.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                number={undefined}
                question={isArabic ? faq.questionAr : faq.questionEn}
                answer={isArabic ? faq.answerAr : faq.answerEn}
                isOpen={openFaqId === faq.id}
                onToggle={() => toggleFaq(faq.id)}
                isArabic={isArabic}
                className="rounded-full! overflow-hidden shadow-xs hover:border-[#00DDCF]/40"
              />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VIDEO MODAL
      ══════════════════════════════════════════════════════════════ */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or Presentation Placeholder */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Taj Al Rahmah Career Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-[#0B1C24]">
                {isArabic ? "حياة وبيئة العمل في شركة تاج الرحمة" : "Life & Culture at Taj Al Rahmah"}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {isArabic
                  ? "تعرف على مهندسينا ومسؤولي المواقع وكيف نصنع التميز والابتكار في مشاريع العزل والإنشاءات."
                  : "Discover our team on-site, safety culture, and the innovative projects driving our success across the UAE."}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
