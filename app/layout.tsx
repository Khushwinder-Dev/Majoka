import type { Metadata } from "next";
import { Geist, Geist_Mono, Anek_Malayalam } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Common/Footer";
import FloatingChatWidget from "@/components/Common/FloatingChatWidget";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/LanguageContext";

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

export const metadata: Metadata = {
  title: "Taj Al Rahmah",
  description: "Professional contracting and technical services in Dubai, UAE",
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
                  padding: "16px",
                  borderRadius: "8px",
                },
              },
            }}
          />

          <Navbar />
          {children}
          <Footer />

          {/* Global Floating Chat & Call Widget */}
          <FloatingChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
