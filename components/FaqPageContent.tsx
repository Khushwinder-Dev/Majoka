"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  LayoutGrid,
  HelpCircle,
  Layers,
  ShieldCheck,
  Compass,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FaqItem {
  id: number;
  category: "general" | "solutions" | "trust" | "started";
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    category: "general",
    questionEn: "Why is the 'UAE PASS' the best way to update my Emirates ID?",
    questionAr: "لماذا يعتبر 'UAE PASS' أفضل طريقة لتحديث بطاقة الهوية الإماراتية؟",
    answerEn:
      "UAE PASS provides secure, instant digital identity verification across all UAE government entities and certified technical contracting services, eliminating manual paperwork and physical verification visits.",
    answerAr:
      "يوفر تطبيق الهوية الرقمية (UAE PASS) تحققاً فورياً وآمناً من الهوية عبر جميع الجهات الحكومية والخدمات الفنية المعتمدة في الدولة، مما يغني تماماً عن المعاملات الورقية والزيارات الميدانية.",
  },
  {
    id: 2,
    category: "general",
    questionEn: "Will I be charged for access or using UAE PASS app?",
    questionAr: "هل يتم فرض أي رسوم على الوصول أو استخدام تطبيق UAE PASS؟",
    answerEn:
      "No, accessing and utilizing the official UAE PASS application and verification services is completely free of charge for all UAE citizens and residents.",
    answerAr:
      "لا، تحميل واستخدام تطبيق الهوية الرقمية الرسمي UAE PASS مجاني تماماً دون أي رسوم لجميع المواطنين والمقيمين في دولة الإمارات.",
  },
  {
    id: 3,
    category: "general",
    questionEn: "What are the other ways of updating my Emirates ID?",
    questionAr: "ما هي الطرق الأخرى لتحديث بيانات الهوية الإماراتية؟",
    answerEn:
      "You can also update your Emirates ID information through the Federal Authority for Identity and Citizenship (ICP) online portal, Customer Happiness Centers, or authorized typing and Amer offices across the UAE.",
    answerAr:
      "يمكنك أيضاً تحديث بيانات الهوية الإماراتية من خلال البوابة الإلكترونية للهيئة الاتحادية للهوية والجنسية (ICP) أو مراكز سعادة المتعاملين ومكاتب الطباعة ومراكز آمر المعتمدة.",
  },
  {
    id: 4,
    category: "general",
    questionEn: "Why can't I select all my numbers for the update?",
    questionAr: "لماذا لا يمكنني اختيار جميع أرقامي للتحديث في آن واحد؟",
    answerEn:
      "Regulatory telecom standards mandate distinct authentication for each registered subscriber line to maintain strict account security and prevent unauthorized account modifications.",
    answerAr:
      "تتطلب المعايير التنظيمية لقطاع الاتصالات مصادقة مستقلة لكل خط اتصال مسجل لضمان الحماية التامة للحساب ومنع التعديلات غير المصرح بها.",
  },
  {
    id: 5,
    category: "general",
    questionEn: "If my number registered with a passport or GCC national ID, can I update my ID online?",
    questionAr: "إذا كان رقمي مسجلاً بجواز سفر أو بطاقة هوية خليجية، هل يمكنني التحديث عبر الإنترنت؟",
    answerEn:
      "Yes, you can conveniently initiate the verification online by uploading your valid passport or GCC national ID alongside your updated Emirates ID credentials via secure portal submission.",
    answerAr:
      "نعم، يمكنك البدء بالتحديث الإلكتروني بكل سهولة من خلال إرفاق صورة جواز السفر أو الهوية الوطنية الخليجية السارية مع بيانات الهوية الإماراتية المحدثة.",
  },
  {
    id: 6,
    category: "solutions",
    questionEn: "What types of waterproofing systems does Taj Al Rahmah provide?",
    questionAr: "ما هي أنواع أنظمة العزل المائي التي توفرها شركة تاج الرحمة؟",
    answerEn:
      "We provide complete structural protection including GRP & fiberglass lining, Combo roofing insulation, torch-applied bitumen membranes, fast-curing polyurea spray coatings, epoxy flooring, and concrete injection grouting.",
    answerAr:
      "نوفر حلول حماية إنشائية متكاملة تشمل تبطين خزانات GRP والألياف الزجاجية، نظام الكومبو للأسطح، الأغشية البيتومينية، طلاءات البولي يوريا السريعة، أرضيات الإيبوكسي، وحقن الشقوق الخرسانية.",
  },
  {
    id: 7,
    category: "solutions",
    questionEn: "How does the Combo Waterproofing & Thermal Insulation System work?",
    questionAr: "كيف يعمل نظام الكومبو للعزل المائي والحراري للأسطح؟",
    answerEn:
      "The Combo Roofing System is an advanced spray-applied polyurethane foam technology that delivers both exceptional thermal insulation and watertight waterproofing in a single seamless layer, topped with UV-reflective protective coatings.",
    answerAr:
      "نظام الكومبو هو تقنية متطورة من رغوة البولي يوريثان المرشوشة التي تدمج العزل الحراري الفائق والعزل المائي في طبقة واحدة متكاملة بدون فواصل، تعلوها طبقات حماية عاكسة للأشعة فوق البنفسجية.",
  },
  {
    id: 8,
    category: "solutions",
    questionEn: "Are your tank lining materials safe for drinking water storage?",
    questionAr: "هل مواد تبطين الخزانات لديكم آمنة لتخزين مياه الشرب؟",
    answerEn:
      "Yes, our GRP fiberglass lining systems utilize certified non-toxic, food-grade resins specifically approved for potable water storage in compliance with Dubai and UAE municipality health regulations.",
    answerAr:
      "نعم، تستخدم أنظمة تبطين الخزانات بـ GRP راتنجات معتمدة غذائياً وغير سامة ومصرح بها رسمياً لمياه الشرب وفق معايير بلديات دبي والإمارات والهيئات الصحية.",
  },
  {
    id: 9,
    category: "solutions",
    questionEn: "Can epoxy floor coatings withstand heavy industrial traffic and chemicals?",
    questionAr: "هل تتحمل أرضيات الإيبوكسي الحركة الصناعية الثقيلة والمواد الكيميائية؟",
    answerEn:
      "Absolutely. Our high-grade epoxy and polyurethane screeds are engineered for heavy forklift movements, high mechanical abrasion resistance, chemical spillage durability, and effortless hygiene maintenance.",
    answerAr:
      "بالتأكيد. صُممت أنظمة الإيبوكسي والبولي يوريثان عالية الجودة لتتحمل حركة الرافعات الشوكية الثقيلة، ومقاومة الاحتكاك والمواد الكيميائية وسهولة التنظيف والتعقيم.",
  },
  {
    id: 10,
    category: "solutions",
    questionEn: "What is crack injection waterproofing and when is it recommended?",
    questionAr: "ما هو عزل حقن الشقوق ومتى يوصى باستخدامه؟",
    answerEn:
      "Polyurethane and epoxy injection is a specialized non-destructive technique that seals active water leaks through basement walls, expansion joints, and concrete slabs under high pressure without structural excavation.",
    answerAr:
      "حقن البولي يوريثان والإيبوكسي هو تقنية دقيقة غير إتلافية تُستخدم لوقف تدفقات وتسربات المياه النشطة فوراً في جدران الأقبية والفواصل الإنشائية والخرسانة المسلحة دون الحاجة لأعمال الحفر.",
  },
  {
    id: 11,
    category: "trust",
    questionEn: "What warranty duration is provided on completed waterproofing projects?",
    questionAr: "ما هي مدة الضمان المقدمة على مشاريع العزل المائي المنفذة؟",
    answerEn:
      "We provide industry-leading warranties ranging from 10 up to 25 years depending on the chosen insulation system, supported by manufacturer backing and official completion handover certificates.",
    answerAr:
      "نقدم ضمانات معتمدة تصل من 10 إلى 25 عاماً حسب نوع نظام العزل المنفذ، مدعومة بضمانات المصنعين وشهادات التسليم الرسمية الموثقة.",
  },
  {
    id: 12,
    category: "trust",
    questionEn: "Are your materials and execution approved by UAE Municipalities and Civil Defence?",
    questionAr: "هل المواد وطرق التنفيذ معتمدة من بلديات دولة الإمارات والدفاع المدني؟",
    answerEn:
      "Yes, all technical materials and application protocols conform to municipality specifications across Dubai, Abu Dhabi, and Sharjah, and fulfill UAE Civil Defence fire safety regulations.",
    answerAr:
      "نعم، جميع المواد الفنية وبروتوكولات التنفيذ معتمدة ومطابقة لمواصفات بلديات دبي وأبوظبي والشارقة وتلبي اشتراطات الدفاع المدني للسلامة ومقاومة الحريق.",
  },
  {
    id: 13,
    category: "trust",
    questionEn: "How do you conduct flood leak testing before project handover?",
    questionAr: "كيف يتم إجراء اختبارات فحص التسرب بالغمر المائي قبل تسليم المشروع؟",
    answerEn:
      "We conduct a mandatory 48-hour continuous water ponding test on all treated roofs, basements, and wet zones, verified by on-site quality assurance engineers before issuing warranty certificates.",
    answerAr:
      "نجري اختبار غمر بالماء إلزامي لمدة 48 ساعة متواصلة على جميع الأسطح والخزانات والمناطق المعالجة، مع توثيق الفحص من قبل مهندسي ضبط الجودة قبل إصدار شهادة الضمان.",
  },
  {
    id: 14,
    category: "trust",
    questionEn: "What health and safety standards do your field technicians adhere to?",
    questionAr: "ما هي معايير الصحة والسلامة المهنية التي تلتزم بها فرقكم الفنية؟",
    answerEn:
      "All technicians undergo rigorous training, wear full certified PPE, possess working-at-height certifications, and adhere strictly to UAE OSHAD environmental and occupational safety guidelines.",
    answerAr:
      "تخضع جميع فرق العمل لتدريب مكثف، مع الالتزام الكامل بمعدات الوقاية المعتمدة وتصاريح العمل على المرتفعات ومعايير السلامة المهنية والبيئية المعتمدة في الدولة.",
  },
  {
    id: 15,
    category: "trust",
    questionEn: "Can Taj Al Rahmah provide municipality inspection certificates?",
    questionAr: "هل يمكن لشركة تاج الرحمة استخراج شهادات فحص واعتماد البلدية؟",
    answerEn:
      "Yes, we coordinate directly with consultant engineering firms, third-party laboratories, and local municipality inspectors to secure official stage completion and compliance approvals.",
    answerAr:
      "نعم، ننسق مباشرة مع المكاتب الهندسية الاستشارية والمختبرات المعتمدة ومفتشي البلديات لاستكمال تقارير الفحص وإصدار الموافقات الرسمية للمبنى.",
  },
  {
    id: 16,
    category: "started",
    questionEn: "How can I book an initial engineering site survey?",
    questionAr: "كيف يمكنني حجز موعد للمعاينة الهندسية الميدانية الأولية؟",
    answerEn:
      "You can effortlessly book a survey through our online portal, connect with us instantly via WhatsApp at +971 52 749 2002, or call our direct engineering advisory desk.",
    answerAr:
      "يمكنك حجز المعاينة بسهولة عبر النموذج الإلكتروني، أو التواصل المباشر عبر واتساب على الرقم 2002 749 52 971+، أو الاتصال بفريق الاستشارات الهندسية.",
  },
  {
    id: 17,
    category: "started",
    questionEn: "Is the initial inspection and quotation free of charge?",
    questionAr: "هل المعاينة الميدانية الأولية وعرض السعر مجانيان؟",
    answerEn:
      "Yes, we provide complimentary on-site engineering assessments and detailed, itemized technical quotations with zero obligation for all commercial and residential inquiries.",
    answerAr:
      "نعم، نقدم تقييماً هندسياً ميدانياً مجانياً مع عرض أسعار تفصيلي وشفاف دون أي التزام لجميع الاستفسارات السكنية والتجارية والصناعية.",
  },
  {
    id: 18,
    category: "started",
    questionEn: "How quickly can work commence after quotation approval?",
    questionAr: "ما مدى سرعة بدء العمل بالموقع بعد اعتماد عرض السعر؟",
    answerEn:
      "Following formal contract sign-off and permit clearances, our specialized technical teams can mobilize to site within 24 to 48 hours to initiate surface preparation.",
    answerAr:
      "بمجرد توقيع العقد واستكمال تصاريح العمل اللازمة، يمكن لفرقنا المتخصصة التواجد في الموقع لبدء أعمال التجهيز خلال 24 إلى 48 ساعة.",
  },
  {
    id: 19,
    category: "started",
    questionEn: "What payment milestones and options are available?",
    questionAr: "ما هي مراحل وخيارات الدفع المتاحة للمشاريع؟",
    answerEn:
      "We offer transparent, milestone-based payment schedules tied to certified inspection milestones, accepting direct bank transfers, corporate cheques, and major digital payments.",
    answerAr:
      "نوفر جداول سداد مرنة وشفافة مرتبطة بمراحل الإنجاز المعتمدة، مع قبول التحويلات البنكية والشيكات المعتمدة والمدفوعات الإلكترونية.",
  },
  {
    id: 20,
    category: "started",
    questionEn: "Do you handle maintenance contracts for residential towers and facilities?",
    questionAr: "هل توفرون عقود صيانة دورية للمباني السكنية والمنشآت التجارية؟",
    answerEn:
      "Yes, we provide comprehensive Annual Maintenance Contracts (AMC) that include scheduled preventive inspections, emergency leak remediation response, and proactive waterproofing upkeep.",
    answerAr:
      "نعم، نقدم عقود صيانة سنوية شاملة (AMC) تتضمن فحوصات دورية وقائية، واستجابة طارئة لمعالجة أي تسربات، وصيانة وقائية متكاملة لجميع أنظمة العزل.",
  },
];

