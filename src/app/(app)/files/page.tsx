"use client";

import { useState } from "react";
import { FolderOpen, Search, Download, Trash2, MoreHorizontal, Clock, Filter } from "lucide-react";
import { toastSuccess } from "@/components/ui/Toaster";

const allFiles = [
  { id: "1", name: "Smart Parking System Proposal.docx", type: "DOCX", size: "245 KB", modified: "2h ago", category: "Generated" },
  { id: "2", name: "Q3 Invoice Analysis.csv", type: "CSV", size: "18 KB", modified: "5h ago", category: "Extracted" },
  { id: "3", name: "AI Research Presentation.pptx", type: "PPTX", size: "3.2 MB", modified: "Yesterday", category: "Generated" },
  { id: "4", name: "Company Report 2025.pdf", type: "PDF", size: "1.8 MB", modified: "Yesterday", category: "Uploaded" },
  { id: "5", name: "Billing Statement Oct.csv", type: "CSV", size: "12 KB", modified: "2 days ago", category: "Extracted" },
  { id: "6", name: "Patent Draft — AI Traffic.docx", type: "DOCX", size: "320 KB", modified: "3 days ago", category: "Generated" },
  { id: "7", name: "Compressed Report Final.pdf", type: "PDF", size: "890 KB", modified: "4 days ago", category: "Processed" },
  { id: "8", name: "Team Project Presentation.pptx", type: "PPTX", size: "5.1 MB", modified: "1 week ago", category: "Generated" },
];

const typeColors: Record<string, string> = { DOCX: "#2563EB", PPTX: "#D97706", PDF: "#F43F5E", CSV: "#10B981", XLSX: "#059669" };
const categories = ["All", "Generated", "Uploaded", "Extracted", "Processed"];

export default function FilesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const types = ["All", "PDF", "DOCX", "PPTX", "CSV", "XLSX"];

  const filtered = allFiles.filter((f) =>
    (category === "All" || f.category === category) &&
    (selectedType === "All" || f.type === selectedType) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>My Files</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>{allFiles.length} files in your workspace</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-tertiary)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="input" style={{ paddingLeft: "36px", fontSize: "13px" }} />
        </div>
        <div style={{ display: "flex", gap: "4px", background: "var(--color-surface-2)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ padding: "5px 12px", borderRadius: "var(--radius-sm)", border: "none", cursor: "pointer", fontSize: "12px", background: category === cat ? "var(--color-blue-primary)" : "transparent", color: category === cat ? "white" : "var(--color-text-secondary)", transition: "all 0.15s" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "4px", background: "var(--color-surface-2)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)" }}>
          {types.map((type) => (
            <button key={type} onClick={() => setSelectedType(type)} style={{ padding: "5px 10px", borderRadius: "var(--radius-sm)", border: "none", cursor: "pointer", fontSize: "12px", background: selectedType === type ? "var(--color-surface-4)" : "transparent", color: selectedType === type ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "all 0.15s" }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-surface-3)" }}>
              {["Name", "Type", "Category", "Size", "Modified", ""].map((h) => (
                <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((file, i) => (
              <tr
                key={file.id}
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--color-border-subtle)" : "none", transition: "background 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "var(--radius-sm)", background: `${typeColors[file.type] || "#6B7280"}18`, border: `1px solid ${typeColors[file.type] || "#6B7280"}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: typeColors[file.type] || "#6B7280", flexShrink: 0 }}>
                      {file.type}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>{file.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, background: `${typeColors[file.type] || "#6B7280"}15`, color: typeColors[file.type] || "#6B7280" }}>{file.type}</span>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span className="badge badge-blue" style={{ fontSize: "10px" }}>{file.category}</span>
                </td>
                <td style={{ padding: "14px 20px", fontSize: "13px", color: "var(--color-text-secondary)" }}>{file.size}</td>
                <td style={{ padding: "14px 20px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={12} />{file.modified}
                  </span>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    <button onClick={() => toastSuccess(`Downloading ${file.name}...`)} className="btn-ghost" style={{ padding: "5px" }}>
                      <Download size={14} />
                    </button>
                    <button onClick={() => toastSuccess(`${file.name} deleted.`)} className="btn-ghost" style={{ padding: "5px", color: "var(--color-rose-accent)" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--color-text-tertiary)" }}>
            <FolderOpen size={32} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 600 }}>No files found</div>
          </div>
        )}
      </div>
    </div>
  );
}
