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
      {/* Mint gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8f1ec 0%, #d4e4dc 50%, #c8dcd4 100%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* ========================================== */}
        {/* SECTION 1: NEWSLETTER SUBSCRIPTION BANNER */}
        {/* ========================================== */}
        <section className="py-10 sm:py-12 lg:py-14 border-b border-[#01a9a0]/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
            {/* Left: Icon + Text */}
            <div className="flex items-start gap-4 sm:gap-5 lg:gap-6 flex-1 max-w-2xl">
              {/* Teal envelope icon */}
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-[#01a9a0]/15 flex items-center justify-center">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-[#01a9a0]" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  {t.footer.newsletter.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-[15px] text-stone-600 leading-relaxed">
                  {t.footer.newsletter.description}
                </p>
              </div>
            </div>

            {/* Right: Email input with pill shape + teal submit button */}
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto lg:min-w-[460px] xl:min-w-[520px]"
            >
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full h-12 sm:h-14 rounded-full bg-white pl-5 sm:pl-6 pr-16 sm:pr-20 text-stone-800 text-sm sm:text-base placeholder:text-stone-400 border-2 border-transparent focus:border-[#01a9a0]/60 shadow-[0_4px_20px_rgba(1,169,160,0.08)] focus:shadow-[0_6px_24px_rgba(1,169,160,0.15)] outline-none transition-all duration-300 font-anek"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`absolute top-1/2 ${isArabic ? "left-1.5 sm:left-2" : "right-1.5 sm:right-2"} -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#01a9a0]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed`}
                  aria-label={t.footer.newsletter.subscribe}
                >
                  <ArrowRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] ${isArabic ? "rotate-180" : ""} ${isSubmitting ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 2: MAIN FOOTER — 5 COLUMNS */}
        {/* ========================================== */}
        <section className="py-12 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 xl:gap-12">
            {/* ---------------- */}
            {/* COLUMN 1: BRAND */}
            {/* ---------------- */}
            <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 flex flex-col gap-6">
              {/* Logo + Tagline */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src="/TajAlrahmanlogo.png"
                    alt="Taj Al Rahmah Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl sm:text-2xl font-extrabold text-stone-900">
                    {t.footer.tagline1}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[#01a9a0]">
                    {t.footer.tagline2}
                  </span>
                </div>
              </div>

              {/* Company description */}
              <p className="text-[14px] sm:text-[15px] text-stone-600 leading-relaxed max-w-md">
                {t.footer.companyDescription}
              </p>

              {/* Social media icons — row of teal circles */}
              <div className="flex items-center gap-2.5 sm:gap-3 pt-2">
                {/* Facebook */}
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </Link>
                {/* Instagram */}
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-stone-50 text-stone-600 hover:text-[#01a9a0] border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </Link>
                {/* Twitter/X */}
                <Link
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-stone-50 text-stone-600 hover:text-[#01a9a0] border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </Link>
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-stone-50 text-stone-600 hover:text-[#01a9a0] border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </Link>
                {/* YouTube */}
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-stone-50 text-stone-600 hover:text-[#01a9a0] border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>

            {/* ---------------- */}
            {/* COLUMN 2: SERVICES */}
            {/* ---------------- */}
            <div className="flex flex-col gap-5">
              <FooterHeading title={t.footer.servicesTitle} />
              <ul className="flex flex-col gap-3.5">
                {t.footer.servicesLinks.map((link, i) => (
                  <li key={i}>
                    <FooterLink
                      href={servicesHrefs[i] || "/services"}
                      label={link}
                    />
                  </li>
                ))}
                {/* Explore More — slightly different style */}
                <li className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-[#01a9a0] hover:text-[#00817a] font-bold text-sm sm:text-[15px] transition-colors group"
                  >
                    <ArrowRight
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                      strokeWidth={2.5}
                    />
                    <span className="whitespace-nowrap">{t.footer.exploreMore}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* ---------------- */}
            {/* COLUMN 3: RESOURCES */}
            {/* ---------------- */}
            <div className="flex flex-col gap-5">
              <FooterHeading title={t.footer.resourcesTitle} />
              <ul className="flex flex-col gap-3.5">
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
            <div className="flex flex-col gap-5">
              <FooterHeading title={t.footer.companyTitle} />
              <ul className="flex flex-col gap-3.5">
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
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
              <FooterHeading title={t.footer.contactTitle} />
              <ul className="flex flex-col gap-4.5">
                {/* Phones */}
                <ContactRow
                  icon={
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
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
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
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
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                  }
                >
                  <span className="whitespace-pre-line leading-relaxed">
                    {t.footer.location}
                  </span>
                </ContactRow>

                {/* Working Hours */}
                <ContactRow
                  icon={
                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                  }
                >
                  <span className="leading-relaxed">{t.footer.workingHours}</span>
                  <span className="text-stone-500 italic text-sm">
                    {t.footer.closedDay}
                  </span>
                </ContactRow>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 3: BOTTOM BAR — Copyright + Scroll Top + App Badges */}
        {/* ========================================== */}
        <section className="py-6 sm:py-7 border-t border-[#01a9a0]/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Left: Copyright */}
            <p className="text-sm sm:text-[15px] text-stone-600 text-center sm:text-left font-medium">
              {t.footer.copyright}
            </p>

            {/* Center: Scroll to top */}
            <div className="flex items-center justify-center order-first sm:order-none">
              <button
                onClick={scrollToTop}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-lg shadow-[#01a9a0]/30 hover:shadow-xl hover:shadow-[#01a9a0]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                aria-label={t.footer.scrollToTop}
                title={t.footer.scrollToTop}
              >
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Right: App store badges */}
            <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-3">
              {/* Google Play */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Google Play"
              >
                <div className="flex items-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3 bg-black rounded-[8px] hover:bg-stone-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
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
                  <div className="flex flex-col items-start text-white leading-tight">
                    <span className="text-[9px] sm:text-[10px] opacity-90">
                      GET IT ON
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold">
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
                <div className="flex items-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3 bg-black rounded-[8px] hover:bg-stone-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-white">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="flex flex-col items-start text-white leading-tight">
                    <span className="text-[9px] sm:text-[10px] opacity-90">
                      Download on the
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold">
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
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
        {title}
      </h4>
      <div className="w-14 h-[3px] bg-[#01a9a0] rounded-full" />
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const { isArabic } = useLanguage();
  return (
    <Link
      href={href}
      className="flex items-start gap-2 text-[14px] sm:text-[15px] text-stone-700 hover:text-[#01a9a0] font-medium transition-all duration-200 group leading-snug"
    >
      <ArrowRight
        className={`w-3.5 h-3.5 text-[#01a9a0] flex-shrink-0 mt-[5px] transition-transform duration-200 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
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
    <li className="flex items-start gap-3.5">
      {/* Teal circle icon */}
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#01a9a0]/30 bg-white flex items-center justify-center text-[#01a9a0]">
        {icon}
      </div>
      {/* Stacked values */}
      <div className="flex flex-col gap-1 pt-1 text-[14px] sm:text-[15px] text-stone-700 font-medium min-w-0">
        {children}
      </div>
    </li>
  );
}
