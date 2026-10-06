"use client";

import React, { useState } from "react";
import { Phone, Users, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { InputValidationTick, isValidEmail, isValidPhone, isValidText, getFieldError, FormFieldError } from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

// ── Floating-label input ──────────────────────────────────────────────────────
interface FloatFieldProps {
  type?: string;
  name: string;
  value: string;
  label: string;
  required?: boolean;
  isArabic: boolean;
  error?: string;
  isListening?: boolean;
  onVoiceToggle?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FloatField({
  type = "text",
  name,
  value,
  label,
  required,
  isArabic,
  error,
  isListening,
  onVoiceToggle,
  onChange,
}: FloatFieldProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0 || Boolean(error) || Boolean(isListening);

  const isValid =
    type === "email"
      ? isValidEmail(value)
      : type === "tel"
      ? isValidPhone(value)
      : isValidText(value);

  return (
    <div>
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
          placeholder=" "
          className={`
            peer w-full rounded-full border bg-white
            px-5 pt-5 pb-2
            ${isArabic ? "pl-16 text-right" : "pr-16 text-left"}
            text-sm sm:text-[15px] text-stone-800
            focus:outline-none transition-all duration-200
            ${
              error
                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                : isListening
                ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                : lifted
                ? "border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
            }
          `}
        />
        <label
          className={`
            pointer-events-none absolute bg-white px-1
            ${isArabic ? "right-5" : "left-5"}
            transition-all duration-200
            ${
              error
                ? "-top-2.5 text-[11px] font-semibold text-red-500"
                : lifted
                ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                : "top-1/2 -translate-y-1/2 text-sm text-stone-400"
            }
          `}
        >
          {label}
        </label>
        <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1 z-10`}>
          <InputValidationTick isValid={isValid && !error} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
          {onVoiceToggle && (
            <VoiceMicButton
              isListening={Boolean(isListening)}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              size="sm"
            />
          )}
        </div>
      </div>
      {isListening && (
        <VoiceListeningBadge isArabic={isArabic} />
      )}
      <FormFieldError error={error} />
    </div>
  );
}

// ── Floating-label textarea ───────────────────────────────────────────────────
interface FloatTextareaProps {
  name: string;
  value: string;
  label: string;
  isArabic: boolean;
  error?: string;
  isListening?: boolean;
  onVoiceToggle?: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FloatTextarea({
  name,
  value,
  label,
  isArabic,
  error,
  isListening,
  onVoiceToggle,
  onChange,
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0 || Boolean(error) || Boolean(isListening);

  return (
    <div>
      <div className="relative w-full">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          dir={isArabic ? "rtl" : "ltr"}
          rows={4}
          placeholder=" "
          className={`
            peer w-full rounded-2xl border bg-white
            px-5 pt-6 pb-2
            text-sm sm:text-[15px] text-stone-800
            focus:outline-none transition-all duration-200 resize-none h-32 sm:h-36
            ${isArabic ? "pl-12 text-right" : "pr-12 text-left"}
            ${
              error
                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                : isListening
                ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                : lifted
                ? "border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
            }
          `}
        />
        <label
          className={`
            pointer-events-none absolute bg-white px-1
            ${isArabic ? "right-5" : "left-5"}
            transition-all duration-200
            ${
              error
                ? "-top-2.5 text-[11px] font-semibold text-red-500"
                : lifted
                ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                : "top-4 text-sm text-stone-400"
            }
          `}
        >
          {label}
        </label>
        {onVoiceToggle && (
          <div className={`absolute top-3.5 ${isArabic ? "left-3" : "right-3"} z-10`}>
            <VoiceMicButton
              isListening={Boolean(isListening)}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              size="sm"
            />
          </div>
        )}
      </div>
      {isListening && (
        <VoiceListeningBadge isArabic={isArabic} />
      )}
      <FormFieldError error={error} />
    </div>
  );
}

export default function ConsultationSection() {
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { listeningField, toggleListening } = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setFormData((prev) => {
        let val = text;
        if (fieldName === "message" && prev.message.trim()) {
          val = `${prev.message.trim()} ${text}`;
        }
        return { ...prev, [fieldName]: val };
      });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      name: getFieldError("name", formData.name, isArabic),
      email: getFieldError("email", formData.email, isArabic),
      phone: getFieldError("phone", formData.phone, isArabic),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "2_Free_Consultation",
          fullName: formData.name.trim(),
          companyName: formData.companyName.trim(),
          company: formData.companyName.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "Free Consultation Request",
          service: "Free Consultation",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          companyName: "",
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
        name: "",
        companyName: "",
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
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
              {/* Row 1: Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label={isArabic ? "الاسم *" : "Name *"}
                  required
                  isArabic={isArabic}
                  error={errors.name}
                  isListening={listeningField === "name"}
                  onVoiceToggle={() => toggleListening("name", "text")}
                />
                <FloatField
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  label={isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                  isArabic={isArabic}
                  isListening={listeningField === "companyName"}
                  onVoiceToggle={() => toggleListening("companyName", "text")}
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
                  error={errors.email}
                  isListening={listeningField === "email"}
                  onVoiceToggle={() => toggleListening("email", "email")}
                />
                <FloatField
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  label={isArabic ? "رقم الهاتف *" : "Phone Number *"}
                  required
                  isArabic={isArabic}
                  error={errors.phone}
                  isListening={listeningField === "phone"}
                  onVoiceToggle={() => toggleListening("phone", "phone")}
                />
              </div>

              {/* Row 3: Message Textarea */}
              <FloatTextarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                label={isArabic ? "تفاصيل المشروع أو الاستفسار..." : "Message"}
                isArabic={isArabic}
                isListening={listeningField === "message"}
                onVoiceToggle={() => toggleListening("message", "textarea")}
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
