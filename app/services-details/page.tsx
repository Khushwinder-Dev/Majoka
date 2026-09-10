"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  servicesDataEn,
  servicesDataAr,
  ServiceItem,
  SubServiceItem,
} from "@/data/servicesData";

/* ─── DEFAULT FALLBACK IMAGES ─────────────────────────────────── */
const DEFAULT_BANNER = "/media/servicesListing/Rectangle 14 (1).png";
const DEFAULT_GALLERY = [
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 1.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 2.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 3.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 4.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 5.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 6.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 7.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 8.png",
];

const FALLBACK_SUB_IMAGES = [
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
  secondaryFallbackSrc,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  secondaryFallbackSrc?: string;
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
        } else if (secondaryFallbackSrc && imgSrc !== secondaryFallbackSrc) {
          setImgSrc(secondaryFallbackSrc);
        }
      }}
    />
  );
}

/* ─── SIDEBAR ICON ───────────────────────────────────────────── */
function SidebarIcon({ src, active }: { src: string; active: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={17}
      height={17}
      className={`w-[17px] h-[17px] object-contain flex-shrink-0 transition-all duration-200 ${
        active ? "brightness-0 invert" : "opacity-40"
      }`}
    />
  );
}

/* ─── MAIN CONTENT COMPONENT ─────────────────────────────────── */
function ServiceDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isArabic } = useLanguage();

  const services = isArabic ? servicesDataAr : servicesDataEn;

  // Read query parameter: ?service=1 or ?service=waterproofing
  const serviceParam = searchParams.get("service") ?? "1";
  const subParam = searchParams.get("sub");

  // Find matching service by number or slug
  const service: ServiceItem =
    services.find(
      (s) =>
        s.serviceNumber.toString() === serviceParam ||
        s.serviceSlug.toLowerCase() === serviceParam.toLowerCase() ||
        s.serviceId.toLowerCase() === serviceParam.toLowerCase()
    ) ?? services[0];

  // Find active subservice if specified
  const activeSub: SubServiceItem | null =
    (subParam &&
      service.subservices.find(
        (sub) =>
          sub.serviceSlug.toLowerCase() === subParam.toLowerCase() ||
          sub.id.toLowerCase() === subParam.toLowerCase()
      )) ||
    null;

  // Banner details: if a subservice is selected, display that subservice's banner & title on top
  const bannerImage = activeSub?.serviceBanner || service.serviceBanner || DEFAULT_BANNER;
  const bannerEyebrow = activeSub
    ? `${service.serviceTitle} • ${service.category}`
    : isArabic
    ? "خدمات شركة تاج الرحمة"
    : "Taj Al Rahmah Services";
  const bannerTitle = activeSub ? activeSub.serviceTitle : service.serviceTitle;
  const bannerTagline = activeSub
    ? activeSub.shortDescription || activeSub.serviceContent
    : service.tagline;

  const handleSubSelect = (subSlug: string | null) => {
    if (!subSlug) {
      router.push(`/services-details?service=${service.serviceNumber}`, { scroll: false });
    } else {
      router.push(`/services-details?service=${service.serviceNumber}&sub=${subSlug}`, { scroll: false });
    }
  };

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* ══ HERO BANNER: DYNAMIC FOR SERVICE & SUBSERVICE ══════════ */}
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[330px] overflow-hidden bg-[#0b2447] transition-all duration-500">
        <SmartImage
          key={bannerImage}
          src={bannerImage}
          alt={bannerTitle}
          fallbackSrc={service.serviceBanner || DEFAULT_BANNER}
          secondaryFallbackSrc={DEFAULT_BANNER}
          priority
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15 text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-[#009e90]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{bannerEyebrow}</span>
          </div>

          <h1 className="text-2xl sm:text-[34px] md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight drop-shadow-md">
            {bannerTitle}
          </h1>

          <p className="text-xs sm:text-sm md:text-[15px] text-white/90 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-3">
            {bannerTagline}
          </p>

          {activeSub && (
            <button
              onClick={() => handleSubSelect(null)}
              className="mt-1 text-[11.5px] text-white/80 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              {isArabic ? "← العودة لعرض الخدمة الرئيسية" : "← View Main Service Overview"}
            </button>
          )}
        </div>
      </div>

      {/* ══ BREADCRUMB ═══════════════════════════════════════════ */}
      <div className="border-b border-stone-100 bg-stone-50/70">
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
            className={`hover:text-[#009e90] transition-colors ${!activeSub ? "font-bold text-stone-900" : ""}`}
          >
            {service.serviceTitle}
          </Link>
          {activeSub && (
            <>
              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
              <span className="font-bold text-[#009e90]">{activeSub.serviceTitle}</span>
            </>
          )}
        </div>
      </div>

      {/* ══ MAIN BODY ════════════════════════════════════════════ */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* ── SIDEBAR: ALL 11 SERVICES ───────────────────────── */}
          <aside className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-3 px-1">
              {isArabic ? "جميع الخدمات (11)" : "ALL SERVICES (11)"}
            </p>

            <nav className="flex flex-col gap-1">
              {services.map((svc) => {
                const isActive = svc.serviceSlug === service.serviceSlug;
                return (
                  <Link
                    key={svc.serviceSlug}
                    href={`/services-details?service=${svc.serviceNumber}`}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <SidebarIcon src={svc.icon || "/landing/services/6.svg"} active={isActive} />
                    <span
                      className={`text-[13px] font-semibold flex-grow truncate ${
                        isArabic ? "text-right" : "text-left"
                      }`}
                    >
                      {svc.serviceTitle}
                    </span>
                    {isActive && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA box */}
            <div className="mt-6 bg-[#009e90] rounded-2xl p-4 sm:p-5 text-white shadow-sm">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <MessageCircle className="w-[18px] h-[18px] text-white" />
              </div>
              <h4 className="text-[13px] font-bold mb-1.5 leading-snug">
                {isArabic ? "تحتاج استشارة فنية لمشروعك؟" : "Need technical advice?"}
              </h4>
              <p className="text-[11px] text-white/85 leading-relaxed mb-4">
                {isArabic
                  ? "مهندسونا متواجدون لمساعدتك في فحص الموقع واختيار المواصفات الأنسب."
                  : "Our certified engineering specialists are ready to inspect your site and provide tailored solutions."}
              </p>
              <Link
                href="/contact"
                className="text-[11px] font-bold text-white underline underline-offset-2 hover:text-white/80 transition-colors duration-200"
              >
                {isArabic ? "احجز معاينة مجانية" : "Request a site inspection"}
              </Link>
            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Back link */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#009e90] hover:text-[#01887e] transition-colors duration-200 self-start"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
              {isArabic ? "العودة إلى الخدمات" : "Back to services"}
            </Link>

            {/* Sub-services Quick Tabs / Filter Bar */}
            <div className="bg-stone-50 p-3 sm:p-4 rounded-2xl border border-stone-200/80">
              <div className="flex items-center gap-2 mb-2.5 px-1">
                <Layers className="w-4 h-4 text-[#009e90]" />
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-stone-700">
                  {isArabic ? "اختر الخدمة الفرعية لعرض البانر وتفاصيلها:" : "Select Sub-Service to display its top banner:"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSubSelect(null)}
                  className={`text-[12px] px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    !activeSub
                      ? "bg-[#009e90] text-white shadow-xs"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-[#009e90]/50"
                  }`}
                >
                  {isArabic ? "نظرة عامة على الخدمة" : "All Sub-Services Overview"}
                </button>
                {service.subservices.map((sub) => {
                  const isSelected = activeSub?.serviceSlug === sub.serviceSlug;
                  return (
                    <button
                      key={sub.id || sub.serviceSlug}
                      onClick={() => handleSubSelect(sub.serviceSlug)}
                      className={`text-[12px] px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#009e90] text-white shadow-xs"
                          : "bg-white text-stone-700 border border-stone-200 hover:border-[#009e90]/50"
                      }`}
                    >
                      {sub.serviceTitle}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service title header */}
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-1">
                {service.category}
              </p>
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-extrabold text-stone-900 leading-tight">
                {service.serviceTitle}
              </h2>
            </div>

            {/* Service Content (Intro Card) */}
            <div className="bg-[#f0faf9] border-l-4 border-[#009e90] rounded-r-xl px-5 py-4">
              <p className="text-[13.5px] text-stone-700 leading-relaxed">
                {service.serviceContent}
              </p>
            </div>

            {/* Sub-services Detailed Cards */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#009e90]" />
                <h3 className="text-[16px] font-extrabold text-stone-900 uppercase tracking-wider">
                  {isArabic ? "التقنيات والخدمات الفرعية" : "Technologies & Sub-Services"}
                </h3>
              </div>

              {service.subservices.map((sub, idx) => {
                const isSelectedSub = activeSub?.serviceSlug === sub.serviceSlug;
                const fallbackImg = FALLBACK_SUB_IMAGES[idx % FALLBACK_SUB_IMAGES.length];

                return (
                  <div
                    key={sub.id || sub.serviceSlug}
                    id={sub.serviceSlug}
                    className={`bg-white rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                      isSelectedSub
                        ? "border-[#009e90] ring-2 ring-[#009e90]/25 shadow-md bg-stone-50/30"
                        : "border-stone-100 shadow-sm hover:border-stone-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-5 items-start">
                      {/* Subservice image thumbnail */}
                      <div className="relative w-full md:w-[220px] h-[145px] rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                        <SmartImage
                          src={sub.serviceImage || service.serviceImage}
                          alt={sub.serviceTitle}
                          fallbackSrc={fallbackImg}
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h4 className="text-[16px] font-bold text-stone-900 flex items-center gap-2">
                            <span className="inline-block w-1.5 h-4 bg-[#009e90] rounded-full flex-shrink-0" />
                            {sub.serviceTitle}
                          </h4>
                          <button
                            onClick={() => handleSubSelect(sub.serviceSlug)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                              isSelectedSub
                                ? "bg-[#009e90] text-white"
                                : "bg-stone-100 text-stone-600 hover:bg-[#009e90]/10 hover:text-[#009e90]"
                            }`}
                          >
                            {isSelectedSub
                              ? isArabic
                                ? "البانر الحالي بالأعلى ✓"
                                : "Active Banner on Top ✓"
                              : isArabic
                              ? "عرض البانر بالأعلى"
                              : "Show Top Banner"}
                          </button>
                        </div>

                        <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
                          {sub.serviceContent || sub.shortDescription}
                        </p>

                        {/* Primary applications */}
                        {sub.primaryApplications && (
                          <div className="mb-2 text-[12.5px] text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            <strong className="text-[#009e90] font-semibold">
                              {isArabic ? "الاستخدامات الأساسية: " : "Primary Applications: "}
                            </strong>
                            {sub.primaryApplications}
                          </div>
                        )}

                        {/* Competitive advantage */}
                        {sub.competitiveAdvantage && (
                          <div className="mb-3 text-[12.5px] text-stone-700 bg-[#f0faf9] p-2.5 rounded-lg border border-[#009e90]/20">
                            <strong className="text-[#009e90] font-semibold">
                              {isArabic ? "الميزة التنافسية: " : "Competitive Advantage: "}
                            </strong>
                            {sub.competitiveAdvantage}
                          </div>
                        )}

                        {/* Key benefits list */}
                        {sub.keyBenefits && sub.keyBenefits.length > 0 && (
                          <ul className="flex flex-col gap-1.5 mt-2">
                            {sub.keyBenefits.map((benefit, bi) => (
                              <li key={bi} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#009e90] flex-shrink-0 mt-0.5" />
                                <span className="text-[12px] text-stone-600 leading-normal">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Process steps */}
                        {sub.process && sub.process.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-stone-100">
                            <p className="text-[11.5px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                              {isArabic ? "مراحل التنفيذ:" : "Execution Stages:"}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {sub.process.map((step, si) => (
                                <div
                                  key={si}
                                  className="text-[11.5px] text-stone-600 bg-stone-50/80 px-2.5 py-1.5 rounded border border-stone-100"
                                >
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why Choose Taj Al Rahmah */}
            <div className="bg-stone-50 rounded-2xl border border-stone-100 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#009e90]" />
                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-stone-900">
                  {service.whyChooseTitle}
                </h3>
              </div>
              <p className="text-[13.5px] text-stone-600 leading-relaxed mb-6">
                {service.whyChooseContent}
              </p>

              {/* Why choose cards */}
              {service.whyChoosePoints && service.whyChoosePoints.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {service.whyChoosePoints.map((point, pi) => (
                    <div
                      key={pi}
                      className="bg-white p-4 rounded-xl border border-stone-100 shadow-2xs"
                    >
                      <h4 className="text-[13.5px] font-bold text-stone-900 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#009e90]" />
                        {point.title}
                      </h4>
                      <p className="text-[12px] text-stone-500 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery section */}
              <div className="mt-4 pt-6 border-t border-stone-200/70">
                <p className="text-[11.5px] font-bold text-stone-800 uppercase tracking-wider mb-4">
                  {isArabic ? "معرض صور المشاريع والتنفيذ" : "Project Gallery & Execution"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(service.servicesgalaryImages && service.servicesgalaryImages.length > 0
                    ? service.servicesgalaryImages
                    : DEFAULT_GALLERY.slice(0, 4)
                  ).map((src, gi) => {
                    const fallback = DEFAULT_GALLERY[gi % DEFAULT_GALLERY.length];
                    return (
                      <div
                        key={gi}
                        className="relative aspect-square rounded-lg overflow-hidden bg-stone-200 hover:opacity-95 transition-opacity duration-200 shadow-2xs"
                      >
                        <SmartImage
                          src={src}
                          alt={`Project Gallery ${gi + 1}`}
                          fallbackSrc={fallback}
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b2447] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
              <div>
                <h4 className="text-[17px] sm:text-[19px] font-bold mb-1">
                  {isArabic
                    ? "جاهز لبدء مشروعك بأعلى معايير الجودة؟"
                    : "Ready to start your project with guaranteed quality?"}
                </h4>
                <p className="text-[12.5px] text-white/80">
                  {isArabic
                    ? "تواصل مع مهندسينا الآن للحصول على استشارة فنية وعرض سعر مخصص."
                    : "Contact our contracting engineers today for a free assessment and formal proposal."}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white px-7 py-3 rounded-full font-bold text-[13px] tracking-wide shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap self-stretch sm:self-center justify-center"
              >
                {isArabic ? "احجز استشارة الآن" : "Schedule Now!"}
                <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            </div>

            {/* Bottom back link */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#009e90] hover:text-[#01887e] transition-colors duration-200 self-start"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
              {isArabic ? "العودة إلى الخدمات" : "Back to services"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXPORT WITH SUSPENSE (Required for useSearchParams) ─────── */
export default function ServiceDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#009e90] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ServiceDetailsContent />
    </Suspense>
  );
}
