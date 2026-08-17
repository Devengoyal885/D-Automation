"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  Presentation,
  BookOpen,
  FlaskConical,
  Lightbulb,
  ChevronDown,
  Upload,
  Wand2,
  CheckCircle,
  Loader2,
  Circle,
  ArrowRight,
  Copy,
  Download,
  RefreshCw,
  Table,
  Eye,
} from "lucide-react";
import { toastSuccess, toastError } from "@/components/ui/Toaster";

type DocType = "document" | "presentation" | "report" | "research" | "patent" | "assignment" | "proposal" | "spreadsheet";
type Tone = "professional" | "academic" | "casual" | "technical";
type Length = "short" | "medium" | "long" | "comprehensive";

// ─── Simple markdown → HTML renderer (no external dep) ───────────────────────
function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // H1
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // H2
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // H3
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // H4
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    // Blockquote
    .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Unordered list items
    .replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>")
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>[\s\S]+?<\/li>)(\n(?!<li>)|$)/g, "<ul>$1</ul>$2")
    // Paragraphs — blank line separated non-HTML content
    .replace(/\n\n(?!<)/g, "</p><p>")
    .replace(/\n(?!<)/g, "<br />");

  return `<p>${html}</p>`;
}

interface GenerationStep {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
}

const docTypes: { id: DocType; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "document", label: "Document", icon: <FileText size={16} />, description: "Structured Word document" },
  { id: "presentation", label: "Presentation", icon: <Presentation size={16} />, description: "PPTX with slides" },
  { id: "report", label: "Report", icon: <BookOpen size={16} />, description: "Professional report" },
  { id: "research", label: "Research Paper", icon: <FlaskConical size={16} />, description: "Academic format with citations" },
  { id: "patent", label: "Patent Draft", icon: <Lightbulb size={16} />, description: "AI-assisted patent draft" },
  { id: "assignment", label: "Assignment", icon: <FileText size={16} />, description: "Academic assignment" },
  { id: "proposal", label: "Proposal", icon: <Wand2 size={16} />, description: "Business/project proposal" },
  { id: "spreadsheet", label: "Spreadsheet", icon: <Table size={16} />, description: "Structured data in XLSX" },
];

const STEPS: GenerationStep[] = [
  { id: "understand", label: "Understanding request", status: "pending" },
  { id: "structure", label: "Creating document structure", status: "pending" },
  { id: "content", label: "Generating content", status: "pending" },
  { id: "sources", label: "Checking sources & citations", status: "pending" },
  { id: "format", label: "Applying formatting", status: "pending" },
  { id: "export", label: "Preparing export", status: "pending" },
];

