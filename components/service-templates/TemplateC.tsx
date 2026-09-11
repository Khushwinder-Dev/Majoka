/**
 * TEMPLATE C — "Finishing & Maintenance Showcase"
 * Layout: stacked full-width banner, alternating feature rows,
 * 4-column benefit icons, masonry-style gallery, CTA.
 *
 * Best used for: plastering, painting, false ceilings,
 * carpentry, HVAC, cleaning (finish / maintenance services)
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  Clock,
  Shield,
  Award,
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

const TRUST_ICONS = [
  { Icon: Sparkles, labelEn: "Premium Quality",     labelAr: "جودة عالية"           },
  { Icon: Clock,    labelEn: "On-Time Delivery",    labelAr: "تسليم في الوقت المحدد" },
  { Icon: Shield,   labelEn: "Certified Materials", labelAr: "مواد معتمدة"          },
  { Icon: Award,    labelEn: "10+ Years Experience",labelAr: "خبرة أكثر من 10 سنوات"},
];

/* ─── component ──────────────────────────────────────────────── */
interface Props {
  service: ServiceItem;
  sub: SubServiceItem;
  isArabic: boolean;
}

export default function TemplateC({ service, sub, isArabic }: Props) {
  const galleryImages =
    sub.servicesgalaryImages?.length ? sub.servicesgalaryImages :
    service.servicesgalaryImages?.length ? service.servicesgalaryImages : [];

  return (
    <article className="w-full" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── 1. FULL-WIDTH BANNER + TITLE ───────────────────────── */}
      <section className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden mb-10 bg-stone-100 shadow-md">
        <Img
          src={sub.serviceBanner || sub.serviceImage || service.serviceBanner}
          alt={sub.serviceTitle}
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
          <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#009e90] mb-2">
            {service.category}
          </span>
          <h2 className="text-[24px] sm:text-[32px] font-extrabold text-white leading-tight max-w-xl drop-shadow mb-3">
            {sub.serviceTitle}
          </h2>
          {sub.shortDescription && (
            <p className="text-[13px] text-white/80 max-w-lg leading-relaxed line-clamp-2">
              {sub.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* ── 2. TRUST BADGES ────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {TRUST_ICONS.map(({ Icon, labelEn, labelAr }, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 p-4 bg-stone-50 border border-stone-100 rounded-xl text-center hover:border-[#009e90]/30 hover:bg-[#f0faf9] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#009e90]/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#009e90]" />
            </div>
            <p className="text-[12px] font-semibold text-stone-700 leading-snug">
              {isArabic ? labelAr : labelEn}
            </p>
          </div>
        ))}
      </section>

      {/* ── 3. ALTERNATING FEATURE ROW: text + image ───────────── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] sm:text-[24px] font-extrabold text-stone-900 leading-tight">
              {isArabic ? "نبذة عن الخدمة" : "About This Service"}
            </h3>
            <p className="text-[14px] text-stone-600 leading-relaxed">
              {sub.serviceContent}
            </p>
            {sub.primaryApplications && (
              <div className="bg-[#f0faf9] border border-[#009e90]/20 rounded-xl p-4">
                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-1">
                  {isArabic ? "أين تُطبَّق هذه الخدمة؟" : "Primary Applications"}
                </p>
                <p className="text-[13px] text-stone-700 leading-relaxed">
                  {sub.primaryApplications}
                </p>
              </div>
            )}
          </div>
          {/* Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
            <Img src={sub.serviceImage || service.serviceImage} alt={sub.serviceTitle} />
          </div>
        </div>
      </section>

      {/* ── 4. KEY BENEFITS — icon list ────────────────────────── */}
      {sub.keyBenefits && sub.keyBenefits.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-5">
            {isArabic ? "المزايا الرئيسية" : "Key Benefits"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sub.keyBenefits.map((benefit, i) => {
              const [title, ...rest] = benefit.split(":");
              const desc = rest.join(":").trim();
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white border border-stone-100 rounded-xl hover:border-[#009e90]/30 hover:shadow-sm transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#009e90] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-stone-900 leading-snug">
                      {desc ? title : benefit}
                    </p>
                    {desc && (
                      <p className="text-[11.5px] text-stone-500 mt-0.5 leading-relaxed">{desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 5. COMPETITIVE ADVANTAGE banner ───────────────────── */}
      {sub.competitiveAdvantage && (
        <section className="mb-12">
          <div className="relative overflow-hidden bg-[#0b2447] rounded-2xl p-6 sm:p-8">
            {/* decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#009e90]/15 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#009e90]/10 pointer-events-none" />
            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#009e90] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-1">
                  {isArabic ? "ميزتنا التنافسية" : "Why We Stand Out"}
                </p>
                <p className="text-[14.5px] text-white leading-relaxed font-medium">
                  {sub.competitiveAdvantage}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EXECUTION PROCESS ───────────────────────────────── */}
      {sub.process && sub.process.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-5">
            {isArabic ? "كيف ننفذ العمل؟" : "Our Process"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sub.process.map((step, i) => {
              const [title, ...rest] = step.split(":");
              const desc = rest.join(":").trim();
              return (
                <div key={i} className="flex gap-3 bg-white border border-stone-100 rounded-xl p-4">
                  <div className="w-7 h-7 rounded-full bg-[#009e90]/10 border-2 border-[#009e90]/30 text-[#009e90] text-[12px] font-extrabold flex items-center justify-center flex-shrink-0">
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

      {/* ── 7. GALLERY — masonry-style (3-col varying heights) ── */}
      {galleryImages.length > 0 && (
        <section className="mb-12">
          <h3 className="text-[18px] font-extrabold text-stone-900 mb-5">
            {isArabic ? "معرض الأعمال" : "Our Work"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.slice(0, 6).map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl bg-stone-100 shadow-xs ${
                  i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Img src={src} alt={`${sub.serviceTitle} gallery ${i + 1}`} />
              </div>
            ))}
          </div>
          {/* Show remaining in a row if > 6 */}
          {galleryImages.length > 6 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
              {galleryImages.slice(6).map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-xs">
                  <Img src={src} alt={`Gallery extra ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── 8. BOTTOM CTA ──────────────────────────────────────── */}
      <section className="bg-[#009e90] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h4 className="text-[18px] sm:text-[21px] font-extrabold text-white leading-snug mb-1.5">
            {isArabic
              ? "هل أنت مستعد لرفع مستوى منشأتك؟"
              : "Ready to elevate your space?"}
          </h4>
          <p className="text-[12.5px] text-white/80">
            {isArabic
              ? "تواصل مع فريقنا للحصول على استشارة مجانية وخطة عمل مخصصة."
              : "Talk to our team for a free consultation and customised work plan."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#009e90] hover:bg-stone-50 font-bold text-[13px] px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-sm"
          >
            {isArabic ? "تواصل معنا الآن" : "Get in Touch"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="tel:+97155617330"
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold text-[13px] px-5 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            {isArabic ? "اتصل بنا" : "Call Us"}
          </a>
        </div>
      </section>

    </article>
  );
}
