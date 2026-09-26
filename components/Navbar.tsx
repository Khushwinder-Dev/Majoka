"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, ArrowUpRight, Search } from "lucide-react";
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
/* TASK-1: SERVICES */
const servicesMegaMenu = {
  en: {
    label: "OUR SERVICES",
    tagline: "Six specialist divisions — one guarantee",
    cardImage: "/grpnb.jpg",
    cta: "Explore More",
    ctaHref: "/services",
    items: [
      { icon: "/headerIcon/SVG (6).svg", title: "GRP & Fiberglass Waterproofing", sub: "Durable protection for roofs, tanks, and exposed surfaces.", href: "/services?service=1&sub=grp-fiberglass-waterproofing" },
      { icon: "/headerIcon/SVG (7).svg", title: "Combo System Roof Waterproofing", sub: "Multi-layer protection for long-lasting roof performance.", href: "/services?service=1&sub=combo-system-roof-waterproofing" },
      { icon: "/headerIcon/SVG (11).svg", title: "Epoxy Floor Coating", sub: "Tough, seamless coating for durable and easy-clean floors.", href: "/services?service=1&sub=epoxy-floor-coating" },
      { icon: "/headerIcon/SVG (12).svg", title: "Bitumen Membrane Waterproofing", sub: "Reliable moisture protection for roofs and foundations.", href: "/services?service=1&sub=bitumen-membrane-waterproofing" },
      { icon: "/headerIcon/SVG (8).svg", title: "Polyurea Waterproofing", sub: "Fast-curing, flexible protection for demanding surfaces.", href: "/services?service=1&sub=polyurea-coating-waterproofing" },
      { icon: "/headerIcon/SVG (15).svg", title: "Injection Waterproofing", sub: "Targeted sealing of cracks, joints, and water leaks.", href: "/services?service=1&sub=injection-waterproofing" },
    ],
  },
  ar: {
    label: "خدماتنا",
    tagline: "ستة أقسام متخصصة — ضمان واحد",
    cardImage: "/grpnb.jpg",
    cta: "استكشف المزيد",
    ctaHref: "/services",
    items: [
      { icon: "/headerIcon/SVG (6).svg", title: "عزل GRP والألياف الزجاجية", sub: "حماية متينة للأسطح والخزانات والمناطق المكشوفة.", href: "/services?service=1&sub=grp-fiberglass-waterproofing" },
      { icon: "/headerIcon/SVG (7).svg", title: "نظام الكومبو للأسطح", sub: "حماية متعددة الطبقات لأداء يدوم طويلاً للأسطح.", href: "/services?service=1&sub=combo-system-roof-waterproofing" },
      { icon: "/headerIcon/SVG (11).svg", title: "طلاء أرضيات الإيبوكسي", sub: "طلاء سلس وقوي لأرضيات متينة وسهلة التنظيف.", href: "/services?service=1&sub=epoxy-floor-coating" },
      { icon: "/headerIcon/SVG (12).svg", title: "عزل الغشاء البيتوميني", sub: "حماية موثوقة من الرطوبة للأسطح والأساسات.", href: "/services?service=1&sub=bitumen-membrane-waterproofing" },
      { icon: "/headerIcon/SVG (8).svg", title: "عزل البولي يوريا", sub: "حماية سريعة الجفاف ومرنة للأسطح ذات المتطلبات العالية.", href: "/services?service=1&sub=polyurea-coating-waterproofing" },
      { icon: "/headerIcon/SVG (15).svg", title: "عزل الحقن المائي", sub: "سد مستهدف للشقوق والفواصل وتسربات المياه.", href: "/services?service=1&sub=injection-waterproofing" },
    ],
  },
};

