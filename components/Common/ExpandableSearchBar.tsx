"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Mic,
  MicOff,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Wrench,
  Package,
  Layers,
  Sparkles,
  Building2,
  ShieldCheck,
  Droplets,
  HardHat,
  FileText,
  HelpCircle,
  Paintbrush,
  Bot,
  Send,
  MessageCircle,
} from "lucide-react";
import { SITE_SEARCH_INDEX, SearchResultItem } from "@/data/searchIndex";
import { useLanguage } from "@/context/LanguageContext";

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface ExpandableSearchBarProps {
  onSearch?: (query: string, href?: string) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
  iconColor?: string;
  hoverIconColor?: string;
  dashedButton?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Service: { bg: "bg-teal-50", text: "text-[#009e90]", border: "border-teal-200" },
  Product: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Subcontract: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Solution: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  Project: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  Industry: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Resource: { bg: "bg-teal-50", text: "text-[#009e90]", border: "border-teal-200" },
  Page: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
};

type FilterCategory = "all" | "services" | "solutions" | "projects" | "industries" | "resources";

const FILTER_TABS: { key: FilterCategory; labelEn: string; labelAr: string }[] = [
  { key: "all", labelEn: "All", labelAr: "الكل" },
  { key: "services", labelEn: "Services", labelAr: "الخدمات" },
  { key: "solutions", labelEn: "Solutions", labelAr: "الحلول" },
  { key: "projects", labelEn: "Projects", labelAr: "المشاريع" },
  { key: "industries", labelEn: "Industries", labelAr: "القطاعات" },
  { key: "resources", labelEn: "Resources", labelAr: "المصادر" },
];

