import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = {
  title: "AI Studio",
  description: "Generate professional documents, presentations, reports and research papers with AI.",
};

export default function AIStudioPage() {
  return <AIStudio initialPrompt="" />;
}
