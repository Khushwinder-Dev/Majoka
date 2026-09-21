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
      className="relative w-full bg-[#F2F9F7] py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-block h-[2px] w-8 bg-[#01a9a0] rounded-full shrink-0" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#5B6B73]">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.15]">
            {isArabic ? (
              <>
                الأسئلة{" "}
                <span className="text-[#01a9a0]">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked{" "}
                <span className="text-[#01a9a0]">Questions</span>
              </>
            )}
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-stone-500 leading-relaxed max-w-md">
            {isArabic
              ? "اعثر على إجابات للأسئلة الشائعة حول حلولنا الصناعية والمواد والخدمات. ما زلت بحاجة إلى مساعدة؟ فريقنا جاهز لدعمك."
              : "Find answers to common questions about our industry solutions, materials, and services. Still need help? Our team is here for you."}
          </p>

          <Link
            href="/contact"
            className="mt-7 sm:mt-8 inline-flex items-center gap-3 pl-5 sm:pl-6 pr-1.5 py-1.5 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white font-extrabold text-xs sm:text-sm tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_8px_20px_rgba(1,169,160,0.28)] group"
          >
            <span>{isArabic ? "تواصل مع خبرائنا" : "Contact Our Experts"}</span>
            <span className="w-9 h-9 rounded-full bg-white text-[#01a9a0] flex items-center justify-center">
              <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
            </span>
          </Link>
        </div>

        <div className="lg:col-span-7 w-full space-y-3">
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