export default function FaqPageContent() {
  const { isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "solutions" | "trust" | "started">("all");
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    {
      key: "all" as const,
      labelEn: "All",
      labelAr: "الكل",
      icon: LayoutGrid,
    },
    {
      key: "general" as const,
      labelEn: "General",
      labelAr: "عام",
      icon: HelpCircle,
    },
    {
      key: "solutions" as const,
      labelEn: "Solutions",
      labelAr: "الحلول",
      icon: Layers,
    },
    {
      key: "trust" as const,
      labelEn: "Technology & Trust",
      labelAr: "التكنولوجيا والموثوقية",
      icon: ShieldCheck,
    },
    {
      key: "started" as const,
      labelEn: "Getting Started",
      labelAr: "البدء معنا",
      icon: Compass,
    },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const question = (isArabic ? item.questionAr : item.questionEn).toLowerCase();
      const answer = (isArabic ? item.answerAr : item.answerEn).toLowerCase();

      return question.includes(q) || answer.includes(q);
    });
  }, [activeCategory, searchQuery, isArabic]);

  return (
    <div className="w-full bg-white overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (Matches Attached Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] flex items-center bg-[#071d34] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/faqPage/Dubai modern skyline at twilight.png"
          alt="Dubai modern skyline at twilight"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />

        {/* Dark Vignette Overlay for legible text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left rtl:text-right">
            {/* Top dash label */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-6 h-[2px] bg-[#3CD3C1]" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#3CD3C1] uppercase">
                {isArabic ? "الأسئلة الشائعة والمشاريع" : "FEATURED PROJECTS"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.15] tracking-tight">
              {isArabic ? (
                <>
                  الأسئلة <span className="text-[#3CD3C1]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#3CD3C1]">Questions</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-xs sm:text-sm md:text-[15px] text-stone-200/90 leading-relaxed font-normal max-w-xl">
              {isArabic
                ? "غالباً ما يتواصل معنا عملاؤنا لطرح استفسارات حول منهجية عملنا، وموثوقيتنا، وحلول العزل والبناء عالية الجودة التي نقدمها."
                : "Our clients often come to us with questions regarding our process, reliability, and high-quality roofing & construction solutions."}
            </p>
          </div>
        </div>

        {/* Carousel indicator button (as seen on far right in mockup) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20 hover:bg-[#009e90] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs">
            <ChevronRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN CONTENT AREA (Find Answers Quickly + Filter + List)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#eef9f7] via-[#e5f5f3] to-[#f4faf9] overflow-hidden">
        
        {/* Left Decorative Vector Curve (Vector (1).svg) */}
        <div className="absolute left-0 top-12 sm:top-20 pointer-events-none select-none opacity-80 z-0">
          <Image
            src="/faqPage/Vector (1).svg"
            alt=""
            width={52}
            height={468}
            className="w-auto h-[320px] sm:h-[468px]"
          />
        </div>

        {/* Right Decorative Vector Curve (Vector.svg) */}
        <div className="absolute right-0 top-12 sm:top-20 pointer-events-none select-none opacity-80 z-0">
          <Image
            src="/faqPage/Vector.svg"
            alt=""
            width={112}
            height={468}
            className="w-auto h-[320px] sm:h-[468px]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            {/* Tagline dash */}
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="w-6 h-[1.5px] bg-[#009e90]" />
              <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#009e90] uppercase">
                {isArabic ? "الأسئلة الشائعة" : "FAQS"}
              </span>
              <span className="w-6 h-[1.5px] bg-[#009e90]" />
            </div>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0d2438] tracking-tight mb-3">
              {isArabic ? (
                <>
                  اعثر على إجاباتك <span className="text-[#009e90]">بسرعة</span>
                </>
              ) : (
                <>
                  Find Answers <span className="text-[#009e90]">Quickly</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-stone-500 text-xs sm:text-sm md:text-[15px] max-w-xl mx-auto leading-relaxed">
              {isArabic
                ? "ابحث في أسئلتنا الأكثر شيوعاً حسب الكلمة المفتاحية أو الفئة للحصول على المعلومات التي تحتاجها فوراً حول خدماتنا."
                : "Search our frequently asked questions by keyword or category to get the information you need, right away regarding our services."}
            </p>
          </div>

          {/* Search Input Bar (Pill shape) */}
          <div className="max-w-2xl mx-auto mb-7 sm:mb-9">
            <div className="relative flex items-center bg-white rounded-full shadow-[0_6px_24px_rgba(0,158,144,0.08)] border border-stone-200/90 focus-within:border-[#009e90] focus-within:ring-2 focus-within:ring-[#009e90]/15 transition-all p-1.5 sm:p-2">
              <div className="pl-4 pr-2 rtl:pr-4 rtl:pl-2 text-stone-400 flex items-center">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isArabic ? "ابحث في الأسئلة الشائعة..." : "Search FAQs..."}
                className="w-full bg-transparent text-stone-800 text-xs sm:text-sm font-medium focus:outline-none placeholder-stone-400 px-2 py-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#009e90] hover:bg-[#00867a] active:scale-95 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#009e90]/25 transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filter Tabs (Pill Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#009e90] text-white shadow-md shadow-[#009e90]/30 scale-[1.02]"
                      : "bg-white text-stone-600 border border-stone-200/90 hover:border-[#009e90]/40 hover:text-[#009e90] hover:bg-stone-50/80 shadow-xs"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-white" : "text-[#009e90]"}`} />
                  <span>{isArabic ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Accordion FAQ List */}
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-3.5">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200/80 shadow-sm">
                <HelpCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-1">
                  {isArabic ? "لم يتم العثور على نتائج" : "No FAQs Found"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mb-4">
                  {isArabic
                    ? "يرجى تجربة كلمة بحث مختلفة أو تغيير الفئة."
                    : "Try searching with different keywords or switch the category."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#009e90] hover:underline cursor-pointer"
                >
                  {isArabic ? "إعادة تعيين البحث" : "Reset Filters"}
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isOpen = openIds.includes(item.id);
                const formattedNum = String(item.id).padStart(2, "0");

                return (
                  <div
                    key={item.id}
                    className={`bg-white border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "rounded-2xl sm:rounded-3xl border-[#009e90]/40 shadow-[0_8px_24px_rgba(0,158,144,0.09)]"
                        : "rounded-full border-stone-200/90 hover:border-[#009e90]/40 shadow-xs hover:shadow-sm"
                    }`}
                  >
                    {/* Accordion Toggle Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-4.5 text-left rtl:text-right cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        {/* Number Badge (e.g. 01, 02) */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#e8f7f5] text-[#009e90] text-xs sm:text-[13px] font-bold flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#009e90] group-hover:text-white">
                          {formattedNum}
                        </div>

                        {/* Question Text */}
                        <span
                          className={`text-[13px] sm:text-[15px] font-semibold leading-snug transition-colors ${
                            isOpen ? "text-[#009e90]" : "text-stone-800 group-hover:text-[#009e90]"
                          }`}
                        >
                          {isArabic ? item.questionAr : item.questionEn}
                        </span>
                      </div>

                      {/* Circle Chevron Button */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e8f7f5] text-[#009e90] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-[#009e90] text-white" : "group-hover:bg-[#009e90]/15"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-[14px] text-stone-600 leading-relaxed border-t border-stone-100">
                        <div className="ltr:pl-11 rtl:pr-11 pt-2">
                          {isArabic ? item.answerAr : item.answerEn}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. BOTTOM CTA SECTION ("Still have questions?")
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#081e35] py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Image (Group 1000010019.png) */}
        <Image
          src="/faqPage/Group 1000010019.png"
          alt="Still have questions background"
          fill
          unoptimized
          className="object-cover object-center pointer-events-none"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-[#061729]/75 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-3 sm:mb-4">
            {isArabic ? (
              <>
                هل ما زالت لديك <span className="text-[#3CD3C1]">أسئلة؟</span>
              </>
            ) : (
              <>
                Still have <span className="text-[#3CD3C1]">questions?</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-[15px] text-stone-300 max-w-lg mx-auto leading-relaxed mb-7 sm:mb-8">
            {isArabic
              ? "لم تجد الإجابة التي تبحث عنها؟ فريقنا المتخصص جاهز للإجابة على كافة استفساراتك ومساعدتك في اختيار أفضل الحلول لمشروعك."
              : "Can't find the answer you're looking for? Our team is here to help you understand how our services work for your business."}
          </p>

          {/* Contact Support Pill Button */}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#009e90] hover:bg-[#00867a] active:scale-95 text-white font-bold text-xs sm:text-sm md:text-[15px] px-8 py-3.5 sm:px-9 sm:py-4 rounded-full shadow-lg shadow-[#009e90]/40 transition-all duration-200 group cursor-pointer"
            >
              {/* Headset Icon */}
              <Image
                src="/faqPage/SVG - Support Headset Icon.svg"
                alt=""
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert"
              />
              <span>{isArabic ? "تواصل مع الدعم الفني" : "Contact Support"}</span>
              {isArabic ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
