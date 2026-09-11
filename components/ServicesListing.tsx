"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ChevronDown, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { servicesDataEn, servicesDataAr, ServiceItem, SubServiceItem } from "@/data/servicesData";
import { ServiceIcon } from "@/components/ServiceIcon";
import {
  TemplateDefault,
  TemplateA,
  TemplateB,
  TemplateC,
  getTemplateKey,
} from "@/components/service-templates";

/* ─── ASSETS ──────────────────────────────────────────────────── */
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

/* ─── STRIP HTML ──────────────────────────────────────────────── */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
}

/* ─── SMART IMAGE ─────────────────────────────────────────────── */
function SmartImage({
  src, alt, fallbackSrc, className, priority = false,
}: {
  src: string; alt: string; fallbackSrc: string; className?: string; priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => { setImgSrc(src); }, [src]);
  return (
    <Image
      src={imgSrc} alt={alt} fill unoptimized priority={priority}
      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      className={className}
      onError={() => { if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc); }}
    />
  );
}

/* ─── SUB-SERVICE CARD ────────────────────────────────────────── */
function ServiceCard({
  service, sub, idx, isArabic, onClick,
}: {
  service: ServiceItem; sub: SubServiceItem; idx: number; isArabic: boolean;
  onClick: () => void;
}) {
  const fallback = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
  return (
    <button
      onClick={onClick}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-[#009e90]/30 shadow-sm hover:shadow-[0_8px_28px_rgba(0,158,144,0.13)] transition-all duration-300 hover:-translate-y-1 text-left w-full"
    >
      <div className="relative w-full h-[150px] sm:h-[160px] overflow-hidden bg-stone-100 flex-shrink-0">
        <SmartImage
          src={sub.serviceImage || service.serviceImage}
          alt={sub.serviceTitle}
          fallbackSrc={fallback}
          className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[14px] font-bold text-stone-900 leading-snug mb-2 group-hover:text-[#009e90] transition-colors duration-200 truncate">
          {sub.serviceTitle}
        </h3>
        <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-3 flex-grow mb-3">
          {sub.shortDescription
            ? sub.shortDescription
            : sub.serviceContent
            ? stripHtml(sub.serviceContent)
            : ""}
        </p>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#009e90] group-hover:gap-2 transition-all duration-200 mt-auto">
          {isArabic ? "اقرأ المزيد" : "Read more"}
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
        </span>
      </div>
    </button>
  );
}

/* ─── FAQ DATA ────────────────────────────────────────────────── */
const SERVICES_FAQS = [
  {
    id: 1,
    question: "Can I try a free consultation?",
    questionAr: "هل يمكنني الحصول على استشارة مجانية؟",
    answer: "Yes. We offer a free initial site visit and assessment for all new project inquiries across our service categories.",
    answerAr: "نعم. نقدم زيارة موقعية ومعاينة أولية مجانية لجميع الاستفسارات المتعلقة بالمشاريع الجديدة عبر فئات خدماتنا.",
  },
  {
    id: 2,
    question: "What's the pricing model?",
    questionAr: "ما هو نموذج التسعير؟",
    answer: "Pricing is project-based. After a site survey we provide a detailed, itemised quotation with no hidden fees.",
    answerAr: "التسعير يعتمد على المشروع. بعد معاينة الموقع نقدم عرض سعر مفصّل وشفاف بدون رسوم مخفية.",
  },
  {
    id: 3,
    question: "Is there a workmanship warranty?",
    questionAr: "هل هناك ضمان على جودة التنفيذ؟",
    answer: "Yes. We provide a workmanship warranty on all completed works, with the duration varying by service type and scope.",
    answerAr: "نعم. نقدم ضمان على جودة التنفيذ لجميع الأعمال المنجزة، وتتفاوت المدة حسب نوع الخدمة ونطاقها.",
  },
  {
    id: 4,
    question: "How do I get support after completion?",
    questionAr: "كيف أحصل على الدعم بعد الانتهاء؟",
    answer: "Our after-sales team is reachable via phone, WhatsApp, and email. We also offer scheduled maintenance contracts for ongoing support.",
    answerAr: "يمكن التواصل مع فريق خدمة ما بعد البيع عبر الهاتف أو واتساب أو البريد الإلكتروني. كما نوفر عقود صيانة دورية للدعم المستمر.",
  },
  {
    id: 5,
    question: "Can I request a demo or site visit?",
    questionAr: "هل يمكنني طلب زيارة ميدانية؟",
    answer: "Absolutely. Contact us to schedule a site visit at a time that suits you — available 7 days a week.",
    answerAr: "بالتأكيد. تواصل معنا لتحديد موعد الزيارة الميدانية في الوقت المناسب — متاح 7 أيام في الأسبوع.",
  },
  {
    id: 6,
    question: "Where can I leave feedback?",
    questionAr: "أين يمكنني إبداء ملاحظاتي؟",
    answer: "We welcome feedback via our contact form, Google reviews, or directly through our project manager assigned to your job.",
    answerAr: "نرحب بملاحظاتكم عبر نموذج الاتصال أو تقييمات Google أو مباشرةً عبر مدير المشروع المعين لعملكم.",
  },
];

/* ─── INNER CONTENT (needs useSearchParams) ───────────────────── */
function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isArabic } = useLanguage();
  const services = isArabic ? servicesDataAr : servicesDataEn;

  // Resolve active service from URL
  const serviceParam = searchParams.get("service") ?? null;
  const subParam = searchParams.get("sub") ?? null;

  const activeService: ServiceItem =
    (serviceParam
      ? services.find(
          (s) =>
            s.serviceNumber.toString() === serviceParam ||
            s.serviceSlug.toLowerCase() === serviceParam.toLowerCase()
        )
      : null) ?? services[0];

  const activeSub: SubServiceItem | null = subParam
    ? activeService.subservices.find(
        (s) => s.serviceSlug.toLowerCase() === subParam.toLowerCase()
      ) ?? null
    : null;

  // Navigate to a service (listing view)
  const goToService = (svc: ServiceItem) => {
    router.push(`/services?service=${svc.serviceNumber}`, { scroll: false });
  };

  // Navigate to a sub-service (detail view)
  const goToSub = (svc: ServiceItem, sub: SubServiceItem) => {
    router.push(`/services?service=${svc.serviceNumber}&sub=${sub.serviceSlug}`, { scroll: false });
  };

  // Back to listing view
  const goBack = () => {
    router.push(`/services?service=${activeService.serviceNumber}`, { scroll: false });
  };

  // Hero content
  const heroBanner = activeSub?.serviceBanner || activeService.serviceBanner || DEFAULT_BANNER;
  const heroTitle = activeSub ? activeSub.serviceTitle : activeService.serviceTitle;
  const heroTagline = activeSub
    ? activeSub.shortDescription
      ? activeSub.shortDescription
      : activeSub.serviceContent
      ? stripHtml(activeSub.serviceContent).slice(0, 120) + "..."
      : ""
    : activeService.tagline || "";

  // Contact form state
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.subject || activeService.serviceTitle,
          message: formData.subject ? `[Subject: ${formData.subject}]\n\n${formData.message}` : formData.message,
        }),
      });
      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
            : "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          { duration: 5000, style: { background: "#009e90", color: "#fff", padding: "16px", borderRadius: "8px" }, iconTheme: { primary: "#fff", secondary: "#009e90" } }
        );
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || (isArabic ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Failed to send. Please try again."));
      }
    } catch {
      toast.error(isArabic ? "خطأ في الاتصال. يرجى المحاولة لاحقاً." : "Connection error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══ HERO BANNER ══════════════════════════════════════════ */}
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden bg-[#0b2447]">
        <SmartImage src={heroBanner} alt={heroTitle} fallbackSrc={DEFAULT_BANNER} priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3">
          {/* <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#009e90]">
            {isArabic ? "شركة تاج الرحمة للمقاولات" : "Taj Al Rahmah Contracting"}
          </p> */}
          <h1 className="text-2xl sm:text-[32px] md:text-4xl font-extrabold text-white leading-tight drop-shadow">
            {heroTitle}
          </h1>
          {heroTagline && (
            <p className="text-sm sm:text-[15px] text-white/85 max-w-xl leading-relaxed line-clamp-2">
              {heroTagline}
            </p>
          )}
        </div>
      </div>

      {/* ══ BODY: SIDEBAR + CONTENT ══════════════════════════════ */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 bg-[#f4f6f8]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <aside className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0 lg:sticky lg:top-24">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-3 px-1">
              {isArabic ? "جميع الخدمات" : "ALL SERVICES"}
            </p>
            <nav className="flex flex-col gap-1.5">
              {services.map((svc) => {
                const isActive = svc.serviceSlug === activeService.serviceSlug;
                return (
                  <button
                    key={svc.serviceSlug}
                    onClick={() => goToService(svc)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full transition-all duration-200 cursor-pointer text-left group ${
                      isActive
                        ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? "bg-white/20" : "bg-[#009e90]/10"}`}>
                      <ServiceIcon slug={svc.serviceSlug} active={isActive} size={15} />
                    </div>
                    <span className={`text-[13px] font-semibold flex-grow truncate ${isArabic ? "text-right" : "text-left"}`}>
                      {svc.serviceTitle}
                    </span>
                    {isActive
                      ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                      : <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-75 ${isArabic ? "rotate-180" : ""}`} />
                    }
                  </button>
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
              <Link href="/contact" className="text-[11px] font-bold text-white underline underline-offset-2 hover:text-white/80 transition-colors duration-200">
                {isArabic ? "تحدث إلى خبير" : "Talk to an expert"}
              </Link>
            </div>
          </aside>

          {/* ── MAIN CONTENT AREA ───────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── LISTING VIEW: sub-service cards grid ─────────── */}
            {!activeSub && (
              <>
                {/* Heading row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-block w-[4px] h-6 bg-[#009e90] rounded-full flex-shrink-0" />
                    <h2 className="text-[18px] sm:text-[21px] font-extrabold text-stone-900 leading-tight">
                      {activeService.serviceTitle}
                    </h2>
                  </div>
                  {activeService.tagline && (
                    <p className="text-[12px] text-stone-500 sm:text-right max-w-xs leading-relaxed">
                      {activeService.tagline}
                    </p>
                  )}
                </div>

                {/* Sub-service cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {activeService.subservices.map((sub, idx) => (
                    <ServiceCard
                      key={sub.id || sub.serviceSlug}
                      service={activeService}
                      sub={sub}
                      idx={idx}
                      isArabic={isArabic}
                      onClick={() => goToSub(activeService, sub)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── DETAIL VIEW: sub-service template ────────────── */}
            {activeSub && (
              <>
                {/* Back breadcrumb */}
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-stone-400 hover:text-[#009e90] transition-colors mb-5"
                >
                  <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                  {isArabic
                    ? `العودة إلى ${activeService.serviceTitle}`
                    : `Back to ${activeService.serviceTitle}`}
                </button>

                {/* Sub-service title */}
                <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#009e90] leading-tight mb-6">
                  {activeSub.service.serviceTitle +" : " +activeSub.service.tagline}
                </h2>
                
                {/* Render the correct template based on service/sub slug */}
                {(() => {
                  const key = getTemplateKey(activeService.serviceSlug, activeSub.serviceSlug);
                  if (key === "A") return <TemplateA service={activeService} sub={activeSub} isArabic={isArabic} />;
                  if (key === "B") return <TemplateB service={activeService} sub={activeSub} isArabic={isArabic} />;
                  if (key === "C") return <TemplateC service={activeService} sub={activeSub} isArabic={isArabic} />;
                  return <TemplateDefault service={activeService} sub={activeSub} isArabic={isArabic} />;
                })()}
              </>
            )}

          </div>
        </div>
      </div>

      {/* ══ CONTACT / INQUIRY SECTION (listing view only) ════════ */}
      {!activeSub && <section className="w-full bg-[#f4f6f8] py-16 sm:py-20 lg:py-24 border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold tracking-wide text-stone-600">
              {isArabic ? "تواصل معنا الآن" : "Contact With Us Now"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-stone-900 text-center leading-tight mb-8 sm:mb-12 max-w-2xl mx-auto tracking-tight">
            {isArabic ? "لا تتردد في مراسلة خبرائنا التقنيين" : "Feel Free to Write Our Technology Experts"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all ${isArabic ? "text-right" : "text-left"}`} />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange}
                placeholder={isArabic ? "عنوان البريد الإلكتروني" : "Email Address"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all ${isArabic ? "text-right" : "text-left"}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all ${isArabic ? "text-right" : "text-left"}`} />
              <input type="text" name="subject" required value={formData.subject} onChange={handleInputChange}
                placeholder={isArabic ? "الموضوع أو الخدمة المطلوبة" : "Subject or Service Needed"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all ${isArabic ? "text-right" : "text-left"}`} />
            </div>
            <textarea name="message" required rows={6} value={formData.message} onChange={handleInputChange}
              placeholder={isArabic ? "الرسالة والتفاصيل" : "Message and details"}
              className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all resize-y ${isArabic ? "text-right" : "text-left"}`} />
            <div className="flex justify-center pt-2 sm:pt-4">
              <button type="submit" disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] active:scale-[0.98] text-white font-bold text-sm sm:text-[15px] px-10 py-3.5 rounded-full shadow-md shadow-[#009e90]/25 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>{isArabic ? "جاري الإرسال..." : "Sending..."}</span></>
                ) : (
                  <span>{isArabic ? "إرسال الرسالة" : "Send Message"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>}

      {/* ══ FAQ SECTION ══════════════════════════════════════════ */}
      <section className="w-full bg-[#f4f6f8] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0b2447] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mb-3">
                {isArabic ? "الأسئلة " : "Frequently Asked "}
                <span className="text-[#009e90]">{isArabic ? "الشائعة" : "Questions"}</span>
              </h2>
              <p className="text-sm sm:text-[15px] text-white/60 max-w-xl mx-auto leading-relaxed">
                {isArabic
                  ? "إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا."
                  : "Answers to the most common questions about our services. Can't find what you're looking for? Reach out to our team directly."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8 sm:mb-10">
              {SERVICES_FAQS.map((item) => (
                <div key={item.id}>
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-white mb-1.5 leading-snug">
                    {isArabic ? item.questionAr : item.question}
                  </h4>
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    {isArabic ? item.answerAr : item.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/8 border border-white/10 rounded-2xl px-5 sm:px-7 py-4 sm:py-5">
              <div>
                <p className="text-[15px] sm:text-[16px] font-bold text-white leading-snug">
                  {isArabic ? "لا تزال لديك أسئلة؟" : "Still have questions?"}
                </p>
                <p className="text-[12px] sm:text-[13px] text-white/55 mt-0.5">
                  {isArabic ? "نحن نفهم. دعنا نتواصل مع فريقنا مباشرةً." : "We understand. Let's get in touch directly with our team, then."}
                </p>
              </div>
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 shadow-md shadow-[#009e90]/30 hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto flex-shrink-0">
                {isArabic ? "تواصل معنا" : "Contact Us"}
                <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOOK A VISIT CTA BANNER ══════════════════════════════ */}
      <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0d2137] rounded-2xl border border-[#1a3a5c] px-6 sm:px-10 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex-1 min-w-0">
              <h3 className="text-[18px] sm:text-[22px] font-extrabold text-white leading-snug mb-1.5">
                {isArabic ? "احجز زيارة هذا الأسبوع." : "Book a visit for this week."}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed max-w-sm">
                {isArabic
                  ? "أخبرنا بما يحتاج إلى تنفيذ. ستحصل على عرض سعر ثابت في نفس اليوم ونافذة وصول مدتها ساعتان."
                  : "Tell us what needs doing. You'll get a fixed quote the same day and a two-hour arrival window."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] sm:text-[14px] px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#009e90]/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
                {isArabic ? "احجز فنياً" : "Book a Technician"}
              </Link>
              <a href="tel:+971556173300"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 hover:border-white/50 text-white font-bold text-[13px] sm:text-[14px] px-6 py-3 rounded-full transition-all duration-200 whitespace-nowrap">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {isArabic ? "اتصل الآن" : "Call Now"}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── EXPORT (wrapped in Suspense for useSearchParams) ────────── */
export default function ServicesListing() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#009e90] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
