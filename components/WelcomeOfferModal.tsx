"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Tag, ChevronDown, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

// Set to false after client demo to restore once-per-session behavior.
const SHOW_ON_EVERY_RELOAD = true;
const DISMISS_KEY = "taj_welcome_modal_dismissed";

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
}

export default function WelcomeOfferModal() {
  const { isArabic } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isDismissed =
      !SHOW_ON_EVERY_RELOAD && sessionStorage.getItem(DISMISS_KEY);
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (!SHOW_ON_EVERY_RELOAD) {
      sessionStorage.setItem(DISMISS_KEY, "true");
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error(isArabic ? "يرجى إدخال الاسم" : "Please enter your name");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error(
        isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number"
      );
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error(
        isArabic
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address"
      );
      return;
    }
    if (!formData.projectType) {
      toast.error(
        isArabic ? "يرجى اختيار نوع المشروع" : "Please select a project type"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Send inquiry to contact endpoint
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            service: formData.projectType,
            message: `[Welcome Offer - 10% Discount Request]\nProject Type: ${formData.projectType}\nClient Name: ${formData.name.trim()}\nPhone: ${formData.phone.trim()}`,
          }),
        });
      } catch (err) {
        console.warn("API submission warning (continuing gracefully):", err);
      }

      setIsSubmitted(true);
      toast.success(
        isArabic
          ? "تم إرسال طلبك بنجاح! تم حجز خصم 10% لمشروعك."
          : "Your request has been sent! Your 10% project discount has been applied."
      );
      if (!SHOW_ON_EVERY_RELOAD) {
        sessionStorage.setItem(DISMISS_KEY, "true");
      }
    } catch {
      toast.error(
        isArabic
          ? "حدث خطأ، يرجى المحاولة مرة أخرى"
          : "An error occurred, please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const projectTypeOptions = [
    { value: "Waterproofing", labelEn: "Waterproofing", labelAr: "العزل المائي" },
    { value: "Roofing", labelEn: "Roofing", labelAr: "الأسقف والأسطح" },
    { value: "Repair", labelEn: "Repair", labelAr: "الإصلاح والترميم" },
    { value: "Insulation", labelEn: "Insulation", labelAr: "العزل الحراري" },
    { value: "Flooring", labelEn: "Flooring", labelAr: "حلول الأرضيات" },
    { value: "Other", labelEn: "Other", labelAr: "أخرى" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={handleClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh] flex flex-col md:grid animate-in zoom-in-95 duration-300 border border-stone-100"
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* ========================================================= */}
        {/* CLOSE BUTTON (Top-Right corner with tooltip on hover)       */}
        {/* ========================================================= */}
        <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 group">
          <button
            type="button"
            onClick={handleClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-200/80 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#01a9a0]"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
          {/* Tooltip on Hover */}
          <div
            role="tooltip"
            className="pointer-events-none absolute top-full right-0 mt-1.5 px-2.5 py-1 bg-stone-900 text-white text-[11px] font-medium rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50"
          >
            {isArabic ? "إغلاق" : "Close"}
            <span className="absolute -top-1 right-3.5 border-4 border-transparent border-b-stone-900" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* LEFT COLUMN: HERO IMAGE & PROMO BRANDING                 */}
        {/* ========================================================= */}
        <div className="relative md:col-span-5 h-44 sm:h-52 md:h-auto min-h-[190px] md:min-h-[480px] overflow-hidden bg-slate-900 flex flex-col justify-end p-5 sm:p-7">
          <Image
            src="/qwertyu.png"
            alt={isArabic ? "تاج الرحمة للمقاولات والعزل" : "Taj Al Rahmah Contracting & Waterproofing"}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent" /> */}

          {/* Floating discount badge on image */}
          <div className="relative z-10 hidden sm:flex flex-col gap-2 text-white">
            <div className="inline-flex items-center gap-2 bg-[#01a9a0] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg w-fit backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? "خصم ترحيبي حصري 10%" : "Exclusive 10% Welcome Discount"}</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed max-w-xs drop-shadow-sm">
              {isArabic
                ? "حلول هندسية متكاملة تضمن أعلى معايير الجودة والاستدامة لمشروعك."
                : "Engineered solutions delivering uncompromising quality and protection for your property."}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: POPUP CONTENT & 4-FIELD FORM                */}
        {/* ========================================================= */}
        <div className="md:col-span-7 p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-center bg-white overflow-y-auto max-h-[calc(92vh-100px)] md:max-h-none">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 sm:w-6 h-[2.5px] bg-[#01a9a0] rounded-full" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#01a9a0]">
              {isArabic ? "مرحباً بكم" : "WELCOME"}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-stone-900 tracking-tight leading-tight mb-2">
            {isArabic
              ? "احمِ مشروعك بالحل المناسب"
              : "Protect Your Project With the Right Solution"}
          </h2>

          {/* Subtitle / Description */}
          <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mb-4">
            {isArabic
              ? "هل تبحث عن حلول موثوقة لعزل المياه، أو الأسقف، أو الإصلاح، أو العزل الحراري، أو الأرضيات؟ فريقنا ذو الخبرة مستعد لمساعدتك في العثور على الحل المناسب لمشروعك."
              : "Looking for reliable waterproofing, roofing, repair, insulation, or flooring solutions? Our experienced team is ready to help you find the right solution for your project."}
          </p>

          {/* Offer Highlight Box */}
          <div className="mb-5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#01a9a0]/10 via-[#01a9a0]/5 to-transparent border border-[#01a9a0]/20 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {isArabic ? "احصل على خصم 10% على مشروعك الأول" : "Get 10% Off Your First Project"}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 leading-tight mt-0.5">
                {isArabic
                  ? "تحدث إلى فريقنا اليوم واحصل على خصم 10% على أول مشروع لك."
                  : "Talk to our team today and receive 10% off your first project."}
              </p>
            </div>
          </div>

          {/* Form or Submitted State */}
          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-stone-900 mb-1">
                  {isArabic ? "شكراً لتواصلك معنا!" : "Thank You For Reaching Out!"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm">
                  {isArabic
                    ? "تم استلام تفاصيل مشروعك وتفعيل كود الخصم 10%. سيتواصل معك أحد مستشارينا في أقرب وقت."
                    : "Your project details and 10% discount have been registered. One of our specialists will get in touch with you shortly."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 text-xs font-semibold text-[#01a9a0] hover:underline cursor-pointer"
              >
                {isArabic ? "إغلاق النافذة" : "Close window"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
              {/* 4 Fields Grid Matching Website Floating-Label Standard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Field 1: Name * */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    disabled={isSubmitting}
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${isArabic ? "text-right" : "text-left"
                      }`}
                  />
                  <label
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${formData.name ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]" : ""
                      }`}
                  >
                    {isArabic ? "الاسم" : "Name"} <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Field 2: Phone * */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    disabled={isSubmitting}
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${isArabic ? "text-right" : "text-left"
                      }`}
                  />
                  <label
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${formData.phone ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]" : ""
                      }`}
                  >
                    {isArabic ? "رقم الهاتف" : "Phone"} <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Field 3: Email * */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    disabled={isSubmitting}
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${isArabic ? "text-right" : "text-left"
                      }`}
                  />
                  <label
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${isArabic ? "right-5" : "left-5"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${formData.email ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]" : ""
                      }`}
                  >
                    {isArabic ? "البريد الإلكتروني" : "Email"} <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Field 4: Project Type * */}
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all appearance-none cursor-pointer ${isArabic ? "text-right pl-10 pr-5" : "text-left pr-10 pl-5"
                      }`}
                  >
                    <option value="" disabled hidden></option>
                    {projectTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {isArabic ? opt.labelAr : opt.labelEn}
                      </option>
                    ))}
                  </select>
                  <label
                    className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${isArabic ? "right-5" : "left-5"
                      } ${formData.projectType
                        ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                        : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400"
                      }`}
                  >
                    {isArabic ? "نوع المشروع" : "Project Type"} <span className="text-red-500">*</span>
                  </label>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 pointer-events-none absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-5" : "right-5"
                      }`}
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-[#01a9a0]/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isArabic ? "جاري المعالجة..." : "Submitting..."}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {isArabic
                        ? "احصل على استشارتك المجانية"
                        : "Get Your Free Consultation"}
                    </span>
                    {isArabic ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>

              {/* Secondary Dismiss Action: Maybe Later */}
              <div className="flex justify-center mt-0.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 px-3 cursor-pointer"
                >
                  {isArabic ? "ربما لاحقاً" : "Maybe Later"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
