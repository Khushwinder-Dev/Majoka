"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, ArrowUpRight } from "lucide-react";
import ExpandableSearchBar from "./Common/ExpandableSearchBar";
import { useLanguage } from "@/context/LanguageContext";

/* ─── SVG ICON PATHS (mapped by visual content) ───────────────────────
  SVG.svg      → house simple (home)
  SVG(1).svg   → commercial block (tall office)
  SVG(2).svg   → industrial / warehouse (3-bay shed)
  SVG(3).svg   → aviation / plane
  SVG(4).svg   → house with roof (residential villa)
  SVG(5).svg   → government / temple columns
  SVG(6).svg   → water drop (waterproofing)
  SVG(7).svg   → swimming pool (waves + rails)
  SVG(8).svg   → electrical / plug
  SVG(9).svg   → residential complex / grid house
  SVG(10).svg  → hospital / cross building
  SVG(11).svg  → paint brush / refurbishment
  SVG(12).svg  → screen / products
  SVG(13).svg  → tall office building (multi-floor)
  SVG(14).svg  → simple villa / home 2
  SVG(15).svg  → arch / dome civic building
  SVG(16).svg  → commercial high-rise
─────────────────────────────────────────────────────────────────────── */

/* ─── MEGA MENU DATA ─────────────────────────────────────────────────── */
const servicesMegaMenu = {
  en: {
    label: "OUR SERVICES",
    tagline: "Six specialist divisions — one guarantee",
    bottomNote: "Not sure which service you need? We'll survey the site first.",
    cta: "All Services",
    ctaHref: "/services",
    items: [
      { icon: "/headerIcon/SVG (6).svg",  title: "Waterproofing",          sub: "Membrane Waterproofing Sys...",      href: "/services-details?service=waterproofing" },
      { icon: "/headerIcon/SVG (7).svg",  title: "GRP & Pool Lining",      sub: "Fibreglass Linings for Pools, T...", href: "/services-details?service=swimming-pools" },
      { icon: "/headerIcon/SVG (8).svg",  title: "Polyurea Application",   sub: "Fast-Cure Heavy-Duty Coatin...",     href: "/services-details?service=electrical-installations" },
      { icon: "/headerIcon/SVG (11).svg", title: "Flooring & Roofing",     sub: "Epoxy Floors, Protective Scre...",   href: "/services-details?service=floor-wall-tiling" },
      { icon: "/headerIcon/SVG (15).svg", title: "Structural Restoration", sub: "Concrete Repair, Restoration...",    href: "/services-details?service=plastering-block-works" },
      { icon: "/headerIcon/SVG (12).svg", title: "Refurbishment",          sub: "Renovation, Surface Preparat...",    href: "/services-details?service=painting-contracting" },
    ],
  },
  ar: {
    label: "خدماتنا",
    tagline: "ستة أقسام متخصصة — ضمان واحد",
    bottomNote: "غير متأكد من الخدمة التي تحتاجها؟ سنجري مسح الموقع أولاً.",
    cta: "جميع الخدمات",
    ctaHref: "/services",
    items: [
      { icon: "/headerIcon/SVG (6).svg",  title: "العزل المائي",            sub: "أنظمة العزل المائي بالأغشية...",   href: "/services-details?service=waterproofing" },
      { icon: "/headerIcon/SVG (7).svg",  title: "تبطين GRP والمسابح",      sub: "تبطين ألياف زجاجية للمسابح...",    href: "/services-details?service=swimming-pools" },
      { icon: "/headerIcon/SVG (8).svg",  title: "تطبيق البولييوريا",       sub: "طلاء سريع التصلب للحماية...",      href: "/services-details?service=electrical-installations" },
      { icon: "/headerIcon/SVG (11).svg", title: "الأرضيات والأسطح",       sub: "أرضيات إيبوكسي، حماية الأسطح...", href: "/services-details?service=floor-wall-tiling" },
      { icon: "/headerIcon/SVG (15).svg", title: "الترميم الإنشائي",       sub: "إصلاح الخرسانة، الترميم...",        href: "/services-details?service=plastering-block-works" },
      { icon: "/headerIcon/SVG (12).svg", title: "التجديد",                 sub: "التجديد، تحضير الأسطح...",          href: "/services-details?service=painting-contracting" },
    ],
  },
};

