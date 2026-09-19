"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

interface QuoteFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const QUOTE_FAQS: QuoteFaqItem[] = [
  {
    id: 1,
    questionEn: "Why is the 'UAE PASS' the best way to update my Emirates ID?",
    questionAr: "لماذا يعتبر 'UAE PASS' أفضل طريقة لتحديث بطاقة الهوية الإماراتية؟",
    answerEn:
      "UAE PASS provides secure, instant digital identity verification across all UAE government entities and certified technical contracting services, eliminating manual paperwork and physical verification visits.",
    answerAr:
      "يوفر تطبيق الهوية الرقمية (UAE PASS) تحققاً فورياً وآمناً من الهوية عبر جميع الجهات الحكومية والخدمات الفنية المعتمدة في الدولة، مما يغني تماماً عن المعاملات الورقية والزيارات الميدانية.",
  },
  {
    id: 2,
    questionEn: "Will I be charged for accessing UAE PASS app?",
    questionAr: "هل يتم فرض أي رسوم على الوصول أو استخدام تطبيق UAE PASS؟",
    answerEn:
      "No, accessing and utilizing the official UAE PASS application and verification services is completely free of charge for all UAE citizens and residents.",
    answerAr:
      "لا، تحميل واستخدام تطبيق الهوية الرقمية الرسمي UAE PASS مجاني تماماً دون أي رسوم لجميع المواطنين والمقيمين في دولة الإمارات.",
  },
  {
    id: 3,
    questionEn: "What are the other ways of updating my Emirates ID?",
    questionAr: "ما هي الطرق الأخرى لتحديث بيانات الهوية الإماراتية؟",
    answerEn:
      "You can also update your Emirates ID information through the Federal Authority for Identity and Citizenship (ICP) online portal, Customer Happiness Centers, or authorized typing and Amer offices across the UAE.",
    answerAr:
      "يمكنك أيضاً تحديث بيانات الهوية الإماراتية من خلال البوابة الإلكترونية للهيئة الاتحادية للهوية والجنسية (ICP) أو مراكز سعادة المتعاملين ومكاتب الطباعة ومراكز آمر المعتمدة.",
  },
  {
    id: 4,
    questionEn: "Why can't I select all my numbers for the update?",
    questionAr: "لماذا لا يمكنني اختيار جميع أرقامي للتحديث في آن واحد؟",
    answerEn:
      "Regulatory telecom standards mandate distinct authentication for each registered subscriber line to maintain strict account security and prevent unauthorized account modifications.",
    answerAr:
      "تتطلب المعايير التنظيمية لقطاع الاتصالات مصادقة مستقلة لكل خط اتصال مسجل لضمان الحماية التامة للحساب ومنع التعديلات غير المصرح بها.",
  },
  {
    id: 5,
    questionEn: "If my number registered with a passport or GCC national ID, can I update my ID online?",
    questionAr: "إذا كان رقمي مسجلاً بجواز سفر أو بطاقة هوية خليجية، هل يمكنني التحديث عبر الإنترنت؟",
    answerEn:
      "Yes, you can conveniently initiate the verification online by uploading your valid passport or GCC national ID alongside your updated Emirates ID credentials via secure portal submission.",
    answerAr:
      "نعم، يمكنك البدء بالتحديث الإلكتروني بكل سهولة من خلال إرفاق صورة جواز السفر أو الهوية الوطنية الخليجية السارية مع بيانات الهوية الإماراتية المحدثة.",
  },
];

