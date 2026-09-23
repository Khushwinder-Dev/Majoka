"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";

/* ─── DATA DEFINITIONS ─────────────────────────────────────────────────── */

interface Capability {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: "01",
    icon: "/subcontract/fi_3043652.svg",
    titleEn: "Waterproofing Works",
    titleAr: "أعمال العزل المائي",
    descEn:
      "Complete waterproofing application for roofs, basements, wet areas, tanks, and other structures.",
    descAr:
      "تطبيق شامل لأنظمة العزل المائي للأسطح والسراديب والأماكن الرطبة والخزانات ومختلف المنشآت.",
  },
  {
    id: "02",
    icon: "/subcontract/fi_709701.svg",
    titleEn: "Protective Coatings",
    titleAr: "الطلاءات الواقية",
    descEn:
      "Professional application: protective and performance coatings different project requirements.",
    descAr:
      "تطبيق احترافي للطلاءات الواقية وعالية الأداء وفق متطلبات المشاريع المختلفة.",
  },
  {
    id: "03",
    icon: "/subcontract/fi_5655093.svg",
    titleEn: "Concrete Protection & Repair",
    titleAr: "حماية وإصلاح الخرسانة",
    descEn:
      "Repair and protection solutions for cracks, joints, concrete surfaces, and structural areas.",
    descAr:
      "حلول متكاملة لإصلاح وحماية الشروخ، وفواصل التمدد، والأسطح الخرسانية، والمناطق الإنشائية.",
  },
  {
    id: "04",
    icon: "/subcontract/fi_9936457.svg",
    titleEn: "Industrial Flooring",
    titleAr: "الأرضيات الصناعية",
    descEn:
      "Durable flooring systems for industrial, commercial, and high-traffic environments.",
    descAr:
      "أنظمة أرضيات متينة فائقة التحمل للمنشآت الصناعية والتجارية والمساحات عالية الحركة.",
  },
  {
    id: "05",
    icon: "/subcontract/fi_16135988.svg",
    titleEn: "Specialist Applications",
    titleAr: "تطبيقات تخصصية دقيقة",
    descEn:
      "Specialized waterproofing and construction applications according to project specifications.",
    descAr:
      "تطبيقات عزل وإنشاءات متخصصة ومصممة وفقاً لأعلى المواصفات الهندسية للمشروع.",
  },
  {
    id: "06",
    icon: "/subcontract/fi_3043652.svg",
    titleEn: "Maintenance & Restoration",
    titleAr: "الصيانة والترميم",
    descEn:
      "Repair, restoration, and maintenance works for existing buildings and structures.",
    descAr:
      "أعمال الإصلاح والترميم وإعادة التأهيل والصيانة الدورية للأبنية والمنشآت القائمة.",
  },
];

