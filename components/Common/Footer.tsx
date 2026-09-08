"use client";

import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-hot-toast";

export default function Footer() {
  const { t, isArabic } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      toast.error(t.footer.newsletter.invalidMsg);
      return;
    }
    if (!isValidEmail(trimmed)) {
      toast.error(t.footer.newsletter.invalidMsg);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(t.footer.newsletter.successMsg);
      setEmail("");
    } catch {
      toast.error(t.footer.newsletter.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesHrefs = [
    "/services",
    "/services",
    "/services",
    "/services",
    "/services",
  ];

  const resourcesHrefs = [
    "/media",
    "/blogs",
    "/resources",
    "/resources",
    "/resources",
    "/resources",
  ];

  const companyHrefs = [
    "/about-us",
    "/about-us",
    "/about-us",
    "/about-us",
    "/career",
    "/contact",
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #e1ebe4 0%, #d5e6dd 30%, #c8dcd2 70%, #beddd1 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================== */}
        {/* SECTION 1: NEWSLETTER SUBSCRIPTION BANNER */}
        {/* ========================================== */}
        <section className="py-6 sm:py-7 lg:py-8 border-b border-[#01a9a0]/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 lg:gap-8">
            {/* Left: Icon + Text */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1 max-w-2xl">
              {/* Teal envelope icon */}
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#01a9a0]/15 flex items-center justify-center">
                <Mail
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#01a9a0]"
                  strokeWidth={1.8}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-stone-900 tracking-tight leading-tight">
                  {t.footer.newsletter.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  {t.footer.newsletter.description}
                </p>
              </div>
            </div>

            {/* Right: Email input with pill shape + teal submit button */}
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto lg:min-w-[340px] xl:min-w-[380px]"
            >
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full h-10 sm:h-11 rounded-full bg-white pl-4 sm:pl-5 pr-12 sm:pr-14 text-stone-800 text-xs sm:text-sm placeholder:text-stone-400 border-2 border-transparent focus:border-[#01a9a0]/60 shadow-[0_2px_12px_rgba(1,169,160,0.08)] focus:shadow-[0_4px_16px_rgba(1,169,160,0.15)] outline-none transition-all duration-300 font-anek"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`absolute top-1/2 ${isArabic ? "left-1 sm:left-1.5" : "right-1 sm:right-1.5"
                    } -translate-y-1/2 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] active:scale-95 text-white flex items-center justify-center shadow-md shadow-[#01a9a0]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed`}
                  aria-label={t.footer.newsletter.subscribe}
                >
                  <ArrowRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""
                      } ${isSubmitting ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 2: MAIN FOOTER — 5 COLUMNS */}
        {/* ========================================== */}
        <section className="py-8 sm:py-9 lg:py-10">
          <div className="grid grid-cols-12 gap-6 sm:gap-7 lg:gap-8">
            {/* ---------------- */}
            {/* COLUMN 1: BRAND  */}
            {/* ---------------- */}
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 flex flex-col gap-3.5 sm:gap-4">
              {/* Logo + Tagline */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <Image
                    src="/TajAlrahmanlogo.png"
                    alt="Taj Al Rahmah Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-base sm:text-lg font-extrabold text-stone-900">
                    {t.footer.tagline1}
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-[#01a9a0]">
                    {t.footer.tagline2}
                  </span>
                </div>
              </div>

              {/* Company description */}
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed max-w-md">
                {t.footer.companyDescription}
              </p>

              {/* Social media icons */}
              <div className="flex items-center gap-2 sm:gap-2.5 pt-1 flex-wrap">
                {/* Facebook — solid teal */}
                <Link
                  href="https://www.facebook.com/profile.php?id=100081089335552&mibextid=wwXIfr&rdid=87mK4XbMigWNKr3R&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C5jT8ztE2%2F%3Fmibextid%3DwwXIfr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white hover:bg-[#00c2b2] text-stone-500 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
                {/* Instagram — white + gray border + gray icon, teal on hover */}
                <Link
                  href="https://www.instagram.com/tajalrahmahtechnicalservices?igsh=czJkZmUybjk5czJ0&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white hover:bg-[#00c2b2] text-stone-500 hover:text-[#01a9a0] border border-stone-200 hover:border-[#01a9a0]/50 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>

                <Link
                  href="https://www.tiktok.com/@tajalrahmah.grpworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white hover:bg-[#00c2b2] text-stone-500 hover:text-[#01a9a0] border border-stone-200 hover:border-[#01a9a0]/50 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-3.77A4.793 4.793 0 0 1 15.5 2h-3.03v13.244a2.812 2.812 0 1 1-2.812-2.812c.294 0 .58.045.847.13v-3.1a5.93 5.93 0 1 0 5.001 5.782V8.91a7.78 7.78 0 0 0 4.083 1.154V7.03a4.79 4.79 0 0 1-4.083-2.187v1.843c.97.001 1.89.3 2.65.82l1.433-.82z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ------------------ */}
            {/* COLUMN 2: SERVICES */}
            {/* ------------------ */}
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-2 xl:col-span-2 flex flex-col gap-3">
              <FooterHeading title={t.footer.servicesTitle} />
              <ul className="flex flex-col gap-2 sm:gap-2.5">
                {t.footer.servicesLinks.map((link, i) => (
                  <li key={i}>
                    <FooterLink
                      href={servicesHrefs[i] || "/services"}
                      label={link}
                    />
                  </li>
                ))}
                {/* Explore More */}
                <li className="pt-1">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-[#01a9a0] hover:text-[#00817a] font-bold text-xs sm:text-[13px] transition-colors group"
                  >
                    <ArrowRight
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isArabic
                        ? "rotate-180 group-hover:-translate-x-1"
                        : ""
                        }`}
                      strokeWidth={2.5}
                    />
                    <span className="whitespace-nowrap">
                      {t.footer.exploreMore}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* ------------------- */}
            {/* COLUMN 3: RESOURCES */}
            {/* ------------------- */}
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-2 xl:col-span-2 flex flex-col gap-3">
              <FooterHeading title={t.footer.resourcesTitle} />
              <ul className="flex flex-col gap-2 sm:gap-2.5">
                {t.footer.resourcesLinks.map((link, i) => (
                  <li key={i}>
                    <FooterLink
                      href={resourcesHrefs[i] || "/resources"}
                      label={link}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------------- */}
            {/* COLUMN 4: COMPANY */}
            {/* ---------------- */}
            <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-2 xl:col-span-2 flex flex-col gap-3">
              <FooterHeading title={t.footer.companyTitle} />
              <ul className="flex flex-col gap-2 sm:gap-2.5">
                {t.footer.companyLinks.map((link, i) => (
                  <li key={i}>
                    <FooterLink
                      href={companyHrefs[i] || "/about-us"}
                      label={link}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------------- */}
            {/* COLUMN 5: CONTACT */}
            {/* ---------------- */}
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 flex flex-col gap-3">
              <FooterHeading title={t.footer.contactTitle} />
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {/* Phones */}
                <ContactRow
                  icon={
                    <Phone
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                    />
                  }
                >
                  <Link
                    href={`tel:${t.footer.phone1.replace(/\s/g, "")}`}
                    className="hover:text-[#01a9a0] transition-colors"
                  >
                    {t.footer.phone1}
                  </Link>
                  <Link
                    href={`tel:${t.footer.phone2.replace(/\s/g, "")}`}
                    className="hover:text-[#01a9a0] transition-colors"
                  >
                    {t.footer.phone2}
                  </Link>
                </ContactRow>

                {/* Emails */}
                <ContactRow
                  icon={
                    <Mail
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                    />
                  }
                >
                  <Link
                    href={`mailto:${t.footer.email1}`}
                    className="hover:text-[#01a9a0] transition-colors break-all"
                  >
                    {t.footer.email1}
                  </Link>
                  <Link
                    href={`mailto:${t.footer.email2}`}
                    className="hover:text-[#01a9a0] transition-colors break-all"
                  >
                    {t.footer.email2}
                  </Link>
                </ContactRow>

                {/* Location */}
                <ContactRow
                  icon={
                    <MapPin
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                    />
                  }
                >
                  <span className="whitespace-pre-line leading-relaxed">
                    {t.footer.location}
                  </span>
                </ContactRow>

                {/* Working Hours */}
                <ContactRow
                  icon={
                    <Clock
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                    />
                  }
                >
                  <span className="leading-relaxed">
                    {t.footer.workingHours}
                  </span>
                  <span className="text-stone-500 italic text-[11px] sm:text-xs">
                    {t.footer.closedDay}
                  </span>
                </ContactRow>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 3: BOTTOM BAR */}
        {/* ========================================== */}
        <section className="py-3.5 sm:py-4 border-t border-[#01a9a0]/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 md:gap-4">
            {/* Left: Copyright */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <p className="text-xs sm:text-[13px] text-stone-600 text-center md:text-start font-medium">
                {t.footer.copyright}
              </p>
            </div>

            {/* Center: Scroll to top */}
            <div className="order-1 md:order-2 flex items-center justify-center">
              <button
                onClick={scrollToTop}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-md shadow-[#01a9a0]/30 hover:shadow-lg hover:shadow-[#01a9a0]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                aria-label={t.footer.scrollToTop}
                title={t.footer.scrollToTop}
              >
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Right: App store badges */}
            <div className="order-3 flex items-center justify-center md:justify-end gap-2 sm:gap-2.5">
              {/* Google Play */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Google Play"
              >
                <div className="flex items-center gap-1.5 h-8 sm:h-8.5 px-2 sm:px-2.5 bg-black rounded-[6px] hover:bg-stone-900 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0"
                  >
                    <path
                      fill="#34A853"
                      d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M16.828 15.009L13.792 12l2.72-2.729 3.063 1.762a1 1 0 0 1 0 1.733l-3.047 1.752-.7-.009z"
                    />
                    <path
                      fill="#EA4335"
                      d="M3.609 1.814L11.125 9.56l5.252-2.922L3.609 1.814z"
                    />
                    <path
                      fill="#4285F4"
                      d="M3.61 22.186L16.377 17.36l-5.252-2.922L3.61 22.186z"
                    />
                  </svg>
                  <div
                    className={`flex flex-col items-start text-white leading-none ${isArabic ? "items-end" : "items-start"
                      }`}
                  >
                    <span className="text-[7.5px] sm:text-[8.5px] opacity-90">
                      {isArabic ? "احصل عليه على" : "GET IT ON"}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold">
                      Google Play
                    </span>
                  </div>
                </div>
              </Link>

              {/* App Store */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="App Store"
              >
                <div className="flex items-center gap-1.5 h-8 sm:h-8.5 px-2 sm:px-2.5 bg-black rounded-[6px] hover:bg-stone-900 transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white flex-shrink-0"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div
                    className={`flex flex-col text-white leading-none ${isArabic ? "items-end" : "items-start"
                      }`}
                  >
                    <span className="text-[7.5px] sm:text-[8.5px] opacity-90">
                      {isArabic ? "قم بالتحميل على" : "Download on the"}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold">
                      App Store
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

/* ============================================================
   REUSABLE SUBCOMPONENTS — Heading, Link, ContactRow
   ============================================================ */

function FooterHeading({ title }: { title: string }) {
  const { isArabic } = useLanguage();
  return (
    <div className="flex flex-col gap-1.5">
      <h4 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
        {title}
      </h4>
      <div
        className={`w-10 h-[2px] bg-[#01a9a0] rounded-full ${isArabic ? "mr-0 ml-auto" : ""
          }`}
      />
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const { isArabic } = useLanguage();
  return (
    <Link
      href={href}
      className="flex items-start gap-1.5 text-xs sm:text-[13px] text-stone-700 hover:text-[#01a9a0] font-medium transition-all duration-200 group leading-snug"
    >
      <ArrowRight
        className={`w-3 h-3 text-[#01a9a0] flex-shrink-0 mt-[3px] transition-transform duration-200 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
          }`}
        strokeWidth={2.5}
      />
      <span className="break-words">{label}</span>
    </Link>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <div className="flex-shrink-0 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-500 shadow-sm hover:shadow-md hover:border-[#01a9a0]/40 hover:text-[#01a9a0] transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 pt-0.5 text-xs sm:text-[13px] text-stone-700 font-medium min-w-0">
        {children}
      </div>
    </li>
  );
}
