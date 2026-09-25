"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText, Search, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-hot-toast";

interface DocumentItem {
  id: number;
  category: "all" | "corporate" | "waterproofing" | "technical";
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  size: string;
  pages: string;
  badgeEn: string;
  badgeAr: string;
}

const DOCUMENTS: DocumentItem[] = [
  {
    id: 1,
    category: "corporate",
    titleEn: "Taj Al Rahmah Corporate Profile 2026",
    titleAr: "الملف التعريفي الرسمي لشركة تاج الرحمة 2026",
    descEn: "Comprehensive company background, trade licenses, engineering approvals, and landmark projects in the UAE.",
    descAr: "نبذة شاملة عن الشركة، التراخيص التجارية، اعتمادات البلديات وقائمة بأبرز المشاريع المنجزة في الإمارات.",
    size: "12.4 MB",
    pages: "28 Pages",
    badgeEn: "Corporate",
    badgeAr: "ملف الشركة",
  },
  {
    id: 2,
    category: "waterproofing",
    titleEn: "Turnkey Waterproofing Systems Catalog",
    titleAr: "كتالوج أنظمة العزل المائي الشاملة",
    descEn: "Specifications for combo roof system, bitumen membranes, polyurethane, and basement waterproofing.",
    descAr: "مواصفات نظام الكومبو المتكامل لأسطح المباني، لفائف البيتومين، البولي يوريثان، وعزل الأقبية والخزانات.",
    size: "8.6 MB",
    pages: "18 Pages",
    badgeEn: "Waterproofing",
    badgeAr: "عزل مائي",
  },
  {
    id: 3,
    category: "technical",
    titleEn: "GRP Lining & Fiberglass Fabrication Specs",
    titleAr: "المواصفات الفنية لتبطين وتصنيع الفيبرجلاس (GRP)",
    descEn: "Technical guidelines for chemical-resistant GRP tank lining, custom molds, and water retention systems.",
    descAr: "دليل فني لتبطين خزانات المياه المقاومة للمواد الكيميائية وحلول صب وتصنيع منتجات GRP المتخصصة.",
    size: "6.2 MB",
    pages: "14 Pages",
    badgeEn: "Technical",
    badgeAr: "مواصفات فنية",
  },
  {
    id: 4,
    category: "technical",
    titleEn: "Epoxy Flooring & Polyurea Coating Guide",
    titleAr: "دليل طلاءات الأرضيات الإيبوكسية والبولي يوريا",
    descEn: "Heavy-duty commercial epoxy systems, non-slip coatings, and rapid-curing polyurea waterproofing.",
    descAr: "أنظمة الإيبوكسي الصناعي للأرضيات الثقيلة، الطلاءات المانعة للانزلاق، والبولي يوريا فائقة السرعة والجودة.",
    size: "5.1 MB",
    pages: "12 Pages",
    badgeEn: "Technical",
    badgeAr: "مواصفات فنية",
  },
  {
    id: 5,
    category: "corporate",
    titleEn: "Quality, HSE & Municipal Approvals Dossier",
    titleAr: "ملف شهادات الجودة والسلامة والاعتمادات الحكومية",
    descEn: "Dubai Municipality, Civil Defense, and ISO standard compliance certifications and approvals.",
    descAr: "شهادات مطابقة بلدية دبي، الدفاع المدني، ومعايير الجودة والصحة والسلامة والبيئة ISO.",
    size: "4.3 MB",
    pages: "10 Pages",
    badgeEn: "Corporate",
    badgeAr: "ملف الشركة",
  },
  {
    id: 6,
    category: "waterproofing",
    titleEn: "General Technical Contracting Brochure",
    titleAr: "بروشور خدمات المقاولات الفنية المتكاملة",
    descEn: "Turnkey overview of MEP, tiling, plastering, false ceiling, and structural renovation capabilities.",
    descAr: "نظرة عامة على أعمال المقاولات المتكاملة، الأعمال الكهروميكانيكية، التبليط، البلاستر، وصيانة المنشآت.",
    size: "7.8 MB",
    pages: "16 Pages",
    badgeEn: "Waterproofing",
    badgeAr: "المقاولات",
  },
];

