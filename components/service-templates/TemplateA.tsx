/**
 * TEMPLATE A — "Technical Deep-Dive"
 * Layout: hero image left + description right, key-benefits list,
 * execution process numbered steps, gallery grid at bottom.
 *
 * Best used for: waterproofing systems, structural / chemical services
 * (GRP, bitumen membrane, polyurea, injection grouting…)
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ArrowRight, Phone, Layers } from "lucide-react";
import type { ServiceItem, SubServiceItem } from "@/data/servicesData";

/* ─── helpers ─────────────────────────────────────────────────── */
const FALLBACK = "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png";

function Img({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [s, setS] = useState(src || FALLBACK);
  return (
    <Image
      src={s}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      sizes="(max-width:768px) 100vw, 50vw"
      className={className ?? "object-cover"}
      onError={() => setS(FALLBACK)}
    />
  );
}

/* ─── component ──────────────────────────────────────────────── */
interface Props {
  service: ServiceItem;
  sub: SubServiceItem;
  isArabic: boolean;
}

export default function TemplateA({ service, sub, isArabic }: Props) {
  const galleryImages =
    sub.servicesgalaryImages?.length ? sub.servicesgalaryImages :
    service.servicesgalaryImages?.length ? service.servicesgalaryImages : [];

  return (
    <article className="w-full" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── 1. HERO: image left + description right ────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
          <Img src={sub.serviceImage || service.serviceImage} alt={sub.serviceTitle} priority />
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-[#009e90] text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
            {service.category}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#009e90] mb-2">
              {service.serviceTitle}
            </p>
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-stone-900 leading-tight mb-3">
              {sub.serviceTitle}
            </h2>
            <p className="text-[14.5px] text-stone-600 leading-relaxed">
              {sub.serviceContent}
            </p>
          </div>

          {/* Short description highlight */}
          {sub.shortDescription && (
            <div className="border-l-4 border-[#009e90] pl-4 bg-[#f0faf9] py-3 pr-3 rounded-r-xl">
              <p className="text-[13px] text-stone-700 leading-relaxed italic">
                {sub.shortDescription}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              {isArabic ? "احجز استشارة" : "Request a Consultation"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/services-details?service=${service.serviceNumber}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone-600 hover:text-[#009e90] transition-colors"
            >
              <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
              {isArabic ? "جميع خدمات " + service.serviceTitle : "All " + service.serviceTitle}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. KEY BENEFITS ────────────────────────────────────── */}
      {sub.keyBenefits && sub.keyBenefits.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5 text-[#009e90]" />
            <h3 className="text-[18px] font-extrabold text-stone-900">
              {isArabic ? "المزايا الرئيسية" : "Key Benefits"}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sub.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white border border-stone-100 rounded-xl p-4 shadow-xs hover:border-[#009e90]/30 transition-colors"
              >
                <CheckCircle2 className="w-4.5 h-4.5 text-[#009e90] flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-stone-700 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. PRIMARY APPLICATIONS + COMPETITIVE ADVANTAGE ──────── */}
      {(sub.primaryApplications || sub.competitiveAdvantage) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {sub.primaryApplications && (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-2">
                {isArabic ? "الاستخدامات الأساسية" : "Primary Applications"}
              </p>
              <p className="text-[13.5px] text-stone-700 leading-relaxed">
                {sub.primaryApplications}
              </p>
            </div>
          )}
          {sub.competitiveAdvantage && (
            <div className="bg-[#f0faf9] border border-[#009e90]/20 rounded-2xl p-5">
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-2">
                {isArabic ? "ميزتنا التنافسية" : "Competitive Advantage"}
              </p>
              <p className="text-[13.5px] text-stone-700 leading-relaxed">
                {sub.competitiveAdvantage}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ── 4. EXECUTION PROCESS ───────────────────────────────── */}
      {sub.process && sub.process.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-5 rounded-full bg-[#009e90] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-extrabold text-white">✓</span>
            </span>
            <h3 className="text-[18px] font-extrabold text-stone-900">
              {isArabic ? "مراحل التنفيذ" : "Execution Process"}
            </h3>
          </div>
          <div className="flex flex-col gap-0">
            {sub.process.map((step, i) => {
              const [title, ...rest] = step.split(":");
              const desc = rest.join(":").trim();
              return (
                <div key={i} className="flex gap-4 pb-6 relative">
                  {/* vertical line */}
                  {i < sub.process!.length - 1 && (
                    <div className="absolute left-[18px] top-9 bottom-0 w-[2px] bg-[#009e90]/20" />
                  )}
                  {/* step number */}
                  <div className="w-9 h-9 rounded-full bg-[#009e90] text-white flex items-center justify-center flex-shrink-0 text-[13px] font-extrabold shadow-sm z-10">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[13.5px] font-bold text-stone-900 mb-0.5">
                      {desc ? title : step}
                    </p>
                    {desc && (
                      <p className="text-[12.5px] text-stone-500 leading-relaxed">{desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 5. PROJECT GALLERY ─────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[18px] font-extrabold text-stone-900">
              {isArabic ? "معرض المشاريع" : "Project Gallery"}
            </h3>
            <span className="text-[11px] text-stone-400">{galleryImages.length} {isArabic ? "صورة" : "photos"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-xs hover:shadow-md transition-shadow">
                <Img src={src} alt={`${sub.serviceTitle} ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. BOTTOM CTA STRIP ────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#0b2447] to-[#0d2e5a] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#009e90] mb-1">
            {isArabic ? "ابدأ مشروعك اليوم" : "Start Your Project Today"}
          </p>
          <h4 className="text-[17px] sm:text-[19px] font-extrabold text-white leading-snug">
            {isArabic
              ? `هل تحتاج ${sub.serviceTitle}؟ تواصل معنا الآن`
              : `Need ${sub.serviceTitle}? Get in touch`}
          </h4>
          <p className="text-[12px] text-white/70 mt-1">
            {isArabic
              ? "فريقنا الهندسي جاهز لمعاينة موقعك وتقديم عرض سعر مخصص."
              : "Our engineering team is ready to inspect your site and provide a tailored quote."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] px-6 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            {isArabic ? "احجز معاينة مجانية" : "Book Free Site Visit"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="tel:+97155617330"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-[13px] px-5 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            {isArabic ? "اتصل بنا" : "Call Us Now"}
          </a>
        </div>
      </section>

    </article>
  );
}
