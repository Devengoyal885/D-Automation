import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "PDF to Images — Pandaz" };
export default function ToImagesPage() { return <PandazWorkspace />; }
