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
    "Products",
    "Services",
    "Projects",
    "Industries",
    "Resources",
    "Careers",
    "About Us",
    "Contact",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Digital Marketing",
    "E-commerce Solutions",
  ];

  const navItems = [
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/project" },
    { name: "Industries", href: "/industries" },
    { name: "Resources", href: "/resources" },
    { name: "Careers", href: "/career" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/project") return pathname === "/project" || pathname.startsWith("/project");
    if (href === "/career") return pathname === "/career" || pathname.startsWith("/career");
    if (href === "/services") return pathname === "/services" || pathname.startsWith("/services");
    if (href === "/about-us") return pathname === "/about-us" || pathname === "/about";
    if (href === "/resources") return pathname === "/resources" || pathname === "/blogs" || pathname.startsWith("/blogs");
    return pathname === href || pathname.startsWith(href);
  };

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
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-12 2xl:px-16">
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
          <div className="hidden lg:block">
            <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-6 2xl:gap-8">
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      active ? styles.activeColor : styles.textColor
                    } ${
                      styles.hoverColor
                    } font-semibold uppercase transition-colors text-xs lg:text-[13px] xl:text-[15px] 2xl:text-lg font-anek whitespace-nowrap`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 flex-shrink-0">
            {/* Search Bar */}
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder="Search..."
              suggestions={searchSuggestions}
              iconColor={styles.textColor}
              hoverIconColor={styles.hoverColor}
            />

            {/* CTA Button */}
            <Link
              href="/contact"
              className="w-36 xl:w-44 h-10 px-3 xl:px-5 py-3 theme-bg-main hover:opacity-90 rounded-[30px] inline-flex justify-center items-center gap-2.5 transition-opacity shadow flex-shrink-0"
            >
              <span className="text-indigo-50 text-xs xl:text-base font-semibold uppercase whitespace-nowrap">
                Book A Meeting
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
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
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-black/65 backdrop-blur-lg border-l border-white/10 transform transition-transform duration-300 ease-out lg:hidden ${
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
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${
                    active ? "text-[#01a9a0]" : "text-white/80"
                  } hover:text-white font-semibold uppercase transition-colors text-lg py-1 font-anek`}
                >
                  {item.name}
                </Link>
              );
            })}
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

          {/* Mobile Book Now Button */}
          <div>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-44 h-10 px-5 py-3 theme-bg-main rounded-[30px] inline-flex justify-center items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="text-indigo-50 text-base font-semibold uppercase">
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
