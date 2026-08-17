import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "Merge PDF — Pandaz" };
export default function MergePage() { return <PandazWorkspace />; }
