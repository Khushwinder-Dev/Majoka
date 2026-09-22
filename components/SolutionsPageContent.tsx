"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";

/* ─── DATA FOR SECTION 2: COMPLETE PROTECTION TAILORED SOLUTIONS ─────── */
interface TailoredSolution {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  icon: string;
  href: string;
}

const TAILORED_SOLUTIONS: TailoredSolution[] = [
  {
    id: 1,
    titleEn: "Roof Waterproofing Solutions",
    titleAr: "حلول عزل الأسطح المتكاملة",
    descEn:
      "Advanced membrane and liquid coating systems designed to provide durable waterproofing for any building structure.",
    descAr:
      "أنظمة أغشية وطلاءات سائلة متطورة مصممة لتوفير عزل مائي طويل الأمد ومقاوم للعوامل الجوية لأي منشأة.",
    image:
      "/servicesSubServicesContent/services/waterproofing/subservices/combo-system/gallery/roofer-inspecting-a-roof-coated-coating-fluid-applied-liquid-applied-roof-for-damage-and-maintenance-comm.webp",
    icon: "/solutions/icons/fi_18415857.svg",
    href: "/services?service=1&sub=combo-system-roof-waterproofing",
  },
  {
    id: 2,
    titleEn: "Basement/Foundation Protection",
    titleAr: "حماية الأساسات والأقبية والسراديب",
    descEn:
      "Comprehensive underground tanking and hydrostatic barrier systems protecting structures against high groundwater pressure.",
    descAr:
      "أنظمة متكاملة لتبطين وسد الأساسات تحت الأرض ضد ضغط المياه الجوفية والرطوبة للحفاظ على السلامة الإنشائية.",
    image: "/solutions/Img (1).png",
    icon: "/solutions/icons/fi_11135584.svg",
    href: "/services?service=1&sub=bitumen-membrane-waterproofing",
  },
  {
    id: 3,
    titleEn: "Industrial Waterproofing",
    titleAr: "العزل المائي للمنشآت الصناعية",
    descEn:
      "Heavy-duty waterproofing engineered for factories, warehouses, heavy industrial plants, and processing facilities.",
    descAr:
      "حلول عزل عالية التحمل للمصانع والمستودعات والمنشآت البتروكيماوية مقاومة للمواد الكيميائية وحركة الآليات.",
    image: "/solutions/Img (2).png",
    icon: "/solutions/icons/fi_8551956.svg",
    href: "/services?service=1&sub=polyurea-coating-waterproofing",
  },
  {
    id: 4,
    titleEn: "Commercial Building Protection",
    titleAr: "حماية المباني والأبراج التجارية",
    descEn:
      "Premium waterproofing solutions for corporate offices, retail complexes, shopping malls, and architectural facades.",
    descAr:
      "حلول عزل فائقة الجودة للمباني الإدارية، المجمعات التجارية، المولات والواجهات المعمارية المتميزة.",
    image: "/project-page/Contemporary commercial office center.png",
    icon: "/solutions/icons/fi_10365182.svg",
    href: "/services?service=1",
  },
  {
    id: 5,
    titleEn: "Water Retaining Structures",
    titleAr: "عزل منشآت حجز وتخزين المياه",
    descEn:
      "Specialized food-grade lining and coating systems for potable water tanks, reservoirs, swimming pools, and water features.",
    descAr:
      "أنظمة تبطين وطلاء صحية ومعتمدة غذائياً لخزانات مياه الشرب، المسابح، النوافير والمسطحات المائية.",
    image: "/solutions/Img (3).png",
    icon: "/solutions/icons/fi_67780.svg",
    href: "/services?service=1&sub=grp-fiberglass-waterproofing",
  },
  {
    id: 6,
    titleEn: "Concrete & Structure Protection",
    titleAr: "حماية الخرسانة والهياكل الإنشائية",
    descEn:
      "High-pressure crack injection, anti-carbonation coatings, and structural rehabilitation systems that extend asset lifespan.",
    descAr:
      "حقن الشقوق تحت ضغط عالٍ، الطلاءات المضادة للكربنة وإعادة تأهيل الخرسانة لزيادة العمر الافتراضي للمنشآت.",
    image: "/solutions/Img (4).png",
    icon: "/solutions/icons/fi_15606796.svg",
    href: "/services?service=1&sub=injection-waterproofing",
  },
  {
    id: 7,
    titleEn: "Wet Area Waterproofing",
    titleAr: "عزل المناطق الرطبة والخدمية",
    descEn:
      "Dedicated multi-layer waterproofing for commercial and residential bathrooms, kitchens, balconies, and utility areas.",
    descAr:
      "حلول عزل متكاملة ومتعددة الطبقات للحمامات والمطابخ والشرفات والمناطق الخدمية لمنع أي تسربات مستقبلية.",
    image: "/solutions/Img (5).png",
    icon: "/solutions/icons/fi_1694921.svg",
    href: "/services?service=1",
  },
  {
    id: 8,
    titleEn: "Waterproofing Repair & Remediation",
    titleAr: "إصلاح ومعالجة تسربات المياه",
    descEn:
      "Targeted leak diagnostic surveys, fast emergency response, and certified restorative coating systems.",
    descAr:
      "فحوصات تشخيصية دقيقة للتسربات، استجابة سريعة للطوارئ وأنظمة طلاء علاجية معتمدة لإعادة الحماية التامة.",
    image: "/solutions/Img (6).png",
    icon: "/solutions/icons/fi_15343343.svg",
    href: "/services?service=1&sub=injection-waterproofing",
  },
];

