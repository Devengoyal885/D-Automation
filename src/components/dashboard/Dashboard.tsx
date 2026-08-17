"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  ArrowRight,
  FileText,
  Presentation,
  FileType2,
  Table2,
  Zap,
  Grid3X3,
  Pencil,
  Clock,
  Download,
  Trash2,
  MoreHorizontal,
  FilePlus2,
  Activity,
  TrendingUp,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { toastSuccess } from "@/components/ui/Toaster";

const quickActions = [
  {
    id: "create-doc",
    title: "Create Document",
    description: "Generate with AI",
    icon: <FileText size={20} />,
    href: "/ai-studio/documents",
    color: "#2563EB",
    gradient: "linear-gradient(135deg, #1D4ED8, #2563EB)",
  },
  {
    id: "create-pres",
    title: "Create Presentation",
    description: "AI-powered slides",
    icon: <Presentation size={20} />,
    href: "/ai-studio/presentations",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #6D28D9, #7C3AED)",
  },
  {
    id: "convert-pdf",
    title: "Convert PDF",
    description: "Word, Excel, Images",
    icon: <RefreshCw size={20} />,
    href: "/pandaz/convert",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0E7490, #0891B2)",
  },
  {
    id: "smart-extract",
    title: "SmartExtract",
    description: "PDF → clean CSV data",
    icon: <Table2 size={20} />,
    href: "/smart-extract",
    color: "#059669",
    gradient: "linear-gradient(135deg, #047857, #059669)",
    badge: "NEW",
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Merge, split, compress",
    icon: <Pencil size={20} />,
    href: "/pandaz",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #B45309, #D97706)",
  },
  {
    id: "form-flow",
    title: "FormFlow",
    description: "Auto-fill Google Forms",
    icon: <Zap size={20} />,
    href: "/form-flow",
    color: "#DB2777",
    gradient: "linear-gradient(135deg, #BE185D, #DB2777)",
  },
  {
    id: "templates",
    title: "Use Template",
    description: "Your saved templates",
    icon: <Grid3X3 size={20} />,
    href: "/templates",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #5B21B6, #7C3AED)",
  },
];

const recentFiles = [
  { id: "1", name: "Smart Parking System Proposal.docx", type: "DOCX", modified: "2 hours ago", status: "Generated", statusColor: "#10B981" },
  { id: "2", name: "Q3 Invoice Analysis.csv", type: "CSV", modified: "5 hours ago", status: "Extracted", statusColor: "#3B82F6" },
  { id: "3", name: "AI Research Presentation.pptx", type: "PPTX", modified: "Yesterday", status: "Generated", statusColor: "#10B981" },
  { id: "4", name: "Company Report 2025.pdf", type: "PDF", modified: "Yesterday", status: "Converted", statusColor: "#F59E0B" },
  { id: "5", name: "Billing Statement Oct.csv", type: "CSV", modified: "2 days ago", status: "Extracted", statusColor: "#3B82F6" },
];

const recentActivity = [
  { id: "1", action: "Generated Research Paper", detail: "AI Traffic Management System", time: "2h ago", icon: <Sparkles size={14} />, color: "#7C3AED" },
  { id: "2", action: "Extracted invoice.pdf → CSV", detail: "SmartExtract • 3 tables found", time: "5h ago", icon: <Table2 size={14} />, color: "#10B981" },
  { id: "3", action: "Compressed report.pdf", detail: "Pandaz • 68% size reduction", time: "Yesterday", icon: <FileType2 size={14} />, color: "#F59E0B" },
  { id: "4", action: "Generated Presentation", detail: "Smart City Infrastructure", time: "Yesterday", icon: <Presentation size={14} />, color: "#2563EB" },
  { id: "5", action: "FormFlow profile created", detail: "College Profile • 12 fields", time: "2 days ago", icon: <Zap size={14} />, color: "#DB2777" },
];

const fileTypeColors: Record<string, string> = {
  DOCX: "#2563EB",
  PPTX: "#D97706",
  PDF: "#F43F5E",
  CSV: "#10B981",
  XLSX: "#059669",
};

