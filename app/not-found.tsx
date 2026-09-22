import React from "react";
import ErrorPageContent from "@/components/ErrorPageContent";

export const metadata = {
  title: "404 - Page Not Found | Taj Al Rahmah",
  description: "Ooops Page Not Found. It looks like nothing was found at this location.",
};

export default function NotFound() {
  return <ErrorPageContent />;
}
