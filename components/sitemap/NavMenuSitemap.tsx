"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowRight,
  ExternalLink,
  UserCheck,
  MapPin,
  Mail,
  PhoneCall,
  Truck,
  LifeBuoy,
  Layers,
  Sparkles,
} from "lucide-react";
import ContactModals, { ContactModalType } from "../ContactModals";

interface NavSubItem {
  icon?: string;
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
  href: string;
  action?: ContactModalType;
}

interface NavMenuGroup {
  id: string;
  num: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  mainHref: string;
  ctaEn: string;
  ctaAr: string;
  badgeEn: string;
  badgeAr: string;
  items: NavSubItem[];
}

const NAV_MENU_GROUPS: NavMenuGroup[] = [
  // 1. SERVICES
  {
    id: "services",
    num: "01",
    titleEn: "Services",
    titleAr: "خدماتنا",
    taglineEn: "Six specialist divisions — one guarantee",
    taglineAr: "ستة أقسام متخصصة — ضمان واحد",
    mainHref: "/services",
    ctaEn: "Explore All Services",
    ctaAr: "استكشف جميع الخدمات",
    badgeEn: "Core Services",
    badgeAr: "الخدمات الأساسية",
    items: [
      {
        icon: "/headerIcon/SVG (6).svg",
        titleEn: "GRP & Fiberglass Waterproofing",
        titleAr: "عزل GRP والألياف الزجاجية",
        subEn: "Durable protection for roofs, tanks, and exposed surfaces.",
        subAr: "حماية متينة للأسطح والخزانات والمناطق المكشوفة.",
        href: "/services?service=1&sub=grp-fiberglass-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (7).svg",
        titleEn: "Combo System Roof Waterproofing",
        titleAr: "نظام الكومبو للأسطح",
        subEn: "Multi-layer protection for long-lasting roof performance.",
        subAr: "حماية متعددة الطبقات لأداء يدوم طويلاً للأسطح.",
        href: "/services?service=1&sub=combo-system-roof-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (11).svg",
        titleEn: "Epoxy Floor Coating",
        titleAr: "طلاء أرضيات الإيبوكسي",
        subEn: "Tough, seamless coating for durable and easy-clean floors.",
        subAr: "طلاء سلس وقوي لأرضيات متينة وسهلة التنظيف.",
        href: "/services?service=1&sub=epoxy-floor-coating",
      },
      {
        icon: "/headerIcon/SVG (12).svg",
        titleEn: "Bitumen Membrane Waterproofing",
        titleAr: "عزل الغشاء البيتوميني",
        subEn: "Reliable moisture protection for roofs and foundations.",
        subAr: "حماية موثوقة من الرطوبة للأسطح والأساسات.",
        href: "/services?service=1&sub=bitumen-membrane-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (8).svg",
        titleEn: "Polyurea Waterproofing",
        titleAr: "عزل البولي يوريا",
        subEn: "Fast-curing, flexible protection for demanding surfaces.",
        subAr: "حماية سريعة الجفاف ومرنة للأسطح ذات المتطلبات العالية.",
        href: "/services?service=1&sub=polyurea-coating-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (15).svg",
        titleEn: "Injection Waterproofing",
        titleAr: "عزل الحقن المائي",
        subEn: "Targeted sealing of cracks, joints, and water leaks.",
        subAr: "سد مستهدف للشقوق والفواصل وتسربات المياه.",
        href: "/services?service=1&sub=injection-waterproofing",
      },
    ],
  },

  // 2. SOLUTIONS
  {
    id: "solutions",
    num: "02",
    titleEn: "Solutions",
    titleAr: "حلولنا",
    taglineEn: "End-to-end protection — built to last",
    taglineAr: "حماية شاملة من البداية للنهاية — مصممة للديمومة",
    mainHref: "/solutions",
    ctaEn: "Explore All Solutions",
    ctaAr: "استكشف جميع الحلول",
    badgeEn: "Engineering Solutions",
    badgeAr: "حلول هندسية",
    items: [
      {
        icon: "/headerIcon/SVG (6).svg",
        titleEn: "Waterproofing Solutions",
        titleAr: "حلول العزل المائي",
        subEn: "Comprehensive protection against water and moisture.",
        subAr: "حماية متكاملة ضد المياه والرطوبة.",
        href: "/services?service=1",
      },
      {
        icon: "/headerIcon/SVG (9).svg",
        titleEn: "Concrete Repair & Protection",
        titleAr: "إصلاح وحماية الخرسانة",
        subEn: "Restore and protect concrete structures.",
        subAr: "ترميم وحماية المنشآت الخرسانية.",
        href: "/services?service=1&sub=injection-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (7).svg",
        titleEn: "Roofing Solutions",
        titleAr: "حلول الأسطح",
        subEn: "Durable protection for roofs and complex structures.",
        subAr: "حماية متينة للأسطح والمنشآت.",
        href: "/services?service=1&sub=combo-system-roof-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (12).svg",
        titleEn: "Basement & Below-Ground Solutions",
        titleAr: "حلول السراديب وتحت الأرض",
        subEn: "Reliable protection for foundations and underground areas.",
        subAr: "حماية للأساسات والمناطق تحت الأرض.",
        href: "/services?service=1&sub=bitumen-membrane-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (8).svg",
        titleEn: "Joint Sealing Solutions",
        titleAr: "حلول سد الفواصل",
        subEn: "Reliable sealing for expansion joints and movement areas.",
        subAr: "سد موثوق للفواصل ومناطق الحركة.",
        href: "/services?service=1&sub=polyurea-coating-waterproofing",
      },
      {
        icon: "/headerIcon/SVG (11).svg",
        titleEn: "Specialized Construction Solutions",
        titleAr: "حلول إنشائية متخصصة",
        subEn: "Custom-tailored solutions for demanding project requirements.",
        subAr: "حلول مصممة للمتطلبات المعقدة.",
        href: "/solutions",
      },
    ],
  },

  // 3. PROJECTS
  {
    id: "projects",
    num: "03",
    titleEn: "Projects",
    titleAr: "مشاريعنا",
    taglineEn: "Landmark developments across the UAE",
    taglineAr: "مشاريع رائدة ومعالم منجزة في كافة أنحاء الإمارات",
    mainHref: "/project",
    ctaEn: "Explore All Projects",
    ctaAr: "استكشف جميع المشاريع",
    badgeEn: "Portfolio",
    badgeAr: "معرض المشاريع",
    items: [
      {
        icon: "/headerIcon/SVG (1).svg",
        titleEn: "Miami 1",
        titleAr: "ميامي 1",
        subEn: "Jumeirah Village Circle (JVC), Samana Developers",
        subAr: "قرية جميرا الدائرية (JVC)، سمانا العقارية",
        href: "/project",
      },
      {
        icon: "/headerIcon/SVG (13).svg",
        titleEn: "Miami Phase 2",
        titleAr: "ميامي المرحلة 2",
        subEn: "Jumeirah Village Triangle (JVT), Samana Developers",
        subAr: "مثلث قرية جميرا (JVT)، سمانا العقارية",
        href: "/project",
      },
      {
        icon: "/headerIcon/SVG (7).svg",
        titleEn: "City Premiere Marina Hotel Apartments",
        titleAr: "شقق سيتي بريمير مارينا الفندقية",
        subEn: "Dubai Marina, Dubai",
        subAr: "دبي مارينا، دبي",
        href: "/project",
      },
      {
        icon: "/headerIcon/SVG (4).svg",
        titleEn: "NED Al Ghurair – Al Furjan South Villas",
        titleAr: "فلل الغرير | الفرجان جنوب",
        subEn: "Al Furjan, Dubai",
        subAr: "الفرجان، دبي",
        href: "/project",
      },
      {
        icon: "/headerIcon/SVG (9).svg",
        titleEn: "Dubai Hills Estate",
        titleAr: "دبي هيلز استيت",
        subEn: "Dubai, Emaar",
        subAr: "دبي، إعمار",
        href: "/project",
      },
      {
        icon: "/headerIcon/SVG (16).svg",
        titleEn: "Arabian Ranches",
        titleAr: "المرابع العربية",
        subEn: "Dubai, Emaar",
        subAr: "دبي، إعمار",
        href: "/project",
      },
    ],
  },

  // 4. INDUSTRIES
  {
    id: "industries",
    num: "04",
    titleEn: "Industries",
    titleAr: "القطاعات التي نخدمها",
    taglineEn: "Engineering & Technical Services Across Core Sectors",
    taglineAr: "خدمات هندسية وفنية متخصصة عبر القطاعات الحيوية",
    mainHref: "/industries",
    ctaEn: "Explore All Industries",
    ctaAr: "استكشف جميع القطاعات",
    badgeEn: "Target Sectors",
    badgeAr: "القطاعات المستهدفة",
    items: [
      {
        icon: "/headerIcon/SVG (1).svg",
        titleEn: "Commercial & Residential",
        titleAr: "التجاري والسكني",
        subEn: "Offices, retail, villas, apartments, and mixed-use developments.",
        subAr: "مكاتب، تجزئة، فلل، شقق ومشاريع متعددة الاستخدامات.",
        href: "/industries#construction",
      },
      {
        icon: "/headerIcon/SVG (7).svg",
        titleEn: "Hospitality & Tourism",
        titleAr: "الضيافة والسياحة",
        subEn: "Hotels, resorts, leisure facilities, and tourism developments.",
        subAr: "فنادق، منتجعات، مرافق ترفيهية ومشاريع سياحية.",
        href: "/industries#hospitality",
      },
      {
        icon: "/headerIcon/SVG (2).svg",
        titleEn: "Industrial & Warehousing",
        titleAr: "الصناعي والمستودعات",
        subEn: "Factories, industrial plants, warehouses, and logistics facilities.",
        subAr: "مصانع، منشآت صناعية، مستودعات ومرافق لوجستية.",
        href: "/industries#manufacturing",
      },
      {
        icon: "/headerIcon/SVG (6).svg",
        titleEn: "Energy, Oil & Gas",
        titleAr: "الطاقة والنفط والغاز",
        subEn: "Energy facilities, oil and gas projects, and supporting infrastructure.",
        subAr: "منشآت طاقة، مشاريع نفط وغاز وبنية تحتية مساندة.",
        href: "/industries#oil-gas",
      },
      {
        icon: "/headerIcon/SVG (8).svg",
        titleEn: "Infrastructure & Transportation",
        titleAr: "البنية التحتية والنقل",
        subEn: "Roads, utilities, airports, and transport infrastructure.",
        subAr: "طرق، مرافق عامة، مطارات وبنية تحتية للمواصلات.",
        href: "/industries#power-energy",
      },
      {
        icon: "/headerIcon/SVG (3).svg",
        titleEn: "Government & Public Sector",
        titleAr: "القطاع الحكومي والعام",
        subEn: "Government buildings, public facilities, and institutional projects.",
        subAr: "مبانٍ حكومية، مرافق عامة ومشاريع مؤسسية.",
        href: "/industries#marine-offshore",
      },
    ],
  },

  // 5. SUBCONTRACTORS
  {
    id: "subcontractors",
    num: "05",
    titleEn: "Subcontractors",
    titleAr: "المقاولون من الباطن",
    taglineEn: "Certified Subcontracting Execution Partner",
    taglineAr: "شريك مقاولات باطن معتمد وموثوق للمشاريع",
    mainHref: "/subcontract",
    ctaEn: "Explore Subcontracting",
    ctaAr: "استكشف خدمات المقاولة",
    badgeEn: "Partnership",
    badgeAr: "الشراكة والتنفيذ",
    items: [
      {
        icon: "/headerIcon/SVG (1).svg",
        titleEn: "Subcontracting Capabilities",
        titleAr: "قدرات المقاولة من الباطن",
        subEn: "Explore our expertise and capabilities as a subcontracting partner.",
        subAr: "استكشف خبراتنا وإمكانياتنا كشريك مقاولات تخصصي.",
        href: "/subcontract#capabilities",
      },
      {
        icon: "/headerIcon/SVG (6).svg",
        titleEn: "Our Services",
        titleAr: "خدماتنا للمقاولين",
        subEn: "Discover the services we provide to main contractors and project partners.",
        subAr: "تعرف على الخدمات التي نقدمها للمقاولين الرئيسيين وشركاء المشاريع.",
        href: "/subcontract#services",
      },
      {
        icon: "/headerIcon/SVG (13).svg",
        titleEn: "Project Experience",
        titleAr: "خبرة المشاريع",
        subEn: "View our relevant project experience and completed works.",
        subAr: "استعرض خبراتنا في المشاريع السابقة والأعمال المنجزة.",
        href: "/subcontract#projects",
      },
      {
        icon: "/headerIcon/SVG (8).svg",
        titleEn: "Technical Expertise",
        titleAr: "الخبرة الفنية والهندسية",
        subEn: "Learn about our technical resources, skills, and capabilities.",
        subAr: "تعرّف على مواردنا الفنية ومهاراتنا وقدراتنا الهندسية.",
        href: "/subcontract#expertise",
      },
      {
        icon: "/headerIcon/SVG (15).svg",
        titleEn: "Certifications & Compliance",
        titleAr: "الشهادات والامتثال",
        subEn: "Review our certifications, approvals, and compliance standards.",
        subAr: "اطلع على شهاداتنا واعتماداتنا ومعايير الامتثال المعتمدة.",
        href: "/subcontract#certifications",
      },
      {
        icon: "/headerIcon/SVG (11).svg",
        titleEn: "Partner With Us",
        titleAr: "شاركنا النجاح",
        subEn: "Connect with our team for subcontracting opportunities and collaboration.",
        subAr: "تواصل مع فريقنا لفرص المقاولات والشراكات المستقبلية.",
        href: "/subcontract#partner",
      },
    ],
  },

  // 6. COMPANY
  {
    id: "company",
    num: "06",
    titleEn: "Company",
    titleAr: "الشركة",
    taglineEn: "Engineering Excellence Across the UAE",
    taglineAr: "الريادة والتميز الهندسي في الإمارات",
    mainHref: "/about-us",
    ctaEn: "About Taj Al Rahmah",
    ctaAr: "عن شركة تاج الرحمة",
    badgeEn: "Corporate",
    badgeAr: "عن المؤسسة",
    items: [
      {
        icon: "arrow",
        titleEn: "About Us",
        titleAr: "من نحن",
        subEn: "Who we are, our history, vision, and core values.",
        subAr: "من نحن ورؤيتنا وما نقوم به.",
        href: "/about-us",
      },
      {
        icon: "arrow",
        titleEn: "Our Expertise",
        titleAr: "خبراتنا",
        subEn: "Specialized engineering skills, equipment, and capabilities.",
        subAr: "مهاراتنا الفنية وقدراتنا المتخصصة.",
        href: "/expertise",
      },
      {
        icon: "arrow",
        titleEn: "Why Choose Us",
        titleAr: "لماذا تختارنا",
        subEn: "Proven track record, certified quality, and dedicated warranty.",
        subAr: "ما يميزنا عن غيرنا في الجودة والتنفيذ.",
        href: "/#why-choose-us",
      },
      {
        icon: "arrow",
        titleEn: "Certifications & Approvals",
        titleAr: "الشهادات والاعتمادات",
        subEn: "Official municipality, ISO, and authority approvals.",
        subAr: "شهاداتنا واعتماداتنا الرسمية.",
        href: "/certifications",
      },
      {
        icon: "arrow",
        titleEn: "Company Profile",
        titleAr: "الملف التعريفي للشركة",
        subEn: "Download and view our complete corporate profile.",
        subAr: "احصل على الملف التعريفي الكامل للشركة.",
        href: "/about-us#company-profile",
      },
      {
        icon: "arrow",
        titleEn: "Contact Us",
        titleAr: "اتصل بنا",
        subEn: "Connect with our team across Dubai and Northern Emirates.",
        subAr: "تواصل مع مكاتبنا في دبي والشارقة.",
        href: "/contact",
      },
    ],
  },

  // 7. CAREERS
  {
    id: "careers",
    num: "07",
    titleEn: "Careers",
    titleAr: "الوظائف",
    taglineEn: "Build Your Career With Engineering Excellence",
    taglineAr: "ابنِ مسيرتك المهنية مع رواد التميز الهندسي",
    mainHref: "/career",
    ctaEn: "Join Our Team",
    ctaAr: "انضم إلى فريقنا",
    badgeEn: "Join Us",
    badgeAr: "فرص العمل",
    items: [
      {
        icon: "arrow",
        titleEn: "Why Join Us",
        titleAr: "لماذا تنضم إلينا",
        subEn: "What makes us a great place to build your engineering career.",
        subAr: "ما يجعل شركتنا المكان المثالي لبناء مسيرتك المهنية.",
        href: "/career#why-join-us",
      },
      {
        icon: "arrow",
        titleEn: "Current Openings",
        titleAr: "الوظائف الشاغرة",
        subEn: "Explore our latest engineering, technical, and site opportunities.",
        subAr: "استكشف أحدث الفرص الوظيفية المتاحة لدينا.",
        href: "/career#current-openings",
      },
      {
        icon: "arrow",
        titleEn: "Life at Our Company",
        titleAr: "بيئة العمل وثقافتنا",
        subEn: "Discover our dynamic workplace, safety culture, and values.",
        subAr: "اكتشف ثقافة العمل وبيئتنا المهنية المتميزة.",
        href: "/career#life-at-our-company",
      },
      {
        icon: "arrow",
        titleEn: "Submit Your CV",
        titleAr: "أرسل سيرتك الذاتية",
        subEn: "Share your CV for current openings or future roster opportunities.",
        subAr: "شارك سيرتك الذاتية للفرص الحالية والمستقبلية.",
        href: "/career?job=1",
      },
      {
        icon: "arrow",
        titleEn: "Recruitment Process",
        titleAr: "آلية التوظيف",
        subEn: "Learn about our clear and transparent hiring milestones.",
        subAr: "تعرف على مراحل التوظيف والاختيار في شركتنا.",
        href: "/career#recruitment-process",
      },
      {
        icon: "arrow",
        titleEn: "Career FAQs",
        titleAr: "الأسئلة الشائعة",
        subEn: "Answers to common questions about working with Taj Al Rahmah.",
        subAr: "إجابات عن أبرز الاستفسارات الوظيفية الشائعة.",
        href: "/career#faqs",
      },
    ],
  },

  // 8. CONTACT
  {
    id: "contact",
    num: "08",
    titleEn: "Contact",
    titleAr: "اتصل بنا",
    taglineEn: "Get in touch with our expert engineering team",
    taglineAr: "تواصل مع فريق خبرائنا الهندسي المتميز",
    mainHref: "/contact",
    ctaEn: "Get In Touch",
    ctaAr: "تواصل معنا اليوم",
    badgeEn: "Direct Support",
    badgeAr: "التواصل والدعم",
    items: [
      {
        icon: "expert",
        titleEn: "Talk to an Expert",
        titleAr: "تحدث مع خبير",
        subEn: "Direct consultation with our senior waterproofing engineers.",
        subAr: "استشارة فنية متخصصة مع خبرائنا الهندسيين.",
        href: "/contact#expert",
        action: "expert",
      },
      {
        icon: "location",
        titleEn: "Our Locations",
        titleAr: "مواقعنا ومكاتبنا",
        subEn: "Office locations, addresses, and interactive Google Maps.",
        subAr: "المكاتب والعناوين وخريطة الوصول المباشرة.",
        href: "/contact#map",
      },
      {
        icon: "enquiry",
        titleEn: "Send an Enquiry",
        titleAr: "إرسال استفسار",
        subEn: "Submit general questions, proposals, or project briefs.",
        subAr: "استفسار عام حول خدماتنا وعروض الأسعار.",
        href: "/contact#enquiry",
        action: "enquiry",
      },
      {
        icon: "callback",
        titleEn: "Request a Callback",
        titleAr: "طلب معاودة الاتصال",
        subEn: "Leave your number and our technical team will call you back.",
        subAr: "طلب اتصال هاتفي وسيقوم فريقنا بالتواصل معك سريعاً.",
        href: "/contact#callback",
        action: "callback",
      },
      {
        icon: "supplier",
        titleEn: "Supplier Enquiries",
        titleAr: "استفسارات الموردين",
        subEn: "Vendor registration, material supply, and partnership enquiries.",
        subAr: "توريد المواد والمعدات وتسجيل الموردين المعتمدين.",
        href: "/contact#supplier",
        action: "supplier",
      },
      {
        icon: "support",
        titleEn: "Customer Support & Warranty",
        titleAr: "خدمة العملاء والدعم والضمان",
        subEn: "Active project support, maintenance requests, and warranty claims.",
        subAr: "دعم المشاريع وخدمات ما بعد التنفيذ ومتابعة الضمان.",
        href: "/support",
      },
    ],
  },
];

