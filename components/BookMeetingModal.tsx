"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import {
  InputValidationTick,
  isValidEmail,
  isValidPhone,
  isValidText,
  FormFieldError,
} from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

export interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions: SearchableSelectOption[] = [
  {
    value: "waterproofing",
    label: "All Types of Waterproofing",
    labelAr: "جميع أنواع العزل المائي والإنشائي",
  },
  {
    value: "swimming-pools",
    label: "Swimming Pool Installation & Maintenance",
    labelAr: "إنشاء وصيانة حمامات السباحة",
  },
  {
    value: "electrical",
    label: "Electrical Installations & Fit-out",
    labelAr: "التمديدات والتركيبات الكهربائية",
  },
  {
    value: "plumbing",
    label: "Plumbing & Sanitary Installation Works",
    labelAr: "أعمال السباكة والتركيبات الصحية",
  },
  {
    value: "tiling",
    label: "Floor & Wall Tiling Work",
    labelAr: "أعمال تركيب بلاط الأرضيات والجدران",
  },
  {
    value: "plastering",
    label: "Plastering & Block Works",
    labelAr: "أعمال اللياسة والبلوك",
  },
  {
    value: "painting",
    label: "Painting Contracting Services",
    labelAr: "خدمات مقاولات الدهانات",
  },
  {
    value: "false-ceilings",
    label: "False Ceiling & Light Partitions Installation",
    labelAr: "تركيب الأسقف المستعارة والقواطع الخفيفة",
  },
  {
    value: "hvac",
    label: "Air Conditioning, Ventilation & HVAC",
    labelAr: "التكييف والتهوية وتنعيم الهواء (HVAC)",
  },
  {
    value: "carpentry",
    label: "Carpentry & Professional Wood Flooring",
    labelAr: "النجارة وتركيب الأرضيات الخشبية الفاخرة",
  },
  {
    value: "cleaning",
    label: "Building Cleaning Services",
    labelAr: "خدمات نظافة المباني والتعقيم الشامل",
  },
  {
    value: "general-consultation",
    label: "General Engineering & Site Consultation",
    labelAr: "استشارة هندسية عامة ومعاينة موقع",
  },
];

const preferredTimeOptions: SearchableSelectOption[] = [
  {
    value: "Any suitable time",
    label: "Any suitable time",
    labelAr: "أي وقت مناسب",
  },
  {
    value: "Morning (9:00 AM - 12:00 PM)",
    label: "Morning (9:00 AM - 12:00 PM)",
    labelAr: "صباحاً (9:00 ص - 12:00 م)",
  },
  {
    value: "Afternoon (12:00 PM - 3:00 PM)",
    label: "Afternoon (12:00 PM - 3:00 PM)",
    labelAr: "ظهراً (12:00 م - 3:00 م)",
  },
  {
    value: "Late Afternoon (3:00 PM - 6:00 PM)",
    label: "Late Afternoon (3:00 PM - 6:00 PM)",
    labelAr: "عصراً (3:00 م - 6:00 م)",
  },
];

