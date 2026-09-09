"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

/* ─── TYPES ─────────────────────────────────────────────────── */
interface ServiceItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  link: string;
}

interface ServiceCategory {
  id: string;
  label: string;
  labelAr: string;
  icon: string;
  subheading: string;
  subheadingAr: string;
  items: ServiceItem[];
}

/* ─── DATA ───────────────────────────────────────────────────── */
const CATEGORIES: ServiceCategory[] = [
  {
    id: "waterproofing",
    label: "Waterproofing",
    labelAr: "العزل المائي",
    icon: "/landing/services/6.svg",
    subheading: "All types of waterproofing",
    subheadingAr: "جميع أنواع العزل المائي",
    items: [
      {
        id: "grp",
        title: "GRP & Fiberglass Waterproofing Coating",
        titleAr: "طلاء العزل بالألياف الزجاجية",
        description: "All-around fiberglass waterproofing protection designed to prevent water ingress on all surfaces.",
        descriptionAr: "حماية شاملة بالألياف الزجاجية مصممة لمنع تسرب المياه على جميع الأسطح.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png",
        link: "/services-details?service=1",
      },
      {
        id: "combo",
        title: "Combo System Roofing",
        titleAr: "نظام التسقيف المركّب",
        description: "Combined roofing and waterproofing system offering both thermal insulation and leak protection.",
        descriptionAr: "نظام تسقيف مركّب يوفر العزل الحراري والحماية من التسرب.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8.png",
        link: "/services-details?service=1",
      },
      {
        id: "epoxy",
        title: "Epoxy Floor Coating",
        titleAr: "طلاء الأرضيات الإيبوكسي",
        description: "High-performance epoxy flooring and coating for industrial and professional environments.",
        descriptionAr: "أرضيات إيبوكسي عالية الأداء للبيئات الصناعية والاحترافية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (3).png",
        link: "/services-details?service=1",
      },
      {
        id: "polyurea",
        title: "Polyurea Spray Coating",
        titleAr: "طلاء رذاذ البولي يوريا",
        description: "Rapid-cure elastic membrane for decks, tanks and heavy-traffic surfaces.",
        descriptionAr: "غشاء مرن سريع التصلب للأسطح والخزانات والمناطق كثيفة الاستخدام.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (4).png",
        link: "/services-details?service=1",
      },
      {
        id: "pool-lining",
        title: "Swimming Pool Lining",
        titleAr: "بطانة حمامات السباحة",
        description: "Watertight lining systems for pools, water features and reservoir tanks.",
        descriptionAr: "أنظمة بطانة محكمة لحمامات السباحة وخزانات المياه.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (5).png",
        link: "/services-details?service=1",
      },
      {
        id: "injection",
        title: "Injection Grouting",
        titleAr: "الحقن بالمونة",
        description: "Precision grouting that seals active leaks, cracks and construction joints.",
        descriptionAr: "حقن دقيق يعالج التسربات النشطة والشقوق وفواصل البناء.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (6).png",
        link: "/services-details?service=1",
      },
      {
        id: "bituminous",
        title: "Bituminous Membrane",
        titleAr: "الغشاء البيتوميني",
        description: "Torch-applied bituminous membrane systems for roofs, podiums and sub-structures.",
        descriptionAr: "أنظمة غشاء بيتوميني بالحرق للأسطح والميازيب والهياكل تحت الأرض.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (7).png",
        link: "/services-details?service=1",
      },
      {
        id: "water-tank",
        title: "Water Tank Waterproofing",
        titleAr: "عزل خزانات المياه",
        description: "Potable-safe lining for underground storage, supply tanks and utility structures.",
        descriptionAr: "بطانة آمنة للشرب لخزانات التخزين الجوفية وخزانات الإمداد.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (8).png",
        link: "/services-details?service=1",
      },
      {
        id: "basement",
        title: "Basement Tanking",
        titleAr: "عزل الأقبية",
        description: "Negative-side and positive-side tanking that keeps below-grade areas permanently dry.",
        descriptionAr: "عزل الأقبية من الوجهين للحفاظ على المناطق تحت مستوى الأرض جافة.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (9).png",
        link: "/services-details?service=1",
      },
    ],
  },
  {
    id: "swimming-pools",
    label: "Swimming Pools",
    labelAr: "حمامات السباحة",
    icon: "/landing/services/1.svg",
    subheading: "Complete pool construction & renovation",
    subheadingAr: "إنشاء وتجديد حمامات السباحة",
    items: [
      {
        id: "pool-construction",
        title: "Pool Construction",
        titleAr: "إنشاء حمامات السباحة",
        description: "End-to-end design, excavation, structural build and finishing of residential and commercial pools.",
        descriptionAr: "تصميم وحفر وبناء هيكلي وتشطيب حمامات السباحة السكنية والتجارية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (5).png",
        link: "/services-details?service=2",
      },
      {
        id: "pool-renovation",
        title: "Pool Renovation & Resurfacing",
        titleAr: "تجديد وإعادة تسطيح حمامات السباحة",
        description: "Full renovation including structural repair, tile replacement and modern surface finishes.",
        descriptionAr: "تجديد شامل يشمل الإصلاح الهيكلي واستبدال البلاط والأسطح الحديثة.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8.png",
        link: "/services-details?service=2",
      },
      {
        id: "pool-equipment",
        title: "Pool Equipment & Filtration",
        titleAr: "معدات وترشيح حمامات السباحة",
        description: "Supply, installation and commissioning of pumps, filters and chemical dosing systems.",
        descriptionAr: "توريد وتركيب وتشغيل المضخات والمرشحات وأنظمة الجرعات الكيميائية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (3).png",
        link: "/services-details?service=2",
      },
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    labelAr: "الكهرباء",
    icon: "/landing/services/2.svg",
    subheading: "Electrical installation & maintenance",
    subheadingAr: "تركيب وصيانة الأنظمة الكهربائية",
    items: [
      {
        id: "elec-install",
        title: "Electrical Installation",
        titleAr: "التركيبات الكهربائية",
        description: "Complete low and medium voltage electrical installations for residential, commercial and industrial buildings.",
        descriptionAr: "تركيبات كهربائية كاملة لمنخفض ومتوسط الجهد لجميع أنواع المباني.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (4).png",
        link: "/services-details?service=3",
      },
      {
        id: "elec-maintenance",
        title: "Electrical Maintenance & Repair",
        titleAr: "صيانة وإصلاح الكهرباء",
        description: "Preventive and corrective maintenance of electrical systems, panels and distribution boards.",
        descriptionAr: "صيانة وقائية وتصحيحية للأنظمة الكهربائية واللوحات الكهربائية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (6).png",
        link: "/services-details?service=3",
      },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    labelAr: "السباكة",
    icon: "/landing/services/3.svg",
    subheading: "Plumbing & MEP services",
    subheadingAr: "خدمات السباكة والميكانيكا",
    items: [
      {
        id: "plumb-install",
        title: "Plumbing Installation",
        titleAr: "تركيبات السباكة",
        description: "Full plumbing services including supply, drainage and sanitary fitting for all building types.",
        descriptionAr: "خدمات سباكة كاملة تشمل الإمداد والصرف والتركيبات الصحية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (7).png",
        link: "/services-details?service=4",
      },
      {
        id: "plumb-maintenance",
        title: "Plumbing Maintenance",
        titleAr: "صيانة السباكة",
        description: "Emergency and scheduled maintenance of water supply and drainage systems.",
        descriptionAr: "صيانة طارئة ومجدولة لأنظمة إمداد المياه والصرف الصحي.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (8).png",
        link: "/services-details?service=4",
      },
    ],
  },
  {
    id: "tiling",
    label: "Tiling",
    labelAr: "تركيب البلاط",
    icon: "/landing/services/4.svg",
    subheading: "Professional tiling solutions",
    subheadingAr: "حلول تركيب البلاط الاحترافية",
    items: [
      {
        id: "floor-tiling",
        title: "Floor & Wall Tiling",
        titleAr: "تركيب بلاط الأرضيات والجدران",
        description: "Expert installation of ceramic, porcelain and natural stone tiles for all indoor and outdoor areas.",
        descriptionAr: "تركيب احترافي للبلاط السيراميكي والبورسلان والحجر الطبيعي.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (9).png",
        link: "/services-details?service=5",
      },
      {
        id: "mosaic",
        title: "Mosaic & Decorative Tiling",
        titleAr: "الفسيفساء والبلاط الزخرفي",
        description: "Custom mosaic and decorative tile designs for pools, feature walls and high-end interiors.",
        descriptionAr: "تصميمات فسيفساء وبلاط زخرفي مخصصة للمسابح والجدران المميزة.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (1).png",
        link: "/services-details?service=5",
      },
    ],
  },
  {
    id: "plastering",
    label: "Plastering",
    labelAr: "اللياسة",
    icon: "/landing/services/5.svg",
    subheading: "Interior & exterior plastering",
    subheadingAr: "لياسة داخلية وخارجية",
    items: [
      {
        id: "internal-plaster",
        title: "Internal Plastering",
        titleAr: "اللياسة الداخلية",
        description: "Smooth and textured internal wall plastering using high-quality compounds for lasting finish.",
        descriptionAr: "لياسة جدران داخلية ناعمة ومنقوشة بمواد عالية الجودة.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (3).png",
        link: "/services-details?service=5",
      },
      {
        id: "external-render",
        title: "External Rendering",
        titleAr: "اللياسة الخارجية",
        description: "Weather-resistant external render systems for facades and structural surfaces.",
        descriptionAr: "أنظمة لياسة خارجية مقاومة للعوامل الجوية للواجهات والأسطح الهيكلية.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (4).png",
        link: "/services-details?service=5",
      },
    ],
  },
  {
    id: "painting",
    label: "Painting",
    labelAr: "الدهانات",
    icon: "/landing/services/6.svg",
    subheading: "Painting & surface coatings",
    subheadingAr: "الدهانات وطلاء الأسطح",
    items: [
      {
        id: "interior-paint",
        title: "Interior Painting",
        titleAr: "الدهانات الداخلية",
        description: "Professional interior painting services using premium paints for a flawless, long-lasting finish.",
        descriptionAr: "خدمات دهانات داخلية احترافية بدهانات فاخرة لطلاء مثالي ودائم.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (5).png",
        link: "/services-details?service=6",
      },
      {
        id: "exterior-paint",
        title: "Exterior & Facade Painting",
        titleAr: "دهانات الواجهات الخارجية",
        description: "UV-resistant exterior coatings that protect and beautify building facades in all climates.",
        descriptionAr: "طلاءات خارجية مقاومة للأشعة فوق البنفسجية تحمي واجهات المباني.",
        image: "/media/servicesListing/unsplash_CPs2X8JYmS8 (6).png",
        link: "/services-details?service=6",
      },
    ],
  },
];

/* ─── SERVICE CARD ───────────────────────────────────────────── */
function ServiceCard({ item, isArabic }: { item: ServiceItem; isArabic: boolean }) {
  return (
    <Link
      href={item.link}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-[#009e90]/30 shadow-sm hover:shadow-[0_8px_28px_rgba(0,158,144,0.13)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full h-[150px] sm:h-[160px] overflow-hidden bg-stone-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={isArabic ? item.titleAr : item.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[13.5px] font-bold text-stone-900 leading-snug mb-2 group-hover:text-[#009e90] transition-colors duration-200">
          {isArabic ? item.titleAr : item.title}
        </h3>
        <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-3 flex-grow mb-3">
          {isArabic ? item.descriptionAr : item.description}
        </p>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#009e90] group-hover:gap-2 transition-all duration-200">
          {isArabic ? "اقرأ المزيد" : "Read more"}
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        </span>
      </div>
    </Link>
  );
}

/* ─── SIDEBAR ICON ───────────────────────────────────────────── */
function SidebarIcon({ src, active }: { src: string; active: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      width={17}
      height={17}
      className={`w-[17px] h-[17px] object-contain flex-shrink-0 transition-all duration-200 ${
        active ? "brightness-0 invert" : "opacity-40"
      }`}
    />
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function ServicesListing() {
  const { isArabic, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("waterproofing");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.subject,
          message: formData.subject
            ? `[Subject: ${formData.subject}]\n\n${formData.message}`
            : formData.message,
        }),
      });

      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
            : "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          {
            duration: 5000,
            style: {
              background: "#009e90",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#009e90",
            },
          }
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.error ||
            (isArabic
              ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
              : "Failed to send message. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic
          ? "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى لاحقاً."
          : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══ HERO BANNER ══════════════════════════════════════════ */}
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden">
        <Image
          src="/media/servicesListing/Rectangle 14 (1).png"
          alt={isArabic ? "استكشف الخدمات" : "Explore by services"}
          fill
          unoptimized
          priority
          className="object-cover object-center"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/58" />

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-[32px] md:text-4xl font-extrabold text-white leading-tight drop-shadow">
            {isArabic ? "استكشف حسب الخدمات" : "Explore by services"}
          </h1>
          <p className="text-sm sm:text-[15px] text-white/82 max-w-md leading-relaxed">
            {isArabic
              ? "تصفح مجموعتنا الكاملة من الخدمات الاحترافية بجودة يمكنك الوثوق بها."
              : "Browse our full range of professional services designed to meet your home, business, and maintenance needs with quality you can trust."}
          </p>
          {/* dot indicators */}
          <div className="flex items-center gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`inline-block rounded-full ${
                  i === 0 ? "w-6 h-[7px] bg-[#009e90]" : "w-[7px] h-[7px] bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ BODY: SIDEBAR + GRID ═════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <aside className="w-full lg:w-[210px] xl:w-[230px] flex-shrink-0">

            {/* "TRADES" eyebrow */}
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-stone-400 mb-3 px-1">
              {isArabic ? "الخدمات" : "TRADES"}
            </p>

            {/* Category tabs */}
            <nav className="flex flex-col gap-0.5">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveId(cat.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#009e90] text-white shadow-[0_4px_14px_rgba(0,158,144,0.28)]"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <SidebarIcon src={cat.icon} active={isActive} />
                    <span className={`text-[13px] font-semibold flex-grow text-left ${isArabic ? "text-right" : "text-left"}`}>
                      {isArabic ? cat.labelAr : cat.label}
                    </span>
                    {isActive && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTA box */}
            <div className="mt-5 bg-[#009e90] rounded-2xl p-4 sm:p-5 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <MessageCircle className="w-[18px] h-[18px] text-white" />
              </div>
              <h4 className="text-[13px] font-bold mb-1.5 leading-snug">
                {isArabic ? "لست متأكداً من أين تبدأ؟" : "Not sure where to start?"}
              </h4>
              <p className="text-[11px] text-white/80 leading-relaxed mb-4">
                {isArabic
                  ? "فريقنا يساعدك في اختيار الخدمة المناسبة لمشروعك بسرعة."
                  : "Our team helps you pick the best service for every setup. Get a personalised recommendation in minutes."}
              </p>
              <Link
                href="/contact"
                className="text-[11px] font-bold text-white underline underline-offset-2 hover:text-white/75 transition-colors duration-200"
              >
                {isArabic ? "تحدث إلى خبير" : "Talk to an expert"}
              </Link>
            </div>
          </aside>

          {/* ── CONTENT AREA ────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Heading row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-[3px] h-6 bg-[#009e90] rounded-full flex-shrink-0" />
                <h2 className="text-[17px] sm:text-[19px] font-extrabold text-stone-900 leading-tight">
                  {isArabic ? active.subheadingAr : active.subheading}
                </h2>
              </div>
              <Link
                href="/contact"
                className="text-[12px] font-semibold text-[#009e90] hover:text-[#01887e] flex items-center gap-1 whitespace-nowrap transition-colors duration-200"
              >
                {isArabic ? "تحدث إلى خبير" : "Licensed electricians"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {active.items.map((item) => (
                <ServiceCard key={item.id} item={item} isArabic={isArabic} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ CONTACT / INQUIRY SECTION (BELOW LISTING) ══════════════ */}
      <section className="w-full bg-[#f4f6f8] py-16 sm:py-20 lg:py-24 border-t border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="flex items-center gap-1">
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
              <span className="w-1 h-3.5 bg-[#009e90] -skew-x-[20deg] rounded-full inline-block" />
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold tracking-wide text-stone-600">
              {isArabic ? "تواصل معنا الآن" : "Contact With Us Now"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold text-stone-900 text-center leading-tight sm:leading-tight mb-8 sm:mb-12 max-w-2xl mx-auto tracking-tight">
            {isArabic
              ? "لا تتردد في مراسلة خبرائنا التقنيين"
              : "Feel Free to Write Our Tecnology Experts"}
          </h2>

          {/* Form */}
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder={isArabic ? "عنوان البريد الإلكتروني" : "Email Address"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Row 2: Phone Number & Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={isArabic ? "الموضوع" : "Subject"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Row 3: Message Textarea */}
            <div>
              <textarea
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={isArabic ? "الرسالة" : "Message"}
                className={`w-full bg-white border border-stone-200/90 rounded-lg px-5 py-4 text-stone-800 placeholder:text-stone-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#009e90] focus:ring-2 focus:ring-[#009e90]/15 transition-all resize-y shadow-2xs ${
                  isArabic ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] active:scale-[0.98] text-white font-bold text-sm sm:text-[15px] px-10 py-3.5 rounded-full shadow-md shadow-[#009e90]/25 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isArabic ? "جاري الإرسال..." : "Sending..."}</span>
                  </>
                ) : (
                  <span>{isArabic ? "إرسال الرسالة" : "Send Message"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ══ FAQ SECTION ═══════════════════════════════════════════ */}
      <section className="w-full bg-[#f4f6f8] pb-16 sm:pb-20 lg:pb-24 pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b2447] text-white rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-xl">
            {/* Title */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                {t.faq.titlePrefix}{" "}
                <span className="text-[#009e90]">{t.faq.titleAccent}</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                {t.faq.subtitle}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/15 max-w-4xl mx-auto mb-10 sm:mb-14" />

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-x-12 md:gap-y-10 mb-12 sm:mb-16">
              {t.faq.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.question}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Still have questions CTA */}
            <div className="bg-white/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
              <div className="flex-1 max-w-xl">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2 sm:mb-3">
                  {t.faq.stillHave.title}
                </h3>
                <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                  {t.faq.stillHave.subtitle}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#009e90] hover:bg-[#01887e] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-7 sm:px-9 py-3.5 sm:py-4 rounded-full shadow-md shadow-[#009e90]/30 transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                {t.faq.stillHave.button}
                <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOOK A VISIT CTA BANNER (HIGHLIGHTED SECTION) ═════════ */}
      <section className="w-full bg-[#f4f6f8] pb-16 sm:pb-20 lg:pb-24 pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0b2447] text-white rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2 sm:mb-2.5 leading-snug">
                {isArabic ? "احجز زيارة هذا الأسبوع." : "Book a visit for this week."}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                {isArabic
                  ? "أخبرنا بما تريده. ستحصل على عرض سعر ثابت في نفس اليوم وفترة وصول محددة بساعتين."
                  : "Tell us what needs doing. You'll get a fixed quote the same day and a two-hour arrival window."}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("inquiry-form");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    const input = el.querySelector<HTMLInputElement>("input[name='fullName']");
                    if (input) input.focus();
                  }
                }}
                className="flex-1 sm:flex-initial text-center bg-[#009e90] hover:bg-[#01887e] active:scale-[0.98] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-full shadow-md shadow-[#009e90]/25 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                {isArabic ? "حجز فني متخصص" : "Book a Technician"}
              </button>
              <a
                href="tel:+971556173300"
                className="flex-1 sm:flex-initial text-center bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/25 hover:border-white/40 text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                {isArabic ? "اتصل الآن" : "Call Now"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}