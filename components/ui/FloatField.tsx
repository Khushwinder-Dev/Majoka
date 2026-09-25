"use client";

import React, { useState } from "react";

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputBase = `
  peer w-full rounded-full border bg-white
  px-5 pt-5 pb-2
  text-sm sm:text-[15px] text-stone-800
  focus:outline-none focus:ring-2 focus:ring-[#01a9a0]/20
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// ── FloatInput ────────────────────────────────────────────────────────────────
export interface FloatInputProps {
  type?: string;
  name: string;
  value: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function FloatInput({
  type = "text",
  name,
  value,
  label,
  required,
  disabled,
  isArabic = false,
  onChange,
  onFocus,
  onBlur,
}: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.(); }}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        dir={isArabic ? "rtl" : "ltr"}
        placeholder=" "
        className={`${inputBase} ${
          lifted ? "border-[#01a9a0]" : "border-stone-300"
        } ${isArabic ? "text-right" : "text-left"}`}
      />
      <label
        className={`
          pointer-events-none absolute bg-white px-1
          ${isArabic ? "right-5" : "left-5"}
          transition-all duration-200
          ${lifted
            ? "-top-2 text-[11px] font-semibold text-[#01a9a0]"
            : "top-1/2 -translate-y-1/2 text-sm text-stone-400"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}

// ── FloatTextarea ─────────────────────────────────────────────────────────────
export interface FloatTextareaProps {
  name: string;
  value: string;
  label: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FloatTextarea({
  name,
  value,
  label,
  rows = 4,
  required,
  disabled,
  isArabic = false,
  onChange,
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        rows={rows}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        dir={isArabic ? "rtl" : "ltr"}
        placeholder=" "
        className={`
          peer w-full rounded-2xl border bg-white
          px-5 pt-6 pb-2
          text-sm sm:text-[15px] text-stone-800
          focus:outline-none focus:ring-2 focus:ring-[#01a9a0]/20
          transition-all duration-200 resize-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${lifted ? "border-[#01a9a0]" : "border-stone-300"}
          ${isArabic ? "text-right" : "text-left"}
        `}
      />
      <label
        className={`
          pointer-events-none absolute bg-white px-1
          ${isArabic ? "right-5" : "left-5"}
          transition-all duration-200
          ${lifted
            ? "-top-2 text-[11px] font-semibold text-[#01a9a0]"
            : "top-4 text-sm text-stone-400"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}

export { default as SearchableSelect } from "./SearchableSelect";
export type { SearchableSelectOption, SearchableSelectProps } from "./SearchableSelect";
