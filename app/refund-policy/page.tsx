"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  CreditCard,
  FileText,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface PolicySection {
  number: string;
  icon: React.ElementType;
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
      icon: CreditCard,
      titleEn: "1. Payments",
      titleAr: "1. الدفعات المالية",
      contentEn:
        "All payments for confirmed projects, services, materials, or work orders are subject to the terms agreed between the parties and specified in the applicable quotation, contract, or purchase order.",
      contentAr:
        "تخضع جميع الدفعات المالية للمشاريع أو الخدمات أو المواد أو أوامر العمل المؤكدة للشروط والأحكام المتفق عليها بين الطرفين والمحددة في عرض الأسعار أو العقد أو أمر الشراء المعمول به.",
    },
    {
      number: "02",
      icon: FileText,
      titleEn: "2. Cancellation Requests",
      titleAr: "2. طلبات الإلغاء",
      contentEn:
        "Cancellation requests must be submitted to us in writing. Any applicable cancellation charges or deductions will depend on the project stage, work completed, materials ordered or supplied, and costs incurred prior to cancellation.",
      contentAr:
        "يجب تقديم طلبات الإلغاء إلينا كتابةً وبشكل رسمي. وتعتمد أي رسوم أو خصومات مطبقة على مرحلة تنفيذ المشروع، والأعمال المنجزة، والمواد المطلوبة أو الموردة، والتكاليف المتكبدة قبل استلام طلب الإلغاء.",
    },
    {
      number: "03",
      icon: AlertTriangle,
      titleEn: "3. Non-Refundable Costs",
      titleAr: "3. التكاليف غير القابلة للاسترداد",
      contentEn:
        "Amounts relating to materials purchased or specially ordered, completed work, mobilization, transportation, site preparation, or other costs already incurred may not be refundable.",
      contentAr:
        "المبالغ المتعلقة بالمواد المشتراة أو المطلوبة خصيصاً للمشروع، أو الأعمال المنجزة، أو التحضيرات الميدانية والتعبئة، أو النقل، أو تجهيز الموقع، أو أي تكاليف أخرى تم إنفاقها بالفعل قد لا تكون قابلة للاسترداد.",
    },
    {
      number: "04",
      icon: RotateCcw,
      titleEn: "4. Refunds",
      titleAr: "4. المبالغ المستردة",
      contentEn:
        "Where a refund is applicable under the agreed terms, the refund amount will be assessed based on the work completed and costs incurred. Approved refunds will be processed through the applicable payment method within a reasonable period.",
      contentAr:
        "في الحالات التي ينطبق فيها الاسترداد بموجب الشروط المتفق عليها، يتم تقييم مبلغ الاسترداد بناءً على حجم الأعمال المنفذة والتكاليف المتكبدة. وتتم معالجة المبالغ المستردة المعتمدة عبر وسيلة الدفع الأصلية المعتمدة خلال فترة زمنية معقولة.",
    },
    {
      number: "05",
      icon: CheckCircle2,
      titleEn: "5. Completed Services and Work",
      titleAr: "5. الخدمات والأعمال المكتملة",
      contentEn:
        "Payments relating to services or work that have already been completed, delivered, or accepted are generally non-refundable, subject to the applicable contract and agreed terms.",
      contentAr:
        "تعد الدفعات المالية المتعلقة بالخدمات أو الأعمال التي تم إنجازها أو تسليمها أو اعتمادها وقبولها بالفعل غير قابلة للاسترداد بشكل عام، وذلك وفقاً لبنود العقد والشروط المتفق عليها.",
    },
    {
      number: "06",
      icon: FileCheck,
      titleEn: "6. Project-Specific Terms",
      titleAr: "6. الشروط الخاصة بالمشاريع",
      contentEn:
        "Certain projects or services may have specific payment, cancellation, refund, warranty, or completion conditions. Where applicable, these conditions will be stated in the relevant quotation, contract, purchase order, or work order and will apply to the project.",
      contentAr:
        "قد تخضع بعض المشاريع أو الخدمات المتخصصة لشروط محددة تتعلق بالسداد، أو الإلغاء، أو الاسترداد، أو الضمانات، أو متطلبات الإنجاز. وحيثما ينطبق ذلك، يتم تضمين هذه الشروط في عرض الأسعار أو العقد أو أمر الشراء أو أمر العمل المعني وتكون ملزمة للمشروع.",
    },
    {
      number: "07",
      icon: RefreshCw,
      titleEn: "7. Changes to Services",
      titleAr: "7. التعديلات على نطاق الخدمات",
      contentEn:
        "Any changes, additions, or variations to the agreed scope of work may affect the project cost and payment terms. Such changes will be subject to the applicable approval and agreement between the parties.",
      contentAr:
        "أي تغييرات أو إضافات أو تعديلات على نطاق العمل المتفق عليه قد تؤثر على التكلفة الإجمالية للمشروع وشروط السداد المقترنة به. وتخضع هذه التعديلات للموافقة والاتفاق المسبق والموثق بين الطرفين.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/60" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── Page Header Banner ── */}
      <CommonHeader
        title={isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
        breadcrumb={isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
        imagePath="/banners/Home__.png"
      />

      {/* ── Main Policy Content ── */}
      <main className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
        {/* Policy Introduction Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-10 sm:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#01a9a0]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#01a9a0] tracking-tight">
                  {isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  Taj Al Rahmah Technical Services L.L.C • Dubai, UAE
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-[#01a9a0]" />
              <span>{isArabic ? "آخر تحديث: 25 سبتمبر 2026" : "Last Updated: 25 September 2026"}</span>
            </div>
          </div>

          <p className="text-sm sm:text-[15.5px] text-stone-700 leading-relaxed mt-6 font-medium">
            {isArabic
              ? "نحن ملتزمون بتقديم خدمات احترافية ومتخصصة في مجالات المقاولات الإنشائية، العزل المائي، الترميم، والصيانة. توضح سياسة الاسترداد والإلغاء هذه كيفية التعامل مع طلبات الإلغاء، واسترداد المبالغ المالية، والمدفوعات ذات الصلة. يرجى مراجعة هذه السياسة جنباً إلى جنب مع عرض الأسعار المعتمد، والعقد، وأمر الشراء، والشروط والأحكام المتفق عليها لكل مشروع."
              : "We are committed to providing professional construction, waterproofing, repair, and maintenance services. This Refund & Cancellation Policy explains how cancellations, refunds, and related payments are handled. Please review this policy together with the applicable quotation, contract, purchase order, and agreed terms and conditions."}
          </p>
        </div>

        {/* ── Policy Sections (1 to 7) ── */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {policySections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <section
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 hover:border-[#01a9a0]/40 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#01a9a0]/10 border border-[#01a9a0]/25 text-[#01a9a0] group-hover:bg-[#01a9a0] group-hover:text-white group-hover:border-[#01a9a0] flex items-center justify-center shrink-0 transition-colors duration-200 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#01a9a0] transition-colors duration-200 mb-2.5">
                      {isArabic ? section.titleAr : section.titleEn}
                    </h2>
                    <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-normal">
                      {isArabic ? section.contentAr : section.contentEn}
                    </p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Section 8: Contact Us & Transparent Business Practice ── */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-7 bg-[#01a9a0] rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#01a9a0]">
              {isArabic ? "8. اتصل بنا" : "8. Contact Us"}
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6">
            {isArabic
              ? "لأي استفسارات أو أسئلة تتعلق بسياسة الاسترداد والإلغاء هذه، أو لتقديم طلبات الإلغاء أو الاسترداد، يرجى التواصل مع فريقنا المختص قبل تأكيد أو إلغاء أي خدمة أو مشروع."
              : "For questions regarding this Refund & Cancellation Policy, cancellations, or refund requests, please contact our team before confirming or cancelling a service or project."}
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {/* Email */}
            <a
              href="mailto:info@tajalrahmah.com"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  info@tajalrahmah.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+971556173300"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isArabic ? "الهاتف" : "Phone"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  +971 55 617 3300
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isArabic ? "العنوان" : "Address"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate">
                  G-01-691, Al Khabaisi, Dubai, UAE
                </p>
              </div>
            </div>
          </div>

          {/* Closing Trust Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#e6f7f6] border border-[#01a9a0]/20 flex items-center gap-3 text-stone-800">
            <CheckCircle2 className="w-5 h-5 text-[#01a9a0] shrink-0" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {isArabic
                ? "نحن نقدّر ثقتكم الغالية في خدماتنا ونلتزم دائماً بالحفاظ على ممارسات تجارية واضحة وشفافة مع جميع عملائنا."
                : "We appreciate your trust in our services and remain committed to maintaining clear and transparent business practices."}
            </p>
          </div>
        </div>

        {/* Quick Action Footer Strip */}
        {/* <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1C24] to-[#122B37] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold">
              {isArabic ? "هل تحتاج إلى استشارة فنية أو تسعير مشروع؟" : "Need Technical Consultation or Project Quotation?"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              {isArabic
                ? "فريق مهندسينا ومسؤولي العقود متاحون لمساعدتكم ومراجعة متطلبات مشاريعكم الهندسية."
                : "Our engineering and contracts desk is ready to review your project specifications and schedule a site survey."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#00DDCF] hover:bg-[#00c4b4] text-[#0B1C24] font-bold text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-95"
            >
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </Link>
            <Link
              href="/get-a-quote"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95"
            >
              {isArabic ? "طلب تسعير" : "Get a Quote"}
            </Link>
          </div>
        </div> */}
      </main>
    </div>
  );
}
