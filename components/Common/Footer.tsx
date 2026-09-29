"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ArrowRight,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// ─── Sub-components ───────────────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FooterHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2 mb-1">
      <h4 className="text-base sm:text-[17px] lg:text-lg font-bold text-stone-900 tracking-tight">{title}</h4>
      <div className="w-10 h-[2px] bg-[#01a9a0] rounded-full" />
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const { isArabic } = useLanguage();
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-stone-600 hover:text-[#01a9a0] font-normal transition-colors duration-200 group leading-snug"
    >
      <ArrowRight
        className={`w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#01a9a0] flex-shrink-0 transition-transform duration-200 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
          }`}
        strokeWidth={2.5}
      />
      <span>{label}</span>
    </Link>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 sm:gap-3">
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#01a9a0] flex items-center justify-center shadow-md">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 pt-0.5 sm:pt-1 text-xs sm:text-sm lg:text-base text-stone-700 font-normal min-w-0 flex-1 leading-snug">
        {children}
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  const { t, isArabic } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // 1. Services
  const servicesItems = [
    {
      labelEn: "GRP & Fiberglass",
      labelAr: "عزل GRP والألياف الزجاجية",
      href: "/services?service=1&sub=grp-fiberglass-waterproofing",
    },
    {
      labelEn: "Combo Roof System",
      labelAr: "نظام الكومبو للأسطح",
      href: "/services?service=1&sub=combo-system-roof-waterproofing",
    },
    {
      labelEn: "Epoxy Floor Coating",
      labelAr: "طلاء أرضيات الإيبوكسي",
      href: "/services?service=1&sub=epoxy-floor-coating",
    },
    {
      labelEn: "Bitumen Membrane",
      labelAr: "عزل الغشاء البيتوميني",
      href: "/services?service=1&sub=bitumen-membrane-waterproofing",
    },
    {
      labelEn: "Polyurea Waterproofing",
      labelAr: "عزل البولي يوريا",
      href: "/services?service=1&sub=polyurea-coating-waterproofing",
    },
    {
      labelEn: "Injection Waterproofing",
      labelAr: "عزل الحقن المائي",
      href: "/services?service=1&sub=injection-waterproofing",
    },
  ];

  // 2. Solutions (6 items + View All)
  const solutionsItems = [
    {
      labelEn: "Waterproofing Solutions",
      labelAr: "حلول العزل المائي",
      href: "/services?service=1",
    },
    {
      labelEn: "Concrete Repair & Protection",
      labelAr: "إصلاح وحماية الخرسانة",
      href: "/services?service=1&sub=injection-waterproofing",
    },
    {
      labelEn: "Roofing Solutions",
      labelAr: "حلول الأسطح",
      href: "/services?service=1&sub=combo-system-roof-waterproofing",
    },
    {
      labelEn: "Basement & Below-Ground",
      labelAr: "حلول السراديب وتحت الأرض",
      href: "/services?service=1&sub=bitumen-membrane-waterproofing",
    },
    {
      labelEn: "Joint Sealing Solutions",
      labelAr: "حلول سد الفواصل",
      href: "/services?service=1&sub=polyurea-coating-waterproofing",
    },
    {
      labelEn: "Custom Solutions",
      labelAr: "حلول إنشائية متخصصة",
      href: "/products",
    },
  ];

  // 3. Projects (6 items + View All)
  const projectsItems = [
    {
      labelEn: "Miami 1",
      labelAr: "ميامي 1",
      href: "/project",
    },
    {
      labelEn: "Miami Phase 2",
      labelAr: "ميامي المرحلة 2",
      href: "/project",
    },
    {
      labelEn: "City Premiere Marina Hotel",
      labelAr: "شقق سيتي بريمير مارينا",
      href: "/project",
    },
    {
      labelEn: "NED Al Ghurair – Al Furjan",
      labelAr: "فلل الغرير | الفرجان",
      href: "/project",
    },
    {
      labelEn: "Dubai Hills Estate",
      labelAr: "دبي هيلز استيت",
      href: "/project",
    },
    {
      labelEn: "Arabian Ranches",
      labelAr: "المرابع العربية",
      href: "/project",
    },
  ];

  // 4. Resources
  const resourcesItems = [
    { labelEn: "Media", labelAr: "الوسائط", href: "/media" },
    { labelEn: "Download", labelAr: "التحميلات", href: "/download" },
    { labelEn: "Get a Quote", labelAr: "احصل على عرض سعر", href: "/get-a-quote" },
    { labelEn: "FAQs", labelAr: "الأسئلة الشائعة", href: "/faqs" },
    { labelEn: "Blog", labelAr: "المدونة", href: "/blogs" },
    { labelEn: "Support", labelAr: "الدعم", href: "/support" },
    { labelEn: "Warranty", labelAr: "الضمان", href: "/warranty" },
  ];

  // 5. Company
  const companyItems = [
    { labelEn: "About Us", labelAr: "عن الشركة", href: "/about-us" },
    { labelEn: "Our Expertise", labelAr: "الخبرة", href: "/expertise" },
    { labelEn: "Certifications", labelAr: "الشهادات", href: "/certifications" },
    { labelEn: "Careers", labelAr: "وظائف", href: "/career" },
    { labelEn: "Contact", labelAr: "اتصل بنا", href: "/contact" },
    { labelEn: "Subcontract", labelAr: "المقاولون من الباطن", href: "/subcontract" },
  ];

  // Social Links
  const socialLinks = [
    { href: "https://wa.me/971527492002", Icon: WhatsAppIcon, label: "WhatsApp" },
    { href: "https://www.facebook.com/tajalrahmahuae", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/tajalrahmahuae", Icon: Instagram, label: "Instagram" },
    { href: "https://x.com/tajalrahmahuae", Icon: Twitter, label: "X" },
    { href: "https://www.linkedin.com/company/tajalrahmah", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com/@tajalrahmahuae", Icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="relative w-full overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
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
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14">
          {/* ── 6-Column Navigation Grid ─────────────────────────────────── */}
          <div className="pt-14 sm:pt-16 lg:pt-18 pb-10 sm:pb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-5 xl:gap-7">
              {/* COL 1 — Services */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={t.footer.servicesTitle} />
                <ul className="flex flex-col gap-2.5">
                  {servicesItems.map((item, i) => (
                    <li key={i}>
                      <FooterLink href={item.href} label={isArabic ? item.labelAr : item.labelEn} />
                    </li>
                  ))}
                  <li>
                    <FooterLink
                      href="/services"
                      label={isArabic ? "عرض جميع الخدمات" : "View All Services"}
                    />
                  </li>
                </ul>
              </div>

              {/* COL 2 — Solutions */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={isArabic ? "حلولنا" : "Solutions"} />
                <ul className="flex flex-col gap-2.5">
                  {solutionsItems.map((item, i) => (
                    <li key={i}>
                      <FooterLink href={item.href} label={isArabic ? item.labelAr : item.labelEn} />
                    </li>
                  ))}
                  <li>
                    <FooterLink
                      href="/solutions"
                      label={isArabic ? "عرض جميع الحلول" : "View All Solutions"}
                    />
                  </li>
                </ul>
              </div>

              {/* COL 3 — Projects */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={isArabic ? "مشاريعنا" : "Projects"} />
                <ul className="flex flex-col gap-2.5">
                  {projectsItems.map((item, i) => (
                    <li key={i}>
                      <FooterLink href={item.href} label={isArabic ? item.labelAr : item.labelEn} />
                    </li>
                  ))}
                  <li>
                    <FooterLink
                      href="/project"
                      label={isArabic ? "عرض جميع المشاريع" : "View All Projects"}
                    />
                  </li>
                </ul>
              </div>

              {/* COL 4 — Resources */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={t.footer.resourcesTitle} />
                <ul className="flex flex-col gap-2.5">
                  {resourcesItems.map((item, i) => (
                    <li key={i}>
                      <FooterLink href={item.href} label={isArabic ? item.labelAr : item.labelEn} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* COL 5 — Company */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={t.footer.companyTitle} />
                <ul className="flex flex-col gap-2.5">
                  {companyItems.map((item, i) => (
                    <li key={i}>
                      <FooterLink href={item.href} label={isArabic ? item.labelAr : item.labelEn} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* COL 6 — Contact */}
              <div className="flex flex-col gap-4">
                <FooterHeading title={t.footer.contactTitle} />
                <div className="flex flex-col gap-3 sm:gap-3.5">
                  <ContactItem
                    icon={
                      <Image
                        src="/footerIcon/Group.svg"
                        alt="phone"
                        width={20}
                        height={20}
                        unoptimized
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
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
                  </ContactItem>

                  <ContactItem
                    icon={
                      <Image
                        src="/footerIcon/SVG.svg"
                        alt="email"
                        width={20}
                        height={20}
                        unoptimized
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
                      />
                    }
                  >
                    <Link
                      href={`mailto:${t.footer.email1}`}
                      className="hover:text-[#01a9a0] transition-colors break-words"
                    >
                      {t.footer.email1}
                    </Link>
                    <Link
                      href={`mailto:${t.footer.email2}`}
                      className="hover:text-[#01a9a0] transition-colors break-words"
                    >
                      {t.footer.email2}
                    </Link>
                  </ContactItem>

                  <ContactItem
                    icon={
                      <Image
                        src="/footerIcon/SVG (1).svg"
                        alt="location"
                        width={20}
                        height={20}
                        unoptimized
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
                      />
                    }
                  >
                    <span className="whitespace-pre-line leading-relaxed">{t.footer.location}</span>
                  </ContactItem>

                  <ContactItem
                    icon={
                      <Image
                        src="/footerIcon/SVG (2).svg"
                        alt="hours"
                        width={20}
                        height={20}
                        unoptimized
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
                      />
                    }
                  >
                    <span className="leading-snug">{t.footer.workingHours}</span>
                    <span className="text-stone-400 text-xs">{t.footer.closedDay}</span>
                  </ContactItem>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar: 3 Columns (Social Icons | Copyright | Legal & Policy Links) ── */}
          <div className="relative border-t border-stone-300/40 pt-7 pb-20 sm:pb-8 lg:pb-7">
            {/* Scroll-to-top — sits centered ON the divider line with hover tooltip */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
              <div className="group relative flex flex-col items-center">
                {/* Tooltip */}
                <div
                  role="tooltip"
                  className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-30"
                >
                  <div className="relative bg-stone-900/90 backdrop-blur-sm text-white text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
                    <span>{isArabic ? "العودة إلى الأعلى" : "Back to top"}</span>
                    {/* Tooltip arrow pointing down */}
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-stone-900/90" />
                  </div>
                </div>

                {/* Button Outer Ring */}
                <div className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center shadow-xs">
                  <button
                    onClick={scrollToTop}
                    aria-label={isArabic ? "العودة إلى الأعلى" : "Back to top"}
                    className="w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 ${isArabic ? "pl-0" : "pr-0"
                }`}
            >


              {/* Column 2: Copyright Text */}
              <div className="text-center px-2 shrink-0">
                <p className="text-sm lg:text-base text-stone-600 leading-normal">
                  {t.footer.copyright}
                </p>
              </div>

              {/* Column 1: Social Icons */}
              <div className="flex items-center justify-center lg:justify-start gap-2 shrink-0">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-xs hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>

              {/* Column 3: Refund & Legal Policy Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-3 sm:gap-x-4 gap-y-2 text-sm lg:text-base text-stone-600">
                <Link
                  href="/refund-policy"
                  className="hover:text-[#01a9a0] transition-colors whitespace-nowrap"
                >
                  {isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
                </Link>
                <span className="text-stone-300 select-none">•</span>
                <Link
                  href="/privacy"
                  className="hover:text-[#01a9a0] transition-colors whitespace-nowrap"
                >
                  {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <span className="text-stone-300 select-none">•</span>
                <Link
                  href="/terms"
                  className="hover:text-[#01a9a0] transition-colors whitespace-nowrap"
                >
                  {isArabic ? "شروط الاستخدام" : "Terms of Use"}
                </Link>
                <span className="text-stone-300 select-none">•</span>
                <Link
                  href="/cookies"
                  className="hover:text-[#01a9a0] transition-colors whitespace-nowrap"
                >
                  {isArabic ? "سياسة الكوكيز" : "Cookie Policy"}
                </Link>
                <span className="text-stone-300 select-none">•</span>
                <Link
                  href="/subscribe"
                  className="hover:text-[#01a9a0] transition-colors whitespace-nowrap"
                >
                  {isArabic ? "الاشتراك" : "Subscribe to emails"}
                </Link>
              </div>




            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
