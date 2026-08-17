"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FileType2,
  Merge,
  Scissors,
  Minimize2,
  RotateCcw,
  RefreshCw,
  Image,
  Upload,
  ArrowRight,
  FileText,
  Presentation,
  Table,
  Download,
  Loader2,
  CheckCircle,
  Trash2,
  Eye,
  FilePlus2,
} from "lucide-react";
import { toastSuccess, toastError, toastInfo } from "@/components/ui/Toaster";

const tools = [
  {
    category: "Organize",
    items: [
      { id: "merge", label: "Merge PDF", icon: <Merge size={20} />, description: "Combine multiple PDFs into one", href: "/pandaz/merge", color: "#2563EB" },
      { id: "split", label: "Split PDF", icon: <Scissors size={20} />, description: "Split a PDF into multiple files", href: "/pandaz/split", color: "#7C3AED" },
      { id: "compress", label: "Compress PDF", icon: <Minimize2 size={20} />, description: "Reduce PDF file size", href: "/pandaz/compress", color: "#D97706" },
      { id: "rotate", label: "Rotate & Organize", icon: <RotateCcw size={20} />, description: "Reorder, rotate, delete pages", href: "/pandaz/organize", color: "#0891B2" },
    ],
  },
  {
    category: "Convert",
    items: [
      { id: "pdf-word", label: "PDF → Word", icon: <FileText size={20} />, description: "Convert to editable DOCX", href: "/pandaz/convert", color: "#2563EB", format: "DOCX" },
      { id: "pdf-ppt", label: "PDF → PowerPoint", icon: <Presentation size={20} />, description: "Convert to editable PPTX", href: "/pandaz/convert", color: "#D97706", format: "PPTX" },
      { id: "pdf-excel", label: "PDF → Excel", icon: <Table size={20} />, description: "Extract tables to XLSX", href: "/pandaz/convert", color: "#059669", format: "XLSX" },
      { id: "pdf-csv", label: "PDF → CSV", icon: <Table size={20} />, description: "Extract data to CSV", href: "/smart-extract", color: "#10B981", format: "CSV" },
      { id: "pdf-img", label: "PDF → Images", icon: <Image size={20} />, description: "Export pages as PNG/JPEG", href: "/pandaz/to-images", color: "#DB2777" },
      { id: "img-pdf", label: "Images → PDF", icon: <FilePlus2 size={20} />, description: "Combine images into PDF", href: "/pandaz/convert", color: "#6D28D9" },
    ],
  },
];

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "ready" | "processing" | "done" | "error";
}

export function PandazWorkspace() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeOperation, setActiveOperation] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | File[]) => {
    const newFiles = Array.from(files).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: formatSize(f.size),
      status: "ready" as const,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    toastSuccess(`${newFiles.length} file${newFiles.length > 1 ? "s" : ""} added`);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const simulateOperation = async (operation: string, successMsg: string) => {
    if (uploadedFiles.length === 0) {
      toastError("Please upload at least one PDF first.");
      return;
    }
    setActiveOperation(operation);
    setProgress(0);
    setUploadedFiles((prev) => prev.map((f) => ({ ...f, status: "processing" })));

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
    }

    setUploadedFiles((prev) => prev.map((f) => ({ ...f, status: "done" })));
    setActiveOperation(null);
    toastSuccess(successMsg);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #1D4ED8, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FileType2 size={16} color="white" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Pandaz PDF</h1>
        </div>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Complete PDF toolkit — merge, split, compress, convert, and organize your documents.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
        {/* Tools grid */}
        <div>
          {tools.map((group) => (
            <div key={group.category} style={{ marginBottom: "28px" }}>
              <div style={{
                fontSize: "12px", fontWeight: 700, color: "var(--color-text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px",
              }}>
                {group.category}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {group.items.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    style={{
                      display: "flex",
                      gap: "14px",
                      padding: "18px",
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRadius: "var(--radius-lg)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tool.color + "60";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 8px 24px ${tool.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: "40px", height: "40px",
                        borderRadius: "var(--radius-md)",
                        background: `${tool.color}18`,
                        border: `1px solid ${tool.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: tool.color,
                        flexShrink: 0,
                      }}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "3px" }}>
                        {tool.label}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                        {tool.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upload sidebar */}
        <div style={{ position: "sticky", top: "72px" }}>
          {/* Drop zone */}
          <div
            className="drop-zone"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: "32px 20px",
              textAlign: "center",
              cursor: "pointer",
              borderColor: isDragging ? "var(--color-blue-primary)" : undefined,
              background: isDragging ? "var(--color-blue-glow)" : "var(--color-surface-2)",
              marginBottom: "16px",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              style={{ display: "none" }}
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <Upload size={28} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 12px" }} />
            <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Upload PDFs</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
              Drag & drop or click to browse
              <br />Up to 50MB per file
            </div>
          </div>

          {/* File list */}
          {uploadedFiles.length > 0 && (
            <div className="card" style={{ marginBottom: "16px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Files ({uploadedFiles.length})</span>
                <button onClick={() => setUploadedFiles([])} className="btn-ghost" style={{ padding: "4px", fontSize: "12px", color: "var(--color-rose-accent)" }}>
                  <Trash2 size={13} /> Clear
                </button>
              </div>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <FileType2 size={16} style={{ color: "var(--color-blue-light)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>{file.size}</div>
                  </div>
                  {file.status === "processing" && <Loader2 size={14} style={{ color: "var(--color-blue-primary)", animation: "spin 1s linear infinite", flexShrink: 0 }} />}
                  {file.status === "done" && <CheckCircle size={14} style={{ color: "var(--color-emerald-accent)", flexShrink: 0 }} />}
                </div>
              ))}

              {/* Progress */}
              {activeOperation && (
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                    {activeOperation}... {progress}%
                  </div>
                  <div style={{ height: "4px", background: "var(--color-surface-4)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: "var(--color-blue-primary)", borderRadius: "2px", transition: "width 0.2s ease" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick operations */}
          {uploadedFiles.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => simulateOperation("Merging PDFs", "PDFs merged successfully! Download ready.")}
                className="btn-primary"
                style={{ justifyContent: "center", fontSize: "13px", padding: "10px" }}
                disabled={!!activeOperation}
              >
                <Merge size={14} /> Merge All PDFs
              </button>
              <button
                onClick={() => simulateOperation("Compressing", "PDF compressed — 67% size reduction!")}
                className="btn-secondary"
                style={{ justifyContent: "center", fontSize: "13px" }}
                disabled={!!activeOperation}
              >
                <Minimize2 size={14} /> Compress
              </button>
              <button
                onClick={() => simulateOperation("Converting to DOCX", "PDF converted to Word document!")}
                className="btn-secondary"
                style={{ justifyContent: "center", fontSize: "13px" }}
                disabled={!!activeOperation}
              >
                <RefreshCw size={14} /> Convert to DOCX
              </button>
              {uploadedFiles.some((f) => f.status === "done") && (
                <button className="btn-primary" style={{ justifyContent: "center", fontSize: "13px", padding: "10px", background: "#059669" }}>
                  <Download size={14} /> Download Result
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