const projectsMegaMenu = {
  en: {
    label: "OUR PROJECTS",
    tagline: "Delivered across the UAE",
    bottomNote: "Over 400 completed jobs since 2009.",
    cta: "All Projects",
    ctaHref: "/project",
    items: [
      { icon: "/headerIcon/SVG (3).svg",  title: "Dubai Metro Station",  sub: "Major Transit Infrastructure & Transportatio...", href: "/project" },
      { icon: "/headerIcon/SVG (10).svg", title: "City Hospital Tower",  sub: "Hospitals, Clinics & Specialized Healthcare...",   href: "/project" },
      { icon: "/headerIcon/SVG (4).svg",  title: "Palm Jumeirah Villa",  sub: "Private Homes, Villas & Luxury Residential P...",  href: "/project" },
      { icon: "/headerIcon/SVG (2).svg",  title: "Industrial Hangar",    sub: "Industrial Plants, Warehouses & Operation...",     href: "/project" },
      { icon: "/headerIcon/SVG (16).svg", title: "Office Complex",       sub: "Commercial Buildings, Offices & Retail Dev...",    href: "/project" },
      { icon: "/headerIcon/SVG (9).svg",  title: "Residential Complex",  sub: "Large-Scale Residential Communities & Pr...",      href: "/project" },
    ],
  },
  ar: {
    label: "مشاريعنا",
    tagline: "منفذة في جميع أنحاء الإمارات",
    bottomNote: "أكثر من 400 مشروع منجز منذ عام 2009.",
    cta: "جميع المشاريع",
    ctaHref: "/project",
    items: [
      { icon: "/headerIcon/SVG (3).svg",  title: "محطة مترو دبي",         sub: "بنية تحتية للنقل العام والمواصلات...",     href: "/project" },
      { icon: "/headerIcon/SVG (10).svg", title: "برج المستشفى المدني",   sub: "المستشفيات والعيادات والرعاية الصحية...", href: "/project" },
      { icon: "/headerIcon/SVG (4).svg",  title: "فيلا نخلة جميرا",       sub: "المنازل الخاصة والفلل والمجمعات...",       href: "/project" },
      { icon: "/headerIcon/SVG (2).svg",  title: "هنجر صناعي",            sub: "المصانع والمستودعات والعمليات...",          href: "/project" },
      { icon: "/headerIcon/SVG (16).svg", title: "مجمع مكاتب",            sub: "المباني التجارية والمكاتب والتطوير...",     href: "/project" },
      { icon: "/headerIcon/SVG (9).svg",  title: "مجمع سكني",             sub: "المجتمعات السكنية الكبيرة والمشاريع...",    href: "/project" },
    ],
  },
};

const industriesMegaMenu = {
  en: {
    label: "INDUSTRY WE SERVE",
    tagline: "Six Key Industries — One Proven Expertise",
    cardTitle: "Industries we serve",
    cardDesc: "Select the sector your project falls under to explore our experience, capabilities, and proven expertise, and discover the quality of work we deliver across a wide range.",
    cta: "All Industries",
    ctaHref: "/industries",
    items: [
      { icon: "/headerIcon/SVG (14).svg", title: "Residential Spaces",    sub: "Homes, Villas & High-End Pri...",     href: "/industries" },
      { icon: "/headerIcon/SVG (1).svg",  title: "Commercial Projects",   sub: "Corporate Offices, Retail Spaces...", href: "/industries" },
      { icon: "/headerIcon/SVG (2).svg",  title: "Industrial Facilities", sub: "Warehouses, Industrial Plants &...",  href: "/industries" },
      { icon: "/headerIcon/SVG (3).svg",  title: "Aviation & Transport",  sub: "Airports, Terminals, Transit Hub...", href: "/industries" },
      { icon: "/headerIcon/SVG (5).svg",  title: "Civil Infrastructure",  sub: "Public Works, Civil Engineering...",  href: "/industries" },
      { icon: "/headerIcon/SVG (13).svg", title: "Government Projects",   sub: "Municipal, Government & Fe...",       href: "/industries" },
    ],
  },
  ar: {
    label: "القطاعات التي نخدمها",
    tagline: "ستة قطاعات رئيسية — خبرة واحدة مثبتة",
    cardTitle: "القطاعات التي نخدمها",
    cardDesc: "اختر القطاع الذي يندرج فيه مشروعك لاستكشاف خبرتنا وقدراتنا وكفاءتنا المثبتة، واكتشف جودة العمل الذي نقدمه.",
    cta: "جميع القطاعات",
    ctaHref: "/industries",
    items: [
      { icon: "/headerIcon/SVG (14).svg", title: "المساحات السكنية",        sub: "المنازل والفلل والمشاريع السكنية...",   href: "/industries" },
      { icon: "/headerIcon/SVG (1).svg",  title: "المشاريع التجارية",       sub: "المكاتب التجارية، مساحات البيع...",    href: "/industries" },
      { icon: "/headerIcon/SVG (2).svg",  title: "المنشآت الصناعية",       sub: "المستودعات والمصانع الصناعية...",       href: "/industries" },
      { icon: "/headerIcon/SVG (3).svg",  title: "الطيران والنقل",          sub: "المطارات والمحطات ومراكز النقل...",    href: "/industries" },
      { icon: "/headerIcon/SVG (5).svg",  title: "البنية التحتية المدنية",  sub: "الأشغال العامة والهندسة المدنية...",   href: "/industries" },
      { icon: "/headerIcon/SVG (13).svg", title: "المشاريع الحكومية",       sub: "المشاريع البلدية والحكومية...",         href: "/industries" },
    ],
  },
};

