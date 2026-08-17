import type { Metadata } from "next";
import { FormFlow } from "@/components/form-flow/FormFlow";

export const metadata: Metadata = {
  title: "FormFlow",
  description: "Auto-fill Google Forms using saved profiles. Match fields, review, and fill without retyping.",
};

export default function FormFlowPage() {
  return <FormFlow />;
}