interface MostUsedItem {
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MOST_USED_BY_TAB: Record<FilterCategory, MostUsedItem[]> = {
  all: [
    {
      titleEn: "Waterproofing Solutions",
      titleAr: "حلول العزل المائي المتكاملة",
      categoryEn: "Solutions",
      categoryAr: "حلول",
      href: "/solutions",
      icon: ShieldCheck,
    },
    {
      titleEn: "GRP & Fiberglass Waterproofing",
      titleAr: "عزل الألياف الزجاجية (فيبرجلاس)",
      categoryEn: "Services",
      categoryAr: "خدمات",
      href: "/services?service=1",
      icon: Droplets,
    },
    {
      titleEn: "Combo System Roof Waterproofing",
      titleAr: "نظام كومبو المتكامل للأسطح",
      categoryEn: "Roofing Division",
      categoryAr: "قسم الأسطح",
      href: "/services?service=2",
      icon: Layers,
    },
    {
      titleEn: "Epoxy Floor Coating",
      titleAr: "طلاء أرضيات الإيبوكسي",
      categoryEn: "Flooring Systems",
      categoryAr: "أنظمة الأرضيات",
      href: "/services?service=3",
      icon: Paintbrush,
    },
    {
      titleEn: "Subcontracting & Tenders",
      titleAr: "مقاولات الباطن والمناقصات",
      categoryEn: "B2B Contracting",
      categoryAr: "مقاولات تخصصية",
      href: "/subcontract",
      icon: HardHat,
    },
    {
      titleEn: "Commercial Landmark Projects",
      titleAr: "مشاريع الأبراج والمنشآت التجارية",
      categoryEn: "Portfolio",
      categoryAr: "محفظة الأعمال",
      href: "/project",
      icon: Building2,
    },
  ],
  services: [
    {
      titleEn: "GRP & Fiberglass Waterproofing",
      titleAr: "عزل الألياف الزجاجية (فيبرجلاس)",
      categoryEn: "Roofs & Tanks Protection",
      categoryAr: "حماية الأسطح والخزانات",
      href: "/services?service=1",
      icon: Droplets,
    },
    {
      titleEn: "Combo System Roof Waterproofing",
      titleAr: "نظام كومبو المتكامل للأسطح",
      categoryEn: "Thermal & Waterproofing",
      categoryAr: "عزل مائي وحراري معتمد",
      href: "/services?service=2",
      icon: Layers,
    },
    {
      titleEn: "Epoxy Floor Coating",
      titleAr: "طلاء أرضيات الإيبوكسي الصناعي",
      categoryEn: "Industrial Flooring",
      categoryAr: "أرضيات صناعية وتجارية",
      href: "/services?service=3",
      icon: Paintbrush,
    },
    {
      titleEn: "Bitumen Membrane Waterproofing",
      titleAr: "عزل الأغشية البيتومينية",
      categoryEn: "Basements & Substructures",
      categoryAr: "عزل الأساسات والقواعد",
      href: "/services?service=4",
      icon: ShieldCheck,
    },
    {
      titleEn: "Polyurea Fast-Curing Waterproofing",
      titleAr: "عزل البولي يوريا فائق السرعة",
      categoryEn: "Heavy-Duty Membranes",
      categoryAr: "عزل فائق التحمل",
      href: "/services?service=5",
      icon: Droplets,
    },
    {
      titleEn: "Injection Crack Leak Sealing",
      titleAr: "حقن الخرسانة ومعالجة التسربات",
      categoryEn: "Targeted Leak Sealing",
      categoryAr: "معالجة التشققات والتسربات",
      href: "/services?service=6",
      icon: Wrench,
    },
  ],
  solutions: [
    {
      titleEn: "Waterproofing Solutions",
      titleAr: "حلول العزل المائي وحماية المنشآت",
      categoryEn: "Moisture Protection",
      categoryAr: "حماية متقدمة ضد الرطوبة",
      href: "/solutions",
      icon: ShieldCheck,
    },
    {
      titleEn: "Concrete Repair & Protection",
      titleAr: "إصلاح وحماية الخرسانة الإنشائية",
      categoryEn: "Structural Restoration",
      categoryAr: "ترميم وإصلاح إنشائي",
      href: "/solutions",
      icon: Wrench,
    },
    {
      titleEn: "Roofing & Thermal Systems",
      titleAr: "حلول الأسطح والعزل الحراري",
      categoryEn: "High-Efficiency Roofs",
      categoryAr: "أسطح عالية الكفاءة",
      href: "/solutions",
      icon: Layers,
    },
    {
      titleEn: "Basement & Below-Ground Solutions",
      titleAr: "عزل الأقبية والأساسات العميقة",
      categoryEn: "Substructure Tanking",
      categoryAr: "عزل منشآت تحت الأرض",
      href: "/solutions",
      icon: Building2,
    },
    {
      titleEn: "Joint Sealing Solutions",
      titleAr: "حلول فواصل التمدد والإنشاء",
      categoryEn: "Elastomeric Waterstops",
      categoryAr: "فواصل التمدد الإنشائية",
      href: "/solutions",
      icon: Layers,
    },
  ],
  projects: [
    {
      titleEn: "Commercial Towers & High-Rise",
      titleAr: "أبراج تجارية وأبراج شاهقة",
      categoryEn: "Dubai & Abu Dhabi High-Rise",
      categoryAr: "أبراج دبي وأبوظبي",
      href: "/project",
      icon: Building2,
    },
    {
      titleEn: "Luxury Residential Villas & Communities",
      titleAr: "فلل سكنية فاخرة ومجمعات سكنية",
      categoryEn: "Residential Developments",
      categoryAr: "مشاريع سكنية راقية",
      href: "/project",
      icon: Building2,
    },
    {
      titleEn: "Industrial Warehouses & Logistics Hubs",
      titleAr: "مستودعات صناعية ومراكز لوجستية",
      categoryEn: "Logistics Parks",
      categoryAr: "مناطق لوجستية ومستودعات",
      href: "/project",
      icon: Package,
    },
    {
      titleEn: "Infrastructure & Public Utilities",
      titleAr: "مشاريع البنية التحتية والمرافق العامة",
      categoryEn: "Municipal Works",
      categoryAr: "مشاريع حكومية ومرافق",
      href: "/project",
      icon: HardHat,
    },
  ],
  industries: [
    {
      titleEn: "Commercial Buildings & Corporate Towers",
      titleAr: "المباني التجارية والمكاتب الإدارية",
      categoryEn: "Corporate Offices",
      categoryAr: "مكاتب ومراكز تجارية",
      href: "/industries",
      icon: Building2,
    },
    {
      titleEn: "Residential Communities & Private Villas",
      titleAr: "المجتمعات السكنية والفلل الخاصة",
      categoryEn: "Residential Developments",
      categoryAr: "مجتمعات سكنية",
      href: "/industries",
      icon: Building2,
    },
    {
      titleEn: "Industrial Plants & Manufacturing Hubs",
      titleAr: "المنشآت الصناعية ومصانع الإنتاج",
      categoryEn: "Industrial Facilities",
      categoryAr: "منشآت صناعية",
      href: "/industries",
      icon: HardHat,
    },
    {
      titleEn: "Hospitality, Resorts & Healthcare",
      titleAr: "قطاع الضيافة والمنتجعات والمستشفيات",
      categoryEn: "Hotels & Hospitals",
      categoryAr: "فنادق ومنتجعات ومشافي",
      href: "/industries",
      icon: ShieldCheck,
    },
  ],
  resources: [
    {
      titleEn: "Technical Specifications & Method Statements",
      titleAr: "المواصفات الفنية وطرق التنفيذ المعتمدة",
      categoryEn: "Engineering TDS & Method Statements",
      categoryAr: "ملفات فنية ومواصفات",
      href: "/resources",
      icon: FileText,
    },
    {
      titleEn: "Official Approvals & Certifications",
      titleAr: "الشهادات والاعتمادات الرسمية (دبي وأبوظبي)",
      categoryEn: "Dubai Municipality & Civil Defense",
      categoryAr: "اعتمادات بلدية دبي والدفاع المدني",
      href: "/certifications",
      icon: ShieldCheck,
    },
    {
      titleEn: "10-25 Year Warranty Guidelines",
      titleAr: "إرشادات الضمان ودليل الصيانة الوقائية",
      categoryEn: "Certified Guarantee Protocols",
      categoryAr: "ضمانات معتمدة طويلة الأمد",
      href: "/resources",
      icon: ShieldCheck,
    },
    {
      titleEn: "Frequently Asked Questions (FAQs)",
      titleAr: "الأسئلة الشائعة حول العزل والمقاولات",
      categoryEn: "Technical Q&A",
      categoryAr: "إجابات هندسية واستفسارات",
      href: "/faqs",
      icon: HelpCircle,
    },
  ],
};

const AI_PRESET_QUESTIONS = [
  {
    en: "Which waterproofing system is best for flat exposed roofs in UAE?",
    ar: "ما هو أفضل نظام عزل مائي للأسطح الخرسانية المكشوفة في الإمارات؟",
    ansEn: "For exposed concrete flat roofs in the UAE climate, our Combo Roofing System or Polyurea/GRP Fiberglass is recommended. The Combo System provides seamless PU foam thermal insulation plus elastomeric waterproofing with a 10 to 25-year warranty, fully approved by Dubai Municipality and Civil Defense.",
    ansAr: "للأسطح الخرسانية المسطحة والمكشوفة في مناخ الإمارات، يُنصح بنظام الكومبو المتكامل أو عزل البولي يوريا والألياف الزجاجية GRP. يجمع نظام الكومبو بين العزل الحراري بالفوم والعزل المائي غير القابل للكسر مع ضمان يمتد من 10 إلى 25 سنة واعتماد بلدية دبي والدفاع المدني.",
  },
  {
    en: "What epoxy floor coating is recommended for heavy forklift traffic?",
    ar: "ما هو طلاء الأرضيات الإيبوكسي المناسب للمستودعات ذات حركة الرافعات الثقيلة؟",
    ansEn: "We apply heavy-duty solvent-free high-build epoxy or self-levelling epoxy resin (2mm to 4mm) with silica aggregate broadcast. It offers exceptional compressive strength, high abrasion resistance, and seamless chemical resistance suited for active UAE logistics warehouses.",
    ansAr: "نطبق أنظمة الإيبوكسي عالي الكثافة خالي المذيبات أو الإيبوكسي ذاتي التسوية بسماكات 2 إلى 4 ملم مع بث رمل السيليكا المقاوم للاحتكاك، مما يمنح مقاومة عالية لحركة الرافعات الشوكية والمواد الكيميائية في المستودعات.",
  },
  {
    en: "How do you repair active water leaks in basement retaining walls?",
    ar: "كيف يتم معالجة تسربات المياه النشطة في الجدران الاستنادية للأقبية؟",
    ansEn: "We utilize high-pressure polyurethane (PU) resin injection. When injected into cracks and honeycombs, the resin reacts with leaking water to expand into a dense, hydrophobic closed-cell foam that permanently stops active water ingress in minutes without structural demolition.",
    ansAr: "نستخدم تقنية حقن راتنجات البولي يوريثان المضغوطة هيدروليكياً. يتفاعل الراتنج فوراً مع المياه المتسربة ليتمدد إلى رغوة كثيفة مانعة للماء توقف التسرب النشط في دقائق دون الحاجة لأي تكسير إنشائي.",
  },
  {
    en: "How can I get an approved method statement and official quotation?",
    ar: "كيف يمكنني الحصول على طريقة تنفيذ معتمدة وعرض سعر رسمي لمشروعي؟",
    ansEn: "You can request a free technical site visit and detailed commercial proposal by clicking 'Get a Quote' or contacting our engineering team directly via WhatsApp (+971 50 123 4567). We provide complete submittals, TDS, and municipality-compliant approvals within 24 hours.",
    ansAr: "يمكنك طلب معاينة فنية مجانية للموقع وعرض سعر رسمي مفصل بالنقر على زر 'طلب عرض سعر' أو التواصل مباشرة مع فريقنا الهندسي عبر واتساب. نوفر المواصفات الفنية المعتمدة واعتمادات الدوائر المختصة خلال 24 ساعة.",
  },
];

export default function ExpandableSearchBar({
  onSearch,
  placeholder,
  className = "",
  iconColor = "text-white",
  hoverIconColor = "group-hover:text-[var(--primary)]",
  dashedButton = false,
}: ExpandableSearchBarProps) {
  const router = useRouter();
  const { isArabic } = useLanguage();
  const isAr = isArabic;

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterCategory>("all");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Ask AI Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsExpanded((prev) => {
          if (!prev) {
            setTimeout(() => inputRef.current?.focus(), 150);
            return true;
          }
          return false;
        });
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setActiveTab("all");
  };

