"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Film,
  ArrowRight,
  Phone,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* ─── MEDIA ITEM TYPES ───────────────────────────────────────────────── */
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
}

/* ─── CATEGORY DEFINITIONS ───────────────────────────────────────────── */
const PHOTO_CATEGORIES = [
  { id: "all", labelEn: "All", labelAr: "الكل" },
  { id: "combo", labelEn: "Combo System", labelAr: "نظام الكومبو" },
  { id: "membrane", labelEn: "Bitumen Membrane", labelAr: "غشاء بيتوميني" },
  { id: "grp", labelEn: "GRP Lining", labelAr: "تبطين GRP" },
  { id: "polyurea", labelEn: "Polyurea", labelAr: "بولي يوريا" },
  { id: "injection", labelEn: "Crack Injection", labelAr: "حقن الشقوق" },
];

const VIDEO_CATEGORIES = [
  { id: "all", labelEn: "All", labelAr: "الكل" },
  { id: "site", labelEn: "Site Application", labelAr: "تنفيذ ميداني" },
  { id: "flood", labelEn: "Water Flood Test", labelAr: "اختبار الغمر" },
  { id: "inspection", labelEn: "Quality Inspection", labelAr: "فحص الجودة" },
  { id: "tanking", labelEn: "Basement Tanking", labelAr: "عزل الأساسات" },
];

const PHOTO_CAT_MAP = [
  { key: "combo", labelEn: "Combo System", labelAr: "نظام الكومبو" },
  { key: "membrane", labelEn: "Bitumen Membrane", labelAr: "غشاء بيتوميني" },
  { key: "grp", labelEn: "GRP Lining", labelAr: "تبطين GRP" },
  { key: "polyurea", labelEn: "Polyurea Coating", labelAr: "طلاء بولي يوريا" },
  { key: "injection", labelEn: "Crack Injection", labelAr: "حقن الشقوق" },
];

const VIDEO_CAT_MAP = [
  { key: "site", labelEn: "Site Application", labelAr: "تنفيذ ميداني" },
  { key: "flood", labelEn: "Water Flood Test", labelAr: "اختبار الغمر المائي" },
  { key: "inspection", labelEn: "Quality Inspection", labelAr: "فحص الجودة" },
  { key: "tanking", labelEn: "Basement Tanking", labelAr: "عزل الأساسات" },
];

const LOCATIONS = [
  { en: "Dubai Marina, UAE", ar: "دبي مارينا، الإمارات" },
  { en: "Downtown Dubai, UAE", ar: "وسط مدينة دبي، الإمارات" },
  { en: "Business Bay, UAE", ar: "الخليج التجاري، الإمارات" },
  { en: "Jumeirah, Dubai", ar: "جميرا، دبي" },
  { en: "Abu Dhabi Industrial City", ar: "مدينة أبوظبي الصناعية" },
  { en: "Sharjah Waterfront, UAE", ar: "واجهة الشارقة المائية" },
];

const PHOTOS_PER_PAGE = 12;
const VIDEOS_PER_PAGE = 8;

