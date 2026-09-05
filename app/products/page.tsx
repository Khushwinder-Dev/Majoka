"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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
  inStock: boolean;
}

const allProductsData: ProductItem[] = [
  {
    id: 1,
    name: "Minimal Watch",
    category: "Technology",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.5,
    reviewsCount: 128,
    price: "$199.00",
    inStock: true,
  },
  {
    id: 2,
    name: "Minimal Watch",
    category: "Gear",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.8,
    reviewsCount: 94,
    price: "$219.00",
    inStock: true,
  },
  {
    id: 3,
    name: "Minimal Watch",
    category: "Accessory",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.2,
    reviewsCount: 65,
    price: "$189.00",
    inStock: true,
  },
  {
    id: 4,
    name: "Minimal Watch",
    category: "Technology",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.6,
    reviewsCount: 142,
    price: "$249.00",
    inStock: true,
  },
  {
    id: 5,
    name: "Minimal Watch",
    category: "Gear",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.7,
    reviewsCount: 180,
    price: "$229.00",
    inStock: true,
  },
  {
    id: 6,
    name: "Minimal Watch",
    category: "Mobile",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.4,
    reviewsCount: 77,
    price: "$209.00",
    inStock: true,
  },
  {
    id: 7,
    name: "Minimal Watch",
    category: "Airpod",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.5,
    reviewsCount: 89,
    price: "$199.00",
    inStock: true,
  },
  {
    id: 8,
    name: "Minimal Watch",
    category: "Earphone",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.3,
    reviewsCount: 53,
    price: "$179.00",
    inStock: true,
  },
  {
    id: 9,
    name: "Minimal Watch",
    category: "Phone",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.9,
    reviewsCount: 210,
    price: "$259.00",
    inStock: true,
  },
  {
    id: 10,
    name: "Minimal Watch",
    category: "Laptop",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.5,
    reviewsCount: 68,
    price: "$239.00",
    inStock: true,
  },
  {
    id: 11,
    name: "Minimal Watch",
    category: "Technology",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.1,
    reviewsCount: 42,
    price: "$189.00",
    inStock: true,
  },
  {
    id: 12,
    name: "Minimal Watch",
    category: "Gear",
    image: "/products/minimal-watch.jpg",
    description:
      "Experience outstanding clarity, rich colors, and advanced imaging technology with th...",
    rating: 4.7,
    reviewsCount: 115,
    price: "$229.00",
    inStock: true,
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
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | "any">("any");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // View & Pagination States
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [selectedCardId, setSelectedCardId] = useState<number>(2); // Default to card 2 matching design mockup

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

  // Handle Share Product
  const handleShareProduct = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success(`Link for "${product.name}" copied to clipboard!`);
    }
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
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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

        {/* Main Grid: Left Sidebar + Right Content */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* ===================== LEFT SIDEBAR ===================== */}
          <aside
            className={`w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-6 ${
              isMobileFilterOpen
                ? "fixed inset-0 z-50 bg-black/50 p-4 overflow-y-auto flex items-center justify-center lg:static lg:bg-transparent lg:p-0"
                : "hidden lg:block"
            }`}
          >
            {/* Modal wrapper on mobile */}
            <div
              className={`w-full max-w-md lg:max-w-none space-y-6 ${
                isMobileFilterOpen
                  ? "bg-white p-6 rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  : ""
              }`}
            >
              {/* Mobile close button */}
              {isMobileFilterOpen && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 lg:hidden">
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* FILTERS CARD */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
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
                    <div className="mt-3 space-y-2.5">
                      {categoryList.map((cat) => {
                        const isChecked = selectedCategories.includes(cat.name);
                        return (
                          <label
                            key={cat.name}
                            className="flex items-center justify-between text-xs text-gray-700 cursor-pointer group py-0.5"
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Custom Rounded Square Checkbox */}
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
                    <div className="mt-3 space-y-2">
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
                              className="w-3 h-3 fill-amber-500 text-amber-500"
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
                              className="w-3 h-3 fill-amber-500 text-amber-500"
                            />
                          ))}
                          <Star className="w-3 h-3 fill-gray-200 text-gray-200" />
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
                              className="w-3 h-3 fill-amber-500 text-amber-500"
                            />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-gray-200 text-gray-200"
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
                              className="w-3 h-3 fill-amber-500 text-amber-500"
                            />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-gray-200 text-gray-200"
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
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-gray-200 text-gray-200"
                            />
                          ))}
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* EXPERT CALLOUT BOX (TEAL) */}
              <div className="bg-[#01a9a0] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                {/* Headphones Circle Icon */}
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

              {/* Apply button on mobile */}
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

          {/* ===================== RIGHT CONTENT AREA ===================== */}
          <main className="flex-1 w-full">
            {/* Top Bar: Title + Count + View Toggle + Show Page */}
            <div className="hidden lg:flex items-center justify-between mb-6 pb-2">
              <div>
                <h1 className="text-2xl font-bold font-anek text-gray-900 tracking-tight">
                  All products
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
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
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span>Show Page</span>
                  <div className="relative inline-block">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 outline-none focus:border-[#01a9a0] cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid / List */}
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
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => {
                  const isSelected = selectedCardId === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedCardId(product.id)}
                      className={`relative rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden p-4 sm:p-5 flex items-center gap-4 sm:gap-5 ${
                        isSelected
                          ? "bg-[#f0fdfa]/60 border-2 border-[#01a9a0] shadow-[0_4px_16px_rgba(1,169,160,0.12)]"
                          : "bg-white border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md"
                      }`}
                    >
                      {/* Top-Right Badges (Active state shows rating pill & share button) */}
                      {isSelected && (
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-teal-100 shadow-xs text-[11px] font-bold text-gray-700">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            <span>{product.rating}</span>
                          </div>
                          <button
                            onClick={(e) => handleShareProduct(e, product)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 hover:border-[#01a9a0] flex items-center justify-center text-gray-500 hover:text-[#01a9a0] transition-colors shadow-xs"
                            title="Share product"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Product Image Container */}
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#f6f7f9] flex items-center justify-center flex-shrink-0 p-3 relative overflow-hidden group">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={140}
                          height={140}
                          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                        <h3 className="text-base sm:text-lg font-bold font-anek text-gray-900 tracking-tight leading-snug truncate">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed mt-1.5 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs font-bold text-gray-900">
                            {product.price}
                          </span>
                          <span className="text-[10px] font-semibold text-[#01a9a0] bg-[#01a9a0]/10 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                        </div>
                      </div>
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

      {/* ===================== EXPERT RECOMMENDATION MODAL ===================== */}
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