export default function DownloadPageContent() {
  const { isArabic } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "corporate" | "waterproofing" | "technical">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadingId(doc.id);
    toast.success(
      isArabic
        ? `جاري تحميل ${doc.titleAr}...`
        : `Preparing download for ${doc.titleEn}...`
    );
    setTimeout(() => {
      setDownloadingId(null);
      // Trigger document download
      const link = document.createElement("a");
      link.href = "/logo.png";
      link.download = `${doc.titleEn.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  const filteredDocs = DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      doc.titleEn.toLowerCase().includes(q) ||
      doc.titleAr.toLowerCase().includes(q) ||
      doc.descEn.toLowerCase().includes(q) ||
      doc.descAr.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { key: "all", labelEn: "All Documents", labelAr: "جميع المستندات" },
    { key: "corporate", labelEn: "Company Profile", labelAr: "ملف الشركة" },
    { key: "waterproofing", labelEn: "Waterproofing", labelAr: "العزل المائي" },
    { key: "technical", labelEn: "Technical Specs", labelAr: "المواصفات الفنية" },
  ];

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* ── Page Header ── */}
      <CommonHeader
        title={isArabic ? "مركز التحميل والمستندات" : "Downloads & Resources"}
        breadcrumb={isArabic ? "التحميلات" : "Download"}
        imagePath="/banners/Contact_.png"
      />

      {/* ── Main Section ── */}
      <section className="hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-8xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#01a9a0]">
              {isArabic ? "مركز التحميل والمستندات" : "DOCUMENT DOWNLOAD CENTER"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            <span>{isArabic ? "تحميل البروشورات والملفات " : "Download Official Brochures & "}</span>
            <span className="text-[#01a9a0]">{isArabic ? "التعريفية الرسمية" : "Technical Resources"}</span>
          </h2>

          <p className="mt-4 text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {isArabic
              ? "يمكنكم تحميل أحدث الملفات التعريفية والمواصفات الفنية وكتالوجات أنظمة العزل والمقاولات الخاصة بشركة تاج الرحمة."
              : "Access and download up-to-date corporate profiles, technical brochures, data sheets, and system approvals for your construction projects."}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key as any)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${active
                    ? "bg-[#01a9a0] text-white shadow-md shadow-[#01a9a0]/25"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                    }`}
                >
                  {isArabic ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? "ابحث في المستندات..." : "Search documents..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-sm focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder:text-stone-400"
            />
            <Search className={`w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-3.5" : "left-3.5"}`} />
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDocs.map((doc) => {
              const isCurrentDownloading = downloadingId === doc.id;
              return (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#01a9a0]/40 transition-all duration-300 group"
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#01a9a0]/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shrink-0">
                        <Image
                          src="/certifications/logos/Custom Teal PDF File Badge.svg"
                          alt="PDF Icon"
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                          {isArabic ? doc.badgeAr : doc.badgeEn}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-400">
                          {doc.size}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#01a9a0] transition-colors leading-snug mb-2">
                      {isArabic ? doc.titleAr : doc.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-normal mb-6">
                      {isArabic ? doc.descAr : doc.descEn}
                    </p>
                  </div>

                  {/* Bottom Row: Metadata + Action */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="text-xs text-stone-400 font-medium">
                      {doc.pages}
                    </span>
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={isCurrentDownloading}
                      className="px-4 py-2 rounded-full bg-[#01a9a0] hover:bg-[#009386] active:scale-95 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Download className={`w-3.5 h-3.5 ${isCurrentDownloading ? "animate-bounce" : ""}`} />
                      <span>
                        {isCurrentDownloading
                          ? (isArabic ? "جاري التحميل..." : "Downloading...")
                          : (isArabic ? "تحميل PDF" : "Download PDF")}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500 text-sm">
              {isArabic ? "لم يتم العثور على مستندات مطابقة لبحثك." : "No documents match your search criteria."}
            </p>
          </div>
        )}

        {/* Assistance / Contact Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#012227] to-[#01353c] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2 text-[#00c2b2] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{isArabic ? "دعم المستندات والمناقصات" : "Tender & Project Inquiries"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
              {isArabic ? "هل تحتاج إلى مستندات مخصصة أو جداول كميات (BOQ)؟" : "Need Custom Submittals, BOQ Estimates or Material Approvals?"}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              {isArabic
                ? "تواصل مع مهندسينا للحصول على اعتمادات المواد والمواصفات المعتمدة لمشروعكم."
                : "Our engineering and estimation department can supply project-specific submittals and technical compliance documentation."}
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white font-bold text-sm inline-flex items-center gap-2.5 transition-all shadow-lg shrink-0 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isArabic ? "تواصل مع الفريق الهندسي" : "Contact Engineering Team"}</span>
          </Link>
        </div>

      </section>
    </div>
  );
}
