"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, UserCheck, Mail, PhoneCall, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";

export type ContactModalType = "expert" | "enquiry" | "callback" | "supplier" | null;

const serviceTypeOptions: SearchableSelectOption[] = [
  { value: "Waterproofing", label: "Waterproofing", labelAr: "العزل المائي" },
  { value: "Roofing", label: "Roofing", labelAr: "الأسقف والأسطح" },
  { value: "Epoxy & Protective Coatings", label: "Epoxy & Protective Coatings", labelAr: "طلاء الإيبوكسي والطلاء الواقي" },
  { value: "Polyurea", label: "Polyurea", labelAr: "عزل البولي يوريا" },
  { value: "Injection Works", label: "Injection Works", labelAr: "أعمال الحقن المائي" },
  { value: "GRP / Fiberglass", label: "GRP / Fiberglass", labelAr: "عزل GRP والألياف الزجاجية" },
  { value: "Other", label: "Other", labelAr: "أخرى" },
];

const preferredTimeOptions: SearchableSelectOption[] = [
  { value: "As soon as possible", label: "As soon as possible", labelAr: "في أقرب وقت ممكن" },
  { value: "Morning (9 AM - 12 PM)", label: "Morning (9 AM - 12 PM)", labelAr: "صباحاً (9 ص - 12 م)" },
  { value: "Afternoon (12 PM - 4 PM)", label: "Afternoon (12 PM - 4 PM)", labelAr: "ظهراً (12 م - 4 م)" },
  { value: "Evening (4 PM - 8 PM)", label: "Evening (4 PM - 8 PM)", labelAr: "مساءً (4 م - 8 م)" },
];

const callbackReasonOptions: SearchableSelectOption[] = [
  { value: "General Enquiry", label: "General Enquiry", labelAr: "استفسار عام" },
  { value: "Project Enquiry", label: "Project Enquiry", labelAr: "استفسار عن مشروع" },
  { value: "Service Information", label: "Service Information", labelAr: "معلومات عن الخدمات" },
  { value: "Existing Project", label: "Existing Project", labelAr: "مشروع قائم" },
  { value: "Other", label: "Other", labelAr: "أخرى" },
];

const supplierCategoryOptions: SearchableSelectOption[] = [
  { value: "Building Materials", label: "Building Materials", labelAr: "مواد البناء" },
  { value: "Waterproofing Materials", label: "Waterproofing Materials", labelAr: "مواد العزل المائي" },
  { value: "Roofing Materials", label: "Roofing Materials", labelAr: "مواد الأسقف" },
  { value: "Chemicals & Coatings", label: "Chemicals & Coatings", labelAr: "الكيماويات والطلاء" },
  { value: "Tools & Equipment", label: "Tools & Equipment", labelAr: "الأدوات والمعدات" },
  { value: "Safety & PPE", label: "Safety & PPE", labelAr: "معدات السلامة والوقاية" },
  { value: "Subcontracting Services", label: "Subcontracting Services", labelAr: "خدمات مقاولات الباطن" },
  { value: "Other", label: "Other", labelAr: "أخرى" },
];

interface ContactModalsProps {
  activeModal: ContactModalType;
  onClose: () => void;
}

