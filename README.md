# D-Automation 2.0

> **AI-Powered Documents. PDFs. Data. Automation.**

D-Automation is a unified AI productivity platform that combines document generation, PDF processing, intelligent data extraction, and repetitive workflow automation into one coherent workspace.

---

## Overview

Modern knowledge workers use four or five different tools to write a document, process a PDF, extract invoice data, and fill a form. D-Automation replaces all of them with a single, integrated platform.

**Create → Process → Extract → Automate → Export**

---

## Problem

Professionals juggle multiple disconnected tools:

- AI writing tools (for documents)
- Separate PDF editors (for processing)
- Manual copy-paste (for data extraction)
- Repetitive typing (for forms)

There is no unified workspace that handles the complete document lifecycle.

---

## Solution

D-Automation provides four tightly integrated modules under one interface, sharing one file system, one AI layer, one design system, and one consistent experience.

---

## Key Features

### AI Studio

Generate professional documents with a single prompt.

- **Supported outputs**: DOCX, PPTX, PDF, XLSX, Research Papers, Technical Reports, Business Proposals, Patent Drafts, Assignments
- **Controls**: Tone, length, language, audience, citation style (APA, IEEE, MLA, Harvard, Chicago)
- **Template-aware**: Documents inherit uploaded institution templates
- **Generation pipeline**: Understand → Structure → Generate → Cite → Format → Preview → Export
- **AI provider**: Google Gemini (abstracted — swap providers without UI changes)
- **Demo Mode**: Full functionality without API key for evaluation

### Pandaz PDF Suite

A complete PDF toolkit integrated directly into D-Automation.

**Organize**: Merge, Split, Reorder pages, Delete pages, Extract pages, Rotate pages

**Convert**:
- PDF → Word (DOCX)
- PDF → PowerPoint (PPTX)
- PDF → Excel (XLSX)
- PDF → CSV
- PDF → Images (PNG/JPEG)
- Word → PDF, PPT → PDF, Images → PDF

**Optimize**: Compress PDF (significant size reduction)

**Edit**: Add text, highlight, annotate, signatures (roadmap)

---

### ⭐ SmartExtract

**Turn messy business PDFs into clean, usable data.**

SmartExtract is D-Automation's signature data extraction module, designed specifically for business invoices, bills, statements, and reports.

**SmartExtract allows users to remove unwanted rows, columns, pages and sections from extracted PDF data before exporting clean CSV/XLSX files, making it particularly useful for business bill and invoice calculations.**

**Workflow:**

```
Upload PDF
  ↓
AI/Table Detection (3 tables detected, 24 rows)
  ↓
Three-Panel View: Original | Extracted | Cleaned
  ↓
Select/deselect columns (Item, Qty, Price, Total vs. Notes, SKU, Address)
  ↓
Select/deselect rows (exclude summary rows, header rows)
  ↓
Apply cleaning (normalize currency, dates, numbers)
  ↓
Apply calculations (Total = Qty × Unit Price, Tax = Total × 18%)
  ↓
Export clean CSV or XLSX
```

**Business Bill Mode**: When enabled, SmartExtract prioritizes invoice structure detection, identifies item rows, quantities, unit prices, tax, and totals while ignoring irrelevant page content.

**Column controls**: Include/exclude any column with checkboxes  
**Row controls**: Include/exclude individual rows (filter out summary/header rows)  
**Cleaning**: Currency symbol normalization, date standardization, duplicate removal  
**Calculations**: Custom formula layer (Total = Qty × Unit Price, etc.)

---

### FormFlow

**Stop typing the same information again and again.**

FormFlow stores reusable profiles (College, Personal, Team, Work) and helps users fill repetitive Google Forms.

**Profiles**: Store name, email, phone, university, course, semester, GitHub, LinkedIn, portfolio — any fields you fill repeatedly.

**Field Matching**: AI matches saved fields to form fields with confidence scores.

**Review Before Fill**: FormFlow shows all matched and unmatched fields with confidence percentages. Users review every value before any fill action.

**Never auto-submits**: FormFlow is a fill assistant, not a bot. Human review and confirmation are always required.

**Browser Extension Architecture**:

```
D-Automation Web App (profile management, field review)
    ↓ secure local communication
FormFlow Service (field matching, confidence scoring)
    ↓
Browser Extension (form detection, DOM interaction)
    ↓
Google Form (field population — user confirms submission)
```

**Privacy**: All profile data is encrypted locally. No Google credentials stored. No data sharing without explicit consent.

---

### Template Intelligence

Upload any institutional template (PPTX, DOCX, PDF) and D-Automation analyzes:

- Fonts and typography
- Color palette
- Heading hierarchy
- Margin and spacing
- Logo placement
- Citation style preferences
- Page/slide structure

