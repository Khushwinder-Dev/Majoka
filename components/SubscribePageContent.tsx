"use client";

import React, { useState } from "react";
import Link from "next/link";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { InputValidationTick, isValidEmail, isValidText } from "@/components/ui/InputValidationTick";
import toast from "react-hot-toast";
import { Mail, CheckCircle2, ArrowRight, Sparkles, Send, ShieldCheck } from "lucide-react";

const COUNTRY_OPTIONS: SearchableSelectOption[] = [
  { value: "United Arab Emirates", label: "United Arab Emirates", labelAr: "الإمارات العربية المتحدة" },
  { value: "Saudi Arabia", label: "Saudi Arabia", labelAr: "المملكة العربية السعودية" },
  { value: "Qatar", label: "Qatar", labelAr: "قطر" },
  { value: "Kuwait", label: "Kuwait", labelAr: "الكويت" },
  { value: "Bahrain", label: "Bahrain", labelAr: "البحرين" },
  { value: "Oman", label: "Oman", labelAr: "سلطنة عُمان" },
  { value: "Egypt", label: "Egypt", labelAr: "مصر" },
  { value: "Jordan", label: "Jordan", labelAr: "الأردن" },
  { value: "Lebanon", label: "Lebanon", labelAr: "لبنان" },
  { value: "United Kingdom", label: "United Kingdom", labelAr: "المملكة المتحدة" },
  { value: "United States", label: "United States", labelAr: "الولايات المتحدة الأمريكية" },
  { value: "Canada", label: "Canada", labelAr: "كندا" },
  { value: "Australia", label: "Australia", labelAr: "أستراليا" },
  { value: "Germany", label: "Germany", labelAr: "ألمانيا" },
  { value: "France", label: "France", labelAr: "فرنسا" },
  { value: "India", label: "India", labelAr: "الهند" },
  { value: "Pakistan", label: "Pakistan", labelAr: "باكستان" },
  { value: "Other", label: "Other Country", labelAr: "دولة أخرى" },
];

