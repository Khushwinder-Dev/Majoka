"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  FileText,
  Send,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import CommonHeader from "@/components/Common/CommonHeader";
import { toast } from "react-hot-toast";

interface Job {
  id: number;
  title: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  jobType: string;
  location: string;
  experience: string;
  deadline: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  cv: File | null;
}

const JobApplicationPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    cv: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Job data - All 8 active career positions
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Civil Engineer, Waterproofing",
      fullDescription:
        "We are seeking a Senior Civil Engineer specializing in waterproofing and structural protection to guide our site engineering team. The ideal candidate will possess deep technical knowledge of ASTM/BS waterproofing standards, combo roofing systems, and subterranean basement tanking. You will supervise project execution, coordinate with consultants, and ensure flawless quality delivery.",
      responsibilities: [
        "Lead and supervise site engineering teams on major infrastructure and commercial projects",
        "Review and approve shop drawings, method statements, and inspection test plans (ITPs)",
        "Coordinate directly with main contractors, engineering consultants, and project managers",
        "Oversee combo roof waterproofing, polyurea application, and basement tanking operations",
        "Manage material approvals, submittals, and site testing protocols",
        "Ensure full compliance with UAE municipal regulations and civil safety standards",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering or related field",
        "5+ years of hands-on experience in civil waterproofing and structural engineering in the UAE",
        "Proven leadership and team management capabilities on active construction sites",
        "Strong familiarity with Dubai/Abu Dhabi Municipality building codes and DM approvals",
        "Valid UAE Driving License preferred",
      ],
      jobType: "Full Time",
      location: "Dubai & Abu Dhabi, UAE",
      experience: "5+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 2,
      title: "Senior Architecture Engineer",
      fullDescription:
        "We are looking for a Senior Architectural Engineer to lead our technical design and detailing division. The ideal candidate will have strong design leadership skills, expertise in building envelope detailing, facade waterproofing integration, and construction documentation.",
      responsibilities: [
        "Lead architectural design detailing for complex civil and commercial structures",
        "Develop innovative building envelope and structural protection detailing solutions",
        "Coordinate with engineering teams, structural consultants, and clients",
        "Review architectural drawings, Revit BIM models, and specifications",
        "Conduct site walkthroughs to verify architectural compliance during construction",
      ],
      requirements: [
        "Bachelor's or Master's degree in Architectural Engineering",
        "5+ years of architectural experience in the UAE construction sector",
        "Proficiency in Revit BIM, AutoCAD, and 3D architectural rendering tools",
        "Strong portfolio demonstrating building detailing and technical expertise",
        "Excellent communication and presentation abilities",
      ],
      jobType: "Full Time",
      location: "Dubai, UAE",
      experience: "5+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 3,
      title: "Combo Roofing Site Supervisor",
      fullDescription:
        "We are seeking an experienced Combo Roofing Site Supervisor to manage day-to-day on-site waterproofing, polyurethane spray foam, and screed casting operations. You will manage labor crews, ensure safety protocols, and meet critical project handover deadlines.",
      responsibilities: [
        "Supervise on-site polyurethane foam spraying, UV coatings, and protective screed works",
        "Monitor crew productivity, equipment readiness, and material consumption",
        "Enforce strict site safety (HSE) standards and personal protective equipment (PPE)",
        "Conduct flood testing, thickness checks, and coordinate consultant site inspections",
      ],
      requirements: [
        "Diploma or Technical Degree in Civil / Construction Engineering",
        "3+ years supervisory experience in combo roofing and PU spray systems in the UAE",
        "Strong leadership skills and ability to manage multi-national site crews",
        "Hands-on knowledge of spray foam proportioners and plural-component rigs",
      ],
      jobType: "Full Time",
      location: "Sharjah & Northern Emirates",
      experience: "3+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 4,
      title: "Estimation & Tendering Specialist",
      fullDescription:
        "We are actively seeking a skilled Estimation & Tendering Specialist to prepare competitive bids, bill of quantities (BOQ) take-offs, and cost analysis for waterproofing, insulation, and concrete restoration tenders.",
      responsibilities: [
        "Review tender documents, scope drawings, specifications, and client inquiries",
        "Prepare comprehensive BOQ take-offs and detailed rate analysis for waterproofing systems",
        "Liaise with material manufacturers and suppliers for competitive material quotes",
        "Prepare and submit techno-commercial tender packages within strict bid deadlines",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering or Quantity Surveying",
        "3-5 years experience in waterproofing / specialty civil subcontracting estimation in UAE",
        "High proficiency in AutoCAD, MS Excel, and estimation software",
        "Strong negotiation and communication skills with suppliers and contractors",
      ],
      jobType: "Full Time",
      location: "Dubai, UAE",
      experience: "3-5 Years",
      deadline: "30 December 2026",
    },
    {
      id: 5,
      title: "Quality Assurance & HSE Officer",
      fullDescription:
        "We are hiring a dedicated Quality Assurance & HSE Officer to enforce zero-harm safety standards and quality compliance across all Taj Al Rahmah project sites.",
      responsibilities: [
        "Conduct daily site safety audits, risk assessments, and toolbox talks",
        "Inspect waterproofing membrane welds, thickness measurements, and surface prep",
        "Maintain quality documentation, Non-Conformance Reports (NCRs), and safety logs",
        "Ensure full compliance with OSHAD / Dubai Municipality safety regulations",
      ],
      requirements: [
        "NEBOSH IGC certified with relevant degree/diploma in safety or engineering",
        "3+ years experience as HSE / QAQC officer on construction sites in the UAE",
        "Strong understanding of chemical handling, working at heights, and confined space safety",
      ],
      jobType: "Full Time",
      location: "Abu Dhabi & Dubai, UAE",
      experience: "3+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 6,
      title: "Polyurea & Membrane Application Specialist",
      fullDescription:
        "We are looking for skilled technicians and applicators with experience in hot-spray polyurea, torch-applied bitumen membranes, and liquid waterproofing coatings.",
      responsibilities: [
        "Operate high-pressure plural-component polyurea spray machines and reactors",
        "Prepare concrete surfaces including shot-blasting, grinding, and primer application",
        "Apply torch-on bitumen membranes and self-adhesive waterproofing sheets with precision",
        "Maintain equipment, spray guns, hoses, and ensure clean workspace hygiene",
      ],
      requirements: [
        "Vocational trade certificate or 3+ years hands-on experience in specialized coating application",
        "Experience with Graco spray rigs and torch-on membrane application is highly valued",
        "Strong work ethic, reliability, and commitment to job site safety",
      ],
      jobType: "Full Time",
      location: "UAE Site Locations",
      experience: "2+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 7,
      title: "Structural Restoration Project Manager",
      fullDescription:
        "We are seeking an accomplished Structural Restoration Project Manager to oversee heavy rehabilitation, crack injection, cathodic protection, and structural repair projects for infrastructure and commercial assets.",
      responsibilities: [
        "Manage project lifecycle from mobilization to successful testing and handover",
        "Oversee budgets, resource allocation, billing milestones, and cash flow",
        "Lead client meetings, consultant reviews, and authority correspondence",
        "Ensure projects finish on schedule, within budget, and to the highest quality standards",
      ],
      requirements: [
        "Bachelor's degree in Civil or Structural Engineering; PMP certification is an advantage",
        "7+ years experience managing concrete repair and specialized civil projects in UAE",
        "Proven track record of managing multi-million AED contracts and client relations",
      ],
      jobType: "Full Time",
      location: "Dubai, UAE",
      experience: "7+ Years",
      deadline: "30 December 2026",
    },
    {
      id: 8,
      title: "Injection & Leak Detection Field Engineer",
      fullDescription:
        "We are hiring a Field Engineer specialized in non-destructive leak detection, thermal imaging, and polyurethane/epoxy high-pressure injection waterproofing.",
      responsibilities: [
        "Perform diagnostic water leak assessments using infrared thermography and moisture meters",
        "Plan and execute polyurethane chemical injection to arrest live water ingress",
        "Prepare diagnostic technical reports with restorative recommendation plans",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering or related technical field",
        "2+ years experience in structural crack injection, leak detection, and concrete rehabilitation",
        "Valid UAE driving license is required for site visits across Emirates",
      ],
      jobType: "Full Time",
      location: "Dubai & Northern Emirates",
      experience: "2+ Years",
      deadline: "30 December 2026",
    },
  ];

  const job = jobs.find((j) => j.id === parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <button
            onClick={() => router.push("/careers")}
            className="text-[#01a9a0] hover:text-[#009e90] font-medium"
          >
            ← Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, cv: file }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, cv: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("experience", formData.experience);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("jobTitle", job.title);
      submitData.append("jobId", jobId);
      if (formData.cv) {
        submitData.append("cv", formData.cv);
      }

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Thank you for your application! We have received your CV and will review it shortly. We'll contact you if your profile matches our requirements.",
          {
            duration: 5000,
            style: {
              background: "#01a9a0",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#01a9a0",
            },
          }
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          coverLetter: "",
          cv: null,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(
          data.error || "Failed to submit application. Please try again.",
          {
            duration: 5000,
            style: {
              background: "#ef4444",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred. Please try again later.", {
        duration: 5000,
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ef4444",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CommonHeader
        title="Career"
        breadcrumb="Career"
        imagePath="/career/Careers_.png"
      />
      <div className="w-full bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push("/career")}
            className="flex items-center gap-2 text-[#01a9a0] hover:text-[#009e90] mb-6 group font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Careers</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Side - Job Details (2 columns) */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Job Header */}
              <div className="bg-white rounded-xl shadow p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#01a9a0] rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/q.svg"
                      alt="Company Logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
                      {job.title}
                    </h1>
                  </div>
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#01a9a0]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Job Type
                      </p>
                      <p className="font-bold text-gray-900">{job.jobType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#01a9a0]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Location
                      </p>
                      <p className="font-bold text-gray-900">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#01a9a0]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Experience
                      </p>
                      <p className="font-bold text-gray-900">
                        {job.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#01a9a0]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Deadline
                      </p>
                      <p className="font-bold text-gray-900">{job.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-xl shadow p-6 md:p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {job.fullDescription}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-[#e6f7f6] rounded-xl shadow p-6 md:p-8">
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#01a9a0] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-[#e6f7f6] rounded-xl shadow p-6 md:p-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Requirements & Qualifications
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#01a9a0] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Side - Application Form (1 column) */}
            <motion.div
              id="apply"
              className="lg:col-span-2 scroll-mt-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">Apply for this Position</h2>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm font-medium leading-relaxed">
                        {submitStatus.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      className="w-full px-5 py-3.5 bg-white rounded-full border border-stone-300 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.fullName || focusedField === "fullName"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      className="w-full px-5 py-3.5 bg-white rounded-full border border-stone-300 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.email || focusedField === "email"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      className="w-full px-5 py-3.5 bg-white rounded-full border border-stone-300 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.phone || focusedField === "phone"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      Phone Number
                    </label>
                  </div>

                  {/* Years of Experience */}
                  <div className="relative">
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("experience")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      className="w-full px-5 py-3.5 bg-white rounded-full border border-stone-300 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.experience || focusedField === "experience"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      Years of Experience
                    </label>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Upload CV/Resume *
                    </label>
                    {!formData.cv ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#01a9a0] transition-colors bg-white hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 text-center">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF or Word (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          disabled={isSubmitting}
                          required
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#01a9a0]" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formData.cv.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          disabled={isSubmitting}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
                        >
                          <X className="w-5 h-5 text-[#01a9a0]" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div className="relative">
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("coverLetter")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full px-5 py-3.5 bg-white border border-stone-300 text-stone-800 text-sm sm:text-[15px] font-normal font-['Anek_Malayalam'] focus:outline-none rounded-2xl focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-5 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        formData.coverLetter || focusedField === "coverLetter"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      Cover Letter (Optional)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#01a9a0] hover:bg-[#009e90] disabled:bg-[#01a9a0]/50 text-white font-bold rounded-full transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationPage;
