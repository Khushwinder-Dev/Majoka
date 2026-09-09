"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Fuel,
  Home,
  Hotel,
  Landmark,
  LayoutGrid,
  LayoutList,
  MapPin,
  Search,
  SlidersHorizontal,
  TrainFront,
  Cog,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type CategoryId =
  | "all"
  | "commercial"
  | "industrial"
  | "hospitality"
  | "infrastructure"
  | "residential"
  | "oil-gas"
  | "transportation"
  | "manufacturing";

type SortId = "latest" | "oldest" | "name";

type Project = {
  id: number;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  refCode: string;
  date: string;
};

const IMG = {
  pumping: "/project-page/Background.png",
  hotel: "/project-page/Background (1).png",
  falcon: "/project-page/Falcon City Industrial Plant.png",
  office: "/project-page/Contemporary commercial office center.png",
  manufacturing: "/project-page/Engineers inspecting manufacturing floor.png",
  alsaaf: "/project-page/Al Saaf Resort & Hospitality.png",
  pool: "/project-page/Luxury pool at coastal hospitality property.png",
  oil: "/project-page/Al Jada Oil and Gas Offshore Facility.png",
  villa: "/project-page/Baniyas North Phase Luxury Villa.png",
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pumping Station",
    titleAr: "محطة الضخ",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "commercial",
    image: IMG.pumping,
    refCode: "001",
    date: "2025-11-12",
  },
  {
    id: 2,
    title: "Falcon City Industrial Plant",
    titleAr: "المصنع الصناعي في فالكون سيتي",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "industrial",
    image: IMG.falcon,
    refCode: "002",
    date: "2025-10-28",
  },
  {
    id: 3,
    title: "Grand Hospitality Interior",
    titleAr: "التصميم الداخلي للضيافة الفاخرة",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.hotel,
    refCode: "003",
    date: "2025-10-04",
  },
  {
    id: 4,
    title: "Contemporary Commercial Office Center",
    titleAr: "مركز المكاتب التجارية المعاصر",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "commercial",
    image: IMG.office,
    refCode: "004",
    date: "2025-09-18",
  },
  {
    id: 5,
    title: "Manufacturing Floor Inspection",
    titleAr: "تفتيش أرضية التصنيع",
    location: "Sharjah, United Arab Emirates",
    locationAr: "الشارقة، الإمارات العربية المتحدة",
    category: "manufacturing",
    image: IMG.manufacturing,
    refCode: "005",
    date: "2025-08-22",
  },
  {
    id: 6,
    title: "Al Saaf Resort & Hospitality",
    titleAr: "منتجع الصاف والضيافة",
    location: "Ras Al Khaimah, United Arab Emirates",
    locationAr: "رأس الخيمة، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.alsaaf,
    refCode: "006",
    date: "2025-07-30",
  },
  {
    id: 7,
    title: "Coastal Hospitality Pool",
    titleAr: "مسبح الضيافة الساحلي",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.pool,
    refCode: "007",
    date: "2025-06-14",
  },
  {
    id: 8,
    title: "Al Jada Oil and Gas Offshore Facility",
    titleAr: "منشأة الجادة النفطية البحرية",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "oil-gas",
    image: IMG.oil,
    refCode: "008",
    date: "2025-05-09",
  },
  {
    id: 9,
    title: "Baniyas North Phase Luxury Villa",
    titleAr: "فيلا بني ياس الشمالية الفاخرة",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "residential",
    image: IMG.villa,
    refCode: "009",
    date: "2025-04-21",
  },
  {
    id: 10,
    title: "Business Bay Corporate Tower",
    titleAr: "برج الشركات في الخليج التجاري",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "commercial",
    image: IMG.office,
    refCode: "010",
    date: "2025-03-16",
  },
  {
    id: 11,
    title: "Jebel Ali Processing Facility",
    titleAr: "منشأة معالجة جبل علي",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "industrial",
    image: IMG.falcon,
    refCode: "011",
    date: "2025-02-11",
  },
  {
    id: 12,
    title: "Palm Jumeirah Guest Suites",
    titleAr: "أجنحة ضيوف نخلة جميرا",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.hotel,
    refCode: "012",
    date: "2025-01-27",
  },
  {
    id: 13,
    title: "District Cooling Plant",
    titleAr: "محطة التبريد المركزي",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "infrastructure",
    image: IMG.pumping,
    refCode: "013",
    date: "2024-12-08",
  },
  {
    id: 14,
    title: "Arabian Ranches Private Villa",
    titleAr: "فيلا المرابع العربية الخاصة",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "residential",
    image: IMG.villa,
    refCode: "014",
    date: "2024-11-19",
  },
  {
    id: 15,
    title: "Expo City Transit Hub",
    titleAr: "مركز إكسبو سيتي للنقل",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "transportation",
    image: IMG.office,
    refCode: "015",
    date: "2024-10-03",
  },
  {
    id: 16,
    title: "Precision Assembly Facility",
    titleAr: "منشأة التجميع الدقيق",
    location: "Sharjah, United Arab Emirates",
    locationAr: "الشارقة، الإمارات العربية المتحدة",
    category: "manufacturing",
    image: IMG.manufacturing,
    refCode: "016",
    date: "2024-09-12",
  },
  {
    id: 17,
    title: "DIFC Commercial Plaza",
    titleAr: "بلازا مركز دبي المالي التجاري",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "commercial",
    image: IMG.office,
    refCode: "017",
    date: "2024-08-05",
  },
  {
    id: 18,
    title: "Water Treatment Facility",
    titleAr: "محطة معالجة المياه",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "infrastructure",
    image: IMG.pumping,
    refCode: "018",
    date: "2024-07-21",
  },
  {
    id: 19,
    title: "Saadiyat Beach Resort Wing",
    titleAr: "جناح منتجع شاطئ السعديات",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.pool,
    refCode: "019",
    date: "2024-06-18",
  },
  {
    id: 20,
    title: "Offshore Platform Maintenance",
    titleAr: "صيانة المنصة البحرية",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "oil-gas",
    image: IMG.oil,
    refCode: "020",
    date: "2024-05-02",
  },
  {
    id: 21,
    title: "Al Barari Residence",
    titleAr: "مساكن البراري",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "residential",
    image: IMG.villa,
    refCode: "021",
    date: "2024-04-14",
  },
  {
    id: 22,
    title: "Ras Al Khor Industrial Yard",
    titleAr: "الساحة الصناعية في رأس الخور",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "industrial",
    image: IMG.falcon,
    refCode: "022",
    date: "2024-03-09",
  },
  {
    id: 23,
    title: "Port Rashid Terminal",
    titleAr: "محطة ميناء راشد",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "transportation",
    image: IMG.pumping,
    refCode: "023",
    date: "2024-02-26",
  },
  {
    id: 24,
    title: "Downtown Retail Complex",
    titleAr: "مجمع التجزئة في وسط المدينة",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "commercial",
    image: IMG.office,
    refCode: "024",
    date: "2024-01-17",
  },
  {
    id: 25,
    title: "Utilities Corridor Protection",
    titleAr: "حماية ممر المرافق",
    location: "Abu Dhabi, United Arab Emirates",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    category: "infrastructure",
    image: IMG.pumping,
    refCode: "025",
    date: "2023-12-11",
  },
  {
    id: 26,
    title: "Al Quoz Industrial Warehouse",
    titleAr: "مستودع القوز الصناعي",
    location: "Dubai, United Arab Emirates",
    locationAr: "دبي، الإمارات العربية المتحدة",
    category: "industrial",
    image: IMG.falcon,
    refCode: "026",
    date: "2023-11-04",
  },
  {
    id: 27,
    title: "Al Saaf Spa & Wellness",
    titleAr: "سبا وعافية الصاف",
    location: "Ras Al Khaimah, United Arab Emirates",
    locationAr: "رأس الخيمة، الإمارات العربية المتحدة",
    category: "hospitality",
    image: IMG.alsaaf,
    refCode: "027",
    date: "2023-10-08",
  },
];

