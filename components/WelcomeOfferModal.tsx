"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

// Set to false after the client demo to restore once-per-session behavior.
const SHOW_ON_EVERY_RELOAD = true;
const DISMISS_KEY = "taj_welcome_modal_dismissed";

export default function WelcomeOfferModal() {
  const { isArabic } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isDismissed =
      !SHOW_ON_EVERY_RELOAD && sessionStorage.getItem(DISMISS_KEY);
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (!SHOW_ON_EVERY_RELOAD) {
      sessionStorage.setItem(DISMISS_KEY, "true");
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error(
        isArabic
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address"
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate submission or send to newsletter/contact API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      toast.success(
        isArabic
          ? "شكراً لاشتراكك! تم تطبيق كود الخصم 10%."
          : "Thank you for subscribing! Your 10% discount code has been applied."
      );
      if (!SHOW_ON_EVERY_RELOAD) {
        sessionStorage.setItem(DISMISS_KEY, "true");
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch {
      toast.error(
        isArabic ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={handleClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label={isArabic ? "إغلاق" : "Close"}
          className={`absolute top-3.5 ${isArabic ? "left-3.5 sm:left-5" : "right-3.5 sm:right-5"
            } sm:top-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00A79D] hover:bg-[#008f86] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* ========================================= */}
        {/* LEFT COLUMN: HERO IMAGE                    */}
        {/* ========================================= */}
        <div className="relative md:col-span-5 h-52 sm:h-64 md:h-auto min-h-[220px] md:min-h-[440px] overflow-hidden bg-slate-900">
          <Image
            src="/media/welcompop.png"
            alt={isArabic ? "عرض خاص تاج الرحمة" : "Taj Al Rahmah Welcome Offer"}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to merge gracefully */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN: OFFER CONTENT & FORM         */}
        {/* ========================================= */}
        <div className="md:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-[#B8CAB6] to-[#9BCAC5]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
            <span className="w-6 sm:w-8 h-[2px] bg-black rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black">
              {isArabic ? "عرض الترحيب" : "WELCOME OFFER"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-black tracking-tight leading-[1.12] mb-3 sm:mb-4 uppercase">
            {isArabic ? (
              <>
                اشترك واحصل على <br />
                15% خصم على أول <br />
                خدمة لك
              </>
            ) : (
              <>
                SUBSCRIBE & GET <br />
                15% OFF YOUR FIRST <br />
                SERVICE
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-700 font-normal leading-relaxed mb-6 sm:mb-7 max-w-md">
            {isArabic
              ? "استمتع بخصم 15% على خدمتك الأولى وابق على اطلاع بأحدث العروض الحصرية، وأفكار المشاريع، ونصائح الخبراء، وأحدث حلول العزل والمقاولات."
              : "Enjoy 15% off your first service and stay updated with exclusive offers, project insights, expert tips, and the latest waterproofing and contracting solutions."}
          </p>

          {/* Form or Success State */}
          {isSubmitted ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-stone-900">
                  {isArabic ? "تم الاشتراك بنجاح!" : "Successfully Subscribed!"}
                </h4>
                <p className="text-xs text-stone-600">
                  {isArabic
                    ? "استخدم الكود WELCOME15 عند طلب الخدمة."
                    : "Use code WELCOME15 when booking your service."}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Pill Email Input */}
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isArabic ? "أدخل بريدك الإلكتروني" : "Your email address"
                  }
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white text-stone-900 placeholder-stone-400 px-6 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-[#00A79D] shadow-sm transition-all"
                />
              </div>

              {/* Pill Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00A79D] hover:bg-[#008f86] text-white font-bold py-3.5 sm:py-4 rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-75"
              >
                {isSubmitting
                  ? isArabic
                    ? "جاري الاشتراك..."
                    : "SUBSCRIBING..."
                  : isArabic
                    ? "اشترك الآن"
                    : "SUBSCRIBE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