/* ─── DATA FOR SECTION 3: SOLUTIONS FOR EVERY TYPE OF PROJECT ────────── */
interface ProjectTypeSolution {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  icon: string;
  href: string;
}

const PROJECT_TYPE_SOLUTIONS: ProjectTypeSolution[] = [
  {
    id: 1,
    titleEn: "Residential",
    titleAr: "القطاع السكني",
    descEn:
      "Tailored waterproofing solutions for private luxury villas, multi-family apartment communities, basements, and podium decks.",
    descAr:
      "حلول عزل متخصصة للفلل الفاخرة، المجمعات السكنية، الأقبية والأسطح لتوفير بيئة معيشية آمنة ومريحة.",
    image: "/solutions/Img (7).png",
    icon: "/solutions/icons/fi_10898066.svg",
    href: "/industries#construction",
  },
  {
    id: 2,
    titleEn: "Commercial",
    titleAr: "القطاع التجاري",
    descEn:
      "Durable protection systems for corporate office headquarters, shopping malls, retail hubs, and premium hospitality properties.",
    descAr:
      "أنظمة حماية متينة لمقرات الشركات، المجمعات التجارية، الفنادق والمرافق الترفيهية لتفادي التوقف عن العمل.",
    image: "/solutions/Img (8).png",
    icon: "/solutions/icons/fi_14174084.svg",
    href: "/industries#construction",
  },
  {
    id: 3,
    titleEn: "Industrial",
    titleAr: "القطاع الصناعي",
    descEn:
      "Chemical-resistant, heavy-duty flooring and roof protection for manufacturing plants, logistics warehouses, and distribution centers.",
    descAr:
      "عزل مائي وأرضيات شديدة التحمل ومقاومة للمواد الكيميائية للمصانع ومستودعات التخزين ومراكز التوزيع.",
    image: "/solutions/Img (9).png",
    icon: "/solutions/icons/fi_8551956.svg",
    href: "/industries#manufacturing",
  },
  {
    id: 4,
    titleEn: "Infrastructure",
    titleAr: "البنية التحتية",
    descEn:
      "Long-term waterproof barriers engineered for bridges, tunnels, water treatment facilities, and public utility networks.",
    descAr:
      "حواجز عزل متطورة وطويلة الأمد مصممة للجسور والأنفاق ومحطات معالجة المياه وشبكات المرافق العامة.",
    image: "/solutions/Img (10).png",
    icon: "/solutions/icons/fi_16867948.svg",
    href: "/industries#water-environment",
  },
];

/* ─── DATA FOR SECTION 5: WHY CHOOSE OUR ROOF WATERPROOFING? ─────────── */
interface FeatureItem {
  id: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: string;
}

