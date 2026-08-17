import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = { title: "Create Presentation — AI Studio" };
export default function PresentationsPage() {
  return <AIStudio initialPrompt="" />;
}
