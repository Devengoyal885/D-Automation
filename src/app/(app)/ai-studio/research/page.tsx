import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = { title: "Research Writer — AI Studio" };
export default function ResearchPage() {
  return <AIStudio initialPrompt="" />;
}
