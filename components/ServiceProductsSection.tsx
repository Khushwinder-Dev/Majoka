"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

interface ProductItem {
  id: number;
  name: string;
  longName: string;
  image: string;
  description: string;
  category: string;
}

// Curated list of high-quality products with verified images
const curatedProducts: ProductItem[] = [
  {
    id: 1,
    name: "Steel stainless wall ladder",
    longName: "Vertical Wall Mounted Access Ladder",
    image: "/media/Updated_Product_Images/01_Steel stainless wall ladder.jpeg",
    description: "Strong and corrosion-resistant FRP wall ladder designed for safe vertical access to elevated areas, walls, tanks and industrial structures.",
    category: "FRP Products",
  },
  {
    id: 2,
    name: "Steel stainless ladder swimming pools",
    longName: "Stainless Style Swimming Pool Ladder",
    image: "/media/Updated_Product_Images/02_Steel stainless ladder swimming pools.jpeg",
    description: "Durable corrosion-resistant FRP swimming pool ladder designed to provide safe and convenient entry and exit from swimming pools.",
    category: "Pool Access",
  },
  {
    id: 3,
    name: "Safety Cage Ladder",
    longName: "Vertical Industrial Safety Cage Ladder",
    image: "/media/Updated_Product_Images/03_Safety Cage Ladder.jpeg",
    description: "Heavy-duty FRP safety cage ladder designed for secure vertical access to industrial platforms, tanks, buildings and elevated structures.",
    category: "Safety Equipment",
  },
  {
    id: 4,
    name: "Access Cover",
    longName: "Reinforced FRP Square Access Cover",
    image: "/media/Updated_Product_Images/04_Access Cover.jpeg",
    description: "Reinforced FRP access cover designed to protect utility openings, inspection points, drainage systems and underground access areas.",
    category: "Covers & Drainage",
  },
  {
    id: 6,
    name: "Rectangular Tank",
    longName: "Rectangular Industrial Storage Tank",
    image: "/media/Updated_Product_Images/06_Rectangular Tank.jpeg",
    description: "Strong FRP rectangular storage tank suitable for water, chemical, wastewater and industrial liquid storage applications.",
    category: "Storage Tanks",
  },
  {
    id: 8,
    name: "Bathtub",
    longName: "Molded FRP Bathroom Bathtub",
    image: "/media/Updated_Product_Images/08_Bathtub.jpeg",
    description: "High-quality molded FRP bathtub offering a smooth, durable and easy-to-maintain surface for residential and hotel applications.",
    category: "Sanitary Products",
  },
  {
    id: 10,
    name: "Wall Access Ladder",
    longName: "Industrial Wall Access Ladder",
    image: "/media/Updated_Product_Images/10_Wall Access Ladder.jpeg",
    description: "Engineered vertical wall access system built with heavy-duty corrosion-proof composite materials for harsh environments.",
    category: "Access Systems",
  },
  {
    id: 19,
    name: "Car Parking Canopy",
    longName: "FRP Car Parking Shade Canopy",
    image: "/media/Updated_Product_Images/19_Car Parking Canopy.jpeg",
    description: "Weatherproof UV-resistant vehicle parking canopy engineered to provide lasting shade and protection in extreme UAE climates.",
    category: "Canopies & Shades",
  },
  {
    id: 27,
    name: "Cylindrical Tank",
    longName: "Vertical Cylindrical Water Tank",
    image: "/media/Updated_Product_Images/27_Cylindrical Tank.jpeg",
    description: "High-capacity seamless cylindrical FRP storage tank manufactured with premium resins for drinking water and chemical storage.",
    category: "Water Tanks",
  },
];

interface ServiceProductsSectionProps {
  isArabic: boolean;
}

export default function ServiceProductsSection({ isArabic }: ServiceProductsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive items count
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, curatedProducts.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        if (isArabic) handlePrev();
        else handleNext();
      } else {
        if (isArabic) handleNext();
        else handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-stone-200/80">
      <div className="w-full">
        {/* ========================================================= */}
        {/* HEADER (matching reference image top-left title)          */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-stone-900 tracking-tight leading-tight">
              {isArabic ? "منتجاتنا المميزة" : "Our Products"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 max-w-lg">
              {isArabic
                ? "مجموعة متطورة من منتجات العزل والألياف الزجاجية وFRP المصنعة بأعلى معايير الجودة."
                : "Explore our premium range of specialized FRP and fiberglass products engineered for maximum durability."}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CAROUSEL WRAPPER WITH NAVIGATION BUTTONS                  */}
        {/* ========================================================= */}
        <div
          className="relative px-0 sm:px-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button (Dark round circle like reference) */}
          <button
            type="button"
            onClick={isArabic ? handleNext : handlePrev}
            aria-label="Previous"
            className="absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#363636] hover:bg-black text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isArabic ? (
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>

          {/* Right Arrow Button (Dark round circle like reference) */}
          <button
            type="button"
            onClick={isArabic ? handlePrev : handleNext}
            aria-label="Next"
            className="absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#363636] hover:bg-black text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isArabic ? (
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>

          {/* Cards Track */}
          <div className="overflow-hidden py-3">
            <div
              className="flex transition-transform duration-500 ease-out gap-5 sm:gap-6"
              style={{
                transform: `translateX(${
                  isArabic
                    ? currentIndex * (100 / itemsPerView)
                    : -currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {curatedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    flex: `0 0 calc(${100 / itemsPerView}% - ${
                      ((itemsPerView - 1) * (itemsPerView === 1 ? 0 : 24)) /
                      itemsPerView
                    }px)`,
                  }}
                  className="min-w-0"
                >
                  <Link
                    href="/products"
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,167,157,0.14)] transition-all duration-300 flex flex-col p-3.5 sm:p-4 h-full"
                  >
                    {/* Top Image with Rounded Corners (matching ref image 1) */}
                    <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-4">
                      <Image
                        src={product.image}
                        alt={product.longName}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-1 px-1">
                      {/* Title (Bold, matching reference image) */}
                      <h3 className="text-base sm:text-[17px] font-bold text-stone-900 group-hover:text-[#009e90] transition-colors leading-snug line-clamp-1 mb-2">
                        {product.longName}
                      </h3>

                      {/* Excerpt / description */}
                      <p className="text-xs sm:text-[13px] text-stone-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                        {product.description}
                      </p>

                      {/* Detail CTA link */}
                      <div className="flex items-center gap-1 text-xs font-bold text-[#009e90] group-hover:gap-2 transition-all duration-200 mt-auto">
                        <span>{isArabic ? "عرض المنتج" : "View Product"}</span>
                        {isArabic ? (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM PILL BUTTON: VIEW ALL PRODUCTS (matching ref)      */}
        {/* ========================================================= */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#00877b] text-white font-bold py-3 px-8 sm:px-10 rounded-full shadow-md hover:shadow-lg hover:shadow-[#009e90]/25 transition-all duration-300 text-xs sm:text-sm tracking-wide active:scale-95 cursor-pointer"
          >
            <span>{isArabic ? "عرض جميع المنتجات" : "View All Products"}</span>
            {isArabic ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
