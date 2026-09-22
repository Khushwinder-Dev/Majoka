"use client";

import React, { useEffect } from "react";
import ErrorPageContent from "@/components/ErrorPageContent";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error captured by global-error.tsx:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white overflow-x-hidden antialiased">
        <ErrorPageContent reset={reset} isRuntimeError={true} />
      </body>
    </html>
  );
}