/* TASK-2: SOLUTIONS */
const solutionsMegaMenu = {
  en: {
    label: "OUR SOLUTIONS",
    tagline: "End-to-end protection — built to last",
    cardImage: "/solnb.png",
    cta: "Explore More",
    ctaHref: "/solutions",
    items: [
      { icon: "/headerIcon/SVG (6).svg", title: "Waterproofing Solutions", sub: "Protection against water and moisture.", href: "/services?service=1" },
      { icon: "/headerIcon/SVG (9).svg", title: "Concrete Repair & Protection", sub: "Restore and protect concrete structures.", href: "/services?service=1&sub=injection-waterproofing" },
      { icon: "/headerIcon/SVG (7).svg", title: "Roofing Solutions", sub: "Durable protection for roofs and structures.", href: "/services?service=1&sub=combo-system-roof-waterproofing" },
      { icon: "/headerIcon/SVG (12).svg", title: "Basement & Below-Ground Solutions", sub: "Protection for foundations and underground areas.", href: "/services?service=1&sub=bitumen-membrane-waterproofing" },
      { icon: "/headerIcon/SVG (8).svg", title: "Joint Sealing Solutions", sub: "Reliable sealing for joints and movement areas.", href: "/services?service=1&sub=polyurea-coating-waterproofing" },
      { icon: "/headerIcon/SVG (11).svg", title: "Specialized Construction Solutions", sub: "Tailored solutions for complex requirements.", href: "/solutions" },
    ],
  },
  ar: {
    label: "حلولنا",
    tagline: "حماية شاملة من البداية للنهاية — مصممة للديمومة",
    cardImage: "/solnb.png",
    cta: "استكشف المزيد",
    ctaHref: "/solutions",
    items: [
      { icon: "/headerIcon/SVG (6).svg", title: "حلول العزل المائي", sub: "حماية متكاملة ضد المياه والرطوبة.", href: "/services?service=1" },
      { icon: "/headerIcon/SVG (9).svg", title: "إصلاح وحماية الخرسانة", sub: "ترميم وحماية المنشآت الخرسانية.", href: "/services?service=1&sub=injection-waterproofing" },
      { icon: "/headerIcon/SVG (7).svg", title: "حلول الأسطح", sub: "حماية متينة للأسطح والمنشآت.", href: "/services?service=1&sub=combo-system-roof-waterproofing" },
      { icon: "/headerIcon/SVG (12).svg", title: "حلول السراديب وتحت الأرض", sub: "حماية للأساسات والمناطق تحت الأرض.", href: "/services?service=1&sub=bitumen-membrane-waterproofing" },
      { icon: "/headerIcon/SVG (8).svg", title: "حلول سد الفواصل", sub: "سد موثوق للفواصل ومناطق الحركة.", href: "/services?service=1&sub=polyurea-coating-waterproofing" },
      { icon: "/headerIcon/SVG (11).svg", title: "حلول إنشائية متخصصة", sub: "حلول مصممة للمتطلبات المعقدة.", href: "/solutions" },
    ],
  },
};

/* TASK-3: PROJECTS */
const projectsMegaMenu = {
  en: {
    label: "OUR PROJECTS",
    tagline: "Landmark developments across the UAE",
    cardImage: "/projnb.jpeg",
    cta: "Explore More",
    ctaHref: "/project",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "Miami 1", sub: "Jumeirah Village Circle (JVC), Samana Developers", href: "/project" },
      { icon: "/headerIcon/SVG (13).svg", title: "Miami Phase 2", sub: "Jumeirah Village Triangle (JVT), Samana Developers", href: "/project" },
      { icon: "/headerIcon/SVG (7).svg", title: "City Premiere Marina Hotel Apartments", sub: "Dubai Marina, Dubai", href: "/project" },
      { icon: "/headerIcon/SVG (4).svg", title: "NED Al Ghurair – Al Furjan South Villas", sub: "Al Furjan, Dubai", href: "/project" },
      { icon: "/headerIcon/SVG (9).svg", title: "Dubai Hills Estate", sub: "Dubai, Emaar", href: "/project" },
      { icon: "/headerIcon/SVG (16).svg", title: "Arabian Ranches", sub: "Dubai, Emaar", href: "/project" },
    ],
  },
  ar: {
    label: "مشاريعنا",
    tagline: "مشاريع رائدة ومعالم منجزة في كافة أنحاء الإمارات",
    cardImage: "/projnb.jpeg",
    cta: "استكشف المزيد",
    ctaHref: "/project",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "ميامي 1", sub: "قرية جميرا الدائرية (JVC)، سمانا العقارية", href: "/project" },
      { icon: "/headerIcon/SVG (13).svg", title: "ميامي المرحلة 2", sub: "مثلث قرية جميرا (JVT)، سمانا العقارية", href: "/project" },
      { icon: "/headerIcon/SVG (7).svg", title: "شقق سيتي بريمير مارينا الفندقية", sub: "دبي مارينا، دبي", href: "/project" },
      { icon: "/headerIcon/SVG (4).svg", title: "فلل الغرير | الفرجان جنوب", sub: "الفرجان، دبي", href: "/project" },
      { icon: "/headerIcon/SVG (9).svg", title: "دبي هيلز استيت", sub: "دبي، إعمار", href: "/project" },
      { icon: "/headerIcon/SVG (16).svg", title: "المرابع العربية", sub: "دبي، إعمار", href: "/project" },
    ],
  },
};

