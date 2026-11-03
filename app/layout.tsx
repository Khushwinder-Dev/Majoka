import type { Metadata } from "next";
import { Geist, Geist_Mono, Anek_Malayalam } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Common/Footer";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/LanguageContext";
import SubscribeModal from "@/components/SubscribeModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anekMalayalam = Anek_Malayalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anek-malayalam",
});

import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://tajalrahmah.com"),
  title: {
    default: "Taj Al Rahmah | Waterproofing, Combo Roofing & Technical Services UAE",
    template: "%s | Taj Al Rahmah Technical Services UAE",
  },
  description:
    "Taj Al Rahmah is the leading waterproofing, combo roof insulation, PU foam spray, swimming pool, MEP contracting, and technical maintenance company across Dubai, Abu Dhabi, Sharjah, and the UAE.",
  keywords: [
    "Taj Alrahmah",
    "Taj Al Rahmah Technical Services",
    "Best waterproofing company Taj Alrahmah UAE",
    "Waterproofing specialist Taj Alrahmah",
    "Professional waterproofing company UAE",
    "Combo Roof Waterproofing",
    "Combo Roof System",
    "Combo System Roof Waterproofing",
    "Roof Waterproofing UAE",
    "Roof Waterproofing Dubai",
    "Roof Insulation Dubai",
    "PU Foam Roof Waterproofing",
    "Polyurethane Foam Roof Insulation",
    "Thermal Roof Insulation",
    "Roof Heat Insulation",
    "Roof Leakage Waterproofing",
    "Seamless Roof Waterproofing System Dubai",
    "Best Combo Roof Waterproofing System in Dubai",
    "GRP Fiberglass Waterproofing",
    "Bitumen Membrane Waterproofing",
    "Epoxy Floor Coating UAE",
    "Polyurea Coating Waterproofing",
    "Concrete Crack Injection Waterproofing",
    "Swimming Pool Construction & Maintenance Dubai",
    "Electrical Installations & Fit-Out UAE",
    "Plumbing & Sanitary Installation Works Dubai",
    "Floor & Wall Tiling Work UAE",
    "Plastering & Rendering Works",
    "Painting Contracting Services Dubai",
    "False Ceiling & Light Partitions Installation",
    "Air Conditioning HVAC Maintenance Dubai",
    "Carpentry & Wood Flooring UAE",
    "Building Cleaning Services Dubai",
    "Technical Services Dubai",
    "Technical Services Abu Dhabi",
    "Technical Services Sharjah",
    "Technical Services Ajman",
    "Technical Services Umm Al Quwain",
    "Technical Services Ras Al Khaimah",
    "Technical Services Fujairah",
  ],
  alternates: {
    canonical: "https://tajalrahmah.com",
    languages: {
      "en-AE": "https://tajalrahmah.com",
      "ar-AE": "https://tajalrahmah.com",
    },
  },
  openGraph: {
    title: "Taj Al Rahmah | Waterproofing, Combo Roofing & Technical Services UAE",
    description:
      "Premier waterproofing, combo roof insulation, PU foam, MEP contracting, and building maintenance services across Dubai, Abu Dhabi, Sharjah, and all UAE.",
    url: "https://tajalrahmah.com",
    siteName: "Taj Al Rahmah Technical Services",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Taj Al Rahmah Technical Services UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taj Al Rahmah | Waterproofing, Combo Roofing & Technical Services UAE",
    description:
      "Premier waterproofing, combo roof thermal insulation, MEP, and facility maintenance in Dubai & across UAE.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Taj Al Rahmah Technical Services",
  alternateName: "تاج الرحمة للخدمات الفنية",
  url: "https://tajalrahmah.com",
  logo: "https://tajalrahmah.com/logo.png",
  telephone: "+971556173300",
  email: "info@tajalrahmah.com",
  description:
    "Taj Al Rahmah specializes in combo roof waterproofing, thermal insulation, GRP lining, swimming pools, MEP, and comprehensive building maintenance across the United Arab Emirates.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
    "United Arab Emirates",
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technical & Contracting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Combo System Roof Waterproofing & Thermal Insulation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GRP & Fiberglass Waterproofing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Swimming Pool Installation & Maintenance",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electrical Installations & Fit-out",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Plumbing & Sanitary Works",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Air Conditioning (HVAC) Maintenance & Repair",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className={`${anekMalayalam.variable} antialiased bg-white overflow-x-hidden!`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
              top: 80, // Adjust this to position below navbar if needed
            }}
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: "14px",
                maxWidth: "500px",
              },
              success: {
                duration: 5000,
                style: {
                  background: "#01a9a0",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#01a9a0",
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "#ef4444",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#ef4444",
                },
              },
              loading: {
                style: {
                  background: "#3b82f6",
                  color: "#fff",
                },
              },
            }}
          />

          <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
