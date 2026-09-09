"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ExpandableSearchBar from "./Common/ExpandableSearchBar";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const searchSuggestions = [
    t.nav.products,
    t.nav.services,
    t.nav.projects,
    t.nav.industries,
    t.nav.resources,
    t.nav.careers,
    t.nav.company,
    t.nav.contact,
    "Waterproofing",
    "Contracting",
  ];

  const navItems = [
    { name: t.nav.services, href: "/services" },
    { name: t.nav.projects, href: "/project" },
    { name: t.nav.products, href: "/products" },
    { name: t.nav.industries, href: "/industries" },
    { name: t.nav.resources, href: "/resources" },
    { name: t.nav.company, href: "/about-us" },
    { name: t.nav.careers, href: "/career" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/project") return pathname === "/project" || pathname.startsWith("/project");
    if (href === "/career") return pathname === "/career" || pathname.startsWith("/career");
    if (href === "/services") return pathname === "/services" || pathname.startsWith("/services");
    if (href === "/about-us") return pathname === "/about-us" || pathname === "/about";
    if (href === "/resources") return pathname === "/resources" || pathname === "/blogs" || pathname.startsWith("/blogs") || pathname === "/media" || pathname.startsWith("/media");
    if (href === "/products") return pathname === "/products" || pathname.startsWith("/products");
    if (href === "/industries") return pathname === "/industries" || pathname.startsWith("/industries");
    return pathname === href || pathname.startsWith(href);
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
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

  // Determine navbar background and text colors matching reference image
  const getNavbarStyles = () => {
    return {
      navBg: isScrolled
        ? "bg-[#011c20]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-transparent",
      textColor: "text-[#01a9a0]",
      // textColor: "text-white/90 hover:text-[#00c2b2]",
      hoverColor: "hover:text-[#00c2b2]",
      activeColor: "text-[#00c2b2] font-bold",
    };
  };

  const styles = getNavbarStyles();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 py-3 sm:py-4 ${styles.navBg}`}
      style={{ zIndex: 9998 }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo (Kept exactly as it is) */}
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

          {/* Navigation Links (Matching order: SERVICES, PROJECTS, PRODUCTS, INDUSTRIES, RESOURCES, COMPANY, CAREERS, CONTACT) */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-7">
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
                    } font-semibold uppercase transition-colors text-xs lg:text-[12px] xl:text-[14px] 2xl:text-[15px] font-anek tracking-wider whitespace-nowrap`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side Controls (العربية, Dashed Search, GET A QUOTE ->) */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5 flex-shrink-0">
            {/* Arabic Link / Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-white hover:text-[#00c2b2] text-sm xl:text-base font-semibold transition-colors cursor-pointer px-1 py-1 font-sans pointer-events-none hidden"                          
              title={t.nav.langToggle}
            >
              {t.nav.langToggle}
            </button>

            {/* Circular Search Button with Dashed Ring */}
            <ExpandableSearchBar
              onSearch={handleSearch}
              placeholder={t.nav.searchPlaceholder}
              suggestions={searchSuggestions}
              dashedButton={true}
              iconColor={styles.textColor}
              hoverIconColor={styles.hoverColor}
            />

            {/* GET A QUOTE CTA Button */}
            <Link
              href="/contact"
              className="pl-5 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] text-white font-bold text-xs xl:text-sm tracking-wider uppercase inline-flex items-center gap-3 transition-all duration-300 shadow-[0_4px_18px_rgba(0,179,164,0.4)] hover:shadow-[0_6px_24px_rgba(0,194,178,0.6)] hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer group"
            >
              <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#00b3a4] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
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
                setIsMobileMenuOpen(false);
              }}
              placeholder={t.nav.searchPlaceholder}
              suggestions={searchSuggestions}
              iconColor="text-white/80"
              hoverIconColor="hover:text-white"
              className="w-full"
            />
          </div>

          {/* Mobile Arabic Option */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:text-[#00c2b2] text-base font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>{t.nav.langToggle}</span>
            </button>
          </div>

          {/* Mobile GET A QUOTE Button */}
          <div>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pl-6 pr-2 py-2.5 rounded-full bg-[#00b3a4] hover:bg-[#00c2b2] text-white font-bold text-sm tracking-wider uppercase inline-flex items-center gap-3 shadow-lg group"
            >
              <span className="whitespace-nowrap font-anek">{t.nav.getQuote}</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#00b3a4] flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
