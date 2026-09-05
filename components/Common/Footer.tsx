"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden theme-bg-main">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/footer/footer-bg.png')" }}
      />

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-16 py-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info Section - Column 1 */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <div className="flex items-center mb-2">
              <Image
                src="/TajAlrahmanlogo.png"
                alt="Majoka Engineering Logo"
                width={160}
                height={80}
                className="h-auto w-40"
              />
            </div>

            <p className="text-white text-base leading-relaxed">
              Taj Al Rahmah Technical Services, we deliver expert electrical, plumbing, painting, cleaning, repairs, and heating &
              cooling solutions with quality workmanship and dependable service.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="https://instagram.com/majokaengineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
              {/* <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </Link> */}
              <Link
                href="https://x.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </Link>
              {/* <Link
                href="https://www.tiktok.com/@majokaengineering"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link> */}
            </div>
          </div>

          {/* Quick Links - Column 2 */}
          <div className="space-y-4 h-full flex flex-col md:ml-8 mt-12">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 flex-grow">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services-details?service=1"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Inspection
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources - Column 3 */}
          <div className="space-y-4 h-full flex flex-col md:ml-6 mt-12">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Resources
            </h3>
            <ul className="space-y-3 flex-grow">
              <li>
                <Link
                  href="/media"
                  className="flex items-center gap-2 text-white text-base transition-colors hover:text-white/80"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Career
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/project"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - Column 4 */}
          <div className="space-y-4 h-full flex flex-col md:ml-2 mt-12">
            <h3 className="text-white text-2xl font-semibold mb-2">Services</h3>
            <ul className="space-y-3 flex-grow">
              <li>
                <Link
                  href="/services-details?service=8"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Weights
                </Link>
              </li>
              <li>
                <Link
                  href="/services-details?service=6"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Pressure Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/services-details?service=9"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Gauge
                </Link>
              </li>
              <li>
                <Link
                  href="/services-details?service=10"
                  className="flex items-center gap-2 text-white text-base transition-colors"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  Laboratories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us - Column 5 */}
          <div className="space-y-4 h-full flex flex-col md:ml-2 mt-12">
            <h3 className="text-white text-2xl font-semibold mb-2">
              Contact Us
            </h3>
            <div className="space-y-4 flex-grow">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                <div className="text-white text-base leading-relaxed">
                  {/* <p>Fish Round About Deira,</p>
                  <p>Dubai, UAE</p> */}
                  <p>Mecca, Saudi Arabia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <Link
                  href="tel:+9660503010184"
                  className="text-white text-base transition-colors"
                >
                  +966-0503010184
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <Link
                  href="mailto:info@tajengineering.com"
                  className="text-white text-base transition-colors break-all"
                >
                  info@tajengineering.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative mt-8 pb-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ChevronRight className="w-5 h-5 text-white rotate-[-90deg]" />
            </button>

            {/* Copyright Text */}
            <p className="text-center text-white text-base">
              © 2025 TAJ ENGINEERING. All rights reserved. Developed by{" "}
              <Link
                href="https://rapidsmarterp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors underline"
              >
                RAPID
              </Link>
            </p>

            {/* Empty space for balance */}
            <div className="w-10 h-10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
