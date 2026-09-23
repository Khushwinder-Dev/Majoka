import { allProductsData } from "./productsData";
import servicesJsonEn from "./services_en.json";
import servicesJsonAr from "./services_ar.json";

export interface SearchResultItem {
  id: string;
  name: string;
  nameAr?: string;
  category: "Service" | "Product" | "Subcontract" | "Solution" | "Project" | "Page";
  categoryAr?: string;
  href: string;
  desc: string;
  descAr?: string;
  keywords: string[];
}

/* ─── DYNAMICALLY GENERATED PRODUCTS SEARCH ITEMS ─────────────────────── */
const productSearchItems: SearchResultItem[] = allProductsData.map((p) => ({
  id: `product-${p.id}`,
  name: p.name,
  nameAr: p.longName || p.name,
  category: "Product",
  categoryAr: "منتج",
  href: `/products/${p.id}`,
  desc: p.description || p.longName,
  descAr: p.description || p.longName,
  keywords: [
    p.name,
    p.longName,
    p.category,
    p.subcategory || "",
    "product",
    "frp",
    "fiberglass",
    "stainless steel",
    "ladder",
    "tank",
    "bucket",
    "cover",
    "tray",
    "grating",
    "manhole",
    "منتج",
    "فيبرجلاس",
    "خزان",
    "سلم",
  ].filter(Boolean),
}));

/* ─── DYNAMICALLY GENERATED SERVICES SEARCH ITEMS ─────────────────────── */
const arServicesMap = new Map<number, any>();
if (Array.isArray(servicesJsonAr)) {
  servicesJsonAr.forEach((s: any) => {
    arServicesMap.set(s.serviceNumber, s);
  });
}

const serviceSearchItems: SearchResultItem[] = [];

if (Array.isArray(servicesJsonEn)) {
  servicesJsonEn.forEach((s: any) => {
    const arService = arServicesMap.get(s.serviceNumber);

    // Main service
    serviceSearchItems.push({
      id: `service-${s.serviceNumber}`,
      name: s.serviceTitle,
      nameAr: arService?.serviceTitle || s.serviceTitle,
      category: "Service",
      categoryAr: "خدمة",
      href: `/services?service=${s.serviceNumber}`,
      desc: s.shortDescription || s.tagline || `${s.serviceTitle} specialized contracting services.`,
      descAr: arService?.shortDescription || arService?.tagline || "",
      keywords: [
        s.serviceTitle,
        s.serviceSlug || "",
        s.category || "",
        "service",
        "contracting",
        "division",
        ...(s.seoKeywords || []),
      ].filter(Boolean),
    });

    // Subservices
    if (Array.isArray(s.subservices)) {
      s.subservices.forEach((sub: any, idx: number) => {
        const arSub = arService?.subservices?.[idx];

        serviceSearchItems.push({
          id: `subservice-${s.serviceNumber}-${sub.serviceSlug || idx}`,
          name: sub.serviceTitle,
          nameAr: arSub?.serviceTitle || sub.serviceTitle,
          category: "Service",
          categoryAr: "خدمة فرعية",
          href: `/services?service=${s.serviceNumber}&sub=${sub.serviceSlug}`,
          desc:
            sub.shortDescription ||
            `${sub.serviceTitle} specialized application under ${s.serviceTitle}.`,
          descAr: arSub?.shortDescription || "",
          keywords: [
            sub.serviceTitle,
            sub.serviceSlug || "",
            s.serviceTitle,
            "service",
            "subservice",
            "application",
            "waterproofing",
          ].filter(Boolean),
        });
      });
    }
  });
}

