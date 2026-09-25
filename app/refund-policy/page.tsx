"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, FileText, Clock, AlertCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyPage() {
  const { isArabic } = useLanguage();

  const sections = isArabic
    ? [
      {
        title: "1. النطاق العام للخدمات",
        content:
          "تقدم شركة تاج الرحمة للخدمات الفنية مقاولات وحلولاً هندسية متخصصة تشمل العزل المائي، العزل الحراري، معالجة الخرسانة، أعمال GRP، والمقاولات الفنية في دولة الإمارات العربية المتحدة. تخضع جميع الاتفاقيات لعقود العمل المعتمدة وأوامر الشراء (LPO) الموقعة بين الطرفين.",
      },
      {
        title: "2. سياسة الإلغاء قبل بدء الأعمال الميدانية",
        content:
          "يمكن للعميل طلب إلغاء الخدمة أو المشروع كتابياً قبل بدء أعمال التحضير الميداني وتوريد المواد المعتمدة. في حال تم شراء مواد مخصصة للمشروع بموجب موافقة الاستشاري أو إصدار تصاريح بلدية خاصة، تُخصم التكاليف الفعلية المترتبة على ذلك قبل معالجة أي استرداد متبقٍ.",
      },
      {
        title: "3. سياسة الاسترداد للخدمات المنفذة جزئياً",
        content:
          "نظراً لطبيعة الأعمال الإنشائية والمقاولات الفنية، فإن الدفعات المستحقة عن مراحل العمل المنجزة والمفحوصة (وفق تقارير الفحص وضمان الجودة) لا تكون قابلة للاسترداد. إذا تم إنهاء المشروع باتفاق مشترك قبل اكتماله، يتم إجراء تسوية هندسية عادلة بناءً على نسب الإنجاز المعتمدة من الاستشاري.",
      },
      {
        title: "4. الدفعات المقدمة وتوريد المواد",
        content:
          "تُخصص الدفعات المقدمة عادةً لحجز فرق العمل الفنية وشراء الكيماويات ومواد العزل المعتمدة من كبرى المصانع. في حال طلب الإلغاء، يتم استرداد المبلغ المتبقي بعد خصم قيمة المواد التي تم توريدها أو تصنيعها خصيصاً للمشروع.",
      },
      {
        title: "5. معالجة طلبات الاسترداد والمدة الزمنية",
        content:
          "يتم تقديم طلبات الإلغاء والاسترداد رسمياً عبر البريد الإلكتروني المعتمد. يقوم قسم المحاسبة والإدارة المالية بمراجعة الطلب خلال 5 إلى 7 أيام عمل، وفي حال الموافقة على الاسترداد، يتم التحويل البنكي إلى الحساب الأصلي للعميل في غضون 10 إلى 14 يوم عمل.",
      },
      {
        title: "6. التواصل والاستفسارات",
        content:
          "لأي استفسارات بخصوص سياسة الإلغاء والاسترداد أو لمتابعة طلب قائم، يرجى التواصل مع فريق خدمة العملاء والشؤون المالية عبر القنوات الرسمية الموضحة أدناه.",
      },
    ]
    : [
      {
        title: "1. Scope & Service Agreements",
        content:
          "Taj Al Rahmah Technical Services provides specialized engineering contracting, waterproofing, thermal insulation, concrete rehabilitation, GRP solutions, and general technical contracting across the UAE. All project commitments are governed by signed contract agreements, quotations, and official Local Purchase Orders (LPOs).",
      },
      {
        title: "2. Cancellation Prior to Site Mobilization",
        content:
          "Clients may request cancellation of confirmed project services in writing prior to physical site mobilization and custom material dispatch. If specialized chemicals, custom membranes, or municipal permit fees have already been incurred specifically for the project, actual non-recoverable direct costs will be deducted prior to processing any eligible balance refund.",
      },
      {
        title: "3. Partial Work Execution & Milestones",
        content:
          "Due to the customized nature of construction and technical contracting, milestone payments corresponding to completed and inspected phases (verified via QA/QC inspection reports) are non-refundable. Should a project be terminated by mutual consent mid-way, an itemized site evaluation and financial reconciliation will be conducted based on verified work progress.",
      },
      {
        title: "4. Advance Deposits & Material Procurement",
        content:
          "Advance mobilization payments are allocated toward reserving technical crews, specialized equipment, and ordering consultant-approved materials from premier manufacturers. In eligible cancellation scenarios, unallocated balances will be refunded following the deduction of custom-procured stock.",
      },
      {
        title: "5. Refund Evaluation & Processing Timeframe",
        content:
          "Formal cancellation and refund requests must be submitted to our corporate office via email. Our commercial and finance departments review all requests within 5 to 7 business days. Approved refunds are processed via corporate bank transfer to the originating account within 10 to 14 business days.",
      },
      {
        title: "6. Contact & Dispute Resolution",
        content:
          "If you have inquiries regarding our refund and cancellation policies, or require assistance with an existing project agreement, please contact our contracts and customer care team through the official channels listed below.",
      },
    ];

  return (
    <div className="min-h-screen bg-stone-50/50" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── Page Header ── */}
      <CommonHeader
        title={isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
        breadcrumb={isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
        imagePath="/banners/Home__.png"
      />

      {/* ── Main Policy Content ── */}
      <section className="hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
        {/* Overview Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {isArabic ? "السياسة المعتمدة للعقود والخدمات الفنية" : "Corporate Policy & Service Terms"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                {isArabic ? "آخر تحديث: سبتمبر 2026 • متوافق مع قوانين المعاملات التجارية بدولة الإمارات" : "Last updated: September 2026 • UAE Commercial Law Compliant"}
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {isArabic
              ? "تهدف هذه السياسة إلى توضيح الإجراءات المتبعة عند إلغاء أو تعديل عقود المقاولات الفنية واسترداد الدفعات المالية في شركة تاج الرحمة للخدمات الفنية ذ.م.م، بما يضمن حقوق عملائنا الكرام وشفافية المعاملات التجارية."
              : "This Refund & Cancellation Policy outlines the procedures and terms governing contract modifications, project cancellations, and financial reimbursements for technical contracting services provided by Taj Al Rahmah Technical Services L.L.C in Dubai and the UAE."}
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:border-[#01a9a0]/30 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#01a9a0] shrink-0" />
                <span>{section.title}</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Assistance Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#012227] to-[#01353c] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-lg font-bold">
              {isArabic ? "هل تحتاج إلى استفسار حول عقدك أو مشروعك؟" : "Have Questions About Your Agreement?"}
            </h4>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {isArabic
                ? "فريقنا القانوني والمالي متاح لمساعدتكم ومراجعة متطلباتكم بكل مرونة."
                : "Our commercial and finance desk is available to assist with contract reviews and inquiries."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white font-bold text-xs sm:text-sm transition-all"
            >
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </Link>
            <a
              href="mailto:info@tajalrahmah.com"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
            >
              info@tajalrahmah.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
