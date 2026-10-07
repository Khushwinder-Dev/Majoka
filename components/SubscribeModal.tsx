"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  X,
  Mail,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
  Building2,
  User,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { InputValidationTick, isValidEmail, isValidText } from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

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

export interface SubscribeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SubscribeModalContent({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: SubscribeModalProps) {
  const { isArabic } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    department: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { listeningField, toggleListening } = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setFormData((prev) => ({ ...prev, [fieldName]: text }));
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  // Check URL query param `?subscribe=open` or `?subscribe=true`
  useEffect(() => {
    const subParam = searchParams.get("subscribe");
    if (subParam === "open" || subParam === "true" || subParam === "1") {
      setInternalIsOpen(true);
    }
  }, [searchParams]);

  // Support window event "open-subscribe-modal"
  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
      setIsSubmitted(false);
    };
    window.addEventListener("open-subscribe-modal", handleOpen);
    return () => window.removeEventListener("open-subscribe-modal", handleOpen);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const handleClose = () => {
    setInternalIsOpen(false);
    controlledOnClose?.();

    // Clean up query param if present
    if (searchParams.get("subscribe")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("subscribe");
      router.replace(url.pathname + (url.search ? url.search : ""), { scroll: false });
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) {
          return isArabic
            ? "البريد الإلكتروني مطلوب."
            : "Email address is required.";
        }
        if (!isValidEmail(trimmed)) {
          return isArabic
            ? "عنوان البريد الإلكتروني غير صالح."
            : "Please enter a valid email address.";
        }
        return "";
      }
      case "firstName":
        return !value.trim()
          ? isArabic
            ? "الاسم الأول مطلوب."
            : "First name is required."
          : "";
      case "lastName":
        return !value.trim()
          ? isArabic
            ? "اسم العائلة مطلوب."
            : "Last name is required."
          : "";
      case "country":
        return !value.trim()
          ? isArabic
            ? "يرجى اختيار الدولة."
            : "Please select a country."
          : "";
      case "company":
        return !value.trim()
          ? isArabic
            ? "اسم الشركة مطلوب."
            : "Company name is required."
          : "";
      case "department":
        return !value.trim()
          ? isArabic
            ? "القسم / الإدارة مطلوب."
            : "Department is required."
          : "";
      case "jobTitle":
        return !value.trim()
          ? isArabic
            ? "المسمى الوظيفي مطلوب."
            : "Job title is required."
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleCountryChange = (val: string) => {
    setFormData((prev) => ({ ...prev, country: val }));
    if (errors.country) {
      setErrors((prev) => ({
        ...prev,
        country: val ? "" : (isArabic ? "يرجى اختيار الدولة." : "Please select a country."),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      email: validateField("email", formData.email),
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      country: validateField("country", formData.country),
      company: validateField("company", formData.company),
      department: validateField("department", formData.department),
      jobTitle: validateField("jobTitle", formData.jobTitle),
    };

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors).find((k) => newErrors[k]);
      if (firstErrorField) {
        const el = document.getElementById(`sub-modal-${firstErrorField}`);
        el?.focus();
      }
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
            ? "شكراً لك! تم تسجيل طلب اشتراكك بنجاح."
            : "Thank you! Your subscription request has been received.",
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
    setErrors({});
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      style={{ zIndex: 100000 }}
      dir={isArabic ? "rtl" : "ltr"}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-stone-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top Glow Accent Bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#009e90] via-[#01a9a0] to-[#00c2b2]" />

        {/* ── Close Button ── */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 w-9 h-9 rounded-full bg-stone-100/80 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label={isArabic ? "إغلاق" : "Close"}
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* ── Scrollable Body ── */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-200">
          {isSubmitted ? (
            /* ── Success State ── */
            <div className="text-center py-6 sm:py-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {isArabic ? "شكراً لاشتراكك!" : "Thank You for Subscribing!"}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {isArabic
                    ? `تم تسجيل البريد الإلكتروني ${formData.email} بنجاح. ستصلك أحدث التحديثات والرؤى الهندسية مباشرة.`
                    : `We've registered ${formData.email}. You'll now receive technical insights, case studies, and engineering updates directly.`}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  {isArabic ? "تسجيل بريد آخر" : "Subscribe Another Email"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#01a9a0]/20 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <span>{isArabic ? "إغلاق النافذة" : "Done"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          ) : (
            /* ── Form View ── */
            <div>
              {/* Header */}
              <div className="space-y-2 mb-6 sm:mb-8 pe-8 rtl:pe-0 rtl:ps-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#01a9a0]/10 text-[#01a9a0] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#01a9a0]" />
                  <span>{isArabic ? "النشرة الإخبارية والتحديثات" : "Taj Al Rahmah Updates"}</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-stone-900 tracking-tight leading-snug">
                  {isArabic
                    ? "الاشتراك في الرسائل التسويقية والفنية"
                    : "Subscribe to Marketing Communications"}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isArabic
                    ? "انضم إلى نشرتنا للاطلاع على أحدث الحلول والتقنيات الهندسية وأخبار المشاريع الميدانية."
                    : "Join our network to receive technical project case studies, material insights, and UAE industry news."}
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* 1. Email Address * */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="sub-modal-email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      dir="ltr"
                      className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                        isArabic ? "pl-16 text-right" : "pr-16 text-left"
                      } ${
                        listeningField === "email"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.email
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      htmlFor="sub-modal-email"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-5" : "left-5"
                      } ${
                        errors.email
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                          : formData.email || focusedField === "email" || listeningField === "email"
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                      <InputValidationTick
                        isValid={isValidEmail(formData.email) && !errors.email}
                        isArabic={isArabic}
                        className="!static !translate-y-0 !left-auto !right-auto"
                      />
                      {(focusedField === "email" || listeningField === "email") && (
                        <VoiceMicButton
                          isListening={listeningField === "email"}
                          onClick={() => toggleListening("email", "email")}
                          isArabic={isArabic}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                  {listeningField === "email" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 2. First Name * & 3. Last Name * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* First Name */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        id="sub-modal-firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                          isArabic ? "pl-16 text-right" : "pr-16 text-left"
                        } ${
                          listeningField === "firstName"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.firstName
                            ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                            : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        htmlFor="sub-modal-firstName"
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-5" : "left-5"
                        } ${
                          errors.firstName
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                            : formData.firstName || focusedField === "firstName" || listeningField === "firstName"
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                            : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "الاسم الأول" : "First Name"}{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.firstName) && !errors.firstName}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {(focusedField === "firstName" || listeningField === "firstName") && (
                          <VoiceMicButton
                            isListening={listeningField === "firstName"}
                            onClick={() => toggleListening("firstName", "text")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "firstName" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        id="sub-modal-lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                          isArabic ? "pl-16 text-right" : "pr-16 text-left"
                        } ${
                          listeningField === "lastName"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.lastName
                            ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                            : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        htmlFor="sub-modal-lastName"
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-5" : "left-5"
                        } ${
                          errors.lastName
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                            : formData.lastName || focusedField === "lastName" || listeningField === "lastName"
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                            : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "اسم العائلة" : "Last Name"}{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.lastName) && !errors.lastName}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {(focusedField === "lastName" || listeningField === "lastName") && (
                          <VoiceMicButton
                            isListening={listeningField === "lastName"}
                            onClick={() => toggleListening("lastName", "text")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "lastName" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Country * */}
                <div id="sub-modal-country">
                  <SearchableSelect
                    name="country"
                    value={formData.country}
                    options={COUNTRY_OPTIONS}
                    label={`${isArabic ? "الدولة" : "Country"} *`}
                    placeholder={isArabic ? "اختر الدولة" : "Select Country"}
                    required
                    isArabic={isArabic}
                    error={errors.country}
                    onChange={handleCountryChange}
                  />
                </div>

                {/* 5. Company * */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      id="sub-modal-company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                        isArabic ? "pl-16 text-right" : "pr-16 text-left"
                      } ${
                        listeningField === "company"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.company
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      htmlFor="sub-modal-company"
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-5" : "left-5"
                      } ${
                        errors.company
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                          : formData.company || focusedField === "company" || listeningField === "company"
                          ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "الشركة" : "Company"}{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                      <InputValidationTick
                        isValid={isValidText(formData.company) && !errors.company}
                        isArabic={isArabic}
                        className="!static !translate-y-0 !left-auto !right-auto"
                      />
                      {(focusedField === "company" || listeningField === "company") && (
                        <VoiceMicButton
                          isListening={listeningField === "company"}
                          onClick={() => toggleListening("company", "text")}
                          isArabic={isArabic}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                  {listeningField === "company" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  {errors.company && (
                    <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* 6. Department * & 7. Job Title * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Department */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="department"
                        id="sub-modal-department"
                        value={formData.department}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("department")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                          isArabic ? "pl-16 text-right" : "pr-16 text-left"
                        } ${
                          listeningField === "department"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.department
                            ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                            : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        htmlFor="sub-modal-department"
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-5" : "left-5"
                        } ${
                          errors.department
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                            : formData.department || focusedField === "department" || listeningField === "department"
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                            : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "القسم / الإدارة" : "Department"}{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.department) && !errors.department}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {(focusedField === "department" || listeningField === "department") && (
                          <VoiceMicButton
                            isListening={listeningField === "department"}
                            onClick={() => toggleListening("department", "text")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "department" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    {errors.department && (
                      <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                        {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="jobTitle"
                        id="sub-modal-jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("jobTitle")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm focus:outline-none transition-all placeholder-transparent ${
                          isArabic ? "pl-16 text-right" : "pr-16 text-left"
                        } ${
                          listeningField === "jobTitle"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.jobTitle
                            ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500"
                            : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        htmlFor="sub-modal-jobTitle"
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-5" : "left-5"
                        } ${
                          errors.jobTitle
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                            : formData.jobTitle || focusedField === "jobTitle" || listeningField === "jobTitle"
                            ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                            : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "المسمى الوظيفي" : "Job Title"}{" "}
                        <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.jobTitle) && !errors.jobTitle}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {(focusedField === "jobTitle" || listeningField === "jobTitle") && (
                          <VoiceMicButton
                            isListening={listeningField === "jobTitle"}
                            onClick={() => toggleListening("jobTitle", "text")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "jobTitle" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    {errors.jobTitle && (
                      <p className="text-xs text-red-500 mt-1 px-4 font-normal text-start">
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Terms / Privacy Note ── */}
                <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed pt-1">
                  {isArabic ? (
                    <>
                      بالضغط على اشتراك، فإنك توافق على{" "}
                      <Link href="/terms" className="text-[#01a9a0] underline underline-offset-2 hover:text-[#008c80]">
                        شروط الاستخدام
                      </Link>{" "}
                      و
                      <Link href="/privacy" className="text-[#01a9a0] underline underline-offset-2 hover:text-[#008c80]">
                        سياسة الخصوصية
                      </Link>
                      .
                    </>
                  ) : (
                    <>
                      By submitting, you agree to our{" "}
                      <Link href="/terms" className="text-[#01a9a0] underline underline-offset-2 hover:text-[#008c80]">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#01a9a0] underline underline-offset-2 hover:text-[#008c80]">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </p>

                {/* ── Submit Action ── */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    {isArabic ? "إلغاء" : "Cancel"}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#01a9a0] to-[#009e90] hover:from-[#00968e] hover:to-[#008c80] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#01a9a0]/25 hover:shadow-lg hover:shadow-[#01a9a0]/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isArabic ? "جاري الإرسال..." : "Subscribing..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isArabic ? "اشتراك" : "Subscribe"}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubscribeModal(props: SubscribeModalProps) {
  return (
    <Suspense fallback={null}>
      <SubscribeModalContent {...props} />
    </Suspense>
  );
}
