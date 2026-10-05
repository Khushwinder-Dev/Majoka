"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CommonHeader from "@/components/Common/CommonHeader";

interface PolicySection {
  number: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
}

export default function RefundPolicyPage() {
  const { isArabic } = useLanguage();

  const policySections: PolicySection[] = [
    {
      number: "01",
      titleEn: "Payments",
      titleAr: "الدفعات المالية",
      contentEn:
        "All payments for confirmed projects, services, materials, or work orders are subject to the terms agreed between the parties and specified in the applicable quotation, contract, or purchase order.",
      contentAr:
        "تخضع جميع الدفعات المالية للمشاريع أو الخدمات أو المواد أو أوامر العمل المؤكدة للشروط والأحكام المتفق عليها بين الطرفين والمحددة في عرض الأسعار أو العقد أو أمر الشراء المعمول به.",
    },
    {
      number: "02",
      titleEn: "Cancellation Requests",
      titleAr: "طلبات الإلغاء",
      contentEn:
        "Cancellation requests must be submitted to us in writing. Any applicable cancellation charges or deductions will depend on the project stage, work completed, materials ordered or supplied, and costs incurred prior to cancellation.",
      contentAr:
        "يجب تقديم طلبات الإلغاء إلينا كتابةً وبشكل رسمي. وتعتمد أي رسوم أو خصومات مطبقة على مرحلة تنفيذ المشروع، والأعمال المنجزة، والمواد المطلوبة أو الموردة، والتكاليف المتكبدة قبل استلام طلب الإلغاء.",
    },
    {
      number: "03",
      titleEn: "Non-Refundable Costs",
      titleAr: "التكاليف غير القابلة للاسترداد",
      contentEn:
        "Amounts relating to materials purchased or specially ordered, completed work, mobilization, transportation, site preparation, or other costs already incurred may not be refundable.",
      contentAr:
        "المبالغ المتعلقة بالمواد المشتراة أو المطلوبة خصيصاً للمشروع، أو الأعمال المنجزة، أو التحضيرات الميدانية والتعبئة، أو النقل، أو تجهيز الموقع، أو أي تكاليف أخرى تم إنفاقها بالفعل قد لا تكون قابلة للاسترداد.",
    },
    {
      number: "04",
      titleEn: "Refunds",
      titleAr: "المبالغ المستردة",
      contentEn:
        "Where a refund is applicable under the agreed terms, the refund amount will be assessed based on the work completed and costs incurred. Approved refunds will be processed through the applicable payment method within a reasonable period.",
      contentAr:
        "في الحالات التي ينطبق فيها الاسترداد بموجب الشروط المتفق عليها، يتم تقييم مبلغ الاسترداد بناءً على حجم الأعمال المنفذة والتكاليف المتكبدة. وتتم معالجة المبالغ المستردة المعتمدة عبر وسيلة الدفع الأصلية المعتمدة خلال فترة زمنية معقولة.",
    },
    {
      number: "05",
      titleEn: "Completed Services And Work",
      titleAr: "الخدمات والأعمال المكتملة",
      contentEn:
        "Payments relating to services or work that have already been completed, delivered, or accepted are generally non-refundable, subject to the applicable contract and agreed terms.",
      contentAr:
        "تعد الدفعات المالية المتعلقة بالخدمات أو الأعمال التي تم إنجازها أو تسليمها أو اعتمادها وقبولها بالفعل غير قابلة للاسترداد بشكل عام، وذلك وفقاً لبنود العقد والشروط المتفق عليها.",
    },
    {
      number: "06",
      titleEn: "Project-Specific Terms",
      titleAr: "الشروط الخاصة بالمشاريع",
      contentEn:
        "Certain projects or services may have specific payment, cancellation, refund, warranty, or completion conditions. Where applicable, these conditions will be stated in the relevant quotation, contract, purchase order, or work order and will apply to the project.",
      contentAr:
        "قد تخضع بعض المشاريع أو الخدمات المتخصصة لشروط محددة تتعلق بالسداد، أو الإلغاء، أو الاسترداد، أو الضمانات، أو متطلبات الإنجاز. وحيثما ينطبق ذلك، يتم تضمين هذه الشروط في عرض الأسعار أو العقد أو أمر الشراء أو أمر العمل المعني وتكون ملزمة للمشروع.",
    },
    {
      number: "07",
      titleEn: "Changes To Services",
      titleAr: "التعديلات على نطاق الخدمات",
      contentEn:
        "Any changes, additions, or variations to the agreed scope of work may affect the project cost and payment terms. Such changes will be subject to the applicable approval and agreement between the parties.",
      contentAr:
        "أي تعديلات أو إضافات أو تغييرات على نطاق العمل المتفق عليه قد تؤثر على التكلفة الإجمالية للمشروع وشروط السداد، وتخضع هذه التعديلات للموافقة والاتفاق الرسمي بين الطرفين.",
    },
  ];

  return (
    <div className="w-full bg-white text-stone-800" dir={isArabic ? "rtl" : "ltr"}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (Same as Industries page banner)
      ══════════════════════════════════════════════════════════════ */}
      <CommonHeader
        imagePath="/banners/refund.jpeg"
        showHeading={false}
        showBreadcrumb={false}
      />

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN CONTENT BODY (Matching Reference Design Layout)
      ══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[880px] mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro Paragraph */}
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-10 sm:mb-12">
          {isArabic
            ? "نحن ملتزمون بتقديم خدمات المقاولات الاحترافية والعزل المائي والإصلاح والصيانة بأعلى المعايير. توضح سياسة الاسترداد والإلغاء هذه آلية التعامل مع طلبات الإلغاء والمبالغ المستردة والدفعات المالية. يرجى مراجعة هذه السياسة بالاقتران مع عروض الأسعار والعقود وأوامر الشراء المعتمدة والشروط المتفق عليها."
            : "We are committed to providing professional construction, waterproofing, repair, and maintenance services. This Refund & Cancellation Policy explains how cancellations, refunds, and related payments are handled. Please review this policy together with the applicable quotation, contract, purchase order, and agreed terms and conditions."}
        </p>

        {/* 7 Policy Points (01 to 07) */}
        <div className="space-y-8 sm:space-y-9">
          {policySections.map((sec) => (
            <div key={sec.number} className="text-left rtl:text-right">
              {/* Number Badge + Title */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5FAF7] text-[#00DDCF] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                  {sec.number}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  {isArabic ? sec.titleAr : sec.titleEn}
                </h2>
              </div>

              {/* Description Text */}
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-normal">
                {isArabic ? sec.contentAr : sec.contentEn}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            3. CONTACT US CARD (Matching Reference Design)
        ══════════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-14 bg-[#EEF5F8] rounded-2xl p-6 sm:p-7 text-left rtl:text-right border border-slate-100/80">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed mb-6 max-w-2xl">
            {isArabic
              ? "لأية استفسارات تتعلق بسياسة الاسترداد والإلغاء هذه، أو طلبات الإلغاء والاسترداد، يرجى التواصل مع فريقنا قبل تأكيد أو إلغاء أي خدمة أو مشروع."
              : "For questions regarding this Refund & Cancellation Policy, cancellations, or refund requests, please contact our team before confirming or cancelling a service or project."}
          </p>

          {/* 3 Contact Info Badges in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Email */}
            <a
              href="mailto:info@tajalrahmah.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#00DDCF] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-stone-400 font-medium">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </span>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-[#00a89a] transition-colors break-all">
                  Info@Tajalrahmah.Com
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+971556173300"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#00DDCF] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-stone-400 font-medium">
                  {isArabic ? "الهاتف" : "Phone"}
                </span>
                <span className="block text-xs font-bold text-slate-900 group-hover:text-[#00a89a] transition-colors">
                  +971 55 617 3300
                </span>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00DDCF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-stone-400 font-medium">
                  {isArabic ? "العنوان" : "Address"}
                </span>
                <span className="block text-xs font-bold text-slate-900">
                  G-01-691, Al Khabaisi, Dubai, UAE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Outro Text below Contact Us */}
        <p className="mt-8 text-xs sm:text-[13px] text-stone-500 leading-relaxed text-left rtl:text-right">
          {isArabic
            ? "نحن نقدّر ثقتكم الغالية في خدماتنا ونلتزم دائماً بالحفاظ على ممارسات تجارية واضحة وشفافة مع كافة عملائنا الكرام."
            : "We appreciate your trust in our services and remain committed to maintaining clear and transparent business practices."}
        </p>
      </main>
    </div>
  );
}
