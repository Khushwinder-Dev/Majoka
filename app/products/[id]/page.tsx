"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Share2,
  ChevronRight,
  Check,
  X,
  Link2,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Plus,
  Minus,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, ProductReview } from "@/data/productsData";

export default function ProductDetailsPage() {
  const params = useParams();
  const rawId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "1";

  const product = useMemo(() => {
    return getProductById(rawId);
  }, [rawId]);

  // Tab State: Overview, Specifications, Reviews
  const [activeTab, setActiveTab] = useState<"overview" | "specifications" | "reviews">("overview");

  // Interaction States
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);

  // Update reviews if product changes
  useEffect(() => {
    setReviewsList(product.reviews);
  }, [product]);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Share via social
  const handleSocialShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "https://example.com/share-link";
    const text = product.name || "Check out this product";

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

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://example.com/share-link";
    navigator.clipboard?.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Added to your wishlist!");
    } else {
      toast("Removed from your wishlist");
    }
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error("Please provide your name and review comments.");
      return;
    }

    const createdReview: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReview.name,
      initials: newReview.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      date: "Today",
      rating: newReview.rating,
      verified: true,
      comment: newReview.comment,
    };

    setReviewsList([createdReview, ...reviewsList]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setIsWriteReviewOpen(false);
    toast.success("Thank you! Your verified review has been submitted.");
  };

  const scrollToSection = (sectionId: "overview" | "specifications" | "reviews") => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayedReviews = showAllReviews ? reviewsList : reviewsList.slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-24 selection:bg-[#01a9a0]/15 selection:text-[#01a9a0]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===================== BREADCRUMBS ===================== */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href={`/products`}
            className="hover:text-gray-900 transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[240px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* ===================== MAIN PRODUCT HERO (2-COL) ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Product Image Container */}
          <div className="relative w-full">
            <div className="w-full aspect-square bg-[#f8f9fa] rounded-3xl p-8 sm:p-14 flex items-center justify-center relative overflow-hidden group border border-gray-100/60 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <Image
                src={product.image}
                alt={product.name}
                width={700}
                height={700}
                priority
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-gray-200/80 flex items-center justify-center text-gray-500 hover:text-rose-500 transition-all shadow-xs hover:scale-110 cursor-pointer"
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col relative">
            {/* Category Tag & Share Button Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#01a9a0] tracking-wider uppercase">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.subcategory || "CHARGING"}</span>
              </div>

              {/* Share Button with Tooltip Popover */}
              <div className="relative">
                <button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="w-8 h-8 rounded-full border border-gray-200/90 flex items-center justify-center text-gray-500 hover:text-[#01a9a0] hover:border-[#01a9a0] transition-colors cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                {/* Share Dropdown Popover */}
                {isShareOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsShareOpen(false)}
                    />
                    <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 bg-white rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-gray-100 animate-in fade-in zoom-in-95 duration-150 text-left">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-gray-900">Share Product</h3>
                        <button
                          onClick={() => setIsShareOpen(false)}
                          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-500 font-medium mb-3">
                        Share this link via
                      </p>

                      <div className="flex items-center justify-between gap-1.5 mb-4">
                        {/* Facebook */}
                        <button
                          onClick={() => handleSocialShare("facebook")}
                          className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-[#1877F2] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </button>
                        {/* Twitter */}
                        <button
                          onClick={() => handleSocialShare("twitter")}
                          className="w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 flex items-center justify-center text-[#1DA1F2] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                          </svg>
                        </button>
                        {/* WhatsApp */}
                        <button
                          onClick={() => handleSocialShare("whatsapp")}
                          className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-[#25D366] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347" />
                          </svg>
                        </button>
                        {/* Telegram */}
                        <button
                          onClick={() => handleSocialShare("telegram")}
                          className="w-9 h-9 rounded-full bg-cyan-50 hover:bg-cyan-100 flex items-center justify-center text-[#0088cc] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-500 font-medium mb-1.5">Or copy link</p>
                      <div className="flex items-center gap-2 p-1 pl-2.5 border border-gray-200 rounded-full bg-white focus-within:border-[#01a9a0]">
                        <Link2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <input
                          type="text"
                          readOnly
                          value={typeof window !== "undefined" ? window.location.href : "https://example.com/share"}
                          className="w-full text-[11px] text-gray-600 bg-transparent outline-none truncate"
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-3 py-1 bg-[#01a9a0] hover:bg-[#00968e] text-white text-[11px] font-semibold rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-bold font-anek text-gray-900 tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-900">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewsCount} reviews)</span>
            </div>

            {/* Description Paragraphs (Exact matching reference design) */}
            <div className="space-y-4 text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-6">
              {product.longDescription ? (
                product.longDescription.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>{product.description}</p>
              )}
            </div>

            {/* Price & Interactive Actions */}
            {/* <div className="pt-2 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 font-anek">
                  {product.price}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  In Stock · Fast Dispatch
                </span>
              </div>

              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>


                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[160px] py-3 px-6 bg-[#01a9a0] hover:bg-[#00968e] text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

             
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-gray-500 border-t border-gray-100/60">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#01a9a0]" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#01a9a0]" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#01a9a0]" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* ===================== TAB NAVIGATION BAR ===================== */}
        <div className="mt-16 sm:mt-20 border-b border-gray-200">
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection("overview")}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer relative ${activeTab === "overview"
                ? "text-[#01a9a0] border-b-2 border-[#01a9a0]"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("specifications")}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer relative ${activeTab === "specifications"
                ? "text-[#01a9a0] border-b-2 border-[#01a9a0]"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Specifications
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer relative ${activeTab === "reviews"
                ? "text-[#01a9a0] border-b-2 border-[#01a9a0]"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Reviews
            </button>
          </div>
        </div>

        {/* ===================== OVERVIEW SECTION ===================== */}
        <section id="overview" className="pt-10 pb-12 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold font-anek text-gray-900 tracking-tight mb-4">
            {product.overviewTitle || "Designed to disappear into your desk."}
          </h2>

          <div className="space-y-4 max-w-4xl text-xs sm:text-[13px] text-gray-600 leading-relaxed">
            {product.overviewContent ? (
              product.overviewContent.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <>
                <p>
                  The Nomad MagSafe Charger pairs a machined aluminum base with a soft-touch
                  leather pad, so it sits flush and stays put. Strong magnets align your phone
                  every time, and a weighted body means you can lift your phone one-handed without
                  the charger coming with it.
                </p>
                <p>
                  A braided 2-metre USB-C cable keeps your setup tidy, and full 15W output means
                  you get the fastest MagSafe speeds Apple allows — no compromise for the clean
                  look.
                </p>
              </>
            )}
          </div>
        </section>

        {/* ===================== SPECIFICATIONS SECTION ===================== */}
        <section id="specifications" className="pt-10 pb-12 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold font-anek text-gray-900 tracking-tight mb-6">
            Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Column 1 */}
            <div className="bg-[#f9fafb] rounded-2xl p-5 sm:p-6 border border-gray-100/80 space-y-4">
              {product.specifications.column1.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-gray-200/40 last:border-0"
                >
                  <span className="text-gray-500 font-normal">{item.label}</span>
                  <span className="text-gray-900 font-semibold text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="bg-[#f9fafb] rounded-2xl p-5 sm:p-6 border border-gray-100/80 space-y-4">
              {product.specifications.column2.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-gray-200/40 last:border-0"
                >
                  <span className="text-gray-500 font-normal">{item.label}</span>
                  <span className="text-gray-900 font-semibold text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== RATINGS & REVIEWS SECTION ===================== */}
        <section id="reviews" className="pt-10 pb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold font-anek text-gray-900 tracking-tight">
              Ratings
            </h2>
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="text-xs font-semibold text-[#01a9a0] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (5 cols): Rating Score & Star Bars */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col">
              <div className="text-6xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-none mb-3">
                {product.rating}
              </div>

              {/* Five amber stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-xs text-gray-400 font-medium mb-6">
                Based on {product.reviewsCount} verified reviews
              </p>

              {/* Star Distribution Progress Bars */}
              <div className="space-y-2.5 max-w-xs">
                {product.ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-6 text-gray-600 font-medium">{item.stars} ★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-400 font-medium">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (7 cols): Customer Reviews */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col space-y-4">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#f9fafb] rounded-2xl p-5 sm:p-6 border border-gray-100 transition-all hover:border-gray-200"
                >
                  {/* Stars + Verified Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                        />
                      ))}
                    </div>

                    {review.verified && (
                      <span className="border border-[#01a9a0]/30 bg-[#e6f7f5] text-[#01a9a0] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                        VERIFIED
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600">
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-none">
                        {review.author}
                      </h4>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* See More Button */}
              {reviewsList.length > 2 && (
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="text-xs font-semibold text-gray-800 hover:text-[#01a9a0] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    {showAllReviews ? "Show Less" : "See More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* ===================== WRITE REVIEW MODAL ===================== */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-anek text-gray-900 mb-1">
              Write a Review
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Share your experience with {product.name}
            </p>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-1.5 text-amber-500 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-0.5 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= newReview.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                          }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 ml-2 font-medium">
                    {newReview.rating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#01a9a0] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write details about the build quality, performance, and day-to-day use..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#01a9a0] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#01a9a0] hover:bg-[#00968e] text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
