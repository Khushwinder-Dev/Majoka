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
      className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 hover:text-[#01a9a0] font-normal transition-colors duration-200 group leading-snug"
    >
      <ArrowRight
        className={`w-3 h-3 text-[#01a9a0] flex-shrink-0 transition-transform duration-200 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
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
      <div className="flex flex-col gap-0.5 pt-0.5 sm:pt-1 text-xs sm:text-sm text-stone-700 font-normal min-w-0 flex-1 leading-snug">
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
      labelEn: "Specialized Construction",
      labelAr: "حلول إنشائية متخصصة",
      href: "/solutions",
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
          <div className="relative border-t border-stone-300/40 pt-10 pb-20 sm:pb-8">
            {/* Scroll-to-top — sits centered ON the divider line */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                <button
                  onClick={scrollToTop}
                  aria-label={t.footer.scrollToTop}
                  className="w-10 h-10 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
              {/* Column 1: Social Icons */}
              <div className="lg:col-span-3 flex items-center justify-center lg:justify-start gap-2.5">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-[#01a9a0] hover:bg-[#00c2b2] text-white flex items-center justify-center shadow-xs hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              {/* Column 2: Copyright Text */}
              <div className="lg:col-span-4 text-center">
                <p className="text-xs sm:text-sm text-stone-600 leading-normal">
                  {t.footer.copyright}
                </p>
              </div>

              {/* Column 3: Refund & Legal Policy Links */}
              <div className="lg:col-span-5 flex flex-wrap items-center justify-center lg:justify-end gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-600">
                <Link href="/refund-policy" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
                </Link>
                <Link href="/privacy" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link href="/terms" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "شروط الاستخدام" : "Terms of Use"}
                </Link>
                <Link href="/cookies" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
                  {isArabic ? "سياسة الكوكيز" : "Cookie Policy"}
                </Link>
                <Link href="/subscribe" className="hover:text-[#01a9a0] transition-colors whitespace-nowrap">
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