function NavSitemapIcon({ icon, alt }: { icon?: string; alt: string }) {
  if (icon === "expert") {
    return <UserCheck className="w-5 h-5 text-[#009e90]" />;
  }
  if (icon === "location") {
    return <MapPin className="w-5 h-5 text-[#009e90]" />;
  }
  if (icon === "enquiry") {
    return <Mail className="w-5 h-5 text-[#009e90]" />;
  }
  if (icon === "callback") {
    return <PhoneCall className="w-5 h-5 text-[#009e90]" />;
  }
  if (icon === "supplier") {
    return <Truck className="w-5 h-5 text-[#009e90]" />;
  }
  if (icon === "support") {
    return <LifeBuoy className="w-5 h-5 text-[#009e90]" />;
  }
  if (!icon || icon === "arrow") {
    return (
      <ArrowRight className="w-4 h-4 text-[#009e90] rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
    );
  }

  return (
    <Image
      src={icon}
      alt={alt}
      width={22}
      height={22}
      className="object-contain"
      unoptimized
    />
  );
}

export default function NavMenuSitemap() {
  const { isArabic } = useLanguage();
  const [activeContactModal, setActiveContactModal] = useState<ContactModalType>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="w-full bg-[#fbfdfd] min-h-screen text-slate-900">
      {/* ─── 1. TOP BANNER ────────────────────────────────────────── */}
      <section className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="/sitemapBanner.png"
            alt={isArabic ? "خريطة الموقع - تاج الرحمة" : "Site Map - Taj Al Rahmah"}
            fill
            priority
            unoptimized
            className={`object-cover ${isArabic ? "scale-x-[-1] object-left" : "object-right sm:object-center"
              }`}
          />
          {/* Dark gradient overlay for high contrast readability */}
          <div
            className={`absolute inset-0 ${isArabic
              ? "bg-gradient-to-l from-black/85 via-black/60 to-transparent"
              : "bg-gradient-to-r from-black/85 via-black/60 to-transparent"
              }`}
          />
        </div>

        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
          <div className="max-w-2xl text-left rtl:text-right">
            {/* Brand Title */}
            <p className="text-xl sm:text-2xl md:text-[28px] font-bold text-white tracking-wide mb-1 drop-shadow-sm">
              {isArabic ? "تاج الرحمة" : "Taj Al Rahmah"}
            </p>

            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#00DDCF] tracking-tight leading-tight drop-shadow-sm">
              {isArabic ? "خريطة الموقع" : "Site Map"}
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base text-white/85 max-w-xl font-medium leading-relaxed">
              {isArabic
                ? "دليلك الشامل لجميع أقسام القائمة الرئيسية الـ 8، وتشمل 48 رابطاً فرعياً لكافة خدماتنا وحلولنا ومشاريعنا وقطاعاتنا ومواردنا."
                : "Comprehensive navigation directory featuring all 8 primary header groups and their 48 specialized services, solutions, projects, and resources."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. QUICK JUMP PILLS ───────────────────────────────────── */}
      <section className="hidden border-b border-stone-200/80 bg-white sticky top-16 z-30 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-3.5 sm:py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 shrink-0 hidden md:inline-flex items-center gap-1.5 ltr:mr-2 rtl:ml-2">
              <Layers className="w-3.5 h-3.5 text-[#009e90]" />
              {isArabic ? "الأقسام الثمانية:" : "8 Navigation Groups:"}
            </span>
            {NAV_MENU_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                onClick={(e) => scrollToSection(e, group.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100/80 hover:bg-[#009e90] text-stone-700 hover:text-white transition-all whitespace-nowrap shrink-0 group border border-stone-200/60"
              >
                <span className="text-[10px] opacity-60 font-mono group-hover:text-white">
                  {group.num}
                </span>
                <span>{isArabic ? group.titleAr : group.titleEn}</span>
                <span className="text-[10px] bg-white/70 group-hover:bg-white/20 text-stone-600 group-hover:text-white px-1.5 py-0.2 rounded-full font-bold">
                  6
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. 8 HEADER NAV GROUPS CONTAINER ──────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="space-y-16 sm:space-y-20">
          {NAV_MENU_GROUPS.map((group) => {
            return (
              <section
                key={group.id}
                id={group.id}
                className="scroll-mt-32 border-b border-stone-200/70 pb-12 sm:pb-16 last:border-b-0 last:pb-0"
              >
                {/* ── Group Header (Heading + Subtitle + CTA) ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-100">
                  <div>
                    {/* Badge & Number */}
                    <div className="hidden flex items-center gap-2 mb-2">
                      <span className="inline-block w-4 sm:w-5 h-[3px] bg-[#00DDCF] rounded-full shrink-0" />
                      <span className="text-xs font-mono font-bold text-[#009e90] tracking-wider uppercase">
                        Group {group.num}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0faf9] text-[#009e90] border border-[#009e90]/20">
                        {isArabic ? group.badgeAr : group.badgeEn}
                      </span>
                    </div>

                    {/* Main Group Heading */}
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                        <Link
                          href={group.mainHref}
                          className="hover:text-[#009e90] transition-colors inline-flex items-center gap-2 group/title"
                        >
                          <span>{isArabic ? group.titleAr : group.titleEn}</span>
                          <ExternalLink className="w-5 h-5 text-stone-400 group-hover/title:text-[#009e90] opacity-0 group-hover/title:opacity-100 transition-opacity" />
                        </Link>
                      </h2>
                    </div>

                    {/* Group Tagline */}
                    <p className="mt-1.5 text-sm sm:text-base text-stone-500 font-medium">
                      {isArabic ? group.taglineAr : group.taglineEn}
                    </p>
                  </div>

                  {/* Main section CTA button */}
                  <Link
                    href={group.mainHref}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#009e90] hover:text-[#01776d] px-4 py-2 rounded-xl bg-[#f0faf9] hover:bg-[#e3f6f4] transition-all self-start md:self-auto border border-[#009e90]/15 shrink-0"
                  >
                    <span>{isArabic ? group.ctaAr : group.ctaEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>

                {/* ── Group's 6 Submenu Links Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {group.items.map((item, itemIdx) => {
                    const isModalAction = Boolean(item.action);

                    return (
                      <div
                        key={itemIdx}
                        className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-[#009e90]/40 hover:shadow-[0_10px_30px_rgba(0,158,144,0.08)] transition-all duration-200"
                      >
                        {isModalAction ? (
                          <button
                            type="button"
                            onClick={() => setActiveContactModal(item.action!)}
                            className="text-left rtl:text-right w-full flex flex-col h-full justify-between"
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Icon container */}
                              <div className="w-10 h-10 rounded-xl bg-[#f0faf9] border border-[#009e90]/15 flex items-center justify-center shrink-0 group-hover:bg-[#009e90]/15 group-hover:border-[#009e90]/30 transition-all">
                                <NavSitemapIcon
                                  icon={item.icon}
                                  alt={isArabic ? item.titleAr : item.titleEn}
                                />
                              </div>

                              {/* Title & Sub */}
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#009e90] transition-colors leading-snug">
                                  {isArabic ? item.titleAr : item.titleEn}
                                </h3>
                                <p className="mt-1.5 text-[13px] sm:text-[14px] text-stone-500 leading-relaxed line-clamp-2">
                                  {isArabic ? item.subAr : item.subEn}
                                </p>
                              </div>
                            </div>

                            {/* Bottom link prompt */}
                            <div className="hidden pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#009e90]">
                              <span>{isArabic ? "فتح نافذة التواصل" : "Open Contact Modal"}</span>
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex flex-col h-full justify-between"
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Icon container */}
                              <div className="w-10 h-10 rounded-xl bg-[#f0faf9] border border-[#009e90]/15 flex items-center justify-center shrink-0 group-hover:bg-[#009e90]/15 group-hover:border-[#009e90]/30 transition-all">
                                <NavSitemapIcon
                                  icon={item.icon}
                                  alt={isArabic ? item.titleAr : item.titleEn}
                                />
                              </div>

                              {/* Title & Sub */}
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#009e90] transition-colors leading-snug">
                                  {isArabic ? item.titleAr : item.titleEn}
                                </h3>
                                <p className="mt-1.5 text-[13px] sm:text-[14px] text-stone-500 leading-relaxed line-clamp-2">
                                  {isArabic ? item.subAr : item.subEn}
                                </p>
                              </div>
                            </div>

                            {/* Bottom link indicator */}
                            <div className="hidden pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-400 group-hover:text-[#009e90] transition-colors">
                              <span className="truncate max-w-[200px] text-[11px] font-mono">
                                {item.href}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Contact Modals if user clicks any modal action from the Contact group */}
      <ContactModals
        activeModal={activeContactModal}
        onClose={() => setActiveContactModal(null)}
      />
    </div>
  );
}
