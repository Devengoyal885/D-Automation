import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = {
  title: "Pandaz PDF",
  description: "Complete PDF toolkit — merge, split, compress, rotate, convert, and organize PDF documents.",
};

export default function PandazPage() {
  return <PandazWorkspace />;
}
