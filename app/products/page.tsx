"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import CommonHeader from "@/components/Common/CommonHeader";
import ClientTestimonials from "@/components/ClientTestimonials";
import {
  Search,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Award,
  SlidersHorizontal,
  ArrowRight,
  PhoneCall,
  X,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  standards: string;
  availability: "In Stock" | "Available on Order" | "Fast Dispatch";
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Digital & Dial Pressure Gauges",
    category: "Pressure & Valves",
    image: "/Catagory/Gauge-Dial-Digital.png",
    description:
      "Precision digital and analog pressure gauges engineered for high-accuracy industrial monitoring across severe environments.",
    features: [
      "Accuracy up to ±0.05% FS",
      "Corrosion-resistant stainless steel body",
      "IP67 weatherproof enclosure",
      "Dual pressure units (Bar, PSI, KPa)",
    ],
    standards: "ISO 9001 / EN 837-1",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Industrial Calibration Standards",
    category: "Calibration & Testing",
    image: "/Catagory/Calibration.png",
    description:
      "Certified primary and secondary reference standards for dimensional, mechanical, and force calibration laboratories.",
    features: [
      "Traceable to national & international standards",
      "Includes ISO/IEC 17025 certified report",
      "High thermal stability alloys",
      "Custom tolerance classes available",
    ],
    standards: "ISO/IEC 17025",
    availability: "Fast Dispatch",
  },
  {
    id: 3,
    name: "Process Control Instrumentation",
    category: "Instrumentation",
    image: "/Catagory/Process Control Instrumentation.png",
    description:
      "Advanced flow meters, temperature transmitters, and level sensors designed for seamless SCADA and PLC integration.",
    features: [
      "HART, Modbus & 4-20mA output options",
      "Explosion-proof ATEX / IECEx certified",
      "Integrated LCD diagnostic display",
      "Continuous auto-calibration logic",
    ],
    standards: "ATEX / IECEx / SIL2",
    availability: "In Stock",
  },
  {
    id: 4,
    name: "Electrical & Electronic Testing Devices",
    category: "Electrical & Automation",
    image: "/Catagory/Electrical-Electronics.png",
    description:
      "Comprehensive multi-meters, insulation testers, power analyzers, and relay testing equipment for utility and industrial plants.",
    features: [
      "True RMS high precision measurement",
      "CAT IV 600V / CAT III 1000V safety rating",
      "Data logging with wireless PC sync",
      "Rugged drop-tested housing",
    ],
    standards: "IEC 61010 / CE",
    availability: "In Stock",
  },
  {
    id: 5,
    name: "Load Cells & Force Measurement Systems",
    category: "Mechanical & Safety",
    image: "/Catagory/Force.png",
    description:
      "Heavy-duty compression, tension, and shear-beam load cells designed for cranes, silos, test rigs, and dynamic load testing.",
    features: [
      "Capacities from 500 kg up to 500 Tons",
      "Hermetically sealed IP68 protection",
      "Ultra-low drift strain gauge technology",
      "Overload safety factor of 300%",
    ],
    standards: "OIML R60 / NTEP",
    availability: "Fast Dispatch",
  },
  {
    id: 6,
    name: "Mechanical & Dimensional Inspection Gear",
    category: "Mechanical & Safety",
    image: "/Catagory/Mechanical-Inspection-Equipment.png",
    description:
      "Micrometers, vernier calipers, ultrasonic thickness gauges, and surface roughness testers for strict QA/QC workflows.",
    features: [
      "Carbide-tipped measuring faces",
      "Digital SPC data output port",
      "Laser-etched graduations",
      "Shockproof protective casing",
    ],
    standards: "DIN 862 / ISO 3611",
    availability: "In Stock",
  },
  {
    id: 7,
    name: "Precision Calibration Weights & Weights Sets",
    category: "Calibration & Testing",
    image: "/Catagory/Weights.png",
    description:
      "OIML class E2, F1, and M1 certified analytical and industrial test weights crafted from non-magnetic stainless steel.",
    features: [
      "Mirror-polished non-magnetic alloy",
      "Sub-milligram tolerance precision",
      "Supplied in lined protective wooden cases",
      "Individual calibration certificates",
    ],
    standards: "OIML R111",
    availability: "In Stock",
  },
  {
    id: 8,
    name: "Industrial Pressure Testing Systems",
    category: "Pressure & Valves",
    image: "/Catagory/Pressure Systems.png",
    description:
      "High-pressure hydraulic test benches, hydrostatic pumps, and gas boost systems for valve and pipeline integrity verification.",
    features: [
      "Pressures up to 40,000 PSI (2800 Bar)",
      "Air-driven and electric configurations",
      "Automated burst & hold data logging",
      "Safety interlocked test chamber",
    ],
    standards: "ASME Sec VIII / API 6D",
    availability: "Available on Order",
  },
  {
    id: 9,
    name: "Certified Scaffolding Systems & Components",
    category: "Rental Equipment",
    image: "/Catagory/Scaffolding Rental.png",
    description:
      "Heavy-duty modular cuplock and ringlock scaffolding systems engineered for oil, gas, and major commercial infrastructure.",
    features: [
      "Hot-dip galvanized high-tensile steel",
      "Compliant with Saudi Aramco safety standards",
      "Quick-lock wedge connection design",
      "Engineered load-bearing capacity",
    ],
    standards: "EN 12810 / Aramco GI 8.001",
    availability: "Fast Dispatch",
  },
];