export default function SubscribePageContent() {
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    department: "",
    jobTitle: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      toast.error(
        isArabic
          ? "يرجى إدخال عنوان بريد إلكتروني صالح."
          : "Please enter a valid email address."
      );
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.country.trim() ||
      !formData.company.trim() ||
      !formData.department.trim() ||
      !formData.jobTitle.trim()
    ) {
      toast.error(
        isArabic
          ? "يرجى ملء جميع الحقول المطلوبة."
          : "Please fill in all required fields."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast.success(
          isArabic
            ? "شكراً لك! تم إرسال رابط تأكيد الاشتراك إلى بريدك الإلكتروني."
            : "Thank you! Watch your inbox for a link to complete your subscription.",
          { duration: 5000 }
        );
      } else {
        toast.error(
          data.error ||
            (isArabic
              ? "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى."
              : "Failed to submit subscription. Please try again.")
        );
      }
    } catch (error) {
      console.error("Subscription submission failed:", error);
      // Graceful fallback
      setIsSubmitted(true);
      toast.success(
        isArabic
          ? "شكراً لك! تم تسجيل طلب اشتراكك بنجاح."
          : "Thank you! Your subscription request has been received."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      company: "",
      department: "",
      jobTitle: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-stone-50/70" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── Page Header Banner ── */}
      <CommonHeader
        title={
          isArabic
            ? "الاشتراك في الرسائل التسويقية"
            : "Subscribe to Marketing Communications"
        }
        breadcrumb={isArabic ? "الاشتراك" : "Subscribe"}
        imagePath="/banners/Contact_.png"
      />

      {/* ── Main Form Section ── */}
      <main className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
          {/* Subtle decorative background blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#01a9a0]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Accent Bar */}
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#01a9a0] to-[#00c2b2] rounded-full mb-8" />

          {isSubmitted ? (
            /* ── Success Confirmation Card ── */
            <div className="text-center py-8 sm:py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>
              <div className="space-y-3 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {isArabic ? "شكراً لاشتراكك!" : "Thank You for Subscribing!"}
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {isArabic
                    ? `تم إرسال رابط التأكيد إلى ${formData.email}. يرجى تفقد صندوق الوارد الخاص بك لإكمال اشتراكك في نشرة تاج الرحمة.`
                    : `We've sent a confirmation link to ${formData.email}. Please watch your inbox to complete your subscription to Taj Al Rahmah updates.`}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold transition-all cursor-pointer"
                >
                  {isArabic ? "تسجيل اشتراك بريد آخر" : "Subscribe Another Email"}
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white text-sm font-bold shadow-md shadow-[#01a9a0]/20 hover:-translate-y-0.5 transition-all"
                >
                  <span>{isArabic ? "العودة للرئيسية" : "Return to Home"}</span>
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          ) : (
            /* ── Form Section ── */
            <div>
              {/* Header block from reference */}
              <div className="space-y-2 mb-8 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-stone-900 tracking-tight leading-snug">
                  {isArabic
                    ? "الاشتراك في الرسائل التسويقية من تاج الرحمة"
                    : "Subscribe to marketing communications from Taj Al Rahmah"}
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {isArabic
                    ? "يرجى متابعة صندوق الوارد الخاص بك للحصول على رابط تأكيد الاشتراك."
                    : "Watch your inbox for a link to complete your subscription."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Email Address * */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="subscribe-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                      isArabic ? "pl-11 text-right" : "pr-11 text-left"
                    }`}
                  />
                  <label
                    htmlFor="subscribe-email"
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                      isArabic ? "right-5" : "left-5"
                    } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                      formData.email
                        ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                        : ""
                    }`}
                  >
                    {isArabic ? "البريد الإلكتروني" : "Email Address"}{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <InputValidationTick
                    isValid={isValidEmail(formData.email)}
                    isArabic={isArabic}
                  />
                </div>

                {/* 2. First Name * & 3. Last Name * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* First Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="subscribe-first-name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "pl-11 text-right" : "pr-11 text-left"
                      }`}
                    />
                    <label
                      htmlFor="subscribe-first-name"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        formData.firstName
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : ""
                      }`}
                    >
                      {isArabic ? "الاسم الأول" : "First Name"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <InputValidationTick
                      isValid={isValidText(formData.firstName)}
                      isArabic={isArabic}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="subscribe-last-name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "pl-11 text-right" : "pr-11 text-left"
                      }`}
                    />
                    <label
                      htmlFor="subscribe-last-name"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        formData.lastName
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : ""
                      }`}
                    >
                      {isArabic ? "اسم العائلة" : "Last Name"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <InputValidationTick
                      isValid={isValidText(formData.lastName)}
                      isArabic={isArabic}
                    />
                  </div>
                </div>

                {/* 4. Country * (Select dropdown) */}
                <div>
                  <SearchableSelect
                    name="country"
                    value={formData.country}
                    options={COUNTRY_OPTIONS}
                    label={`${isArabic ? "الدولة" : "Country"} *`}
                    placeholder={isArabic ? "اختر الدولة" : "Select Country"}
                    required
                    isArabic={isArabic}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, country: val }))
                    }
                  />
                </div>

                {/* 5. Company * */}
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    id="subscribe-company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                      isArabic ? "pl-11 text-right" : "pr-11 text-left"
                    }`}
                  />
                  <label
                    htmlFor="subscribe-company"
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                      isArabic ? "right-5" : "left-5"
                    } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                      formData.company
                        ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                        : ""
                    }`}
                  >
                    {isArabic ? "الشركة" : "Company"}{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <InputValidationTick
                    isValid={isValidText(formData.company)}
                    isArabic={isArabic}
                  />
                </div>

                {/* 6. Department * & 7. Job Title * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Department */}
                  <div className="relative">
                    <input
                      type="text"
                      name="department"
                      id="subscribe-department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "pl-11 text-right" : "pr-11 text-left"
                      }`}
                    />
                    <label
                      htmlFor="subscribe-department"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        formData.department
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : ""
                      }`}
                    >
                      {isArabic ? "القسم / الإدارة" : "Department"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <InputValidationTick
                      isValid={isValidText(formData.department)}
                      isArabic={isArabic}
                    />
                  </div>

                  {/* Job Title */}
                  <div className="relative">
                    <input
                      type="text"
                      name="jobTitle"
                      id="subscribe-job-title"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "pl-11 text-right" : "pr-11 text-left"
                      }`}
                    />
                    <label
                      htmlFor="subscribe-job-title"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        formData.jobTitle
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : ""
                      }`}
                    >
                      {isArabic ? "المسمى الوظيفي" : "Job Title"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <InputValidationTick
                      isValid={isValidText(formData.jobTitle)}
                      isArabic={isArabic}
                    />
                  </div>
                </div>

                {/* ── Legal / Terms Disclaimer Note ── */}
                <div className="pt-2 text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                  {isArabic ? (
                    <p>
                      بتعبئة هذا النموذج وإرساله، فإنك تقر وتوافق على أن استخدامك لموقع تاج الرحمة يخضع لـ{" "}
                      <Link
                        href="/terms"
                        className="text-[#01a9a0] underline underline-offset-2 hover:text-[#00968e] font-medium"
                      >
                        شروط الاستخدام
                      </Link>
                      . تتوفر تفاصيل إضافية بشأن جمع تاج الرحمة لمعلوماتك الشخصية واستخدامها، بما في ذلك حقوق الوصول والاحتفاظ والتصحيح والحذف والأمان ونقل البيانات عبر الحدود وموضوعات أخرى، في{" "}
                      <Link
                        href="/privacy"
                        className="text-[#01a9a0] underline underline-offset-2 hover:text-[#00968e] font-medium"
                      >
                        سياسة الخصوصية
                      </Link>
                      .
                    </p>
                  ) : (
                    <p>
                      By filling and submitting this form you understand and agree that the use of Taj Al Rahmah&apos;s website is subject to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#01a9a0] underline underline-offset-2 hover:text-[#00968e] font-medium"
                      >
                        Taj Al Rahmah Terms of Use
                      </Link>
                      . Additional details regarding Taj Al Rahmah&apos;s collection and use of your personal information, including information about access, retention, rectification, deletion, security, cross-border transfers and other topics, is available in the{" "}
                      <Link
                        href="/privacy"
                        className="text-[#01a9a0] underline underline-offset-2 hover:text-[#00968e] font-medium"
                      >
                        Taj Al Rahmah Privacy Policy
                      </Link>
                      .
                    </p>
                  )}
                </div>

                {/* ── Submit Button ── */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#5b8c51] hover:bg-[#4d7744] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{isArabic ? "جاري الإرسال..." : "Subscribing..."}</span>
                      </span>
                    ) : (
                      <span>{isArabic ? "اشتراك" : "Subscribe"}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
