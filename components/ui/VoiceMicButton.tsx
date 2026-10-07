"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Mic } from "lucide-react";
import toast from "react-hot-toast";

export type VoiceFieldType = "text" | "email" | "phone" | "number" | "textarea";

export interface UseVoiceInputOptions {
  isArabic?: boolean;
  onResult: (fieldName: string, text: string, type?: VoiceFieldType) => void;
}

export function useVoiceInput({ isArabic = false, onResult }: UseVoiceInputOptions) {
  const [listeningField, setListeningField] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const toggleListening = useCallback(
    (fieldName: string, type: VoiceFieldType = "text") => {
      if (typeof window === "undefined") return;

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        toast.error(
          isArabic
            ? "خاصية الإدخال الصوتي غير مدعومة في هذا المتصفح. يرجى استخدام متصفح Chrome أو Edge أو Safari."
            : "Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.",
          { duration: 4000 }
        );
        return;
      }

      if (listeningField === fieldName) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {}
        }
        setListeningField(null);
        return;
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = isArabic ? "ar-AE" : "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setListeningField(fieldName);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript || "";
          if (!transcript) return;

          let formattedText = transcript.trim();

          if (type === "email") {
            formattedText = formattedText
              .toLowerCase()
              .replace(/\s*(?:at\s+the\s+rate\s+(?:of\s+)?|at\s+the\s+rate|at\s+rate|@\s*the\s*rate\s*(?:of\s*)?|@\s*the\s*rate|@\s*rate|@therate)\s*/gi, "@")
              .replace(/\s+at\s+/gi, "@")
              .replace(/\s*(?:آت|ات|علامة\s+آت)\s*/g, "@")
              .replace(/\s*(?:dot|point|نقطة|دوت)\s*/gi, ".")
              .replace(/\s*(?:underscore|اندرسكور|شرطة\s*سفلية)\s*/gi, "_")
              .replace(/\s*(?:dash|hyphen)\s*/gi, "-")
              .replace(/@(?:the\s*rate\s*(?:of\s*)?|rate\s*)/gi, "@")
              .replace(/\s+/g, "")
              .replace(/@+/g, "@")
              .replace(/\.+/g, ".")
              .replace(/\.+$/, "");
          } else if (type === "phone") {
            formattedText = formattedText.replace(/[^\d+\s-]/g, "").trim();
          } else if (type === "number") {
            // Convert spoken numbers
            formattedText = formattedText.replace(/[^\d]/g, "").trim();
          }

          onResult(fieldName, formattedText, type);

          toast.success(
            isArabic ? "تم إدخال الصوت بنجاح!" : "Voice input captured!",
            {
              duration: 2500,
              iconTheme: { primary: "#01a9a0", secondary: "#fff" },
            }
          );
        };

        recognition.onerror = (event: any) => {
          setListeningField(null);
          if (event.error === "not-allowed" || event.error === "service-not-allowed") {
            toast.error(
              isArabic
                ? "يرجى السماح بالوصول إلى الميكروفون في إعدادات المتصفح."
                : "Please allow microphone access in your browser settings.",
              { duration: 4000 }
            );
          } else if (event.error !== "aborted" && event.error !== "no-speech") {
            toast.error(
              isArabic
                ? "تعذر التعرف على الصوت. يرجى المحاولة مجدداً."
                : "Speech recognition failed. Please try again.",
              { duration: 3000 }
            );
          }
        };

        recognition.onend = () => {
          setListeningField(null);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setListeningField(null);
      }
    },
    [isArabic, listeningField, onResult]
  );

  const isFieldActive = useCallback(
    (fieldName: string) => focusedField === fieldName || listeningField === fieldName,
    [focusedField, listeningField]
  );

  return {
    listeningField,
    toggleListening,
    setListeningField,
    focusedField,
    setFocusedField,
    isFieldActive,
  };
}

export interface VoiceMicButtonProps {
  isListening: boolean;
  onClick: () => void;
  isArabic?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
  title?: string;
  visible?: boolean;
}

export function VoiceMicButton({
  isListening,
  onClick,
  isArabic = false,
  disabled = false,
  className = "",
  size = "md",
  title,
  visible,
}: VoiceMicButtonProps) {
  // If visible is explicitly passed and false (and not currently listening), do not render
  if (visible !== undefined && !visible && !isListening) {
    return null;
  }

  const sizeClasses = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const defaultTitle = isListening
    ? isArabic
      ? "جارٍ الاستماع... انقر للإيقاف"
      : "Listening... Click to stop"
    : isArabic
    ? "انقر للتحدث بالصوت"
    : "Click to speak";

  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title || defaultTitle}
      className={`relative ${sizeClasses} rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
        isListening
          ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
          : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
      } disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {isListening && (
        <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
      )}
      <Mic className={`${iconSize} relative z-10 ${isListening ? "animate-pulse" : ""}`} />
    </button>
  );
}

export function VoiceListeningBadge({
  isArabic = false,
  customText,
}: {
  isArabic?: boolean;
  customText?: string;
}) {
  return (
    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
      <span>
        {customText || (isArabic ? "جارٍ الاستماع... تحدث الآن" : "Listening... speak now")}
      </span>
    </p>
  );
}