/* ─── STATIC CORE PAGES, SUBCONTRACT & SOLUTIONS ──────────────────────── */
const coreSearchItems: SearchResultItem[] = [
  // ─── SUBCONTRACTING ──────────────────────────────────────────────
  {
    id: "subcontract-main",
    name: "Subcontracting Services",
    nameAr: "خدمات مقاولات الباطن",
    category: "Subcontract",
    categoryAr: "مقاولة باطن",
    href: "/subcontract",
    desc: "Reliable subcontracting for waterproofing, protective coatings, concrete repair, and specialized contracting.",
    descAr: "مقاولات باطن موثوقة لأعمال العزل المائي، والطلاءات الواقية، وإصلاح الخرسانة، والمقاولات التخصصية.",
    keywords: ["subcontract", "subcontracting", "contractor", "main contractor", "b2b", "tender", "partner", "quote", "مقاولة", "باطن", "مقاول"],
  },
  {
    id: "subcontract-capabilities",
    name: "Subcontracting Capabilities & Works",
    nameAr: "قدرات وأعمال مقاولات الباطن",
    category: "Subcontract",
    categoryAr: "مقاولة باطن",
    href: "/subcontract",
    desc: "Waterproofing works, protective coatings, concrete repair, industrial flooring, and maintenance restoration.",
    descAr: "أعمال العزل المائي، والطلاءات الواقية، وإصلاح الخرسانة، والأرضيات الصناعية، وأعمال الترميم.",
    keywords: ["capabilities", "concrete repair", "restoration", "maintenance", "industrial flooring", "قدرات", "ترميم", "إصلاح خرسانة"],
  },

  // ─── SOLUTIONS ───────────────────────────────────────────────────
  {
    id: "solutions-overview",
    name: "Engineered Waterproofing Solutions",
    nameAr: "حلول العزل الهندسي المتكاملة",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Targeted protection systems engineered for roofs, foundations, basements, and water retention facilities.",
    descAr: "أنظمة حماية متقدمة ومصممة للأسطح والأساسات والأقبية ومنشآت حجز المياه.",
    keywords: ["solutions", "protection", "engineering", "waterproofing systems", "حلول", "حماية"],
  },

  // ─── PROJECTS ────────────────────────────────────────────────────
  {
    id: "projects-portfolio",
    name: "Projects & Landmark Portfolio",
    nameAr: "محفظة المشاريع والإنجازات",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "Explore over 500+ successful completed commercial, residential, and infrastructure projects across the UAE.",
    descAr: "استكشف أكثر من 500 مشروع تجاري وسكني ومشاريع بنية تحتية تم إنجازها بنجاح في دولة الإمارات.",
    keywords: ["project", "projects", "portfolio", "case studies", "reference", "dubai", "uae", "مشاريع", "أعمال"],
  },

  // ─── INDUSTRIES ──────────────────────────────────────────────────
  {
    id: "industries-main",
    name: "Industries We Serve",
    nameAr: "القطاعات التي نخدمها",
    category: "Page",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Tailored contracting services for commercial buildings, residential villas, industrial complexes, and public infrastructure.",
    descAr: "خدمات مقاولات متخصصة للأبراج التجارية، الفلل السكنية، المجمعات الصناعية، والبنية التحتية العامة.",
    keywords: ["industries", "commercial", "residential", "infrastructure", "healthcare", "قطاعات", "تجاري", "سكني", "صناعي"],
  },

  // ─── CAREERS ─────────────────────────────────────────────────────
  {
    id: "careers-main",
    name: "Careers & Job Opportunities",
    nameAr: "الوظائف وفرص العمل",
    category: "Page",
    categoryAr: "وظائف",
    href: "/career",
    desc: "Join Taj Al Rahmah's dedicated team. View open positions in engineering, site supervision, and estimation.",
    descAr: "انضم إلى فريق عمل تاج الرحمة. تعرف على الوظائف الشاغرة في الهندسة والإشراف وتقدير التكاليف.",
    keywords: ["career", "careers", "jobs", "hiring", "opportunities", "vacancies", "engineer", "supervisor", "وظائف", "عمل", "توظيف"],
  },

  // ─── COMPANY & CONTACT ───────────────────────────────────────────
  {
    id: "company-about",
    name: "About Taj Al Rahmah Contracting",
    nameAr: "عن شركة تاج الرحمة للمقاولات",
    category: "Page",
    categoryAr: "صفحة",
    href: "/about-us",
    desc: "Learn about our 15+ years of specialized engineering excellence, vision, mission, and leadership.",
    descAr: "تعرف على مسيرة أكثر من 15 عاماً من التميز الهندسي ورؤيتنا وقيمنا المؤسسية في الإمارات.",
    keywords: ["about", "company", "leadership", "mission", "vision", "taj al rahmah", "عن الشركة", "من نحن"],
  },
  {
    id: "company-certifications",
    name: "Certifications & Approvals",
    nameAr: "الشهادات والاعتمادات الرسمية",
    category: "Page",
    categoryAr: "صفحة",
    href: "/certifications",
    desc: "ISO certified systems, Dubai Municipality, Civil Defense, and Trakhees approved applicators.",
    descAr: "شهادات آيزو واعتمادات رسمية من بلدية دبي والدفاع المدني وتراخيص.",
    keywords: ["certifications", "iso", "approvals", "dubai municipality", "civil defense", "شهادات", "اعتمادات"],
  },
  {
    id: "company-contact",
    name: "Contact Us & Office Locations",
    nameAr: "اتصل بنا ومواقع المكاتب",
    category: "Page",
    categoryAr: "صفحة",
    href: "/contact",
    desc: "Get in touch with our engineering team in Dubai and Abu Dhabi for inquiries and site visits.",
    descAr: "تواصل مع فريقنا الهندسي في دبي وأبوظبي للاستفسارات والمعاينات الميدانية.",
    keywords: ["contact", "phone", "email", "location", "office", "dubai", "address", "اتصل بنا", "عنوان"],
  },
  {
    id: "company-quote",
    name: "Get a Project Quote",
    nameAr: "طلب عرض سعر للمشروع",
    category: "Page",
    categoryAr: "صفحة",
    href: "/get-a-quote",
    desc: "Request a fast, detailed commercial estimation and technical proposal for your project.",
    descAr: "اطلب تسعيراً سريعاً ومفصلاً وعرضاً فنياً متكاملاً لمشروعك.",
    keywords: ["quote", "price", "estimation", "proposal", "cost", "tender", "طلب سعر", "تسعير"],
  },
  {
    id: "company-faqs",
    name: "Frequently Asked Questions (FAQs)",
    nameAr: "الأسئلة الشائعة",
    category: "Page",
    categoryAr: "صفحة",
    href: "/faqs",
    desc: "Find answers to questions regarding application timelines, warranties, and municipal approvals.",
    descAr: "إجابات شاملة حول الجداول الزمنية للتنفيذ، والضمانات، واعتمادات الدوائر الحكومية.",
    keywords: ["faq", "faqs", "questions", "answers", "warranty period", "أسئلة", "شائعة"],
  },
  {
    id: "company-resources",
    name: "Resources & Technical Guides",
    nameAr: "المصادر والأدلة الفنية",
    category: "Page",
    categoryAr: "صفحة",
    href: "/resources",
    desc: "Technical specifications, application guides, and best practice documents for construction engineers.",
    descAr: "مواصفات فنية، وأدلة تطبيق، ومستندات أفضل الممارسات لمهندسي البناء.",
    keywords: ["resources", "guides", "specifications", "standards", "blogs", "articles", "مصادر", "أدلة"],
  },
];

/* ─── UNIFIED COMPLETE SITE SEARCH INDEX ──────────────────────────────── */
export const SITE_SEARCH_INDEX: SearchResultItem[] = [
  ...serviceSearchItems,
  ...productSearchItems,
  ...coreSearchItems,
];
