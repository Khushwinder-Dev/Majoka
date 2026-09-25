"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

export interface SearchableSelectOption {
  value: string;
  label: string;
  labelAr?: string;
}

export interface SearchableSelectProps {
  name?: string;
  value: string;
  options: SearchableSelectOption[];
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  className?: string;
  variant?: "rounded-full" | "rounded-xl";
  size?: "default" | "sm";
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  name,
  value,
  options,
  label,
  placeholder,
  searchPlaceholder,
  required = false,
  disabled = false,
  isArabic = false,
  className = "",
  variant = "rounded-full",
  size = "default",
  onChange,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  // Find currently selected option
  const selectedOption = options.find((opt) => opt.value === value);

  const getOptionLabel = (opt: SearchableSelectOption) => {
    if (isArabic && opt.labelAr) return opt.labelAr;
    return opt.label;
  };

  const displaySelectedText = selectedOption ? getOptionLabel(selectedOption) : "";

  // Filter options based on query
  const filteredOptions = options.filter((opt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const enMatch = opt.label.toLowerCase().includes(q);
    const arMatch = opt.labelAr ? opt.labelAr.toLowerCase().includes(q) : false;
    const valMatch = opt.value.toLowerCase().includes(q);
    return enMatch || arMatch || valMatch;
  });

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure dropdown is rendered in DOM
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  const isLifted = isOpen || Boolean(value);

  const roundedClass = variant === "rounded-full" ? "rounded-full" : "rounded-xl";
  const heightPadding =
    size === "sm"
      ? "h-11 px-4 pt-4 pb-1 text-xs sm:text-[13px]"
      : "px-5 pt-5 pb-2 text-sm sm:text-[15px]";

  const defaultSearchPlaceholder = isArabic ? "بحث في الخيارات..." : "Search...";

  return (
    <div
      ref={containerRef}
      className={`relative w-full text-left select-none ${className}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Hidden input for standard form submission & required validation */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-white border ${roundedClass} ${heightPadding} text-stone-800 transition-all duration-200 cursor-pointer text-left flex items-center justify-between ${
          isOpen
            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/20 shadow-xs"
            : isLifted
            ? "border-stone-300"
            : "border-stone-300 hover:border-stone-400"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-stone-50" : ""} ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <span
          className={`block truncate ${
            selectedOption ? "text-stone-800 font-medium" : "text-transparent"
          }`}
        >
          {displaySelectedText || placeholder || "Select"}
        </span>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#01a9a0]" : ""
          } ${isArabic ? "mr-2" : "ml-2"}`}
        />
      </button>

      {/* Floating Label */}
      <label
        htmlFor={id}
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
        className={`absolute bg-white px-1 transition-all duration-200 cursor-pointer pointer-events-none ${
          isArabic ? "right-5" : "left-5"
        } ${
          isLifted
            ? size === "sm"
              ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]"
              : "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
            : "top-1/2 -translate-y-1/2 text-sm text-stone-400"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 mt-1.5 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
          style={{ minWidth: "100%" }}
        >
          {/* Search Box Header */}
          <div className="p-2.5 border-b border-stone-100 bg-stone-50/70">
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder || defaultSearchPlaceholder}
                className={`w-full bg-white border border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/15 rounded-xl py-2 text-xs sm:text-sm text-stone-800 outline-none transition-all placeholder:text-stone-400 ${
                  isArabic ? "pr-3 pl-8 text-right" : "pl-3 pr-8 text-left"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredOptions.length > 0) {
                    e.preventDefault();
                    handleSelect(filteredOptions[0].value);
                  }
                }}
              />
              <Search
                className={`w-4 h-4 text-stone-400 pointer-events-none absolute ${
                  isArabic ? "left-2.5" : "right-2.5"
                }`}
              />
            </div>
          </div>

          {/* Options List */}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="max-h-60 overflow-y-auto py-1.5 divide-y divide-stone-50 scrollbar-thin scrollbar-thumb-stone-200"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={`px-4 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-stone-100/90 text-stone-900 font-semibold"
                        : "text-stone-700 hover:bg-[#f0faf9] hover:text-[#01a9a0]"
                    } ${isArabic ? "text-right" : "text-left"}`}
                  >
                    <span className="truncate">{getOptionLabel(opt)}</span>
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 text-[#01a9a0] shrink-0 ${
                          isArabic ? "mr-2" : "ml-2"
                        }`}
                      />
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-6 text-center text-xs sm:text-sm text-stone-400">
                {isArabic ? "لا توجد نتائج مطابقة" : "No options found"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
