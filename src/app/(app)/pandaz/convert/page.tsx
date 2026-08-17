import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "Convert PDF — Pandaz" };
export default function ConvertPage() { return <PandazWorkspace />; }
