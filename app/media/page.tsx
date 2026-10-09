"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Film,
  ArrowRight,
  ArrowLeft,
  Phone,
  Eye,
  MapPin,
  ArrowDown,
  Search,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Link2,
  Settings,
  Subtitles,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CommonHeader from "@/components/Common/CommonHeader";
import OurProjectsSection from "@/components/OurProjectsSection";
import ProtectionServicesSection from "@/components/ProtectionServicesSection";
import SolutionsListingSection from "@/components/SolutionsListingSection";
import WelcomeOfferModal from "@/components/WelcomeOfferModal";
import MediaLatestNewsSection from "@/components/MediaLatestNewsSection";

/* ─── TYPES ──────────────────────────────────────────────────────────── */
interface PhotoItem {
  id: number;
  type: "photo";
  thumbnail: string;
  category: string;
  serviceNameEn?: string;
  serviceNameAr?: string;
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

const DEMO_PROJECTS = [
  { en: "UAE Pavilion EXPO 2020", ar: "جناح الإمارات إكسبو 2020" },
  { en: "ADNOC New Head Quarters", ar: "المقر الرئيسي الجديد لأدنوك" },
  { en: "Mirdif City Center", ar: "مردف سيتي سنتر" },
  { en: "Mobility Pavilion EXPO", ar: "جناح التنقل إكسبو 2020" },
  { en: "Miami 1 @ JVC by Samana", ar: "ميامي 1 في قرية جميرا الدائرية" },
  { en: "Dubai Hills Estate", ar: "دبي هيلز استيت" },
  { en: "City Premiere Marina Hotel", ar: "شقق سيتي بريمير مارينا" },
  { en: "Miami Phase 2 @ JVT", ar: "ميامي المرحلة 2 في مثلث قرية جميرا" },
  { en: "Arabian Ranches Villas", ar: "فلل المرابع العربية" },
  { en: "Al Furjan South Villas", ar: "فلل الفرجان جنوب" },
  { en: "Downtown Dubai Commercial Tower", ar: "برج داون تاون التجاري" },
  { en: "Sharjah Waterfront Development", ar: "مشروع واجهة الشارقة المائية" },
];

const DEMO_SERVICES = [
  { en: "GRP & Fiberglass Waterproofing", ar: "عزل GRP والألياف الزجاجية" },
  { en: "Combo System Roof Waterproofing", ar: "نظام الكومبو لعزل الأسطح" },
  { en: "Epoxy Floor Coating", ar: "طلاء أرضيات الإيبوكسي" },
  { en: "Bitumen Membrane Waterproofing", ar: "عزل الغشاء البيتوميني" },
  { en: "Polyurea Waterproofing", ar: "عزل البولي يوريا فائق المرونة" },
  { en: "Injection Waterproofing", ar: "عزل الحقن المائي للخرسانة" },
  { en: "LEED Platinum Waterproofing", ar: "عزل معتمد LEED بلاتيني" },
  { en: "LEED Gold Thermal Insulation", ar: "عزل حراري معتمد LEED ذهبي" },
];

const PHOTOS_PER_PAGE = 12;
const VIDEOS_PER_PAGE = 6;

function VideoCard({
  video,
  isArabic,
  onOpenModal,
}: {
  video: VideoItem;
  isArabic: boolean;
  onOpenModal: (video: VideoItem) => void;
}) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getEffectiveDuration = () => {
    if (duration > 0) return duration;
    if (video.duration) {
      const parts = video.duration.split(":");
      if (parts.length === 2) {
        const m = parseInt(parts[0], 10);
        const s = parseInt(parts[1], 10);
        if (!isNaN(m) && !isNaN(s)) return m * 60 + s;
      }
    }
    return 84; // 1:24 default fallback
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = cardRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any)?.webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === cardRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const updateSeekFromEvent = (clientX: number) => {
    if (!seekerRef.current || !videoRef.current) return;
    const rect = seekerRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const totalDuration = getEffectiveDuration();
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * totalDuration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    updateSeekFromEvent(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSeekFromEvent(e.clientX);
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const effectiveDuration = getEffectiveDuration();
  const progressPercentage = effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden aspect-video bg-black shadow-md hover:shadow-2xl transition-all duration-300 select-none ${isFullscreen ? "w-full h-full" : ""
        }`}
    >
      {/* HTML5 video element */}
      <video
        ref={videoRef}
        src={video.videoSrc}
        poster={video.thumbnail}
        preload="metadata"
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Thumbnail Image Overlay (Shown when not playing) */}
      {!isPlaying && video.thumbnail && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
        >
          <Image
            src={video.thumbnail}
            alt={isArabic ? video.titleAr : video.titleEn}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
        </div>
      )}

      {/* Top Header Overlay: Logo Badge + Title + Subtitle */}
      <div
        className={`absolute top-0 inset-x-0 p-3 sm:p-4 z-20 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2 rtl:pr-0 rtl:pl-2 pointer-events-auto">
          {/* Circular Company Logo Badge */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md flex items-center justify-center p-1 overflow-hidden shrink-0 border border-white/30 cursor-pointer hover:scale-105 transition-transform"
            title={isArabic ? "الرئيسية" : "Home"}
          >
            <Image
              src="/logo.png"
              alt="Taj Al Rahmah"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>

          {/* Heading & Subtitle On Top */}
          <div className="leading-tight min-w-0">
            <h4
              onClick={(e) => {
                e.stopPropagation();
                router.push("/project");
              }}
              className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md cursor-pointer hover:text-[#00DDCF] hover:underline transition-colors block"
              title={isArabic ? "عرض المشروع" : "View Project"}
            >
              {isArabic ? video.titleAr : video.titleEn}
            </h4>
            <p
              onClick={(e) => {
                e.stopPropagation();
                router.push("/services");
              }}
              className="text-[10px] sm:text-xs text-white/80 truncate mt-0.5 drop-shadow-sm font-normal cursor-pointer hover:text-[#00DDCF] hover:underline transition-colors block"
              title={isArabic ? "عرض الخدمات" : "View Services"}
            >
              {isArabic ? (video.locationAr || "خدمات العزل المائي") : (video.locationEn || "Waterproofing Services")}
            </p>
          </div>
        </div>
      </div>

      {/* Center Big Play Button: Prominent Translucent Frosted White Circle with Solid Black Play Triangle */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-black flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-108 active:scale-95 group/playbtn"
            title={isArabic ? "تشغيل الفيديو" : "Play Video"}
          >
            <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-[#01a9a0] text-[#01a9a0] ml-1 rtl:ml-0 rtl:mr-1 transition-transform group-hover/playbtn:scale-105" />
          </div>
        </div>
      )}

      {/* Bottom Controls Bar: Clean timeline with white thumb, time, volume & fullscreen (NO 3 dots) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 inset-x-0 z-30 px-3.5 sm:px-4 pb-2.5 sm:pb-3 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${!isPlaying ? "opacity-100" : "opacity-100 sm:opacity-0 group-hover:opacity-100"
          }`}
      >
        {/* Row 1: Time on left, Volume & Fullscreen on right (NO 3 dots menu) */}
        <div className="flex items-center justify-between text-white mb-1.5 sm:mb-2">
          {/* Left: Current Time / Total Duration */}
          <div className="flex items-center">
            <span className="font-sans font-medium tracking-wide text-white text-xs sm:text-sm drop-shadow-sm select-none">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : (video.duration || "1:24")}
            </span>
          </div>

          {/* Right: Volume Mute Toggle + Fullscreen (NO 3 dots menu) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Volume Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="p-1 sm:p-1.5 text-white/90 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
              title={isMuted ? (isArabic ? "تشغيل الصوت" : "Unmute") : (isArabic ? "كتم الصوت" : "Mute")}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-1 sm:p-1.5 text-white/90 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
              title={isFullscreen ? (isArabic ? "إنهاء ملء الشاشة" : "Exit Fullscreen") : (isArabic ? "ملء الشاشة" : "Fullscreen")}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm stroke-[2.2]" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Full-width Scrubber Progress Bar with White Knob */}
        <div
          ref={seekerRef}
          onClick={handleSeekClick}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
            updateSeekFromEvent(e.clientX);
          }}
          className="relative w-full py-1.5 cursor-pointer flex items-center group/seeker select-none"
        >
          {/* Track Bar Background */}
          <div className="w-full h-1 sm:h-1.2 bg-white/35 rounded-full overflow-hidden relative">
            {/* White Progress Fill */}
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>

          {/* White Circular Thumb Knob */}
          <div
            className="absolute top-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.5)] pointer-events-none transition-transform group-hover/seeker:scale-125"
            style={{
              left: `${Math.min(100, Math.max(0, progressPercentage))}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const router = useRouter();
  const { isArabic } = useLanguage();

  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination States
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("all");
  const [visiblePhotoCount, setVisiblePhotoCount] = useState<number>(12);
  const [photoSearch, setPhotoSearch] = useState<string>("");

  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("all");
  const [videoSearch, setVideoSearch] = useState<string>("");

  // Modals
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  // ── Auto-load from API ─────────────────────────────────────────
  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(({ images, videos }: { images: string[]; videos: string[] }) => {
        const mappedPhotos: PhotoItem[] = images.map((src, i) => {
          const cat = PHOTO_CAT_MAP[i % PHOTO_CAT_MAP.length];
          const proj = DEMO_PROJECTS[i % DEMO_PROJECTS.length];
          const srv = DEMO_SERVICES[i % DEMO_SERVICES.length];
          return {
            id: 101 + i,
            type: "photo",
            thumbnail: src,
            category: cat.key,
            categoryLabelEn: cat.labelEn,
            categoryLabelAr: cat.labelAr,
            serviceNameEn: srv.en,
            serviceNameAr: srv.ar,
            titleEn: proj.en,
            titleAr: proj.ar,
            locationEn: "Dubai, UAE",
            locationAr: "دبي، الإمارات",
          };
        });

        const mappedVideos: VideoItem[] = videos.map((src, i) => {
          const cat = PHOTO_CAT_MAP[i % PHOTO_CAT_MAP.length];
          const proj = DEMO_PROJECTS[i % DEMO_PROJECTS.length];
          const srv = DEMO_SERVICES[i % DEMO_SERVICES.length];
          return {
            id: 1 + i,
            type: "video",
            thumbnail: images.length > 0 ? images[i % images.length] : src,
            videoSrc: src,
            category: cat.key,
            categoryLabelEn: cat.labelEn,
            categoryLabelAr: cat.labelAr,
            titleEn: proj.en,
            titleAr: proj.ar,
            duration: "1:45",
            locationEn: srv.en,
            locationAr: srv.ar,
          };
        });

        setPhotoItems(mappedPhotos);
        setVideoItems(mappedVideos);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Filtered Photos ──────────────────────────────────────────
  const filteredPhotos = useMemo(() => {
    let result = photoItems;
    if (selectedPhotoCategory !== "all") {
      result = result.filter((p) => p.category === selectedPhotoCategory);
    }
    return result;
  }, [photoItems, selectedPhotoCategory]);

  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visiblePhotoCount);
  }, [filteredPhotos, visiblePhotoCount]);

  // ── Filtered & Displayed Videos ──────────────────────────────
  const filteredVideos = useMemo(() => {
    let result = videoItems;
    if (selectedVideoCategory !== "all") {
      result = result.filter((v) => v.category === selectedVideoCategory);
    }
    if (videoSearch.trim()) {
      const q = videoSearch.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.titleEn.toLowerCase().includes(q) ||
          v.titleAr.includes(q) ||
          v.categoryLabelEn.toLowerCase().includes(q) ||
          v.categoryLabelAr.includes(q) ||
          v.locationEn.toLowerCase().includes(q) ||
          v.locationAr.includes(q)
      );
    }
    return result;
  }, [videoItems, selectedVideoCategory, videoSearch]);

  const videoColumns = useMemo(() => {
    const cols: VideoItem[][] = [];
    for (let i = 0; i < filteredVideos.length; i += 2) {
      cols.push(filteredVideos.slice(i, i + 2));
    }
    return cols;
  }, [filteredVideos]);

  // ── Video Gallery Slider Scroll & Controls ────────────────────
  const videoSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoSliderRef.current) {
      videoSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedVideoCategory]);

  const scrollVideos = (direction: "left" | "right") => {
    if (videoSliderRef.current) {
      const container = videoSliderRef.current;
      const col = container.querySelector<HTMLElement>(".video-gallery-col");
      const colWidth = col ? col.offsetWidth : 330;
      const scrollStep = colWidth + 24; // column width + gap
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollStep : factor * scrollStep;

      container.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

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

  // ── Photo Gallery Slider Scroll & Controls ────────────────────
  const photoSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updatePhotoScroll = () => {
    if (photoSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = photoSliderRef.current;
      setCanScrollLeft(Math.abs(scrollLeft) > 10);
      setCanScrollRight(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = photoSliderRef.current;
    if (el) {
      el.addEventListener("scroll", updatePhotoScroll);
      window.addEventListener("resize", updatePhotoScroll);
      updatePhotoScroll();
      return () => {
        el.removeEventListener("scroll", updatePhotoScroll);
        window.removeEventListener("resize", updatePhotoScroll);
      };
    }
  }, [filteredPhotos]);

  useEffect(() => {
    if (photoSliderRef.current) {
      photoSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedPhotoCategory, photoSearch]);

  const scrollPhotos = (direction: "left" | "right") => {
    if (photoSliderRef.current) {
      const container = photoSliderRef.current;
      const card = container.querySelector<HTMLElement>(".photo-gallery-slide");
      const cardWidth = card ? card.offsetWidth : 330;
      const scrollStep = cardWidth + 24; // width + gap
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollStep : factor * scrollStep;

      container.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
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
          1. HERO HEADER SECTION (Media)
      ══════════════════════════════════════════════════════════════ */}
      <CommonHeader
        imagePath="/banners/new/media.png"
        showHeading={false}
        showBreadcrumb={false}
        unoptimized
      />

      {/* ══════════════════════════════════════════════════════════════
          OUR PROJECTS SECTION (From Landing Page)
      ══════════════════════════════════════════════════════════════ */}
      <OurProjectsSection />

      {/* ══════════════════════════════════════════════════════════════
          SERVICES SECTION (Custom Media Order: GRP, Epoxy, Bitumen, Polyurea, Injection, Combo)
      ══════════════════════════════════════════════════════════════ */}
      {/* <ProtectionServicesSection servicesOrder={[1, 3, 4, 5, 6, 2]} /> */}

      {/* ══════════════════════════════════════════════════════════════
          SOLUTIONS LISTING SECTION (6 Specific Solutions from Solutions Page)
      ══════════════════════════════════════════════════════════════ */}
      {/* <SolutionsListingSection /> */}

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

          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {PHOTO_CATEGORIES.map((cat) => {
                const isActive = selectedPhotoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedPhotoCategory(cat.id);
                      setVisiblePhotoCount(12);
                    }}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                      ? "bg-[#00a89a] text-white shadow-md shadow-[#00a89a]/30 scale-100"
                      : "bg-white text-[#0B1C24] hover:text-[#00a89a] border border-slate-200/90 shadow-xs hover:border-[#00a89a]"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Carousel Controls (Placed at place of search bar, matching project standard carousel controls) */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => scrollPhotos("left")}
                aria-label={isArabic ? "السابق" : "Previous Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollPhotos("right")}
                aria-label={isArabic ? "التالي" : "Next Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="flex gap-5 sm:gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] aspect-[16/10] bg-white/40 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          )}

          {/* Photo Slider Carousel (with NO slider dots) */}
          {!loading && filteredPhotos.length > 0 && (
            <div className="relative group/carousel">
              {/* Horizontal Scroll Track */}
              <div
                ref={photoSliderRef}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 sm:gap-6 pb-4 pt-1 px-0.5 no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => router.push("/services")}
                    className="photo-gallery-slide flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] snap-start flex flex-col group cursor-pointer"
                  >
                    {/* Clean Image Container (Landscape Rectangle Shape) */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 shadow-md group-hover:border-[#00c4b4]/40 transition-all duration-300">
                      <Image
                        src={photo.thumbnail}
                        alt={isArabic ? photo.titleAr : photo.titleEn}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 290px, (max-width: 1024px) 380px, 410px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300" />

                      {/* Hover Center Action Buttons (Preview & View Details) */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-2.5 z-20 px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        {/* Preview Option */}
                        {/* <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPhoto(photo);
                          }}
                          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/70 hover:bg-[#00c4b4] text-white hover:text-[#0B1C24] text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md border border-white/30 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                          title={isArabic ? "معاينة" : "Preview"}
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                          <span>{isArabic ? "معاينة" : "Preview"}</span>
                        </button> */}

                        {/* View Details Option (Takes to Services) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/services");
                          }}
                          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#00a89a] hover:bg-[#008f83] text-white text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md border border-white/30 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                          title={isArabic ? "عرض التفاصيل" : "View Details"}
                        >
                          <span>{isArabic ? "عرض التفاصيل" : "View Details"}</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] rtl:rotate-180 shrink-0" />
                        </button>
                      </div>
                    </div>

                    {/* Heading and subtitle OUTSIDE the card (Matching Attached Design) */}
                    <div className="mt-3.5 sm:mt-4 flex flex-col text-left rtl:text-right">
                      {/* Smaller Gray Service Name */}
                      <span className="text-xs sm:text-[13px] text-[#00a89a] font-medium tracking-wide truncate">
                        {isArabic ? (photo.serviceNameAr || photo.categoryLabelAr) : (photo.serviceNameEn || photo.categoryLabelEn)}
                      </span>

                      {/* White Bold Project Name */}
                      <h3
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("/project");
                        }}
                        className="mt-1 text-sm sm:text-base font-bold text-black group-hover:text-[#00DDCF] transition-colors leading-snug truncate"
                      >
                        <Link
                          href="/project"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/project");
                          }}
                          className="hover:underline"
                        >
                          {isArabic ? photo.titleAr : photo.titleEn}
                        </Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPhotos.length === 0 && (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/80 max-w-md mx-auto">
              <Camera className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-[#0B1C24]">
                {isArabic ? "لا توجد مشاريع في هذا القسم حالياً" : "No projects found in this category"}
              </p>
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

          {/* Filter Bar with Carousel Controls (Search removed, Carousel controls placed at right matching Image Gallery) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {VIDEO_CATEGORIES.map((cat) => {
                const isActive = selectedVideoCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedVideoCategory(cat.id);
                    }}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                      ? "bg-[#00a89a] text-white shadow-md shadow-[#00a89a]/30 scale-100"
                      : "bg-[#EEF8F8] text-[#1E3A47] hover:text-[#00a89a] border border-[#d6eeee]/70 shadow-xs hover:border-[#00a89a]"
                      }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Carousel Controls (Placed at place of search bar, matching project standard carousel controls) */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => scrollVideos("left")}
                aria-label={isArabic ? "السابق" : "Previous Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => scrollVideos("right")}
                aria-label={isArabic ? "التالي" : "Next Slide"}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
              >
                {isArabic ? (
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {/* Loading Skeleton (4 columns of 2 rows each) */}
          {loading && (
            <div className="flex gap-5 sm:gap-6 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col gap-5 sm:gap-6 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px]"
                >
                  <div className="w-full aspect-video bg-white/40 animate-pulse border border-slate-200/60" />
                  <div className="w-full aspect-video bg-white/40 animate-pulse border border-slate-200/60" />
                </div>
              ))}
            </div>
          )}

          {/* Video Slider Carousel (2 Rows Layout, with NO slider dots) */}
          {!loading && videoColumns.length > 0 && (
            <div className="relative group/carousel">
              {/* Horizontal Scroll Track */}
              <div
                ref={videoSliderRef}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 sm:gap-6 pb-4 pt-1 px-0.5 no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {videoColumns.map((col, colIdx) => (
                  <div
                    key={colIdx}
                    className="video-gallery-col flex-shrink-0 flex flex-col gap-5 sm:gap-6 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] snap-start"
                  >
                    {col.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        isArabic={isArabic}
                        onOpenModal={(v) => setActiveVideo(v)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredVideos.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/60 max-w-md mx-auto">
              <Film className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">
                {isArabic ? "لا توجد فيديوهات في هذا القسم حالياً" : "No videos found in this category"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LATEST NEWS SECTION (Layout Reference)
      ══════════════════════════════════════════════════════════════ */}
      {/* <MediaLatestNewsSection /> */}

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
                className={`absolute inset-0 sm:max-w-xl pointer-events-none ${isArabic
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
      <section className="relative w-full min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] flex items-center bg-[#052b36] overflow-hidden">
        {/* Background Image with Worker Coating Roof at Sunset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mediaPageNew/CallToActionSection.png"
            alt="Waterproofing Project CTA Banner"
            fill
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right"}`}
          />
          {/* Gentle directional dark gradient overlay to ensure crisp readability */}
          <div
            className={`absolute inset-0 ${isArabic
              ? "bg-gradient-to-l from-[#021820]/90 via-[#021820]/60 sm:via-transparent to-transparent"
              : "bg-gradient-to-r from-[#021820]/90 via-[#021820]/60 sm:via-transparent to-transparent"
              }`}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-12 sm:py-16 md:py-20">
          <div className="max-w-lg lg:max-w-xl">
            {/* Tagline: — NEED EXPERT HELP? — */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-5 sm:w-6 h-[2px] bg-white/70 inline-block" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                {isArabic ? "هل تحتاج مساعدة خبير؟" : "NEED EXPERT HELP?"}
              </span>
              <span className="w-5 sm:w-6 h-[2px] bg-white/70 inline-block" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-black text-white tracking-tight leading-[1.18] mb-3">
              {isArabic ? "هل لديك مشروع عزل مائي؟" : "Have a Waterproofing Project?"}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-white/85 leading-relaxed font-normal mb-6 sm:mb-8 max-w-md">
              {isArabic
                ? "من العزل المائي إلى الطلاءات الواقية، فريقنا ذو الخبرة مستعد لتقديم الحل المناسب لمشروعك."
                : "From waterproofing to protective coatings, our experienced team is ready to provide the right solution for your project."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/get-a-quote"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#00a89a] hover:bg-[#009386] text-white font-bold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2.5 sm:gap-3 shadow-lg shadow-[#00a89a]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap group"
              >
                <span>{isArabic ? "طلب عرض أسعار مجاني" : "Get a Free Quote"}</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#00a89a] flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className={`w-3.5 h-3.5 stroke-[2.5] ${isArabic ? "rotate-180" : ""}`} />
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsWelcomeModalOpen(true)}
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#032e36]/70 hover:bg-[#032e36]/90 text-white border border-[#00a89a]/70 font-bold text-xs sm:text-sm tracking-wide inline-flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{isArabic ? "تحدث مع خبرائنا" : "Talk to Our Experts"}</span>
              </button>
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
                controlsList="nodownload noplaybackrate"
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

      {/* ══════════════════════════════════════════════════════════════
          WELCOME OFFER MODAL (Talk to Our Experts)
      ══════════════════════════════════════════════════════════════ */}
      <WelcomeOfferModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        autoShow={false}
      />

    </div>
  );
}
