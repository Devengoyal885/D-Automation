"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  X,
  LayoutDashboard,
  Sparkles,
  FileType2,
  Table2,
  Zap,
  FolderOpen,
  History,
  Settings,
  ArrowRight,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  category: string;
}

const commands: CommandItem[] = [
  { id: "dashboard", label: "Go to Dashboard", icon: <LayoutDashboard size={16} />, href: "/dashboard", category: "Navigation" },
  { id: "ai-studio", label: "Open AI Studio", description: "Create documents and presentations", icon: <Sparkles size={16} />, href: "/ai-studio", category: "Navigation" },
  { id: "ai-doc", label: "Create Document", description: "Generate with AI", icon: <Sparkles size={16} />, href: "/ai-studio/documents", category: "Create" },
  { id: "ai-pres", label: "Create Presentation", description: "Generate slides with AI", icon: <Sparkles size={16} />, href: "/ai-studio/presentations", category: "Create" },
  { id: "pandaz", label: "Open Pandaz PDF", description: "PDF tools and conversion", icon: <FileType2 size={16} />, href: "/pandaz", category: "Navigation" },
  { id: "convert", label: "Convert PDF", description: "PDF → Word, Excel, Images", icon: <FileType2 size={16} />, href: "/pandaz/convert", category: "PDF" },
  { id: "merge", label: "Merge PDFs", icon: <FileType2 size={16} />, href: "/pandaz/merge", category: "PDF" },
  { id: "compress", label: "Compress PDF", icon: <FileType2 size={16} />, href: "/pandaz/compress", category: "PDF" },
  { id: "smart-extract", label: "Open SmartExtract", description: "PDF → structured CSV data", icon: <Table2 size={16} />, href: "/smart-extract", category: "Navigation" },
  { id: "form-flow", label: "Open FormFlow", description: "Auto-fill Google Forms", icon: <Zap size={16} />, href: "/form-flow", category: "Navigation" },
  { id: "files", label: "My Files", icon: <FolderOpen size={16} />, href: "/files", category: "Navigation" },
  { id: "history", label: "View History", icon: <History size={16} />, href: "/history", category: "Navigation" },
  { id: "settings", label: "Settings", icon: <Settings size={16} />, href: "/settings", category: "Navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const handleSelect = useCallback(
    (item: CommandItem) => {
      onClose();
      setQuery("");
      if (item.href) router.push(item.href);
      if (item.action) item.action();
    },
    [onClose, router]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, handleSelect, onClose]);

  if (!open) return null;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        style={{
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-modal)",
          width: "min(600px, 90vw)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <Search size={18} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
          <input
            autoFocus
            placeholder="Search commands, tools, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--color-text-primary)",
              fontSize: "16px",
              fontFamily: "var(--font-sans)",
            }}
          />
          <button onClick={onClose} className="btn-ghost" style={{ padding: "4px" }} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: "400px", overflowY: "auto", padding: "8px" }}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  padding: "6px 12px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {category}
              </div>
              {items.map((item) => {
                const globalIndex = filtered.indexOf(item);
                const isSelected = globalIndex === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      background: isSelected ? "var(--color-surface-3)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--color-text-primary)",
                      transition: "background 0.1s ease",
                    }}
                    data-selected={isSelected}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <span style={{ color: isSelected ? "var(--color-blue-primary)" : "var(--color-text-tertiary)", flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>{item.label}</div>
                      {item.description && (
                        <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>{item.description}</div>
                      )}
                    </div>
                    {isSelected && <ArrowRight size={14} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              <Search size={24} style={{ margin: "0 auto 8px" }} />
              <div>No results for &quot;{query}&quot;</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid var(--color-border-subtle)",
            display: "flex",
            gap: "16px",
            fontSize: "12px",
            color: "var(--color-text-tertiary)",
          }}
        >
          <span><kbd style={{ fontFamily: "monospace", opacity: 0.7 }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ fontFamily: "monospace", opacity: 0.7 }}>Enter</kbd> open</span>
          <span><kbd style={{ fontFamily: "monospace", opacity: 0.7 }}>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
