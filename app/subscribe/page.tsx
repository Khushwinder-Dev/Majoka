import React from "react";
import type { Metadata } from "next";
import SubscribePageContent from "@/components/SubscribePageContent";

export const metadata: Metadata = {
  title: "Subscribe to Marketing Communications | Taj Al Rahmah Contracting UAE",
  description:
    "Subscribe to receive marketing communications, technical updates, project insights, and company announcements from Taj Al Rahmah Technical Services LLC.",
  keywords: [
    "Taj Al Rahmah newsletter",
    "subscribe Taj Al Rahmah",
    "waterproofing updates UAE",
    "construction technical insights Dubai",
  ],
};

export default function SubscribePage() {
  return <SubscribePageContent />;
}
