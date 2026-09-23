"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, MicOff, ArrowRight, X, ExternalLink, Wrench, Package, Layers } from "lucide-react";
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
  Page: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
};

type FilterCategory = "all" | "Service" | "Product" | "other";

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

  // Filter & Rank search results dynamically
  const { filteredResults, counts } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return {
        filteredResults: [],
        counts: { all: 0, Service: 0, Product: 0, other: 0 },
      };
    }

    const scored: { item: SearchResultItem; score: number }[] = [];
    let countService = 0;
    let countProduct = 0;
    let countOther = 0;

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
        if (item.category === "Service") countService++;
        else if (item.category === "Product") countProduct++;
        else countOther++;

        scored.push({ item, score });
      }
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    const allMatched = scored.map((s) => s.item);

    const filtered =
      activeTab === "all"
        ? allMatched
        : activeTab === "Service"
        ? allMatched.filter((it) => it.category === "Service")
        : activeTab === "Product"
        ? allMatched.filter((it) => it.category === "Product")
        : allMatched.filter((it) => it.category !== "Service" && it.category !== "Product");

    return {
      filteredResults: filtered.slice(0, 8),
      counts: {
        all: allMatched.length,
        Service: countService,
        Product: countProduct,
        other: countOther,
      },
    };
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

    // Default route to relevant page
    const lower = query.toLowerCase();
    let target = `/products?search=${encodeURIComponent(query)}`;
    if (lower.includes("subcontract") || lower.includes("مقاولة")) target = "/subcontract";
    else if (lower.includes("career") || lower.includes("job") || lower.includes("وظائف")) target = "/career";
    else if (lower.includes("service") || lower.includes("خدمة")) target = "/services";
    else if (lower.includes("quote") || lower.includes("price") || lower.includes("تسعير")) target = "/get-a-quote";
    else if (lower.includes("project") || lower.includes("مشروع")) target = "/project";

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

  const defaultPlaceholder = isAr ? "ابحث بالمنتج أو الخدمة..." : "Search products & services...";

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="flex items-center">
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

        {/* Expanded search input container */}
        <div
          className={`flex items-center bg-white transition-all duration-300 ease-out ${
            isExpanded
              ? "w-72 sm:w-84 md:w-96 px-3.5 py-1.5 rounded-full border-2 border-[#00b3a4] shadow-2xl"
              : "w-0 overflow-hidden p-0 border-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Icon inside input */}
          <button
            type="button"
            onClick={() => handleExecuteSearch(searchQuery)}
            className="p-1 text-[#00b3a4] hover:text-[#008f83] transition-colors cursor-pointer flex-shrink-0"
            title="Search"
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
            className="flex-1 outline-none text-gray-800 bg-transparent text-xs sm:text-sm px-2 placeholder-gray-400 font-sans"
          />

          {/* Voice Search Icon (if supported) */}
          {speechSupported && (
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
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}

          {/* Clear / Close Button */}
          <button
            type="button"
            onClick={handleCollapse}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0 cursor-pointer ml-1"
            title="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ─── LIVE SEARCH DROPDOWN ───────────────────────────────────── */}
      {isExpanded && searchQuery.trim() && (
        <div
          className="absolute top-full mt-2.5 right-0 w-[330px] sm:w-[400px] md:w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Category Filter Tabs */}
          <div className="px-3 pt-3 pb-2 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#009e90] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80"
                }`}
              >
                {isAr ? "الكل" : "All"} ({counts.all})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Service")}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeTab === "Service"
                    ? "bg-[#009e90] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80"
                }`}
              >
                <Wrench className="w-3 h-3" />
                <span>{isAr ? "الخدمات" : "Services"}</span>
                <span className="text-[10px] opacity-80">({counts.Service})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Product")}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeTab === "Product"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80"
                }`}
              >
                <Package className="w-3 h-3" />
                <span>{isAr ? "المنتجات" : "Products"}</span>
                <span className="text-[10px] opacity-80">({counts.Product})</span>
              </button>

              {counts.other > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("other")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    activeTab === "other"
                      ? "bg-slate-700 text-white shadow-xs"
                      : "bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200/80"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{isAr ? "أخرى" : "Other"}</span>
                  <span className="text-[10px] opacity-80">({counts.other})</span>
                </button>
              )}
            </div>

            <span className="hidden sm:inline-block text-[11px] text-gray-400 font-normal flex-shrink-0">
              {isAr ? "اضغط Enter" : "Press Enter"}
            </span>
          </div>

          {/* Results list */}
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
                    className="p-3.5 hover:bg-[#f2faf9] cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {item.category === "Product" && <Package className="w-2.5 h-2.5" />}
                          {item.category === "Service" && <Wrench className="w-2.5 h-2.5" />}
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
                    ? "جرّب البحث باسم منتج (سلم، خزان) أو خدمة (عزل، إيبوكسي، تمديدات)"
                    : "Try searching for product names (ladder, tank) or service names (epoxy, combo, waterproofing)"}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      handleCollapse();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-full transition-colors border border-amber-200 cursor-pointer"
                  >
                    <Package className="w-3 h-3" />
                    <span>Search Products</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
                      handleCollapse();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#009e90] text-xs font-bold rounded-full transition-colors border border-teal-200 cursor-pointer"
                  >
                    <Wrench className="w-3 h-3" />
                    <span>Search Services</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick links footer */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <button
              type="button"
              onClick={() => {
                router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                handleCollapse();
              }}
              className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{isAr ? "عرض كل المنتجات المطابقة" : "Browse all matching products"}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                router.push(`/services`);
                handleCollapse();
              }}
              className="text-[#009e90] hover:text-[#008277] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{isAr ? "تصفح كل الخدمات" : "View all services"}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
