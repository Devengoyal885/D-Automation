import type { Metadata } from "next";
import { AIStudio } from "@/components/ai-studio/AIStudio";

export const metadata: Metadata = { title: "Patent Assistant — AI Studio" };
export default function PatentPage() {
  return <AIStudio initialPrompt="" />;
}
