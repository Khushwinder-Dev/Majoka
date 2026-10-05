"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Layers,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import {
  InputValidationTick,
  isValidEmail,
  isValidPhone,
  isValidText,
  FormFieldError,
} from "@/components/ui/InputValidationTick";

export interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MeetingServiceOption {
  value: string;
  labelEn: string;
  labelAr: string;
}

export const MEETING_SERVICES: MeetingServiceOption[] = [
  {
    value: "waterproofing",
    labelEn: "All Types of Waterproofing",
    labelAr: "جميع أنواع العزل المائي والإنشائي",
  },
  {
    value: "swimming-pools",
    labelEn: "Swimming Pool Installation & Maintenance",
    labelAr: "إنشاء وصيانة حمامات السباحة",
  },
  {
    value: "electrical",
    labelEn: "Electrical Installations & Fit-out",
    labelAr: "التمديدات والتركيبات الكهربائية",
  },
  {
    value: "plumbing",
    labelEn: "Plumbing & Sanitary Installation Works",
    labelAr: "أعمال السباكة والتركيبات الصحية",
  },
  {
    value: "tiling",
    labelEn: "Floor & Wall Tiling Work",
    labelAr: "أعمال تركيب بلاط الأرضيات والجدران",
  },
  {
    value: "plastering",
    labelEn: "Plastering & Block Works",
    labelAr: "أعمال اللياسة والبلوك",
  },
  {
    value: "painting",
    labelEn: "Painting Contracting Services",
    labelAr: "خدمات مقاولات الدهانات",
  },
  {
    value: "false-ceilings",
    labelEn: "False Ceiling & Light Partitions Installation",
    labelAr: "تركيب الأسقف المستعارة والقواطع الخفيفة",
  },
  {
    value: "hvac",
    labelEn: "Air Conditioning, Ventilation & Air Filtration (HVAC)",
    labelAr: "التكييف والتهوية وتنعيم الهواء (HVAC)",
  },
  {
    value: "carpentry",
    labelEn: "Carpentry & Professional Wood Flooring",
    labelAr: "النجارة وتركيب الأرضيات الخشبية الفاخرة",
  },
  {
    value: "cleaning",
    labelEn: "Building Cleaning Services",
    labelAr: "خدمات نظافة المباني والتعقيم الشامل",
  },
  {
    value: "general-consultation",
    labelEn: "General Engineering & Site Consultation",
    labelAr: "استشارة هندسية عامة ومعاينة موقع",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    // 3. Phone number (optional, but validate if provided)
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
      const selectedServiceObj = MEETING_SERVICES.find((s) => s.value === formData.service);
      const serviceTitle = selectedServiceObj
        ? isArabic
          ? selectedServiceObj.labelAr
          : selectedServiceObj.labelEn
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

  const selectedServiceObj = MEETING_SERVICES.find((s) => s.value === formData.service);

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STICKY HEADER ── */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-[#E6F7F6]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
            <div className="w-11 h-11 rounded-2xl bg-white border border-[#00c2b2]/25 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Image
                src="/logo.png"
                alt="Taj Al Rahmah"
                width={36}
                height={36}
                className="w-auto h-auto max-h-7 object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#009b8e] bg-[#00c2b2]/15 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {isArabic ? "استشارة هندسية" : "Engineering Consultation"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                {isArabic ? "احجز موعداً مع خبرائنا" : "Book a Consultation Meeting"}
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-100 text-stone-600 hover:text-stone-950 border border-slate-200 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          {isSubmitted ? (
            /* Success Confirmation State */
            <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isArabic ? "تم استلام طلب الموعد بنجاح!" : "Meeting Request Received!"}
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isArabic
                    ? `شكراً لك ${formData.name}. تم تسجيل طلبك للاستفسار حول ${
                        selectedServiceObj ? selectedServiceObj.labelAr : "الخدمة المحددة"
                      }. سيتواصل معك أحد مهندسينا خلال أقرب وقت لتأكيد الموعد المناسب.`
                    : `Thank you, ${formData.name}. Your meeting request regarding ${
                        selectedServiceObj ? selectedServiceObj.labelEn : "your selected service"
                      } has been recorded. Our engineering consultant will contact you shortly to confirm the schedule.`}
                </p>
              </div>

              {/* Summary Pill */}
              <div className="bg-[#E6F7F6]/60 border border-[#00c2b2]/20 rounded-2xl p-4 text-xs sm:text-sm text-left rtl:text-right space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold text-slate-500">{isArabic ? "الاسم:" : "Client:"}</span>
                  <span className="font-bold text-stone-900">{formData.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold text-slate-500">{isArabic ? "البريد الإلكتروني:" : "Email:"}</span>
                  <span className="font-semibold text-stone-900">{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold text-slate-500">{isArabic ? "الهاتف:" : "Phone:"}</span>
                    <span className="font-semibold text-stone-900" dir="ltr">{formData.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold text-slate-500">{isArabic ? "الخدمة:" : "Service:"}</span>
                  <span className="font-bold text-[#009b8e]">
                    {selectedServiceObj
                      ? isArabic
                        ? selectedServiceObj.labelAr
                        : selectedServiceObj.labelEn
                      : formData.service}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#00c2b2] hover:bg-[#009b8e] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  {isArabic ? "حسناً، إغلاق" : "Done & Close"}
                </button>
              </div>
            </div>
          ) : (
            /* Meeting Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isArabic
                  ? "يرجى تعبئة بياناتك واختيار الخدمة التي ترغب بالاستفسار عنها وسيقوم مستشارنا الفني بتنسيق المقابلة معك."
                  : "Please provide your contact details and select the service you wish to discuss. Our engineering consultant will coordinate the meeting with you."}
              </p>

              {/* 1. Name Field (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {isArabic ? "الاسم الكامل" : "Full Name"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isArabic ? "مثال: م. أحمد الشامسي" : "e.g., John Smith"}
                    className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-sm rounded-xl border bg-white text-stone-900 transition-all outline-none focus:ring-2 focus:ring-[#00c2b2]/30 ${
                      errors.name
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#00c2b2]"
                    }`}
                  />
                  <InputValidationTick
                    isValid={isValidText(formData.name, 2)}
                    isArabic={isArabic}
                  />
                </div>
                <FormFieldError error={errors.name} />
              </div>

              {/* 2. Email Field (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={isArabic ? "name@example.com" : "name@example.com"}
                    dir="ltr"
                    className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-sm rounded-xl border bg-white text-stone-900 transition-all outline-none focus:ring-2 focus:ring-[#00c2b2]/30 ${
                      errors.email
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#00c2b2]"
                    }`}
                  />
                  <InputValidationTick
                    isValid={isValidEmail(formData.email)}
                    isArabic={isArabic}
                  />
                </div>
                <FormFieldError error={errors.email} />
              </div>

              {/* 3. Phone Number Field (OPTIONAL) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    {isArabic ? "رقم الهاتف / واتساب" : "Phone / WhatsApp Number"}
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400 lowercase">
                    ({isArabic ? "اختياري" : "optional"})
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                    dir="ltr"
                    className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-sm rounded-xl border bg-white text-stone-900 transition-all outline-none focus:ring-2 focus:ring-[#00c2b2]/30 ${
                      errors.phone
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#00c2b2]"
                    }`}
                  />
                  <InputValidationTick
                    isValid={Boolean(formData.phone.trim() && isValidPhone(formData.phone))}
                    isArabic={isArabic}
                  />
                </div>
                <FormFieldError error={errors.phone} />
              </div>

              {/* 4. Service Dropdown (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {isArabic ? "الخدمة المطلوبة للاستفسار" : "Service to Query"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-slate-400 z-10">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-sm rounded-xl border bg-white text-stone-900 transition-all outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#00c2b2]/30 ${
                      errors.service
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#00c2b2]"
                    } ${!formData.service ? "text-slate-400" : "font-medium"}`}
                  >
                    <option value="" disabled>
                      {isArabic
                        ? "— اختر الخدمة التي تود الاستفسار عنها —"
                        : "— Select a service to query —"}
                    </option>
                    {MEETING_SERVICES.map((s) => (
                      <option key={s.value} value={s.value} className="text-stone-900 py-1">
                        {isArabic ? s.labelAr : s.labelEn}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3.5 rtl:pr-0 rtl:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <FormFieldError error={errors.service} />
              </div>

              {/* 5. Preferred Schedule & Query Notes (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      {isArabic ? "التاريخ المفضل" : "Preferred Date"}
                    </label>
                    <span className="text-[10px] text-slate-400">({isArabic ? "اختياري" : "optional"})</span>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-stone-800 transition-all outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/30"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      {isArabic ? "الوقت المفضل" : "Preferred Time"}
                    </label>
                    <span className="text-[10px] text-slate-400">({isArabic ? "اختياري" : "optional"})</span>
                  </div>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-stone-800 transition-all outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/30 cursor-pointer"
                  >
                    <option value="">{isArabic ? "أي وقت مناسب" : "Any suitable time"}</option>
                    <option value="Morning (9:00 AM - 12:00 PM)">
                      {isArabic ? "صباحاً (9:00 ص - 12:00 م)" : "Morning (9:00 AM - 12:00 PM)"}
                    </option>
                    <option value="Afternoon (12:00 PM - 3:00 PM)">
                      {isArabic ? "ظهراً (12:00 م - 3:00 م)" : "Afternoon (12:00 PM - 3:00 PM)"}
                    </option>
                    <option value="Late Afternoon (3:00 PM - 6:00 PM)">
                      {isArabic ? "عصراً (3:00 م - 6:00 م)" : "Late Afternoon (3:00 PM - 6:00 PM)"}
                    </option>
                  </select>
                </div>
              </div>

              {/* 6. Query Description / Notes (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    {isArabic ? "تفاصيل إضافية عن الاستفسار" : "Query Details / Project Notes"}
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400 lowercase">
                    ({isArabic ? "اختياري" : "optional"})
                  </span>
                </div>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={
                    isArabic
                      ? "اكتب نبذة مختصرة عن موقع المشروع أو ما ترغب بمناقشته في الاجتماع..."
                      : "Briefly tell us about your project location or specific inquiry..."
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white text-stone-900 transition-all outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/30 resize-none"
                />
              </div>

              {/* ── SUBMIT BUTTON ── */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00c2b2] to-[#009b8e] hover:from-[#00d6c4] hover:to-[#00aa9c] active:scale-[0.99] text-white font-extrabold text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_18px_rgba(0,194,178,0.35)] hover:shadow-[0_6px_24px_rgba(0,194,178,0.5)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-400">
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