const WHY_CHOOSE_FEATURES: FeatureItem[] = [
  {
    id: 1,
    titleEn: "Leak-Proof Protection",
    titleAr: "حماية تامة من التسرب",
    descEn: "Prevents water penetration and structural damage under extreme hydrostatic pressure.",
    descAr: "تمنع تسرب المياه والأضرار الإنشائية حتى تحت أقصى درجات الضغط الهيدروستاتيكي.",
    icon: "/solutions/icons/fi_102649.svg",
  },
  {
    id: 2,
    titleEn: "UV & Weather Resistant",
    titleAr: "مقاومة للأشعة فوق البنفسجية والطقس",
    descEn: "Withstands extreme Middle East solar heat, thermal shock, and seasonal torrential rains.",
    descAr: "تتحمل درجات الحرارة المرتفعة، الصدمات الحرارية والأمطار الموسمية الغزيرة في الشرق الأوسط.",
    icon: "/solutions/icons/fi_7694362.svg",
  },
  {
    id: 3,
    titleEn: "Longer Lifespan",
    titleAr: "عمر افتراضي أطول للمنشأة",
    descEn: "Extends the lifecycle of your roof membrane, reducing recurrent maintenance overhead.",
    descAr: "تزيد من العمر الافتراضي لعوازل الأسطح وتقلل من تكاليف الصيانة الدورية الباهظة.",
    icon: "/solutions/icons/fi_15343343.svg",
  },
  {
    id: 4,
    titleEn: "Eco & User Friendly",
    titleAr: "صديقة للبيئة وآمنة صحياً",
    descEn: "High-quality, low-VOC and non-toxic materials meeting UAE and international standards.",
    descAr: "مواد عالية الجودة منخفضة المركبات العضوية المتطايرة وآمنة تماماً وفق المعايير الدولية.",
    icon: "/solutions/icons/fi_2384273.svg",
  },
];

