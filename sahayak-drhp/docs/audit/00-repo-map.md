# Phase 0: Repository & Architecture Mapping

**Repository**: `Khushi-426/sebi` (Branch: `master`)  
**Project**: Sahayak DRHP — SME IPO Offer Document Preparation Platform  
**Audit Date**: August 6, 2026  

---

## 1. Framework & Technical Architecture

- **Core Framework**: React 18.3.1 + TypeScript 5.5.4
- **Build Tooling**: Vite 5.4.0 (`vite`, `tsc -b`)
- **State Management**: Zustand 4.5.4 (`src/store.ts`) with `localStorage` persistence
- **Styling Architecture**: Tailwind CSS 3.4.7 + Custom Primitives in `src/index.css`
- **Component & Motion Libraries**:
  - `lucide-react` (0.427.0) — Corporate Iconography
  - `framer-motion` (11.3.19) — Micro-interactions & Drawer Transitions
  - `recharts` (2.12.7) — Financial & Shareholding Visualizations

---

## 2. Navigation & Screen Routing Model

Application navigation is managed client-side via Zustand (`src/store.ts`) without external URL router:

- `screen`: `'landing' | 'ingest' | 'workspace'`
- `step`: `'base' | 'kyc' | 'eligibility' | 'synthesis' | 'gaps' | 'final'` (Original 6-Step Verification Journey)
- `drhpSection`: `'company' | 'business' | 'financials' | 'promoters' | 'risks' | 'litigation' | 'offer' | 'review'` (Structured 8-Section DRHP Form Wizard)
- `viewMode`: `'journey' | 'drhp_builder'`

---

## 3. Existing Screens, Pages & Form Components

### Primary App Screens
1. **Landing Page**
   - **Path**: `src/pages/Landing.tsx`
   - **Renders**: Hero section, SME market statistics, SEBI ICDR framework highlights, problem breakdown, 4-step Sahayak method, actor roles, interactive CTA, and footer.

2. **Ingest / Onboarding Page**
   - **Path**: `src/pages/Ingest.tsx`
   - **Renders**: Step 1 website URL scanner input, document dropzone, real-time website crawling animation, 42-attribute extraction summary card, and financial peek.

3. **Workspace Master Layout**
   - **Path**: `src/pages/Workspace.tsx`
   - **Renders**: 3-column layout combining `HeaderNav`, `ProgressSidebar`, `IntermediaryBanner`, `VisualTimeline`, active step form, `Copilot`, `AskAIDrawer`, `DraftPreviewPanel`, and `GlossaryDrawer`.

---

### Core Verification Journey Steps (6 Steps)
1. **Company Base**
   - **Path**: `src/pages/steps/CompanyBase.tsx`
   - **Data/Forms**: Corporate identity fields (CIN, PAN, GSTIN), Recharts audited revenue/PAT bar chart, cap table pie chart, financial ratio grid.
2. **Verification & KYC**
   - **Path**: `src/pages/steps/KYC.tsx`
   - **Data/Forms**: 6-phase due diligence checklist accordions (Identity, Promoters, Financials, Capital Table, Legal, Contracts).
3. **Eligibility Check**
   - **Path**: `src/pages/steps/Eligibility.tsx`
   - **Data/Forms**: NSE Emerge listing norms check matrix, eligibility score ring, criteria breakdown.
4. **DRHP Synthesis**
   - **Path**: `src/pages/steps/Synthesis.tsx`
   - **Data/Forms**: 14 DRHP section completeness rings, document-to-section provenance matrix mapping.
5. **Gaps & Consistency**
   - **Path**: `src/pages/steps/Gaps.tsx`
   - **Data/Forms**: Flagged disclosure review items, severity ratings, resolution triggers.
6. **Final Draft DRHP**
   - **Path**: `src/pages/steps/FinalDRHP.tsx`
   - **Data/Forms**: Full Draft Red Herring Prospectus text, cover page, table of contents scroll anchors, merchant banker send modal.

---

