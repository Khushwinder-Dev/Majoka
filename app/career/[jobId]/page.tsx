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

  // Job data - In production, fetch from API/database
  const jobs: Job[] = [
    {
      id: 1,
      title: "Team Lead Civil Engineer",
      fullDescription:
        "We are seeking a Team Lead Civil Engineer to guide our dynamic engineering team. The ideal candidate will possess exceptional leadership abilities, a knack for project management, and innovative thinking in design and construction. This role involves supervising project execution, ensuring compliance with safety regulations, and fostering a collaborative work environment to deliver exceptional infrastructure projects.",
      responsibilities: [
        "Lead and mentor a team of civil engineers on multiple projects",
        "Oversee project planning, design, and execution phases",
        "Ensure compliance with safety standards and building regulations",
        "Coordinate with clients, contractors, and stakeholders",
        "Manage project budgets, timelines, and resource allocation",
        "Review and approve technical drawings and specifications",
        "Conduct site inspections and quality assessments",
        "Implement innovative solutions to engineering challenges",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering or related field",
        "5+ years of experience in civil engineering projects",
        "Proven leadership and team management experience",
        "Strong knowledge of construction codes and regulations",
        "Proficiency in AutoCAD, Civil 3D, and project management tools",
        "Excellent communication and interpersonal skills",
        "Professional Engineer (PE) license preferred",
        "Ability to manage multiple projects simultaneously",
      ],
      jobType: "Full Time",
      location: "Remote",
      experience: "1-5 Years",
      deadline: "14 November 2023",
    },
    {
      id: 2,
      title: "Senior Architecture Engineer",
      fullDescription:
        "We are looking for a Senior Architectural Engineer to lead our talented team. The perfect candidate will have strong leadership skills, excellent project management experience, and a creative approach to design. This position requires overseeing project implementation, ensuring safety standards are met, and promoting teamwork to achieve architectural excellence.",
      responsibilities: [
        "Lead architectural design projects from concept to completion",
        "Develop innovative and sustainable design solutions",
        "Coordinate with engineering teams and consultants",
        "Prepare detailed architectural drawings and specifications",
        "Ensure designs comply with building codes and regulations",
        "Conduct site visits and client presentations",
        "Mentor junior architects and design team members",
        "Manage project documentation and deliverables",
      ],
      requirements: [
        "Bachelor's or Master's degree in Architecture",
        "5+ years of architectural design experience",
        "Proficiency in Revit, AutoCAD, SketchUp, and 3D rendering software",
        "Strong portfolio demonstrating design capabilities",
        "Knowledge of sustainable design practices",
        "Excellent creative and problem-solving skills",
        "Strong communication and presentation abilities",
        "Professional architect license preferred",
      ],
      jobType: "Full Time",
      location: "Remote",
      experience: "1-5 Years",
      deadline: "14 November 2023",
    },
    {
      id: 3,
      title: "Senior Architecture Engineer",
      fullDescription:
        "We are looking for a Senior Architectural Engineer to lead our talented team. The perfect candidate will have strong leadership skills, excellent project management experience, and a creative approach to design. This position requires overseeing project implementation, ensuring safety standards are met, and promoting teamwork to achieve architectural excellence.",
      responsibilities: [
        "Lead architectural design projects from concept to completion",
        "Develop innovative and sustainable design solutions",
        "Coordinate with engineering teams and consultants",
        "Prepare detailed architectural drawings and specifications",
        "Ensure designs comply with building codes and regulations",
        "Conduct site visits and client presentations",
        "Mentor junior architects and design team members",
        "Manage project documentation and deliverables",
      ],
      requirements: [
        "Bachelor's or Master's degree in Architecture",
        "5+ years of architectural design experience",
        "Proficiency in Revit, AutoCAD, SketchUp, and 3D rendering software",
        "Strong portfolio demonstrating design capabilities",
        "Knowledge of sustainable design practices",
        "Excellent creative and problem-solving skills",
        "Strong communication and presentation abilities",
        "Professional architect license preferred",
      ],
      jobType: "Full Time",
      location: "Remote",
      experience: "1-5 Years",
      deadline: "14 November 2023",
    },
    {
      id: 4,
      title: "Team Lead Civil Engineer",
      fullDescription:
        "We are seeking a Team Lead Civil Engineer to guide our dynamic engineering team. The ideal candidate will possess exceptional leadership abilities, a knack for project management, and innovative thinking in design and construction. This role involves supervising project execution, ensuring compliance with safety regulations, and fostering a collaborative work environment to deliver exceptional infrastructure projects.",
      responsibilities: [
        "Lead and mentor a team of civil engineers on multiple projects",
        "Oversee project planning, design, and execution phases",
        "Ensure compliance with safety standards and building regulations",
        "Coordinate with clients, contractors, and stakeholders",
        "Manage project budgets, timelines, and resource allocation",
        "Review and approve technical drawings and specifications",
        "Conduct site inspections and quality assessments",
        "Implement innovative solutions to engineering challenges",
      ],
      requirements: [
        "Bachelor's degree in Civil Engineering or related field",
        "5+ years of experience in civil engineering projects",
        "Proven leadership and team management experience",
        "Strong knowledge of construction codes and regulations",
        "Proficiency in AutoCAD, Civil 3D, and project management tools",
        "Excellent communication and interpersonal skills",
        "Professional Engineer (PE) license preferred",
        "Ability to manage multiple projects simultaneously",
      ],
      jobType: "Full Time",
      location: "Remote",
      experience: "1-5 Years",
      deadline: "14 November 2023",
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
            className="text-red-900 hover:text-red-800 font-medium"
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
              background: "#10b981",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981",
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
        imagePath="/project.jpg"
      />
      <div className="w-full bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push("/career")}
            className="flex items-center gap-2 text-red-900 hover:text-red-800 mb-6 group font-medium"
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
                  <div className="w-16 h-16 theme-bg-main rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/q.svg"
                      alt="Company Logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-pink-950">
                      {job.title}
                    </h1>
                  </div>
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-red-900" />
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
                      <MapPin className="w-5 h-5 text-red-900" />
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
                      <Clock className="w-5 h-5 text-red-900" />
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
                      <Calendar className="w-5 h-5 text-red-900" />
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
                <h2 className="text-2xl font-bold text-pink-950 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {job.fullDescription}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-[#EDE8E9] rounded-xl shadow p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-red-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-[#EDE8E9] rounded-xl shadow p-6 md:p-8">
                <h2 className="text-2xl font-bold text-pink-950 mb-6">
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
                      <CheckCircle className="w-5 h-5 text-red-900 flex-shrink-0 mt-0.5" />
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
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-pink-950 mb-6">
                  Apply for this Position
                </h2>

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
                      className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-pink-950 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                        formData.fullName || focusedField === "fullName"
                          ? "-translate-y-1/2 text-xs text-pink-950"
                          : "translate-y-3 text-base text-gray-500"
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
                      className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-pink-950 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                        formData.email || focusedField === "email"
                          ? "-translate-y-1/2 text-xs text-pink-950"
                          : "translate-y-3 text-base text-gray-500"
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
                      className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-pink-950 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                        formData.phone || focusedField === "phone"
                          ? "-translate-y-1/2 text-xs text-pink-950"
                          : "translate-y-3 text-base text-gray-500"
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
                      className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-900 text-base font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-pink-950 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                        formData.experience || focusedField === "experience"
                          ? "-translate-y-1/2 text-xs text-pink-950"
                          : "translate-y-3 text-base text-gray-500"
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
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-900 transition-colors bg-white hover:bg-gray-50">
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
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-red-900" />
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
                          <X className="w-5 h-5 text-red-900" />
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 text-base font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-pink-950 transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    />
                    <label
                      className={`absolute left-3 top-0 bg-white px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                        formData.coverLetter || focusedField === "coverLetter"
                          ? "-translate-y-1/2 text-xs text-pink-950"
                          : "translate-y-3 text-base text-gray-500"
                      }`}
                    >
                      Cover Letter (Optional)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-pink-900 hover:bg-pink-950 disabled:bg-red-300 text-white font-bold rounded-full transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
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