/* ─── DATA FOR SECTION 6: SOLUTIONS FAQS ────────────────────────────── */
interface SolutionFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const SOLUTIONS_FAQS: SolutionFaqItem[] = [
  {
    id: 1,
    questionEn: "How do you determine the best waterproofing solution for a specific project?",
    questionAr: "كيف يتم تحديد أفضل حل عزل مائي لمشروع معين؟",
    answerEn:
      "We conduct a thorough technical site assessment analyzing structural blueprints, groundwater table levels, thermal exposure, slab slopes, and substrate conditions before recommending a tailored system that meets UAE Municipality and Civil Defense standards.",
    answerAr:
      "نقوم بإجراء مسح فني ومعاينة ميدانية دقيقة لتحليل المخططات الإنشائية، منسوب المياه الجوفية، درجات الحرارة وميول الأسطح قبل اقتراح النظام الأمثل المتوافق مع متطلبات البلديات والدفاع المدني في الإمارات.",
  },
  {
    id: 2,
    questionEn: "How does the Combo Waterproofing & Thermal Insulation System perform in UAE climate?",
    questionAr: "كيف يعمل نظام الكومبو للعزل المائي والحراري في مناخ الإمارات؟",
    answerEn:
      "The Combo Roofing System combines seamless rigid polyurethane foam for superior thermal insulation (compliant with UAE Green Building Regulations) and elastomeric waterproof coating in a single monolithic barrier, dramatically lowering AC energy consumption and eliminating leak points.",
    answerAr:
      "يجمع نظام الكومبو للأسطح بين رغوة البولي يوريثان الصلبة للعزل الحراري الفائق (المتوافق مع مواصفات المباني الخضراء) والطلاء المرن المانع للماء في طبقة واحدة غير ملحومة، مما يقلل استهلاك الكهرباء ويمنع التسرب نهائياً.",
  },
  {
    id: 3,
    questionEn: "Why is polyurea spray coating superior for heavy-traffic and exposed surfaces?",
    questionAr: "لماذا يعد طلاء البولي يوريا الأفضل للأسطح المكشوفة والمناطق عالية الحركة؟",
    answerEn:
      "Polyurea cures within seconds, features over 300% tensile elongation to bridge active structural micro-cracks, and delivers unbeatable resistance against chemical spillage, abrasion, standing water, and UV radiation.",
    answerAr:
      "يجف طلاء البولي يوريا في غضون ثوانٍ قليلة، ويتميز بمرونة استطالة تتجاوز 300% لتحمل وتجسير الشقوق الإنشائية، ويوفر مقاومة استثنائية للمواد الكيميائية والاحتكاك وتجمع المياه والأشعة فوق البنفسجية.",
  },
  {
    id: 4,
    questionEn: "Can waterproofing be applied over existing roofs without removing old tiles?",
    questionAr: "هل يمكن تنفيذ العزل المائي فوق الأسطح القديمة دون تكسير البلاط؟",
    answerEn:
      "Yes. For many roof refurbishments, we utilize advanced liquid-applied polyurethane or polyurea membrane systems that bond directly over cleaned and primed tiles or existing screeds, saving substantial demolition costs and time.",
    answerAr:
      "نعم. في العديد من مشاريع التجديد، نستخدم أنظمة البولي يوريثان والبولي يوريا السائلة المتطورة التي تلتصق بقوة فوق البلاط أو الخرسانة بعد المعالجة، مما يوفر تكاليف ووقت التكسير والإزالة.",
  },
  {
    id: 5,
    questionEn: "How do you protect basements and substructures from high groundwater pressure?",
    questionAr: "كيف تحمون الأقبية والأساسات من ضغط المياه الجوفية المرتفع؟",
    answerEn:
      "We install multi-layered SBS and APP modified bitumen tanking membranes reinforced with non-woven polyester, coupled with PVC/hydrophilic waterstops at construction joints and drainage protection boards to withstand continuous hydrostatic head pressure.",
    answerAr:
      "نقوم بتركيب لفائف بيتومين مسلحة بالبوليستر ومعدلة بـ SBS و APP متعددة الطبقات، مع موانع تسرب المياه (Waterstops) عند الفواصل الإنشائية وألواح حماية التصريف لمقاومة الضغط الهيدروستاتيكي المستمر.",
  },
  {
    id: 6,
    questionEn: "What warranty duration and municipality certifications are provided?",
    questionAr: "ما هي مدة الضمان والاعتمادات الرسمية التي تقدمونها للحلول المنفذة؟",
    answerEn:
      "We provide comprehensive warranties ranging from 10 to 25 years depending on the selected system. All materials and application procedures are fully approved by Dubai Municipality, Abu Dhabi authorities, and international ISO quality standards.",
    answerAr:
      "نقدم ضمانات شاملة تتراوح بين 10 إلى 25 عاماً حسب نوع النظام المختار. جميع المواد وإجراءات التنفيذ معتمدة رسمياً من بلدية دبي والجهات المختصة في أبوظبي وتخضع لمعايير الجودة العالمية ISO.",
  },
];