interface Requirement {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const REQUIREMENTS: Requirement[] = [
  {
    id: "01",
    icon: "/subcontract/fi_8193540.svg",
    titleEn: "Professional Execution",
    titleAr: "تنفيذ احترافي دقيق",
    descEn:
      "Experienced teams focused on quality workmanship and proper application.",
    descAr:
      "فرق عمل ذات خبرة واسعة تركز على الحرفية العالية وتطبيق الأنظمة وفق أعلى المعايير.",
  },
  {
    id: "02",
    icon: "/subcontract/fi_12539642.svg",
    titleEn: "Project Coordination",
    titleAr: "تنسيق هندسي متكامل",
    descEn:
      "We coordinate closely with main contractors and project teams to support execution.",
    descAr:
      "تنسيق وثيق ومباشر مع المقاولين الرئيسيين وفرق إدارة المشروع لدعم سير الأعمال بسلاسة.",
  },
  {
    id: "03",
    icon: "/subcontract/fi_3002389.svg",
    titleEn: "Quality Materials",
    titleAr: "مواد معتمدة وموثوقة",
    descEn:
      "Materials and systems selected according to project application requirements.",
    descAr:
      "اختيار دقيق للمواد والأنظمة المطابقة للمواصفات والمتطلبات الفنية للمشروع.",
  },
  {
    id: "04",
    icon: "/subcontract/fi_10701637.svg",
    titleEn: "Safety Focus",
    titleAr: "أولوية السلامة والجودة",
    descEn:
      "Completed works are inspected and handed over according requirements.",
    descAr:
      "فحص وتسليم الأعمال المنجزة بدقة والتزام كامل بكافة اشتراطات السلامة والجودة.",
  },
];

interface ProcessStep {
  step: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    icon: "/subcontract/fi_12515699.svg",
    titleEn: "Project Enquiry",
    titleAr: "استلام طلب المشروع",
    descEn: "Share your project requirements, drawings, or specifications.",
    descAr: "شارك معنا متطلبات المشروع والمخططات الهندسية والمواصفات الفنية.",
  },
  {
    step: "02",
    icon: "/subcontract/fi_1721936.svg",
    titleEn: "Site Assessment",
    titleAr: "المعاينة الميدانية",
    descEn:
      "Our team reviews the site and project conditions where required.",
    descAr: "يقوم فريقنا الهندسي بمعاينة الموقع ودراسة حالته الإنشائية عند الحاجة.",
  },
  {
    step: "03",
    icon: "/subcontract/fi_2058768.svg",
    titleEn: "Technical Proposal",
    titleAr: "المقترح الفني والتسعير",
    descEn:
      "We recommend the appropriate system and provide a quotation.",
    descAr: "نوصي بأفضل نظام هندسي ملائم ونقدم عرض أسعار تنافسي ومدروس.",
  },
  {
    step: "04",
    icon: "/subcontract/fi_1265775.svg",
    titleEn: "Inspection & Handover",
    titleAr: "الفحص والتسليم النهائي",
    descEn:
      "Completed works are inspected and handed over according to project requirements.",
    descAr: "فحص واختبار دقيق للأعمال المنفذة وتسليمها حسب مواصفات المشروع.",
  },
];

interface IndustryPartner {
  icon: string;
  titleEn: string;
  titleAr: string;
}

const INDUSTRY_PARTNERS: IndustryPartner[] = [
  {
    icon: "/subcontract/fi_12194416.svg",
    titleEn: "Main Contractors",
    titleAr: "المقاولون الرئيسيون",
  },
  {
    icon: "/subcontract/fi_9321540.svg",
    titleEn: "General Contractors",
    titleAr: "المقاولون العامون",
  },
  {
    icon: "/subcontract/fi_9470296.svg",
    titleEn: "Property Developers",
    titleAr: "المطورون العقاريون",
  },
  {
    icon: "/subcontract/fi_12309211.svg",
    titleEn: "Construction Companies",
    titleAr: "شركات البناء والتشييد",
  },
  {
    icon: "/subcontract/fi_12061645.svg",
    titleEn: "Consultants",
    titleAr: "المكاتب الاستشارية",
  },
  {
    icon: "/subcontract/fi_9321497.svg",
    titleEn: "Facility Management Companies",
    titleAr: "شركات إدارة المرافق",
  },
];

