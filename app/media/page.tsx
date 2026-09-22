"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Image as ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Film,
  ArrowRight,
  Phone,
  Maximize2,
  MapPin,
  ArrowDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── TYPES ──────────────────────────────────────────────────────────── */
interface PhotoItem {
  id: number;
  type: "photo";
  thumbnail: string;
  category: string;
  titleEn: string;
  titleAr: string;
  categoryLabelEn: string;
  categoryLabelAr: string;
  locationEn: string;
  locationAr: string;
}

interface VideoItem {
  id: number;
  type: "video";
  thumbnail: string;
  videoSrc: string;
  category: string;
  titleEn: string;
  titleAr: string;
  categoryLabelEn: string;
  categoryLabelAr: string;
  duration?: string;
  locationEn: string;
  locationAr: string;
}

/* ─── CATEGORY & METADATA DEFINITIONS ────────────────────────────────── */
const PHOTO_CATEGORIES = [
  { id: "all", labelEn: "ALL", labelAr: "الكل" },
  { id: "construction", labelEn: "CONSTRUCTION", labelAr: "الإنشاءات" },
  { id: "industrial", labelEn: "INDUSTRIAL", labelAr: "الصناعي" },
  { id: "hospitality", labelEn: "HOSPITALITY", labelAr: "الضيافة" },
  { id: "commercial", labelEn: "COMMERCIAL", labelAr: "التجاري" },
  { id: "infrastructure", labelEn: "INFRASTRUCTURE", labelAr: "البنية التحتية" },
];

const VIDEO_CATEGORIES = [
  { id: "all", labelEn: "ALL", labelAr: "الكل" },
  { id: "construction", labelEn: "CONSTRUCTION", labelAr: "الإنشاءات" },
  { id: "industrial", labelEn: "INDUSTRIAL", labelAr: "الصناعي" },
  { id: "hospitality", labelEn: "HOSPITALITY", labelAr: "الضيافة" },
  { id: "commercial", labelEn: "COMMERCIAL", labelAr: "التجاري" },
  { id: "infrastructure", labelEn: "INFRASTRUCTURE", labelAr: "البنية التحتية" },
];

const PHOTO_CAT_MAP = [
  { key: "construction", labelEn: "Construction", labelAr: "الإنشاءات" },
  { key: "industrial", labelEn: "Industrial", labelAr: "الصناعي" },
  { key: "hospitality", labelEn: "Hospitality", labelAr: "الضيافة" },
  { key: "commercial", labelEn: "Commercial", labelAr: "التجاري" },
  { key: "infrastructure", labelEn: "Infrastructure", labelAr: "البنية التحتية" },
];

const VIDEO_CAT_MAP = [
  { key: "construction", labelEn: "Construction", labelAr: "الإنشاءات" },
  { key: "industrial", labelEn: "Industrial", labelAr: "الصناعي" },
  { key: "hospitality", labelEn: "Hospitality", labelAr: "الضيافة" },
  { key: "commercial", labelEn: "Commercial", labelAr: "التجاري" },
  { key: "infrastructure", labelEn: "Infrastructure", labelAr: "البنية التحتية" },
];

const LOCATIONS = [
  { en: "Downtown Dubai", ar: "وسط مدينة دبي" },
  { en: "Dubai Marina", ar: "دبي مارينا" },
  { en: "Business Bay, Dubai", ar: "الخليج التجاري، دبي" },
  { en: "Palm Jumeirah", ar: "نخلة جميرا" },
  { en: "Abu Dhabi Industrial", ar: "أبوظبي الصناعية" },
  { en: "Sharjah Waterfront", ar: "واجهة الشارقة" },
];

const PHOTOS_PER_PAGE = 12;
const VIDEOS_PER_PAGE = 12;