const CATEGORY_META: {
  id: CategoryId;
  label: string;
  labelAr: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { id: "all", label: "All Projects", labelAr: "كل المشاريع", icon: LayoutGrid, color: "#01a9a0" },
  { id: "commercial", label: "Commercial", labelAr: "تجاري", icon: Building2, color: "#01a9a0" },
  { id: "industrial", label: "Industrial", labelAr: "صناعي", icon: Factory, color: "#5BA3D9" },
  { id: "hospitality", label: "Hospitality", labelAr: "الضيافة", icon: Hotel, color: "#2563EB" },
  { id: "infrastructure", label: "Infrastructure", labelAr: "البنية التحتية", icon: Landmark, color: "#64748B" },
  { id: "residential", label: "Residential", labelAr: "سكني", icon: Home, color: "#F59E0B" },
  { id: "oil-gas", label: "Oil & Gas", labelAr: "النفط والغاز", icon: Fuel, color: "#0F766E" },
  { id: "transportation", label: "Transportation", labelAr: "النقل", icon: TrainFront, color: "#6366F1" },
  { id: "manufacturing", label: "Manufacturing", labelAr: "التصنيع", icon: Cog, color: "#78716C" },
];

const PAGE_SIZE = 9;

function getCategoryMeta(id: Exclude<CategoryId, "all">) {
  return CATEGORY_META.find((item) => item.id === id)!;
}

