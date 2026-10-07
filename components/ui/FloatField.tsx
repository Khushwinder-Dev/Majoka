"use client";

import React, { useState } from "react";
import { InputValidationTick, isValidEmail, isValidPhone, isValidText } from "@/components/ui/InputValidationTick";
import { VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputBase = `
  peer w-full rounded-full border bg-white
  px-5 pt-5 pb-2
  text-sm sm:text-[15px] text-stone-800
  focus:outline-none
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
  error?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  isListening?: boolean;
  onVoiceToggle?: () => void;
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
  error,
  hasError,
  icon,
  isListening,
  onVoiceToggle,
  onChange,
  onFocus,
  onBlur,
}: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const isInvalid = Boolean(error || hasError);

  const isValid =
    type === "email"
      ? isValidEmail(value)
      : type === "tel"
      ? isValidPhone(value)
      : isValidText(value);

  return (
    <div className="w-full">
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
            onVoiceToggle
              ? isArabic ? "pl-20 text-right" : "pr-20 text-left"
              : isArabic ? "pl-11 text-right" : "pr-11 text-left"
          } ${
            isInvalid
              ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
              : lifted
              ? "border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
              : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
          }`}
        />
        <label
          className={`
            pointer-events-none absolute bg-white px-1
            ${isArabic ? "right-5" : "left-5"}
            transition-all duration-200
            ${lifted
              ? `-top-2 text-[11px] font-semibold ${isInvalid ? "text-red-500" : "text-[#01a9a0]"}`
              : `top-1/2 -translate-y-1/2 text-sm ${isInvalid ? "text-red-500 font-medium" : "text-stone-400"}`
            }
          `}
        >
          {label}
        </label>
        
        {/* Actions container: Mic button + Validation tick / icon */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 z-10 ${
            isArabic ? "left-3" : "right-3"
          }`}
        >
          {onVoiceToggle && (focused || isListening) && (
            <VoiceMicButton
              isListening={!!isListening}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              size="sm"
            />
          )}
          {isValid && !isInvalid ? (
            <InputValidationTick isValid={true} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
          ) : icon ? (
            <div
              className="pointer-events-none flex items-center justify-center text-[#00DDCF] transition-opacity duration-150"
            >
              {icon}
            </div>
          ) : null}
        </div>
      </div>

      {isListening && <VoiceListeningBadge isArabic={isArabic} />}

      {error && (
        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
          {error}
        </p>
      )}
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
  error?: string;
  hasError?: boolean;
  isListening?: boolean;
  onVoiceToggle?: () => void;
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
  error,
  hasError,
  isListening,
  onVoiceToggle,
  onChange,
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const isInvalid = Boolean(error || hasError);

  return (
    <div className="w-full">
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
            focus:outline-none
            transition-all duration-200 resize-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isInvalid
                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                : lifted
                ? "border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
            }
            ${
              onVoiceToggle
                ? isArabic ? "pl-12 text-right" : "pr-12 text-left"
                : isArabic ? "text-right" : "text-left"
            }
          `}
        />
        <label
          className={`
            pointer-events-none absolute bg-white px-1
            ${isArabic ? "right-5" : "left-5"}
            transition-all duration-200
            ${lifted
              ? `-top-2 text-[11px] font-semibold ${isInvalid ? "text-red-500" : "text-[#01a9a0]"}`
              : `top-4 text-sm ${isInvalid ? "text-red-500 font-medium" : "text-stone-400"}`
            }
          `}
        >
          {label}
        </label>
        {onVoiceToggle && (focused || isListening) && (
          <div className={`absolute top-3 z-10 ${isArabic ? "left-3" : "right-3"}`}>
            <VoiceMicButton
              isListening={!!isListening}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              size="sm"
            />
          </div>
        )}
      </div>

      {isListening && <VoiceListeningBadge isArabic={isArabic} />}

      {error && (
        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

export { default as SearchableSelect } from "./SearchableSelect";
export type { SearchableSelectOption, SearchableSelectProps } from "./SearchableSelect";
