// AI Provider abstraction
// Supports Gemini and a mock provider for demo mode

export interface GenerateOptions {
  type?: "document" | "presentation" | "report" | "research" | "patent" | "assignment" | "proposal" | "spreadsheet";
  tone?: "professional" | "academic" | "casual" | "technical";
  length?: "short" | "medium" | "long" | "comprehensive";
  language?: string;
  audience?: string;
  template?: string;
  references?: string[];
  creativity?: number; // 0-1
}

export interface GenerateResult {
  content: string;
  outline?: string[];
  metadata?: Record<string, string>;
  citations?: Citation[];
  wordCount?: number;
}

export interface Citation {
  id: string;
  title: string;
  authors?: string[];
  year?: number;
  url?: string;
  excerpt?: string;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface AIProvider {
  name: string;
  generate(prompt: string, options?: GenerateOptions): Promise<GenerateResult>;
  stream(prompt: string, options?: GenerateOptions): AsyncGenerator<StreamChunk>;
  summarize(text: string): Promise<string>;
  classify(text: string, labels: string[]): Promise<{ label: string; confidence: number }>;
  extractTable(text: string): Promise<Record<string, string>[]>;
}

// ── Mock Provider (always available for demo) ──────────────────────────────

const MOCK_DOCUMENT_CONTENT = (prompt: string, type: string) => `# ${prompt}

## Executive Summary

This ${type} provides a comprehensive analysis of the requested topic, synthesizing key concepts, current research, and actionable recommendations for stakeholders.

The following sections present a structured overview of the subject matter, including background context, detailed analysis, and strategic recommendations.

## Introduction

The rapid evolution of technology and its integration into modern systems has created unprecedented opportunities for innovation. This document explores the key dimensions of this transformation and provides evidence-based insights for decision makers.

### Background

Understanding the foundational principles is essential for grasping the broader implications of this topic. The historical context reveals a pattern of progressive development that has accelerated in recent years.

### Scope and Objectives

This ${type} aims to:
- Provide a thorough analysis of the primary subject matter
- Identify key trends and their implications
- Offer actionable recommendations based on evidence
- Highlight critical considerations for implementation

## Methodology

Our analysis employs a multi-faceted approach combining:

1. **Literature Review**: Systematic review of peer-reviewed publications and industry reports
2. **Comparative Analysis**: Evaluation of existing implementations and case studies
3. **Stakeholder Perspective**: Consideration of diverse viewpoints and requirements
4. **Data Analysis**: Quantitative assessment of available metrics and benchmarks

## Core Analysis

### Section 1: Current State

The present landscape is characterized by significant advancements across multiple dimensions. Key observations include:

- Increased adoption of AI-driven solutions across industries
- Growing emphasis on data-driven decision making
- Emergence of integrated platforms that combine multiple functionalities
- Rising demand for automated, intelligent workflows

### Section 2: Key Challenges

Despite progress, several challenges remain:

**Technical Challenges:**
- Integration complexity across heterogeneous systems
- Data quality and standardization issues
- Scalability constraints in legacy environments
- Security and privacy concerns

**Organizational Challenges:**
- Resistance to change and adoption barriers
- Skill gaps in emerging technologies
- Resource allocation and prioritization
- Governance and compliance requirements

### Section 3: Opportunities and Recommendations

Based on our analysis, we recommend the following strategic priorities:

1. **Invest in AI-First Infrastructure**: Prioritize platforms that are designed with AI integration from the ground up.

2. **Establish Data Governance**: Implement robust data management practices to ensure quality and compliance.

3. **Build Cross-Functional Teams**: Foster collaboration between technical and domain experts.

4. **Adopt Iterative Implementation**: Use phased rollouts with continuous feedback loops.

5. **Measure and Optimize**: Establish clear KPIs and monitoring frameworks from day one.

## Conclusion

The evidence presented in this ${type} demonstrates clear opportunities for meaningful progress in the identified areas. Organizations that proactively address the challenges outlined while capitalizing on emerging opportunities will be well-positioned for sustained success.

Implementation of the recommended strategies, supported by appropriate governance and monitoring frameworks, provides a pathway to achieving the desired outcomes while managing associated risks.

## References

1. Smith, J. et al. (2024). "Advanced Applications in Modern Systems." *Journal of Technology Innovation*, 42(3), 112-128.
2. Johnson, M. & Williams, K. (2024). "Strategic Frameworks for Digital Transformation." *Harvard Business Review*, March 2024.
3. Anderson, R. (2023). "Data-Driven Decision Making in Complex Environments." MIT Press.
4. Thompson, L. et al. (2023). "Emerging Trends in Intelligent Automation." *Nature Technology*, 8(2), 45-62.

---

*This document was generated by D-Automation AI Studio. Please review and verify all content before use.*`;

async function* mockStream(content: string, chunkSize = 50): AsyncGenerator<StreamChunk> {
  const words = content.split(" ");
  let buffer = "";
  for (let i = 0; i < words.length; i++) {
    buffer += (i > 0 ? " " : "") + words[i];
    if (buffer.length >= chunkSize || i === words.length - 1) {
      yield { text: buffer, done: i === words.length - 1 };
      buffer = "";
      await new Promise((r) => setTimeout(r, 30));
    }
  }
}

const mockProvider: AIProvider = {
  name: "Demo Mode",

  async generate(prompt, options = {}) {
    await new Promise((r) => setTimeout(r, 1800));
    const type = options.type || "document";
    const content = MOCK_DOCUMENT_CONTENT(prompt, type);
    return {
      content,
      outline: [
        "Executive Summary",
        "Introduction",
        "Methodology",
        "Core Analysis",
        "Recommendations",
        "Conclusion",
        "References",
      ],
      wordCount: content.split(" ").length,
      citations: [
        { id: "1", title: "Advanced Applications in Modern Systems", authors: ["Smith, J."], year: 2024, url: "#" },
        { id: "2", title: "Strategic Frameworks for Digital Transformation", authors: ["Johnson, M.", "Williams, K."], year: 2024, url: "#" },
      ],
    };
  },

  stream: mockStream.bind(null) as AIProvider["stream"],

  async summarize(text) {
    await new Promise((r) => setTimeout(r, 800));
    const words = text.split(" ").slice(0, 20).join(" ");
    return `Summary: ${words}... [This is a demo summary. Connect Gemini API for real summarization.]`;
  },

  async classify(text, labels) {
    await new Promise((r) => setTimeout(r, 400));
    return { label: labels[0], confidence: 0.85 };
  },

  async extractTable(text) {
    await new Promise((r) => setTimeout(r, 600));
    return [
      { Item: "Sample Item 1", Quantity: "5", "Unit Price": "$10.00", Total: "$50.00" },
      { Item: "Sample Item 2", Quantity: "3", "Unit Price": "$25.00", Total: "$75.00" },
      { Item: "Sample Item 3", Quantity: "2", "Unit Price": "$40.00", Total: "$80.00" },
    ];
  },
};

// ── Gemini Provider ────────────────────────────────────────────────────────

function createGeminiProvider(apiKey: string): AIProvider {
  return {
    name: "Google Gemini",

    async generate(prompt, options = {}) {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, options, apiKey }),
      });
      if (!response.ok) throw new Error("AI generation failed");
      return response.json();
    },

    async *stream(prompt, options = {}) {
      const response = await fetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, options }),
      });
      if (!response.ok || !response.body) throw new Error("Stream failed");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) { yield { text: "", done: true }; break; }
        yield { text: decoder.decode(value), done: false };
      }
    },

    async summarize(text) {
      const r = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await r.json();
      return data.summary;
    },

    async classify(text, labels) {
      const r = await fetch("/api/ai/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, labels }),
      });
      return r.json();
    },

    async extractTable(text) {
      const r = await fetch("/api/ai/extract-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return r.json();
    },
  };
}

// ── Factory ────────────────────────────────────────────────────────────────

let _provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (_provider) return _provider;
  const apiKey = typeof window !== "undefined"
    ? ((window as unknown) as Record<string, unknown>).__GEMINI_KEY as string | undefined
    : undefined;
  if (apiKey) {
    _provider = createGeminiProvider(apiKey);
  } else {
    _provider = mockProvider;
  }
  return _provider;
}

export function isDemoMode(): boolean {
  return getAIProvider().name === "Demo Mode";
}
