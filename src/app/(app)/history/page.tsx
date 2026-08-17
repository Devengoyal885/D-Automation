"use client";

import { Sparkles, Table2, FileType2, Presentation, Zap, Clock } from "lucide-react";

const activities = [
  { id: "1", action: "Generated Research Paper", detail: "AI Traffic Management System — 2,340 words", time: "2h ago", icon: <Sparkles size={16} />, color: "#7C3AED", type: "AI Generation" },
  { id: "2", action: "SmartExtract — invoice.pdf → CSV", detail: "3 tables detected • 24 rows extracted • 8 columns cleaned", time: "5h ago", icon: <Table2 size={16} />, color: "#059669", type: "SmartExtract" },
  { id: "3", action: "Compressed report.pdf", detail: "Pandaz • 68% size reduction • 1.8MB → 576KB", time: "Yesterday 4:20 PM", icon: <FileType2 size={16} />, color: "#D97706", type: "Pandaz" },
  { id: "4", action: "Generated Presentation", detail: "Smart City Infrastructure — 14 slides", time: "Yesterday 1:48 PM", icon: <Presentation size={16} />, color: "#2563EB", type: "AI Generation" },
  { id: "5", action: "FormFlow — College Registration", detail: "8 of 10 fields matched • Filled successfully", time: "2 days ago", icon: <Zap size={16} />, color: "#DB2777", type: "FormFlow" },
  { id: "6", action: "Merged 3 PDFs", detail: "Pandaz • chapter1.pdf + chapter2.pdf + chapter3.pdf → thesis.pdf", time: "2 days ago", icon: <FileType2 size={16} />, color: "#0891B2", type: "Pandaz" },
  { id: "7", action: "Generated Business Proposal", detail: "Solar Energy Adoption Strategy — Professional tone", time: "3 days ago", icon: <Sparkles size={16} />, color: "#7C3AED", type: "AI Generation" },
];

export default function HistoryPage() {
  return (
    <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>Activity History</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Complete log of all document operations, AI generations, and automations.
        </p>
      </div>

      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "1px", background: "var(--color-border-subtle)" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {activities.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "16px 0" }}
            >
              {/* Dot */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `${item.color}18`,
                  border: `2px solid ${item.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div
                className="card"
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.color + "40"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-subtle)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "3px" }}>{item.action}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{item.detail}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                      <Clock size={11} />{item.time}
                    </div>
                    <span style={{
                      padding: "2px 8px",
                      borderRadius: "100px",
                      fontSize: "10px",
                      fontWeight: 600,
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}>
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
