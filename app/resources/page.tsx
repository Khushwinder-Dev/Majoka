"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import CommonHeader from "@/components/Common/CommonHeader";
import ClientTestimonials from "@/components/ClientTestimonials";
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface ResourceItem {
  id: number;
  title: string;
  category: "Technical Guides" | "Standards & Compliance" | "Case Studies" | "Company Brochures";
  format:
    | "PDF Document"
    | "Interactive Article"
    | "Whitepaper"
    | "Datasheet"
    | "Company Brochure";
  fileSize?: string;
  description: string;
  date: string;
  readTime: string;
  linkHref?: string;
  tags: string[];
}

const resourcesData: ResourceItem[] = [
  {
    id: 1,
    title: "Saudi Arabia Industrial Calibration & Inspection Handbook 2026",
    category: "Technical Guides",
    format: "Whitepaper",
    fileSize: "4.2 MB",
    description:
      "A comprehensive technical manual covering ISO/IEC 17025 accreditation, pressure gauge tolerances, and turnaround calibration routines in heavy industry.",
    date: "Jan 2026",
    readTime: "15 min read",
    tags: ["Calibration", "ISO 17025", "Quality Assurance"],
  },
  {
    id: 2,
    title: "Saudi Aramco & SABIC Scaffolding Safety Compliance Matrix",
    category: "Standards & Compliance",
    format: "PDF Document",
    fileSize: "2.8 MB",
    description:
      "Detailed breakdown of Aramco GI 8.001 scaffolding standards, load calculation formulas, cuplock erection criteria, and inspection checklists.",
    date: "Feb 2026",
    readTime: "10 min read",
    tags: ["Scaffolding", "Saudi Aramco", "Safety Protocols"],
  },
  {
    id: 3,
    title: "Case Study: Fast-Track Plant Turnaround for Petrochemical Complex",
    category: "Case Studies",
    format: "Interactive Article",
    description:
      "How Majoka deployed 180+ certified technicians and 24/7 mobile calibration rigs to complete turnaround testing 4 days ahead of schedule.",
    date: "Nov 2025",
    readTime: "8 min read",
    linkHref: "/blogs",
    tags: ["Petrochemical", "Turnaround", "Manpower Supply"],
  },
  {
    id: 4,
    title: "Majoka Engineering Corporate Capability Profile & Catalog",
    category: "Company Brochures",
    format: "Company Brochure",
    fileSize: "6.5 MB",
    description:
      "Official overview of Majoka's multi-disciplinary engineering divisions: Inspection, Calibration, Equipment Rental, Manpower, and Trading.",
    date: "2026 Edition",
    readTime: "Full Brochure",
    tags: ["Corporate", "Services", "Portfolio"],
  },
  {
    id: 5,
    title: "Non-Destructive Testing (NDT) Methods Comparison Guide",
    category: "Technical Guides",
    format: "Datasheet",
    fileSize: "1.9 MB",
    description:
      "Practical comparison of Ultrasonic (UT), Magnetic Particle (MPI), Dye Penetrant (DPT), and Radiographic testing for pipeline and tank inspections.",
    date: "Dec 2025",
    readTime: "12 min read",
    tags: ["NDT", "Ultrasonic", "Inspection"],
  },
  {
    id: 6,
    title: "Geotechnical Soil Testing & Foundation Standards for Saudi Terrain",
    category: "Standards & Compliance",
    format: "PDF Document",
    fileSize: "3.4 MB",
    description:
      "Engineering insights into saline soil compaction, California Bearing Ratio (CBR) testing, and moisture-density relationships in Gulf coastal zones.",
    date: "Oct 2025",
    readTime: "11 min read",
    tags: ["Soil Testing", "Civil Engineering", "ASTM"],
  },
  {
    id: 7,
    title: "Case Study: Substation Relay & High-Voltage Transformer Commissioning",
    category: "Case Studies",
    format: "Interactive Article",
    description:
      "Comprehensive diagnostic testing, protective relay calibration, and SF6 gas handling for a 380kV substation expansion in the Eastern Province.",
    date: "Sep 2025",
    readTime: "7 min read",
    linkHref: "/blogs",
    tags: ["Electrical", "Power Grid", "Substation"],
  },
  {
    id: 8,
    title: "Equipment Rental Fleet Specifications & Load Charts",
    category: "Company Brochures",
    format: "Datasheet",
    fileSize: "5.1 MB",
    description:
      "Complete technical specifications, lifting capacities, and maintenance records for our mobile cranes, air compressors, and heavy generators.",
    date: "2026 Edition",
    readTime: "Fleet Catalog",
    tags: ["Heavy Machinery", "Equipment Rental", "Fleet"],
  },
];

