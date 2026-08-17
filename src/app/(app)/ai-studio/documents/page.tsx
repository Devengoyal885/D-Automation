import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = { title: "Create Document — AI Studio" };
export default function DocsPage() {
  return <AIStudio initialPrompt="" />;
}
