# Phase 1: UX & Codebase Audit Report

**Repository**: `Khushi-426/sebi` (Branch: `master`)  
**Project**: Sahayak DRHP — SME IPO Offer Document Preparation Workspace  
**Audit Date**: August 6, 2026  

---

## 1. Current UX Problems & User Journey Bottlenecks

### Bottleneck 1: Dual Navigation Model Ambiguity
- **File Reference**: [Workspace.tsx:L50-L75](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Workspace.tsx#L50-L75) & [ProgressSidebar.tsx:L58-L81](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/ProgressSidebar.tsx#L58-L81)
- **Problem**: The workspace offers two distinct modes: **Original 6-Step Verification Journey** (`Company Base`, `KYC`, `Eligibility`, `Synthesis`, `Gaps`, `Final DRHP`) and **8-Section DRHP Form Wizard** (`Company Basics`, `Business Overview`, `Financial Snapshot`, `Promoters`, `Risk Factors`, `Litigation`, `Offer Details`, `Review`).
- **SME Founder Impact**: First-time SME promoters are confused about whether they are completing a verification checklist or drafting formal offer document sections. Switching between modes resets scroll positions and context.

### Bottleneck 2: Financial & Capital Market Terminology Jargon
- **File Reference**: [FinancialSnapshotForm.tsx:L35-L95](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/FinancialSnapshotForm.tsx#L35-L95) & [OfferDetailsForm.tsx:L35-L85](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/OfferDetailsForm.tsx#L35-L85)
- **Problem**: Forms ask for "Restated EBITDA", "PAT Margin", "Debt-Equity Ratio", "Objects of the Issue", and "Offer for Sale (OFS)" without inline conversion tools or plain-language field guidance.
- **SME Founder Impact**: Non-finance founders cannot easily compute EBITDA or reconcile Fresh Issue proceeds with Objects expenditure without external assistance.

---

## 2. Layout & Information Overload Analysis

### Problem 1: Rigid 3-Column Desktop Grid Crowding
- **File Reference**: [Workspace.tsx:L44](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Workspace.tsx#L44) (`gridTemplateColumns: '280px 1fr 360px'`)
- **Impact**: On 13-inch and 14-inch laptops (1280px width), the sidebar (280px) and Copilot panel (360px) consume 640px combined, leaving only 640px for the primary form workspace. This causes dense form layout crowding, wrapped labels, and vertical scrolling strain.

### Problem 2: Missing Workspace Collapsibility Primitives
- **File Reference**: [Workspace.tsx:L44-L85](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Workspace.tsx#L44-L85) & [ProgressSidebar.tsx:L51](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/ProgressSidebar.tsx#L51)
- **Impact**: The left sidebar (`w-[280px]`) and right Copilot panel (`360px`) cannot be collapsed by the user during intensive drafting sessions, restricting workspace focus.

---

## 3. Visual Hierarchy & Design System Inconsistencies

### Inconsistency 1: Ad-Hoc Inline Styles & Drifting Color Tokens
- **File References**:
  - `Landing.tsx`: Hardcoded hex colors `#0a1a37`, `#0b1e3f`, `#d4af5f`, `#c3d0e6`, `rgba(212,175,95,.16)` ([Landing.tsx:L25](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Landing.tsx#L25)).
  - `CompanyBase.tsx`: Hardcoded background gradient `linear-gradient(120deg,#0b1e3f,#0f2a54)` ([CompanyBase.tsx:L24](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/CompanyBase.tsx#L24)).
  - `FinalDRHP.tsx`: Double border rules `borderBottom: '3px double #c9b688'` ([FinalDRHP.tsx:L81](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/FinalDRHP.tsx#L81)).
- **Impact**: Inconsistent theme tokens across pages create visual fragmentation between the Landing hero, Verification cards, and DRHP Form wizard.

### Inconsistency 2: Duplicate Button Styles & Form Controls
- **File References**: `src/index.css` (`.btn-navy`, `.btn-gold`, `.btn-ghost`), `src/components/ui.tsx`, and inline custom buttons across step pages.
- **Impact**: Varying padding, border radii (10px, 12px, 16px, 18px), font weights, and hover transforms across steps.

---

## 4. Accessibility (a11y) & Keyboard Audit

### Issue 1: Unassociated Form Inputs & Missing `<label>` References
- **File References**:
  - `CompanyBasicsForm.tsx`: Inputs ([L42](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/CompanyBasicsForm.tsx#L42), [L55](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/CompanyBasicsForm.tsx#L55), [L79](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/steps/CompanyBasicsForm.tsx#L79)) rely on wrapping `<div>` containers rather than explicit `htmlFor` and `id` attributes.
  - `Ingest.tsx`: Website URL input ([Ingest.tsx:L69](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Ingest.tsx#L69)) has placeholder text but no `<label>` or `aria-label`.
- **WCAG Violation**: WCAG 2.1 AA Criterion 1.3.1 (Info and Relationships) & 4.1.2 (Name, Role, Value).

### Issue 2: Low Color Contrast on Muted Text
- **File References**:
  - `ProgressSidebar.tsx`: Sidebar sub-labels (`#8598b9` text on `#0b1e3f` background, [L157](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/ProgressSidebar.tsx#L157)) have a contrast ratio of 3.3:1.
  - `HeaderNav.tsx`: Sub-header text (`#93a6c6` on `#0b1e3f`, [L40](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/HeaderNav.tsx#L40)) has a contrast ratio of 3.8:1.
- **WCAG Violation**: Fails WCAG 2.1 AA Criterion 1.4.3 (Contrast Minimum requirement of 4.5:1 for body text).

### Issue 3: Missing ARIA Attributes & Focus Traps in Drawers
- **File References**:
  - `AskAIDrawer.tsx` ([L228](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/AskAIDrawer.tsx#L228)) & `GlossaryDrawer.tsx` ([L25](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/GlossaryDrawer.tsx#L25)): Drawers lack `role="dialog"`, `aria-modal="true"`, and initial focus management upon opening.
  - `HeaderNav.tsx`: Activity dropdown ([L103](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/components/HeaderNav.tsx#L103)) does not handle `Escape` key press or click-outside events.

---

## 5. Responsiveness & Overflow Issues

### Breakpoint Defect 1: Fixed Layout Columns on Tablet Screens
- **File Reference**: [Workspace.tsx:L44](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Workspace.tsx#L44)
- **Defect**: Below 1024px viewport width, 3 fixed columns overflow the screen horizontally instead of collapsing the sidebar and right assistant panel into drawers or bottom sheets.

### Breakpoint Defect 2: Document Stack Clipping on Landing Page
- **File Reference**: [Landing.tsx:L92-L97](file:///c:/Khushi/SEBI/sebi/sahayak-drhp/src/pages/Landing.tsx#L92-L97)
- **Defect**: Fixed dimensions (`width: 342, height: 452`) cause text clipping and horizontal scrollbars on viewports between 768px and 1024px.

---

## 6. Content & Copy Improvements Needed

1. **Jargon-Heavy Navigation Labels**: Replace legal section codes ("Section IX - Objects of the Issue") with plain-English descriptions ("7. Issue Size & Planned Fund Uses").
2. **Missing Actionable Guidance**: Add short helper text under input fields explaining *why* the information is needed and providing a real-world SME example.
3. **Clear Regulatory Clarification**: Explicitly notify users on every form page that Sahayak prepares a draft for Lead Manager due diligence and certification, not automated filing.