/* ─── TYPES ──────────────────────────────────────────────────────────── */
type MegaMenuKey = "services" | "projects" | "industries" | null;

type MegaItem = { icon: string; title: string; sub: string; href: string };

type MegaData = {
  label: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  items: MegaItem[];
  bottomNote?: string;
  cardTitle?: string;
  cardDesc?: string;
};

/* ─── ICON COMPONENT ─────────────────────────────────────────────────── */
function NavIcon({ src, alt, size = 18 }: { src: string; alt: string; size?: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
      unoptimized
    />
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────── */
const Navbar = () => {
  const { language, toggleLanguage, t, isArabic } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MegaMenuKey>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const lang = language === "ar" ? "ar" : "en";

  const searchSuggestions = [
    t.nav.products, t.nav.services, t.nav.projects,
    t.nav.industries, t.nav.resources, t.nav.careers,
    t.nav.company, t.nav.contact, "Waterproofing", "Contracting",
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/project") return pathname === "/project" || pathname.startsWith("/project") || pathname === "/projects";
    if (href === "/career") return pathname === "/career" || pathname.startsWith("/career");
    if (href === "/services") return pathname === "/services" || pathname.startsWith("/services");
    if (href === "/about-us") return pathname === "/about-us" || pathname === "/about";
    if (href === "/resources") return pathname === "/resources" || pathname === "/blogs" || pathname === "/media";
    if (href === "/products") return pathname === "/products" || pathname.startsWith("/products");
    if (href === "/industries") return pathname === "/industries" || pathname.startsWith("/industries");
    return pathname === href || pathname.startsWith(href);
  };

  const handleSearch = (query: string) => { console.log("Searching for:", query); };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setActiveMega(null); setIsMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveMega(null);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveMega(null); setIsMobileMenuOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openMega = useCallback((key: MegaMenuKey) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMega(key);
  }, []);

  const closeMega = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  }, []);

  const navBg = isScrolled
    ? "bg-[#011c20]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    : "bg-transparent";

  /* ─── MEGA MENU DROPDOWN RENDERER ──────────────────────────────────── */
  const renderMegaMenu = (data: MegaData, withSidePanel = false) => (
    <div
      className={`absolute top-full mt-1 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.16)] border border-stone-100 overflow-hidden ${
        withSidePanel
          ? "left-1/2 -translate-x-1/2 w-[700px] xl:w-[760px]"
          : "left-1/2 -translate-x-1/2 w-[640px] xl:w-[700px]"
      }`}
      style={{ zIndex: 9999 }}
      onMouseEnter={cancelClose}
      onMouseLeave={closeMega}
    >
      {/* ── Top strip ── */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-100 bg-stone-50/60">
        <span className="text-[10.5px] font-extrabold tracking-[0.22em] uppercase text-[#009e90]">
          {data.label}
        </span>
        <span className="text-[11px] text-stone-400 font-medium">{data.tagline}</span>
      </div>

      <div className="flex">
        {/* ── Left: items grid ── */}
        <div className={`flex flex-col p-4 ${withSidePanel ? "flex-1" : "w-full"}`}>
          <div className="grid grid-cols-2 gap-1">
            {data.items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setActiveMega(null)}
                className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#f0faf9] transition-all duration-150"
              >
                {/* Icon box */}
                <div className="w-9 h-9 rounded-lg bg-[#f0faf9] border border-[#009e90]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#009e90]/15 group-hover:border-[#009e90]/30 transition-all">
                  <NavIcon src={item.icon} alt={item.title} size={18} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-stone-900 group-hover:text-[#009e90] transition-colors leading-snug truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-stone-400 truncate leading-relaxed mt-0.5">
                    {item.sub}
                  </p>
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 w-5 h-5 rounded-full border border-stone-200 group-hover:border-[#009e90]/40 group-hover:bg-[#009e90]/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <ArrowRight className="w-2.5 h-2.5 text-[#009e90]" />
                </span>
              </Link>
            ))}
          </div>

          {/* ── Bottom note + CTA ── */}
          {!withSidePanel && (
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-400 italic flex-1">{data.bottomNote}</span>
              <Link
                href={data.ctaHref}
                onClick={() => setActiveMega(null)}
                className="inline-flex items-center gap-1.5 bg-[#009e90] hover:bg-[#01887e] text-white text-[11.5px] font-bold px-5 py-2 rounded-full transition-colors whitespace-nowrap shadow-sm"
              >
                {data.cta} →
              </Link>
            </div>
          )}

          {withSidePanel && data.bottomNote && (
            <div className="mt-3 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-400 italic">{data.bottomNote}</span>
            </div>
          )}
        </div>

        {/* ── Right: info panel (Industries only) ── */}
        {withSidePanel && (
          <div className="w-[210px] flex-shrink-0 bg-gradient-to-br from-[#f8fdfc] to-[#eef9f7] border-l border-stone-100 p-5 flex flex-col gap-3">
            <div>
              <p className="text-[9.5px] font-extrabold tracking-[0.22em] uppercase text-[#009e90] mb-2">
                INDUSTRIES
              </p>
              <h4 className="text-[17px] font-extrabold text-stone-900 leading-tight mb-2.5">
                {data.cardTitle}
              </h4>
              <p className="text-[11.5px] text-stone-500 leading-relaxed">
                {data.cardDesc}
              </p>
            </div>
            <Link
              href={data.ctaHref}
              onClick={() => setActiveMega(null)}
              className="inline-flex items-center gap-1.5 bg-[#009e90] hover:bg-[#01887e] text-white text-[12px] font-bold px-5 py-2.5 rounded-full transition-colors self-start shadow-sm mt-auto"
            >
              {data.cta} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── NAV ITEMS ─────────────────────────────────────────────────────── */
  const navItems: { name: string; href: string; megaKey?: MegaMenuKey }[] = [
    { name: t.nav.services,   href: "/services",   megaKey: "services"   },
    { name: t.nav.projects,   href: "/project",    megaKey: "projects"   },
    { name: t.nav.products,   href: "/products"                           },
    { name: t.nav.industries, href: "/industries", megaKey: "industries" },
    { name: t.nav.resources,  href: "/resources"                          },
    { name: t.nav.careers,    href: "/career"                             },
    { name: t.nav.company,    href: "/about-us"                           },
    { name: t.nav.contact,    href: "/contact"                            },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 py-3 sm:py-4 ${navBg}`}
      style={{ zIndex: 9998 }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14">
        <div className="flex items-center justify-between h-16">

          {/* ── LOGO ────────────────────────────────────────────── */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/TajAlrahmanlqogo.png"
                alt="Company Logo"
                width={100}
                height={80}
                className="max-w-[100px] max-h-[80px] w-auto h-auto object-contain"
              />
            </Link>
          </div>

          {/* ── DESKTOP NAV ─────────────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3 lg:gap-3 xl:gap-5 2xl:gap-6">
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                const hasMega = !!item.megaKey;
                const isOpen = activeMega === item.megaKey;

                const megaData: MegaData | null =
                  item.megaKey === "services"   ? servicesMegaMenu[lang] :
                  item.megaKey === "projects"   ? projectsMegaMenu[lang] :
                  item.megaKey === "industries" ? industriesMegaMenu[lang] : null;

                return (
                  <div
                    key={item.name}
                    className={`relative ${item.href === "/resources" ? "hidden" : ""}`}
                    onMouseEnter={() => hasMega ? openMega(item.megaKey!) : openMega(null)}
                    onMouseLeave={() => hasMega ? closeMega() : undefined}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 font-semibold uppercase transition-colors text-xs lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] font-anek tracking-wider whitespace-nowrap ${
                        active ? "text-[#00c2b2] font-bold" : "text-[#01a9a0]"
                      } hover:text-[#00c2b2]`}
                      onClick={() => setActiveMega(null)}
                    >
                      {item.name}
                      {/* {hasMega && (
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      )} */}
                    </Link>

                    {/* Active underline */}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00c2b2] rounded-full" />
                    )}

                    {/* Mega dropdown */}
                    {hasMega && isOpen && megaData && (
                      item.megaKey === "industries"
                        ? renderMegaMenu(megaData, true)
                        : renderMegaMenu(megaData, false)
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT CONTROLS ──────────────────────────────────── */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5 flex-shrink-0">
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder={t.nav.searchPlaceholder}
              suggestions={searchSuggestions}
              dashedButton={true}
              iconColor="text-[#01a9a0]"
              hoverIconColor="hover:text-[#00c2b2]"
            />
            <Link
              href="/contact"
              className="pl-5 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] text-white font-bold text-xs xl:text-sm tracking-wider uppercase inline-flex items-center gap-3 transition-all duration-300 shadow-[0_4px_18px_rgba(0,179,164,0.4)] hover:shadow-[0_6px_24px_rgba(0,194,178,0.6)] hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer group"
            >
              <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#00b3a4] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ────────────────────────────────── */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-11 h-11 text-[#01a9a0] hover:opacity-60 transition-opacity flex items-center justify-center cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE OVERLAY ──────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 2147483646 }}
        />
      )}

      {/* ── MOBILE PANEL ────────────────────────────────────────────── */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[320px] max-w-full bg-[#010f12] border-l border-white/10 transform transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 2147483647 }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Close */}
        <div className={`absolute top-5 ${isArabic ? "left-5" : "right-5"}`}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 text-white/60 hover:text-white transition-colors flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <Image src="/TajAlrahmanlqogo.png" alt="Logo" width={80} height={64} className="w-auto h-auto max-h-11 object-contain" />
        </div>

        {/* Nav list */}
        <div className="overflow-y-auto h-[calc(100%-120px)] pb-8">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              const hasMega = !!item.megaKey;
              const isExpanded = mobileExpanded === item.megaKey;

              const megaData: MegaData | null =
                item.megaKey === "services"   ? servicesMegaMenu[lang] :
                item.megaKey === "projects"   ? projectsMegaMenu[lang] :
                item.megaKey === "industries" ? industriesMegaMenu[lang] : null;

              return (
                <div key={item.name} className="border-b border-white/[0.06]">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-1 px-6 py-4 text-[14px] font-semibold uppercase tracking-wider font-anek transition-colors ${
                        active ? "text-[#00c2b2]" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {hasMega && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.megaKey!)}
                        className="px-5 py-4 text-white/40 hover:text-[#00c2b2] transition-colors cursor-pointer"
                        aria-label={`Toggle ${item.name}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Accordion */}
                  {hasMega && isExpanded && megaData && (
                    <div className="bg-white/[0.04] px-4 pb-3 pt-1">
                      <div className="flex flex-col gap-0.5">
                        {megaData.items.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => { setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                          >
                            {/* Icon */}
                            <div className="w-8 h-8 rounded-lg bg-[#009e90]/20 border border-[#009e90]/20 flex items-center justify-center flex-shrink-0">
                              <Image
                                src={sub.icon}
                                alt={sub.title}
                                width={16}
                                height={16}
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12.5px] font-semibold text-white/90 group-hover:text-[#00c2b2] transition-colors truncate leading-snug">
                                {sub.title}
                              </p>
                              <p className="text-[10.5px] text-white/35 truncate mt-0.5">{sub.sub}</p>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 text-white/25 group-hover:text-[#00c2b2] flex-shrink-0 transition-colors ${isArabic ? "rotate-180" : ""}`} />
                          </Link>
                        ))}
                      </div>
                      {/* Section CTA */}
                      <Link
                        href={megaData.ctaHref}
                        onClick={() => { setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                        className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] text-white text-[12px] font-bold px-4 py-2.5 rounded-full transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {megaData.cta}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile bottom controls */}
          <div className="px-6 mt-5 space-y-4">
            <ExpandableSearchBar
              onSearch={(q) => { handleSearch(q); setIsMobileMenuOpen(false); }}
              placeholder={t.nav.searchPlaceholder}
              suggestions={searchSuggestions}
              iconColor="text-white/70"
              hoverIconColor="hover:text-white"
              className="w-full"
            />
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full pl-6 pr-2 py-3 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] text-white font-bold text-sm tracking-wider uppercase inline-flex items-center justify-center gap-3 shadow-lg group transition-colors"
            >
              <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#00b3a4] flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
