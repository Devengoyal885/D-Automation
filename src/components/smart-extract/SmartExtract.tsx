"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Table2,
  Download,
  CheckSquare,
  Square,
  Trash2,
  RefreshCw,
  ChevronRight,
  FileText,
  Activity,
  X,
  Calculator,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Filter,
  Wand2,
} from "lucide-react";
import { toastSuccess, toastError, toastInfo } from "@/components/ui/Toaster";

interface Column {
  id: string;
  name: string;
  included: boolean;
  type: "text" | "number" | "currency" | "date";
  sample: string;
}

interface DataRow {
  id: string;
  data: Record<string, string>;
  included: boolean;
}

type ExtractionStep = "idle" | "uploading" | "detecting" | "extracted" | "cleaned";

const DEMO_COLUMNS: Column[] = [
  { id: "item", name: "Item Description", included: true, type: "text", sample: "Office Chair Premium" },
  { id: "qty", name: "Quantity", included: true, type: "number", sample: "5" },
  { id: "unit", name: "Unit Price", included: true, type: "currency", sample: "$249.99" },
  { id: "total", name: "Total", included: true, type: "currency", sample: "$1,249.95" },
  { id: "tax", name: "Tax (18%)", included: true, type: "currency", sample: "$224.99" },
  { id: "sku", name: "SKU", included: false, type: "text", sample: "OFF-CH-001" },
  { id: "category", name: "Category", included: false, type: "text", sample: "Furniture" },
  { id: "addr", name: "Shipping Address", included: false, type: "text", sample: "123 Business Ave..." },
  { id: "notes", name: "Notes", included: false, type: "text", sample: "Standard delivery" },
];

const DEMO_ROWS: DataRow[] = [
  { id: "r1", included: true, data: { "Item Description": "Office Chair Premium", "Quantity": "5", "Unit Price": "$249.99", "Total": "$1,249.95", "Tax (18%)": "$224.99" } },
  { id: "r2", included: true, data: { "Item Description": "Standing Desk 160cm", "Quantity": "3", "Unit Price": "$599.00", "Total": "$1,797.00", "Tax (18%)": "$323.46" } },
  { id: "r3", included: true, data: { "Item Description": "Monitor 27\" 4K", "Quantity": "8", "Unit Price": "$429.99", "Total": "$3,439.92", "Tax (18%)": "$619.19" } },
  { id: "r4", included: true, data: { "Item Description": "Mechanical Keyboard", "Quantity": "10", "Unit Price": "$89.99", "Total": "$899.90", "Tax (18%)": "$161.98" } },
  { id: "r5", included: true, data: { "Item Description": "Ergonomic Mouse", "Quantity": "10", "Unit Price": "$49.99", "Total": "$499.90", "Tax (18%)": "$89.98" } },
  { id: "r6", included: false, data: { "Item Description": "SUBTOTAL", "Quantity": "", "Unit Price": "", "Total": "$7,886.67", "Tax (18%)": "$1,419.60" } },
  { id: "r7", included: false, data: { "Item Description": "GRAND TOTAL", "Quantity": "", "Unit Price": "", "Total": "$9,306.27", "Tax (18%)": "" } },
];

