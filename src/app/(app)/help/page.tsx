"use client";

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

const helpTopics = [
  { title: "Getting Started with AI Studio", desc: "Learn how to generate documents, presentations, and reports with AI.", href: "#ai-studio" },
  { title: "Using SmartExtract", desc: "Extract structured data from PDF invoices and business documents.", href: "#smart-extract" },
  { title: "Setting up FormFlow", desc: "Create profiles and auto-fill Google Forms.", href: "#form-flow" },
  { title: "Pandaz PDF Guide", desc: "Merge, split, compress, and convert PDFs.", href: "#pandaz" },
  { title: "Template Intelligence", desc: "Upload your institution's template for branded documents.", href: "#templates" },
  { title: "API & Integrations", desc: "Connect your Gemini API key and other integrations.", href: "#api" },
];

export default function HelpPage() {
  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Help & Documentation</h1>
      <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", marginBottom: "32px" }}>
        Find guides, tutorials, and answers to common questions.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {helpTopics.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="card"
            style={{ padding: "20px", cursor: "pointer", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-border-default)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-subtle)"; }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px", color: "var(--color-text-primary)" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{item.desc}</div>
            </div>
            <ArrowRight size={16} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </div>
  );
}