interface SubcontractCertification {
  id: number;
  logo: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

const SUBCONTRACT_CERTIFICATIONS: SubcontractCertification[] = [
  {
    id: 1,
    logo: "/certifications/logos/cert-logo-1.png",
    icon: "/certifications/logos/SVG - Globe Icon.svg",
    titleEn: "Dubai Municipality DM Approved",
    titleAr: "معتمد من بلدية دبي (DM)",
    descriptionEn:
      "Officially registered and approved by Dubai Municipality. All our waterproofing, structural protection, and construction services fully comply with Dubai Municipality's strict engineering standards, ensuring safety, reliability, and environmental responsibility on every project.",
    descriptionAr:
      "مسجلون ومعتمدون رسمياً من قِبل بلدية دبي. جميع خدماتنا في العزل المائي والحماية الإنشائية تتوافق تماماً مع المعايير الهندسية الصارمة لبلدية دبي، مما يضمن السلامة والموثوقية والمسؤولية البيئية في كل مشروع.",
  },
  {
    id: 2,
    logo: "/certifications/logos/cert-logo-2.png",
    icon: "/certifications/logos/SVG - Badge Icon.svg",
    titleEn: "DGL-Approved Products",
    titleAr: "منتجات معتمدة من DGL",
    descriptionEn:
      "We exclusively use DGL-listed and globally approved products that meet the highest international construction benchmarks. Our product selection process ensures compatibility, performance, and long-term durability for all waterproofing and high-performance floor coating solutions.",
    descriptionAr:
      "نستخدم حصرياً منتجات مدرجة في قائمة DGL ومعتمدة عالمياً وفق أعلى المعايير الدولية في البناء. تضمن عملية اختيار منتجاتنا التوافق والأداء والمتانة طويلة الأمد لجميع حلول العزل المائي وطلاءات الأرضيات.",
  },
  {
    id: 3,
    logo: "/certifications/logos/cert-logo-3.png",
    icon: "/certifications/logos/SVG - Shield Icon.svg",
    titleEn: "WRAS Certified Products",
    titleAr: "منتجات معتمدة من WRAS",
    descriptionEn:
      "Our water tank lining and GRP fiberglass systems carry WRAS (Water Regulations Advisory Scheme) certification, guaranteeing that all materials in contact with potable water are completely safe for human consumption. A critical standard for drinking water storage and supply.",
    descriptionAr:
      "تحمل أنظمة تبطين خزانات المياه وألياف GRP الزجاجية لدينا شهادة WRAS، مما يضمن أن جميع المواد المُلامسة لمياه الشرب آمنة تماماً للاستهلاك البشري. معيار أساسي لتخزين مياه الشرب وتوزيعها.",
  },
  {
    id: 4,
    logo: "/certifications/logos/cert-logo-4.png",
    icon: "/certifications/logos/SVG - Leaf Icon.svg",
    titleEn: "DM Green Building Compliant",
    titleAr: "متوافق مع معايير المباني الخضراء لبلدية دبي",
    descriptionEn:
      "Our thermal insulation and waterproofing systems meet Dubai Municipality's Green Building Regulations, supporting energy efficiency and sustainable construction. Our Combo System roof solutions are specifically designed to reduce cooling loads and lower energy consumption.",
    descriptionAr:
      "تستوفي أنظمة العزل الحراري والمائي لدينا لوائح المباني الخضراء لبلدية دبي، مما يدعم كفاءة الطاقة والبناء المستدام. تم تصميم حلول سطح نظام الكومبو خصيصاً لتقليل أحمال التبريد وخفض استهلاك الطاقة.",
  },
];

interface SubcontractFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const SUBCONTRACT_FAQS: SubcontractFaqItem[] = [
  {
    id: 1,
    questionEn: "What specialized subcontracting services do you provide?",
    questionAr: "ما هي خدمات المقاولات من الباطن التخصصية التي تقدمونها؟",
    answerEn:
      "We provide end-to-end subcontracting solutions across waterproofing (combo system, GRP, bitumen membrane, polyurea), high-performance protective and anti-corrosion coatings, concrete repair and crack injection, and heavy-duty industrial flooring systems.",
    answerAr:
      "نقدم حلولاً متكاملة في المقاولات من الباطن تشمل أعمال العزل المائي (نظام الكومبو، GRP، الأغشية البيتومينية، والبولي يوريا)، الطلاءات الواقية ومكافحة التآكل، إصلاح الشروخ وحقن الخرسانة، وأنظمة الأرضيات الصناعية فائقة التحمل.",
  },
  {
    id: 2,
    questionEn: "Are your works certified and compliant with UAE municipal standards?",
    questionAr: "هل أعمالكم معتمدة ومتوافقة مع المعايير البلدية في دولة الإمارات؟",
    answerEn:
      "Yes. Our engineering processes and application teams comply strictly with Dubai Municipality, Civil Defense, Estidama, and ISO 9001/14001/45001 standards. We provide complete submittals, method statements, and inspection test plans (ITP).",
    answerAr:
      "نعم، تلتزم منهجياتنا الهندسية وفرق التطبيق باشتراطات بلدية دبي، الدفاع المدني، برنامج استدامة، ومعايير الآيزو (9001، 14001، 45001). ونوفر اعتمادات المواد، بيانات طرق العمل (Method Statements)، وخطط الفحص والاختبار (ITP).",
  },
  {
    id: 3,
    questionEn: "How quickly can you provide site assessments and commercial proposals?",
    questionAr: "كم يستغرق إجراء المعاينة الميدانية وتقديم العرض الفني والمالي؟",
    answerEn:
      "Upon receiving your project drawings, BOQ, or specifications, our technical team conducts a complimentary site inspection and issues a detailed technical proposal and competitive quotation within 24 to 48 hours.",
    answerAr:
      "بمجرد تزويدنا بمخططات المشروع أو جدول الكميات (BOQ)، يقوم فريقنا الفني بزيارة ميدانية وإعداد مقترح فني تفصيلي مع عرض أسعار تنافسي خلال 24 إلى 48 ساعة فقط.",
  },
  {
    id: 4,
    questionEn: "What warranties and guarantees are issued upon project handover?",
    questionAr: "ما هي الضمانات التي يتم تسليمها عند إنجاز المشروع؟",
    answerEn:
      "We issue comprehensive, certified material and workmanship warranties ranging from 10 to 25 years depending on the approved system. All warranties are backed by mandatory on-site ponding, thickness, and holiday spark testing prior to handover.",
    answerAr:
      "نمنح ضمانات خطية شاملة على المواد والتنفيذ تتراوح بين 10 إلى 25 عاماً وفقاً للنظام المعتمد. وتكون كافة الضمانات مدعومة باختبارات غمر المياه والفحص الفني الشامل قبل التسليم النهائي.",
  },
  {
    id: 5,
    questionEn: "Can you mobilize teams for fast-track or high-volume construction schedules?",
    questionAr: "هل يمكنكم حشد وتوفير الفرق الفنية للمشاريع العاجلة والمضغوطة زمنياً؟",
    answerEn:
      "Yes. With our dedicated full-time workforce of certified engineers, QA/QC inspectors, site supervisors, and trained technicians, we have the logistical capacity to deploy immediately and scale up for fast-track milestones across Dubai and the Northern Emirates.",
    answerAr:
      "نعم، نمتلك كادراً دائماً ومؤهلاً من المهندسين، ومفتشي ضبط الجودة، والمشرفين، والفنيين المدربين، مما يتيح لنا الحشد الفوري والتوسع اللوجستي للالتزام بالجداول الزمنية المضغوطة في دبي وكافة إمارات الدولة.",
  },
];

export default function SubcontractContent() {
  const { isArabic, direction } = useLanguage();
  const isAr = isArabic;
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full bg-white selection:bg-[#01a9a0] selection:text-white" dir={direction}>
      {/* ─── SECTION 1: HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Background Image with Dark Tinted Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/subcontract/hero.png"
            alt="Reliable Subcontracting For Your Projects"
            fill
            priority
            className="object-cover object-[center_35%]"
          />
          {/* Multi-layered dark gradient overlay for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 sm:mb-6">
              <Link
                href="/"
                className="text-white/85 hover:text-white transition-colors"
              >
                {isAr ? "الرئيسية" : "HOME"}
              </Link>
              <span className="text-[#01a9a0] font-bold">//</span>
              <span className="text-[#01a9a0]">
                {isAr ? "خدمات مقاولات الباطن" : "SUBCONTRACTING"}
              </span>
            </nav>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.15]">
              {isAr ? (
                <>
                  مقاولات باطن موثوقة
                  <br />
                  لمشاريعكم الإنشائية
                </>
              ) : (
                <>
                  Reliable Subcontracting
                  <br />
                  For Your Projects
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base lg:text-[17px] leading-relaxed mt-5 max-w-xl font-normal">
              {isAr
                ? "خدمات متخصصة في العزل المائي والمقاولات الدقيقة تسلّم بجودة عالية، وأمان تام، وتنسيق هندسي موثوق للمشاريع."
                : "Professional waterproofing and specialized contracting services delivered with quality, safety, and reliable project coordination."}
            </p>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-3.5 bg-[#01a9a0] hover:bg-[#008f87] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#01a9a0]/30 hover:shadow-[#01a9a0]/50 hover:scale-[1.02] group"
              >
                <span>
                  {isAr
                    ? "طلب تسعير مقاولة باطن"
                    : "REQUEST A SUBCONTRACTING QUOTE"}
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-[#01a9a0] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-4 h-4 text-[#01a9a0] rtl:rotate-180" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CERTIFICATION — OUR COMMITMENT TO QUALITY (SINGLE ROW AT TOP) ─── */}
      <section className="w-full relative py-14 sm:py-16 lg:py-18 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-100">
        {/* Section background image */}
        <Image
          src="/certifications/logos/sectionBg.png"
          alt=""
          fill
          unoptimized
          className="object-cover object-center"
        />
        {/* Light overlay so text stays readable */}
        <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="inline-block h-[2px] w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isAr ? "الشهادات والاعتمادات" : "CERTIFICATION"}
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-stone-900 tracking-tight leading-[1.16]">
                {isAr ? "التزامنا " : "Our Commitment "}
                <span className="text-[#01a9a0]">
                  {isAr ? "بالجودة" : "To Quality"}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mt-2 max-w-2xl">
                {isAr
                  ? "شهاداتنا تعكس التزامنا بتقديم حلول عزل مائي موثوقة وآمنة وعالية الجودة لكافة مشاريع المقاولات."
                  : "Our certifications demonstrate our commitment to delivering reliable, safe, and high-quality waterproofing solutions."}
              </p>
            </div>
          </div>

          {/* ── 4 Certification Cards in a SINGLE ROW ───────────────────────── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            dir={direction}
          >
            {SUBCONTRACT_CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="group bg-white border border-stone-200/90 rounded-2xl p-5 hover:border-[#01a9a0]/40 hover:shadow-[0_8px_28px_rgba(1,169,160,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon + Logo Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#e6f7f6] flex items-center justify-center shrink-0">
                      <Image
                        src={cert.icon}
                        alt="icon"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-50 border border-stone-100 shadow-xs shrink-0 flex items-center justify-center p-1">
                      <Image
                        src={cert.logo}
                        alt={isAr ? cert.titleAr : cert.titleEn}
                        fill
                        unoptimized
                        className="object-contain p-1.5"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[14.5px] font-bold text-stone-900 leading-snug group-hover:text-[#01a9a0] transition-colors mb-2">
                    {isAr ? cert.titleAr : cert.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] text-stone-500 leading-relaxed">
                    {isAr ? cert.descriptionAr : cert.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── SECTION 3: INTRO / ABOUT SUBCONTRACTING ────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Image with rounded corners */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow / Tagline */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-7 h-[2px] bg-[#01a9a0] inline-block rounded-full" />
                <span className="text-[#01a9a0] text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                  {isAr ? "خدمات مقاولات الباطن" : "SUBCONTRACTING SERVICES"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-[1.2]">
                {isAr ? (
                  <>
                    مقاولات باطن موثوقة{" "}
                    <span className="text-[#01a9a0]">
                      لمشاريعكم
                      <br />
                      الإنشائية
                    </span>
                  </>
                ) : (
                  <>
                    Reliable Subcontracting{" "}
                    <span className="text-[#01a9a0]">For</span>
                    <br />
                    <span className="text-[#01a9a0]">Your Projects</span>
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-5 max-w-xl font-normal">
                {isAr
                  ? "خدمات متخصصة في العزل المائي والمقاولات الدقيقة تسلّم بجودة عالية، وأمان تام، وتنسيق هندسي موثوق للمشاريع."
                  : "Professional waterproofing and specialized contracting services delivered with quality, safety, and reliable project coordination."}
              </p>
            </div>

            {/* Right Column: Heading & Copy */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-[28px] overflow-hidden shadow-xl shadow-gray-200/70 border border-gray-100">
                <Image
                  src="/subcontract/intro-handshake.png"
                  alt="Subcontracting Services Collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 3: OUR SUBCONTRACTING CAPABILITIES ──────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  قدراتنا في <span className="text-[#01a9a0]">مقاولات الباطن</span>
                </>
              ) : (
                <>
                  Our Subcontracting <span className="text-[#01a9a0]">Capabilities</span>
                </>
              )}
            </h2>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-start gap-5 group"
              >
                {/* Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#e6f7f6] flex-shrink-0 flex items-center justify-center p-3 text-[#01a9a0] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cap.icon}
                    alt={cap.titleEn}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* Card Text Content */}
                <div className="flex-1">
                  <span className="block text-xs font-semibold text-gray-400 mb-1 tracking-wider">
                    {cap.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2 leading-snug">
                    {isAr ? cap.titleAr : cap.titleEn}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">
                    {isAr ? cap.descAr : cap.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: BUILT FOR PROJECT REQUIREMENTS ─────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  مصممة لتلبية <span className="text-[#01a9a0]">متطلبات المشاريع</span>
                </>
              ) : (
                <>
                  Built For Project <span className="text-[#01a9a0]">Requirements</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Column Flow with Vertical Cyan Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto divide-y sm:divide-y-0 lg:divide-x lg:rtl:divide-x-reverse divide-teal-100/70">
            {REQUIREMENTS.map((req) => (
              <div
                key={req.id}
                className="px-4 sm:px-7 py-6 sm:py-3 text-left rtl:text-right flex flex-col items-start rtl:items-end group"
              >
                {/* Top Icon */}
                <div className="w-12 h-12 mb-4 flex items-center justify-start rtl:justify-end">
                  <Image
                    src={req.icon}
                    alt={req.titleEn}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain text-[#01a9a0] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Number Index */}
                <span className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">
                  {req.id}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2 leading-snug">
                  {isAr ? req.titleAr : req.titleEn}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">
                  {isAr ? req.descAr : req.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: SIMPLE & EFFICIENT PROCESS ─────────────────────── */}
      <section className="w-full py-20 sm:py-24 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight">
              {isAr ? (
                <>
                  إجراءات بسيطة و <span className="text-[#01a9a0]">تنفيذ فعال</span>
                </>
              ) : (
                <>
                  Simple & <span className="text-[#01a9a0]">Efficient Process</span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Process Steps Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 max-w-6xl mx-auto relative">
            {PROCESS_STEPS.map((proc, index) => (
              <div
                key={proc.step}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Horizontal Arrow between items on desktop */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-8 text-[#01a9a0] z-20 pointer-events-none">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="rtl:rotate-180"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                )}

                {/* Circular Badged Icon */}
                <div className="relative flex flex-col items-center">
                  {/* Top Cyan Number Badge */}
                  <span className="w-7 h-7 rounded-full bg-[#01a9a0] text-white text-xs font-bold flex items-center justify-center z-10 shadow-sm ring-4 ring-[#f4f7fa]">
                    {proc.step}
                  </span>
                  {/* Icon Card Bubble */}
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center p-4 -mt-3.5 pt-4 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={proc.icon}
                      alt={proc.titleEn}
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mt-6 mb-2">
                  {isAr ? proc.titleAr : proc.titleEn}
                </h3>

                {/* Step Description */}
                <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed max-w-[220px]">
                  {isAr ? proc.descAr : proc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: SUPPORTING PROJECTS ACROSS THE INDUSTRY ────────── */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              {isAr
                ? "دعم المشاريع عبر مختلف قطاعات التشييد والبناء"
                : "Supporting Projects Across The Construction Industry"}
            </h2>
          </div>

          {/* 6 Partner Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-7xl mx-auto">
            {INDUSTRY_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200/90 rounded-xl p-5 sm:p-6 text-center flex flex-col items-center justify-center gap-3.5 hover:shadow-lg hover:border-[#01a9a0]/60 hover:-translate-y-1 transition-all duration-300 min-h-[140px] group"
              >
                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={partner.icon}
                    alt={partner.titleEn}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain text-[#01a9a0]"
                  />
                </div>

                {/* Label */}
                <span className="text-xs sm:text-[13px] font-bold text-gray-800 leading-snug">
                  {isAr ? partner.titleAr : partner.titleEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: SUBCONTRACT FAQS ───────────────────────────────── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#01a9a0]">
                {isAr ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-[1.2]">
              {isAr ? (
                <>
                  الأسئلة الشائعة حول <span className="text-[#01a9a0]">المقاولات من الباطن</span>
                </>
              ) : (
                <>
                  Subcontracting <span className="text-[#01a9a0]">Frequently Asked Questions</span>
                </>
              )}
            </h2>

            <p className="mt-3 text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isAr
                ? "إجابات واضحة ومباشرة عن نطاق خدماتنا، معايير الامتثال، الضمانات، وإجراءات التعاقد والتنفيذ."
                : "Find clear answers to common questions about our subcontracting capabilities, compliance standards, warranty terms, and execution process."}
            </p>
          </div>

          {/* Accordion FAQ Cards */}
          <div className="space-y-3 sm:space-y-3.5">
            {SUBCONTRACT_FAQS.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                number={faq.id}
                question={isAr ? faq.questionAr : faq.questionEn}
                answer={isAr ? faq.answerAr : faq.answerEn}
                isOpen={openFaqId === faq.id}
                onToggle={() => toggleFaq(faq.id)}
                isArabic={isAr}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
