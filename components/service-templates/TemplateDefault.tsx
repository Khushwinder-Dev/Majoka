/**
 * TEMPLATE A — "Technical Deep-Dive"
 * Layout: service intro → sub-service detail block (title, description,
 * primary applications, competitive advantage, key benefits, process pills)
 * → Why Choose section → gallery grid → CTA
 *
 * Assign via index.ts SUBSERVICE_TEMPLATE_OVERRIDE or SERVICE_TEMPLATE_MAP.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { ServiceItem, SubServiceItem } from "@/data/servicesData";

/* ─── helpers ─────────────────────────────────────────────────── */
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

/* ─── sub-service detail block ────────────────────────────────── */
function SubBlock({
  sub,
  isArabic,
}: {
  sub: SubServiceItem;
  isArabic: boolean;
}) {
  return (
    <div className="border-b border-stone-100 pb-7 last:border-0 last:pb-0">
      {/* Title */}
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

      {/* Key Benefits */}
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

      {/* Process steps — numbered pill row */}
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

/* ─── main component ──────────────────────────────────────────── */
interface Props {
  service: ServiceItem;
  sub: SubServiceItem;
  isArabic: boolean;
}

export default function TemplateDefault({ service, sub, isArabic }: Props) {
  const gallery: string[] =
    sub.servicesgalaryImages?.length ? sub.servicesgalaryImages :
      service.servicesgalaryImages?.length ? service.servicesgalaryImages :
        FALLBACK_GALLERY;

  const siblings = service.subservices.filter((s) => s.serviceSlug !== sub.serviceSlug);

  return (
    <article className="w-full" dir={isArabic ? "rtl" : "ltr"}>

      {/* ── 1. SERVICE INTRO ──────────────────────────────────── */}
      <p className="text-[14px] text-stone-600 leading-relaxed mb-8 border-[#009e90]/40">
        {service.serviceContent}
      </p>


      {/* ── 2. SUB-SERVICE DETAIL BLOCK ───────────────────────── */}
      <section className="mb-10">
        {/* <SubBlock sub={sub} isArabic={isArabic} /> */}

        {service.subservices.map((subservice, idx) => (
          <div key={subservice.id || subservice.serviceSlug || idx} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md mb-4">
            <div
              className="
      text-[14px] text-stone-600 leading-relaxed
      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#009e90] [&_h3]:mb-3 [&_h3]:mt-6
      [&_p]:mb-1
      [&_ul]:list-disc
      [&_ul]:pl-6
      [&_ul]:mb-5
      [&_li]:mb-1
      [&_strong]:font-bold [&_strong]:text-black
    "
              dangerouslySetInnerHTML={{ __html: subservice.serviceContent }}
            />
          </div>
        ))}


      </section>

      {/* ── 3. WHY CHOOSE ─────────────────────────────────────── */}
      {service.whyChooseTitle && (
        <section className="mb-10">
          <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#009e90] mb-2 leading-snug">
            {service.whyChooseTitle}
          </h3>
          <p className="text-[13.5px] text-stone-600 leading-relaxed mb-5">
            {service.whyChooseContent}
          </p>
        </section>
      )}

      {/* ── 4. GALLERY GRID ───────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
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
