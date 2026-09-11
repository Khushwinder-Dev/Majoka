/**
 * TEMPLATE B — "Installation Showcase"
 * Layout: wide hero image top, 2-col description + stats,
 * applications icon-grid, competitive advantages cards,
 * gallery row, CTA.
 *
 * Best used for: swimming pools, electrical, plumbing, tiling
 * (installation / fit-out services with visual emphasis)
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Star,
  MapPin,
  Zap,
} from "lucide-react";
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

export default function TemplateB({ service, sub, isArabic }: Props) {
  const galleryImages =
    sub.servicesgalaryImages?.length ? sub.servicesgalaryImages :
    service.servicesgalaryImages?.length ? service.servicesgalaryImages : [];

  return (
    <article className="w-full" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── 1. WIDE HERO IMAGE ─────────────────────────────────── */}
      <section className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-stone-100 mb-10 shadow-md">
        <Img
          src={sub.serviceImage || service.serviceImage}
          alt={sub.serviceTitle}
          priority
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <span className="inline-block bg-[#009e90] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-2 tracking-wide">
            {service.category}
          </span>
          <h2 className="text-[22px] sm:text-[28px] font-extrabold text-white leading-tight drop-shadow">
            {sub.serviceTitle}
          </h2>
        </div>
      </section>

      {/* ── 2. OVERVIEW: description left + highlights right ──── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left: 2/3 width description */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-[14.5px] text-stone-700 leading-relaxed">
            {sub.serviceContent}
          </p>
          {sub.shortDescription && (
            <p className="text-[13px] text-stone-500 leading-relaxed border-l-4 border-[#009e90]/40 pl-4">
              {sub.shortDescription}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] px-6 py-2.5 rounded-full transition-colors"
            >
              {isArabic ? "اطلب عرض سعر" : "Get a Quote"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: 1/3 quick-stats / highlights card */}
        <div className="bg-[#0b2447] rounded-2xl p-5 text-white flex flex-col gap-4">
          <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90]">
            {isArabic ? "نبذة سريعة" : "Quick Facts"}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#009e90]/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-[#009e90]" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 uppercase tracking-wider">
                {isArabic ? "الفئة" : "Category"}
              </p>
              <p className="text-[13px] font-bold">{service.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#009e90]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#009e90]" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 uppercase tracking-wider">
                {isArabic ? "موقع الخدمة" : "Service Region"}
              </p>
              <p className="text-[13px] font-bold">UAE — Dubai, Abu Dhabi, Sharjah</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#009e90]/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-[#009e90]" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 uppercase tracking-wider">
                {isArabic ? "وقت الاستجابة" : "Response Time"}
              </p>
              <p className="text-[13px] font-bold">
                {isArabic ? "خلال 24 ساعة" : "Within 24 hours"}
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 mt-auto">
            <a
              href="tel:+97155617330"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[12.5px] px-4 py-2.5 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {isArabic ? "اتصل الآن" : "+971 55 617 3300"}
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. PRIMARY APPLICATIONS grid ──────────────────────── */}
      {sub.primaryApplications && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-4">
            {isArabic ? "أين نطبق هذه الخدمة؟" : "Where We Apply This Service"}
          </h3>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <p className="text-[14px] text-stone-700 leading-relaxed">
              {sub.primaryApplications}
            </p>
          </div>
        </section>
      )}

      {/* ── 4. KEY BENEFITS — 2-col card grid ──────────────────── */}
      {sub.keyBenefits && sub.keyBenefits.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-5">
            {isArabic ? "لماذا تختار هذه الخدمة؟" : "Why Choose This Service?"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sub.keyBenefits.map((benefit, i) => {
              const [title, ...rest] = benefit.split(":");
              const desc = rest.join(":").trim();
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border border-stone-100 rounded-xl p-4 hover:border-[#009e90]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#009e90]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#009e90]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-stone-900 leading-snug">
                      {desc ? title : benefit}
                    </p>
                    {desc && (
                      <p className="text-[12px] text-stone-500 mt-0.5 leading-relaxed">{desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 5. COMPETITIVE ADVANTAGE ───────────────────────────── */}
      {sub.competitiveAdvantage && (
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#009e90]/10 to-[#009e90]/5 border border-[#009e90]/20 rounded-2xl p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#009e90] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-1">
                {isArabic ? "ميزتنا التنافسية" : "Our Competitive Advantage"}
              </p>
              <p className="text-[14px] text-stone-800 leading-relaxed font-medium">
                {sub.competitiveAdvantage}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EXECUTION PROCESS (if present) ──────────────────── */}
      {sub.process && sub.process.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-5">
            {isArabic ? "مراحل التنفيذ" : "How We Do It"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sub.process.map((step, i) => {
              const [title, ...rest] = step.split(":");
              const desc = rest.join(":").trim();
              return (
                <div key={i} className="flex gap-3 bg-white border border-stone-100 rounded-xl p-4">
                  <div className="w-7 h-7 rounded-full bg-[#009e90] text-white text-[12px] font-extrabold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-stone-900">{desc ? title : step}</p>
                    {desc && <p className="text-[12px] text-stone-500 mt-0.5">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 7. GALLERY horizontal scroll strip ─────────────────── */}
      {galleryImages.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-4">
            {isArabic ? "معرض الأعمال" : "Work Gallery"}
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-200">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100 shadow-xs"
              >
                <Img src={src} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. BOTTOM CTA ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#0b2447] to-[#0d2e5a] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h4 className="text-[17px] sm:text-[20px] font-extrabold text-white leading-snug mb-1">
            {isArabic
              ? "جاهز لتنفيذ مشروعك بأعلى المعايير؟"
              : "Ready to get started with guaranteed quality?"}
          </h4>
          <p className="text-[12.5px] text-white/65">
            {isArabic
              ? "تواصل مع مهندسينا للحصول على استشارة مجانية وعرض سعر."
              : "Contact our engineers for a free consultation and formal proposal."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[13px] px-6 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            {isArabic ? "احجز الآن" : "Schedule Now"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="tel:+97155617330"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-[13px] px-5 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            {isArabic ? "اتصل بنا" : "Call Us"}
          </a>
        </div>
      </section>

    </article>
  );
}
