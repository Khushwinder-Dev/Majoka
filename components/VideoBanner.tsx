"use client";

import React, { useRef, useState, useEffect } from "react";

const VideoBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{
        height: "100svh",
        minHeight: "400px",
        maxHeight: "100vh",
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/Hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Dark gradient overlay — subtle, lets video breathe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Bottom fade for smooth transition into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Mute / Unmute Button — bottom-right */}
      <button
        id="video-banner-mute-toggle"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.25)",
          transition: "background 0.2s ease, transform 0.15s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.22)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.12)";
        }}
      >
        {isMuted ? (
          // Muted icon (speaker with X)
          <>
            <svg
              className="w-5 h-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span className="hidden sm:inline">Unmute</span>
          </>
        ) : (
          // Unmuted icon (speaker with waves)
          <>
            <svg
              className="w-5 h-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span className="hidden sm:inline">Mute</span>
          </>
        )}
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70">
        <span className="text-white text-xs tracking-widest uppercase font-medium hidden sm:block">
          Scroll
        </span>
        <div
          className="w-0.5 bg-white rounded-full"
          style={{
            height: "32px",
            animation: "scrollPulse 1.6s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.6);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
};

export default VideoBanner;
