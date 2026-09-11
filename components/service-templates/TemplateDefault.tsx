/**
 * TEMPLATE DEFAULT
 * Matches the approved design screenshot:
 *   - Service intro paragraph
 *   - Each sub-service as a section: bold title, description,
 *     Primary Applications row, Competitive Advantage row (with ✓ icon)
 *   - "Why Choose Taj Alrahmah for X?" section
 *   - Gallery grid (4-col)
 *   - "Schedule a Visit" CTA button
 *
 * This is used for ALL sub-services until individual templates are designed.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { ServiceItem, SubServiceItem } from "@/data/servicesData";
import { json } from "stream/consumers";

/* ─── helpers ───────────────────────────────────────────────── */
const FALLBACK = "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png";
const FALLBACK_GALLERY = [
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8.png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (3).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (4).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (5).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (6).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (7).png",
  "/media/servicesListing/unsplash_CPs2X8JYmS8 (8).png",
];

function SmartImg({
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
      onError={() => { if (s !== FALLBACK) setS(FALLBACK); }}
    />
  );
}

/* ─── single sub-service block ──────────────────────────────── */
function SubBlock({
  sub,
  isArabic,
}: {
  sub: SubServiceItem;
  isArabic: boolean;
}) {
  return (
    <div className="border-b border-stone-100 pb-7 last:border-0 last:pb-0">
      {/* Sub-service title */}
      <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#009e90] mb-2 leading-snug">
        {sub.serviceTitle}
      </h3>

      {/* Description */}
      <p className="text-[13.5px] text-stone-600 leading-relaxed mb-3">
        {sub.serviceContent || sub.shortDescription}
      </p>

      {/* Primary Applications */}
      {sub.primaryApplications && (
        <div className="flex items-start gap-2 mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#009e90] flex-shrink-0 mt-[2px]" />
          <p className="text-[13px] text-stone-700 leading-relaxed">
            <span className="font-semibold text-stone-900">
              {isArabic ? "الاستخدامات الأساسية: " : "Primary Applications: "}
            </span>
            {sub.primaryApplications}
          </p>
        </div>
      )}

      {/* Competitive Advantage */}
      {sub.competitiveAdvantage && (
        <div className="flex items-start gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-[#009e90] flex-shrink-0 mt-[2px]" />
          <p className="text-[13px] text-stone-700 leading-relaxed">
            <span className="font-semibold text-stone-900">
              {isArabic ? "الميزة التنافسية: " : "Competitive Advantage: "}
            </span>
            {sub.competitiveAdvantage}
          </p>
        </div>
      )}

      {/* Key Benefits list */}
      {sub.keyBenefits && sub.keyBenefits.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-3">
          {sub.keyBenefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#009e90] flex-shrink-0 mt-[3px]" />
              <span className="text-[12.5px] text-stone-600 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Process steps (compact pill row) */}
      {sub.process && sub.process.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {sub.process.map((step, i) => {
            const label = step.split(":")[0].trim();
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[11.5px] text-stone-600 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-full"
              >
                <span className="w-4 h-4 rounded-full bg-[#009e90] text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── main component ────────────────────────────────────────── */
interface Props {
  service: ServiceItem;
  sub: SubServiceItem;
  isArabic: boolean;
}

export default function TemplateDefault({ service, sub, isArabic }: Props) {
  /* Gallery: prefer sub gallery, fall back to service gallery, then defaults */
  const gallery: string[] =
    sub.servicesgalaryImages?.length  ? sub.servicesgalaryImages :
    service.servicesgalaryImages?.length ? service.servicesgalaryImages :
    FALLBACK_GALLERY;

  /* Other sub-services of the same parent (for the "related" list below) */
  const siblings = service.subservices.filter((s) => s.serviceSlug !== sub.serviceSlug);

  return (
    <article className="w-full" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── 1. SERVICE INTRO ──────────────────────────────────── */}
      <p className="text-[14px] text-stone-600 leading-relaxed mb-8 border-l-4 border-[#009e90]/40 pl-4">
        {service.shortDescription || service.serviceContent}
      </p>

      {/* ── 2. THIS SUB-SERVICE BLOCK ─────────────────────────── */}
      <section className="mb-10">
        <SubBlock sub={sub} isArabic={isArabic} />
        <pre className="whitespace-pre-wrap">
    {JSON.stringify(sub, null, 2)}
  </pre>
      </section>

      {/* ── 3. WHY CHOOSE ─────────────────────────────────────── */}
      {service.whyChooseTitle && (
        <section className="mb-10">
          <h3 className="text-[17px] sm:text-[18px] font-extrabold text-stone-900 mb-2 leading-snug">
            {service.whyChooseTitle}
          </h3>
          <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
            {service.whyChooseContent}
          </p>
          {/* {service.whyChoosePoints?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.whyChoosePoints.map((pt, i) => (
                <div key={i} className="bg-stone-50 border border-stone-100 rounded-xl p-4">
                  <h4 className="text-[13px] font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#009e90] flex-shrink-0" />
                    {pt.title}
                  </h4>
                  <p className="text-[12px] text-stone-500 leading-relaxed pl-5">
                    {pt.description}
                  </p>
                </div>
              ))}
            </div>
          )} */}
        </section>
      )}

      {/* ── 4. GALLERY GRID ───────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden bg-stone-100"
              >                
                <SmartImg src={src} alt={`${sub.serviceTitle} ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. RELATED SUB-SERVICES ───────────────────────────── */}
      {/* {siblings.length > 0 && (
        <section className="mb-10">
          <h3 className="text-[14px] font-extrabold text-stone-700 uppercase tracking-wider mb-3">
            {isArabic ? "خدمات فرعية أخرى" : "Other Sub-Services"}
          </h3>
          <div className="flex flex-col gap-1.5">
            {siblings.map((s) => (
              <Link
                key={s.serviceSlug}
                href={`/services-details?service=${service.serviceNumber}&sub=${s.serviceSlug}`}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-stone-100 hover:border-[#009e90]/30 hover:bg-[#f0faf9] transition-all group"
              >
                <span className="text-[13px] font-medium text-stone-700 group-hover:text-[#009e90] transition-colors">
                  {s.serviceTitle}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 text-stone-300 group-hover:text-[#009e90] transition-colors flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            ))}
          </div>
        </section>
      )} */}

      {/* ── 6. CTA BUTTON ─────────────────────────────────────── */}
      <section className="flex justify-center pt-2 pb-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white font-bold text-[14px] px-10 py-3.5 rounded-full shadow-md shadow-[#009e90]/25 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {isArabic ? "احجز زيارة فنية" : "Schedule a Visit"}
          <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
        </Link>
      </section>

    </article>
  );
}