/* TASK-4: INDUSTRIES */
const industriesMegaMenu = {
  en: {
    label: "INDUSTRIES WE SERVE",
    tagline: "Engineering & Technical Services Across Core Sectors",
    cardImage: "/ourExpertise/Industrial factory plant.png",
    cta: "Explore More",
    ctaHref: "/industries",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "Commercial & Residential", sub: "Offices, retail, villas, apartments, and mixed-use developments.", href: "/industries#construction" },
      { icon: "/headerIcon/SVG (7).svg", title: "Hospitality & Tourism", sub: "Hotels, resorts, leisure facilities, and tourism developments.", href: "/industries#hospitality" },
      { icon: "/headerIcon/SVG (2).svg", title: "Industrial & Warehousing", sub: "Factories, industrial plants, warehouses, and logistics facilities.", href: "/industries#manufacturing" },
      { icon: "/headerIcon/SVG (6).svg", title: "Energy, Oil & Gas", sub: "Energy facilities, oil and gas projects, and supporting infrastructure.", href: "/industries#oil-gas" },
      { icon: "/headerIcon/SVG (8).svg", title: "Infrastructure & Transportation", sub: "Roads, utilities, airports, and transport infrastructure.", href: "/industries#power-energy" },
      { icon: "/headerIcon/SVG (3).svg", title: "Government & Public Sector", sub: "Government buildings, public facilities, and institutional projects.", href: "/industries#marine-offshore" },
    ],
  },
  ar: {
    label: "القطاعات التي نخدمها",
    tagline: "خدمات هندسية وفنية متخصصة عبر القطاعات الحيوية",
    cardImage: "/ourExpertise/Industrial factory plant.png",
    cta: "استكشف المزيد",
    ctaHref: "/industries",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "التجاري والسكني", sub: "مكاتب، تجزئة، فلل، شقق ومشاريع متعددة الاستخدامات.", href: "/industries#construction" },
      { icon: "/headerIcon/SVG (7).svg", title: "الضيافة والسياحة", sub: "فنادق، منتجعات، مرافق ترفيهية ومشاريع سياحية.", href: "/industries#hospitality" },
      { icon: "/headerIcon/SVG (2).svg", title: "الصناعي والمستودعات", sub: "مصانع، منشآت صناعية، مستودعات ومرافق لوجستية.", href: "/industries#manufacturing" },
      { icon: "/headerIcon/SVG (6).svg", title: "الطاقة والنفط والغاز", sub: "منشآت طاقة، مشاريع نفط وغاز وبنية تحتية مساندة.", href: "/industries#oil-gas" },
      { icon: "/headerIcon/SVG (8).svg", title: "البنية التحتية والنقل", sub: "طرق، مرافق عامة، مطارات وبنية تحتية للمواصلات.", href: "/industries#power-energy" },
      { icon: "/headerIcon/SVG (3).svg", title: "القطاع الحكومي والعام", sub: "مبانٍ حكومية، مرافق عامة ومشاريع مؤسسية.", href: "/industries#marine-offshore" },
    ],
  },
};

/* TASK-5: SUBCONTRACTORS */
const subcontractorsMegaMenu = {
  en: {
    label: "SUBCONTRACTORS",
    tagline: "Certified Subcontracting Execution Partner",
    cardImage: "/subcontract/hero.png",
    cta: "Explore More",
    ctaHref: "/subcontract",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "Subcontracting Capabilities", sub: "Explore our expertise and capabilities as a subcontracting partner.", href: "/subcontract#capabilities" },
      { icon: "/headerIcon/SVG (6).svg", title: "Our Services", sub: "Discover the services we provide to main contractors and project partners.", href: "/subcontract#services" },
      { icon: "/headerIcon/SVG (13).svg", title: "Project Experience", sub: "View our relevant project experience and completed works.", href: "/subcontract#projects" },
      { icon: "/headerIcon/SVG (8).svg", title: "Technical Expertise", sub: "Learn about our technical resources, skills, and capabilities.", href: "/subcontract#expertise" },
      { icon: "/headerIcon/SVG (15).svg", title: "Certifications & Compliance", sub: "Review our certifications, approvals, and compliance standards.", href: "/subcontract#certifications" },
      { icon: "/headerIcon/SVG (11).svg", title: "Partner With Us", sub: "Connect with our team for subcontracting opportunities and collaboration.", href: "/subcontract#partner" },
    ],
  },
  ar: {
    label: "المقاولون من الباطن",
    tagline: "شريك مقاولات باطن معتمد وموثوق للمشاريع",
    cardImage: "/subcontract/hero.png",
    cta: "استكشف المزيد",
    ctaHref: "/subcontract",
    items: [
      { icon: "/headerIcon/SVG (1).svg", title: "قدرات المقاولة من الباطن", sub: "استكشف خبراتنا وإمكانياتنا كشريك مقاولات تخصصي.", href: "/subcontract#capabilities" },
      { icon: "/headerIcon/SVG (6).svg", title: "خدماتنا", sub: "تعرف على الخدمات التي نقدمها للمقاولين الرئيسيين وشركاء المشاريع.", href: "/subcontract#services" },
      { icon: "/headerIcon/SVG (13).svg", title: "خبرة المشاريع", sub: "استعرض خبراتنا في المشاريع السابقة والأعمال المنجزة.", href: "/subcontract#projects" },
      { icon: "/headerIcon/SVG (8).svg", title: "الخبرة الفنية", sub: "تعرّف على مواردنا الفنية ومهاراتنا وقدراتنا الهندسية.", href: "/subcontract#expertise" },
      { icon: "/headerIcon/SVG (15).svg", title: "الشهادات والامتثال", sub: "اطلع على شهاداتنا واعتماداتنا ومعايير الامتثال المعتمدة.", href: "/subcontract#certifications" },
      { icon: "/headerIcon/SVG (11).svg", title: "شاركنا النجاح", sub: "تواصل مع فريقنا لفرص المقاولات والشراكات المستقبلية.", href: "/subcontract#partner" },
    ],
  },
};

