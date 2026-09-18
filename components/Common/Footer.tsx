"use client";

import React, { useState } from "react";
import {
  Facebook, Instagram, Linkedin, Youtube, Twitter,
  ArrowRight, ArrowLeft, ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-hot-toast";

// ─── href maps ────────────────────────────────────────────────────────────────
const servicesHrefs = [
  "/services?service=1&sub=grp-fiberglass-waterproofing",
  "/services?service=1&sub=combo-system-roof-waterproofing",
  "/services?service=1&sub=epoxy-floor-coating",
  "/services?service=1&sub=bitumen-membrane-waterproofing",
  "/services?service=1&sub=polyurea-coating-waterproofing",
  "/services",
];

const resourcesHrefs = [
  "/media",
  "/blogs",
  "/resources",
  "/blogs",
  "/contact",
  "/contact",
];

const companyHrefs = [
  "/about-us",
  "/certifications",
  "/media",
  "/blogs",
  "/career",
  "/contact",
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function FooterHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2 mb-1">
      <h4 className="text-base sm:text-[17px] font-bold text-stone-900 tracking-tight">{title}</h4>
      <div className="w-10 h-[2px] bg-[#01a9a0] rounded-full" />
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const { isArabic } = useLanguage();
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm text-stone-600 hover:text-[#01a9a0] font-normal transition-colors duration-200 group leading-snug"
    >
      <ArrowRight
        className={`w-3 h-3 text-[#01a9a0] flex-shrink-0 transition-transform duration-200 ${
          isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
        strokeWidth={2.5}
      />
      <span>{label}</span>
    </Link>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#01a9a0] flex items-center justify-center shadow-md">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 text-sm text-stone-700 font-normal min-w-0">
        {children}
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const { t, isArabic } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      toast.error(t.footer.newsletter.invalidMsg);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success(t.footer.newsletter.successMsg);
      setEmail("");
    } catch {
      toast.error(t.footer.newsletter.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resources labels from reference design
  const resourcesLabels = isArabic
    ? ["الوسائط", "الأخبار", "الأسئلة الشائعة", "المدونة", "الدعم", "الضمان"]
    : ["Media", "News", "FAQs", "Blog", "Support", "Warranty"];

  // Company labels — use translation
  const companyLabels = isArabic
    ? ["عن الشركة", "الخبرة", "الشهادات", "وظائف", "اتصل بنا", "المقاولون من الباطن"]
    : ["About Us", "Expertise", "Certifications", "Careers", "Contact", "Subcontract"];

  const socialLinks = [
    { href: "https://www.facebook.com/profile.php?id=100081089335552", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/tajalrahmahtechnicalservices", Icon: Instagram, label: "Instagram" },
    { href: "https://x.com/tajalrahmah", Icon: Twitter, label: "X" },
    { href: "https://www.linkedin.com/company/tajalrahmah", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.youtube.com/@tajalrahmah", Icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="relative w-full overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════
          NEWSLETTER STRIP — newsletterbg.jpg
          ══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/newsletterbg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Light overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/55 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">

            {/* Left: icon + text */}
            <div className="flex items-start gap-4 flex-1 max-w-xl">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                <Image
                  src="/footerIcon/newsletterEmailIcon.svg"
                  alt="Newsletter"
                  width={32}
                  height={32}
                  unoptimized
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight mb-1">
                  {t.footer.newsletter.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t.footer.newsletter.description}
                </p>
              </div>
            </div>

            {/* Right: email input */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto lg:min-w-[380px]">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-white border border-stone-200 pl-5 pr-14 text-stone-800 text-sm placeholder:text-stone-400 focus:border-[#01a9a0]/50 focus:outline-none shadow-sm transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-1.5" : "right-1.5"} w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#00968e] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-60 cursor-pointer`}
                  aria-label={t.footer.newsletter.subscribe}
                >
                  <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isArabic ? "rotate-180" : ""} ${isSubmitting ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN FOOTER BODY — footerBg.jpg
          ══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/footerBg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-[#021f1e]/30 pointer-events-none hidden" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── 5-column grid ───────────────────────────────────────────── */}
          <div className="pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12">
            <div className="grid grid-cols-12 gap-8 lg:gap-6 xl:gap-8">

              {/* COL 1 — Brand */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-5">
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image src="/logo.png" alt="Taj Al Rahmah Logo" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-base sm:text-lg font-extrabold text-stone-900">{t.footer.tagline1}</span>
                    <span className="text-sm sm:text-base font-bold text-[#01a9a0]">{t.footer.tagline2}</span>
                  </div>
                </Link>

                <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
                  {t.footer.companyDescription}
                  {" "}
                  <Link href="/about-us" className="inline-flex items-center gap-1 text-[#01a9a0] font-semibold hover:underline">
                    {isArabic ? "اقرأ المزيد" : "Read More"}
                    {isArabic
                      ? <ArrowLeft className="w-3 h-3" />
                      : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-2.5 flex-wrap pt-1">
                  {socialLinks.map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* COL 2 — Services */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                <FooterHeading title={t.footer.servicesTitle} />
                <ul className="flex flex-col gap-2.5">
                  {t.footer.servicesLinks.map((label, i) => (
                    <li key={i}><FooterLink href={servicesHrefs[i] ?? "/services"} label={label} /></li>
                  ))}
                  <li><FooterLink href="/services" label={isArabic ? "عرض جميع الخدمات" : "View All Services"} /></li>
                </ul>
              </div>

              {/* COL 3 — Resources */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                <FooterHeading title={t.footer.resourcesTitle} />
                <ul className="flex flex-col gap-2.5">
                  {resourcesLabels.map((label, i) => (
                    <li key={i}><FooterLink href={resourcesHrefs[i] ?? "/resources"} label={label} /></li>
                  ))}
                </ul>
              </div>

              {/* COL 4 — Company */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                <FooterHeading title={t.footer.companyTitle} />
                <ul className="flex flex-col gap-2.5">
                  {companyLabels.map((label, i) => (
                    <li key={i}><FooterLink href={companyHrefs[i] ?? "/about-us"} label={label} /></li>
                  ))}
                </ul>
              </div>

              {/* COL 5 — Contact */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                <FooterHeading title={t.footer.contactTitle} />
                <div className="flex flex-col gap-4">
                  <ContactItem icon={<Image src="/footerIcon/Group.svg" alt="phone" width={24} height={24} unoptimized className="w-6 h-6 object-contain brightness-0 invert" />}>
                    <Link href={`tel:${t.footer.phone1.replace(/\s/g, "")}`} className="hover:text-[#01a9a0] transition-colors">{t.footer.phone1}</Link>
                    <Link href={`tel:${t.footer.phone2.replace(/\s/g, "")}`} className="hover:text-[#01a9a0] transition-colors">{t.footer.phone2}</Link>
                  </ContactItem>

                  <ContactItem icon={<Image src="/footerIcon/SVG.svg" alt="email" width={24} height={24} unoptimized className="w-6 h-6 object-contain brightness-0 invert" />}>
                    <Link href={`mailto:${t.footer.email1}`} className="hover:text-[#01a9a0] transition-colors break-all">{t.footer.email1}</Link>
                    <Link href={`mailto:${t.footer.email2}`} className="hover:text-[#01a9a0] transition-colors break-all">{t.footer.email2}</Link>
                  </ContactItem>

                  <ContactItem icon={<Image src="/footerIcon/SVG (1).svg" alt="location" width={24} height={24} unoptimized className="w-6 h-6 object-contain brightness-0 invert" />}>
                    <span className="whitespace-pre-line leading-relaxed">{t.footer.location}</span>
                  </ContactItem>

                  <ContactItem icon={<Image src="/footerIcon/SVG (2).svg" alt="hours" width={24} height={24} unoptimized className="w-6 h-6 object-contain brightness-0 invert" />}>
                    <span>{t.footer.workingHours}</span>
                    <span className="text-stone-400 text-xs">{t.footer.closedDay}</span>
                  </ContactItem>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────────── */}
          <div className="border-t border-stone-300/50 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Copyright */}
              <p className="text-sm text-stone-600 text-center sm:text-start order-2 sm:order-1">
                {t.footer.copyright}
              </p>

              {/* Scroll to top */}
              <div className="flex justify-center order-1 sm:order-2">
                <button
                  onClick={scrollToTop}
                  aria-label={t.footer.scrollToTop}
                  className="w-10 h-10 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Legal links */}
              <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-5 order-3 text-sm text-stone-600">
                <Link href="/terms" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "شروط الاستخدام" : "Terms of Use"}
                </Link>
                <Link href="/privacy" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link href="/cookies" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "سياسة الكوكيز" : "Cookie Policy"}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