export default function MediaPage() {
  const { isArabic } = useLanguage();

  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination States
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("all");
  const [currentPhotoPage, setCurrentPhotoPage] = useState<number>(1);

  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("all");
  const [currentVideoPage, setCurrentVideoPage] = useState<number>(1);

  // Modals & Lightbox
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // ── Fetch Media Files from API ────────────────────────────────
  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(({ images, videos }: { images: string[]; videos: string[] }) => {
        // Map images to PhotoItem with category metadata
        const mappedPhotos: PhotoItem[] = images.map((src, i) => {
          const catMeta = PHOTO_CAT_MAP[i % PHOTO_CAT_MAP.length];
          const loc = LOCATIONS[i % LOCATIONS.length];
          return {
            id: 101 + i,
            type: "photo",
            thumbnail: src,
            category: catMeta.key,
            categoryLabelEn: catMeta.labelEn,
            categoryLabelAr: catMeta.labelAr,
            titleEn: `Waterproofing Milestone #${i + 1}`,
            titleAr: `إنجاز عزل مائي #${i + 1}`,
            locationEn: loc.en,
            locationAr: loc.ar,
          };
        });

        // Map videos to VideoItem with category metadata
        const mappedVideos: VideoItem[] = videos.map((src, i) => {
          const catMeta = VIDEO_CAT_MAP[i % VIDEO_CAT_MAP.length];
          return {
            id: 1 + i,
            type: "video",
            thumbnail: src,
            videoSrc: src,
            category: catMeta.key,
            categoryLabelEn: catMeta.labelEn,
            categoryLabelAr: catMeta.labelAr,
            titleEn: `Site Execution Video #${i + 1}`,
            titleAr: `فيديو تنفيذ ميداني #${i + 1}`,
            duration: "0:45",
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

  const totalPhotoPages = Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE) || 1;
  const paginatedPhotos = useMemo(() => {
    const start = (currentPhotoPage - 1) * PHOTOS_PER_PAGE;
    return filteredPhotos.slice(start, start + PHOTOS_PER_PAGE);
  }, [filteredPhotos, currentPhotoPage]);

  // ── Filtered & Paginated Videos ──────────────────────────────
  const filteredVideos = useMemo(() => {
    if (selectedVideoCategory === "all") return videoItems;
    return videoItems.filter((v) => v.category === selectedVideoCategory);
  }, [videoItems, selectedVideoCategory]);

  const totalVideoPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE) || 1;
  const paginatedVideos = useMemo(() => {
    const start = (currentVideoPage - 1) * VIDEOS_PER_PAGE;
    return filteredVideos.slice(start, start + VIDEOS_PER_PAGE);
  }, [filteredVideos, currentVideoPage]);

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

  // Keyboard controls for modal & lightbox
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
      className="hidden min-h-screen bg-white text-[#0B1C24] overflow-x-hidden selection:bg-[#00c4b4]/20 selection:text-[#00c4b4]"
      dir={isArabic ? "rtl" : "ltr"}
    >

      {/* ══════════════════════════════════════════════════════════════
          1. HERO HEADER SECTION (with /mediaPageNew/HeroSection.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center bg-[#041620] overflow-hidden">
        {/* Designer Hero Graphic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mediaPageNew/HeroSection.png"
            alt={isArabic ? "معرض وسائط تاج الرحمة" : "Taj Al Rahmah Media Center"}
            fill
            priority
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
          />
          {/* Subtle Dark Vignette & Gradient for Text Contrast */}
          <div
            className={`absolute inset-0 pointer-events-none ${isArabic
              ? "bg-gradient-to-l from-[#041620]/95 via-[#041620]/80 sm:via-[#041620]/60 to-transparent"
              : "bg-gradient-to-r from-[#041620]/95 via-[#041620]/80 sm:via-[#041620]/60 to-transparent"
              }`}
          />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Breadcrumb matching design: HOME // MEDIA */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-extrabold tracking-[0.16em] uppercase text-white/90 mb-4 sm:mb-5">
              <Link href="/" className="hover:text-[#00DDCF] transition-colors">
                {isArabic ? "الرئيسية" : "HOME"}
              </Link>
              <span className="text-[#00DDCF] font-black tracking-wider">//</span>
              <span className="text-[#00DDCF] font-black tracking-wider">
                {isArabic ? "الوسائط" : "MEDIA"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.12] tracking-tight drop-shadow-sm">
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

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light max-w-xl">
              {isArabic
                ? "استكشف صوراً عالية الدقة ومقاطع فيديو توثق تميزنا في العزل المائي، المشاريع المنفذة، واختبارات الجودة عبر الإمارات."
                : "Explore high-definition photos and video footage of our waterproofing excellence, certified site applications, and finished landmark structures across the UAE."}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/90 font-medium">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Camera className="w-3.5 h-3.5 text-[#00DDCF]" />
                <span>
                  {photoItems.length} {isArabic ? "صورة معتمدة" : "Project Photos"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Film className="w-3.5 h-3.5 text-[#00DDCF]" />
                <span>
                  {videoItems.length} {isArabic ? "فيديو ميداني" : "Site Videos"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SECTION: A CLOSER LOOK AT OUR WORK (PHOTO GALLERY)
          (with /mediaPageNew/ImageGallerySection.png background)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Skyline & Light Cloud Background Graphic */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/mediaPageNew/ImageGallerySection.png"
            alt="Skyline Graphic"
            fill
            unoptimized
            className={`object-cover object-top opacity-70 ${isArabic ? "scale-x-[-1]" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "معرض الصور" : "PHOTO GALLERY"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
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

            <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {isArabic
                ? "تصفح مجموعتنا الواسعة من مشاريع العزل المائي والحراري للأسطح والأساسات والمباني التجارية في دولة الإمارات."
                : "Explore our comprehensive portfolio of waterproofing and insulation projects across residential, commercial, and industrial sectors."}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs">
              {PHOTO_CATEGORIES.map((cat) => {
                const isActive = selectedPhotoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedPhotoCategory(cat.id);
                      setCurrentPhotoPage(1);
                    }}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${isActive
                      ? "bg-[#00c4b4] text-white shadow-md shadow-[#00c4b4]/25 scale-100"
                      : "text-slate-600 hover:text-[#00c4b4] hover:bg-slate-100/70"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          )}

          {/* Photo Grid */}
          {!loading && paginatedPhotos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {paginatedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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

                  {/* Zoom Badge Top Right */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110 border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-4.5 z-10 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00c4b4] text-[11px] font-extrabold tracking-wider uppercase mb-1.5 shadow-xs">
                      {isArabic ? photo.categoryLabelAr : photo.categoryLabelEn}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-[#00DDCF] transition-colors">
                      {isArabic ? photo.titleAr : photo.titleEn}
                    </h3>
                    <p className="text-[11px] text-white/75 line-clamp-1 mt-0.5">
                      {isArabic ? photo.locationAr : photo.locationEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && paginatedPhotos.length === 0 && (
            <div className="text-center py-16 bg-white/60 rounded-3xl border border-slate-200/60 max-w-md mx-auto">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">
                {isArabic ? "لا توجد صور في هذا القسم حالياً" : "No photos found in this category"}
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPhotoPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPhotoPage((p) => Math.max(1, p - 1))}
                disabled={currentPhotoPage === 1}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                aria-label="Previous Page"
              >
                <ChevronLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>

              {Array.from({ length: totalPhotoPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentPhotoPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPhotoPage(pageNum)}
                    className={`w-10 h-10 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isCurrent
                      ? "bg-[#00c4b4] text-white shadow-md shadow-[#00c4b4]/25"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4]"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPhotoPage((p) => Math.min(totalPhotoPages, p + 1))}
                disabled={currentPhotoPage === totalPhotoPages}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                aria-label="Next Page"
              >
                <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: PROJECT STORIES IN MOTION (VIDEO GALLERY)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
                {isArabic ? "فيديوهات المشاريع" : "PROJECT STORIES"}
              </span>
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0B1C24] tracking-tight leading-[1.18]">
              {isArabic ? (
                <>
                  قصص المشاريع <span className="text-[#00c4b4]">بالفيديو</span>
                </>
              ) : (
                <>
                  Project Stories in <span className="text-[#00c4b4]">Motion</span>
                </>
              )}
            </h2>

            <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {isArabic
                ? "شاهد فرق العمل الهندسية أثناء تطبيق أنظمة العزل المعتمدة، اختبارات الغمر بالمياه، والفحص الدقيق في المواقع."
                : "Watch our site engineering teams apply certified systems and conduct quality water flood tests in real-time."}
            </p>
          </div>

          {/* Video Category Filter Pills */}
          <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              {VIDEO_CATEGORIES.map((cat) => {
                const isActive = selectedVideoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedVideoCategory(cat.id);
                      setCurrentVideoPage(1);
                    }}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${isActive
                      ? "bg-[#00c4b4] text-white shadow-md shadow-[#00c4b4]/25 scale-100"
                      : "text-slate-600 hover:text-[#00c4b4] hover:bg-slate-100/70"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Grid */}
          {!loading && paginatedVideos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {paginatedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* HTML5 video frame preview */}
                  <video
                    src={`${video.videoSrc}#t=0.001`}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:via-black/20 transition-all" />

                  {/* Centered Glowing Teal Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#00c4b4] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,196,180,0.5)] group-hover:scale-115 group-hover:bg-[#00DDCF] transition-all duration-300 ring-4 ring-white/20">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Video Meta Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white mb-1.5 border border-white/20">
                      {isArabic ? video.categoryLabelAr : video.categoryLabelEn}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-[#00DDCF] transition-colors">
                      {isArabic ? video.titleAr : video.titleEn}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && paginatedVideos.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 max-w-md mx-auto">
              <Film className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">
                {isArabic ? "لا توجد فيديوهات في هذا القسم حالياً" : "No videos found in this category"}
              </p>
            </div>
          )}

          {/* Video Pagination Controls */}
          {totalVideoPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentVideoPage((p) => Math.max(1, p - 1))}
                disabled={currentVideoPage === 1}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                aria-label="Previous Page"
              >
                <ChevronLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>

              {Array.from({ length: totalVideoPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentVideoPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentVideoPage(pageNum)}
                    className={`w-10 h-10 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isCurrent
                      ? "bg-[#00c4b4] text-white shadow-md shadow-[#00c4b4]/25"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4]"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentVideoPage((p) => Math.min(totalVideoPages, p + 1))}
                disabled={currentVideoPage === totalVideoPages}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#00c4b4] hover:text-[#00c4b4] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                aria-label="Next Page"
              >
                <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: FIRST LIGHT CTA CARD
          (with /mediaPageNew/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] rounded-3xl overflow-hidden shadow-lg border border-[#00c4b4]/20 flex items-center">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/mediaPageNew/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png"
                alt="Waterproofing Consultation Banner"
                fill
                unoptimized
                className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
              />
              {/* Soft overlay on text side for crisp mobile readability */}
              <div
                className={`absolute inset-0 sm:max-w-xl ${isArabic
                  ? "bg-gradient-to-l from-white/95 via-white/85 to-transparent"
                  : "bg-gradient-to-r from-white/95 via-white/85 to-transparent"
                  }`}
              />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-xl">
              <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#00a89a] block mb-2">
                {isArabic ? "استشارة فنية متخصصة" : "EXPERT ADVISORY"}
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1C24] leading-tight mb-3">
                {isArabic ? (
                  <>
                    هل لديك <span className="text-[#00c4b4]">مشروع عزل مائي؟</span>
                  </>
                ) : (
                  <>
                    Have a <span className="text-[#00c4b4]">Waterproofing Project?</span>
                  </>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed max-w-md">
                {isArabic
                  ? "تواصل مع خبرائنا المعتمدين في دبي للحصول على معاينة هندسية مجانية وعرض سعر تنافسي."
                  : "Connect with our certified UAE engineers for custom insulation specs and a free site inspection."}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="https://wa.me/971527492002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isArabic ? "واتساب الآن" : "WhatsApp Us"}</span>
                </a>

                <Link
                  href="/get-a-quote"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#00c4b4] hover:bg-[#00b0a2] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>{isArabic ? "طلب تسعير" : "Book a Call"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. SECTION: FULL-WIDTH BOTTOM CALL TO ACTION BANNER
          (with /mediaPageNew/CallToActionSection.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center bg-[#052b36] overflow-hidden">
        {/* Background Image with Worker Coating Roof at Sunset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mediaPageNew/CallToActionSection.png"
            alt="Waterproofing Project CTA"
            fill
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
          />
          {/* Dark Overlay on Text Side */}
          <div
            className={`absolute inset-0 ${isArabic
              ? "bg-gradient-to-l from-[#021820]/95 via-[#021820]/80 sm:via-[#021820]/50 to-transparent"
              : "bg-gradient-to-r from-[#021820]/95 via-[#021820]/80 sm:via-[#021820]/50 to-transparent"
              }`}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full py-16 sm:py-20">
          <div className="max-w-2xl">
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
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light mb-8 max-w-xl">
              {isArabic
                ? "احمِ منشأتك وعقارك مع مقاولي العزل المعتمدين في دبي والإمارات. تواصل معنا اليوم للحصول على فحص ميداني مجاني وضمانات شاملة."
                : "Protect your structural investment with Dubai's certified waterproofing and thermal insulation contractors. Get in touch today for a free technical site inspection."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/get-a-quote"
                className="pl-6 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-[#00DDCF] hover:bg-[#00c4b4] text-[#021820] font-black text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-3.5 shadow-lg shadow-[#00DDCF]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <span>{isArabic ? "طلب عرض أسعار مجاني" : "Get a Free Quote"}</span>
                <span className="w-8 h-8 rounded-full bg-[#021820] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className={`w-3.5 h-3.5 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center">
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
