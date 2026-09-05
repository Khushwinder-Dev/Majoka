"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ChevronLeft, ChevronRight, Eye, Film, Camera } from "lucide-react";

interface MediaItem {
  id: number;
  type: "video" | "photo";
  title?: string;
  category?: string;
  thumbnail: string;
  videoSrc?: string;
  description?: string;
}

// Media Videos from public/media/videos
const videoFilenames = [
  "WhatsApp Video 2026-09-05 at 11.26.37 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.26.37 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.18 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.19 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.37 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.42 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.43 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.44 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.44 PM (2).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.44 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.45 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.45 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.46 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.47 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.47 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.48 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.48 PM.mp4",
  "WhatsApp Video 2026-09-05 at 11.58.49 PM (1).mp4",
  "WhatsApp Video 2026-09-05 at 11.58.49 PM.mp4",
];

const mediaItems: MediaItem[] = videoFilenames.map((filename, index) => ({
  id: index + 1,
  type: "video",
  thumbnail: `/media/videos/${filename}`,
  videoSrc: `/media/videos/${filename}`,
}));

// Media Images from public/media/Images
const photoFilenames = [
  "WhatsApp Image 2026-09-05 at 11.30.18 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.30.28 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.30.36 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.30.50 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.31.07 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.31.24 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.31.46 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.32.06 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.32.26 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.33.18 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.33.33 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.33.53 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.34.45 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.35.11 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.36.49 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.37.02 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.37.14 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.37.31 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.37.48 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.38.27 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.38.41 PM.jpeg",
  "WhatsApp Image 2026-09-05 at 11.38.54 PM.jpeg",
];

const photoItems: MediaItem[] = photoFilenames.map((filename, index) => ({
  id: 101 + index,
  type: "photo",
  thumbnail: `/media/Images/${filename}`,
}));

export default function MediaPage() {
  // Toggle State: "video" (default as in screenshot) or "photo"
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "photo">("video");

  // Lightbox & Modal States
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // Filtered Items based on toggle
  const currentList = activeMediaTab === "video" ? mediaItems : photoItems;

  const handleOpenPhoto = (item: MediaItem, index: number) => {
    setActivePhoto(item);
    setCurrentPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    const nextIdx = (currentPhotoIndex + 1) % photoItems.length;
    setCurrentPhotoIndex(nextIdx);
    setActivePhoto(photoItems[nextIdx]);
  };

  const handlePrevPhoto = () => {
    const prevIdx = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
    setCurrentPhotoIndex(prevIdx);
    setActivePhoto(photoItems[prevIdx]);
  };

  // Lock body scroll when modal is open and support keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActivePhoto(null);
      } else if (e.key === "ArrowRight" && activePhoto) {
        handleNextPhoto();
      } else if (e.key === "ArrowLeft" && activePhoto) {
        handlePrevPhoto();
      }
    };

    if (activeVideo || activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo, activePhoto, currentPhotoIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/media/media-hero.jpg"
            alt="Media Showcase Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark Overlay matching reference image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-anek text-white tracking-tight mb-4 drop-shadow-md">
            Media
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto font-light drop-shadow">
            Explore our media showcasing completed projects, team moments, events, and behind-the-scenes highlights. Discover the quality of our work through every image.
          </p>
        </div>
      </section>

      {/* ===================== MAIN CONTENT SECTION ===================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 sm:py-16">
        {/* Header Bar: Left Title/Subtitle + Right Photo/Video Toggle Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-2">
          {/* Left Side: | Media Title and Description */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-6 bg-[#01a9a0] rounded-full inline-block" />
              <h2 className="text-2xl sm:text-3xl font-bold font-anek text-gray-900 tracking-tight">
                Media
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Waterproofing is the fundamental pillar for preserving the lifespan of any building. At Taj Alrahmah, we don’t just offer insulation;
            </p>
          </div>

          {/* Right Side: Toggle Button (Photo vs Video) */}
          <div className="flex items-center justify-start md:justify-end">
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-gray-200/80 shadow-xs">
              {/* Photo Button */}
              <button
                onClick={() => setActiveMediaTab("photo")}
                className={`py-1.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeMediaTab === "photo"
                  ? "bg-[#01a9a0] text-white shadow-xs"
                  : "bg-[#e0f7f6] text-[#01a9a0] hover:bg-[#cbf1ef]"
                  }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Photo
              </button>

              {/* Video Button */}
              <button
                onClick={() => setActiveMediaTab("video")}
                className={`ml-1.5 py-1.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${activeMediaTab === "video"
                  ? "bg-[#01a9a0] text-white shadow-xs"
                  : "bg-[#e0f7f6] text-[#01a9a0] hover:bg-[#cbf1ef]"
                  }`}
              >
                <Film className="w-3.5 h-3.5" />
                Video
              </button>
            </div>
          </div>
        </div>

        {/* ===================== MEDIA GRID (4-COLUMNS) ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {currentList.map((item, index) => {
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVideo) {
                    setActiveVideo(item);
                  } else {
                    handleOpenPhoto(item, index);
                  }
                }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/60"
              >
                {/* Media Content */}
                {isVideo ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={`${item.videoSrc}#t=0.001`}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Centered Play Button (for Video items matching reference screenshot) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#00968e] transition-all duration-300">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.thumbnail}
                    alt="Media item"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== VIDEO PLAYER MODAL ===================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          style={{ zIndex: 99999 }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                src={activeVideo.videoSrc || "/Hero.mp4"}
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

      {/* ===================== PHOTO LIGHTBOX MODAL ===================== */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          style={{ zIndex: 99999 }}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Main Photo Display with Navigation Arrows */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
              <Image
                src={activePhoto.thumbnail}
                alt="Media photo"
                fill
                className="object-contain"
                priority
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/15 hover:scale-105 shadow-md z-20"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/15 hover:scale-105 shadow-md z-20"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
