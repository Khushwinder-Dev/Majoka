"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Headphones,
  Star,
  Share2,
  X,
  SlidersHorizontal,
  Link2,
  Send,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  price: string;
}

const allProductsData: ProductItem[] = [
  {
    id: 1,
    name: "Nomad MagSafe Charger",
    category: "Technology",
    image: "/products/nomad-magsafe-charger.jpg",
    description:
      "The Nomad MagSafe Charger pairs a machined aluminum base with a soft-touch leather pad, so it sits flush and stays put.",
    rating: 4.9,
    reviewsCount: 214,
    price: "$149.00",
  },
  {
    id: 2,
    name: "Sigma Quattro Camera best",
    category: "Gear",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 94,
    price: "$219.00",
  },
  {
    id: 3,
    name: "Sigma Quattro Camera best",
    category: "Accessory",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 65,
    price: "$189.00",
  },
  {
    id: 4,
    name: "Sigma Quattro Camera best",
    category: "Laptop",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 142,
    price: "$249.00",
  },
  {
    id: 5,
    name: "Sigma Quattro Camera best",
    category: "Mobile",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 180,
    price: "$229.00",
  },
  {
    id: 6,
    name: "Sigma Quattro Camera best",
    category: "Airpod",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 77,
    price: "$209.00",
  },
  {
    id: 7,
    name: "Sigma Quattro Camera best",
    category: "Earphone",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 89,
    price: "$199.00",
  },
  {
    id: 8,
    name: "Sigma Quattro Camera best",
    category: "Phone",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 53,
    price: "$179.00",
  },
  {
    id: 9,
    name: "Sigma Quattro Camera best",
    category: "Technology",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 210,
    price: "$259.00",
  },
  {
    id: 10,
    name: "Sigma Quattro Camera best",
    category: "Gear",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 68,
    price: "$239.00",
  },
  {
    id: 11,
    name: "Sigma Quattro Camera best",
    category: "Accessory",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 42,
    price: "$189.00",
  },
  {
    id: 12,
    name: "Sigma Quattro Camera best",
    category: "Mobile",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging tec...",
    rating: 4.5,
    reviewsCount: 115,
    price: "$229.00",
  },
];

const categoryList = [
  { name: "Technology", count: 5 },
  { name: "Gear", count: 4 },
  { name: "Accessory", count: 3 },
  { name: "Laptop", count: 2 },
  { name: "Mobile", count: 4 },
  { name: "Airpod", count: 4 },
  { name: "Earphone", count: 4 },
  { name: "Phone", count: 4 },
];

