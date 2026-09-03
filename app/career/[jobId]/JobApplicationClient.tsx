"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommonHeader from "@/components/Common/CommonHeader";
import toast, { Toaster } from "react-hot-toast";

const jobTitles: Record<string, string> = {
  "1": "Team Lead Civil Engineer",
  "2": "Senior Architecture Engineer",
  "3": "Principal Architectural Engineer",
  "4": "Architectural Engineering Manager",
};

export default function JobApplicationClient() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;
  const jobTitle = jobTitles[jobId] ?? "Open Position";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      toast.error("Please upload your CV/Resume.");
      return;
    }
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("experience", formData.experience);
      data.append("coverLetter", formData.coverLetter);
      data.append("jobTitle", jobTitle);
      data.append("jobId", jobId);
      data.append("cv", cvFile);

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success(
          "Application submitted successfully! We'll be in touch soon.",
          {
            duration: 5000,
            style: {
              background: "#01a9a0",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
          }
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          coverLetter: "",
        });
        setCvFile(null);
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to submit application.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <CommonHeader
        title="Apply Now"
        breadcrumb={`Career / ${jobTitle}`}
        imagePath="/project.jpg"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Job Title Banner */}
        <div className="bg-[#01a9a0]/10 border border-[#01a9a0]/30 rounded-2xl p-6 mb-10">
          <p className="text-sm font-semibold text-[#01a9a0] uppercase tracking-widest mb-1">
            Applying for
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
            {jobTitle}
          </h1>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Ahmed Al-Rashid"
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01a9a0] focus:border-transparent transition text-stone-900"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01a9a0] focus:border-transparent transition text-stone-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966 5xx xxx xxxx"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01a9a0] focus:border-transparent transition text-stone-900"
              />
            </div>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 5 years"
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01a9a0] focus:border-transparent transition text-stone-900"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Cover Letter{" "}
              <span className="text-stone-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="coverLetter"
              rows={5}
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you're a great fit for this role..."
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01a9a0] focus:border-transparent transition text-stone-900 resize-none"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Upload CV / Resume <span className="text-red-500">*</span>
            </label>
            <div className="relative border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-[#01a9a0] transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {cvFile ? (
                <div className="flex items-center justify-center gap-2 text-[#01a9a0] font-semibold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{cvFile.name}</span>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-8 h-8 text-stone-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <p className="text-stone-500 text-sm">
                    Drag & drop or{" "}
                    <span className="text-[#01a9a0] font-semibold">
                      click to upload
                    </span>
                  </p>
                  <p className="text-stone-400 text-xs mt-1">
                    PDF, DOC, DOCX accepted
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit & Back */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#01a9a0] hover:bg-[#007b73] disabled:opacity-60 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/career")}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 cursor-pointer"
            >
              ← Back to Jobs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
