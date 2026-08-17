import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = { title: "Reports — AI Studio" };
export default function ReportsPage() {
  return <AIStudio initialPrompt="" />;
}