export function AIStudio({ initialPrompt = "" }: { initialPrompt?: string }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [docType, setDocType] = useState<DocType>("document");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [citations, setCitations] = useState("APA");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState("English");
  const [isGenerating, setIsGenerating] = useState(false);
  const [steps, setSteps] = useState<GenerationStep[]>(STEPS);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [usedProvider, setUsedProvider] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");
  const [editableContent, setEditableContent] = useState("");

  const updateStep = (id: string, status: GenerationStep["status"]) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const runGeneration = useCallback(async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedContent(null);
    setWordCount(0);
    setUsedProvider("");
    setSteps(STEPS.map((s) => ({ ...s, status: "pending" })));

    const stepTimings = [
      { id: "understand", delay: 0 },
      { id: "structure", delay: 700 },
      { id: "content", delay: 1400 },
      { id: "sources", delay: 2100 },
      { id: "format", delay: 2800 },
      { id: "export", delay: 3500 },
    ];

    try {
      updateStep("understand", "active");

      const stepTimers: ReturnType<typeof setTimeout>[] = [];
      stepTimings.forEach(({ id, delay }, i) => {
        if (i === 0) return;
        stepTimers.push(
          setTimeout(() => {
            updateStep(stepTimings[i - 1].id, "done");
            updateStep(id, "active");
          }, delay)
        );
      });

      // Build full prompt including audience context
      const fullPrompt = audience
        ? `${prompt}\n\nTarget Audience: ${audience}`
        : prompt;

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          docType,
          tone,
          language,
          citations,
        }),
      });

      stepTimers.forEach(clearTimeout);

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || "Generation failed");
      }
      const data = await response.json();

      setSteps(STEPS.map((s) => ({ ...s, status: "done" })));

      setTimeout(() => {
        setGeneratedContent(data.content);
        setEditableContent(data.content);
        setWordCount(data.wordCount ?? data.content.split(/\s+/).filter(Boolean).length);
        setUsedProvider(data.provider ?? "");
        setIsGenerating(false);
        toastSuccess(`Document generated — ${data.wordCount ?? ""} words via ${data.provider ?? "AI"}`);
      }, 400);
    } catch (err) {
      setIsGenerating(false);
      setSteps(STEPS.map((s) => ({ ...s, status: "pending" })));
      const msg = err instanceof Error ? err.message : "Generation failed";
      toastError(msg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, docType, tone, language, citations, audience]);

  const copyContent = () => {
    const text = activeTab === "edit" ? editableContent : (generatedContent ?? "");
    if (text) {
      navigator.clipboard.writeText(text);
      toastSuccess("Content copied to clipboard!");
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={16} color="white" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>AI Studio</h1>
        </div>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Generate professional documents, presentations, reports, and research papers with AI.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>
        {/* Left — Generator */}
        <div>
          {/* Output type selector */}
          <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Output Type
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {docTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDocType(type.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 8px",
                    borderRadius: "var(--radius-md)",
                    border: `1px solid ${docType === type.id ? "var(--color-blue-primary)" : "var(--color-border-subtle)"}`,
                    background: docType === type.id ? "rgba(37, 99, 235, 0.1)" : "var(--color-surface-3)",
                    cursor: "pointer",
                    color: docType === type.id ? "var(--color-blue-light)" : "var(--color-text-secondary)",
                    transition: "all 0.15s ease",
                    fontSize: "11px",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Your Request
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe the ${docType} you want to create...\n\nExample: "Create a professional technical proposal for an AI-powered smart parking system for urban areas, including architecture, benefits, cost analysis, and implementation timeline."`}
              style={{
                width: "100%",
                minHeight: "140px",
                background: "var(--color-surface-3)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "14px",
                color: "var(--color-text-primary)",
                fontSize: "14px",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.6,
                resize: "vertical",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-blue-primary)";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border-default)";
                e.target.style.boxShadow = "none";
              }}
            />

            {/* Quick prompts */}
            <div style={{ marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[
                "AI-powered smart parking system",
                "Renewable energy adoption strategy",
                "Machine learning in healthcare",
                "Blockchain supply chain management",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setPrompt(`Create a professional ${docType} on ${suggestion}`)}
                  className="btn-ghost"
                  style={{ fontSize: "12px", padding: "4px 10px", border: "1px solid var(--color-border-subtle)" }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="input"
                  style={{ fontSize: "13px", padding: "8px 12px" }}
                >
                  <option value="professional">Professional</option>
                  <option value="academic">Academic</option>
                  <option value="technical">Technical</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                  Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as Length)}
                  className="input"
                  style={{ fontSize: "13px", padding: "8px 12px" }}
                >
                  <option value="short">Short (~700 words)</option>
                  <option value="medium">Medium (~1,500 words)</option>
                  <option value="long">Long (~2,500 words)</option>
                  <option value="comprehensive">Comprehensive (3,000+)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="input"
                  style={{ fontSize: "13px", padding: "8px 12px" }}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className="btn-ghost"
              style={{ marginTop: "12px", fontSize: "12px", padding: "4px 8px" }}
            >
              Advanced options
              <ChevronDown size={12} style={{ transform: showAdvanced ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {showAdvanced && (
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--color-border-subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                    Target Audience
                  </label>
                  <input
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. University professors, Investors"
                    className="input"
                    style={{ fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>
                    Citation Style
                  </label>
                  <select
                    value={citations}
                    onChange={(e) => setCitations(e.target.value)}
                    className="input"
                    style={{ fontSize: "13px", padding: "8px 12px" }}
                  >
                    <option value="APA">APA 7th Edition</option>
                    <option value="MLA">MLA 9th Edition</option>
                    <option value="Chicago">Chicago 17th</option>
                    <option value="IEEE">IEEE</option>
                    <option value="Harvard">Harvard</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Upload references */}
          <div
            className="drop-zone"
            style={{ padding: "20px", borderRadius: "var(--radius-lg)", textAlign: "center", marginBottom: "16px", cursor: "pointer" }}
            onClick={() => document.getElementById("ref-upload")?.click()}
          >
            <input id="ref-upload" type="file" multiple accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }} />
            <Upload size={20} style={{ color: "var(--color-text-tertiary)", margin: "0 auto 8px" }} />
            <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
              Upload reference files (optional)
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "4px" }}>
              PDFs, DOCX, TXT — AI will cite them in your document
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={runGeneration}
            disabled={!prompt.trim() || isGenerating}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              opacity: (!prompt.trim() || isGenerating) ? 0.6 : 1,
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate {docType.charAt(0).toUpperCase() + docType.slice(1)}
              </>
            )}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Right — Progress + Output */}
        <div>
          {/* Generation steps */}
          {(isGenerating || generatedContent) && (
            <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                {isGenerating ? (
                  <>
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite", color: "var(--color-blue-primary)" }} />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={14} style={{ color: "var(--color-emerald-accent)" }} />
                    Generation Complete
                  </>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {steps.map((step) => (
                  <div key={step.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {step.status === "done" && <CheckCircle size={15} style={{ color: "var(--color-emerald-accent)", flexShrink: 0 }} />}
                    {step.status === "active" && <Loader2 size={15} style={{ color: "var(--color-blue-primary)", animation: "spin 1s linear infinite", flexShrink: 0 }} />}
                    {step.status === "pending" && <Circle size={15} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />}
                    <span style={{
                      fontSize: "13px",
                      color: step.status === "done"
                        ? "var(--color-text-primary)"
                        : step.status === "active"
                          ? "var(--color-blue-light)"
                          : "var(--color-text-tertiary)",
                    }}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated content output */}
          {generatedContent && !isGenerating && (
            <div className="card" style={{ padding: "0", overflow: "hidden" }}>
              {/* Output header */}
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--color-border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>Generated Output</span>
                  {wordCount > 0 && (
                    <span className="badge badge-blue" style={{ fontSize: "10px" }}>{wordCount.toLocaleString()} words</span>
                  )}
                  {usedProvider && (
                    <span className="badge badge-emerald" style={{ fontSize: "10px" }}>
                      {usedProvider.includes("gemini") ? "✦ Gemini" : usedProvider.includes("groq") ? "⚡ Groq" : "Demo"}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => setActiveTab(activeTab === "preview" ? "edit" : "preview")}
                    className="btn-ghost"
                    style={{ fontSize: "12px", padding: "5px 10px" }}
                  >
                    <Eye size={13} />
                    {activeTab === "preview" ? "Edit" : "Preview"}
                  </button>
                  <button onClick={copyContent} className="btn-ghost" style={{ padding: "5px 10px", fontSize: "12px" }}>
                    <Copy size={13} />
                    Copy
                  </button>
                </div>
              </div>

              {/* Content area */}
              {activeTab === "preview" ? (
                <div
                  style={{
                    maxHeight: "520px",
                    overflowY: "auto",
                    padding: "20px 24px",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "var(--color-text-primary)",
                  }}
                  className="ai-output-prose"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(generatedContent) }}
                />
              ) : (
                <textarea
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "400px",
                    background: "var(--color-surface-3)",
                    border: "none",
                    padding: "20px 24px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    color: "var(--color-text-primary)",
                    resize: "vertical",
                    outline: "none",
                    lineHeight: 1.7,
                  }}
                />
              )}

              {/* Actions */}
              <div style={{ padding: "14px 20px", borderTop: "1px solid var(--color-border-subtle)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                  {["DOCX", "PDF", "PPTX", "XLSX"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => toastSuccess(`Exporting as ${fmt}...`)}
                      className="btn-secondary"
                      style={{ fontSize: "12px", padding: "7px 12px" }}
                    >
                      <Download size={13} />
                      {fmt}
                    </button>
                  ))}
                </div>
                <button onClick={runGeneration} className="btn-ghost" style={{ fontSize: "12px" }}>
                  <RefreshCw size={13} />
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* Empty / intro state */}
          {!isGenerating && !generatedContent && (
            <div
              style={{
                padding: "32px 24px",
                textAlign: "center",
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Sparkles size={24} style={{ color: "var(--color-blue-light)" }} />
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>AI Studio ready</div>
              <div style={{ fontSize: "13px", color: "var(--color-text-tertiary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Describe what you need, pick a document type, and click Generate.
                <br />Powered by Gemini 1.5 Flash with Groq fallback.
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                {["✦ Gemini 1.5 Flash", "⚡ Groq Llama 3.3", "🔄 Auto-fallback"].map((badge) => (
                  <span key={badge} className="badge badge-blue" style={{ fontSize: "11px" }}>{badge}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
