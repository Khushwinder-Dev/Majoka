"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Common/Footer";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import SubscribeModal from "@/components/SubscribeModal";
import VisitorTracker from "@/components/VisitorTracker";

export default function SiteLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <>
      <VisitorTracker />
      <Navbar />
      {children}
      <Footer />
      <FloatingChatWidget />
      <SubscribeModal />
    </>
  );
}