  const handleClearQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery("");
    inputRef.current?.focus();
  };

  // Filter search results dynamically
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const scored: { item: SearchResultItem; score: number }[] = [];

    SITE_SEARCH_INDEX.forEach((item) => {
      const name = item.name.toLowerCase();
      const nameAr = item.nameAr ? item.nameAr.toLowerCase() : "";
      const desc = item.desc ? item.desc.toLowerCase() : "";
      const descAr = item.descAr ? item.descAr.toLowerCase() : "";
      const cat = item.category.toLowerCase();
      const kwMatch = item.keywords.some((k) => k.toLowerCase().includes(query));

      let score = 0;
      if (name === query || nameAr === query) {
        score += 150;
      } else if (name.startsWith(query) || nameAr.startsWith(query)) {
        score += 90;
      } else if (name.includes(query) || nameAr.includes(query)) {
        score += 60;
      } else if (kwMatch) {
        score += 35;
      } else if (desc.includes(query) || descAr.includes(query)) {
        score += 20;
      } else if (cat.includes(query)) {
        score += 15;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    const allMatched = scored.map((s) => s.item);

    // Apply active category filter
    const filtered = allMatched.filter((it) => {
      if (activeTab === "all") return true;
      if (activeTab === "services") return it.category === "Service";
      if (activeTab === "solutions") return it.category === "Solution";
      if (activeTab === "projects") return it.category === "Project";
      if (activeTab === "industries") {
        return it.category === "Industry" || it.href.includes("/industries");
      }
      if (activeTab === "resources") {
        return (
          it.category === "Resource" ||
          it.href.includes("/resources") ||
          it.href.includes("/certifications") ||
          it.href.includes("/faqs")
        );
      }
      return true;
    });

    return filtered.slice(0, 8);
  }, [searchQuery, activeTab]);

  const handleSelectResult = (item: SearchResultItem) => {
    if (onSearch) {
      onSearch(item.name, item.href);
    }
    router.push(item.href);
    handleCollapse();
  };

  const handleExecuteSearch = (q: string) => {
    const query = q.trim();
    if (!query) return;

    if (filteredResults.length > 0) {
      handleSelectResult(filteredResults[0]);
      return;
    }

    const lower = query.toLowerCase();
    let target = `/products?search=${encodeURIComponent(query)}`;
    if (lower.includes("subcontract") || lower.includes("مقاولة")) target = "/subcontract";
    else if (lower.includes("career") || lower.includes("job") || lower.includes("وظائف")) target = "/career";
    else if (lower.includes("service") || lower.includes("خدمة")) target = "/services";
    else if (lower.includes("quote") || lower.includes("price") || lower.includes("تسعير")) target = "/get-a-quote";
    else if (lower.includes("project") || lower.includes("مشروع")) target = "/project";
    else if (lower.includes("solution") || lower.includes("حلول")) target = "/solutions";
    else if (lower.includes("industry") || lower.includes("قطاع")) target = "/industries";

    if (onSearch) {
      onSearch(query, target);
    }
    router.push(target);
    handleCollapse();
  };

  const handleVoiceSearch = () => {
    if (!speechSupported || typeof window === "undefined") return;

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition: SpeechRecognitionInstance = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = isAr ? "ar-AE" : "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } catch {
      setIsListening(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-[#00c2b2]/20 text-[#008f83] font-bold rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleAskAiSubmit = (q: string) => {
    const questionText = q.trim();
    if (!questionText) return;

    // Match against preset questions or generate smart answer
    const lower = questionText.toLowerCase();
    const matched = AI_PRESET_QUESTIONS.find(
      (item) =>
        lower.includes("roof") ||
        lower.includes("combo") ||
        lower.includes("سطح") ||
        lower.includes("كومبو")
        ? item.en.includes("roof")
        : lower.includes("epoxy") ||
          lower.includes("floor") ||
          lower.includes("إيبوكسي") ||
          lower.includes("أرضيات")
        ? item.en.includes("epoxy")
        : lower.includes("leak") ||
          lower.includes("injection") ||
          lower.includes("تسرب") ||
          lower.includes("حقن")
        ? item.en.includes("leak")
        : false
    );

    if (matched) {
      setAiResponse(isAr ? matched.ansAr : matched.ansEn);
    } else {
      setAiResponse(
        isAr
          ? `بناءً على متطلبات "${questionText}" في بيئة البناء بدولة الإمارات، توصي تاج الرحمة بإجراء فحص هندسي للموقع لاختيار النظام الأمثل المطابق لمعايير بلدية دبي والدفاع المدني مع ضمان شامل من 10 إلى 25 سنة.`
          : `For "${questionText}" under UAE climate standards, Taj Al Rahmah recommends a specialized technical specification compliant with Dubai Municipality & Civil Defense standards, backed by a 10 to 25-year warranty.`
      );
    }
  };

  const defaultPlaceholder = isAr ? "ابحث عن الخدمات والحلول..." : "Search services, solutions...";
  const mostUsedItems = MOST_USED_BY_TAB[activeTab] || MOST_USED_BY_TAB.all;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="flex items-center">
        {/* Closed Search Trigger Button */}
        {!isExpanded && (
          dashedButton ? (
            <button
              type="button"
              onClick={handleExpand}
              className="relative p-0.5 rounded-full border border-dashed border-white/60 hover:border-white transition-all cursor-pointer hover:scale-105"
              aria-label="Open search bar"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] flex items-center justify-center text-white transition-colors shadow-sm">
                <Search className="h-4 w-4 stroke-[2.5]" />
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExpand}
              className={`${iconColor} ${hoverIconColor} p-2 transition-all cursor-pointer hover:bg-white/10 rounded-full`}
              aria-label="Open search bar"
            >
              <Search className="h-6 w-6 stroke-2" />
            </button>
          )
        )}

        {/* Expanded Search Bar Container */}
        {isExpanded && (
          <>
            {/* Placeholder in normal flow so the flex header never changes width or shifts */}
            <div className="hidden lg:block w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 opacity-0 pointer-events-none" />

            <div className="lg:absolute lg:right-0 lg:rtl:right-auto lg:rtl:left-0 lg:top-1/2 lg:-translate-y-1/2 flex items-center z-40 animate-in fade-in zoom-in-95 duration-200 w-full lg:w-auto">
              {/* Back / Close button `<` beside search icon (Task-9 user marked: "beside search icon keep like this if user click on it then close search bar") */}
              <button
                type="button"
                onClick={handleCollapse}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#011c20]/90 hover:bg-[#009e90] text-white flex items-center justify-center transition-all cursor-pointer mr-2 rtl:mr-0 rtl:ml-2 flex-shrink-0 shadow-lg border border-white/20 hover:scale-105 active:scale-95"
                title={isAr ? "إغلاق البحث" : "Close search"}
                aria-label="Close search"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5] rtl:rotate-180" />
              </button>

              {/* Search Input Pill */}
              <div
                className="flex items-center bg-white flex-1 lg:flex-initial lg:w-72 xl:w-80 2xl:w-96 px-3.5 py-1.5 rounded-full border-2 border-[#00b3a4] shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Icon */}
                <button
                  type="button"
                  onClick={() => handleExecuteSearch(searchQuery)}
                  className="p-1 text-[#00b3a4] hover:text-[#008f83] transition-colors cursor-pointer flex-shrink-0"
                  title={isAr ? "بحث" : "Search"}
                >
                  <Search className="h-4 w-4 stroke-[2.5]" />
                </button>

                {/* Text Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleExecuteSearch(searchQuery);
                    } else if (e.key === "Escape") {
                      handleCollapse();
                    }
                  }}
                  placeholder={placeholder || defaultPlaceholder}
                  className="flex-1 outline-none text-gray-800 bg-transparent text-xs sm:text-sm px-2 placeholder-gray-400 font-sans min-w-0"
                />

                {/* Voice Search (if supported and query empty) */}
                {speechSupported && !searchQuery && (
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                    title={isListening ? "Listening..." : "Voice search"}
                  >
                    {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  </button>
                )}

                {/* Keyboard Shortcut Badge (Ctrl K) when empty */}
                {!searchQuery && (
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 flex-shrink-0 ml-1">
                    <span>Ctrl</span>
                    <span>K</span>
                  </span>
                )}

                {/* Clear Text X button (Task-9 user marked: "if user click on x icon then clear text but not close search bar") */}
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearQuery}
                    className="p-1 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0 cursor-pointer ml-1 rtl:ml-0 rtl:mr-1 rounded-full hover:bg-gray-100"
                    title={isAr ? "مسح النص" : "Clear text"}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ─── SEARCH DROPDOWN (OPENS IMMEDIATELY ON CLICK) ───────────── */}
      {isExpanded && (
        <div
          className="absolute top-full mt-2.5 right-0 rtl:right-auto rtl:left-0 w-[330px] sm:w-[440px] md:w-[500px] lg:w-[540px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden z-50 text-left rtl:text-right animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Filter By Tabs Row (No counts, exactly as requested) ── */}
          <div className="px-3.5 pt-3 pb-2.5 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {FILTER_TABS.map((tab) => {
                const isSelected = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-[#009e90] text-white shadow-xs"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80"
                    }`}
                  >
                    {isAr ? tab.labelAr : tab.labelEn}
                  </button>
                );
              })}
            </div>

            <span className="hidden md:inline-block text-[10px] text-gray-400 font-medium flex-shrink-0">
              {isAr ? "اضغط Enter" : "Press Enter"}
            </span>
          </div>

          {/* ── Main Content Area ── */}
          {searchQuery.trim() === "" ? (
            /* ── Default / "Most used" list view (Screenshot 1) ── */
            <div className="p-3">
              <p className="px-2 py-1 text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isAr ? "الأكثر استخداماً" : "Most used"}
              </p>
              <div className="mt-1 space-y-0.5 max-h-[340px] overflow-y-auto">
                {mostUsedItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        router.push(item.href);
                        handleCollapse();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-teal-50/60 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 group-hover:bg-[#009e90]/15 group-hover:text-[#009e90] flex items-center justify-center flex-shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-[13px] font-bold text-gray-900 group-hover:text-[#009e90] transition-colors truncate">
                            {isAr ? item.titleAr : item.titleEn}
                          </h5>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">
                            {isAr ? item.categoryAr : item.categoryEn}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#009e90] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-all flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ── Filtered Search Results (Screenshot 2 & 3) ── */
            <div className="max-h-[350px] overflow-y-auto divide-y divide-gray-100">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  const badge = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Page;
                  const displayName = isAr && item.nameAr ? item.nameAr : item.name;
                  const displayDesc = isAr && item.descAr ? item.descAr : item.desc;
                  const displayCategory = isAr && item.categoryAr ? item.categoryAr : item.category;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectResult(item)}
                      className="p-3 hover:bg-[#f2faf9] cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {item.category === "Product" && <Package className="w-2.5 h-2.5" />}
                            {item.category === "Service" && <Wrench className="w-2.5 h-2.5" />}
                            {item.category === "Solution" && <ShieldCheck className="w-2.5 h-2.5" />}
                            {item.category === "Project" && <Building2 className="w-2.5 h-2.5" />}
                            {item.category === "Industry" && <HardHat className="w-2.5 h-2.5" />}
                            {item.category === "Resource" && <FileText className="w-2.5 h-2.5" />}
                            {displayCategory}
                          </span>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#009e90] transition-colors truncate">
                            {highlightMatch(displayName, searchQuery)}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                          {displayDesc}
                        </p>
                      </div>

                      <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-[#009e90] group-hover:text-white text-gray-400 flex items-center justify-center flex-shrink-0 transition-colors mt-1">
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 px-4 text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    {isAr ? "لم نجد نتائج لـ" : "No results for"} "{searchQuery}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {isAr
                      ? "جرّب البحث باسم خدمة (عزل، إيبوكسي، كومبو) أو حل أو مشروع"
                      : "Try searching for service names (epoxy, combo, waterproofing) or solutions"}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
                        handleCollapse();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#009e90] text-xs font-bold rounded-full transition-colors border border-teal-200 cursor-pointer"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>{isAr ? "تصفح الخدمات" : "Browse Services"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/solutions`);
                        handleCollapse();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full transition-colors border border-cyan-200 cursor-pointer"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isAr ? "تصفح الحلول" : "Browse Solutions"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom Bar with ASK AI (Screenshot 1) ── */}
          <div className="px-4 py-3 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">
              {isAr ? "هل تحتاج مساعدة في البحث عن شيء؟" : "Need help finding something?"}
            </span>

            {/* ASK AI Button */}
            <button
              type="button"
              onClick={() => {
                if (searchQuery.trim()) {
                  setAiQuestion(searchQuery.trim());
                  handleAskAiSubmit(searchQuery.trim());
                }
                setShowAiModal(true);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#009e90] hover:bg-[#008277] text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAr ? "اسأل الذكاء الاصطناعي" : "ASK AI"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── INTERACTIVE "ASK AI" ASSISTANT MODAL ────────────────────── */}
      {showAiModal && (
        <div
          className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowAiModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full p-5 text-left rtl:text-right overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#009e90] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {isAr ? "المساعد الهندسي الذكي لتاج الرحمة" : "Taj Al Rahmah AI Engineering Assistant"}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {isAr ? "إجابات هندسية فورية ومطابقة لمواصفات الإمارات" : "Instant engineering answers & UAE specifications"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Questions Pills */}
            <div className="my-3.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                {isAr ? "أسئلة مقترحة:" : "Suggested Questions:"}
              </p>
              <div className="flex flex-col gap-1.5">
                {AI_PRESET_QUESTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAiQuestion(isAr ? preset.ar : preset.en);
                      setAiResponse(isAr ? preset.ansAr : preset.ansEn);
                    }}
                    className="text-left rtl:text-right text-xs text-gray-700 bg-gray-50 hover:bg-teal-50/80 hover:text-[#009e90] p-2 rounded-lg border border-gray-200/60 transition-colors cursor-pointer"
                  >
                    💬 {isAr ? preset.ar : preset.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Display */}
            {aiResponse && (
              <div className="p-3 bg-teal-50/60 border border-teal-100 rounded-xl mb-3.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#009e90] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? "التوصية الفنية المعتمدة:" : "Recommended Engineering Solution:"}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {aiResponse}
                </p>
              </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAskAiSubmit(aiQuestion);
                  }
                }}
                placeholder={isAr ? "اكتب سؤالك الهندسي هنا..." : "Ask your engineering question..."}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#009e90] transition-colors"
              />
              <button
                type="button"
                onClick={() => handleAskAiSubmit(aiQuestion)}
                className="px-3 py-2 rounded-xl bg-[#009e90] hover:bg-[#008277] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? "إرسال" : "Ask"}</span>
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setShowAiModal(false);
                  handleCollapse();
                  router.push("/get-a-quote");
                }}
                className="text-[#009e90] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{isAr ? "طلب عرض سعر رسمي" : "Request Official Quote"}</span>
                <ArrowRight className="w-3 h-3 rtl:rotate-180" />
              </button>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isAr ? "محادثة مهندس عبر واتساب" : "WhatsApp Engineer"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
