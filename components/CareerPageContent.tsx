"use client";

import React, { useState, useEffect } from "react";
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
import LifeAtOurCompanySection from "@/components/LifeAtOurCompanySection";

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
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    scrollToHash();
    const timer = setTimeout(scrollToHash, 300);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

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
      <section className="relative w-full min-h-[400px] sm:min-h-[460px] lg:min-h-[600px] lg:h-[600px] flex items-center bg-[#ebf7f9] overflow-hidden">
        {/* Designer Banner Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/career/Careers_.png"
            alt={
              isArabic
                ? "خلفية وظائف تاج الرحمة"
                : "Taj Al Rahmah Career Banner Background"
            }
            fill
            priority
            unoptimized
            sizes="100vw"
            className={`object-cover object-center ${isArabic ? "scale-x-[-1]" : ""}`}
          />
          {/* Dark overlay for navbar menu visibility and contrast */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: A TRADE JOB YOU CAN BUILD A DECADE ON
      ══════════════════════════════════════════════════════════════ */}
      <section id="why-join-us" className="relative w-full py-16 sm:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left: Main Large Image with Swallowtail Ribbon Badge (5 cols on lg) */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">

                {/* Main Large Image: 3 Colleagues in Modern Office */}
                <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[490px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
                  <Image
                    src="/career/Rectangle 34625030.png"
                    alt={
                      isArabic
                        ? "فريق تاج الرحمة يتعاون في مكتب العمل"
                        : "Taj Al Rahmah Team Collaboration"
                    }
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Left Teal Swallowtail Ribbon Badge: "70+ Active Job" */}
                <div
                  className={`absolute top-[28%] -left-5 sm:-left-6 z-30 w-11 sm:w-12 h-44 sm:h-48 drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] flex items-center justify-center transition-transform hover:scale-105 duration-300 ${isArabic ? "left-auto -right-5 sm:-right-6" : ""
                    }`}
                >
                  <div
                    className="w-full h-full bg-[#00DDCF] flex items-center justify-center relative"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 50% 12px, 100% 0%, 100% 100%, 50% calc(100% - 12px), 0% 100%)",
                    }}
                  >
                    <span
                      className="text-white font-black text-[12px] sm:text-[13px] tracking-[0.14em] uppercase whitespace-nowrap"
                      style={{
                        transform: isArabic ? "rotate(90deg)" : "rotate(-90deg)",
                      }}
                    >
                      {isArabic ? "+70 وظيفة نشطة" : "70+ Active Job"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Copy, Floating 4-Pillars Card & Action Buttons (7 cols on lg) */}
            <div className="lg:col-span-7 relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="inline-block h-[2.5px] w-6 sm:w-8 bg-[#00DDCF] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.18em] uppercase text-[#00DDCF]">
                  {isArabic ? "وظائف معنا" : "CAREER WITH US"}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-black text-[#0B1C24] tracking-tight leading-[1.14]">
                {isArabic ? (
                  <>
                    مهنة حقيقية يمكنك{" "}
                    <span className="text-[#00DDCF]">بناء عقد</span>
                    <br />
                    <span className="text-[#00DDCF]">من الزمن عليها.</span>
                  </>
                ) : (
                  <>
                    A Trade Job You{" "}
                    <span className="text-[#00DDCF]">Can Build A</span>
                    <br />
                    <span className="text-[#00DDCF]">Decade On.</span>
                  </>
                )}
              </h2>

              {/* Paragraph 1 */}
              <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-2xl">
                {isArabic
                  ? "يعتمد معظم سوق الصيانة في دولة الإمارات على العمالة من الباطن والفرق المؤقتة والعمل باليومية. وفي حين قد يفضل هذا النموذج السرعة والحجم، فإنه غالباً ما يفتقر إلى الاستمرارية،"
                  : "Most of the maintenance market in the Emirates relies on subcontracted labour, temporary teams, and daily-rate work. While this model may prioritize speed and volume, it often makes consistency,"}
              </p>

              {/* Overlapping Floating Card with Small Image & 4-Pillars */}
              <div
                className={`relative z-20 mt-6 sm:mt-7 bg-[#E8FAF7] rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,196,180,0.14)] border border-[#00DDCF]/25 overflow-hidden transition-all duration-300 ${isArabic
                  ? "lg:-mr-32 xl:-mr-40 lg:w-[calc(100%+8rem)] xl:w-[calc(100%+10rem)] max-w-none"
                  : "lg:-ml-32 xl:-ml-40 lg:w-[calc(100%+8rem)] xl:w-[calc(100%+10rem)] max-w-none"
                  }`}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
                  {/* Small Image: 2 Smiling Colleagues */}
                  <div className="relative w-full sm:w-[150px] md:w-[165px] lg:w-[165px] xl:w-[180px] h-[120px] sm:h-[130px] xl:h-[135px] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-slate-100">
                    <Image
                      src="/career/Rectangle 34625032.png"
                      alt={
                        isArabic
                          ? "زملاء العمل في شركة تاج الرحمة"
                          : "Taj Al Rahmah Colleagues"
                      }
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* 4 Trade Pillars 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 flex-1 w-full text-left rtl:text-right">
                    {/* 1 */}
                    <div>
                      <h4 className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#0B1C24] leading-tight tracking-tight">
                        {isArabic ? "توظيف مباشر" : "Direct Employment"}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-1">
                        {isArabic
                          ? "عقود وتأشيرة وتأمين باسمك الخاص."
                          : "Contract, visa and insurance in your own name."}
                      </p>
                    </div>

                    {/* 2 */}
                    <div>
                      <h4 className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#0B1C24] leading-tight tracking-tight">
                        {isArabic
                          ? "ستة مجالات مهنية للتنقل"
                          : "Six Trades Move Between"}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-1">
                        {isArabic
                          ? "تدريب شامل فور اعتماد تخصصك الميداني."
                          : "Cross-train once you signed off on your own."}
                      </p>
                    </div>

                    {/* 3 */}
                    <div>
                      <h4 className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#0B1C24] leading-tight tracking-tight">
                        {isArabic ? "مسار إشرافي" : "Supervisor Track"}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-1">
                        {isArabic
                          ? "قائد فريق خلال ثلاث سنوات، مشرف خلال خمس."
                          : "Team lead at three years, supervisor at five."}
                      </p>
                    </div>

                    {/* 4 */}
                    <div>
                      <h4 className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#0B1C24] leading-tight tracking-tight">
                        {isArabic ? "ساعات عمل ثابتة" : "Fixed Hours"}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-1">
                        {isArabic
                          ? "السبت – الخميس، مع احتساب الساعات الإضافية."
                          : "Sat – Thu, with paid overtime on call-outs."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Signature Teal Accent in the Corner */}
                <div
                  className={`absolute bottom-0 w-5 h-5 bg-[#00DDCF] pointer-events-none ${isArabic
                    ? "left-0 rounded-tr-xl rounded-bl-[24px] sm:rounded-bl-[28px]"
                    : "right-0 rounded-tl-xl rounded-br-[24px] sm:rounded-br-[28px]"
                    }`}
                />
              </div>

              {/* Paragraph 2 */}
              <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-2xl">
                {isArabic
                  ? "يعتمد قطاع الصيانة في الإمارات بشكل رئيسي على فرق العمل المؤقتة. ورغم أن هذا النمط يركز على الإنجاز السريع، إلا أنه قد يؤثر على الجودة والاستقرار المهني."
                  : "Most of the Emirates' maintenance market relies on subcontracted labour and daily-rate work. While this approach may prioritize speed, it can make"}
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                {/* Search Job Button (Solid Teal with White Icon Circle) */}
                <a
                  href="#all-jobs"
                  className="pl-4 sm:pl-7 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 rounded-full bg-[#00DDCF] hover:bg-[#00c9bd] active:scale-95 text-white font-extrabold text-[11px] sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-2.5 sm:gap-4 transition-all duration-300 shadow-[0_6px_20px_rgba(0,221,207,0.3)] group cursor-pointer"
                >
                  <span>{isArabic ? "البحث عن وظيفة" : "SEARCH JOB"}</span>
                  <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-[#00DDCF] flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  </span>
                </a>

                {/* Create Portfolio Button (Outline with Teal Icon Circle) */}
                <Link
                  href="/contact"
                  className="pl-4 sm:pl-7 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 rounded-full bg-white border-2 border-[#00DDCF] hover:bg-[#00DDCF]/5 active:scale-95 text-[#00DDCF] font-extrabold text-[11px] sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-2.5 sm:gap-4 transition-all duration-300 group cursor-pointer"
                >
                  <span>{isArabic ? "إنشاء ملف مهني" : "CREATE PORTFOLIO"}</span>
                  <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#00DDCF] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 shrink-0">
                    <ArrowRight
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""
                        }`}
                    />
                  </span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LIFE AT OUR COMPANY SECTION (Great People Build Great Projects)
      ══════════════════════════════════════════════════════════════ */}
      <LifeAtOurCompanySection />

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: ALL JOBS LISTINGS & PAGINATION
      ══════════════════════════════════════════════════════════════ */}
      <section id="current-openings" className="relative w-full py-16 sm:py-20 bg-white scroll-mt-20">
        <span id="all-jobs" className="scroll-mt-20" />
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
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${selectedCategory === cat.id
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
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${currentPage === num
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
      <section id="recruitment-process" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F2FBF9] overflow-hidden scroll-mt-20">
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
      <section id="faqs" className="relative w-full py-16 sm:py-20 lg:py-24 bg-white scroll-mt-20">
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
                  الأسئلة <span className="text-[#00c4b4]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#00c4b4]">Questions</span>
                </>
              )}
            </h2>

            <p className="mt-3 text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isArabic
                ? "إجابات واضحة على الأسئلة الشائعة حول بيئة العمل، إجراءات التوظيف والفرص المهنية."
                : "Find clear answers to common questions about our work culture, hiring process, and career opportunities."}
            </p>
          </div>

          {/* Site-Standard Consistent FAQ Accordion */}
          <div className="space-y-3">
            {CAREER_FAQS.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                number={faq.id}
                question={isArabic ? faq.questionAr : faq.questionEn}
                answer={isArabic ? faq.answerAr : faq.answerEn}
                isOpen={openFaqId === faq.id}
                onToggle={() => toggleFaq(faq.id)}
                isArabic={isArabic}
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