/* TASK-6: RESOURCES */
const resourcesMegaMenu = {
  en: {
    label: "RESOURCES",
    tagline: "Knowledge, Media & Client Support",
    cardImage: "/resnb.jpeg",
    cta: "Explore More",
    ctaHref: "/resources",
    items: [
      { icon: "arrow", title: "Blogs", sub: "Industry insights, trends, and company updates.", href: "/blogs" },
      { icon: "arrow", title: "Support", sub: "Get assistance and support from our team.", href: "/support" },
      { icon: "arrow", title: "Media", sub: "Explore our latest news, stories, and media highlights.", href: "/media" },
      { icon: "arrow", title: "FAQs", sub: "Find quick answers to frequently asked questions.", href: "/faqs" },
      { icon: "arrow", title: "Warranty", sub: "Learn about our warranty coverage and terms.", href: "/warranty" },
      { icon: "arrow", title: "Downloads", sub: "Access brochures, company profiles, and useful documents.", href: "/download" },
    ],
  },
  ar: {
    label: "المصادر",
    tagline: "المعرفة والوسائط ودعم العملاء",
    cardImage: "/resnb.jpeg",
    cta: "استكشف المزيد",
    ctaHref: "/resources",
    items: [
      { icon: "arrow", title: "المدونة", sub: "رؤى الصناعة، الاتجاهات وأحدث أخبار الشركة.", href: "/blogs" },
      { icon: "arrow", title: "الدعم", sub: "احصل على المساعدة والدعم الفني من فريقنا.", href: "/support" },
      { icon: "arrow", title: "الوسائط", sub: "استكشف آخر الأخبار والقصص والتغطيات الإعلامية.", href: "/media" },
      { icon: "arrow", title: "الأسئلة الشائعة", sub: "إجابات سريعة وشاملة عن الأسئلة المتكررة.", href: "/faqs" },
      { icon: "arrow", title: "الضمان", sub: "تعرف على شروط تغطية الضمان وسياساتنا المعتمدة.", href: "/warranty" },
      { icon: "arrow", title: "التحميلات", sub: "كتيبات وملفات الشركة والمستندات الفنية المفيدة.", href: "/download" },
    ],
  },
};

