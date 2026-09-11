"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  servicesDataEn,
  servicesDataAr,
  ServiceItem,
  SubServiceItem,
} from "@/data/servicesData";
import { ServiceIcon, SubServiceIcon } from "@/components/ServiceIcon";
import {
  TemplateDefault,
  TemplateA,
  TemplateB,
  TemplateC,
  getTemplateKey,
} from "@/components/service-templates";

/* ─── FALLBACKS ────────────────────────────────────────────────── */
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

/* ─── SMART IMAGE ──────────────────────────────────────────────── */
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
  useEffect(() => { setImgSrc(src); }, [src]);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      className={className}
      onError={() => { if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc); }}
    />
  );
}

/* ─── SUB-SERVICE CARD (overview grid) ────────────────────────── */
function SubServiceCard({
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
  return (
    <Link
      href={`/services-details?service=${service.serviceNumber}&sub=${sub.serviceSlug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-[#009e90]/30 shadow-sm hover:shadow-[0_8px_28px_rgba(0,158,144,0.12)] transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative w-full h-[160px] overflow-hidden bg-stone-100 flex-shrink-0">
        <SmartImage
          src={sub.serviceImage || service.serviceImage}
          alt={sub.serviceTitle}
          fallbackSrc={fallback}
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[14px] font-bold text-stone-900 leading-snug mb-1.5 group-hover:text-[#009e90] transition-colors">
          {sub.serviceTitle}
        </h3>
        <p className="text-[12.5px] text-stone-500 leading-relaxed line-clamp-3 flex-grow mb-3">
          {sub.shortDescription || sub.serviceContent}
        </p>
        <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#009e90] group-hover:gap-2 transition-all mt-auto">
          {isArabic ? "عرض التفاصيل" : "View Details"}
          <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
        </span>
      </div>
    </Link>
  );
}

/* ─── SIDEBAR ──────────────────────────────────────────────────── */
function Sidebar({
  services,
  activeService,
  activeSub,
  isArabic,
}: {
  services: ServiceItem[];
  activeService: ServiceItem;
  activeSub: SubServiceItem | null;
  isArabic: boolean;
}) {
  return (
    <aside className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0 lg:sticky lg:top-24">
      {/* Label */}
      <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-stone-400 mb-3 px-1">
        {isArabic ? "الخدمات" : "TRADES"}
      </p>

      <nav className="flex flex-col gap-0.5">
        {services.map((svc) => {
          const isActive = svc.serviceSlug === activeService.serviceSlug;
          return (
            <div key={svc.serviceSlug} className="flex flex-col">
              {/* Parent service */}
              <Link
                href={`/services-details?service=${svc.serviceNumber}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg w-full transition-all duration-150 group ${
                  isActive
                    ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                  isActive ? "bg-white/20" : "bg-[#009e90]/10"
                }`}>
                  <ServiceIcon slug={svc.serviceSlug} active={isActive} size={14} />
                </div>
                <span className="text-[13px] font-semibold flex-grow truncate leading-snug">
                  {svc.serviceTitle}
                </span>
                {isActive
                  ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                  : <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-35 group-hover:opacity-70 ${isArabic ? "rotate-180" : ""}`} />
                }
              </Link>             
            </div>
          );
        })}
      </nav>

      {/* CTA box */}
      <div className="mt-5 bg-[#009e90] rounded-2xl p-4 text-white">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-[12.5px] font-bold mb-1.5 leading-snug">
          {isArabic ? "تحتاج استشارة فنية؟" : "Need technical advice?"}
        </h4>
        <p className="text-[11px] text-white/80 leading-relaxed mb-3">
          {isArabic
            ? "مهندسونا جاهزون لفحص موقعك وتقديم الحل الأنسب."
            : "Our engineers are ready to inspect your site and provide the best solution."}
        </p>
        <Link
          href="/contact"
          className="text-[11.5px] font-bold text-white underline underline-offset-2 hover:text-white/80 transition-colors"
        >
          {isArabic ? "احجز معاينة مجانية" : "Request a free inspection"}
        </Link>
      </div>
    </aside>
  );
}