export function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragModal, setDragModal] = useState(false);
  const [droppedFile, setDroppedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    window.location.href = `/ai-studio?prompt=${encodeURIComponent(prompt)}`;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setDroppedFile(file.name);
      setDragModal(true);
    }
  };

  const stats = [
    { label: "Documents Created", value: "24", icon: <FileText size={16} />, change: "+3 this week" },
    { label: "PDFs Processed", value: "87", icon: <FileType2 size={16} />, change: "+12 this week" },
    { label: "Data Extractions", value: "31", icon: <Table2 size={16} />, change: "+5 this week" },
    { label: "Forms Filled", value: "18", icon: <Zap size={16} />, change: "+2 this week" },
  ];

  return (
    <div
      style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(37, 99, 235, 0.12)",
            border: "2px dashed var(--color-blue-primary)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <div style={{ textAlign: "center", color: "var(--color-blue-light)" }}>
            <Upload size={48} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: "24px", fontWeight: 700 }}>Drop your file</div>
            <div style={{ fontSize: "16px", opacity: 0.8 }}>Release to open with D-Automation</div>
          </div>
        </div>
      )}

      {/* File drop modal */}
      {dragModal && droppedFile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setDragModal(false)}
        >
          <div
            className="card"
            style={{ padding: "32px", minWidth: "380px", maxWidth: "480px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "4px" }}>
                File dropped
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600, wordBreak: "break-word" }}>
                {droppedFile}
              </div>
            </div>
            <div style={{ marginBottom: "8px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: 500 }}>
              What would you like to do?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Edit PDF", href: "/pandaz", icon: <Pencil size={16} /> },
                { label: "Convert", href: "/pandaz/convert", icon: <RefreshCw size={16} /> },
                { label: "Extract Data (SmartExtract)", href: "/smart-extract", icon: <Table2 size={16} /> },
                { label: "Summarize with AI", href: "/ai-studio", icon: <Sparkles size={16} /> },
                { label: "Generate Presentation", href: "/ai-studio/presentations", icon: <Presentation size={16} /> },
                { label: "Ask AI", href: "/ai-studio", icon: <Sparkles size={16} /> },
              ].map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  onClick={() => setDragModal(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    background: "var(--color-surface-3)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "background 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-surface-4)";
                    e.currentTarget.style.borderColor = "var(--color-border-default)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-surface-3)";
                    e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                  }}
                >
                  <span style={{ color: "var(--color-text-tertiary)" }}>{action.icon}</span>
                  {action.label}
                  <ArrowRight size={14} style={{ marginLeft: "auto", color: "var(--color-text-tertiary)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "6px", color: "var(--color-text-primary)" }}>
          What do you want to create or automate?
        </h1>
        <p style={{ fontSize: "15px", color: "var(--color-text-secondary)" }}>
          AI documents, PDF processing, data extraction — all in one workspace.
        </p>
      </div>

      {/* AI Command Box */}
      <div
        style={{
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-xl)",
          padding: "20px",
          marginBottom: "32px",
          boxShadow: "var(--shadow-panel)",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            <Sparkles size={18} color="white" />
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Create a professional research report on AI-powered traffic management..."
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleGenerate(); }}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: "15px",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.6,
              minHeight: "52px",
              maxHeight: "200px",
            }}
            rows={2}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--color-border-subtle)",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["Research Paper", "Business Proposal", "Presentation", "Report", "Assignment"].map((type) => (
              <button
                key={type}
                onClick={() => setPrompt((p) => p ? p : `Create a ${type.toLowerCase()} on `)}
                className="btn-ghost"
                style={{ fontSize: "12px", padding: "5px 10px", border: "1px solid var(--color-border-subtle)" }}
              >
                {type}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx,.pptx,.txt"
              onChange={() => toastSuccess("File uploaded — processing...")}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
              style={{ fontSize: "13px", padding: "8px 16px" }}
            >
              <Upload size={14} />
              Upload File
            </button>
            <button
              onClick={handleGenerate}
              className="btn-primary"
              disabled={!prompt.trim()}
              style={{ fontSize: "13px", padding: "8px 20px", opacity: prompt.trim() ? 1 : 0.5 }}
            >
              <Sparkles size={14} />
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ color: "var(--color-text-tertiary)" }}>{stat.icon}</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={11} style={{ color: "var(--color-emerald-accent)" }} />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Quick Actions
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {quickActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "20px",
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
                textDecoration: "none",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color + "60";
                e.currentTarget.style.background = "var(--color-surface-3)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${action.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                e.currentTarget.style.background = "var(--color-surface-2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-md)",
                  background: action.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {action.icon}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "2px" }}>
                  {action.title}
                  {action.badge && (
                    <span className="badge badge-emerald" style={{ marginLeft: "6px", fontSize: "9px" }}>
                      {action.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                  {action.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two-column layout: Recent Files + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
        {/* Recent Files */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Recent Files
            </h2>
            <Link href="/files" style={{ fontSize: "13px", color: "var(--color-blue-light)", textDecoration: "none" }}>
              View all
            </Link>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Name</th>
                  <th className="hide-mobile" style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)", width: "80px" }}>Type</th>
                  <th className="hide-mobile" style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)", width: "120px" }}>Modified</th>
                  <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)", width: "100px" }}>Status</th>
                  <th style={{ width: "60px" }}></th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file, i) => (
                  <tr
                    key={file.id}
                    style={{
                      borderBottom: i < recentFiles.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                      transition: "background 0.1s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "var(--radius-sm)",
                            background: `${fileTypeColors[file.type] || "#6B7280"}18`,
                            border: `1px solid ${fileTypeColors[file.type] || "#6B7280"}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "9px",
                            fontWeight: 700,
                            color: fileTypeColors[file.type] || "#6B7280",
                            flexShrink: 0,
                          }}
                        >
                          {file.type}
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)" }}>
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="hide-mobile" style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: `${fileTypeColors[file.type] || "#6B7280"}15`,
                          color: fileTypeColors[file.type] || "#6B7280",
                        }}
                      >
                        {file.type}
                      </span>
                    </td>
                    <td className="hide-mobile" style={{ padding: "14px 20px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} />
                        {file.modified}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: file.statusColor }}>
                        <CheckCircle size={12} />
                        {file.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                        <button className="btn-ghost" style={{ padding: "4px" }} aria-label="Download">
                          <Download size={14} />
                        </button>
                        <button className="btn-ghost" style={{ padding: "4px" }} aria-label="More actions">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Recent Activity
            </h2>
            <Link href="/history" style={{ fontSize: "13px", color: "var(--color-blue-light)", textDecoration: "none" }}>
              View all
            </Link>
          </div>
          <div className="card" style={{ padding: "8px" }}>
            {recentActivity.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  transition: "background 0.15s ease",
                  alignItems: "flex-start",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: item.color + "20",
                    border: `1px solid ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "2px" }}>
                    {item.action}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "4px" }}>
                    {item.detail}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={10} />{item.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state trigger */}
            <div style={{ padding: "12px", borderTop: "1px solid var(--color-border-subtle)", marginTop: "4px" }}>
              <Link
                href="/ai-studio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "var(--color-blue-light)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                <FilePlus2 size={14} />
                Create new document
                <ArrowRight size={13} style={{ marginLeft: "auto" }} />
              </Link>
            </div>
          </div>

          {/* SmartExtract promo */}
          <div
            style={{
              marginTop: "16px",
              background: "linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(16, 185, 129, 0.05))",
              border: "1px solid rgba(5, 150, 105, 0.25)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Table2 size={18} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-primary)" }}>SmartExtract</span>
              <span className="badge badge-emerald" style={{ fontSize: "9px" }}>NEW</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "12px", lineHeight: 1.5 }}>
              Turn business PDFs into clean, usable data. Remove unwanted content before CSV export.
            </p>
            <Link href="/smart-extract" className="btn-primary" style={{ fontSize: "13px", padding: "8px 16px", background: "#059669", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Activity size={14} />
              Extract Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