const resourceCategories = [
  "All Resources",
  "Technical Guides",
  "Standards & Compliance",
  "Case Studies",
  "Company Brochures",
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesCategory =
        activeCategory === "All Resources" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleDownload = (resource: ResourceItem) => {
    toast.success(
      `Downloading "${resource.title}". If download does not start, please contact support.`
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900">
      {/* Header Banner */}
      <CommonHeader
        title="Engineering Resources & Insights"
        breadcrumb="Resources"
        imagePath="/project.jpg"
      />

      {/* Main Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-14">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-bold theme-text-main bg-[#01a9a0]/10 px-3 py-1 rounded-full mb-3">
            Knowledge Hub & Publications
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-anek text-stone-900 tracking-tight">
            Technical Guides, Compliance Whitepapers & Case Studies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            Access our technical publications, industry standards matrices,
            downloadable corporate brochures, and real-world project case
            studies curated by senior Majoka engineers.
          </p>
        </div>

        {/* Featured Resource Spotlight Hero Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-14 border border-stone-700 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#01a9a0]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl z-10 relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#01a9a0] text-white mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Featured Technical Guide
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-anek mb-4 text-white">
              Industrial Calibration Standards in Saudi Arabia: 2026
              Comprehensive Guide
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
              Learn about ISO/IEC 17025 laboratory requirements, Saudi Standards
              Metrology and Quality Organization (SASO) benchmarks, and key
              best practices for preventing drift in harsh Middle Eastern
              ambient temperatures.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  handleDownload({
                    id: 0,
                    title: "Industrial Calibration Standards in Saudi Arabia",
                    category: "Technical Guides",
                    format: "Whitepaper",
                  } as ResourceItem)
                }
                className="px-6 py-3 theme-bg-main text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Full Guide (PDF)
              </button>

              <Link
                href="/blogs"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
              >
                Read Blog Summary
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, topics, standards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 outline-none text-sm transition-all"
              />
            </div>

            {/* Results Count */}
            <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#01a9a0]" />
              Showing{" "}
              <span className="font-bold text-stone-900">
                {filteredResources.length}
              </span>{" "}
              items
            </div>
          </div>

          {/* Categories Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-gray-100 no-scrollbar">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "theme-bg-main text-white shadow-md shadow-[#01a9a0]/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No matching resources found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Resources");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 theme-bg-main text-white font-medium rounded-xl text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-[#01a9a0] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-stone-700 border border-gray-200">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-bold text-[#01a9a0] bg-[#01a9a0]/10 px-2.5 py-0.5 rounded-full">
                      {res.format}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-anek text-stone-900 group-hover:text-[#01a9a0] transition-colors mb-2.5 line-clamp-2">
                    {res.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {res.fileSize || res.readTime}
                  </span>

                  {res.linkHref ? (
                    <Link
                      href={res.linkHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold theme-text-main hover:opacity-80 transition-opacity"
                    >
                      Read Article
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleDownload(res)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold theme-text-main hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Insights / Blog Integration Teaser */}
        <div className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest theme-text-main bg-[#01a9a0]/10 px-3 py-1 rounded-full mb-2 inline-block">
                Latest Articles
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-anek text-stone-900">
                Explore Majoka Technical Articles & Blogs
              </h3>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Read our team&apos;s latest field reports, safety updates, and
                advancements in engineering inspection.
              </p>
            </div>
            <Link
              href="/blogs"
              className="px-6 py-3 theme-bg-main text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow"
            >
              Visit Blog Center
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blogs"
              className="p-6 rounded-2xl bg-gray-50 hover:bg-[#01a9a0]/5 border border-gray-100 hover:border-[#01a9a0] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#01a9a0] mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-base mb-2 group-hover:text-[#01a9a0] transition-colors line-clamp-2">
                Ensuring Quality with Comprehensive Inspection Services
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                Learn why third-party vendor checks and factory audits are
                vital across Saudi manufacturing plants.
              </p>
            </Link>

            <Link
              href="/blogs"
              className="p-6 rounded-2xl bg-gray-50 hover:bg-[#01a9a0]/5 border border-gray-100 hover:border-[#01a9a0] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#01a9a0] mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-base mb-2 group-hover:text-[#01a9a0] transition-colors line-clamp-2">
                Force & Torque Measurement for Industrial Safety
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                Accurate calibration of torque wrenches, gauges, and load cells
                prevents catastrophic joint failures.
              </p>
            </Link>

            <Link
              href="/blogs"
              className="p-6 rounded-2xl bg-gray-50 hover:bg-[#01a9a0]/5 border border-gray-100 hover:border-[#01a9a0] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#01a9a0] mb-4 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-base mb-2 group-hover:text-[#01a9a0] transition-colors line-clamp-2">
                Advanced Soil Testing Procedures in Civil Construction
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                Understanding shear strength and soil compaction metrics for
                high-rise foundation stability.
              </p>
            </Link>
          </div>
        </div>

        {/* Direct Inquiries CTA */}
        <div className="mt-16 rounded-3xl theme-bg-main p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">
              Custom Documentation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-anek">
              Need Specific Technical Submittals or Prequalification Docs?
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Our engineering compliance desk can provide formal vendor
              prequalification packages, ISO certificates, and calibration
              accreditation records upon request.
            </p>
          </div>
          <Link
            href="/contact"
            className="z-10 px-8 py-3.5 bg-white text-stone-900 font-bold rounded-2xl hover:bg-stone-100 transition-colors shadow-lg whitespace-nowrap text-sm sm:text-base flex items-center gap-2"
          >
            Request Prequalification Package
            <ArrowRight className="w-4 h-4 text-[#01a9a0]" />
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <ClientTestimonials />
    </div>
  );
}
