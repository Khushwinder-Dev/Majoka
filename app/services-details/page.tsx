"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";

/* ─── TYPES ──────────────────────────────────────────────────── */
interface SubService {
  name: string;
  points: string[];
  advantage?: string;
}

interface ServiceData {
  id: string;
  categoryId: string;
  label: string;
  labelAr: string;
  icon: string;
  heroTag: string;
  heroTagAr: string;
  title: string;
  titleAr: string;
  intro: string;
  introAr: string;
  subServices: SubService[];
  whyTitle: string;
  whyTitleAr: string;
  whyBody: string;
  whyBodyAr: string;
  gallery: string[];
}

/* ─── SIDEBAR CATEGORIES (mirrors ServicesListing) ───────────── */
const SIDEBAR_CATS = [
  { id: "waterproofing", label: "Waterproofing",    labelAr: "العزل المائي",       icon: "/landing/services/6.svg" },
  { id: "swimming-pools",label: "Swimming Pools",   labelAr: "حمامات السباحة",     icon: "/landing/services/1.svg" },
  { id: "electrical",    label: "Electrical",        labelAr: "الكهرباء",           icon: "/landing/services/2.svg" },
  { id: "plumbing",      label: "Plumbing",          labelAr: "السباكة",            icon: "/landing/services/3.svg" },
  { id: "tiling",        label: "Tiling",            labelAr: "تركيب البلاط",       icon: "/landing/services/4.svg" },
  { id: "plastering",    label: "Plastering",        labelAr: "اللياسة",            icon: "/landing/services/5.svg" },
  { id: "painting",      label: "Painting",          labelAr: "الدهانات",           icon: "/landing/services/6.svg" },
];

/* ─── GALLERY IMAGES ─────────────────────────────────────────── */
const GRP_GALLERY = [
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 1.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 2.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 3.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 4.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 5.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 6.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 7.png",
  "/media/serviceDetails/GRP & FIBERGLASS WATERPROOFING gallery 8.png",
];