Future AI-generated documents automatically inherit the template's structure and branding.

---

## Architecture

```
src/
├── app/
│   ├── (app)/               # Authenticated app shell
│   │   ├── dashboard/       # Main dashboard
│   │   ├── ai-studio/       # AI generation hub + sub-pages
│   │   ├── pandaz/          # PDF workspace + tool pages
│   │   ├── smart-extract/   # SmartExtract module
│   │   ├── form-flow/       # FormFlow module
│   │   ├── templates/       # Template library
│   │   ├── files/           # File manager
│   │   ├── history/         # Activity history
│   │   └── settings/        # Settings
│   ├── api/
│   │   └── ai/generate/     # AI generation API route
│   └── page.tsx             # Marketing landing page
├── components/
│   ├── ui/                  # Design system primitives (Toaster)
│   ├── layout/              # Sidebar, TopBar, CommandPalette
│   ├── dashboard/           # Dashboard components
│   ├── ai-studio/           # AI Studio components
│   ├── pandaz/              # Pandaz PDF components
│   ├── smart-extract/       # SmartExtract components
│   └── form-flow/           # FormFlow components
└── lib/
    └── ai/
        └── provider.ts      # AIProvider abstraction
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom design system |
| Icons | Lucide React |
| PDF Processing | pdf-lib, pdfjs-dist |
| AI Provider | Google Gemini (abstracted) |
| Document Export | docx, pptxgenjs, xlsx |
| Rich Text Editor | Tiptap |
| State | Zustand |
| Animations | Framer Motion |

---

## AI Architecture

```typescript
interface AIProvider {
  generate(prompt: string, options: GenerateOptions): Promise<GenerateResult>
  stream(prompt: string, options: GenerateOptions): AsyncGenerator<StreamChunk>
  summarize(text: string): Promise<string>
  classify(text: string, labels: string[]): Promise<ClassifyResult>
  extractTable(text: string): Promise<Record<string, string>[]>
}
```

The AI layer is abstracted — switching providers requires changing only the provider implementation, not any UI code.

**Demo Mode**: When no `GEMINI_API_KEY` is set, a mock provider activates automatically with realistic output, showing the full generation pipeline UI and workflow.

---

## PDF Processing

- **pdf-lib**: Client-safe PDF manipulation (merge, split, rotate, compress)
- **pdfjs-dist**: PDF rendering to canvas for the PDF viewer
- **SmartExtract**: Custom table detection using heuristics + Gemini vision API
- **Tesseract.js**: OCR for scanned PDFs (lazy-loaded, only when needed)

---

## FormFlow Architecture

The web app handles:
- Profile CRUD management
- Field library
- Field matching UI with confidence scores
- Review and confirmation flow

The browser extension (separate package, documented) handles:
- Form DOM detection
- Field label extraction
- Communicating matched fields to the web app
- Filling confirmed fields

---

## Security

- All AI API calls go through server-side Next.js API routes
- `GEMINI_API_KEY` is never exposed to the client
- FormFlow profiles encrypted in localStorage (AES-256)
- File upload validation (MIME type + size limits)
- No credentials stored for any third-party services
- Forms are never auto-submitted

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourorg/dautomation.git
cd dautomation

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Start development server
npm run dev
```

The app runs at `http://localhost:3000`.

---

## Environment Variables

```env
# Required for real AI generation (optional — Demo Mode works without it)
GEMINI_API_KEY=AIza...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get your Gemini API key at [aistudio.google.com](https://aistudio.google.com).

---

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Future Roadmap

### v2.1 — Advanced PDF Editing
- In-browser PDF editor (annotations, text, shapes)
- Signature support
- Redaction

### v2.2 — Collaboration
- Shared workspaces
- Document comments
- Real-time co-editing

### v2.3 — API Marketplace
- Public D-Automation API
- Webhook integrations
- Zapier / Make connectors

### v2.4 — Enterprise
- SSO / SAML
- Team management
- Advanced analytics
- Custom AI models
- On-premises deployment

### v3.0 — Agentic Workflows
- Multi-step automated pipelines
- "Extract invoice → calculate → send report" in one action
- Scheduled automation
- Custom workflow builder

---

## Responsible AI

D-Automation is an AI-assisted tool, not a replacement for professional judgment.

- Research papers: AI-generated drafts should be reviewed and verified
- Patent drafts: Legal review by a qualified patent attorney is required
- Citations: Sources are shown and verifiable — fabricated references are never generated
- Business data: SmartExtract is a processing tool, not accounting or tax advice
- Forms: FormFlow fills fields — users are responsible for accuracy and submission

---

*D-Automation — Create once. Process anywhere. Automate repetitive work.*
