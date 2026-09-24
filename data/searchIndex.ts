import { allProductsData } from "./productsData";
import servicesJsonEn from "./services_en.json";
import servicesJsonAr from "./services_ar.json";

export interface SearchResultItem {
  id: string;
  name: string;
  nameAr?: string;
  category: "Service" | "Product" | "Subcontract" | "Solution" | "Project" | "Industry" | "Resource" | "Page";
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
    id: "solution-waterproofing",
    name: "Waterproofing Solutions",
    nameAr: "حلول العزل المائي",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Targeted protection against water, moisture ingress, and humidity for roofs, basements, and wet areas.",
    descAr: "حماية متقدمة وموجهة ضد تسربات المياه والرطوبة للأسطح والأقبية والمناطق الرطبة.",
    keywords: ["waterproofing solutions", "waterproofing", "moisture protection", "leak proof", "حلول العزل المائي", "عزل مائي"],
  },
  {
    id: "solution-concrete-repair",
    name: "Concrete Repair & Protection",
    nameAr: "إصلاح وحماية الخرسانة",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Structural restoration, carbonation protection, and durable rehabilitation for aged or damaged concrete.",
    descAr: "ترميم إنشائي وحماية من الكربنة وإعادة تأهيل دائمة للخرسانة المتضررة.",
    keywords: ["concrete repair", "protection", "structural repair", "crack repair", "إصلاح الخرسانة", "ترميم"],
  },
  {
    id: "solution-roofing",
    name: "Roofing Solutions",
    nameAr: "حلول الأسطح والعزل الحراري",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Multi-layered thermal insulation and durable waterproofing systems for flat, inverted, and metal roofs.",
    descAr: "أنظمة عزل مائي وحراري متكاملة للأسطح المسطحة والمعدنية والمنحدرة.",
    keywords: ["roofing solutions", "roof waterproofing", "combo roof", "thermal insulation", "عزل أسطح", "حلول الأسطح"],
  },
  {
    id: "solution-basement",
    name: "Basement & Below-Ground Solutions",
    nameAr: "حلول الأقبية وتحت الأرض",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Substructure tanking, foundation waterproofing, and deep underground moisture barrier engineering.",
    descAr: "عزل الأساسات والقواعد والجدران الاستنادية وحماية المنشآت تحت منسوب الأرض.",
    keywords: ["basement", "below-ground", "substructure", "foundation", "tanking", "أقبية", "أساسات"],
  },
  {
    id: "solution-joint-sealing",
    name: "Joint Sealing Solutions",
    nameAr: "حلول فواصل التمدد والإنشاء",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "High-performance elastomeric sealants and waterstops for structural movement and construction joints.",
    descAr: "مواد مانعة للتسرب وفواصل تمدد مطاطية لحركات المنشآت وفواصل الصب الإنشائية.",
    keywords: ["joint sealing", "expansion joint", "sealant", "waterstops", "فواصل تمدد", "فواصل إنشائية"],
  },
  {
    id: "solution-specialized-construction",
    name: "Specialized Construction Solutions",
    nameAr: "حلول المقاولات التخصصية",
    category: "Solution",
    categoryAr: "حلول",
    href: "/solutions",
    desc: "Tailored engineering systems for complex civil challenges, chemical containment, and industrial lining.",
    descAr: "أنظمة هندسية مخصصة للتحديات الإنشائية المعقدة واحتواء المواد الكيميائية.",
    keywords: ["specialized construction", "chemical containment", "lining", "مقاولات تخصصية"],
  },

  // ─── PROJECTS ────────────────────────────────────────────────────
  {
    id: "project-portfolio-main",
    name: "Projects & Landmark Portfolio",
    nameAr: "محفظة المشاريع والإنجازات",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "Explore over 500+ successful completed commercial, residential, and infrastructure projects across the UAE.",
    descAr: "استكشف أكثر من 500 مشروع تجاري وسكني ومشاريع بنية تحتية تم إنجازها بنجاح في دولة الإمارات.",
    keywords: ["project", "projects", "portfolio", "case studies", "reference", "dubai", "uae", "مشاريع", "أعمال"],
  },
  {
    id: "project-commercial-towers",
    name: "Commercial Towers & High-Rise Waterproofing",
    nameAr: "أبراج تجارية وعزل الأبراج الشاهقة",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "High-elevation facade sealing, basement tanking, and roof waterproofing on prestigious Dubai towers.",
    descAr: "عزل أسطح وواجهات وأقبية للأبراج التجارية والأبراج الشاهقة في دبي وأبوظبي.",
    keywords: ["commercial towers", "high rise", "skyscrapers", "dubai towers", "أبراج تجارية"],
  },
  {
    id: "project-residential-villas",
    name: "Luxury Residential Villas & Compounds",
    nameAr: "فلل سكنية فاخرة ومجمعات سكنية",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "Complete waterproofing, wet area protection, and roof combo insulation for luxury villa developments.",
    descAr: "عزل مائي متكامل للأسطح والمسابح والحمامات للفلل والمجمعات السكنية الراقية.",
    keywords: ["residential", "luxury villas", "compounds", "houses", "فلل سكنية", "مجمعات"],
  },
  {
    id: "project-industrial-warehouses",
    name: "Industrial Warehouses & Logistics Hubs",
    nameAr: "مستودعات صناعية ومراكز لوجستية",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "Heavy-duty epoxy flooring, metal roof waterproofing, and protective coatings for industrial facilities.",
    descAr: "أرضيات إيبوكسي عالية التحمل وعزل الأسقف المعدنية للمستودعات والمراكز الصناعية.",
    keywords: ["industrial warehouses", "logistics", "factories", "epoxy floor", "مستودعات", "مصانع"],
  },
  {
    id: "project-infrastructure",
    name: "Infrastructure & Public Utilities Projects",
    nameAr: "مشاريع البنية التحتية والمرافق العامة",
    category: "Project",
    categoryAr: "مشاريع",
    href: "/project",
    desc: "Water retaining structures, treatment plants, bridges, and municipal infrastructure waterproofing.",
    descAr: "خزانات المياه ومحطات المعالجة والجسور ومشاريع البنية التحتية الحكومية المعتمدة.",
    keywords: ["infrastructure", "utilities", "water tanks", "bridges", "بنية تحتية", "مرافق عامة"],
  },

  // ─── INDUSTRIES ──────────────────────────────────────────────────
  {
    id: "industry-overview",
    name: "Industries We Serve",
    nameAr: "القطاعات التي نخدمها",
    category: "Industry",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Tailored contracting services for commercial buildings, residential villas, industrial complexes, and public infrastructure.",
    descAr: "خدمات مقاولات متخصصة للأبراج التجارية، الفلل السكنية، المجمعات الصناعية، والبنية التحتية العامة.",
    keywords: ["industries", "commercial", "residential", "infrastructure", "healthcare", "قطاعات", "تجاري", "سكني", "صناعي"],
  },
  {
    id: "industry-commercial",
    name: "Commercial Buildings & Corporate Offices",
    nameAr: "المباني التجارية والمكاتب الإدارية",
    category: "Industry",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Comprehensive envelope protection, podium waterproofing, and durable parking floor systems.",
    descAr: "حماية غلاف المبنى وعزل مواقف السيارات والأسطح المفتوحة للمباني التجارية.",
    keywords: ["commercial buildings", "corporate offices", "retail", "malls", "مباني تجارية"],
  },
  {
    id: "industry-residential",
    name: "Residential Communities & Villa Developments",
    nameAr: "المجتمعات السكنية ومشاريع الفلل",
    category: "Industry",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Full warranty waterproofing solutions for master-planned communities, private villas, and apartment buildings.",
    descAr: "حلول عزل بضمان شامل للمجمعات السكنية والمباني السكنية والفلل الخاصة.",
    keywords: ["residential communities", "villas", "apartments", "housing", "مجتمعات سكنية"],
  },
  {
    id: "industry-industrial",
    name: "Industrial Complexes & Manufacturing Plants",
    nameAr: "المجمعات الصناعية ومصانع الإنتاج",
    category: "Industry",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Chemical-resistant epoxy coatings, thermal roof systems, and heavy traffic industrial flooring.",
    descAr: "طلاءات إيبوكسي مقاومة للمواد الكيميائية وحلول عزل الأسطح للمنشآت الصناعية.",
    keywords: ["industrial complexes", "manufacturing", "factories", "warehouses", "منشآت صناعية"],
  },
  {
    id: "industry-hospitality",
    name: "Hospitality, Resorts & Healthcare Facilities",
    nameAr: "قطاع الضيافة والمنتجعات والمستشفيات",
    category: "Industry",
    categoryAr: "قطاعات",
    href: "/industries",
    desc: "Specialized hygiene finishes, swimming pool waterproofing, acoustic drywall, and aesthetic coatings.",
    descAr: "تشطيبات صحية معتمدة وعزل المسابح والبحيرات الصناعية للفنادق والمستشفيات.",
    keywords: ["hospitality", "hotels", "resorts", "hospitals", "healthcare", "فنادق", "مستشفيات"],
  },

  // ─── RESOURCES ───────────────────────────────────────────────────
  {
    id: "resource-specifications",
    name: "Technical Specifications & Method Statements",
    nameAr: "المواصفات الفنية وطرق التنفيذ المعتمدة",
    category: "Resource",
    categoryAr: "مصادر",
    href: "/resources",
    desc: "Download engineering method statements, technical datasheets (TDS), and material submittals.",
    descAr: "تحميل بيانات المواد الفنية وطرق التنفيذ الهندسية المعتمدة للمشاريع.",
    keywords: ["technical specifications", "method statements", "tds", "submittals", "مواصفات فنية"],
  },
  {
    id: "resource-certifications",
    name: "Official Approvals & Certifications",
    nameAr: "الشهادات والاعتمادات الرسمية (بلدية دبي، الدفاع المدني)",
    category: "Resource",
    categoryAr: "مصادر",
    href: "/certifications",
    desc: "ISO 9001 certified systems, Dubai Municipality, Civil Defense, and Trakhees approved applicators.",
    descAr: "شهادات الجودة آيزو واعتمادات رسمية من بلدية دبي والدفاع المدني وتراخيص.",
    keywords: ["certifications", "iso", "approvals", "dubai municipality", "civil defense", "شهادات", "اعتمادات"],
  },
  {
    id: "resource-warranties",
    name: "10-25 Year Warranty Guidelines & Maintenance",
    nameAr: "إرشادات الضمان من 10 إلى 25 سنة ودليل الصيانة",
    category: "Resource",
    categoryAr: "مصادر",
    href: "/resources",
    desc: "Comprehensive warranty terms, inspection protocols, and long-term preventative maintenance guides.",
    descAr: "شروط الضمان المعتمد وبروتوكولات الفحص الدوري ودليل الصيانة الوقائية.",
    keywords: ["warranty", "guarantee", "maintenance", "durability", "ضمان", "صيانة"],
  },
  {
    id: "resource-faqs",
    name: "Frequently Asked Questions (FAQs)",
    nameAr: "الأسئلة الشائعة حول العزل والمقاولات",
    category: "Resource",
    categoryAr: "مصادر",
    href: "/faqs",
    desc: "Quick answers regarding execution timelines, application stages, waterproofing costs, and approvals.",
    descAr: "إجابات سريعة حول الجداول الزمنية، مراحل التنفيذ، التكاليف، والاعتمادات.",
    keywords: ["faqs", "frequently asked questions", "questions", "answers", "أسئلة شائعة"],
  },
];

/* ─── UNIFIED COMPLETE SITE SEARCH INDEX ──────────────────────────────── */
export const SITE_SEARCH_INDEX: SearchResultItem[] = [
  ...serviceSearchItems,
  ...productSearchItems,
  ...coreSearchItems,
];
