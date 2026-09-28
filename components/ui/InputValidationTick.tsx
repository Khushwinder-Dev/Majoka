"use client";

import React from "react";
import { Check } from "lucide-react";

interface InputValidationTickProps {
  isValid: boolean;
  isArabic?: boolean;
  className?: string;
}

export function InputValidationTick({
  isValid,
  isArabic = false,
  className = "",
}: InputValidationTickProps) {
  if (!isValid) return null;
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center animate-in fade-in zoom-in-75 duration-150 ${
        isArabic ? "left-4 sm:left-4.5" : "right-4 sm:right-4.5"
      } ${className}`}
      aria-hidden="true"
    >
      <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
    </div>
  );
}

export const isValidEmail = (v?: string | null): boolean =>
  Boolean(v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()));

export const isValidPhone = (v?: string | null): boolean =>
  Boolean(v && v.trim().replace(/\D/g, "").length >= 7);

export const isValidText = (v?: string | null, minLength = 2): boolean =>
  Boolean(v && v.trim().length >= minLength);
