"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  X,
  UserCheck,
  MapPin,
  Mail,
  PhoneCall,
  Truck,
  LifeBuoy,
  ArrowRight,
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
  const [searchQuery, setSearchQuery] = useState("");

  // Search only regarding this page's mentioned links
  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return NAV_MENU_GROUPS;

    return NAV_MENU_GROUPS.map((group) => {
      const groupMatches =
        group.titleEn.toLowerCase().includes(q) ||
        group.titleAr.toLowerCase().includes(q);

      if (groupMatches) {
        return group;
      }

      const matchingItems = group.items.filter(
        (item) =>
          item.titleEn.toLowerCase().includes(q) ||
          item.titleAr.toLowerCase().includes(q) ||
          item.href.toLowerCase().includes(q)
      );

      return {
        ...group,
        items: matchingItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const totalMatchingCount = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.items.length, 0);
  }, [filteredGroups]);

  return (
    <div className="w-full bg-white min-h-screen text-slate-900" dir={isArabic ? "rtl" : "ltr"}>
      {/* ─── 1. TOP BANNER ────────────────────────────────────────── */}
      <section className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <Image
            src="/sitemapBanner.jpeg"
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
              ? "bg-gradient-to-l from-black/90 via-black/65 to-black/30"
              : "bg-gradient-to-r from-black/90 via-black/65 to-black/30"
              }`}
          />
        </div>

        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
          <div className="max-w-2xl text-left rtl:text-right">
            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#00DDCF] mb-1.5 drop-shadow-sm">
              {isArabic ? "تاج الرحمة للمقاولات" : "Taj Al Rahmah Contracting"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
              {isArabic ? "خريطة الموقع" : "Site Map"}
            </h1>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-white/80 max-w-xl font-normal leading-relaxed">
              {isArabic
                ? "دليل تنقل سريع لكافة صفحات وأقسام وخدمات موقع تاج الرحمة."
                : "A complete navigational directory of all pages, services, projects, and resources."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. SEARCH & DIRECTORY MAIN CONTENT ────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        {/* Search Bar (searches only regarding this page's mentioned links) */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-4 rtl:pl-0 rtl:pr-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isArabic
                  ? "ابحث في روابط خريطة الموقع..."
                  : "Search sitemap links..."
              }
              className="w-full pl-11 pr-11 rtl:pl-11 rtl:pr-11 py-3.5 sm:py-4 text-sm sm:text-base rounded-2xl border border-slate-300 hover:border-[#01a9a0]/60 bg-white text-slate-900 shadow-sm transition-all outline-none focus:border-[#01a9a0] focus:ring-4 focus:ring-[#01a9a0]/20 focus:shadow-[0_4px_24px_rgba(1,169,160,0.22)] placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-4 rtl:pr-0 rtl:pl-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label={isArabic ? "مسح البحث" : "Clear search"}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Result Feedback */}
          {searchQuery.trim() && (
            <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-slate-600 px-1">
              <span>
                {isArabic
                  ? `تم العثور على ${totalMatchingCount} رابطاً يطابق "${searchQuery}"`
                  : `Found ${totalMatchingCount} link${totalMatchingCount === 1 ? "" : "s"} matching "${searchQuery}"`}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#0067b8] hover:text-[#004b87] hover:underline font-semibold cursor-pointer"
              >
                {isArabic ? "إعادة ضبط البحث" : "Reset search"}
              </button>
            </div>
          )}
        </div>

        {/* ─── 3. SITEMAP GROUPS & LINKS (AS PER REFERENCE DESIGN) ─── */}
        {filteredGroups.length === 0 ? (
          /* Empty Search Results State */
          <div className="py-16 text-center max-w-md mx-auto animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isArabic ? "لم يتم العثور على روابط مطابقة" : "No matching links found"}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              {isArabic
                ? `لا توجد روابط في خريطة الموقع تطابق "${searchQuery}". يرجى تجربة كلمة بحث أخرى.`
                : `No links in the sitemap matched "${searchQuery}". Please try searching with a different keyword.`}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#0067b8] hover:bg-[#004b87] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              {isArabic ? "عرض جميع الروابط" : "Show All Links"}
            </button>
          </div>
        ) : (
          /* Multi-column Directory Grid Matching Reference Image */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12">
            {filteredGroups.map((group) => (
              <div key={group.id} className="flex flex-col">
                {/* Section Title (Bold, Dark text like reference) */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-3.5 tracking-tight">
                  <Link
                    href={group.mainHref}
                    className="hover:text-[#0067b8] transition-colors"
                  >
                    {isArabic ? group.titleAr : group.titleEn}
                  </Link>
                </h2>

                {/* Vertical list of blue underlined text links as per reference image */}
                <ul className="space-y-2 sm:space-y-2.5">
                  {group.items.map((item, idx) => (
                    <li key={idx}>
                      {item.action ? (
                        <button
                          type="button"
                          onClick={() => setActiveContactModal(item.action!)}
                          className="text-[#0067b8] hover:text-[#004b87] underline underline-offset-2 decoration-[#0067b8]/80 hover:decoration-[#004b87] text-[15px] sm:text-[15.5px] leading-snug text-left rtl:text-right transition-colors cursor-pointer"
                        >
                          {isArabic ? item.titleAr : item.titleEn}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-[#0067b8] hover:text-[#004b87] underline underline-offset-2 decoration-[#0067b8]/80 hover:decoration-[#004b87] text-[15px] sm:text-[15.5px] leading-snug inline-block transition-colors"
                        >
                          {isArabic ? item.titleAr : item.titleEn}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contact Modals if user clicks any modal action from the Contact group */}
      <ContactModals
        activeModal={activeContactModal}
        onClose={() => setActiveContactModal(null)}
      />
    </div>
  );
}
