"use client";

import { useState } from "react";
import {
  Grid3X3,
  Upload,
  Plus,
  FileText,
  Presentation,
  BookOpen,
  Building,
  Eye,
  Download,
  Star,
  StarOff,
  Search,
} from "lucide-react";
import { toastSuccess, toastInfo } from "@/components/ui/Toaster";

const templates = [
  {
    id: "t1",
    name: "Chandigarh University Research Paper",
    type: "Academic",
    icon: <BookOpen size={20} />,
    color: "#2563EB",
    tags: ["APA", "Academic", "University"],
    description: "Official CU research paper template with correct margins, headings, and citation format.",
    starred: true,
    fields: { font: "Times New Roman 12pt", heading: "APA 7th", margins: "1 inch all sides", citations: "APA" },
  },
  {
    id: "t2",
    name: "Business Proposal",
    type: "Business",
    icon: <Building size={20} />,
    color: "#7C3AED",
    tags: ["Professional", "DOCX", "Business"],
    description: "Corporate-style business proposal with executive summary, problem statement, solution, and ROI.",
    starred: false,
    fields: { font: "Inter 11pt", heading: "Heading 1-3", margins: "1.25 inch", citations: "Chicago" },
  },
  {
    id: "t3",
    name: "Technical Report",
    type: "Technical",
    icon: <FileText size={20} />,
    color: "#059669",
    tags: ["IEEE", "Technical", "Engineering"],
    description: "IEEE-style technical report with abstract, methodology, results, discussion sections.",
    starred: true,
    fields: { font: "Times New Roman 10pt", heading: "IEEE", margins: "0.75 inch", citations: "IEEE" },
  },
  {
    id: "t4",
    name: "Modern Presentation",
    type: "Presentation",
    icon: <Presentation size={20} />,
    color: "#D97706",
    tags: ["PPTX", "Slides", "Modern"],
    description: "Clean dark-theme presentation template with branded colors and slide layouts.",
    starred: false,
    fields: { slides: "16:9", theme: "Dark Professional", layout: "Content + Images", font: "Inter" },
  },
];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [starred, setStarred] = useState<string[]>(templates.filter((t) => t.starred).map((t) => t.id));
  const [selectedType, setSelectedType] = useState("All");

  const types = ["All", "Academic", "Business", "Technical", "Presentation"];
  const filtered = templates.filter((t) =>
    (selectedType === "All" || t.type === selectedType) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>Templates</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            Upload your institution&apos;s template or choose a built-in one to generate branded documents.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => toastInfo("Template upload — select a PPTX, DOCX, or PDF")} className="btn-secondary" style={{ fontSize: "13px" }}>
            <Upload size={14} /> Upload Template
          </button>
          <button onClick={() => toastInfo("Custom template builder opening...")} className="btn-primary" style={{ fontSize: "13px" }}>
            <Plus size={14} /> Create Template
          </button>
        </div>
      </div>

      {/* Search + filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-tertiary)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="input" style={{ paddingLeft: "36px", fontSize: "13px" }} />
        </div>
        <div style={{ display: "flex", gap: "4px", background: "var(--color-surface-2)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)" }}>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 500, background: selectedType === type ? "var(--color-blue-primary)" : "transparent", color: selectedType === type ? "white" : "var(--color-text-secondary)", transition: "all 0.15s ease" }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {filtered.map((template) => (
          <div key={template.id} className="card" style={{ padding: "20px", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${template.color}15`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = ""; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-md)", background: `${template.color}18`, border: `1px solid ${template.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: template.color }}>
                {template.icon}
              </div>
              <button
                onClick={() => setStarred((p) => p.includes(template.id) ? p.filter((x) => x !== template.id) : [...p, template.id])}
                className="btn-ghost"
                style={{ padding: "4px", color: starred.includes(template.id) ? "#F59E0B" : "var(--color-text-tertiary)" }}
              >
                {starred.includes(template.id) ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
              </button>
            </div>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>{template.name}</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "10px", lineHeight: 1.5 }}>{template.description}</div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "14px" }}>
              {template.tags.map((tag) => (
                <span key={tag} className="badge badge-blue" style={{ fontSize: "10px" }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              <button onClick={() => toastSuccess(`Template "${template.name}" applied!`)} className="btn-primary" style={{ fontSize: "12px", padding: "7px 10px", justifyContent: "center" }}>
                Use Template
              </button>
              <button onClick={() => toastInfo("Preview loading...")} className="btn-secondary" style={{ fontSize: "12px", padding: "7px 10px", justifyContent: "center" }}>
                <Eye size={13} /> Preview
              </button>
            </div>
          </div>
        ))}

        {/* Upload card */}
        <div
          onClick={() => toastInfo("Upload your institution's template (PPTX, DOCX, PDF)")}
          style={{ border: "2px dashed var(--color-border-default)", borderRadius: "var(--radius-lg)", padding: "32px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer", textAlign: "center", transition: "all 0.2s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-blue-primary)"; e.currentTarget.style.background = "var(--color-blue-glow)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-default)"; e.currentTarget.style.background = "transparent"; }}
        >
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-surface-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Upload size={20} style={{ color: "var(--color-text-tertiary)" }} />
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600 }}>Upload Your Template</div>
          <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>PPTX, DOCX, or PDF — AI analyzes fonts, colors, structure</div>
        </div>
      </div>
    </div>
  );
}
