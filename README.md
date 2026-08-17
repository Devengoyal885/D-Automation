<div align="center">

# D-Automation

### AI-Powered Documents. PDFs. Data. Automation.

**One workspace to create, edit, convert, extract, and automate — from prompt to polished file.**

[![Status](https://img.shields.io/badge/status-in%20development-orange)](#-roadmap)
[![License](https://img.shields.io/badge/license-MIT-blue)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](#-contributing)
[![Made with](https://img.shields.io/badge/built%20with-TypeScript%20%7C%20Next.js%20%7C%20Node.js-6366f1)](#-tech-stack)

[Overview](#-overview) •
[Features](#-key-features) •
[Architecture](#-architecture) •
[SmartExtract](#-smartextract) •
[FormFlow](#-formflow) •
[Getting Started](#-getting-started) •
[Roadmap](#-roadmap) •
[Team](#-developers)

</div>

---

## 📖 Overview

Most tools solve one piece of the document problem. One app generates slides. Another converts PDFs. Another autofills forms. Switching between them breaks your workflow and scatters your files across five different tabs.

**D-Automation** puts all of it in one place: one design system, one file workspace, one AI layer, one history — so creating a document, cleaning up a PDF, pulling data out of an invoice, and filling a repetitive form all feel like the same product instead of four unrelated ones.

## ❗ The Problem

- AI writing tools generate content but don't help you **process** existing documents.
- PDF tools convert and edit files but have **no AI layer** and no memory of your work.
- Business teams manually copy data out of bills and invoices into spreadsheets, again and again.
- Students and job-seekers **retype the same information** into form after form.

## ✅ The Solution

A single, unified productivity platform built around one loop:

```
CREATE → EDIT → CONVERT → EXTRACT → AUTOMATE → EXPORT
```

Everything — AI generation, PDF processing, data extraction, and form automation — shares the same files, the same history, and the same interface.

---

## ⭐ Key Features

| Module | What it does |
|---|---|
| 🧠 **AI Studio** | Turn a single prompt into a polished DOCX, PPTX, PDF, or XLSX — reports, proposals, research papers, patent drafts, and more |
| 📄 **Pandaz PDF Suite** | A full PDF toolkit: merge, split, compress, rotate, edit, convert, and secure — all inside D-Automation |
| 🧾 **SmartExtract** | Turn messy business PDFs (invoices, bills, statements) into clean, exportable data |
| 🔁 **FormFlow** | Save your reused information once, then fill repetitive Google Forms with a reviewed, one-click match |
| 🎨 **Template Intelligence** | Upload a college/company template once — every future document inherits its fonts, structure, and branding |
| 🗂️ **Unified Workspace** | One file manager, one activity history, and one contextual AI assistant across every module |

---

## 🏗 Architecture

D-Automation is built as a modular platform: a single web application shell around independent service modules, each with a clean boundary so they can be developed, scaled, and swapped independently.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        WEB["Web App<br/>(Dashboard · AI Studio · Pandaz · SmartExtract · FormFlow)"]
        EXT["FormFlow Browser Extension"]
    end

    subgraph Gateway["API Gateway"]
        AUTH["Auth & Session"]
        RATE["Rate Limiting & Validation"]
    end

    subgraph Services["Core Services"]
        AISVC["AI Generation Service<br/>(Provider Abstraction)"]
        PDFSVC["Pandaz PDF Service<br/>(Convert · Merge · Split · Compress · Edit)"]
        EXTSVC["SmartExtract Service<br/>(Table Detection · OCR · Cleaning)"]
        FORMSVC["FormFlow Service<br/>(Profiles · Field Matching)"]
        TPLSVC["Template Intelligence Service"]
        RAGSVC["RAG / Source Grounding Service"]
    end

    subgraph Data["Data & Storage"]
        DB[("Relational DB<br/>Users · Files · Templates · Activity")]
        BLOB[("Object Storage<br/>Uploaded & Generated Files")]
        VEC[("Vector Store<br/>Document Embeddings")]
    end

    subgraph External["External Providers"]
        LLM["AI Provider(s)<br/>LLM API"]
        GFORM["Google Forms"]
    end

    WEB --> AUTH --> RATE
    RATE --> AISVC & PDFSVC & EXTSVC & FORMSVC & TPLSVC
    AISVC --> RAGSVC
    AISVC --> LLM
    RAGSVC --> VEC
    PDFSVC --> BLOB
    EXTSVC --> BLOB
    TPLSVC --> BLOB
    AISVC --> DB
    PDFSVC --> DB
    EXTSVC --> DB
    FORMSVC --> DB
    EXT -. secure auth .-> FORMSVC
    EXT -. detect & fill (user confirms) .-> GFORM
```

### Core product loop

```mermaid
flowchart LR
    A[Create] --> B[AI Studio]
    B --> C[Edit]
    C --> D[Document Workspace]
    D --> E[Process]
    E --> F[Pandaz]
    F --> G[Extract]
    G --> H[SmartExtract]
    H --> I[Automate]
    I --> J[FormFlow]
    J --> K[Export]
    K -.feeds back into.-> A
```

### AI generation pipeline

Every AI request moves through a visible, structured pipeline rather than being dumped straight into a file — this is what makes generated output feel deliberate instead of random.

```mermaid
flowchart TD
    P[Prompt] --> ID[Intent Detection]
    ID --> DT[Document Type Detection]
    DT --> SO[Structured Outline]
    SO --> CG[Content Generation]
    CG --> SR[Source Retrieval / RAG]
    SR --> CV[Citation Validation]
    CV --> FMT[Formatting & Template Match]
    FMT --> PV[Preview]
    PV --> HR[Human Review]
    HR --> EX[Export: DOCX / PPTX / PDF / XLSX]
```

---

## 🧾 SmartExtract

> **Turn messy business PDFs into clean data.**

Built for invoices, bills, and statements — the workflow detects tables, lets you strip out anything you don't need, cleans what's left, and exports a business-ready file.

```mermaid
flowchart TD
    U[Upload PDF] --> DET[AI Table & Layout Detection]
    DET --> EXTR[Extract Data]
    EXTR --> PREV[Preview: Original vs Extracted]
    PREV --> RM["Remove Unwanted Content<br/>(rows · columns · pages · sections)"]
    RM --> CLEAN["Clean & Normalize<br/>(currency · dates · duplicates · headers)"]
    CLEAN --> CALC["Optional Calculations<br/>(Qty × Price, Tax, Totals)"]
    CALC --> OUT[Export CSV / XLSX]
```

**Business Bill Mode** prioritizes invoice-style extraction — item rows, quantities, unit prices, tax, and totals — while ignoring page noise like footers and ads.

---

## 🔁 FormFlow

> **Stop typing the same information again and again.**

FormFlow never touches your Google credentials and never auto-submits anything — it only detects, matches, and fills after you review and confirm.

```mermaid
sequenceDiagram
    participant U as User
    participant W as D-Automation Web App
    participant S as FormFlow Service
    participant E as Browser Extension
    participant G as Google Form

    U->>W: Create saved profile (College / Personal / Team)
    W->>S: Store profile (encrypted)
    U->>G: Open a supported form
    E->>G: Detect form fields & labels
    E->>S: Request field match
    S-->>E: Matched fields (e.g. 8/10)
    E-->>U: Show confirmation panel
    U->>E: Review & approve fill
    E->>G: Fill approved fields only
    U->>G: Manually reviews & submits
```

---

## 🎨 Template Intelligence

Upload a college, company, or institution template (PPTX / DOCX / PDF) once. D-Automation analyzes fonts, colors, spacing, heading hierarchy, margins, and citation style, and stores it as a reusable configuration — so every future generated document inherits the same look automatically.

## 🧰 Pandaz PDF Suite

| Organize | Convert | Optimize | Edit | Security |
|---|---|---|---|---|
| Merge, Split, Reorder, Delete, Extract, Rotate | PDF ⇄ Word / PPT / Excel / CSV / Images | Compress | Text, Highlight, Draw, Shapes, Images, Signatures | Password Protect, Redaction |

*Password unlocking is only performed where legally and technically authorized — D-Automation never claims to bypass encryption on protected documents.*

---

## 🧱 Tech Stack

> D-Automation is architected to be provider-agnostic. The stack below reflects the current build target — swap freely to match what's already in the repository.

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) · TypeScript · Tailwind CSS |
| Backend / API | Node.js · Next.js API Routes / Express |
| AI Layer | Provider-abstracted LLM client (generate · stream · embed · classify · summarize) |
| PDF Processing | Pandaz core (Node/Python PDF libraries) + OCR pipeline |
| Database | PostgreSQL |
| Object Storage | S3-compatible storage |
| Vector Store | For RAG / source grounding |
| Browser Extension | Chrome/Edge extension (FormFlow) |
| Auth | Session-based auth with signed, scoped file access |

---

## 🗃 Data Model (high level)

```mermaid
erDiagram
    USER ||--o{ FILE : owns
    USER ||--o{ TEMPLATE : creates
    USER ||--o{ SAVED_PROFILE : creates
    USER ||--o{ GENERATION : requests
    FILE ||--o{ ACTIVITY : logs
    TEMPLATE ||--o{ GENERATION : informs
    GENERATION ||--o{ FILE : produces
    SAVED_PROFILE ||--o{ FORM_FIELD : contains
    FORM_FIELD ||--o{ FORM_MAPPING : maps_to
    FILE ||--o{ EXTRACTION_JOB : source_of
    FILE ||--o{ PDF_JOB : source_of
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Devengoyal885/D-Automation.git
cd D-Automation

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

```env
# AI Provider
AI_PROVIDER_API_KEY=

# Database
DATABASE_URL=

# Object Storage
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=

# Auth
AUTH_SECRET=

# FormFlow Extension
FORMFLOW_SERVICE_URL=
```

> Never commit real secrets. All AI calls are made **server-side only** — no API keys are ever exposed to the client.

---

## 🔐 Security

- Authentication & authorization on every route
- Signed, time-scoped download URLs for stored files
- Upload size limits and strict MIME validation
- Rate limiting on AI and processing endpoints
- No secrets in client-side code
- FormFlow stores profile data encrypted, never Google credentials, and never auto-submits a form

## 🗺 Roadmap

**Now**
- [x] Dashboard, AI Studio, Pandaz core, SmartExtract, unified file manager
- [x] Template Intelligence (MVP)
- [x] FormFlow architecture (web app + extension boundary)

**Next**
- [ ] RAG-grounded citations end-to-end
- [ ] Full in-editor AI commands (rewrite, expand, summarize)
- [ ] Business Bill Mode calculations (formulas, totals)

**Later**
- [ ] Team workspaces & collaboration
- [ ] Subscription tiers (Free / Pro / Team / Enterprise)
- [ ] Public API / marketplace

## ⚠️ Responsible AI

- AI-generated research, reports, and patent drafts are labeled **AI-generated draft — review before submission**, never as guaranteed-correct.
- Citations are only shown when a source was actually retrieved — nothing is fabricated.
- SmartExtract's calculation layer is a data-processing convenience, **not accounting or tax advice**.

## 🤝 Contributing

Issues and pull requests are welcome. Please open an issue first for major changes so we can discuss direction before you invest time in a PR.

## 👨‍💻 Developers

<div align="center">

| | | |
|:---:|:---:|:---:|
| **Deven Goyal** | **Rishabh Verma** | **Aditya Singh** |
| [Devengoyal.netlify.app](https://devengoyal.netlify.app) | Developer | Developer |

</div>

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

**Create once. Process anywhere. Automate repetitive work.**

</div>
