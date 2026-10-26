import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitor Analytics & Traffic Intelligence",
  description: "Secure visitor tracking and traffic analytics portal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminVisitorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