export default function BookMeetingModal({ isOpen, onClose }: BookMeetingModalProps) {
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { listeningField, toggleListening } = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setFormData((prev) => {
        let finalText = text;
        if (fieldName === "notes" && prev.notes.trim()) {
          finalText = `${prev.notes.trim()} ${text}`;
        }
        return { ...prev, [fieldName]: finalText };
      });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // 1. Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = isArabic ? "يرجى إدخال اسمك الكريم" : "Please enter your name";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = isArabic ? "الاسم قصير جداً" : "Name must be at least 2 characters";
    }

    // 2. Email validation (required)
    if (!formData.email.trim()) {
      newErrors.email = isArabic ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email address";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = isArabic ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address";
    }

    // 3. Phone number (optional, but validate if entered)
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = isArabic ? "يرجى إدخال رقم هاتف صالح" : "Please enter a valid phone number";
    }

    // 4. Service selection (required)
    if (!formData.service) {
      newErrors.service = isArabic ? "يرجى اختيار الخدمة المطلوبة للاستفسار" : "Please select a service for your meeting";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const selectedServiceObj = serviceOptions.find((s) => s.value === formData.service);
      const serviceTitle = selectedServiceObj
        ? isArabic
          ? selectedServiceObj.labelAr || selectedServiceObj.label
          : selectedServiceObj.label
        : formData.service;

      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: serviceTitle,
          meetingDate: formData.preferredDate || undefined,
          meetingTime: formData.preferredTime || undefined,
          notes: formData.notes.trim() || undefined,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success(
          isArabic
            ? "تم استلام طلب الموعد بنجاح! سيتواصل معك فريقنا قريباً."
            : "Meeting request submitted successfully! Our team will contact you shortly."
        );
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(
          errorData.error ||
            (isArabic
              ? "تعذر إرسال الطلب. يرجى المحاولة مرة أخرى."
              : "Failed to submit meeting request. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic
          ? "حدث خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقاً."
          : "Network error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = serviceOptions.find((s) => s.value === formData.service);

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Modal Card Matching Project Standard */}
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#01a9a0]/25 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="px-6 sm:px-8 py-5 border-b border-stone-200/80 bg-[#E6F7F6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
            <div className="w-11 h-11 rounded-2xl bg-white border border-[#01a9a0]/25 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Image
                src="/logo.png"
                alt="Taj Al Rahmah"
                width={36}
                height={36}
                className="w-auto h-auto max-h-7 object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-4 h-[2.5px] bg-[#01a9a0] rounded-full" />
                <span className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#01a9a0] inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isArabic ? "استشارة هندسية" : "Engineering Consultation"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-tight">
                {isArabic ? "احجز موعداً مع خبرائنا" : "Book a Consultation Meeting"}
              </h2>
            </div>
          </div>

          {/* Close Button Matching Project Style */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01a9a0]/10 hover:bg-[#008f86]/15 text-stone-700 hover:text-black border border-stone-200/80 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#01a9a0] shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
          {isSubmitted ? (
            /* Success State */
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-3.5 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="font-bold text-lg sm:text-xl text-stone-900 mb-1">
                  {isArabic ? "تم استلام طلب الموعد بنجاح!" : "Meeting Request Received!"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                  {isArabic
                    ? `شكراً لك ${formData.name}. تم تسجيل طلبك للاستفسار حول ${
                        selectedServiceObj ? selectedServiceObj.labelAr : "الخدمة المحددة"
                      }. سيتواصل معك أحد مهندسينا قريباً لتأكيد الموعد المناسب.`
                    : `Thank you, ${formData.name}. Your meeting request regarding ${
                        selectedServiceObj ? selectedServiceObj.label : "your selected service"
                      } has been registered. Our engineering consultant will get in touch with you shortly.`}
                </p>
              </div>

              {/* Summary Pill */}
              <div className="w-full max-w-sm bg-white border border-[#01a9a0]/25 rounded-2xl p-3.5 text-xs text-left rtl:text-right space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold text-stone-500">{isArabic ? "الاسم:" : "Client:"}</span>
                  <span className="font-bold text-stone-900">{formData.name}</span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold text-stone-500">{isArabic ? "البريد:" : "Email:"}</span>
                  <span className="font-semibold text-stone-900">{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="font-semibold text-stone-500">{isArabic ? "الهاتف:" : "Phone:"}</span>
                    <span className="font-semibold text-stone-900" dir="ltr">{formData.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold text-stone-500">{isArabic ? "الخدمة:" : "Service:"}</span>
                  <span className="font-bold text-[#01a9a0]">
                    {selectedServiceObj
                      ? isArabic
                        ? selectedServiceObj.labelAr || selectedServiceObj.label
                        : selectedServiceObj.label
                      : formData.service}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-xs font-semibold text-[#01a9a0] hover:underline cursor-pointer"
              >
                {isArabic ? "إغلاق النافذة" : "Close window"}
              </button>
            </div>
          ) : (
            /* Meeting Form with Project's Floating-Label & Pill Style */
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4" noValidate>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                {isArabic
                  ? "يرجى تعبئة بياناتك واختيار الخدمة التي ترغب بالاستفسار عنها وسيقوم مستشارنا الفني بتنسيق المقابلة معك."
                  : "Please provide your contact details and select the service you wish to discuss. Our engineering consultant will coordinate the meeting with you."}
              </p>

              {/* 2-Column Grid: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Full Name (Required) */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-11 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
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
                      className={`absolute bg-white px-1.5 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-4" : "left-4"
                      } ${
                        errors.name
                          ? "-top-2 text-[10.5px] font-semibold text-red-500"
                          : formData.name || listeningField === "name"
                          ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                      <InputValidationTick
                        isValid={isValidText(formData.name, 2) && !errors.name}
                        isArabic={isArabic}
                        className="!static !translate-y-0 !left-auto !right-auto"
                      />
                      <VoiceMicButton
                        isListening={listeningField === "name"}
                        onClick={() => toggleListening("name", "text")}
                        isArabic={isArabic}
                        size="sm"
                      />
                    </div>
                  </div>
                  {listeningField === "name" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  <FormFieldError error={errors.name} />
                </div>

                {/* 2. Email (Required) */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir="ltr"
                      className={`peer h-11 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
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
                      className={`absolute bg-white px-1.5 transition-all duration-200 pointer-events-none ${
                        isArabic ? "right-4" : "left-4"
                      } ${
                        errors.email
                          ? "-top-2 text-[10.5px] font-semibold text-red-500"
                          : formData.email || listeningField === "email"
                          ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                          : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                      }`}
                    >
                      {isArabic ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                      <InputValidationTick
                        isValid={isValidEmail(formData.email) && !errors.email}
                        isArabic={isArabic}
                        className="!static !translate-y-0 !left-auto !right-auto"
                      />
                      <VoiceMicButton
                        isListening={listeningField === "email"}
                        onClick={() => toggleListening("email", "email")}
                        isArabic={isArabic}
                        size="sm"
                      />
                    </div>
                  </div>
                  {listeningField === "email" && (
                    <VoiceListeningBadge isArabic={isArabic} />
                  )}
                  <FormFieldError error={errors.email} />
                </div>
              </div>

              {/* 3. Phone (Optional) */}
              <div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder=" "
                    disabled={isSubmitting}
                    dir="ltr"
                    className={`peer h-11 w-full bg-white border rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent ${
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
                    className={`absolute bg-white px-1.5 transition-all duration-200 pointer-events-none ${
                      isArabic ? "right-4" : "left-4"
                    } ${
                      errors.phone
                        ? "-top-2 text-[10.5px] font-semibold text-red-500"
                        : formData.phone || listeningField === "phone"
                        ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]"
                        : "top-1/2 -translate-y-1/2 text-xs text-stone-400 peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                    }`}
                  >
                    {isArabic ? "رقم الهاتف / واتساب (اختياري)" : "Phone / WhatsApp (Optional)"}
                  </label>
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                    <InputValidationTick
                      isValid={Boolean(formData.phone.trim() && isValidPhone(formData.phone))}
                      isArabic={isArabic}
                      className="!static !translate-y-0 !left-auto !right-auto"
                    />
                    <VoiceMicButton
                      isListening={listeningField === "phone"}
                      onClick={() => toggleListening("phone", "phone")}
                      isArabic={isArabic}
                      size="sm"
                    />
                  </div>
                </div>
                {listeningField === "phone" && (
                  <VoiceListeningBadge isArabic={isArabic} />
                )}
                <FormFieldError error={errors.phone} />
              </div>

              {/* 4. Dropdown: Service to Query (SearchableSelect Project Component) */}
              <div>
                <SearchableSelect
                  name="service"
                  value={formData.service}
                  options={serviceOptions}
                  label={isArabic ? "الخدمة المطلوبة للاستفسار" : "Service to Query"}
                  placeholder={isArabic ? "اختر الخدمة..." : "Select service..."}
                  searchPlaceholder={isArabic ? "بحث في الخدمات..." : "Search services..."}
                  required
                  disabled={isSubmitting}
                  isArabic={isArabic}
                  variant="rounded-full"
                  size="default"
                  error={errors.service}
                  hasError={Boolean(errors.service)}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, service: val }));
                    if (errors.service) setErrors((prev) => ({ ...prev, service: "" }));
                  }}
                />
              </div>

              {/* 5. Schedule Preferences: Preferred Date & Time (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date Input with Floating Label */}
                <div className="relative">
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    min={new Date().toISOString().split("T")[0]}
                    className="peer h-11 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all"
                  />
                  <label
                    className={`absolute bg-white px-1.5 -top-2 text-[10.5px] font-semibold text-stone-500 pointer-events-none ${
                      isArabic ? "right-4" : "left-4"
                    }`}
                  >
                    {isArabic ? "التاريخ المفضل (اختياري)" : "Preferred Date (Optional)"}
                  </label>
                </div>

                {/* Time Dropdown (SearchableSelect Project Component) */}
                <div>
                  <SearchableSelect
                    name="preferredTime"
                    value={formData.preferredTime}
                    options={preferredTimeOptions}
                    label={isArabic ? "الوقت المفضل (اختياري)" : "Preferred Time (Optional)"}
                    placeholder={isArabic ? "أي وقت مناسب" : "Any suitable time"}
                    searchPlaceholder={isArabic ? "بحث..." : "Search times..."}
                    disabled={isSubmitting}
                    isArabic={isArabic}
                    variant="rounded-full"
                    size="default"
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, preferredTime: val }));
                    }}
                  />
                </div>
              </div>

              {/* 6. Query Notes / Message (Optional) */}
              <div>
                <div className="relative">
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder=" "
                    disabled={isSubmitting}
                    className={`peer w-full bg-white border border-stone-300 rounded-2xl p-4 ${isArabic ? "pl-12 text-right" : "pr-12 text-left"} pt-4 text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all placeholder-transparent resize-none ${
                      listeningField === "notes"
                        ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                        : "focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                    }`}
                  />
                  <label
                    className={`absolute bg-white px-1.5 transition-all duration-200 pointer-events-none text-stone-400 ${
                      isArabic ? "right-4" : "left-4"
                    } peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                      formData.notes || listeningField === "notes" ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                    }`}
                  >
                    {isArabic ? "تفاصيل إضافية / نبذة عن المشروع (اختياري)" : "Query Details / Project Notes (Optional)"}
                  </label>
                  <div className={`absolute top-3 ${isArabic ? "left-2" : "right-2"} z-10`}>
                    <VoiceMicButton
                      isListening={listeningField === "notes"}
                      onClick={() => toggleListening("notes", "textarea")}
                      isArabic={isArabic}
                      size="sm"
                    />
                  </div>
                </div>
                {listeningField === "notes" && (
                  <VoiceListeningBadge isArabic={isArabic} />
                )}
              </div>

              {/* ── SUBMIT BUTTON ── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#01a9a0] to-[#008f86] hover:from-[#008f86] hover:to-[#01a9a0] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isArabic ? "جاري إرسال الطلب..." : "Submitting Request..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isArabic ? "تأكيد طلب حجز الموعد" : "Confirm Meeting Request"}</span>
                      {isArabic ? (
                        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-0.5">
                <p className="text-[11px] text-stone-400">
                  {isArabic
                    ? "لن يتم مشاركة بياناتك مع أي طرف ثالث • استشارة مجانية وسرية"
                    : "Your contact details are protected • Free engineering consultation"}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
