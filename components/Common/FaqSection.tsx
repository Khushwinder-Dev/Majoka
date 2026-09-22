"use client";

import React, { useState } from "react";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";

export interface FaqItem {
  id: number;
  question?: string;
  answer?: string;
  questionAr?: string;
  answerAr?: string;
  questionEn?: string;
  answerEn?: string;
}

export const DEFAULT_WATERPROOFING_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "How do you determine the best waterproofing solution for a specific project?",
    questionAr: "كيف تحددون أفضل حل للعزل المائي لمشروع معين؟",
    answer:
      "We conduct a thorough technical site assessment analyzing structural blueprints, groundwater table levels, thermal exposure, slab slopes, and substrate conditions before recommending a tailored system that meets UAE Municipality and Civil Defense standards.",
    answerAr:
      "نقوم بإجراء تقييم فني شامل للموقع من خلال تحليل المخططات الإنشائية، ومناسيب المياه الجوفية، والتعرض الحراري، وميول الخرسانة، وحالة الأسطح قبل التوصية بنظام مخصص يلبي معايير بلديات الإمارات والدفاع المدني.",
  },
  {
    id: 2,
    question: "How does the Combo Waterproofing & Thermal Insulation System perform in UAE climate?",
    questionAr: "كيف يعمل نظام العزل المائي والحراري المدمج (كومبو) في مناخ الإمارات؟",
    answer:
      "The Combo System provides dual-action high-density polyurethane insulation and elastomeric waterproofing in a single monolithic barrier. It reduces indoor HVAC loads by up to 40% and withstands UAE surface temperatures exceeding 65°C without degradation.",
    answerAr:
      "يوفر نظام الكومبو عزلاً مزدوجاً من البولي يوريثان عالي الكثافة والعزل المائي المرن في طبقة متكاملة بدون فواصل، مما يقلل أحمال التكييف بنسبة تصل إلى 40% ويقاوم حرارة الأسطح في الإمارات التي تتجاوز 65 درجة مئوية.",
  },
  {
    id: 3,
    question: "Why is polyurea spray coating superior for heavy-traffic and exposed surfaces?",
    questionAr: "لماذا يعتبر طلاء البولي يوريا بالرش فائق التميز للمساحات المكشوفة وعالية الحركة؟",
    answer:
      "Pure polyurea cures in under 15 seconds to form an impenetrable, seamless elastomeric membrane with 400%+ tensile elongation. It resists vehicular abrasion, harsh UV degradation, fuel spills, and heavy foot traffic on parking decks and podiums.",
    answerAr:
      "يتصلب البولي يوريا النقي خلال أقل من 15 ثانية ليشكل غشاءً مرناً متصلاً بدون فواصل مع استطالة تتجاوز 400%، مما يجعله مقاوماً لحركة المركبات، والأشعة فوق البنفسجية، وتسرب الوقود في مواقف السيارات والمنصات.",
  },
  {
    id: 4,
    question: "Can waterproofing be applied over existing roofs without removing old tiles?",
    questionAr: "هل يمكن تطبيق العزل المائي فوق الأسطح القائمة دون إزالة البلاط القديم؟",
    answer:
      "Yes, utilizing advanced liquid-applied polyurethane or polyurea systems and specialized bonding primers, we can encapsulate existing tiled terraces and roof decks without demolition, eliminating noise and preserving structural integrity.",
    answerAr:
      "نعم، باستخدام أنظمة البولي يوريثان أو البولي يوريا السائلة مع بادئات التصاق متطورة، يمكننا عزل الأسطح والبلاط القديم دون الحاجة إلى التكسير والإزالة، مما يمنع الإزعاج ويحافظ على سلامة المنشأة.",
  },
  {
    id: 5,
    question: "How do you protect basements and substructures from high groundwater pressure?",
    questionAr: "كيف تحمون الأقبية والأساسات من ضغط المياه الجوفية العالي؟",
    answer:
      "We deploy multi-stage tanking systems combining pre-applied bentonite or HDPE self-adhesive membranes, crystalline capillary waterproofing admixtures, and hydrophilic waterstops at construction joints to withstand extreme hydrostatic pressures.",
    answerAr:
      "نطبق أنظمة حماية متعددة المراحل تجمع بين أغشية البنتونايت أو HDPE ذاتية الالتصاق، ومضافات العزل البلوري، وموانع تسرب المياه المنتفخة عند فواصل التمدد لمقاومة أعلى ضغوط المياه الجوفية.",
  },
  {
    id: 6,
    question: "What warranty duration and municipality certifications are provided?",
    questionAr: "ما هي مدة الضمان والاعتمادات البلدية التي تقدمونها؟",
    answer:
      "We offer comprehensive 10 to 25-year transferable warranties backed by major international chemical manufacturers. All installations are certified and approved by Dubai Municipality, Trakhees, and Civil Defense authorities.",
    answerAr:
      "نقدم ضمانات شاملة قابلة للتحويل تتراوح بين 10 إلى 25 عاماً مدعومة من كبرى الشركات العالمية للمواد الكيميائية، مع اعتماد واختبار جميع الأعمال لدى بلدية دبي، وتراخيص، والدفاع المدني.",
  },
];

export interface FaqSectionProps {
  faqs?: FaqItem[];
  titlePrefix?: string;
  titlePrefixAr?: string;
  titleHighlight?: string;
  titleHighlightAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  isArabic?: boolean;
  className?: string;
  bgClassName?: string;
}

export default function FaqSection({
  faqs = DEFAULT_WATERPROOFING_FAQS,
  titlePrefix = "Frequently Asked",
  titlePrefixAr = "الأسئلة",
  titleHighlight = "Questions",
  titleHighlightAr = "الشائعة",
  subtitle = "Find clear answers to common questions about our engineered waterproofing systems, application methods, and warranties.",
  subtitleAr = "إجابات واضحة وشاملة حول حلول العزل المتكاملة، أساليب التطبيق، والضمانات المعتمدة.",
  isArabic = false,
  className = "",
  bgClassName = "bg-[#F8FAFC]",
}: FaqSectionProps) {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`relative w-full py-16 sm:py-20 lg:py-24 ${bgClassName} ${className} overflow-hidden`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching Design Reference media_1790098744511.png) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          {/* Tagline: — FAQ — */}
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
              {isArabic ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#0B1C24] tracking-tight leading-[1.15]">
            {isArabic ? (
              <>
                {titlePrefixAr}{" "}
                <span className="text-[#00c4b4]">{titleHighlightAr}</span>
              </>
            ) : (
              <>
                {titlePrefix}{" "}
                <span className="text-[#00c4b4]">{titleHighlight}</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-stone-500 text-xs sm:text-sm md:text-[14.5px] max-w-xl mx-auto leading-relaxed">
            {isArabic ? subtitleAr : subtitle}
          </p>
        </div>

        {/* Single-Column Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id}
              number={faq.id}
              question={
                (isArabic && faq.questionAr
                  ? faq.questionAr
                  : faq.questionEn || faq.question) || ""
              }
              answer={
                (isArabic && faq.answerAr
                  ? faq.answerAr
                  : faq.answerEn || faq.answer) || ""
              }
              isOpen={openId === faq.id}
              onToggle={() => toggleFaq(faq.id)}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