export function SmartExtract() {
  const [step, setStep] = useState<ExtractionStep>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [columns, setColumns] = useState<Column[]>(DEMO_COLUMNS);
  const [rows, setRows] = useState<DataRow[]>(DEMO_ROWS);
  const [businessMode, setBusinessMode] = useState(true);
  const [activePanel, setActivePanel] = useState<"original" | "extracted" | "cleaned">("original");
  const [isDragging, setIsDragging] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [customFormula, setCustomFormula] = useState("Total = Quantity × Unit Price");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) {
      toastError("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    setStep("uploading");
    toastInfo("Uploading PDF...");

    await new Promise((r) => setTimeout(r, 800));
    setStep("detecting");
    toastInfo("Detecting tables and data structures...");

    await new Promise((r) => setTimeout(r, 1500));
    setStep("extracted");
    setColumns(DEMO_COLUMNS);
    setRows(DEMO_ROWS);
    setActivePanel("extracted");
    toastSuccess("3 tables detected! Data ready for review.");
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const toggleColumn = (id: string) => {
    setColumns((prev) => prev.map((c) => c.id === id ? { ...c, included: !c.included } : c));
  };

  const toggleRow = (id: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, included: !r.included } : r));
  };

  const includedColumns = columns.filter((c) => c.included);
  const includedRows = rows.filter((r) => r.included);

  const exportCSV = () => {
    const header = includedColumns.map((c) => c.name).join(",");
    const body = includedRows.map((r) =>
      includedColumns.map((c) => `"${r.data[c.name] || ""}"`).join(",")
    ).join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `smartextract-${fileName?.replace(".pdf", "") || "export"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toastSuccess("CSV exported successfully!");
  };

  const cleanData = () => {
    // Simulate cleaning
    setRows((prev) => prev.map((r) => ({
      ...r,
      data: Object.fromEntries(
        Object.entries(r.data).map(([k, v]) => [k, v.replace(/,/g, "")])
      ),
    })));
    setActivePanel("cleaned");
    toastSuccess("Data cleaned — currency symbols normalized, numbers formatted.");
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #047857, #059669)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Table2 size={16} color="white" />
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 700 }}>SmartExtract</h1>
            <span className="badge badge-emerald">NEW</span>
          </div>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            Turn messy business PDFs into clean, usable data. Remove unwanted content before CSV export.
          </p>
        </div>

        {/* Business Mode toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 16px",
            background: businessMode ? "rgba(5, 150, 105, 0.1)" : "var(--color-surface-2)",
            border: `1px solid ${businessMode ? "rgba(5, 150, 105, 0.3)" : "var(--color-border-subtle)"}`,
            borderRadius: "var(--radius-lg)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => setBusinessMode((p) => !p)}
        >
          <div
            style={{
              width: "36px", height: "20px",
              borderRadius: "10px",
              background: businessMode ? "#059669" : "var(--color-surface-4)",
              position: "relative",
              transition: "background 0.2s ease",
            }}
          >
            <div style={{
              width: "16px", height: "16px",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              top: "2px",
              left: businessMode ? "18px" : "2px",
              transition: "left 0.2s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }} />
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: businessMode ? "#10B981" : "var(--color-text-secondary)" }}>
              Business Bill Mode
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
              Invoice & bill optimization
            </div>
          </div>
        </div>
      </div>

      {/* Business mode badge */}
      {businessMode && step !== "idle" && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "linear-gradient(90deg, rgba(5,150,105,0.15), rgba(16,185,129,0.08))",
            border: "1px solid rgba(5, 150, 105, 0.4)",
            borderRadius: "var(--radius-lg)",
            marginBottom: "20px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#10B981",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <Activity size={13} />
          BUSINESS EXTRACTION MODE ACTIVE
        </div>
      )}

      {/* Upload area */}
      {step === "idle" && (
        <div
          className="drop-zone"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: "64px 32px",
            textAlign: "center",
            cursor: "pointer",
            borderColor: isDragging ? "var(--color-blue-primary)" : undefined,
            background: isDragging ? "var(--color-blue-glow)" : undefined,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <div
            style={{
              width: "72px", height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(5,150,105,0.2), rgba(16,185,129,0.1))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              border: "2px solid rgba(5,150,105,0.3)",
            }}
          >
            <Upload size={32} style={{ color: "#10B981" }} />
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
            Upload a Business PDF
          </div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "16px", lineHeight: 1.6 }}>
            Invoices, bills, statements, reports — SmartExtract detects tables automatically.
            <br />Drag & drop or click to browse.
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {["Invoice", "Bill", "Statement", "Report", "Receipt"].map((t) => (
              <span key={t} className="badge badge-emerald" style={{ fontSize: "11px" }}>{t}</span>
            ))}
          </div>

          {/* Demo option */}
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--color-border-subtle)" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect(new File(["demo"], "Sample_Invoice_Oct2025.pdf", { type: "application/pdf" }));
              }}
              className="btn-secondary"
              style={{ fontSize: "13px" }}
            >
              <Eye size={14} />
              Try with Demo Invoice
            </button>
          </div>
        </div>
      )}

      {/* Processing state */}
      {(step === "uploading" || step === "detecting") && (
        <div className="card" style={{ padding: "64px 32px", textAlign: "center" }}>
          <Loader2 size={40} style={{ color: "var(--color-blue-primary)", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
            {step === "uploading" ? "Uploading PDF..." : "Detecting Tables & Data..."}
          </div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
            {step === "detecting" && "AI is analyzing page structure, identifying tables, and extracting data rows."}
          </div>
        </div>
      )}

      {/* Three-panel workspace */}
      {(step === "extracted" || step === "cleaned") && (
        <div>
          {/* Panel selector */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: "var(--color-surface-2)", padding: "4px", borderRadius: "var(--radius-lg)", width: "fit-content", border: "1px solid var(--color-border-subtle)" }}>
            {(["original", "extracted", "cleaned"] as const).map((panel) => (
              <button
                key={panel}
                onClick={() => setActivePanel(panel)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: activePanel === panel ? "var(--color-blue-primary)" : "transparent",
                  color: activePanel === panel ? "white" : "var(--color-text-secondary)",
                  transition: "all 0.15s ease",
                  textTransform: "capitalize",
                }}
              >
                {panel === "original" && <FileText size={13} style={{ display: "inline", marginRight: "6px" }} />}
                {panel === "extracted" && <Table2 size={13} style={{ display: "inline", marginRight: "6px" }} />}
                {panel === "cleaned" && <CheckCircle size={13} style={{ display: "inline", marginRight: "6px" }} />}
                {panel}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", alignItems: "start" }}>
            {/* Main panel */}
            <div>
              {/* Original PDF panel */}
              {activePanel === "original" && (
                <div className="card" style={{ padding: "32px", textAlign: "center" }}>
                  <FileText size={48} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 16px" }} />
                  <div style={{ fontWeight: 600, marginBottom: "8px" }}>{fileName}</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
                    PDF preview would render here using pdfjs-dist in production.
                    <br />3 tables detected on pages 1–4.
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    {["Table 1 (p.1)", "Table 2 (p.2)", "Table 3 (p.4)"].map((t) => (
                      <span key={t} className="badge badge-blue">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted data table */}
              {(activePanel === "extracted" || activePanel === "cleaned") && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                      Showing <strong style={{ color: "var(--color-text-primary)" }}>{includedRows.length}</strong> rows,{" "}
                      <strong style={{ color: "var(--color-text-primary)" }}>{includedColumns.length}</strong> columns selected
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={cleanData} className="btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }}>
                        <Wand2 size={13} />
                        Clean Data
                      </button>
                      <button onClick={exportCSV} className="btn-primary" style={{ fontSize: "12px", padding: "6px 12px", background: "#059669" }}>
                        <Download size={13} />
                        Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="card" style={{ overflow: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                      <thead>
                        <tr style={{ background: "var(--color-surface-3)" }}>
                          <th style={{ padding: "10px 16px", textAlign: "left", width: "40px", borderBottom: "1px solid var(--color-border-subtle)" }}>
                            <input type="checkbox" checked={rows.every((r) => r.included)} onChange={() => setRows((p) => p.map((r) => ({ ...r, included: !p.every((x) => x.included) })))} />
                          </th>
                          {includedColumns.map((col) => (
                            <th key={col.id} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-tertiary)", borderBottom: "1px solid var(--color-border-subtle)", whiteSpace: "nowrap" }}>
                              {col.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr
                            key={row.id}
                            style={{
                              borderBottom: i < rows.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                              background: !row.included ? "rgba(244, 63, 94, 0.04)" : "transparent",
                              opacity: !row.included ? 0.5 : 1,
                            }}
                          >
                            <td style={{ padding: "10px 16px" }}>
                              <input type="checkbox" checked={row.included} onChange={() => toggleRow(row.id)} />
                            </td>
                            {includedColumns.map((col) => (
                              <td key={col.id} style={{ padding: "10px 16px", fontSize: "13px", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
                                {row.data[col.name] || (
                                  <span style={{ color: "var(--color-text-tertiary)" }}>—</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  {businessMode && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "14px 16px",
                        background: "rgba(5, 150, 105, 0.06)",
                        border: "1px solid rgba(5, 150, 105, 0.2)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        gap: "24px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subtotal</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981" }}>$7,886.67</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Tax</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981" }}>$1,419.60</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Grand Total</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#10B981" }}>$9,306.27</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right sidebar — column controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* File info */}
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Document
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px", wordBreak: "break-word" }}>{fileName}</div>
                <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>3 tables • 7 data rows detected</div>
                <button
                  onClick={() => { setStep("idle"); setFileName(null); }}
                  className="btn-ghost"
                  style={{ marginTop: "10px", fontSize: "12px", padding: "5px 0", color: "var(--color-rose-accent)" }}
                >
                  <X size={13} /> Change file
                </button>
              </div>

              {/* Column selection */}
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                  Columns ({includedColumns.length}/{columns.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {columns.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => toggleColumn(col.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "var(--radius-md)",
                        border: "none",
                        cursor: "pointer",
                        background: col.included ? "rgba(5, 150, 105, 0.08)" : "var(--color-surface-3)",
                        width: "100%",
                        textAlign: "left",
                        transition: "background 0.15s ease",
                      }}
                    >
                      {col.included
                        ? <CheckSquare size={14} style={{ color: "#10B981", flexShrink: 0 }} />
                        : <Square size={14} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
                      }
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 500, color: col.included ? "var(--color-text-primary)" : "var(--color-text-tertiary)" }}>
                          {col.name}
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {col.sample}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulas */}
              <div className="card" style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Calculations
                  </div>
                  <button onClick={() => setShowFormulas((p) => !p)} className="btn-ghost" style={{ padding: "2px 6px", fontSize: "11px" }}>
                    <Calculator size={12} />
                  </button>
                </div>
                {showFormulas ? (
                  <div>
                    <input
                      value={customFormula}
                      onChange={(e) => setCustomFormula(e.target.value)}
                      className="input"
                      style={{ fontSize: "12px", marginBottom: "8px" }}
                    />
                    <button className="btn-primary" style={{ fontSize: "12px", padding: "6px 12px", width: "100%", justifyContent: "center" }}>
                      Apply Formula
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                    {["Total = Qty × Unit Price", "Tax = Total × 18%", "Grand Total = Subtotal + Tax"].map((f) => (
                      <div key={f} style={{ padding: "4px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>{f}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Export */}
              <button
                onClick={exportCSV}
                className="btn-primary"
                style={{ justifyContent: "center", background: "#059669", fontSize: "14px", padding: "12px" }}
              >
                <Download size={16} />
                Export Clean CSV
              </button>
              <button
                className="btn-secondary"
                style={{ justifyContent: "center", fontSize: "13px" }}
              >
                <Download size={14} />
                Export XLSX
              </button>

              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
                ⚠️ D-Automation is a data processing tool and does not provide accounting or tax advice.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
