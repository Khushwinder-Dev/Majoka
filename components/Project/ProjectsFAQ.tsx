"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";
import { useLanguage } from "@/context/LanguageContext";

const FAQS = [
  {
    id: 1,
    question: "What industries do you specialize in?",
    questionAr: "ما القطاعات التي تتخصصون فيها؟",
    answer:
      "We provide waterproofing and protective solutions for commercial, industrial, residential, hospitality, infrastructure, and oil & gas sectors across the UAE and the wider region.",
    answerAr:
      "نقدم حلول العزل والحماية للقطاعات التجارية والصناعية والسكنية والضيافة والبنية التحتية والنفط والغاز في الإمارات والمنطقة.",
  },
  {
    id: 2,
    question: "What type of materials do you use?",
    questionAr: "ما نوع المواد التي تستخدمونها؟",
    answer:
      "We use certified, high-performance materials selected for durability, climate resistance, and project conditions, including membranes, coatings, and structural protection systems.",
    answerAr:
      "نستخدم مواد معتمدة عالية الأداء مختارة للمتانة ومقاومة المناخ وظروف المشروع، بما في ذلك الأغشية والطلاءات وأنظمة الحماية الإنشائية.",
  },
  {
    id: 3,
    question: "Can you provide customized solutions?",
    questionAr: "هل يمكنكم تقديم حلول مخصصة؟",
    answer:
      "Yes. Every project is assessed on site, then we design a tailored system based on structure type, exposure, timeline, and performance requirements.",
    answerAr:
      "نعم. يتم تقييم كل مشروع في الموقع، ثم نصمم نظاماً مخصصاً حسب نوع الهيكل والتعرض والجدول الزمني ومتطلبات الأداء.",
  },
  {
    id: 4,
    question: "How do you ensure quality and compliance?",
    questionAr: "كيف تضمنون الجودة والامتثال؟",
    answer:
      "Our teams follow documented method statements, manufacturer specifications, and UAE quality standards, with inspections at each stage before handover.",
    answerAr:
      "يتبع فريقنا بيانات طريقة موثقة ومواصفات المصنعين ومعايير الجودة في الإمارات، مع عمليات فحص في كل مرحلة قبل التسليم.",
  },
  {
    id: 5,
    question: "Do you work on large-scale projects?",
    questionAr: "هل تعملون على المشاريع الكبيرة؟",
    answer:
      "Yes. We deliver both focused specialist works and large-scale commercial, industrial, and infrastructure projects with dedicated site supervision.",
    answerAr:
      "نعم. ننفذ أعمالاً تخصصية مركزة ومشاريع تجارية وصناعية وبنية تحتية واسعة النطاق مع إشراف ميداني مخصص.",
  },
  {
    id: 6,
    question: "How long does a typical project take?",
    questionAr: "كم يستغرق المشروع عادة؟",
    answer:
      "Timelines depend on scope, access, and surface conditions. After a site survey we provide a clear programme covering preparation, application, and curing.",
    answerAr:
      "تعتمد المدة على نطاق العمل وإمكانية الوصول وحالة الأسطح. بعد معاينة الموقع نقدم برنامجاً واضحاً يشمل التحضير والتنفيذ والمعالجة.",
  },
];

export default function ProjectsFAQ() {
  const { isArabic } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section
      className="relative w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header (Matching Design Reference media_1790098744511.png) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
              {isArabic ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#0B1C24] tracking-tight leading-[1.15]">
            {isArabic ? (
              <>
                الأسئلة{" "}
                <span className="text-[#00c4b4]">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked{" "}
                <span className="text-[#00c4b4]">Questions</span>
              </>
            )}
          </h2>

          <p className="mt-3.5 text-stone-500 text-xs sm:text-sm md:text-[14.5px] max-w-xl mx-auto leading-relaxed">
            {isArabic
              ? "اعثر على إجابات للأسئلة الشائعة حول حلولنا الصناعية والمواد والخدمات."
              : "Find clear answers to common questions about our engineered waterproofing systems, application methods, and warranties."}
          </p>
        </div>

        {/* Single Column Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((item) => (
            <FaqAccordionItem
              key={item.id}
              number={item.id}
              question={isArabic ? item.questionAr : item.question}
              answer={isArabic ? item.answerAr : item.answer}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
