import type { Metadata } from "next";
import { PandazWorkspace } from "@/components/pandaz/PandazWorkspace";

export const metadata: Metadata = { title: "Organize PDF — Pandaz" };
export default function OrganizePage() { return <PandazWorkspace />; }
