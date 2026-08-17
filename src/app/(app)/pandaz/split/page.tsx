import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "Split PDF — Pandaz" };
export default function SplitPage() { return <PandazWorkspace />; }
