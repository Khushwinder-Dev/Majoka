"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ChevronDown, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { servicesDataEn, servicesDataAr, ServiceItem, SubServiceItem } from "@/data/servicesData";
import { ServiceIcon, SubServiceIcon } from "@/components/ServiceIcon";

/* ─── DEFAULT FALLBACK ASSETS ─────────────────────────────────── */
const DEFAULT_BANNER = "/media/servicesListing/Rectangle 14 (1).png";
const FALLBACK_IMAGES = [
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8.png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (3).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (4).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (5).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (6).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (7).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (8).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (9).png",
];

/* ─── RESILIENT IMAGE COMPONENT ───────────────────────────────── */
function SmartImage({
  src,
  alt,
  fallbackSrc,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

/* ─── SERVICE CARD COMPONENT ─────────────────────────────────── */
function ServiceCard({
  service,
  sub,
  idx,
  isArabic,
}: {
  service: ServiceItem;
  sub: SubServiceItem;
  idx: number;
  isArabic: boolean;
}) {
  const fallback = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
  // Link to the service overview page — user picks the sub from there
  const targetLink = `/services-details?service=${service.serviceNumber}&sub=${sub.serviceSlug}`;

  return (
    <Link
      href={targetLink}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-[#009e90]/30 shadow-sm hover:shadow-[0_8px_28px_rgba(0,158,144,0.13)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full h-[150px] sm:h-[160px] overflow-hidden bg-stone-100 flex-shrink-0">
        <SmartImage
          src={sub.serviceImage || service.serviceImage}
          alt={sub.serviceTitle}
          fallbackSrc={fallback}
          className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-[#009e90]/10 text-[#009e90] flex-shrink-0">
            <SubServiceIcon slug={sub.serviceSlug} size={13} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 leading-snug group-hover:text-[#009e90] transition-colors duration-200 truncate">
            {sub.serviceTitle}
          </h3>
        </div>

        <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-3 flex-grow mb-3">
          {sub.shortDescription || sub.serviceContent}
        </p>

        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#009e90] group-hover:gap-2 transition-all duration-200 mt-auto">
          {isArabic ? "اقرأ المزيد" : "Read more"}
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
        </span>
      </div>
    </Link>
  );
}

/* ─── MAIN SERVICES LISTING COMPONENT ─────────────────────────── */
export default function ServicesListing() {
  const { isArabic, t } = useLanguage();
  const services = isArabic ? servicesDataAr : servicesDataEn;

  // Active service state: defaults to first service (waterproofing)
  const [activeSlug, setActiveSlug] = useState<string>("waterproofing");

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeService =
    services.find((s) => s.serviceSlug === activeSlug || s.serviceId === activeSlug) ??
    services[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.subject || activeService.serviceTitle,
          message: formData.subject
            ? `[Subject: ${formData.subject}]\n\n${formData.message}`
            : formData.message,
        }),
      });

      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
            : "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          {
            duration: 5000,
            style: {
              background: "#009e90",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#009e90",
            },
          }
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.error ||
            (isArabic
              ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
              : "Failed to send message. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic
          ? "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى لاحقاً."
          : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* ══ HERO BANNER ══════════════════════════════════════════ */}
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden bg-[#0b2447]">
        <SmartImage
          src={activeService.serviceBanner || DEFAULT_BANNER}
          alt={activeService.serviceTitle}
          fallbackSrc={DEFAULT_BANNER}
          priority
          className="object-cover object-center"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3">
          <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#009e90]">
            {isArabic ? "شركة تاج الرحمة للمقاولات" : "Taj Al Rahmah Contracting"}
          </p>
          <h1 className="text-2xl sm:text-[32px] md:text-4xl font-extrabold text-white leading-tight drop-shadow">
            {isArabic ? "استكشف حسب الخدمات" : "Explore by Services"}
          </h1>
          <p className="text-sm sm:text-[15px] text-white/85 max-w-xl leading-relaxed">
            {isArabic
              ? activeService.tagline || "تصفح مجموعتنا الكاملة من الخدمات الاحترافية بجودة يمكنك الوثوق بها."
              : activeService.tagline ||
                "Browse our full range of professional contracting services designed to meet your needs with quality you can trust."}
          </p>
        </div>
      </div>

      {/* ══ BODY: SIDEBAR + GRID ═════════════════════════════════ */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ── SIDEBAR: ALL 11 SERVICES & SUBSERVICES ──────────── */}
          <aside className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
            {/* "TRADES" eyebrow */}
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-3 px-1">
              {isArabic ? "جميع الخدمات والأنشطة (11)" : "ALL SERVICES & SUBSERVICES (11)"}
            </p>

            {/* Category tabs */}
            <nav className="flex flex-col gap-1.5">
              {services.map((svc) => {
                const isServiceActive = svc.serviceSlug === activeService.serviceSlug;
                return (
                  <div key={svc.serviceSlug} className="flex flex-col">
                    <button
                      onClick={() => setActiveSlug(svc.serviceSlug)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full transition-all duration-200 cursor-pointer text-left group ${
                        isServiceActive
                          ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      {/* Visible icon badge */}
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                          isServiceActive ? "bg-white/20" : "bg-[#009e90]/10"
                        }`}
                      >
                        <ServiceIcon slug={svc.serviceSlug} active={isServiceActive} size={15} />
                      </div>

                      <span
                        className={`text-[13px] font-semibold flex-grow truncate ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {svc.serviceTitle}
                      </span>

                      {isServiceActive ? (
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                      ) : (
                        <ChevronRight
                          className={`w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-75 ${
                            isArabic ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Subservices list under active service in sidebar */}
                    {isServiceActive && svc.subservices && svc.subservices.length > 0 && (
                      <div
                        className={`flex flex-col gap-1 mt-1 mb-1.5 ${
                          isArabic ? "mr-3 pr-3 border-r-2" : "ml-3 pl-3 border-l-2"
                        } border-[#009e90]/30`}
                      >
                        {svc.subservices.map((sub) => (
                          <Link
                            key={sub.id || sub.serviceSlug}
                            href={`/services-details?service=${svc.serviceNumber}&sub=${sub.serviceSlug}`}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-stone-600 hover:text-[#009e90] hover:bg-stone-50 transition-all"
                          >
                            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[#009e90]/80">
                              <SubServiceIcon slug={sub.serviceSlug} size={13} />
                            </div>
                            <span className="truncate flex-grow">{sub.serviceTitle}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA box */}
            <div className="mt-6 bg-[#009e90] rounded-2xl p-4 sm:p-5 text-white shadow-sm">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <MessageCircle className="w-[18px] h-[18px] text-white" />
              </div>
              <h4 className="text-[13px] font-bold mb-1.5 leading-snug">
                {isArabic ? "لست متأكداً من أين تبدأ؟" : "Not sure where to start?"}
              </h4>
              <p className="text-[11px] text-white/85 leading-relaxed mb-4">
                {isArabic
                  ? "فريقنا الهندسي يساعدك في اختيار الحلول والمواد المناسبة لمشروعك."
                  : "Our engineering team helps you pick the best service system for every setup. Get expert guidance in minutes."}
              </p>
              <Link
                href="/contact"
                className="text-[11px] font-bold text-white underline underline-offset-2 hover:text-white/80 transition-colors duration-200"
              >
                {isArabic ? "تحدث إلى خبير" : "Talk to an expert"}
              </Link>
            </div>
          </aside>

          {/* ── CONTENT AREA ────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Heading row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-[4px] h-6 bg-[#009e90] rounded-full flex-shrink-0" />
                <div>
                  <h2 className="text-[18px] sm:text-[21px] font-extrabold text-stone-900 leading-tight">
                    {activeService.serviceTitle}
                  </h2>
                  <p className="text-[12px] text-stone-500 mt-0.5">
                    {activeService.tagline}
                  </p>
                </div>
              </div>
              <Link
                href={`/services-details?service=${activeService.serviceNumber}`}
                className="text-[12px] font-semibold text-[#009e90] hover:text-[#01887e] flex items-center gap-1 whitespace-nowrap transition-colors duration-200 self-start sm:self-center"
              >
                {isArabic ? "عرض صفحة الخدمة" : "View Service Page"}
                <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            </div>

            {/* Service intro preview */}
            <div className="bg-stone-50 rounded-xl p-4 mb-6 text-[13px] text-stone-600 leading-relaxed border border-stone-100">
              {activeService.shortDescription || activeService.serviceContent}
            </div>

            {/* Subservices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {activeService.subservices.map((sub, idx) => (
                <ServiceCard
                  key={sub.id || sub.serviceSlug}
                  service={activeService}
                  sub={sub}
                  idx={idx}
                  isArabic={isArabic}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ CONTACT / INQUIRY SECTION (BELOW LISTING) ══════════════ */}
      <section className="w-full bg-[#f4f6f8] py-16 sm:py-20 lg:py-24 border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold tracking-wide text-stone-600">
              {isArabic ? "تواصل معنا الآن" : "Contact With Us Now"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-stone-900 text-center leading-tight sm:leading-tight mb-8 sm:mb-12 max-w-2xl mx-auto tracking-tight">
            {isArabic
              ? "لا تتردد في مراسلة خبرائنا التقنيين"
              : "Feel Free to Write Our Technology Experts"}
          </h2>

          {/* Form */}
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder={isArabic ? "عنوان البريد الإلكتروني" : "Email Address"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Row 2: Phone Number & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={isArabic ? "الموضوع أو الخدمة المطلوبة" : "Subject or Service Needed"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Row 3: Message Textarea */}
            <div>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={isArabic ? "الرسالة والتفاصيل" : "Message and details"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all resize-y shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] active:scale-[0.98] text-white font-bold text-sm sm:text-[15px] px-10 py-3.5 rounded-full shadow-md shadow-[#009e90]/25 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isArabic ? "جاري الإرسال..." : "Sending..."}</span>
                  </>
                ) : (
                  <span>{isArabic ? "إرسال الرسالة" : "Send Message"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ══ FAQ SECTION ═══════════════════════════════════════════ */}
      <section className="w-full bg-[#f4f6f8] pb-16 sm:pb-20 lg:pb-24 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b2447] text-white rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-xl">
            {/* Title */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                {t.faq.titlePrefix}{" "}
                <span className="text-[#009e90]">{t.faq.titleAccent}</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                {t.faq.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}