/* ─── SERVICES DATA ──────────────────────────────────────────── */
const SERVICES: ServiceData[] = [
  {
    id: "1",
    categoryId: "waterproofing",
    label: "GRP & Fiberglass Waterproofing",
    labelAr: "العزل بالألياف الزجاجية",
    icon: "/landing/services/6.svg",
    heroTag: "Waterproofing",
    heroTagAr: "العزل المائي",
    title: "GRP & FIBERGLASS WATERPROOFING",
    titleAr: "العزل المائي بالألياف الزجاجية",
    intro: "Waterproofing is the cornerstone for preserving the lifespan of any building. At Taj Al Rahmah, we don't just offer insulation; we provide integrated protection systems that guarantee a permanent and is latest and conclusion. Below is a detailed explanation of the cutting-edge waterproofing techniques we provide.",
    introAr: "العزل المائي هو حجر الزاوية للحفاظ على عمر أي مبنى. في شركة تاج الرحمة، لا نقدم مجرد عزل؛ بل نوفر أنظمة حماية متكاملة تضمن ديمومة مثالية. فيما يلي شرح تفصيلي لأحدث تقنيات العزل المائي التي نقدمها.",
    subServices: [
      {
        name: "GRP & Fibreglass Lining",
        points: [
          "Primary Applications: Lining potable drinking water tanks, GRP, high-fibre resistant to acid, and construct drainage channels.",
          "Competitive Advantage: It provides a simple, seamless, pain-free layer that forms for the project. It is completely safe for health (not water storage, physical loads).",
        ],
      },
      {
        name: "Bitumen Membrane Waterproofing",
        points: [
          "The most common and reliable solution for protecting foundations and roofs. It utilises on-site heat-adhesive rollers using heat (torch in upward).",
          "Competitive Advantage: High flexibility in handling minor structural movements and excellent resistance to ground moisture and humidity.",
        ],
      },
      {
        name: "Epoxy Floor Coating",
        points: [
          "A perfect and liquid-based flooring system for smoother floors, transforming them into a smooth, hard, and liquid-resistant surface.",
          "Primary Applications: For glass, electronics, factories, and laboratories.",
          "Competitive Advantage: High resistance to physical chemicals, all types of cleaning, and a professional and protective appearance.",
        ],
      },
      {
        name: "Combo System Roof Waterproofing",
        points: [
          "The hardest and ideal solution for roofs, combining Waterproofing and Thermal Insulation into one Integrated system.",
          "Primary Applications: First, light constructing to fight, steel elements by home.",
          "Competitive Advantage: Significantly speeds up installation when done with the tools of waterproof protection, provides advance water protection, and can create models with long-life durability reaching 15-15 years.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Waterproofing?",
    whyTitleAr: "لماذا تختار تاج الرحمة للعزل المائي؟",
    whyBody: "We don't just sell insulation; we provide 'Thick-Deep Solutions'. Our process begins with a precise engineering gap inspection to select the most suitable system and works with high-grade quality tools. Each training to serve a detailed field prediction.",
    whyBodyAr: "نحن لا نبيع العزل فحسب، بل نقدم 'حلولاً عميقة ومتكاملة'. تبدأ عمليتنا بفحص هندسي دقيق لاختيار النظام الأنسب، ونعمل بأدوات عالية الجودة لضمان أفضل النتائج.",
    gallery: GRP_GALLERY,
  },
  {
    id: "2",
    categoryId: "swimming-pools",
    label: "Swimming Pool Lining",
    labelAr: "بطانة حمامات السباحة",
    icon: "/landing/services/1.svg",
    heroTag: "Swimming Pools",
    heroTagAr: "حمامات السباحة",
    title: "SWIMMING POOL CONSTRUCTION & RENOVATION",
    titleAr: "إنشاء وتجديد حمامات السباحة",
    intro: "We provide end-to-end swimming pool solutions — from structural excavation and concrete work through tiling, filtration systems, and final finishes — for residential villas, hotels, and commercial complexes across the UAE.",
    introAr: "نقدم حلولاً متكاملة لحمامات السباحة من الحفر الهيكلي والأعمال الخرسانية حتى التبليط وأنظمة الترشيح والتشطيبات النهائية للفلل والفنادق والمجمعات التجارية.",
    subServices: [
      {
        name: "Pool Construction",
        points: [
          "Primary Applications: Residential, hotel, and commercial pool builds from ground up.",
          "Competitive Advantage: Structural engineering, premium waterproof concrete, and certified installation teams.",
        ],
      },
      {
        name: "Pool Lining & Waterproofing",
        points: [
          "Watertight lining systems for pools using GRP, fiberglass, and specialised pool membranes.",
          "Competitive Advantage: Long-lasting, chemical-resistant linings that maintain pool water quality.",
        ],
      },
      {
        name: "Pool Renovation & Resurfacing",
        points: [
          "Full renovation including structural crack repair, tile replacement, and modern surface finishes.",
          "Competitive Advantage: Extends pool lifespan by 15–20 years at a fraction of rebuild costs.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Pool Works?",
    whyTitleAr: "لماذا تختار تاج الرحمة لأعمال المسابح؟",
    whyBody: "Our certified pool specialists have delivered over 200 pool projects across the UAE, combining structural expertise with premium waterproofing to deliver leak-free, beautiful pools built to last.",
    whyBodyAr: "نفّذ متخصصونا المعتمدون أكثر من 200 مشروع مسبح في الإمارات، يجمعون بين الخبرة الهيكلية والعزل المائي المتميز لتسليم مسابح خالية من التسربات.",
    gallery: GRP_GALLERY,
  },
  {
    id: "3",
    categoryId: "electrical",
    label: "Electrical Installation",
    labelAr: "التركيبات الكهربائية",
    icon: "/landing/services/2.svg",
    heroTag: "Electrical",
    heroTagAr: "الكهرباء",
    title: "ELECTRICAL INSTALLATION & MAINTENANCE",
    titleAr: "التركيب والصيانة الكهربائية",
    intro: "Complete low and medium voltage electrical installations for residential, commercial and industrial buildings. Our licensed electricians deliver safe, code-compliant wiring, panel installations, and comprehensive maintenance programmes.",
    introAr: "تركيبات كهربائية كاملة لمنخفض ومتوسط الجهد لجميع أنواع المباني. يقدم كهربائيونا المرخصون أعمال توصيل آمنة متوافقة مع الكود وبرامج صيانة شاملة.",
    subServices: [
      {
        name: "Low Voltage Electrical Systems",
        points: [
          "Primary Applications: Residential villas, apartments, retail and office fit-outs.",
          "Competitive Advantage: Clean concealed wiring, DB board installation, and full testing.",
        ],
      },
      {
        name: "Medium Voltage & Substations",
        points: [
          "Primary Applications: Industrial plants, large commercial buildings, and infrastructure.",
          "Competitive Advantage: DEWA-approved designs and certified commissioning.",
        ],
      },
      {
        name: "Electrical Maintenance",
        points: [
          "Preventive and corrective maintenance of electrical systems, distribution boards, and lighting.",
          "Competitive Advantage: 24/7 emergency response and annual maintenance contracts available.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Electrical Works?",
    whyTitleAr: "لماذا تختار تاج الرحمة للأعمال الكهربائية؟",
    whyBody: "Licensed electricians, DEWA-approved designs, and a track record of delivering safe electrical installations on time across hundreds of projects in the UAE.",
    whyBodyAr: "كهربائيون مرخصون وتصاميم معتمدة من هيئة كهرباء دبي وسجل حافل بتسليم تركيبات كهربائية آمنة في الوقت المحدد عبر مئات المشاريع.",
    gallery: GRP_GALLERY,
  },
  {
    id: "4",
    categoryId: "plumbing",
    label: "Plumbing & MEP",
    labelAr: "السباكة والميكانيكا",
    icon: "/landing/services/3.svg",
    heroTag: "Plumbing",
    heroTagAr: "السباكة",
    title: "PLUMBING & MEP SERVICES",
    titleAr: "خدمات السباكة والميكانيكا",
    intro: "Full plumbing, MEP and sanitary services for residential, commercial and industrial projects. From underground drainage to above-ceiling pipework, our teams deliver code-compliant installations with minimal disruption.",
    introAr: "خدمات السباكة والميكانيكا والصرف الصحي الكاملة للمشاريع السكنية والتجارية والصناعية. من الصرف الجوفي إلى شبكات الأنابيب فوق الأسقف، تقدم فرقنا تركيبات متوافقة مع الكود.",
    subServices: [
      {
        name: "Plumbing Installation",
        points: [
          "Primary Applications: Cold and hot water supply, drainage, and sanitary ware fixing.",
          "Competitive Advantage: HDPE, PPR and copper pipe specialists with full pressure testing.",
        ],
      },
      {
        name: "Drainage & Sewerage",
        points: [
          "Underground and above-ground drainage systems for all building types.",
          "Competitive Advantage: Gravity and pumped systems designed for long-term reliability.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Plumbing?",
    whyTitleAr: "لماذا تختار تاج الرحمة للسباكة؟",
    whyBody: "Experienced MEP engineers and plumbers delivering leak-free installations backed by full pressure testing and compliance with UAE plumbing codes.",
    whyBodyAr: "مهندسو ميكانيكا وسباكون ذوو خبرة يقدمون تركيبات خالية من التسرب مدعومة باختبارات ضغط كاملة.",
    gallery: GRP_GALLERY,
  },
  {
    id: "5",
    categoryId: "tiling",
    label: "Tiling",
    labelAr: "تركيب البلاط",
    icon: "/landing/services/4.svg",
    heroTag: "Tiling",
    heroTagAr: "تركيب البلاط",
    title: "PROFESSIONAL TILING SOLUTIONS",
    titleAr: "حلول تركيب البلاط الاحترافية",
    intro: "Expert installation of ceramic, porcelain and natural stone tiles for all indoor and outdoor areas. Our tiling teams are skilled in large-format slabs, mosaic features, and complex pattern layouts.",
    introAr: "تركيب احترافي للبلاط السيراميكي والبورسلان والحجر الطبيعي للمناطق الداخلية والخارجية. فرقنا متخصصة في الألواح الكبيرة والفسيفساء والأنماط المعقدة.",
    subServices: [
      {
        name: "Floor & Wall Tiling",
        points: [
          "Primary Applications: Villas, apartments, hotels, and commercial spaces.",
          "Competitive Advantage: Precision levelling, premium adhesives, and mirror-finish grouting.",
        ],
      },
      {
        name: "Mosaic & Pool Tiling",
        points: [
          "Custom mosaic and decorative tile designs for pools, feature walls and high-end interiors.",
          "Competitive Advantage: Waterproof pool-grade adhesives and grouts rated for constant water exposure.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Tiling?",
    whyTitleAr: "لماذا تختار تاج الرحمة لتركيب البلاط؟",
    whyBody: "Premium materials, laser-levelled surfaces, and craftsmen with 10+ years experience in high-end residential and commercial tiling across Dubai and Abu Dhabi.",
    whyBodyAr: "مواد فاخرة وأسطح مستوية بالليزر وحرفيون بخبرة تزيد على 10 سنوات في تبليط المباني السكنية والتجارية الفاخرة.",
    gallery: GRP_GALLERY,
  },
  {
    id: "6",
    categoryId: "plastering",
    label: "Plastering",
    labelAr: "اللياسة",
    icon: "/landing/services/5.svg",
    heroTag: "Plastering",
    heroTagAr: "اللياسة",
    title: "INTERIOR & EXTERIOR PLASTERING",
    titleAr: "اللياسة الداخلية والخارجية",
    intro: "High-quality plastering services for all types of interior and exterior surfaces. From smooth skim coats to textured renders, we deliver flawless, durable finishes that form the perfect base for painting or tiling.",
    introAr: "خدمات لياسة عالية الجودة لجميع أنواع الأسطح الداخلية والخارجية. من الطبقات الناعمة إلى الرندر المنقوش، نقدم تشطيبات مثالية ودائمة.",
    subServices: [
      {
        name: "Internal Plastering",
        points: [
          "Smooth and sand-faced internal wall plastering using premium compounds.",
          "Competitive Advantage: Crack-free, dust-resistant finish ready for painting within 48 hours.",
        ],
      },
      {
        name: "External Rendering",
        points: [
          "Weather-resistant external render systems for facades and structural surfaces.",
          "Competitive Advantage: Flexible polymer-modified renders rated for UAE heat and humidity.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Plastering?",
    whyTitleAr: "لماذا تختار تاج الرحمة للياسة؟",
    whyBody: "Specialist plasterers delivering smooth, crack-resistant finishes using the highest quality materials — on time and on budget.",
    whyBodyAr: "متخصصون في اللياسة يقدمون تشطيبات ناعمة ومقاومة للتشقق بأعلى جودة من المواد في الوقت والميزانية المحددين.",
    gallery: GRP_GALLERY,
  },
  {
    id: "7",
    categoryId: "painting",
    label: "Painting",
    labelAr: "الدهانات",
    icon: "/landing/services/6.svg",
    heroTag: "Painting",
    heroTagAr: "الدهانات",
    title: "PAINTING & SURFACE COATINGS",
    titleAr: "الدهانات وطلاء الأسطح",
    intro: "Professional interior and exterior painting services using premium paint systems. Our painters deliver flawless finishes for villas, apartments, offices, and large commercial buildings across the UAE.",
    introAr: "خدمات دهانات داخلية وخارجية احترافية بأنظمة دهانات فاخرة لتشطيبات مثالية للفلل والشقق والمكاتب والمباني التجارية الكبيرة.",
    subServices: [
      {
        name: "Interior Painting",
        points: [
          "Primary Applications: Residential villas, hotel rooms, retail and office interiors.",
          "Competitive Advantage: Zero-VOC paints available; clean, drip-free application every time.",
        ],
      },
      {
        name: "Exterior & Facade Painting",
        points: [
          "UV-resistant exterior coatings that protect and beautify building facades in all climates.",
          "Competitive Advantage: 10-year colour retention guarantee on selected paint systems.",
        ],
      },
    ],
    whyTitle: "Why Choose Taj Alrahmah for Painting?",
    whyTitleAr: "لماذا تختار تاج الرحمة للدهانات؟",
    whyBody: "Approved applicators for leading paint brands, with full surface preparation, dust-free environments, and a clean worksite guarantee on every project.",
    whyBodyAr: "مطبّقون معتمدون لكبرى ماركات الدهانات، مع تجهيز كامل للسطح وبيئة خالية من الغبار وضمان موقع نظيف في كل مشروع.",
    gallery: GRP_GALLERY,
  },
];

/* ─── HELPER: SIDEBAR ICON ───────────────────────────────────── */
function SidebarIcon({ src, active }: { src: string; active: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className={`w-4 h-4 object-contain flex-shrink-0 transition-all duration-200 ${
        active ? "brightness-0 invert" : "opacity-40"
      }`}
    />
  );
}

/* ─── MAIN PAGE CONTENT ──────────────────────────────────────── */
function ServiceDetailsContent() {
  const { isArabic } = useLanguage();
  const searchParams = useSearchParams();

  // resolve active service from ?service= query param
  const paramId = searchParams.get("service") ?? "1";
  const service = SERVICES.find((s) => s.id === paramId) ?? SERVICES[0];
  const activeCategoryId = service.categoryId;

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══ HERO BANNER (same as ServicesListing) ════════════════ */}
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden">
        <Image
          src="/media/servicesListing/Rectangle 14 (1).png"
          alt={isArabic ? service.heroTagAr : service.heroTag}
          fill
          unoptimized
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-[32px] md:text-4xl font-extrabold text-white leading-tight drop-shadow">
            {isArabic ? "استكشف حسب الخدمات" : "Explore by services"}
          </h1>
          <p className="text-sm sm:text-[15px] text-white/82 max-w-md leading-relaxed">
            {isArabic
              ? "تصفح مجموعتنا الكاملة من الخدمات الاحترافية بجودة يمكنك الوثوق بها."
              : "Browse our full range of professional services designed to meet your home, business, and maintenance needs with quality you can trust."}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`inline-block rounded-full ${i === 0 ? "w-6 h-[7px] bg-[#009e90]" : "w-[7px] h-[7px] bg-white/45"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ BODY ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <aside className="w-full lg:w-[210px] xl:w-[230px] flex-shrink-0">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-3 px-1">
              {isArabic ? "الخدمات" : "TRADES"}
            </p>

            <nav className="flex flex-col gap-0.5">
              {SIDEBAR_CATS.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <Link
                    key={cat.id}
                    href={`/services-details?service=${
                      SERVICES.find((s) => s.categoryId === cat.id)?.id ?? "1"
                    }`}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <SidebarIcon src={cat.icon} active={isActive} />
                    <span className={`text-[13px] font-semibold flex-grow ${isArabic ? "text-right" : "text-left"}`}>
                      {isArabic ? cat.labelAr : cat.label}
                    </span>
                    {isActive && <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />}
                  </Link>
                );
              })}
            </nav>

            {/* CTA box */}
            <div className="mt-5 bg-[#009e90] rounded-2xl p-4 sm:p-5 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <MessageCircle className="w-[18px] h-[18px] text-white" />
              </div>
              <h4 className="text-[13px] font-bold mb-1.5 leading-snug">
                {isArabic ? "لست متأكداً من أين تبدأ؟" : "Not sure where to start?"}
              </h4>
              <p className="text-[11px] text-white/80 leading-relaxed mb-3">
                {isArabic
                  ? "فريقنا يساعدك في اختيار الخدمة المناسبة لمشروعك."
                  : "Our team helps you pick the best service for every setup. Get a personalised recommendation in minutes."}
              </p>
              <Link href="/contact" className="text-[11px] font-bold text-white underline underline-offset-2 hover:text-white/75 transition-colors duration-200">
                {isArabic ? "تحدث إلى خبير" : "Talk to an expert"}
              </Link>
            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* Back link */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#009e90] hover:text-[#01887e] transition-colors duration-200 self-start"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
              {isArabic ? "العودة إلى الخدمات" : "Back to services"}
            </Link>

            {/* Service title */}
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#009e90] mb-1">
                {isArabic ? service.heroTagAr : service.heroTag}
              </p>
              <h2 className="text-[20px] sm:text-[24px] font-extrabold text-stone-900 leading-tight">
                {isArabic ? service.titleAr : service.title}
              </h2>
            </div>

            {/* Intro — teal left border card */}
            <div className="bg-[#f0faf9] border-l-4 border-[#009e90] rounded-r-xl px-5 py-4">
              <p className="text-[13px] text-stone-700 leading-relaxed">
                {isArabic ? service.introAr : service.intro}
              </p>
            </div>

            {/* Sub-services */}
            <div className="flex flex-col gap-5">
              {service.subServices.map((sub, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-stone-100 shadow-sm p-5">
                  <h3 className="text-[14px] font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-4 bg-[#009e90] rounded-full flex-shrink-0" />
                    {sub.name}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {sub.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#009e90] flex-shrink-0 mt-0.5" />
                        <p className="text-[12.5px] text-stone-600 leading-relaxed">{pt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="bg-stone-50 rounded-xl border border-stone-100 p-5 sm:p-6">
              <h3 className="text-[16px] font-extrabold text-stone-900 mb-3">
                {isArabic ? service.whyTitleAr : service.whyTitle}
              </h3>
              <p className="text-[13px] text-stone-600 leading-relaxed mb-5">
                {isArabic ? service.whyBodyAr : service.whyBody}
              </p>

              {/* Gallery grid: 4-column on desktop, 2 on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {service.gallery.map((src, gi) => (
                  <div
                    key={gi}
                    className="relative aspect-square rounded-lg overflow-hidden bg-stone-200 hover:opacity-90 transition-opacity duration-200"
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${gi + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-center pt-2 pb-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#009e90] hover:bg-[#01887e] text-white px-7 py-3 rounded-full font-bold text-[13px] tracking-wide shadow-[0_4px_16px_rgba(0,158,144,0.30)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.40)] transition-all duration-300"
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

/* ─── EXPORT WITH SUSPENSE (required for useSearchParams) ────── */
export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#009e90] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ServiceDetailsContent />
    </Suspense>
  );
}
