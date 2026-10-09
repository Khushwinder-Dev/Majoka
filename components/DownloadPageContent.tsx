"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  ArrowRight,
  User,
  Building2,
  Phone,
  Mail,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-hot-toast";
import { FloatInput } from "@/components/ui/FloatField";
import { useVoiceInput } from "@/components/ui/VoiceMicButton";
import CommonHeader from "@/components/Common/CommonHeader";

// Checklist item definition
interface ChecklistItem {
  id: string;
  en: string;
  ar: string;
}

// Card definition
type CardData =
  | {
    type: "single";
    key: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    graphicSvg: string;
    size: string;
  }
  | {
    type: "checklist";
    key: string;
    titleEn: string;
    titleAr: string;
    items: ChecklistItem[];
  };

const RESOURCE_CARDS: CardData[] = [
  // 1. Company Profile
  {
    type: "single",
    key: "company_profile",
    titleEn: "Company Profile",
    titleAr: "الملف التعريفي للشركة",
    descEn:
      "Learn more about Taj Al Rahmah, our expertise, services, project capabilities, and commitment to delivering.",
    descAr:
      "تعرف أكثر على شركة تاج الرحمة، خبراتنا الهندسية، خدماتنا، سجل مشاريعنا والتزامنا بأعلى معايير الجودة.",
    graphicSvg: "/downloadPage/fi_16168696.svg",
    size: "12MB",
  },
  // 2. Certifications & Approvals
  {
    type: "checklist",
    key: "certifications_approvals",
    titleEn: "Certifications & Approvals",
    titleAr: "الشهادات والاعتمادات الرسمية",
    items: [
      { id: "ca_company_certs", en: "Company Certifications", ar: "شهادات الشركة" },
      { id: "ca_trade_license", en: "Trade License", ar: "الرخصة التجارية" },
      { id: "ca_quality_certs", en: "Quality Certifications", ar: "شهادات الجودة" },
      { id: "ca_safety_certs", en: "Safety Certifications", ar: "شهادات السلامة المهنية" },
      { id: "ca_other_approvals", en: "Other Approvals & Registrations", ar: "اعتمادات وتسجيلات أخرى" },
    ],
  },
  // 3. Technical Resources
  {
    type: "checklist",
    key: "technical_resources",
    titleEn: "Technical Resources",
    titleAr: "الموارد الفنية والهندسية",
    items: [
      { id: "tr_prod_specs", en: "Product Specifications", ar: "مواصفات المنتجات" },
      { id: "tr_method_stmts", en: "Method Statements", ar: "بيانات أساليب التنفيذ (Method Statements)" },
      { id: "tr_quality_certs", en: "Quality Certifications", ar: "شهادات جودة المواد" },
      { id: "tr_mat_info", en: "Material Information", ar: "معلومات المواد الكيميائية والعزل" },
      { id: "tr_tech_guidelines", en: "Technical Guidelines", ar: "الإرشادات الفنية" },
    ],
  },
  // 4. HSE Documents (Set 1)
  {
    type: "checklist",
    key: "hse_docs_1",
    titleEn: "HSE Documents",
    titleAr: "وثائق الصحة والسلامة والبيئة",
    items: [
      { id: "hse1_policy", en: "HSE Policy", ar: "سياسة الصحة والسلامة والبيئة" },
      { id: "hse1_safety_guide", en: "Safety Guidelines", ar: "إرشادات السلامة المهنية" },
      { id: "hse1_env_policy", en: "Environmental Policy", ar: "السياسة البيئية" },
      { id: "hse1_safety_certs", en: "Safety Certifications", ar: "شهادات السلامة المهنية" },
      { id: "hse1_qs_procedures", en: "Quality & Safety Procedures", ar: "إجراءات الجودة والسلامة" },
    ],
  },
  // 5. Policies & Documents (Set 1)
  {
    type: "checklist",
    key: "policies_docs_1",
    titleEn: "Policies & Documents",
    titleAr: "السياسات والوثائق المؤسسية",
    items: [
      { id: "pol1_quality_policy", en: "Quality Policy", ar: "سياسة الجودة" },
      { id: "pol1_env_policy", en: "Environmental Policy", ar: "السياسة البيئية" },
      { id: "pol1_code_conduct", en: "Code of Conduct", ar: "ميثاق السلوك المهني" },
      { id: "pol1_privacy_policy", en: "Privacy Policy", ar: "سياسة الخصوصية" },
      { id: "pol1_health_safety", en: "Health & Safety Policy", ar: "سياسة السلامة والصحة" },
    ],
  },
  // 6. HSE Documents (Set 2)
  {
    type: "checklist",
    key: "hse_docs_2",
    titleEn: "HSE Documents",
    titleAr: "وثائق السلامة والبيئة الإجرائية",
    items: [
      { id: "hse2_policy", en: "HSE Policy", ar: "سياسة الصحة والسلامة" },
      { id: "hse2_safety_guide", en: "Safety Guidelines", ar: "دليل إرشادات الموقع" },
      { id: "hse2_env_policy", en: "Environmental Policy", ar: "خطة الإدارة البيئية" },
      { id: "hse2_qs_procedures", en: "Quality & Safety Procedures", ar: "إجراءات السلامة والجودة" },
      { id: "hse2_env_measures", en: "Environmental Policy", ar: "التدابير البيئية للمشاريع" },
    ],
  },
  // 7. Policies & Documents (Set 2)
  {
    type: "checklist",
    key: "policies_docs_2",
    titleEn: "Policies & Documents",
    titleAr: "سياسات الحوكمة والامتثال",
    items: [
      { id: "pol2_quality_policy", en: "Quality Policy", ar: "سياسة ضبط الجودة" },
      { id: "pol2_health_safety", en: "Health & Safety Policy", ar: "سياسة السلامة المهنية" },
      { id: "pol2_env_policy", en: "Environmental Policy", ar: "سياسة الاستدامة البيئية" },
      { id: "pol2_code_conduct", en: "Code of Conduct", ar: "ميثاق قواعد العمل" },
      { id: "pol2_privacy_policy", en: "Privacy Policy", ar: "سياسة سرية المعلومات" },
    ],
  },
  // 8. Technical Data Sheets
  {
    type: "single",
    key: "technical_data_sheets",
    titleEn: "Technical Data Sheets",
    titleAr: "صحائف البيانات الفنية (TDS)",
    descEn: "Technical information for selected products and solutions.",
    descAr: "المواصفات والبيانات الفنية التفصيلية لكافة المنتجات وحلول العزل المائي.",
    graphicSvg: "/downloadPage/fi_6618122.svg",
    size: "52MB",
  },
  // 9. Certifications
  {
    type: "checklist",
    key: "certifications_authorities",
    titleEn: "Certifications",
    titleAr: "شهادات واعتمادات الهيئات الحكومية",
    items: [
      { id: "cert_dm_approved", en: "Dubai Municipality DM Approved", ar: "معتمد من بلدية دبي (DM)" },
      { id: "cert_dcl_approved", en: "DCL Approved Products", ar: "منتجات معتمدة من مختبر دبي المركزي (DCL)" },
      { id: "cert_wras_certified", en: "WRAS Certified Products", ar: "منتجات معتمدة من WRAS لمياه الشرب" },
      { id: "cert_dm_green", en: "DM Green Building Compliant", ar: "مطابق لمعايير المباني الخضراء (Sa'fat)" },
    ],
  },
];

