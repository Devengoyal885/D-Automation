import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Groq key pool (round-robin rotation) ─────────────────────────────────────
const GROQ_KEYS = (process.env.GROQ_API_KEYS ?? "").split(",").filter(Boolean);
let groqKeyIndex = 0;

function nextGroqKey(): string {
  const key = GROQ_KEYS[groqKeyIndex % GROQ_KEYS.length];
  groqKeyIndex++;
  return key;
}

// ─── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(docType: string, tone: string, language: string, citations: string): string {
  return `You are D-Automation's professional document generation AI.

Generate a complete, well-structured ${docType} in ${language}.
Tone: ${tone}
Citation style: ${citations}

Requirements:
- Use clear markdown formatting with proper headings (# ## ###)
- Include all standard sections for this document type
- Write substantive, detailed content — minimum 800 words
- Use real-world examples and data where appropriate
- For academic documents: include proper citations in ${citations} style
- For business documents: use professional language with clear value propositions
- Do NOT include meta-commentary like "here is your document" — output the document directly
- Output in markdown format`;
}

// ─── Gemini generation ─────────────────────────────────────────────────────────
async function generateWithGemini(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("No GEMINI_API_KEY");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── Groq generation (OpenAI-compatible API) ───────────────────────────────────
async function generateWithGroq(prompt: string, systemPrompt: string): Promise<string> {
  if (GROQ_KEYS.length === 0) throw new Error("No GROQ_API_KEYS configured");
  const apiKey = nextGroqKey();

  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Groq error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  return data.choices[0].message.content as string;
}

// ─── Request handler ───────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      prompt,
      docType = "document",
      tone = "professional",
      language = "English",
      citations = "APA",
      provider = "auto", // "gemini" | "groq" | "auto"
    } = body as {
      prompt: string;
      docType?: string;
      tone?: string;
      language?: string;
      citations?: string;
      provider?: string;
    };

    if (!prompt || prompt.trim().length < 3) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(docType, tone, language, citations);
    let content: string;
    let usedProvider: string;

    // Try Gemini first (unless user explicitly wants Groq)
    if (provider !== "groq" && process.env.GEMINI_API_KEY) {
      try {
        content = await generateWithGemini(prompt, systemPrompt);
        usedProvider = "gemini-1.5-flash";
      } catch (geminiErr) {
        console.warn("Gemini failed, falling back to Groq:", geminiErr);
        content = await generateWithGroq(prompt, systemPrompt);
        usedProvider = "groq/llama-3.3-70b";
      }
    } else if (GROQ_KEYS.length > 0) {
      content = await generateWithGroq(prompt, systemPrompt);
      usedProvider = "groq/llama-3.3-70b";
    } else {
      // Demo mode fallback
      content = generateDemoContent(prompt, docType);
      usedProvider = "demo";
    }

    // Rough word count
    const wordCount = content.split(/\s+/).filter(Boolean).length;

    return Response.json({
      content,
      wordCount,
      provider: usedProvider,
      docType,
      tone,
      language,
      citations,
    });
  } catch (err) {
    console.error("AI generate error:", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

// ─── Demo mode (no API keys) ───────────────────────────────────────────────────
function generateDemoContent(prompt: string, docType: string): string {
  return `# ${prompt}

> ⚠️ **Demo Mode** — Add a \`GEMINI_API_KEY\` or \`GROQ_API_KEYS\` to \`.env.local\` for real AI generation.

## Executive Summary

This ${docType} explores the topic: **${prompt}**

Modern solutions in this domain require a comprehensive approach that integrates technology, process optimization, and stakeholder alignment. This document outlines the key findings, methodology, and recommendations based on current best practices.

## Introduction

The subject of ${prompt} has garnered significant attention in recent years due to rapid technological advancement and changing organizational needs. Organizations that effectively address this challenge gain competitive advantages in efficiency, cost reduction, and innovation capacity.

## Methodology

Our analysis follows a structured approach:

1. **Literature Review** — Examination of 47 peer-reviewed sources published between 2020–2025
2. **Case Study Analysis** — In-depth review of 12 organizations that have successfully implemented solutions
3. **Expert Interviews** — Consultation with 8 domain specialists
4. **Data Synthesis** — Statistical analysis of outcomes across surveyed implementations

## Key Findings

### Finding 1: Technology Integration is Critical

Organizations that integrated AI-powered tools saw a **34% improvement** in process efficiency compared to those using manual methods.

### Finding 2: Stakeholder Buy-In Drives Success

Implementation success rates improved by **62%** when executive sponsorship was secured early in the project lifecycle.

### Finding 3: Iterative Approaches Outperform Big-Bang Rollouts

Phased implementations showed **2.3x better ROI** than comprehensive simultaneous deployments.

## Recommendations

1. Begin with a pilot program targeting high-impact, low-risk processes
2. Establish clear KPIs and measurement frameworks before implementation
3. Invest in change management and training programs
4. Build feedback loops into the implementation process

## Conclusion

The evidence strongly supports a structured, technology-enabled approach to ${prompt}. Organizations that act decisively now will be better positioned for future challenges.

---
*Generated by D-Automation — Demo Mode. Enable real AI for production-quality output.*`;
}
