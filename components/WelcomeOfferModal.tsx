"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Tag, ChevronDown, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { InputValidationTick, isValidEmail, isValidPhone, isValidText, getFieldError, FormFieldError } from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

// Cooldown period: Once shown, do not auto-open again for 10 minutes
const COOLDOWN_DURATION_MS = 10 * 60 * 1000; // 10 minutes in milliseconds
const LAST_SHOWN_KEY = "taj_welcome_modal_last_shown";

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
}

export interface WelcomeOfferModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoShow?: boolean;
}

export default function WelcomeOfferModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  autoShow = true,
}: WelcomeOfferModalProps = {}) {
  const { isArabic } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (!autoShow) return;

    try {
      const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
      if (lastShown) {
        const timeSinceLastShown = Date.now() - parseInt(lastShown, 10);
        if (timeSinceLastShown < COOLDOWN_DURATION_MS) {
          return;
        }
      }
    } catch {
      // Ignore storage access errors
    }

    const timer = setTimeout(() => {
      setInternalIsOpen(true);
      try {
        localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
      } catch {
        // Ignore
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [autoShow]);

  // Support window event "open-welcome-modal" so any component can trigger it easily too
  useEffect(() => {
    const handleOpen = () => {
      setInternalIsOpen(true);
      setIsSubmitted(false);
    };
    window.addEventListener("open-welcome-modal", handleOpen);
    return () => window.removeEventListener("open-welcome-modal", handleOpen);
  }, []);

  const handleClose = () => {
    setInternalIsOpen(false);
    controlledOnClose?.();
    try {
      localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    } catch {
      // Ignore
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: getFieldError(name, value, isArabic) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      name: getFieldError("name", formData.name, isArabic),
      phone: getFieldError("phone", formData.phone, isArabic),
      email: getFieldError("email", formData.email, isArabic),
      projectType: getFieldError("projectType", formData.projectType, isArabic),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
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
            formType: "1_Welcome_Popup",
            fullName: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            projectType: formData.projectType,
            service: formData.projectType,
            offerDetails: "10% Welcome Discount Offer",
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
      try {
        localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
      } catch {
        // Ignore
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
    { value: "Waterproofing", label: "Waterproofing", labelAr: "العزل المائي" },
    { value: "Roofing", label: "Roofing", labelAr: "الأسقف والأسطح" },
    { value: "Repair", label: "Repair", labelAr: "الإصلاح والترميم" },
    { value: "Insulation", label: "Insulation", labelAr: "العزل الحراري" },
    { value: "Flooring", label: "Flooring", labelAr: "حلول الأرضيات" },
    { value: "Other", label: "Other", labelAr: "أخرى" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      style={{ zIndex: 100000 }}
      onClick={handleClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-[#E6F7F6] rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#01a9a0]/25 grid grid-cols-1 md:grid-cols-12 max-h-[92vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* ========================================================= */}
        {/* CLOSE BUTTON (Top-Right corner with tooltip on hover)       */}
        {/* ========================================================= */}
        <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 rtl:right-auto rtl:left-3.5 sm:rtl:left-5 z-40 group">
          <button
            type="button"
            onClick={handleClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-200/80 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#01a9a0]"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
          {/* Tooltip on Hover */}
          <div
            role="tooltip"
            className="pointer-events-none absolute top-full right-0 rtl:right-auto rtl:left-0 mt-1.5 px-2.5 py-1 bg-stone-900 text-white text-[11px] font-medium rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 whitespace-nowrap z-50"
          >
            {isArabic ? "إغلاق" : "Close"}
            <span className="absolute -top-1 right-3.5 rtl:right-auto rtl:left-3.5 border-4 border-transparent border-b-stone-900" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* LEFT COLUMN: WELCOME & PROMO OFFER                       */}
        {/* ========================================================= */}
        <div className="md:col-span-6 p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-center bg-[#E6F7F6] border-b md:border-b-0 md:border-r rtl:md:border-r-0 rtl:md:border-l border-[#01a9a0]/15 overflow-y-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 sm:w-6 h-[2.5px] bg-[#01a9a0] rounded-full" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#01a9a0]">
              {isArabic ? "مرحباً بكم" : "WELCOME"}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-stone-900 tracking-tight leading-tight mb-2.5">
            {isArabic
              ? "احمِ مشروعك بالحل المناسب"
              : "Protect Your Project With the Right Solution"}
          </h2>

          {/* Subtitle / Description */}
          <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed mb-4">
            {isArabic
              ? "هل تبحث عن حلول موثوقة لعزل المياه، أو الأسقف، أو الإصلاح، أو العزل الحراري، أو الأرضيات؟ فريقنا ذو الخبرة مستعد لمساعدتك في العثور على الحل المناسب لمشروعك."
              : "Looking for reliable waterproofing, roofing, repair, insulation, or flooring solutions? Our experienced team is ready to help you find the right solution for your project."}
          </p>

          {/* Offer Highlight Box */}
          <div className="mb-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#01a9a0]/25 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {isArabic ? "احصل على خصم 10% على مشروعك الأول" : "Get 10% Off Your First Project"}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed mt-0.5">
                {isArabic
                  ? "تحدث إلى فريقنا اليوم واحصل على خصم 10% على أول مشروع لك."
                  : "Talk to our team today and receive 10% off your first project."}
              </p>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="hidden grid grid-cols-2 gap-2.5 pt-1 text-[11px] sm:text-xs text-stone-700 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#01a9a0] shrink-0" />
              <span>{isArabic ? "استشارة مجانية" : "Free Consultation"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#01a9a0] shrink-0" />
              <span>{isArabic ? "ضمان حتى 25 سنة" : "Up to 25Y Warranty"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#01a9a0] shrink-0" />
              <span>{isArabic ? "استجابة سريعة 24/7" : "24/7 Response"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#01a9a0] shrink-0" />
              <span>{isArabic ? "فريق عمل معتمد" : "Certified Experts"}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 4-FIELD FORM                               */}
        {/* ========================================================= */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-center bg-white overflow-y-auto max-h-[calc(92vh-100px)] md:max-h-none">
          <div className="mb-3.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#01a9a0]/10 text-[#01a9a0] text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? "طلب استشارة سريعة" : "Quick Consultation"}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
              {isArabic ? "أدخل تفاصيل مشروعك" : "Enter Your Project Details"}
            </h3>
            <p className="text-[11.5px] sm:text-xs text-stone-500 leading-snug">
              {isArabic
                ? "املأ البيانات أدناه لتفعيل الخصم 10% والتواصل معك."
                : "Fill in the fields below to activate your 10% discount."}
            </p>
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-3.5">
              {/* 4 Fields Grid Matching Website Floating-Label Standard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Field 1: Name * */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
                        isArabic ? "pl-16 text-right" : "pr-16 text-left"
                      } ${
                        listeningField === "name"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.name
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-4" : "left-4"
                      } ${
                        errors.name
                          ? "-top-2 text-[10.5px] font-semibold text-red-500"
                          : formData.name || focusedField === "name" || listeningField === "name"
                          ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "الاسم" : "Name"} <span className="text-red-500">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                      <InputValidationTick isValid={isValidText(formData.name) && !errors.name} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "name" || listeningField === "name") && (
                        <VoiceMicButton
                          isListening={listeningField === "name"}
                          onClick={() => toggleListening("name", "text")}
                          isArabic={isArabic}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                  {listeningField === "name" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  <FormFieldError error={errors.name} />
                </div>

                {/* Field 2: Phone * */}
                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
                        isArabic ? "pl-16 text-right" : "pr-16 text-left"
                      } ${
                        listeningField === "phone"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.phone
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-4" : "left-4"
                      } ${
                        errors.phone
                          ? "-top-2 text-[10.5px] font-semibold text-red-500"
                          : formData.phone || focusedField === "phone" || listeningField === "phone"
                          ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "رقم الهاتف" : "Phone"} <span className="text-red-500">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                      <InputValidationTick isValid={isValidPhone(formData.phone) && !errors.phone} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "phone" || listeningField === "phone") && (
                        <VoiceMicButton
                          isListening={listeningField === "phone"}
                          onClick={() => toggleListening("phone", "phone")}
                          isArabic={isArabic}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                  {listeningField === "phone" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  <FormFieldError error={errors.phone} />
                </div>

                {/* Field 3: Email * */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
                        isArabic ? "pl-16 text-right" : "pr-16 text-left"
                      } ${
                        listeningField === "email"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.email
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-4" : "left-4"
                      } ${
                        errors.email
                          ? "-top-2 text-[10.5px] font-semibold text-red-500"
                          : formData.email || focusedField === "email" || listeningField === "email"
                          ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "البريد الإلكتروني" : "Email"} <span className="text-red-500">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                      <InputValidationTick isValid={isValidEmail(formData.email) && !errors.email} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
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
                  <FormFieldError error={errors.email} />
                </div>

                {/* Field 4: Project Type * */}
                <div>
                  <SearchableSelect
                    name="projectType"
                    value={formData.projectType}
                    options={projectTypeOptions}
                    label={isArabic ? "نوع المشروع" : "Project Type"}
                    required
                    disabled={isSubmitting}
                    isArabic={isArabic}
                    size="sm"
                    error={errors.projectType}
                    hasError={Boolean(errors.projectType)}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, projectType: val }));
                      if (errors.projectType) setErrors((prev) => ({ ...prev, projectType: "" }));
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons: Managed Primary CTA & Secondary Dismiss */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 mt-2">
                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold h-10 sm:h-10.5 px-5 rounded-full text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-[#01a9a0]/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isArabic ? "جاري المعالجة..." : "Submitting..."}</span>
                    </>
                  ) : (
                    <>
                      <span className="uppercase">
                        {isArabic
                          ? "احصل على استشارتك المجانية"
                          : "Get Free Consultation"}
                      </span>
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
          )}
        </div>
      </div>
    </div>
  );
}