// Gather all checklist item IDs
const ALL_CHECKLIST_IDS: string[] = RESOURCE_CARDS.reduce<string[]>((acc, card) => {
  if (card.type === "checklist") {
    return acc.concat(card.items.map((i) => i.id));
  }
  return acc;
}, []);

export default function DownloadPageContent() {
  const { isArabic } = useLanguage();

  // Selection states (all checked by default as seen in the reference image design)
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ALL_CHECKLIST_IDS.forEach((id) => {
      init[id] = true;
    });
    return init;
  });

  const [selectedSingles, setSelectedSingles] = useState<Record<string, boolean>>({
    company_profile: true,
    technical_data_sheets: true,
  });

  // Form state
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const voice = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setForm((prev) => ({ ...prev, [fieldName]: text }));
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  // Toggle single item
  const toggleItem = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle single card (Card 1 or Card 8)
  const toggleSingle = (key: string) => {
    setSelectedSingles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle select all inside a specific checklist card
  const toggleCardSelectAll = (items: ChecklistItem[]) => {
    const allChecked = items.every((i) => selectedItems[i.id]);
    setSelectedItems((prev) => {
      const updated = { ...prev };
      items.forEach((i) => {
        updated[i.id] = !allChecked;
      });
      return updated;
    });
  };

  // Total count of selected resources
  const selectedChecklistCount = Object.values(selectedItems).filter(Boolean).length;
  const selectedSinglesCount = Object.values(selectedSingles).filter(Boolean).length;
  const totalSelectedCount = selectedChecklistCount + selectedSinglesCount;

  // Handle form submission and download
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) {
      newErrors.name = isArabic ? "يرجى إدخال الاسم" : "Please enter your name";
    }
    if (!form.phone.trim()) {
      newErrors.phone = isArabic ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number";
    }
    if (!form.email.trim()) {
      newErrors.email = isArabic ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = isArabic ? "البريد الإلكتروني غير صحيح" : "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(isArabic ? "يرجى استكمال الحقول المطلوبة" : "Please fill in the required fields");
      return;
    }

    if (totalSelectedCount === 0) {
      toast.error(
        isArabic
          ? "يرجى تحديد مستند واحد على الأقل للتحميل"
          : "Please select at least one document to download"
      );
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Sync lead in background to /api/contact
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "4_Contact_Us",
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          company: form.companyName,
          service: "Resource Download Center",
          message: `User requested download of ${totalSelectedCount} resources. Company: ${form.companyName || "N/A"}`,
        }),
      }).catch(() => { });

      toast.success(
        isArabic
          ? "تم تجهيز المستندات بنجاح، جاري بدء التحميل..."
          : "Preparing documents... Your download will begin shortly!"
      );

      // Trigger download
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/logo.png";
        link.download = "Taj_Al_Rahmah_Corporate_Resources_2026.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsSubmitting(false);
      }, 1200);
    } catch {
      setIsSubmitting(false);
      toast.error(isArabic ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full bg-[#f8fbfb]" dir={isArabic ? "rtl" : "ltr"}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (Downloads)
      ══════════════════════════════════════════════════════════════ */}
      <CommonHeader
        imagePath="/banners/new/download.png"
        showHeading={false}
        showBreadcrumb={false}
        unoptimized
      />

      {/* ══════════════════════════════════════════════════════════════
          2. RESOURCES & DOCUMENTS SECTION (3x3 Grid of 9 Cards)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-[#0B1C24] tracking-tight leading-tight">
              {isArabic ? (
                <>
                  الموارد <span className="text-[#00DDCF]">&amp; المستندات</span>
                </>
              ) : (
                <>
                  Resources <span className="text-[#00DDCF]">&amp; Documents</span>
                </>
              )}
            </h2>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-stone-600 leading-relaxed max-w-2xl mx-auto">
              {isArabic
                ? "استكشف وحمّل ملفات ومستندات شركتنا، المواصفات الفنية، شهادات الاعتماد وغيرها من الموارد. تقدم هذه المستندات نظرة شاملة على إمكانياتنا وخبراتنا والتزامنا بأعلى معايير الجودة."
                : "Explore and download our company documents, technical information, certifications, and other resources. These materials provide an overview of our capabilities, services, expertise, and commitment to quality."}
            </p>
          </div>

          {/* 3x3 Grid (9 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {RESOURCE_CARDS.map((card) => {
              // ── CARD VARIANT 1: Single file card (Company Profile & Technical Data Sheets) ──
              if (card.type === "single") {
                const isSelected = !!selectedSingles[card.key];
                return (
                  <div
                    key={card.key}
                    onClick={() => toggleSingle(card.key)}
                    className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#00DDCF]/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Top-Left Category Icon */}
                      <div className="w-10 h-10 rounded-xl bg-[#00DDCF]/10 flex items-center justify-center p-2 mb-4">
                        <Image
                          src="/downloadPage/fi_4673322.svg"
                          alt="Category Icon"
                          width={28}
                          height={28}
                          className="w-6 h-6 object-contain"
                        />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1C24] group-hover:text-[#00a89a] transition-colors">
                        {isArabic ? card.titleAr : card.titleEn}
                      </h3>

                      {/* Card Description */}
                      <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                        {isArabic ? card.descAr : card.descEn}
                      </p>

                      {/* Big Center Graphic */}
                      <div className="my-6 flex items-center justify-center">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={card.graphicSvg}
                            alt={card.titleEn}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Checkbox Icon + Size Badge */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100/70">
                      {/* Circular Turquoise Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSingle(card.key);
                        }}
                        aria-label={isSelected ? "Deselect" : "Select"}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer ${isSelected
                          ? "bg-[#00DDCF] border border-[#00DDCF] text-white shadow-xs"
                          : "border-2 border-slate-300 hover:border-[#00DDCF] bg-white"
                          }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      {/* Size Badge */}
                      <span className="text-[11px] font-semibold text-stone-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                        {card.size}
                      </span>
                    </div>
                  </div>
                );
              }

              // ── CARD VARIANT 2: Multi-checkbox checklist cards ──
              const allChecked = card.items.every((i) => selectedItems[i.id]);

              return (
                <div
                  key={card.key}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#00DDCF]/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top-Left Category Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#00DDCF]/10 flex items-center justify-center p-2 mb-4">
                      <Image
                        src="/downloadPage/fi_4673322.svg"
                        alt="Category Icon"
                        width={28}
                        height={28}
                        className="w-6 h-6 object-contain"
                      />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1C24]">
                      {isArabic ? card.titleAr : card.titleEn}
                    </h3>

                    {/* Checklist Items */}
                    <div className="mt-4 sm:mt-5 space-y-2.5">
                      {/* Select All Option */}
                      <div
                        onClick={() => toggleCardSelectAll(card.items)}
                        className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 hover:text-[#00a89a] cursor-pointer transition-colors select-none pb-1"
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${allChecked
                            ? "bg-[#00DDCF] border border-[#00DDCF] text-white"
                            : "border-2 border-slate-300 bg-white"
                            }`}
                        >
                          {allChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span>{isArabic ? "تحديد الكل" : "Select All"}</span>
                      </div>

                      {/* Individual Items */}
                      {card.items.map((item) => {
                        const checked = !!selectedItems[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className="flex items-center gap-2.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer transition-colors select-none"
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${checked
                                ? "bg-[#00DDCF] border border-[#00DDCF] text-white"
                                : "border-2 border-slate-300 bg-white hover:border-[#00DDCF]"
                                }`}
                            >
                              {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </span>
                            <span className="leading-snug">
                              {isArabic ? item.ar : item.en}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subtle spacing bottom */}
                  <div className="pt-4" />
                </div>
              );
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              3. DOWNLOAD FORM SECTION (Left Heading + Right Form Card)
          ══════════════════════════════════════════════════════════════ */}
          <div className="mt-20 sm:mt-24 md:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-[1240px] mx-auto">
            {/* Left Column: Heading & Tagline */}
            <div className="text-left rtl:text-right">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-6 h-[2px] bg-[#00DDCF] inline-block" />
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#00DDCF]">
                  {isArabic ? "التحميلات" : "DOWNLOAD"}
                </span>
              </div>

              {/* Huge Bold Title */}
              <h3 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#0B1C24] leading-[1.15] tracking-tight">
                {isArabic ? (
                  <>
                    حمّل أحدث
                    <br />
                    مواردنا الهندسية
                    <br />
                    <span className="text-[#00DDCF]">أدلة ومستندات</span>
                    <br />
                    <span className="text-[#00DDCF]">شاملة للمشاريع</span>
                  </>
                ) : (
                  <>
                    Download Our
                    <br />
                    Latest Resources
                    <br />
                    <span className="text-[#00DDCF]">Guides &amp; Helpful</span>
                    <br />
                    <span className="text-[#00DDCF]">Materials</span>
                  </>
                )}
              </h3>

              {/* Dynamic counter of selected resources */}
              {/* <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-medium text-stone-700">
                <Sparkles className="w-4 h-4 text-[#00DDCF]" />
                <span>
                  {isArabic
                    ? `تم تحديد ${totalSelectedCount} من المستندات والموارد الجاهزة للتحميل`
                    : `${totalSelectedCount} resources selected ready for download`}
                </span>
              </div> */}
            </div>

            {/* Right Column: Download Form Card */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-[0_12px_45px_rgba(0,0,0,0.06)] border border-slate-100 max-w-lg w-full mx-auto lg:ml-auto rtl:lg:mr-auto rtl:lg:ml-0">
              <form onSubmit={handleDownloadSubmit} className="space-y-4" noValidate>
                {/* 1. Name Field */}
                <FloatInput
                  type="text"
                  name="name"
                  value={form.name}
                  label={isArabic ? "الاسم الكامل *" : "Full Name *"}
                  required
                  isArabic={isArabic}
                  error={errors.name}
                  icon={<User className="w-4 h-4" />}
                  isListening={voice.listeningField === "name"}
                  onVoiceToggle={() => voice.toggleListening("name", "text")}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, name: e.target.value }));
                    if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                  }}
                />

                {/* 2. Company Name Field */}
                <FloatInput
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  label={isArabic ? "اسم الشركة" : "Company Name"}
                  isArabic={isArabic}
                  icon={<Building2 className="w-4 h-4" />}
                  isListening={voice.listeningField === "companyName"}
                  onVoiceToggle={() => voice.toggleListening("companyName", "text")}
                  onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                />

                {/* 3. Phone Number Field */}
                <FloatInput
                  type="tel"
                  name="phone"
                  value={form.phone}
                  label={isArabic ? "رقم الهاتف *" : "Phone Number *"}
                  required
                  isArabic={isArabic}
                  error={errors.phone}
                  icon={<Phone className="w-4 h-4" />}
                  isListening={voice.listeningField === "phone"}
                  onVoiceToggle={() => voice.toggleListening("phone", "phone")}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, phone: e.target.value }));
                    if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
                  }}
                />

                {/* 4. Email Address Field */}
                <FloatInput
                  type="email"
                  name="email"
                  value={form.email}
                  label={isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                  required
                  isArabic={isArabic}
                  error={errors.email}
                  icon={<Mail className="w-4 h-4" />}
                  isListening={voice.listeningField === "email"}
                  onVoiceToggle={() => voice.toggleListening("email", "email")}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, email: e.target.value }));
                    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                  }}
                />

                {/* 5. DOWNLOAD Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#00DDCF] hover:bg-[#00c5b8] active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(0,221,207,0.35)] transition-all cursor-pointer disabled:opacity-70"
                >
                  <Download className={`w-4 h-4 stroke-[2.4] ${isSubmitting ? "animate-bounce" : ""}`} />
                  <span>
                    {isSubmitting
                      ? (isArabic ? "جاري التحميل..." : "DOWNLOADING...")
                      : (isArabic ? "تحميل المستندات" : "DOWNLOAD")}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. CTA BANNER SECTION: "Let's Discuss Your Project"
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 md:py-24 bg-gradient-to-r from-[#009e90] via-[#00a89a] to-[#00b4a6] text-white overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-tight">
            {isArabic ? "دعنا نناقش مشروعك القادم" : "Let's Discuss Your Project"}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? "من العزل المائي والإصلاحات الهندسية إلى حلول البناء المتخصصة، فريقنا الهندسي جاهز لدعم كافة متطلبات مشروعك بأعلى كفاءة."
              : "From waterproofing and repair to specialized construction solutions, our team is ready to support your project requirements."}
          </p>

          {/* GET A QUOTE Button (White Pill with Circular Arrow) */}
          <div className="mt-7 sm:mt-9 flex items-center justify-center">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rtl:pl-2 rtl:pr-6 rounded-full bg-white text-[#009e90] font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all group"
            >
              <span>{isArabic ? "احصل على عرض سعر" : "GET A QUOTE"}</span>
              <span className="w-8 h-8 rounded-full bg-[#009e90] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                <ArrowRight className="w-4 h-4 stroke-[2.5] rtl:rotate-180" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
