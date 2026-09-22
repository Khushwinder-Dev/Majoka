"use client";

import React, { useEffect } from "react";
import ErrorPageContent from "@/components/ErrorPageContent";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for debugging
    console.error("Application error captured by app/error.tsx:", error);
  }, [error]);

  return <ErrorPageContent reset={reset} isRuntimeError={true} />;
}