/* TASK-7: CAREERS */
const careersMegaMenu = {
  en: {
    label: "CAREERS",
    tagline: "Build Your Career With Engineering Excellence",
    cardImage: "/career/b.png",
    cta: "Explore More",
    ctaHref: "/career",
    items: [
      { icon: "arrow", title: "Why Join Us", sub: "What makes us a great place to build your career.", href: "/career#why-join-us" },
      { icon: "arrow", title: "Current Openings", sub: "Explore our latest career opportunities.", href: "/career#current-openings" },
      { icon: "arrow", title: "Life at Our Company", sub: "Discover our workplace and culture.", href: "/career#life-at-our-company" },
      { icon: "arrow", title: "Submit Your CV", sub: "Share your CV for current or future opportunities.", href: "/career/1#apply" },
      { icon: "arrow", title: "Recruitment Process", sub: "Learn about our hiring process.", href: "/career#recruitment-process" },
      { icon: "arrow", title: "FAQs", sub: "Answers to common career questions.", href: "/career#faqs" },
    ],
  },
  ar: {
    label: "الوظائف",
    tagline: "ابنِ مسيرتك المهنية مع رواد التميز الهندسي",
    cardImage: "/career/b.png",
    cta: "استكشف المزيد",
    ctaHref: "/career",
    items: [
      { icon: "arrow", title: "لماذا تنضم إلينا", sub: "ما يجعل شركتنا المكان المثالي لبناء مسيرتك المهنية.", href: "/career#why-join-us" },
      { icon: "arrow", title: "الوظائف الشاغرة", sub: "استكشف أحدث الفرص الوظيفية المتاحة لدينا.", href: "/career#current-openings" },
      { icon: "arrow", title: "بيئة العمل وثقافتنا", sub: "اكتشف ثقافة العمل وبيئتنا المهنية المتميزة.", href: "/career#life-at-our-company" },
      { icon: "arrow", title: "أرسل سيرتك الذاتية", sub: "شارك سيرتك الذاتية للفرص الحالية والمستقبلية.", href: "/career/1#apply" },
      { icon: "arrow", title: "آلية التوظيف", sub: "تعرف على مراحل التوظيف والاختيار في شركتنا.", href: "/career#recruitment-process" },
      { icon: "arrow", title: "الأسئلة الشائعة", sub: "إجابات عن أبرز الاستفسارات الوظيفية الشائعة.", href: "/career#faqs" },
    ],
  },
};

/* TASK-8: COMPANY */
const companyMegaMenu = {
  en: {
    label: "COMPANY",
    tagline: "Engineering Excellence Across the UAE",
    cardImage: "/qw.jpeg",
    cta: "Explore More",
    ctaHref: "/about-us",
    items: [
      { icon: "arrow", title: "About Us", sub: "Who we are and what we do.", href: "/about-us" },
      { icon: "arrow", title: "Our Expertise", sub: "Our skills and capabilities.", href: "/expertise" },
      { icon: "arrow", title: "Why Choose Us", sub: "What sets us apart.", href: "/#why-choose-us" },
      { icon: "arrow", title: "Certifications", sub: "Our credentials and approvals.", href: "/certifications" },
      { icon: "arrow", title: "Company Profile", sub: "Get our company profile.", href: "/about-us#company-profile" },
      { icon: "arrow", title: "Contact Us", sub: "Connect with our team.", href: "/contact" },
    ],
  },
  ar: {
    label: "الشركة",
    tagline: "الريادة والتميز الهندسي في الإمارات",
    cardImage: "/qw.jpeg",
    cta: "استكشف المزيد",
    ctaHref: "/about-us",
    items: [
      { icon: "arrow", title: "من نحن", sub: "من نحن ورؤيتنا وما نقوم به.", href: "/about-us" },
      { icon: "arrow", title: "خبراتنا", sub: "مهاراتنا الفنية وقدراتنا المتخصصة.", href: "/expertise" },
      { icon: "arrow", title: "لماذا تختارنا", sub: "ما يميزنا عن غيرنا في الجودة والتنفيذ.", href: "/#why-choose-us" },
      { icon: "arrow", title: "الشهادات والاعتمادات", sub: "شهاداتنا واعتماداتنا الرسمية.", href: "/certifications" },
      { icon: "arrow", title: "الملف التعريفي للشركة", sub: "احصل على الملف التعريفي الكامل للشركة.", href: "/about-us#company-profile" },
      { icon: "arrow", title: "اتصل بنا", sub: "تواصل مع مكاتبنا في دبي والشارقة.", href: "/contact" },
    ],
  },
};

/* ─── TYPES ──────────────────────────────────────────────────────────── */
type MegaMenuKey = "services" | "solutions" | "projects" | "industries" | "subcontractors" | "resources" | "careers" | "company" | null;

type MegaItem = { icon: string; title: string; sub: string; href: string };

type MegaData = {
  label: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  items: MegaItem[];
  cardImage?: string;
};

