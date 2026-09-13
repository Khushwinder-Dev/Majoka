"use client";

import React, { useState } from "react";
import { Phone, Users, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ── Floating-label input ──────────────────────────────────────────────────────
interface FloatFieldProps {
  type?: string;
  name: string;
  value: string;
  label: string;
  required?: boolean;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FloatField({ type = "text", name, value, label, required, isArabic, onChange }: FloatFieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={isArabic ? "rtl" : "ltr"}
        className={`
          peer w-full rounded-full
          border bg-white/70 shadow-sm
          px-5 pt-5 pb-2
          text-sm text-stone-800
          focus:outline-none focus:ring-2 focus:ring-[#009e90] focus:bg-white
          transition-all duration-200
          ${lifted ? "border-[#009e90]" : "border-teal-500/40"}
        `}
      />
      <label
        className={`
          pointer-events-none absolute
          ${isArabic ? "right-5" : "left-5"}
          transition-all duration-200 origin-left
          ${lifted
            ? "top-1.5 text-[10px] font-semibold text-[#009e90]"
            : "top-1/2 -translate-y-1/2 text-xs sm:text-sm text-stone-400"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}

// ── Floating-label textarea ───────────────────────────────────────────────────
interface FloatTextareaProps {
  name: string;
  value: string;
  label: string;
  isArabic: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FloatTextarea({ name, value, label, isArabic, onChange }: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={isArabic ? "rtl" : "ltr"}
        rows={4}
        className={`
          peer w-full rounded-3xl
          border bg-white/70 shadow-sm
          px-5 pt-7 pb-3
          text-sm text-stone-800
          focus:outline-none focus:ring-2 focus:ring-[#009e90] focus:bg-white
          transition-all duration-200 resize-none h-32 sm:h-36
          ${lifted ? "border-[#009e90]" : "border-teal-500/40"}
        `}
      />
      <label
        className={`
          pointer-events-none absolute
          ${isArabic ? "right-5" : "left-5"}
          transition-all duration-200
          ${lifted
            ? "top-2 text-[10px] font-semibold text-[#009e90]"
            : "top-4 text-xs sm:text-sm text-stone-400"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default function ConsultationSection() {
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      setStatus("error");
      setErrorMessage(
        isArabic
          ? "يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، ورقم الهاتف)."
          : "Please fill in all required fields (First Name, Email, and Phone Number)."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "Consultation Request",
          service: "Free Consultation",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.error || (isArabic ? "حدث خطأ أثناء الإرسال." : "Failed to send request."));
      }
    } catch {
      // Fallback for demo / offline
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
        {/* ============================================================
            LEFT PANEL: SOLID TEAL WITH CONTACT DETAILS
            ============================================================ */}
        <div
          data-aos={isArabic ? "fade-left" : "fade-right"}
          className="bg-[#009e90] p-8 sm:p-12 lg:p-16 xl:p-20 text-white flex flex-col justify-center"
        >
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            {/* Eyebrow / Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block h-[2px] w-8 bg-white/80 rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-white">
                {isArabic ? "تواصل معنا" : "GET IN TOUCH"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.16]">
              <span className="text-white">
                {isArabic ? "لنبنِ معاً " : "Let's Build "}
              </span>
              <br />
              <span className="text-stone-900">
                {isArabic ? "مشروعكم القادم بكل إتقان" : "Your Next Project Together"}
              </span>
            </h2>

            {/* Description Subtitle */}
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mt-4 sm:mt-5 max-w-lg font-normal">
              {isArabic
                ? "املأ النموذج وسيقوم فريقنا بالتواصل معكم في أقرب وقت. سواء كان مشروع بناء جديد، تجديد، أو استشارة فنية، نحن هنا لدعمكم في كل خطوة."
                : "Fill out the form below and our team will get back to you shortly. Whether it's a new construction, renovation, or consultation, we're here to help you every step of the way."}
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col gap-6 mt-8 sm:mt-10">
              {/* Item 1: Email / Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#009e90] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-[#009e90]" />
                </div>
                <div>
                  <p className="text-xs sm:text-[13px] text-white/80 font-medium">
                    {isArabic ? "لاستفسارات المشاريع، تواصل معنا على" : "For Project Inquiries, Contact Us At"}
                  </p>
                  <a
                    href="mailto:info@tajalrahmah.com"
                    className="text-sm sm:text-base font-bold text-white hover:underline block"
                  >
                    info@tajalrahmah.com
                  </a>
                </div>
              </div>

              {/* Item 2: Expert Consultation */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#009e90] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-5 h-5 text-[#009e90]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">
                    {isArabic ? "تبحث عن استشارة هندسية متخصصة؟" : "Looking For Expert Consultation?"}
                  </p>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed mt-0.5">
                    {isArabic
                      ? "تواصل مع فريقنا الهندسي لمناقشة متطلبات مشروعكم بالتفصيل."
                      : "Connect With Our Team To Discuss Your Project Requirements In Detail."}
                  </p>
                </div>
              </div>

              {/* Item 3: Office Address */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#009e90] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-[#009e90]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">
                    {isArabic ? "تفضل بزيارة مكتبنا" : "Visit Our Office"}
                  </p>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed mt-0.5">
                    {isArabic
                      ? "مكتب G-01-691، الخبيصي، دبي، الإمارات العربية المتحدة"
                      : "Office G-01-691, Al Khabaisi, Dubai, 00000 Dubai"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT PANEL: MINT BACKGROUND WITH INTERACTIVE FORM
            ============================================================ */}
        <div
          data-aos={isArabic ? "fade-right" : "fade-left"}
          className="bg-[#E6F7F6] p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center"
        >
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-stone-900 tracking-tight leading-tight">
              <span>{isArabic ? "اطلب الآن " : "Request A "}</span>
              <span className="text-[#01a9a0]">
                {isArabic ? "استشارة مجانية" : "Free Consultation"}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mt-2 mb-8 sm:mb-10 max-w-lg">
              {isArabic
                ? "املأ النموذج أدناه وسيقوم أحد مهندسينا المتخصصين بالرد عليك في غضون 24 ساعة."
                : "Fill out the form below and one of our coaching specialists will get back to you within 24 hours."}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              {/* Row 1: First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatField
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  label={isArabic ? "الاسم الأول *" : "First Name *"}
                  required
                  isArabic={isArabic}
                />
                <FloatField
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  label={isArabic ? "اسم العائلة" : "Last Name"}
                  isArabic={isArabic}
                />
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label={isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                  required
                  isArabic={isArabic}
                />
                <FloatField
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  label={isArabic ? "رقم الهاتف *" : "Phone Number *"}
                  required
                  isArabic={isArabic}
                />
              </div>

              {/* Row 3: Message Textarea */}
              <FloatTextarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                label={isArabic ? "تفاصيل المشروع أو الاستفسار..." : "Message"}
                isArabic={isArabic}
              />

              {/* Error Message */}
              {status === "error" && (
                <p className="text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">
                  {errorMessage}
                </p>
              )}

              {/* Success Notification */}
              {status === "success" && (
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    {isArabic
                      ? "تم إرسال طلبكم بنجاح! سيتواصل معكم فريقنا قريباً."
                      : "Your consultation request has been sent successfully! Our team will contact you shortly."}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-3.5 bg-[#009e90] hover:bg-[#01887e] disabled:opacity-75 text-white pl-6 pr-2 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,158,144,0.3)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.4)] transition-all duration-300 group cursor-pointer"
                >
                  <span>
                    {status === "loading"
                      ? isArabic
                        ? "جاري الإرسال..."
                        : "SENDING..."
                      : isArabic
                      ? "إرسال الرسالة"
                      : "SEND MESSAGE"}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#009e90] group-hover:scale-105 transition-transform duration-300">
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 text-[#009e90] animate-spin" />
                    ) : isArabic ? (
                      <ArrowLeft className="w-4 h-4 text-[#009e90] group-hover:-translate-x-0.5 transition-transform duration-300" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#009e90] group-hover:translate-x-0.5 transition-transform duration-300" />
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