export default function ContactModals({ activeModal, onClose }: ContactModalsProps) {
  const { isArabic } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  // 1. Talk to an Expert
  const [expertForm, setExpertForm] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    serviceType: "Waterproofing",
    requirement: "",
  });

  // 2. Send an Enquiry
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    subject: "",
    enquiry: "",
  });

  // 3. Request a Callback
  const [callbackForm, setCallbackForm] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    preferredTime: "As soon as possible",
    reason: "General Enquiry",
  });

  // 4. Supplier Enquiries
  const [supplierForm, setSupplierForm] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    category: "Building Materials",
    website: "",
    enquiry: "",
  });

  // Reset success state whenever modal type changes or closes
  useEffect(() => {
    setIsSuccess(false);
    setIsSubmitting(false);
  }, [activeModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  if (!activeModal) return null;

  /* ── Submit handler for Talk to an Expert ── */
  const handleExpertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertForm.fullName.trim()) {
      toast.error(isArabic ? "يرجى إدخال الاسم الكامل" : "Please enter your full name");
      return;
    }
    if (!expertForm.phone.trim()) {
      toast.error(isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number");
      return;
    }
    if (!expertForm.serviceType) {
      toast.error(isArabic ? "يرجى اختيار نوع الخدمة" : "Please select a service type");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: expertForm.fullName.trim(),
          phone: expertForm.phone.trim(),
          email: expertForm.email.trim() || "expert-consultation@tajalrahmah.ae",
          service: expertForm.serviceType,
          message: `[Talk to an Expert - Consultation Request]\nFull Name: ${expertForm.fullName.trim()}\nCompany Name: ${expertForm.companyName.trim() || "N/A"}\nPhone: ${expertForm.phone.trim()}\nEmail: ${expertForm.email.trim() || "N/A"}\nService Type: ${expertForm.serviceType}\nRequirement: ${expertForm.requirement.trim() || "N/A"}`,
        }),
      });

      setIsSuccess(true);
      toast.success(isArabic ? "تم إرسال طلب الاستشارة بنجاح!" : "Consultation request sent successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      toast.error(isArabic ? "حدث خطأ، يرجى المحاولة لاحقاً" : "An error occurred, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit handler for Send an Enquiry ── */
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.fullName.trim()) {
      toast.error(isArabic ? "يرجى إدخال الاسم الكامل" : "Please enter your full name");
      return;
    }
    if (!enquiryForm.phone.trim()) {
      toast.error(isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number");
      return;
    }
    if (!enquiryForm.subject.trim()) {
      toast.error(isArabic ? "يرجى إدخال الموضوع" : "Please enter a subject");
      return;
    }
    if (!enquiryForm.enquiry.trim()) {
      toast.error(isArabic ? "يرجى كتابة استفسارك" : "Please enter your enquiry");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: enquiryForm.fullName.trim(),
          phone: enquiryForm.phone.trim(),
          email: enquiryForm.email.trim() || "general-enquiry@tajalrahmah.ae",
          service: enquiryForm.subject,
          message: `[Send an Enquiry - General Enquiry]\nFull Name: ${enquiryForm.fullName.trim()}\nCompany Name: ${enquiryForm.companyName.trim() || "N/A"}\nPhone: ${enquiryForm.phone.trim()}\nEmail: ${enquiryForm.email.trim() || "N/A"}\nSubject: ${enquiryForm.subject.trim()}\nEnquiry:\n${enquiryForm.enquiry.trim()}`,
        }),
      });

      setIsSuccess(true);
      toast.success(isArabic ? "تم إرسال استفسارك بنجاح!" : "Enquiry submitted successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      toast.error(isArabic ? "حدث خطأ، يرجى المحاولة لاحقاً" : "An error occurred, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit handler for Request a Callback ── */
  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackForm.fullName.trim()) {
      toast.error(isArabic ? "يرجى إدخال الاسم الكامل" : "Please enter your full name");
      return;
    }
    if (!callbackForm.phone.trim()) {
      toast.error(isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: callbackForm.fullName.trim(),
          phone: callbackForm.phone.trim(),
          email: "callback-request@tajalrahmah.ae",
          service: callbackForm.reason,
          message: `[Request a Callback]\nFull Name: ${callbackForm.fullName.trim()}\nCompany Name: ${callbackForm.companyName.trim() || "N/A"}\nPhone: ${callbackForm.phone.trim()}\nPreferred Call Time: ${callbackForm.preferredTime}\nReason for Callback: ${callbackForm.reason}`,
        }),
      });

      setIsSuccess(true);
      toast.success(isArabic ? "تم استلام طلب الاتصال بنجاح!" : "Callback request received successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      toast.error(isArabic ? "حدث خطأ، يرجى المحاولة لاحقاً" : "An error occurred, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit handler for Supplier Enquiries ── */
  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierForm.companyName.trim()) {
      toast.error(isArabic ? "يرجى إدخال اسم الشركة" : "Please enter company name");
      return;
    }
    if (!supplierForm.contactPerson.trim()) {
      toast.error(isArabic ? "يرجى إدخال اسم الشخص المسؤول" : "Please enter contact person name");
      return;
    }
    if (!supplierForm.phone.trim()) {
      toast.error(isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter phone number");
      return;
    }
    if (!supplierForm.email.trim() || !supplierForm.email.includes("@")) {
      toast.error(isArabic ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address");
      return;
    }
    if (!supplierForm.enquiry.trim()) {
      toast.error(isArabic ? "يرجى كتابة تفاصيل الاستفسار" : "Please enter your enquiry details");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${supplierForm.contactPerson.trim()} (${supplierForm.companyName.trim()})`,
          phone: supplierForm.phone.trim(),
          email: supplierForm.email.trim(),
          service: `Supplier: ${supplierForm.category}`,
          message: `[Supplier Enquiry]\nCompany Name: ${supplierForm.companyName.trim()}\nContact Person: ${supplierForm.contactPerson.trim()}\nPhone: ${supplierForm.phone.trim()}\nEmail: ${supplierForm.email.trim()}\nSupplier Category: ${supplierForm.category}\nCompany Website: ${supplierForm.website.trim() || "N/A"}\nEnquiry Details:\n${supplierForm.enquiry.trim()}`,
        }),
      });

      setIsSuccess(true);
      toast.success(isArabic ? "تم استلام استفسار المورد بنجاح!" : "Supplier enquiry submitted successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      toast.error(isArabic ? "حدث خطأ، يرجى المحاولة لاحقاً" : "An error occurred, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-white rounded-2xl sm:rounded-[28px] shadow-2xl border border-stone-200/80 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 ${
          activeModal === "callback" ? "max-w-[490px]" : "max-w-[560px]"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* ========================================================= */}
        {/* CLOSE BUTTON (Matching WelcomePopup standard)             */}
        {/* ========================================================= */}
        <div className={`absolute top-3.5 sm:top-4.5 ${isArabic ? "left-3.5 sm:left-4.5" : "right-3.5 sm:right-4.5"} z-40 group`}>
          <button
            type="button"
            onClick={onClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01a9a0]/10 hover:bg-[#008f86]/10 text-stone-700 hover:text-black border border-stone-200/80 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#01a9a0]"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
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

        {/* Success View */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#009e90]/15 text-[#009e90] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              {isArabic ? "تم الإرسال بنجاح!" : "Thank You!"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mb-6 leading-relaxed">
              {isArabic
                ? "تم استلام طلبك بنجاح وسيقوم فريقنا بالتواصل معك في أقرب وقت."
                : "Your request has been received. Our team will get back to you shortly."}
            </p>
            <button
              onClick={onClose}
              className="bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-full transition-all cursor-pointer"
            >
              {isArabic ? "إغلاق" : "Close"}
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-5 sm:p-7 md:p-8">
            {/* ════════════════════════════════════════════════════════════
                POPUP 1: TALK TO AN EXPERT
               ════════════════════════════════════════════════════════════ */}
            {activeModal === "expert" && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#009e90]">
                    {isArabic ? "استشارة فنية وهندسية" : "Expert Consultation"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug mb-1">
                  {isArabic ? "تحدث مع خبير" : "Talk to an Expert"}
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-500 mb-5 leading-relaxed">
                  {isArabic
                    ? "تواصل مع فريقنا الفني لمناقشة مشروعك أو متطلباتك."
                    : "Connect with our technical team to discuss your project or requirements."}
                </p>

                <form onSubmit={handleExpertSubmit} className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Full Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={expertForm.fullName}
                      onChange={(e) => setExpertForm({ ...expertForm, fullName: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        expertForm.fullName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={expertForm.companyName}
                      onChange={(e) => setExpertForm({ ...expertForm, companyName: e.target.value })}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        expertForm.companyName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                    </label>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={expertForm.phone}
                        onChange={(e) => setExpertForm({ ...expertForm, phone: e.target.value })}
                        required
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          expertForm.phone ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "رقم الهاتف" : "Phone"} <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={expertForm.email}
                        onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value })}
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          expertForm.email ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                    </div>
                  </div>

                  {/* Service Type Dropdown with Search */}
                  <div>
                    <SearchableSelect
                      name="serviceType"
                      value={expertForm.serviceType}
                      options={serviceTypeOptions}
                      label={isArabic ? "نوع الخدمة" : "Service Type"}
                      placeholder={isArabic ? "اختر نوع الخدمة" : "Select service type"}
                      searchPlaceholder={isArabic ? "بحث في الخدمات..." : "Search services..."}
                      required
                      disabled={isSubmitting}
                      isArabic={isArabic}
                      size="sm"
                      variant="rounded-full"
                      onChange={(val) => setExpertForm((prev) => ({ ...prev, serviceType: val }))}
                    />
                  </div>

                  {/* Requirement Textarea */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      name="requirement"
                      value={expertForm.requirement}
                      onChange={(e) => setExpertForm({ ...expertForm, requirement: e.target.value })}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-2xl px-4 pt-4 pb-2.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent resize-none ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        expertForm.requirement ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "أخبرنا عن متطلباتك" : "Tell Us About Your Requirement"}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 sm:h-12 rounded-full bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <span>{isArabic ? "تحدث مع خبير" : "TALK TO AN EXPERT"}</span>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-2">
                      {isArabic ? "سيتواصل معك فريقنا في أقرب وقت." : "Our team will get back to you shortly."}
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════
                POPUP 2: SEND AN ENQUIRY
               ════════════════════════════════════════════════════════════ */}
            {activeModal === "enquiry" && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#009e90]">
                    {isArabic ? "استفسار عام" : "General Enquiry"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug mb-1">
                  {isArabic ? "إرسال استفسار" : "Send an Enquiry"}
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-500 mb-5 leading-relaxed">
                  {isArabic
                    ? "أرسل لنا استفسارك وسيقوم فريقنا بالرد عليك في أقرب وقت."
                    : "Send us your enquiry and our team will get back to you shortly."}
                </p>

                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Full Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        enquiryForm.fullName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={enquiryForm.companyName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, companyName: e.target.value })}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        enquiryForm.companyName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                    </label>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        required
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          enquiryForm.phone ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "رقم الهاتف" : "Phone"} <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          enquiryForm.email ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={enquiryForm.subject}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        enquiryForm.subject ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "الموضوع" : "Subject"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Enquiry Textarea */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      name="enquiry"
                      value={enquiryForm.enquiry}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiry: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-2xl px-4 pt-4 pb-2.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent resize-none ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        enquiryForm.enquiry ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "استفسارك بالتفصيل" : "Your Enquiry"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 sm:h-12 rounded-full bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <span>{isArabic ? "إرسال الاستفسار" : "SEND ENQUIRY"}</span>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-2">
                      {isArabic ? "سيتواصل معك فريقنا في أقرب وقت." : "Our team will get back to you shortly."}
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════
                POPUP 3: REQUEST A CALLBACK
               ════════════════════════════════════════════════════════════ */}
            {activeModal === "callback" && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#009e90]">
                    {isArabic ? "طلب اتصال" : "Callback Request"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug mb-1">
                  {isArabic ? "طلب معاودة الاتصال" : "Request a Callback"}
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-500 mb-5 leading-relaxed">
                  {isArabic
                    ? "اترك بياناتك وسيتصل بك فريقنا في أقرب وقت ممكن."
                    : "Leave your details and our team will call you back shortly."}
                </p>

                <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Full Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={callbackForm.fullName}
                      onChange={(e) => setCallbackForm({ ...callbackForm, fullName: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        callbackForm.fullName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={callbackForm.companyName}
                      onChange={(e) => setCallbackForm({ ...callbackForm, companyName: e.target.value })}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        callbackForm.companyName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        callbackForm.phone ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "رقم الهاتف" : "Phone Number"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <SearchableSelect
                      name="preferredTime"
                      value={callbackForm.preferredTime}
                      options={preferredTimeOptions}
                      label={isArabic ? "الوقت المفضل للاتصال" : "Preferred Call Time"}
                      placeholder={isArabic ? "اختر الوقت المناسب" : "Select preferred time"}
                      searchPlaceholder={isArabic ? "بحث في الأوقات..." : "Search times..."}
                      required
                      disabled={isSubmitting}
                      isArabic={isArabic}
                      size="sm"
                      variant="rounded-full"
                      onChange={(val) => setCallbackForm((prev) => ({ ...prev, preferredTime: val }))}
                    />
                  </div>

                  {/* Reason for Callback */}
                  <div>
                    <SearchableSelect
                      name="reason"
                      value={callbackForm.reason}
                      options={callbackReasonOptions}
                      label={isArabic ? "سبب الاتصال" : "Reason for Callback"}
                      placeholder={isArabic ? "اختر سبب الاتصال" : "Select reason for call"}
                      searchPlaceholder={isArabic ? "بحث في الأسباب..." : "Search reasons..."}
                      required
                      disabled={isSubmitting}
                      isArabic={isArabic}
                      size="sm"
                      variant="rounded-full"
                      onChange={(val) => setCallbackForm((prev) => ({ ...prev, reason: val }))}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 sm:h-12 rounded-full bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <span>{isArabic ? "طلب معاودة الاتصال" : "REQUEST A CALLBACK"}</span>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-2">
                      {isArabic ? "سيتصل بك فريقنا في أقرب وقت." : "Our team will call you back shortly."}
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════
                POPUP 4: SUPPLIER ENQUIRIES
               ════════════════════════════════════════════════════════════ */}
            {activeModal === "supplier" && (
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#009e90]">
                    {isArabic ? "الموردون والشركاء" : "Suppliers & Partners"}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug mb-1">
                  {isArabic ? "استفسارات الموردين" : "Supplier Enquiries"}
                </h2>
                <p className="text-xs sm:text-[13px] text-stone-500 mb-5 leading-relaxed">
                  {isArabic
                    ? "هل أنت مهتم بتوريد المواد أو المنتجات أو المعدات أو الخدمات؟ أرسل لنا تفاصيلك."
                    : "Interested in supplying materials, products, equipment, or services? Send us your details."}
                </p>

                <form onSubmit={handleSupplierSubmit} className="flex flex-col gap-3 sm:gap-3.5">
                  {/* Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={supplierForm.companyName}
                      onChange={(e) => setSupplierForm({ ...supplierForm, companyName: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        supplierForm.companyName ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "اسم الشركة" : "Company Name"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Contact Person */}
                  <div className="relative">
                    <input
                      type="text"
                      name="contactPerson"
                      value={supplierForm.contactPerson}
                      onChange={(e) => setSupplierForm({ ...supplierForm, contactPerson: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        supplierForm.contactPerson ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "اسم الشخص المسؤول" : "Contact Person"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={supplierForm.phone}
                        onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                        required
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          supplierForm.phone ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "رقم الهاتف" : "Phone Number"} <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={supplierForm.email}
                        onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                        required
                        placeholder=" "
                        disabled={isSubmitting}
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                          isArabic ? "right-4" : "left-4"
                        } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                          supplierForm.email ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                        }`}
                      >
                        {isArabic ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>

                  {/* Supplier Category */}
                  <div>
                    <SearchableSelect
                      name="category"
                      value={supplierForm.category}
                      options={supplierCategoryOptions}
                      label={isArabic ? "فئة التوريد" : "Supplier Category"}
                      placeholder={isArabic ? "اختر فئة التوريد" : "Select supplier category"}
                      searchPlaceholder={isArabic ? "بحث في فئات التوريد..." : "Search categories..."}
                      required
                      disabled={isSubmitting}
                      isArabic={isArabic}
                      size="sm"
                      variant="rounded-full"
                      onChange={(val) => setSupplierForm((prev) => ({ ...prev, category: val }))}
                    />
                  </div>

                  {/* Website */}
                  <div className="relative">
                    <input
                      type="text"
                      name="website"
                      value={supplierForm.website}
                      onChange={(e) => setSupplierForm({ ...supplierForm, website: e.target.value })}
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer h-10 sm:h-10.5 w-full bg-white border border-stone-300 rounded-full px-4 pt-3 pb-0.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        supplierForm.website ? "-top-2 translate-y-0 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "موقع الشركة الإلكتروني (اختياري)" : "Company Website (Optional)"}
                    </label>
                  </div>

                  {/* Enquiry Details Textarea */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      name="enquiry"
                      value={supplierForm.enquiry}
                      onChange={(e) => setSupplierForm({ ...supplierForm, enquiry: e.target.value })}
                      required
                      placeholder=" "
                      disabled={isSubmitting}
                      dir={isArabic ? "rtl" : "ltr"}
                      className={`peer w-full bg-white border border-stone-300 rounded-2xl px-4 pt-4 pb-2.5 text-stone-800 text-xs sm:text-[13px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent resize-none ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    />
                    <label
                      className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      } peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                        supplierForm.enquiry ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]" : ""
                      }`}
                    >
                      {isArabic ? "تفاصيل استفسارك ومواد التوريد" : "Your Enquiry & Supply Details"} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 sm:h-12 rounded-full bg-[#01a9a0] hover:bg-[#008f86] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <span>{isArabic ? "إرسال استفسار المورد" : "SUBMIT SUPPLIER ENQUIRY"}</span>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-2">
                      {isArabic
                        ? "سيقوم فريق المشتريات لدينا بمراجعة طلبك والتواصل معك عند الحاجة."
                        : "Our procurement team will review your enquiry and contact you if required."}
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
