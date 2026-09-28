"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2, ChevronDown, UserCheck, Mail, PhoneCall, Truck } from "lucide-react";
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
        className={`relative w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 ${
          activeModal === "callback" ? "max-w-[490px]" : "max-w-[560px]"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isArabic ? "إغلاق" : "Close"}
          className={`absolute top-4 ${
            isArabic ? "left-4" : "right-4"
          } z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-all flex items-center justify-center cursor-pointer`}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#009e90]/15 text-[#009e90] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              {isArabic ? "تم الإرسال بنجاح!" : "Thank You!"}
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mb-6">
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#009e90]/10 text-[#009e90] flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#009e90]">
                    {isArabic ? "استشارة هندسية" : "Expert Consultation"}
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

                <form onSubmit={handleExpertSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={expertForm.fullName}
                      onChange={(e) => setExpertForm({ ...expertForm, fullName: e.target.value })}
                      placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      value={expertForm.companyName}
                      onChange={(e) => setExpertForm({ ...expertForm, companyName: e.target.value })}
                      placeholder={isArabic ? "اسم شركتك (اختياري)" : "Your company name (optional)"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "رقم الهاتف *" : "Phone *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={expertForm.phone}
                        onChange={(e) => setExpertForm({ ...expertForm, phone: e.target.value })}
                        placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={expertForm.email}
                        onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value })}
                        placeholder={isArabic ? "example@domain.com" : "example@domain.com"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
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
                      variant="rounded-xl"
                      size="sm"
                      onChange={(val) => setExpertForm((prev) => ({ ...prev, serviceType: val }))}
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "أخبرنا عن متطلباتك" : "Tell Us About Your Requirement"}
                    </label>
                    <textarea
                      rows={3}
                      value={expertForm.requirement}
                      onChange={(e) => setExpertForm({ ...expertForm, requirement: e.target.value })}
                      placeholder={isArabic ? "صف مشروعك أو الخدمة التي تحتاجها..." : "Describe your project or required service..."}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-full bg-[#009e90] hover:bg-[#01887e] active:scale-[0.99] text-white font-bold text-[13px] tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
                    <p className="text-center text-[11px] text-stone-400 mt-2.5">
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
                <div className="flex items-center gap-2 mb-2">
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

                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.companyName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, companyName: e.target.value })}
                      placeholder={isArabic ? "اسم الشركة (اختياري)" : "Company name (optional)"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "رقم الهاتف *" : "Phone *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        placeholder={isArabic ? "example@domain.com" : "example@domain.com"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "الموضوع *" : "Subject *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.subject}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                      placeholder={isArabic ? "موضوع الاستفسار" : "Enquiry subject"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "استفسارك *" : "Your Enquiry *"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={enquiryForm.enquiry}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiry: e.target.value })}
                      placeholder={isArabic ? "اكتب استفسارك بالتفصيل..." : "Write your enquiry in detail..."}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-full bg-[#009e90] hover:bg-[#01887e] active:scale-[0.99] text-white font-bold text-[13px] tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
                    <p className="text-center text-[11px] text-stone-400 mt-2.5">
                      {isArabic ? "سيتواصل معك فريقنا في أقرب وقت." : "Our team will get back to you shortly."}
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════
                POPUP 3: REQUEST A CALLBACK (COMPACT LAYOUT)
               ════════════════════════════════════════════════════════════ */}
            {activeModal === "callback" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
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

                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackForm.fullName}
                      onChange={(e) => setCallbackForm({ ...callbackForm, fullName: e.target.value })}
                      placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      value={callbackForm.companyName}
                      onChange={(e) => setCallbackForm({ ...callbackForm, companyName: e.target.value })}
                      placeholder={isArabic ? "اسم الشركة (اختياري)" : "Company name (optional)"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "رقم الهاتف *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                      placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "الوقت المفضل للاتصال" : "Preferred Call Time"}
                    </label>
                    <div className="relative">
                      <select
                        value={callbackForm.preferredTime}
                        onChange={(e) => setCallbackForm({ ...callbackForm, preferredTime: e.target.value })}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all pr-9 cursor-pointer"
                      >
                        <option value="As soon as possible">{isArabic ? "في أقرب وقت ممكن" : "As soon as possible"}</option>
                        <option value="Morning (9 AM - 12 PM)">{isArabic ? "صباحاً (9 ص - 12 م)" : "Morning (9 AM - 12 PM)"}</option>
                        <option value="Afternoon (12 PM - 4 PM)">{isArabic ? "ظهراً (12 م - 4 م)" : "Afternoon (12 PM - 4 PM)"}</option>
                        <option value="Evening (4 PM - 8 PM)">{isArabic ? "مساءً (4 م - 8 م)" : "Evening (4 PM - 8 PM)"}</option>
                      </select>
                      <ChevronDown className={`w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${isArabic ? "left-3" : "right-3"}`} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "سبب الاتصال" : "Reason for Callback"}
                    </label>
                    <div className="relative">
                      <select
                        value={callbackForm.reason}
                        onChange={(e) => setCallbackForm({ ...callbackForm, reason: e.target.value })}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all pr-9 cursor-pointer"
                      >
                        <option value="General Enquiry">{isArabic ? "استفسار عام" : "General Enquiry"}</option>
                        <option value="Project Enquiry">{isArabic ? "استفسار عن مشروع" : "Project Enquiry"}</option>
                        <option value="Service Information">{isArabic ? "معلومات عن الخدمات" : "Service Information"}</option>
                        <option value="Existing Project">{isArabic ? "مشروع قائم" : "Existing Project"}</option>
                        <option value="Other">{isArabic ? "أخرى" : "Other"}</option>
                      </select>
                      <ChevronDown className={`w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${isArabic ? "left-3" : "right-3"}`} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-full bg-[#009e90] hover:bg-[#01887e] active:scale-[0.99] text-white font-bold text-[13px] tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
                <div className="flex items-center gap-2 mb-2">
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

                <form onSubmit={handleSupplierSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "اسم الشركة *" : "Company Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={supplierForm.companyName}
                      onChange={(e) => setSupplierForm({ ...supplierForm, companyName: e.target.value })}
                      placeholder={isArabic ? "اسم شركة التوريد" : "Supplier company name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "اسم الشخص المسؤول *" : "Contact Person *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={supplierForm.contactPerson}
                      onChange={(e) => setSupplierForm({ ...supplierForm, contactPerson: e.target.value })}
                      placeholder={isArabic ? "اسم الممثل أو المسؤول" : "Contact person full name"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "رقم الهاتف *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={supplierForm.phone}
                        onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                        placeholder={isArabic ? "+971 50 123 4567" : "+971 50 123 4567"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-stone-700 mb-1">
                        {isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={supplierForm.email}
                        onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                        placeholder={isArabic ? "supplier@company.com" : "supplier@company.com"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "فئة التوريد *" : "Supplier Category *"}
                    </label>
                    <div className="relative">
                      <select
                        value={supplierForm.category}
                        onChange={(e) => setSupplierForm({ ...supplierForm, category: e.target.value })}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all pr-9 cursor-pointer"
                      >
                        <option value="Building Materials">{isArabic ? "مواد البناء" : "Building Materials"}</option>
                        <option value="Waterproofing Materials">{isArabic ? "مواد العزل المائي" : "Waterproofing Materials"}</option>
                        <option value="Roofing Materials">{isArabic ? "مواد الأسقف" : "Roofing Materials"}</option>
                        <option value="Chemicals & Coatings">{isArabic ? "الكيماويات والطلاء" : "Chemicals & Coatings"}</option>
                        <option value="Tools & Equipment">{isArabic ? "الأدوات والمعدات" : "Tools & Equipment"}</option>
                        <option value="Safety & PPE">{isArabic ? "معدات السلامة والوقاية" : "Safety & PPE"}</option>
                        <option value="Subcontracting Services">{isArabic ? "خدمات مقاولات الباطن" : "Subcontracting Services"}</option>
                        <option value="Other">{isArabic ? "أخرى" : "Other"}</option>
                      </select>
                      <ChevronDown className={`w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${isArabic ? "left-3" : "right-3"}`} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "موقع الشركة الإلكتروني" : "Company Website"}
                    </label>
                    <input
                      type="text"
                      value={supplierForm.website}
                      onChange={(e) => setSupplierForm({ ...supplierForm, website: e.target.value })}
                      placeholder={isArabic ? "https://yourcompany.com (اختياري)" : "https://yourcompany.com (optional)"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-stone-700 mb-1">
                      {isArabic ? "تفاصيل استفسارك *" : "Your Enquiry *"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={supplierForm.enquiry}
                      onChange={(e) => setSupplierForm({ ...supplierForm, enquiry: e.target.value })}
                      placeholder={isArabic ? "أدخل تفاصيل المواد والمنتجات التي تود توريدها..." : "Enter details of products or services you supply..."}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-[13px] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#009e90]/30 focus:border-[#009e90] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-5 rounded-full bg-[#009e90] hover:bg-[#01887e] active:scale-[0.99] text-white font-bold text-[13px] tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