### Guided DRHP Section Forms (8 Sections)
1. **Company Basics Form** (`src/pages/steps/CompanyBasicsForm.tsx`) — Legal name, proposed name, CIN (21-digit check), PAN, GSTIN, incorporation date, RoC office, address.
2. **Business Overview Form** (`src/pages/steps/BusinessOverviewForm.tsx`) — Business description, core products, manufacturing locations, competitive strengths.
3. **Financial Snapshot Form** (`src/pages/steps/FinancialSnapshotForm.tsx`) — Restated FY23 revenue, EBITDA, PAT, net worth, borrowings, debt-equity ratio.
4. **Promoters & Management Form** (`src/pages/steps/PromotersManagementForm.tsx`) — Promoter details, age, DIN/PAN, equity stake %, Board composition & DIN status.
5. **Risk Factors Form** (`src/pages/steps/RiskFactorsForm.tsx`) — Internal, external, and regulatory risk factor disclosures with mitigations.
6. **Litigation & Compliance Form** (`src/pages/steps/LitigationComplianceForm.tsx`) — Tax disputes, court proceedings, statutory dues clearances.
7. **Offer Details Form** (`src/pages/steps/OfferDetailsForm.tsx`) — Total issue size, Fresh Issue vs OFS, Objects of Issue expenditure breakdown, Lead Manager & Registrar.
8. **Review & Export Workspace** (`src/pages/steps/ReviewExportWorkspace.tsx`) — Full section audit checklist, open warnings, PDF/JSON export, banker send modal.

---

## 4. Shared & Reusable UI Components

- `HeaderNav.tsx` (`src/components/HeaderNav.tsx`): Sticky top navigation with brand, completion bar, search, activity log, save status, Ask AI trigger, and Glossary button.
- `ProgressSidebar.tsx` (`src/components/ProgressSidebar.tsx`): Left navigation with section list, completion badges, percentage bar, and view mode switcher.
- `AskAIDrawer.tsx` (`src/components/AskAIDrawer.tsx`): Slide-over contextual AI guidance drawer with suggested questions per screen.
- `GlossaryDrawer.tsx` (`src/components/GlossaryDrawer.tsx`): Slide-over SME IPO capital market terms dictionary with category filters and search.
- `DraftPreviewPanel.tsx` (`src/components/DraftPreviewPanel.tsx`): Slide-over formal SEBI SME offer document viewer with section anchors.
- `IntermediaryBanner.tsx` (`src/components/IntermediaryBanner.tsx`): Promoter drafting vs Merchant Banker review mode notification.
- `VisualTimeline.tsx` (`src/components/VisualTimeline.tsx`): Document drafting progress timeline & time estimation.
- `ContextualHelpCard.tsx` (`src/components/ContextualHelpCard.tsx`): Plain-language help box with "Explain This" trigger.
- `EmptyState.tsx` (`src/components/EmptyState.tsx`): Placeholder component for empty lists.
- `Copilot.tsx` (`src/components/Copilot.tsx`): Step-aware assistant panel.
- `ui.tsx` (`src/components/ui.tsx`): Atomic Brand logo, Ring gauge, Toasts notification, Chip.

---

## 5. Design System Tokens & Utility Classes

- **Colors** (`tailwind.config.js`):
  - Navy/Slate: `navy.950` (`#0B132B`), `navy.900` (`#1C2541`), `slate.800` (`#1E293B`), `slate.100` (`#F1F5F9`), `slate.50` (`#F8FAFC`)
  - Accent Gold: `gold.DEFAULT` (`#C59B27`), `gold.soft` (`#EED9A6`), `gold.deep` (`#A37B1E`)
  - State Colors: `ok` (`#059669`), `warn` (`#D97706`), `bad` (`#DC2626`), `info` (`#2563EB`)
- **Component Utilities** (`src/index.css`): `.btn`, `.btn-gold`, `.btn-navy`, `.btn-ghost`, `.card`, `.chip`, `.eyebrow`, `.mono`.