export default function SolutionsPageContent() {
  const { isArabic } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full bg-white text-[#0B1C24] overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center bg-[#011a24] overflow-hidden">
        {/* Background Image: Worker with paint roller on blue waterproofed surface */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/solutions/Img.png"
            alt={
              isArabic
                ? "حلول العزل المائي لجميع المشاريع"
                : "Waterproofing Solutions For Every Project"
            }
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center"
          />
        </div>

        {/* Sophisticated Dark Gradient Overlays for optimal readability */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: isArabic
              ? "linear-gradient(270deg, rgba(1, 26, 36, 0.92) 0%, rgba(1, 26, 36, 0.78) 45%, rgba(1, 26, 36, 0.45) 75%, rgba(1, 26, 36, 0.15) 100%)"
              : "linear-gradient(90deg, rgba(1, 26, 36, 0.92) 0%, rgba(1, 26, 36, 0.78) 45%, rgba(1, 26, 36, 0.45) 75%, rgba(1, 26, 36, 0.15) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011a24]/60 via-transparent to-[#011a24]/40 pointer-events-none z-1" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full py-20 sm:py-24">
          <div className="max-w-2xl">
            {/* Breadcrumb matching design */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-extrabold tracking-[0.16em] uppercase text-white/90 mb-4 sm:mb-5">
              <Link href="/" className="hover:text-[#00c4b4] transition-colors">
                {isArabic ? "الرئيسية" : "HOME"}
              </Link>
              <span className="text-[#00c4b4]">/</span>
              <span className="text-[#00c4b4]">
                {isArabic ? "حلولنا" : "SOLUTIONS"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm">
              {isArabic ? (
                <>
                  حلول العزل المائي{" "}
                  <span className="text-[#00c4b4]">لكل مشروع</span>
                </>
              ) : (
                <>
                  Waterproofing Solutions For{" "}
                  <span className="text-[#00c4b4]">Every Project</span>
                </>
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal max-w-xl">
              {isArabic
                ? "حلول عزل وحماية متطورة وموثوقة مصممة لتلبية المتطلبات الدقيقة للمشاريع السكنية والتجارية والصناعية ومشاريع البنية التحتية."
                : "Reliable and durable waterproofing and protection solutions designed to meet the specific requirements of residential, commercial, industrial, and infrastructure projects."}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: COMPLETE PROTECTION TAILORED SOLUTIONS (8 CARDS)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Tag / Eyebrow */}
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
                  حماية متكاملة{" "}
                  <span className="text-[#00c4b4]">وحلول مخصصة.</span>
                </>
              ) : (
                <>
                  Complete Protection{" "}
                  <span className="text-[#00c4b4]">Tailored Solutions.</span>
                </>
              )}
            </h2>
          </div>

          {/* 8 Tailored Solutions Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {TAILORED_SOLUTIONS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,196,180,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Top Image Container */}
                <div className="relative w-full h-[190px] sm:h-[205px] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={isArabic ? item.titleAr : item.titleEn}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Image Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
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
                    <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: SOLUTIONS FOR EVERY TYPE OF PROJECT (4 CARDS)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F2F8F7]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "تطبيقات شاملة لكافة القطاعات" : "BUILT FOR EVERY APPLICATION"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
              {isArabic ? (
                <>
                  حلول متخصصة لكل{" "}
                  <span className="text-[#00c4b4]">نوع من المشاريع</span>
                </>
              ) : (
                <>
                  Solutions For Every{" "}
                  <span className="text-[#00c4b4]">Type Of Project</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Project Sector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {PROJECT_TYPE_SOLUTIONS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,196,180,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative w-full h-[190px] sm:h-[205px] overflow-hidden bg-slate-100">
                  <Image
                    src={card.image}
                    alt={isArabic ? card.titleAr : card.titleEn}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Circular White Floating Icon Badge */}
                <div className="relative -mt-7 ml-6 rtl:ml-auto rtl:mr-6 z-10 w-14 h-14 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 border border-slate-100/90 group-hover:scale-105 transition-all duration-300">
                  <Image
                    src={card.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Card Text Content */}
                <div className="px-6 pt-2.5 pb-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-[19px] font-bold text-[#0B1C24] group-hover:text-[#00c4b4] transition-colors leading-snug mb-2.5">
                    {isArabic ? card.titleAr : card.titleEn}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed flex-1 mb-5">
                    {isArabic ? card.descAr : card.descEn}
                  </p>

                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00DDCF] hover:text-[#00c4b4] group-hover:gap-2.5 transition-all self-start mt-auto"
                  >
                    <span>{isArabic ? "عرض الحلول" : "View Solutions"}</span>
                    <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: DARK CALLOUT BANNER ("SOLUTIONS BY INDUSTRY")
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#021820] overflow-hidden">
        {/* Background Image: Bitumen roll close-up */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/solutions/Rectangle 34625045.png"
            alt="Solutions by Industry"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-[75%_center] sm:object-center"
          />
        </div>

        {/* Deep Dark Gradient Overlays for High Contrast */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: isArabic
              ? "linear-gradient(270deg, rgba(2, 24, 32, 0.94) 0%, rgba(2, 24, 32, 0.85) 48%, rgba(2, 24, 32, 0.55) 75%, rgba(2, 24, 32, 0.25) 100%)"
              : "linear-gradient(90deg, rgba(2, 24, 32, 0.94) 0%, rgba(2, 24, 32, 0.85) 48%, rgba(2, 24, 32, 0.55) 75%, rgba(2, 24, 32, 0.25) 100%)",
          }}
        />

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-block h-[2px] w-7 sm:w-9 bg-[#00c4b4] rounded-full shrink-0" />
                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                  {isArabic ? "حلول حسب القطاع" : "SOLUTIONS BY INDUSTRY"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.18]">
                {isArabic ? (
                  <>
                    حلول متطورة لكل{" "}
                    <span className="text-[#00c4b4]">نوع من المشاريع</span>
                  </>
                ) : (
                  <>
                    Solutions For Every{" "}
                    <span className="text-[#00c4b4]">Type Of Project</span>
                  </>
                )}
              </h2>

              <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
                {isArabic
                  ? "تحدث إلى خبرائنا الفنيين واحصل على حلول مخصصة تلبي أعلى معايير الجودة لقطاعك."
                  : "Talk to our experts and get tailored solutions for your industry needs."}
              </p>
            </div>

            {/* Right Buttons: Solid Teal Pill + Translucent Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0">
              {/* Primary Teal Button */}
              <Link
                href="/contact"
                className="pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#00c4b4] hover:bg-[#00b0a2] active:scale-95 text-white font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 shadow-[0_8px_24px_rgba(0,196,180,0.35)] group cursor-pointer"
              >
                <span>{isArabic ? "تحدث مع خبير" : "TALK TO EXPERT"}</span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#00c4b4] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>

              {/* Secondary White/Glass Button */}
              <Link
                href="/get-a-quote"
                className="pl-6 pr-2 py-2 sm:pl-7 sm:pr-2.5 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-[#00c4b4] font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase inline-flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 shadow-md group cursor-pointer"
              >
                <span>{isArabic ? "طلب عرض أسعار" : "REQUEST A QUOTE"}</span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00c4b4] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. SECTION: WHY CHOOSE OUR ROOF WATERPROOFING? (4 FEATURE CARDS)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "المزايا الرئيسية" : "KEY ADVANTAGES"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
              {isArabic ? (
                <>
                  لماذا تختار{" "}
                  <span className="text-[#00c4b4]">عزل الأسطح لدينا؟</span>
                </>
              ) : (
                <>
                  Why Choose{" "}
                  <span className="text-[#00c4b4]">Our Roof Waterproofing?</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {WHY_CHOOSE_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_36px_rgba(0,196,180,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group"
              >
                {/* Circular Teal/Mint Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#E5F9F7] flex items-center justify-center mb-5 border border-[#00c4b4]/20 group-hover:border-[#00c4b4] group-hover:scale-110 transition-all duration-300">
                  <Image
                    src={feat.icon}
                    alt={isArabic ? feat.titleAr : feat.titleEn}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Feature Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-[#0B1C24] group-hover:text-[#00c4b4] transition-colors leading-snug mb-2.5">
                  {isArabic ? feat.titleAr : feat.titleEn}
                </h3>

                {/* Feature Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                  {isArabic ? feat.descAr : feat.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. SECTION: FREQUENTLY ASKED QUESTIONS (FAQ)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
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
                ? "إجابات واضحة وشاملة حول حلول العزل المتكاملة، أساليب التطبيق، والضمانات المعتمدة في الإمارات."
                : "Find clear answers to common questions about our engineered waterproofing systems, application methods, and warranties."}
            </p>
          </div>

          {/* Site-Standard Accordion FAQ Cards */}
          <div className="space-y-3 sm:space-y-3.5">
            {SOLUTIONS_FAQS.map((faq) => (
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

          {/* Bottom Help / Consultation Bar */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left rtl:text-right">
              <h4 className="text-base sm:text-lg font-bold text-[#0B1C24]">
                {isArabic ? "هل لديك متطلبات خاصة لمشروعك؟" : "Have specific technical requirements for your project?"}
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {isArabic
                  ? "فريقنا الهندسي جاهز لتقديم استشارة فنية مخصصة ومعاينة ميدانية مجانية."
                  : "Our engineering specialists are ready to provide technical advisory and free on-site survey."}
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#00c4b4] hover:bg-[#00b0a2] active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-200 shrink-0 shadow-sm"
            >
              <span>{isArabic ? "تواصل مع مهندسينا" : "Talk to an Engineer"}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