/* ─── ICON COMPONENT ─────────────────────────────────────────────────── */
function NavIcon({ src, alt, size = 18 }: { src?: string; alt: string; size?: number }) {
  if (!src || src === "arrow") {
    return <ArrowRight className="w-4 h-4 text-[#009e90] rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />;
  }
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
    t.nav.services, t.nav.solutions, t.nav.projects,
    t.nav.industries, t.nav.subcontractors, t.nav.resources,
    t.nav.careers, t.nav.company, t.nav.contact, "Waterproofing", "Contracting",
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/project") return pathname === "/project" || pathname.startsWith("/project") || pathname === "/projects";
    if (href === "/services") return pathname === "/services" || pathname.startsWith("/services");
    if (href === "/solutions") return pathname === "/solutions" || pathname.startsWith("/solutions");
    if (href === "/industries") return pathname === "/industries" || pathname.startsWith("/industries");
    if (href === "/subcontract") return pathname === "/subcontract" || pathname.startsWith("/subcontract");
    if (href === "/resources") return pathname === "/resources" || pathname.startsWith("/blogs") || pathname.startsWith("/media") || pathname.startsWith("/faqs") || pathname.startsWith("/support") || pathname.startsWith("/warranty");
    if (href === "/career") return pathname === "/career" || pathname.startsWith("/career") || pathname === "/careers" || pathname.startsWith("/careers");
    if (href === "/about-us") return pathname === "/about-us" || pathname === "/about" || pathname.startsWith("/expertise") || pathname.startsWith("/certifications") || pathname.startsWith("/contact");
    return pathname === href || pathname.startsWith(href);
  };

  const router = useRouter();

  const handleSearch = (query: string, href?: string) => {
    if (href) {
      router.push(href);
      return;
    }
    const q = query.trim();
    if (!q) return;

    const lower = q.toLowerCase();
    if (lower.includes("subcontract") || lower.includes("مقاولة")) {
      router.push("/subcontract");
    } else if (lower.includes("quote") || lower.includes("price") || lower.includes("cost") || lower.includes("تسعير")) {
      router.push("/get-a-quote");
    } else if (lower.includes("career") || lower.includes("job") || lower.includes("وظائف")) {
      router.push("/career");
    } else if (lower.includes("project") || lower.includes("مشاريع")) {
      router.push("/project");
    } else if (lower.includes("product") || lower.includes("chemical") || lower.includes("membrane") || lower.includes("منتجات")) {
      router.push(`/products?search=${encodeURIComponent(q)}`);
    } else if (lower.includes("industry") || lower.includes("قطاعات")) {
      router.push("/industries");
    } else if (lower.includes("contact") || lower.includes("اتصل")) {
      router.push("/contact");
    } else if (lower.includes("about") || lower.includes("company") || lower.includes("من نحن")) {
      router.push("/about-us");
    } else if (lower.includes("faq") || lower.includes("أسئلة")) {
      router.push("/faqs");
    } else {
      router.push(`/services?search=${encodeURIComponent(q)}`);
    }
  };

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
    ? "bg-[#01a9a0]/95 backdrop-blur-md border-b border-white/20 shadow-lg shadow-[#01a9a0]/25"
    : "bg-transparent";

  /* ─── MEGA MENU DROPDOWN RENDERER ──────────────────────────────────── */
  const renderMegaMenu = (data: MegaData) => (
    <div
      className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[760px] xl:w-[820px] transition-all"
      style={{ zIndex: 10 }}
      onMouseEnter={cancelClose}
      onMouseLeave={closeMega}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ── Dropdown panel ── */}
      <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-stone-100 border-t-2 border-t-white overflow-hidden">
        {/* ── Top strip ── */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-100 bg-stone-50/70">
          <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#009e90]">
            {data.label}
          </span>
          <span className="text-[11px] text-stone-400 font-medium">{data.tagline}</span>
        </div>

        <div className="flex">
          {/* ── Left: items grid ── */}
          <div className="flex flex-col p-4 flex-1 justify-center">
            <div className="grid grid-cols-2 gap-1.5">
              {data.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={(e) => {
                    setActiveMega(null);
                    if (item.href.includes("#")) {
                      const [targetPath, hash] = item.href.split("#");
                      const isCurrent = (targetPath === "" && pathname === "/") || targetPath === pathname;
                      if (isCurrent && hash) {
                        e.preventDefault();
                        const el = document.getElementById(hash);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                          window.history.pushState(null, "", item.href);
                        }
                      }
                    }
                  }}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f0faf9] transition-all duration-150"
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
                    <ArrowRight className="w-2.5 h-2.5 text-[#009e90] rtl:rotate-180" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: featured card with image ── */}
          <div className="w-[245px] xl:w-[265px] flex-shrink-0 bg-gradient-to-br from-[#f8fdfc] to-[#eef9f7] border-l rtl:border-l-0 rtl:border-r border-stone-100 p-4.5 flex flex-col justify-between group/card">
            {/* Image Banner */}
            {data.cardImage && (
              <Link
                href={data.ctaHref}
                onClick={() => setActiveMega(null)}
                className="relative w-full h-[125px] xl:h-[135px] rounded-xl overflow-hidden border border-stone-200/60 shadow-xs bg-stone-100 block group/img mb-3"
              >
                <Image
                  src={data.cardImage}
                  alt={data.label}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                  sizes="265px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
              </Link>
            )}

            <Link
              href={data.ctaHref}
              onClick={() => setActiveMega(null)}
              className="inline-flex items-center gap-1.5 bg-[#009e90] hover:bg-[#01887e] text-white text-[12px] font-bold px-4 py-2 rounded-full transition-all self-start shadow-sm hover:gap-2"
            >
              <span>{data.cta || (isArabic ? "استكشف المزيد" : "Explore More")}</span>
              <span className="rtl:rotate-180">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── NAV ITEMS ─────────────────────────────────────────────────────── */
  const navItems: { name: string; href: string; megaKey?: MegaMenuKey }[] = [
    { name: t.nav.services, href: "/services", megaKey: "services" },
    { name: t.nav.solutions, href: "/solutions", megaKey: "solutions" },
    { name: t.nav.projects, href: "/project", megaKey: "projects" },
    { name: t.nav.industries, href: "/industries", megaKey: "industries" },
    { name: t.nav.subcontractors, href: "/subcontract", megaKey: "subcontractors" },
    { name: t.nav.resources, href: "/resources", megaKey: "resources" },
    { name: t.nav.careers, href: "/career", megaKey: "careers" },
    { name: t.nav.company, href: "/about-us", megaKey: "company" },
  ];

  /* ─── ACTIVE MEGA DATA ──────────────────────────────────────────────── */
  const activeMegaData: MegaData | null =
    activeMega === "services" ? servicesMegaMenu[lang] :
      activeMega === "solutions" ? solutionsMegaMenu[lang] :
        activeMega === "projects" ? projectsMegaMenu[lang] :
          activeMega === "industries" ? industriesMegaMenu[lang] :
            activeMega === "subcontractors" ? subcontractorsMegaMenu[lang] :
              activeMega === "resources" ? resourcesMegaMenu[lang] :
                activeMega === "careers" ? careersMegaMenu[lang] :
                  activeMega === "company" ? companyMegaMenu[lang] : null;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 py-3 sm:py-4 ${navBg}`}
        style={{ zIndex: 99999 }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14">
          <div className="flex items-center justify-between h-16">

            {/* ── LOGO ────────────────────────────────────────────── */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={100}
                  height={80}
                  className="max-w-[100px] max-h-[80px] w-auto h-auto object-contain"
                />
              </Link>
            </div>

            {/* ── DESKTOP NAV ─────────────────────────────────────── */}
            <div className="hidden lg:block relative" onMouseLeave={closeMega}>
              <div className="flex items-center gap-1.5 lg:gap-2 xl:gap-3.5 2xl:gap-5 relative z-20">
                {navItems.map((item) => {
                  const active = isLinkActive(item.href);
                  const hasMega = Boolean(item.megaKey);
                  const isOpen = activeMega === item.megaKey;

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => hasMega ? openMega(item.megaKey!) : openMega(null)}
                      onMouseLeave={() => hasMega ? closeMega() : undefined}
                    >
                      <Link
                        href={item.href}
                        className={`inline-flex items-center font-semibold uppercase transition-colors text-xs lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] font-anek tracking-wider whitespace-nowrap ${
                          active
                            ? isScrolled
                              ? "text-white font-extrabold"
                              : "text-[#00c2b2] font-bold"
                            : isScrolled
                              ? "text-white/90 hover:text-white"
                              : "text-white hover:text-[#00c2b2]"
                        }`}
                        onClick={() => setActiveMega(null)}
                      >
                        {item.name}
                      </Link>

                      {/* Active underline */}
                      {active && (
                        <span
                          className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                            isScrolled ? "bg-white shadow-[0_1px_4px_rgba(255,255,255,0.6)]" : "bg-[#00c2b2]"
                          }`}
                        />
                      )}

                      {/* Top triangle pointer for hovered menu */}
                      {hasMega && isOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
                          <svg
                            width="18"
                            height="9"
                            viewBox="0 0 18 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={isScrolled ? "text-white" : "text-[#01a9a0]"}
                          >
                            <path d="M0 9L9 0L18 9H0Z" fill="currentColor" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mega dropdown */}
              {activeMega && activeMegaData && renderMegaMenu(activeMegaData)}
            </div>

            {/* ── RIGHT CONTROLS ──────────────────────────────────── */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
              <ExpandableSearchBar
                onSearch={handleSearch}
                placeholder={t.nav.searchPlaceholder}
                suggestions={searchSuggestions}
                dashedButton={true}
                isScrolled={isScrolled}
                iconColor={isScrolled ? "text-[#01a9a0]" : "text-white"}
                hoverIconColor="hover:text-[#00c2b2]"
              />
              <Link
                href="/get-a-quote"
                className={`pl-4 pr-1.5 py-1.5 sm:pl-5 sm:pr-2 sm:py-2 xl:pl-6 xl:pr-2.5 xl:py-2.5 rounded-full font-bold text-xs xl:text-sm tracking-wider uppercase inline-flex items-center gap-2 xl:gap-3 transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer group ${
                  isScrolled
                    ? "bg-white hover:bg-slate-50 text-[#01a9a0] shadow-[0_4px_18px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
                    : "bg-[#00b3a4] hover:bg-[#00c2b2] text-white shadow-[0_4px_18px_rgba(0,179,164,0.4)] hover:shadow-[0_6px_24px_rgba(0,194,178,0.6)]"
                }`}
              >
                <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
                <span
                  className={`w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${
                    isScrolled
                      ? "bg-[#01a9a0] text-white shadow-sm"
                      : "bg-white text-[#00b3a4]"
                  }`}
                >
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>

            {/* ── MOBILE HAMBURGER ────────────────────────────────── */}
            <div className="lg:hidden" style={{ zIndex: 100000, position: "relative" }}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`relative w-11 h-11 transition-all flex items-center justify-center cursor-pointer rounded-full ${
                  isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-[#01a9a0] hover:opacity-80"
                }`}
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
      </nav>

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
        className={`fixed top-0 right-0 h-full w-[320px] max-w-full bg-[#010f12] border-l border-white/10 transform transition-transform duration-300 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
          <Image src="/logo.png" alt="Logo" width={80} height={64} className="w-auto h-auto max-h-11 object-contain" />
        </div>

        {/* Mobile Search Input */}
        <div className="px-5 py-3 border-b border-white/10 relative z-30">
          <ExpandableSearchBar
            isDrawer={true}
            onSearch={handleSearch}
            onCloseMenu={() => setIsMobileMenuOpen(false)}
            placeholder={t.nav.searchPlaceholder}
            suggestions={searchSuggestions}
          />
        </div>

        {/* Nav list */}
        <div className="overflow-y-auto h-[calc(100%-170px)] pb-8">
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              const hasMega = !!item.megaKey;
              const isExpanded = mobileExpanded === item.megaKey;

              const megaData: MegaData | null =
                item.megaKey === "services" ? servicesMegaMenu[lang] :
                  item.megaKey === "solutions" ? solutionsMegaMenu[lang] :
                    item.megaKey === "projects" ? projectsMegaMenu[lang] :
                      item.megaKey === "industries" ? industriesMegaMenu[lang] :
                        item.megaKey === "subcontractors" ? subcontractorsMegaMenu[lang] :
                          item.megaKey === "resources" ? resourcesMegaMenu[lang] :
                            item.megaKey === "careers" ? careersMegaMenu[lang] :
                              item.megaKey === "company" ? companyMegaMenu[lang] : null;

              return (
                <div key={item.name} className="border-b border-white/[0.06]">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-1 px-6 py-4 text-[14px] font-semibold uppercase tracking-wider font-anek transition-colors ${active ? "text-[#00c2b2]" : "text-white/80 hover:text-white"
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
                            onClick={(e) => {
                              setIsMobileMenuOpen(false);
                              setMobileExpanded(null);
                              if (sub.href.includes("#")) {
                                const [targetPath, hash] = sub.href.split("#");
                                const isCurrent = (targetPath === "" && pathname === "/") || targetPath === pathname;
                                if (isCurrent && hash) {
                                  e.preventDefault();
                                  const el = document.getElementById(hash);
                                  if (el) {
                                    el.scrollIntoView({ behavior: "smooth" });
                                    window.history.pushState(null, "", sub.href);
                                  }
                                }
                              }
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                          >
                            {/* Icon */}
                            <div className="w-8 h-8 rounded-lg bg-[#009e90]/20 border border-[#009e90]/20 flex items-center justify-center flex-shrink-0">
                              <NavIcon src={sub.icon} alt={sub.title} size={16} />
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
            <Link
              href="/get-a-quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full pl-5 pr-1.5 py-2 sm:py-2.5 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] text-white font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2.5 shadow-lg group transition-colors"
            >
              <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#00b3a4] flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