export default function ProductsPage() {
  const router = useRouter();
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | "any">("any");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // View & Pagination States
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [selectedCardId, setSelectedCardId] = useState<number>(2); // Default selected card matching screenshot

  // Share Modal State
  const [shareModalProduct, setShareModalProduct] = useState<ProductItem | null>(null);

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Expert Modal State
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [expertForm, setExpertForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle Category Filter
  const toggleCategory = (catName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName]
    );
  };

  // Reset All Filters
  const handleResetAll = () => {
    setSelectedCategories([]);
    setSelectedRating("any");
    toast.success("Filters reset to default");
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProductsData.filter((product) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchRating =
        selectedRating === "any" || product.rating >= selectedRating;

      return matchCategory && matchRating;
    });
  }, [selectedCategories, selectedRating]);

  // Open Share Modal
  const handleOpenShare = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setShareModalProduct(product);
  };

  // Share via social
  const handleSocialShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "https://example.com/share-link";
    const text = shareModalProduct?.name || "Check out this product";

    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === "instagram") {
      shareUrl = "https://instagram.com";
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
    } else if (platform === "telegram") {
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=500");
    }
  };

  // Copy share link
  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://example.com/share-link";
    navigator.clipboard?.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  // Handle Expert Inquiry Submit
  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertForm.name || !expertForm.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsExpertModalOpen(false);
      toast.success(
        `Thank you ${expertForm.name}! Our specialist will reach out to you within 24 hours.`
      );
      setExpertForm({ name: "", email: "", phone: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All products</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredProducts.length} products found
            </p>
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#01a9a0]" />
            Filters
          </button>
        </div>

        {/* Main 2-Column: Left Filters + Right Products Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-7">
          {/* ===================== LEFT SIDEBAR ===================== */}
          <aside
            className={`w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-5 ${
              isMobileFilterOpen
                ? "fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto flex items-center justify-center lg:static lg:bg-transparent lg:p-0"
                : "hidden lg:block"
            }`}
          >
            <div
              className={`w-full max-w-md lg:max-w-none space-y-5 ${
                isMobileFilterOpen
                  ? "bg-white p-6 rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  : ""
              }`}
            >
              {/* Mobile Close */}
              {isMobileFilterOpen && (
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 lg:hidden">
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* FILTERS CARD */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={handleResetAll}
                    className="text-xs font-semibold text-[#01a9a0] hover:underline cursor-pointer transition-colors"
                  >
                    Reset all
                  </button>
                </div>

                {/* Section 1: CATEGORY */}
                <div className="py-4 border-b border-gray-100">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[11px] font-bold text-gray-600 tracking-wider uppercase">
                      CATEGORY
                    </span>
                    {isCategoryOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </button>

                  {isCategoryOpen && (
                    <div className="mt-3.5 space-y-2.5">
                      {categoryList.map((cat) => {
                        const isChecked = selectedCategories.includes(cat.name);
                        return (
                          <label
                            key={cat.name}
                            className="flex items-center justify-between text-xs text-gray-700 cursor-pointer group py-0.5"
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Rounded Square Checkbox */}
                              <div
                                onClick={() => toggleCategory(cat.name)}
                                className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${
                                  isChecked
                                    ? "bg-[#01a9a0] border border-[#01a9a0] text-white"
                                    : "border border-gray-300 group-hover:border-[#01a9a0] bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span
                                className={`transition-colors select-none ${
                                  isChecked
                                    ? "font-semibold text-gray-900"
                                    : "text-gray-600 group-hover:text-gray-900"
                                }`}
                              >
                                {cat.name}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-400 font-medium">
                              {cat.count}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Section 2: RATING */}
                <div className="pt-4">
                  <button
                    onClick={() => setIsRatingOpen(!isRatingOpen)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[11px] font-bold text-gray-600 tracking-wider uppercase">
                      RATING
                    </span>
                    {isRatingOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </button>

                  {isRatingOpen && (
                    <div className="mt-3 space-y-2.5">
                      {/* Any Rating */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === "any"}
                          onChange={() => setSelectedRating("any")}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <span className="text-gray-700">Any rating</span>
                      </label>

                      {/* 5 Stars */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === 5}
                          onChange={() => setSelectedRating(5)}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                        </div>
                      </label>

                      {/* 4 Stars */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === 4}
                          onChange={() => setSelectedRating(4)}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                          <Star className="w-3.5 h-3.5 fill-gray-200 text-gray-200" />
                        </div>
                      </label>

                      {/* 3 Stars */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === 3}
                          onChange={() => setSelectedRating(3)}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </label>

                      {/* 2 Stars */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === 2}
                          onChange={() => setSelectedRating(2)}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(2)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </label>

                      {/* 1 Star */}
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer py-0.5">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === 1}
                          onChange={() => setSelectedRating(1)}
                          className="accent-[#01a9a0] w-3.5 h-3.5 cursor-pointer"
                        />
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* EXPERT CALLOUT BOX (TEAL) */}
              <div className="bg-[#01a9a0] rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Headphones className="w-4 h-4 text-white" />
                </div>

                <h3 className="text-base font-bold font-anek leading-tight mb-2">
                  Not sure where to start?
                </h3>

                <p className="text-xs text-white/90 leading-relaxed mb-4">
                  Our team hand-picks gear for every setup. Get a personal
                  recommendation in minutes.
                </p>

                <button
                  onClick={() => setIsExpertModalOpen(true)}
                  className="text-xs font-semibold text-white underline underline-offset-4 hover:text-white/80 cursor-pointer transition-colors"
                >
                  Talk to an expert
                </button>
              </div>

              {isMobileFilterOpen && (
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#01a9a0] text-white font-bold rounded-xl text-sm lg:hidden shadow"
                >
                  View {filteredProducts.length} Results
                </button>
              )}
            </div>
          </aside>

          {/* ===================== RIGHT CONTENT ===================== */}
          <main className="flex-1 w-full min-w-0">
            {/* Top Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6 pb-1">
              <div>
                <h1 className="text-2xl font-bold font-anek text-gray-900 tracking-tight">
                  All products
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Switcher */}
                <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-[#01a9a0] text-white shadow-xs"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      viewMode === "list"
                        ? "bg-[#01a9a0] text-white shadow-xs"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="List View"
                  >
                    <ListIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Show Page Dropdown */}
                <div className="relative flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span>Show Page</span>
                  <div className="relative">
                    <button
                      onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 flex items-center gap-1 shadow-xs hover:border-[#01a9a0] cursor-pointer transition-colors"
                    >
                      <span>{itemsPerPage}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                    </button>

                    {/* Open Dropdown Menu (showing 20, 40, 60, 80 as in design) */}
                    {isPageDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                        {[20, 40, 60, 80].map((num) => (
                          <button
                            key={num}
                            onClick={() => {
                              setItemsPerPage(num);
                              setIsPageDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${
                              itemsPerPage === num
                                ? "bg-[#01a9a0]/10 text-[#01a9a0] font-bold"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid (4 columns as shown in design mockup) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  No products match your filters
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try clearing some categories or selecting &quot;Any rating&quot;.
                </p>
                <button
                  onClick={handleResetAll}
                  className="px-4 py-2 bg-[#01a9a0] text-white font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-5 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => {
                  const isSelected = selectedCardId === product.id;
                  const isShareOpen = shareModalProduct?.id === product.id;

                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedCardId(product.id);
                        router.push(`/products/${product.id}`);
                      }}
                      className={`relative rounded-2xl transition-all duration-200 cursor-pointer p-3 sm:p-3.5 flex flex-col group ${
                        isShareOpen ? "z-30" : isSelected ? "z-20" : "z-10 hover:z-20"
                      } ${
                        isSelected
                          ? "bg-[#f0fdfa]/50 border-2 border-[#01a9a0] shadow-[0_4px_16px_rgba(1,169,160,0.12)]"
                          : "bg-white border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md"
                      }`}
                    >
                      {/* Top Product Image Container */}
                      <div className="relative w-full aspect-square bg-[#f6f7f9] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Top-Right Controls: Rating Pill & Share Button (Visible on Hover or when Selected) */}
                        <div
                          className={`absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 transition-opacity duration-200 ${
                            isSelected || isShareOpen
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {/* Rating Pill */}
                          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-gray-100 shadow-xs text-[10px] font-bold text-gray-700">
                            <Star className="w-2.5 h-2.5 fill-[#01a9a0] text-[#01a9a0]" />
                            <span>{product.rating}</span>
                          </div>

                          {/* Share Button (Toggles Share Tooltip Popover) */}
                          <button
                            onClick={(e) => handleOpenShare(e, product)}
                            className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-xs border border-gray-100 hover:border-[#01a9a0] flex items-center justify-center text-gray-500 hover:text-[#01a9a0] transition-transform hover:scale-110 shadow-xs cursor-pointer"
                            title="Share product"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col flex-1">
                        <h3 className="text-sm font-bold font-anek text-gray-900 tracking-tight leading-snug group-hover:text-[#01a9a0] transition-colors truncate">
                          {product.name}
                        </h3>

                        <p className="text-[11px] text-gray-500 leading-relaxed mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* ===================== TOOLTIP SHARE POPOVER (Relative to this product card) ===================== */}
                      {isShareOpen && (
                        <>
                          {/* Click outside backdrop to close */}
                          <div
                            className="fixed inset-0 z-40 cursor-default"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShareModalProduct(null);
                            }}
                          />

                          {/* Tooltip Card anchored relative to this product */}
                          <div
                            className="absolute top-2 right-2 z-50 w-72 sm:w-80 bg-white rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-gray-100 animate-in fade-in zoom-in-95 duration-150 text-left cursor-default"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                                Share Now
                              </h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShareModalProduct(null);
                                }}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Subtitle */}
                            <p className="text-[11px] text-gray-500 font-medium mb-2.5">
                              Share this link via
                            </p>

                            {/* Social Icons Row (5 colored circles matching screenshot) */}
                            <div className="flex items-center justify-between gap-1.5 mb-4">
                              {/* Facebook */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialShare("facebook");
                                }}
                                className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-[#1877F2] transition-transform hover:scale-110 cursor-pointer"
                                title="Facebook"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </button>

                              {/* Twitter / X */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialShare("twitter");
                                }}
                                className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center text-[#1DA1F2] transition-transform hover:scale-110 cursor-pointer"
                                title="Twitter"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                                </svg>
                              </button>

                              {/* Instagram */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialShare("instagram");
                                }}
                                className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-[#E4405F] transition-transform hover:scale-110 cursor-pointer"
                                title="Instagram"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </button>

                              {/* WhatsApp */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialShare("whatsapp");
                                }}
                                className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-[#25D366] transition-transform hover:scale-110 cursor-pointer"
                                title="WhatsApp"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347m-5.421 7.403" />
                                </svg>
                              </button>

                              {/* Telegram */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialShare("telegram");
                                }}
                                className="w-9 h-9 rounded-full bg-cyan-50 hover:bg-cyan-100 flex items-center justify-center text-[#0088cc] transition-transform hover:scale-110 cursor-pointer"
                                title="Telegram"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                                </svg>
                              </button>
                            </div>

                            {/* Copy Link Section */}
                            <p className="text-[11px] text-gray-500 font-medium mb-1.5">
                              Or copy link
                            </p>
                            <div className="flex items-center gap-2 p-1 pl-2.5 border border-gray-200 rounded-full bg-white focus-within:border-[#01a9a0]">
                              <Link2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <input
                                type="text"
                                readOnly
                                value="example.com/share-link"
                                className="w-full text-[11px] text-gray-600 bg-transparent outline-none truncate"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyLink();
                                }}
                                className="px-3.5 py-1 bg-[#01a9a0] hover:bg-[#00968e] text-white text-[11px] font-semibold rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                              >
                                Copy
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ===================== PAGINATION BAR ===================== */}
            <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs sm:text-sm text-gray-500 font-medium">
                Showing 1 to 5 of 120
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Previous (<<) */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-8 h-8 rounded-lg bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef] flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Page 1 */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-8 h-8 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 1
                      ? "bg-[#01a9a0] text-white font-bold shadow-xs"
                      : "bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef]"
                  }`}
                >
                  1
                </button>

                {/* Page 2 (Active in mockup) */}
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`w-8 h-8 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 2
                      ? "bg-[#01a9a0] text-white font-bold shadow-xs"
                      : "bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef]"
                  }`}
                >
                  2
                </button>

                {/* Page 3 */}
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`w-8 h-8 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 3
                      ? "bg-[#01a9a0] text-white font-bold shadow-xs"
                      : "bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef]"
                  }`}
                >
                  3
                </button>

                {/* Ellipsis (...) */}
                <span className="w-8 h-8 rounded-lg bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] font-medium text-xs flex items-center justify-center select-none">
                  ...
                </span>

                {/* Page 24 */}
                <button
                  onClick={() => setCurrentPage(24)}
                  className={`w-8 h-8 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 24
                      ? "bg-[#01a9a0] text-white font-bold shadow-xs"
                      : "bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef]"
                  }`}
                >
                  24
                </button>

                {/* Next (>>) */}
                <button
                  onClick={() => setCurrentPage(Math.min(24, currentPage + 1))}
                  className="w-8 h-8 rounded-lg bg-[#e6f7f5] text-[#01a9a0] border border-[#b2e5e1] hover:bg-[#d4f2ef] flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ===================== EXPERT MODAL ===================== */}
      {isExpertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200">
            <div className="bg-[#01a9a0] p-6 text-white relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold font-anek">Talk to an Expert</h3>
              <p className="text-xs text-white/90 mt-1">
                Get custom advice and product recommendations tailored to your setup.
              </p>
              <button
                onClick={() => setIsExpertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white absolute top-6 right-6 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExpertSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={expertForm.name}
                  onChange={(e) =>
                    setExpertForm({ ...expertForm, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={expertForm.email}
                  onChange={(e) =>
                    setExpertForm({ ...expertForm, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+966 50 123 4567"
                  value={expertForm.phone}
                  onChange={(e) =>
                    setExpertForm({ ...expertForm, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  What gear are you looking for?
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your requirements or preferences..."
                  value={expertForm.message}
                  onChange={(e) =>
                    setExpertForm({ ...expertForm, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsExpertModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#01a9a0] text-white text-xs sm:text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
