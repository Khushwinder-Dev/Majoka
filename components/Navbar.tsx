"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ExpandableSearchBar from "./Common/ExpandableSearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Search suggestions - you can customize these
  const searchSuggestions = [
    "Services",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Digital Marketing",
    "E-commerce Solutions",
    "About Us",
    "Contact",
    "Career Opportunities",
    "Blog Posts",
    "Projects",
    "Portfolio",
  ];

  // Handle search functionality
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add your search logic here - navigate to search results, filter content, etc.
    // Example: router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key and outside click
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (event.key === "Escape" && isLangDropdownOpen) {
        setIsLangDropdownOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        isLangDropdownOpen &&
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    if (isLangDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isLangDropdownOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Determine navbar background and text colors - all pages follow home page style
  const getNavbarStyles = () => {
    return {
      navBg: isScrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent",
      textColor: "text-white/80 group-hover:text-[#01a9a0]",
      hoverColor: "hover:text-[#01a9a0]",
      activeColor: "text-[#01a9a0]/90",
    };
  };

  const styles = getNavbarStyles();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 py-3 ${styles.navBg} hover:bg-white group`}
      style={{ zIndex: 9998 }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/TajAlrahmanlogo.png"
                alt="Company Logo"
                width={100}
                height={80}
                className="max-w-[100px] max-h-[80px] w-auto h-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex gap-6 lg:gap-10">
              <Link
                href="/services"
                className={`${
                  pathname === "/services"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                Services
              </Link>
              <Link
                href="/project"
                className={`${
                  pathname === "/project"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                Project
              </Link>
              {/* <Link
                href="/media"
                className={`${
                  pathname === "/media" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold transition-colors text-lg font-anek`}
              >
                Media
              </Link> */}

              <Link
                href="/career"
                className={`${
                  pathname === "/career" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                Career
              </Link>
              <Link
                href="/blogs"
                className={`${
                  pathname === "/blogs" ? styles.activeColor : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                Blogs
              </Link>
              <Link
                href="/about-us"
                className={`${
                  pathname === "/about-us"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`${
                  pathname === "/contact"
                    ? styles.activeColor
                    : styles.textColor
                } ${
                  styles.hoverColor
                } font-semibold uppercase transition-colors text-lg font-anek`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder="Search..."
              suggestions={searchSuggestions}
              iconColor={styles.textColor}
              hoverIconColor={styles.hoverColor}
            />

            {/* Language Selector with Flag */}
            {/* <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 rounded-full px-3 py-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Image
                  src="https://flagcdn.com/w40/us.png"
                  alt="English"
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <ChevronDown
                  className={`${
                    styles.textColor
                  } w-5 h-5 transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setIsLangDropdownOpen(false);
                      // Handle language change to English
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
                  >
                    <Image
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      width={24}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      English
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setIsLangDropdownOpen(false);
                      // Handle language change to Arabic
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
                  >
                    <Image
                      src="https://flagcdn.com/w40/sa.png"
                      alt="Arabic"
                      width={24}
                      height={16}
                      className="rounded-sm"
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      العربية
                    </span>
                  </button>
                </div>
              )}
            </div> */}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="w-44 h-10 px-5 py-3 theme-bg-main hover:text-[#01a9a0] rounded-[30px] inline-flex justify-center items-center gap-2.5 transition-colors shadow"
            >
              <span className="text-indigo-50 text-base font-semibold uppercase">
                Book A Meeting
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative w-11 h-11 ${styles.textColor} hover:opacity-50 transition-colors flex items-center justify-center cursor-pointer`}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-5 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            zIndex: 2147483646,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-black/65 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          zIndex: 2147483647,
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          isolation: "isolate",
        }}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 text-white hover:text-red-400 transition-colors flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-6">
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/services" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Services
            </Link>
            <Link
              href="/project"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/project" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Project
            </Link>
            {/* <Link
              href="/media"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/media" ? "text-sky-400" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Media
            </Link> */}
            <Link
              href="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/career" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Career
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/contact" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Contact
            </Link>
            <Link
              href="/about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/about-us" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              About
            </Link>
            <Link
              href="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                pathname === "/blogs" ? "text-red-700" : "text-white/80"
              } hover:text-white font-semibold transition-colors text-xl py-2 font-anek`}
            >
              Blogs
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-8 mb-6">
            <ExpandableSearchBar
              onSearch={(query) => {
                handleSearch(query);
                setIsMobileMenuOpen(false); // Close mobile menu after search
              }}
              placeholder="Search..."
              suggestions={searchSuggestions}
              iconColor="text-white/80"
              hoverIconColor="hover:text-white"
              className="w-full"
            />
          </div>

          {/* Mobile Language Selector */}
          {/* <div className="mt-8 mb-4">
            <div className="flex items-center space-x-3 px-3 py-2 bg-white/10 rounded-lg">
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="English"
                width={24}
                height={16}
                className="rounded-sm"
              />
              <span className="text-white/90 text-base font-medium">
                English
              </span>
            </div>
          </div> */}

          {/* Mobile Book Now Button */}
          <div>
            <Link
              href="/book-meeting"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-44 h-10 px-5 py-3 bg-red-700 rounded-[30px] inline-flex justify-center items-center gap-2.5 hover:bg-red-800 transition-colors"
            >
              <span className="text-indigo-50 text-base font-medium">
                Book A Meeting
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