export default function ProjectsGallery() {
  const { isArabic } = useLanguage();
  const [category, setCategory] = useState<CategoryId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("latest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((project) => {
      map[project.category] = (map[project.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = PROJECTS.filter((project) => {
      const matchesCategory = category === "all" || project.category === category;
      const haystack = `${project.title} ${project.titleAr} ${project.location} ${project.refCode}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesCategory && matchesQuery;
    });

    items = [...items].sort((a, b) => {
      if (sort === "name") {
        const left = isArabic ? a.titleAr : a.title;
        const right = isArabic ? b.titleAr : b.title;
        return left.localeCompare(right);
      }
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });

    return items;
  }, [category, query, sort, isArabic]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selectCategory = (id: CategoryId) => {
    setCategory(id);
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxButtons + 1));
    return Array.from({ length: maxButtons }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <section
      className="relative w-full bg-white py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#5B6B73]">
              {isArabic ? "خبرتنا" : "OUR EXPERTISE"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
            {isArabic ? (
              <>
                مبني حول{" "}
                <span className="text-[#01a9a0]">مشاريعك</span>
              </>
            ) : (
              <>
                Built Around{" "}
                <span className="text-[#01a9a0]">Your Projects</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-500 leading-relaxed max-w-2xl mx-auto">
            {isArabic
              ? "ندرك أن لكل قطاع تحديات فريدة. حلولنا المخصصة للعزل والحماية تساعدك على بناء أصول أكثر أماناً وقوة واستدامة."
              : "We understand that every industry has unique challenges. Our tailored waterproofing and protective solutions help you build safer, stronger, and more sustainable assets."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-28">
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="lg:hidden w-full flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="inline-flex items-center gap-2 font-bold text-stone-800">
                <SlidersHorizontal className="w-4 h-4 text-[#01a9a0]" />
                {isArabic ? "تصنيفات المشاريع" : "Project Categories"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`${
                filtersOpen ? "block" : "hidden"
              } lg:block rounded-2xl border border-stone-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5`}
            >
              <h3 className="hidden lg:block text-lg font-extrabold text-stone-900 mb-4">
                {isArabic ? "تصنيفات المشاريع" : "Project Categories"}
              </h3>
              <ul className="space-y-1.5">
                {CATEGORY_META.map((item) => {
                  const Icon = item.icon;
                  const active = category === item.id;
                  const count = counts[item.id] || 0;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => selectCategory(item.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "bg-[#01a9a0] text-white shadow-[0_8px_18px_rgba(1,169,160,0.28)]"
                            : "text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            active ? "bg-white/15 text-white" : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="flex-1 text-left rtl:text-right">
                          {isArabic ? item.labelAr : item.label}
                        </span>
                        <span className={`tabular-nums ${active ? "text-white" : "text-stone-400"}`}>
                          {count}
                        </span>
                        {active && (
                          <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className={`${
                filtersOpen ? "block" : "hidden"
              } lg:block rounded-2xl bg-[#E8F7F5] p-5 sm:p-6`}
            >
              <h3 className="text-lg font-extrabold text-stone-900 leading-snug">
                {isArabic ? "هل لديك مشروع مخصص؟" : "Have a custom project in mind?"}
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                {isArabic
                  ? "تحدث مع خبرائنا واحصل على حل مصمم خصيصاً لمشروعك."
                  : "Talk to our experts and get a tailored solution."}
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(1,169,160,0.3)] group"
              >
                <span>{isArabic ? "تواصل معنا" : "Contact Us"}</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#01a9a0] flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-9 min-w-0">
            <div className="flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-4 mb-5 sm:mb-6">
              <nav className="text-xs sm:text-sm text-stone-400 shrink-0">
                <Link href="/" className="hover:text-[#01a9a0] transition-colors">
                  {isArabic ? "الرئيسية" : "Home"}
                </Link>
                <span className="mx-1.5">{">"}</span>
                <span className="text-stone-600">{isArabic ? "المشاريع" : "Projects"}</span>
              </nav>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 xl:ml-auto w-full xl:w-auto">
                <label className="relative flex-1 xl:w-[240px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rtl:left-auto rtl:right-3" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder={isArabic ? "ابحث في المشاريع..." : "Search projects..."}
                    className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-9 pr-4 rtl:pl-4 rtl:pr-9 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/15"
                  />
                </label>

                <div className="flex items-center gap-2.5">
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortId)}
                      className="w-full sm:w-[150px] appearance-none rounded-full border border-stone-200 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-stone-600 outline-none focus:border-[#01a9a0] cursor-pointer"
                    >
                      <option value="latest">{isArabic ? "الأحدث أولاً" : "Latest First"}</option>
                      <option value="oldest">{isArabic ? "الأقدم أولاً" : "Oldest First"}</option>
                      <option value="name">{isArabic ? "حسب الاسم" : "Name A-Z"}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      aria-label={isArabic ? "عرض شبكي" : "Grid view"}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        view === "grid"
                          ? "bg-[#01a9a0] text-white"
                          : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      aria-label={isArabic ? "عرض قائمة" : "List view"}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        view === "list"
                          ? "bg-[#01a9a0] text-white"
                          : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {paged.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 py-16 text-center text-stone-500">
                {isArabic ? "لا توجد مشاريع مطابقة لبحثك." : "No projects match your search."}
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {paged.map((project) => (
                  <ProjectCard key={project.id} project={project} isArabic={isArabic} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paged.map((project) => (
                  <ProjectCard key={project.id} project={project} isArabic={isArabic} list />
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <p className="text-sm text-stone-500">
                {isArabic
                  ? `عرض ${paged.length} من ${filtered.length} مشروعاً`
                  : `Showing ${paged.length} of ${filtered.length} projects`}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
                  aria-label={isArabic ? "السابق" : "Previous page"}
                >
                  <ChevronLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </button>
                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPage(num)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${
                      num === currentPage
                        ? "bg-[#01a9a0] text-white"
                        : "text-stone-500 hover:bg-stone-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
                  aria-label={isArabic ? "التالي" : "Next page"}
                >
                  <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isArabic,
  list = false,
}: {
  project: Project;
  isArabic: boolean;
  list?: boolean;
}) {
  const meta = getCategoryMeta(project.category);

  return (
    <article
      className={`group bg-white rounded-2xl border border-stone-100 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)] transition-all duration-300 overflow-hidden ${
        list ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div className={`relative overflow-hidden ${list ? "sm:w-[280px] sm:shrink-0 h-52 sm:h-auto" : "h-[190px] sm:h-[200px]"}`}>
        <Image
          src={project.image}
          alt={isArabic ? project.titleAr : project.title}
          fill
          sizes={list ? "(max-width: 640px) 100vw, 280px" : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-stone-700 shadow-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
          {isArabic ? meta.labelAr : meta.label}
        </span>
        <Link
          href="/contact"
          className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 w-10 h-10 rounded-full bg-white text-[#01a9a0] flex items-center justify-center shadow-md hover:bg-[#01a9a0] hover:text-white transition-colors"
          aria-label={isArabic ? project.titleAr : project.title}
        >
          <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
        </Link>
      </div>

      <div className="flex-1 p-4 sm:p-5 flex flex-col">
        <h3 className="text-[15px] sm:text-base font-extrabold text-stone-900 leading-snug">
          {isArabic ? project.titleAr : project.title}
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-xs sm:text-sm text-stone-500">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-stone-400" />
          <span>{isArabic ? project.locationAr : project.location}</span>
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100 text-xs sm:text-sm">
          <span className="text-stone-400">{isArabic ? "رمز المرجع" : "Ref Code"}</span>
          <span className="font-extrabold text-[#01a9a0]">#{project.refCode}</span>
        </div>
      </div>
    </article>
  );
}
