"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CommonHeader from "@/components/Common/CommonHeader";
import ClientTestimonials from "@/components/ClientTestimonials";
import {
  Flame,
  Building2,
  Zap,
  Factory,
  Droplets,
  Ship,
  Pickaxe,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Users,
} from "lucide-react";

interface Industry {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  keyServices: string[];
  compliance: string[];
  statNumber: string;
  statLabel: string;
  highlights: string[];
}

const industriesData: Industry[] = [
  {
    id: "oil-gas",
    name: "Oil, Gas & Petrochemical",
    shortDesc:
      "Comprehensive plant turnaround, non-destructive testing, calibration, and heavy equipment support for upstream & downstream facilities.",
    fullDesc:
      "Majoka Engineering provides end-to-end mission-critical services for major refineries, gas processing plants, and petrochemical complexes across Saudi Arabia. We ensure zero unscheduled downtime through high-precision calibration of pressure systems, certified NDT inspections, and rapid deployment of qualified manpower.",
    icon: Flame,
    image: "/project.jpg",
    keyServices: [
      "Hydrostatic & Pneumatic Testing",
      "Process Control Instrumentation",
      "Certified Plant Turnaround Manpower",
      "Safety Valve Recalibration",
    ],
    compliance: ["Saudi Aramco Approved", "SABIC Standards", "API 510 / 570 / 653", "ASME Sec VIII"],
    statNumber: "99.8%",
    statLabel: "Compliance & Safety Rate",
    highlights: [
      "Rigorous shut-down maintenance workflows",
      "ATEX and explosion-proof certified equipment",
      "Experienced plant turnaround specialists",
    ],
  },
  {
    id: "construction",
    name: "Civil & Infrastructure Construction",
    shortDesc:
      "Soil laboratory testing, scaffolding engineering, heavy machinery rental, and skilled manpower for mega-projects.",
    fullDesc:
      "From national infrastructure developments to industrial warehousing and commercial hubs, we partner with primary EPC contractors to guarantee structural integrity, site safety, and timely completion through certified scaffolding, comprehensive soil analysis, and specialized civil MEP works.",
    icon: Building2,
    image: "/about-us/about-us-1.png",
    keyServices: [
      "Soil & Concrete Laboratory Testing",
      "Heavy Duty Scaffolding Rental & Erection",
      "Equipment & Crane Rental",
      "Civil & MEP Maintenance",
    ],
    compliance: ["Saudi Building Code (SBC)", "ASTM International", "OSHA Safety Standards", "ISO 9001"],
    statNumber: "250+",
    statLabel: "Major Projects Completed",
    highlights: [
      "Certified cuplock and ringlock scaffolding",
      "On-site mobile soil compaction testing",
      "Complete civil and electro-mechanical crews",
    ],
  },
  {
    id: "power-energy",
    name: "Power Generation & Utilities",
    shortDesc:
      "High-voltage electrical testing, relay calibration, substation support, and thermal efficiency audits.",
    fullDesc:
      "We support conventional thermal power plants, transmission grids, and emerging renewable installations. Our electrical engineers execute high-voltage substation testing, transformer oil analysis, and protective relay calibration to uphold uninterrupted grid stability.",
    icon: Zap,
    image: "/featured-bg.jpeg",
    keyServices: [
      "High Voltage & Relay Testing",
      "Substation MEP & Cable Termination",
      "Energy Efficiency Audits",
      "Switchgear Calibration",
    ],
    compliance: ["SEC (Saudi Electricity Company)", "IEC 61850", "IEEE Standards", "ISO 14001"],
    statNumber: "15+ GW",
    statLabel: "Power Grid Assets Tested",
    highlights: [
      "Comprehensive diagnostic reporting",
      "Substation commissioning assistance",
      "Certified electrical test technicians",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Heavy Industry",
    shortDesc:
      "Dimensional QA/QC, mechanical testing equipment, continuous calibration contracts, and general industrial trading.",
    fullDesc:
      "Supporting automotive, steel, packaging, and plastics production facilities with ISO/IEC 17025 accredited calibration, dimensional verification of tooling, precision torque testing, and fast-dispatch supply of industrial spare parts.",
    icon: Factory,
    image: "/contact.jpeg",
    keyServices: [
      "Torque & Force Verification",
      "Dimensional QA/QC Inspection",
      "Industrial Spare Parts Trading",
      "Preventive Maintenance Manpower",
    ],
    compliance: ["ISO/IEC 17025", "DIN & EN Norms", "SASO Quality Standards"],
    statNumber: "5000+",
    statLabel: "Calibrated Instruments / Yr",
    highlights: [
      "Annual scheduled calibration contracts",
      "Minimizes factory rejection rates",
      "On-site laboratory testing options",
    ],
  },
  {
    id: "water-environment",
    name: "Water Desalination & Treatment",
    shortDesc:
      "Corrosion monitoring, water chemistry lab testing, pump station MEP works, and flow measurement calibration.",
    fullDesc:
      "Critical support for water purification and seawater reverse osmosis (SWRO) facilities throughout the Arabian Gulf and Red Sea coasts. We ensure precise metering, structural durability against saline environments, and strict environmental compliance.",
    icon: Droplets,
    image: "/project.jpg",
    keyServices: [
      "Ultrasonic Flow Meter Verification",
      "Water Chemical Analysis",
      "Anti-Corrosion NDT Inspection",
      "Pumping Station Maintenance",
    ],
    compliance: ["SWCC Specifications", "NWC Guidelines", "EPA & WHO Standards"],
    statNumber: "100%",
    statLabel: "Regulatory Adherence",
    highlights: [
      "Specialized marine environment coatings inspection",
      "Continuous chemical analysis support",
      "High-pressure reverse osmosis piping checks",
    ],
  },
  {
    id: "marine-offshore",
    name: "Marine, Ports & Offshore Operations",
    shortDesc:
      "Hull thickness inspection, lifting gear certification, offshore scaffolding, and mooring system load testing.",
    fullDesc:
      "Specialized services for commercial seaports, dry docks, and offshore platforms. Our team carries out load testing on marine cranes, ultrasonic hull plate evaluations, and certified scaffolding under rigorous maritime safety standards.",
    icon: Ship,
    image: "/featured-bg.jpeg",
    keyServices: [
      "Lifting Gear Inspection & Proof Load",
      "Ultrasonic Thickness Gauging (UTG)",
      "Offshore Platform Scaffolding",
      "Marine Winch & Crane Calibration",
    ],
    compliance: ["DNV-GL Certified Guidelines", "Lloyds Register", "IMO Regulations"],
    statNumber: "50+",
    statLabel: "Marine Vessels Inspected",
    highlights: [
      "Offshore certified inspectors",
      "Water bag proof load testing up to 200T",
      "24/7 port dispatch availability",
    ],
  },
  {
    id: "mining",
    name: "Mining, Metals & Extraction",
    shortDesc:
      "Geotechnical soil sampling, heavy plant machinery maintenance, aggregate testing, and ruggedized sensors.",
    fullDesc:
      "From phosphate and bauxite extraction to gold and industrial mineral operations, Majoka provides durable field testing gear, certified geotechnical survey teams, and robust machinery maintenance to thrive in remote desert conditions.",
    icon: Pickaxe,
    image: "/about-us/about-us-1.png",
    keyServices: [
      "Geotechnical Core Analysis",
      "Heavy Mining Fleet Maintenance",
      "Aggregate & Sieve Testing",
      "Crusher Vibration Analysis",
    ],
    compliance: ["Ministry of Industry & Mineral Resources", "ISO 45001", "ASTM D422"],
    statNumber: "40+",
    statLabel: "Mine Site Deployments",
    highlights: [
      "Remote desert camp logistical capabilities",
      "Specialized geotechnical soil laboratories",
      "Durable high-impact testing equipment",
    ],
  },
];

export default function IndustriesPage() {
  const [activeTab, setActiveTab] = useState<string>("oil-gas");

  const selectedIndustry =
    industriesData.find((item) => item.id === activeTab) || industriesData[0];

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900">
      {/* Header Banner */}
      <CommonHeader
        title="Industries We Empower & Serve"
        breadcrumb="Industries"
        imagePath="/featured-bg.jpeg"
      />

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-14">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold theme-text-main bg-[#01a9a0]/10 px-3 py-1 rounded-full mb-3">
            Kingdom-Wide Sector Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-anek text-stone-900 tracking-tight">
            Specialized Engineering for the Kingdom&apos;s Core Sectors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Delivering precision engineering, certified safety compliance, and
            reliable technical supplies across oil & gas, construction, power,
            and industrial manufacturing.
          </p>
        </div>

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
          {industriesData.map((ind) => {
            const IconComponent = ind.icon;
            const isActive = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                  isActive
                    ? "theme-bg-main text-white border-[#01a9a0] shadow-lg shadow-[#01a9a0]/25 scale-102"
                    : "bg-white text-stone-700 border-gray-200 hover:border-[#01a9a0] hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 ${
                    isActive ? "bg-white/20 text-white" : "bg-[#01a9a0]/10 text-[#01a9a0]"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-anek leading-tight">
                  {ind.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Spotlight Detail Card */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg theme-bg-main text-white flex items-center justify-center">
                    <selectedIndustry.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#01a9a0]">
                    Sector Overview
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-anek text-stone-900 mb-4">
                  {selectedIndustry.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  {selectedIndustry.fullDesc}
                </p>

                {/* Stat Highlights */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold theme-text-main font-anek">
                      {selectedIndustry.statNumber}
                    </div>
                    <div className="text-xs font-medium text-gray-500 mt-0.5">
                      {selectedIndustry.statLabel}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-anek">
                      100%
                    </div>
                    <div className="text-xs font-medium text-gray-500 mt-0.5">
                      Safety & QA Standards
                    </div>
                  </div>
                </div>

                {/* Key Services & Compliance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#01a9a0]" />
                      Core Solutions
                    </h4>
                    <ul className="space-y-2">
                      {selectedIndustry.keyServices.map((service, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-gray-600 flex items-start gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-[#01a9a0] mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#01a9a0]" />
                      Compliance Benchmarks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIndustry.compliance.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 mt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 theme-bg-main text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow"
                >
                  Consult Industry Specialist
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:border-[#01a9a0] hover:text-[#01a9a0] transition-colors"
                >
                  View Related Services
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-stone-900">
              <Image
                src={selectedIndustry.image}
                alt={selectedIndustry.name}
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[#01a9a0] mb-1">
                  Field Proven Capabilities
                </span>
                <h4 className="text-xl font-bold font-anek mb-2">
                  {selectedIndustry.name} Highlights
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200">
                  {selectedIndustry.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#01a9a0]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Leading Industrial Clients Trust Majoka */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold font-anek text-stone-900">
              Why Key Industrial Entities Choose Majoka
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Uncompromising dedication to safety, precision calibration, and
              certified execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#01a9a0]/10 flex items-center justify-center mb-6">
                <FileCheck className="w-7 h-7 text-[#01a9a0]" />
              </div>
              <h4 className="text-xl font-bold font-anek text-stone-900 mb-2">
                Certified QA/QC Standards
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Operating strictly in conformity with ISO 9001, ISO/IEC 17025,
                and regional Kingdom regulations for industrial testing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#01a9a0]/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#01a9a0]" />
              </div>
              <h4 className="text-xl font-bold font-anek text-stone-900 mb-2">
                Specialized Manpower Teams
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Saudi Aramco & SABIC-certified engineers, inspectors, rigging
                supervisors, and instrument technicians available on short notice.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#01a9a0]/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-[#01a9a0]" />
              </div>
              <h4 className="text-xl font-bold font-anek text-stone-900 mb-2">
                Rapid KSA Mobilization
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fast-dispatch logistics and on-site testing rigs covering Jubail,
                Yanbu, Riyadh, Dammam, and Ras Al-Khair industrial cities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl theme-bg-main p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">
              Industry Partnerships
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-anek">
              Ready to Enhance Your Facility&apos;s Reliability & Safety?
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Schedule an engineering consultation or request a custom proposal
              tailored to your specific industrial requirements.
            </p>
          </div>
          <Link
            href="/contact"
            className="z-10 px-8 py-3.5 bg-white text-stone-900 font-bold rounded-2xl hover:bg-stone-100 transition-colors shadow-lg whitespace-nowrap text-sm sm:text-base flex items-center gap-2"
          >
            Request Industry Consultation
            <ArrowRight className="w-4 h-4 text-[#01a9a0]" />
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <ClientTestimonials />
    </div>
  );
}
