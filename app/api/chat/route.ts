import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

interface ChatRequestPayload {
  messages: ChatMessage[];
  userInfo?: UserInfo;
  isArabic?: boolean;
}

interface ChatApiResponse {
  success: boolean;
  reply: string;
  quickActions: string[];
  source: "gemini" | "fallback-knowledge-base";
  error?: string;
}

// Comprehensive Company Knowledge & FAQ Engine for Fallback & Grounding
const FALLBACK_KNOWLEDGE: {
  triggers: string[];
  replyEn: (name?: string) => string;
  replyAr: (name?: string) => string;
  quickActionsEn: string[];
  quickActionsAr: string[];
}[] = [
  // 1. FAQs & Common Questions
  {
    triggers: ["faq", "faqs", "question", "questions", "frequently asked", "common questions", "أسئلة", "شائعة", "استفسارات شائعة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Here are the most **Frequently Asked Questions (FAQs)** regarding our services:\n\n• **Warranty Period**: We provide 10 to 25 Years official warranty approved by Dubai Municipality.\n• **Site Inspection Cost**: 100% Free site inspections across all 7 UAE Emirates with zero obligation.\n• **Authority Approvals**: Certified by Dubai Municipality (DM), Dubai Civil Defense (DCD), and ISO standards.\n• **Project Duration**: Standard villa roofs take 3–5 working days; epoxy floors take 48–72 hours.\n• **Emergency Leaks**: Rapid response teams equipped with high-pressure polyurethane crack injection.\n\nNeed something specific? Feel free to ask or visit our [Contact Us Page](/contact).`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}إليك أبرز **الأسئلة الشائعة (FAQs)** حول خدمات شركة تاج الرحمة:\n\n• **فترة الضمان الرسمي**: نوفر ضماناً معتمداً من بلدية دبي يتراوح بين 10 إلى 25 عاماً.\n• **تكلفة معاينة الموقع**: المعاينة الفنية مجانية 100% في كافة إمارات الدولة بدون أي التزام.\n• **الاعتمادات الحكومية**: معتمدون من بلدية دبي (DM) والدفاع المدني (DCD) ونظام السعفات للمباني الخضراء وISO.\n• **مدة تنفيذ المشروع**: عزل أسطح الفلل يستغرق 3-5 أيام عمل، وأرضيات الإيبوكسي 48-72 ساعة.\n• **التسريبات الطارئة**: فرق طوارئ متخصصة بالحقن الإسمنتي والإيبوكسي تحت ضغط عالٍ.\n\nهل تود الاستفسار عن تفاصيل إضافية؟ يسعدنا إجابتك أو زيارة [صفحة اتصل بنا](/contact).`,
    quickActionsEn: ["What is your warranty period?", "Book Free Site Inspection", "Combo Roof vs Traditional", "Go to Contact Page"],
    quickActionsAr: ["ما هي مدة الضمان الرسمي؟", "حجز معاينة موقع مجانية", "ما هو نظام الكومبو للأسطح؟", "زيارة صفحة اتصل بنا"],
  },

  // 2. Warranty & Guarantee
  {
    triggers: ["warranty", "guarantee", "certificate", "period", "years", "ضمان", "شهادة", "كفالة", "كم سنة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}All our waterproofing and Combo Roofing projects come with **Official Dubai Municipality Approved Warranties**:\n\n• **Duration**: 10 to 25 Years written official warranty certificate depending on system specification.\n• **Scope**: Covers materials, leakage prevention, and full waterproofing integrity.\n• **Maintenance**: Includes scheduled follow-up inspections and rapid engineering support throughout the warranty period.\n\nWould you like a sample warranty certificate or to schedule an on-site survey?`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}كافة مشاريع العزل ونظام الكومبو لدينا مشمولة بـ **شهادات ضمان رسمية معتمدة من بلدية دبي**:\n\n• **مدة الضمان**: من 10 إلى 25 عاماً بشهادة رسمية موثقة وفق المواصفات المعتمدة.\n• **نطاق التغطية**: يشمل جودة المواد، منع تسرب المياه، وتماسك الطبقات العازلة تماماً.\n• **خدمة ما بعد التنفيذ**: زيارات دورية مجانية وتجاوب هندسي سريع طوال فترة الضمان.\n\nهل ترغب بنموذج لشهادة الضمان أو حجز معاينة للموقع؟`,
    quickActionsEn: ["Book Free Site Survey", "Request Warranty Sample", "Call +971 52 749 2002", "Go to Contact Page"],
    quickActionsAr: ["حجز معاينة موقع مجانية", "طلب نموذج شهادة الضمان", "اتصل الآن +971 52 749 2002", "زيارة صفحة اتصل بنا"],
  },

  // 3. Approvals, Municipality & Certifications
  {
    triggers: ["approval", "approved", "municipality", "civil defense", "dm", "dcd", "green building", "sa'fat", "safat", "iso", "بلدية", "دفاع مدني", "معتمد", "ترخيص", "شهادات"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Taj Al Rahmah operates with premier official accreditations across the UAE:\n\n• **Dubai Municipality (DM)**: Approved contractor for Combo Roof and advanced waterproofing systems.\n• **Dubai Civil Defense (DCD)**: Compliant with fire-rated, non-combustible roofing insulation standards.\n• **Al Sa'fat / Green Building Regulations**: High thermal resistance (R-value) reducing building cooling loads up to 40%.\n• **ISO Certifications**: Certified quality and safety management systems.\n\nOur engineering submittals and shop drawings are pre-qualified for smooth consultant and authority approval.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}تمتلك شركة تاج الرحمة أعلى الاعتمادات الرسمية والتراخيص الهندسية في الإمارات:\n\n• **بلدية دبي (DM)**: مقاول معتمد لأنظمة الكومبو المتكاملة والعزل المائي المتقدم.\n• **الدفاع المدني في دبي (DCD)**: مطابقة تامة لاشتراطات السلامة ومقاومة انتشار الحريق.\n• **نظام السعفات للمباني الخضراء**: عوازل حرارية فائقة توفر حتى 40% من استهلاك تكييف الهواء.\n• **شهادات الجودة العالمية ISO**: إدارة جودة ومعايير سلامة مهنية معتمدة.\n\nنقدم كافة المخططات والاعتمادات الفنية للاستشاريين والملاك بسهولة تامة.`,
    quickActionsEn: ["Book Technical Inspection", "Request Compliance Specs", "Chat on WhatsApp", "Go to Contact Page"],
    quickActionsAr: ["طلب معاينة فنية للموقع", "طلب المواصفات المعتمدة", "تواصل عبر واتساب", "زيارة صفحة اتصل بنا"],
  },

  // 4. Project Duration & Execution Timeline
  {
    triggers: ["duration", "timeline", "time", "how long", "days", "weeks", "schedule", "مدة", "كم يوم", "كم يستغرق", "وقت التنفيذ", "الجدول الزمني"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Our typical execution timelines for contracting projects are:\n\n• **Residential Villa Roof (Combo System)**: 3 to 5 working days (including foam spray, UV coat, protective screed & flood testing).\n• **Commercial Roofs (500–2,000 sqm)**: 1 to 2 weeks with multi-crew mobilization.\n• **Epoxy Floor Coating**: 48 to 72 hours (primer, intermediate coat, topcoat, plus 24h cure before vehicle/foot traffic).\n• **Emergency Crack Injection**: 1 to 2 days for localized structural crack sealing.\n• **Potable GRP Water Tank Lining**: 2 to 4 days including surface prep, laminate, topcoat, and sterilization.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}المدد الزمنية المعتادة لتنفيذ المشاريع لدينا تشمل:\n\n• **أسطح الفلل السكنية (نظام كومبو)**: من 3 إلى 5 أيام عمل (تشمل الرش، الطلاء العازل، صبة الحماية، واختبار الغمر بالماء).\n• **الأسطح التجارية والمستودعات (500-2000 م²)**: من أسبوع إلى أسبوعين بفرق عمل متعددة.\n• **طلاء أرضيات الإيبوكسي**: من 48 إلى 72 ساعة (تأسيس، طلاء، وتصلب تام لحركة المشاة والسيارات).\n• **حقن الشروخ الطارئة**: من يوم إلى يومين لمعالجة الشروخ والخرسانة موضعياً.\n• **تبطين خزانات المياه بالألياف الزجاجية GRP**: من يومين إلى 4 أيام تشمل التجهيز والتعقيم.`,
    quickActionsEn: ["Book Site Inspection", "Get Detailed Project Schedule", "Call Site Engineer", "Go to Contact Page"],
    quickActionsAr: ["حجز معاينة للموقع", "طلب جدول زمني تفصيلي", "اتصال بمهندس الموقع", "زيارة صفحة اتصل بنا"],
  },

  // 5. Emergency Leak Repairs
  {
    triggers: ["emergency", "burst", "active leak", "flooding", "urgent", "now", "immediately", "طوارئ", "عاجل", "تسريب مفاجئ", "فوري", "تسريب مستمر", "سريع"],
    replyEn: (name) =>
      `🚨 ${name ? `Dear ${name}, ` : ""}**Emergency Water Leakage Response Available!**\n\nFor active water ingress or severe leaks in roofs, basements, or retaining walls:\n• Our rapid-response teams use **High-Pressure Polyurethane Chemical Injection** that reacts with water to stop active flowing leaks within minutes.\n• Immediate site dispatch across Dubai, Sharjah, Ajman, and all UAE emirates.\n\n📞 **Emergency Hotline**: +971 52 749 2002\n💬 **Instant WhatsApp**: [Chat with Emergency Engineer](https://wa.me/971527492002)`,
    replyAr: (name) =>
      `🚨 ${name ? `عزيزي ${name}، ` : ""}**خدمة الطوارئ لمعالجة تسريبات المياه الفورية متوفرة!**\n\nفي حالات تدفق المياه النشطة أو التسريبات الشديدة في الأسطح أو السراديب أو الجدران الاستنادية:\n• تستخدم فرق الطوارئ لدينا تقنية **حقن البولي يوريثان التفاعلي تحت ضغط عالٍ** لوقف تدفق المياه خلال دقائق معدودة.\n• تحرك سريع لفرق الطوارئ في دبي، الشارقة، عجمان، وكافة إمارات الدولة.\n\n📞 **خط الطوارئ المباشر**: 2002 749 52 971+\n💬 **واتساب الطوارئ المباشر**: [محادثة مهندس الطوارئ](https://wa.me/971527492002)`,
    quickActionsEn: ["Call Hotline +971 52 749 2002", "Emergency WhatsApp Help", "Go to Contact Page"],
    quickActionsAr: ["اتصل بالخط الساخن +971 52 749 2002", "واتساب الطوارئ الفوري", "زيارة صفحة اتصل بنا"],
  },

  // 6. Combo Roof System vs Traditional Waterproofing
  {
    triggers: ["combo", "combo roof", "thermal", "insulation", "foam", "كومبو", "عزل حراري", "فوم", "نظام الكومبو", "الفرق بين العزل"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}**The Combo Roof System** is the gold standard for roofing in the UAE:\n\n• **Integrated 2-in-1**: Seamless polyurethane foam that simultaneously provides maximum thermal insulation (heat block) and 100% water barrier.\n• **Zero Joints**: Unlike traditional bituminous torch-on rolls that crack at overlaps, Combo Roof is sprayed continuously without joints.\n• **Energy Savings**: Lowers AC power consumption by 30% to 40%.\n• **Long Lifespan**: Backed by a **10 to 25 Year Official Dubai Municipality Approved Warranty**.\n• Complete system includes geotextile, protective screed concrete, expansion joints, and solar-reflective acrylic topcoat.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}**نظام الكومبو المتكامل (Combo Roof)** هو الحل الهندسي الأمثل للأسطح في الإمارات:\n\n• **حل ثنائي متكامل 2 في 1**: رغوة البولي يوريثان فوم توفر عزلاً حرارياً فائقاً وعزلاً مائياً تاماً في طبقة واحدة متجانسة.\n• **بدون فواصل أو لحامات**: على عكس لفائف البيتومين التقليدية التي تتلف فواصلها مع الحرارة، يُرش الكومبو ككتلة واحدة ملساء.\n• **توفير الكهرباء**: يقلل من أحمال التكييف بنسبة 30% إلى 40%.\n• **عمر افتراضي مديد**: مدعوم بـ **ضمان رسمي معتمد من بلدية دبي لمدة 10 إلى 25 عاماً**.\n• يشمل النظام صبة خرسانية ميول، فواصل تمدد، وطبقة طلاء أكريليكي عاكس لأشعة الشمس.`,
    quickActionsEn: ["Book Combo Roof Survey", "What is the warranty period?", "Chat on WhatsApp", "Go to Contact Page"],
    quickActionsAr: ["طلب معاينة نظام الكومبو", "ما هي مدة الضمان الرسمي؟", "تواصل عبر واتساب", "زيارة صفحة اتصل بنا"],
  },

  // 7. Free Site Inspection & Pricing / Quotation
  {
    triggers: ["quote", "price", "cost", "inspection", "survey", "estimation", "estimate", "visit", "rate", "sqm", "سعر", "تكلفة", "عرض سعر", "معاينة", "متر", "بكم"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We offer **100% Free On-Site Inspections & Engineering Quotations** across Dubai, Abu Dhabi, Sharjah, Ajman, and all UAE emirates!\n\n• A certified senior site engineer visits your property at your convenience.\n• We perform structural moisture testing, assess substrate conditions, and measure exact areas.\n• You receive a detailed technical report with itemized pricing, approved material data sheets, and official warranty terms.\n\nWould you like to book a site visit today?`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}يسعدنا تقديم **معاينة موقع هندسية مجانية 100% وعرض سعر تفصيلي** في دبي، أبوظبي، الشارقة، عجمان، وكافة إمارات الدولة!\n\n• يقوم مهندس معتمد بزيارة موقعك في الوقت الذي يناسبك.\n• نفحص مصادر الرطوبة ونقيس المساحات ونحدد النظام الهندسي الأنسب.\n• تستلم تقريراً فنياً شاملاً مع عرض سعر مفصل ومواصفات المواد وضمان رسمي معتمد.\n\nهل تود حجز موعد للمعاينة المجانية الآن؟`,
    quickActionsEn: ["Book Free Site Survey", "Chat on WhatsApp", "Call +971 52 749 2002", "Go to Contact Page"],
    quickActionsAr: ["حجز معاينة موقع مجانية", "تواصل عبر واتساب", "اتصل الآن +971 52 749 2002", "زيارة صفحة اتصل بنا"],
  },

  // 8. Waterproofing & Roof Systems
  {
    triggers: ["waterproof", "roof", "leak", "seepage", "damp", "rain", "membrane", "terrace", "balcony", "عزل مائي", "تسريب", "خرير", "سطح", "رطوبة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Taj Al Rahmah provides certified, long-lasting **Waterproofing & Building Envelope Systems**:\n\n• **Combo Roof System**: Thermal + water insulation with 10–25 year warranty.\n• **Torch-on Bituminous Membranes**: Multi-layer modified SBS/APP membranes for substructures and flat roofs.\n• **Liquid & Polyurea Coatings**: Highly flexible spray coatings for terraces, planter boxes, and bridge decks.\n• **Wet Areas**: Bathrooms, kitchens, and jacuzzi sealing.\n\nAll works are water flood-tested for 24–48 hours prior to handover.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}تقدم شركة تاج الرحمة أحدث أنظمة **العزل المائي وحماية المنشآت** المعتمدة في الإمارات:\n\n• **نظام الكومبو للأسطح**: عزل مائي وحراري متكامل بضمان 10 إلى 25 عاماً.\n• **لفائف البيتومين المسلحة**: عوازل SBS/APP متعددة الطبقات للأساسات والأسطح.\n• **طلاءات البولي يوريا والعوازل السائلة**: عوازل مطاطية مرنة للترّاسات وأحواض الزراعة.\n• **عزل المناطق الرطبة**: الحمامات، المطابخ، وشرفات المباني.\n\nتخضع كافة أعمالنا لاختبار الغمر بالماء لمدة 24 إلى 48 ساعة قبل التسليم النهائي.`,
    quickActionsEn: ["What is your warranty period?", "Book Roof Inspection", "Chat on WhatsApp", "Go to Contact Page"],
    quickActionsAr: ["ما هي مدة الضمان الرسمي؟", "طلب معاينة الأسطح", "تواصل عبر واتساب", "زيارة صفحة اتصل بنا"],
  },

  // 9. Epoxy & Flooring
  {
    triggers: ["epoxy", "floor", "coating", "garage", "warehouse", "parking", "industrial", "screed", "إيبوكسي", "أرضيات", "مواقف", "مستودع", "كراج", "أرضية"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We deliver high-performance **Epoxy & Polyurethane Floor Systems**:\n\n• **Industrial Warehouses & Factories**: Heavy load, forklift, and chemical resistant coatings.\n• **Car Parks & Basements**: Anti-slip deck coatings with directional line markings and ramp treatments.\n• **Hospitals & Laboratories**: Seamless, antibacterial, hygienic epoxy screeds.\n• **Commercial & Retail**: High-gloss, metallic decorative epoxy finishes.\n\nIncludes mechanical surface shot-blasting and diamond grinding for optimal adhesion.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم تشكيلة متكاملة من **أرضيات الإيبوكسي والبولي يوريثان التخصصية**:\n\n• **المستودعات والمصانع**: مقاومة للأوزان الثقيلة ورافعات الشوك والمواد الكيميائية.\n• **مواقف السيارات والسراديب**: طلاءات مقاومة للانزلاق مع تخطيط المسارات وعلامات التوجيه.\n• **المستشفيات والمنشآت الطبية**: أرضيات صحية خالية من الفواصل ومضادة للبكتيريا.\n• **صالات العرض والمحال التجارية**: إيبوكسي ديكوري ومعدني فائق اللمعان.\n\nتشمل الأعمال تجهيز السطح بالصنفرة الماسية والرمي الميكانيكي لضمان أعلى قوة التصاق.`,
    quickActionsEn: ["Epoxy Flooring Cost Estimate", "Request Color & Tech Sheet", "Book Site Inspection", "Go to Contact Page"],
    quickActionsAr: ["طلب تقدير تكلفة الإيبوكسي", "طلب كتالوج الألوان والمواصفات", "حجز معاينة للموقع", "زيارة صفحة اتصل بنا"],
  },

  // 10. GRP Tank & Basin Lining
  {
    triggers: ["grp", "fiberglass", "tank", "water tank", "lining", "potable", "drinking", "خزان", "فيبرجلاس", "مياه الشرب", "تبطين", "خزانات"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Our **GRP (Fiberglass) Tank Lining** solutions ensure maximum water purity and long-term protection:\n\n• **Food-Grade Certified**: Certified non-toxic resins approved for potable municipal drinking water storage.\n• **Anti-Corrosion**: Impervious to rust, chlorine, algae, and chemical degradation.\n• **Applications**: Concrete & steel underground/overhead water tanks, swimming pools, chemical pits, and gutters.\n• Backed by official warranty certificates.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}تضمن حلول **تبطين خزانات المياه بالألياف الزجاجية GRP (فيبر جلاس)** أعلى درجات النقاء والحماية:\n\n• **معتمدة لمياه الشرب**: راتنجات مطابقة للمعايير الصحية وصالحة تماماً لمياه الشرب النقية.\n• **مقاومة التآكل والصدأ**: لا تتأثر بالكلور أو الطحالب أو المواد الكيميائية.\n• **الاستخدامات**: خزانات المياه الخرسانية والحديدية، أحواض السباحة، والتجميع.\n• مدعومة بشهادات ضمان رسمية معتمدة.`,
    quickActionsEn: ["Book Water Tank Inspection", "GRP Food-Grade Certificate", "Chat on WhatsApp", "Go to Contact Page"],
    quickActionsAr: ["حجز فحص خزان المياه", "طلب شهادة مطابقة مياه الشرب", "تواصل عبر واتساب", "زيارة صفحة اتصل بنا"],
  },

  // 11. Concrete Repair & Crack Injection
  {
    triggers: ["crack", "repair", "injection", "concrete", "structural", "spalling", "damage", "beam", "column", "شروخ", "حقن", "خرسانة", "ترميم", "تصدع", "تآكل الخرسانة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We offer certified **Structural Concrete Rehabilitation & Crack Injection**:\n\n• **High-Pressure Polyurethane Injection**: Reacts with water to seal active leaks in foundation walls and slabs.\n• **Structural Epoxy Resin Injection**: Restores monolith integrity and structural strength to load-bearing cracks.\n• **Carbon Fiber Strengthening (CFRP)**: Reinforcement for beams, columns, and slabs.\n• **Rebar Rust Treatment & Concrete Spalling Repair**: Anti-corrosion zinc priming and polymer repair mortars.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم خدمات هندسية معتمدة لـ **ترميم الخرسانة وحقن الشروخ الإنشائية**:\n\n• **حقن البولي يوريثان عالي الضغط**: تفاعلي لوقف تسريبات المياه النشطة في الأساسات والجدران الاستنادية.\n• **حقن راتنجات الإيبوكسي الإنشائية**: استعادة قوة وتماسك الخرسانة المتصدعة في الجسور والأعمدة.\n• **تدعيم العناصر الإنشائية بألياف الكربون (CFRP)**: لزيادة قدرة تحمل الكمرات والأعمدة.\n• **معالجة تآكل الخرسانة وصدأ حديد التسليح**: إزالة الصدأ، الطلاء بالزنك، وإعادة البناء بالمونة البوليمرية.`,
    quickActionsEn: ["Request Structural Survey", "Call Engineer Directly", "Chat on WhatsApp", "Go to Contact Page"],
    quickActionsAr: ["طلب فحص إنشائي للموقع", "اتصال بمهندس الموقع", "تواصل عبر واتساب", "زيارة صفحة اتصل بنا"],
  },

  // 12. Geographic Coverage & Locations
  {
    triggers: ["area", "coverage", "where", "location", "emirates", "abu dhabi", "sharjah", "ajman", "rak", "fujairah", "al ain", "أين", "تغطية", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "العين", "الفجيرة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Taj Al Rahmah provides **Complete UAE Coverage** with dedicated mobile engineering units:\n\n• **Dubai**: Central headquarters, rapid response throughout all communities.\n• **Sharjah & Ajman**: Daily operations for commercial and residential sectors.\n• **Abu Dhabi & Al Ain**: Full contracting projects for villas, industrial, and government facilities.\n• **Ras Al Khaimah, Umm Al Quwain & Fujairah**: Certified crews available for all project scales.\n\nFree site inspections are available across all emirates!`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}تغطي شركة تاج الرحمة **كافة إمارات دولة الإمارات العربية المتحدة** بفرق عمل متخصصة:\n\n• **دبي**: المقر الرئيسي وفرق طوارئ واستجابة سريعة لكافة المناطق.\n• **الشارقة وعجمان**: تنفيذ يومي لمشاريع الفلل والمباني التجارية والمستودعات.\n• **أبوظبي والعين**: مشاريع الفلل والمرافق الصناعية والتجارية.\n• **رأس الخيمة، أم القيوين، والفجيرة**: فرق هندسية متكاملة لجميع المشاريع.\n\nالمعاينة الفنية مجانية 100% في جميع الإمارات!`,
    quickActionsEn: ["Book Survey in My Area", "Call +971 52 749 2002", "Go to Contact Page", "Chat on WhatsApp"],
    quickActionsAr: ["حجز معاينة في منطقتي", "اتصل الآن +971 52 749 2002", "زيارة صفحة اتصل بنا", "تواصل عبر واتساب"],
  },

  // 13. Direct Contact, Phone, Email & Address
  {
    triggers: ["contact", "phone", "call", "email", "address", "location", "office", "timing", "hours", "اتصال", "تواصل", "هاتف", "ايميل", "عنوان", "مكتب", "دوام"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}You can connect directly with our engineering and customer desk:\n\n📞 **Phone / Hotline**: +971 52 749 2002 / +971 4 234 5678\n📧 **Official Email**: info@tajalrahmah.com\n🌐 **Official Contact Page**: [Visit Our Contact Page](/contact)\n📍 **Main Office**: Office G-01-691, Al Khabaisi, Deira, Dubai, UAE\n⏰ **Working Hours**: Monday – Saturday: 9:00 AM – 6:00 PM (Closed Sunday)\n💬 **WhatsApp**: [Chat Directly on WhatsApp](https://wa.me/971527492002)\n\nWe provide 100% Free Site Inspections across all UAE emirates.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}يمكنك التواصل معنا مباشرة عبر القنوات الرسمية التالية:\n\n📞 **الهاتف المباشر**: 2002 749 52 971+ / 5678 234 4 971+\n📧 **البريد الإلكتروني**: info@tajalrahmah.com\n🌐 **صفحة التواصل الرسمية**: [زيارة صفحة اتصل بنا](/contact)\n📍 **المكتب الرئيسي**: مكتب G-01-691، الخبيصي، ديرة، دبي، الإمارات\n⏰ **أوقات العمل**: من الإثنين إلى السبت: 9:00 صباحاً – 6:00 مساءً (الأحد مغلق)\n💬 **واتساب المباشر**: [محادثة عبر واتساب](https://wa.me/971527492002)\n\nنوفر معاينة موقع مجانية 100% في كافة إمارات الدولة.`,
    quickActionsEn: ["Go to Contact Page", "Call +971 52 749 2002", "Email info@tajalrahmah.com", "Chat on WhatsApp"],
    quickActionsAr: ["زيارة صفحة اتصل بنا", "اتصل الآن +971 52 749 2002", "إرسال بريد إلكتروني", "تواصل عبر واتساب"],
  },
];

function getFallbackReply(
  userQuery: string,
  isArabic: boolean,
  userName?: string
): { reply: string; quickActions: string[] } {
  const queryLower = userQuery.toLowerCase();

  for (const item of FALLBACK_KNOWLEDGE) {
    if (item.triggers.some((trigger) => queryLower.includes(trigger))) {
      return {
        reply: isArabic ? item.replyAr(userName) : item.replyEn(userName),
        quickActions: isArabic ? item.quickActionsAr : item.quickActionsEn,
      };
    }
  }

  // Generic & Out-of-Box Fallback: Points to Contact Page, Phone, and Email
  return {
    reply: isArabic
      ? `${userName ? `أهلاً بك يا ${userName}، ` : "أهلاً بك! "}شكراً لتواصلك مع **شركة تاج الرحمة للعزل وصيانة المباني**.\n\nبخصوص استفسارك الخاص أو أي طلبات متخصصة، يسعدنا تواصلك مع فريقنا الهندسي والإداري مباشرة لخدمتك بالشكل الأمثل:\n\n• **صفحة التواصل الرسمية**: [صفحة اتصل بنا](/contact)\n• **الهاتف المباشر**: 2002 749 52 971+ / 5678 234 4 971+\n• **البريد الإلكتروني**: info@tajalrahmah.com\n• **واتساب مهندس الموقع**: [محادثة واتساب](https://wa.me/971527492002)\n\nيسعدنا تقديم **معاينة مجانية للموقع** واستشارة فنية متخصصة في أي مكان بالإمارات!`
      : `${userName ? `Hello ${userName}, ` : "Hello! "}Thank you for reaching out to **Taj Al Rahmah Waterproofing & Building Maintenance**.\n\nFor custom inquiries, technical specifications, or questions outside standard automated scopes, our engineering and management team is readily available to assist you directly:\n\n• **Official Contact Page**: [Contact Us Page](/contact)\n• **Direct Hotline**: +971 52 749 2002 / +971 4 234 5678\n• **Official Email**: info@tajalrahmah.com\n• **Direct WhatsApp**: [Chat on WhatsApp](https://wa.me/971527492002)\n\nWe provide **100% Free Site Inspections & Official Quotations** across Dubai and all UAE emirates!`,
    quickActions: isArabic
      ? ["زيارة صفحة اتصل بنا", "اتصل الآن +971 52 749 2002", "إرسال بريد إلكتروني", "تواصل عبر واتساب"]
      : ["Go to Contact Page", "Call +971 52 749 2002", "Email info@tajalrahmah.com", "Chat on WhatsApp"],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestPayload = await request.json().catch(() => ({ messages: [] }));
    const { messages = [], userInfo = {}, isArabic = false } = body;

    const latestUserMessage = messages.filter((m) => m.sender === "user").slice(-1)[0]?.text || "";
    const userName = userInfo.name?.trim() || "";

    if (!latestUserMessage.trim()) {
      return NextResponse.json(
        {
          success: false,
          reply: isArabic ? "يرجى كتابة رسالتك أو استفسارك." : "Please provide your question or message.",
          quickActions: [],
          source: "fallback-knowledge-base",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim() || "";

    // If an API key is configured, attempt Gemini API with model cascade
    if (apiKey) {
      try {
        const systemPrompt = `You are the official Senior Technical & Customer Solutions Assistant for "Taj Al Rahmah Contracting" (شركة تاج الرحمة للعزل وصيانة المباني), a premier building envelope, waterproofing, and specialized flooring contractor in Dubai and the UAE.

Company Profile & Official Contacts:
- Full Legal Name: Taj Al Rahmah Building Maintenance & Waterproofing LLC
- Main Office: Office G-01-691, Al Khabaisi, Deira, Dubai, UAE.
- Direct Hotlines: +971 52 749 2002 / +971 4 234 5678
- Official Email: info@tajalrahmah.com
- Contact Us Page: /contact
- WhatsApp: +971 52 749 2002 (https://wa.me/971527492002)
- Working Hours: Monday – Saturday: 9:00 AM – 6:00 PM (Closed Sunday)
- Geographic Coverage: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, Fujairah, and Al Ain.
- Core Policy: 100% Free Site Inspection & Detailed Engineering Quotations across all UAE emirates.

Core Services:
1. Combo Roofing System: Integrated polyurethane spray foam thermal insulation + elastomeric waterproofing. Approved by Dubai Municipality (DM). Offers 10 to 25 Years Official Warranty. Saves up to 40% on AC electricity.
2. GRP Fiberglass Tank & Basin Lining: Food-grade, certified non-toxic lining for potable drinking water tanks, swimming pools, chemical pits, and gutters.
3. Epoxy & Polyurethane Flooring: Heavy-duty self-leveling epoxy, polyurethane screed, car park deck coating with line demarcations, anti-static ESD flooring for hospitals and cleanrooms.
4. Structural Crack Injection & Concrete Repair: High-pressure polyurethane & epoxy resin injection to seal active water leaks in basements, retaining walls, elevator pits, and beams. Carbon fiber (CFRP) strengthening.
5. Polyurea Rapid Waterproof Coatings: Fast-curing, heavy-duty elastomeric membrane for roofs, vehicular decks, and bridges.
6. Wet Area Waterproofing: Bathrooms, kitchens, balconies, and swimming pools.

Comprehensive FAQs Knowledge:
- Warranty FAQ: 10 to 25 Years official warranty approved by Dubai Municipality covering leakage-free performance and materials, plus scheduled maintenance inspections.
- Approvals FAQ: Approved by Dubai Municipality (DM), Dubai Civil Defense (DCD), Al Sa'fat Green Building Regulations, and ISO certified.
- Combo Roof vs Traditional FAQ: Combo Roof is seamless (joint-free) spray foam combining thermal and water insulation in one layer, avoiding joint failures common in torch-on rolls, lasting 25+ years.
- Execution Duration FAQ: Standard residential villas take 3 to 5 days; commercial roofs (500–1500 sqm) take 1 to 2 weeks; epoxy floors take 48–72 hours for full traffic cure.
- Inspection & Quote FAQ: 100% Free site survey and formal quotation across all UAE emirates.
- Emergency Leaks FAQ: Rapid emergency intervention using high-pressure polyurethane injection to immediately stop running pressurized leaks.
- Potable Drinking Water FAQ: Food-grade certified GRP resin approved for drinking water tanks, preventing algae, rust, and bacteria.

CRITICAL INSTRUCTIONS:
1. Dynamic Contextual Suggestions: In "quickActions", ALWAYS provide 3 to 4 suggestions specifically tailored to what the user asked (e.g. if asking about epoxy, suggest epoxy price, color sheet, or survey; if asking about waterproofing, suggest 25-yr warranty, free inspection, or DM approvals).
2. FAQ Answering: When user asks common questions (warranty, time, cost, materials, difference between systems), provide clear, professional, bulleted answers.
3. OUT OF BOX / UNRECOGNIZED / CUSTOM INQUIRIES:
   - If the user asks something outside our services (unrelated trades, general knowledge, legal advice, interior furnishings) OR asks for binding custom commercial contract pricing that requires site measurements:
   - State politely that this specific matter is specialized or outside standard automated scope.
   - ALWAYS direct the customer to our official contact channels with clickable markdown:
     • Contact Page: [Contact Us Page](/contact) (or [صفحة اتصل بنا](/contact) in Arabic)
     • Direct Phone: +971 52 749 2002
     • Official Email: info@tajalrahmah.com
   - Set "quickActions" to include:
     In English: ["Go to Contact Page", "Call +971 52 749 2002", "Email info@tajalrahmah.com", "Chat on WhatsApp"]
     In Arabic: ["زيارة صفحة اتصل بنا", "اتصل الآن +971 52 749 2002", "إرسال بريد إلكتروني", "تواصل عبر واتساب"]
4. Language: If the user writes in Arabic, respond in fluent, professional Arabic. If English, in clear, professional English.
5. Format: Output MUST be ONLY valid JSON matching:
{
  "reply": "Your helpful response string here",
  "quickActions": ["Action 1", "Action 2", "Action 3"]
}`;

        // Build recent conversation turns for context
        const conversationHistory = messages.slice(-6).map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

        const candidateModels = ["gemini-3.8-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

        for (const model of candidateModels) {
          try {
            const geminiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: systemPrompt }],
                    },
                    ...conversationHistory,
                  ],
                  generationConfig: {
                    temperature: 0.4,
                    topP: 0.95,
                    maxOutputTokens: 800,
                  },
                }),
              }
            );

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json();
              const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
              const cleanJson = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

              try {
                const parsed = JSON.parse(cleanJson);
                if (parsed && parsed.reply) {
                  return NextResponse.json<ChatApiResponse>({
                    success: true,
                    reply: parsed.reply,
                    quickActions: Array.isArray(parsed.quickActions) ? parsed.quickActions : [],
                    source: "gemini",
                  });
                }
              } catch {
                // If response wasn't strictly JSON, return raw text directly
                if (cleanJson) {
                  return NextResponse.json<ChatApiResponse>({
                    success: true,
                    reply: cleanJson,
                    quickActions: isArabic
                      ? ["طلب معاينة وعرض سعر مجاني", "تواصل عبر واتساب", "اتصل بنا مباشرة"]
                      : ["Book Free Site Inspection", "Chat on WhatsApp", "Call Us Directly"],
                    source: "gemini",
                  });
                }
              }
            }
          } catch (modelErr) {
            console.warn(`Model ${model} request error:`, modelErr);
          }
        }
      } catch (geminiError) {
        console.warn("Gemini chat API error, switching to fallback:", geminiError);
      }
    }

    // Seamless Fallback Knowledge Engine (guarantees 100% uptime and answers for users)
    const fallback = getFallbackReply(latestUserMessage, isArabic, userName);
    return NextResponse.json<ChatApiResponse>({
      success: true,
      reply: fallback.reply,
      quickActions: fallback.quickActions,
      source: "fallback-knowledge-base",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        reply: "We are currently experiencing a brief technical delay. Please call us directly at +971 52 749 2002 or contact us on WhatsApp.",
        quickActions: ["Call Now", "Chat on WhatsApp"],
        source: "fallback-knowledge-base",
        error: error?.message || "Internal error",
      },
      { status: 500 }
    );
  }
}
