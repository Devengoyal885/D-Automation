"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Zap,
  Sparkles,
  FileType2,
  Table2,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Shield,
  Globe,
  Clock,
  RefreshCw,
  Wand2,
  Layers,
} from "lucide-react";

const features = [
  {
    id: "ai",
    badge: "AI Studio",
    badgeColor: "#7C3AED",
    title: "Create any document with a single prompt.",
    desc: "Generate professional documents, research papers, presentations, and business proposals. AI understands structure, tone, and audience — delivering real, usable output in seconds.",
    bullets: [
      "DOCX, PPTX, PDF, XLSX exports",
      "APA, IEEE, MLA citations",
      "Template-aware generation",
      "Tone, length & language controls",
    ],
    demo: (
      <div style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-xl)", padding: "24px", fontFamily: "var(--font-sans)" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "flex-start" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
            <Sparkles size={14} color="white" />
          </div>
          <div style={{ flex: 1, background: "var(--color-surface-3)", borderRadius: "var(--radius-md)", padding: "12px 16px", fontSize: "14px", color: "var(--color-text-secondary)" }}>
            &ldquo;Create a professional technical proposal for an AI-powered smart parking system...&rdquo;
          </div>
        </div>
        {["Understanding request", "Creating structure", "Generating content", "Applying template"].map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <CheckCircle size={14} style={{ color: "#10B981" }} />
            <span style={{ fontSize: "13px", color: i < 3 ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>{step}</span>
          </div>
        ))}
        <div style={{ marginTop: "16px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)", padding: "12px 16px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-tertiary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Generated: Smart Parking Technical Proposal</div>
          <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--color-text-primary)" }}>Executive Summary</strong><br />
            This proposal outlines a comprehensive AI-powered smart parking solution designed to reduce urban congestion by up to 30% through real-time sensor integration...
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pandaz",
    badge: "Pandaz PDF",
    badgeColor: "#2563EB",
    title: "Everything you need for PDF productivity.",
    desc: "Merge, split, compress, rotate, and convert PDFs without leaving D-Automation. A complete professional PDF toolkit built directly into your workflow.",
    bullets: [
      "Merge, split, compress, rotate",
      "PDF → Word, Excel, PowerPoint",
      "Images → PDF and PDF → Images",
      "Page organizer with drag-and-drop",
    ],
    demo: (
      <div style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-xl)", padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { label: "Merge PDF", color: "#2563EB", icon: <Layers size={16} /> },
            { label: "Split PDF", color: "#7C3AED", icon: <FileType2 size={16} /> },
            { label: "Compress", color: "#D97706", icon: <RefreshCw size={16} /> },
            { label: "Convert", color: "#059669", icon: <Wand2 size={16} /> },
          ].map((tool) => (
            <div key={tool.label} style={{ padding: "16px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)", border: `1px solid ${tool.color}25` }}>
              <div style={{ color: tool.color, marginBottom: "8px" }}>{tool.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>{tool.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "12px", padding: "12px", background: "var(--color-surface-3)", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>invoice.pdf — Compressed 68% → 576 KB</div>
          <div style={{ height: "4px", background: "var(--color-surface-4)", borderRadius: "2px", marginTop: "6px", overflow: "hidden" }}>
            <div style={{ width: "68%", height: "100%", background: "#2563EB", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "smart-extract",
    badge: "SmartExtract",
    badgeColor: "#059669",
    title: "Turn messy business PDFs into clean data.",
    desc: "Upload any invoice, bill, or statement. SmartExtract detects tables, lets you remove unwanted columns and rows, apply calculations, and export clean CSV or XLSX files.",
    bullets: [
      "Business Bill Mode for invoices",
      "Remove unwanted rows and columns",
      "Apply custom formulas",
      "Export clean CSV or XLSX",
    ],
    demo: (
      <div style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-xl)", padding: "24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.3)", borderRadius: "4px", fontSize: "10px", fontWeight: 700, color: "#10B981", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
          BUSINESS EXTRACTION MODE
        </div>
        <div style={{ background: "var(--color-surface-3)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 100px", gap: "0", fontSize: "10px", fontWeight: 700, color: "var(--color-text-tertiary)", padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>Item</span><span>Qty</span><span>Price</span><span>Total</span>
          </div>
          {[["Office Chair", "5", "$249", "$1,245"], ["Standing Desk", "3", "$599", "$1,797"], ["Monitor 4K", "8", "$429", "$3,432"]].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 100px", gap: "0", fontSize: "12px", color: "var(--color-text-primary)", padding: "8px 12px", borderBottom: "1px solid var(--color-border-subtle)" }}>
              {row.map((cell, j) => <span key={j}>{cell}</span>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10px", display: "flex", gap: "16px", fontSize: "12px", color: "var(--color-text-secondary)" }}>
          <span>Subtotal: <strong style={{ color: "#10B981" }}>$6,474</strong></span>
          <span>Tax: <strong style={{ color: "#10B981" }}>$1,165</strong></span>
          <span>Total: <strong style={{ color: "#10B981" }}>$7,639</strong></span>
        </div>
      </div>
    ),
  },
  {
    id: "formflow",
    badge: "FormFlow",
    badgeColor: "#DB2777",
    title: "Stop typing the same information again and again.",
    desc: "Save your information in profiles — college, personal, team. FormFlow matches fields automatically and fills Google Forms with a single confirmation click.",
    bullets: [
      "Saved profiles for different contexts",
      "Intelligent field matching",
      "Review before every fill",
      "Never auto-submits — you confirm",
    ],
    demo: (
      <div style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-xl)", padding: "24px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>College Registration Form</div>
        <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "12px" }}>Matched Fields: <span style={{ color: "#10B981", fontWeight: 700 }}>8/10</span></div>
        {[
          ["Full Name", "Deven Goyal", true],
          ["Email", "deven@example.com", true],
          ["University", "Chandigarh University", true],
          ["GitHub", "github.com/devengoyal", true],
          ["Roll Number", "", false],
        ].map(([label, value, matched], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", borderRadius: "var(--radius-md)", background: matched ? "rgba(16,185,129,0.06)" : "rgba(244,63,94,0.06)", border: `1px solid ${matched ? "rgba(16,185,129,0.15)" : "rgba(244,63,94,0.15)"}`, marginBottom: "6px" }}>
            <CheckCircle size={12} style={{ color: matched ? "#10B981" : "#F43F5E", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", flex: 1 }}>{label as string}</span>
            {value && <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>{value as string}</span>}
          </div>
        ))}
      </div>
    ),
  },
];

const faqs = [
  { q: "Is D-Automation free?", a: "D-Automation offers a generous free plan. Pro and Team plans unlock higher AI generation limits, more storage, advanced templates, and priority support." },
  { q: "Which AI model does D-Automation use?", a: "D-Automation uses Google Gemini (1.5 Flash and Pro) for document generation. You can connect your own API key for full control, or use the built-in demo mode to explore the platform." },
  { q: "Is my data secure?", a: "Yes. Files are processed securely and never shared with third parties. FormFlow profiles are encrypted locally. API keys are never stored on D-Automation servers." },
  { q: "Can FormFlow submit Google Forms automatically?", a: "No. D-Automation will never automatically submit forms. FormFlow fills fields for your review, and you must explicitly confirm before any submission occurs." },
  { q: "Does SmartExtract work on scanned PDFs?", a: "Yes. SmartExtract detects whether a PDF contains selectable text. If it doesn't, OCR mode activates automatically for scanned documents." },
  { q: "Can I use my university's document template?", a: "Yes. Upload any PPTX, DOCX, or PDF template and D-Automation's Template Intelligence will analyze its structure, fonts, colors, and citation style for future documents." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: "var(--color-navy-900)", minHeight: "100vh", color: "var(--color-text-primary)" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--color-border-subtle)", background: "rgba(10, 15, 30, 0.9)", backdropFilter: "blur(12px)", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={14} color="white" fill="white" />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 700 }}>D-Automation</span>
        </div>

        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {["Features", "SmartExtract", "FormFlow", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ fontSize: "14px", color: "var(--color-text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/dashboard" className="hide-mobile" style={{ fontSize: "14px", color: "var(--color-text-secondary)", textDecoration: "none", padding: "7px 14px" }}>
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", fontSize: "14px", padding: "8px 18px" }}>
            Start Free
          </Link>
          <button onClick={() => setMobileMenuOpen((p) => !p)} className="btn-ghost hide-desktop" style={{ padding: "6px" }}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-border-subtle)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {["Features", "SmartExtract", "FormFlow", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "var(--color-text-secondary)", textDecoration: "none" }}>
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero */}
      <section style={{ padding: "96px 32px 80px", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.25)", borderRadius: "100px", fontSize: "12px", fontWeight: 600, color: "var(--color-blue-light)", marginBottom: "32px", letterSpacing: "0.03em" }}>
          <Zap size={12} fill="currentColor" />
          AI-Powered Documents. PDFs. Data. Automation.
        </div>

        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Create. Process.{" "}
          <span className="gradient-text">Automate.</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--color-text-secondary)", maxWidth: "640px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          One intelligent workspace for AI documents, PDFs, business data extraction, and repetitive form workflows.
          Stop switching between tools.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", fontSize: "16px", padding: "14px 28px" }}>
            <Sparkles size={18} />
            Start Creating
          </Link>
          <a href="#features" className="btn-secondary" style={{ fontSize: "16px", padding: "14px 28px" }}>
            Explore Tools
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Trust row */}
        <div style={{ marginTop: "56px", display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
          {[
            { icon: <Shield size={16} />, text: "Encrypted & Private" },
            { icon: <Globe size={16} />, text: "10+ Export Formats" },
            { icon: <Clock size={16} />, text: "Generate in Seconds" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--color-text-tertiary)" }}>
              <span style={{ color: "var(--color-blue-light)" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section style={{ padding: "0 32px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-2xl)",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Fake browser chrome */}
          <div style={{ background: "var(--color-navy-800)", padding: "12px 20px", borderBottom: "1px solid var(--color-border-subtle)", display: "flex", alignItems: "center", gap: "8px" }}>
            {["#F43F5E", "#F59E0B", "#10B981"].map((c) => (
              <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div style={{ marginLeft: "8px", flex: 1, background: "var(--color-surface-3)", borderRadius: "4px", padding: "4px 12px", fontSize: "12px", color: "var(--color-text-tertiary)", maxWidth: "300px" }}>
              app.dautomation.com/dashboard
            </div>
          </div>
          {/* Mini dashboard preview */}
          <div style={{ padding: "32px", display: "flex", gap: "24px" }}>
            {/* Mini sidebar */}
            <div style={{ width: "160px", flexShrink: 0 }}>
              {["Dashboard", "AI Studio", "Pandaz PDF", "SmartExtract", "FormFlow", "My Files"].map((item, i) => (
                <div key={item} style={{ padding: "7px 10px", borderRadius: "6px", fontSize: "12px", background: i === 0 ? "rgba(37,99,235,0.12)" : "transparent", color: i === 0 ? "var(--color-blue-light)" : "var(--color-text-tertiary)", marginBottom: "2px", fontWeight: i === 0 ? 600 : 400 }}>
                  {item}
                </div>
              ))}
            </div>
            {/* Mini content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>What do you want to create or automate?</div>
              <div style={{ background: "var(--color-surface-3)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-lg)", padding: "16px", marginBottom: "16px", fontSize: "13px", color: "var(--color-text-tertiary)" }}>
                Create a professional research report on AI-powered traffic management...
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {[
                  { label: "AI Document", color: "#2563EB" },
                  { label: "PDF Toolkit", color: "#7C3AED" },
                  { label: "SmartExtract", color: "#059669" },
                  { label: "FormFlow", color: "#DB2777" },
                ].map((c) => (
                  <div key={c.label} style={{ padding: "12px", background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", border: `1px solid ${c.color}20` }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.color, marginBottom: "6px" }} />
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-secondary)" }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-blue-light)", marginBottom: "12px" }}>FEATURES</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.01em" }}>
            Everything in one workspace
          </h2>
          <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", maxWidth: "540px", margin: "0 auto" }}>
            Four powerful modules, one unified interface. Create → Process → Extract → Automate.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {features.map((feature, i) => (
            <div
              key={feature.id}
              id={feature.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "64px",
                alignItems: "center",
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: `${feature.badgeColor}18`, color: feature.badgeColor, border: `1px solid ${feature.badgeColor}30`, marginBottom: "16px" }}>
                  {feature.badge}
                </span>
                <h3 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.01em" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "24px" }}>
                  {feature.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
                  {feature.bullets.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
                      <CheckCircle size={16} style={{ color: feature.badgeColor, flexShrink: 0 }} />
                      {b}
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", background: feature.badgeColor, fontSize: "14px" }}>
                  Try {feature.badge}
                  <ArrowRight size={15} />
                </Link>
              </div>
              <div style={{ direction: "ltr" }}>
                {feature.demo}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 32px", background: "var(--color-navy-800)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-blue-light)", marginBottom: "12px" }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: "48px" }}>One unified workflow</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
            {[
              { step: "1", label: "CREATE", desc: "Prompt AI Studio to generate any document", color: "#2563EB" },
              { step: "2", label: "PROCESS", desc: "Use Pandaz to edit, merge, convert PDFs", color: "#7C3AED" },
              { step: "3", label: "EXTRACT", desc: "SmartExtract turns PDFs into clean data", color: "#059669" },
              { step: "4", label: "AUTOMATE", desc: "FormFlow fills repetitive forms instantly", color: "#DB2777" },
              { step: "5", label: "EXPORT", desc: "Download in any format — DOCX, PDF, CSV", color: "#D97706" },
            ].map((item, i) => (
              <div key={item.step} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", padding: "0 20px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: `${item.color}18`, border: `2px solid ${item.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "20px", fontWeight: 800, color: item.color }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em", color: item.color, marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", maxWidth: "120px", lineHeight: 1.4 }}>{item.desc}</div>
                </div>
                {i < 4 && <ArrowRight size={16} style={{ color: "var(--color-border-strong)", flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 32px", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginBottom: "12px" }}>Frequently asked questions</h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-primary)", textAlign: "left", gap: "16px" }}
              >
                <span style={{ fontSize: "16px", fontWeight: 600 }}>{faq.q}</span>
                <ChevronDown size={18} style={{ flexShrink: 0, color: "var(--color-text-tertiary)", transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: "20px", fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px", textAlign: "center", background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.06))", borderTop: "1px solid var(--color-border-subtle)" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, marginBottom: "20px", letterSpacing: "-0.01em" }}>
          Ready to build your{" "}
          <span className="gradient-text">document workflow?</span>
        </h2>
        <p style={{ fontSize: "18px", color: "var(--color-text-secondary)", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          AI generation, PDF processing, data extraction, and form automation — all in one place.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn-primary" style={{ textDecoration: "none", fontSize: "16px", padding: "14px 32px" }}>
            <Sparkles size={18} />
            Start for Free
          </Link>
          <Link href="/dashboard" className="btn-secondary" style={{ textDecoration: "none", fontSize: "16px", padding: "14px 32px" }}>
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 32px", borderTop: "1px solid var(--color-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={12} color="white" fill="white" />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600 }}>D-Automation</span>
        </div>
        <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
          AI-Powered Documents. PDFs. Data. Automation.
        </div>
        <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
          © 2025 D-Automation. AI output should be reviewed before use.
        </div>
      </footer>
    </div>
  );
}