export default function GetAQuoteContent() {
  const { isArabic } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    companyName: "",
    projectType: "",
    projectLocation: "",
    projectDetails: "",
    agreed: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FAQ Accordion State
  const [openFaqIds, setOpenFaqIds] = useState<number[]>([]);

  const toggleFaq = (id: number) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      toast.error(
        isArabic
          ? "يرجى الموافقة على شروط التواصل لمتابعة الطلب."
          : "Please agree to be contacted regarding your inquiry."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.emailAddress,
          phone: formData.phoneNumber,
          service: `Quote Request: ${formData.projectType || "General"} (${formData.projectLocation || "UAE"})`,
          message: `[Company: ${formData.companyName || "N/A"}]\n[Location: ${formData.projectLocation}]\n[Project Type: ${formData.projectType}]\n\n${formData.projectDetails}`,
        }),
      });

      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم استلام طلب عرض السعر بنجاح. سيتواصل معك خبراؤنا قريباً."
            : "Thank you! Your quote request has been submitted successfully. Our engineers will get back to you shortly.",
          {
            duration: 6000,
            style: { background: "#1cd2ad", color: "#fff", padding: "16px", borderRadius: "10px" },
          }
        );
        setFormData({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          companyName: "",
          projectType: "",
          projectLocation: "",
          projectDetails: "",
          agreed: false,
        });
        setFiles([]);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.error ||
          (isArabic ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى." : "Submission failed. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic ? "خطأ في الاتصال. يرجى المحاولة لاحقاً." : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (GET A QUOTE — with Laptop & Hard Hat)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] flex items-center bg-[#071d34] overflow-hidden">
        {/* Background Hero Banner from new assets */}
        <Image
          src="/get-a-quote/hero-banner.png"
          alt="Get a Quote Hero Banner"
          fill
          priority
          unoptimized
          className="object-cover object-left sm:object-center"
        />

        {/* Top gradient for transparent navbar readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-transparent pointer-events-none" />

        {/* Left deep dark gradient overlay for text readability as in design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021822]/90 via-[#021822]/70 via-35% md:via-30% to-transparent pointer-events-none" />

        {/* Hero Heading Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 w-full">
          <div className="flex items-center gap-3 sm:gap-4.5 mt-8 sm:mt-12 md:mt-16">
            <h1 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
              {isArabic ? "طلب عرض سعر" : "GET A QUOTE"}
            </h1>
            <span className="inline-block w-10 sm:w-14 md:w-16 h-[3px] sm:h-[4px] bg-white rounded-full drop-shadow" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN SECTION: TERRACE BACKGROUND + FLOATING FORM CARD
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[920px] lg:min-h-[1020px] py-12 sm:py-16 lg:py-20 overflow-hidden flex items-center">

        {/* Full Terrace Building Background Image spanning the entire section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/get-a-quote/terrace-building.png"
            alt="Modern Terrace Architecture"
            fill
            priority
            unoptimized
            className="object-cover object-bottom"
          />
          {/* Top smooth white fade so the top-left text and badges sit on pure white */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 via-25% md:via-30% to-transparent" />
          {/* Subtle horizontal gradient to ensure perfect legibility on the left column */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 via-40% to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* ── LEFT COLUMN: Text + 3 Badges sitting over top-left ── */}
            <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-4">

              {/* Tagline */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-[#1cd2ad]" />
                <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#1cd2ad] uppercase">
                  {isArabic ? "طلب عرض سعر" : "GET A QUOTE"}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0d2438] leading-[1.18] tracking-tight mb-4">
                {isArabic ? (
                  <>
                    مشروعك يبدأ <br />
                    <span className="text-[#1cd2ad]">بمحادثة معنا</span>
                  </>
                ) : (
                  <>
                    Your Project <br />
                    Starts with <br />
                    <span className="text-[#1cd2ad]">a Conversation</span>
                  </>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-8 max-w-md">
                {isArabic
                  ? "سواء كان مشروعاً جديداً أو صيانة أو معالجة، فريقنا الهندسي جاهز لتقديم حلول العزل المتكاملة الأنسب لاحتياجاتك. شاركنا التفاصيل واحصل على عرض سعر مخصص."
                  : "Whether it's a new project, repair, or maintenance, our team is here to provide the right waterproofing solution for your needs. Share your details and get a tailored quote."}
              </p>

              {/* 3 Feature Badges in a Row */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                {/* 1. Reliable Solutions */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#1cd2ad]/40 bg-[#eafbf7] flex items-center justify-center text-[#1cd2ad] flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l2.4 2.4 3.4-.4 1 3.2 3 1.6-.8 3.3 2 2.8-2 2.8.8 3.3-3 1.6-1 3.2-3.4-.4L12 22l-2.4-2.4-3.4.4-1-3.2-3-1.6.8-3.3-2-2.8 2-2.8-.8-3.3 3-1.6 1-3.2 3.4.4L12 2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "حلول موثوقة" : "Reliable"}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {isArabic ? "وضمانات معتمدة" : "Solutions"}
                    </span>
                  </div>
                </div>

                {/* 2. Expert Support */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#1cd2ad]/40 bg-[#eafbf7] flex items-center justify-center text-[#1cd2ad] flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "دعم هندسي" : "Expert"}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {isArabic ? "واستشارات متخصصة" : "Support"}
                    </span>
                  </div>
                </div>

                {/* 3. Fast Response */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#1cd2ad]/40 bg-[#eafbf7] flex items-center justify-center text-[#1cd2ad] flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "استجابة سريعة" : "Fast"}
                    </h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {isArabic ? "خلال 24 ساعة" : "Response"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: Floating White Card "Tell Us About Your Project" ── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14)] border border-stone-200/90">

                {/* Card Tagline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-[2px] bg-[#1cd2ad]" />
                  <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#1cd2ad] uppercase">
                    {isArabic ? "طلب عرض سعر" : "REQUEST A QUOTE"}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d2438] tracking-tight mb-2">
                  {isArabic ? "أخبرنا عن مشروعك" : "Tell Us About Your Project"}
                </h3>

                {/* Card Subtitle */}
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-7">
                  {isArabic
                    ? "املأ البيانات أدناه وسيتواصل معك خبراؤنا لتقديم أفضل الحلول وعرض سعر منافس."
                    : "Fill in the details below and our experts will get back to you with the best solution and a competitive quote."}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder={isArabic ? "أدخل اسمك الكامل" : "e.g. John Doe"}
                        className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "رقم الهاتف" : "Phone Number"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder={isArabic ? "+971 50 000 0000" : "+971 50 000 0000"}
                        className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                        placeholder={isArabic ? "name@company.com" : "name@company.com"}
                        className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "اسم الشركة" : "Company Name"} <span className="text-stone-400 text-[11px]">({isArabic ? "اختياري" : "Optional"})</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder={isArabic ? "اسم الشركة أو المؤسسة" : "Your Company Ltd."}
                        className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type & Project Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "نوع المشروع / الخدمة" : "Project Type"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">{isArabic ? "اختر نوع الخدمة" : "Select project type"}</option>
                          <option value="Combo Waterproofing">{isArabic ? "عزل الأسطح والمباني (Combo Waterproofing)" : "Combo Waterproofing"}</option>
                          <option value="Sub-Structure Waterproofing">{isArabic ? "عزل الأساسات والهياكل تحت الأرض" : "Sub-Structure Waterproofing"}</option>
                          <option value="Wet Area Waterproofing">{isArabic ? "عزل المناطق الرطبة (حمامات ومطابخ)" : "Wet Area Waterproofing"}</option>
                          <option value="Thermal & Sound Insulation">{isArabic ? "العزل الحراري والصوتي" : "Thermal & Sound Insulation"}</option>
                          <option value="Industrial Flooring & Coating">{isArabic ? "أرضيات الإيبوكسي والطلاء الصناعي" : "Industrial Flooring & Coating"}</option>
                          <option value="Concrete Repair & Injection">{isArabic ? "إصلاح الخرسانة وحقن الشروخ" : "Concrete Repair & Injection"}</option>
                          <option value="Expansion Joint Treatment">{isArabic ? "معالجة فواصل التمدد" : "Expansion Joint Treatment"}</option>
                          <option value="Other Specialist Services">{isArabic ? "خدمات فنية متخصصة أخرى" : "Other Specialist Services"}</option>
                        </select>
                        <div className="absolute ltr:right-3.5 rtl:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1.5">
                        {isArabic ? "موقع المشروع" : "Project Location"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        required
                        placeholder={isArabic ? "مثال: دبي، أبوظبي، الشارقة" : "e.g. Dubai, Abu Dhabi, Sharjah"}
                        className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      {isArabic ? "تفاصيل المشروع ونطاق العمل" : "Project Details"} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      required
                      placeholder={
                        isArabic
                          ? "يرجى توضيح مساحة المشروع، نوع المنشأة، التحديات أو المتطلبات المحددة..."
                          : "Describe your project requirements, approximate area (sqm), building type, timelines..."
                      }
                      className="w-full px-4 py-3 bg-[#fafafa] text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-[#1cd2ad] focus:bg-white focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* File Upload Zone */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      {isArabic ? "إرفاق ملفات أو مخططات" : "Upload Files"} <span className="text-stone-400 text-[11px]">({isArabic ? "اختياري" : "Optional"})</span>
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-stone-200 hover:border-[#1cd2ad] rounded-2xl p-6 sm:p-7 text-center bg-[#fafcfc] hover:bg-[#f2faf8] transition-all cursor-pointer group"
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-stone-100 group-hover:bg-[#e0fbf6] flex items-center justify-center text-stone-500 group-hover:text-[#1cd2ad] transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-stone-700">
                        {isArabic ? "اسحب الملفات وأفلتها هنا أو " : "Drag & drop files here or "}
                        <span className="text-[#1cd2ad] underline">{isArabic ? "تصفح" : "browse"}</span>
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {isArabic ? "الملفات المدعومة: PDF, JPG, PNG (بحد أقصى 10 ميجابايت)" : "Supports PDF, JPG, PNG (Max 10MB)"}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    {files.length > 0 && (
                      <div className="mt-2 text-xs text-[#1cd2ad] font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{files.map((f) => f.name).join(", ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreed"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 mt-0.5 accent-[#1cd2ad] rounded cursor-pointer"
                    />
                    <label htmlFor="agreed" className="text-xs text-stone-600 leading-snug cursor-pointer">
                      {isArabic ? (
                        <>أوافق على التواصل معي بخصوص هذا الطلب. <span className="text-red-500">*</span></>
                      ) : (
                        <>I agree to be contacted regarding my inquiry. <span className="text-red-500">*</span></>
                      )}
                    </label>
                  </div>

                  {/* Submit Button in vibrant teal */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1cd2ad] hover:bg-[#16be9c] active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 rounded-full shadow-lg shadow-[#1cd2ad]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isArabic ? "طلب عرض السعر" : "Request a Quote"}</span>
                          {isArabic ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: FREQUENTLY ASKED QUESTIONS (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#f3fcf9] overflow-hidden">

        {/* Decorative Fluid Ribbons from user resources at bottom corners */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-left.png"
            alt=""
            width={500}
            height={330}
            className="w-[260px] sm:w-[380px] md:w-[480px] h-auto opacity-75"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-right.png"
            alt=""
            width={550}
            height={330}
            className="w-[260px] sm:w-[380px] md:w-[500px] h-auto opacity-75"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2.5">
              <span className="w-5 h-[1.5px] bg-[#1cd2ad]" />
              <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#1cd2ad] uppercase">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="w-5 h-[1.5px] bg-[#1cd2ad]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d2438] tracking-tight mb-3">
              {isArabic ? (
                <>
                  الأسئلة <span className="text-[#1cd2ad]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#1cd2ad]">Questions</span>
                </>
              )}
            </h2>

            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isArabic
                ? "إجابات على الأسئلة الشائعة حول حلول العزل والمواد والتنفيذ. هل لا تزال بحاجة لمساعدة؟"
                : "Find answers to common questions about our industry solutions, materials, and services. Still need help?"}
            </p>
          </div>

          {/* 5 Accordion FAQ Cards */}
          <div className="space-y-3 sm:space-y-3.5">
            {QUOTE_FAQS.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              const formattedNum = String(faq.id).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  className={`bg-white border transition-all duration-300 overflow-hidden ${isOpen
                    ? "rounded-2xl sm:rounded-3xl border-[#1cd2ad]/40 shadow-[0_8px_24px_rgba(28,210,173,0.09)]"
                    : "rounded-full border-stone-200/90 hover:border-[#1cd2ad]/40 shadow-xs hover:shadow-sm"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 text-left rtl:text-right cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ddf8f3] text-[#1cd2ad] text-xs sm:text-[13px] font-bold flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#1cd2ad] group-hover:text-white">
                        {formattedNum}
                      </div>

                      <span
                        className={`text-[13px] sm:text-[15px] font-semibold leading-snug transition-colors ${isOpen ? "text-[#1cd2ad]" : "text-stone-800 group-hover:text-[#1cd2ad]"
                          }`}
                      >
                        {isArabic ? faq.questionAr : faq.questionEn}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen
                        ? "bg-[#ddf8f3] text-[#1cd2ad]"
                        : "bg-[#ddf8f3] text-[#1cd2ad] group-hover:bg-[#1cd2ad] group-hover:text-white"
                        }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 text-xs sm:text-[14px] text-stone-600 font-normal leading-relaxed">
                      <div className="ltr:pl-11 rtl:pr-11">
                        {isArabic ? faq.answerAr : faq.answerEn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: TALK TO OUR EXPERTS BANNER (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative w-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-stone-100 bg-[#082b35]">

            {/* Background Graphic: User's pristine Footer - BottomExpertsCalloutSection.png */}
            <div className="relative w-full min-h-[280px] sm:min-h-[280px] lg:min-h-[280px]">
              <Image
                src="/get-a-quote/experts-callout-bg.png"
                alt="Talk to Our Experts"
                fill
                priority
                unoptimized
                className="object-cover object-right md:object-center"
              />

              {/* Overlay with interactive content */}
              <div className="relative md:absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 md:py-0 z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                  {/* Left Column: Heading + Subtitle + Contact Button */}
                  <div className="md:col-span-5 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-[2px] bg-[#3CD3C1]" />
                      <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#3CD3C1] uppercase">
                        {isArabic ? "هل تحتاج مساعدة؟" : "NEED HELP?"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 sm:mb-3">
                      {isArabic ? "تحدث إلى خبرائنا" : "Talk to Our Experts"}
                    </h3>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                      {isArabic
                        ? "هل لديك متطلبات أو مشروع خاص؟ فريقنا الهندسي جاهز لمساعدتك في اختيار الحل الأمثل."
                        : "Have a specific requirement? Our team is ready to assist you with the right solution."}
                    </p>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 active:scale-95 text-[#0d2438] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all duration-200 group cursor-pointer"
                    >
                      <span>{isArabic ? "تواصل معنا" : "Contact Us"}</span>
                      {isArabic ? (
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </div>

                  {/* Middle Column: Interactive Contact Channels with User's Exact SVGs */}
                  <div className="md:col-span-4 space-y-4 text-white">
                    {/* Phone */}
                    <a
                      href="tel:+971556173300"
                      className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#00b3a4]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Image
                          src="/get-a-quote/icon-phone.svg"
                          alt="Phone"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#5EEAD4] transition-colors">
                          +971 55 617 3300
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "اتصل بنا مباشرة" : "Call us directly"}
                        </span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:info@tajalrahmah.com"
                      className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#00b3a4]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Image
                          src="/get-a-quote/icon-mail.svg"
                          alt="Email"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#5EEAD4] transition-colors">
                          info@tajalrahmah.com
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "أرسل لنا بريداً إلكترونياً" : "Send us an email"}
                        </span>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-3.5 p-2">
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#00b3a4]/20 flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/get-a-quote/icon-location.svg"
                          alt="Location"
                          width={22}
                          height={26}
                          className="w-[22px] h-[26px]"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                          {isArabic ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE"}
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "المقر الرئيسي" : "Our office location"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual balance for desktop */}
                  <div className="hidden md:block md:col-span-3" />

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
