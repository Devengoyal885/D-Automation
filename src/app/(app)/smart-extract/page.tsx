import type { Metadata } from "next";
import { SmartExtract } from "@/components/smart-extract/SmartExtract";

export const metadata: Metadata = {
  title: "SmartExtract",
  description: "Turn business PDFs into clean, structured CSV data. Remove unwanted content and export with calculations.",
};

export default function SmartExtractPage() {
  return <SmartExtract />;
}
