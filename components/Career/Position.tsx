"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface JobPosition {
  id: number;
  title: string;
  description: string;
  jobType: string;
  location: string;
  experience: string;
  deadline: string;
}

const Position = () => {
  const router = useRouter();
  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Team Lead Civil Engineer",
      description:
        "The Team Lead (Civil) is responsible for managing a team of civil engineers and technicians, overseeing the design and execution of construction projects. This role requires strong leadership skills to ensure projects are delivered on time and within budget while adhering to all safety and regulatory standards.",
      jobType: "Full Time",
      location: "Remote",
      experience: "8 Years",
      deadline: "30 November 2025",
    },
    {
      id: 2,
      title: "Senior Architecture Engineer",
      description:
        "We are looking for a motivated Junior Architectural Engineer to join our dynamic team. In this role, you will assist in the design, development, and implementation of architectural projects, ensuring that they meet both client specifications and industry standards. You will work closely with senior engineers and architects to learn best practices and contribute to exciting projects that shape our built environment.",
      jobType: "Full Time",
      location: "Remote",
      experience: "3 Years",
      deadline: "30 November 2025",
    },
    {
      id: 3,
      title: "Principal Architectural Engineer",
      description:
        "We are seeking a highly experienced Principal Architectural Engineer. In this role, you will lead the architectural design efforts for complex projects, ensuring that our engineering practices align with industry standards and innovative design principles. You will be instrumental in driving strategic initiatives and mentoring a team of engineers, fostering a culture of excellence and continuous improvement.",
      jobType: "Full Time",
      location: "Remote",
      experience: "10 Years",
      deadline: "30 November 2025",
    },
    {
      id: 4,
      title: "Architectural Engineering Manager",
      description:
        "We are actively seeking a highly skilled Architectural Engineering Manager to lead our innovative design and engineering team. In this role, you will provide strategic direction, foster a collaborative environment, and ensure the successful execution of architectural projects that align with our mission to enhance the built environment sustainably and creatively.",
      jobType: "Full Time",
      location: "Remote",
      experience: "8 Years",
      deadline: "30 November 2025",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold theme-text-main mb-12">
          Current Open Position
        </h2>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobPositions.map((job) => (
            <div
              key={job.id}
              className="bg-[#10b981]/10 shadow rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Company Logo/Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 theme-bg-main rounded-full flex items-center justify-center">
                  <Image
                    src="/q.svg"
                    alt="Company Logo"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              {/* Job Details */}
              <div className="flex-grow">
                <h3 className="text-xl md:text-2xl font-bold theme-text-main mb-3">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Job Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-300">
                    Job Type : {job.jobType}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-300">
                    Location : {job.location}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-300">
                    Experience : {job.experience}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-300">
                    Deadline : {job.deadline}
                  </span>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex-shrink-0">
                <button
                  className="bg-[#01a9a0] hover:bg-[#01a9a0]/80 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg cursor-pointer"
                  onClick={() => router.push(`/career/${job.id}`)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Position;
