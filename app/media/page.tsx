"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight, Film, Camera } from "lucide-react";

interface MediaItem {
  id: number;
  type: "video" | "photo";
  thumbnail: string;
  videoSrc?: string;
}

export default function MediaPage() {
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "photo">("video");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [photoItems, setPhotoItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // ── Auto-load files from API ─────────────────────────────────
  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(({ images, videos }: { images: string[]; videos: string[] }) => {
        setMediaItems(
          videos.map((src, i) => ({ id: i + 1, type: "video", thumbnail: src, videoSrc: src }))
        );
        setPhotoItems(
          images.map((src, i) => ({ id: 101 + i, type: "photo", thumbnail: src }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const currentList = activeMediaTab === "video" ? mediaItems : photoItems;

  const handleOpenPhoto = (item: MediaItem, index: number) => {
    setActivePhoto(item);
    setCurrentPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    const next = (currentPhotoIndex + 1) % photoItems.length;
    setCurrentPhotoIndex(next);
    setActivePhoto(photoItems[next]);
  };

  const handlePrevPhoto = () => {
    const prev = (currentPhotoIndex - 1 + photoItems.length) % photoItems.length;
    setCurrentPhotoIndex(prev);
    setActivePhoto(photoItems[prev]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveVideo(null); setActivePhoto(null); }
      else if (e.key === "ArrowRight" && activePhoto) handleNextPhoto();
      else if (e.key === "ArrowLeft" && activePhoto) handlePrevPhoto();
    };
    if (activeVideo || activePhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; window.removeEventListener("keydown", onKey); };
  }, [activeVideo, activePhoto, currentPhotoIndex]);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/banners/Media_.png" alt="Media" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-anek text-white tracking-tight mb-4 drop-shadow-md">
            Media
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto font-light drop-shadow">
            Explore our media showcasing completed projects, team moments, events, and behind-the-scenes highlights.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 sm:py-16">

        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-2">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-6 bg-[#01a9a0] rounded-full inline-block" />
              <h2 className="text-2xl sm:text-3xl font-bold font-anek text-gray-900 tracking-tight">Media</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Waterproofing is the fundamental pillar for preserving the lifespan of any building. At Taj Alrahmah, we don&apos;t just offer insulation;
            </p>
          </div>

          {/* Photo / Video toggle */}
          <div className="flex items-center justify-start md:justify-end">
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-gray-200/80 shadow-xs">
              <button
                onClick={() => setActiveMediaTab("photo")}
                className={`py-1.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === "photo" ? "bg-[#01a9a0] text-white shadow-xs" : "bg-[#e0f7f6] text-[#01a9a0] hover:bg-[#cbf1ef]"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Photo
                {!loading && <span className="ml-1 text-[10px] opacity-70">({photoItems.length})</span>}
              </button>
              <button
                onClick={() => setActiveMediaTab("video")}
                className={`ml-1.5 py-1.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === "video" ? "bg-[#01a9a0] text-white shadow-xs" : "bg-[#e0f7f6] text-[#01a9a0] hover:bg-[#cbf1ef]"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                Video
                {!loading && <span className="ml-1 text-[10px] opacity-70">({mediaItems.length})</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-stone-100 animate-pulse" />
            ))}
          </div>
        )}

        {/* Media grid */}
        {!loading && (
          currentList.length === 0 ? (
            <div className="flex items-center justify-center py-24 text-stone-400">
              <p className="text-lg font-medium">No {activeMediaTab === "video" ? "videos" : "photos"} found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {currentList.map((item, index) => {
                const isVideo = item.type === "video";
                return (
                  <div
                    key={item.id}
                    onClick={() => isVideo ? setActiveVideo(item) : handleOpenPhoto(item, index)}
                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/60"
                  >
                    {isVideo ? (
                      <div className="relative w-full h-full bg-black">
                        <video
                          src={`${item.videoSrc}#t=0.001`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#00968e] transition-all duration-300">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.thumbnail}
                        alt="Media item"
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}
      </section>

      {/* ── VIDEO MODAL ───────────────────────────────────────── */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: 99999 }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-[#01a9a0] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-video w-full bg-black">
              <video src={activeVideo.videoSrc} controls autoPlay playsInline className="w-full h-full object-contain">
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ── PHOTO LIGHTBOX ────────────────────────────────────── */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: 99999 }}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-[#01a9a0] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black">
              <Image src={activePhoto.thumbnail} alt="Media photo" fill unoptimized className="object-contain" priority />
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#01a9a0] text-white flex items-center justify-center transition-all cursor-pointer z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#01a9a0] text-white flex items-center justify-center transition-all cursor-pointer z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium bg-black/50 px-2.5 py-1 rounded-full">
              {currentPhotoIndex + 1} / {photoItems.length}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