export default function MediaPage() {
  const { isArabic } = useLanguage();

  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination States
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("all");
  const [visiblePhotoCount, setVisiblePhotoCount] = useState<number>(12);

  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("all");
  const [visibleVideoCount, setVisibleVideoCount] = useState<number>(12);
  const [currentVideoPage, setCurrentVideoPage] = useState<number>(1);

  // Modals
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // ── Auto-load from API ─────────────────────────────────────────
  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(({ images, videos }: { images: string[]; videos: string[] }) => {
        const mappedPhotos: PhotoItem[] = images.map((src, i) => {
          const cat = PHOTO_CAT_MAP[i % PHOTO_CAT_MAP.length];
          return {
            id: 101 + i,
            type: "photo",
            thumbnail: src,
            category: cat.key,
            categoryLabelEn: cat.labelEn,
            categoryLabelAr: cat.labelAr,
            titleEn: "Project Name",
            titleAr: "اسم المشروع",
            locationEn: "Dubai, UAE",
            locationAr: "دبي، الإمارات",
          };
        });

        const mappedVideos: VideoItem[] = videos.map((src, i) => {
          const cat = PHOTO_CAT_MAP[i % PHOTO_CAT_MAP.length];
          return {
            id: 1 + i,
            type: "video",
            thumbnail: src,
            videoSrc: src,
            category: cat.key,
            categoryLabelEn: cat.labelEn,
            categoryLabelAr: cat.labelAr,
            titleEn: "Project Name",
            titleAr: "اسم المشروع",
            duration: "0:45",
            locationEn: "Commercial",
            locationAr: "تجاري",
          };
        });

        setPhotoItems(mappedPhotos);
        setVideoItems(mappedVideos);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Filtered & Paginated Photos ──────────────────────────────
  const filteredPhotos = useMemo(() => {
    if (selectedPhotoCategory === "all") return photoItems;
    return photoItems.filter((p) => p.category === selectedPhotoCategory);
  }, [photoItems, selectedPhotoCategory]);

  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visiblePhotoCount);
  }, [filteredPhotos, visiblePhotoCount]);

  // ── Filtered & Displayed Videos ──────────────────────────────
  const filteredVideos = useMemo(() => {
    if (selectedVideoCategory === "all") return videoItems;
    return videoItems.filter((v) => v.category === selectedVideoCategory);
  }, [videoItems, selectedVideoCategory]);

  const displayedVideos = useMemo(() => {
    return filteredVideos.slice(0, visibleVideoCount);
  }, [filteredVideos, visibleVideoCount]);

  // ── Lightbox Navigation ──────────────────────────────────────
  const handleOpenPhoto = (photo: PhotoItem) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setActivePhotoIndex(idx >= 0 ? idx : 0);
    setActivePhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!filteredPhotos.length) return;
    const nextIdx = (activePhotoIndex + 1) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!filteredPhotos.length) return;
    const prevIdx = (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIndex(prevIdx);
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActivePhoto(null);
      } else if (e.key === "ArrowRight") {
        if (activePhoto) (isArabic ? handlePrevPhoto() : handleNextPhoto());
      } else if (e.key === "ArrowLeft") {
        if (activePhoto) (isArabic ? handleNextPhoto() : handlePrevPhoto());
      }
    };
    if (activeVideo || activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo, activePhoto, activePhotoIndex, filteredPhotos, isArabic]);

  return (
    <div
      className="min-h-screen bg-white text-[#0B1C24] overflow-x-hidden selection:bg-[#00c4b4]/20 selection:text-[#00c4b4]"
      dir={isArabic ? "rtl" : "ltr"}
    >

      {/* ══════════════════════════════════════════════════════════════
          1. HERO HEADER SECTION (Exact Match to Design Screenshot)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] xl:h-[500px] flex items-center bg-[#041620] overflow-hidden">
        {/* Background Image: Workstation, Camera, Laptop, Film Strips & Floating Cards */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mediaPageNew/HeroSection.png"
            alt="Our Media Banner"
            fill
            priority
            unoptimized
            className={`object-cover object-center ${isArabic ? "scale-x-[-1]" : ""}`}
          />
          {/* Gentle Directional Dark Gradient Overlay for Crisp Text Legibility */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isArabic
                ? "bg-gradient-to-l from-black/80 via-black/45 sm:via-black/30 to-transparent"
                : "bg-gradient-to-r from-black/80 via-black/45 sm:via-black/30 to-transparent"
            }`}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full pt-20 sm:pt-24 md:pt-28 pb-8">
          <div className="max-w-lg lg:max-w-xl">
            {/* Tagline: — FEATURED PROJECTS */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-slate-300 inline-block" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-200">
                {isArabic ? "مشاريع متميزة" : "FEATURED PROJECTS"}
              </span>
            </div>

            {/* Main Headline: Our Media */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.12] tracking-tight drop-shadow-md">
              {isArabic ? (
                <>
                  معرض <span className="text-[#00DDCF]">الوسائط</span>
                </>
              ) : (
                <>
                  Our <span className="text-[#00DDCF]">Media</span>
                </>
              )}
            </h1>

            {/* Subtitle from Design */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-gray-200/90 leading-relaxed font-normal max-w-md drop-shadow-sm">
              {isArabic
                ? "تثبت شهاداتنا واعتماداتنا التزامنا الراسخ بتقديم حلول عزل مائي موثوقة وآمنة وعالية الجودة في الإمارات."
                : "Our certifications demonstrate our commitment to delivering reliable, safe, and high-quality waterproofing solutions."}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: A CLOSER LOOK AT OUR WORK (PHOTO GALLERY)
          (Exact match to design screenshot)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-14 sm:py-16 md:py-20 bg-[#EAF8FA] overflow-hidden">
        {/* Skyline, Mist & Trees Background Graphic on Top Right */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/mediaPageNew/ImageGallerySection.png"
            alt="Gallery Skyline Background"
            fill
            priority
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left-top" : "object-right-top"}`}
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          {/* Section Header (Left-Aligned as per design) */}
          <div className="max-w-3xl mb-8 sm:mb-10 text-left rtl:text-right">
            {/* Tagline: — IMAGE GALLERY */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[2px] bg-[#00c4b4] inline-block" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "معرض الصور" : "IMAGE GALLERY"}
              </span>
            </div>

            {/* Title: A Closer Look At Our Work */}
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-[#0B1C24] tracking-tight leading-[1.14]">
              {isArabic ? (
                <>
                  نظرة عن قرب على <span className="text-[#00c4b4]">أعمالنا</span>
                </>
              ) : (
                <>
                  A Closer Look At <span className="text-[#00c4b4]">Our Work</span>
                </>
              )}
            </h2>

            {/* Subtitle exact text from design */}
            <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-stone-600 max-w-2xl leading-relaxed">
              {isArabic
                ? "استكشف مشاريعنا المكتملة واكتشف جودة التنفيذ والخبرة الهندسية وحلول العزل المائي المتميزة التي يقدمها فريقنا."
                : "Explore our completed projects and discover the quality workmanship, expertise, and waterproofing solutions delivered by our team."}
            </p>
          </div>

          {/* Category Filter Pills (Left-Aligned as per design) */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {PHOTO_CATEGORIES.map((cat) => {
              const isActive = selectedPhotoCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedPhotoCategory(cat.id);
                    setVisiblePhotoCount(12);
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#00a89a] text-white shadow-md shadow-[#00a89a]/30 scale-100"
                      : "bg-white text-[#0B1C24] hover:text-[#00a89a] border border-slate-200/90 shadow-xs hover:border-[#00a89a]"
                  }`}
                >
                  {isArabic ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-white/70 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          )}

          {/* 4-Column Photo Grid (Matching Reference Card Layout Exactly) */}
          {!loading && displayedPhotos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {displayedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={photo.thumbnail}
                    alt={isArabic ? photo.titleAr : photo.titleEn}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay for bottom text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Hover Center Focus Ring (Matching Card #3 in Screenshot) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/35 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom-Left Meta Badge (Square Icon Box + Project Name + Dubai, UAE) */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex items-center gap-2.5 text-white">
                    {/* Translucent Square Icon Box */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 text-white">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    {/* Project Title & Location */}
                    <div className="leading-tight min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-bold text-white truncate group-hover:text-[#00DDCF] transition-colors">
                        {isArabic ? photo.titleAr : photo.titleEn}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/75 truncate mt-0.5">
                        {isArabic ? photo.locationAr : photo.locationEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && displayedPhotos.length === 0 && (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 max-w-md mx-auto">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">
                {isArabic ? "لا توجد مشاريع في هذا القسم حالياً" : "No projects found in this category"}
              </p>
            </div>
          )}

          {/* Load More Button (Matching Reference Design: Load More ↓) */}
          {!loading && visiblePhotoCount < filteredPhotos.length && (
            <div className="flex items-center justify-center mt-12 sm:mt-14">
              <button
                onClick={() => setVisiblePhotoCount((prev) => prev + 8)}
                className="text-xs sm:text-sm font-bold text-[#00a89a] hover:text-[#008f83] tracking-wide inline-flex items-center gap-1.5 transition-colors cursor-pointer group py-2 px-5 rounded-full hover:bg-white/80 shadow-xs"
              >
                <span>{isArabic ? "تحميل المزيد" : "Load More"}</span>
                <span className="text-base transition-transform group-hover:translate-y-0.5">↓</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: PROJECT STORIES IN MOTION (VIDEO GALLERY)
          (Exact match to design screenshot)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-14 sm:py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          {/* Section Header (Left-Aligned as per design) */}
          <div className="max-w-3xl mb-8 sm:mb-10 text-left rtl:text-right">
            {/* Tagline: — VIDEO GALLERY */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 sm:w-6 h-[2px] bg-[#00c4b4] inline-block" />
              <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "معرض الفيديو" : "VIDEO GALLERY"}
              </span>
            </div>

            {/* Title: Project Stories In Motion */}
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-[#0B1C24] tracking-tight leading-[1.14]">
              {isArabic ? (
                <>
                  قصص المشاريع <span className="text-[#00c4b4]">بالفيديو</span>
                </>
              ) : (
                <>
                  Project Stories In <span className="text-[#00c4b4]">Motion</span>
                </>
              )}
            </h2>

            {/* Subtitle exact text from design */}
            <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-stone-600 max-w-2xl leading-relaxed">
              {isArabic
                ? "استكشف مشاريعنا المكتملة واكتشف جودة التنفيذ والخبرة الهندسية وحلول العزل المائي المتميزة التي يقدمها فريقنا."
                : "Explore our completed projects and discover the quality workmanship, expertise, and waterproofing solutions delivered by our team."}
            </p>
          </div>

          {/* Category Filter Pills (Left-Aligned as per design) */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {VIDEO_CATEGORIES.map((cat) => {
              const isActive = selectedVideoCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedVideoCategory(cat.id);
                    setVisibleVideoCount(12);
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#00a89a] text-white shadow-md shadow-[#00a89a]/30 scale-100"
                      : "bg-[#EEF8F8] text-[#1E3A47] hover:text-[#00a89a] border border-[#d6eeee]/70 shadow-xs hover:border-[#00a89a]"
                  }`}
                >
                  {isArabic ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          )}

          {/* 4-Column Video Grid (Matching Reference Card Layout Exactly) */}
          {!loading && displayedVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {displayedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* HTML5 video frame preview */}
                  <video
                    src={`${video.videoSrc}#t=0.001`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay for bottom text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Center Sleek Circular Play Button (Matching Reference Card #2 & #7) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#00a89a] group-hover:border-[#00a89a] transition-all duration-300">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom-Left Meta Badge (Square Icon Box + Project Name + Commercial) */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex items-center gap-2.5 text-white">
                    {/* Translucent Square Icon Box */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 text-white">
                      <Film className="w-3.5 h-3.5" />
                    </div>
                    {/* Project Title & Location */}
                    <div className="leading-tight min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-bold text-white truncate group-hover:text-[#00DDCF] transition-colors">
                        {isArabic ? video.titleAr : video.titleEn}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/75 truncate mt-0.5">
                        {isArabic ? video.locationAr : video.locationEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && displayedVideos.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/60 max-w-md mx-auto">
              <Film className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">
                {isArabic ? "لا توجد فيديوهات في هذا القسم حالياً" : "No videos found in this category"}
              </p>
            </div>
          )}

          {/* Load More Button (Matching Reference Design: Load More ↓) */}
          {!loading && visibleVideoCount < filteredVideos.length && (
            <div className="flex items-center justify-center mt-12 sm:mt-14">
              <button
                onClick={() => setVisibleVideoCount((prev) => prev + 8)}
                className="text-xs sm:text-sm font-bold text-[#00a89a] hover:text-[#008f83] tracking-wide inline-flex items-center gap-1.5 transition-colors cursor-pointer group py-2 px-5 rounded-full hover:bg-slate-100 shadow-xs"
              >
                <span>{isArabic ? "تحميل المزيد" : "Load More"}</span>
                <span className="text-base transition-transform group-hover:translate-y-0.5">↓</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: COMPANY PROFILE DOWNLOAD BANNER
          (Exact background: /mediaPageNew/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_12px_40px_rgba(0,196,180,0.12)] border border-[#00c4b4]/30 flex items-center min-h-[170px] sm:min-h-[190px] md:min-h-[210px]">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/mediaPageNew/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png"
                alt="Company Profile Banner Background"
                fill
                unoptimized
                className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
              />
              {/* Subtle gradient overlay to guarantee text legibility on small screens */}
              <div
                className={`absolute inset-0 sm:max-w-xl pointer-events-none ${
                  isArabic
                    ? "bg-gradient-to-l from-white/90 via-white/70 to-transparent"
                    : "bg-gradient-to-r from-white/90 via-white/70 to-transparent"
                }`}
              />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-xl">
              {/* Tagline: — COMPANY PROFILE */}
              <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                <span className="w-5 sm:w-6 h-[2px] bg-[#00a89a] inline-block" />
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#0B1C24]">
                  {isArabic ? "ملف الشركة" : "COMPANY PROFILE"}
                </span>
              </div>

              {/* Subtitle exact text from design */}
              <p className="text-xs sm:text-sm text-stone-700 max-w-md leading-relaxed mb-5 sm:mb-6 font-medium">
                {isArabic
                  ? "اكتشف خبرتنا وخدماتنا والتزامنا ببناء غدٍ أكثر أماناً وقوة."
                  : "Discover our expertise, services and commitment to building a safer, stronger tomorrow."}
              </p>

              {/* PDF Badge + Divider + Download Button */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* PDF File Info Box */}
                <div className="flex items-center gap-3 bg-white border border-slate-200/90 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-sm">
                  <Image
                    src="/certifications/logos/Custom Teal PDF File Badge.svg"
                    alt="PDF"
                    width={34}
                    height={34}
                    className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain shrink-0"
                  />
                  <div className="flex flex-col leading-tight pr-1">
                    <span className="text-xs sm:text-[13px] font-bold text-[#0B1C24] whitespace-nowrap">
                      {isArabic ? "ملف الشركة" : "Company Profile"}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium mt-0.5">11.4 MB</span>
                  </div>
                </div>

                {/* Subtle Divider Line */}
                <div className="hidden sm:block w-[1px] h-8 bg-slate-300/60" />

                {/* Download Profile Button */}
                <a
                  href="/contact"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#00a89a] hover:bg-[#009386] text-white font-bold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2.5 sm:gap-3 shadow-md shadow-[#00a89a]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap group"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{isArabic ? "تحميل الملف" : "Download Profile"}</span>
                  <span className="w-6 h-6 rounded-full bg-white text-[#00a89a] flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className={`w-3.5 h-3.5 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. SECTION: FULL-WIDTH BOTTOM CALL TO ACTION BANNER
          (Exact background: /mediaPageNew/CallToActionSection.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center bg-[#052b36] overflow-hidden">
        {/* Background Image with Worker Coating Roof at Sunset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mediaPageNew/CallToActionSection.png"
            alt="Waterproofing Project CTA Banner"
            fill
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
          />
          {/* Curved Dark Gradient Overlay on Text Side */}
          <div
            className={`absolute inset-0 ${
              isArabic
                ? "bg-gradient-to-l from-[#021820]/95 via-[#021820]/80 sm:via-[#021820]/45 to-transparent"
                : "bg-gradient-to-r from-[#021820]/95 via-[#021820]/80 sm:via-[#021820]/45 to-transparent"
            }`}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-16 sm:py-20">
          <div className="max-w-xl">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00DDCF] animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00DDCF]">
                {isArabic ? "تواصل معنا" : "CONTACT US"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
              {isArabic ? (
                <>
                  هل لديك <span className="text-[#00DDCF]">مشروع عزل مائي؟</span>
                </>
              ) : (
                <>
                  Have a <span className="text-[#00DDCF]">Waterproofing Project?</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light mb-8 max-w-lg">
              {isArabic
                ? "احمِ منشأتك وعقارك مع مقاولي العزل المعتمدين في دبي والإمارات. تواصل معنا اليوم للحصول على فحص ميداني مجاني وضمانات شاملة."
                : "Protect your structural investment with Dubai's certified waterproofing and thermal insulation contractors. Get in touch today for a free technical site inspection."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/get-a-quote"
                className="pl-6 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-[#00DDCF] hover:bg-[#00c4b4] text-[#021820] font-black text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-3.5 shadow-xl shadow-[#00DDCF]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <span>{isArabic ? "طلب عرض أسعار مجاني" : "Get a Free Quote"}</span>
                <span className="w-8 h-8 rounded-full bg-[#021820] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className={`w-3.5 h-3.5 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#00DDCF]" />
                <span>{isArabic ? "تحدث مع مهندس" : "Talk to Engineer"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VIDEO MODAL PLAYER
      ══════════════════════════════════════════════════════════════ */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0B1C24] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#071319]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00c4b4]" />
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {isArabic ? activeVideo.titleAr : activeVideo.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00c4b4] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PHOTO LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════════ */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-black/80 rounded-3xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-black/60 border-b border-white/10 text-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00c4b4] text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  {isArabic ? activePhoto.categoryLabelAr : activePhoto.categoryLabelEn}
                </span>
                <h3 className="text-sm sm:text-base font-bold">
                  {isArabic ? activePhoto.titleAr : activePhoto.titleEn}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 font-mono">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#00c4b4] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close photo lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Res Photo Display */}
            <div className="relative w-full aspect-[16/10] bg-black flex items-center justify-center">
              <Image
                src={activePhoto.thumbnail}
                alt={isArabic ? activePhoto.titleAr : activePhoto.titleEn}
                fill
                unoptimized
                priority
                className="object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#00c4b4] text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 shadow-lg hover:scale-108"
                aria-label="Previous Photo"
              >
                <ChevronLeft className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#00c4b4] text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-white/20 shadow-lg hover:scale-108"
                aria-label="Next Photo"
              >
                <ChevronRight className={`w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
