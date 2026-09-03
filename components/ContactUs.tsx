"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const WorkSteps = () => {
  return (
    <div className="relative w-full h-[676px] bg-[#0d4159] bg-opacity-70 bg-cover bg-center overflow-hidden p-16">
      {/* Background image would be applied via CSS */}

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row justify-between items-start">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-[-0.4px]">
            Ready To Get Started? Contact Us Today!
          </h2>
          <p className="text-xl md:text-2xl font-medium text-white mb-12 text-justify">
            Eager to kick off your next construction project? Reach out to us
            today! Our team is ready to assist you with all your needs and
            ensure a smooth process from start to finish.
          </p>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#209bd6]" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-white">Email</h4>
                <a
                  href="mailto:info@majokaengineering.com"
                  className="text-base font-medium text-white hover:underline"
                >
                  info@majokaengineering.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#209bd6]" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-white">Phone</h4>
                <a
                  href="tel:+966-0503010184"
                  className="text-base font-medium text-white hover:underline"
                >
                  +966-0503010184
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#209bd6]" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-white">Office</h4>
                <p className="text-base font-medium text-white">
                  Fish Round About Deira, Dubai, UAE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Contact Form */}
        <div className="w-full lg:w-5/12 bg-white bg-opacity-40 backdrop-blur-md rounded-[20px] p-12 lg:p-15">
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-6">
              {/* Name Input */}
              <div className="w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full bg-transparent text-[#e9f5fb] placeholder-[#e9f5fb] outline-none text-lg"
                />
              </div>

              {/* Phone Input */}
              <div className="w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent text-[#e9f5fb] placeholder-[#e9f5fb] outline-none text-lg"
                />
              </div>

              {/* Email Input */}
              <div className="w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent text-[#e9f5fb] placeholder-[#e9f5fb] outline-none text-lg"
                />
              </div>

              {/* Services Dropdown */}
              <div className="w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center justify-between">
                <span className="text-[#e9f5fb] text-lg">Services</span>
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#e9f5fb] stroke-[1.5px]"
                >
                  <path
                    d="M1 1L6 5L11 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Message Input */}
              <div className="w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center">
                <input
                  type="text"
                  placeholder="Message"
                  className="w-full bg-transparent text-[#e9f5fb] placeholder-[#e9f5fb] outline-none text-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full h-[50px] bg-[#20a0d6] text-white font-bold text-xl rounded-full flex items-center justify-center">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* CSS for background image */}
      <style jsx>{`
        .bg-cover {
          background-image: url("/images/construction-background-1.png");
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
};

export default WorkSteps;
