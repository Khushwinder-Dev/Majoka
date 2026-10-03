"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface SitemapLink {
  labelEn: string;
  labelAr: string;
  href: string;
}

interface SitemapColumn {
  titleEn: string;
  titleAr: string;
  links: SitemapLink[];
}

interface SitemapSection {
  titlePrefixEn: string;
  titleHighlightEn: string;
  titlePrefixAr: string;
  titleHighlightAr: string;
  columnsCount?: 3 | 4;
  columns: SitemapColumn[];
}

export default function OldSitemap() {
  const { isArabic } = useLanguage();

  const sections: SitemapSection[] = [
    // 1. Professional Services
    {
      titlePrefixEn: "Our Professional",
      titleHighlightEn: "Services",
      titlePrefixAr: "خدماتنا",
      titleHighlightAr: "الاحترافية",
      columnsCount: 4,
      columns: [
        {
          titleEn: "Waterproofing Systems",
          titleAr: "أنظمة العزل المائي",
          links: [
            {
              labelEn: "GRP & Fiberglass Waterproofing",
              labelAr: "عزل GRP والألياف الزجاجية",
              href: "/services?service=1&sub=grp-fiberglass-waterproofing",
            },
            {
              labelEn: "Combo System Roof Waterproofing",
              labelAr: "عزل أسطح بنظام الكومبو",
              href: "/services?service=1&sub=combo-system-roof-waterproofing",
            },
            {
              labelEn: "Bitumen Membrane Waterproofing",
              labelAr: "عزل الغشاء البيتوميني المتطور",
              href: "/services?service=1&sub=bitumen-membrane-waterproofing",
            },
            {
              labelEn: "Polyurea Waterproofing Coating",
              labelAr: "طلاء البولي يوريا فائق السرعة",
              href: "/services?service=1&sub=polyurea-coating-waterproofing",
            },
            {
              labelEn: "Chemical Injection Waterproofing",
              labelAr: "عزل الحقن الكيميائي للخرسانة",
              href: "/services?service=1&sub=injection-waterproofing",
            },
            {
              labelEn: "Cementitious Waterproofing",
              labelAr: "العزل الإسمنتي عالي المرونة",
              href: "/services?service=1",
            },
          ],
        },
        {
          titleEn: "Specialist Divisions",
          titleAr: "الأقسام التخصصية",
          links: [
            {
              labelEn: "Epoxy Floor Coating Systems",
              labelAr: "أنظمة طلاء أرضيات الإيبوكسي",
              href: "/services?service=1&sub=epoxy-floor-coating",
            },
            {
              labelEn: "Thermal & Moisture Insulation",
              labelAr: "العزل الحراري وحواجز الرطوبة",
              href: "/services?service=1",
            },
            {
              labelEn: "Basement Deep Tanking",
              labelAr: "عزل وتأمين السراديب العميقة",
              href: "/services?service=1&sub=bitumen-membrane-waterproofing",
            },
            {
              labelEn: "Water Tank Food-Grade Lining",
              labelAr: "تبطين خزانات المياه الصالحة للشرب",
              href: "/services?service=1&sub=grp-fiberglass-waterproofing",
            },
            {
              labelEn: "Expansion Joint Treatment",
              labelAr: "معالجة وسد فواصل التمدد",
              href: "/services?service=1&sub=polyurea-coating-waterproofing",
            },
            {
              labelEn: "Wet Area & Bathroom Sealing",
              labelAr: "عزل المناطق الرطبة والحمامات",
              href: "/services?service=1",
            },
          ],
        },
        {
          titleEn: "Engineering Standards",
          titleAr: "المعايير الهندسية والاعتمادات",
          links: [
            {
              labelEn: "Dubai Municipality Approvals",
              labelAr: "اعتمادات بلدية دبي الرسمية",
              href: "/certifications",
            },
            {
              labelEn: "ISO 9001 / 14001 Standards",
              labelAr: "معايير الجودة العالمية ISO",
              href: "/certifications",
            },
            {
              labelEn: "Technical Site Survey & Inspection",
              labelAr: "المعاينة الهندسية والفحص الميداني",
              href: "/contact#expert",
            },
            {
              labelEn: "Method Statements & Submittals",
              labelAr: "تقديم خطط العمل والمواصفات الفنية",
              href: "/subcontract#capabilities",
            },
            {
              labelEn: "Flood Testing & QA/QC Verification",
              labelAr: "اختبارات الغمر وضبط الجودة الصارم",
              href: "/expertise",
            },
            {
              labelEn: "Health, Safety & Environment (HSE)",
              labelAr: "بروتوكولات الصحة والسلامة المهنية",
              href: "/about-us",
            },
          ],
        },
        {
          titleEn: "Assurance & Maintenance",
          titleAr: "الضمان والصيانة الشاملة",
          links: [
            {
              labelEn: "10 to 25 Year Warranty Coverage",
              labelAr: "ضمان شامل معتمد من 10 إلى 25 سنة",
              href: "/warranty",
            },
            {
              labelEn: "Emergency Leak Detection & Repair",
              labelAr: "كشف التسربات والإصلاح الطارئ",
              href: "/contact",
            },
            {
              labelEn: "Preventive Maintenance Plans",
              labelAr: "عقود الصيانة الوقائية الدورية",
              href: "/support",
            },
            {
              labelEn: "Residential Waterproofing Solutions",
              labelAr: "حلول العزل للمباني السكنية والفلل",
              href: "/services",
            },
            {
              labelEn: "Commercial Complex Waterproofing",
              labelAr: "عزل المنشآت والمجمعات التجارية",
              href: "/services",
            },
            {
              labelEn: "Industrial Roofing & Coating",
              labelAr: "عزل الأسطح والمصانع الكبرى",
              href: "/services",
            },
          ],
        },
      ],
    },

    // 2. Innovative Solutions
    {
      titlePrefixEn: "Our Innovative",
      titleHighlightEn: "Solutions",
      titlePrefixAr: "حلولنا",
      titleHighlightAr: "المبتكرة",
      columnsCount: 4,
      columns: [
        {
          titleEn: "Roofing Systems",
          titleAr: "حلول الأسطح المتكاملة",
          links: [
            {
              labelEn: "Combo Roofing Insulation System",
              labelAr: "نظام عزل الكومبو المتكامل",
              href: "/services?service=1&sub=combo-system-roof-waterproofing",
            },
            {
              labelEn: "Solar Reflective Cool Roof Coating",
              labelAr: "طلاءات الأسطح العاكسة لحرارة الشمس",
              href: "/solutions",
            },
            {
              labelEn: "Commercial Flat Roof Waterproofing",
              labelAr: "عزل الأسطح المستوية للمباني التجارية",
              href: "/solutions",
            },
            {
              labelEn: "Inverted & Exposed Roof Systems",
              labelAr: "أنظمة الأسطح المعكوسة والمكشوفة",
              href: "/solutions",
            },
            {
              labelEn: "Porous Concrete Roof Screeds",
              labelAr: "صبات الميول الخرسانية للأسطح",
              href: "/services",
            },
          ],
        },
        {
          titleEn: "Substructure Protection",
          titleAr: "حماية الهياكل السفلية والأساسات",
          links: [
            {
              labelEn: "Deep Basement Membrane Tanking",
              labelAr: "العزل الكامل للسراديب السفلية",
              href: "/services?service=1&sub=bitumen-membrane-waterproofing",
            },
            {
              labelEn: "Raft Foundation Waterproofing",
              labelAr: "عزل القواعد واللبشة الخرسانية",
              href: "/solutions",
            },
            {
              labelEn: "Elevator & Sump Pit Waterproofing",
              labelAr: "عزل حفر المصاعد وبيارات الصرف",
              href: "/services?service=1&sub=injection-waterproofing",
            },
            {
              labelEn: "Retaining Wall Moisture Barriers",
              labelAr: "حواجز الرطوبة للجدران الاستنادية",
              href: "/solutions",
            },
            {
              labelEn: "Diaphragm & Secant Pile Sealing",
              labelAr: "سد وعزل جدران الأوتاد الخرسانية",
              href: "/solutions",
            },
          ],
        },
        {
          titleEn: "Water Retaining Structures",
          titleAr: "منشآت حفظ واحتواء المياه",
          links: [
            {
              labelEn: "Potable Underground Water Tanks",
              labelAr: "خزانات مياه الشرب الأرضية والعلوية",
              href: "/services?service=1&sub=grp-fiberglass-waterproofing",
            },
            {
              labelEn: "Fire Fighting Water Reservoirs",
              labelAr: "خزانات مياه مكافحة الحرائق",
              href: "/solutions",
            },
            {
              labelEn: "Swimming Pool Waterproofing",
              labelAr: "عزل حمامات السباحة والبحيرات",
              href: "/solutions",
            },
            {
              labelEn: "Water Features & Decorative Lagoons",
              labelAr: "عزل النوافير والمسطحات المائية الديكورية",
              href: "/solutions",
            },
            {
              labelEn: "Industrial Chemical Basins",
              labelAr: "أحواض المعالجة والمخلفات الصناعية",
              href: "/solutions",
            },
          ],
        },
        {
          titleEn: "Specialist Surfaces & Floors",
          titleAr: "الأسطح والأرضيات المتخصصة",
          links: [
            {
              labelEn: "Heavy-Duty Epoxy Floor Coating",
              labelAr: "أرضيات الإيبوكسي عالية التحمل",
              href: "/services?service=1&sub=epoxy-floor-coating",
            },
            {
              labelEn: "Car Park Deck Coating Systems",
              labelAr: "أنظمة طلاء وتخطيط مواقف السيارات",
              href: "/services?service=1&sub=epoxy-floor-coating",
            },
            {
              labelEn: "Anti-Carbonation Protective Coatings",
              labelAr: "طلاءات حماية الخرسانة من الكربنة",
              href: "/solutions",
            },
            {
              labelEn: "High-Pressure Polyurethane Crack Injection",
              labelAr: "حقن الشروخ بالبولي يوريثان عالي الضغط",
              href: "/services?service=1&sub=injection-waterproofing",
            },
            {
              labelEn: "Chemical Resistant Screeds & Topcoats",
              labelAr: "طبقات مقاومة للأحماض والمواد الكيميائية",
              href: "/solutions",
            },
          ],
        },
      ],
    },

    // 3. Featured Projects
    {
      titlePrefixEn: "Our Featured",
      titleHighlightEn: "Projects",
      titlePrefixAr: "أبرز",
      titleHighlightAr: "مشاريعنا",
      columnsCount: 4,
      columns: [
        {
          titleEn: "Residential Landmarks",
          titleAr: "المعالم السكنية الرائدة",
          links: [
            {
              labelEn: "Miami 1 – JVC, Samana Developers",
              labelAr: "ميامي 1 – قرية جميرا، سمانا",
              href: "/project",
            },
            {
              labelEn: "Miami Phase 2 – JVT, Samana",
              labelAr: "ميامي المرحلة 2 – مثلث قرية جميرا",
              href: "/project",
            },
            {
              labelEn: "Dubai Hills Estate Luxury Villas",
              labelAr: "فلل دبي هيلز استيت الفاخرة – إعمار",
              href: "/project",
            },
            {
              labelEn: "Arabian Ranches Communities",
              labelAr: "مجمعات المرابع العربية – إعمار",
              href: "/project",
            },
            {
              labelEn: "Palm Jumeirah Signature Villas",
              labelAr: "فلل نخلة جميرا الفاخرة",
              href: "/project",
            },
          ],
        },
        {
          titleEn: "Commercial & Hospitality",
          titleAr: "الأبراج التجارية والضيافة",
          links: [
            {
              labelEn: "City Premiere Marina Hotel Apartments",
              labelAr: "شقق سيتي بريمير مارينا الفندقية",
              href: "/project",
            },
            {
              labelEn: "Business Bay Commercial Towers",
              labelAr: "أبراج الخليج التجاري المكتبية",
              href: "/project",
            },
            {
              labelEn: "DIFC Corporate Headquarters",
              labelAr: "مقرات مركز دبي المالي العالمي",
              href: "/project",
            },
            {
              labelEn: "Al Barsha Retail & Office Plaza",
              labelAr: "مجمع البرشاء التجاري والمكتبي",
              href: "/project",
            },
            {
              labelEn: "Dubai Marina Mixed-Use Towers",
              labelAr: "أبراج دبي مارينا متعددة الاستخدامات",
              href: "/project",
            },
          ],
        },
        {
          titleEn: "Communities & Housing",
          titleAr: "المجمعات والفلل السكنية",
          links: [
            {
              labelEn: "NED Al Ghurair – Al Furjan South Villas",
              labelAr: "فلل الغرير – الفرجان جنوب",
              href: "/project",
            },
            {
              labelEn: "Jumeirah Village Circle Residences",
              labelAr: "مشاريع سكنية في قرية جميرا الدائرية",
              href: "/project",
            },
            {
              labelEn: "Al Warqa Residential Developments",
              labelAr: "تطويرات الورقاء السكنية الفاخرة",
              href: "/project",
            },
            {
              labelEn: "Mirdif Private Residential Compounds",
              labelAr: "مجمعات مردف السكنية الخاصة",
              href: "/project",
            },
            {
              labelEn: "Nad Al Sheba Private Villas",
              labelAr: "فلل ند الشبا السكنية المستقلة",
              href: "/project",
            },
          ],
        },
        {
          titleEn: "Industrial & Logistics",
          titleAr: "القطاع الصناعي واللوجستي",
          links: [
            {
              labelEn: "Dubai South Logistics Hubs",
              labelAr: "مستودعات ومراكز دبي الجنوب اللوجستية",
              href: "/project",
            },
            {
              labelEn: "Al Quoz Industrial Warehouses",
              labelAr: "مستودعات القوز الصناعية الكبرى",
              href: "/project",
            },
            {
              labelEn: "National Cold Storage Facilities",
              labelAr: "منشآت التبريد والتخزين الوطنية",
              href: "/project",
            },
            {
              labelEn: "JAFZA Manufacturing Plants",
              labelAr: "مصانع المنطقة الحرة بجبل علي",
              href: "/project",
            },
            {
              labelEn: "View Full Project Portfolio",
              labelAr: "عرض كافة مشاريع الشركة السابقة",
              href: "/project",
            },
          ],
        },
      ],
    },

    // 4. Industries We Serve (3 columns layout as in reference)
    {
      titlePrefixEn: "Industries We",
      titleHighlightEn: "Serve",
      titlePrefixAr: "القطاعات التي",
      titleHighlightAr: "نخدمها",
      columnsCount: 3,
      columns: [
        {
          titleEn: "Commercial & Retail",
          titleAr: "القطاع التجاري والتجزئة",
          links: [
            {
              labelEn: "Shopping Malls & Lifestyle Centers",
              labelAr: "المراكز التجارية ومجمعات التسوق",
              href: "/industries#construction",
            },
            {
              labelEn: "Corporate Offices & Business Parks",
              labelAr: "المكاتب الإدارية ومجمعات الأعمال",
              href: "/industries#construction",
            },
            {
              labelEn: "Hotels, Resorts & Beachfront Properties",
              labelAr: "الفنادق والمنتجعات والواجهات البحرية",
              href: "/industries#hospitality",
            },
            {
              labelEn: "Retail Showrooms & Hypermarkets",
              labelAr: "صالات العرض والهايبر ماركت",
              href: "/industries#construction",
            },
          ],
        },
        {
          titleEn: "Residential & Communities",
          titleAr: "القطاع السكني والمجتمعي",
          links: [
            {
              labelEn: "Master-Planned Villa Communities",
              labelAr: "المجمعات السكنية ومشاريع الفلل المخططة",
              href: "/industries#construction",
            },
            {
              labelEn: "High-Rise Apartment Towers",
              labelAr: "الأبراج السكنية شاهقة الارتفاع",
              href: "/industries#construction",
            },
            {
              labelEn: "Private Luxury Villas & Estates",
              labelAr: "الفلل والقصور السكنية الخاصة",
              href: "/industries#construction",
            },
            {
              labelEn: "Townhouses & Urban Living Clusters",
              labelAr: "مجمعات التاون هاوس الحديثة",
              href: "/industries#construction",
            },
          ],
        },
        {
          titleEn: "Industrial, Infrastructure & Public",
          titleAr: "الصناعة والبنية التحتية والمرافق العامة",
          links: [
            {
              labelEn: "Factories, Industrial Parks & Plants",
              labelAr: "المصانع والمنشآت ومجمعات الإنتاج",
              href: "/industries#manufacturing",
            },
            {
              labelEn: "Logistics Hubs & Distribution Warehouses",
              labelAr: "المستودعات اللوجستية ومراكز التوزيع",
              href: "/industries#manufacturing",
            },
            {
              labelEn: "Government Buildings & Public Facilities",
              labelAr: "المباني الحكومية والمؤسسات العامة",
              href: "/industries#marine-offshore",
            },
            {
              labelEn: "Educational Campuses & Hospitals",
              labelAr: "الجامعات والمستشفيات والمراكز الطبية",
              href: "/industries#power-energy",
            },
          ],
        },
      ],
    },

    // 5. Trusted Subcontractors (3 columns layout as in reference)
    {
      titlePrefixEn: "Our Trusted",
      titleHighlightEn: "Subcontractors",
      titlePrefixAr: "خدمات المقاولات",
      titleHighlightAr: "من الباطن",
      columnsCount: 3,
      columns: [
        {
          titleEn: "Subcontracting Capabilities",
          titleAr: "قدرات وإمكانيات المقاولة",
          links: [
            {
              labelEn: "Turnkey Waterproofing Packages",
              labelAr: "حزم المقاولات المتكاملة للعزل المائي",
              href: "/subcontract#capabilities",
            },
            {
              labelEn: "Joint Venture & Strategic Partnerships",
              labelAr: "المشاريع المشتركة والشراكات الاستراتيجية",
              href: "/subcontract#partner",
            },
            {
              labelEn: "Specialist Thermal & Acoustic Insulation",
              labelAr: "عقود العزل الحراري والصوتي المتخصصة",
              href: "/subcontract#services",
            },
            {
              labelEn: "Fast-Track Project Mobilization",
              labelAr: "تجهيز الموقع والبدء السريع للأعمال",
              href: "/subcontract#capabilities",
            },
            {
              labelEn: "Dedicated On-Site Engineering Teams",
              labelAr: "فرق هندسية وإشرافية مخصصة للموقع",
              href: "/subcontract#expertise",
            },
          ],
        },
        {
          titleEn: "Compliance & Technical Quality",
          titleAr: "معايير الامتثال والجودة الفنية",
          links: [
            {
              labelEn: "Dubai Municipality Approved Applicators",
              labelAr: "مقاول معتمد لدى بلدية دبي",
              href: "/subcontract#certifications",
            },
            {
              labelEn: "Civil Defense Approved Fire & Safety Standards",
              labelAr: "مطابقة لاشتراطات الدفاع المدني",
              href: "/subcontract#certifications",
            },
            {
              labelEn: "ISO Certified QA/QC Inspection Protocols",
              labelAr: "إجراءات فحص وضبط جودة معتمدة ISO",
              href: "/subcontract#certifications",
            },
            {
              labelEn: "Full HSE Compliance & Safety Audits",
              labelAr: "التزام كامل بمعايير السلامة والبيئة (HSE)",
              href: "/subcontract#certifications",
            },
            {
              labelEn: "Strict Material Testing & Manufacturer Warranty",
              labelAr: "فحوصات معتمدة وضمانات مباشرة من المصنع",
              href: "/warranty",
            },
          ],
        },
        {
          titleEn: "Partner With Us",
          titleAr: "انضم إلينا كشريك معتمد",
          links: [
            {
              labelEn: "Subcontractor Prequalification Form",
              labelAr: "نموذج التأهيل المسبق للمقاولين",
              href: "/subcontract#partner",
            },
            {
              labelEn: "Vendor & Supplier Portal Registration",
              labelAr: "تسجيل الموردين والمقاولين المعتمدين",
              href: "/subcontract#partner",
            },
            {
              labelEn: "Tender Inquiries & Estimation Desk",
              labelAr: "استفسارات المناقصات وقسم التسعير",
              href: "/get-a-quote",
            },
            {
              labelEn: "Direct Contractor Support Line",
              labelAr: "خط الاتصال المباشر للمقاولين الرئيسيين",
              href: "/contact",
            },
            {
              labelEn: "View Subcontractor Project Portfolio",
              labelAr: "استعراض سجل مشاريع المقاولات المنفذة",
              href: "/subcontract#projects",
            },
          ],
        },
      ],
    },

    // 6. About Our Company
    {
      titlePrefixEn: "About Our",
      titleHighlightEn: "Company",
      titlePrefixAr: "عن",
      titleHighlightAr: "شركتنا",
      columnsCount: 4,
      columns: [
        {
          titleEn: "Corporate Profile",
          titleAr: "الملف التعريفي للشركة",
          links: [
            {
              labelEn: "About Taj Al Rahmah",
              labelAr: "نبذة عن تاج الرحمة للعوازل",
              href: "/about-us",
            },
            {
              labelEn: "Our Mission, Vision & Values",
              labelAr: "رسالتنا ورؤيتنا وقيمنا الجوهرية",
              href: "/about-us",
            },
            {
              labelEn: "Executive Leadership & Engineers",
              labelAr: "القيادة التنفيذية وفريق المهندسين",
              href: "/about-us",
            },
            {
              labelEn: "Company Heritage & Milestones",
              labelAr: "تاريخ الشركة وإنجازاتها في الإمارات",
              href: "/about-us",
            },
            {
              labelEn: "Our Specialized Expertise",
              labelAr: "مجالات خبرتنا المتطورة",
              href: "/expertise",
            },
          ],
        },
        {
          titleEn: "Credentials & Trust",
          titleAr: "الاعتمادات والموثوقية",
          links: [
            {
              labelEn: "Official Certifications & Accreditations",
              labelAr: "الشهادات والاعتمادات الرسمية",
              href: "/certifications",
            },
            {
              labelEn: "Dubai Municipality License & Approvals",
              labelAr: "رخصة واعتماد بلدية دبي",
              href: "/certifications",
            },
            {
              labelEn: "Client Testimonials & Feedback",
              labelAr: "آراء وتقييمات العملاء والشركاء",
              href: "/about-us",
            },
            {
              labelEn: "Safety & Sustainability Policies",
              labelAr: "سياسات السلامة والاستدامة البيئية",
              href: "/about-us",
            },
            {
              labelEn: "Corporate Social Responsibility",
              labelAr: "المسؤولية الاجتماعية للشركة",
              href: "/about-us",
            },
          ],
        },
        {
          titleEn: "Media & Resources",
          titleAr: "المركز الإعلامي والتحميلات",
          links: [
            {
              labelEn: "Project Photo Gallery",
              labelAr: "معرض صور المشاريع والأعمال",
              href: "/media",
            },
            {
              labelEn: "Video Gallery & Site Demonstrations",
              labelAr: "معرض الفيديوهات والتطبيقات العملية",
              href: "/media",
            },
            {
              labelEn: "Download Center & Catalogs",
              labelAr: "مركز تحميل الكتالوجات والملفات",
              href: "/download",
            },
            {
              labelEn: "Company Profile Document (PDF)",
              labelAr: "تحميل الملف التعريفي للشركة (PDF)",
              href: "/download",
            },
            {
              labelEn: "Insights, Articles & Industry Blogs",
              labelAr: "المقالات والمدونة المتخصصة",
              href: "/blogs",
            },
          ],
        },
        {
          titleEn: "Governance & Policies",
          titleAr: "السياسات واللوائح القانونية",
          links: [
            {
              labelEn: "Refund & Cancellation Policy",
              labelAr: "سياسة الاسترداد والإلغاء",
              href: "/refund-policy",
            },
            {
              labelEn: "Privacy Policy",
              labelAr: "سياسة الخصوصية وحماية البيانات",
              href: "/privacy",
            },
            {
              labelEn: "Terms of Use",
              labelAr: "شروط وأحكام الاستخدام",
              href: "/terms",
            },
            {
              labelEn: "Cookie Policy",
              labelAr: "سياسة ملفات تعريف الارتباط (الكوكيز)",
              href: "/cookies",
            },
            {
              labelEn: "Official Warranty Terms",
              labelAr: "أحكام وشروط الضمان المعتمد",
              href: "/warranty",
            },
          ],
        },
      ],
    },

    // 7. Career
    {
      titlePrefixEn: "Build Your",
      titleHighlightEn: "Career With Us",
      titlePrefixAr: "انضم إلى",
      titleHighlightAr: "فريق عملنا",
      columnsCount: 4,
      columns: [
        {
          titleEn: "Engineering Roles",
          titleAr: "الوظائف الهندسية",
          links: [
            {
              labelEn: "Waterproofing Project Engineers",
              labelAr: "مهندسو مشاريع عزل مائي",
              href: "/career",
            },
            {
              labelEn: "Site QA/QC Quality Inspectors",
              labelAr: "مفتشو وضباط جودة ميدانية (QA/QC)",
              href: "/career",
            },
            {
              labelEn: "Quantity Surveyors & Estimators",
              labelAr: "مهندسو حصر كميات وتسعير",
              href: "/career",
            },
            {
              labelEn: "Technical Sales Executives",
              labelAr: "مسؤولو مبيعات واستشارات فنية",
              href: "/career",
            },
          ],
        },
        {
          titleEn: "Culture & Benefits",
          titleAr: "بيئة العمل والمزايا",
          links: [
            {
              labelEn: "Safety-First Work Culture",
              labelAr: "بيئة عمل ترتكز على أعلى معايير السلامة",
              href: "/career",
            },
            {
              labelEn: "Continuous Technical Training",
              labelAr: "برامج تدريب وتطوير مهني مستمر",
              href: "/career",
            },
            {
              labelEn: "Equal Opportunity Employer",
              labelAr: "فرص متكافئة وبيئة عمل محفزة وشاملة",
              href: "/career",
            },
            {
              labelEn: "Comprehensive Healthcare & Insurance",
              labelAr: "تأمين صحي ومزايا تنافسية شاملة",
              href: "/career",
            },
          ],
        },
        {
          titleEn: "How to Apply",
          titleAr: "طريقة التقديم للوظائف",
          links: [
            {
              labelEn: "View Current Job Vacancies",
              labelAr: "استعراض الشواغر الوظيفية الحالية",
              href: "/career",
            },
            {
              labelEn: "Submit Online Job Application",
              labelAr: "تقديم طلب التوظيف الإلكتروني",
              href: "/career",
            },
            {
              labelEn: "Engineering Internship Program",
              labelAr: "برنامج تدريب المهندسين والخريجين",
              href: "/career",
            },
            {
              labelEn: "Careers HR Email Portal",
              labelAr: "البريد الإلكتروني للتوظيف والموارد البشرية",
              href: "/career",
            },
          ],
        },
        {
          titleEn: "Field Specialists",
          titleAr: "الفنيون والمشرفون الميدانيون",
          links: [
            {
              labelEn: "Certified Applicators & Foremen",
              labelAr: "فنيو عزل معتمدون وملاحظو مواقع",
              href: "/career",
            },
            {
              labelEn: "Polyurea & Spray Machine Operators",
              labelAr: "مشغلو أجهزة ومعدات رش البولي يوريا",
              href: "/career",
            },
            {
              labelEn: "Health & Safety Field Officers",
              labelAr: "مسؤولو ومراقبو السلامة الميدانية",
              href: "/career",
            },
            {
              labelEn: "Subcontract Field Coordinators",
              labelAr: "منسقو أعمال المقاولات الميدانية",
              href: "/subcontract",
            },
          ],
        },
      ],
    },

    // 8. Contact Us
    {
      titlePrefixEn: "Get In",
      titleHighlightEn: "Touch With Us",
      titlePrefixAr: "تواصل",
      titleHighlightAr: "معنا مباشرة",
      columnsCount: 3,
      columns: [
        {
          titleEn: "Headquarters & Office",
          titleAr: "المقر الرئيسي والمكاتب",
          links: [
            {
              labelEn: "Al Khabaisi, Deira, Dubai, UAE",
              labelAr: "الخبايصي، ديرة، دبي، الإمارات",
              href: "/contact#map",
            },
            {
              labelEn: "P.O. Box: Dubai, United Arab Emirates",
              labelAr: "ص.ب: دبي، الإمارات العربية المتحدة",
              href: "/contact#map",
            },
            {
              labelEn: "Working Hours: Mon – Sat 8:00 AM – 6:00 PM",
              labelAr: "ساعات العمل: السبت - الخميس 8:00 ص - 6:00 م",
              href: "/contact",
            },
            {
              labelEn: "Location Map & Driving Directions",
              labelAr: "خريطة الموقع واتجاهات القيادة",
              href: "/contact#map",
            },
          ],
        },
        {
          titleEn: "Immediate Assistance",
          titleAr: "التواصل الهاتفي السريع",
          links: [
            {
              labelEn: "Direct Mobile: +971 52 749 2002",
              labelAr: "هاتف مباشر: 2002 749 52 971+",
              href: "tel:+971527492002",
            },
            {
              labelEn: "Landline Office: +971 4 529 7800",
              labelAr: "هاتف المكتب: 7800 529 4 971+",
              href: "tel:+97145297800",
            },
            {
              labelEn: "WhatsApp Chat Support (24/7 Available)",
              labelAr: "خدمة واتساب المباشرة (متاحة على مدار الساعة)",
              href: "https://wa.me/971527492002",
            },
            {
              labelEn: "Official Email: info@tajalrahmah.com",
              labelAr: "البريد الإلكتروني: info@tajalrahmah.com",
              href: "mailto:info@tajalrahmah.com",
            },
          ],
        },
        {
          titleEn: "Online Support & Services",
          titleAr: "الخدمات والاستفسارات الرقمية",
          links: [
            {
              labelEn: "Request a Free Competitive Quote",
              labelAr: "طلب عرض سعر مجاني وتنافسي",
              href: "/get-a-quote",
            },
            {
              labelEn: "Book a Free Engineering Site Survey",
              labelAr: "حجز معاينة هندسية ميدانية مجانية",
              href: "/contact#expert",
            },
            {
              labelEn: "Frequently Asked Questions (FAQs)",
              labelAr: "الأسئلة الشائعة والأجوبة",
              href: "/faqs",
            },
            {
              labelEn: "Send an Online Inquiry Form",
              labelAr: "إرسال استفسار عبر النموذج الإلكتروني",
              href: "/contact#enquiry",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white text-stone-800" dir={isArabic ? "rtl" : "ltr"}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (Using sitemapBanner.png)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] overflow-hidden">
        {/* Background Image: sitemapBanner.png */}
        <div className="absolute inset-0">
          <Image
            src="/sitemapBanner.png"
            alt={isArabic ? "خريطة الموقع - تاج الرحمة" : "Site Map - Taj Al Rahmah"}
            fill
            priority
            unoptimized
            className={`object-cover ${
              isArabic ? "scale-x-[-1] object-left" : "object-right sm:object-center"
            }`}
          />
          {/* Subtle dark gradient overlay to ensure strong text legibility */}
          <div
            className={`absolute inset-0 ${
              isArabic
                ? "bg-gradient-to-l from-black/85 via-black/55 to-transparent"
                : "bg-gradient-to-r from-black/85 via-black/55 to-transparent"
            }`}
          />
        </div>

        {/* Content Container (Left-aligned as in reference design) */}
        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
          <div className="max-w-xl text-left rtl:text-right">
            {/* Brand Title (White text) */}
            <p className="text-xl sm:text-2xl md:text-[28px] font-bold text-white tracking-wide mb-1 sm:mb-1.5 drop-shadow-sm">
              {isArabic ? "تاج الرحمة" : "Taj Al Rahmah"}
            </p>

            {/* Page Title: Site Map (Vibrant Cyan #00DDCF text) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#00DDCF] tracking-tight leading-tight drop-shadow-sm">
              {isArabic ? "خريطة الموقع" : "Site Map"}
            </h1>

            {/* Subtle Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-md font-medium leading-relaxed">
              {isArabic
                ? "دليلك الشامل لجميع خدماتنا، حلولنا الهندسية، مشاريعنا، وموارد تاج الرحمة في دولة الإمارات."
                : "Comprehensive directory of our waterproofing services, engineering solutions, projects, and resources."}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. SITEMAP DIRECTORY CONTENT (Matching layout & visual design)
      ══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="space-y-12 sm:space-y-14">
          {sections.map((section, secIdx) => {
            const isThreeCols = section.columnsCount === 3;

            return (
              <section
                key={secIdx}
                className="border-b border-stone-200/70 pb-10 sm:pb-12 last:border-b-0 last:pb-0"
              >
                {/* Category Heading with Cyan Bar: e.g. — Our Professional Services */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                  <span
                    className="inline-block w-4 sm:w-5 h-[3px] bg-[#00DDCF] rounded-full shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {isArabic ? (
                      <>
                        <span>{section.titlePrefixAr} </span>
                        <span className="text-[#00c2b2]">{section.titleHighlightAr}</span>
                      </>
                    ) : (
                      <>
                        <span>{section.titlePrefixEn} </span>
                        <span className="text-[#00c2b2]">{section.titleHighlightEn}</span>
                      </>
                    )}
                  </h2>
                </div>

                {/* Multi-column Links Grid */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    isThreeCols
                      ? "lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                      : "lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
                  }`}
                >
                  {section.columns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col">
                      {/* Column Header */}
                      <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-900 tracking-tight mb-2.5 sm:mb-3">
                        {isArabic ? col.titleAr : col.titleEn}
                      </h3>

                      {/* Links List */}
                      <ul className="space-y-1.5 sm:space-y-2">
                        {col.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              className="text-xs sm:text-[13px] text-stone-600 hover:text-[#01a9a0] transition-colors leading-relaxed block py-0.5"
                            >
                              {isArabic ? link.labelAr : link.labelEn}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
