import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "Compress PDF — Pandaz" };
export default function CompressPage() { return <PandazWorkspace />; }