const categories = [
  "All Products",
  "Pressure & Valves",
  "Calibration & Testing",
  "Instrumentation",
  "Electrical & Automation",
  "Mechanical & Safety",
  "Rental Equipment",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.standards.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Thank you ${formData.name}! Your inquiry for ${modalProduct?.name} has been received. Our sales engineer will contact you shortly.`
      );
      setModalProduct(null);
      setFormData({ name: "", email: "", phone: "", quantity: "1", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900">
      {/* Header Banner */}
      <CommonHeader
        title="Industrial Products & Engineering Supplies"
        breadcrumb="Products"
        imagePath="/project.jpg"
      />

      {/* Main Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-14">
        {/* Intro Section */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold theme-text-main bg-[#01a9a0]/10 px-3 py-1 rounded-full mb-3">
            Majoka Product Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-anek text-stone-900 tracking-tight">
            High-Precision Instruments, Equipment & Certified Supplies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            Supplying Kingdom-wide industrial operations with certified calibration tools,
            process instrumentation, and safety-critical engineering equipment backed by
            official international standards.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, specs, standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Count */}
            <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#01a9a0]" />
              Showing{" "}
              <span className="font-bold text-stone-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>
          </div>

          {/* Categories Pill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-gray-100 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "theme-bg-main text-white shadow-md shadow-[#01a9a0]/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find any products matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 theme-bg-main text-white font-medium rounded-xl text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#01a9a0] hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Container */}
                <div className="relative h-60 w-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={220}
                    className="max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow-sm text-stone-800 border border-gray-100">
                    {product.category}
                  </span>
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      product.availability === "In Stock"
                        ? "bg-emerald-100 text-emerald-800"
                        : product.availability === "Fast Dispatch"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {product.availability}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold font-anek text-stone-900 group-hover:text-[#01a9a0] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#01a9a0]" />
                    Standard: {product.standards}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 mb-6 flex-1">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#01a9a0] mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <button
                      onClick={() => setModalProduct(product)}
                      className="flex-1 py-2.5 px-4 theme-bg-main text-white font-semibold rounded-xl text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow"
                    >
                      Request Quote
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      href="/contact"
                      className="p-2.5 border border-gray-200 hover:border-[#01a9a0] hover:text-[#01a9a0] rounded-xl text-gray-600 transition-colors"
                      title="Contact Engineering Support"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Value Props Strip */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-[#01a9a0]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Certified Quality
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                All products comply with ISO, OIML, and Saudi industrial standards.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#01a9a0]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Calibration Backed
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Optional factory or laboratory calibration certificates supplied.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-[#01a9a0]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Fast KSA Delivery
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Rapid supply logistics across Jubail, Dammam, Riyadh, and Jeddah.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6 text-[#01a9a0]" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Technical Support
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Experienced engineers to assist with specification and commissioning.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Sourcing Callout */}
        <div className="mt-16 rounded-3xl theme-bg-main p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">
              Tailored Sourcing
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-anek">
              Require a Specific Instrument or Large Bulk Order?
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Our global procurement network allows us to source specialized industrial
              machinery, rare calibration references, and bespoke components on demand.
            </p>
          </div>
          <Link
            href="/contact"
            className="z-10 px-8 py-3.5 bg-white text-stone-900 font-bold rounded-2xl hover:bg-stone-100 transition-colors shadow-lg whitespace-nowrap text-sm sm:text-base flex items-center gap-2"
          >
            Speak with Procurement Team
            <ArrowRight className="w-4 h-4 text-[#01a9a0]" />
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <ClientTestimonials />

      {/* Quote Request Modal */}
      {modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-semibold text-[#01a9a0] uppercase tracking-wider">
                  Request Quotation
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5 line-clamp-1">
                  {modalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setModalProduct(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name or Company"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Quantity / Required Units
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 units or 1 set"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Technical Specifications or Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify pressure ranges, certification requirements, or delivery location..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 theme-bg-main text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Quote Request"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
