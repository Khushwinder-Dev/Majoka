export interface SearchResultItem {
  id: string;
  name: string;
  nameAr?: string;
  category: "Service" | "Subcontract" | "Solution" | "Product" | "Project" | "Page";
  categoryAr?: string;
  href: string;
  desc: string;
  descAr?: string;
  keywords: string[];
}

export const SITE_SEARCH_INDEX: SearchResultItem[] = [
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

  // ─── SERVICES ────────────────────────────────────────────────────
  {
    id: "service-all",
    name: "All Waterproofing & Contracting Services",
    nameAr: "جميع خدمات العزل المائي والمقاولات",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services",
    desc: "Explore our full range of six specialized civil contracting and waterproofing divisions.",
    descAr: "استكشف مجموعتنا الكاملة من أقسام العزل المائي والمقاولات المدنية المتخصصة.",
    keywords: ["services", "waterproofing", "civil contracting", "divisions", "خدمات", "عزل مائي", "مقاولات"],
  },
  {
    id: "service-grp",
    name: "GRP & Fiberglass Waterproofing",
    nameAr: "عزل GRP والألياف الزجاجية",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=grp-fiberglass-waterproofing",
    desc: "Seamless food-grade lining for water tanks, reservoirs, wet areas, and flat roofs.",
    descAr: "تبطين متصل ومعتمد غذائياً لخزانات المياه، الأسطح، والمسطحات الرطبة.",
    keywords: ["grp", "fiberglass", "tanks", "lining", "potable water", "glass fiber", "ألياف زجاجية", "خزانات", "تبطين"],
  },
  {
    id: "service-combo",
    name: "Combo System Roof Waterproofing",
    nameAr: "نظام الكومبو لعزل الأسطح مائياً وحرارياً",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=combo-system-roof-waterproofing",
    desc: "Dual-action polyurethane thermal insulation and seamless waterproofing in a single monolithic barrier.",
    descAr: "نظام عزل مزدوج مائي وحراري من رغوة البولي يوريثان بطبقة واحدة متكاملة.",
    keywords: ["combo", "combo system", "roof", "thermal insulation", "polyurethane foam", "كومبو", "عزل حراري", "أسطح"],
  },
  {
    id: "service-epoxy",
    name: "Epoxy Floor Coating",
    nameAr: "طلاء أرضيات الإيبوكسي",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=epoxy-floor-coating",
    desc: "Durable, chemical-resistant, seamless high-performance flooring for warehouses, factories, and car parks.",
    descAr: "أرضيات إيبوكسي عالية المتانة ومقاومة للمواد الكيميائية للمستودعات والمصانع ومواقف السيارات.",
    keywords: ["epoxy", "flooring", "coatings", "car park", "industrial floor", "warehouse", "إيبوكسي", "أرضيات", "مستودعات"],
  },
  {
    id: "service-bitumen",
    name: "Bitumen Membrane Waterproofing",
    nameAr: "عزل الغشاء البيتوميني",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=bitumen-membrane-waterproofing",
    desc: "Reinforced torch-applied and self-adhesive bituminous rolls for foundations, basements, and retaining walls.",
    descAr: "لفائف بيتومينية مسلحة ملحومة باللهب وذاتية الالتصاق للأساسات والأقبية والجدران الاستنادية.",
    keywords: ["bitumen", "membrane", "torch-applied", "foundation", "basement", "tanking", "rolls", "بيتومين", "أساسات", "رولات"],
  },
  {
    id: "service-polyurea",
    name: "Polyurea Waterproofing Coating",
    nameAr: "عزل البولي يوريا فائق السرعة",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=polyurea-coating-waterproofing",
    desc: "Ultra-fast curing spray elastomer with extreme tensile strength and UV durability for heavy-traffic zones.",
    descAr: "غشاء إيلاستومري سريع الجفاف بالرش يتميز بمرونة ومقاومة فائقة للمرور الكثيف والأشعة فوق البنفسجية.",
    keywords: ["polyurea", "spray elastomer", "fast cure", "traffic", "podium", "uv", "بولي يوريا", "رش"],
  },
  {
    id: "service-injection",
    name: "Injection Waterproofing",
    nameAr: "عزل الحقن المائي للخرسانة",
    category: "Service",
    categoryAr: "خدمة",
    href: "/services?service=1&sub=injection-waterproofing",
    desc: "Precision polyurethane and acrylate resin injection for sealing concrete cracks, joints, and active water leaks.",
    descAr: "حقن راتنجات البولي يوريثان والأكريلات الدقيقة لسد شروخ الخرسانة ووقف تسربات المياه النشطة.",
    keywords: ["injection", "crack repair", "leak sealing", "resin", "polyurethane resin", "حقن", "تسربات", "شروخ"],
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

  // ─── PRODUCTS ────────────────────────────────────────────────────
  {
    id: "products-all",
    name: "Construction Chemicals & Waterproofing Products",
    nameAr: "الكيماويات الإنشائية ومنتجات العزل",
    category: "Product",
    categoryAr: "منتجات",
    href: "/products",
    desc: "Certified waterproofing membranes, sealants, repair mortars, and industrial coatings.",
    descAr: "أغشية عزل معتمدة، ومواد مانعة للتسرب، ومونات إصلاح، وطلاءات صناعية.",
    keywords: ["products", "chemicals", "membranes", "coatings", "materials", "sealants", "منتجات", "كيماويات", "مواد"],
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
