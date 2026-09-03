"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import MeetOurTeam from "@/components/Common/MeetOurTeam";
import ClientTestimonials from "@/components/ClientTestimonials";
import Question from "@/components/Question";

interface Service {
  id: number;
  name: string;
  title: string;
  description: string;
  highlights: string[];
  services: {
    name?: string;
    services?: string[];
  }[];
  image: string;
}

const ServicesContent = () => {
  const [activeService, setActiveService] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    // Get service ID from URL parameters
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const id = parseInt(serviceId);
      if (id >= 1 && id <= 10) {
        setActiveService(id);
      }
    }
  }, [searchParams]);

  const servicesData: Service[] = [
    {
      id: 1,
      name: "Manpower Supply",
      title: "Manpower Supply",
      description:
        "Our Manpower Supply service ensures you get reliable, trained, and experienced professionals for any type of project. Whether you need technical experts, site workers, operators, supervisors, or support staff, we deliver fully vetted and qualified manpower tailored to your project requirements. We focus on quality, safety, and timely deployment to ensure your operations run smoothly and efficiently.",
      highlights: [
        "Vetted & Certified Workforce: Properly screened, verified, and skill-tested professionals.",
        "Flexible Deployment: Short-term, long-term, or project-based manpower as needed.",
        "Industry Expertise: Specialists for construction, oil & gas, MEP, logistics, and industrial sectors.",
      ],
      services: [
        {
          name: "Individual/Domestic Help Services",
          services: [
            "Monthly Services",
            "Hourly Domestic Worker Services",
            "Maintenance Services",
            "Mediation Services",
          ],
        },
        {
          name: "Corporate Sector Services",
          services: ["Construction", "Healthcare", "Logistics", "Oil & Gas"],
        },
      ],
      image: "Manpower Supply",
    },
    {
      id: 2,
      name: "Equipment Rental",
      title: "Equipment Rental",
      description:
        "Our Equipment Rental service provides high-quality, fully maintained machinery and tools to support construction, industrial, and infrastructure projects of all sizes. We offer a wide range of equipment including heavy machinery, power tools, lifting devices, generators, testing machines, and more. Every equipment is regularly inspected, calibrated (where required), and delivered with complete safety assurance. Whether you need equipment for a few days or for long-term projects, we ensure fast delivery, technical support, and cost-effective rental plans to keep your operations running smoothly without interruption.",
      highlights: [
        "Wide Equipment Range: Machinery and tools for construction, industrial, and testing needs.",
        "Well-Maintained & Safe: Fully inspected and ready-to-use equipment with safety assurance.",
        "Flexible Rental Plans: Daily, weekly, monthly, and project-based rental options.",
      ],
      services: [],
      image: "Equipment Rental",
    },
    {
      id: 3,
      name: "Scaffolding Rental",
      title: "Scaffolding Rental",
      description:
        "Our Scaffolding Rental service provides high-quality, secure, and project-ready scaffolding systems designed to support construction, inspection, and industrial maintenance work. All scaffolding materials are safety-checked, load-tested, and installed by trained professionals to ensure stability and compliance with industry standards. Whether your project is short-term or long-term, we deliver reliable solutions tailored to height, load, and work requirements.",
      highlights: [
        "Certified & Safe Systems: Fully compliant with industry safety standards.",
        "Professional Installation: Trained technicians for setup, inspection & dismantling.",
        "Flexible Rental Plans: Short-term, long-term, and project-based rental options.",
      ],
      services: [],
      image: "Scaffolding Rental",
    },
    {
      id: 4,
      name: "Inspection Services",
      title: "Inspection Services",
      description:
        "Mazoka offers professional inspection services, assessing structural integrity and safety. Our detailed inspections ensure compliance with industry standards, providing peace of mind.",
      highlights: [
        "Detailed Assessments: Comprehensive inspections for structural integrity.",
        "Safety Compliance: Ensuring all projects meet industry standards.",
        "Reliable Results: Providing accurate and detailed inspection reports.",
      ],
      services: [
        {
          name: "",
          services: [
            "Vendor Inspection",
            "Mechanical Inspection",
            "Electrical Inspection",
            "Civil Inspection",
            "Factory Assesment",
            "Factory Audit",
            "Auditor Training",
          ],
        },
      ],
      image: "Inspection Services",
    },
    {
      id: 5,
      name: "Calibration",
      title: "Calibration",
      description:
        "Majoka specializes in calibration services, ensuring equipment accuracy and reliability. Our skilled technicians provide precise calibration for various instruments, maintaining high standards.",
      highlights: [
        "Precision Calibration: Ensuring accuracy in equipment and instruments",
        "Skilled Technicians: Experienced professionals for reliable calibration.",
        "High Standards: Maintaining quality and reliability in all services.",
      ],
      services: [
        {
          name: "Force, Torque",
          services: [
            "Torque Calibrators",
            "Torque Wrenches",
            "Torque Gauges",
            "Load Cells",
            "Force Gauges",
            "Universal Testing machines up to 60T on capacity",
            "Tension Gauges",
            "Compression Machines",
            "Tensile Testing Machines",
            "Hydraulic Jacks",
          ],
        },
        {
          name: "Process Control Instrumentation",
          services: [
            "Pressure Transmitters",
            "Temperature Transmitters",
            "Level Transmitters",
            "Flow Transmitters",
            "Volumetric Measurements",
            "Auto Label",
            "Safety Relief Valves",
            "I/P Converters",
            "Multi gas Detectors",
            "Anemometers",
            "Tachometers",
            "Densitometers",
            "Hydro testing Facilities",
            "Tension & Accessory Calibrators",
          ],
        },
        {
          name: "Electrical & Electronics",
          services: [
            "Digital & Analogue multimeters",
            "Clamp meters",
            "Insulation testers",
            "Earth resistance testers",
            "Ohm meters",
            "Ampere meters",
            "High voltage testers",
            "Frequency meters",
            "Volt meters",
            "Power supplies",
            "Digital Earth Testers",
            "Megger Testers",
            "High Voltage Porosity Detectors",
          ],
        },
        {
          name: "Lifting & Non-Destructive Equipment",
          services: [
            "Crane Certification",
            "JIB Cranes",
            "Ultrasonic Flow Detectors",
            "Hardness Testers",
            "MPT Yokes",
            "PMI Equipment",
            "Lux Meters",
            "Stop Watches",
            "Sound Level Meters",
          ],
        },
        {
          name: "Pressure",
          services: [
            "Pressure Elements",
            "Pressure Transmitters",
            "Pressure Gauges",
            "Pressure Safety Valves",
            "Manometers",
            "Pressure Recorders",
            "Hydraulic",
            "Pneumatic & Vacuum Pump",
            "Air Compressors",
          ],
        },
        {
          name: "Mechanical & Inspection Equipment",
          services: [
            "Mechanical Testing Equipment",
            "Mechanical Measuring Equipment",
            "Pressure Testing Facilities",
            "Inspection Tools",
            "Profile Gauges",
            "Gauge Block Sets",
            "Slip Gauges",
            "Others",
          ],
        },
        {
          name: "Weights",
          services: [
            "Weighing Scales",
            "Balances",
            "Top Loads",
            "Dead Weights",
            "Other Types of Balances",
          ],
        },
        {
          name: "Gauge (Dial & Digital)",
          services: [
            "Specific Gravity Gauges",
            "Load Gauges Calibration",
            "Pressure Calibration",
            "Dial Gauge Indicators",
            "Digital Gauge Indicators",
            "Others",
          ],
        },
      ],
      image: "Calibration",
    },
    {
      id: 6,
      name: "Soil Testing Laboratories",
      title: "Soil Testing Laboratories",
      description:
        "Majoka provides a wide range of testing services, including soil, concrete, and chemical analysis. Our advanced methods ensure accurate results, supporting construction and engineering projects.",
      highlights: [
        "Accurate Results: Using advanced technology for precise testing.",
        "Support for Projects: Ensuring quality and safety in construction.",
        "Custom Solutions: Tailored contracting services to meet specific needs.",
      ],
      services: [
        {
          name: "",
          services: [
            "Soil Testing",
            "Aggregate Testing",
            "Concrete Testing",
            "Cement Testing",
            "Asphalt and Binder Testing",
            "Chemical & Water Testing",
            "Petro graphic Analysis",
            "Rock and Rock Foundation Testing",
            "Mortar Testing",
            "Bitumen Testing",
            "Super pave Testing",
            "Field Testing by NDG",
            "Field Testing by Electrical Density Gauge",
            "Pavement Investigation",
            "Asphalt Mix Design",
            "Other special test based on client requirements",
            "Concrete Structure Inspection and failure assessment",
            "Structural Integrity , defect and voids in concrete & rock",
            "Durability Assessment of Reinforced concrete Structure",
            "NDT Compression test by Schmidt Hammer",
            "NDT by Pulse Velocity for concrete",
            "Core Drilling",
            "Steel Rebar Testing",
            "Rebar Locator & cover distance measurement",
            "Pull off Test",
            "Concrete coating Thickness measurement",
            "Concrete Mix Design",
            "Structure and Foundation Testing",
            "Brick & Block Testing",
            "Site Investigation",
          ],
        },
      ],
      image: "Soil Testing Laboratories",
    },
    {
      id: 7,
      name: "General Trading",
      title: "General Trading",
      description:
        "Majoka engages in trading, offering a wide range of materials and equipment. Our extensive network ensures the availability of high-quality products, supporting various projects.",
      highlights: [
        "Wide Range of Products: Offering materials and equipment for diverse needs.",
        "Quality Assurance: Ensuring high-quality products for all projects.",
        "Extensive Network: Reliable supply chain and logistics.",
      ],
      services: [
        {
          name: "",
          services: [],
        },
      ],
      image: "General Trading",
    },
  ];

  const currentService = servicesData.find((s) => s.id === activeService);

  return (
    <>
      <CommonHeader
        title={currentService?.title || "Services"}
        breadcrumb={`Services / ${currentService?.name || "Service Details"}`}
        imagePath="/about-us/about-us-1.png"
      />
      <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <div className="w-full lg:w-96 flex flex-col gap-6">
              {/* Service Categories */}
              <div
                className="bg-white rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.15)] overflow-hidden"
                data-aos="fade-right"
              >
                <div className="p-6 bg-stone-900 rounded-tl-3xl rounded-tr-3xl">
                  <h2 className="text-white text-xl sm:text-2xl font-bold leading-7">
                    Service Category
                  </h2>
                </div>
                <div className="p-4 pb-2">
                  {servicesData.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full px-4 py-5 flex justify-between items-center transition-all duration-300 mb-2 rounded-2xl outline outline-1 outline-offset-[-1px] outline-pink-950 cursor-pointer ${
                        activeService === service.id
                          ? "bg-pink-950"
                          : "hover:bg-pink-950/10"
                      }`}
                    >
                      <span
                        className={`text-lg leading-7 text-left ${
                          activeService === service.id
                            ? "text-white font-bold"
                            : "text-stone-900 font-medium"
                        }`}
                      >
                        {service.id < 10 ? `0${service.id}` : service.id}.{" "}
                        {service.name}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 flex-shrink-0 ${
                          activeService === service.id
                            ? "bg-gray-200"
                            : "bg-pink-950"
                        }`}
                      >
                        <span
                          className={`text-lg font-medium leading-7 ${
                            activeService === service.id
                              ? "text-pink-950"
                              : "text-gray-200"
                          }`}
                        >
                          ➜
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore Documents */}
              <div
                className="bg-gray-200 rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.15)] p-6"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="flex flex-col items-center gap-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 bg-pink-950 rounded-2xl">
                      <div className="w-9 h-9 relative">
                        <Image
                          src="/csv/csv.svg"
                          alt="PDF Icon"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-stone-900 text-xl font-bold text-center">
                      Explore Our Documents
                    </h3>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                    <button className="px-4 py-2 bg-pink-950 rounded-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-1px] outline-pink-950 hover:bg-pink-900 transition-colors duration-300 cursor-pointer">
                      <span className="text-white text-base font-bold leading-normal">
                        Download PDF
                      </span>
                    </button>
                    <button className="px-4 py-2 bg-white rounded-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-1px] outline-pink-950 hover:bg-pink-950 transition-all duration-300 group cursor-pointer">
                      <span className="text-pink-950 text-base font-bold leading-normal group-hover:text-white">
                        Preview PDF
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div
                className="bg-gray-200 rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.15)] p-6"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="p-3 bg-pink-950 rounded-2xl">
                    <div className="w-9 h-9 relative">
                      <Image
                        src="/csv/SVG.svg"
                        alt="Contact Icon"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-black text-base font-bold text-center">
                    We are always available to discuss with you
                  </p>
                  <a
                    href="mailto:info@majokaengineering.com"
                    className="text-black text-lg font-medium hover:text-pink-950 transition-colors duration-300 break-all text-center"
                  >
                    info@majokaengineering.com
                  </a>
                  <button
                    className="px-6 py-3 bg-pink-950 rounded-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-1px] outline-pink-950 hover:bg-pink-900 transition-all duration-300 flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push("/contact")}
                  >
                    <span className="text-white text-base font-bold leading-normal">
                      Contact Us
                    </span>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Hero Image */}
              <div
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] 2xl:h-[600px] rounded-[40px] overflow-hidden relative"
                data-aos="fade-left"
              >
                <Image
                  fill
                  className="w-full h-full object-cover"
                  src={`/Catagory/${currentService?.image}.png`}
                  alt={currentService?.title || "Service"}
                />
              </div>

              {/* Service Title */}
              <h1
                className="text-stone-900 text-3xl sm:text-4xl font-bold"
                data-aos="fade-up"
              >
                {currentService?.title}
              </h1>

              {/* Service Description */}
              <div
                className="bg-gray-200/50 rounded-[20px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] px-6 sm:px-8 py-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p className="text-stone-900/80 text-lg sm:text-xl lg:text-2xl font-normal text-justify mb-6">
                  {currentService?.description}
                </p>
                <div className="flex flex-col gap-4">
                  {currentService?.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                      data-aos="fade-right"
                      data-aos-delay={index * 100}
                    >
                      <div className="w-6 h-6 bg-green-600 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="text-stone-900 text-lg sm:text-xl font-medium flex-1">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services List */}

              {currentService?.services?.length ? (
                <div data-aos="fade-up" data-aos-delay="200">
                  <h2 className="text-stone-900 text-3xl sm:text-4xl font-medium mb-6">
                    Services
                  </h2>

                  <div className="bg-gray-200/50 rounded-[20px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] px-6 sm:px-8 py-6">
                    {currentService?.services?.length ? (
                      <div className="flex flex-col gap-6">
                        {currentService.services.map((section, idx) => {
                          // skip empty sections
                          if (!section?.name && !section?.services?.length)
                            return null;

                          return (
                            <div
                              key={idx}
                              data-aos="fade-left"
                              data-aos-delay={idx * 50}
                            >
                              {/* Section Title */}
                              {section.name && (
                                <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-3">
                                  {section.name}
                                </h3>
                              )}

                              {/* Service List */}
                              {section.services?.length ? (
                                <div className="flex flex-col gap-3">
                                  {section.services?.map((item, index) =>
                                    item ? (
                                      <div
                                        key={index}
                                        className="flex items-start gap-3"
                                      >
                                        <div className="w-6 h-6 bg-green-600 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                                          <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path d="M5 13l4 4L19 7"></path>
                                          </svg>
                                        </div>

                                        <p className="text-stone-900 text-lg sm:text-xl font-medium flex-1">
                                          {item}
                                        </p>
                                      </div>
                                    ) : null
                                  )}
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-700"></p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Question />
      <MeetOurTeam />
      <ClientTestimonials />
    </>
  );
};

const Services = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
};

export default Services;
