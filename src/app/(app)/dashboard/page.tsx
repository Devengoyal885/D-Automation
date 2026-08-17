import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your D-Automation workspace. Create documents, process PDFs, extract data, and automate workflows.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
