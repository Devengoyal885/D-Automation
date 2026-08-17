import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "D-Automation — AI-Powered Documents, PDFs & Data Automation",
    template: "%s | D-Automation",
  },
  description:
    "D-Automation is a unified AI productivity platform for creating documents, processing PDFs, extracting business data, and automating repetitive workflows.",
  keywords: [
    "AI document generation",
    "PDF tools",
    "PDF to CSV",
    "business automation",
    "SmartExtract",
    "FormFlow",
  ],
  authors: [{ name: "D-Automation" }],
};

// viewport and themeColor must be exported separately in Next.js 15
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F1E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