/* ─── HERO BANNER ──────────────────────────────────────────────── */
function HeroBanner({
  image,
  title,
  eyebrow,
  tagline,
}: {
  image: string;
  title: string;
  eyebrow: string;
  tagline: string;
}) {
  const [src, setSrc] = useState(image);
  useEffect(() => { setSrc(image); }, [image]);
  return (
    <div className="relative w-full h-[240px] sm:h-[290px] md:h-[340px] overflow-hidden bg-[#0b2447]">
      <Image
        src={src}
        alt={title}
        fill
        unoptimized
        priority
        className="object-cover object-center"
        onError={() => { if (src !== DEFAULT_BANNER) setSrc(DEFAULT_BANNER); }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
        <p className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] uppercase text-[#009e90]">
          {eyebrow}
        </p>
        <h1 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-white leading-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-[12px] sm:text-[14px] text-white/85 max-w-2xl leading-relaxed line-clamp-2">
          {tagline}
        </p>
      </div>
    </div>
  );
}

/* ─── SERVICE OVERVIEW (no ?sub) ───────────────────────────────── */
function ServiceOverview({
  service,
  isArabic,
}: {
  service: ServiceItem;
  isArabic: boolean;
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* Service intro */}
      <div className="bg-[#f0faf9] border-l-4 border-[#009e90] rounded-r-xl px-5 py-4">
        <p className="text-[14px] text-stone-700 leading-relaxed">
          {service.shortDescription || service.serviceContent}
        </p>
      </div>

      {/* Sub-service card grid */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="w-[3px] h-5 bg-[#009e90] rounded-full" />
          <h2 className="text-[17px] font-extrabold text-stone-900">
            {isArabic ? "الخدمات الفرعية" : "Sub-Services"}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {service.subservices.map((sub, idx) => (
            <SubServiceCard
              key={sub.id || sub.serviceSlug}
              service={service}
              sub={sub}
              idx={idx}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>

      {/* Why choose section */}
      {/* {service.whyChooseTitle && (
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 sm:p-8">
          <h3 className="text-[18px] sm:text-[20px] font-extrabold text-stone-900 mb-2">
            {service.whyChooseTitle}
          </h3>
          <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
            {service.whyChooseContent}
          </p>
          {service.whyChoosePoints?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.whyChoosePoints.map((pt, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-stone-100 shadow-xs">
                  <h4 className="text-[13px] font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#009e90] flex-shrink-0" />
                    {pt.title}
                  </h4>
                  <p className="text-[12px] text-stone-500 leading-relaxed">{pt.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}

      {/* Gallery */}
      {/* {service.servicesgalaryImages?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[3px] h-5 bg-[#009e90] rounded-full" />
            <h3 className="text-[17px] font-extrabold text-stone-900">
              {isArabic ? "معرض المشاريع" : "Project Gallery"}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {service.servicesgalaryImages.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-xs hover:shadow-sm transition-shadow">
                <SmartImage
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fallbackSrc={FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* CTA strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b2447] text-white p-6 sm:p-8 rounded-2xl">
        <div>
          <h4 className="text-[17px] sm:text-[19px] font-bold mb-1">
            {isArabic ? "جاهز لبدء مشروعك؟" : "Ready to start your project?"}
          </h4>
          <p className="text-[12.5px] text-white/75">
            {isArabic
              ? "تواصل مع مهندسينا للحصول على عرض سعر مخصص."
              : "Contact our engineers for a free assessment and formal proposal."}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white px-7 py-3 rounded-full font-bold text-[13px] whitespace-nowrap transition-colors shadow-sm"
        >
          {isArabic ? "احجز استشارة" : "Schedule a Consultation"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE CONTENT ────────────────────────────────────────── */
function ServiceDetailsContent() {
  const searchParams = useSearchParams();
  const { isArabic } = useLanguage();

  const services = isArabic ? servicesDataAr : servicesDataEn;

  const serviceParam = searchParams.get("service") ?? "1";
  const subParam     = searchParams.get("sub") ?? null;

  /* Resolve service */
  const service: ServiceItem =
    services.find(
      (s) =>
        s.serviceNumber.toString() === serviceParam ||
        s.serviceSlug.toLowerCase()  === serviceParam.toLowerCase() ||
        s.serviceId.toLowerCase()    === serviceParam.toLowerCase()
    ) ?? services[0];

  /* Resolve sub-service */
  const activeSub: SubServiceItem | null = subParam
    ? service.subservices.find(
        (s) =>
          s.serviceSlug.toLowerCase() === subParam.toLowerCase() ||
          s.id.toLowerCase()          === subParam.toLowerCase()
      ) ?? null
    : null;

  /* Hero content */
  const heroBanner  = activeSub?.serviceBanner || service.serviceBanner || DEFAULT_BANNER;
  const heroTitle   = activeSub ? activeSub.serviceTitle : service.serviceTitle;
  const heroEyebrow = activeSub
    ? `${service.serviceTitle} • ${service.category}`
    : isArabic ? "خدمات تاج الرحمة" : "Taj Al Rahmah Services";
  const heroTagline = activeSub
    ? activeSub.shortDescription || activeSub.serviceContent
    : service.tagline;

  /* Template selection */
  const templateKey = activeSub
    ? getTemplateKey(service.serviceSlug, activeSub.serviceSlug)
    : null;

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── HERO BANNER ──────────────────────────────────────── */}
      <HeroBanner
        image={heroBanner}
        title={heroTitle}
        eyebrow={heroEyebrow}
        tagline={heroTagline}
      />

      {/* ── BREADCRUMB ───────────────────────────────────────── */}
      {/* <div className="border-b border-stone-100 bg-stone-50/70">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[12px] text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#009e90] transition-colors">
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
          <Link href="/services" className="hover:text-[#009e90] transition-colors">
            {isArabic ? "الخدمات" : "Services"}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
          <Link
            href={`/services-details?service=${service.serviceNumber}`}
            className={`hover:text-[#009e90] transition-colors ${!activeSub ? "font-semibold text-stone-800" : ""}`}
          >
            {service.serviceTitle}
          </Link>
          {activeSub && (
            <>
              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
              <span className="font-semibold text-[#009e90]">{activeSub.serviceTitle}</span>
            </>
          )}
        </div>
      </div> */}

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 bg-stone-50/70">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* Left sidebar */}
          <Sidebar
            services={services}
            activeService={service}
            activeSub={activeSub}
            isArabic={isArabic}
          />

          {/* Right main content */}
          <main className="flex-1 min-w-0">

            {/* Back + heading row */}
            <div className="flex flex-col gap-1 mb-4">
              <Link
                href={activeSub ? `/services-details?service=${service.serviceNumber}` : "/services"}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-stone-400 hover:text-[#009e90] transition-colors self-start mb-1"
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                {activeSub
                  ? isArabic ? `العودة إلى ${service.serviceTitle}` : `Back to ${service.serviceTitle}`
                  : isArabic ? "العودة إلى الخدمات" : "Back to Services"
                }
              </Link>
              <div className="flex items-center gap-2.5">
                <div>
                  <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] hidden">
                    {/* {activeSub ? service.serviceTitle : service.category} */}
                    {service.serviceTitle + service.tagline}
                  </p>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#009e90] leading-tight">
                    {/* {activeSub ? activeSub.serviceTitle : service.serviceTitle} */}
                    {service.serviceTitle + service.tagline}
                  </h2>
                </div>
              </div>
            </div>

            {/* ── MODE 1: Service overview (no sub selected) ── */}
            {!activeSub && (
              <ServiceOverview service={service} isArabic={isArabic} />
            )}

            {/* ── MODE 2: Sub-service detail with template ─── */}
            {activeSub && templateKey === "default" && (
              <TemplateDefault service={service} sub={activeSub} isArabic={isArabic} />
            )}
            {activeSub && templateKey === "A" && (
              <TemplateA service={service} sub={activeSub} isArabic={isArabic} />
            )}
            {activeSub && templateKey === "B" && (
              <TemplateB service={service} sub={activeSub} isArabic={isArabic} />
            )}
            {activeSub && templateKey === "C" && (
              <TemplateC service={service} sub={activeSub} isArabic={isArabic} />
            )}

          </main>
        </div>
      </div>

      {/* ══ BOOK A VISIT CTA BANNER ════════════════════════════ */}
      <section className="w-full bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="bg-[#0d2137] rounded-2xl border border-[#1a3a5c] px-6 sm:px-10 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Left: text */}
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
            {/* Right: buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] sm:text-[14px] px-6 py-3 rounded-full transition-all duration-200 shadow-md shadow-[#009e90]/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                {isArabic ? "احجز فنياً" : "Book a Technician"}
              </Link>
              <a
                href="tel:+971556173300"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 hover:border-white/50 text-white font-bold text-[13px] sm:text-[14px] px-6 py-3 rounded-full transition-all duration-200 whitespace-nowrap"
              >
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

/* ─── EXPORT ───────────────────────────────────────────────────── */
export default function ServiceDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#009e90] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ServiceDetailsContent />
    </Suspense>
  );
}
